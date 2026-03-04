import Foundation
import Photos
import UIKit
import SwiftUI

@MainActor
class PhotoManager: ObservableObject {
    @Published var todayPhotos: [PhotoAsset] = []
    @Published var currentIndex: Int = 0
    @Published var assetsToDelete: [PHAsset] = []
    @Published var isLoading: Bool = false
    @Published var authorizationStatus: PHAuthorizationStatus = .notDetermined
    @Published var selectedDate: Date = Date()

    // Undo history stack
    private var undoStack: [(index: Int, deletedAsset: PHAsset?)] = []

    var currentPhoto: PhotoAsset? {
        guard currentIndex < todayPhotos.count else { return nil }
        return todayPhotos[currentIndex]
    }

    var remainingCount: Int {
        max(0, todayPhotos.count - currentIndex)
    }

    var deletedCount: Int {
        assetsToDelete.count
    }

    var keptCount: Int {
        currentIndex - assetsToDelete.count
    }

    var canUndo: Bool {
        !undoStack.isEmpty
    }

    // MARK: - Authorization

    func requestAuthorization() async {
        let status = await PHPhotoLibrary.requestAuthorization(for: .readWrite)
        authorizationStatus = status
        if status == .authorized || status == .limited {
            await loadPhotosForDate(selectedDate)
        }
    }

    // MARK: - Load Photos (background thread for enumeration)

    func loadPhotosForDate(_ date: Date) async {
        isLoading = true
        selectedDate = date
        currentIndex = 0
        assetsToDelete = []
        undoStack = []

        let calendar = Calendar.current
        let month = calendar.component(.month, from: date)
        let day = calendar.component(.day, from: date)

        // Run heavy photo enumeration off main thread
        let matched = await Task.detached(priority: .userInitiated) {
            let fetchOptions = PHFetchOptions()
            fetchOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]

            let allPhotos = PHAsset.fetchAssets(with: .image, options: fetchOptions)
            var result: [PhotoAsset] = []

            allPhotos.enumerateObjects { asset, _, _ in
                guard let creationDate = asset.creationDate else { return }
                let assetMonth = calendar.component(.month, from: creationDate)
                let assetDay = calendar.component(.day, from: creationDate)

                if assetMonth == month && assetDay == day {
                    let year = calendar.component(.year, from: creationDate)
                    result.append(PhotoAsset(
                        id: asset.localIdentifier,
                        asset: asset,
                        creationDate: creationDate,
                        year: year
                    ))
                }
            }

            // Sort by year descending (newest first)
            result.sort { $0.creationDate > $1.creationDate }
            return result
        }.value

        todayPhotos = matched
        isLoading = false
    }

    // MARK: - Swipe Actions

    func keepPhoto() {
        guard currentIndex < todayPhotos.count else { return }
        undoStack.append((index: currentIndex, deletedAsset: nil))
        currentIndex += 1
        triggerHaptic(.light)
    }

    func markForDeletion() {
        guard currentIndex < todayPhotos.count else { return }
        let asset = todayPhotos[currentIndex].asset
        undoStack.append((index: currentIndex, deletedAsset: asset))
        assetsToDelete.append(asset)
        currentIndex += 1
        triggerHaptic(.medium)
    }

    // MARK: - Undo

    func undo() {
        guard let last = undoStack.popLast() else { return }

        // If last action was delete, remove from delete list
        if let deletedAsset = last.deletedAsset {
            assetsToDelete.removeAll { $0.localIdentifier == deletedAsset.localIdentifier }
        }

        currentIndex = last.index
        triggerHaptic(.rigid)
    }

    // MARK: - Execute Deletion

    func executeDelete() async -> Bool {
        guard !assetsToDelete.isEmpty else { return true }

        do {
            try await PHPhotoLibrary.shared().performChanges {
                PHAssetChangeRequest.deleteAssets(self.assetsToDelete as NSFastEnumeration)
            }
            assetsToDelete = []
            return true
        } catch {
            print("Failed to delete photos: \(error)")
            return false
        }
    }

    // MARK: - Reset

    func reset() async {
        await loadPhotosForDate(selectedDate)
    }

    // MARK: - Haptic Feedback

    private func triggerHaptic(_ style: UIImpactFeedbackGenerator.FeedbackStyle) {
        let generator = UIImpactFeedbackGenerator(style: style)
        generator.impactOccurred()
    }
}
