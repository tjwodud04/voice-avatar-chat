# Voice Avatar Chat

AI 챗봇이 **내 목소리**로 나에 대해 답변합니다.

## Demo

> 질문하면 텍스트와 음성이 동시에 나타나며, 클론된 목소리로 답변합니다.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 + Tailwind CSS |
| LLM | Groq (Llama 4 Scout) |
| TTS | ElevenLabs (Voice Cloning) |
| Hosting | Vercel |

## Features

- 🎙️ **Voice Cloning** — ElevenLabs로 복제한 목소리로 답변
- ⚡ **실시간 타이핑** — 음성과 동기화된 텍스트 타이핑 효과
- 🌐 **한/영 지원** — 질문 언어에 맞춰 자동 응답
- 🧠 **Knowledge Base** — 마크다운 기반 정보로 hallucination 방지

## Setup

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

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | [Groq Console](https://console.groq.com)에서 발급 |
| `ELEVENLABS_API_KEY` | [ElevenLabs](https://elevenlabs.io)에서 발급 |

## Voice Setup

1. ElevenLabs에서 Voice Cloning 생성
2. `app/api/tts/route.ts`에서 Voice ID 수정:
```typescript
const VOICE_IDS = {
  ko: "your-korean-voice-id",
  en: "your-english-voice-id",
};
```

## Project Structure

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

## License

MIT
