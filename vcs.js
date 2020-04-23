const primitives = require('./cryptoPrimitives');
const utils = require('./utils');

/* 
 * Encode(x, P) = encrypt x with each of the public keys in P and output the corresponding vector of ciphertexts. Call this vector e.
 */
function encode(plaintext, publicKeys) {
	var cipherVector;

	for (const publicKey of publicKeys) {
		cipherVector.push(primitives.encryptRsa(plaintext, publicKey))
	}

	return cipherVector;
}

/*
 * Decode(e, si, P) = use your secret key si to decrypt the i-th entry in e. This yields x.
 */
function decode(cipherVector, i, secretKey, publicKeys) {
	// TODO: consider removing publicKeys
	const ciphertext = cipherVector[i];
	const plaintext = primitives.decryptRsa(ciphertext, secretKey);
	return plaintext;
}

/*
 * Verify(e, si, P) = verify that every entry in e encrypts the same value of x.
 */
function verify(cipherVector, i, secretKey, publicKeys) {
	const plaintext = decode(cipherVector, i, secretKey, publicKeys);
	const checkingVector = encode(plaintext, publicKeys);

	return utils.arraysEqual(checkingVector, cipherVector);
}

module.exports = { encode, decode, verify };