"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthGuard } from "@/components/auth-guard"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [nickname, setNickname] = useState("")
  const [familyMembers, setFamilyMembers] = useState([{ label: "", name: "" }])

  const handleAddFamily = () => {
    setFamilyMembers([...familyMembers, { label: "", name: "" }])
  }

  const handleFamilyChange = (index: number, field: "label" | "name", value: string) => {
    const updated = [...familyMembers]
    updated[index][field] = value
    setFamilyMembers(updated)
  }

  const handleComplete = () => {
    // 온보딩 완료 처리
    localStorage.setItem("dearq_onboarding_completed", "true")
    window.location.href = "/"
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">💝 마음배달</h1>
            <p className="text-muted-foreground">처음 오셨군요! 간단한 설정을 해볼까요?</p>
          </header>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`w-8 h-2 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}></div>
            <div className={`w-8 h-2 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div className={`w-8 h-2 rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          </div>

          {/* Step 1: 닉네임 설정 */}
          {step === 1 && (
            <Card
              className="border-2"
              style={{ borderColor: "var(--color-primary-400)", backgroundColor: "var(--color-primary-100)" }}
            >
              <CardHeader className="text-center">
                <CardTitle style={{ color: "var(--color-primary-600)" }}>어떻게 불러드릴까요?</CardTitle>
                <CardDescription>가족들이 보게 될 이름이에요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">닉네임</Label>
                  <Input
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="예: 엄마, 아빠, 민수"
                    className="h-12"
                  />
                </div>
                <Button onClick={() => setStep(2)} disabled={!nickname.trim()} className="w-full" size="lg">
                  다음
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: 가족 구성원 추가 */}
          {step === 2 && (
            <Card
              className="border-2"
              style={{ borderColor: "var(--color-primary-400)", backgroundColor: "var(--color-primary-100)" }}
            >
              <CardHeader className="text-center">
                <CardTitle style={{ color: "var(--color-primary-600)" }}>가족 구성원을 추가해주세요</CardTitle>
                <CardDescription>마음을 전하고 싶은 가족들이에요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyMembers.map((member, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor={`label-${index}`}>관계</Label>
                      <Input
                        id={`label-${index}`}
                        value={member.label}
                        onChange={(e) => handleFamilyChange(index, "label", e.target.value)}
                        placeholder="엄마"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`name-${index}`}>이름</Label>
                      <Input
                        id={`name-${index}`}
                        value={member.name}
                        onChange={(e) => handleFamilyChange(index, "name", e.target.value)}
                        placeholder="김마음"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  onClick={handleAddFamily}
                  variant="outline"
                  className="w-full bg-transparent"
                  style={{ borderColor: "var(--color-primary-400)", color: "var(--color-primary-600)" }}
                >
                  + 가족 추가
                </Button>

                <div className="flex gap-2">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    이전
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={familyMembers.some((m) => !m.label.trim() || !m.name.trim())}
                    className="flex-1"
                  >
                    다음
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: 완료 */}
          {step === 3 && (
            <Card
              className="border-2"
              style={{ borderColor: "var(--color-primary-400)", backgroundColor: "var(--color-primary-100)" }}
            >
              <CardHeader className="text-center">
                <CardTitle style={{ color: "var(--color-primary-600)" }}>준비 완료! 🎉</CardTitle>
                <CardDescription>이제 가족과 마음을 나눠보세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl">💝</div>
                  <div className="space-y-2">
                    <p className="font-medium">
                      안녕하세요, <span style={{ color: "var(--color-primary-600)" }}>{nickname}</span>님!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {familyMembers.length}명의 가족과 함께
                      <br />
                      따뜻한 대화를 시작해보세요
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                      <span className="text-secondary-600">1️⃣</span>
                    </div>
                    <span>매일 새로운 질문을 받아보세요</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                      <span className="text-secondary-600">2️⃣</span>
                    </div>
                    <span>먼저 내 마음을 전해주세요</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                      <span className="text-secondary-600">3️⃣</span>
                    </div>
                    <span>가족의 답변을 확인해보세요</span>
                  </div>
                </div>

                <Button onClick={handleComplete} className="w-full" size="lg">
                  마음배달 시작하기
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
