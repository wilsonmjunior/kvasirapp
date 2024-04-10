import axios from "axios";

import { IResponse } from "../types";

import { decrypt } from "../../utils/cryptor";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

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
