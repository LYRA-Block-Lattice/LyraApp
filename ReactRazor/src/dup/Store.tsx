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
