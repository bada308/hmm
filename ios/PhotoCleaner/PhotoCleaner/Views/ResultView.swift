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

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 72))
                .foregroundColor(.green)

            Text("정리 완료!")
                .font(.system(size: 28, weight: .bold))

            VStack(spacing: 12) {
                HStack(spacing: 32) {
                    VStack(spacing: 4) {
                        Text("\(keptCount)")
                            .font(.system(size: 36, weight: .bold))
                            .foregroundColor(.green)
                        Text("유지")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }

                    Rectangle()
                        .fill(Color(.separator))
                        .frame(width: 1, height: 50)

                    VStack(spacing: 4) {
                        Text("\(deletedCount)")
                            .font(.system(size: 36, weight: .bold))
                            .foregroundColor(.red)
                        Text("삭제 예정")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                }
                .padding(24)
                .background(Color(.systemGray6))
                .cornerRadius(16)
            }

            Spacer()

            if deletedCount > 0 {
                Button {
                    showDeleteAlert = true
                } label: {
                    HStack {
                        Image(systemName: "trash.fill")
                        Text("\(deletedCount)장 삭제하기")
                    }
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color.red)
                    .cornerRadius(14)
                }
                .disabled(isDeleting)
            }

            Button {
                Task {
                    await onReset()
                }
            } label: {
                Text("다시 하기")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
                    .background(Color(.systemGray5))
                    .cornerRadius(14)
            }
        }
        .padding(24)
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
