import SwiftUI

struct DatePickerHeader: View {
    @Binding var selectedDate: Date
    let photoCount: Int
    let onDateChanged: (Date) -> Void

    @State private var showDatePicker = false

    var body: some View {
        VStack(spacing: 8) {
            HStack {
                // Previous day
                Button {
                    changeDate(by: -1)
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 16, weight: .bold, design: .rounded))
                        .foregroundColor(AppTheme.primary)
                        .frame(width: 40, height: 40)
                        .background(AppTheme.primarySoft)
                        .clipShape(Circle())
                }

                Spacer()

                // Date display
                Button {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                        showDatePicker.toggle()
                    }
                } label: {
                    VStack(spacing: 4) {
                        Text(formattedDate)
                            .font(.system(size: 24, weight: .bold, design: .rounded))
                            .foregroundColor(AppTheme.textPrimary)

                        HStack(spacing: 6) {
                            Circle()
                                .fill(AppTheme.primary)
                                .frame(width: 6, height: 6)
                            Text("이 날의 사진 \(photoCount)장")
                                .font(.system(size: 13, weight: .semibold, design: .rounded))
                                .foregroundColor(AppTheme.textSecondary)
                        }
                    }
                }

                Spacer()

                // Next day
                Button {
                    changeDate(by: 1)
                } label: {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 16, weight: .bold, design: .rounded))
                        .foregroundColor(AppTheme.primary)
                        .frame(width: 40, height: 40)
                        .background(AppTheme.primarySoft)
                        .clipShape(Circle())
                }
            }
            .padding(.horizontal, 16)

            if showDatePicker {
                DatePicker(
                    "",
                    selection: $selectedDate,
                    displayedComponents: .date
                )
                .datePickerStyle(.graphical)
                .tint(AppTheme.primary)
                .labelsHidden()
                .onChange(of: selectedDate) { _, newDate in
                    withAnimation { showDatePicker = false }
                    onDateChanged(newDate)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(AppTheme.cardBackground)
                .cornerRadius(AppTheme.cornerRadius)
                .shadow(color: AppTheme.cardShadow, radius: 12, y: 4)
                .padding(.horizontal, 16)
                .transition(.opacity.combined(with: .scale(scale: 0.95)))
            }
        }
    }

    private var formattedDate: String {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "ko_KR")
        formatter.dateFormat = "M월 d일"
        return formatter.string(from: selectedDate)
    }

    private func changeDate(by days: Int) {
        guard let newDate = Calendar.current.date(byAdding: .day, value: days, to: selectedDate) else { return }
        selectedDate = newDate
        onDateChanged(newDate)
    }
}
