function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}

	return true;
}

function keysEqual(a, b) {
	// TODO... parse json blob for keys, check equality over entire array
	console.log("Error: keysEqual not implemented");
	return true;
}

module.exports = { arraysEqual, keysEqual };
