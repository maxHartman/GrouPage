const primitives = require('./cryptoPrimitives');


/////////////////////////////////      SYMMETRIC      /////////////////////////////////

var plaintext = "symmetric test";
var passpharase = "secret 123";

var encrypted = primitives.encryptAES(plaintext, passpharase);
var decrypted = primitives.decryptAES(encrypted, passpharase);

console.log(decrypted);


/////////////////////////////////     ASYMMETRIC      /////////////////////////////////

plaintext = "asymmetric test";
const myKeyPair = primitives.createAsymKeyPair();
const theirKeyPair = primitives.createAsymKeyPair();

encrypted = primitives.encryptAsymWithSignature(plaintext, theirKeyPair.publicKey, myKeyPair.secretKey);
decrypted = primitives.decryptAsymWithSignature(encrypted, myKeyPair.publicKey, theirKeyPair.secretKey);

console.log(decrypted);

/////////////////////////////////         RSA         /////////////////////////////////

plaintext = "rsa test";

(async () => {
	const keyPair = await primitives.createRsaKeyPair();
	encrypted = primitives.encryptRsa(plaintext, keyPair.publicKey);
	decrypted = primitives.decryptRsa(encrypted, keyPair.privateKey);

	console.log(decrypted);
})();