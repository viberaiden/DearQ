"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnswerForm } from "@/components/answer-form"
import { PartnerAnswer } from "@/components/partner-answer"
import { CelebrationEffect } from "@/components/celebration-effect"

type AnswerStep = "loading" | "writing" | "submitted" | "revealed" | "completed"

interface QuestionData {
  id: string
  question: string
  senderName: string
  category: string
  senderAnswer?: string
  isExpired: boolean
}

export default function AnswerPage() {
  const params = useParams()
  const token = params.token as string

  const [questionData, setQuestionData] = useState<QuestionData | null>(null)
  const [currentStep, setCurrentStep] = useState<AnswerStep>("loading")
  const [myAnswer, setMyAnswer] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock 데이터 - 실제로는 API 호출
        const mockData: QuestionData = {
          id: "q_123",
          question: "최근 새로 시도해본 것이 있다면 무엇인가요?",
          senderName: "김마음",
          category: "일상",
          senderAnswer: "요가 수업에 처음 참여해봤어요. 생각보다 어려웠지만 몸이 개운해지는 느낌이 좋더라고요!",
          isExpired: false,
        }

        setQuestionData(mockData)
        setCurrentStep("writing")
      } catch (error) {
        console.error("[v0] 질문 데이터 조회 실패:", error)
        setCurrentStep("loading")
      }
    }

    if (token) {
      fetchQuestionData()
    }
  }, [token])

  const handleSubmitAnswer = async (answer: string) => {
    try {
      setMyAnswer(answer)
      setCurrentStep("submitted")

      // Mock: 답변 저장
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setCurrentStep("revealed")
      setShowCelebration(true)

      // 축하 효과 후 자동으로 완료 상태로 전환
      setTimeout(() => {
        setShowCelebration(false)
        setCurrentStep("completed")
      }, 2000)
    } catch (error) {
      console.error("[v0] 답변 저장 실패:", error)
    }
  }

  const handleReaction = async (emoji: string) => {
    try {
      console.log("[v0] 이모지 반응:", emoji)
      // Mock: 반응 저장
      await new Promise((resolve) => setTimeout(resolve, 300))
    } catch (error) {
      console.error("[v0] 반응 저장 실패:", error)
    }
  }

  if (currentStep === "loading") {
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
    <div className="min-h-screen bg-background relative">
      {/* 축하 효과 */}
      {showCelebration && <CelebrationEffect />}

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary-600)" }}>
            💝 마음배달
          </h1>
          <p className="text-muted-foreground">{questionData.senderName}님과의 대화</p>
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
            <div className="bg-white rounded-lg p-4 border-2 mb-4" style={{ borderColor: "var(--color-primary-400)" }}>
              <p className="text-base font-medium text-gray-800">{questionData.question}</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    ["submitted", "revealed", "completed"].includes(currentStep)
                      ? "bg-success text-white"
                      : currentStep === "writing"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                  }`}
                >
                  {["submitted", "revealed", "completed"].includes(currentStep) ? "✓" : "1"}
                </div>
                <span
                  className={`text-sm ${
                    ["submitted", "revealed", "completed"].includes(currentStep)
                      ? "text-success font-medium"
                      : currentStep === "writing"
                        ? "text-primary-600 font-medium"
                        : "text-muted-foreground"
                  }`}
                >
                  내 답변
                </span>
              </div>
              <div className="w-5 h-0.5 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    ["revealed", "completed"].includes(currentStep) ? "bg-success text-white" : "bg-muted"
                  }`}
                >
                  {["revealed", "completed"].includes(currentStep) ? "✓" : "2"}
                </div>
                <span
                  className={`text-sm ${
                    ["revealed", "completed"].includes(currentStep)
                      ? "text-success font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  가족 답변
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* My Answer */}
          <div>
            <h3 className="text-lg font-medium mb-3">내 답변</h3>
            {currentStep === "writing" ? (
              <AnswerForm onSubmit={handleSubmitAnswer} />
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-base leading-relaxed">{myAnswer}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">내가 작성</span>
                    <span className="text-sm text-success">✓ 전송완료</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Partner Answer */}
          <div>
            <h3 className="text-lg font-medium mb-3">{questionData.senderName}님의 답변</h3>
            <PartnerAnswer
              answer={questionData.senderAnswer || ""}
              isRevealed={["revealed", "completed"].includes(currentStep)}
              isSubmitted={["submitted", "revealed", "completed"].includes(currentStep)}
              onReaction={handleReaction}
            />
          </div>
        </div>

        {/* Completion Actions */}
        {currentStep === "completed" && (
          <div className="mt-8 space-y-3">
            <Button onClick={() => (window.location.href = "/")} className="w-full">
              홈으로 돌아가기
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              이번 주 우리 가족 이야기 보기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
