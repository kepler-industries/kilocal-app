# Kilocal

> Loggue moins, apprends plus. 🥬

Kilocal is a Duolingo-inspired calorie tracking app — chunky tiles, daily quests, streaks, and badges. Built with Expo + React Native + TypeScript.

## Stack

- **Expo SDK 54** + **Expo Router** (file-based routing)
- **TypeScript** (strict mode)
- **react-native-svg** for vector icons and charts
- **expo-linear-gradient** for hero gradients
- **@expo-google-fonts/nunito** + **@expo-google-fonts/fraunces** for typography
- **react-native-reanimated** for animations

## Getting started

```bash
npm install
npm run ios       # iOS simulator
npm run android   # Android emulator
npm run web       # web preview
```

## Project structure

```
app/                          # Expo Router (file-based)
  _layout.tsx                 # Root: fonts, theme provider, stack
  (tabs)/                     # Tab group with shared header + drawer
    _layout.tsx               # Custom tab bar (5 tabs)
    index.tsx                 # Aujourd'hui (Home)
    calendar.tsx
    insights.tsx
    achievements.tsx
    profile.tsx
  onboarding.tsx              # Modal-presented 4-step onboarding

src/
  theme/
    colors.ts                 # Color palette + accent presets
    ThemeContext.tsx          # Dark mode, accent, density, mascot toggles
  data/
    mock.ts                   # Mock weeks, months, badges, quests, charts
  components/                 # Design-system primitives
    Chunky.tsx                # 3D button (Duolingo-style depth)
    DayPill.tsx               # Day status pill (hit/miss/today/future)
    Card.tsx
    Eyebrow.tsx               # Small caps gray label
    Wordmark.tsx              # Leaf logo + "Kilocal" wordmark
    AppHeader.tsx
    XPBar.tsx
    TabPills.tsx
    Mascot.tsx                # Optional seedling mascot with personalities
    icons/index.tsx           # All inline SVG icons
  screens/
    HomeScreen.tsx
    InsightsScreen.tsx        # SVG weight + deficit charts
    CalendarScreen.tsx
    AchievementsScreen.tsx
    ProfileScreen.tsx
    OnboardingScreen.tsx
    Drawer.tsx                # Slide-in nav drawer
    Celebration.tsx           # Confetti modal
```

## Design system

The visual language follows the chunky / tactile Duolingo school:

- **Primary green** `#4ECB1F` for "hits" and progress
- **Orange** `#FF9416` for energy / XP / misses
- **Blue** `#14C0F5` for CTAs and analytics
- **Red** `#FF4945` for today / urgency
- **Solid color top + darker bottom edge** depth, achieved via stacked Views

Four selectable accent presets (Classique, Agrumes, Myrtille, Matcha) live in `src/theme/colors.ts`.

## Acknowledgements

Visual design from a Claude Design handoff bundle. UI rebuilt for native via React Native + react-native-svg.
