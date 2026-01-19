import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hey, I'm Jae Young — Ask Me Anything!",
  description: "AI-powered voice chatbot that speaks about Jae Young Suh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
