import { useEffect, useState } from "react";

import {
  GetAllTasks,
  AddTask,
  DeleteTask,
  ToggleTaskCompletion,
} from "../wailsjs/go/main/App";

import "./App.css";

interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: string;
  dueDate: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result: Task[] = await GetAllTasks();
    setTasks(result);
  };

  const addTask = async () => {
    if (!title || !dueDate) return;
    await AddTask(title, priority, dueDate);
    setTitle("");
    setDueDate("");
    loadTasks();
  };

  const deleteTask = async (id: number) => {
    await DeleteTask(id);
    loadTasks();
  };

  const toggleTask = async (id: number) => {
    await ToggleTaskCompletion(id);
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between p-2 border-b">
              <span
                className={`cursor-pointer ${task.done ? "line-through" : ""}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.title} - {task.priority} (Due: {task.dueDate})
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
