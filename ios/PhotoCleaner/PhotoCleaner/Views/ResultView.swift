import SwiftUI

struct ResultView: View {
    let keptCount: Int
    let deletedCount: Int
    let onConfirmDelete: () async -> Bool
    let onReset: () async -> Void

    @State private var isDeleting = false
    @State private var showDeleteAlert = false
    @State private var deleteSuccess = false
    @State private var showResult = false
    @State private var animateIn = false

    var body: some View {
        VStack(spacing: 0) {
            Spacer()

            // Success icon
            ZStack {
                Circle()
                    .fill(AppTheme.keepSoft)
                    .frame(width: 120, height: 120)
                    .scaleEffect(animateIn ? 1 : 0.5)

                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 64))
                    .foregroundColor(AppTheme.keep)
                    .scaleEffect(animateIn ? 1 : 0.3)
            }
            .animation(.spring(response: 0.5, dampingFraction: 0.6), value: animateIn)

            Text("정리 완료!")
                .font(.system(size: 28, weight: .bold, design: .rounded))
                .foregroundColor(AppTheme.textPrimary)
                .padding(.top, 20)
                .opacity(animateIn ? 1 : 0)
                .offset(y: animateIn ? 0 : 20)
                .animation(.easeOut(duration: 0.4).delay(0.2), value: animateIn)

            // Stats cards
            HStack(spacing: 16) {
                // Kept
                VStack(spacing: 8) {
                    Image(systemName: "heart.fill")
                        .font(.system(size: 24))
                        .foregroundColor(AppTheme.keep)

                    Text("\(keptCount)")
                        .font(.system(size: 36, weight: .bold, design: .rounded))
                        .foregroundColor(AppTheme.textPrimary)

                    Text("유지")
                        .font(.system(size: 14, weight: .semibold, design: .rounded))
                        .foregroundColor(AppTheme.textSecondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 20)
                .background(AppTheme.keepSoft)
                .cornerRadius(AppTheme.cornerRadius)

                // Deleted
                VStack(spacing: 8) {
                    Image(systemName: "trash.fill")
                        .font(.system(size: 24))
                        .foregroundColor(AppTheme.delete)

                    Text("\(deletedCount)")
                        .font(.system(size: 36, weight: .bold, design: .rounded))
                        .foregroundColor(AppTheme.textPrimary)

                    Text("삭제 예정")
                        .font(.system(size: 14, weight: .semibold, design: .rounded))
                        .foregroundColor(AppTheme.textSecondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 20)
                .background(AppTheme.deleteSoft)
                .cornerRadius(AppTheme.cornerRadius)
            }
            .padding(.horizontal, 24)
            .padding(.top, 28)
            .opacity(animateIn ? 1 : 0)
            .offset(y: animateIn ? 0 : 30)
            .animation(.easeOut(duration: 0.4).delay(0.35), value: animateIn)

            Spacer()

            // Action buttons
            VStack(spacing: 12) {
                if deletedCount > 0 {
                    Button {
                        showDeleteAlert = true
                    } label: {
                        HStack(spacing: 8) {
                            Image(systemName: "trash.fill")
                            Text("\(deletedCount)장 삭제하기")
                        }
                    }
                    .buttonStyle(PrimaryButtonStyle())
                    .disabled(isDeleting)
                }

                Button {
                    Task { await onReset() }
                } label: {
                    Text("다시 하기")
                }
                .buttonStyle(SecondaryButtonStyle())
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 32)
            .opacity(animateIn ? 1 : 0)
            .animation(.easeOut(duration: 0.4).delay(0.5), value: animateIn)
        }
        .onAppear {
            animateIn = true
        }
        .alert("사진 삭제", isPresented: $showDeleteAlert) {
            Button("취소", role: .cancel) {}
            Button("삭제", role: .destructive) {
                isDeleting = true
                Task {
                    deleteSuccess = await onConfirmDelete()
                    isDeleting = false
                    showResult = true
                }
            }
        } message: {
            Text("\(deletedCount)장의 사진을 삭제합니다.\n삭제된 사진은 '최근 삭제된 항목'에서 30일간 복구 가능합니다.")
        }
        .alert(deleteSuccess ? "삭제 완료" : "삭제 실패", isPresented: $showResult) {
            Button("확인") {
                if deleteSuccess {
                    Task { await onReset() }
                }
            }
        } message: {
            Text(deleteSuccess
                 ? "\(deletedCount)장의 사진이 삭제되었습니다."
                 : "사진 삭제에 실패했습니다. 다시 시도해주세요.")
        }
    }
}
