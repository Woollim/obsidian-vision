# Text Vision (OCR) for Obsidian
👉 Read this in [한국어](README.ko.md).

## Author
Maintained by [Woollim](https://github.com/Woollim).

Text Vision adds camera-powered optical character recognition (OCR) to Obsidian. Launch the capture flow from the ribbon or command palette, snap or pick an image, and drop the recognised text straight into your notes.

## Features
- Camera-friendly capture modal that uses the system file picker (mobile devices open the camera directly when supported).
- Flexible text insertion: append to the active note, replace the current selection, or create a new note named `Text Vision (yyyy-MM-dd-HH-mm-ss).md`.
- Switch between the bundled offline Tesseract engine and Google Cloud Vision (requires an API key).
- Optional vault storage for captured images with a configurable destination folder.
- Settings tab includes an in-app setup guide to help you generate a Google Vision API key.
- Built-in localisation for English and Korean, plus a ribbon icon and command palette entry (`Take photo and extract text`) for quick access.

## Requirements
- Obsidian 0.15.0 or later.
- Internet access only if you opt into Google Vision; the default Tesseract mode runs locally in the app.

## Usage
- Ribbon icon: Select the camera icon in the left ribbon to open the capture modal and take or pick an image.
- Command palette: Run `Take photo and extract text` (`Ctrl/Cmd+P`) to open the same modal.
- After OCR completes you will see a notice; the recognised text is inserted according to your chosen insertion mode.

### Text insertion modes
- `Append to current document`: Adds two newlines and the recognised text to the bottom of the active markdown file.
- `Replace current selection`: Replaces the highlighted text in the active editor, or the entire note if nothing is selected.
- `Create new note`: Creates `Text Vision (yyyy-MM-dd-HH-mm-ss).md`, writes the recognised text, and opens it in a new leaf.

## Settings overview
- Language – Switch the plugin UI between English and Korean.
- OCR engine – Select `Tesseract (Offline)` or `Google Vision API (Online)`. Tesseract runs locally but delivers modest accuracy; choose Google Vision whenever you need reliable OCR results.
- Google Vision API key – Appears when Google Vision is selected; stores the API key used for requests. Use the Setup guide button in the settings tab or follow the steps below:
  1. Visit [Google Cloud Console](https://console.cloud.google.com/), sign in, and create a dedicated project for OCR (or reuse an existing one).
  2. Ensure the project has a linked billing account; the Vision API requires billing even when you stay within free tier quotas.
  3. Open APIs & Services → Library, search for *Vision API*, and click Enable.
  4. Navigate to APIs & Services → Credentials, choose Create credentials → API key, and copy the generated key.
  5. (Recommended) Select Restrict key, limit it to the *Vision API*, and add application restrictions that match your Obsidian environments.
  6. Paste the key into Text Vision's Google Vision API key field and press Save.
- Text insertion mode – Choose how OCR results are written back into Obsidian.
- Save captured images – Toggle vault storage for the images you capture during OCR.
- Image storage folder – Provide or pick a folder (autocompleted from your vault) for saving captured images. Defaults to `vision-images`.

## OCR engines
- Tesseract (default) – Uses `tesseract.js` bundled with the plugin. Works offline and loads the combined Korean/English language pack (`kor+eng`), but accuracy drops with handwriting, complex layouts, or low-light photos.
- Google Vision API – Sends the captured image to Google Cloud Vision. Requires a valid API key and network connectivity but consistently yields the best recognition quality for detailed notes.

## Captured image storage
- Images are saved to the configured folder when Save captured images is enabled. Files are named `image-vision-(yyyy-MM-dd-HH-mm-ss).<ext>`.
- When the folder does not exist, the plugin creates it automatically in your vault.

## Development notes
- Source code is organised under `src/` with dedicated modules for commands, features, localisation, settings, and shared types.
- Heavy dependencies such as `tesseract.js` are loaded on demand so the plugin stays lightweight at startup.
- Build with esbuild through the npm scripts defined in `package.json`.

## License
Released under the Obsidian plugin license included in [`LICENSE`](LICENSE).
