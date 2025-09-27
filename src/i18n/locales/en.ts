const en = {
	// Language Settings
	languageSettings: "Language Settings",
	language: "Language",
	languageDesc: "Select the language for the plugin interface.",

	// Commands
	captureText: "Take photo and extract text",

	// Settings
	ocrSettings: "OCR Settings",
	ocrEngine: "OCR Engine",
	ocrEngineDesc: "Select the OCR engine to use for text extraction.",
	tesseractOffline: "Tesseract (Offline)",
	googleVisionOnline: "Google Vision API (Online)",
	googleVisionApiKey: "Google Vision API Key",
	googleVisionApiKeyDesc: "Enter your Google Cloud Vision API key.",
	googleVisionApiSetUp: "Google Vision setup guide",
	googleVisionApiSetUpDesc: "Step-by-step instructions for configuring the Google Vision API.",
	openSetup: "View guide",
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

	// Setup guide
	googleVisionApiSetUpGuideTitle: "Configure Google Vision API",
	googleVisionApiSetUpGuideSteps: [
		"Sign in to the Google Cloud Console and create or select a project dedicated to OCR.",
		"Verify that billing is enabled for the project; Vision API calls require an active billing account even when using the free tier.",
		"Navigate to APIs & Services → Library, search for Vision API, and select Enable.",
		"Open APIs & Services → Credentials, click Create credentials, and choose API key.",
		"Copy the generated key. Optionally use the Restrict key dialog to limit usage to the Vision API and your Obsidian desktop or mobile clients.",
		"Paste the key into Text Vision's settings under Google Vision API key and save.",
	],
	googleVisionApiSetUpTipsTitle: "Tips",
	googleVisionApiSetUpTips: [
		"Revoke and regenerate the key if it is exposed or you change projects.",
		"Charges accrue per Vision API request after the free tier; monitor usage from APIs & Services → Dashboard.",
	],
	googleVisionApiSetUpDocsLabel: "Open Google Cloud Vision setup docs",
	googleVisionApiSetUpDocsUrl: "https://cloud.google.com/vision/docs/setup",

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
