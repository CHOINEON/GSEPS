from typing import Any, Dict, List
from fastapi import FastAPI
from concurrent.futures import ProcessPoolExecutor
from model_utils import load_model, parallel_predict, test_predict
from data_models import PredictionRequest
import pandas as pd

app = FastAPI()

# 모델 파일 경로
# MODEL_FILE_PATH = 'path/to/your/model.dill'
# model = load_model(MODEL_FILE_PATH)

@app.post("/predict")
async def predict_endpoint(request: List[Dict[str, Any]]):
    # 모든 요청 데이터를 한 번에 DataFrame으로 변환
    df = pd.DataFrame(request)
    print(df)
    
    # 단일 DataFrame에 대해 예측 수행
    with ProcessPoolExecutor() as executor:
        # 단일 DataFrame에 대해 test_predict 실행
        results = test_predict(None, df)
    
    # 결과 반환
    return {"predictions": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8888, reload=True)