import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import {
  createDoc,
  deleteDoc,
  fetchDocs,
  updateDoc,
} from "../../store/thunks/documentsSliceThunks";
import { logout } from "../../store/slices/authSlice";
import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  TableContainer,
  Container,
  Stack,
  Paper,
} from "@mui/material";
import { UserDocument } from "../../types";
import Loader from "../../components/Loader";
import ErrorAlert from "../../components/ErrorAlert";

const DashboardPage: React.FC = () => {
  const { documents, loading, error } = useSelector(
    (state: RootState) => state.documents
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<
    UserDocument | Omit<UserDocument, "id">
  >({
    companySigDate: new Date().toISOString(),
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: new Date().toISOString(),
    employeeSignatureName: "",
  });

  useEffect(() => {
    dispatch(fetchDocs());
  }, [dispatch]);

  const handleOpen = () => {
    setIsEditing(false);
    setCurrentDoc({
      companySigDate: new Date().toISOString(),
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: new Date().toISOString(),
      employeeSignatureName: "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleEditOpen = (doc: UserDocument) => {
    setIsEditing(true);
    setCurrentDoc(doc);
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentDoc((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    currentDoc.documentName.trim() !== "" &&
    currentDoc.documentStatus.trim() !== "" &&
    currentDoc.documentType.trim() !== "";

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isEditing) {
      const { id, ...docData } = currentDoc as UserDocument;
      dispatch(updateDoc({ id, document: docData }))
        .unwrap()
        .then(() => handleClose())
        .catch((error) => console.error("Failed to update document:", error));
    } else {
      dispatch(createDoc(currentDoc))
        .unwrap()
        .then(() => {
          setCurrentDoc({
            companySigDate: new Date().toISOString(),
            companySignatureName: "",
            documentName: "",
            documentStatus: "",
            documentType: "",
            employeeNumber: "",
            employeeSigDate: new Date().toISOString(),
            employeeSignatureName: "",
          });
          handleClose();
        })
        .catch((error) => console.error("Failed to create document:", error));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteDoc(id));
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <Paper elevation={4} sx={{ padding: 4 }}>
        <Stack minHeight="100vh" spacing={3} sx={{ marginTop: 2 }}>
          <Button onClick={() => dispatch(logout())}>Выйти с аккаунта</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            style={{ marginBottom: "16px" }}
          >
            Создать новый документ
          </Button>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableCell align="center">Дата подписи компании</TableCell>
                <TableCell align="center">Подпись компании</TableCell>
                <TableCell align="center">Имя документа</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell align="center">Тип документа</TableCell>
                <TableCell align="center">Номер сотрудника</TableCell>
                <TableCell align="center">Дата подписи сотрудника</TableCell>
                <TableCell align="center">Подпись сотрудника</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.companySigDate}</TableCell>
                  <TableCell align="center">
                    {doc.companySignatureName}
                  </TableCell>
                  <TableCell align="center">{doc.documentName}</TableCell>
                  <TableCell align="center">{doc.documentStatus}</TableCell>
                  <TableCell align="center">{doc.documentType}</TableCell>
                  <TableCell align="center">{doc.employeeNumber}</TableCell>
                  <TableCell>{doc.employeeSigDate}</TableCell>
                  <TableCell align="center">
                    {doc.employeeSignatureName}
                  </TableCell>
                  <TableCell>
                    <Stack direction="column" spacing={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditOpen(doc)}
                      >
                        Изменить
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(doc.id)}
                      >
                        Удалить
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </Stack>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogTitle>
            {isEditing ? "Редактирование документа" : "Создание документа"}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              name="documentName"
              label="Имя документа"
              value={currentDoc.documentName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              name="documentStatus"
              label="Статус"
              value={currentDoc.documentStatus}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              name="documentType"
              label="Тип документа"
              value={currentDoc.documentType}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="employeeNumber"
              label="№ работника"
              value={currentDoc.employeeNumber}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="companySignatureName"
              label="Подпись компании"
              value={currentDoc.companySignatureName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              name="employeeSignatureName"
              label="Подпись сотрудника"
              value={currentDoc.employeeSignatureName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={handleClose}>
                Отмена
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                disabled={loading || !isValid}
              >
                {loading ? <CircularProgress size={24} /> : "Сохранить"}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>

      <ErrorAlert error={error} />
    </Container>
  );
};

export default DashboardPage;
