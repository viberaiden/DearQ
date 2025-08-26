"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (kakaoToken: string) => Promise<void>
  tempLogin: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] AuthProvider 초기화 시작")
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      if (typeof window === "undefined") {
        console.log("[v0] 서버사이드 렌더링 중, localStorage 접근 불가")
        setIsLoading(false)
        return
      }

      const token = localStorage.getItem("dearq_token")
      console.log("[v0] 저장된 토큰:", token ? "있음" : "없음")

      if (token) {
        if (token.startsWith("temp_token_")) {
          const tempUser: User = {
            id: "temp_user_123",
            kakaoId: "temp_kakao_456",
            nickname: "개발자",
            profileImage: "https://via.placeholder.com/100",
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          console.log("[v0] 임시 사용자로 로그인")
          setUser(tempUser)
        } else {
          // MSW Mock 또는 실제 API 호출로 사용자 정보 확인
          const userData = await fetchUserProfile(token)
          setUser(userData)
        }
      }
    } catch (error) {
      console.error("[v0] 인증 상태 확인 실패:", error)
      if (typeof window !== "undefined") {
        localStorage.removeItem("dearq_token")
      }
    } finally {
      console.log("[v0] 인증 상태 확인 완료")
      setIsLoading(false)
    }
  }

  const login = async (kakaoToken: string) => {
    try {
      setIsLoading(true)
      console.log("[v0] 카카오 로그인 시작")

      // MSW Mock 또는 실제 백엔드 API 호출
      const response = await fetch("/api/auth/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kakaoToken }),
      })

      if (!response.ok) {
        throw new Error("로그인 실패")
      }

      const { user: userData, token } = await response.json()

      if (typeof window !== "undefined") {
        localStorage.setItem("dearq_token", token)
      }
      setUser(userData)
      console.log("[v0] 로그인 성공")
    } catch (error) {
      console.error("[v0] 로그인 처리 실패:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const tempLogin = () => {
    console.log("[v0] 임시 로그인 실행")
    const tempUser: User = {
      id: "temp_user_123",
      kakaoId: "temp_kakao_456",
      nickname: "개발자",
      profileImage: "https://via.placeholder.com/100",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const tempToken = "temp_token_" + Date.now()
    if (typeof window !== "undefined") {
      localStorage.setItem("dearq_token", tempToken)
    }
    setUser(tempUser)
  }

  const logout = () => {
    console.log("[v0] 로그아웃 실행")
    if (typeof window !== "undefined") {
      localStorage.removeItem("dearq_token")
    }
    setUser(null)
    window.location.href = "/login"
  }

  return <AuthContext.Provider value={{ user, isLoading, login, tempLogin, logout }}>{children}</AuthContext.Provider>
}

// Mock 함수 - 실제 구현에서는 실제 API 호출
async function fetchUserProfile(token: string): Promise<User> {
  console.log("[v0] 사용자 프로필 조회 시작")
  // MSW Mock 응답 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "user_123",
    kakaoId: "kakao_456",
    nickname: "김마음",
    profileImage: "https://via.placeholder.com/100",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
