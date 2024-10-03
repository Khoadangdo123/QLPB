import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDepartment as fetchAPI, addDepartment as addAPI,updateDepartment as updateAPI } from './departmentAPI';

export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async ({ search, page }) => {
  const response = await fetchAPI(search, page);
  return response;
});

export const addDepartment = createAsyncThunk('departments/addDepartment', async (department) => {
  const response = await addAPI(department);
  return response;
});
export const updateDepartment = createAsyncThunk('departments/updateDepartment', async ({id,department}) => {
  const response = await updateAPI(id,department);
  return response;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
  status: "All"
};

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.list = action.payload; // Đảm bảo payload chứa dữ liệu đúng
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default departmentSlice.reducer;
