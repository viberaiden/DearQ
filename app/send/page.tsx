"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chip } from "@/components/ui/chip"
import { AuthGuard } from "@/components/auth-guard"
import { QUESTION_CATEGORIES, MICROCOPY } from "@/lib/constants"
import { FamilySelector } from "@/components/family-selector"
import { QuestionPreview } from "@/components/question-preview"

type Step = "family" | "category" | "preview" | "sending" | "success"

export default function SendQuestionPage() {
  const [currentStep, setCurrentStep] = useState<Step>("family")
  const [selectedFamily, setSelectedFamily] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [todaysQuestion, setTodaysQuestion] = useState<string>("")
  const [shareLink, setShareLink] = useState<string>("")

  const handleFamilySelect = (familyLabel: string) => {
    setSelectedFamily(familyLabel)
    setCurrentStep("category")
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    // Mock: 카테고리에 따른 오늘의 질문 가져오기
    const mockQuestions = {
      일상: "오늘 가장 기억에 남는 순간은 무엇인가요?",
      가족: "가족과 함께 하고 싶은 새로운 활동이 있다면?",
      추억: "어린 시절 가장 좋아했던 놀이는 무엇인가요?",
      미래: "1년 후 나는 어떤 모습일까요?",
      감정: "최근 가장 감사했던 순간은 언제인가요?",
    }
    setTodaysQuestion(mockQuestions[category as keyof typeof mockQuestions] || "오늘은 어떤 하루였나요?")
    setCurrentStep("preview")
  }

  const handleSendQuestion = async () => {
    setCurrentStep("sending")

    try {
      // Mock: 질문 전송 및 토큰 생성
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockToken = `token_${Date.now()}`
      const mockLink = `${window.location.origin}/question/${mockToken}`
      setShareLink(mockLink)
      setCurrentStep("success")
    } catch (error) {
      console.error("[v0] 질문 전송 실패:", error)
      // 에러 처리
    }
  }

  const handleKakaoShare = () => {
    // Mock: 카카오톡 공유
    const message = `💝 ${selectedFamily}님께 마음을 전해보세요!\n\n"${todaysQuestion}"\n\n${shareLink}`

    if (navigator.share) {
      navigator.share({
        title: "마음배달 - 오늘의 질문",
        text: message,
        url: shareLink,
      })
    } else {
      // 폴백: 클립보드 복사
      navigator.clipboard.writeText(message)
      alert("링크가 복사되었습니다!")
    }
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-primary-600)" }}>
              {MICROCOPY.SEND_HEART}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${currentStep === "family" ? "bg-primary" : "bg-muted"}`}></div>
              <div className={`w-2 h-2 rounded-full ${currentStep === "category" ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`w-2 h-2 rounded-full ${["preview", "sending", "success"].includes(currentStep) ? "bg-primary" : "bg-muted"}`}
              ></div>
            </div>
          </header>

          {/* Step Content */}
          {currentStep === "family" && <FamilySelector onSelect={handleFamilySelect} />}

          {currentStep === "category" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center">어떤 이야기를 나누고 싶나요?</CardTitle>
                <CardDescription className="text-center">{selectedFamily}님과 나눌 주제를 선택해주세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {QUESTION_CATEGORIES.map((category) => (
                    <Chip
                      key={category}
                      variant="category"
                      active={selectedCategory === category}
                      onClick={() => handleCategorySelect(category)}
                      className="justify-center"
                    >
                      {category}
                    </Chip>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "preview" && (
            <QuestionPreview
              question={todaysQuestion}
              familyLabel={selectedFamily}
              category={selectedCategory}
              onSend={handleSendQuestion}
              onBack={() => setCurrentStep("category")}
            />
          )}

          {currentStep === "sending" && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-medium mb-2">마음을 전달하는 중...</h3>
                <p className="text-muted-foreground">잠시만 기다려주세요</p>
              </CardContent>
            </Card>
          )}

          {currentStep === "success" && (
            <div className="space-y-6">
              <Card
                className="text-center"
                style={{ backgroundColor: "var(--color-primary-100)", borderColor: "var(--color-primary-400)" }}
              >
                <CardContent className="py-8">
                  <div className="text-4xl mb-4">💝</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-primary-600)" }}>
                    마음이 준비되었어요!
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedFamily}님께 질문을 전달해보세요</p>
                  <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: "var(--color-primary-400)" }}>
                    <p className="text-sm font-medium mb-2">오늘의 질문</p>
                    <p className="text-base">{todaysQuestion}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button
                  onClick={handleKakaoShare}
                  className="w-full h-12"
                  style={{
                    backgroundColor: "#FEE500",
                    color: "#000000",
                    border: "none",
                  }}
                >
                  <span className="mr-2">💬</span>
                  카카오톡으로 전송하기
                </Button>

                <Button variant="outline" onClick={() => navigator.clipboard.writeText(shareLink)} className="w-full">
                  링크 복사하기
                </Button>

                <Button variant="ghost" onClick={() => (window.location.href = "/")} className="w-full">
                  홈으로 돌아가기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
