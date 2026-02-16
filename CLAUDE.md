# Lange's Little Store - Mobile App

## Project Overview
Converting Lange's Little Store & Delicatessen ordering website (single index.html) into a full
React Native (Expo) mobile app suitable for Apple App Store submission.

## Tech Stack
- **Framework**: React Native with Expo SDK 52 (managed workflow)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand (lightweight, replaces useReducer)
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **Payments**: Stripe (via @stripe/stripe-react-native)
- **Push Notifications**: expo-notifications + Firebase Cloud Messaging
- **Icons**: @expo/vector-icons (Ionicons, MaterialCommunityIcons)
- **Styling**: React Native StyleSheet + custom theme constants
- **Forms**: react-hook-form
- **Build/Deploy**: EAS Build + EAS Submit

## Project Structure
```
Langes/
├── CLAUDE.md
├── index.html                  # Original web app (preserved)
├── app/                        # Expo app root
│   ├── app.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── babel.config.js
│   ├── eas.json
│   ├── app/                    # Expo Router file-based routes
│   │   ├── _layout.tsx         # Root layout (auth gating)
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx     # Tab navigator
│   │   │   ├── index.tsx       # Home
│   │   │   ├── menu.tsx        # Menu browser
│   │   │   ├── builder.tsx     # BYO sandwich builder
│   │   │   ├── cart.tsx        # Cart / checkout
│   │   │   ├── profile.tsx     # Profile & order history
│   │   ├── catering.tsx        # Catering inquiry (modal)
│   │   ├── order/[id].tsx      # Order confirmation/tracking
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── constants/          # Colors, menu data, store info
│   │   ├── store/              # Zustand stores
│   │   ├── services/           # Firebase, Stripe, API helpers
│   │   ├── hooks/              # Custom hooks
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Formatters, helpers
│   ├── assets/                 # Images, fonts, app icons
│   ├── firebase/               # Firebase config & cloud functions
│   │   ├── firestore.rules
│   │   ├── functions/
```

## Architecture Decisions
1. **Expo managed workflow** — simplest path to App Store; no native code to maintain
2. **Expo Router** over React Navigation directly — modern file-based routing, deep linking
3. **Zustand** over Redux/Context — minimal boilerplate, works well with React Native
4. **Firebase** — provides auth (email + Apple Sign-In), Firestore for orders/menu,
   Cloud Functions for order processing, FCM for push notifications
5. **Stripe** for payments — industry standard, Apple Pay support built in

## App Store Requirements Checklist
- [ ] Apple Developer Account ($99/year) — owner must set up
- [ ] App icons (1024x1024 + all sizes via Expo)
- [ ] Splash/launch screen
- [ ] Apple Sign-In (required when offering social login)
- [ ] Privacy policy URL
- [ ] App Store screenshots (6.7", 6.5", 5.5" iPhones + iPad)
- [ ] Age rating: 4+
- [ ] App Review Guidelines compliance (not a "thin wrapper")

## Development Phases

### Phase 1: Project Setup & Foundation
- Initialize Expo project with TypeScript
- Configure Expo Router navigation
- Set up theme/colors/typography constants
- Extract all menu data from index.html into typed constants
- Set up Zustand stores (cart, auth, orders)

### Phase 2: Core Screens (No Backend)
- Home screen (hero, store status, quick actions, known-for carousel)
- Menu screen (category tabs, item list, add to cart)
- Sandwich Builder (6-step flow)
- Cart screen (item list, quantities, notes, place order)
- Catering inquiry screen

### Phase 3: Firebase Backend
- Firebase project setup (config)
- Authentication (email/password + Apple Sign-In)
- Firestore schema (users, orders, menu)
- Order submission to Firestore
- Order history queries

### Phase 4: Payments & Notifications
- Stripe integration for checkout
- Apple Pay support
- Push notification setup (expo-notifications)
- Order status notifications

### Phase 5: Profile & Polish
- User profile screen (name, phone, saved addresses)
- Order history screen
- Haptic feedback on interactions
- Loading states, error states, empty states
- Animations (tab transitions, cart badge bounce)

### Phase 6: App Store Prep
- Generate app icons (all sizes)
- Splash screen
- Privacy policy page
- EAS Build configuration (eas.json)
- TestFlight build
- App Store listing metadata

## Agent Usage Guidelines

### When to spawn Task agents (use model: "opus")
- **Parallel component building**: When building independent screens/components that don't
  depend on each other, spawn multiple opus agents to build them concurrently
- **Firebase setup**: Spawn an agent to set up Firebase config while another builds UI
- **Data extraction**: Use an agent to extract and type all menu data from index.html
- **Testing**: Spawn agents to review/test different parts of the app

### When NOT to spawn agents
- Sequential work where output of step N is input to step N+1
- Simple single-file edits
- Git operations

### Agent prompting rules
- Always specify `model: "opus"` for code-writing agents
- Include full file paths in agent prompts
- Include the relevant type definitions so agents produce typed code
- Tell agents exactly which files to create/edit
- Include the theme constants (colors, spacing) so styling is consistent

## Code Style
- TypeScript strict mode
- Functional components only
- Named exports (not default) for components
- Consistent naming: PascalCase components, camelCase functions/variables
- Keep components under 200 lines; extract into sub-components
- Use StyleSheet.create() for all styles (never inline style objects in render)
- Colors always from theme constants, never hardcoded hex values

## Theme Constants
```typescript
export const Colors = {
  deliRed: '#C23B22',
  mustard: '#D4A843',
  forest: '#2D5016',
  warmCream: '#FDF6EC',
  paper: '#F5EDE0',
  iosGray: '#F2F2F7',
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#000000',
  textSecondary: '#8E8E93',
  textTertiary: 'rgba(60,60,67,0.6)',
  separator: 'rgba(60,60,67,0.12)',
  success: '#34C759',
  destructive: '#FF3B30',
};
```

## Git Strategy
- Commit after each meaningful unit of work (each screen, each service, each phase)
- Commit messages: descriptive, prefixed with phase/area
- Push to origin/main after each commit
- Never force-push

## Store Info (Reference)
- **Name**: Lange's Little Store & Delicatessen
- **Address**: 382 King Street, Chappaqua, NY 10514
- **Phone**: (914) 238-3553
- **Fax**: (914) 238-1321
- **Text**: (914) 380-3532
- **Website**: langeslittlestore.com
- **Instagram**: @langes10514
- **Tagline**: Since 1965 · Chappaqua, NY
