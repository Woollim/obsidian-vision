import { App, Modal } from 'obsidian';
import { t } from '../i18n';

export class VisionSetupGuideModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		const translation = t();

		contentEl.empty();
		contentEl.createEl('h2', { text: translation.googleVisionApiSetUpGuideTitle });

		const link = contentEl.createEl('a', {
			href: translation.googleVisionApiSetUpDocsUrl,
			text: translation.googleVisionApiSetUpDocsLabel,
		});
		link.setAttr('target', '_blank');

		const stepsList = contentEl.createEl('ol');
		translation.googleVisionApiSetUpGuideSteps.forEach((step) => {
			stepsList.createEl('li', { text: step });
		});

		if (translation.googleVisionApiSetUpTips?.length) {
			contentEl.createEl('h3', { text: translation.googleVisionApiSetUpTipsTitle });
			const notesList = contentEl.createEl('ul');
			translation.googleVisionApiSetUpTips.forEach((note) => {
				notesList.createEl('li', { text: note });
			});
		}
	}

	onClose() {
		this.contentEl.empty();
	}
}
