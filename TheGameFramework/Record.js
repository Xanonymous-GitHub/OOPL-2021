var e = {};

function hasOwnProperty(e, n) {
  return Object.prototype.hasOwnProperty.call(e, n)
}

var stringifyPrimitive = function (e) {
  switch (typeof e) {
    case"string":
      return e;
    case"boolean":
      return e ? "true" : "false";
    case"number":
      return isFinite(e) ? e : "";
    default:
      return ""
  }
};
e.decode = e.parse = function (e, n, r, t) {
  n = n || "&", r = r || "=";
  var o = {};
  if ("string" != typeof e || 0 === e.length) return o;
  var a = /\+/g;
  e = e.split(n);
  var s = 1e3;
  t && "number" == typeof t.maxKeys && (s = t.maxKeys);
  var c = e.length;
  s > 0 && c > s && (c = s);
  for (var u = 0; u < c; ++u) {
    var p, i, f, y, d = e[u].replace(a, "%20"), m = d.indexOf(r);
    m >= 0 ? (p = d.substr(0, m), i = d.substr(m + 1)) : (p = d, i = ""), f = decodeURIComponent(p), y = decodeURIComponent(i), hasOwnProperty(o, f) ? Array.isArray(o[f]) ? o[f].push(y) : o[f] = [o[f], y] : o[f] = y
  }
  return o
}, e.encode = e.stringify = function (e, n, r, t) {
  return n = n || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? Object.keys(e).map((function (t) {
    var o = encodeURIComponent(stringifyPrimitive(t)) + r;
    return Array.isArray(e[t]) ? e[t].map((function (e) {
      return o + encodeURIComponent(stringifyPrimitive(e))
    })).join(n) : o + encodeURIComponent(stringifyPrimitive(e[t]))
  })).join(n) : t ? encodeURIComponent(stringifyPrimitive(t)) + r + encodeURIComponent(stringifyPrimitive(e)) : ""
};
export {e as q};
