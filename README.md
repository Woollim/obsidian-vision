# Obsidian Text Vision – OCR Camera
👉 Read this in [한국어](README.ko.md).

Obsidian Text Vision brings camera-powered optical character recognition (OCR) to Obsidian. Open the camera picker from the ribbon or command palette, capture an image that contains text, and drop the recognised text straight into your notes.

## Features
- Capture text with a camera modal that works on desktop and mobile (uses the system file picker with camera support where available).
- Choose how extracted text is inserted: append to the active note, replace the current selection, or create a brand-new note.
- Switch between the built-in offline Tesseract OCR engine and Google Cloud Vision (requires an API key).
- Localised interface available in English and Korean, selectable from the settings tab.
- Ribbon icon and command palette entry (`Capture and extract text`) for quick access to the camera workflow.

## Requirements
- Obsidian 0.15.0 or later.
- For development builds: Node.js 18+ and npm.
- Internet access only if you opt into Google Vision; the default Tesseract mode runs locally in the app.

## Installation
**Manual installation**
1. Run `npm run build` to produce `main.js`.
2. Copy `main.js`, `manifest.json`, and `styles.css` (optional) into your vault at `<Vault>/.obsidian/plugins/text-vision/`.
3. Reload Obsidian and enable **Obsidian Text Vision** from **Settings → Community plugins**.

**Development setup**
1. Install dependencies with `npm install`.
2. Use `npm run dev` for watch mode while developing or `npm run build` for a production bundle.
3. The entry point is `src/main.ts`; esbuild bundles the plugin to `main.js`.

## Usage
- **Ribbon icon**: Select the camera icon in the left ribbon to open the modal and capture or upload an image.
- **Command palette**: Run `Capture and extract text` (`Ctrl/Cmd+P`) to open the same modal.
- After OCR completes you will see a notice; the recognised text is inserted according to your chosen insertion mode.

### Text insertion modes
- `Append to current document`: Adds two newlines and the recognised text to the bottom of the active markdown file.
- `Replace current selection`: Replaces the highlighted text in the active editor, or the entire note if nothing is selected.
- `Create new note`: Creates a new note named `OCR-<timestamp>.md`, writes the recognised text, and opens it in a new leaf.

## Settings overview
- **Language** – Switch the plugin UI between English and Korean.
- **OCR provider** – Select `Tesseract (Offline)` or `Google Vision API (Online)` and provide an API key when required.
- **Text insertion** – Choose how OCR results are written back into Obsidian.
- **Camera options** – Toggles for auto-focus and image quality are stored for future enhancements; they do not change the current capture flow yet.
- **Image storage** – Optional toggle to specify a vault folder for saving captured images. Saving is not implemented in the current build, but the values are persisted for upcoming releases.

## OCR providers
- **Tesseract (default)** – Uses `tesseract.js` bundled with the plugin. Works offline and loads the combined Korean/English language pack (`kor+eng`). The first run may take a moment while the worker initialises.
- **Google Vision API** – Sends the captured image to Google Cloud Vision. Requires a valid API key and network connectivity. Errors from the API are surfaced in Obsidian notices.

## Known limitations
- Camera capture relies on the browser-provided file picker. Desktop platforms usually show a file dialog; mobile browsers can open the device camera directly.
- Camera auto-focus, image quality, and captured-image storage settings are placeholders today and will take effect in a future update.

## Development notes
- Source code is organised under `src/` with separate modules for commands, UI, utilities, localisation, and settings.
- The plugin dynamically imports heavy dependencies (like `tesseract.js`) only when needed to keep the initial load light.

## Author
Maintained by [woollim](https://github.com/woollim).

## License
Released under the Obsidian plugin license included in [`LICENSE`](LICENSE).
