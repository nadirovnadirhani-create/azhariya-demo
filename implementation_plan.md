# Redesigning All Remaining Azharia App Pages

Following the homepage overhaul, we will redesign all remaining internal pages to establish a unified, premium visual identity for the entire app. The pages will feature glassmorphic cards, gold/emerald gradients, radial glow meshes, and custom interactive components.

## Proposed Changes

### Components & Pages

---

#### [MODIFY] [auth/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/auth/page.tsx)
- **Glassmorphic Login Card**: Upgrade the auth wrapper card with a premium glass card, radial background glow, and gold outline.
- **Premium Inputs**: Style inputs with custom border states, custom focus rings, and soft gold/emerald focus highlights.
- **Interactive Transitions**: Smooth transition when switching between Login and Registration states.
- **Social Login Button**: Premium Google button using transparent-hover borders.

---

#### [MODIFY] [dashboard/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/dashboard/page.tsx)
- **Stats Card Layout**: Upgrade stats cards using interactive hover scaling and soft background inner shadows.
- **Welcome Panel**: Overhaul using `hero-mesh`, custom badges, and a glowing progress ring.
- **3D Isometric Grid**: Refine the perspective grid with subtle depth effects, customized letter badges, and clean lock states for premium lessons.

---

#### [MODIFY] [lessons/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/lessons/page.tsx)
- **Unified Catalog**: Present a vertical timeline using premium glass cards.
- **Badge Indicators**: Replace generic completion indicators with gold/emerald progress badges.
- **Start CTA**: Style starting CTA buttons with a sleek hover pulse and micro-shadows.

---

#### [MODIFY] [profile/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/profile/page.tsx)
- **Profile Header**: Redesign the user avatar panel with a gold glowing border and dark mode details.
- **Menu Settings**: Enhance personal data, security, notifications, and app settings lists with animated chevron states on hover.
- **Log out Button**: Redesign with red outline highlights.

---

#### [MODIFY] [onboarding/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/onboarding/page.tsx)
- **Progressive Steps**: Glowing step indicators that transition smoothly.
- **Interactive Selections**: High-fidelity options for language selection, learning goals (using custom icons), and theme selection.
- **Navigation Controls**: Sleek previous/next controls with slide-in animations.

---

#### [MODIFY] [lesson/[id]/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/lesson/[id]/page.tsx)
- **Fixed Progress Capsule**: Premium floating header capsule with a golden loading progress bar.
- **Arabic Character Cards**: Styled letters and words using large, bold typography with a gold pulsed underline.
- **Audio Highlights**: Dynamic active pronunciation highlights.
- **Handwriting practice integration**: Re-style the canvas card.

---

#### [MODIFY] [quiz/[id]/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/quiz/[id]/page.tsx)
- **Top Bar**: Glass header indicator.
- **Lesson Badge & Title**: Premium title display.

---

#### [MODIFY] [QuizModule.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/features/quiz/QuizModule.tsx)
- **Interactive Quiz Options**: Options styled with glowing selections (emerald borders for correct, rose for incorrect).
- **Audio Question Player**: Overlaid pulsing ring animations when playing sound.
- **Finished Screen**: Premium award display with gold confetti aesthetics, perfect score status, and next-lesson CTA.

---

#### [MODIFY] [handwriting/[id]/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/handwriting/[id]/page.tsx)
- **Practice Arena**: Premium full-canvas workspace container.
- **Grid Overlay**: Style drawing guides with a light watermarked pattern.

---

#### [MODIFY] [wallet/page.tsx](file:///c:/Users/Nadirhan/Documents/Azharia/azharia-next/src/app/wallet/page.tsx)
- **Pricing Cards**: Redesign "Premium Access" card with popular flags, checkout buttons, and safety indicators.
- **Simulated Checkout Status**: Clear success screen with floating diamond icons.

## Verification Plan

### Automated Tests
- Run `npm run build` to verify there are no compilation or TypeScript errors.

### Manual Verification
- Check all routes: `/auth`, `/dashboard`, `/lessons`, `/profile`, `/onboarding`, `/lesson/[id]`, `/quiz/[id]`, `/handwriting/[id]`, `/wallet`.
- Confirm responsiveness on mobile and desktop layout views.
