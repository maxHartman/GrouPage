const primitives = require('./cryptoPrimitives');
const fs = require("fs");

const startCountingFrom = parseInt(process.argv[2]);
const numToCreate = parseInt(process.argv[3]);

(async () => {
	for (var i = startCountingFrom; i < startCountingFrom + numToCreate; i++) {
		console.log(`Creating kp ${i}`);
		const keyPair = await primitives.createRsaKeyPair();
		const fileContent = JSON.stringify(keyPair);
		const filePath = `${__dirname}/keypairs/kp${i}.json`;
		fs.writeFileSync(filePath, fileContent);
		const myTxt = fs.readFileSync(filePath, { encoding: "UTF8" });
		console.log(JSON.parse(myTxt));
	}
})();
