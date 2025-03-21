import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  updateDocument,
} from "../../api/documents";
import { RootState } from "../store";
import { UserDocument } from "../../types";

//Получение документов
export const fetchDocs = createAsyncThunk<
  UserDocument[],
  void,
  { rejectValue: string }
>("documents/fetchDocs", async (_, { getState, rejectWithValue }) => {
  try {
    const token = (getState() as RootState).auth.token;
    if (!token) throw new Error("Пользователь не авторизован!");
    return await fetchDocuments(token);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

//Создание документа
export const createDoc = createAsyncThunk<
  UserDocument,
  Omit<UserDocument, "id">,
  { rejectValue: string }
>("documents/createDoc", async (document, { getState, rejectWithValue }) => {
  try {
    const token = (getState() as RootState).auth.token;
    if (!token) throw new Error("Пользователь не авторизован!");
    const response = await createDocument(token, document);

    if (response.error_code !== 0) return rejectWithValue(response.error_text);

    return response.data;
  } catch {
    return rejectWithValue("Ошибка создания документа!");
  }
});

//Обновление документа
export const updateDoc = createAsyncThunk<
  UserDocument,
  { id: string; document: Omit<UserDocument, "id"> },
  { rejectValue: string }
>(
  "documents/updateDoc",
  async ({ id, document }, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      if (!token) throw new Error("Пользователь не авторизован!");
      const response = await updateDocument(token, id, document);
      if (response.error_code !== 0)
        return rejectWithValue(response.error_text);

      return response.data;
    } catch {
      return rejectWithValue("Ошибка обновления документа");
    }
  }
);

//Удаление документа
export const deleteDoc = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("documents/deleteDoc", async (id, { getState, rejectWithValue }) => {
  try {
    const token = (getState() as RootState).auth.token;
    if (!token) throw new Error("Пользователь не авторизован!");
    const response = await deleteDocument(token, id);
    if (response.error_code !== 0) return rejectWithValue(response.error_text);

    return id;
  } catch {
    return rejectWithValue("Ошибка удаления документа");
  }
});
