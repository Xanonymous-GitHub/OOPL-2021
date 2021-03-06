import {c as o} from "./loadFramework.js";

var e, r, n = {exports: {}};
e = n, r = n.exports, function (n) {
  var t = r && !r.nodeType && r, c = e && !e.nodeType && e, i = "object" == typeof o && o;
  i.global !== i && i.window !== i && i.self !== i || (n = i);
  var u, a, d = 2147483647, s = 36, f = /^xn--/, p = /[^\x20-\x7E]/, l = /[\x2E\u3002\uFF0E\uFF61]/g, h = {
    overflow: "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
  }, v = Math.floor, g = String.fromCharCode;

  function error(o) {
    throw RangeError(h[o])
  }

  function map(o, e) {
    for (var r = o.length, n = []; r--;) n[r] = e(o[r]);
    return n
  }

  function mapDomain(o, e) {
    var r = o.split("@"), n = "";
    return r.length > 1 && (n = r[0] + "@", o = r[1]), n + map((o = o.replace(l, ".")).split("."), e).join(".")
  }

  function ucs2decode(o) {
    for (var e, r, n = [], t = 0, c = o.length; t < c;) (e = o.charCodeAt(t++)) >= 55296 && e <= 56319 && t < c ? 56320 == (64512 & (r = o.charCodeAt(t++))) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), t--) : n.push(e);
    return n
  }

  function ucs2encode(o) {
    return map(o, (function (o) {
      var e = "";
      return o > 65535 && (e += g((o -= 65536) >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), e += g(o)
    })).join("")
  }

  function digitToBasic(o, e) {
    return o + 22 + 75 * (o < 26) - ((0 != e) << 5)
  }

  function adapt(o, e, r) {
    var n = 0;
    for (o = r ? v(o / 700) : o >> 1, o += v(o / e); o > 455; n += s) o = v(o / 35);
    return v(n + 36 * o / (o + 38))
  }

  function decode(o) {
    var e, r, n, t, c, i, u, a, f, p, l, h = [], g = o.length, m = 0, w = 128, x = 72;
    for ((r = o.lastIndexOf("-")) < 0 && (r = 0), n = 0; n < r; ++n) o.charCodeAt(n) >= 128 && error("not-basic"), h.push(o.charCodeAt(n));
    for (t = r > 0 ? r + 1 : 0; t < g;) {
      for (c = m, i = 1, u = s; t >= g && error("invalid-input"), ((a = (l = o.charCodeAt(t++)) - 48 < 10 ? l - 22 : l - 65 < 26 ? l - 65 : l - 97 < 26 ? l - 97 : s) >= s || a > v((d - m) / i)) && error("overflow"), m += a * i, !(a < (f = u <= x ? 1 : u >= x + 26 ? 26 : u - x)); u += s) i > v(d / (p = s - f)) && error("overflow"), i *= p;
      x = adapt(m - c, e = h.length + 1, 0 == c), v(m / e) > d - w && error("overflow"), w += v(m / e), m %= e, h.splice(m++, 0, w)
    }
    return ucs2encode(h)
  }

  function encode(o) {
    var e, r, n, t, c, i, u, a, f, p, l, h, m, w, x, C = [];
    for (h = (o = ucs2decode(o)).length, e = 128, r = 0, c = 72, i = 0; i < h; ++i) (l = o[i]) < 128 && C.push(g(l));
    for (n = t = C.length, t && C.push("-"); n < h;) {
      for (u = d, i = 0; i < h; ++i) (l = o[i]) >= e && l < u && (u = l);
      for (u - e > v((d - r) / (m = n + 1)) && error("overflow"), r += (u - e) * m, e = u, i = 0; i < h; ++i) if ((l = o[i]) < e && ++r > d && error("overflow"), l == e) {
        for (a = r, f = s; !(a < (p = f <= c ? 1 : f >= c + 26 ? 26 : f - c)); f += s) x = a - p, w = s - p, C.push(g(digitToBasic(p + x % w, 0))), a = v(x / w);
        C.push(g(digitToBasic(a, 0))), c = adapt(r, m, n == t), r = 0, ++n
      }
      ++r, ++e
    }
    return C.join("")
  }

  if (u = {
    version: "1.3.2",
    ucs2: {decode: ucs2decode, encode: ucs2encode},
    decode,
    encode,
    toASCII: function toASCII(o) {
      return mapDomain(o, (function (o) {
        return p.test(o) ? "xn--" + encode(o) : o
      }))
    },
    toUnicode: function toUnicode(o) {
      return mapDomain(o, (function (o) {
        return f.test(o) ? decode(o.slice(4).toLowerCase()) : o
      }))
    }
  }, t && c) if (e.exports == t) c.exports = u; else for (a in u) u.hasOwnProperty(a) && (t[a] = u[a]); else n.punycode = u
}(o);
export {n as p};
