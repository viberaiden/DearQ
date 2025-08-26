# 마음배달(DearQ) 개발 계획서

## 1. 프로젝트 개요

### 핵심 가치 제안
**"매일 하나의 질문으로 가족의 마음을 배달합니다"**

- 카카오톡 기반으로 앱 설치 없이 즉시 시작
- 라벨 기반 가족 전송 (페어링 없는 유연한 N:N 관계)
- 1회용 링크 토큰으로 보안 확보
- 자기표현 게이트로 진정성 있는 소통
- 주간 하이라이트로 추억 축적

### 핵심 KPI
- **D0 Aha Moment**: ≥ 60% (로그인 후 10분 내 전송 완료 또는 답변 제출)
- **전송→답변 도달률**: ≥ 45% (`send_share_complete` → `receiver_answer_submit`)
- **2주 내 동일 가족 재사용률**: ≥ 40%
- **주간 하이라이트 공유율**: ≥ 10%
- **30일 리텐션**: ≥ 25%

## 2. 사용자 플로우

### 핵심 플로우: 전송 → 답변 → 양방향 확인
\`\`\`
랜딩(/) 
→ 카카오 로그인(/login) 
→ 온보딩(/onboarding) 
→ 홈(/home) 
→ 보내기 모달 
→ 카카오 공유 
→ 수신자 링크(/r/[token]) 
→ 답변 제출 
→ 가족 매칭 확인 
→ 대화 보기(/conversation/[id]) 
→ 주간 하이라이트(/weekly)
\`\`\`

### 세션 복구 플로우
\`\`\`
딥링크 접속 → 세션 체크 → /login?returnTo=원경로 → 카카오 인증 → 원래 목적지 복귀
\`\`\`

## 3. 정보 구조 (IA) 및 라우팅

### 라우트 트리
\`\`\`
/                    - 랜딩 페이지
├── /login           - 카카오 로그인 (returnTo 지원)
├── /onboarding      - 초기 설정 (3단계)
├── /home            - 오늘의 질문 허브
├── /r/[token]       - 수신자 답변 페이지 (1회용)
├── /conversation/[id] - 대화 보기
├── /history         - 지난 대화 목록
├── /labels          - 가족 관리
├── /weekly          - 주간 하이라이트
└── /settings        - 설정
\`\`\`

### 페이지별 인수 조건 (AC)

#### /login
- `returnTo` 파라미터 보존 및 인증 후 복귀
- 세션 만료 시 원래 목적지 유지

#### /home
- 질문 카드 렌더링 ≤ 1초 (mock)
- 상태 스테퍼 (확인 → 내 답변 → 상대 답변) 즉시 반영
- CTA 버튼 상태별 동적 변경

#### 보내기 모달
- 최근 사용 라벨 우선 표시
- confirmed 바인딩 자동 선택
- blocked 가족 경고 표시

#### /r/[token]
- 1회용 토큰 검증
- 답변 제출 즉시 토큰 무효화
- 만료/중복 상태 처리

#### /conversation/[id]
- 자기표현 게이트: 내 답변 전까지 상대 답변 블러
- 양측 완료 시 축하 효과 (~600ms)
- 리액션 추가 기능

#### /weekly
- 이미지 내보내기 + 공유 버튼
- 3회 미만 대화 시 안내 메시지

## 4. 기술 설계

### 스택
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Testing**: Jest + React Testing Library + MSW + Playwright + Storybook
- **Auth**: 카카오 OAuth 2.0
- **State**: React Query + Zustand (필요시)

### 아키텍처 원칙
- **TDD**: Red → Green → Refactor
- **Stub First**: MSW로 4가지 시나리오 지원 (success|failure|expired|empty)
- **Mobile First**: 360px부터 반응형 설계
- **접근성**: WCAG 2.1 AA 준수

### API 설계 (Stub)
\`\`\`
POST /api/auth/kakao/callback     - 카카오 인증 콜백
GET  /api/question/today          - 오늘의 질문
POST /api/share/prepare           - 전송 준비 (토큰 생성)
GET  /api/receiver/:token         - 토큰 검증 및 질문 조회
POST /api/receiver/:token         - 답변 제출
GET  /api/conversation/:id        - 대화 조회
POST /api/labels                  - 가족 라벨 관리
GET  /api/weekly/:userId          - 주간 하이라이트
\`\`\`

## 5. 데이터 모델

### 핵심 엔티티
\`\`\`typescript
interface User {
  id: string
  kakaoId: string
  nickname: string
  settings: UserSettings
  createdAt: Date
}

interface Label {
  id: string
  userId: string
  name: string
  isBlocked: boolean
  createdAt: Date
}

interface LabelBinding {
  senderId: string
  labelId: string
  recipientId: string
  status: 'pending' | 'confirmed' | 'blocked' | 'archived'
  confirmedAt?: Date
}

interface SendEvent {
  id: string
  senderId: string
  labelId: string
  token: string
  expiresAt: Date
  questionId: string
  createdAt: Date
}

interface Answer {
  id: string
  sendId: string
  userId: string
  content: string
  answeredAt: Date
}

interface Conversation {
  id: string
  sendId: string
  senderAnswerId?: string
  recipientAnswerId?: string
  createdAt: Date
}
\`\`\`

## 6. 개발 마일스톤

### Phase 1: 기반 구조 (Week 1)
- [ ] 라우팅 및 레이아웃 구성
- [ ] 디자인 시스템 토큰 적용
- [ ] MSW Stub 환경 구축
- [ ] 카카오 로그인 연동
- [ ] 기본 컴포넌트 라이브러리

### Phase 2: 핵심 플로우 (Week 2)
- [ ] 홈 화면 (오늘의 질문)
- [ ] 보내기 모달 (라벨 선택)
- [ ] 수신자 답변 페이지
- [ ] 대화 보기 (자기표현 게이트)
- [ ] 가족 바인딩 시스템

### Phase 3: 부가 기능 (Week 3)
- [ ] 히스토리 페이지
- [ ] 가족 관리 페이지
- [ ] 주간 하이라이트
- [ ] 설정 페이지
- [ ] 에러/만료 처리

### Phase 4: 최적화 (Week 4)
- [ ] 성능 최적화
- [ ] 접근성 검증
- [ ] E2E 테스트 완성
- [ ] 분석 이벤트 연동
- [ ] 배포 준비

## 7. 성공 지표 및 분석

### 핵심 퍼널
\`\`\`
auth_success (100%)
    ↓
open_send (70%)
    ↓
send_share_complete (50%)
    ↓
receiver_answer_submit (45%)
    ↓
conversation_complete (40%)
\`\`\`

### 추적 이벤트
- `auth_success`: 로그인 성공
- `open_send`: 보내기 모달 오픈
- `send_share_complete`: 공유 완료
- `receiver_answer_submit`: 수신자 답변 제출
- `conversation_complete`: 양측 답변 완료
- `weekly_share`: 주간 하이라이트 공유

## 8. 리스크 및 대응

| 리스크 | 영향도 | 대응책 |
|--------|--------|--------|
| 링크 도용/전달 | 높음 | 1회용 토큰, 즉시 만료 |
| 공용기기 오답변 | 중간 | 기존 confirmed 유지, 변경 확인 |
| 가족 라벨 난립 | 낮음 | 병합 제안, 유사어 감지 |
| 알림 피로 | 높음 | 1일 1회 제한, 시간대 개인화 |

## 9. 다음 단계

1. **UI 명세서 작성** - 디자인 토큰 및 컴포넌트 매핑
2. **라우트 명세서 작성** - 로딩/에러/빈 상태 전략
3. **가정사항 문서화** - 인증/알림/스토리지/배포 관련
4. **백로그 정리** - todo.md 초기 작성

승인 후 스켈레톤 코드 구현을 시작하겠습니다.
