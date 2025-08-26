"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Conversation {
  partnerLabel: string
  bestQuestions: string[]
  totalCount: number
  responseRate: number
}

interface WeeklyHighlightCardProps {
  conversation: Conversation
}

export function WeeklyHighlightCard({ conversation }: WeeklyHighlightCardProps) {
  const getResponseRateColor = (rate: number) => {
    if (rate >= 90) return "var(--success)"
    if (rate >= 70) return "var(--warning)"
    return "var(--error)"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{conversation.partnerLabel}님과의 대화</span>
          <div className="flex items-center gap-2 text-sm">
            <span
              className="px-2 py-1 rounded-full text-white font-medium"
              style={{ backgroundColor: getResponseRateColor(conversation.responseRate) }}
            >
              {conversation.responseRate}%
            </span>
            <span className="text-muted-foreground">{conversation.totalCount}회</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Best 3 대화</h4>
            <div className="space-y-2">
              {conversation.bestQuestions.slice(0, 3).map((question, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "var(--color-secondary-600)" }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {conversation.bestQuestions.length > 3 && (
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                그 외 {conversation.bestQuestions.length - 3}개 대화
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
