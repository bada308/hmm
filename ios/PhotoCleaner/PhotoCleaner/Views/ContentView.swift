import SwiftUI
import Photos

struct ContentView: View {
    @EnvironmentObject var photoManager: PhotoManager

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
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
            .navigationTitle("오늘의 사진")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    // MARK: - Main Content

    @ViewBuilder
    private var mainContent: some View {
        if photoManager.isLoading {
            VStack {
                Spacer()
                ProgressView("사진을 찾고 있어요...")
                    .font(.headline)
                Spacer()
            }
        } else if photoManager.todayPhotos.isEmpty {
            emptyStateView
        } else if photoManager.currentPhoto == nil {
            // All photos reviewed
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
            DatePickerHeader(
                selectedDate: $photoManager.selectedDate,
                photoCount: photoManager.todayPhotos.count,
                onDateChanged: { date in
                    Task { await photoManager.loadPhotosForDate(date) }
                }
            )
            .padding(.top, 8)

            // Progress
            HStack {
                Text("\(photoManager.currentIndex + 1) / \(photoManager.todayPhotos.count)")
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(.secondary)
                Spacer()
                HStack(spacing: 12) {
                    Label("\(photoManager.keptCount)", systemImage: "checkmark.circle.fill")
                        .foregroundColor(.green)
                    Label("\(photoManager.deletedCount)", systemImage: "trash.circle.fill")
                        .foregroundColor(.red)
                }
                .font(.system(size: 14, weight: .medium))
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 8)

            // Progress bar
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Rectangle()
                        .fill(Color(.systemGray5))
                        .frame(height: 4)
                    Rectangle()
                        .fill(Color.blue)
                        .frame(
                            width: geo.size.width * CGFloat(photoManager.currentIndex) / CGFloat(max(photoManager.todayPhotos.count, 1)),
                            height: 4
                        )
                }
            }
            .frame(height: 4)
            .padding(.horizontal, 20)

            // Card
            if let photo = photoManager.currentPhoto {
                PhotoCardView(
                    photoAsset: photo,
                    onKeep: { photoManager.keepPhoto() },
                    onDelete: { photoManager.markForDeletion() }
                )
                .padding(20)
                .id(photo.id)
            }

            // Action buttons
            HStack(spacing: 40) {
                Button {
                    photoManager.markForDeletion()
                } label: {
                    Image(systemName: "xmark")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(.white)
                        .frame(width: 64, height: 64)
                        .background(Color.red)
                        .clipShape(Circle())
                        .shadow(color: .red.opacity(0.3), radius: 8, y: 4)
                }

                Button {
                    photoManager.keepPhoto()
                } label: {
                    Image(systemName: "checkmark")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(.white)
                        .frame(width: 64, height: 64)
                        .background(Color.green)
                        .clipShape(Circle())
                        .shadow(color: .green.opacity(0.3), radius: 8, y: 4)
                }
            }
            .padding(.bottom, 24)
        }
    }

    // MARK: - Empty State

    private var emptyStateView: some View {
        VStack(spacing: 16) {
            DatePickerHeader(
                selectedDate: $photoManager.selectedDate,
                photoCount: 0,
                onDateChanged: { date in
                    Task { await photoManager.loadPhotosForDate(date) }
                }
            )
            .padding(.top, 8)

            Spacer()

            Image(systemName: "photo.on.rectangle.angled")
                .font(.system(size: 64))
                .foregroundColor(.secondary)
            Text("이 날짜에 찍은 사진이 없어요")
                .font(.system(size: 20, weight: .semibold))
            Text("다른 날짜를 선택하거나\n좌우 화살표로 날짜를 바꿔보세요")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)

            Spacer()
        }
    }

    // MARK: - Access Views

    private var requestAccessView: some View {
        VStack(spacing: 20) {
            Spacer()

            Image(systemName: "photo.stack")
                .font(.system(size: 72))
                .foregroundColor(.blue)

            Text("사진 접근 권한이 필요해요")
                .font(.system(size: 22, weight: .bold))

            Text("오늘 날짜에 찍힌 사진을 찾기 위해\n사진 라이브러리 접근이 필요합니다")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)

            Button {
                Task { await photoManager.requestAuthorization() }
            } label: {
                Text("사진 접근 허용하기")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color.blue)
                    .cornerRadius(14)
            }
            .padding(.horizontal, 40)

            Spacer()
        }
    }

    private var deniedAccessView: some View {
        VStack(spacing: 20) {
            Spacer()

            Image(systemName: "lock.shield")
                .font(.system(size: 72))
                .foregroundColor(.orange)

            Text("사진 접근이 거부되었어요")
                .font(.system(size: 22, weight: .bold))

            Text("설정에서 사진 접근 권한을\n허용해주세요")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)

            Button {
                if let url = URL(string: UIApplication.openSettingsURLString) {
                    UIApplication.shared.open(url)
                }
            } label: {
                Text("설정으로 이동")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color.orange)
                    .cornerRadius(14)
            }
            .padding(.horizontal, 40)

            Spacer()
        }
    }
}
