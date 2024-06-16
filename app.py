from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image

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
        # 이미지 파일을 PIL 형식으로 읽기
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))

        # 이미지 전처리
        img = img.resize((224, 224))  # 모델에 맞는 입력 크기로 조정
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # 모델 입력에 맞게 정규화

        # 예측 수행
        predictions = model.predict(img_array)
        predicted_class = class_labels[np.argmax(predictions[0])]

        return JSONResponse(content={"prediction": predicted_class})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

