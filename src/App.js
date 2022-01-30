import React from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import useInit from "./hooks/useInit";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";

const App = () => {
  const isLoggedIn = useInit();
  
  return (
    <div className="app">
      <Switch>
        <Route path="/login">{!isLoggedIn && <LoginPage />}</Route>
        <Route path="/todos">{isLoggedIn && <TodoPage />}</Route>
        <Route path="/">
          {!isLoggedIn && <Redirect to="/login" />}
          {isLoggedIn && <Redirect to="/todos" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
