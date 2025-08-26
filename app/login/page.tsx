"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { tempLogin } = useAuth()

  const handleKakaoLogin = async () => {
    setIsLoading(true)
    try {
      console.log("[v0] 카카오 로그인 시도")

      // 실제 구현에서는 카카오 SDK 사용
      // window.Kakao.Auth.login({...})

      // Mock 응답 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 성공 시 홈으로 리다이렉트
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] 로그인 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTempLogin = () => {
    console.log("[v0] 임시 진입 버튼 클릭")
    tempLogin()
    setTimeout(() => {
      window.location.href = "/onboarding"
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary-600">💝 마음배달</h1>
          <p className="text-lg text-muted-foreground mb-2">매일 하나의 질문으로</p>
          <p className="text-lg text-muted-foreground">가족의 마음을 배달합니다</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-primary-400 bg-primary-100">
          <CardHeader className="text-center">
            <CardTitle className="text-primary-600">누구에게 마음을 전할까요?</CardTitle>
            <CardDescription className="text-base">카카오 로그인으로 간편하게 시작하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleKakaoLogin}
              disabled={isLoading}
              className="w-full h-12 text-base font-medium bg-yellow-400 hover:bg-yellow-500 text-black border-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  로그인 중...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>💬</span>
                  카카오로 시작하기
                </div>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">앱 설치 없이 바로 시작할 수 있어요</p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary-100">
              <span className="text-secondary-600">✍️</span>
            </div>
            <span>먼저 내 마음부터 전해보세요</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary-100">
              <span className="text-secondary-600">💕</span>
            </div>
            <span>서로의 마음이 연결되었어요!</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary-100">
              <span className="text-secondary-600">📖</span>
            </div>
            <span>이번 주 우리 가족 이야기</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <Button
            onClick={handleTempLogin}
            variant="outline"
            className="w-full text-sm bg-transparent border-primary-400 text-primary-600 hover:bg-primary-100"
          >
            🔧 임시 진입 (개발용)
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">개발 환경에서만 사용하는 버튼입니다</p>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4">
          <p className="text-xs text-muted-foreground">개인정보처리방침 | 서비스 이용약관</p>
        </footer>
      </div>
    </div>
  )
}
