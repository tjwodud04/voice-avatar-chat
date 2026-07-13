/**
 * Centralized configuration for the external AI and TTS services.
 *
 * Each value falls back to a sensible default so the app runs out of the box,
 * while still allowing per-deployment overrides via environment variables.
 * API keys are intentionally NOT kept here — they are read from the environment
 * at the point of use (see the API route handlers).
 */

/** Groq LLM used to generate chat responses. */
export const GROQ_MODEL =
  process.env.GROQ_MODEL ?? "meta-llama/llama-4-scout-17b-16e-instruct";

/** Base URL of the ElevenLabs text-to-speech REST API. */
export const ELEVENLABS_TTS_URL =
  process.env.ELEVENLABS_API_URL ??
  "https://api.elevenlabs.io/v1/text-to-speech";

/** ElevenLabs model used for speech synthesis. */
export const ELEVENLABS_MODEL_ID =
  process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";

/** Language used when a request does not specify one. */
export const DEFAULT_LANGUAGE = "ko";

/** Cloned ElevenLabs voice IDs per language. Override per deployment via env. */
export const VOICE_IDS: Record<string, string> = {
  ko: process.env.ELEVENLABS_VOICE_ID_KO ?? "LD5VPAjxmMpdmJU1Oept",
  en: process.env.ELEVENLABS_VOICE_ID_EN ?? "Xv5zYcc8R8aVmTK2C2Y9",
};

/** Voice synthesis tuning sent to ElevenLabs. */
export const VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.0,
  use_speaker_boost: true,
} as const;
