"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface QuestionPreviewProps {
  question: string
  familyLabel: string
  category: string
  onSend: () => void
  onBack: () => void
}

export function QuestionPreview({ question, familyLabel, category, onSend, onBack }: QuestionPreviewProps) {
  return (
    <div className="space-y-6">
      {/* 질문 미리보기 카드 */}
      <Card
        className="text-center"
        style={{ backgroundColor: "var(--color-primary-100)", borderColor: "var(--color-primary-400)" }}
      >
        <CardHeader>
          <CardTitle style={{ color: "var(--color-primary-600)" }}>{familyLabel}님께 전할 오늘의 질문</CardTitle>
          <CardDescription>카테고리: {category}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-6 border-2" style={{ borderColor: "var(--color-primary-400)" }}>
            <p className="text-lg font-medium text-gray-800">{question}</p>
          </div>

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "var(--color-secondary-100)" }}>
            <p className="text-sm" style={{ color: "var(--color-secondary-600)" }}>
              ✍️ 먼저 내 마음부터 전해보세요
              <br />
              상대방은 내 답변을 작성한 후에만 볼 수 있어요
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 전송 방법 안내 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">전송 후 진행 과정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span>카카오톡으로 질문 링크 전송</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">2</div>
              <span>내 답변 먼저 작성하기</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">3</div>
              <span>{familyLabel}님 답변 확인하기</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="space-y-3">
        <Button onClick={onSend} className="w-full h-12">
          마음 전달하기
        </Button>
        <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
          다시 선택하기
        </Button>
      </div>
    </div>
  )
}
