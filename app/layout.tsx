import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.scss";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RootProviders } from "@/components/providers/RootProviders";

export const metadata: Metadata = {
  title: "DAKER — 해커톤 모집·팀·제출·랭킹",
  description:
    "해커톤 상세 안내, 팀 빌딩, 제출, 리더보드를 한 플랫폼에서. DAKER로 행사 운영과 참가자 경험을 연결합니다.",
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
