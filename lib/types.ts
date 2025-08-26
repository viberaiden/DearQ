export interface User {
  id: string
  kakaoId: string
  nickname: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  content: string
  category: QuestionCategory
  isActive: boolean
  createdAt: Date
}

export type QuestionCategory = "일상" | "가족" | "추억" | "미래" | "감정"

export interface Answer {
  id: string
  questionId: string
  userId: string
  content: string
  isRevealed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FamilyConnection {
  id: string
  senderId: string
  receiverId: string
  label: string // "엄마", "아빠", "할머니" 등
  isActive: boolean
  createdAt: Date
}

export interface QuestionSession {
  id: string
  questionId: string
  senderId: string
  receiverId: string
  senderAnswerId?: string
  receiverAnswerId?: string
  token: string // 1회용 링크 토큰
  status: "pending" | "sender_answered" | "completed" | "expired"
  createdAt: Date
  expiresAt: Date
}

export interface WeeklyHighlight {
  id: string
  userId: string
  weekStart: Date
  weekEnd: Date
  conversations: {
    partnerLabel: string
    bestQuestions: string[]
    totalCount: number
    responseRate: number
  }[]
  createdAt: Date
}
