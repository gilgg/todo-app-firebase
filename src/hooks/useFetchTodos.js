import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";
import FirebaseFirestoreService from "../firebase/firebaseFirestoreService";

const useFetchTodos = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      if (userId) {
        const todos = await FirebaseFirestoreService.readAllTodos(userId);
        dispatch(todoActions.setTodos(todos));
      }
    };

    getTodos();
  }, [dispatch, userId]);
};

export default useFetchTodos;
