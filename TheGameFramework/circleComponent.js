var t, r = new Uint8Array(16);

function rng() {
  if (!t && !(t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return t(r)
}

const n = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(t) {
  return "string" == typeof t && n.test(t)
}

for (var o = [], e = 0; e < 256; ++e) o.push((e + 256).toString(16).substr(1));

function v4(t, r, n) {
  var e = (t = t || {}).random || (t.rng || rng)();
  if (e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, r) {
    n = n || 0;
    for (var a = 0; a < 16; ++a) r[n + a] = e[a];
    return r
  }
  return function stringify(t) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      n = (o[t[r + 0]] + o[t[r + 1]] + o[t[r + 2]] + o[t[r + 3]] + "-" + o[t[r + 4]] + o[t[r + 5]] + "-" + o[t[r + 6]] + o[t[r + 7]] + "-" + o[t[r + 8]] + o[t[r + 9]] + "-" + o[t[r + 10]] + o[t[r + 11]] + o[t[r + 12]] + o[t[r + 13]] + o[t[r + 14]] + o[t[r + 15]]).toLowerCase();
    if (!validate(n)) throw TypeError("Stringified UUID is invalid");
    return n
  }(e)
}

const getUid = () => v4();
export {getUid as g};
