# HMM Monorepo

여러 가벼운 앱을 위한 모노레포 프로젝트

## 기술 스택

- **Turborepo** - 모노레포 빌드 시스템
- **pnpm** - 패키지 매니저
- **Next.js 15** - React 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Zustand** - 전역 상태 관리

## 구조

```
├── apps/
│   └── web/              # 메인 Next.js 앱
├── packages/
│   ├── ui/               # 공유 UI 컴포넌트
│   ├── config/           # 공유 설정 (Tailwind, TypeScript)
│   └── store/            # 공유 전역 상태 (Zustand)
└── turbo.json
```

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

## 새 앱 추가하기

1. `apps/` 디렉토리에 새 Next.js 앱 생성
2. `package.json`에 workspace 패키지 의존성 추가
3. `turbo.json` 설정 상속 자동 적용

## 공유 패키지

### @repo/ui

재사용 가능한 UI 컴포넌트

```tsx
import { Button, Card } from '@repo/ui';
```

### @repo/store

Zustand 기반 전역 상태 관리

```tsx
import { useAppStore } from '@repo/store';

const { theme, toggleTheme } = useAppStore();
```

### @repo/config

공유 설정 파일 (Tailwind, TypeScript, PostCSS)
