from typing import Any, Dict, List
from fastapi import FastAPI
from concurrent.futures import ProcessPoolExecutor
from model_utils import ModelLoader, parallel_predict, test_predict2
from data_models import PredictionRequest
import pandas as pd
import os
from dotenv import load_dotenv
from fastapi.encoders import jsonable_encoder
app = FastAPI()
# .env 파일 로드
load_dotenv()
# 모델 파일 경로
# MODEL_FILE_PATH = 'path/to/your/model.dill'
# model = load_model(MODEL_FILE_PATH)

@app.get("/")
async def root():
    return {"health": "ok"}

@app.post("/predict")
async def predict_endpoint(request: List[Dict[str, Any]]):
    # 모든 요청 데이터를 한 번에 DataFrame으로 변환
    df = pd.DataFrame(request)
    df = df.set_index('datetime', drop = True)
    df.index = pd.to_datetime(df.index)
    df = df.astype(float)

    # 들어오는 값
    # print(df)

    # 마지막 값
    # print(df.index[-1])
    
    # 단일 DataFrame에 대해 예측 수행
    with ProcessPoolExecutor() as executor:
        # 단일 DataFrame에 대해 test_predict 실행
        results = test_predict2(None, df)

    model_loader = ModelLoader(bucket_name="ineeji-gseps-test",
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                region_name=os.getenv("AWS_REGION"))
    
    model = model_loader.load_model(model_name="IneejiInference", model_s3_key="models/IneejiInference.pkl", version_s3_key="models/IneejiInference_version.json")

    # 예측 데이터(최근공정데이터), step = 0.1 간격으로 예측
    predict_data = model.predict(df, step=0.1)

    # 예측 데이터 출력
    # print(predict_data)
    
    # 결과 반환
    return jsonable_encoder(predict_data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8888, reload=True)