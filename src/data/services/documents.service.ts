import { api } from "../api";

export type Type = {
  id: number;
  nome: string;
};

export type Types = {
  tipos: Type[];
};

export async function getDocumentTypes() {
  try {
    const response = await api.get<Types>("app/tipos/documentos");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDocument(value: string) {
  try {
    const documentTypes = await getDocumentTypes();
    const response = documentTypes.tipos.find(
      (document) => document.nome === value,
    );

    return response;
  } catch (error) {
    throw error;
  }
}
