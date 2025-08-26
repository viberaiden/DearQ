"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import { WeeklyHighlightCard } from "@/components/weekly-highlight-card"
import type { WeeklyHighlight } from "@/lib/types"

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<WeeklyHighlight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock 데이터 - 지난 4주간의 하이라이트
        const mockHistory: WeeklyHighlight[] = [
          {
            id: "weekly_123",
            userId: "user_123",
            weekStart: new Date("2025-08-18"),
            weekEnd: new Date("2025-08-24"),
            conversations: [
              {
                partnerLabel: "엄마",
                bestQuestions: ["어린 시절 추억의 간식은?", "요즘 관심 있는 취미가 있나요?"],
                totalCount: 7,
                responseRate: 100,
              },
            ],
            createdAt: new Date(),
          },
          {
            id: "weekly_122",
            userId: "user_123",
            weekStart: new Date("2025-08-11"),
            weekEnd: new Date("2025-08-17"),
            conversations: [
              {
                partnerLabel: "아빠",
                bestQuestions: ["최근 새로 배운 것이 있다면?", "오늘 가장 기억에 남는 순간은?"],
                totalCount: 5,
                responseRate: 80,
              },
            ],
            createdAt: new Date(),
          },
          {
            id: "weekly_121",
            userId: "user_123",
            weekStart: new Date("2025-08-04"),
            weekEnd: new Date("2025-08-10"),
            conversations: [
              {
                partnerLabel: "할머니",
                bestQuestions: ["어린 시절 가장 좋아했던 놀이는?"],
                totalCount: 3,
                responseRate: 100,
              },
            ],
            createdAt: new Date(),
          },
        ]

        setHistoryData(mockHistory)
      } catch (error) {
        console.error("[v0] 히스토리 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (isLoading) {
    return (
      <AuthGuard requireAuth={true}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">지난 이야기를 불러오는 중...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary-600)" }}>
              ⏰ 지난 대화 보기
            </h1>
            <p className="text-muted-foreground">우리 가족의 소중한 대화 기록</p>
          </header>

          {historyData.length === 0 ? (
            <Card className="text-center">
              <CardContent className="py-8">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-lg font-bold mb-2">아직 대화 기록이 없어요</h3>
                <p className="text-muted-foreground mb-4">가족과 대화를 나눈 후 다시 확인해보세요</p>
                <Button onClick={() => (window.location.href = "/")}>홈으로 돌아가기</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {historyData.map((weekData) => (
                <Card key={weekData.id}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {weekData.weekStart.getMonth() + 1}월 {weekData.weekStart.getDate()}일 ~{" "}
                      {weekData.weekEnd.getMonth() + 1}월 {weekData.weekEnd.getDate()}일
                    </CardTitle>
                    <CardDescription>
                      총 {weekData.conversations.reduce((sum, conv) => sum + conv.totalCount, 0)}회 대화
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {weekData.conversations.map((conversation, index) => (
                      <WeeklyHighlightCard key={index} conversation={conversation} />
                    ))}
                  </CardContent>
                </Card>
              ))}

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" className="bg-transparent">
                  더 보기
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 space-y-3">
            <Button onClick={() => (window.location.href = "/weekly")} variant="ghost" className="w-full">
              이번 주 이야기 보기
            </Button>
            <Button onClick={() => (window.location.href = "/")} variant="ghost" className="w-full">
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
