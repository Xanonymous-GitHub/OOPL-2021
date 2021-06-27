var e = setTimeout;

function isArray(e) {
  return Boolean(e && void 0 !== e.length)
}

function noop() {
}

function Promise$1(e) {
  if (!(this instanceof Promise$1)) throw new TypeError("Promises must be constructed via new");
  if ("function" != typeof e) throw new TypeError("not a function");
  this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], doResolve(e, this)
}

function handle(e, n) {
  for (; 3 === e._state;) e = e._value;
  0 !== e._state ? (e._handled = !0, Promise$1._immediateFn((function () {
    var t = 1 === e._state ? n.onFulfilled : n.onRejected;
    if (null !== t) {
      var r;
      try {
        r = t(e._value)
      } catch (o) {
        return void reject(n.promise, o)
      }
      resolve(n.promise, r)
    } else (1 === e._state ? resolve : reject)(n.promise, e._value)
  }))) : e._deferreds.push(n)
}

function resolve(e, n) {
  try {
    if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
    if (n && ("object" == typeof n || "function" == typeof n)) {
      var t = n.then;
      if (n instanceof Promise$1) return e._state = 3, e._value = n, void finale(e);
      if ("function" == typeof t) return void doResolve(function bind(e, n) {
        return function () {
          e.apply(n, arguments)
        }
      }(t, n), e)
    }
    e._state = 1, e._value = n, finale(e)
  } catch (r) {
    reject(e, r)
  }
}

function reject(e, n) {
  e._state = 2, e._value = n, finale(e)
}

function finale(e) {
  2 === e._state && 0 === e._deferreds.length && Promise$1._immediateFn((function () {
    e._handled || Promise$1._unhandledRejectionFn(e._value)
  }));
  for (var n = 0, t = e._deferreds.length; n < t; n++) handle(e, e._deferreds[n]);
  e._deferreds = null
}

function Handler(e, n, t) {
  this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t
}

function doResolve(e, n) {
  var t = !1;
  try {
    e((function (e) {
      t || (t = !0, resolve(n, e))
    }), (function (e) {
      t || (t = !0, reject(n, e))
    }))
  } catch (r) {
    if (t) return;
    t = !0, reject(n, r)
  }
}

Promise$1.prototype.catch = function (e) {
  return this.then(null, e)
}, Promise$1.prototype.then = function (e, n) {
  var t = new this.constructor(noop);
  return handle(this, new Handler(e, n, t)), t
}, Promise$1.prototype.finally = function finallyConstructor(e) {
  var n = this.constructor;
  return this.then((function (t) {
    return n.resolve(e()).then((function () {
      return t
    }))
  }), (function (t) {
    return n.resolve(e()).then((function () {
      return n.reject(t)
    }))
  }))
}, Promise$1.all = function (e) {
  return new Promise$1((function (n, t) {
    if (!isArray(e)) return t(new TypeError("Promise.all accepts an array"));
    var r = Array.prototype.slice.call(e);
    if (0 === r.length) return n([]);
    var o = r.length;

    function res(e, i) {
      try {
        if (i && ("object" == typeof i || "function" == typeof i)) {
          var s = i.then;
          if ("function" == typeof s) return void s.call(i, (function (n) {
            res(e, n)
          }), t)
        }
        r[e] = i, 0 == --o && n(r)
      } catch (f) {
        t(f)
      }
    }

    for (var i = 0; i < r.length; i++) res(i, r[i])
  }))
}, Promise$1.allSettled = function allSettled(e) {
  return new this((function (n, t) {
    if (!e || void 0 === e.length) return t(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
    var r = Array.prototype.slice.call(e);
    if (0 === r.length) return n([]);
    var o = r.length;

    function res(e, t) {
      if (t && ("object" == typeof t || "function" == typeof t)) {
        var i = t.then;
        if ("function" == typeof i) return void i.call(t, (function (n) {
          res(e, n)
        }), (function (t) {
          r[e] = {status: "rejected", reason: t}, 0 == --o && n(r)
        }))
      }
      r[e] = {status: "fulfilled", value: t}, 0 == --o && n(r)
    }

    for (var i = 0; i < r.length; i++) res(i, r[i])
  }))
}, Promise$1.resolve = function (e) {
  return e && "object" == typeof e && e.constructor === Promise$1 ? e : new Promise$1((function (n) {
    n(e)
  }))
}, Promise$1.reject = function (e) {
  return new Promise$1((function (n, t) {
    t(e)
  }))
}, Promise$1.race = function (e) {
  return new Promise$1((function (n, t) {
    if (!isArray(e)) return t(new TypeError("Promise.race accepts an array"));
    for (var r = 0, o = e.length; r < o; r++) Promise$1.resolve(e[r]).then(n, t)
  }))
}, Promise$1._immediateFn = "function" == typeof setImmediate && function (e) {
  setImmediate(e)
} || function (n) {
  e(n, 0)
}, Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(e) {
  "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
};
export {Promise$1 as P};
