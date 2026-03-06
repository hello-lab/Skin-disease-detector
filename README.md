# Skin Disease Detector

An AI-powered web application for early skin disease detection. Upload or capture an image of a skin lesion to receive an instant risk assessment powered by a deep learning model, browse educational information about common skin conditions, chat with an AI assistant, and find nearby dermatologists.

---

## Features

| Page | Description |
|------|-------------|
| **Home** | Educational cards for common skin lesion types with descriptions, risk factors, medication, and next steps |
| **Predict Skin Disease** | Upload an image or use your camera to classify a skin lesion with an EfficientNet-based ONNX model |
| **Doctors Near Me** | Google Maps embed that finds dermatologists near your current location |
| **Chatbot** | "Skinny" — an AI assistant powered by Google Gemini 2.0 Flash, specialized in skin health questions |

---

## Supported Skin Lesion Classes

The model is trained on the [HAM10000 dataset](https://www.kaggle.com/datasets/kmader/skin-lesion-analysis-toward-melanoma-detection) and can classify the following 7 lesion types:

| Code | Full Name | Type |
|------|-----------|------|
| `nv` | Melanocytic nevi (Mole) | Benign |
| `mel` | Melanoma | Malignant |
| `bkl` | Benign keratosis-like lesions (Seborrheic keratosis / Solar lentigo) | Benign |
| `bcc` | Basal cell carcinoma | Malignant |
| `vasc` | Vascular lesions (Pyogenic granuloma) | Benign |
| `akiec` | Actinic keratoses / Intraepithelial carcinoma | Malignant / Precancerous |
| `df` | Dermatofibroma | Benign |

> **Disclaimer:** This tool is intended for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified dermatologist.

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router) with React 19
- **UI:** [Radix UI Themes](https://www.radix-ui.com/themes) + [Tailwind CSS v4](https://tailwindcss.com/)
- **ML Inference:** [ONNX Runtime Node](https://onnxruntime.ai/) (`onnxruntime-node`) — EfficientNet model (`model.onnx`)
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/) — resizes and normalises images before inference
- **AI Chatbot:** [Google Gemini 2.0 Flash](https://ai.google.dev/) via REST API
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- A **Google Gemini API key** (for the chatbot feature)

### Installation

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file inside the `frontend/` directory:

```env
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

### Running the Development Server

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
cd frontend
npm run build
npm run start
```

---

## Project Structure

```
Skin-disease-detector/
├── frontend/
│   ├── public/                  # Static assets (icons, images)
│   ├── src/
│   │   └── app/
│   │       ├── page.js          # Home page — skin disease information
│   │       ├── layout.js        # Root layout with navigation tabs
│   │       ├── globals.css      # Global styles
│   │       ├── predict/
│   │       │   └── page.js      # Image classification page
│   │       ├── doctor/
│   │       │   └── page.js      # Dermatologists near me (Google Maps)
│   │       ├── chatbot/
│   │       │   └── page.js      # Skinny AI chatbot
│   │       └── api/
│   │           ├── prediction/
│   │           │   └── route.js # POST /api/prediction — ONNX inference
│   │           └── gemini/
│   │               └── route.js # POST /api/gemini — Gemini chat
│   ├── model.onnx               # EfficientNet ONNX model
│   ├── package.json
│   └── README.md                # Next.js default README
└── README.md                    # This file
```

---

## How It Works

1. **Image Upload / Camera Capture** — The user selects or captures an image on the `/predict` page.
2. **Preprocessing** — The image is sent to `/api/prediction`. Sharp resizes it to 224 × 224 and applies ImageNet normalisation (mean `[0.485, 0.456, 0.406]`, std `[0.229, 0.224, 0.225]`).
3. **Inference** — The preprocessed tensor is fed into the cached ONNX Runtime session.
4. **Softmax + Result** — Class probabilities are computed, and the top prediction is returned along with medication and next-steps guidance.

---

## Available Scripts

All scripts are run from the `frontend/` directory.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production with Turbopack |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

This project is open source. See the repository for license details.
