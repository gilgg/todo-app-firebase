import React from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";

const Todos = () => {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <div className="todos">
      {todos &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            desc={todo.desc}
            isCompleted={todo.isCompleted}
          />
        ))}
    </div>
  );
};

export default Todos;
