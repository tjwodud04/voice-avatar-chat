import { NextRequest, NextResponse } from "next/server";

// ElevenLabs API
const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

// Voice IDs for cloned voices
const VOICE_IDS: Record<string, string> = {
  ko: "LD5VPAjxmMpdmJU1Oept",
  en: "Xv5zYcc8R8aVmTK2C2Y9",
};

export async function POST(req: NextRequest) {
  try {
    const { text, language = "ko" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ELEVENLABS_API_KEY not configured" },
        { status: 500 }
      );
    }

    const voiceId = VOICE_IDS[language] || VOICE_IDS.ko;

    const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", errorText);
      return NextResponse.json(
        { error: "TTS generation failed", details: errorText },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech", details: String(error) },
      { status: 500 }
    );
  }
}
