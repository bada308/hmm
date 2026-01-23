# Task Switcher

작업 전환 시 컨텍스트를 잃지 않도록 도와주는 macOS 메뉴바 앱입니다.

## 기능

- **메뉴바 상주**: 현재 작업 이름이 메뉴바에 표시
- **작업 전환**: 클릭으로 빠르게 작업 전환
- **메모**: 각 작업에 "어디까지 했는지" 메모 저장
- **완료 처리**: 작업 완료 시 자동으로 다음 작업으로 전환
- **자동 저장**: UserDefaults에 데이터 저장

## 요구사항

- macOS 13.0 이상
- Xcode 14.0 이상

## 설치 방법

### 1. Xcode에서 프로젝트 생성

```bash
# 프로젝트 폴더로 이동
cd macos/TaskSwitcher
```

1. Xcode 실행
2. File → New → Project
3. macOS → App 선택
4. 설정:
   - Product Name: `TaskSwitcher`
   - Organization Identifier: `com.hmm`
   - Interface: `SwiftUI`
   - Language: `Swift`
5. 저장 위치: 이 폴더 선택

### 2. 소스 파일 연결

생성된 프로젝트에서:

1. 기본 생성된 `ContentView.swift`, `TaskSwitcherApp.swift` 삭제
2. 이 폴더의 Swift 파일들을 프로젝트에 드래그:
   - `TaskSwitcherApp.swift`
   - `ContentView.swift`
   - `Models.swift`

### 3. 메뉴바 앱 설정

Target → Signing & Capabilities에서:
- "App Sandbox" 체크 해제 (또는 필요에 맞게 설정)

Info.plist에 추가 (이미 포함됨):
```xml
<key>LSUIElement</key>
<true/>
```

### 4. 빌드 및 실행

1. `Cmd + R`로 실행
2. 메뉴바에 📌 아이콘 또는 현재 작업 이름 표시 확인

### 5. 로그인 시 자동 실행 (선택)

System Settings → General → Login Items에서 앱 추가

---

## 사용법

### 작업 추가

1. 메뉴바 아이콘 클릭
2. "새 작업 추가..." 입력
3. Enter 또는 + 버튼

### 작업 전환

- 작업 왼쪽의 ○ 클릭 → 현재 작업으로 설정 (●)

### 메모 남기기

1. 작업 오른쪽의 📝 아이콘 클릭
2. "어디까지 했는지 메모..." 입력
3. Enter 또는 "저장" 클릭

### 작업 완료

- ✓ 버튼 클릭 → "완료됨" 섹션으로 이동
- 자동으로 다음 작업이 현재 작업으로 설정

---

## 아키텍처

```
TaskSwitcher/
├── TaskSwitcherApp.swift   # 앱 진입점, MenuBarExtra 설정
├── ContentView.swift       # 메인 UI
├── Models.swift           # Task 모델 + TaskManager
└── Info.plist             # 앱 설정
```

### 데이터 모델

```swift
struct Task {
    let id: UUID
    var name: String      // 작업 이름
    var memo: String      // 컨텍스트 메모
    var isCompleted: Bool
    var createdAt: Date
}
```

### 상태 관리

`TaskManager` (ObservableObject):
- `tasks`: 전체 작업 목록
- `currentTaskId`: 현재 작업 ID
- `pendingTasks`: 미완료 작업
- `completedTasks`: 완료된 작업

### 데이터 저장

- **저장 위치**: `UserDefaults.standard`
- **키**: `savedTasks`, `currentTaskId`
- **형식**: JSON (Codable)

---

## 트러블슈팅

### 메뉴바에 앱이 안 보임

- Info.plist의 `LSUIElement`가 `true`인지 확인
- macOS 13.0 이상인지 확인

### 데이터가 저장 안 됨

- App Sandbox 설정 확인
- UserDefaults 접근 권한 확인

### 빌드 에러

- Xcode 14.0 이상 필요
- Deployment Target이 macOS 13.0 이상인지 확인

---

## 향후 개선 아이디어

- [ ] 글로벌 단축키 (⌘+Shift+T)
- [ ] 작업 시간 추적
- [ ] iCloud 동기화
- [ ] 위젯 지원
