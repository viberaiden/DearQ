# 마음배달 가정사항 문서

## 1. 인증 (Authentication) 가정사항

### 카카오 OAuth 2.0
**가정**: 카카오 개발자 계정 및 앱 등록 완료
- **필요 정보**: REST API 키, Redirect URI
- **권한 범위**: 카카오계정(이메일), 프로필 정보(닉네임, 프로필 이미지)
- **환경변수**:
  \`\`\`
  KAKAO_REST_KEY=your_kakao_rest_key
  KAKAO_REDIRECT_URI=http://localhost:3000/api/auth/kakao/callback
  \`\`\`

### 세션 관리
**가정**: JWT 기반 세션 관리
- **저장소**: httpOnly 쿠키 (보안)
- **만료시간**: 7일 (리프레시 토큰 14일)
- **환경변수**:
  \`\`\`
  JWT_SECRET=your_jwt_secret_key
  JWT_EXPIRES_IN=7d
  REFRESH_TOKEN_EXPIRES_IN=14d
  \`\`\`

### 개발 단계 인증 우회
**가정**: 개발 편의를 위한 Mock 인증 지원
- **환경변수**: `USE_MOCK_AUTH=true` (개발 환경만)
- **Mock 사용자**: 테스트용 더미 계정 자동 생성

---

## 2. 알림 (Notifications) 가정사항

### 푸시 알림 미구현
**가정**: MVP에서는 푸시 알림 제외
- **대안**: 카카오톡 메시지 기반 알림
- **향후 계획**: FCM 연동 (Phase 2)

### 알림 시간 설정
**가정**: 사용자 설정 기반 알림 스케줄링
- **기본값**: 오전 9시, 저녁 7시 중 선택
- **구현**: 클라이언트 사이드 리마인더 (브라우저 알림)
- **서버 스케줄링**: 향후 구현 예정

### 카카오톡 메시지 발송
**가정**: 카카오톡 메시지 API 사용 (향후)
- **현재**: 수동 공유 (카카오톡 공유하기 버튼)
- **향후**: 자동 메시지 발송 (비즈니스 채널 필요)

---

## 3. 스토리지 (Storage) 가정사항

### 데이터베이스
**가정**: 초기에는 로컬 JSON 파일 또는 SQLite
- **개발**: JSON 파일 기반 Mock DB
- **프로덕션**: PostgreSQL (Supabase 또는 Vercel Postgres)
- **마이그레이션**: Prisma ORM 사용 예정

### 파일 저장소
**가정**: 주간 하이라이트 이미지 저장 필요
- **개발**: 로컬 파일 시스템
- **프로덕션**: Vercel Blob 또는 Cloudinary
- **환경변수**:
  \`\`\`
  BLOB_READ_WRITE_TOKEN=your_blob_token
  \`\`\`

### 캐싱 전략
**가정**: 질문 데이터 캐싱 필요
- **클라이언트**: React Query (5분 캐시)
- **서버**: 메모리 캐시 (개발), Redis (프로덕션)

---

## 4. 배포 (Deployment) 가정사항

### 호스팅 플랫폼
**가정**: Vercel 플랫폼 사용
- **이유**: Next.js 최적화, 간편한 배포, 무료 티어
- **도메인**: 초기에는 vercel.app 서브도메인 사용
- **커스텀 도메인**: 향후 구매 예정

### 환경 분리
**가정**: 개발/스테이징/프로덕션 환경 분리
\`\`\`
개발 (localhost:3000)
├── USE_REAL_API=false
├── USE_MOCK_AUTH=true
└── 로컬 JSON DB

스테이징 (staging.vercel.app)
├── USE_REAL_API=true
├── USE_MOCK_AUTH=false
└── 테스트 DB

프로덕션 (dearq.vercel.app)
├── USE_REAL_API=true
├── USE_MOCK_AUTH=false
└── 프로덕션 DB
\`\`\`

### CI/CD 파이프라인
**가정**: GitHub Actions 기반 자동 배포
- **트리거**: main 브랜치 푸시
- **단계**: 테스트 → 빌드 → 배포
- **롤백**: Vercel 대시보드에서 수동

---

## 5. API 설계 가정사항

### RESTful API 구조
**가정**: REST API 패턴 준수
\`\`\`
GET    /api/question/today          - 오늘의 질문 조회
POST   /api/share/prepare           - 전송 준비 (토큰 생성)
GET    /api/receiver/:token         - 토큰 검증 및 질문 조회
POST   /api/receiver/:token         - 답변 제출
GET    /api/conversation/:id        - 대화 조회
POST   /api/labels                  - 가족 라벨 관리
GET    /api/weekly/:userId          - 주간 하이라이트
\`\`\`

### 에러 응답 표준
**가정**: 일관된 에러 응답 형식
\`\`\`typescript
interface ApiError {
  error: {
    code: string
    message: string
    details?: any
  }
  timestamp: string
}

// 예시
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "링크 유효시간이 지났어요"
  },
  "timestamp": "2025-08-25T10:30:00Z"
}
\`\`\`

### 페이지네이션
**가정**: 커서 기반 페이지네이션 (히스토리)
\`\`\`typescript
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    hasMore: boolean
    nextCursor?: string
  }
}
\`\`\`

---

## 6. 보안 (Security) 가정사항

### 토큰 보안
**가정**: 1회용 토큰 시스템
- **생성**: 32자 랜덤 문자열
- **만료**: 48시간 TTL
- **무효화**: 첫 답변 제출 시 즉시
- **저장**: 해시화하여 DB 저장

### 데이터 암호화
**가정**: 민감 정보 암호화
- **답변 내용**: AES-256 암호화
- **개인정보**: 최소 수집 (카카오 ID, 닉네임만)
- **환경변수**:
  \`\`\`
  ENCRYPTION_KEY=your_32_char_encryption_key
  \`\`\`

### CORS 설정
**가정**: 도메인 기반 CORS 제한
\`\`\`typescript
const allowedOrigins = [
  'http://localhost:3000',
  'https://dearq.vercel.app',
  'https://staging-dearq.vercel.app'
]
\`\`\`

---

## 7. 성능 (Performance) 가정사항

### 번들 크기 목표
**가정**: 초기 로드 < 500KB (gzipped)
- **코드 스플리팅**: 페이지별 청크 분리
- **트리 쉐이킹**: 사용하지 않는 코드 제거
- **이미지 최적화**: Next.js Image 컴포넌트 사용

### 응답 시간 목표
**가정**: 주요 API 응답 시간
- **질문 조회**: < 200ms
- **답변 제출**: < 500ms
- **대화 로드**: < 300ms

### 캐싱 전략
**가정**: 적극적 캐싱으로 성능 최적화
- **정적 자산**: 1년 캐시
- **API 응답**: 5분 캐시 (React Query)
- **이미지**: CDN 캐싱

---

## 8. 분석 (Analytics) 가정사항

### 분석 도구
**가정**: 초기에는 간단한 이벤트 로깅
- **개발**: 콘솔 로그
- **프로덕션**: Vercel Analytics + 커스텀 이벤트
- **향후**: Google Analytics 4 연동

### 개인정보 보호
**가정**: 최소한의 데이터만 수집
- **수집 금지**: 답변 내용, 개인 식별 정보
- **수집 허용**: 이벤트 타입, 타임스탬프, 익명 사용자 ID
- **GDPR**: 쿠키 동의 배너 (향후 구현)

### 핵심 지표 추적
**가정**: 비즈니스 KPI 중심 추적
\`\`\`typescript
// 추적 이벤트 예시
track('auth_success', { provider: 'kakao', isNew: true })
track('send_share_complete', { labelId: 'mom', channel: 'kakao' })
track('receiver_answer_submit', { wordCount: 45, timeSpent: 120 })
\`\`\`

---

## 9. 국제화 (i18n) 가정사항

### 언어 지원
**가정**: 초기에는 한국어만 지원
- **현재**: 하드코딩된 한국어 텍스트
- **향후**: react-i18next 도입 예정
- **우선순위**: 영어 > 일본어 > 중국어

### 시간대 처리
**가정**: 한국 시간대 (Asia/Seoul) 고정
- **표시 형식**: YYYY.MM.DD, HH:mm
- **상대 시간**: "3분 전", "어제", "1주일 전"

---

## 10. 테스트 (Testing) 가정사항

### 테스트 커버리지 목표
**가정**: 핵심 기능 80% 이상 커버리지
- **단위 테스트**: 유틸 함수, 훅
- **통합 테스트**: API 라우트, 컴포넌트
- **E2E 테스트**: 핵심 사용자 플로우

### 테스트 데이터
**가정**: 일관된 테스트 픽스처 사용
\`\`\`typescript
// 테스트용 더미 데이터
export const mockUser = {
  id: 'user_123',
  kakaoId: 'kakao_456',
  nickname: '테스트사용자'
}

export const mockQuestion = {
  id: 'q_20250825',
  content: '오늘 가장 감사했던 순간은?',
  category: '감사·행복'
}
\`\`\`

### MSW 시나리오
**가정**: 4가지 기본 시나리오 지원
- `?scenario=success`: 정상 응답
- `?scenario=failure`: 서버 에러
- `?scenario=expired`: 만료 상태
- `?scenario=empty`: 빈 데이터

---

## 11. 확인이 필요한 가정사항

### 🔍 즉시 확인 필요
1. **카카오 개발자 계정**: 앱 등록 및 키 발급 상태
2. **도메인**: 서비스 도메인 결정 (dearq.com vs dearq.kr)
3. **데이터베이스**: Supabase vs Vercel Postgres 선택

### 🔍 개발 중 확인 예정
1. **카카오톡 공유 API**: 메시지 템플릿 승인 절차
2. **이미지 생성**: 주간 하이라이트 카드 디자인 자동화
3. **알림 시스템**: 브라우저 알림 vs 이메일 알림

### 🔍 향후 검토 필요
1. **비즈니스 모델**: 프리미엄 기능 범위
2. **확장성**: 다국어 지원 우선순위
3. **규정 준수**: 개인정보보호법, 이용약관

---

## 12. 가정사항 변경 시 영향도

### 높은 영향도 (아키텍처 변경 필요)
- 인증 방식 변경 (카카오 → 다른 OAuth)
- 데이터베이스 변경 (JSON → SQL)
- 호스팅 플랫폼 변경 (Vercel → AWS)

### 중간 영향도 (설정 변경 필요)
- 알림 방식 변경 (브라우저 → 푸시)
- 파일 저장소 변경 (Vercel Blob → S3)
- 분석 도구 변경 (Vercel → GA4)

### 낮은 영향도 (코드 수정 최소)
- 도메인 변경
- 캐시 TTL 조정
- 에러 메시지 수정

이 가정사항들은 개발 진행에 따라 지속적으로 업데이트하겠습니다.
