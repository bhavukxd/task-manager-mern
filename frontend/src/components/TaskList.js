import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex justify-between items-center p-4 bg-gray-50 rounded shadow"
        >
          <div>
            <h3 className="font-bold text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            aria-label={`Delete task: ${task.title}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
