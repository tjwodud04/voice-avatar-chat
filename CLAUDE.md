# Voice Avatar Chat

음성 자기소개 챗봇 - 본인 목소리로 답변하는 AI 데모

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js + Tailwind CSS | 16.1 |
| AI SDK | Vercel AI SDK | 6.0 |
| LLM | Groq (Llama 4 Scout) | meta-llama/llama-4-scout-17b-16e-instruct |
| TTS | ElevenLabs | Voice Cloning (eleven_multilingual_v2) |
| Hosting | Vercel | Hobby (Free) |

## Project Structure

```
voice_self_intro/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Main chat UI + audio sync
│   ├── globals.css
│   └── api/
│       ├── chat/route.ts     # LLM streaming (Groq)
│       └── tts/route.ts      # ElevenLabs TTS
├── components/
│   ├── ChatWindow.tsx
│   ├── ChatMessage.tsx       # Text display + typing effect
│   ├── ChatInput.tsx
│   ├── TypingIndicator.tsx
│   └── SampleQuestions.tsx
├── lib/
│   └── knowledge.ts          # Knowledge loader + system prompt
├── knowledge/                # Knowledge base (markdown)
│   ├── profile.md
│   ├── resume.md
│   ├── publications.md
│   ├── projects.md
│   └── links.md
└── public/voice/             # Voice samples (gitignored)
    ├── sample_ko.m4a
    └── sample_en.m4a
```

## Key Features

1. No Hallucination: Only answer from knowledge base. Say "그 부분은 제가 가진 정보로는 답변드리기 어렵네요" if unsure.
2. Concise Responses: 3-5 sentences max, key points only.
3. Voice Clone: ElevenLabs with cloned voice IDs per language.
4. Bilingual: Korean/English auto-detection and response.
5. Synced Playback: Text typing effect synchronized with audio duration.

## Environment Variables

```env
GROQ_API_KEY=               # https://console.groq.com
ELEVENLABS_API_KEY=         # https://elevenlabs.io
```

## Voice IDs (ElevenLabs)

```typescript
// app/api/tts/route.ts
const VOICE_IDS = {
  ko: "LD5VPAjxmMpdmJU1Oept",  // Korean cloned voice
  en: "Xv5zYcc8R8aVmTK2C2Y9",  // English cloned voice
};
```

## API Endpoints

### POST /api/chat
- Input: `{ messages: Message[] }`
- Output: Streaming text response
- Model: `meta-llama/llama-4-scout-17b-16e-instruct`

### POST /api/tts
- Input: `{ text: string, language: "ko" | "en" }`
- Output: Audio blob (mp3)
- Model: `eleven_multilingual_v2`

## UX Flow

1. Page load → Intro message + sample questions
2. User types question → Show in chat
3. Processing → Typing indicator (...)
4. LLM response → Collect full text (hidden)
5. TTS generation → ElevenLabs API call
6. Playback → Audio plays + text types simultaneously (synced to audio duration)

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
```

## External Services

| Service | URL | Purpose |
|---------|-----|---------|
| Groq Console | https://console.groq.com | LLM API key |
| ElevenLabs | https://elevenlabs.io | TTS with voice cloning |
| Vercel | https://vercel.com | Hosting |

## System Prompt Guidelines

Located in `lib/knowledge.ts`:
- Answer in 3-5 sentences MAX
- Never make up information
- Match question language (Korean/English)
- Speak casually and friendly

## GitHub Repository

https://github.com/tjwodud04/voice-avatar-chat
