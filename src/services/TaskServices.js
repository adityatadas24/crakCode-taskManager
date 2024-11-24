import { db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const taskCollection = collection(db, "tasks");

// Add task
export const addTask = async (task) => {
  try {
    const taskWithTimestamp = { ...task, createdAt: new Date() };
    const docRef = await addDoc(taskCollection, taskWithTimestamp);
    return { id: docRef.id, ...taskWithTimestamp };
  } catch (error) {
    console.error("Error adding task:", error);
    throw error; 
  }
};


export const getTasks = async () => {
  try {
    const q = query(taskCollection, orderBy("createdAt"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Update task
export const updateTask = async (id, updatedTask) => {
  try {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, updatedTask);
    return { id, ...updatedTask };
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    return id;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

