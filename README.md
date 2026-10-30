# KannadaDaily (ಕನ್ನಡ ದಿನದಿನ) — Practical Kannada for Everyday Life

A focused, interactive web platform engineered for the **Kannada Technology Challenge** hackathon, merging **Track 01 (Language Learning: Kannada for Everyone)** into a cohesive product.

---

## 🎯 The Core Problem Addressed
Karnataka (and especially Bangalore) welcomes millions of new students, tech professionals, and residents every year. These non-native speakers encounter daily communication barriers:
- Bargaining and negotiating meters with auto drivers
- Buying fresh vegetables at local Kirana stalls
- Ordering breakfast and filter coffee in Darshinis
- Directing Swiggy, Zomato, and parcel deliveries
- Communicating symptoms at medical clinics
- Friendly courtesy chats with coworkers

Standard translators give unnatural, formal textbook phrases. **KannadaDaily** solves this by providing practical, situational dialogues, authentic phonetic transliteration (Kenglish), speed-adjustable native audio, an interactive flashcard deck, and roleplay scenario quizzes.

---

## 🌟 Key Platform Features

1. **32+ Real-World Situations Across 6 Vital Categories**:
   - 🚕 **Auto & Metro Transit:** Meter bargaining, directions, UPI payments.
   - 🛒 **Market & Groceries:** Price negotiation, freshness checks, complimentary herbs.
   - ☕ **Darshini & Food:** Dosa ordering, filter coffee, less spice, billing.
   - 📦 **Home Delivery & Services:** Swiggy/Zomato calls, OTP, plumber/electrician visits.
   - 🏥 **Hospital & Pharmacy:** Symptom explanation (fever, headache), medicine timing.
   - 💼 **Office & Social:** Polite greetings ("Oota aaytha?"), tea break invites.

2. **Tri-Script Learning Interface**:
   - Crisp Kannada Script (ಕನ್ನಡ)
   - Phonetic English (Kenglish - e.g. *Eshtu aaythu?*)
   - English Meaning (*How much is it?*)

3. **Dual-Speed Native Audio (Normal 1.0x / Learner 0.7x)**:
   - Built-in text-to-speech engine with speed adjustment for beginners.

4. **Interactive Practice Microphone**:
   - Users can test their spoken Kannada using in-browser Web Speech Recognition (`kn-IN`) and receive instant match scores.

5. **Flashcard Deck Mode**:
   - Interactive flip-cards with shuffle and mastery tracking.

6. **Scenario Roleplay Quiz**:
   - 5 practical real-life scenario questions with rich cultural explanations and celebration confetti.

7. **Daily Survival Cheat-Sheet**:
   - Essential numbers (1 to 500), direction words, courtesy magic words, and time expressions.

---

## 🚀 Running the Project Locally

```bash
cd "C:\Users\ASUS\.gemini\antigravity\scratch\kannada-setu"
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in Google Chrome or Microsoft Edge.

---

## 🛠️ Tech Stack
- React 19 + Vite 6
- Tailwind CSS v4 + Lucide React Icons
- Google Fonts (`Noto Sans Kannada` + `Inter`)
- Web Speech API (`kn-IN` Recognition & TTS Synthesis)
- Canvas Confetti
