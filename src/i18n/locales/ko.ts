import type { Translation } from './en';

const ko: Translation = {
	// Language Settings
	languageSettings: "언어 설정",
	language: "언어",
	languageDesc: "플러그인 인터페이스의 언어를 선택하세요.",

	// Commands
	captureText: "카메라로 텍스트 추출",

	// Settings
	ocrSettings: "OCR 설정",
	ocrEngine: "OCR 엔진",
	ocrEngineDesc: "텍스트 추출에 사용할 OCR 엔진을 선택하세요.",
	tesseractOffline: "Tesseract (오프라인)",
	googleVisionOnline: "Google Vision API (온라인)",
	googleVisionApiKey: "Google Vision API 키",
	googleVisionApiKeyDesc: "Google Cloud Vision API 키를 입력하세요.",
	textInsertionSettings: "텍스트 삽입 설정",
	textInsertionMode: "텍스트 삽입 모드",
	textInsertionModeDesc: "추출된 텍스트를 어떻게 삽입할지 선택하세요.",
	appendToNote: "현재 문서 끝에 추가",
	replaceSelection: "현재 선택 영역 교체",
	createNewNote: "새 노트로 생성 (format: Text Vision(yyyy-MM-dd-hh-mm-ss).md)",
	imageStorageSettings: "이미지 저장 설정",
	saveCapturedImages: "캡처된 이미지 저장",
	saveCapturedImagesDesc: "OCR 처리에 사용된 이미지를 볼트에 저장합니다 (format: vision-image-yyyy-MM-dd-hh-mm-ss.jpg).",
	imageStorageFolder: "이미지 저장 폴더",
	imageStorageFolderDesc: "캡처된 이미지를 저장할 폴더 경로를 지정하세요.",

	// Processing
	textExtractionProcessing: "♻️ 텍스트 추출 중...",

	// Success Notices
	textExtractionComplete: "✅ 텍스트 추출이 완료되었습니다!",

	// Error Notices
	inactiveDocumentError: "❌ 활성 문서가 없습니다.",
	newNoteCreationFailureError: "❌ 새 노트 생성 실패",
	textNotFoundError: "❌ 텍스트를 찾을 수 없습니다",
	ocrProcessingError: "❌ OCR 처리 중 오류가 발생했습니다",
	invalidImageFileError: "❌ 이미지 파일을 선택해주세요.",
	fileReadError: "❌ 파일 읽기 실패",
	invalidOcrEngineError: "❌ OCR 엔진 설정이 올바르지 않습니다.",
	tesseractError: "❌ Tesseract OCR 오류",
	googleVisionApiError: "❌ Google Vision API 오류",
	unknownError: "❌ 알 수 없는 오류",
};

export default ko;
