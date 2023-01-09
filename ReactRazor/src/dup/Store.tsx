import * as CryptoJS from "crypto-js";

// encrypt binary data with AES by a password and return a base64 encoded string
export function encrypt(data: Uint8Array, password: string): string {
  const key = CryptoJS.PBKDF2(
    password,
    CryptoJS.lib.WordArray.random(128 / 8),
    {
      keySize: 256 / 32,
      iterations: 1000
    }
  );
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
  return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

// decrypt a base64 encoded string with AES by a password and return binary data
export function decrypt(data: string, password: string): Uint8Array {
  const key = CryptoJS.PBKDF2(
    password,
    CryptoJS.lib.WordArray.random(128 / 8),
    {
      keySize: 256 / 32,
      iterations: 1000
    }
  );
  const dataWordArray = CryptoJS.enc.Base64.parse(data);
  const iv = CryptoJS.lib.WordArray.create(dataWordArray.words.slice(0, 4));
  const encrypted = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.lib.WordArray.create(dataWordArray.words.slice(4))
  });
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
  return decrypted.words;
}
import * as CryptoJS from "crypto-js";

// create a store object to save data to local storage
const store = {
  // save data to local storage
  save: (key: string, value: any) => {
    const data = JSON.stringify(value);
    const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
    localStorage.setItem(key, encryptedData);
  },
  // get data from local storage
  get: (key: string) => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return data;
    }
    return null;
  }
};

// read from browser localstore with key name and decrypt it with password
export function read(key: string, password: string): Uint8Array {
  const data = localStorage.getItem(key);
  if (data === null) {
    return new Uint8Array();
  }
  return decrypt(data, password);
}
