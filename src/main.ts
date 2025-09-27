import { Plugin } from 'obsidian';
import { VisionSettings } from './types';
import { DEFAULT_SETTINGS } from './settings';
import { registerCommands } from './commands';
import { VisionSettingTab } from './features/settings-tab';
import { setLanguage, t } from './i18n';

export default class VisionPlugin extends Plugin {
	settings: VisionSettings;
	ribbonIconEl: HTMLElement;

	async onload() {
		await this.loadSettings();

		// 명령어 등록
		registerCommands(this);

		// 설정 탭 추가
		this.addSettingTab(new VisionSettingTab(this.app, this));

		// 리본 아이콘 추가
		this.ribbonIconEl = this.addRibbonIcon('camera', t().captureText, () => {
			// 카메라 모달 직접 호출
			import('./features/camera-modal').then(({ CameraCapture }) => {
				import('./commands').then(({ handleExtractedText }) => {
						new CameraCapture(this.app, this.settings, (extractedText: string) => {
						handleExtractedText(this, extractedText);
					}).trigger();
				});
			});
		});
	}

	onunload() {
		// 정리 작업은 자동으로 처리됨
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		setLanguage(this.settings.language);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	updateRibbonIcon() {
		if (this.ribbonIconEl) {
			const translation = t();
			this.ribbonIconEl.setAttribute('aria-label', translation.captureText);
			this.ribbonIconEl.setAttribute('title', translation.captureText);
		}
	}
}
