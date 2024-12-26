


import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default-secret-key";

export const saveEncryptedData = (key: string, value: string): void => {
  if (typeof window === "undefined") {
    console.warn("saveEncryptedData called on the server. Ignoring...");
    return;
  }

  const encryptedValue = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  sessionStorage.setItem(`Encrypted${key}`, encryptedValue);
};

export const getDecryptedData = (key: string): string | null => {
  if (typeof window === "undefined") {
    console.warn("getDecryptedData called on the server. Returning null...");
    return null; 
  }

  const encryptedValue = sessionStorage.getItem(`Encrypted${key}`);
  if (!encryptedValue) {
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Failed to decrypt data:", error);
    return null;
  }
};