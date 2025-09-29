import { requestUrl } from 'obsidian';
import { OCRResult } from '../types';
import { t } from '../i18n';

export async function extractTextFromImage(imageDataUrl: string, provider: 'tesseract' | 'google-vision' = 'tesseract', apiKey?: string): Promise<OCRResult> {
	if (provider === 'tesseract') {
		return extractWithTesseract(imageDataUrl);
	} else if (provider === 'google-vision' && apiKey) {
		return extractWithGoogleVision(imageDataUrl, apiKey);
	} else {
		const translation = t();
		return {
			text: '',
			error: translation.invalidOcrEngineError
		};
	}
}

async function extractWithTesseract(imageDataUrl: string): Promise<OCRResult> {
	try {
		// Tesseract.js 사용 (브라우저에서 동작)
		const { createWorker } = await import('tesseract.js');
		const worker = await createWorker({
			logger: m => console.log(m)
		});
		
		await worker.loadLanguage('kor+eng');
		await worker.initialize('kor+eng');
		
		const { data: { text, confidence } } = await worker.recognize(imageDataUrl);
		await worker.terminate();
		
		return {
			text: text.trim(),
			confidence
		};
	} catch (error) {
		const translation = t();
		const message = error instanceof Error ? error.message : translation.unknownError;
		return {
			text: '',
			error: `${translation.tesseractError}: ${message}`
			};
	}
}

async function extractWithGoogleVision(imageDataUrl: string, apiKey: string): Promise<OCRResult> {
	try {
		// Base64 데이터에서 헤더 제거
		const base64Image = imageDataUrl.replace(/^data:image\/[a-z]+;base64,/, '');
		
		const response = await requestUrl({
			url: `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				requests: [{
					image: {
						content: base64Image
					},
					features: [{
						type: 'TEXT_DETECTION',
						maxResults: 1
					}]
				}]
			})
		});

		const result = await response.json();
		
		if (result.responses && result.responses[0] && result.responses[0].textAnnotations) {
			const text = result.responses[0].textAnnotations[0].description;
			return {
				text: text.trim()
			};
		} else {
			const translation = t();
			return {
				text: '',
				error: translation.textNotFoundError
			};
		}
	} catch (error) {
		const translation = t();
		const message = error instanceof Error ? error.message : translation.unknownError;
		return {
			text: '',
			error: `${translation.googleVisionApiError}: ${message}`
		};
	}
}
