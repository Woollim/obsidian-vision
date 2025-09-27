export interface VisionSettings {
	language: 'ko' | 'en';
	googleVisionApiKey: string;
	insertionMode: 'append' | 'replace' | 'new-note';
	ocrEngine: 'tesseract' | 'google-vision';
	flashMode: 'auto' | 'on' | 'off';
	saveCapturedImages: boolean;
	capturedImagesFolder: string;
}


export interface OCRResult {
	text: string;
	confidence?: number;
	error?: string;
}
