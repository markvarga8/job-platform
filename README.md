# 🤩 Kibit Job Advertisement Platform

This is a Nuxt 3 project built as a **job advertisement platform** for the Kibit Home Assignment.

It includes:

- ✅ Job posting and dashboard
- 🔍 Job search and detail pages
- 🔐 Mock authentication with example users
- 🦪 Type-safe validation with Zod
- 🎨 Tailwind CSS for styling
- ⚙️ ESLint + Prettier for consistent code

---

## 📦 Stack

- [Nuxt 3](https://nuxt.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [Headless UI](https://headlessui.com/) & [Heroicons](https://heroicons.com/) (optional UI)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

---

## 🚀 Setup

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm dev
```

---

## 🛠️ Scripts

| Command        | Description                |
| -------------- | -------------------------- |
| `pnpm dev`     | Start development server   |
| `pnpm build`   | Build for production       |
| `pnpm preview` | Preview production build   |
| `pnpm lint`    | Run ESLint                 |
| `pnpm format`  | Format code using Prettier |

---

## 🥪 Example Users

Use these predefined credentials to test login:

| Role           | Email                  | Password      |
| -------------- | ---------------------- | ------------- |
| Job Advertiser | `employer@example.com` | `password123` |
| Job Seeker     | `seeker@example.com`   | `password123` |

> These are mocked in `localStorage` and validated with Zod.

---

## 🧰 Notes

- No backend — all data is stored in `localStorage` or in-memory.
- You can safely refresh the browser; data will persist between sessions for logged-in users.
- The project follows Vue/Nuxt best practices and is fully mobile responsive.

---

## 🔍 Search Functionality

The job search includes:

- Filterable search bar
- Detail view with job application option

---

## 📄 Assignment Compliance

This project fulfills the requirements defined in the Kibit Home Assignment:

- ✅ Landing page for unauthenticated users
- ✅ Job posting form and dashboard with edit/delete
- ✅ Search + detail view + application option
- ✅ Mock API layer with sample users
- ✅ Vue 3 best practices via Nuxt 3

