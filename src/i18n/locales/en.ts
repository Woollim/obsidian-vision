const en = {
	// Language Settings
	languageSettings: "Language Settings",
	language: "Language",
	languageDesc: "Select the language for the plugin interface.",

	// Commands
	captureText: "OCR text with camera",

	// Settings
	ocrSettings: "OCR Settings",
	ocrEngine: "OCR Engine",
	ocrEngineDesc: "Select the OCR engine to use for text extraction.",
	tesseractOffline: "Tesseract (Offline)",
	googleVisionOnline: "Google Vision API (Online)",
	googleVisionApiKey: "Google Vision API Key",
	googleVisionApiKeyDesc: "Enter your Google Cloud Vision API key.",
	textInsertionSettings: "Text Insertion Settings",
	textInsertionMode: "Text Insertion Mode",
	textInsertionModeDesc: "Choose how to insert the extracted text.",
	appendToNote: "Append to current document",
	replaceSelection: "Replace current selection",
	createNewNote: "Create new note (format: Text Vision(yyyy-MM-dd-hh-mm-ss).md)",
	imageStorageSettings: "Image Storage Settings",
	saveCapturedImages: "Save captured images",
	saveCapturedImagesDesc: "Save images used for OCR processing to the vault (format: vision-image-yyyy-MM-dd-hh-mm-ss.jpg).",
	imageStorageFolder: "Image storage folder",
	imageStorageFolderDesc: "Specify the folder path to save captured images.",

	// Processing
	textExtractionProcessing: "♻️ Extracting text...",

	// Success Notices
	textExtractionComplete: "✅ Text extraction completed!",

	// Error Notices
	inactiveDocumentError: "❌ No active document.",
	newNoteCreationFailureError: "❌ Failed to create new note",
	textNotFoundError: "❌ No text found",
	ocrProcessingError: "❌ An error occurred during OCR processing",
	invalidImageFileError: "❌ Please select an image file.",
	fileReadError: "❌ Failed to read file",
	invalidOcrEngineError: "❌ OCR engine configuration is invalid.",
	tesseractError: "❌ Tesseract OCR error",
	googleVisionApiError: "❌ Google Vision API error",
	unknownError: "❌ Unknown error"
};

export type Translation = typeof en;

export default en;
