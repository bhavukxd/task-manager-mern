import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null); // State to hold task being edited

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Task Manager</h1>
        {/* Pass currentTask and setCurrentTask to TaskForm */}
        <TaskForm 
          fetchTasks={fetchTasks} 
          currentTask={currentTask} 
          setCurrentTask={setCurrentTask} 
        />
        {/* Pass setCurrentTask to TaskList for Edit functionality */}
        <TaskList 
          tasks={tasks} 
          fetchTasks={fetchTasks} 
          setCurrentTask={setCurrentTask} 
        />
      </div>
    </div>
  );
};

export default App;