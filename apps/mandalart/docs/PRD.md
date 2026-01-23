# 만다라트(Mandala Chart) 앱 PRD

## 1. 개요

### 1.1 제품 소개
만다라트는 중심 목표를 8개의 세부 목표로 확장하고, 각 세부 목표를 다시 8개의 실행 항목으로 구체화하는 목표 달성 도구입니다.

### 1.2 현재 문제점
기존 `apps/mandalart`는 단순 NxN 그리드로 구현되어 있어 **올바른 만다라트 구조가 아닙니다**.

올바른 구조:
```
┌─────────┬─────────┬─────────┐
│ 3x3     │ 3x3     │ 3x3     │
│ (세부1) │ (세부2) │ (세부3) │
├─────────┼─────────┼─────────┤
│ 3x3     │ 3x3     │ 3x3     │
│ (세부8) │ (중심)  │ (세부4) │
├─────────┼─────────┼─────────┤
│ 3x3     │ 3x3     │ 3x3     │
│ (세부7) │ (세부6) │ (세부5) │
└─────────┴─────────┴─────────┘
```

- **중심 3x3**: 핵심 목표(중앙) + 8개 세부 목표
- **주변 8개 3x3**: 각 세부 목표(중앙) + 8개 실행 항목

---

## 2. 요구사항

### 2.1 핵심 기능

| 기능 | 설명 | 우선순위 |
|------|------|----------|
| 만다라트 입력/편집 | 9x9(81칸) 격자에 목표 입력 | P0 |
| 로컬 저장 | localStorage에 자동 저장 | P0 |
| 여러 개 관리 | 만다라트 목록 조회/선택/삭제 | P0 |
| PNG 내보내기 | 이미지로 다운로드 | P0 |
| PDF 내보내기 | PDF로 다운로드 | P0 |
| 완료 체크 | 각 실행 항목 완료 표시 | P1 |
| 테마 선택 | 여러 색상 테마 중 선택 | P1 |

### 2.2 디자인 요구사항

- **스타일**: 귀여운/손그림 느낌 (참고 이미지와 유사)
- **색상**: 부드러운 파스텔톤
- **폰트**: 손글씨 스타일 (예: 나눔손글씨, Gowun Dodum)
- **반응형**: 모바일 필수 지원

### 2.3 사용자 플로우

```
[홈/목록] → [새 만다라트 생성] → [편집] → [저장/내보내기]
              ↓
         [기존 만다라트 선택]
```

---

## 3. 데이터 구조

### 3.1 Mandalart 타입

```typescript
interface Mandalart {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  theme: ThemeType;
  center: CenterGoal;      // 중심 3x3
  subGrids: SubGrid[];     // 주변 8개 3x3
}

interface CenterGoal {
  mainGoal: string;        // 핵심 목표 (정중앙)
  subGoals: string[];      // 8개 세부 목표
}

interface SubGrid {
  position: number;        // 0-7 (세부 목표 위치)
  centerGoal: string;      // 세부 목표 (= CenterGoal.subGoals[position])
  actions: ActionItem[];   // 8개 실행 항목
}

interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
}

type ThemeType = 'peach' | 'mint' | 'lavender' | 'lemon' | 'sky';
```

---

## 4. 화면 설계

### 4.1 홈/목록 페이지 (`/`)

- 만다라트 카드 목록 (썸네일 + 제목 + 날짜)
- "새 만다라트 만들기" 버튼
- 카드 클릭 → 편집 페이지로 이동
- 카드 삭제 기능

### 4.2 편집 페이지 (`/edit/[id]`)

- 9x9 만다라트 그리드
- 제목 입력 필드
- 테마 선택 드롭다운
- 내보내기 버튼 (PNG/PDF)
- 목록으로 돌아가기

### 4.3 그리드 컴포넌트

```
┌───┬───┬───┐ ┌───┬───┬───┐ ┌───┬───┬───┐
│   │   │   │ │   │   │   │ │   │   │   │
├───┼───┼───┤ ├───┼───┼───┤ ├───┼───┼───┤
│   │[S1]│   │ │   │[S2]│   │ │   │[S3]│   │
├───┼───┼───┤ ├───┼───┼───┤ ├───┼───┼───┤
│   │   │   │ │   │   │   │ │   │   │   │
└───┴───┴───┘ └───┴───┴───┘ └───┴───┴───┘

┌───┬───┬───┐ ┌───┬───┬───┐ ┌───┬───┬───┐
│   │   │   │ │[S1]│[S2]│[S3]│ │   │   │   │
├───┼───┼───┤ ├───┼───┼───┤ ├───┼───┼───┤
│   │[S8]│   │ │[S8]│[핵심]│[S4]│ │   │[S4]│   │
├───┼───┼───┤ ├───┼───┼───┤ ├───┼───┼───┤
│   │   │   │ │[S7]│[S6]│[S5]│ │   │   │   │
└───┴───┴───┘ └───┴───┴───┘ └───┴───┴───┘

┌───┬───┬───┐ ┌───┬───┬───┐ ┌───┬───┬───┐
│   │   │   │ │   │   │   │ │   │   │   │
├───┼───┼───┤ ├───┼───┼───┤ ├───┼───┼───┤
│   │[S7]│   │ │   │[S6]│   │ │   │[S5]│   │
├───┼───┼───┤ ├───┼───┼───┤ ├───┼───┼───┤
│   │   │   │ │   │   │   │ │   │   │   │
└───┴───┴───┘ └───┴───┴───┘ └───┴───┴───┘
```

[핵심] = 핵심 목표 (빨간색/강조)
[S1-S8] = 세부 목표 (주황색)
빈칸 = 실행 항목 (기본색)

---

## 5. 테마 색상

```typescript
const themes = {
  peach: {
    primary: '#FFB5A7',    // 메인 (핵심 목표)
    secondary: '#FCD5CE',  // 세부 목표
    background: '#FFF5F3', // 실행 항목 배경
    border: '#F8B4A7',
  },
  mint: {
    primary: '#95D5B2',
    secondary: '#B7E4C7',
    background: '#F0FFF4',
    border: '#74C69D',
  },
  lavender: {
    primary: '#C8B6FF',
    secondary: '#E2D6FF',
    background: '#F8F5FF',
    border: '#B8A4E8',
  },
  lemon: {
    primary: '#FFE066',
    secondary: '#FFF3B0',
    background: '#FFFEF5',
    border: '#FFD93D',
  },
  sky: {
    primary: '#89CFF0',
    secondary: '#BAE1FF',
    background: '#F0F9FF',
    border: '#6BB9E8',
  },
};
```

---

## 6. 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **상태관리**: Zustand + persist (localStorage)
- **스타일링**: Tailwind CSS
- **내보내기**: html-to-image (PNG), jsPDF (PDF)
- **폰트**: Google Fonts (Gowun Dodum 또는 유사)

---

## 7. 파일 구조

```
apps/mandalart/src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # 홈/목록
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx      # 편집 페이지
│   └── globals.css
├── components/
│   ├── MandalartGrid.tsx     # 9x9 전체 그리드
│   ├── SubGrid.tsx           # 3x3 서브 그리드
│   ├── Cell.tsx              # 개별 셀
│   ├── MandalartCard.tsx     # 목록용 카드
│   ├── ThemeSelector.tsx     # 테마 선택
│   ├── ExportButtons.tsx     # 내보내기 버튼
│   └── index.ts
├── lib/
│   ├── store.ts              # Zustand 스토어
│   ├── types.ts              # 타입 정의
│   ├── themes.ts             # 테마 색상
│   ├── export.ts             # 내보내기 유틸
│   └── utils.ts              # 유틸리티
└── hooks/
    └── useMandalart.ts       # 커스텀 훅
```

---

## 8. 구현 계획

### Phase 1: 기본 구조 (P0)
1. 타입 및 테마 정의 (`lib/types.ts`, `lib/themes.ts`)
2. Zustand 스토어 구현 (`lib/store.ts`)
3. 만다라트 그리드 컴포넌트 (`MandalartGrid`, `SubGrid`, `Cell`)
4. 편집 페이지 기본 기능

### Phase 2: 목록 및 저장 (P0)
5. 홈 페이지 (만다라트 목록)
6. 만다라트 생성/삭제
7. localStorage 연동

### Phase 3: 내보내기 (P0)
8. PNG 내보내기 구현
9. PDF 내보내기 구현

### Phase 4: 완성도 (P1)
10. 완료 체크 기능
11. 테마 선택 UI
12. 모바일 반응형 최적화
13. 손글씨 폰트 적용

---

## 9. 검증 방법

1. **기능 테스트**
   - 만다라트 생성 → 편집 → 저장 → 새로고침 후 데이터 유지 확인
   - PNG/PDF 내보내기 다운로드 확인
   - 여러 만다라트 생성 및 목록 표시 확인

2. **반응형 테스트**
   - 모바일 (375px), 태블릿 (768px), 데스크톱 (1024px+)

3. **브라우저 테스트**
   - Chrome, Safari, Firefox

---

## 10. 수정 대상 파일

| 파일 | 작업 |
|------|------|
| `apps/mandalart/src/lib/types.ts` | 새로운 타입 정의로 교체 |
| `apps/mandalart/src/lib/store.ts` | 완전히 재작성 |
| `apps/mandalart/src/lib/themes.ts` | 신규 생성 |
| `apps/mandalart/src/lib/export.ts` | 신규 생성 |
| `apps/mandalart/src/components/*` | 모두 재작성 |
| `apps/mandalart/src/app/page.tsx` | 목록 페이지로 변경 |
| `apps/mandalart/src/app/edit/[id]/page.tsx` | 신규 생성 |
| `apps/mandalart/src/app/globals.css` | 손글씨 폰트 추가 |
| `apps/mandalart/package.json` | html-to-image, jspdf 추가 |
