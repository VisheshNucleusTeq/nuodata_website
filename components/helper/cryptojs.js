import CryptoJS from "crypto-js";
var key = "5WngRFFWEP5y1PQE9HPHdsHjnKJibnUh";
key = CryptoJS.enc.Utf8.parse(key);
var iv = CryptoJS.enc.Utf8.parse("CFABECFEBDCFCECC"); 

export function encryptAES_CBC(message) {
  try {
    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const encryptedMessage = encrypted.toString();
    return encryptedMessage;
  } catch (error) {
    console.error("Encryption error:", error);
    return null; 
  }
}
export function decryptAES_CBC(encryptedMessage) {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7, 
    });
    const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  } catch (error) {
    console.error("Decryption error:", error);
    return null; 
  }
}