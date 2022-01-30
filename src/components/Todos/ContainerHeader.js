import React from "react";
import "./ContainerHeader.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DarkModeSwitch from "../Dark Mode/DarkModeSwitch";
import { todoActions } from "../../store/todoSlice";
import Btn from "../UI/Btn";
import FirebaseAuthService from "../../firebase/firebaseAuthService";

const ContainerHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async () => {
    await FirebaseAuthService.logoutUser();

    dispatch(todoActions.setUserId(""));
    dispatch(todoActions.setTodos([]));
    dispatch(todoActions.clearDarkMode());

    history.replace("/");
  };

  return (
    <div className="container-header flex-justify-center">
      <div className="darkmode-logout-btns">
        <DarkModeSwitch />
        <Btn text="Logout" onClick={onLogout} />
      </div>
    </div>
  );
};

export default ContainerHeader;
