export interface UserDocument {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface DocumentsState {
  documents: UserDocument[];
  loading: boolean;
  error: string | null;
}
