# 마음배달(DearQ) 개발 백로그

## 📋 Backlog

### Phase 1: 기반 구조 (Week 1)
- [ ] 프로젝트 초기 설정
  - [ ] 디자인 토큰 적용 (Primary Orange, Secondary Lavender)
  - [ ] 폰트 설정 (Pretendard)
  - [ ] 기본 레이아웃 구성
- [ ] 라우팅 구조 구축
  - [ ] 페이지 스켈레톤 생성 (/, /login, /onboarding, /home, /r/[token], /conversation/[id], /history, /labels, /weekly, /settings)
  - [ ] 로딩/에러/빈 상태 컴포넌트
- [ ] MSW Stub 환경 구축
  - [ ] API 핸들러 4가지 시나리오 (success|failure|expired|empty)
  - [ ] 테스트 픽스처 데이터
- [ ] 기본 컴포넌트 라이브러리
  - [ ] Button (primary, secondary, ghost)
  - [ ] Card (default, question)
  - [ ] Input (text, textarea)
  - [ ] Chip (default, active)
  - [ ] Toast (success, error, info)
- [ ] 카카오 로그인 연동
  - [ ] OAuth 플로우 구현
  - [ ] 세션 관리 (JWT)
  - [ ] returnTo 파라미터 지원

### Phase 2: 핵심 플로우 (Week 2)
- [ ] 홈 화면 (/home)
  - [ ] 오늘의 질문 카드
  - [ ] 상태 스테퍼 (확인 → 내 답변 → 상대 답변)
  - [ ] CTA 버튼 상태별 변화
- [ ] 보내기 모달
  - [ ] 가족 라벨 선택
  - [ ] 최근 사용 우선 표시
  - [ ] 카카오 공유 연동
- [ ] 수신자 답변 페이지 (/r/[token])
  - [ ] 1회용 토큰 검증
  - [ ] 답변 입력 폼 (500자 제한)
  - [ ] 만료/중복 상태 처리
- [ ] 대화 보기 (/conversation/[id])
  - [ ] 자기표현 게이트 구현
  - [ ] 양방향 답변 표시
  - [ ] 리액션 기능
  - [ ] 완료 축하 효과
- [ ] 가족 바인딩 시스템
  - [ ] 라벨 생성/관리
  - [ ] 바인딩 상태 관리 (pending → confirmed/blocked)
  - [ ] 자동 매칭 확인

### Phase 3: 부가 기능 (Week 3)
- [ ] 온보딩 페이지 (/onboarding)
  - [ ] 3단계 설정 플로우
  - [ ] 시작 모드/알림 시간/관심 주제 선택
- [ ] 히스토리 페이지 (/history)
  - [ ] 대화 목록 표시
  - [ ] 검색/필터 기능
  - [ ] 무한 스크롤
- [ ] 가족 관리 페이지 (/labels)
  - [ ] 가족 목록 관리
  - [ ] 이름 변경/병합/삭제
  - [ ] 차단 관리
- [ ] 주간 하이라이트 (/weekly)
  - [ ] 주간 요약 생성
  - [ ] 이미지 카드 생성
  - [ ] 카카오톡/SNS 공유
- [ ] 설정 페이지 (/settings)
  - [ ] 알림 설정
  - [ ] 계정 관리
  - [ ] 로그아웃/탈퇴

### Phase 4: 최적화 (Week 4)
- [ ] 성능 최적화
  - [ ] 코드 스플리팅
  - [ ] 이미지 최적화
  - [ ] 번들 크기 최적화
- [ ] 접근성 검증
  - [ ] WCAG 2.1 AA 준수
  - [ ] 키보드 네비게이션
  - [ ] 스크린리더 지원
- [ ] E2E 테스트 완성
  - [ ] 핵심 플로우 테스트
  - [ ] 에러 시나리오 테스트
- [ ] 분석 이벤트 연동
  - [ ] 핵심 퍼널 추적
  - [ ] 사용자 행동 분석
- [ ] 배포 준비
  - [ ] 환경변수 설정
  - [ ] CI/CD 파이프라인
  - [ ] 도메인 연결

---

## 🚀 Doing

### 현재 작업 중
- 계획 문서 작성 (docs/plan.md, docs/ui_spec.md, docs/routes.md, docs/assumptions.md)

---

## ✅ Done

### 완료된 작업
- PRD 분석 및 요구사항 파악
- 디자인 시스템 가이드 분석
- 질문 데이터베이스 구조 파악
- 개발 규칙 및 가이드라인 정리

---

## 🚫 Blocked

### 차단된 작업
- 없음 (현재 차단 요소 없음)

---

## 📝 Decisions

### 주요 결정사항

#### 2025-08-25: 기술 스택 확정
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Testing**: Jest + React Testing Library + MSW + Playwright + Storybook
- **이유**: PRD 요구사항과 개발 규칙에 명시된 스택

#### 2025-08-25: 디자인 토큰 적용 방향
- **Primary**: Orange Family (#EA580C, #F97316, #FB923C, #FED7AA)
- **Secondary**: Lavender/Violet (#7C5CE4, #EFEAFF)
- **원칙**: 배경에 쨍한 색상 사용 금지, Primary-100 등 연한 색상만 사용
- **이유**: 디자인 시스템 가이드의 명시적 규칙

#### 2025-08-25: 개발 방법론
- **TDD**: Red → Green → Refactor 원칙 준수
- **Stub First**: MSW로 4가지 시나리오 지원
- **Mobile First**: 360px부터 반응형 설계
- **이유**: 개발 규칙 문서의 핵심 원칙

#### 2025-08-25: API 설계 방향
- **RESTful**: REST API 패턴 준수
- **토큰 보안**: 1회용 32자 랜덤 토큰, 48시간 TTL
- **에러 표준**: 일관된 에러 응답 형식
- **이유**: 보안성과 사용자 경험 최적화

---

## 📊 Progress Tracking

### 전체 진행률
- **Phase 1**: 0% (0/5 완료)
- **Phase 2**: 0% (0/5 완료)  
- **Phase 3**: 0% (0/5 완료)
- **Phase 4**: 0% (0/4 완료)

### 이번 주 목표 (Week 1)
1. 계획 문서 작성 완료 ✅
2. 프로젝트 초기 설정 시작
3. 기본 컴포넌트 라이브러리 구축
4. MSW Stub 환경 구축

### 다음 주 목표 (Week 2)
1. 홈 화면 구현
2. 보내기 모달 구현
3. 수신자 답변 페이지 구현
4. 대화 보기 페이지 구현

---

## 🔄 Daily Updates

### 2025-08-25
- ✅ PRD 및 디자인 시스템 분석 완료
- ✅ 개발 규칙 및 가이드라인 정리 완료
- ✅ 계획 문서 4종 작성 완료 (plan.md, ui_spec.md, routes.md, assumptions.md)
- 🎯 다음: 승인 후 스켈레톤 코드 구현 시작

---

## 📋 Notes

### 중요 참고사항
- 모든 출력(분석/문서/로그/커밋 메시지)은 한국어로 작성
- 코드 식별자는 영어 허용
- 디자인 시스템의 색상 사용 규칙 엄격히 준수
- 접근성(WCAG 2.1 AA) 기준 반드시 충족
- 터치 타겟 44×44px 이상, 대비 4.5:1 이상 유지

### 리스크 모니터링
- 카카오 개발자 계정 및 앱 등록 상태 확인 필요
- 데이터베이스 선택 (Supabase vs Vercel Postgres) 결정 필요
- 도메인 결정 (dearq.com vs dearq.kr) 필요

### 품질 기준
- 테스트 커버리지 80% 이상
- 라이트하우스 성능 점수 80점 이상
- 번들 크기 500KB 미만 (gzipped)
- API 응답 시간 500ms 미만
