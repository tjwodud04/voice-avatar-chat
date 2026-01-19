# Voice Self-Intro Chatbot

음성 자기소개 챗봇 - 본인 목소리로 답변하는 AI 데모

## Tech Stack (2025.01 Latest)

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js + Tailwind CSS | 16.1 |
| AI SDK | Vercel AI SDK | 6.0 |
| LLM | Groq (Llama 4 Scout) | 17Bx16E MoE |
| TTS | Voice Cloning (see below) | 2025 Latest |
| Hosting | Vercel | Hobby (Free) |

## Project Structure

```
voice_self_intro/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       ├── chat/route.ts      # LLM streaming
│       └── tts/route.ts       # TTS proxy
├── components/
│   ├── ChatWindow.tsx
│   ├── ChatMessage.tsx
│   ├── ChatInput.tsx
│   ├── TypingIndicator.tsx
│   ├── AudioPlayer.tsx
│   └── SampleQuestions.tsx
├── lib/
│   ├── llm.ts
│   ├── tts.ts
│   └── knowledge.ts
├── knowledge/                  # Knowledge base (markdown)
│   ├── profile.md             # 서재영 기본 프로필
│   ├── resume.md              # 경력, 학력, 기술 스택
│   ├── publications.md        # 논문 목록 (2021-2025)
│   ├── projects.md            # 프로젝트 이력
│   └── links.md               # GitHub, LinkedIn 등 링크
└── public/voice/sample.wav    # Voice sample (10-30sec)
```

## Key Requirements

1. **No Hallucination**: Only answer from knowledge base. Say "I don't know" if unsure.
2. **Low Latency**: Target < 2sec for first response
3. **Voice Clone**: Use user's voice sample for TTS output
4. **Bilingual**: Support both Korean and English
5. **Messenger UI**: KakaoTalk-style chat interface

## Environment Variables

```env
GROQ_API_KEY=           # https://console.groq.com
# TTS_API_URL=          # Optional: Custom TTS endpoint
```

## API Endpoints

### POST /api/chat
- Input: `{ messages: Message[] }`
- Output: Streaming text response
- Uses: Vercel AI SDK 6.0 + Groq provider

### POST /api/tts
- Input: `{ text: string, language: "ko" | "en" }`
- Output: Audio blob (wav/mp3)
- Uses: Voice cloning TTS (see options below)

## UX Flow

1. Page load → Intro message + sample questions
2. User types question → Show in chat
3. Processing → Typing indicator (...)
4. LLM response → Stream text to chat
5. TTS conversion → Generate audio
6. Playback → Audio plays + text syncs (typing effect)

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
| Vercel | https://vercel.com | Hosting |

---

## Voice Cloning TTS Models (2025 Latest)

### Tier 1: Ultra Low Latency (<200ms)

| Model | Latency | Voice Sample | Korean | License | Notes |
|-------|---------|--------------|--------|---------|-------|
| **Chatterbox Turbo** | <200ms TTFB | 5sec | 23 langs | MIT | [Resemble AI](https://github.com/resemble-ai/chatterbox), 11k+ GitHub stars |
| **CosyVoice 3** | 150ms | Few sec | ✅ 9 langs | Apache 2.0 | [Alibaba](https://github.com/FunAudioLLM/CosyVoice), bi-streaming |
| **Kokoro-82M** | <300ms | - | ❌ | Apache 2.0 | Fastest, no voice cloning |
| **XTTS-v2** | <150ms (stream) | 6sec | ✅ 17 langs | CPML | [Coqui](https://huggingface.co/coqui/XTTS-v2), community maintained |

### Tier 2: High Quality Voice Cloning

| Model | Latency | Voice Sample | Korean | License | Notes |
|-------|---------|--------------|--------|---------|-------|
| **OpenAudio S1** | <100ms (RTX4090) | 10-30sec | ✅ 13 langs | CC-BY-NC-SA | [Fish Audio](https://fish.audio), TTS-Arena2 #1, 50+ emotions |
| **OpenAudio S1-mini** | Fast | 10-30sec | ✅ | CC-BY-NC-SA | 0.5B params, HuggingFace Space |
| **F5-TTS** | RTF 0.15 | 3-15sec | ❌ EN/ZH | Apache 2.0 | [GitHub](https://github.com/SWivid/F5-TTS), browser-based |
| **Orpheus TTS** | ~200ms | Zero-shot | Multi | MIT | Tag-based emotion control |

### Tier 3: Research/Experimental

| Model | Latency | Voice Sample | Korean | License | Notes |
|-------|---------|--------------|--------|---------|-------|
| **Higgs Audio V2** | - | - | Multi | - | Llama 3.2 3B based, trending on HF |
| **NeuTTS Air** | Real-time | 3sec | Multi | - | On-device 0.5B, instant cloning |
| **IndexTTS-2** | - | Zero-shot | - | - | Duration control for dubbing |

### Recommended for This Project

**Primary: Chatterbox Turbo**
- MIT license (commercial OK)
- <200ms latency
- 23 languages including Korean
- 5-second voice sample
- Emotion prompts support
- HuggingFace Space: https://huggingface.co/ResembleAI/chatterbox-turbo

**Alternative: OpenAudio S1-mini**
- Best quality (TTS-Arena2 #1)
- Korean emotion markers
- 10-30sec voice sample
- HuggingFace Space: https://huggingface.co/spaces/fishaudio/fish-speech-1

**Fallback: CosyVoice 3**
- Alibaba's latest
- 150ms streaming latency
- 9 languages + 18 Chinese dialects
- GitHub: https://github.com/FunAudioLLM/CosyVoice

### Voice Sample Guidelines

For best voice cloning results:
- **Duration**: 10-30 seconds (minimum 5 seconds)
- **Quality**: Clear audio, no background noise
- **Content**: Natural speech, varied intonation
- **Format**: WAV or MP3, 16kHz+ sample rate

---

## Knowledge Base Owner

**서재영 (Jae Young Suh)**
- AI Engineer (LLM, NLP, CV)
- M.S. in AI, Hanyang University
- Specialties: Voice Dialogue Systems, Live2D, Proactive AI
- GitHub: https://github.com/tjwodud04
- LinkedIn: https://www.linkedin.com/in/jaeyoungsuh/
