"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuestionPage() {
  const params = useParams()
  const token = params.token as string

  const [questionData, setQuestionData] = useState<{
    question: string
    senderName: string
    category: string
    isExpired: boolean
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock: 토큰으로 질문 데이터 조회
    const fetchQuestionData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock 데이터
        setQuestionData({
          question: "최근 새로 시도해본 것이 있다면 무엇인가요?",
          senderName: "김마음",
          category: "일상",
          isExpired: false,
        })
      } catch (error) {
        console.error("[v0] 질문 데이터 조회 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      fetchQuestionData()
    }
  }, [token])

  const handleStartAnswer = () => {
    window.location.href = `/answer/${token}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">질문을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!questionData || questionData.isExpired) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-8">
            <div className="text-4xl mb-4">😔</div>
            <h3 className="text-lg font-bold mb-2">질문을 찾을 수 없어요</h3>
            <p className="text-muted-foreground mb-4">링크가 만료되었거나 잘못된 주소입니다</p>
            <Button onClick={() => (window.location.href = "/")}>홈으로 돌아가기</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary-600)" }}>
            💝 마음배달
          </h1>
          <p className="text-muted-foreground">{questionData.senderName}님이 마음을 전해왔어요</p>
        </header>

        {/* Question Card */}
        <Card
          className="mb-6 text-center"
          style={{ backgroundColor: "var(--color-primary-100)", borderColor: "var(--color-primary-400)" }}
        >
          <CardHeader>
            <CardTitle style={{ color: "var(--color-primary-600)" }}>오늘의 질문</CardTitle>
            <CardDescription>카테고리: {questionData.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-6 border-2 mb-6" style={{ borderColor: "var(--color-primary-400)" }}>
              <p className="text-lg font-medium text-gray-800">{questionData.question}</p>
            </div>

            <Button onClick={handleStartAnswer} className="w-full h-12">
              답변하러 가기
            </Button>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "var(--color-secondary-100)" }}>
          <p className="text-sm" style={{ color: "var(--color-secondary-600)" }}>
            💡 {questionData.senderName}님의 답변은 내 답변을 작성한 후에 볼 수 있어요
          </p>
        </div>
      </div>
    </div>
  )
}
