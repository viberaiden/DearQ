"use client"

import { useEffect, useState } from "react"

export function CelebrationEffect() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([])

  useEffect(() => {
    // 컨페티 생성
    const newConfetti = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: i % 3 === 0 ? "var(--color-primary-500)" : i % 3 === 1 ? "var(--color-secondary-600)" : "var(--success)",
      delay: Math.random() * 0.3,
    }))

    setConfetti(newConfetti)

    // 2초 후 정리
    const cleanup = setTimeout(() => {
      setConfetti([])
    }, 2000)

    return () => clearTimeout(cleanup)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 중앙 메시지 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="bg-white rounded-lg p-6 shadow-lg border-2 animate-bounce"
          style={{ borderColor: "var(--color-primary-400)" }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🎉</div>
            <p className="text-lg font-bold" style={{ color: "var(--color-primary-600)" }}>
              마음이 전달되었어요!
            </p>
          </div>
        </div>
      </div>

      {/* 컨페티 효과 */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: "0.8s",
            animationFillMode: "forwards",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(200px) rotate(180deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
