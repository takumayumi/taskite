# taskite

**taskite** is a lightweight, local-first task management web app built for simplicity and productivity. It features a kanban-style board with three stages — **Backlog**, **In Progress**, and **Done** — and supports drag-and-drop, persistent local storage, backup/export/import, and Progressive Web App (PWA) functionality.

Perfect for individuals or small teams, taskite is a fast, privacy-friendly solution with no cloud logins or unnecessary bloat.

## What's New

- Migrated from **Create React App (CRA)** to **Vite + JS-SWC** for faster builds and a smoother development experience.
- Upgraded from **Tailwind CSS 3** to **Tailwind CSS 4** to take advantage of the latest utilities and performance improvements.

## Features

- **Task Management**: Add, edit, delete, and move tasks across the kanban board (Backlog, In Progress, Done).
- **Drag and Drop**: Smooth drag-and-drop interaction between columns using React DnD.
- **Inline Editing**: Edit tasks directly without navigating to separate forms.
- **100% Local & Private**: All data is stored in your browser. No accounts, no syncing, no tracking.
- **Export Options**: Export your task board as a `.json` backup or an `.xlsx` spreadsheet.
- **Backup Import**: Load a previously saved `.json` file to restore your board.
- **PWA Support**: Install on desktop or mobile. Works offline and updates automatically in the background.
- **State Management**: Uses Redux Toolkit to keep task data and UI state consistent and performant.
- **Tested and Reliable**: Unit and component tests cover key functionality and user interactions.

## Technologies Used

- **React**: UI component system and state-based rendering.
- **Redux Toolkit**: Centralized state management.
- **React DnD**: Drag-and-drop functionality.
- **Tailwind CSS 4**: Utility-first styling.
- **Font Awesome**: Clean, scalable icons.
- **React Toastify**: Toast messages for user feedback.
- **SheetJS (xlsx)**: Data export to `.xlsx`.
- **SWC (via Vite)**: Fast JavaScript/TypeScript compilation.
- **Vite**: Ultra-fast dev server and build tool.
- **vite-plugin-pwa**: Adds offline support and PWA install capabilities.
- **Vitest**: Lightweight unit test runner with fast performance.
- **React Testing Library**: Easy and accessible DOM interaction testing.
- **jsdom**: DOM simulation for testing environments.

## Project Status

This project is complete and no longer actively maintained. It remains available for learning, reference, and personal use.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and share it for personal or educational purposes.
