import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LANGUAGE,
  ELEVENLABS_MODEL_ID,
  ELEVENLABS_TTS_URL,
  VOICE_IDS,
  VOICE_SETTINGS,
} from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const { text, language = DEFAULT_LANGUAGE } = await req.json();

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

    const voiceId = VOICE_IDS[language] || VOICE_IDS[DEFAULT_LANGUAGE];

    const response = await fetch(`${ELEVENLABS_TTS_URL}/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: ELEVENLABS_MODEL_ID,
        voice_settings: VOICE_SETTINGS,
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
