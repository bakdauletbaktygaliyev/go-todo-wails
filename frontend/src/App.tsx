import { useEffect, useState } from "react";
import {
  GetAllTasks,
  AddTask,
  DeleteTask,
  ToggleTaskCompletion,
} from "../wailsjs/go/main/App";
import "./App.css";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteTask(id);
        loadTasks();
        Swal.fire("Deleted!", "The task has been removed.", "success");
      }
    });
  };
  // const deleteTask = async (id: number) => {
  //   await DeleteTask(id);
  //   loadTasks();
  // };

  const toggleTask = async (id: number) => {
    await ToggleTaskCompletion(id);
    loadTasks();
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="task-inputs">
        <input
          type="text"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item priority-${task.priority.toLowerCase()}`}
          >
            <span className={`task-title ${task.done ? "completed" : ""}`}>
              {task.title} - <strong>{task.priority}</strong> (Due:{" "}
              {task.dueDate})
            </span>
            <div className="task-actions">
              <button
                className="toggle-btn"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "Undo" : "Done"}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;