# Lange's Deli - Mobile App

A React Native (Expo) mobile ordering app for Lange's Little Store & Delicatessen, Chappaqua, NY.

## Tech Stack

- **Expo SDK 54** with TypeScript
- **Expo Router** (file-based navigation)
- **Zustand** (state management with AsyncStorage persistence)
- **Firebase** (Auth, Firestore, Cloud Functions)
- **React Native Reanimated** (animations)

## Requirements

- **Node.js 20+** (required by Expo SDK 54)
- Xcode 16+ (for iOS builds)
- Apple Developer Account (for App Store submission)

## Getting Started

```bash
cd app
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` to open in the iOS Simulator.

## Project Structure

```
app/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home
│   │   ├── menu.tsx       # Menu browser
│   │   ├── builder.tsx    # BYO sandwich builder
│   │   ├── cart.tsx       # Cart & checkout
│   │   └── profile.tsx    # More/settings
│   ├── (auth)/            # Auth screens
│   ├── catering.tsx       # Catering inquiry
│   ├── privacy.tsx        # Privacy policy
│   └── order/[id].tsx     # Order details
├── src/
│   ├── components/        # Reusable UI
│   ├── constants/         # Theme, menu data, store info
│   ├── store/             # Zustand stores
│   ├── services/          # Firebase services
│   ├── hooks/             # Custom hooks
│   └── types/             # TypeScript types
└── assets/                # Icons, splash, images
```

## Building for App Store

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password + Apple Sign-In)
3. Create a Firestore database
4. Copy your config to `src/services/firebase.ts`
5. Deploy Firestore rules: `firebase deploy --only firestore:rules`

## App Store Checklist

- [ ] Apple Developer Account enrolled
- [ ] Firebase project created and configured
- [ ] App icon finalized (1024x1024)
- [ ] Screenshots captured (6.7", 6.5" iPhones)
- [ ] Privacy policy URL live
- [ ] App Store listing (description, keywords)
- [ ] TestFlight beta tested
- [ ] App Review submitted
