from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import cv2
import io

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 origin 허용
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# 모델 및 클래스 레이블 로드
model = load_model('food_classification_model.h5')
class_labels = ['국밥', '돈카츠', '피자', '빵', '햄버거']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # 이미지 파일을 읽기
        contents = await file.read()
        np_arr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        if img is None:
            raise ValueError("이미지 파일을 읽는 데 실패했습니다.")
        
        # 이미지 전처리
        img = cv2.resize(img, (224, 224))  # 모델에 맞는 입력 크기로 조정
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # 모델 입력에 맞게 정규화

        # 예측 수행
        predictions = model.predict(img_array)
        predicted_class = class_labels[np.argmax(predictions[0])]

        return JSONResponse(content={"prediction": predicted_class})
    except Exception as e:
        print(f"Error: {str(e)}")  # 오류를 콘솔에 출력
        return JSONResponse(content={"error": str(e)}, status_code=500)

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=9999, log_level="debug",
                proxy_headers=True, reload=True)

