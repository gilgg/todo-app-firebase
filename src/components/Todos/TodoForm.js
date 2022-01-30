import React, { useState, useRef } from "react";
import "./TodoForm.scss";
import "../../sass/common.scss";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todoSlice";
import Btn from "../UI/Btn";
import FirebaseFirestoreService from "../../firebase/firebaseFirestoreService";

const TodoForm = ({ type, id, show = false, setShow, defVal = "" }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.todo.darkMode);
  const userId = useSelector((state) => state.todo.userId);
  const todoRef = useRef();
  const [todoVal, setTodoVal] = useState(defVal);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let todos;
    const todo = todoRef.current.value;

    if (!todo) {
      // not accepting empty strings as todos
      return;
    }

    if (type === "add") {
      setTodoVal(""); // clear the input when we add a new todo
    } else {
      setShow(false); // hide update form after its button is clicked
    }

    if (type === "add") {
      todos = await FirebaseFirestoreService.createTodo({
        userId,
        desc: todo,
        isCompleted: false,
        creationDate: Date.now(),
      });
    } else if (type === "update") {
      todos = await FirebaseFirestoreService.updateTodo(userId, id, {
        userId,
        desc: todo,
      });
    }

    dispatch(todoActions.setTodos(todos));
  };

  return (
    <form
      className={`todo-form ${type} ${darkMode ? "dark" : ""} ${
        show ? "active" : ""
      }`}
      onSubmit={onSubmitHandler}
    >
      <input
        type="text"
        placeholder={type === "add" ? "Add a todo" : "Update"}
        value={todoVal}
        onChange={(e) => setTodoVal(e.target.value)}
        ref={todoRef}
        className={`todo-form-input ${darkMode ? "dark" : ""}`}
      />
      <Btn text={type === "add" ? "Add Todo" : "Update"} />
    </form>
  );
};

export default TodoForm;
