# LabelLens Promotion & Marketing Website

Official landing page and promotional website for **LabelLens** — the AI-powered packaged food nutrition label and barcode scanner for Indian consumers.

---

## 🌟 Key Highlights Included in the Website

- **Brand Design System**: Forest green nature theme (`#183B2D`, `#245C43`, `#059669`, `#10B981`, `#34D399`) with clean glassmorphic elevations, minimalist aesthetic, and responsive typography (Outfit & Plus Jakarta Sans).
- **Interactive Phone Simulator ("Try Before You Install")**: 
  - Switch between real Indian products (*Maggi 2-Minute Noodles, Parle-G Biscuits, Haldiram's Aloo Bhujia, Cold Beverages, 100% Rolled Oats*).
  - Test live dietary profile filters (*Diabetic Alert, Low Sodium Guard, Avoid Palm Oil, Pure Vegetarian*).
  - Realistic animated scanner laser and instant traffic light verdict.
- **Why Use LabelLens (Front vs. Back Reality)**:
  - Side-by-side comparison of deceptive front-of-pack claims vs. back-of-pack truths.
  - Deep-dive into 50+ hidden sugar aliases, the refined palm oil epidemic, INS chemical code masking, and serving size manipulation.
- **How It Works (3 Steps)**:
  - 01. Point & Capture (1-sec barcode or nutrition table photo).
  - 02. Multimodal AI Extraction (Gemini 3 Flash + ICMR-NIN 2024 normalizer).
  - 03. Plain-English Verdict (Traffic light badge + personal health match).
- **Features Showcase**:
  - Dual Scanner (Barcode + Photo OCR), Traffic Light HFSS evaluation, Teaspoons of sugar calculator, Palm Oil Detector, INS chemical additive decoder, and 100% private offline history.
- **Where & How To Use (Everyday Scenarios)**:
  - Supermarket grocery aisles (DMart, Reliance Smart, Kirana stores).
  - Kitchen pantry audits.
  - Kids' school snacks & tiffin boxes.
  - Diabetes and hypertension condition management.
- **Interactive INS Decoder Tool**:
  - Interactive lookup for INS 621 (MSG), INS 102 (Tartrazine), INS 110, INS 150d, INS 951 (Aspartame), INS 955 (Sucralose), INS 211, Maltodextrin, and Palmolein.
- **Direct APK Download & QR Code**:
  - Direct CTA button linked to the user's Expo EAS build: [Expo EAS Build](https://expo.dev/accounts/ayushdotcom/projects/labellens/builds/797d18ae-68f9-43b9-becf-84c829c99957).
  - Scannable phone camera QR code for one-touch mobile download.
  - Step-by-step Android installation guide.
- **Interactive FAQ Accordion & Floating CTA Bar**.

---

## 🚀 How to Run Locally

You can preview the website with any static file server:

### Option 1: Python
```bash
python -m http.server 8080
```

### Option 2: Node.js (Built-in)
```bash
npx serve .
# or
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((q,s)=>{let p=path.join('.',q.url==='/'?'index.html':q.url);fs.createReadStream(p).pipe(s);}).listen(8080,()=>console.log('http://localhost:8080'));"
```

---

## 🌐 Deployment (Zero Configuration)

The site is built with pure semantic HTML5, CSS3, and modern vanilla JavaScript:
- **GitHub Pages**: Push this directory to a repo and enable GitHub Pages in Settings.
- **Vercel / Netlify**: Drag-and-drop the `labellens-website` folder or link your Git repository.
