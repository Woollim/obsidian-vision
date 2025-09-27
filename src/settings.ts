import { VisionSettings } from './types';

export const DEFAULT_SETTINGS: VisionSettings = {
	language: 'en', // Default to English
	googleVisionApiKey: '',
	insertionMode: 'append',
	ocrEngine: 'tesseract',
	flashMode: 'auto',
	saveCapturedImages: false,
	capturedImagesFolder: 'vision-images'
};
