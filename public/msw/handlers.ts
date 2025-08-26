import { http, HttpResponse } from "msw"

export const handlers = [
  // 카카오 로그인 성공 시나리오
  http.post("/api/auth/kakao", async ({ request }) => {
    const { kakaoToken } = (await request.json()) as { kakaoToken: string }

    // 시나리오 분기를 위한 토큰 체크
    if (kakaoToken === "error_token") {
      return HttpResponse.json({ error: "카카오 인증에 실패했습니다" }, { status: 401 })
    }

    if (kakaoToken === "network_error") {
      return HttpResponse.error()
    }

    if (kakaoToken === "slow_response") {
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }

    // 기본 성공 응답
    return HttpResponse.json({
      user: {
        id: "user_123",
        kakaoId: "kakao_456",
        nickname: "김마음",
        profileImage: "https://via.placeholder.com/100",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: "mock_jwt_token_" + Date.now(),
    })
  }),

  // 사용자 프로필 조회
  http.get("/api/user/profile", ({ request }) => {
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json({ error: "인증이 필요합니다" }, { status: 401 })
    }

    return HttpResponse.json({
      id: "user_123",
      kakaoId: "kakao_456",
      nickname: "김마음",
      profileImage: "https://via.placeholder.com/100",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }),

  // 질문 전송
  http.post("/api/questions/send", async ({ request }) => {
    const { familyLabel, category, questionId } = (await request.json()) as {
      familyLabel: string
      category: string
      questionId: string
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    return HttpResponse.json({
      sessionId: "session_123",
      token: `token_${Date.now()}`,
      shareLink: `${window.location.origin}/question/token_${Date.now()}`,
    })
  }),

  // 질문 조회 (토큰 기반)
  http.get("/api/questions/:token", ({ params }) => {
    const { token } = params

    if (token === "expired_token") {
      return HttpResponse.json({ error: "만료된 링크입니다" }, { status: 404 })
    }

    return HttpResponse.json({
      id: "q_123",
      question: "최근 새로 시도해본 것이 있다면 무엇인가요?",
      senderName: "김마음",
      category: "일상",
      senderAnswer: "요가 수업에 처음 참여해봤어요. 생각보다 어려웠지만 몸이 개운해지는 느낌이 좋더라고요!",
      isExpired: false,
    })
  }),

  // 답변 저장
  http.post("/api/answers", async ({ request }) => {
    const { token, answer } = (await request.json()) as { token: string; answer: string }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return HttpResponse.json({
      id: "answer_123",
      isRevealed: true,
      partnerAnswer: "요가 수업에 처음 참여해봤어요. 생각보다 어려웠지만 몸이 개운해지는 느낌이 좋더라고요!",
    })
  }),

  // 이모지 반응
  http.post("/api/reactions", async ({ request }) => {
    const { answerId, emoji } = (await request.json()) as { answerId: string; emoji: string }

    await new Promise((resolve) => setTimeout(resolve, 200))

    return HttpResponse.json({ success: true })
  }),

  // 주간 하이라이트 조회
  http.get("/api/weekly/current", () => {
    return HttpResponse.json({
      id: "weekly_123",
      userId: "user_123",
      weekStart: "2025-08-18T00:00:00.000Z",
      weekEnd: "2025-08-24T23:59:59.999Z",
      conversations: [
        {
          partnerLabel: "엄마",
          bestQuestions: [
            "어린 시절 추억의 간식은 무엇인가요?",
            "요즘 관심 있는 취미가 있나요?",
            "가족과 함께하고 싶은 여행지는?",
          ],
          totalCount: 7,
          responseRate: 100,
        },
        {
          partnerLabel: "아빠",
          bestQuestions: ["최근 새로 배운 것이 있다면?", "오늘 가장 기억에 남는 순간은?"],
          totalCount: 5,
          responseRate: 80,
        },
      ],
      createdAt: new Date().toISOString(),
    })
  }),

  // 히스토리 조회
  http.get("/api/weekly/history", () => {
    return HttpResponse.json([
      {
        id: "weekly_122",
        userId: "user_123",
        weekStart: "2025-08-11T00:00:00.000Z",
        weekEnd: "2025-08-17T23:59:59.999Z",
        conversations: [
          {
            partnerLabel: "아빠",
            bestQuestions: ["최근 새로 배운 것이 있다면?"],
            totalCount: 5,
            responseRate: 80,
          },
        ],
        createdAt: new Date().toISOString(),
      },
    ])
  }),
]
