import React, { useState } from "react";
import { login } from "../../store/thunks/authSliceThunks";
import { RootState, useAppDispatch } from "../../store/store";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ErrorAlert from "../../components/ErrorAlert";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  if (loading) return <Loader />;
  console.log(error);

  return (
    <Container>
      <Paper elevation={4} sx={{ padding: 4 }}>
        <Stack
          minHeight="100vh"
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ maxWidth: 400, margin: "0 auto" }}
        >
          <Typography variant="h5">Добро пожаловать!</Typography>
          <Typography variant="h4">Вход в аккаунт</Typography>
          <TextField
            fullWidth
            label="Имя пользователя"
            placeholder="Введите"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            type="text"
          />
          <TextField
            fullWidth
            label="Пароль"
            placeholder="Введите"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
          />

          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Вход
          </Button>
        </Stack>
      </Paper>

      <ErrorAlert error={error} />
    </Container>
  );
};

export default LoginPage;
