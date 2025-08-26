import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"

export const metadata: Metadata = {
  title: "마음배달 - 매일 하나의 질문으로 가족과 소통하세요",
  description: "카카오 로그인으로 간편하게 시작하는 가족 간 일일 질문 공유 서비스",
  generator: "v0.app",
  keywords: ["가족", "소통", "질문", "마음", "카카오톡", "일상"],
  openGraph: {
    title: "마음배달 - 가족과의 따뜻한 소통",
    description: "매일 하나의 질문으로 가족의 마음을 배달합니다",
    type: "website",
  },
}

function MSWProvider({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    import("/public/msw/browser.js")
      .then(({ worker }) => {
        worker
          .start({
            onUnhandledRequest: "bypass",
          })
          .then(() => {
            console.log("[v0] MSW 시작 완료")
          })
          .catch((err: any) => {
            console.error("[v0] MSW 시작 실패:", err)
          })
      })
      .catch((err: any) => {
        console.log("[v0] MSW 모듈 로드 실패:", err)
      })
  }

  return <>{children}</>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <MSWProvider>
          <AuthProvider>{children}</AuthProvider>
        </MSWProvider>
      </body>
    </html>
  )
}
