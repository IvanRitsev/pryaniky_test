import type { UserDocument } from "../types";

const HOST = "https://test.v5.pryaniky.com";

//Получение документов
export const fetchDocuments = async (
  token: string
): Promise<UserDocument[]> => {
  const response = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
    {
      headers: { "x-auth": token },
    }
  );
  const data = await response.json();
  return data.data;
};

//Создание документа
export const createDocument = async (
  token: string,
  document: Omit<UserDocument, "id">
): Promise<any> => {
  const response = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
    {
      method: "POST",
      headers: {
        "x-auth": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    }
  );

  return response.json();
};

//Изменение документа
export const updateDocument = async (
  token: string,
  id: string,
  document: Omit<UserDocument, "id">
) => {
  const response = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    {
      method: "POST",
      headers: {
        "x-auth": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    }
  );
  return response.json();
};

//Удаление документа
export const deleteDocument = async (token: string, id: string) => {
  const response = await fetch(
    `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    {
      method: "POST",
      headers: { "x-auth": token },
    }
  );
  return response.json();
};
