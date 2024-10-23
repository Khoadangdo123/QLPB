import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSections as fetchAPI, addSection as addAPI, updateSection as updateAPI, deleteSection as deleteAPI } from './sectionAPI';

export const fetchSections = createAsyncThunk('sections/fetchSections', async ({ search, page }) => {
  const response = await fetchAPI(search, page);
  return response;
});

export const deleteSection = createAsyncThunk('sections/deleteSection', async (id) => {
  const response = await deleteAPI(id);
  return id;
});

export const addSection = createAsyncThunk('sections/addSection', async (section) => {
  const response = await addAPI(section);
  return response;
});

export const updateSection = createAsyncThunk('sections/updateSection', async ({ id, section }) => {
  const response = await updateAPI(id, section);
  return response;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
  status: "All"
};

const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    setSections: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSection.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        const index = state.list.findIndex((section) => section.maPhanDuAn === action.payload.maPhanDuAn);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.list = state.list.filter((section) => section.maPhanDuAn !== action.payload);
      });
  },
});
export const { setSections } = sectionSlice.actions;
export default sectionSlice.reducer;
