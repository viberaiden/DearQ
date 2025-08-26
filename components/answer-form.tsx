"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CONFIG, MICROCOPY } from "@/lib/constants"

interface AnswerFormProps {
  onSubmit: (answer: string) => void
}

export function AnswerForm({ onSubmit }: AnswerFormProps) {
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (answer.trim().length === 0) {
      alert("답변을 입력해주세요!")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(answer.trim())
    } catch (error) {
      console.error("[v0] 답변 제출 실패:", error)
      setIsSubmitting(false)
    }
  }

  const remainingChars = CONFIG.ANSWER_MAX_LENGTH - answer.length

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={MICROCOPY.ANSWER_PLACEHOLDER}
          maxLength={CONFIG.ANSWER_MAX_LENGTH}
          className="w-full min-h-[120px] p-3 border-2 border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          disabled={isSubmitting}
        />

        <div className="flex items-center justify-between">
          <span
            className={`text-sm ${
              remainingChars < 50 ? "text-warning" : remainingChars < 10 ? "text-error" : "text-muted-foreground"
            }`}
          >
            {answer.length}/{CONFIG.ANSWER_MAX_LENGTH}자
          </span>

          <Button onClick={handleSubmit} disabled={isSubmitting || answer.trim().length === 0}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                전송 중...
              </div>
            ) : (
              "마음 전달하기"
            )}
          </Button>
        </div>

        {/* 안내 메시지 */}
        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "var(--color-secondary-100)" }}>
          <p className="text-sm" style={{ color: "var(--color-secondary-600)" }}>
            ✍️ {MICROCOPY.WRITE_FIRST}
            <br />
            상대방 답변은 내 답변 작성 후에 볼 수 있어요
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
