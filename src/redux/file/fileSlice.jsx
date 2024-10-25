import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFile as fetchAPI, addFile as addAPI, deleteFile as deleteAPI } from './fileAPI';

export const fetchFile = createAsyncThunk('files/fetchFile', async (id) => {
    const response = await fetchAPI(id);
    return response;
});

export const addFile = createAsyncThunk('files/addFile', async (file) => {
    const response = await addAPI(file);
    return response;
});

export const deleteFile = createAsyncThunk('files/deleteFile', async (id) => {
    await deleteAPI(id);
    return id; // Return the id for the fulfilled case
});

const initialState = {
    list: [],
    loading: false,
    error: null,
};

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFile.fulfilled, (state, action) => {
                state.list.push(action.payload); // Or handle based on your use case
            })
            .addCase(addFile.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.list = state.list.filter(file => file.id !== action.payload);
            });
    },
});

export default fileSlice.reducer;
