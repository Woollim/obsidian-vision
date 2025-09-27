# Text Vision (OCR) – Obsidian 플러그인

<video width="600" controls>
  <source src="assets/usage-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

👉 Read this in [English](README.md).

## 작성자
Maintained by [Woollim](https://github.com/Woollim).

Text Vision은 Obsidian에서 카메라 기반 광학 문자 인식(OCR)을 제공하는 플러그인입니다. 리본 아이콘이나 명령 팔레트에서 캡처 흐름을 시작해 이미지를 촬영하거나 선택하고, 인식된 텍스트를 곧바로 노트에 기록하세요.

## 주요 기능
- 시스템 파일 선택기를 활용하는 카메라 친화적 캡처 모달 (지원되는 모바일 환경에서는 카메라가 즉시 열립니다).
- 추출된 텍스트를 활성 노트에 추가, 선택 영역 교체, `Text Vision (yyyy-MM-dd-HH-mm-ss).md` 새 노트 생성 중 원하는 방식으로 삽입합니다.
- 기본으로 포함된 오프라인 Tesseract 엔진과 Google Cloud Vision API 가운데 원하는 OCR 엔진을 선택할 수 있습니다 (후자는 API 키 필요).
- 캡처한 이미지를 볼트 내 폴더에 저장하고 저장 위치를 직접 지정할 수 있습니다.
- 영어와 한국어 UI를 지원하며, 리본 아이콘과 명령 팔레트 항목(`사진 촬영 후 텍스트 추출`)으로 빠르게 접근할 수 있습니다.
- 설정 탭에서 설정 안내 버튼을 눌러 Google Vision API 키 발급 절차를 바로 확인할 수 있습니다.

## 요구 사항
- Obsidian 0.15.0 이상
- Google Vision을 사용할 때에만 인터넷 연결이 필요하며, 기본 Tesseract 모드는 로컬에서 실행됩니다.

## 사용 방법
- 리본 아이콘: 좌측 리본의 카메라 아이콘을 눌러 캡처 모달을 연 뒤 이미지를 촬영하거나 선택합니다.
- 명령 팔레트: `Ctrl/Cmd+P`로 명령 팔레트를 열고 `사진 촬영 후 텍스트 추출` 명령을 실행하면 동일한 모달이 열립니다.
- OCR이 완료되면 알림이 표시되고, 인식된 텍스트는 선택한 삽입 모드에 따라 노트에 기록됩니다.

### 텍스트 삽입 모드
- `현재 문서 끝에 추가`: 현재 마크다운 문서 맨 아래에 두 줄 공백과 함께 인식된 텍스트를 추가합니다.
- `현재 선택 영역 교체`: 선택한 텍스트를 교체하거나 선택 영역이 없으면 전체 노트를 덮어씁니다.
- `새 노트로 생성`: `Text Vision (yyyy-MM-dd-HH-mm-ss).md` 새 노트를 생성하고 인식된 텍스트를 작성한 뒤 새 창에서 엽니다.

## 설정 요약
- 언어 – 플러그인 UI 언어를 한국어/영어 중에서 선택합니다.
- OCR 엔진 – `Tesseract (Offline)` 또는 `Google Vision API (Online)`을 선택합니다. Tesseract는 로컬에서 동작하지만 인식 품질이 낮으므로 제대로 된 OCR을 원한다면 Google Vision을 사용하세요.
- Google Vision API 키 – Google Vision을 선택했을 때 표시되며 요청에 사용할 API 키를 저장합니다. 설정 탭의 설정 안내 버튼을 누르거나 아래 단계를 따라 진행하세요.
  1. [Google Cloud Console](https://console.cloud.google.com/)에 로그인해 OCR에 사용할 프로젝트를 새로 만들거나 기존 프로젝트를 선택합니다.
  2. 프로젝트에 결제 계정이 연결되어 있는지 확인합니다. Vision API는 무료 할당량을 사용하더라도 결제 계정이 필요합니다.
  3. APIs & Services → Library로 이동해 *Vision API*를 검색한 뒤 Enable을 눌러 활성화합니다.
  4. APIs & Services → Credentials에서 Create credentials → API key를 선택해 API 키를 생성하고 복사합니다.
  5. (권장) Restrict key를 눌러 Vision API로 사용 범위를 제한하고, 사용하는 디바이스에 맞게 애플리케이션 제한을 설정합니다.
  6. Text Vision 설정의 Google Vision API 키 입력란에 키를 붙여넣고 Save를 눌러 저장합니다.
- 텍스트 삽입 모드 – OCR 결과를 노트에 적용하는 방식을 결정합니다.
- 캡처 이미지 저장 – 캡처한 이미지를 볼트에 저장할지 여부를 토글합니다.
- 이미지 저장 폴더 – 저장 폴더 경로를 직접 입력하거나 자동 완성 목록에서 선택합니다(기본값은 `vision-images`).

## OCR 엔진 안내
- Tesseract (기본값) – 플러그인에 포함된 `tesseract.js`를 사용합니다. 오프라인으로 동작하지만 손글씨나 조명이 좋지 않은 사진에서는 정확도가 낮습니다.
- Google Vision API – 촬영한 이미지를 Google Cloud Vision에 전송해 인식합니다. 유효한 API 키와 네트워크 연결이 필요하지만, 가장 안정적인 인식 품질을 제공합니다.

## 이미지 저장
- 캡처 이미지 저장을 활성화하면 캡처한 이미지가 지정한 폴더에 `image-vision-(yyyy-MM-dd-HH-mm-ss).<확장자>` 형식으로 저장됩니다.
- 폴더가 없으면 플러그인이 자동으로 생성합니다.

## 개발 메모
- 소스 코드는 `src/` 디렉터리에서 명령, 기능, 지역화, 설정, 공용 타입 등으로 역할별 분리되어 있습니다.
- `tesseract.js`와 같은 무거운 의존성은 캡처 흐름을 실행할 때에만 동적으로 불러 초기 로딩을 가볍게 유지합니다.
- `package.json`에 정의된 npm 스크립트를 통해 esbuild로 번들을 생성합니다.

## 라이선스
[`LICENSE`](LICENSE)에 포함된 Obsidian 플러그인 라이선스를 따릅니다.
