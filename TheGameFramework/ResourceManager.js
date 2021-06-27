import {p as e} from "./DebugInfo.js";
import {M as t} from "./polygonComponent.js";
import {a as r} from "./FancyWebSocket.js";

function _noop() {
}

function eachSeries(e, t, r, s) {
  var n = 0, i = e.length;
  !function next(o) {
    o || n === i ? r && r(o) : s ? setTimeout((function () {
      t(e[n++], next)
    }), 1) : t(e[n++], next)
  }()
}

function onlyOnce(e) {
  return function onceWrapper() {
    if (null === e) throw new Error("Callback was already called.");
    var t = e;
    e = null, t.apply(this, arguments)
  }
}

var s = {};

function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var s = t[r];
    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
  }
}

function _createClass(e, t, r) {
  return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
}

var n = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest), i = null;

function _noop$1() {
}

var o = function () {
  function Resource2(e, r, s) {
    if ("string" != typeof e || "string" != typeof r) throw new Error("Both name and url are required for constructing a resource.");
    s = s || {}, this._flags = 0, this._setFlag(Resource2.STATUS_FLAGS.DATA_URL, 0 === r.indexOf("data:")), this.name = e, this.url = r, this.extension = this._getExtension(), this.data = null, this.crossOrigin = !0 === s.crossOrigin ? "anonymous" : s.crossOrigin, this.timeout = s.timeout || 0, this.loadType = s.loadType || this._determineLoadType(), this.xhrType = s.xhrType, this.metadata = s.metadata || {}, this.error = null, this.xhr = null, this.children = [], this.type = Resource2.TYPE.UNKNOWN, this.progressChunk = 0, this._dequeue = _noop$1, this._onLoadBinding = null, this._elementTimer = 0, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundOnTimeout = this._onTimeout.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnTimeout = this._xhrOnTimeout.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this.onStart = new t, this.onProgress = new t, this.onComplete = new t, this.onAfterMiddleware = new t
  }

  Resource2.setExtensionLoadType = function setExtensionLoadType(e, t) {
    setExtMap(Resource2._loadTypeMap, e, t)
  }, Resource2.setExtensionXhrType = function setExtensionXhrType(e, t) {
    setExtMap(Resource2._xhrTypeMap, e, t)
  };
  var r = Resource2.prototype;
  return r.complete = function complete() {
    this._clearEvents(), this._finish()
  }, r.abort = function abort(e) {
    if (!this.error) {
      if (this.error = new Error(e), this._clearEvents(), this.xhr) this.xhr.abort(); else if (this.xdr) this.xdr.abort(); else if (this.data) if (this.data.src) this.data.src = Resource2.EMPTY_GIF; else for (; this.data.firstChild;) this.data.removeChild(this.data.firstChild);
      this._finish()
    }
  }, r.load = function load(e) {
    var t = this;
    if (!this.isLoading) if (this.isComplete) e && setTimeout((function () {
      return e(t)
    }), 1); else switch (e && this.onComplete.once(e), this._setFlag(Resource2.STATUS_FLAGS.LOADING, !0), this.onStart.dispatch(this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
      case Resource2.LOAD_TYPE.IMAGE:
        this.type = Resource2.TYPE.IMAGE, this._loadElement("image");
        break;
      case Resource2.LOAD_TYPE.AUDIO:
        this.type = Resource2.TYPE.AUDIO, this._loadSourceElement("audio");
        break;
      case Resource2.LOAD_TYPE.VIDEO:
        this.type = Resource2.TYPE.VIDEO, this._loadSourceElement("video");
        break;
      case Resource2.LOAD_TYPE.XHR:
      default:
        n && this.crossOrigin ? this._loadXdr() : this._loadXhr()
    }
  }, r._hasFlag = function _hasFlag(e) {
    return 0 != (this._flags & e)
  }, r._setFlag = function _setFlag(e, t) {
    this._flags = t ? this._flags | e : this._flags & ~e
  }, r._clearEvents = function _clearEvents() {
    clearTimeout(this._elementTimer), this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("timeout", this._boundXhrOnTimeout, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null))
  }, r._finish = function _finish() {
    if (this.isComplete) throw new Error("Complete called again for an already completed resource.");
    this._setFlag(Resource2.STATUS_FLAGS.COMPLETE, !0), this._setFlag(Resource2.STATUS_FLAGS.LOADING, !1), this.onComplete.dispatch(this)
  }, r._loadElement = function _loadElement(e) {
    this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === e && void 0 !== window.Image ? this.data = new Image : this.data = document.createElement(e), this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.metadata.skipSource || (this.data.src = this.url), this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
  }, r._loadSourceElement = function _loadSourceElement(e) {
    if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === e && void 0 !== window.Audio ? this.data = new Audio : this.data = document.createElement(e), null !== this.data) {
      if (this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), !this.metadata.skipSource) if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url; else if (Array.isArray(this.url)) for (var t = this.metadata.mimeType, r = 0; r < this.url.length; ++r) this.data.appendChild(this._createSource(e, this.url[r], Array.isArray(t) ? t[r] : t)); else {
        var s = this.metadata.mimeType;
        this.data.appendChild(this._createSource(e, this.url, Array.isArray(s) ? s[0] : s))
      }
      this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load(), this.timeout && (this._elementTimer = setTimeout(this._boundOnTimeout, this.timeout))
    } else this.abort("Unsupported element: " + e)
  }, r._loadXhr = function _loadXhr() {
    "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
    var e = this.xhr = new XMLHttpRequest;
    e.open("GET", this.url, !0), e.timeout = this.timeout, this.xhrType === Resource2.XHR_RESPONSE_TYPE.JSON || this.xhrType === Resource2.XHR_RESPONSE_TYPE.DOCUMENT ? e.responseType = Resource2.XHR_RESPONSE_TYPE.TEXT : e.responseType = this.xhrType, e.addEventListener("error", this._boundXhrOnError, !1), e.addEventListener("timeout", this._boundXhrOnTimeout, !1), e.addEventListener("abort", this._boundXhrOnAbort, !1), e.addEventListener("progress", this._boundOnProgress, !1), e.addEventListener("load", this._boundXhrOnLoad, !1), e.send()
  }, r._loadXdr = function _loadXdr() {
    "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
    var e = this.xhr = new XDomainRequest;
    e.timeout = this.timeout || 5e3, e.onerror = this._boundXhrOnError, e.ontimeout = this._boundXhrOnTimeout, e.onprogress = this._boundOnProgress, e.onload = this._boundXhrOnLoad, e.open("GET", this.url, !0), setTimeout((function () {
      return e.send()
    }), 1)
  }, r._createSource = function _createSource(e, t, r) {
    r || (r = e + "/" + this._getExtension(t));
    var s = document.createElement("source");
    return s.src = t, s.type = r, s
  }, r._onError = function _onError(e) {
    this.abort("Failed to load element using: " + e.target.nodeName)
  }, r._onProgress = function _onProgress(e) {
    e && e.lengthComputable && this.onProgress.dispatch(this, e.loaded / e.total)
  }, r._onTimeout = function _onTimeout() {
    this.abort("Load timed out.")
  }, r._xhrOnError = function _xhrOnError() {
    var e = this.xhr;
    this.abort(reqType(e) + " Request failed. Status: " + e.status + ', text: "' + e.statusText + '"')
  }, r._xhrOnTimeout = function _xhrOnTimeout() {
    var e = this.xhr;
    this.abort(reqType(e) + " Request timed out.")
  }, r._xhrOnAbort = function _xhrOnAbort() {
    var e = this.xhr;
    this.abort(reqType(e) + " Request was aborted by the user.")
  }, r._xhrOnLoad = function _xhrOnLoad() {
    var e = this.xhr, t = "", r = void 0 === e.status ? 200 : e.status;
    if ("" !== e.responseType && "text" !== e.responseType && void 0 !== e.responseType || (t = e.responseText), 0 === r && (t.length > 0 || e.responseType === Resource2.XHR_RESPONSE_TYPE.BUFFER) ? r = 200 : 1223 === r && (r = 204), 2 === (r / 100 | 0)) {
      if (this.xhrType === Resource2.XHR_RESPONSE_TYPE.TEXT) this.data = t, this.type = Resource2.TYPE.TEXT; else if (this.xhrType === Resource2.XHR_RESPONSE_TYPE.JSON) try {
        this.data = JSON.parse(t), this.type = Resource2.TYPE.JSON
      } catch (i) {
        return void this.abort("Error trying to parse loaded json: " + i)
      } else if (this.xhrType === Resource2.XHR_RESPONSE_TYPE.DOCUMENT) try {
        if (window.DOMParser) {
          var s = new DOMParser;
          this.data = s.parseFromString(t, "text/xml")
        } else {
          var n = document.createElement("div");
          n.innerHTML = t, this.data = n
        }
        this.type = Resource2.TYPE.XML
      } catch (i) {
        return void this.abort("Error trying to parse loaded xml: " + i)
      } else this.data = e.response || t;
      this.complete()
    } else this.abort("[" + e.status + "] " + e.statusText + ": " + e.responseURL)
  }, r._determineCrossOrigin = function _determineCrossOrigin(t, r) {
    if (0 === t.indexOf("data:")) return "";
    if (window.origin !== window.location.origin) return "anonymous";
    r = r || window.location, i || (i = document.createElement("a")), i.href = t;
    var s = !(t = e(i.href, {strictMode: !0})).port && "" === r.port || t.port === r.port,
      n = t.protocol ? t.protocol + ":" : "";
    return t.host === r.hostname && s && n === r.protocol ? "" : "anonymous"
  }, r._determineXhrType = function _determineXhrType() {
    return Resource2._xhrTypeMap[this.extension] || Resource2.XHR_RESPONSE_TYPE.TEXT
  }, r._determineLoadType = function _determineLoadType() {
    return Resource2._loadTypeMap[this.extension] || Resource2.LOAD_TYPE.XHR
  }, r._getExtension = function _getExtension() {
    var e = this.url, t = "";
    if (this.isDataUrl) {
      var r = e.indexOf("/");
      t = e.substring(r + 1, e.indexOf(";", r))
    } else {
      var s = e.indexOf("?"), n = e.indexOf("#"), i = Math.min(s > -1 ? s : e.length, n > -1 ? n : e.length);
      t = (e = e.substring(0, i)).substring(e.lastIndexOf(".") + 1)
    }
    return t.toLowerCase()
  }, r._getMimeFromXhrType = function _getMimeFromXhrType(e) {
    switch (e) {
      case Resource2.XHR_RESPONSE_TYPE.BUFFER:
        return "application/octet-binary";
      case Resource2.XHR_RESPONSE_TYPE.BLOB:
        return "application/blob";
      case Resource2.XHR_RESPONSE_TYPE.DOCUMENT:
        return "application/xml";
      case Resource2.XHR_RESPONSE_TYPE.JSON:
        return "application/json";
      case Resource2.XHR_RESPONSE_TYPE.DEFAULT:
      case Resource2.XHR_RESPONSE_TYPE.TEXT:
      default:
        return "text/plain"
    }
  }, _createClass(Resource2, [{
    key: "isDataUrl", get: function get() {
      return this._hasFlag(Resource2.STATUS_FLAGS.DATA_URL)
    }
  }, {
    key: "isComplete", get: function get() {
      return this._hasFlag(Resource2.STATUS_FLAGS.COMPLETE)
    }
  }, {
    key: "isLoading", get: function get() {
      return this._hasFlag(Resource2.STATUS_FLAGS.LOADING)
    }
  }]), Resource2
}();

function setExtMap(e, t, r) {
  t && 0 === t.indexOf(".") && (t = t.substring(1)), t && (e[t] = r)
}

function reqType(e) {
  return e.toString().replace("object ", "")
}

o.STATUS_FLAGS = {NONE: 0, DATA_URL: 1, COMPLETE: 2, LOADING: 4}, o.TYPE = {
  UNKNOWN: 0,
  JSON: 1,
  XML: 2,
  IMAGE: 3,
  AUDIO: 4,
  VIDEO: 5,
  TEXT: 6
}, o.LOAD_TYPE = {XHR: 1, IMAGE: 2, AUDIO: 3, VIDEO: 4}, o.XHR_RESPONSE_TYPE = {
  DEFAULT: "text",
  BUFFER: "arraybuffer",
  BLOB: "blob",
  DOCUMENT: "document",
  JSON: "json",
  TEXT: "text"
}, o._loadTypeMap = {
  gif: o.LOAD_TYPE.IMAGE,
  png: o.LOAD_TYPE.IMAGE,
  bmp: o.LOAD_TYPE.IMAGE,
  jpg: o.LOAD_TYPE.IMAGE,
  jpeg: o.LOAD_TYPE.IMAGE,
  tif: o.LOAD_TYPE.IMAGE,
  tiff: o.LOAD_TYPE.IMAGE,
  webp: o.LOAD_TYPE.IMAGE,
  tga: o.LOAD_TYPE.IMAGE,
  svg: o.LOAD_TYPE.IMAGE,
  "svg+xml": o.LOAD_TYPE.IMAGE,
  mp3: o.LOAD_TYPE.AUDIO,
  ogg: o.LOAD_TYPE.AUDIO,
  wav: o.LOAD_TYPE.AUDIO,
  mp4: o.LOAD_TYPE.VIDEO,
  webm: o.LOAD_TYPE.VIDEO
}, o._xhrTypeMap = {
  xhtml: o.XHR_RESPONSE_TYPE.DOCUMENT,
  html: o.XHR_RESPONSE_TYPE.DOCUMENT,
  htm: o.XHR_RESPONSE_TYPE.DOCUMENT,
  xml: o.XHR_RESPONSE_TYPE.DOCUMENT,
  tmx: o.XHR_RESPONSE_TYPE.DOCUMENT,
  svg: o.XHR_RESPONSE_TYPE.DOCUMENT,
  tsx: o.XHR_RESPONSE_TYPE.DOCUMENT,
  gif: o.XHR_RESPONSE_TYPE.BLOB,
  png: o.XHR_RESPONSE_TYPE.BLOB,
  bmp: o.XHR_RESPONSE_TYPE.BLOB,
  jpg: o.XHR_RESPONSE_TYPE.BLOB,
  jpeg: o.XHR_RESPONSE_TYPE.BLOB,
  tif: o.XHR_RESPONSE_TYPE.BLOB,
  tiff: o.XHR_RESPONSE_TYPE.BLOB,
  webp: o.XHR_RESPONSE_TYPE.BLOB,
  tga: o.XHR_RESPONSE_TYPE.BLOB,
  json: o.XHR_RESPONSE_TYPE.JSON,
  text: o.XHR_RESPONSE_TYPE.TEXT,
  txt: o.XHR_RESPONSE_TYPE.TEXT,
  ttf: o.XHR_RESPONSE_TYPE.BUFFER,
  otf: o.XHR_RESPONSE_TYPE.BUFFER
}, o.EMPTY_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
var a = window.URL || window.webkitURL;
var h, u, d = {
  caching: function caching(e, t) {
    var r = this;
    s[e.url] ? (e.data = s[e.url], e.complete()) : e.onComplete.once((function () {
      return s[r.url] = r.data
    })), t()
  }, parsing: function parsing(e, t) {
    if (e.data) {
      if (e.xhr && e.xhrType === o.XHR_RESPONSE_TYPE.BLOB) if (window.Blob && "string" != typeof e.data) {
        if (0 === e.data.type.indexOf("image")) {
          var r = a.createObjectURL(e.data);
          return e.blob = e.data, e.data = new Image, e.data.src = r, e.type = o.TYPE.IMAGE, void (e.data.onload = function () {
            a.revokeObjectURL(r), e.data.onload = null, t()
          })
        }
      } else {
        var s = e.xhr.getResponseHeader("content-type");
        if (s && 0 === s.indexOf("image")) return e.data = new Image, e.data.src = "data:" + s + ";base64," + function encodeBinary(e) {
          for (var t = "", r = 0; r < e.length;) {
            for (var s = [0, 0, 0], n = [0, 0, 0, 0], i = 0; i < s.length; ++i) r < e.length ? s[i] = 255 & e.charCodeAt(r++) : s[i] = 0;
            switch (n[0] = s[0] >> 2, n[1] = (3 & s[0]) << 4 | s[1] >> 4, n[2] = (15 & s[1]) << 2 | s[2] >> 6, n[3] = 63 & s[2], r - (e.length - 1)) {
              case 2:
                n[3] = 64, n[2] = 64;
                break;
              case 1:
                n[3] = 64
            }
            for (var o = 0; o < n.length; ++o) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(n[o])
          }
          return t
        }(e.xhr.responseText), e.type = o.TYPE.IMAGE, void (e.data.onload = function () {
          e.data.onload = null, t()
        })
      }
      t()
    } else t()
  }
}, l = /(#[\w-]+)?$/, c = function () {
  function Loader2(e, r) {
    var s = this;
    void 0 === e && (e = ""), void 0 === r && (r = 10), this.baseUrl = e, this.progress = 0, this.loading = !1, this.defaultQueryString = "", this._beforeMiddleware = [], this._afterMiddleware = [], this._resourcesParsing = [], this._boundLoadResource = function (e, t) {
      return s._loadResource(e, t)
    }, this._queue = function queue(e, t) {
      if (null == t) t = 1; else if (0 === t) throw new Error("Concurrency must not be zero");
      var r = 0, s = {
        _tasks: [],
        concurrency: t,
        saturated: _noop,
        unsaturated: _noop,
        buffer: t / 4,
        empty: _noop,
        drain: _noop,
        error: _noop,
        started: !1,
        paused: !1,
        push: function push(e, t) {
          _insert(e, !1, t)
        },
        kill: function kill() {
          r = 0, s.drain = _noop, s.started = !1, s._tasks = []
        },
        unshift: function unshift(e, t) {
          _insert(e, !0, t)
        },
        process: function process() {
          for (; !s.paused && r < s.concurrency && s._tasks.length;) {
            var t = s._tasks.shift();
            0 === s._tasks.length && s.empty(), (r += 1) === s.concurrency && s.saturated(), e(t.data, onlyOnce(_next(t)))
          }
        },
        length: function length() {
          return s._tasks.length
        },
        running: function running() {
          return r
        },
        idle: function idle() {
          return s._tasks.length + r === 0
        },
        pause: function pause() {
          !0 !== s.paused && (s.paused = !0)
        },
        resume: function resume() {
          if (!1 !== s.paused) {
            s.paused = !1;
            for (var e = 1; e <= s.concurrency; e++) s.process()
          }
        }
      };

      function _insert(e, t, r) {
        if (null != r && "function" != typeof r) throw new Error("task callback must be a function");
        if (s.started = !0, null == e && s.idle()) setTimeout((function () {
          return s.drain()
        }), 1); else {
          var n = {data: e, callback: "function" == typeof r ? r : _noop};
          t ? s._tasks.unshift(n) : s._tasks.push(n), setTimeout((function () {
            return s.process()
          }), 1)
        }
      }

      function _next(e) {
        return function next() {
          r -= 1, e.callback.apply(e, arguments), null != arguments[0] && s.error(arguments[0], e.data), r <= s.concurrency - s.buffer && s.unsaturated(), s.idle() && s.drain(), s.process()
        }
      }

      return s
    }(this._boundLoadResource, r), this._queue.pause(), this.resources = {}, this.onProgress = new t, this.onError = new t, this.onLoad = new t, this.onStart = new t, this.onComplete = new t;
    for (var n = 0; n < Loader2._defaultBeforeMiddleware.length; ++n) this.pre(Loader2._defaultBeforeMiddleware[n]);
    for (var i = 0; i < Loader2._defaultAfterMiddleware.length; ++i) this.use(Loader2._defaultAfterMiddleware[i])
  }

  var r = Loader2.prototype;
  return r.add = function add(e, t, r, s) {
    if (Array.isArray(e)) {
      for (var n = 0; n < e.length; ++n) this.add(e[n]);
      return this
    }
    if ("object" == typeof e && (s = t || e.callback || e.onComplete, r = e, t = e.url, e = e.name || e.key || e.url), "string" != typeof t && (s = r, r = t, t = e), "string" != typeof t) throw new Error("No url passed to add resource to loader.");
    if ("function" == typeof r && (s = r, r = null), this.loading && (!r || !r.parentResource)) throw new Error("Cannot add resources while the loader is running.");
    if (this.resources[e]) throw new Error('Resource named "' + e + '" already exists.');
    if (t = this._prepareUrl(t), this.resources[e] = new o(e, t, r), "function" == typeof s && this.resources[e].onAfterMiddleware.once(s), this.loading) {
      for (var i = r.parentResource, a = [], h = 0; h < i.children.length; ++h) i.children[h].isComplete || a.push(i.children[h]);
      var u = i.progressChunk * (a.length + 1) / (a.length + 2);
      i.children.push(this.resources[e]), i.progressChunk = u;
      for (var d = 0; d < a.length; ++d) a[d].progressChunk = u;
      this.resources[e].progressChunk = u
    }
    return this._queue.push(this.resources[e]), this
  }, r.pre = function pre(e) {
    return this._beforeMiddleware.push(e), this
  }, r.use = function use(e) {
    return this._afterMiddleware.push(e), this
  }, r.reset = function reset() {
    for (var e in this.progress = 0, this.loading = !1, this._queue.kill(), this._queue.pause(), this.resources) {
      var t = this.resources[e];
      t._onLoadBinding && t._onLoadBinding.detach(), t.isLoading && t.abort()
    }
    return this.resources = {}, this
  }, r.load = function load(e) {
    if ("function" == typeof e && this.onComplete.once(e), this.loading) return this;
    if (this._queue.idle()) this._onStart(), this._onComplete(); else {
      for (var t = 100 / this._queue._tasks.length, r = 0; r < this._queue._tasks.length; ++r) this._queue._tasks[r].data.progressChunk = t;
      this._onStart(), this._queue.resume()
    }
    return this
  }, r._prepareUrl = function _prepareUrl(t) {
    var r, s = e(t, {strictMode: !0});
    if (r = s.protocol || !s.path || 0 === t.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t, this.defaultQueryString) {
      var n = l.exec(r)[0];
      -1 !== (r = r.substr(0, r.length - n.length)).indexOf("?") ? r += "&" + this.defaultQueryString : r += "?" + this.defaultQueryString, r += n
    }
    return r
  }, r._loadResource = function _loadResource(e, t) {
    var r = this;
    e._dequeue = t, eachSeries(this._beforeMiddleware, (function (t, s) {
      t.call(r, e, (function () {
        s(e.isComplete ? {} : null)
      }))
    }), (function () {
      e.isComplete ? r._onLoad(e) : (e._onLoadBinding = e.onComplete.once(r._onLoad, r), e.load())
    }), !0)
  }, r._onStart = function _onStart() {
    this.progress = 0, this.loading = !0, this.onStart.dispatch(this)
  }, r._onComplete = function _onComplete() {
    this.progress = 100, this.loading = !1, this.onComplete.dispatch(this, this.resources)
  }, r._onLoad = function _onLoad(e) {
    var t = this;
    e._onLoadBinding = null, this._resourcesParsing.push(e), e._dequeue(), eachSeries(this._afterMiddleware, (function (r, s) {
      r.call(t, e, s)
    }), (function () {
      e.onAfterMiddleware.dispatch(e), t.progress = Math.min(100, t.progress + e.progressChunk), t.onProgress.dispatch(t, e), e.error ? t.onError.dispatch(e.error, t, e) : t.onLoad.dispatch(t, e), t._resourcesParsing.splice(t._resourcesParsing.indexOf(e), 1), t._queue.idle() && 0 === t._resourcesParsing.length && t._onComplete()
    }), !0)
  }, _createClass(Loader2, [{
    key: "concurrency", get: function get() {
      return this._queue.concurrency
    }, set: function set(e) {
      this._queue.concurrency = e
    }
  }]), Loader2
}();
c._defaultBeforeMiddleware = [], c._defaultAfterMiddleware = [], c.pre = function LoaderPreStatic(e) {
  return c._defaultBeforeMiddleware.push(e), c
}, c.use = function LoaderUseStatic(e) {
  return c._defaultAfterMiddleware.push(e), c
}, (u = h || (h = {})).CHARACTERS = "characters", u.NOUNS = "nouns", u.OPERATORS = "operators", u.PROPERTIES = "properties", r.defaults.baseURL = "/sceneSetups/";
const getSceneSetup = async e => (e => {
  const t = e.sceneWidth, r = e.sceneHeight, s = new Map;
  for (const n of e.thingsMap) {
    const e = {species: n.species, name: n.name}, t = new Array;
    for (const r of n.thingSetup) {
      const e = {
        defaultBlockX: r.defaultBlockX,
        defaultBlockY: r.defaultBlockY,
        textureName: r.textureName,
        defaultTowards: r.defaultTowards
      };
      t.push(e)
    }
    s.set(e, t)
  }
  return {id: e.id, name: e.name, sceneWidth: t, sceneHeight: r, thingsMap: s}
})(await (async e => {
  try {
    const {data: t} = await r.get(e);
    return t
  } catch (t) {
    throw new Error("Error occurred while loading JSON from local" + t)
  }
})(e));
export {c as L, o as R, h as S, getSceneSetup as g, d as i};
