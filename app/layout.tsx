import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daker — 해커톤 플랫폼",
  description: "해커톤 목록, 팀, 제출, 리더보드 (localStorage 데모)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background">
        <div className="mx-auto min-h-screen max-w-content px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
