import { App, PluginSettingTab, Setting, TFolder } from 'obsidian';
import VisionPlugin from '../main';
import { setLanguage, t } from '../i18n';

export class VisionSettingTab extends PluginSettingTab {
	plugin: VisionPlugin;

	constructor(app: App, plugin: VisionPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private getAllFolderPaths(): string[] {
		const folders: string[] = [];
		
		// 루트 폴더 추가
		folders.push('');
		
		// 모든 폴더를 재귀적으로 가져오기
		const addFolderRecursively = (folder: TFolder) => {
			folders.push(folder.path);
			folder.children.forEach(child => {
				if (child instanceof TFolder) {
					addFolderRecursively(child);
				}
			});
		};

		// 볼트의 루트에서 시작
		this.app.vault.getRoot().children.forEach(child => {
			if (child instanceof TFolder) {
				addFolderRecursively(child);
			}
		});

		return folders.sort();
	}

	display(): void {
		const { containerEl } = this;
		const translation = t();
		// 섹션 추가 전 모두 비우기
		containerEl.empty();

		// Language Settings Section - 언어 설정 섹션
		containerEl.createEl('h3', { text: translation.languageSettings });

		new Setting(containerEl)
			.setName(translation.language)
			.setDesc(translation.languageDesc)
			.addDropdown(dropdown => dropdown
				.addOption('en', 'English')
				.addOption('ko', '한국어')
				.setValue(this.plugin.settings.language)
				.onChange(async (value: 'ko' | 'en') => {
					this.plugin.settings.language = value;
					await this.plugin.saveSettings();
					setLanguage(value);
					this.display(); // UI 재구성
				}));

		// OCR 설정 섹션
		containerEl.createEl('h3', { text: translation.ocrSettings });

		new Setting(containerEl)
			.setName(translation.ocrEngine)
			.setDesc(translation.ocrEngineDesc)
			.addDropdown(dropdown => dropdown
				.addOption('tesseract', translation.tesseractOffline)
				.addOption('google-vision', translation.googleVisionOnline)
				.setValue(this.plugin.settings.ocrEngine)
				.onChange(async (value: 'tesseract' | 'google-vision') => {
					this.plugin.settings.ocrEngine = value;
					await this.plugin.saveSettings();
					this.display(); // 설정에 따라 UI 재구성
				}));

		if (this.plugin.settings.ocrEngine === 'google-vision') {
			new Setting(containerEl)
				.setName(translation.googleVisionApiKey)
				.setDesc(translation.googleVisionApiKeyDesc)
				.addText(text => text
					.setPlaceholder(translation.googleVisionApiKeyDesc)
					.setValue(this.plugin.settings.googleVisionApiKey)
					.onChange(async (value) => {
						this.plugin.settings.googleVisionApiKey = value;
						await this.plugin.saveSettings();
					}));
		}

		// 텍스트 삽입 설정 섹션
		containerEl.createEl('h3', { text: translation.textInsertionSettings });

		new Setting(containerEl)
			.setName(translation.textInsertionMode)
			.setDesc(translation.textInsertionModeDesc)
			.addDropdown(dropdown => dropdown
				.addOption('append', translation.appendToNote)
				.addOption('replace', translation.replaceSelection)
				.addOption('new-note', translation.createNewNote)
				.setValue(this.plugin.settings.insertionMode)
				.onChange(async (value: 'append' | 'replace' | 'new-note') => {
					this.plugin.settings.insertionMode = value;
					await this.plugin.saveSettings();
				}));

		// 이미지 저장 설정 섹션
		containerEl.createEl('h3', { text: translation.imageStorageSettings });

		new Setting(containerEl)
			.setName(translation.saveCapturedImages)
			.setDesc(translation.saveCapturedImagesDesc)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.saveCapturedImages)
				.onChange(async (value) => {
					this.plugin.settings.saveCapturedImages = value;
					await this.plugin.saveSettings();
					this.display(); // UI 재구성
				}));

		if (this.plugin.settings.saveCapturedImages) {
			new Setting(containerEl)
				.setName(translation.imageStorageFolder)
				.setDesc(translation.imageStorageFolderDesc)
				.addText(text => {
					const input = text
						.setPlaceholder('folder path')
						.setValue(this.plugin.settings.capturedImagesFolder)
						.onChange(async (value) => {
							this.plugin.settings.capturedImagesFolder = value;
							await this.plugin.saveSettings();
						});

					// datalist를 사용한 자동완성 구현
					const datalistId = 'folder-suggestions';
					let datalist = containerEl.querySelector(`#${datalistId}`) as HTMLDataListElement;
					
					if (!datalist) {
						datalist = containerEl.createEl('datalist');
						datalist.id = datalistId;
					}
					
					// 기존 옵션들 제거
					datalist.empty();
					
					// 모든 폴더 경로를 옵션으로 추가
					const folders = this.getAllFolderPaths();
					folders.forEach(folderPath => {
						const option = datalist.createEl('option');
						option.value = folderPath;
						option.textContent = folderPath || '(Root folder)';
					});
					
					// input에 list 속성 추가
					input.inputEl.setAttribute('list', datalistId);
					
					return input;
				});
		}
	}
}
