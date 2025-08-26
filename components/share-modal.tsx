"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeeklyHighlight } from "@/lib/types"

interface ShareModalProps {
  weeklyData: WeeklyHighlight
  onClose: () => void
}

export function ShareModal({ weeklyData, onClose }: ShareModalProps) {
  const generateShareText = () => {
    const totalConversations = weeklyData.conversations.reduce((sum, conv) => sum + conv.totalCount, 0)
    const averageResponseRate =
      weeklyData.conversations.reduce((sum, conv) => sum + conv.responseRate, 0) / weeklyData.conversations.length

    const bestConversations = weeklyData.conversations
      .flatMap((conv) => conv.bestQuestions.slice(0, 2).map((q) => `• ${q}`))
      .slice(0, 3)

    return `💝 이번 주 우리 가족 이야기

📅 ${weeklyData.weekStart.getMonth() + 1}월 ${weeklyData.weekStart.getDate()}일 ~ ${weeklyData.weekEnd.getMonth() + 1}월 ${weeklyData.weekEnd.getDate()}일

📊 총 ${totalConversations}회 대화 | 응답률 ${Math.round(averageResponseRate)}%

🏆 이번 주 Best 대화:
${bestConversations.join("\n")}

매일 하나의 질문으로 가족과 소통해보세요!
#마음배달 #가족소통 #일상대화`
  }

  const handleKakaoShare = () => {
    const shareText = generateShareText()

    if (navigator.share) {
      navigator.share({
        title: "이번 주 우리 가족 이야기",
        text: shareText,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert("텍스트가 복사되었습니다!")
    }
    onClose()
  }

  const handleInstagramShare = () => {
    // Mock: 인스타그램 스토리 공유
    const shareText = generateShareText()
    navigator.clipboard.writeText(shareText)
    alert("텍스트가 복사되었습니다! 인스타그램 스토리에 붙여넣어 주세요.")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">공유하기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preview */}
          <div className="bg-muted p-4 rounded-lg text-sm">
            <pre className="whitespace-pre-wrap font-sans">{generateShareText()}</pre>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <Button
              onClick={handleKakaoShare}
              className="w-full"
              style={{ backgroundColor: "#FEE500", color: "#000000" }}
            >
              <span className="mr-2">💬</span>
              카카오톡으로 공유
            </Button>
            <Button onClick={handleInstagramShare} variant="outline" className="w-full bg-transparent">
              <span className="mr-2">📷</span>
              인스타그램 스토리
            </Button>
            <Button
              onClick={() => navigator.clipboard.writeText(generateShareText())}
              variant="outline"
              className="w-full bg-transparent"
            >
              <span className="mr-2">📋</span>
              텍스트 복사
            </Button>
          </div>

          <Button onClick={onClose} variant="ghost" className="w-full">
            닫기
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
