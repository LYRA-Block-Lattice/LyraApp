import * as CryptoJS from 'crypto-js';

// encrypt binary data with AES by a password and return a base64 encoded string
export function encrypt(data: Uint8Array, password: string): string {
    const key = CryptoJS.PBKDF2(password, CryptoJS.lib.WordArray.random(128 / 8), {
        keySize: 256 / 32,
        iterations: 1000
    });
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

// decrypt a base64 encoded string with AES by a password and return binary data
export function decrypt(data: string, password: string): Uint8Array {   
    const key = CryptoJS.PBKDF2(password, CryptoJS.lib.WordArray.random(128 / 8), {
        keySize: 256 / 32,
        iterations: 1000
    });
    const dataWordArray = CryptoJS.enc.Base64.parse(data);
    const iv = CryptoJS.lib.WordArray.create(dataWordArray.words.slice(0, 4));
    const encrypted = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.lib.WordArray.create(dataWordArray.words.slice(4))
    });
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
    return decrypted.words;
}

// read from browser localstore with key name and decrypt it with password
export function read(key: string, password: string): Uint8Array {
    const data = localStorage.getItem(key);
    if (data === null) {
        return new Uint8Array();
    }
    return decrypt(data, password);
}