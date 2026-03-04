import SwiftUI

enum AppTheme {
    // Primary coral/orange palette
    static let primary = Color(red: 1.0, green: 0.44, blue: 0.37)       // #FF7060 warm coral
    static let primaryLight = Color(red: 1.0, green: 0.55, blue: 0.48)  // lighter coral
    static let primarySoft = Color(red: 1.0, green: 0.92, blue: 0.90)   // very soft coral bg
    static let primaryGradientStart = Color(red: 1.0, green: 0.50, blue: 0.40)
    static let primaryGradientEnd = Color(red: 1.0, green: 0.38, blue: 0.42)

    // Accent
    static let keep = Color(red: 0.35, green: 0.78, blue: 0.55)         // soft green
    static let keepSoft = Color(red: 0.88, green: 0.96, blue: 0.90)
    static let delete = Color(red: 1.0, green: 0.44, blue: 0.37)        // coral (same as primary)
    static let deleteSoft = Color(red: 1.0, green: 0.92, blue: 0.90)

    // Neutral
    static let background = Color(red: 0.98, green: 0.97, blue: 0.95)   // warm off-white
    static let cardBackground = Color.white
    static let textPrimary = Color(red: 0.20, green: 0.18, blue: 0.18)
    static let textSecondary = Color(red: 0.55, green: 0.52, blue: 0.50)
    static let textTertiary = Color(red: 0.75, green: 0.72, blue: 0.70)
    static let divider = Color(red: 0.93, green: 0.91, blue: 0.89)

    // Shadows
    static let cardShadow = Color.black.opacity(0.06)
    static let buttonShadow = Color(red: 1.0, green: 0.44, blue: 0.37).opacity(0.3)

    // Radius
    static let cornerRadius: CGFloat = 20
    static let buttonRadius: CGFloat = 16
    static let smallRadius: CGFloat = 12

    // Primary gradient
    static var primaryGradient: LinearGradient {
        LinearGradient(
            colors: [primaryGradientStart, primaryGradientEnd],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
}

// MARK: - Reusable Modifiers

struct SoftCardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(AppTheme.cardBackground)
            .cornerRadius(AppTheme.cornerRadius)
            .shadow(color: AppTheme.cardShadow, radius: 12, x: 0, y: 4)
    }
}

struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 17, weight: .bold, design: .rounded))
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(AppTheme.primaryGradient)
            .cornerRadius(AppTheme.buttonRadius)
            .shadow(color: AppTheme.buttonShadow, radius: 8, y: 4)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.easeInOut(duration: 0.15), value: configuration.isPressed)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 17, weight: .bold, design: .rounded))
            .foregroundColor(AppTheme.textPrimary)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(AppTheme.background)
            .cornerRadius(AppTheme.buttonRadius)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.easeInOut(duration: 0.15), value: configuration.isPressed)
    }
}

extension View {
    func softCard() -> some View {
        modifier(SoftCardModifier())
    }
}
