# taskite

taskite is a simple and efficient task management web application built with Vite, Tailwind CSS, and Redux. It helps users organize their work using an interactive board with three task stages: Backlog, In Progress, and Done.

taskite addresses the need for simple yet effective task tracking, providing a user-friendly interface, essential productivity features, and local data persistence. Users can save their tasks as a .json backup file, load previous backups, or export their tasks to an Excel .xlsx file for reporting or sharing.

taskite is ideal for individuals or small teams seeking a minimalist alternative to more complex project management tools.

## What's New

- Migrated from **Create React App (CRA)** to **Vite + JS-SWC** for faster builds and better development experience.
- Upgraded from **Tailwind CSS v3** to **Tailwind CSS v4** for access to the latest utility features and performance improvements.

## Features

- **Add Tasks**: Easily add new tasks to the Backlog, In Progress, or Done lists.
- **Update Task Content**: Edit the content of existing tasks.
- **Change Task Status**: Update task status either manually using a dropdown or by dragging and dropping tasks between lists.
- **Delete Tasks**: Remove tasks from the lists.
- **Data Persistence**: All tasks are saved in local storage to ensure data is retained even after refreshing the page.
- **Save as Backup**: Exports the current board state as a .json backup file.
- **Export to Excel**: Enables exporting the board to an .xlsx file using the SheetJS (XLSX) package.
- **Restore from Backup**: Allows importing backup .json files to load board data.

## Technologies Used

- **Create React App**: For bootstrapping the project.
- **Font Awesome**: For icons.
- **React**: For building the user interface.
- **React DnD**: For implementing drag-and-drop functionality.
- **Redux**: For state management.
- **SheetJS (XLSX)**: For handling Excel file generation.
- **Tailwind CSS v4.0**: For styling the application.
- **Toastify**: To display status notifications.

## Getting Started

Make sure you have Node.js and npm installed on your system. You can download them from [Node.js official website](https://nodejs.org/).

1. Navigate to the project directory:
    ```
    cd taskite
    ```

3. Install dependencies:
    ```
    npm install
    ```

3. Start the development server:
    ```
    npm start
    ```
