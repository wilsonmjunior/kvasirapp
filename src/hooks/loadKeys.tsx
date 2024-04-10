import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { PRIVATE_KEY, decryptPrivateKey } from "../utils/cryptor";

export function useLoadKeys() {
  const [privateKey, setPrivateKey] = useState("");

  useEffect(() => {
    async function loadPrivateKey() {
      const privateKey = await AsyncStorage.getItem(PRIVATE_KEY);
      if (!privateKey) {
        const response = decryptPrivateKey();
        setPrivateKey(response);
        await AsyncStorage.setItem(PRIVATE_KEY, response);
      }
    }

    loadPrivateKey();
  }, []);

  return {
    privateKey,
  };
}
