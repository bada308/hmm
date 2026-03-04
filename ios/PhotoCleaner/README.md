# 포토클리너 (PhotoCleaner)

오늘 날짜에 찍힌 모든 년도의 사진을 모아보고, 스와이프로 유지/삭제를 결정하는 iOS 앱

## 기능

- **오늘의 사진**: 오늘 날짜(예: 3월 3일)에 찍힌 모든 년도의 사진을 모아서 보여줌
- **스와이프 정리**: 오른쪽 스와이프 = 유지, 왼쪽 스와이프 = 삭제
- **날짜 선택**: 좌우 화살표 또는 달력으로 다른 날짜 선택 가능
- **일괄 삭제**: 정리 완료 후 삭제 표시한 사진을 한번에 삭제
- **안전 삭제**: 삭제된 사진은 iOS '최근 삭제된 항목'에서 30일간 복구 가능

## 설정 방법

1. Xcode 15 이상에서 새 프로젝트 생성
   - File → New → Project → iOS → App
   - Product Name: `PhotoCleaner`
   - Bundle Identifier: `com.hmm.photocleaner`
   - Interface: SwiftUI
   - Language: Swift
2. 생성된 기본 파일 삭제 후 이 폴더의 Swift 파일들로 교체
3. Info.plist의 `NSPhotoLibraryUsageDescription` 설정 확인
4. Assets.xcassets 폴더 연결
5. Signing & Capabilities에서 본인 Apple ID 선택
6. iPhone 연결 후 빌드 (Cmd + R)

## 무료 개발자 계정으로 실행

Apple Developer Program 결제 없이도 실행 가능:

1. Xcode → Settings → Accounts → Apple ID 추가
2. 프로젝트 → Signing & Capabilities → Team에서 본인 계정 선택
3. iPhone을 USB로 연결
4. 빌드 타겟을 연결된 iPhone으로 선택
5. Cmd + R로 빌드 & 실행
6. iPhone에서 "신뢰하지 않는 개발자" 알림 → 설정 → 일반 → VPN 및 기기 관리에서 신뢰

> 무료 계정은 7일마다 앱 서명이 만료됩니다. Xcode에서 다시 빌드하면 됩니다.

## 프로젝트 구조

```
PhotoCleaner/
├── PhotoCleanerApp.swift          # 앱 진입점
├── Info.plist                     # 앱 설정 (사진 권한 등)
├── Models/
│   └── Photo.swift                # 사진 데이터 모델
├── Managers/
│   └── PhotoManager.swift         # 사진 로딩/삭제 관리
├── Views/
│   ├── ContentView.swift          # 메인 화면
│   ├── PhotoCardView.swift        # 스와이프 카드 UI
│   ├── DatePickerHeader.swift     # 날짜 선택 헤더
│   └── ResultView.swift           # 정리 결과 화면
└── Resources/
    └── Assets.xcassets            # 앱 아이콘, 색상
```

## 요구사항

- iOS 16.0+
- Xcode 15.0+
- Swift 5.9+
