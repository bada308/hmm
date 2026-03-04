import SwiftUI

struct DatePickerHeader: View {
    @Binding var selectedDate: Date
    let photoCount: Int
    let onDateChanged: (Date) -> Void

    @State private var showDatePicker = false

    var body: some View {
        VStack(spacing: 8) {
            HStack {
                Button {
                    changeDate(by: -1)
                } label: {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(.primary)
                        .frame(width: 44, height: 44)
                }

                Spacer()

                Button {
                    showDatePicker.toggle()
                } label: {
                    VStack(spacing: 2) {
                        Text(formattedDate)
                            .font(.system(size: 22, weight: .bold))
                            .foregroundColor(.primary)
                        Text("이 날의 사진 \(photoCount)장")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                }

                Spacer()

                Button {
                    changeDate(by: 1)
                } label: {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(.primary)
                        .frame(width: 44, height: 44)
                }
            }
            .padding(.horizontal, 8)

            if showDatePicker {
                DatePicker(
                    "",
                    selection: $selectedDate,
                    displayedComponents: .date
                )
                .datePickerStyle(.graphical)
                .labelsHidden()
                .onChange(of: selectedDate) { _, newDate in
                    showDatePicker = false
                    onDateChanged(newDate)
                }
                .padding(.horizontal)
                .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .animation(.easeInOut(duration: 0.3), value: showDatePicker)
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
