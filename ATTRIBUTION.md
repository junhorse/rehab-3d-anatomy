# 출처와 라이선스

## 코드
- **BodyExplorer**, Johan Bellander, MIT License: https://github.com/JohanBellander/BodyExplorer
  - `src/vendor/muscleData.js`와 `src/vendor/bodyBuilder.js`는 원본을 복사한 것이다(`tools/setup.sh`).
  - 원본에서 바꾼 부분:
    - muscleData.js: `ANATOMY_DB` export를 추가했다.
    - bodyBuilder.js: GLB 경로를 `models/` 아래로 바꾸고, `bodyGroup.userData.anatomyCenter`와 `boneMesh.userData.rawName`을 노출하도록 했다.

- **ONNX Runtime Web**, Microsoft, MIT License: https://github.com/microsoft/onnxruntime
  - 그림 속 글자 인식(`src/ocr/`)을 브라우저에서 돌리는 실행기. npm `onnxruntime-web`(버전 고정), wasm 은 빌드가 그대로 내보낸다.
- **PaddleOCR** 모델(PP-OCRv4 검출 mobile, PP-OCRv5 한국어 인식 mobile)과 한국어 글자표, PaddlePaddle Authors, Apache License 2.0: https://github.com/PaddlePaddle/PaddleOCR
  - ONNX 변환본은 **RapidOCR**(RapidAI, Apache License 2.0, v3.9.2): https://github.com/RapidAI/RapidOCR . 파일은 바꾸지 않고 `public/ocr/det.onnx`, `rec_korean.onnx`, `rec_korean_dict.txt` 로 이름만 바꿔 둔다(`tools/setup_ocr.sh`, SHA256 확인).
  - 전·후처리(`src/ocr/pipeline.js`)는 RapidOCR 의 규칙을 참고해 이 프로젝트에서 새로 쓴 것이다.

## 3D 데이터
- **BodyParts3D**, © The Database Center for Life Science, CC BY-SA 2.1 Japan: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/
  - `public/models/anatomy.glb`와 `skeleton.glb`(BodyExplorer를 거쳐 가져옴), 그리고 `public/models/extras.glb`(천골과 추간판, `tools/build_extras.py`로 원본 OBJ에서 변환).
- **Z-Anatomy**, Gauthier Kervyn, CC BY-SA 4.0: https://www.z-anatomy.com/
  - anatomy.glb 안의 근육 mesh 66개가 여기서 왔다.
  - `public/models/za_joints.glb`, `za_nerves.glb`, `za_bones.glb`는 Z-Anatomy FBX(https://github.com/LluisV/Z-Anatomy)를 `tools/build_zanatomy.mjs`로 변환한 것이다. 삼각형 수를 줄이고 BodyParts3D 좌표에 맞게 변형했다.

## 텍스트
- `public/data/za_ko.json`: 구조물 이름(Z-Anatomy 영문명)의 한국어 명칭과 부착·기능·임상 요약. 요약 문장은 이 프로젝트에서 새로 쓴 것이며 Z-Anatomy 설명문의 번역이 아니다.
- `public/data/info_ko.json`: BodyExplorer `ANATOMY_DB`(MIT, 영문 기시·정지·작용·신경)를 한국어 해부학 용어로 옮긴 것이다. MIT 고지는 위 BodyExplorer 항목으로 갈음한다.
- `public/data/terms.json` 의 `exams`(검사 설명)와 `src/exam/*`(마네킹·검사 시범 동작)은 이 프로젝트 고유 저작물이며 CC BY-SA 대상이 아니다(All rights reserved). `reviewed` 는 내부 검토 여부 기록용이며 화면에는 표시하지 않는다.

## 배포물의 라이선스 구분
- 3D 모델(`public/models/*.glb`): CC BY-SA. 배포 사이트의 `models/LICENSE.md`에 원본, 변경 내역과 다운로드 위치를 적어 두었다. 유료화하더라도 모델 파일 자체는 무료로 공개해 둔다.
- 그 밖의 코드와 콘텐츠: 운영자 권리. 빌드 결과만 배포하고 소스는 공개하지 않는다.
