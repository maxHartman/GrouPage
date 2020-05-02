const CryptoJS = require("crypto-js");
const crypto = require("asymmetric-crypto");
const RSA = require("hybrid-crypto-js").RSA;
// const Crypt = require("hybrid-crypto-js").Crypt;
const Crypt = require("../crypto/hybridcryptojsmod/hybrid-crypto-js/lib/index")
  .Crypt;

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////      SYMMETRIC      /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

function encryptAES(plaintext, secretPassphrase) {
  const encrypted = CryptoJS.AES.encrypt(plaintext, secretPassphrase);
  return encrypted;
}

function decryptAES(ciphertext, secretPassphrase) {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, secretPassphrase);
  return toString(decrypted);
}

function toString(bytes) {
  return bytes.toString(CryptoJS.enc.Utf8);
}

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////     ASYMMETRIC      /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

function createAsymKeyPair() {
  return crypto.keyPair();
}

/**
 * @returns {
 * 		data: '63tP2r8WQuJ+k+jzsd8pbT6WYPHMTafpeg==',
 *		nonce: 'BDHALdoeBiGg7wJbVdfJhVQQyvpxrBSo'
 * 	}
 */
function encryptAsymWithSignature(plaintext, theirPublicKey, mySecretKey) {
  const encrypted = crypto.encrypt(plaintext, theirPublicKey, mySecretKey);
  return encrypted;
}

function decryptAsymWithSignature(cipherData, myPublicKey, theirSecretKey) {
  const ciptertext = cipherData.data;
  const nonce = cipherData.nonce;
  const decrypted = crypto.decrypt(
    ciptertext,
    nonce,
    myPublicKey,
    theirSecretKey
  );

  return decrypted;
}

///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////         RSA         /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// RSA (https://www.npmjs.com/package/hybrid-crypto-js)

// Basic initialization
var crypt = new Crypt();
var rsa = new RSA();

async function createRsaKeyPair() {
  return rsa.generateKeyPairAsync();
}

function encryptRsa(plaintext, publicKey) {
  const encrypted = crypt.encrypt(publicKey, plaintext);
  return encrypted;
}

function decryptRsa(ciphertext, privateKey) {
  const decryptedData = crypt.decrypt(privateKey, ciphertext);
  const decrypted = decryptedData.message;

  return decrypted;
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

export {
  encryptAES,
  decryptAES,
  createAsymKeyPair,
  encryptAsymWithSignature,
  decryptAsymWithSignature,
  encryptRsa,
  decryptRsa,
  createRsaKeyPair,
};
