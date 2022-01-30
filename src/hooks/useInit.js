import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchTodos from "./useFetchTodos";
import { todoActions } from "../store/todoSlice";
import FirebaseAuthService from "../firebase/firebaseAuthService";

const useInit = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let userId = useSelector((state) => state.todo.userId);

  const setUser = (user) => {
    dispatch(todoActions.setUserId(user?.uid));
  };

  useEffect(() => {
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userId]);

  useFetchTodos(userId);

  return isLoggedIn;
};

export default useInit;
