import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../config";

// Firebase collection reference
const todoRef = firebase.firestore().collection("todos");

// Thunk to fetch todos from Firebase
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const querySnapshot = await todoRef.orderBy("createdAt", "desc").get();
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    heading: doc.data().heading,
  }));
  return todos;
});

// Thunk to add a new todo to Firebase
export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (heading) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      heading,
      createdAt: timestamp,
    };
    const docRef = await todoRef.add(data);
    return {
      id: docRef.id,
      heading,
    };
  }
);

// Thunk to update a todo to Firebase
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, heading }) => {
    try {
      await todoRef.doc(id).update({ heading });
      return { id, heading };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Thunk to delete a todo from Firebase
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await todoRef.doc(id).delete();
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
