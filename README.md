# 🤝 Job Platform

This is a Nuxt 3 project created as part of the **Kibit Home Assignment**. It simulates a simple job advertisement platform, enabling users to post, manage, search, and apply for job offers with mock authentication.

**🌐 Live Demo:** [https://kibit-job-platform.vercel.app](https://kibit-job-platform.vercel.app)

---

## 📦 Stack

- [Nuxt 3](https://nuxt.com) – Vue 3 framework with SSR
- [TypeScript](https://www.typescriptlang.org/) – static typing
- [Tailwind CSS](https://tailwindcss.com/) – utility-first styling
- [Nuxt UI](https://ui.nuxt.com/) – official component library
- [Zod](https://zod.dev/) – schema-based form validation
- [Pinia](https://pinia.vuejs.org/) – state management with persistence
- [Vitest](https://vitest.dev/) – unit testing framework
- [Vue Test Utils](https://test-utils.vuejs.org/) – component test helpers
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) – linting and formatting
- [Vercel](https://vercel.com/) – production deployment

---

## ✨ Features

### 👤 Authentication

- Mock login using predefined demo users
- Route protection based on roles
- Auth state managed with Pinia and persisted to localStorage

### 🔍 Job Search (Seeker role)

- Browse all job listings
- Filter jobs using search (with debounce)
- View job details and apply
- Prevent duplicate applications

### 📬 Job Management (Employer role)

- Post new job offers via modal
- Edit/delete your own jobs
- View all posted jobs in your dashboard

### 📝 Applications

- Seeker users can apply to jobs
- Application state is stored in localStorage
- Applied jobs visually marked

---

## 👥 Roles & Permissions

### 🟢 Job Seeker

- Can search and view all jobs
- Can apply to jobs (once per job)
- Cannot access the dashboard
- Redirected to `/jobs` after login

### 🔵 Employer

- Can post, edit, delete jobs
- Has access to the `/dashboard` to manage job listings
- Can view all jobs (read-only)
- Cannot apply to jobs

All role-based access is enforced via Nuxt route middleware.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd kibit-job-platform
```

### 2. Install dependencies (pnpm preferred)

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the app.

---

## 🔑 Demo Accounts

| Role       | Email                                                | Password    |
| ---------- | ---------------------------------------------------- | ----------- |
| Employer   | [employer@example.com](mailto\:employer@example.com) | password123 |
| Job Seeker | [seeker@example.com](mailto\:seeker@example.com)     | password123 |

You can test the full app with these predefined users. No registration required.

---

## 📂 Project Structure Overview

```
├── components/              # UI components & job modal
├── composables/             # Custom logic (useAuth, etc.)
├── layouts/                 # App layout
├── pages/                   # Route-based views
│   ├── index.vue            # Landing page
│   ├── login.vue            # Login page
│   ├── dashboard.vue        # Employer dashboard
│   ├── jobs/                # Search + Detail
│   │   ├── index.vue        # Job list with search
│   │   └── [id].vue         # Job detail & apply
├── stores/                  # Pinia stores (auth, jobs)
├── models/                  # Zod schemas and types
```

---

## 🧱 Architecture Summary

- Authentication via composable (`useAuth`) and `authStore`
- User and job data is stored in localStorage
- Forms are validated with Zod schemas
- Pinia manages auth and job state globally
- Role-based navigation guard with Nuxt middleware
- Fully responsive design with Nuxt UI components

---

## 🧪 Testing

You can run unit tests using [Vitest](https://vitest.dev/):

```bash
pnpm vitest
```

Unit test example included for `JobCreateModal.vue`

---

## ✅ Assignment Compliance Checklist

* [x] Landing page for unauthenticated users
* [x] Login with mocked users
* [x] Dashboard for job advertisers
* [x] Job posting (create/edit/delete)
* [x] Search + detail view + application option
* [x] Mock API layer using localStorage
* [x] Nuxt 3 with Tailwind CSS and TypeScript
* [x] Fully responsive
* [x] Role-based navigation guard
* [x] Extra: Pinia + composables + Zod validation + testing

---

## 👨‍💻 Author

Built by Márk Varga for the Kibit Home Assignment.

