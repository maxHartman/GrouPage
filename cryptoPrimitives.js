const CryptoJS = require("crypto-js");
const crypto = require('asymmetric-crypto')

// SYMMETRIC

function encryptAES(plaintext, secretPassphrase) {
    const encrypted = CryptoJS.AES.encrypt(plaintext, secretPassphrase)
    return encrypted
}

function decryptAES(ciphertext, secretPassphrase) {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, secretPassphrase)
    return decrypted
}

function toString(bytes) {
    return bytes.toString(CryptoJS.enc.Utf8);
}

// ASYMMETRIC

function createKeyPair() {
    return crypto.keyPair();
}

/**
 * Returns {
 *   data: '63tP2r8WQuJ+k+jzsd8pbT6WYPHMTafpeg==',
 *   nonce: 'BDHALdoeBiGg7wJbVdfJhVQQyvpxrBSo'
 * }
 */
function encryptAsym(plaintext, theirPublicKey, mySecretKey) {
    const encrypted = crypto.encrypt(plaintext, theirPublicKey, mySecretKey);
    return encrypted
}


function decryptAsym(cipherData, myPublicKey, theirSecretKey) {
    const cyptertext = cipherData.data;
    const nonce = cipherData.nonce;
    const decrypted = crypto.decrypt(cyptertext, nonce, myPublicKey, theirSecretKey);
    return decrypted
}

module.exports = { encryptAES, decryptAES, toString, createKeyPair, encryptAsym, decryptAsym }