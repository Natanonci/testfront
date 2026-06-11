# AI Agent Workflow: Frontend Blog Admin Dashboard (TypeScript)

## 📌 [System Context & Core Rules]

Read and strictly adhere to the following rules for all subsequent steps:

1. **Tech Stack:** React (Vite), TypeScript, Tailwind CSS, React Router DOM, Zustand (State Management), React Hook Form + Zod (Validation), Lucide React (Icons).
2. **Architecture & Best Practice:**
   - Directory structure: `src/components`, `src/layouts`, `src/pages`, `src/store`, `src/types`, `src/utils`, `src/data`
   - **Strict TypeScript:** Define explicit Interfaces/Types. Do NOT use `any`.
   - **No Hardcoding:** Extract reusable constants to `src/utils/constants.ts`.
3. **CRITICAL UI & ASSET RULES (ABSOLUTELY DO NOT VIOLATE):**
   - **NEVER Remove Outer Wrappers:** When modifying UI or fixing styles, DO NOT remove or replace the outermost container `<div>` or wrapper. Doing so will break the layout positioning and alignment.
   - **Exact Image Paths:** If you rename files or reference image assets, ensure the paths are 100% correct so the images render properly. For mock data, use reliable placeholder URLs (e.g., `https://placehold.co/600x400`).
4. **Phase Strategy:** Focus on 100% Core Functionality and stable structure first. Advanced UI beautification will be done later.

---

## 🚀 [Step 1: Project Structure & Core Layouts]

**Task:**

1. Create directories in `src/`: `components`, `layouts`, `pages`, `store`, `types`, `utils`, `data`.
2. Create `src/types/blog.ts` with explicit TypeScript interfaces (`Blog`, `BlogStatus` enum).
3. Create `src/layouts/MainLayout.tsx` (Sidebar + Header layout) and `src/layouts/AuthLayout.tsx`.
4. Initialize basic React Router in `src/App.tsx` using `MainLayout`.
   **Constraint:** Maintain all structural wrappers in Layouts. Do not break CSS positioning.

---

## 🚀 [Step 2: Mock Data & Zustand Store]

**Task:**

1. Create `src/data/mockBlogs.ts` with at least 5 mock items matching the `Blog` interface. Ensure `coverImage` uses a valid placeholder URL.
2. Create `src/store/useBlogStore.ts` using Zustand.
3. Implement standard Actions: `addBlog`, `updateBlog`, `deleteBlog`, `toggleStatus`. Initialize the state with data from `mockBlogs.ts`.

---

## 🚀 [Step 3: Blog List Table & Filters]

**Task:**

1. Create `src/pages/BlogListPage.tsx`.
2. Fetch `blogs` from Zustand store and display them in a well-structured Table.
3. Add a Search Input (by title) and a Status Filter Dropdown (All, Public, Unpublic) above the table.
4. Implement real-time filtering logic connecting the UI to the displayed table data.

---

## 🚀 [Step 4: CRUD Forms & Validation]

**Task:**

1. Create validation schemas in `src/utils/validations.ts` using Zod (Title is required & > 5 chars, Content is required).
2. Create `src/pages/BlogFormPage.tsx` using `react-hook-form` and `@hookform/resolvers/zod`. Handle both Create and Edit modes in this file.
3. On successful form submission, trigger the respective Zustand action and redirect to the List page.
4. Add a Delete button to the table rows in `BlogListPage.tsx`. Use `window.confirm()` before executing the delete action.

---

## 🚀 [Step 5: Routing Integration & Code Polish]

**Task:**

1. Finalize routes in `src/App.tsx`: `/` for List, `/blog/new` for Create, `/blog/edit/:id` for Edit.
2. Connect "Add New" and "Edit" buttons to their respective routes.
3. Review all code: Ensure no `any` types, check all import paths, and guarantee no outer UI wrappers were accidentally removed.
