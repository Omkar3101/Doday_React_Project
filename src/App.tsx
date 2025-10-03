// App.tsx

import React, { useState, useEffect } from "react";
import Input from "./components/Input/Input";
import AddButton from "./components/Buttons/AddButton";
import Todo from "./components/Todo/Todo";
import "./App.css";
import FilterButton from "./components/Buttons/FilterButton";
import Progress from "./assets/Progress.png";
import Complete from "./assets/checked.png";
import All from "./assets/All.png";
import Profile from "./components/Profile/Profile";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type FilterStatus = "all" | "active" | "completed";

const LOCAL_STORAGE_KEY = "todo-app-tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage", error);
      return [];
    }
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [editTask, setEditTask] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const date = new Date();
  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const options: Intl.DateTimeFormatOptions = { month: 'short' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const monthShort = formatter.format(date);
  const finalFormattedDate = `${day}${ordinalSuffix} ${monthShort}`;

  function handleSubmit() {
    if (inputValue.trim() === "") return;

    if (editTask !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editTask ? { ...task, text: inputValue } : task
        )
      );
      setEditTask(null);
    } else {
      const newTask: Task = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    setInputValue("");
  }

  function handleEditClick(id: number, currentText: string) {
    setEditTask(id);
    setInputValue(currentText);
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    // Is div me koi badlaav nahi hai
    <div className="app">
      <header>
        <h3>{finalFormattedDate}</h3>
        <h1>Doday</h1>
        <Profile />
      </header>
      <div className="input-container">
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="What do you wanna do today?"
        />
        <AddButton onClick={handleSubmit} task={editTask} />
      </div>
      <div className="filter-buttons">
        <FilterButton
          img={All}
          filterName="All"
          onClick={() => setFilter("all")}
          isActive={filter === "all"}
        />
        <FilterButton
          img={Progress}
          filterName="Working"
          onClick={() => setFilter("active")}
          isActive={filter === "active"}
        />
        <FilterButton
          img={Complete}
          filterName="Complete"
          onClick={() => setFilter("completed")}
          isActive={filter === "completed"}
        />
      </div>

      {/* === IMPORTANT CHANGE === */}
      {/* Todo component ko ek container me daalein taaki hum use scrollable bana sakein */}
      <div className="todo-list-container">
        <Todo
          todos={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditClick}
        />
      </div>
    </div>
  );
};

export default App;