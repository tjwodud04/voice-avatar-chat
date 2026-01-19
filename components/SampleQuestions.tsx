"use client";

import type { Language } from "@/app/page";

interface SampleQuestionsProps {
  onSelect: (question: string) => void;
  language: Language;
}

const SAMPLE_QUESTIONS: Record<Language, string[]> = {
  ko: [
    "어떤 연구를 하고 계신가요?",
    "주요 프로젝트를 소개해주세요",
    "연락처와 SNS를 알려주세요",
  ],
  en: [
    "What kind of research do you do?",
    "Tell me about your main projects",
    "How can I contact you?",
  ],
};

const LABELS: Record<Language, string> = {
  ko: "예시 질문",
  en: "Sample Questions",
};

export default function SampleQuestions({ onSelect, language }: SampleQuestionsProps) {
  return (
    <div className="px-4 pb-4">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
          {LABELS[language]}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SAMPLE_QUESTIONS[language].map((question) => (
            <button
              key={question}
              onClick={() => onSelect(question)}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
