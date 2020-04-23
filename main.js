const primitives = require('./cryptoPrimitives');

var plaintext = "testing";
var passpharase = "secret 123";

var ciphertext = primitives.encryptAES(plaintext, passpharase);
var plaintext = primitives.decryptAES(ciphertext, passpharase);
console.log(primitives.toString(plaintext));


// ASYMMETRIC CRYPTO

const myKeyPair = primitives.createKeyPair();
const theirKeyPair = primitives.createKeyPair();

const encryptedStuff = primitives.encryptAsym('something', theirKeyPair.publicKey, myKeyPair.secretKey);
const decryptedStuff = primitives.decryptAsym(encryptedStuff, myKeyPair.publicKey, theirKeyPair.secretKey);
console.log(decryptedStuff);
