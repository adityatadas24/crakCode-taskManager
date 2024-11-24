import React, { createContext, useState, useContext, useEffect } from "react";
import { addTask, getTasks, updateTask, deleteTask } from "../services/TaskServices";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch task
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const allTasks = await getTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addNewTask = async (task) => {
    await addTask(task);
    await fetchTasks();
  };

  // Update task
  const updateExistingTask = async (id, updatedTask) => {
    await updateTask(id, updatedTask);
    await fetchTasks();
  };

  // Delete task
  const deleteTaskById = async (id) => {
    await deleteTask(id);
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        addNewTask,
        updateExistingTask,
        deleteTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
