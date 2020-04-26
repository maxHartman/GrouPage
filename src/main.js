const primitives = require("./cryptoPrimitives");
const vcs = require("./vcs");

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

encrypted = primitives.encryptAsymWithSignature(
	plaintext,
	theirKeyPair.publicKey,
	myKeyPair.secretKey
);
decrypted = primitives.decryptAsymWithSignature(
	encrypted,
	myKeyPair.publicKey,
	theirKeyPair.secretKey
);

console.log(decrypted);

/////////////////////////////////         RSA         /////////////////////////////////

plaintext = "rsa test";

(async () => {
	//   const keyPair = await primitives.createRsaKeyPair();
	//   encrypted = primitives.encryptRsa(plaintext, keyPair.publicKey);
	//   decrypted = primitives.decryptRsa(encrypted, keyPair.privateKey);
	//   console.log(decrypted);
	//   const publicKeys = [keyPair.publicKey];
	//   const e = vcs.encode("foo", publicKeys);
	//   const f1 = vcs.encode("foo", publicKeys);
	//   const f2 = vcs.encode("foo", publicKeys);
	//   console.log(vcs.decode(f1, 0, keyPair.privateKey));
	//   console.log(vcs.decode(f2, 0, keyPair.privateKey));
	//   const isVerified = vcs.verify(e, 0, keyPair.privateKey, publicKeys);
	//   console.log(isVerified);
	// TODO use vcs
})();

/**
 * STEPS:
 * 1. Alice generates a session key y
 * 2. Alice encrypts y with bobs public key. this is message (1). It is an authentication request
 * 3. Alice sends message (1) to Bob
 * 4. Bob decrypts message (1) with his private key to get y
 * 5. Bob randomly picks x.
 * 6. Bob creates a vcs(x), called e.
 * 7. Bob encrypts e with y using symmetric cryptography. this is message (2).
 * 8. Bob sends message (2) to Alice.
 * 9. Alice decrypts message (2) using y to get e.
 * 10.1 Alice gets x from decoding the ith index of e with her private key. i is her corresponding index
 * 10.2 if she can use verify(), then she knows e satisfies commonality
 * 11. Alice encrypts x with y. this is message (3). She sends message (3) to Bob
 * 12. Bob decrypts message (3) to get back x. He now knows alice was able to get x from one of the indicies of e
 * 13. Bob is now ensured that alice is a member of P.
 *
 *
 *
 * STEPS: (simplified)
 * Bob = Server, Alice = Client
 * At some point before (1), Alice needs to send her PK to Bob [initialization of Alice in P]
 *
 * 1. Bob randomly picks x.
 * 2. Bob creates a vcs(x), called e. This is message (2)
 * 3. Bob sends message (2) to Alice.
 * 4. Alice gets x from decoding the ith index of e with her private key. i is her corresponding index
 * 4.1 if she can use verify(), then she knows e satisfies commonality
 * 5. Alice sends x to bob
 * 6. Bob sees x. He now knows alice was able to get x from one of the indicies of e
 * 7. Bob is now ensured that alice is a member of P.
 */

/**
 * Authentication (using passport):
 * 1. Alice presses a button on frontend that sends request to
 * Bob asking for e and i, Bob responds with e and i
 * 2. Alice sends request to authentication endpoint and passes in
 * xAliceGets
 * 3. Bob does check using LocalStrategy to ensure that xAliceGets === x
 * and creates a user for Alice if true
 */

/**
 *
 */
async function paperWalkthrough() {
	const aliceKeyPair = await primitives.createRsaKeyPair();
	const publicKeys = [aliceKeyPair.publicKey];
	const secretKey = aliceKeyPair.privateKey;
	const i = 0;

	// Step 1
	const x = Math.random().toString();

	// Step 2
	const e = vcs.encode(x, publicKeys);

	// Step 3
	// Bob sends e, i to Alice (Server sends e, i to client)

	//   Step 4
	const xAliceGets = vcs.decode(e, i, secretKey);

	//   Step 4.1...
	const isVerified = vcs.verify(e, i, secretKey, publicKeys);
	if (!isVerified) {
		return "ERROR - e does not satisfy commonality";
	}

	//   Step 5
	// Alice sends xAliceGets to Bob (client sends xAliceGets to server)

	//   Step 6
	//   Bob checks xAliceGets is the same as x
	const bobAgreesAliceIsVerified = xAliceGets === x;

	//   Step 7
	// Bob now knows alice is a member of publicKeys
}

(async () => {
	const NodeRSA = require("node-rsa");
	const key = new NodeRSA({ b: 512 }, undefined, {
		encryptionScheme: "PKCS1",
	});
	const publicComponents = JSON.stringify(key.exportKey("components-public"));
	console.log(publicComponents);

	const text = "Hello RSA!";
	const encrypted = key.encryptPrivate(text, "base64");
	console.log("encrypted: ", encrypted);
	const encrypted2 = key.encryptPrivate(text, "base64");
	console.log("encrypted: ", encrypted2);
	const decrypted = key.decryptPublic(encrypted, "utf8");
	console.log("decrypted: ", decrypted);
})();
