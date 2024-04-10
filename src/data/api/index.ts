import axios, { AxiosError, AxiosInstance } from "axios";

import { IResponse } from "../types";

import { decrypt } from "../../utils/cryptor";

const REQUEST_TIMEOUT = 4 * 10 * 1000;

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager(signOut: SignOut): () => void;
};

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  // timeout: REQUEST_TIMEOUT,
}) as APIInstanceProps;

api.interceptors.response.use(
  async (response) => {
    if (response.data) {
      const decryptedData = await decrypt<IResponse>(response.data.encrypt);
      response.data = decryptedData;
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.data) {
      const decryptedError = await decrypt(error.response.data.encrypt);
      error.response.data = decryptedError;
    }
    return Promise.reject(error);
  },
);

export { api };
