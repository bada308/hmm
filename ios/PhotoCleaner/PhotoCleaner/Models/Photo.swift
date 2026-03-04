import Foundation
import Photos

struct PhotoAsset: Identifiable, Equatable {
    let id: String
    let asset: PHAsset
    let creationDate: Date
    let year: Int

    static func == (lhs: PhotoAsset, rhs: PhotoAsset) -> Bool {
        lhs.id == rhs.id
    }
}
