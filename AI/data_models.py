from pydantic import BaseModel
from typing import List

# 요청 데이터 모델
class PredictionRequest(BaseModel):
    data: List[List[float]]  # 2차원 리스트로 변경