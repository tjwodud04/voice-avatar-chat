"use client";

import { useState, useRef } from "react";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import SampleQuestions from "@/components/SampleQuestions";

export type Language = "ko" | "en";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  displayedContent?: string;
  isTyping?: boolean;
}

const INTRO_MESSAGES: Record<Language, Message> = {
  ko: {
    id: "intro",
    role: "assistant",
    content: `반갑습니다! 저는 서재영의 AI 아바타예요.
궁금한 거 있으시면 편하게 물어봐 주세요 :)`,
  },
  en: {
    id: "intro",
    role: "assistant",
    content: `Hey there! I'm Jae Young's AI avatar.
Got any questions? Fire away!`,
  },
};

const TITLES: Record<Language, string> = {
  ko: "안녕하세요, 저는 재영입니다!",
  en: "Hey, I'm Jae Young — AMA!",
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("ko");
  const [messages, setMessages] = useState<Message[]>([INTRO_MESSAGES.ko]);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleLanguage = () => {
    const newLang = language === "ko" ? "en" : "ko";
    setLanguage(newLang);
    if (messages.length === 1 && messages[0].id === "intro") {
      setMessages([INTRO_MESSAGES[newLang]]);
    }
  };

  // Typing effect synced with audio duration
  const startTypingEffect = (
    messageId: string,
    fullText: string,
    durationMs: number
  ) => {
    const chars = [...fullText];
    const charDelay = durationMs / chars.length;
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < chars.length) {
        currentIndex++;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  displayedContent: chars.slice(0, currentIndex).join(""),
                  isTyping: currentIndex < chars.length,
                }
              : m
          )
        );
        setTimeout(typeNextChar, charDelay);
      }
    };

    typeNextChar();
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get LLM response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMessageId = (Date.now() + 1).toString();
      let fullContent = "";

      // Stream LLM response (collect full text, don't show yet - just show typing indicator)
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          fullContent += chunk;
        }
      }

      // Now get TTS and sync typing with audio
      if (fullContent) {
        try {
          const ttsResponse = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: fullContent,
              language,
            }),
          });

          if (ttsResponse.ok) {
            const audioBlob = await ttsResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Create audio element
            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            // Wait for audio metadata to get duration
            audio.addEventListener("loadedmetadata", () => {
              const durationMs = audio.duration * 1000;

              // Hide typing indicator and add the message
              setIsLoading(false);

              const assistantMessage: Message = {
                id: assistantMessageId,
                role: "assistant",
                content: fullContent,
                displayedContent: "",
                isTyping: true,
              };
              setMessages((prev) => [...prev, assistantMessage]);

              // Start typing and audio simultaneously
              startTypingEffect(assistantMessageId, fullContent, durationMs);
              audio.play().catch(console.error);
            });

            // Handle audio end
            audio.addEventListener("ended", () => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId
                    ? {
                        ...m,
                        displayedContent: fullContent,
                        isTyping: false,
                      }
                    : m
                )
              );
            });

            audio.load();
          } else {
            // TTS failed - show message without audio
            setIsLoading(false);
            setMessages((prev) => [
              ...prev,
              {
                id: assistantMessageId,
                role: "assistant",
                content: fullContent,
              },
            ]);
          }
        } catch (ttsError) {
          console.error("TTS error:", ttsError);
          // TTS failed - show message without audio
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              id: assistantMessageId,
              role: "assistant",
              content: fullContent,
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.",
        },
      ]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="w-12" />
          <h1 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
            {TITLES[language]}
          </h1>
          <button
            onClick={toggleLanguage}
            className="w-12 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {language === "ko" ? "EN" : "KO"}
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatWindow messages={messages} isLoading={isLoading} />

        {/* Sample Questions - Show only when just intro message */}
        {messages.length === 1 && (
          <SampleQuestions onSelect={handleSendMessage} language={language} />
        )}

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </main>
  );
}
