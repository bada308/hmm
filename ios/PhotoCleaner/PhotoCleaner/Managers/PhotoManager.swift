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

    // MARK: - Authorization

    func requestAuthorization() async {
        let status = await PHPhotoLibrary.requestAuthorization(for: .readWrite)
        authorizationStatus = status
        if status == .authorized || status == .limited {
            await loadPhotosForDate(selectedDate)
        }
    }

    // MARK: - Load Photos

    func loadPhotosForDate(_ date: Date) async {
        isLoading = true
        selectedDate = date
        currentIndex = 0
        assetsToDelete = []

        let calendar = Calendar.current
        let month = calendar.component(.month, from: date)
        let day = calendar.component(.day, from: date)

        let fetchOptions = PHFetchOptions()
        fetchOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]

        let allPhotos = PHAsset.fetchAssets(with: .image, options: fetchOptions)

        var matched: [PhotoAsset] = []

        allPhotos.enumerateObjects { asset, _, _ in
            guard let creationDate = asset.creationDate else { return }
            let assetMonth = calendar.component(.month, from: creationDate)
            let assetDay = calendar.component(.day, from: creationDate)

            if assetMonth == month && assetDay == day {
                let year = calendar.component(.year, from: creationDate)
                matched.append(PhotoAsset(
                    id: asset.localIdentifier,
                    asset: asset,
                    creationDate: creationDate,
                    year: year
                ))
            }
        }

        // Sort by year descending (newest first)
        matched.sort { $0.creationDate > $1.creationDate }

        todayPhotos = matched
        isLoading = false
    }

    // MARK: - Swipe Actions

    func keepPhoto() {
        guard currentIndex < todayPhotos.count else { return }
        withAnimation(.easeInOut(duration: 0.3)) {
            currentIndex += 1
        }
    }

    func markForDeletion() {
        guard currentIndex < todayPhotos.count else { return }
        assetsToDelete.append(todayPhotos[currentIndex].asset)
        withAnimation(.easeInOut(duration: 0.3)) {
            currentIndex += 1
        }
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
}
