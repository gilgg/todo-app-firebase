import React from "react";
import "./Btn.scss";

const Btn = ({ text, onClick }) => {
  return (
    <button className={`btn ${text.toLowerCase().replace(" ", "")}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Btn;
