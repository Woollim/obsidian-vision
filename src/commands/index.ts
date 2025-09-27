import { Editor, MarkdownView, Notice, TFile } from 'obsidian';
import OCRCameraPlugin from '../main';
import { CameraCapture } from '../features/camera-modal';
import { t } from '../i18n';
import { generateTextFileName } from '../features/filename-generator';

export { handleExtractedText };

export function registerCommands(plugin: OCRCameraPlugin) {
	// 카메라로 텍스트 추출 명령
	plugin.addCommand({
		id: 'capture-and-extract-text',
		name: t().captureText,
		callback: () => {
			new CameraCapture(plugin.app, plugin.settings, (extractedText) => {
				handleExtractedText(plugin, extractedText);
			}).trigger();
		}
	});
}

function handleExtractedText(plugin: OCRCameraPlugin, text: string) {
	const { insertionMode } = plugin.settings;

	switch (insertionMode) {
		case 'append':
			appendToCurrentNote(plugin, text);
			break;
		case 'replace':
			replaceInCurrentNote(plugin, text);
			break;
		case 'new-note':
			createNewNoteWithText(plugin, text);
			break;
	}
}

function handleExtractedTextInEditor(plugin: OCRCameraPlugin, editor: Editor, text: string) {
	const { insertionMode } = plugin.settings;

	switch (insertionMode) {
		case 'append':
			const currentContent = editor.getValue();
			editor.setValue(currentContent + '\n\n' + text);
			break;
		case 'replace':
			const selection = editor.getSelection();
			if (selection) {
				editor.replaceSelection(text);
			} else {
				editor.setValue(text);
			}
			break;
		case 'new-note':
			createNewNoteWithText(plugin, text);
			break;
	}
}

async function appendToCurrentNote(plugin: OCRCameraPlugin, text: string) {
	const activeView = plugin.app.workspace.getActiveViewOfType(MarkdownView);
	if (activeView) {
		const editor = activeView.editor;
		const currentContent = editor.getValue();
		editor.setValue(currentContent + '\n\n' + text);
	} else {
		new Notice(t().inactiveDocumentError);
	}
}

async function replaceInCurrentNote(plugin: OCRCameraPlugin, text: string) {
	const activeView = plugin.app.workspace.getActiveViewOfType(MarkdownView);
	if (activeView) {
		const editor = activeView.editor;
		const selection = editor.getSelection();
		if (selection) {
			editor.replaceSelection(text);
		} else {
			editor.setValue(text);
		}
	} else {
		new Notice(t().inactiveDocumentError);
	}
}

async function createNewNoteWithText(plugin: OCRCameraPlugin, text: string) {
	const fileName = `${generateTextFileName()}.md`;
	
	try {
		const file = await plugin.app.vault.create(fileName, text);
		await plugin.app.workspace.getLeaf().openFile(file);
	} catch (error) {
		const translation = t();
		new Notice(`${translation.newNoteCreationFailureError}: ${error instanceof Error ? error.message : translation.unknownError}`);
	}
}
