import {p as t} from "./Box2dWeb-2.1.a.3.js";
import {q as s} from "./Record.js";

var h = t.exports, e = {
  isString: function (t) {
    return "string" == typeof t
  }, isObject: function (t) {
    return "object" == typeof t && null !== t
  }, isNull: function (t) {
    return null === t
  }, isNullOrUndefined: function (t) {
    return null == t
  }
}, r = urlParse, a = function urlResolve(t, s) {
  return urlParse(t, !1, !0).resolve(s)
}, o = function urlFormat(t) {
  e.isString(t) && (t = urlParse(t));
  return t instanceof Url ? t.format() : Url.prototype.format.call(t)
};

function Url() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
}

var n = /^([a-z0-9.+-]+:)/i, i = /:[0-9]*$/, l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
  p = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]), u = ["'"].concat(p),
  c = ["%", "/", "?", ";", "#"].concat(u), f = ["/", "?", "#"], m = /^[+a-z0-9A-Z_-]{0,63}$/,
  v = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, g = {javascript: !0, "javascript:": !0}, y = {javascript: !0, "javascript:": !0},
  b = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  }, d = s;

function urlParse(t, s, h) {
  if (t && e.isObject(t) && t instanceof Url) return t;
  var r = new Url;
  return r.parse(t, s, h), r
}

Url.prototype.parse = function (t, s, r) {
  if (!e.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
  var a = t.indexOf("?"), o = -1 !== a && a < t.indexOf("#") ? "?" : "#", i = t.split(o);
  i[0] = i[0].replace(/\\/g, "/");
  var p = t = i.join(o);
  if (p = p.trim(), !r && 1 === t.split("#").length) {
    var j = l.exec(p);
    if (j) return this.path = p, this.href = p, this.pathname = j[1], j[2] ? (this.search = j[2], this.query = s ? d.parse(this.search.substr(1)) : this.search.substr(1)) : s && (this.search = "", this.query = {}), this
  }
  var O = n.exec(p);
  if (O) {
    var q = (O = O[0]).toLowerCase();
    this.protocol = q, p = p.substr(O.length)
  }
  if (r || O || p.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var x = "//" === p.substr(0, 2);
    !x || O && y[O] || (p = p.substr(2), this.slashes = !0)
  }
  if (!y[O] && (x || O && !b[O])) {
    for (var U, A, C = -1, I = 0; I < f.length; I++) {
      -1 !== (w = p.indexOf(f[I])) && (-1 === C || w < C) && (C = w)
    }
    -1 !== (A = -1 === C ? p.lastIndexOf("@") : p.lastIndexOf("@", C)) && (U = p.slice(0, A), p = p.slice(A + 1), this.auth = decodeURIComponent(U)), C = -1;
    for (I = 0; I < c.length; I++) {
      var w;
      -1 !== (w = p.indexOf(c[I])) && (-1 === C || w < C) && (C = w)
    }
    -1 === C && (C = p.length), this.host = p.slice(0, C), p = p.slice(C), this.parseHost(), this.hostname = this.hostname || "";
    var N = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
    if (!N) for (var P = this.hostname.split(/\./), k = (I = 0, P.length); I < k; I++) {
      var R = P[I];
      if (R && !R.match(m)) {
        for (var S = "", $ = 0, z = R.length; $ < z; $++) R.charCodeAt($) > 127 ? S += "x" : S += R[$];
        if (!S.match(m)) {
          var H = P.slice(0, I), L = P.slice(I + 1), Z = R.match(v);
          Z && (H.push(Z[1]), L.unshift(Z[2])), L.length && (p = "/" + L.join(".") + p), this.hostname = H.join(".");
          break
        }
      }
    }
    this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), N || (this.hostname = h.toASCII(this.hostname));
    var _ = this.port ? ":" + this.port : "", E = this.hostname || "";
    this.host = E + _, this.href += this.host, N && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== p[0] && (p = "/" + p))
  }
  if (!g[q]) for (I = 0, k = u.length; I < k; I++) {
    var F = u[I];
    if (-1 !== p.indexOf(F)) {
      var T = encodeURIComponent(F);
      T === F && (T = escape(F)), p = p.split(F).join(T)
    }
  }
  var B = p.indexOf("#");
  -1 !== B && (this.hash = p.substr(B), p = p.slice(0, B));
  var D = p.indexOf("?");
  if (-1 !== D ? (this.search = p.substr(D), this.query = p.substr(D + 1), s && (this.query = d.parse(this.query)), p = p.slice(0, D)) : s && (this.search = "", this.query = {}), p && (this.pathname = p), b[q] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    _ = this.pathname || "";
    var G = this.search || "";
    this.path = _ + G
  }
  return this.href = this.format(), this
}, Url.prototype.format = function () {
  var t = this.auth || "";
  t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
  var s = this.protocol || "", h = this.pathname || "", r = this.hash || "", a = !1, o = "";
  this.host ? a = t + this.host : this.hostname && (a = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && e.isObject(this.query) && Object.keys(this.query).length && (o = d.stringify(this.query));
  var n = this.search || o && "?" + o || "";
  return s && ":" !== s.substr(-1) && (s += ":"), this.slashes || (!s || b[s]) && !1 !== a ? (a = "//" + (a || ""), h && "/" !== h.charAt(0) && (h = "/" + h)) : a || (a = ""), r && "#" !== r.charAt(0) && (r = "#" + r), n && "?" !== n.charAt(0) && (n = "?" + n), s + a + (h = h.replace(/[?#]/g, (function (t) {
    return encodeURIComponent(t)
  }))) + (n = n.replace("#", "%23")) + r
}, Url.prototype.resolve = function (t) {
  return this.resolveObject(urlParse(t, !1, !0)).format()
}, Url.prototype.resolveObject = function (t) {
  if (e.isString(t)) {
    var s = new Url;
    s.parse(t, !1, !0), t = s
  }
  for (var h = new Url, r = Object.keys(this), a = 0; a < r.length; a++) {
    var o = r[a];
    h[o] = this[o]
  }
  if (h.hash = t.hash, "" === t.href) return h.href = h.format(), h;
  if (t.slashes && !t.protocol) {
    for (var n = Object.keys(t), i = 0; i < n.length; i++) {
      var l = n[i];
      "protocol" !== l && (h[l] = t[l])
    }
    return b[h.protocol] && h.hostname && !h.pathname && (h.path = h.pathname = "/"), h.href = h.format(), h
  }
  if (t.protocol && t.protocol !== h.protocol) {
    if (!b[t.protocol]) {
      for (var p = Object.keys(t), u = 0; u < p.length; u++) {
        var c = p[u];
        h[c] = t[c]
      }
      return h.href = h.format(), h
    }
    if (h.protocol = t.protocol, t.host || y[t.protocol]) h.pathname = t.pathname; else {
      for (var f = (t.pathname || "").split("/"); f.length && !(t.host = f.shift());) ;
      t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== f[0] && f.unshift(""), f.length < 2 && f.unshift(""), h.pathname = f.join("/")
    }
    if (h.search = t.search, h.query = t.query, h.host = t.host || "", h.auth = t.auth, h.hostname = t.hostname || t.host, h.port = t.port, h.pathname || h.search) {
      var m = h.pathname || "", v = h.search || "";
      h.path = m + v
    }
    return h.slashes = h.slashes || t.slashes, h.href = h.format(), h
  }
  var g = h.pathname && "/" === h.pathname.charAt(0), d = t.host || t.pathname && "/" === t.pathname.charAt(0),
    j = d || g || h.host && t.pathname, O = j, q = h.pathname && h.pathname.split("/") || [],
    x = (f = t.pathname && t.pathname.split("/") || [], h.protocol && !b[h.protocol]);
  if (x && (h.hostname = "", h.port = null, h.host && ("" === q[0] ? q[0] = h.host : q.unshift(h.host)), h.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === f[0] ? f[0] = t.host : f.unshift(t.host)), t.host = null), j = j && ("" === f[0] || "" === q[0])), d) h.host = t.host || "" === t.host ? t.host : h.host, h.hostname = t.hostname || "" === t.hostname ? t.hostname : h.hostname, h.search = t.search, h.query = t.query, q = f; else if (f.length) q || (q = []), q.pop(), q = q.concat(f), h.search = t.search, h.query = t.query; else if (!e.isNullOrUndefined(t.search)) {
    if (x) h.hostname = h.host = q.shift(), (w = !!(h.host && h.host.indexOf("@") > 0) && h.host.split("@")) && (h.auth = w.shift(), h.host = h.hostname = w.shift());
    return h.search = t.search, h.query = t.query, e.isNull(h.pathname) && e.isNull(h.search) || (h.path = (h.pathname ? h.pathname : "") + (h.search ? h.search : "")), h.href = h.format(), h
  }
  if (!q.length) return h.pathname = null, h.search ? h.path = "/" + h.search : h.path = null, h.href = h.format(), h;
  for (var U = q.slice(-1)[0], A = (h.host || t.host || q.length > 1) && ("." === U || ".." === U) || "" === U, C = 0, I = q.length; I >= 0; I--) "." === (U = q[I]) ? q.splice(I, 1) : ".." === U ? (q.splice(I, 1), C++) : C && (q.splice(I, 1), C--);
  if (!j && !O) for (; C--; C) q.unshift("..");
  !j || "" === q[0] || q[0] && "/" === q[0].charAt(0) || q.unshift(""), A && "/" !== q.join("/").substr(-1) && q.push("");
  var w, N = "" === q[0] || q[0] && "/" === q[0].charAt(0);
  x && (h.hostname = h.host = N ? "" : q.length ? q.shift() : "", (w = !!(h.host && h.host.indexOf("@") > 0) && h.host.split("@")) && (h.auth = w.shift(), h.host = h.hostname = w.shift()));
  return (j = j || h.host && q.length) && !N && q.unshift(""), q.length ? h.pathname = q.join("/") : (h.pathname = null, h.path = null), e.isNull(h.pathname) && e.isNull(h.search) || (h.path = (h.pathname ? h.pathname : "") + (h.search ? h.search : "")), h.auth = t.auth || h.auth, h.slashes = h.slashes || t.slashes, h.href = h.format(), h
}, Url.prototype.parseHost = function () {
  var t = this.host, s = i.exec(t);
  s && (":" !== (s = s[0]) && (this.port = s.substr(1)), t = t.substr(0, t.length - s.length)), t && (this.hostname = t)
};
export {o as f, r as p, a as r};
