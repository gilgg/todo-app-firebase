import React from "react";
import "./DarkModeSwitch.scss";
import { useDispatch } from "react-redux";
import { todoActions } from "../../store/todoSlice";

const DarkModeSwitch = () => {
  const dispatch = useDispatch();
  
  const toggle = () => {
    dispatch(todoActions.toggleDarkMode());
  };

  return (
    <div className="switch-container">
      <p className="switch-title">Dark Mode</p>
      <label className="switch">
        <input type="checkbox" onChange={() => toggle()} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkModeSwitch;
