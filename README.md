# taskite

taskite is a simple task management application built with Create React App, Tailwind CSS, and Redux. It allows users to manage tasks with different statuses (Backlog, In Progress, Done) and provides features such as adding, updating, deleting tasks, and drag-and-drop functionality.

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
- **Tailwind CSS**: For styling the application.
- **Toastify**: To display status notifications.

## Getting Started

Make sure you have Node.js and npm installed on your system. You can download them from [Node.js official website](https://nodejs.org/).

1. Navigate to the project directory:

   ```bash
   cd taskite
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```
