import { encrypt } from "../../utils/cryptor";
import { api } from "../api";

type AuthData = {
  email: string;
  senha: string;
};

type SocialSignIn = {
  token: string;
};

type AuthResponse = {
  success: {
    auth: {
      access_token: string;
      token_type: string;
      expires_in: string;
    };
  };
};

export async function auth(data: AuthData) {
  try {
    const encryptedData = encrypt(JSON.stringify(data));

    const response = await api.post<AuthResponse>("user/login", {
      encrypt: encryptedData,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function authWithGoogle(data: SocialSignIn) {
  try {
    const encryptedData = encrypt(JSON.stringify(data));

    const response = await api.post<AuthResponse>("user/login/google", {
      encrypt: encryptedData,
    });

    return {
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
}

export async function authWithApple(data: SocialSignIn) {
  try {
    const encryptedData = encrypt(JSON.stringify(data));

    const response = await api.post<AuthResponse>("user/login/apple", {
      encrypt: encryptedData,
    });

    return {
      data: response.data.success,
    };
  } catch (error) {
    throw error;
  }
}
