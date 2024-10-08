import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWorkDepartment as fetchAPI, addWorkDepartment as addAPI, updateWorkDepartment as updateAPI, fetchByIdWorkDepartment as fetchByIdAPI } from './workdepartmentAPI';


export const fetchWorkDepartment = createAsyncThunk('workDepartment/fetchWorkDepartment', async ({ search, page }) => {
  const response = await fetchAPI(search, page);
  return response;
});
export const addWorkDepartment = createAsyncThunk('workDepartment/addWorkDepartment', async (WorkDepartment) => {
  const response = await addAPI(WorkDepartment);
  return response;
});
export const updateWorkDepartment = createAsyncThunk('workDepartment/updateWorkDepartment', async ({ id, WorkDepartment }) => {
  const response = await updateAPI(id, WorkDepartment);
  return response;
});
export const fetchByIdWorkDepartment = createAsyncThunk('workDepartment/fetchByIdWorkDepartment', async (id) => {
  const response = await fetchByIdAPI(id);
  return response;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
  status: "All",
  currentWorkDepartment: null
};

const workDepartmentSlice = createSlice({
  name: 'workDepartment',
  initialState,
  reducers: {
    setWorkDepartment: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkDepartment.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchWorkDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchWorkDepartment.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addWorkDepartment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateWorkDepartment.fulfilled, (state, action) => {
        const index = state.list.findIndex((WorkDepartment) => WorkDepartment.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(fetchByIdWorkDepartment.fulfilled, (state, action) => {
        state.currentWorkDepartment = action.payload;
      });
  },
});

export const { setWorkDepartment } = workDepartmentSlice.actions;
export default workDepartmentSlice.reducer;
