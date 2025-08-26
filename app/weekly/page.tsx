"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import { WeeklyHighlightCard } from "@/components/weekly-highlight-card"
import { ShareModal } from "@/components/share-modal"
import type { WeeklyHighlight } from "@/lib/types"

export default function WeeklyPage() {
  const [weeklyData, setWeeklyData] = useState<WeeklyHighlight | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    const fetchWeeklyHighlight = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock 데이터
        const mockWeeklyData: WeeklyHighlight = {
          id: "weekly_123",
          userId: "user_123",
          weekStart: new Date("2025-08-18"),
          weekEnd: new Date("2025-08-24"),
          conversations: [
            {
              partnerLabel: "엄마",
              bestQuestions: [
                "어린 시절 추억의 간식은 무엇인가요?",
                "요즘 관심 있는 취미가 있나요?",
                "가족과 함께하고 싶은 여행지는?",
              ],
              totalCount: 7,
              responseRate: 100,
            },
            {
              partnerLabel: "아빠",
              bestQuestions: [
                "최근 새로 배운 것이 있다면?",
                "오늘 가장 기억에 남는 순간은?",
                "내일 가장 기대되는 일은?",
              ],
              totalCount: 5,
              responseRate: 80,
            },
            {
              partnerLabel: "할머니",
              bestQuestions: ["어린 시절 가장 좋아했던 놀이는?", "최근 감사했던 순간은?"],
              totalCount: 3,
              responseRate: 100,
            },
          ],
          createdAt: new Date(),
        }

        setWeeklyData(mockWeeklyData)
      } catch (error) {
        console.error("[v0] 주간 하이라이트 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeeklyHighlight()
  }, [])

  const handleShare = () => {
    setShowShareModal(true)
  }

  const getTotalStats = () => {
    if (!weeklyData) return { totalConversations: 0, averageResponseRate: 0 }

    const totalConversations = weeklyData.conversations.reduce((sum, conv) => sum + conv.totalCount, 0)
    const averageResponseRate =
      weeklyData.conversations.reduce((sum, conv) => sum + conv.responseRate, 0) / weeklyData.conversations.length

    return { totalConversations, averageResponseRate: Math.round(averageResponseRate) }
  }

  if (isLoading) {
    return (
      <AuthGuard requireAuth={true}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">이번 주 이야기를 정리하는 중...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (!weeklyData) {
    return (
      <AuthGuard requireAuth={true}>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="py-8">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-lg font-bold mb-2">아직 이번 주 이야기가 없어요</h3>
              <p className="text-muted-foreground mb-4">가족과 대화를 나눈 후 다시 확인해보세요</p>
              <Button onClick={() => (window.location.href = "/")}>홈으로 돌아가기</Button>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>
    )
  }

  const { totalConversations, averageResponseRate } = getTotalStats()

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary-600)" }}>
              📖 이번 주 우리 가족 이야기
            </h1>
            <p className="text-muted-foreground">
              {weeklyData.weekStart.getMonth() + 1}월 {weeklyData.weekStart.getDate()}일 ~{" "}
              {weeklyData.weekEnd.getMonth() + 1}월 {weeklyData.weekEnd.getDate()}일
            </p>
          </header>

          {/* Overall Stats */}
          <Card
            className="mb-6"
            style={{ backgroundColor: "var(--color-primary-100)", borderColor: "var(--color-primary-400)" }}
          >
            <CardContent className="py-6">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold" style={{ color: "var(--color-primary-600)" }}>
                      {totalConversations}회
                    </div>
                    <div className="text-sm text-muted-foreground">총 대화</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: "var(--color-primary-600)" }}>
                      {averageResponseRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">평균 응답률</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Conversations */}
          <div className="space-y-4 mb-8">
            {weeklyData.conversations.map((conversation, index) => (
              <WeeklyHighlightCard key={index} conversation={conversation} />
            ))}
          </div>

          {/* Share Actions */}
          <div className="space-y-3 mb-8">
            <Button
              onClick={handleShare}
              className="w-full h-12"
              style={{ backgroundColor: "#FEE500", color: "#000000" }}
            >
              <span className="mr-2">💬</span>
              카카오톡 공유하기
            </Button>
            <Button onClick={handleShare} variant="outline" className="w-full bg-transparent">
              <span className="mr-2">📷</span>
              인스타그램 스토리 공유
            </Button>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <Button onClick={() => (window.location.href = "/history")} variant="ghost" className="w-full">
              지난 주 이야기 보기
            </Button>
            <Button onClick={() => (window.location.href = "/")} variant="ghost" className="w-full">
              홈으로 돌아가기
            </Button>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && <ShareModal weeklyData={weeklyData} onClose={() => setShowShareModal(false)} />}
      </div>
    </AuthGuard>
  )
}
