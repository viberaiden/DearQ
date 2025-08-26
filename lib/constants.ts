type QuestionCategory = string // Declare the QuestionCategory type

export const QUESTION_CATEGORIES: QuestionCategory[] = ["일상", "가족", "추억", "미래", "감정"]

export const MICROCOPY = {
  SEND_HEART: "누구에게 마음을 전할까요?",
  WRITE_FIRST: "먼저 내 마음부터 전해보세요",
  HEARTS_CONNECTED: "서로의 마음이 연결되었어요!",
  WEEKLY_STORY: "이번 주 우리 가족 이야기",
  ANSWER_PLACEHOLDER: "내 마음을 전해주세요... (최대 500자)",
  REVEAL_GATE: "내 마음을 먼저 전해주세요",
} as const

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  QUESTION: "/question/[token]",
  ANSWER: "/answer/[token]",
  WEEKLY: "/weekly",
  HISTORY: "/history",
  SETTINGS: "/settings",
} as const

export const CONFIG = {
  ANSWER_MAX_LENGTH: 500,
  TOKEN_EXPIRY_HOURS: 24,
  WEEKLY_GENERATION_DAY: 0, // 일요일
  WEEKLY_GENERATION_HOUR: 18, // 오후 6시
} as const
