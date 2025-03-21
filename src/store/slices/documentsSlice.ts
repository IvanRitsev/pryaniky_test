import { createSlice } from "@reduxjs/toolkit";
import type { DocumentsState } from "../../types";
import {
  createDoc,
  deleteDoc,
  fetchDocs,
  updateDoc,
} from "../thunks/documentsSliceThunks";

const initialState: DocumentsState = {
  documents: [],
  loading: false,
  error: null,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocs.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения!";
      });

    builder
      .addCase(createDoc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(createDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка создания!";
      });

    builder
      .addCase(updateDoc.pending, (state) => {
        state.error = null;
      })
      .addCase(updateDoc.fulfilled, (state, action) => {
        const index = state.documents.findIndex(
          (doc) => doc.id === action.payload.id
        );
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
      })
      .addCase(updateDoc.rejected, (state, action) => {
        state.error = action.payload || "Ошибка обновления!";
      });

    builder
      .addCase(deleteDoc.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteDoc.fulfilled, (state, action) => {
        state.documents = state.documents.filter(
          (doc) => doc.id !== action.payload
        );
      })
      .addCase(deleteDoc.rejected, (state, action) => {
        state.error = action.payload || "Ошибка удаления!";
      });
  },
});

export default documentsSlice.reducer;
