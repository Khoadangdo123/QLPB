import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProject as fetchAPI, addProject as addAPI, updateProject as updateAPI } from './projectAPI';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async ({ search, page }) => {
  const response = await fetchAPI(search, page);
  return response;
});

export const addProject = createAsyncThunk('projects/addProject', async (project) => {
  const response = await addAPI(project);
  return response;
});

export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, project }) => {
  const response = await updateAPI(id, project);
  return response;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
  status: "All"
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.list.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
