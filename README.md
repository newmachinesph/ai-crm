# OutreachAI

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

OutreachAI is a front-end prototype of an AI-powered outreach and CRM dashboard. It covers leads, a sales pipeline, email, SMS/voice, automations, scheduling, an AI writer, billing, settings and an admin view. All data is mock data in `src/lib/mock-data.ts`; there is no backend, authentication or real integration.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Structure

- `src/app/` - Next.js App Router pages (dashboard, leads, pipeline, email, sms-voice, automations, scheduling, ai-writer, billing, settings, admin, login, register)
- `src/components/` - sidebar, dashboard layout, stat card
- `src/lib/mock-data.ts` - sample data (fictional)

## License

MIT, see [LICENSE](LICENSE).
