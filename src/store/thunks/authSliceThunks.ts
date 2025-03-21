import { createAsyncThunk } from "@reduxjs/toolkit";

const HOST = "https://test.v5.pryaniky.com";

export const login = createAsyncThunk<
  string,
  { username: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();

    if (data.error_code !== 0)
      return rejectWithValue("Произошла ошибка при попытке входа");

    return data.data.token;
  } catch {
    return rejectWithValue("Произошла ошибка при попытке входа");
  }
});
