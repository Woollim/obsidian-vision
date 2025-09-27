# Obsidian Text Vision – OCR 카메라
👉 Read this in [English](README.md).

Obsidian Text Vision 플러그인은 Obsidian에서 카메라 기반 광학 문자 인식(OCR)을 제공합니다. 리본 아이콘이나 명령 팔레트에서 카메라 모달을 열어 텍스트가 포함된 이미지를 촬영하거나 선택한 뒤, 인식된 텍스트를 곧바로 노트에 삽입할 수 있습니다.

## 주요 기능
- 데스크톱과 모바일에서 동작하는 카메라 모달을 통해 이미지를 촬영하거나 선택하고 텍스트를 추출합니다(디바이스에서 제공하는 파일/카메라 선택기를 사용).
- 추출된 텍스트를 현재 노트에 추가, 선택 영역 교체, 신규 노트 생성 중 원하는 방식으로 삽입합니다.
- 기본 오프라인 엔진인 Tesseract와 Google Cloud Vision API 가운데 원하는 OCR 공급자를 선택할 수 있습니다.
- 설정 탭에서 한국어/영어 UI를 전환할 수 있습니다.
- 리본 아이콘과 명령 팔레트 항목(`Capture and extract text`)으로 카메라 워크플로에 빠르게 접근합니다.

## 요구 사항
- Obsidian 0.15.0 이상.
- 개발 빌드를 위해서는 Node.js 18 이상과 npm이 필요합니다.
- Google Vision을 사용할 때에만 인터넷 연결이 필요하며, 기본 Tesseract 모드는 로컬에서 실행됩니다.

## 설치 방법
**수동 설치**
1. `npm run build`를 실행해 `main.js`를 생성합니다.
2. `main.js`, `manifest.json`, `styles.css`(선택 사항)을 볼트의 `<Vault>/.obsidian/plugins/text-vision/` 경로에 복사합니다.
3. Obsidian을 다시 불러온 뒤 **설정 → 커뮤니티 플러그인**에서 **Obsidian Text Vision** 플러그인을 활성화합니다.

**개발 환경 구성**
1. `npm install`로 의존성을 설치합니다.
2. 개발 중에는 `npm run dev`(watch 모드), 배포용 번들은 `npm run build`를 사용합니다.
3. 진입점은 `src/main.ts`이며 esbuild가 번들을 `main.js`로 출력합니다.

## 사용 방법
- **리본 아이콘**: 좌측 리본의 카메라 아이콘을 눌러 모달을 열고 이미지를 촬영하거나 선택합니다.
- **명령 팔레트**: `Ctrl/Cmd+P`로 명령 팔레트를 열고 `Capture and extract text`를 실행하면 동일한 모달이 열립니다.
- OCR이 완료되면 알림이 표시되고, 인식된 텍스트는 선택한 삽입 모드에 따라 노트에 기록됩니다.

### 텍스트 삽입 모드
- `Append to current document`: 현재 마크다운 문서 맨 아래에 두 줄 공백과 함께 인식된 텍스트를 추가합니다.
- `Replace current selection`: 선택한 텍스트를 교체하거나 선택 영역이 없으면 전체 노트를 덮어씁니다.
- `Create new note`: `OCR-<timestamp>.md` 이름의 새 노트를 생성하고 인식된 텍스트를 작성한 뒤 새 창에서 엽니다.

## 설정 요약
- **Language** – 플러그인 UI 언어를 한국어/영어 중에서 선택합니다.
- **OCR provider** – `Tesseract (Offline)` 또는 `Google Vision API (Online)`을 선택하며, Google Vision 사용 시 API 키를 입력해야 합니다.
- **Text insertion** – OCR 결과를 노트에 적용하는 방식을 결정합니다.
- **Camera options** – 자동 초점, 이미지 품질 값은 향후 기능을 위해 저장되지만 현재 캡처 흐름에는 아직 반영되지 않습니다.
- **Image storage** – OCR에 사용한 이미지를 저장할 폴더를 입력할 수 있는 토글입니다. 해당 저장 기능은 아직 구현되지 않았지만 값은 향후 버전을 위해 보존됩니다.

## OCR 공급자 안내
- **Tesseract (기본값)** – 플러그인에 포함된 `tesseract.js`를 사용합니다. 오프라인으로 동작하며 한국어+영어(`kor+eng`) 데이터를 불러옵니다. 초기 실행 시 워커 초기화에 시간이 조금 걸릴 수 있습니다.
- **Google Vision API** – 촬영한 이미지를 Google Cloud Vision에 전송해 인식합니다. 유효한 API 키와 네트워크 연결이 필요하며, 발생한 오류는 Obsidian 알림으로 표시됩니다.

## 알려진 제한 사항
- 카메라 캡처는 브라우저가 제공하는 파일 선택기에 의존합니다. 데스크톱에서는 파일 다이얼로그가 열리고, 모바일 브라우저에서는 디바이스 카메라를 직접 호출할 수 있습니다.
- 자동 초점, 이미지 품질, 이미지 저장 설정은 현재 자리 표시자이며 추후 업데이트에서 적용될 예정입니다.

## 개발 메모
- 소스 코드는 `src/` 디렉터리에서 명령, UI, 유틸리티, 지역화, 설정 등 역할별로 분리되어 있습니다.
- `tesseract.js`와 같은 무거운 의존성은 필요할 때만 동적으로 불러 초기 로딩 시간을 최소화합니다.

## 작성자
[woollim](https://github.com/woollim) with Codex, Claude

## 라이선스
[`LICENSE`](LICENSE)에 포함된 Obsidian 플러그인 라이선스를 따릅니다.
