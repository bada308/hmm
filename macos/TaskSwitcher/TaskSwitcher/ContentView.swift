import SwiftUI

struct ContentView: View {
    @EnvironmentObject var taskManager: TaskManager
    @State private var newTaskName = ""
    @State private var editingMemoFor: UUID?
    @State private var memoText = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack {
                Text("작업 목록")
                    .font(.headline)
                Spacer()
                Button(action: { NSApplication.shared.terminate(nil) }) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.secondary)
                }
                .buttonStyle(.plain)
            }
            .padding()

            Divider()

            // Add new task
            HStack {
                TextField("새 작업 추가...", text: $newTaskName)
                    .textFieldStyle(.plain)
                    .onSubmit {
                        addTask()
                    }

                Button(action: addTask) {
                    Image(systemName: "plus.circle.fill")
                        .foregroundColor(.accentColor)
                }
                .buttonStyle(.plain)
                .disabled(newTaskName.isEmpty)
            }
            .padding()

            Divider()

            // Task list
            ScrollView {
                VStack(alignment: .leading, spacing: 4) {
                    if taskManager.pendingTasks.isEmpty {
                        Text("작업이 없습니다")
                            .foregroundColor(.secondary)
                            .padding()
                    } else {
                        ForEach(taskManager.pendingTasks) { task in
                            TaskRow(
                                task: task,
                                isCurrent: task.id == taskManager.currentTaskId,
                                isEditingMemo: editingMemoFor == task.id,
                                memoText: $memoText,
                                onSwitch: { taskManager.switchTo(task) },
                                onToggleMemo: { toggleMemoEdit(for: task) },
                                onSaveMemo: { saveMemo(for: task) },
                                onComplete: { taskManager.toggleComplete(task) },
                                onDelete: { taskManager.deleteTask(task) }
                            )
                        }
                    }

                    // Completed tasks
                    if !taskManager.completedTasks.isEmpty {
                        Divider()
                            .padding(.vertical, 8)

                        Text("완료됨")
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .padding(.horizontal)

                        ForEach(taskManager.completedTasks) { task in
                            CompletedTaskRow(
                                task: task,
                                onRestore: { taskManager.toggleComplete(task) },
                                onDelete: { taskManager.deleteTask(task) }
                            )
                        }
                    }
                }
                .padding(.vertical, 8)
            }
        }
        .frame(width: 320, height: 400)
    }

    private func addTask() {
        guard !newTaskName.isEmpty else { return }
        taskManager.addTask(name: newTaskName)
        newTaskName = ""
    }

    private func toggleMemoEdit(for task: Task) {
        if editingMemoFor == task.id {
            saveMemo(for: task)
        } else {
            editingMemoFor = task.id
            memoText = task.memo
        }
    }

    private func saveMemo(for task: Task) {
        taskManager.updateMemo(for: task, memo: memoText)
        editingMemoFor = nil
        memoText = ""
    }
}

struct TaskRow: View {
    let task: Task
    let isCurrent: Bool
    let isEditingMemo: Bool
    @Binding var memoText: String
    let onSwitch: () -> Void
    let onToggleMemo: () -> Void
    let onSaveMemo: () -> Void
    let onComplete: () -> Void
    let onDelete: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                // Current indicator
                Image(systemName: isCurrent ? "checkmark.circle.fill" : "circle")
                    .foregroundColor(isCurrent ? .accentColor : .secondary)
                    .onTapGesture(perform: onSwitch)

                // Task name
                Text(task.name)
                    .fontWeight(isCurrent ? .semibold : .regular)

                Spacer()

                // Memo button
                Button(action: onToggleMemo) {
                    Image(systemName: task.memo.isEmpty ? "note.text.badge.plus" : "note.text")
                        .foregroundColor(task.memo.isEmpty ? .secondary : .accentColor)
                }
                .buttonStyle(.plain)
                .help("메모 추가/편집")

                // Complete button
                Button(action: onComplete) {
                    Image(systemName: "checkmark")
                        .foregroundColor(.green)
                }
                .buttonStyle(.plain)
                .help("완료")

                // Delete button
                Button(action: onDelete) {
                    Image(systemName: "trash")
                        .foregroundColor(.red)
                }
                .buttonStyle(.plain)
                .help("삭제")
            }

            // Memo display or edit
            if isEditingMemo {
                HStack {
                    TextField("어디까지 했는지 메모...", text: $memoText)
                        .textFieldStyle(.roundedBorder)
                        .font(.caption)
                        .onSubmit(onSaveMemo)

                    Button("저장", action: onSaveMemo)
                        .font(.caption)
                }
                .padding(.leading, 24)
            } else if !task.memo.isEmpty {
                Text("→ \(task.memo)")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .padding(.leading, 24)
            }
        }
        .padding(.horizontal)
        .padding(.vertical, 6)
        .background(isCurrent ? Color.accentColor.opacity(0.1) : Color.clear)
        .cornerRadius(6)
        .padding(.horizontal, 8)
    }
}

struct CompletedTaskRow: View {
    let task: Task
    let onRestore: () -> Void
    let onDelete: () -> Void

    var body: some View {
        HStack {
            Image(systemName: "checkmark.circle.fill")
                .foregroundColor(.green)

            Text(task.name)
                .strikethrough()
                .foregroundColor(.secondary)

            Spacer()

            Button(action: onRestore) {
                Image(systemName: "arrow.uturn.backward")
                    .foregroundColor(.secondary)
            }
            .buttonStyle(.plain)
            .help("복원")

            Button(action: onDelete) {
                Image(systemName: "trash")
                    .foregroundColor(.red)
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal)
        .padding(.vertical, 4)
        .padding(.horizontal, 8)
    }
}

#Preview {
    ContentView()
        .environmentObject(TaskManager())
}
