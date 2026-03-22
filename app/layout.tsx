import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.scss";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RootProviders } from "@/components/providers/RootProviders";

export const metadata: Metadata = {
  title: "DAKER Hackathon — Developer Hackathon Platform",
  description:
    "다크 모드 해커톤 랜딩. 목록·팀·제출·랭킹 플로우를 브라우저에서 검증하는 데모 플랫폼.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning data-theme="dark">
      <body className="min-h-screen bg-background">
        <Script id="daker-theme-boot" strategy="beforeInteractive">
          {`(function(){try{var k='daker-theme';var t=localStorage.getItem(k);if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);return;}var m=window.matchMedia('(prefers-color-scheme: light)');document.documentElement.setAttribute('data-theme',m.matches?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`}
        </Script>
        <RootProviders>
          <div className="ds-page">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </RootProviders>
      </body>
    </html>
  );
}
