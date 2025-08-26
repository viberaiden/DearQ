import { type NextRequest, NextResponse } from "next/server"

// MSW Mock 시나리오를 위한 임시 구현
export async function POST(request: NextRequest) {
  try {
    const { kakaoToken } = await request.json()

    // MSW Mock 응답 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 4가지 시나리오 중 성공 케이스
    const mockUser = {
      id: "user_123",
      kakaoId: "kakao_456",
      nickname: "김마음",
      profileImage: "https://via.placeholder.com/100",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const mockToken = "mock_jwt_token_" + Date.now()

    return NextResponse.json({
      user: mockUser,
      token: mockToken,
    })
  } catch (error) {
    console.error("[v0] 카카오 로그인 API 오류:", error)
    return NextResponse.json({ error: "로그인 처리 중 오류가 발생했습니다" }, { status: 500 })
  }
}
