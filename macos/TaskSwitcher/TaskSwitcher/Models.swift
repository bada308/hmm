import Foundation

struct Task: Identifiable, Codable, Equatable {
    let id: UUID
    var name: String
    var memo: String
    var isCompleted: Bool
    var createdAt: Date

    init(name: String, memo: String = "") {
        self.id = UUID()
        self.name = name
        self.memo = memo
        self.isCompleted = false
        self.createdAt = Date()
    }
}

class TaskManager: ObservableObject {
    @Published var tasks: [Task] = []
    @Published var currentTaskId: UUID?

    private let tasksKey = "savedTasks"
    private let currentTaskKey = "currentTaskId"

    var currentTask: Task? {
        tasks.first { $0.id == currentTaskId }
    }

    var pendingTasks: [Task] {
        tasks.filter { !$0.isCompleted }
    }

    var completedTasks: [Task] {
        tasks.filter { $0.isCompleted }
    }

    init() {
        loadTasks()
    }

    // MARK: - Task Operations

    func addTask(name: String) {
        let task = Task(name: name)
        tasks.insert(task, at: 0)

        // 첫 작업이면 자동으로 현재 작업으로 설정
        if currentTaskId == nil {
            currentTaskId = task.id
        }

        saveTasks()
    }

    func switchTo(_ task: Task) {
        currentTaskId = task.id
        saveTasks()
    }

    func updateMemo(for task: Task, memo: String) {
        if let index = tasks.firstIndex(where: { $0.id == task.id }) {
            tasks[index].memo = memo
            saveTasks()
        }
    }

    func toggleComplete(_ task: Task) {
        if let index = tasks.firstIndex(where: { $0.id == task.id }) {
            tasks[index].isCompleted.toggle()

            // 완료한 작업이 현재 작업이면 다음 작업으로 전환
            if tasks[index].isCompleted && currentTaskId == task.id {
                currentTaskId = pendingTasks.first?.id
            }

            saveTasks()
        }
    }

    func deleteTask(_ task: Task) {
        tasks.removeAll { $0.id == task.id }

        if currentTaskId == task.id {
            currentTaskId = pendingTasks.first?.id
        }

        saveTasks()
    }

    // MARK: - Persistence

    private func saveTasks() {
        if let encoded = try? JSONEncoder().encode(tasks) {
            UserDefaults.standard.set(encoded, forKey: tasksKey)
        }
        if let id = currentTaskId {
            UserDefaults.standard.set(id.uuidString, forKey: currentTaskKey)
        } else {
            UserDefaults.standard.removeObject(forKey: currentTaskKey)
        }
    }

    private func loadTasks() {
        if let data = UserDefaults.standard.data(forKey: tasksKey),
           let decoded = try? JSONDecoder().decode([Task].self, from: data) {
            tasks = decoded
        }

        if let idString = UserDefaults.standard.string(forKey: currentTaskKey),
           let id = UUID(uuidString: idString) {
            currentTaskId = id
        }
    }
}
