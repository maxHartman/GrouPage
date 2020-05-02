function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      console.log(a[i]);
      console.log(b[i]);
      return false;
    }
  }

  return true;
}

function keysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  console.log("COMPARING");
  for (var i = 0; i < a.length; ++i) {
    const aJSON = JSON.parse(a[i]);
    const bJSON = JSON.parse(b[i]);
    if (aJSON.cipher != bJSON.cipher) {
      console.log(aJSON.cipher);
      console.log(bJSON.cipher);
      return false;
    }
  }

  return true;
}

export { arraysEqual, keysEqual };
