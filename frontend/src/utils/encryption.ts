import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "default-secret-key";


export const saveEncryptedData = (key: string, value: string): void => {
  const encryptedValue = CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
  sessionStorage.setItem(`Encrypted${key}`, encryptedValue);
};


export const getDecryptedData = (key: string): string | null => {
  const encryptedValue = sessionStorage.getItem(`Encrypted${key}`);
  if (!encryptedValue) {
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
 