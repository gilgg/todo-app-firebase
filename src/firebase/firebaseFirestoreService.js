import { db, TODOS_COLLECTION_NAME } from "./firebase";
import {
  addDoc,
  doc,
  getDocs,
  collection as firestoreCollection,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const collectionRef = firestoreCollection(db, TODOS_COLLECTION_NAME);

const createTodo = async (todo) => {
  await addDoc(collectionRef, { ...todo });
  return readAllTodos(todo.userId);
};

const readAllTodos = async (userId) => {
  const todos = [];
  const userQuery = query(
    collectionRef,
    where(process.env.REACT_APP_USER_FIELD, "==", userId),
    orderBy(process.env.REACT_APP_TIMESTAMP_FIELD, "desc")
  );
  const todosSnapshot = await getDocs(userQuery);

  todosSnapshot.forEach((todo) => {
    const todoToAdd = {
      id: todo.id,
      ...todo.data(),
    };
    todos.push(todoToAdd);
  });

  return todos;
};

const updateTodo = async (userId, todoId, updatedTodo) => {
  const docRef = doc(db, TODOS_COLLECTION_NAME, todoId);
  await updateDoc(docRef, updatedTodo);
  return await readAllTodos(userId);
};

const deleteTodo = async (userId, todoId) => {
  const docRef = doc(db, TODOS_COLLECTION_NAME, todoId);
  await deleteDoc(docRef);
  return await readAllTodos(userId);
};

const FirebaseFirestoreService = {
  createTodo,
  readAllTodos,
  updateTodo,
  deleteTodo,
};

export default FirebaseFirestoreService;
