import React, { Fragment } from "react";
import "./Container.scss";
import "../../sass/common.scss";
import { useSelector } from "react-redux";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import ContainerHeader from "./ContainerHeader";

const Container = () => {
  const darkMode = useSelector((state) => state.todo.darkMode);

  return (
    <Fragment>
      <ContainerHeader />

      <div className={`todos-container ${darkMode ? "dark" : ""}`}>
        <h1 className="todos-container-title">
          What are your plans for today?
        </h1>
        <TodoForm type="add" />
        <TodosList />
      </div>
    </Fragment>
  );
};

export default Container;
