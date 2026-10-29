# KannadaSetu (ಕನ್ನಡ ಸೇತು) — AI Language & Culture Platform

A unified technology platform engineered for the **Kannada Technology Challenge** hackathon, addressing all **six problem statements** at the intersection of Kannada language, culture, and everyday life.

---

## 🌟 Hackathon Challenge Coverage (All 6 Tracks)

| # | Challenge Brief Track | Platform Module | Key Capabilities Implemented |
|---|---|---|---|
| **01** | **Language Learning:** *Kannada for Everyone* | **Everyday Kannada** (`LearnScenariosView`) | Situational dialogues, transliterations (Kenglish), audio pronunciations, vocabulary flashcards. |
| **02** | **Voice & Speech:** *Voice of Kannada* | **Voice AI Coach** (`VoiceCoachView`) | Real-time Web Speech recognition (`kn-IN`), pronunciation accuracy scoring (0–100%), tongue-twister mode, conversational AI bot. |
| **03** | **Real-World Application:** *Kannada in Everyday Life* | **Daily Situations** (`LearnScenariosView`) | Auto-rickshaw bargaining, grocery markets, BMTC/Metro commuting, hospitals, workplace casual chat, interactive scenario quizzes. |
| **04** | **Culture & Heritage:** *Namma Kannada — Regional Explorer* | **Regional Dialects** (`DialectExplorerView`) | 4 distinct cultural zones (Uttara Karnataka, Karavali/Kundapura, Hale Mysuru, Bengaluru Slang), cross-dialect comparative matrix, audio & cultural trivia. |
| **05** | **Document AI & OCR:** *Kannada Text Digitization* | **Kannada Lens OCR** (`OcrDigitizerView`) | Image upload & 4 pre-loaded real-world test cases (BMTC bus route boards, darshini menus, highway caution signs, historical edicts), searchable Unicode text extraction, English translation, text-to-speech. |
| **06** | **Travel & Tourism:** *AI Travel Planner for Karnataka* | **Karnataka Travel Planner** (`TravelPlannerView`) | Multi-day itineraries (Hampi, Coorg, Gokarna, Mysuru) customized by budget tier, local culinary highlights (Jolada Rotti, Neer Dosa, Mysore Pak), and tailored regional Kannada survival phrases. |

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js (v18+)
- Modern web browser (Google Chrome or Microsoft Edge recommended for native Web Speech API recognition).

### 2. Run the Development Server
```bash
cd "C:\Users\ASUS\.gemini\antigravity\scratch\kannada-setu"
npm run dev
```

### 3. Build for Production / Deployment (e.g. Vercel, Netlify)
```bash
npm run build
```

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React 19 + Vite 6
- **Styling:** Tailwind CSS v4 + Lucide React Icons
- **Typography:** Google Fonts (`Noto Sans Kannada` + `Inter`)
- **Speech Technologies:** Web Speech Recognition API (`lang: kn-IN`) & Web SpeechSynthesis TTS
- **Document AI / OCR:** Client-side OCR parser + Tesseract.js engine
- **Gamification:** `canvas-confetti` celebration triggers for quiz completions & high pronunciation scores
