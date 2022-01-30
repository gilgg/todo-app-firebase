import React, { Fragment, useState, useRef } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { todoActions } from "../../store/todoSlice";
import FirebaseAuthService from "../../firebase/firebaseAuthService";
import Btn from "../UI/Btn";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let userId;

    if (isLogin) {
      userId = await FirebaseAuthService.loginUser(email, password);
    } else {
      userId = await FirebaseAuthService.signupUser(email, password);
    }

    dispatch(todoActions.setUserId(userId));
    history.push("/todos");
  };

  return (
    <Fragment>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h1 className="login-form-title">Welcome!</h1>

        <div className="login-form-email">
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} />
        </div>

        <div className="login-form-password">
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} />
        </div>

        <Btn text={isLogin ? "Login" : "Sign Up"} />

        <p onClick={() => setIsLogin((prevState) => !prevState)}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>
      </form>
    </Fragment>
  );
};

export default Login;
