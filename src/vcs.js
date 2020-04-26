const primitives = require("./cryptoPrimitives");
const utils = require("./utils");

/**
 * Encrypt a string with each public key.
 * @param 	{String} 		plaintext	Plain text to be encrypted
 * @param 	{Array<String>}	publicKeys	Vector of public keys
 * @returns	{Array<String>}				Encoded vector
 */
function encode(plaintext, publicKeys) {
	const cipherVector = [];

	for (const publicKey of publicKeys) {
		cipherVector.push(primitives.encryptRsa(plaintext, publicKey));
	}

	return cipherVector;
}

/**
 * Decode a specific entry of a vector using the secret key.
 * @param 	{Array<String>}	cipherVector	Encoded vector
 * @param 	{Number} 		i				Index in question
 * @param 	{String} 		secretKey		Decription key
 * @returns	{String}						Plain text version of ith entry
 */
function decode(cipherVector, i, secretKey) {
	const ciphertext = cipherVector[i];
	const plaintext = primitives.decryptRsa(ciphertext, secretKey);

	return plaintext;
}

/**
 * Check that every entry in the vector encrypts the same value.
 * @param 	{Array<String>}	cipherVector	Encoded vector
 * @param 	{Number} 		i				Index in question
 * @param 	{String} 		secretKey		Decription key
 * @param 	{Array<String>}	publicKeys		Vector of public keys
 * @returns {Boolean}						The validity of the comparison
 */
function verify(cipherVector, i, secretKey, publicKeys) {
	const plaintext = decode(cipherVector, i, secretKey, publicKeys);
	const checkingVector = encode(plaintext, publicKeys);
	return utils.keysEqual(checkingVector, cipherVector);
}

module.exports = { encode, decode, verify };
