import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskList from "./TaskList";
import Prompt from "./Prompt";

const statuses = ["Backlog", "In Progress", "Done"];

const TaskManager = () => {
  const [taskId, setTaskId] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : {};
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (status) => {
    const newTask = {
      id: Date.now().toString(),
      content: "New task",
      created: false,
      status,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: [...(prevTasks[status] || []), newTask],
    }));
  };

  const handleDelete = (taskId) => {
    setShowPrompt(true);
    setTaskId(taskId);
  };

  const handleUpdateContent = (task, content) => {
    if (task) {
      const id = task.id;
      const status = task.status;

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };

        if (updatedTasks[status]) {
          updatedTasks[status] = updatedTasks[status].map((task) =>
            task.id === id ? { ...task, content: content } : task
          );
        }

        return updatedTasks;
      });
    }
  };

  const handleUpdateCreated = (task) => {
    if (task) {
      const id = task.id;
      const status = task.status;

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };

        if (updatedTasks[status]) {
          updatedTasks[status] = updatedTasks[status].map((task) =>
            task.id === id ? { ...task, created: true } : task
          );
        }

        return updatedTasks;
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
    <>
      <div className="pt-16 pb-20 px-5 overflow-y-auto lg:px-10 h-full w-full flex flex-col max-w-screen-xl mx-auto min-w-92.5 min-h-138">
        {/* Title */}
        <div className="relative inline-block mx-auto text-center text-5xl font-light mb-10 font-playwright">
          <h1 className="text-indigo">taskite</h1>
          <span className="absolute -top-0.5 -left-0.5 text-yellow">
            taskite
          </span>
        </div>
        {/* Task List */}
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 flex-1 md:grid-cols-3 gap-5 md:flex-grow overflow-hidden">
            {statuses.map((status) => (
              <TaskList
                key={status}
                tasks={tasks[status] || []}
                status={status}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onUpdateContent={handleUpdateContent}
                onUpdateCreated={handleUpdateCreated}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </DndProvider>
      </div>
      <Prompt
        setShowPrompt={setShowPrompt}
        setTaskId={setTaskId}
        setTasks={setTasks}
        showPrompt={showPrompt}
        taskId={taskId}
      />
    </>
  );
};

export default TaskManager;
