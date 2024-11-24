import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import Header from "./Header";
import { Pagination } from "@mui/material";
import TaskDetails from "./TaskDetails";
import { toast } from "react-toastify";

const Tasks = () => {
  const { tasks, loading, addNewTask, updateExistingTask, deleteTaskById } =
    useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  //search
  const filteredTask = tasks.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTask.slice(indexOfFirstTask, indexOfLastTask);

  // Form submission
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (title.trim() !== "" || description.trim() !== "") {
      const task = { title, description, createdAt: new Date() };

      if (isEditing) {
        await updateExistingTask(currentTaskId, task);
      } else {
        await addNewTask(task);
      }
    } else {
      toast.error("Please fill all the inputs");
    }
    resetForm();
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(true);
    setCurrentTaskId(task.id);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  return (
    <div>
      <Header />
      <div className="w-full flex justify-center items-center">
        <div className="w-2/4 mt-6 flex-col gap-10 p-2 max-md:w-11/12">
          <h2 className="flex justify-center items-center text-4xl mb-6 font-semibold">
            Create Task
          </h2>

          <form
            onSubmit={handleAddOrUpdate}
            className="w-full flex justify-start items-center flex-row"
          >
            <div className="w-4/5 flex justify-between items-start gap-3 flex-col">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-black bg-slate-100 border-2 rounded-md p-3 w-11/12
                 border-black placeholder:text-xl placeholder:text-slate-500"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-black bg-slate-100 border-2 rounded-md p-2 w-11/12
                 border-black placeholder:text-xl placeholder:text-slate-500"
              />
            </div>

            <button
              className={
                isEditing
                  ? "text-white font-semibold bg-green-600 text-lg p-[11px] px-4 rounded-xl"
                  : "text-white font-semibold bg-blue-900 text-lg p-[11px] px-4 rounded-xl"
              }
              type="submit"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </form>

          <div className="mt-6 flex justify-cenetr items-cenetr gap-2">
            <h1 className="text-xl">Search: </h1>
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-black bg-slate-100 border-2 rounded-md
               p-1 w-1/2 border-black"
            />
          </div>

  {loading && <p className="text-lg">Loading...</p>}


          {/* Tasks list */}
          <ul className="mt-8 cursor-pointer">
            {currentTasks.map((task) => (
              <TaskDetails
                task={task}
                handleEdit={handleEdit}
                deleteTaskById={deleteTaskById}
              />
            ))}
          </ul>


          <Pagination
            count={Math.ceil(tasks.length / tasksPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="mt-6 flex justify-center items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
