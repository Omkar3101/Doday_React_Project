// Todo.tsx

import React from "react";
import "./index.css";
import { type Task } from "../../App";
import Checkbox from "../Checkbox/Checkbox";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";

interface TodoProps {
  todos: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, currentText: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        // div ke bajaye li ka istemal karein
        <li key={todo.id} className="todo">
          <Checkbox
            completed={todo.completed}
            onClick={() => onToggle(todo.id)}
          />
          {/* Alag se li ke bajaye span ka istemal karein */}
          <span className="todo-text">{todo.text}</span>

          {/* Buttons ko ek container me daalna responsive design ke liye accha hai */}
          <div className="todo-actions">
            <EditButton onclick={() => onEdit(todo.id, todo.text)} />
            <DeleteButton onclick={() => onDelete(todo.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Todo;