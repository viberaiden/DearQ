import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"

export default function HomePage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">💝 마음배달</h1>
            <p className="text-muted-foreground">매일 하나의 질문으로 가족의 마음을 배달합니다</p>
          </header>

          {/* Today's Question Card */}
          <Card className="mb-6 bg-primary-100 border-primary-400">
            <CardHeader className="text-center">
              <CardTitle className="text-primary-600">2025.08.26 오늘의 질문</CardTitle>
              <CardDescription className="text-lg text-gray-700 mt-4">
                "최근 새로 시도해본 것이 있다면 무엇인가요?"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-sm text-primary-600 font-medium">확인</span>
                </div>
                <div className="w-5 h-0.5 bg-muted"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm">2</div>
                  <span className="text-sm text-muted-foreground">내 답변</span>
                </div>
                <div className="w-5 h-0.5 bg-muted"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm">3</div>
                  <span className="text-sm text-muted-foreground">가족 답변</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/send">
                  <Button className="w-full" size="lg">
                    가족에게 마음 전하기
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  내 마음 적기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Link href="/weekly">
              <Button variant="ghost" className="w-full justify-start text-left">
                📖 이번 주 우리 가족 이야기
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost" className="w-full justify-start text-left">
                ⏰ 지난 대화 보기
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-left">
              ⚙️ 설정
            </Button>
          </div>

          {/* Footer */}
          <footer className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">카카오 로그인으로 간편하게 시작하세요</p>
          </footer>
        </div>
      </div>
    </AuthGuard>
  )
}
