# 🤝 Job Platform

This is a Nuxt 3 project created as part of the **Kibit Home Assignment**. It simulates a simple job advertisement platform, enabling users to post, manage, search, and apply for job offers with mock authentication.

---

## 📦 Stack

* [Nuxt 3](https://nuxt.com) – Vue 3 framework
* [TypeScript](https://www.typescriptlang.org/) – static typing
* [Tailwind CSS](https://tailwindcss.com/) + [Nuxt UI](https://ui.nuxt.com/) – modern UI
* [Zod](https://zod.dev/) – form validation
* [Pinia](https://pinia.vuejs.org/) – state management
* [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) – code style
* \[localStorage] – persistent client-side storage

---

## ✨ Features

### 👤 Authentication

* Mock login using predefined demo users
* Route protection based on roles
* Auth state managed with Pinia and persisted to localStorage

### 📬 Job Management (Employer)

* Post new job offers via modal
* Edit/delete your own jobs
* View your jobs in dashboard

### 🔍 Job Search (Seeker)

* Browse all job listings
* Filter with debounced search input
* View job details and apply
* Prevent multiple applications for same job

### 📝 Applications

* Seeker users can apply to jobs
* Application state is stored in the user object (locally)

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

| Role       | Email                                               | Password    |
| ---------- | --------------------------------------------------- | ----------- |
| Employer   | [employer@example.com](mailto:employer@example.com) | password123 |
| Job Seeker | [seeker@example.com](mailto:seeker@example.com)     | password123 |

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
├── types/                   # Type definitions
```

---

## 🧱 Architecture Summary

* Authentication via composable (`useAuth`) and `authStore`
* User and job data is stored in localStorage
* Forms are validated with Zod schemas
* Pinia manages auth and job state globally
* Role-based navigation guard with Nuxt middleware
* Mobile-first and fully responsive design with Nuxt UI

---

## 🧪 Testing

You can run unit tests using [Vitest](https://vitest.dev/):

```bash
pnpm vitest
```

Unit test example provided for `JobCreateModal.vue`

---

## 📸 Screenshots

Add screenshots to `public/` and reference here:

```md
![Dashboard](./public/dashboard.png)
```

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
