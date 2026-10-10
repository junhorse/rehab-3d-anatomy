# 3D 모델 라이선스

이 폴더의 3D 모델 파일(*.glb)은 아래 원본을 변형한 것이며, 원본과 같은 **CC BY-SA** 조건으로 누구나 무료로 내려받고 재배포·변형할 수 있습니다.
이 서비스의 유료 이용권은 이 모델 파일이 아니라 서비스 고유 기능(검사 시범 동작, 강의자료 연동 분석, 학습 기능 등)에 대한 것입니다.

| 파일 | 원본 | 라이선스 | 변경 내용 |
|---|---|---|---|
| anatomy.glb, skeleton.glb | BodyParts3D © The Database Center for Life Science (BodyExplorer 경유). anatomy.glb 의 근육 일부는 Z-Anatomy | CC BY-SA 2.1 JP / CC BY-SA 4.0 | 메시 압축(meshopt), 좌표 변환 |
| extras.glb | BodyParts3D 원본 OBJ (천골, 추간판) | CC BY-SA 2.1 JP | 필요한 부위만 추출, 메시 압축 |
| za_bones.glb, za_joints.glb, za_nerves.glb | Z-Anatomy, Gauthier Kervyn | CC BY-SA 4.0 | 부위 선택, 삼각형 수 감소, BodyParts3D 좌표에 맞게 변형, 메시 압축 |

- BodyParts3D: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/ , 라이선스 https://creativecommons.org/licenses/by-sa/2.1/jp/
- Z-Anatomy: https://www.z-anatomy.com/ , https://github.com/LluisV/Z-Anatomy , 라이선스 https://creativecommons.org/licenses/by-sa/4.0/
- 내려받기: https://github.com/junhorse/rehab-3d-anatomy/tree/gh-pages/models

압축된 파일은 three.js `GLTFLoader` 에 `MeshoptDecoder` 를 연결하면 열 수 있습니다.
