import React, { Fragment, useState } from "react";
import "./Todo.scss";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../../store/todoSlice";
import { BiEdit } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import TodoForm from "./TodoForm";
import FirebaseFirestoreService from "../../firebase/firebaseFirestoreService";

const Todo = ({ id, desc, isCompleted }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.todo.darkMode);
  const userId = useSelector((state) => state.todo.userId);
  const [isEdit, setIsEdit] = useState(false);
  const [isCompletedVal, setIsCompletedVal] = useState(isCompleted);

  const onEditIsCompletedHandler = async () => {
    setIsCompletedVal((prevState) => !prevState);

    const todos = await FirebaseFirestoreService.updateTodo(userId, id, {
      isCompleted: !isCompletedVal,
    });
    dispatch(todoActions.setTodos(todos));
  };

  const onDeleteHandler = async () => {
    const todos = await FirebaseFirestoreService.deleteTodo(userId, id);
    dispatch(todoActions.setTodos(todos));
  };

  return (
    <Fragment>
      <div
        className={`todo ${isCompletedVal ? "completed" : ""} ${
          darkMode ? "dark" : ""
        }`}
      >
        <p className="todo-desc" onClick={onEditIsCompletedHandler}>
          {desc}
        </p>
        <div className="todo-icons">
          <span
            className="todo-icons-edit"
            onClick={() => setIsEdit((prevState) => !prevState)}
          >
            <BiEdit />
          </span>
          <span className="todo-icons-delete" onClick={onDeleteHandler}>
            <FiTrash2 />
          </span>
        </div>
      </div>

      <TodoForm
        type="update"
        id={id}
        show={isEdit}
        setShow={setIsEdit}
        defVal={desc}
      />
    </Fragment>
  );
};

export default Todo;
