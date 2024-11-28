# client.py
import requests
import json
from concurrent.futures import ThreadPoolExecutor
import time
from typing import Dict, List, Any

def make_prediction_request(input_data_list: List[Dict[str, Any]]) -> Dict[str, Any]:
    """예측 요청을 수행하는 함수"""
    try:
        url = "http://127.0.0.1:8000/predict"
        headers = {"Content-Type": "application/json"}
        
        response = requests.post(
            url=url,
            headers=headers,
            json=input_data_list,  # 전체 리스트를 한 번에 전송
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.RequestException as e:
        print(f"API 요청 중 오류 발생: {e}")
        return {"error": str(e)}

def run_tests():
    start_time = time.time()
    
    # 테스트용 입력 데이터
    input_data_list = [
        {
            "id": 23,
            "forecastDate": "2024-11-25T15:00:00.000Z",
            "temperature": 10.9,
            "pressureMb": 1014,
            "humidity": 75,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 26,
            "forecastDate": "2024-11-25T16:00:00.000Z",
            "temperature": 10.8,
            "pressureMb": 1012,
            "humidity": 79,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/302.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 25,
            "forecastDate": "2024-11-25T17:00:00.000Z",
            "temperature": 11.5,
            "pressureMb": 1012,
            "humidity": 71,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 28,
            "forecastDate": "2024-11-25T18:00:00.000Z",
            "temperature": 11.1,
            "pressureMb": 1010,
            "humidity": 79,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/296.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 30,
            "forecastDate": "2024-11-25T19:00:00.000Z",
            "temperature": 11,
            "pressureMb": 1009,
            "humidity": 89,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/302.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 36,
            "forecastDate": "2024-11-25T20:00:00.000Z",
            "temperature": 11.3,
            "pressureMb": 1011,
            "humidity": 85,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/296.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 37,
            "forecastDate": "2024-11-25T21:00:00.000Z",
            "temperature": 11.1,
            "pressureMb": 1011,
            "humidity": 81,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 32,
            "forecastDate": "2024-11-25T22:00:00.000Z",
            "temperature": 10.8,
            "pressureMb": 1012,
            "humidity": 77,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 33,
            "forecastDate": "2024-11-25T23:00:00.000Z",
            "temperature": 10.2,
            "pressureMb": 1013,
            "humidity": 74,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/353.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 34,
            "forecastDate": "2024-11-26T00:00:00.000Z",
            "temperature": 9.2,
            "pressureMb": 1014,
            "humidity": 69,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 31,
            "forecastDate": "2024-11-26T01:00:00.000Z",
            "temperature": 9.4,
            "pressureMb": 1014,
            "humidity": 67,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 40,
            "forecastDate": "2024-11-26T02:00:00.000Z",
            "temperature": 9.2,
            "pressureMb": 1014,
            "humidity": 59,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 29,
            "forecastDate": "2024-11-26T03:00:00.000Z",
            "temperature": 8.9,
            "pressureMb": 1014,
            "humidity": 57,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 35,
            "forecastDate": "2024-11-26T04:00:00.000Z",
            "temperature": 8.7,
            "pressureMb": 1014,
            "humidity": 61,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/353.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 39,
            "forecastDate": "2024-11-26T05:00:00.000Z",
            "temperature": 8.5,
            "pressureMb": 1014,
            "humidity": 57,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 38,
            "forecastDate": "2024-11-26T06:00:00.000Z",
            "temperature": 8.6,
            "pressureMb": 1014,
            "humidity": 50,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 41,
            "forecastDate": "2024-11-26T07:00:00.000Z",
            "temperature": 7.7,
            "pressureMb": 1014,
            "humidity": 47,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/116.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 44,
            "forecastDate": "2024-11-26T08:00:00.000Z",
            "temperature": 6.5,
            "pressureMb": 1015,
            "humidity": 50,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/116.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 42,
            "forecastDate": "2024-11-26T09:00:00.000Z",
            "temperature": 6.3,
            "pressureMb": 1015,
            "humidity": 59,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 43,
            "forecastDate": "2024-11-26T10:00:00.000Z",
            "temperature": 6.3,
            "pressureMb": 1015,
            "humidity": 65,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 45,
            "forecastDate": "2024-11-26T11:00:00.000Z",
            "temperature": 5.7,
            "pressureMb": 1015,
            "humidity": 73,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/353.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 46,
            "forecastDate": "2024-11-26T12:00:00.000Z",
            "temperature": 5.6,
            "pressureMb": 1015,
            "humidity": 74,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 49,
            "forecastDate": "2024-11-26T13:00:00.000Z",
            "temperature": 5.4,
            "pressureMb": 1015,
            "humidity": 78,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 48,
            "forecastDate": "2024-11-26T14:00:00.000Z",
            "temperature": 6.1,
            "pressureMb": 1015,
            "humidity": 61,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/266.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 47,
            "forecastDate": "2024-11-26T15:00:00.000Z",
            "temperature": 5.5,
            "pressureMb": 1014,
            "humidity": 60,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/353.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 51,
            "forecastDate": "2024-11-26T16:00:00.000Z",
            "temperature": 4.8,
            "pressureMb": 1014,
            "humidity": 67,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/317.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 52,
            "forecastDate": "2024-11-26T17:00:00.000Z",
            "temperature": 5.3,
            "pressureMb": 1013,
            "humidity": 58,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/362.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 50,
            "forecastDate": "2024-11-26T18:00:00.000Z",
            "temperature": 5.5,
            "pressureMb": 1013,
            "humidity": 47,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 54,
            "forecastDate": "2024-11-26T19:00:00.000Z",
            "temperature": 4.9,
            "pressureMb": 1012,
            "humidity": 54,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/362.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 53,
            "forecastDate": "2024-11-26T20:00:00.000Z",
            "temperature": 5.1,
            "pressureMb": 1011,
            "humidity": 58,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/182.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 55,
            "forecastDate": "2024-11-26T21:00:00.000Z",
            "temperature": 3.9,
            "pressureMb": 1011,
            "humidity": 77,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/371.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 57,
            "forecastDate": "2024-11-26T22:00:00.000Z",
            "temperature": 4.3,
            "pressureMb": 1010,
            "humidity": 74,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/317.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 61,
            "forecastDate": "2024-11-26T23:00:00.000Z",
            "temperature": 5.4,
            "pressureMb": 1010,
            "humidity": 51,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 56,
            "forecastDate": "2024-11-27T00:00:00.000Z",
            "temperature": 4.8,
            "pressureMb": 1011,
            "humidity": 55,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/176.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 60,
            "forecastDate": "2024-11-27T01:00:00.000Z",
            "temperature": 4.2,
            "pressureMb": 1011,
            "humidity": 61,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/362.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 59,
            "forecastDate": "2024-11-27T02:00:00.000Z",
            "temperature": 5.3,
            "pressureMb": 1011,
            "humidity": 52,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/317.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 58,
            "forecastDate": "2024-11-27T03:00:00.000Z",
            "temperature": 5.6,
            "pressureMb": 1010,
            "humidity": 51,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/362.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 64,
            "forecastDate": "2024-11-27T04:00:00.000Z",
            "temperature": 5.7,
            "pressureMb": 1010,
            "humidity": 47,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/317.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 63,
            "forecastDate": "2024-11-27T05:00:00.000Z",
            "temperature": 5.8,
            "pressureMb": 1009,
            "humidity": 48,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/362.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 65,
            "forecastDate": "2024-11-27T06:00:00.000Z",
            "temperature": 4.1,
            "pressureMb": 1010,
            "humidity": 71,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/317.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 62,
            "forecastDate": "2024-11-27T07:00:00.000Z",
            "temperature": 4,
            "pressureMb": 1010,
            "humidity": 66,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/362.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 66,
            "forecastDate": "2024-11-27T08:00:00.000Z",
            "temperature": 3.7,
            "pressureMb": 1011,
            "humidity": 67,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/day/230.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 67,
            "forecastDate": "2024-11-27T09:00:00.000Z",
            "temperature": 3.7,
            "pressureMb": 1011,
            "humidity": 68,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/230.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 68,
            "forecastDate": "2024-11-27T10:00:00.000Z",
            "temperature": 3.8,
            "pressureMb": 1011,
            "humidity": 70,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/230.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 70,
            "forecastDate": "2024-11-27T11:00:00.000Z",
            "temperature": 3.8,
            "pressureMb": 1012,
            "humidity": 73,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/230.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 69,
            "forecastDate": "2024-11-27T12:00:00.000Z",
            "temperature": 3.8,
            "pressureMb": 1012,
            "humidity": 76,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/371.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 71,
            "forecastDate": "2024-11-27T13:00:00.000Z",
            "temperature": 3.6,
            "pressureMb": 1012,
            "humidity": 85,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/338.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        },
        {
            "id": 72,
            "forecastDate": "2024-11-27T14:00:00.000Z",
            "temperature": 3.9,
            "pressureMb": 1012,
            "humidity": 80,
            "weatherImg": "cdn.weatherapi.com/weather/64x64/night/371.png",
            "createdAt": "2024-11-25T13:17:10.000Z",
            "updatedAt": "2024-11-25T13:17:10.000Z"
        }

    ]
    
    # 전체 데이터를 한 번에 요청
    try:
        result = make_prediction_request(input_data_list)
        print(f"예측 완료: prediction_results.json 확인")
    except Exception as e:
        print(f"결과 처리 중 오류 발생: {e}")
    
    end_time = time.time()
    print(f"소요 시간: {end_time - start_time:.2f}초")
    
    # 결과 파일 저장
    with open("prediction_results.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    return result

if __name__ == "__main__":
    print("테스트 시작...")
    results = run_tests()