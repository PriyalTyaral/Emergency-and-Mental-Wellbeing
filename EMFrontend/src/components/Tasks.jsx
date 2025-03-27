import  { useState, useEffect } from "react";
import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add or Update Task
  const handleAddTask = () => {
    if (!task || !dueDate) return alert("Enter task and due date!");

    const newTask = { task, priority, dueDate };

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTask("");
    setPriority("High");
    setDueDate("");
  };

  // Edit Task
  const handleEdit = (index) => {
    setTask(tasks[index].task);
    setPriority(tasks[index].priority);
    setDueDate(tasks[index].dueDate);
    setEditingIndex(index);
  };

  // Delete Task
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="task-container">
      <h2>Task Dashboard</h2>
      
      <div className="task-input">
        <input 
          type="text" 
          placeholder="Enter task" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        <button onClick={handleAddTask}>
          {editingIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="task-list">
        {["High", "Medium", "Low"].map((level) => (
          <div key={level} className="task-column">
            <h3>{level} Priority Tasks</h3>
            {tasks
              .filter((t) => t.priority === level)
              .map((t, index) => (
                <div key={index} className="task-card">
                  <p>{t.task}</p>
                  <p>📅 {t.dueDate}</p>
                  <button onClick={() => handleEdit(index)}>✏ Edit</button>
                  <button onClick={() => handleDelete(index)}>🗑 Delete</button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
