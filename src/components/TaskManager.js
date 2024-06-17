import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskList from "./TaskList";

const statuses = ["Backlog", "In Progress", "Done"];

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : {};
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (status) => {
    const taskTitle = prompt("Enter task title:");

    if (taskTitle) {
      const newTask = {
        id: Date.now().toString(),
        content: taskTitle,
        status,
      };

      setTasks((prevTasks) => ({
        ...prevTasks,
        [status]: [...(prevTasks[status] || []), newTask],
      }));
    }
  };

  const handleDelete = (taskId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (shouldDelete) {
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        Object.keys(newTasks).forEach((status) => {
          newTasks[status] = newTasks[status].filter(
            (task) => task.id !== taskId
          );
        });

        return newTasks;
      });
    }
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      const taskToUpdate = Object.values(prevTasks)
        .flat()
        .find((task) => task.id === taskId);

      const updatedTask = { ...taskToUpdate, status: newStatus };

      const updatedTasks = Object.keys(prevTasks).reduce((acc, status) => {
        acc[status] = prevTasks[status].filter((task) => task.id !== taskId);
        return acc;
      }, {});

      updatedTasks[newStatus] = [
        ...(updatedTasks[newStatus] || []),
        updatedTask,
      ];

      return updatedTasks;
    });
  };

  return (
    <div className="py-20 px-10 lg:px-20 h-full flex flex-col">
      {/* Title */}
      <h1 className="text-center text-5xl font-bold underline bg-transparent mb-20">
        taskite
      </h1>
      {/* Task List */}
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:flex-grow">
          {statuses.map((status) => (
            <TaskList
              key={status}
              tasks={tasks[status] || []}
              status={status}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default TaskManager;
