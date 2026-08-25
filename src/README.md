# Mental Health Anonymous

Send educational mental-health resources to someone anonymously by email or SMS.
The recipient needs no account and no app — they open a secure web link.

> **Platform note:** Magic Patterns generates React (web) + TypeScript. This
> project is the complete product — design system, screens, flows, validation,
> state and API abstractions — implemented as a mobile-sized React app rendered
> in a device frame. Every screen, token and hook maps 1:1 to the intended
> Expo / React Native build.

## Running

```bash
npm install
npm run dev
```

## Sender flow

Splash → Onboarding (first launch only) → Home → Topic detail → Recipient →
Optional message → Review → Sending → Success. Secondary tabs: History, Settings.

## Structure

```
components/
  layout/DeviceFrame.tsx      Phone viewport (web only)
  navigation/BottomNav.tsx
  ui/                         AppButton, AppInput, AppCard, AppScreen,
                              AppHeader, PrivacyNotice, States
  topic/                      TopicCard, TopicIcon
  send/                       DeliveryMethodSelector
features/
  topics/hooks/useTopics.ts   useTopics(), useTopic(id)
  sharing/hooks/              useCreateAnonymousShare()
services/api/                 client.ts (mock transport), endpoints.ts
store/                        useShareStore (send flow), useAppStore (persisted)
data/                         topics, country codes
utils/                        mask, format, validators (Zod)
pages/                        one file per screen
types/                        shared domain types
```

## API contract

```
GET  /topics
GET  /topics/:id
POST /anonymous-shares       { topicId, deliveryMethod, recipient, message }
GET  /anonymous-shares/:id/status
```

`services/api/client.ts` is the only mock. Replace its three functions with real
HTTP calls (Axios in the native build, configured from `EXPO_PUBLIC_API_URL`) and
nothing in the UI changes. Secure share tokens are created server-side only.

To exercise the failure path, use a recipient containing `fail`.

## Privacy

- Sender identity is never attached to a share request.
- Recipient values are masked (`j***@gmail.com`) everywhere they are displayed.
- Send-flow state is cleared immediately after a successful submission.
- History is masked and stored locally; it can be cleared from Settings.

## Design tokens

Defined in `tailwind.config.js`: warm canvas `#F5F6F2`, white surfaces, deep teal
primary `#2E5E52`, sage/lavender/sky/sand/blush topic tones, muted `#A9524A` for
errors only. Typography is Plus Jakarta Sans on a fixed display→caption scale.
