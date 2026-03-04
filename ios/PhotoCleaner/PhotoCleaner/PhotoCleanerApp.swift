import SwiftUI

@main
struct PhotoCleanerApp: App {
    @StateObject private var photoManager = PhotoManager()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(photoManager)
                .task {
                    await photoManager.requestAuthorization()
                }
        }
    }
}
