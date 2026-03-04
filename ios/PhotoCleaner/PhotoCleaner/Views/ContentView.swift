import SwiftUI
import Photos

struct ContentView: View {
    @EnvironmentObject var photoManager: PhotoManager

    var body: some View {
        ZStack {
            AppTheme.background
                .ignoresSafeArea()

            switch photoManager.authorizationStatus {
            case .notDetermined:
                requestAccessView
            case .authorized, .limited:
                mainContent
            case .denied, .restricted:
                deniedAccessView
            @unknown default:
                requestAccessView
            }
        }
    }

    // MARK: - Main Content

    @ViewBuilder
    private var mainContent: some View {
        if photoManager.isLoading {
            VStack(spacing: 16) {
                ProgressView()
                    .tint(AppTheme.primary)
                    .scaleEffect(1.5)
                Text("사진을 찾고 있어요...")
                    .font(.system(size: 17, weight: .semibold, design: .rounded))
                    .foregroundColor(AppTheme.textSecondary)
            }
        } else if photoManager.todayPhotos.isEmpty {
            emptyStateView
        } else if photoManager.currentPhoto == nil {
            ResultView(
                keptCount: photoManager.keptCount,
                deletedCount: photoManager.deletedCount,
                onConfirmDelete: { await photoManager.executeDelete() },
                onReset: { await photoManager.reset() }
            )
        } else {
            swipeView
        }
    }

    // MARK: - Swipe View

    private var swipeView: some View {
        VStack(spacing: 0) {
            // Header
            DatePickerHeader(
                selectedDate: $photoManager.selectedDate,
                photoCount: photoManager.todayPhotos.count,
                onDateChanged: { date in
                    Task { await photoManager.loadPhotosForDate(date) }
                }
            )
            .padding(.top, 8)
            .padding(.horizontal, 4)

            // Progress bar
            VStack(spacing: 8) {
                HStack {
                    HStack(spacing: 4) {
                        Image(systemName: "heart.fill")
                            .foregroundColor(AppTheme.keep)
                        Text("\(photoManager.keptCount)")
                            .foregroundColor(AppTheme.keep)
                    }
                    .font(.system(size: 14, weight: .bold, design: .rounded))

                    Spacer()

                    Text("\(photoManager.currentIndex + 1) / \(photoManager.todayPhotos.count)")
                        .font(.system(size: 14, weight: .semibold, design: .rounded))
                        .foregroundColor(AppTheme.textTertiary)

                    Spacer()

                    HStack(spacing: 4) {
                        Text("\(photoManager.deletedCount)")
                            .foregroundColor(AppTheme.delete)
                        Image(systemName: "trash.fill")
                            .foregroundColor(AppTheme.delete)
                    }
                    .font(.system(size: 14, weight: .bold, design: .rounded))
                }
                .padding(.horizontal, 24)

                // Rounded progress bar
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule()
                            .fill(AppTheme.divider)
                            .frame(height: 6)
                        Capsule()
                            .fill(AppTheme.primaryGradient)
                            .frame(
                                width: geo.size.width * CGFloat(photoManager.currentIndex) / CGFloat(max(photoManager.todayPhotos.count, 1)),
                                height: 6
                            )
                            .animation(.easeInOut(duration: 0.3), value: photoManager.currentIndex)
                    }
                }
                .frame(height: 6)
                .padding(.horizontal, 24)
            }
            .padding(.vertical, 8)

            // Card
            if let photo = photoManager.currentPhoto {
                PhotoCardView(
                    photoAsset: photo,
                    onKeep: { photoManager.keepPhoto() },
                    onDelete: { photoManager.markForDeletion() }
                )
                .padding(.horizontal, 20)
                .padding(.vertical, 8)
                .id(photo.id)
            }

            // Action buttons
            HStack(spacing: 28) {
                // Delete button
                Button {
                    withAnimation(.easeInOut(duration: 0.3)) {
                        photoManager.markForDeletion()
                    }
                } label: {
                    ZStack {
                        Circle()
                            .fill(AppTheme.cardBackground)
                            .frame(width: 64, height: 64)
                            .shadow(color: AppTheme.delete.opacity(0.2), radius: 10, y: 4)
                        Circle()
                            .stroke(AppTheme.delete.opacity(0.3), lineWidth: 2)
                            .frame(width: 64, height: 64)
                        Image(systemName: "xmark")
                            .font(.system(size: 24, weight: .bold, design: .rounded))
                            .foregroundColor(AppTheme.delete)
                    }
                }

                // Undo button
                Button {
                    withAnimation(.easeInOut(duration: 0.3)) {
                        photoManager.undo()
                    }
                } label: {
                    ZStack {
                        Circle()
                            .fill(AppTheme.cardBackground)
                            .frame(width: 48, height: 48)
                            .shadow(color: AppTheme.cardShadow, radius: 6, y: 3)
                        Circle()
                            .stroke(AppTheme.divider, lineWidth: 1.5)
                            .frame(width: 48, height: 48)
                        Image(systemName: "arrow.uturn.backward")
                            .font(.system(size: 18, weight: .bold, design: .rounded))
                            .foregroundColor(photoManager.canUndo ? AppTheme.textPrimary : AppTheme.textTertiary)
                    }
                }
                .disabled(!photoManager.canUndo)
                .opacity(photoManager.canUndo ? 1 : 0.4)

                // Keep button
                Button {
                    withAnimation(.easeInOut(duration: 0.3)) {
                        photoManager.keepPhoto()
                    }
                } label: {
                    ZStack {
                        Circle()
                            .fill(AppTheme.cardBackground)
                            .frame(width: 64, height: 64)
                            .shadow(color: AppTheme.keep.opacity(0.2), radius: 10, y: 4)
                        Circle()
                            .stroke(AppTheme.keep.opacity(0.3), lineWidth: 2)
                            .frame(width: 64, height: 64)
                        Image(systemName: "heart.fill")
                            .font(.system(size: 24, weight: .bold, design: .rounded))
                            .foregroundColor(AppTheme.keep)
                    }
                }
            }
            .padding(.bottom, 20)
        }
    }

    // MARK: - Empty State

    private var emptyStateView: some View {
        VStack(spacing: 0) {
            DatePickerHeader(
                selectedDate: $photoManager.selectedDate,
                photoCount: 0,
                onDateChanged: { date in
                    Task { await photoManager.loadPhotosForDate(date) }
                }
            )
            .padding(.top, 8)
            .padding(.horizontal, 4)

            Spacer()

            VStack(spacing: 20) {
                ZStack {
                    Circle()
                        .fill(AppTheme.primarySoft)
                        .frame(width: 120, height: 120)
                    Image(systemName: "photo.on.rectangle.angled")
                        .font(.system(size: 48, design: .rounded))
                        .foregroundColor(AppTheme.primary)
                }

                Text("이 날의 사진이 없어요")
                    .font(.system(size: 22, weight: .bold, design: .rounded))
                    .foregroundColor(AppTheme.textPrimary)

                Text("다른 날짜를 선택하거나\n좌우 화살표로 날짜를 바꿔보세요")
                    .font(.system(size: 15, weight: .medium, design: .rounded))
                    .foregroundColor(AppTheme.textSecondary)
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)
            }

            Spacer()
        }
    }

    // MARK: - Access Views

    private var requestAccessView: some View {
        VStack(spacing: 24) {
            Spacer()

            ZStack {
                Circle()
                    .fill(AppTheme.primarySoft)
                    .frame(width: 140, height: 140)
                Image(systemName: "photo.stack.fill")
                    .font(.system(size: 56, design: .rounded))
                    .foregroundColor(AppTheme.primary)
            }

            Text("사진 접근 권한이\n필요해요")
                .font(.system(size: 26, weight: .bold, design: .rounded))
                .foregroundColor(AppTheme.textPrimary)
                .multilineTextAlignment(.center)
                .lineSpacing(4)

            Text("오늘 날짜에 찍힌 추억 사진을 찾기 위해\n사진 라이브러리 접근이 필요해요")
                .font(.system(size: 15, weight: .medium, design: .rounded))
                .foregroundColor(AppTheme.textSecondary)
                .multilineTextAlignment(.center)
                .lineSpacing(4)

            Button {
                Task { await photoManager.requestAuthorization() }
            } label: {
                Text("사진 접근 허용하기")
            }
            .buttonStyle(PrimaryButtonStyle())
            .padding(.horizontal, 40)
            .padding(.top, 8)

            Spacer()
        }
    }

    private var deniedAccessView: some View {
        VStack(spacing: 24) {
            Spacer()

            ZStack {
                Circle()
                    .fill(Color.orange.opacity(0.12))
                    .frame(width: 140, height: 140)
                Image(systemName: "lock.shield.fill")
                    .font(.system(size: 56, design: .rounded))
                    .foregroundColor(.orange)
            }

            Text("사진 접근이\n거부되었어요")
                .font(.system(size: 26, weight: .bold, design: .rounded))
                .foregroundColor(AppTheme.textPrimary)
                .multilineTextAlignment(.center)
                .lineSpacing(4)

            Text("설정에서 사진 접근 권한을\n허용해주세요")
                .font(.system(size: 15, weight: .medium, design: .rounded))
                .foregroundColor(AppTheme.textSecondary)
                .multilineTextAlignment(.center)
                .lineSpacing(4)

            Button {
                if let url = URL(string: UIApplication.openSettingsURLString) {
                    UIApplication.shared.open(url)
                }
            } label: {
                HStack(spacing: 8) {
                    Image(systemName: "gearshape.fill")
                    Text("설정으로 이동")
                }
            }
            .buttonStyle(PrimaryButtonStyle())
            .padding(.horizontal, 40)
            .padding(.top, 8)

            Spacer()
        }
    }
}
