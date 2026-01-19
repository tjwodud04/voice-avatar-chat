"use client";

import type { Message } from "@/app/page";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const displayText = message.displayedContent ?? message.content;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {displayText}
          {message.isTyping && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current" />
          )}
        </p>
      </div>
    </div>
  );
}
