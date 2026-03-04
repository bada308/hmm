import SwiftUI
import Photos

struct PhotoCardView: View {
    let photoAsset: PhotoAsset
    let onKeep: () -> Void
    let onDelete: () -> Void

    @State private var offset: CGSize = .zero
    @State private var image: UIImage?
    @State private var isLoadingImage = true

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
                // Photo
                if let image = image {
                    Image(uiImage: image)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: geo.size.width, height: geo.size.height)
                        .clipped()
                } else if isLoadingImage {
                    ProgressView()
                        .scaleEffect(1.5)
                        .frame(width: geo.size.width, height: geo.size.height)
                        .background(Color(.systemGray6))
                } else {
                    Image(systemName: "photo")
                        .font(.system(size: 60))
                        .foregroundColor(.gray)
                        .frame(width: geo.size.width, height: geo.size.height)
                        .background(Color(.systemGray6))
                }

                // Overlay indicators
                VStack {
                    HStack {
                        // DELETE label (left swipe)
                        Text("삭제")
                            .font(.system(size: 36, weight: .black))
                            .foregroundColor(.red)
                            .padding(8)
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.red, lineWidth: 4)
                            )
                            .rotationEffect(.degrees(-15))
                            .opacity(swipeDirection == .left ? min(Double(abs(offset.width)) / 100, 1) : 0)

                        Spacer()

                        // KEEP label (right swipe)
                        Text("유지")
                            .font(.system(size: 36, weight: .black))
                            .foregroundColor(.green)
                            .padding(8)
                            .overlay(
                                RoundedRectangle(cornerRadius: 8)
                                    .stroke(Color.green, lineWidth: 4)
                            )
                            .rotationEffect(.degrees(15))
                            .opacity(swipeDirection == .right ? min(Double(abs(offset.width)) / 100, 1) : 0)
                    }
                    .padding(.top, 40)
                    .padding(.horizontal, 20)

                    Spacer()

                    // Year & date label
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(yearString)
                                .font(.system(size: 32, weight: .bold))
                                .foregroundColor(.white)
                            Text(dateString)
                                .font(.system(size: 16, weight: .medium))
                                .foregroundColor(.white.opacity(0.8))
                        }
                        .padding(16)
                        .background(.ultraThinMaterial)
                        .cornerRadius(12)

                        Spacer()
                    }
                    .padding(20)
                }
            }
            .cornerRadius(20)
            .shadow(radius: 8)
            .offset(x: offset.width, y: offset.height * 0.3)
            .rotationEffect(.degrees(Double(offset.width / 30)))
            .gesture(
                DragGesture()
                    .onChanged { gesture in
                        offset = gesture.translation
                    }
                    .onEnded { gesture in
                        if abs(gesture.translation.width) > 120 {
                            // Swipe threshold met
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
                            // Snap back
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
