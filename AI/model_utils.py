import random
from typing import Any, Optional, Dict, List
import dill
import pandas as pd
import boto3
from botocore.exceptions import ClientError
import numpy as np
import os
import json
from pathlib import Path
import shutil
from datetime import datetime

class ModelLoader:
    def __init__(self, bucket_name: str, aws_access_key_id: Optional[str] = None, 
                aws_secret_access_key: Optional[str] = None, region_name: Optional[str] = None):
        """
        ModelLoader 초기화
        
        Args:
            bucket_name (str): S3 버킷 이름
            aws_access_key_id (str, optional): AWS 액세스 키
            aws_secret_access_key (str, optional): AWS 시크릿 키
            region_name (str, optional): AWS 리전
        """
        self.bucket_name = bucket_name
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            region_name=region_name
        )
        self.model_base_path = "models"
        os.makedirs(self.model_base_path, exist_ok=True)
        
    def _get_model_version(self, s3_key: str) -> Dict:
        """
        S3에서 모델의 버전 정보를 가져옴
        
        Args:
            s3_key (str): 버전 정보 파일의 S3 경로
            
        Returns:
            Dict: 현재 버전 정보와 버전 히스토리
        """
        try:
            response = self.s3_client.get_object(Bucket=self.bucket_name, Key=s3_key)
            version_info = json.loads(response['Body'].read().decode('utf-8'))
            return version_info
        except ClientError as e:
            if e.response['Error']['Code'] == 'NoSuchKey':
                # 버전 파일이 없으면 새로 생성
                return {
                    "current_version": "0.0.1",
                    "history": []
                }
            print(f"Error getting model version from S3: {e}")
            raise

    def _update_version_info(self, s3_key: str, new_version: str, description: str = "") -> None:
        """
        S3의 버전 정보 파일 업데이트
        
        Args:
            s3_key (str): 버전 정보 파일의 S3 경로
            new_version (str): 새로운 버전
            description (str): 버전 설명
        """
        try:
            # 현재 버전 정보 가져오기
            version_info = self._get_model_version(s3_key)
            
            # 이전 버전을 히스토리에 추가
            if "current_version" in version_info:
                history_entry = {
                    "version": version_info["current_version"],
                    "updated_at": datetime.now().isoformat(),
                    "description": version_info.get("description", "")  # 현재 description을 히스토리에 저장
                }
                if "history" not in version_info:
                    version_info["history"] = []
                version_info["history"].append(history_entry)
            
            # 새로운 버전 정보 업데이트
            version_info["current_version"] = new_version
            version_info["last_updated"] = datetime.now().isoformat()
            version_info["description"] = description
            
            # S3에 업데이트된 버전 정보 저장
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=s3_key,
                Body=json.dumps(version_info, indent=2)
            )
            
        except Exception as e:
            print(f"Error updating version info: {e}")
            raise

    def _get_local_version(self, model_name: str) -> Optional[str]:
        """
        로컬에 저장된 모델의 버전 정보를 가져옴
        
        Args:
            model_name (str): 모델 이름
            
        Returns:
            Optional[str]: 로컬 모델 버전, 없으면 None
        """
        version_file = os.path.join(self.model_base_path, f"{model_name}_version.json")
        if os.path.exists(version_file):
            with open(version_file, 'r') as f:
                version_info = json.load(f)
                return version_info.get("current_version")
        return None

    def _save_local_version(self, model_name: str, version_info: Dict):
        """
        로컬에 모델 버전 정보 저장
        
        Args:
            model_name (str): 모델 이름
            version_info (Dict): 버전 정보
        """
        version_file = os.path.join(self.model_base_path, f"{model_name}_version.json")
        with open(version_file, 'w', encoding='utf-8') as f:
            json.dump(version_info, f, indent=2, ensure_ascii=False)

    def _clean_old_model(self, model_name: str):
        """
        이전 버전의 모델 파일 삭제
        
        Args:
            model_name (str): 모델 이름
        """
        model_dir = os.path.join(self.model_base_path, model_name)
        if os.path.exists(model_dir):
            shutil.rmtree(model_dir)
        
    def _download_model(self, s3_key: str, local_path: str) -> str:
        """
        S3에서 모델 파일 다운로드
        
        Args:
            s3_key (str): S3에서의 모델 파일 경로
            local_path (str): 로컬에 저장할 경로
            
        Returns:
            str: 다운로드된 모델의 로컬 경로
        """
        try:
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            self.s3_client.download_file(self.bucket_name, s3_key, local_path)
            return local_path
        except ClientError as e:
            print(f"Error downloading model from S3: {e}")
            raise

    def load_model(self, model_name: str, model_s3_key: str, version_s3_key: str) -> Any:
        """
        버전 확인 후 필요한 경우에만 S3에서 모델을 다운로드하고 로드
        
        Args:
            model_name (str): 모델 이름
            model_s3_key (str): 모델 파일의 S3 경로
            version_s3_key (str): 버전 정보 파일의 S3 경로
            
        Returns:
            Any: 로드된 모델 객체
        """
        try:
            # S3에서 최신 버전 정보 확인
            version_info = self._get_model_version(version_s3_key)
            current_version = version_info["current_version"]
            local_version = self._get_local_version(model_name)
            
            local_model_path = os.path.join(self.model_base_path, model_name, Path(model_s3_key).name)
            
            # 버전이 다르거나 로컬에 모델이 없는 경우
            if current_version != local_version or not os.path.exists(local_model_path):
                print(f"새로운 모델 버전 발견: {current_version}")
                print(f"마지막 업데이트: {version_info.get('last_updated', 'N/A')}")
                print(f"설명: {version_info.get('description', 'N/A')}")
                
                # 버전 히스토리 출력
                if version_info.get("history"):
                    print("\n이전 버전 히스토리:")
                    for history in version_info["history"]:
                        print(f"- 버전: {history['version']}")
                        print(f"  업데이트: {history['updated_at']}")
                        print(f"  설명: {history.get('description', 'N/A')}\n")
                
                # 이전 모델 삭제
                self._clean_old_model(model_name)
                # 새 모델 다운로드
                self._download_model(model_s3_key, local_model_path)
                # 버전 정보 업데이트
                self._save_local_version(model_name, version_info)
            else:
                print(f"현재 최신 버전 사용 중: {current_version}")
            
            # 모델 로드
            with open(local_model_path, 'rb') as f:
                model = dill.load(f)
            return model
            
        except Exception as e:
            print(f"Error loading model: {e}")
            raise

# 예측 함수
def predict(model, data):
    return model.predict(data)

# 병렬 예측을 위한 함수
def parallel_predict(args):
    model, data = args
    return predict(model, data) 

def test_predict(model: Any | None, data: Any | pd.DataFrame):
    print("프린트")
    results = []
    # DataFrame의 각 행에 대해 처리
    for idx in range(len(data)):
        forecast_date = pd.to_datetime(data['forecastDate'].iloc[idx]) - pd.Timedelta(hours=9)
        id_value = data['id'].iloc[idx].item()
        GT1_value = random.randint(270, 300)
        GT2_value = random.randint(270, 300)
        ST_value = random.randint(310, 360)
        Total_value = GT1_value + GT2_value + ST_value
        # 허용하한 total의 -0.5%, 허용상한 total의 +0.5% 
        lower_limit = Total_value * 0.995
        upper_limit = Total_value * 1.005
        
        results.append({
            "id": id_value,
            "GT1": GT1_value,
            "GT2": GT2_value,
            "ST": ST_value,
            "Total": Total_value,
            "lower_limit": round(lower_limit, 2),
            "upper_limit": round(upper_limit, 2)
        })
        # print(data)
    return results

def test_predict2(model: Any | None, data: Any | pd.DataFrame):
    print("프린트")
    results = []
    # DataFrame의 각 행에 대해 처리

    # forecast_date = pd.to_datetime(data['forecast_date'].iloc[idx]) - pd.Timedelta(hours=9)
    # -20부터 40까지 0.1 간격으로 온도값 생성
    temperatures = np.arange(-20.0, 40.1, 0.1)

    # predict 리스트 생성
    predict_data = [
            {
            "temperature": round(temp, 1),
            "GT1": round(temp, 1),
            "GT2": round(temp, 1),
            "ST": round(temp, 1),
            }
        for temp in temperatures
    ]
    
    results.append({
        "datetime": datetime.now(),
        "predict": predict_data
    })
        # print(data)
    return results
