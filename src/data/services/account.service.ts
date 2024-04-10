import { encrypt } from "../../utils/cryptor";
import { api } from "../api";

export type AccountData = {
  documento: string;
  nome: string;
  email: string;
  celular: string;
  senha: string;
  tipo_documento: number;
  tipo_usuario: number;
};

export type IUserType =
  | "INDIVÍDUO"
  | "INTERESSES ECONÔMICOS"
  | "INTERESSES SOCIAIS";

export type UserType = {
  id: number;
  nome: string;
};

type UserTypes = {
  tipos: UserType[];
};

type ChangePasswordParams = {
  documento: string;
  codigo: string;
  nova_senha: string;
};

export type Contato = {
  email: string;
  celular: string;
};

type ForgotPasswordResponse = {
  success: string;
  contato: Contato;
};

export async function getUserTypes() {
  try {
    const response = await api.get<UserTypes>("app/tipos/usuarios");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserType(type: IUserType) {
  try {
    const userTypesData = await getUserTypes();

    const typeFounded = userTypesData.tipos.find((item) => item.nome === type);

    return typeFounded;
  } catch (error) {
    throw error;
  }
}

export async function createAccount(data: AccountData) {
  try {
    const encryptedData = encrypt(JSON.stringify(data));

    const response = await api.post("user/cadastrar", {
      encrypt: encryptedData,
    });

    return {
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
}

export async function forgotPassword(documento: string) {
  try {
    const encryptedData = encrypt(JSON.stringify({ documento }));

    const response = await api.post<ForgotPasswordResponse>(
      "user/senha/esqueci",
      {
        encrypt: encryptedData,
      },
    );

    return {
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
}

export async function changePassword({
  codigo,
  documento,
  nova_senha,
}: ChangePasswordParams) {
  try {
    const encryptedData = encrypt(
      JSON.stringify({ codigo, documento, nova_senha }),
    );

    const response = await api.put<{ success: string }>("user/senha/trocar", {
      encrypt: encryptedData,
    });

    return {
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
}

export async function checkCode(codigo: string, documento: string) {
  try {
    const encryptedData = encrypt(JSON.stringify({ codigo, documento }));

    const response = await api.post<{
      success: string;
    }>("user/senha/verificar", {
      encrypt: encryptedData,
    });

    return {
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
}
