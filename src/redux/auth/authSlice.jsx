import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Login as LoginAPI, RefreshToken as RefreshTokenAPI} from "./authenAPI";

export const Login = createAsyncThunk('auth/login', async (AuthRequest) => {
  const response = await LoginAPI(AuthRequest);
  return response;
});

export const RefreshToken = createAsyncThunk('auth/RefreshToken', async (RefreshTokenRequest) => {
  const response = await RefreshTokenAPI(RefreshTokenRequest);
  return response;
});
const AuthSlice = createSlice({
  name: 'user',
  initialState: {
    loading:false,
    user:null,
    error:null
  },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployees.pending, (state) => {
//         state.loading = true;
//         state.status = 'loading';
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = 'succeeded';
//         state.list = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.loading = false;
//         state.status = 'failed';
//         state.error = action.error.message;
//       }).addCase(addEmployee.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       });
//   },
});

export default AuthSlice.reducer;
