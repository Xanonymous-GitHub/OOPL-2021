var r = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, e = Object.prototype.propertyIsEnumerable;

function toObject(r) {
  if (null == r) throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(r)
}

var n = function shouldUseNative() {
  try {
    if (!Object.assign) return !1;
    var r = new String("abc");
    if (r[5] = "de", "5" === Object.getOwnPropertyNames(r)[0]) return !1;
    for (var t = {}, e = 0; e < 10; e++) t["_" + String.fromCharCode(e)] = e;
    if ("0123456789" !== Object.getOwnPropertyNames(t).map((function (r) {
      return t[r]
    })).join("")) return !1;
    var n = {};
    return "abcdefghijklmnopqrst".split("").forEach((function (r) {
      n[r] = r
    })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
  } catch (o) {
    return !1
  }
}() ? Object.assign : function (n, o) {
  for (var a, c, i = toObject(n), b = 1; b < arguments.length; b++) {
    for (var s in a = Object(arguments[b])) t.call(a, s) && (i[s] = a[s]);
    if (r) {
      c = r(a);
      for (var f = 0; f < c.length; f++) e.call(a, c[f]) && (i[c[f]] = a[c[f]])
    }
  }
  return i
};
export {n as o};
