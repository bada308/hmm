import SwiftUI

@main
struct TaskSwitcherApp: App {
    @StateObject private var taskManager = TaskManager()

    var body: some Scene {
        MenuBarExtra {
            ContentView()
                .environmentObject(taskManager)
        } label: {
            if let current = taskManager.currentTask {
                Text("📌 \(current.name)")
            } else {
                Image(systemName: "checklist")
            }
        }
        .menuBarExtraStyle(.window)
    }
}
