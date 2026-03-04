import SwiftUI
import Photos

struct PhotoCardView: View {
    let photoAsset: PhotoAsset
    let onKeep: () -> Void
    let onDelete: () -> Void

    @State private var offset: CGSize = .zero
    @State private var image: UIImage?
    @State private var isLoadingImage = true

    private var dragProgress: CGFloat {
        min(abs(offset.width) / 120, 1)
    }

    private var swipeDirection: SwipeDirection {
        if offset.width > 50 { return .right }
        if offset.width < -50 { return .left }
        return .none
    }

    enum SwipeDirection {
        case left, right, none
    }

    var body: some View {
        GeometryReader { geo in
            ZStack {
                // Card background
                RoundedRectangle(cornerRadius: 24)
                    .fill(AppTheme.cardBackground)
                    .shadow(color: AppTheme.cardShadow, radius: 16, x: 0, y: 8)

                // Photo
                VStack(spacing: 0) {
                    ZStack {
                        let imageWidth = max(geo.size.width - 16, 0)
                        let imageHeight = max(geo.size.height - 100, 0)

                        if let image = image {
                            Image(uiImage: image)
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(width: imageWidth, height: imageHeight)
                                .clipped()
                                .cornerRadius(20)
                        } else if isLoadingImage {
                            RoundedRectangle(cornerRadius: 20)
                                .fill(AppTheme.primarySoft)
                                .frame(width: imageWidth, height: imageHeight)
                                .overlay(
                                    ProgressView()
                                        .tint(AppTheme.primary)
                                        .scaleEffect(1.3)
                                )
                        } else {
                            RoundedRectangle(cornerRadius: 20)
                                .fill(AppTheme.primarySoft)
                                .frame(width: imageWidth, height: imageHeight)
                                .overlay(
                                    Image(systemName: "photo")
                                        .font(.system(size: 48, design: .rounded))
                                        .foregroundColor(AppTheme.textTertiary)
                                )
                        }

                        // Swipe overlay indicators
                        if swipeDirection == .right {
                            RoundedRectangle(cornerRadius: 20)
                                .fill(AppTheme.keep.opacity(0.2 * dragProgress))
                                .frame(width: imageWidth, height: imageHeight)
                                .overlay(
                                    VStack(spacing: 8) {
                                        Image(systemName: "heart.fill")
                                            .font(.system(size: 48))
                                        Text("유지")
                                            .font(.system(size: 28, weight: .black, design: .rounded))
                                    }
                                    .foregroundColor(.white)
                                    .opacity(dragProgress)
                                )
                        }

                        if swipeDirection == .left {
                            RoundedRectangle(cornerRadius: 20)
                                .fill(AppTheme.delete.opacity(0.2 * dragProgress))
                                .frame(width: imageWidth, height: imageHeight)
                                .overlay(
                                    VStack(spacing: 8) {
                                        Image(systemName: "trash.fill")
                                            .font(.system(size: 48))
                                        Text("삭제")
                                            .font(.system(size: 28, weight: .black, design: .rounded))
                                    }
                                    .foregroundColor(.white)
                                    .opacity(dragProgress)
                                )
                        }
                    }
                    .padding(.top, 8)
                    .padding(.horizontal, 8)

                    // Date info at bottom of card
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(yearString)
                                .font(.system(size: 22, weight: .bold, design: .rounded))
                                .foregroundColor(AppTheme.textPrimary)
                            Text(dateString)
                                .font(.system(size: 13, weight: .medium, design: .rounded))
                                .foregroundColor(AppTheme.textSecondary)
                        }
                        Spacer()
                        // Year pill badge
                        Text(yearsAgoString)
                            .font(.system(size: 13, weight: .semibold, design: .rounded))
                            .foregroundColor(AppTheme.primary)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(AppTheme.primarySoft)
                            .cornerRadius(20)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                }
            }
            .offset(x: offset.width, y: offset.height * 0.2)
            .rotationEffect(.degrees(Double(offset.width / 40)))
            .gesture(
                DragGesture()
                    .onChanged { gesture in
                        offset = gesture.translation
                    }
                    .onEnded { gesture in
                        if abs(gesture.translation.width) > 120 {
                            let direction = gesture.translation.width > 0
                            withAnimation(.easeOut(duration: 0.3)) {
                                offset = CGSize(
                                    width: direction ? 500 : -500,
                                    height: gesture.translation.height
                                )
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                                if direction {
                                    onKeep()
                                } else {
                                    onDelete()
                                }
                                offset = .zero
                            }
                        } else {
                            withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                                offset = .zero
                            }
                        }
                    }
            )
        }
        .onAppear {
            loadImage()
        }
    }

    private var yearString: String {
        "\(photoAsset.year)년"
    }

    private var dateString: String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "ko_KR")
        formatter.dateFormat = "M월 d일 (E) a h:mm"
        return formatter.string(from: photoAsset.creationDate)
    }

    private var yearsAgoString: String {
        let currentYear = Calendar.current.component(.year, from: Date())
        let diff = currentYear - photoAsset.year
        if diff == 0 { return "올해" }
        return "\(diff)년 전"
    }

    private func loadImage() {
        let manager = PHImageManager.default()
        let options = PHImageRequestOptions()
        options.deliveryMode = .highQualityFormat
        options.isNetworkAccessAllowed = true
        options.isSynchronous = false

        let targetSize = CGSize(width: 800, height: 800)

        manager.requestImage(
            for: photoAsset.asset,
            targetSize: targetSize,
            contentMode: .aspectFill,
            options: options
        ) { result, _ in
            DispatchQueue.main.async {
                self.image = result
                self.isLoadingImage = false
            }
        }
    }
}
