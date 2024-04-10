export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;

      EXPO_PUBLIC_ANDROID_CLIENT_ID: string;
      EXPO_PUBLIC_IOS_CLIENT_ID: string;
      EXPO_PUBLIC_WEB_CLIENT_ID: string;

      EXPO_PUBLIC_IOS_GOOGLE_MAPS: string;
      EXPO_PUBLIC_ANDROID_GOOGLE_MAPS: string;

      EXPO_PUBLIC_SECRET_KEY: string;
      EXPO_PUBLIC_DECRYPT_KEY: string;
      EXPO_PUBLIC_ENCRYPT_KEY: string;
    }
  }
}
