import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks as fetchAPI, addTask as addAPI, updateTask as updateAPI } from './taskAPI';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ({ search, page }) => {
  const response = await fetchAPI(search, page);
  return response;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await addAPI(task);
  return response;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
  const response = await updateAPI(id, task);
  return response;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
  status: "All"
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.list.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
