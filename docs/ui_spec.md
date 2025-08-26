# 마음배달 UI 명세서

## 1. 디자인 토큰

### 색상 시스템
\`\`\`css
/* Brand Primary (Orange Family) */
--color-primary-600: #EA580C;  /* 핵심 액션/하이라이트 */
--color-primary-500: #F97316;  /* 기본 주황 */
--color-primary-400: #FB923C;  /* 밝은 주황 */
--color-primary-100: #FED7AA;  /* 배경용 연한 주황 */

/* Secondary (Lavender/Violet) */
--color-secondary-600: #7C5CE4;  /* 보조 CTA, 칩/탭 포커스 */
--color-secondary-100: #EFEAFF;  /* 연한 라벤더 */

/* Neutrals (Slate/Gray) */
--gray-900: #0F172A;  /* 진한 텍스트 */
--gray-700: #334155;  /* 일반 텍스트 */
--gray-300: #CBD5E1;  /* 경계선 */
--gray-50: #F8FAFC;   /* 연한 배경 */

/* State Colors */
--success: #22C55E;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
\`\`\`

### 타이포그래피
\`\`\`css
/* Font Family */
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--font-h1: 32px;      /* 메인 타이틀 */
--font-h2: 24px;      /* 섹션 헤더 */
--font-h3: 20px;      /* 서브 헤더 */
--font-body: 16px;    /* 본문 텍스트 */
--font-caption: 14px; /* 보조 텍스트 */

/* Line Height */
--line-height: 1.6;
\`\`\`

### 간격 시스템
\`\`\`css
/* Spacing Scale */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;

/* Border Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;
\`\`\`

## 2. 컴포넌트 매핑

### 버튼 시스템
\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

// Primary Button
className="bg-primary-600 text-white hover:bg-primary-700 active:scale-98"

// Secondary Button  
className="border-2 border-primary-600 text-primary-600 hover:bg-primary-100 active:scale-98"

// Ghost Button
className="text-primary-600 hover:bg-primary-100 active:scale-98"
\`\`\`

### 칩/태그 시스템
\`\`\`typescript
interface ChipProps {
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

// Default Chip
className="px-5 py-3 border-2 border-gray-300 bg-white text-gray-700 rounded-full"

// Active Chip
className="px-5 py-3 border-2 border-secondary-600 bg-secondary-100 text-secondary-600 rounded-full"

// Disabled Chip
className="px-5 py-3 border-2 border-gray-300 bg-gray-100 text-gray-400 rounded-full opacity-50"
\`\`\`

### 카드 시스템
\`\`\`typescript
interface CardProps {
  variant: 'default' | 'question' | 'conversation' | 'weekly'
  interactive?: boolean
}

// Default Card
className="bg-card p-6 rounded-lg shadow-sm border border-gray-200"

// Question Card
className="bg-primary-100 border-2 border-primary-400 text-primary-600 p-8 rounded-lg text-center"

// Interactive Card
className="bg-card p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md active:scale-99 transition-all"
\`\`\`

### 입력 필드
\`\`\`typescript
interface InputProps {
  variant: 'default' | 'textarea'
  error?: boolean
  maxLength?: number
}

// Default Input
className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"

// Textarea (답변 입력)
className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg resize-none min-h-[120px] focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"

// Error State
className="border-error focus:border-error focus:ring-error/20"
\`\`\`

## 3. 레이아웃 패턴

### 페이지 레이아웃
\`\`\`typescript
// 기본 페이지 컨테이너
className="min-h-screen bg-primary-100 px-4 py-6"

// 콘텐츠 영역
className="max-w-md mx-auto space-y-6"

// 카드 컨테이너
className="bg-white rounded-lg p-6 shadow-sm"
\`\`\`

### 상태 스테퍼
\`\`\`typescript
interface StepperProps {
  steps: Array<{
    label: string
    status: 'completed' | 'current' | 'pending'
  }>
}

// Completed Step
className="w-6 h-6 bg-success text-white rounded-full flex items-center justify-center text-xs font-bold"

// Current Step  
className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold"

// Pending Step
className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs"
\`\`\`

## 4. 상호작용 패턴

### 터치 타겟
- **최소 크기**: 44×44px
- **패딩**: 최소 12px
- **간격**: 터치 요소 간 최소 8px

### 포커스 상태
\`\`\`css
/* 포커스 링 */
focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2

/* 키보드 네비게이션 */
focus-visible:ring-2 focus-visible:ring-secondary-600
\`\`\`

### 애니메이션
\`\`\`css
/* 기본 전환 */
transition: all 0.15s cubic-bezier(0.22, 1, 0.36, 1);

/* 버튼 클릭 */
active:scale-98 active:transition-transform active:duration-75

/* 축하 효과 (600ms) */
@keyframes celebrate {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
\`\`\`

## 5. 상태별 UI 패턴

### 로딩 상태
\`\`\`typescript
// 스켈레톤 (800-1200ms)
className="animate-pulse bg-gray-200 rounded h-4 w-3/4"

// 스피너
className="animate-spin h-5 w-5 border-2 border-primary-600 border-t-transparent rounded-full"
\`\`\`

### 빈 상태
\`\`\`typescript
// 빈 상태 컨테이너
className="text-center py-12 px-6"

// 빈 상태 메시지
"아직 대화가 없어요. 오늘의 질문으로 시작해보세요."
\`\`\`

### 에러 상태
\`\`\`typescript
// 에러 토스트
className="fixed bottom-4 left-4 right-4 bg-error text-white p-4 rounded-lg shadow-lg"

// 에러 메시지 패턴
"문제가 발생했어요. 잠시 후 다시 시도해주세요."
\`\`\`

### 자기표현 게이트
\`\`\`typescript
// 블러 처리
className="filter blur-sm opacity-70 pointer-events-none"

// 게이트 메시지
"먼저 내 마음을 전해보세요 ✍️"
\`\`\`

## 6. 반응형 규칙

### 브레이크포인트
\`\`\`css
/* Mobile First */
@media (min-width: 360px) { /* 기본 */ }
@media (min-width: 768px) { /* 태블릿 */ }
@media (min-width: 1024px) { /* 데스크톱 */ }
\`\`\`

### 반응형 패턴
\`\`\`typescript
// 모바일: 전체 너비
className="w-full"

// 태블릿 이상: 최대 너비 제한
className="w-full md:max-w-md md:mx-auto"

// 그리드 반응형
className="grid grid-cols-1 md:grid-cols-2 gap-4"
\`\`\`

## 7. 접근성 가이드라인

### 색상 대비
- **일반 텍스트**: 4.5:1 이상
- **큰 텍스트**: 3:1 이상
- **UI 요소**: 3:1 이상

### ARIA 레이블
\`\`\`typescript
// 버튼
aria-label="가족에게 마음 전하기"

// 상태 표시
aria-live="polite"
aria-describedby="status-message"

// 폼 필드
aria-required="true"
aria-invalid={hasError}
\`\`\`

### 키보드 네비게이션
- **Tab 순서**: 논리적 순서 보장
- **Skip Link**: 메인 콘텐츠로 바로가기
- **Escape**: 모달 닫기

## 8. Do/Don't 규칙

### ✅ Do
- 배경에는 Primary-100 등 연한 색상만 사용
- 터치 타겟 44×44px 이상 보장
- 포커스 링 항상 표시
- 마이크로카피로 친근한 톤 유지
- 로딩 상태 명확히 표시

### ❌ Don't
- 배경에 쨍한 색상(Primary-500, 600) 사용 금지
- 그라데이션 배경 사용 금지
- 색상만으로 정보 전달 금지
- 16px 미만 폰트 사용 금지
- 과도한 애니메이션 효과 금지

## 9. 컴포넌트 우선순위

### Phase 1 (필수)
- Button (primary, secondary, ghost)
- Card (default, question)
- Input (text, textarea)
- Chip (default, active)
- Toast (success, error, info)

### Phase 2 (핵심)
- Stepper (상태 표시)
- Modal (보내기, 확인)
- Skeleton (로딩)
- Empty State (빈 상태)

### Phase 3 (부가)
- Badge (라벨 표시)
- Avatar (프로필)
- Progress (주간 통계)
- Share Button (공유)

이 명세서를 바탕으로 일관된 UI/UX를 구현하겠습니다.
