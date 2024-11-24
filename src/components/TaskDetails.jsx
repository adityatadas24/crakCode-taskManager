import React from "react";

const TaskDetails = ({ task, handleEdit, deleteTaskById }) => {
  return (
    <div>
      <li
        key={task.id}
        className="flex justify-between items-start flex-row text-lg
         bg-slate-300 p-3 rounded-lg hover:bg-slate-400 mb-4"
      >
        <div>
        <h3 className="ml-2"> Title: {task.title}</h3>
        <p className="ml-2">Desc: <span className="text-sm">{task.description}</span></p>
        </div>
       
        <div>
          <button
            className="mr-2 bg-purple-800 p-1 px-3 text-sm text-white
             font-medium rounded-lg"
            onClick={() => handleEdit(task)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 p-1 px-3 text-white text-sm font-medium
             rounded-lg"
            onClick={() => deleteTaskById(task.id)}
          >
            Delete
          </button>
        </div>
      </li>
    </div>
  );
};

export default TaskDetails;
