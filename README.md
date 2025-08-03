# taskite

**taskite** is a lightweight, local-first task management web app designed for simplicity and productivity. It uses a kanban-style interface with three stages — **Backlog**, **In Progress**, and **Done** — and supports features like drag-and-drop, persistent local storage, file backup/export/import, and Progressive Web App (PWA) capabilities.

It's ideal for individuals or small teams who need a fast, privacy-friendly task tracker without the overhead of cloud logins or bloated features.

## What's New

- Migrated from **Create React App (CRA)** to **Vite + JS-SWC** for faster builds and better development experience.
- Upgraded from **Tailwind CSS 3** to **Tailwind CSS 4** for access to the latest utility features and performance improvements.

## Features

- **Task Management**: Add, edit, delete, and move tasks between Backlog, In Progress, and Done.
- **Drag and Drop**: Easily move tasks between lists using smooth drag-and-drop.
- **Inline Editing**: Edit task content directly without needing a separate form.
- **100% Local & Private**: All data stays in your browser, ensuring offline access and persistence across sessions.
- **Export Options**: Save your task board as a `.json` backup or export it to `.xlsx`.
- **Backup Import**: Load a `.json` file to restore a previously saved task board.
- **PWA Support**: Install it on your desktop or phone, use it offline, and get background updates automatically.
- **State Management**: Centralized task state is handled for consistency and performance.
- **Tested and Reliable**: Unit and component tests cover core functionality and UI behavior.

## Technologies Used

- **Font Awesome**: Adds clean, vector icons to UI components like buttons.
- **jsdom**: Simulates a browser-like environment in Node.js for DOM-based testing.
- **React**: For building components, managing interaction, and state-based rendering.
- **React DnD**: Enables task drag-and-drop between lists, including drop targets and preview behaviors.
- **React Testing Library**: Simplifies testing user interactions and DOM behavior with a React-friendly API.
- **React Toastify**: Provides non-blocking feedback like success/error toasts.
- **Redux Toolkit**: Manages task data, selected task, and UI state. Reduces boilerplate vs plain Redux.
- **SheetJS (xlsx)**: Converts task data to `.xlsx` for easy report export.
- **SWC (via Vite)**: A super-fast JS/TS compiler replacing Babel, used for fast transpilation.
- **Tailwind CSS 4**: For rapidly styling components with minimal custom CSS.
- **Vite**: Lightning-fast dev server and build tool with instant HMR and optimized bundling.
- **vite-plugin-pwa**: Adds PWA support: offline caching, app install, manifest generation.
- **Vitest**: Fast, Vite-native unit test runner with Jest-like syntax.
