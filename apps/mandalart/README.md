# 만다라트 (Mandalart)

목표 설정 및 달성을 위한 만다라트 앱입니다.

## 실행 방법

```bash
# 개발 서버 (포트 3001)
pnpm dev --filter mandalart

# 빌드
pnpm build --filter mandalart

# 프로덕션 실행
pnpm start --filter mandalart
```

## 기능

- **그리드 크기 선택**: 4×4 또는 9×9
- **목표 입력**: 셀 클릭 → 텍스트 입력
- **완료 처리**: 우측 상단 체크박스
- **보상 설정**: 각 목표에 옵셔널 보상 추가
- **진행률 표시**: 상단 프로그레스 바
- **자동 저장**: localStorage 기반

---

## 아키텍처

```
src/
├── app/
│   ├── globals.css      # Tailwind + 전역 스타일
│   ├── layout.tsx       # 루트 레이아웃
│   └── page.tsx         # 메인 페이지
├── components/
│   ├── GoalCell.tsx     # 개별 목표 셀
│   ├── GridSizeSelector.tsx  # 4x4/9x9 선택
│   ├── MandalartGrid.tsx     # 그리드 컨테이너
│   ├── Progress.tsx     # 진행률 표시
│   └── index.ts         # 컴포넌트 export
└── lib/
    ├── store.ts         # Zustand 스토어
    └── types.ts         # 타입 정의
```

---

## 핵심 코드 설명

### 1. 데이터 구조 (`lib/types.ts`)

```typescript
type GridSize = 4 | 9;

interface Goal {
  id: string;        // "goal-0", "goal-1", ...
  text: string;      // 목표 텍스트
  completed: boolean; // 완료 여부
  reward?: string;   // 옵셔널 보상
}
```

### 2. 상태 관리 (`lib/store.ts`)

Zustand + persist 미들웨어로 localStorage 자동 저장

```typescript
// 주요 액션
setGridSize(size)     // 그리드 크기 변경 (기존 데이터 초기화)
updateGoal(id, updates) // 목표 텍스트/보상 수정
toggleComplete(id)    // 완료 토글
resetAll()           // 전체 초기화
```

**저장 키**: `mandalart-storage`

### 3. 그리드 렌더링 (`components/MandalartGrid.tsx`)

```typescript
// 중앙 셀 계산 (핵심 목표 위치)
const centerIndex = Math.floor((gridSize * gridSize) / 2);
// 4x4: 8번 인덱스 (0-15 중)
// 9x9: 40번 인덱스 (0-80 중)
```

CSS Grid로 동적 렌더링:
```typescript
gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
```

### 4. 목표 셀 (`components/GoalCell.tsx`)

**상태**:
- `isEditing`: 편집 모드
- `showReward`: 보상 입력 필드 표시

**스타일 분기**:
- 중앙 셀: `bg-greenery-400` (강조)
- 완료된 셀: `bg-greenery-100`
- 일반 셀: `bg-white`

### 5. 진행률 계산 (`components/Progress.tsx`)

```typescript
// 중앙 셀 제외한 목표만 계산
const goalsWithoutCenter = goals.filter((_, i) => i !== centerIndex);
const filledGoals = goalsWithoutCenter.filter(g => g.text.trim());
const completedGoals = goalsWithoutCenter.filter(g => g.completed);

const completionRate = filledGoals.length > 0
  ? Math.round((completedGoals.length / filledGoals.length) * 100)
  : 0;
```

---

## 트러블슈팅

### Hydration 에러

**증상**: 서버/클라이언트 렌더링 불일치

**원인**: localStorage는 클라이언트에서만 접근 가능

**해결**: `page.tsx`에서 마운트 체크
```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <로딩 UI>;
```

### 그리드 크기 변경 시 데이터 유실

**의도된 동작**: `setGridSize` 호출 시 새로운 빈 Goal 배열 생성

변경하려면 `store.ts`의 `setGridSize` 로직 수정 필요

---

## 디자인 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `greenery-400` | `#88b04b` | 포인트 컬러 |
| `greenery-100` | `#e5f1dc` | 완료 배경 |
| `greenery-600` | `#527a2d` | 텍스트 강조 |
