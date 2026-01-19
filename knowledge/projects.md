# Projects

## 2025

### Live2D 캐릭터 음성 챗봇 데모
- Description: OpenAI API와 Live2D 샘플 캐릭터를 연동하여 사용자 음성에 반응하는 챗봇 구현
- Technologies: Whisper, GPT-4o, Live2D, Flask, Vercel, HTML/CSS/JS, WebRTC
- Versions:
  - v1: STT → LLM → TTS 단일 대화 파이프라인, 기본 립싱크
  - v2: 감정 인식, 선제 메시지, 관광 도메인 추천 (SSE)
  - v3: gpt-realtime + WebRTC 실시간 스트리밍, 한/영 지원
- Link: https://github.com/tjwodud04

### 한국관광공사 API 기반 Claude Desktop MCP
- Description: 한국관광공사 공공 데이터를 활용하여 Claude Desktop에서 관광지 정보 검색 및 응답
- Technologies: FastMCP, Claude Desktop App, Cursor
- Features:
  - 관광지 정보 실시간 조회
  - Claude Desktop과 외부 API 간 데이터 통신

## 2024

### LLM 기반 질의응답 시스템 프로토타입 (부동산 검색 PoC)
- Description: 자연어 질의(예: "강남구 10억 이하 30평 이상 아파트")를 분석하여 부동산 정보 필터링
- Technologies: Python, Crawl4AI, PandasAI, OpenAI API, Streamlit
- Features:
  - 웹 크롤링으로 부동산 데이터 수집
  - PandasAI로 표 형태 가공 및 질의 처리
- Link: https://github.com/tjwodud04

### 제주 관광 데이터 기반 LLM 튜닝
- Company: 에이아이오투오
- Description: Llama 3, Polyglot-ko 모델을 활용한 제주도 관광지 데이터 fine-tuning
- Technologies: Python, Llama 3, PyTorch, Hugging Face
- Outcome: 논문으로 정리하여 FLLM 2024 학회에 투고 및 게재

## 2022

### 바이오 도메인 NER 테스트
- Company: 바스젠바이오
- Description: Papers With Code 기반 공개 바이오 의학 데이터를 활용한 NER 모델 실험
- Technologies: Python, PyTorch, Simple Transformers, Flair
- Models: BioBERT, BioLinkBERT
- Task: 질병, 기관, 유전자 등 개체 분류

## 2021

### HCI 프로젝트 - 협동 게임 음성 대화 시스템
- Organization: 한양대학교 석사과정
- Description: "Don't Starve Together" 협동 게임 환경에서 사람과 AI의 상호작용 실험
- Technologies: pyttsx3, MS Azure STT/TTS, Lua (게임 모드 연동)
- Features:
  - 규칙 기반 STT/TTS 응답 구성
  - Loomie 가상 아바타와 실시간 상호작용
- Outcome: IEEE TENSYMP 2021 논문 발표
