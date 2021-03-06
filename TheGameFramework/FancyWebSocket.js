var e = {exports: {}}, t = function bind(e, t) {
  return function wrap() {
    for (var r = new Array(arguments.length), n = 0; n < r.length; n++) r[n] = arguments[n];
    return e.apply(t, r)
  }
}, r = t, n = Object.prototype.toString;

function isArray(e) {
  return "[object Array]" === n.call(e)
}

function isUndefined(e) {
  return void 0 === e
}

function isObject(e) {
  return null !== e && "object" == typeof e
}

function isPlainObject(e) {
  if ("[object Object]" !== n.call(e)) return !1;
  var t = Object.getPrototypeOf(e);
  return null === t || t === Object.prototype
}

function isFunction(e) {
  return "[object Function]" === n.call(e)
}

function forEach(e, t) {
  if (null != e) if ("object" != typeof e && (e = [e]), isArray(e)) for (var r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e); else for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
}

var o = {
  isArray, isArrayBuffer: function isArrayBuffer(e) {
    return "[object ArrayBuffer]" === n.call(e)
  }, isBuffer: function isBuffer(e) {
    return null !== e && !isUndefined(e) && null !== e.constructor && !isUndefined(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
  }, isFormData: function isFormData(e) {
    return "undefined" != typeof FormData && e instanceof FormData
  }, isArrayBufferView: function isArrayBufferView(e) {
    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
  }, isString: function isString(e) {
    return "string" == typeof e
  }, isNumber: function isNumber(e) {
    return "number" == typeof e
  }, isObject, isPlainObject, isUndefined, isDate: function isDate(e) {
    return "[object Date]" === n.call(e)
  }, isFile: function isFile(e) {
    return "[object File]" === n.call(e)
  }, isBlob: function isBlob(e) {
    return "[object Blob]" === n.call(e)
  }, isFunction, isStream: function isStream(e) {
    return isObject(e) && isFunction(e.pipe)
  }, isURLSearchParams: function isURLSearchParams(e) {
    return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
  }, isStandardBrowserEnv: function isStandardBrowserEnv() {
    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
  }, forEach, merge: function merge() {
    var e = {};

    function assignValue(t, r) {
      isPlainObject(e[r]) && isPlainObject(t) ? e[r] = merge(e[r], t) : isPlainObject(t) ? e[r] = merge({}, t) : isArray(t) ? e[r] = t.slice() : e[r] = t
    }

    for (var t = 0, r = arguments.length; t < r; t++) forEach(arguments[t], assignValue);
    return e
  }, extend: function extend(e, t, n) {
    return forEach(t, (function assignValue(t, o) {
      e[o] = n && "function" == typeof t ? r(t, n) : t
    })), e
  }, trim: function trim(e) {
    return e.replace(/^\s*/, "").replace(/\s*$/, "")
  }, stripBOM: function stripBOM(e) {
    return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
  }
}, a = o;

function encode(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

var i = function buildURL(e, t, r) {
  if (!t) return e;
  var n;
  if (r) n = r(t); else if (a.isURLSearchParams(t)) n = t.toString(); else {
    var o = [];
    a.forEach(t, (function serialize(e, t) {
      null != e && (a.isArray(e) ? t += "[]" : e = [e], a.forEach(e, (function parseValue(e) {
        a.isDate(e) ? e = e.toISOString() : a.isObject(e) && (e = JSON.stringify(e)), o.push(encode(t) + "=" + encode(e))
      })))
    })), n = o.join("&")
  }
  if (n) {
    var i = e.indexOf("#");
    -1 !== i && (e = e.slice(0, i)), e += (-1 === e.indexOf("?") ? "?" : "&") + n
  }
  return e
}, s = o;

function InterceptorManager$1() {
  this.handlers = []
}

InterceptorManager$1.prototype.use = function use(e, t) {
  return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length - 1
}, InterceptorManager$1.prototype.eject = function eject(e) {
  this.handlers[e] && (this.handlers[e] = null)
}, InterceptorManager$1.prototype.forEach = function forEach2(e) {
  s.forEach(this.handlers, (function forEachHandler(t) {
    null !== t && e(t)
  }))
};
var c = InterceptorManager$1, u = o, f = function isCancel(e) {
    return !(!e || !e.__CANCEL__)
  }, d = o, l = function enhanceError(e, t, r, n, o) {
    return e.config = t, r && (e.code = r), e.request = n, e.response = o, e.isAxiosError = !0, e.toJSON = function toJSON() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: this.config,
        code: this.code
      }
    }, e
  }, p = function createError(e, t, r, n, o) {
    var a = new Error(e);
    return l(a, t, r, n, o)
  }, h = p, m = o, g = m.isStandardBrowserEnv() ? function standardBrowserEnv() {
    return {
      write: function write(e, t, r, n, o, a) {
        var i = [];
        i.push(e + "=" + encodeURIComponent(t)), m.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), m.isString(n) && i.push("path=" + n), m.isString(o) && i.push("domain=" + o), !0 === a && i.push("secure"), document.cookie = i.join("; ")
      }, read: function read(e) {
        var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
        return t ? decodeURIComponent(t[3]) : null
      }, remove: function remove(e) {
        this.write(e, "", Date.now() - 864e5)
      }
    }
  }() : {
    write: function write() {
    }, read: function read() {
      return null
    }, remove: function remove() {
    }
  }, y = function isAbsoluteURL(e) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
  }, v = function combineURLs(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
  }, w = o,
  b = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],
  E = o, C = E.isStandardBrowserEnv() ? function standardBrowserEnv2() {
    var e, t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");

    function resolveURL(e) {
      var n = e;
      return t && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), {
        href: r.href,
        protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
        host: r.host,
        search: r.search ? r.search.replace(/^\?/, "") : "",
        hash: r.hash ? r.hash.replace(/^#/, "") : "",
        hostname: r.hostname,
        port: r.port,
        pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname
      }
    }

    return e = resolveURL(window.location.href), function isURLSameOrigin2(t) {
      var r = E.isString(t) ? resolveURL(t) : t;
      return r.protocol === e.protocol && r.host === e.host
    }
  }() : function isURLSameOrigin2() {
    return !0
  }, R = o, x = function settle(e, t, r) {
    var n = r.config.validateStatus;
    r.status && n && !n(r.status) ? t(h("Request failed with status code " + r.status, r.config, null, r.request, r)) : e(r)
  }, A = g, O = i, S = function buildFullPath(e, t) {
    return e && !y(t) ? v(e, t) : t
  }, j = function parseHeaders(e) {
    var t, r, n, o = {};
    return e ? (w.forEach(e.split("\n"), (function parser(e) {
      if (n = e.indexOf(":"), t = w.trim(e.substr(0, n)).toLowerCase(), r = w.trim(e.substr(n + 1)), t) {
        if (o[t] && b.indexOf(t) >= 0) return;
        o[t] = "set-cookie" === t ? (o[t] ? o[t] : []).concat([r]) : o[t] ? o[t] + ", " + r : r
      }
    })), o) : o
  }, U = C, T = p, N = function xhrAdapter(e) {
    return new Promise((function dispatchXhrRequest(t, r) {
      var n = e.data, o = e.headers;
      R.isFormData(n) && delete o["Content-Type"];
      var a = new XMLHttpRequest;
      if (e.auth) {
        var i = e.auth.username || "", s = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
        o.Authorization = "Basic " + btoa(i + ":" + s)
      }
      var c = S(e.baseURL, e.url);
      if (a.open(e.method.toUpperCase(), O(c, e.params, e.paramsSerializer), !0), a.timeout = e.timeout, a.onreadystatechange = function handleLoad() {
        if (a && 4 === a.readyState && (0 !== a.status || a.responseURL && 0 === a.responseURL.indexOf("file:"))) {
          var n = "getAllResponseHeaders" in a ? j(a.getAllResponseHeaders()) : null, o = {
            data: e.responseType && "text" !== e.responseType ? a.response : a.responseText,
            status: a.status,
            statusText: a.statusText,
            headers: n,
            config: e,
            request: a
          };
          x(t, r, o), a = null
        }
      }, a.onabort = function handleAbort() {
        a && (r(T("Request aborted", e, "ECONNABORTED", a)), a = null)
      }, a.onerror = function handleError() {
        r(T("Network Error", e, null, a)), a = null
      }, a.ontimeout = function handleTimeout() {
        var t = "timeout of " + e.timeout + "ms exceeded";
        e.timeoutErrorMessage && (t = e.timeoutErrorMessage), r(T(t, e, "ECONNABORTED", a)), a = null
      }, R.isStandardBrowserEnv()) {
        var u = (e.withCredentials || U(c)) && e.xsrfCookieName ? A.read(e.xsrfCookieName) : void 0;
        u && (o[e.xsrfHeaderName] = u)
      }
      if ("setRequestHeader" in a && R.forEach(o, (function setRequestHeader(e, t) {
        void 0 === n && "content-type" === t.toLowerCase() ? delete o[t] : a.setRequestHeader(t, e)
      })), R.isUndefined(e.withCredentials) || (a.withCredentials = !!e.withCredentials), e.responseType) try {
        a.responseType = e.responseType
      } catch (f) {
        if ("json" !== e.responseType) throw f
      }
      "function" == typeof e.onDownloadProgress && a.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && a.upload && a.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((function onCanceled(e) {
        a && (a.abort(), r(e), a = null)
      })), n || (n = null), a.send(n)
    }))
  }, B = o, L = function normalizeHeaderName(e, t) {
    d.forEach(e, (function processHeader(r, n) {
      n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r, delete e[n])
    }))
  }, P = {"Content-Type": "application/x-www-form-urlencoded"};

function setContentTypeIfUnset(e, t) {
  !B.isUndefined(e) && B.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
}

var q = {
  adapter: function getDefaultAdapter() {
    var e;
    return ("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (e = N), e
  }(),
  transformRequest: [function transformRequest(e, t) {
    return L(t, "Accept"), L(t, "Content-Type"), B.isFormData(e) || B.isArrayBuffer(e) || B.isBuffer(e) || B.isStream(e) || B.isFile(e) || B.isBlob(e) ? e : B.isArrayBufferView(e) ? e.buffer : B.isURLSearchParams(e) ? (setContentTypeIfUnset(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : B.isObject(e) ? (setContentTypeIfUnset(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
  }],
  transformResponse: [function transformResponse(e) {
    if ("string" == typeof e) try {
      e = JSON.parse(e)
    } catch (t) {
    }
    return e
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(e) {
    return e >= 200 && e < 300
  },
  headers: {common: {Accept: "application/json, text/plain, */*"}}
};
B.forEach(["delete", "get", "head"], (function forEachMethodNoData(e) {
  q.headers[e] = {}
})), B.forEach(["post", "put", "patch"], (function forEachMethodWithData(e) {
  q.headers[e] = B.merge(P)
}));
var D = q, k = o, I = function transformData(e, t, r) {
  return u.forEach(r, (function transform(r) {
    e = r(e, t)
  })), e
}, M = f, F = D;

function throwIfCancellationRequested(e) {
  e.cancelToken && e.cancelToken.throwIfRequested()
}

var $ = o, V = function mergeConfig(e, t) {
  t = t || {};
  var r = {}, n = ["url", "method", "data"], o = ["headers", "auth", "proxy", "params"],
    a = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
    i = ["validateStatus"];

  function getMergedValue(e, t) {
    return $.isPlainObject(e) && $.isPlainObject(t) ? $.merge(e, t) : $.isPlainObject(t) ? $.merge({}, t) : $.isArray(t) ? t.slice() : t
  }

  function mergeDeepProperties(n) {
    $.isUndefined(t[n]) ? $.isUndefined(e[n]) || (r[n] = getMergedValue(void 0, e[n])) : r[n] = getMergedValue(e[n], t[n])
  }

  $.forEach(n, (function valueFromConfig2(e) {
    $.isUndefined(t[e]) || (r[e] = getMergedValue(void 0, t[e]))
  })), $.forEach(o, mergeDeepProperties), $.forEach(a, (function defaultToConfig2(n) {
    $.isUndefined(t[n]) ? $.isUndefined(e[n]) || (r[n] = getMergedValue(void 0, e[n])) : r[n] = getMergedValue(void 0, t[n])
  })), $.forEach(i, (function merge2(n) {
    n in t ? r[n] = getMergedValue(e[n], t[n]) : n in e && (r[n] = getMergedValue(void 0, e[n]))
  }));
  var s = n.concat(o).concat(a).concat(i),
    c = Object.keys(e).concat(Object.keys(t)).filter((function filterAxiosKeys(e) {
      return -1 === s.indexOf(e)
    }));
  return $.forEach(c, mergeDeepProperties), r
}, H = o, z = i, _ = c, X = function dispatchRequest(e) {
  return throwIfCancellationRequested(e), e.headers = e.headers || {}, e.data = I(e.data, e.headers, e.transformRequest), e.headers = k.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), k.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function cleanHeaderConfig(t) {
    delete e.headers[t]
  })), (e.adapter || F.adapter)(e).then((function onAdapterResolution(t) {
    return throwIfCancellationRequested(e), t.data = I(t.data, t.headers, e.transformResponse), t
  }), (function onAdapterRejection(t) {
    return M(t) || (throwIfCancellationRequested(e), t && t.response && (t.response.data = I(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
  }))
}, J = V;

function Axios$1(e) {
  this.defaults = e, this.interceptors = {request: new _, response: new _}
}

Axios$1.prototype.request = function request(e) {
  "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = J(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
  var t = [X, void 0], r = Promise.resolve(e);
  for (this.interceptors.request.forEach((function unshiftRequestInterceptors(e) {
    t.unshift(e.fulfilled, e.rejected)
  })), this.interceptors.response.forEach((function pushResponseInterceptors(e) {
    t.push(e.fulfilled, e.rejected)
  })); t.length;) r = r.then(t.shift(), t.shift());
  return r
}, Axios$1.prototype.getUri = function getUri(e) {
  return e = J(this.defaults, e), z(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
}, H.forEach(["delete", "get", "head", "options"], (function forEachMethodNoData2(e) {
  Axios$1.prototype[e] = function (t, r) {
    return this.request(J(r || {}, {method: e, url: t, data: (r || {}).data}))
  }
})), H.forEach(["post", "put", "patch"], (function forEachMethodWithData2(e) {
  Axios$1.prototype[e] = function (t, r, n) {
    return this.request(J(n || {}, {method: e, url: t, data: r}))
  }
}));
var K = Axios$1;

function Cancel$1(e) {
  this.message = e
}

Cancel$1.prototype.toString = function toString2() {
  return "Cancel" + (this.message ? ": " + this.message : "")
}, Cancel$1.prototype.__CANCEL__ = !0;
var W = Cancel$1, G = W;

function CancelToken(e) {
  if ("function" != typeof e) throw new TypeError("executor must be a function.");
  var t;
  this.promise = new Promise((function promiseExecutor(e) {
    t = e
  }));
  var r = this;
  e((function cancel(e) {
    r.reason || (r.reason = new G(e), t(r.reason))
  }))
}

CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) throw this.reason
}, CancelToken.source = function source() {
  var e;
  return {
    token: new CancelToken((function executor(t) {
      e = t
    })), cancel: e
  }
};
var Q = CancelToken, Y = o, Z = t, ee = K, te = V;

function createInstance(e) {
  var t = new ee(e), r = Z(ee.prototype.request, t);
  return Y.extend(r, ee.prototype, t), Y.extend(r, t), r
}

var re = createInstance(D);
re.Axios = ee, re.create = function create(e) {
  return createInstance(te(re.defaults, e))
}, re.Cancel = W, re.CancelToken = Q, re.isCancel = f, re.all = function all(e) {
  return Promise.all(e)
}, re.spread = function spread2(e) {
  return function wrap(t) {
    return e.apply(null, t)
  }
}, re.isAxiosError = function isAxiosError2(e) {
  return "object" == typeof e && !0 === e.isAxiosError
}, e.exports = re, e.exports.default = re;
var ne = e.exports;
export {ne as a};
