# Voice Avatar Chat

[English](#english) | [한국어](#한국어)

---

## English

AI chatbot that answers about me — in my own cloned voice.

### Demo

Ask a question, and the text appears in sync with the voice response.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 + Tailwind CSS |
| LLM | Groq (Llama 4 Scout) |
| TTS | ElevenLabs (Voice Cloning) |
| Hosting | Vercel |

### Features

- Voice Cloning — Responds with my cloned voice via ElevenLabs
- Real-time Typing — Text syncs with audio playback
- Bilingual — Automatically responds in Korean or English
- Knowledge Base — Markdown-based info to prevent hallucination

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env
# Add your API keys to .env

# 3. Add knowledge base
# Create markdown files in knowledge/ folder

# 4. Run
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Get from [Groq Console](https://console.groq.com) |
| `ELEVENLABS_API_KEY` | Get from [ElevenLabs](https://elevenlabs.io) |

### Voice Setup

1. Create a cloned voice on ElevenLabs
2. Update Voice IDs in `app/api/tts/route.ts`:
```typescript
const VOICE_IDS = {
  ko: "your-korean-voice-id",
  en: "your-english-voice-id",
};
```

### Project Structure

```
├── app/
│   ├── page.tsx          # Main chat UI
│   └── api/
│       ├── chat/         # LLM streaming
│       └── tts/          # ElevenLabs TTS
├── components/           # React components
├── knowledge/            # Markdown-based info
└── lib/                  # Utilities
```

---

## 한국어

AI 챗봇이 내 목소리로 나에 대해 답변합니다.

### 데모

질문하면 음성과 동시에 텍스트가 타이핑됩니다.

### 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프론트엔드 | Next.js 16 + Tailwind CSS |
| LLM | Groq (Llama 4 Scout) |
| TTS | ElevenLabs (Voice Cloning) |
| 호스팅 | Vercel |

### 기능

- Voice Cloning — ElevenLabs로 복제한 목소리로 답변
- 실시간 타이핑 — 음성과 동기화된 텍스트 효과
- 한/영 지원 — 질문 언어에 맞춰 자동 응답
- Knowledge Base — 마크다운 기반 정보로 hallucination 방지

### 설치

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env
# .env 파일에 API 키 입력

# 3. Knowledge base 작성
# knowledge/ 폴더에 마크다운 파일 추가

# 4. 실행
npm run dev
```

### 환경 변수

| 변수 | 설명 |
|------|------|
| `GROQ_API_KEY` | [Groq Console](https://console.groq.com)에서 발급 |
| `ELEVENLABS_API_KEY` | [ElevenLabs](https://elevenlabs.io)에서 발급 |

### Voice 설정

1. ElevenLabs에서 Voice Cloning 생성
2. `app/api/tts/route.ts`에서 Voice ID 수정:
```typescript
const VOICE_IDS = {
  ko: "your-korean-voice-id",
  en: "your-english-voice-id",
};
```

### 프로젝트 구조

```
├── app/
│   ├── page.tsx          # 메인 채팅 UI
│   └── api/
│       ├── chat/         # LLM 스트리밍
│       └── tts/          # ElevenLabs TTS
├── components/           # React 컴포넌트
├── knowledge/            # 마크다운 기반 정보
└── lib/                  # 유틸리티
```
