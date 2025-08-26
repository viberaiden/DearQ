"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chip } from "@/components/ui/chip"

interface FamilySelectorProps {
  onSelect: (familyLabel: string) => void
}

export function FamilySelector({ onSelect }: FamilySelectorProps) {
  const [selectedFamily, setSelectedFamily] = useState<string>("")
  const [showAddFamily, setShowAddFamily] = useState(false)
  const [newFamilyLabel, setNewFamilyLabel] = useState("")

  // Mock 가족 데이터 (실제로는 API에서 가져옴)
  const mockFamilyList = [
    { label: "엄마", lastUser: "김○○님", isActive: true },
    { label: "아빠", lastUser: null, isActive: true },
    { label: "할머니", lastUser: "이○○님", isActive: true },
    { label: "형", lastUser: null, isActive: false }, // 수신거부
  ]

  const handleFamilyClick = (familyLabel: string, isActive: boolean) => {
    if (!isActive) return
    setSelectedFamily(familyLabel)
  }

  const handleAddFamily = () => {
    if (newFamilyLabel.trim()) {
      // Mock: 새 가족 추가
      console.log("[v0] 새 가족 추가:", newFamilyLabel)
      setSelectedFamily(newFamilyLabel)
      setShowAddFamily(false)
      setNewFamilyLabel("")
    }
  }

  const handleConfirm = () => {
    if (selectedFamily) {
      onSelect(selectedFamily)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-center">누구에게 마음을 전할까요?</CardTitle>
        <CardDescription className="text-center">가족을 선택해주세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 기존 가족 목록 */}
        <div className="grid grid-cols-2 gap-3">
          {mockFamilyList.map((family) => (
            <Chip
              key={family.label}
              active={selectedFamily === family.label}
              onClick={() => handleFamilyClick(family.label, family.isActive)}
              className={`justify-center ${!family.isActive ? "opacity-50 line-through" : ""}`}
              disabled={!family.isActive}
            >
              <div className="text-center">
                <div>{family.label}</div>
                {family.lastUser && <div className="text-xs opacity-70">최근: {family.lastUser}</div>}
                {!family.isActive && <div className="text-xs opacity-70">(수신거부)</div>}
              </div>
            </Chip>
          ))}

          {/* 새 가족 추가 버튼 */}
          <Chip
            onClick={() => setShowAddFamily(true)}
            className="justify-center border-dashed"
            style={{ borderColor: "var(--color-primary-400)", backgroundColor: "transparent" }}
          >
            + 새 가족 추가
          </Chip>
        </div>

        {/* 새 가족 추가 입력 */}
        {showAddFamily && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <input
              type="text"
              placeholder="가족 호칭을 입력하세요 (예: 동생, 삼촌)"
              value={newFamilyLabel}
              onChange={(e) => setNewFamilyLabel(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              maxLength={10}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddFamily} size="sm" className="flex-1">
                추가
              </Button>
              <Button
                onClick={() => {
                  setShowAddFamily(false)
                  setNewFamilyLabel("")
                }}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                취소
              </Button>
            </div>
          </div>
        )}

        {/* 확인 버튼 */}
        {selectedFamily && (
          <Button onClick={handleConfirm} className="w-full mt-4">
            {selectedFamily}님께 전송하기
          </Button>
        )}

        {/* 안내 메시지 */}
        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "var(--color-secondary-100)" }}>
          <p className="text-sm" style={{ color: "var(--color-secondary-600)" }}>
            💡 한 번 마음을 주고받은 가족은 자동으로 기억되어 다음부터 1탭으로 전송 가능합니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
