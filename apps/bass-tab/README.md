# Bass Tab Converter

MusicXML 파일을 베이스 기타 탭 악보로 변환하는 앱입니다.

## 실행 방법

```bash
# 개발 서버 (포트 3002)
pnpm dev --filter bass-tab

# 빌드
pnpm build --filter bass-tab

# 프로덕션 실행
pnpm start --filter bass-tab
```

## 기능

- **파일 업로드**: MusicXML (.xml, .musicxml) 드래그 앤 드롭
- **악보 파싱**: 음높이, 옥타브, 박자 추출
- **탭 변환**: 4현 베이스 (E-A-D-G 표준 튜닝)
- **운지 최적화**: 낮은 프렛 우선 선택
- **마디별 출력**: 탭 악보 형태로 표시

## MusicXML 파일 구하는 법

1. **MuseScore** (무료): 파일 → 내보내기 → MusicXML
2. **musescore.com**: 악보 다운로드 후 MuseScore에서 변환
3. **Finale/Sibelius**: 내보내기 메뉴에서 MusicXML 선택

---

## 아키텍처

```
src/
├── app/
│   ├── globals.css      # Tailwind + 전역 스타일
│   ├── layout.tsx       # 루트 레이아웃
│   └── page.tsx         # 메인 페이지
├── components/
│   ├── FileUpload.tsx   # 파일 업로드 UI
│   ├── TabDisplay.tsx   # 탭 악보 출력
│   └── index.ts
└── lib/
    ├── musicxml-parser.ts  # MusicXML 파싱
    ├── tab-converter.ts    # 탭 변환 로직
    └── types.ts            # 타입 정의
```

---

## 핵심 코드 설명

### 1. 데이터 흐름

```
MusicXML 파일
    ↓ parseMusicXML()
ParsedMusic { title, divisions, measures[] }
    ↓ convertToTab()
BassTab { title, measures[] }
    ↓ <TabDisplay>
화면 출력
```

### 2. 타입 정의 (`lib/types.ts`)

```typescript
// 파싱된 음표
interface Note {
  pitch: string;      // "E", "F#", "Bb" 등
  octave: number;     // 1, 2, 3, ...
  duration: number;   // divisions 단위
  isRest: boolean;
}

// 탭 음표
interface TabNote {
  string: number;     // 1-4 (G, D, A, E)
  fret: number;       // 0-24 (-1은 쉼표)
  duration: number;
}

// 베이스 튜닝 (표준 4현)
// string 1: G2 (MIDI 43)
// string 2: D2 (MIDI 38)
// string 3: A1 (MIDI 33)
// string 4: E1 (MIDI 28)
```

### 3. MusicXML 파싱 (`lib/musicxml-parser.ts`)

**핵심 로직**:

```typescript
function parseMusicXML(xmlString: string): ParsedMusic {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');

  // 1. 제목 추출
  const title = doc.querySelector('work-title')?.textContent || 'Untitled';

  // 2. divisions (박자 분할 단위) 추출
  const divisions = parseInt(doc.querySelector('attributes divisions')?.textContent || '1');

  // 3. 각 마디(measure)의 음표 파싱
  doc.querySelectorAll('measure').forEach(measureEl => {
    measureEl.querySelectorAll('note').forEach(noteEl => {
      // chord 태그가 있으면 화음의 추가 음 → 스킵 (베이스는 단음)
      if (noteEl.querySelector('chord')) return;

      // rest 태그 → 쉼표
      // pitch > step, octave, alter → 음높이
    });
  });
}
```

**MusicXML 구조 예시**:
```xml
<measure number="1">
  <note>
    <pitch>
      <step>E</step>
      <octave>2</octave>
      <alter>0</alter>  <!-- 0: 제자리, 1: #, -1: b -->
    </pitch>
    <duration>4</duration>
  </note>
</measure>
```

### 4. 탭 변환 (`lib/tab-converter.ts`)

#### 4.1 음높이 → MIDI 번호

```typescript
function toMidiNote(pitch: string, octave: number): number {
  const semitone = pitchToSemitone(pitch); // C=0, D=2, E=4, F=5, G=7, A=9, B=11
  return 12 + (octave + 1) * 12 + semitone;
}

// 예: E2 → 12 + 3*12 + 4 = 52
// 예: A1 → 12 + 2*12 + 9 = 45
```

#### 4.2 MIDI → 프렛 위치

```typescript
function findBestPosition(midiNote: number): { string: number; fret: number } | null {
  // 각 줄의 개방현 MIDI 번호
  // G줄(1번): 43, D줄(2번): 38, A줄(3번): 33, E줄(4번): 28

  for (각 줄) {
    fret = midiNote - 개방현_MIDI;
    if (fret >= 0 && fret <= 24) {
      // 점수 계산: 낮은 프렛 + 중간 줄 선호
      score = fret + Math.abs(줄인덱스 - 1.5) * 2;
    }
  }
  return 가장_낮은_점수의_포지션;
}
```

**예시**:
| 음 | MIDI | 가능한 포지션 | 선택 |
|-----|------|--------------|------|
| E2 (52) | 52 | G줄 9프렛, D줄 14프렛, A줄 19프렛 | G줄 9프렛 |
| A1 (33) | 33 | A줄 0프렛, E줄 5프렛 | A줄 0프렛 |

### 5. 탭 출력 (`components/TabDisplay.tsx`)

```typescript
// 4줄 각각에 대해 문자열 배열 생성
const lines: string[][] = [[], [], [], []]; // G, D, A, E

for (각 음표) {
  if (쉼표) {
    모든 줄에 '-' 추가;
  } else {
    해당 줄에 프렛 번호 추가;
    나머지 줄에 '--' 추가;
  }
}

// 출력 예시:
// G|--9-----|
// D|--------|
// A|----0---|
// E|------5-|
```

---

## 트러블슈팅

### 파일 파싱 실패

**증상**: "Invalid MusicXML file" 에러

**원인**:
1. XML 문법 오류
2. MusicXML이 아닌 다른 XML 파일
3. 압축된 MusicXML (.mxl) - 현재 미지원

**해결**: MuseScore에서 "비압축 MusicXML (.musicxml)" 선택

### 음이 변환되지 않음

**증상**: 일부 음이 탭에 표시 안 됨

**원인**: 베이스 음역대(E1~G4) 벗어남

**확인 방법**: `tab-converter.ts`의 `MIN_MIDI = 28` (E1)

### 화음이 단음으로 표시됨

**의도된 동작**: 베이스는 주로 단음 연주

코드 위치: `musicxml-parser.ts` 46행
```typescript
if (noteEl.querySelector('chord')) return; // 화음 추가음 스킵
```

---

## 제한사항 (v1)

| 항목 | 현재 상태 | 개선 방향 |
|------|----------|----------|
| 화음 | 첫 음만 표시 | 복수 음 동시 표시 |
| 리듬 | duration만 파싱 | 실제 박자 표기 |
| 튜닝 | 4현 표준만 | 5현, 드롭 튜닝 지원 |
| 파일 | .xml만 | .mxl (압축) 지원 |

---

## 디자인 토큰

| 토큰 | 값 | 용도 |
|------|-----|------|
| `bass-400` | `#b8895a` | 포인트 컬러 |
| `bass-600` | `#8a5d38` | 텍스트 강조 |
| `bass-50` | `#faf6f1` | 호버 배경 |
