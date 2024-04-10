import AsyncStorage from "@react-native-async-storage/async-storage";
import * as forge from "node-forge";

export const PRIVATE_KEY = "privateKey";
export const PUBLIC_KEY = "apiPublicKey";

export function decryptPrivateKey() {
  const privateKey = forge.pki.decryptRsaPrivateKey(
    process.env.EXPO_PUBLIC_DECRYPT_KEY,
    process.env.EXPO_PUBLIC_SECRET_KEY,
  );

  const privateKeyPemDecrypted = forge.pki.privateKeyToPem(privateKey);

  return privateKeyPemDecrypted;
}

export function encrypt(data: string) {
  try {
    const publicKey = forge.pki.publicKeyFromPem(
      process.env.EXPO_PUBLIC_ENCRYPT_KEY,
    );

    const encryptedData = publicKey.encrypt(data);

    return forge.util.encode64(encryptedData).replace(/\n/g, "");
  } catch (error) {
    console.log("encrypt error:", error);
    throw error;
  }
}

export async function decrypt<T>(encryptedData: string) {
  try {
    const privateKey = await AsyncStorage.getItem(PRIVATE_KEY);
    if (!privateKey) {
      throw new Error("Key not found");
    }

    const privateKeyObj = forge.pki.decryptRsaPrivateKey(
      privateKey,
      process.env.EXPO_PUBLIC_SECRET_KEY,
    );

    const decryptedData = privateKeyObj.decrypt(
      forge.util.decode64(encryptedData),
    );

    return JSON.parse(decryptedData) as T;
  } catch (error) {
    console.log("decrypt error:", error);
    throw error;
  }
}
