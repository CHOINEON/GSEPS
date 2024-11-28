import random
from typing import Any
import dill
import pandas as pd
# 모델 로드
def load_model(file_path):
    with open(file_path, 'rb') as f:
        model = dill.load(f)
    return model

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
        print(data)
    return results
