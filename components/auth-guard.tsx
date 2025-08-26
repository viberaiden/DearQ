"use client"

import type React from "react"

import { useAuth } from "@/lib/auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push("/login")
      } else if (!requireAuth && user) {
        router.push("/")
      }
    }
  }, [user, isLoading, requireAuth, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null // 리다이렉트 중
  }

  if (!requireAuth && user) {
    return null // 리다이렉트 중
  }

  return <>{children}</>
}
