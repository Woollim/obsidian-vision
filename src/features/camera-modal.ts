import { App, Notice } from 'obsidian';
import { extractTextFromImage } from './ocr';
import { VisionSettings } from '../types';
import { t } from '../i18n';
import { generateImageFileName } from './filename-generator';

export class CameraCapture {
	private app: App;
	private settings: VisionSettings;
	private onSuccess: (text: string) => void;
	private fileInput: HTMLInputElement | null = null;
	private isProcessing = false;

	constructor(app: App, settings: VisionSettings, onSuccess: (text: string) => void) {
		this.app = app;
		this.settings = settings;
		this.onSuccess = onSuccess;
	}

	public trigger() {
		if (this.isProcessing) {
			return;
		}

		// 파일 입력 생성 (숨김)
		this.fileInput = document.createElement('input');
		this.fileInput.type = 'file';
		this.fileInput.accept = 'image/*';
		this.fileInput.capture = 'camera'; // 모바일에서 카메라 직접 열기
		this.fileInput.className = 'vision-hidden-file-input';

		this.fileInput.addEventListener('change', (event) => {
			this.handleFileCapture(event as Event);
		});

		// 문서에 추가하고 클릭
		document.body.appendChild(this.fileInput);
		this.fileInput.click();
	}

	private async handleFileCapture(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		
		if (!file) {
			this.cleanup();
			return;
		}

		const translation = t();

		// 이미지 파일인지 확인
		if (!file.type.startsWith('image/')) {
			new Notice(translation.invalidImageFileError);
			this.cleanup();
			return;
		}

		// 즉시 OCR 처리 시작
		this.isProcessing = true;
		new Notice(`📄 ${translation.textExtractionProcessing}`);

		try {
			// 파일을 Data URL로 변환
			const imageDataUrl = await this.fileToDataURL(file);
			
			// 이미지 저장 (설정이 활성화된 경우)
			if (this.settings.saveCapturedImages) {
				await this.saveImageToVault(file);
			}
			
			// OCR 처리
			console.log('OCR processing started...');
			const result = await extractTextFromImage(
				imageDataUrl,
				this.settings.ocrEngine,
				this.settings.googleVisionApiKey
			);

			if (result.error) {
				throw new Error(result.error);
			}

			if (result.text && result.text.trim()) {
				console.log('OCR result:', result.text);
				new Notice(translation.textExtractionComplete);
				this.onSuccess(result.text);
			} else {
				throw new Error(translation.textNotFoundError);
			}
		} catch (error) {
			console.error('OCR processing error:', error);
			new Notice(`${translation.ocrProcessingError}: ${error instanceof Error ? error.message : translation.unknownError}`);
		} finally {
			this.isProcessing = false;
			this.cleanup();
		}
	}

	private fileToDataURL(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const translation = t();
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				resolve(result);
			};
			reader.onerror = () => reject(new Error(translation.fileReadError));
			reader.readAsDataURL(file);
		});
	}

	private async saveImageToVault(file: File): Promise<void> {
		try {
			// 파일 확장자 확인
			const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
			const fileName = `${generateImageFileName()}.${fileExtension}`;
			
			// 폴더 경로 준비
			const folderPath = this.settings.capturedImagesFolder.trim() || 'vision-images';
			
			// 폴더가 존재하지 않으면 생성
			if (!await this.app.vault.adapter.exists(folderPath)) {
				await this.app.vault.createFolder(folderPath);
			}
			
			// 전체 파일 경로
			const fullPath = `${folderPath}/${fileName}`;
			
			// 파일을 ArrayBuffer로 변환
			const arrayBuffer = await file.arrayBuffer();
			
			// 볼트에 저장
			await this.app.vault.createBinary(fullPath, arrayBuffer);
			
			console.log(`Image saved: ${fullPath}`);
		} catch (error) {
			console.error('Failed to save image:', error);
			// 이미지 저장 실패는 OCR 처리를 방해하지 않도록 에러를 throw하지 않음
		}
	}

	private cleanup() {
		if (this.fileInput) {
			this.fileInput.remove();
			this.fileInput = null;
		}
	}
}
