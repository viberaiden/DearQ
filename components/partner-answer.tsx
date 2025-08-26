"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MICROCOPY } from "@/lib/constants"

interface PartnerAnswerProps {
  answer: string
  isRevealed: boolean
  isSubmitted: boolean
  onReaction: (emoji: string) => void
}

const REACTION_EMOJIS = ["❤️", "👍", "😊", "👏", "🥰", "😮", "😢", "😂"]

export function PartnerAnswer({ answer, isRevealed, isSubmitted, onReaction }: PartnerAnswerProps) {
  const [selectedReactions, setSelectedReactions] = useState<string[]>([])

  const handleReactionClick = (emoji: string) => {
    if (!isRevealed) return

    const isSelected = selectedReactions.includes(emoji)
    if (isSelected) {
      setSelectedReactions(selectedReactions.filter((e) => e !== emoji))
    } else {
      setSelectedReactions([...selectedReactions, emoji])
    }

    onReaction(emoji)
  }

  if (!isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <p className="text-muted-foreground">{MICROCOPY.REVEAL_GATE}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div
          className={`transition-all duration-500 ${
            isRevealed ? "filter-none opacity-100" : "filter blur-md opacity-70"
          }`}
        >
          <p className="text-base leading-relaxed mb-4">{answer}</p>

          {/* Reaction Emojis */}
          {isRevealed && (
            <div className="flex flex-wrap gap-2 justify-center pt-3 border-t border-border">
              {REACTION_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReactionClick(emoji)}
                  className={`text-lg p-2 rounded-full transition-all duration-150 hover:scale-110 active:scale-95 ${
                    selectedReactions.includes(emoji)
                      ? "bg-primary-400 shadow-md"
                      : "bg-primary-100 hover:bg-primary-200"
                  }`}
                  style={{
                    backgroundColor: selectedReactions.includes(emoji)
                      ? "var(--color-primary-400)"
                      : "var(--color-primary-100)",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {!isRevealed && (
          <div className="text-center mt-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm"
              style={{ backgroundColor: "var(--color-secondary-100)" }}
            >
              <div className="w-2 h-2 bg-secondary-600 rounded-full animate-pulse"></div>
              <span style={{ color: "var(--color-secondary-600)" }}>답변 확인 중...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
