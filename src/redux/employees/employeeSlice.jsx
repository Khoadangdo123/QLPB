import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployees as fetchAPI, addEmployee as addAPI } from './employeeAPI';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async ({ search, page }) => {
  const response = await fetchAPI(search, page);
  return response;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee) => {
  const response = await addAPI(employee);
  return response;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    pagination: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
