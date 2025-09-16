import { NextResponse } from 'next/server';
import ort from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';

export const config = {
    api: { bodyParser: false },
};

// Caching the ONNX session for performance (singleton)
let sessionPromise = null;
function getSession() {
    if (!sessionPromise) {
        // Place your model.onnx in the /public directory or adjust path as needed
        const modelPath = path.resolve('model.onnx');
        sessionPromise = ort.InferenceSession.create(modelPath);
    }
    return sessionPromise;
}

function softmax(arr) {
    const max = Math.max(...arr); // for numerical stability
    const exps = arr.map(x => Math.exp(x - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(exp => exp / sum);
}

function preprocessImage(buffer) {
    // Returns a Promise resolving to a Float32Array of shape [1, 3, 224, 224]
    return sharp(buffer)
        .resize(224, 224)
        .raw()
        .toBuffer()
        .then((img) => {
            // img is Buffer of [R,G,B, R,G,B, ...]
            // EfficientNet normalization params (PyTorch): mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]
            const mean = [0.485, 0.456, 0.406];
            const std = [0.229, 0.224, 0.225];
            const out = new Float32Array(1 * 3 * 224 * 224);

            // PyTorch ToTensor gives [C,H,W], sharp gives [H,W,C] in RGBRGB...
            // We need to fill out as [C, H, W]
            for (let i = 0; i < 224 * 224; i++) {
                // [0,255] -> [0,1]
                let r = img[i * 3] / 255.0;
                let g = img[i * 3 + 1] / 255.0;
                let b = img[i * 3 + 2] / 255.0;
                // Normalize
                out[i] = (r - mean[0]) / std[0]; // R
                out[224 * 224 + i] = (g - mean[1]) / std[1]; // G
                out[2 * 224 * 224 + i] = (b - mean[2]) / std[2]; // B
            }
            return out;
        });
}

// Use the same class order as Python CLASS_NAMES
const CLASS_NAMES = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc'];
const classes = {
    5: [
        'nv',
        'melanocytic nevi',
        {
            common_name: 'Mole',
            medication: 'Usually none required; monitor for changes.',
            next_steps: 'Regular self-examination; consult dermatologist if changes occur.',
            type: 'benign'
        }
    ],
    4: [
        'mel',
        'melanoma',
        {
            common_name: 'Melanoma (skin cancer)',
            medication: 'Surgical excision; may require immunotherapy, chemotherapy, or targeted therapy.',
            next_steps: 'Urgent referral to dermatologist or oncologist for further evaluation and treatment.',
            type: 'malignant'
        }
    ],
    2: [
        'bkl',
        'benign keratosis-like lesions',
        {
            common_name: 'Seborrheic keratosis or solar lentigo',
            medication: 'Usually none required; removal for cosmetic reasons.',
            next_steps: 'Monitor; consult dermatologist if lesion changes or for cosmetic removal.',
            type: 'benign'
        }
    ],
    1: [
        'bcc',
        'basal cell carcinoma',
        {
            common_name: 'Basal cell skin cancer',
            medication: 'Surgical excision; topical treatments or radiation in some cases.',
            next_steps: 'Refer to dermatologist for confirmation and treatment.',
            type: 'malignant'
        }
    ],
    6: [
        'vasc',
        'pyogenic granulomas and hemorrhage',
        {
            common_name: 'Vascular lesion (e.g., pyogenic granuloma)',
            medication: 'Removal if bothersome; topical or surgical options.',
            next_steps: 'Consult dermatologist for evaluation and possible removal.',
            type: 'benign'
        }
    ],
    0: [
        'akiec',
        'Actinic keratoses and intraepithelial carcinomae',
        {
            common_name: 'Precancerous lesion (actinic keratosis)',
            medication: 'Cryotherapy, topical creams, or photodynamic therapy.',
            next_steps: 'Consult dermatologist for confirmation and treatment.',
            type: 'malignant'
        }
    ],
    3: [
        'df',
        'dermatofibroma',
        {
            common_name: 'Dermatofibroma',
            medication: 'Usually none required; surgical removal if symptomatic.',
            next_steps: 'Monitor; consult dermatologist if painful or changing.',
            type: 'benign'
        }
    ],
};

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        if (!file || typeof file === 'string') {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Preprocess image (normalize exactly as in Python)
        const inputTensorData = await preprocessImage(buffer);
        const inputTensor = new ort.Tensor('float32', inputTensorData, [1, 3, 224, 224]);

        // Load ONNX model session
        const session = await getSession();

        // The input name may vary; you can print Object.keys(await session.inputNames()) if needed
        const feeds = {};
        feeds[session.inputNames[0]] = inputTensor;

        // Run inference
        const output = await session.run(feeds);
        const outputName = session.outputNames[0];
        const outputTensor = output[outputName].data;

        // Softmax to get probabilities
        const probs = softmax(Array.from(outputTensor));
        const predIndex = probs.indexOf(Math.max(...probs));
        const confidence = probs[predIndex];

        const [shortLabel, fullName,data] = classes[predIndex] || ['unknown', 'unknown'];

        // Return Python-style response
        return NextResponse.json({
            prediction: shortLabel,
            description: fullName,
            class_index: predIndex,
            confidence: confidence,
            misc:data,
            probabilities: Object.fromEntries(CLASS_NAMES.map((cls, i) => [cls, probs[i]]))
        });
    } catch (err) {
        return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
    }
}