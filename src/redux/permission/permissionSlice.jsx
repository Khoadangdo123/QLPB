import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPermissions as fetchAPI, addPermission as addAPI, updatePermission as updateAPI } from './permissionAPI';

export const fetchPermissions = createAsyncThunk('permissions/fetchPermissions', async ({ search, page }) => {
  const response = await fetchAPI(search, page);
  return response;
});

export const addPermission = createAsyncThunk('permissions/addPermission', async (permission) => {
  const response = await addAPI(permission);
  return response;
});

export const updatePermission = createAsyncThunk('permissions/updatePermission', async ({ id, permission }) => {
  const response = await updateAPI(id, permission);
  return response;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
  status: "All"
};

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
    //   .addCase(addPermission.fulfilled, (state, action) => {
    //     state.list.push(action.payload);
    //   })
    //   .addCase(updatePermission.fulfilled, (state, action) => {
    //     const index = state.list.findIndex((permission) => permission.id === action.payload.id);
    //     if (index !== -1) {
    //       state.list[index] = action.payload;
    //     }
    //   });
  },
});

export default permissionSlice.reducer;
