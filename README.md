# 🤝 Job Platform

This Nuxt 3-based application showcases a streamlined job advertisement platform where users can post, manage, browse, and apply for job listings. It's designed to demonstrate role-based functionality, responsive UI, and modern frontend architecture.

**🌐 Live Demo:** [https://mark-job-platform.vercel.app](https://mark-job-platform.vercel.app)

---

## 📦 Tech Stack

- [Nuxt 3](https://nuxt.com) – Vue 3 framework with SSR support  
- [TypeScript](https://www.typescriptlang.org/) – static typing  
- [Tailwind CSS](https://tailwindcss.com/) – utility-first styling  
- [Nuxt UI](https://ui.nuxt.com/) – official UI components  
- [Zod](https://zod.dev/) – schema-based form validation  
- [Pinia](https://pinia.vuejs.org/) – state management with persistence  
- [Vitest](https://vitest.dev/) – unit testing framework  
- [Vue Test Utils](https://test-utils.vuejs.org/) – component test helpers  
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) – linting and formatting  
- [Vercel](https://vercel.com/) – deployment  

---

## ✨ Features

### 👤 Authentication & Access Control

- Mock login using predefined demo users  
- Role-based route protection and redirects  
- Auth state stored in Pinia with localStorage persistence  

### 🔍 Job Search (Applicant role)

- Browse all public job listings  
- Live search with debounce  
- View detailed job information  
- Apply to jobs (only once per listing)  
- Prevent duplicate submissions  

### 📬 Job Management (Employer role)

- Create job listings via modal  
- Edit or delete your own listings  
- Manage all jobs via employer dashboard  

### 📝 Applications

- Applications stored locally per user  
- Applied jobs are visually marked  
- Logic to avoid duplicate submissions  

---

## 👥 User Roles

### 🟢 Job Applicant

- Access to public landing and job pages  
- Can apply to jobs (1 per job)  
- Redirected to `/jobs` after login  
- Cannot access the dashboard  

### 🔵 Employer

- Full access to dashboard and job management  
- Can post, edit, delete jobs  
- Can browse listings (read-only)  
- Cannot apply to jobs  
- Redirected to `/dashboard` after login  

All role-based access is handled via Nuxt route middleware.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd job-platform
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

## 🔑 Test Accounts

| Role      | Email                                                 | Password    |
| --------- | ----------------------------------------------------- | ----------- |
| Employer  | [employer@example.com](mailto:employer@example.com)   | password123 |
| Applicant | [applicant@example.com](mailto:applicant@example.com) | password123 |

No registration required — just login and explore.

---

## 📂 Project Structure

```
├── components/              # UI components & job modal
├── composables/             # Custom logic (useAuth, etc.)
├── layouts/                 # App layout
├── middleware/              # Navigation guards
│   └── auth.global.ts       # Auth & role-based redirect logic
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

## 🧪 Testing

Run unit tests with [Vitest](https://vitest.dev/):

```bash
pnpm vitest
```

Includes an example unit test for `JobCreateModal.vue`.

---

## ✔️ Feature Checklist

- [x] Public landing page and job list  
- [x] Login with role-based redirection  
- [x] Employer dashboard for job management  
- [x] Job creation, editing, and deletion  
- [x] Search, view details, and apply to jobs  
- [x] LocalStorage as a mock data layer  
- [x] Fully responsive layout  
- [x] Form validation with Zod  
- [x] State management with Pinia  
- [x] Unit testing with Vitest