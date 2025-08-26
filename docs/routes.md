# 마음배달 라우트 명세서

## 1. 라우트 구조

### 전체 라우트 맵
\`\`\`
/                     - 랜딩 페이지
├── /login            - 카카오 로그인 (returnTo 지원)
├── /onboarding       - 초기 설정 (3단계)
├── /home             - 오늘의 질문 허브
├── /r/[token]        - 수신자 답변 페이지 (1회용)
├── /conversation/[id] - 대화 보기
├── /history          - 지난 대화 목록
├── /labels           - 가족 관리
├── /weekly           - 주간 하이라이트
├── /settings         - 설정
└── /api/             - API 라우트
    ├── auth/
    ├── question/
    ├── share/
    ├── receiver/
    ├── conversation/
    ├── labels/
    └── weekly/
\`\`\`

## 2. 페이지별 상세 명세

### 2.1 랜딩 페이지 (/)

**목적**: 서비스 소개 및 시작 유도

**상태 관리**:
- 이미 로그인된 경우 → `/home` 자동 리다이렉트
- 첫 방문자 → 서비스 소개 표시

**로딩 전략**:
\`\`\`typescript
// 세션 체크 로딩
<Skeleton className="h-12 w-48 mx-auto" /> // 카카오 버튼 위치

// 로딩 완료 후
{isLoggedIn ? <Navigate to="/home" /> : <LandingContent />}
\`\`\`

**에러 처리**:
- 세션 체크 실패 → 로그인 버튼 표시
- 네트워크 에러 → 재시도 버튼

**빈 상태**: 해당 없음

---

### 2.2 로그인 페이지 (/login)

**목적**: 카카오 OAuth 인증 및 세션 복구

**URL 파라미터**:
- `returnTo`: 인증 후 복귀할 경로

**상태 관리**:
\`\`\`typescript
interface LoginState {
  isLoading: boolean
  error: string | null
  returnTo: string | null
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 카카오 인증 진행 중
<div className="text-center">
  <Spinner />
  <p>카카오 로그인 중...</p>
</div>
\`\`\`

**에러 처리**:
- 인증 실패 → "로그인에 실패했어요. 다시 시도해주세요."
- 네트워크 에러 → "연결이 불안정해요. 잠시 후 다시 시도해주세요."

**성공 후 동작**:
\`\`\`typescript
// returnTo가 있으면 해당 경로로, 없으면 /home으로
const redirectPath = searchParams.get('returnTo') || '/home'
router.push(redirectPath)
\`\`\`

---

### 2.3 온보딩 페이지 (/onboarding)

**목적**: 초기 사용자 설정 수집

**단계별 구성**:
1. **Step 1**: 시작 모드 선택 ([혼자 시작] vs [가족에게 보내기])
2. **Step 2**: 알림 시간 설정 (오전 9시/저녁 7시/설정 안 함)
3. **Step 3**: 관심 주제 선택 (일상/추억/감사/꿈/건강 중 3개)

**상태 관리**:
\`\`\`typescript
interface OnboardingState {
  currentStep: 1 | 2 | 3
  startMode: 'solo' | 'family' | null
  notificationTime: '09:00' | '19:00' | 'none' | null
  interests: string[]
  isCompleting: boolean
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 각 단계별 스켈레톤
<div className="space-y-4">
  <Skeleton className="h-8 w-3/4" /> // 제목
  <Skeleton className="h-12 w-full" /> // 선택 옵션들
  <Skeleton className="h-12 w-32" />  // 다음 버튼
</div>
\`\`\`

**에러 처리**:
- 설정 저장 실패 → "설정을 저장하지 못했어요. 다시 시도해주세요."
- 뒤로가기 방지 → 진행 상태 보존

**완료 조건**:
- 3단계 모두 완료 → `/home`으로 이동
- 이미 온보딩 완료된 사용자 → `/home`으로 즉시 리다이렉트

---

### 2.4 홈 페이지 (/home)

**목적**: 일일 질문 허브 및 상태 관리

**상태별 UI**:
\`\`\`typescript
interface HomeState {
  question: Question | null
  userAnswerStatus: 'none' | 'draft' | 'submitted'
  sentToday: SendEvent[]
  conversations: Conversation[]
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 질문 로딩 중
<Card className="p-8 text-center">
  <Skeleton className="h-6 w-48 mx-auto mb-4" />
  <Skeleton className="h-4 w-64 mx-auto mb-6" />
  <Skeleton className="h-12 w-40 mx-auto" />
</Card>

// 상태 스테퍼 로딩
<div className="flex justify-center items-center gap-4">
  {[1,2,3].map(i => <Skeleton key={i} className="w-6 h-6 rounded-full" />)}
</div>
\`\`\`

**에러 처리**:
- 질문 로드 실패 → 기본 질문 폴백 표시
- 전송 실패 → "전송에 실패했어요. 다시 시도해주세요."

**빈 상태**: 해당 없음 (항상 오늘의 질문 존재)

**CTA 버튼 상태별 변화**:
\`\`\`typescript
// 초기 상태
<Button>가족에게 마음 전하기</Button>
<Button variant="secondary">내 마음 적기</Button>

// 전송 후
<Button>대화 보기</Button>
<Button variant="secondary">내 마음 적기</Button>

// 완료 후  
<Button>대화 보기</Button>
<Button variant="secondary">다른 가족에게 보내기</Button>
\`\`\`

---

### 2.5 수신자 답변 페이지 (/r/[token])

**목적**: 1회용 링크를 통한 답변 수집

**토큰 검증 플로우**:
\`\`\`typescript
interface ReceiverState {
  tokenStatus: 'validating' | 'valid' | 'expired' | 'used' | 'invalid'
  question: Question | null
  senderInfo: { nickname: string } | null
  isSubmitting: boolean
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 토큰 검증 중
<div className="text-center py-12">
  <Spinner />
  <p>링크를 확인하고 있어요...</p>
</div>
\`\`\`

**에러/만료 처리**:
\`\`\`typescript
// 토큰 만료
<Card className="text-center p-8">
  <h3 className="text-lg font-semibold mb-4">링크 유효시간이 지났어요</h3>
  <p className="text-gray-600 mb-6">새 링크를 요청해주세요.</p>
  <Button onClick={requestNewLink}>새 링크 요청</Button>
</Card>

// 이미 답변 완료
<Card className="text-center p-8">
  <h3 className="text-lg font-semibold mb-4">이미 답변을 제출했어요</h3>
  <p className="text-gray-600 mb-6">대화 화면에서 확인해주세요.</p>
  <Button onClick={goToConversation}>대화 보기</Button>
</Card>
\`\`\`

**답변 제출 후**:
- 첫 답변 시 → 가족 매칭 확인 모달
- 기존 가족 → 대화 페이지로 즉시 이동

---

### 2.6 대화 보기 페이지 (/conversation/[id])

**목적**: 양방향 답변 확인 및 리액션

**상태 관리**:
\`\`\`typescript
interface ConversationState {
  conversation: Conversation | null
  myAnswer: Answer | null
  partnerAnswer: Answer | null
  canViewPartnerAnswer: boolean
  reactions: Reaction[]
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 대화 로딩 중
<div className="space-y-6">
  <Skeleton className="h-32 w-full" /> // 질문 카드
  <Skeleton className="h-24 w-full" /> // 내 답변
  <Skeleton className="h-24 w-full" /> // 상대 답변
</div>
\`\`\`

**자기표현 게이트**:
\`\`\`typescript
// 내 답변 미작성 시
<div className="relative">
  <div className="filter blur-sm opacity-70">
    <Card>상대방의 답변 내용...</Card>
  </div>
  <div className="absolute inset-0 flex items-center justify-center">
    <Card className="text-center p-6">
      <p>먼저 내 마음을 전해보세요 ✍️</p>
      <Button className="mt-4">내 답변 쓰기</Button>
    </Card>
  </div>
</div>
\`\`\`

**에러 처리**:
- 대화 로드 실패 → "대화를 불러오지 못했어요."
- 권한 없음 → "접근할 수 없는 대화예요."

**빈 상태**: 해당 없음 (대화 ID로 접근)

---

### 2.7 히스토리 페이지 (/history)

**목적**: 과거 대화 목록 및 검색

**상태 관리**:
\`\`\`typescript
interface HistoryState {
  conversations: Conversation[]
  filters: {
    period: 'week' | 'month' | 'all'
    family: string | null
    category: string | null
  }
  searchQuery: string
  isLoading: boolean
  hasMore: boolean
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 초기 로딩
<div className="space-y-4">
  {[1,2,3,4,5].map(i => (
    <Skeleton key={i} className="h-20 w-full" />
  ))}
</div>

// 무한 스크롤 로딩
<div className="text-center py-4">
  <Spinner size="sm" />
</div>
\`\`\`

**에러 처리**:
- 로드 실패 → "대화 목록을 불러오지 못했어요."
- 검색 실패 → "검색 중 문제가 발생했어요."

**빈 상태**:
\`\`\`typescript
<div className="text-center py-12">
  <div className="text-6xl mb-4">💬</div>
  <h3 className="text-lg font-semibold mb-2">아직 대화가 없어요</h3>
  <p className="text-gray-600 mb-6">첫 대화를 시작해보세요!</p>
  <Button onClick={() => router.push('/home')}>오늘의 질문 보기</Button>
</div>
\`\`\`

---

### 2.8 가족 관리 페이지 (/labels)

**목적**: 가족 라벨 정리 및 관리

**상태 관리**:
\`\`\`typescript
interface LabelsState {
  labels: Label[]
  bindings: LabelBinding[]
  isEditing: string | null
  pendingActions: {
    merge?: { source: string, target: string }
    delete?: string
  }
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 가족 목록 로딩
<div className="space-y-3">
  {[1,2,3].map(i => (
    <Skeleton key={i} className="h-16 w-full" />
  ))}
</div>
\`\`\`

**에러 처리**:
- 로드 실패 → "가족 정보를 불러오지 못했어요."
- 수정 실패 → "변경사항을 저장하지 못했어요."

**빈 상태**:
\`\`\`typescript
<div className="text-center py-12">
  <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
  <h3 className="text-lg font-semibold mb-2">아직 연결된 가족이 없어요</h3>
  <p className="text-gray-600 mb-6">첫 마음을 전해보세요!</p>
  <Button onClick={() => router.push('/home')}>마음 전하기</Button>
</div>
\`\`\`

---

### 2.9 주간 하이라이트 페이지 (/weekly)

**목적**: 주간 대화 요약 및 공유

**상태 관리**:
\`\`\`typescript
interface WeeklyState {
  summary: WeeklySummary | null
  isGenerating: boolean
  isSharing: boolean
  shareFormat: 'image' | 'text'
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 하이라이트 생성 중
<Card className="text-center p-8">
  <Spinner />
  <p className="mt-4">이번 주 하이라이트를 만들고 있어요...</p>
</Card>
\`\`\`

**에러 처리**:
- 생성 실패 → "하이라이트를 만들지 못했어요."
- 공유 실패 → "공유 중 문제가 발생했어요."

**빈 상태** (대화 3회 미만):
\`\`\`typescript
<Card className="text-center p-8">
  <div className="text-6xl mb-4">📝</div>
  <h3 className="text-lg font-semibold mb-2">조금 더 대화해보세요</h3>
  <p className="text-gray-600 mb-6">주간 하이라이트는 3회 이상 대화 후 생성됩니다.</p>
  <Button onClick={() => router.push('/home')}>오늘의 질문 보기</Button>
</Card>
\`\`\`

---

### 2.10 설정 페이지 (/settings)

**목적**: 개인화 설정 및 계정 관리

**상태 관리**:
\`\`\`typescript
interface SettingsState {
  settings: UserSettings
  isUpdating: boolean
  pendingChanges: Partial<UserSettings>
}
\`\`\`

**로딩 전략**:
\`\`\`typescript
// 설정 로딩
<div className="space-y-6">
  <Skeleton className="h-12 w-full" />
  <Skeleton className="h-8 w-3/4" />
  <Skeleton className="h-8 w-1/2" />
</div>
\`\`\`

**에러 처리**:
- 로드 실패 → "설정을 불러오지 못했어요."
- 저장 실패 → "설정을 저장하지 못했어요."

**빈 상태**: 해당 없음

---

## 3. 공통 로딩/에러/빈 상태 전략

### 3.1 로딩 상태 패턴

**스켈레톤 사용 원칙**:
- 800-1200ms 표시
- 실제 콘텐츠와 유사한 형태
- 애니메이션으로 로딩 중임을 표시

**스피너 사용 원칙**:
- 즉시 피드백이 필요한 액션 (버튼 클릭 등)
- 예상 시간이 짧은 작업 (< 3초)

### 3.2 에러 상태 패턴

**에러 메시지 톤**:
- 친근하고 해결책 제시형
- "~했어요" 형태로 부드럽게 표현
- 구체적인 액션 버튼 제공

**에러 복구 전략**:
- 자동 재시도 (네트워크 에러)
- 수동 재시도 버튼
- 대안 경로 제시

### 3.3 빈 상태 패턴

**빈 상태 구성 요소**:
- 관련 이모지 (큰 크기)
- 상황 설명 제목
- 부연 설명 텍스트
- 다음 액션 CTA 버튼

**톤앤매너**:
- 격려하는 톤
- 다음 단계 명확히 제시
- 부정적 표현 지양

## 4. 네비게이션 및 라우팅 규칙

### 4.1 인증 가드
\`\`\`typescript
// 로그인 필요 페이지
const protectedRoutes = ['/home', '/history', '/labels', '/weekly', '/settings']

// 세션 만료 시 리다이렉트
if (!isAuthenticated && protectedRoutes.includes(pathname)) {
  router.push(`/login?returnTo=${pathname}`)
}
\`\`\`

### 4.2 온보딩 가드
\`\`\`typescript
// 온보딩 미완료 시 리다이렉트
if (isAuthenticated && !isOnboardingComplete && pathname !== '/onboarding') {
  router.push('/onboarding')
}
\`\`\`

### 4.3 딥링크 처리
\`\`\`typescript
// 수신자 링크 접근
if (pathname.startsWith('/r/') && !isAuthenticated) {
  router.push(`/login?returnTo=${pathname}`)
}
\`\`\`

이 명세서를 바탕으로 일관된 사용자 경험을 제공하는 라우팅 시스템을 구현하겠습니다.
