var e = {exports: {}};
!function (e) {
  var t = Object.prototype.hasOwnProperty, n = "~";

  function Events() {
  }

  function EE(e, t, n) {
    this.fn = e, this.context = t, this.once = n || !1
  }

  function addListener(e, t, r, o, s) {
    if ("function" != typeof r) throw new TypeError("The listener must be a function");
    var i = new EE(r, o || e, s), v = n ? n + t : t;
    return e._events[v] ? e._events[v].fn ? e._events[v] = [e._events[v], i] : e._events[v].push(i) : (e._events[v] = i, e._eventsCount++), e
  }

  function clearEvent(e, t) {
    0 == --e._eventsCount ? e._events = new Events : delete e._events[t]
  }

  function EventEmitter2() {
    this._events = new Events, this._eventsCount = 0
  }

  Object.create && (Events.prototype = Object.create(null), (new Events).__proto__ || (n = !1)), EventEmitter2.prototype.eventNames = function eventNames() {
    var e, r, o = [];
    if (0 === this._eventsCount) return o;
    for (r in e = this._events) t.call(e, r) && o.push(n ? r.slice(1) : r);
    return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(e)) : o
  }, EventEmitter2.prototype.listeners = function listeners(e) {
    var t = n ? n + e : e, r = this._events[t];
    if (!r) return [];
    if (r.fn) return [r.fn];
    for (var o = 0, s = r.length, i = new Array(s); o < s; o++) i[o] = r[o].fn;
    return i
  }, EventEmitter2.prototype.listenerCount = function listenerCount(e) {
    var t = n ? n + e : e, r = this._events[t];
    return r ? r.fn ? 1 : r.length : 0
  }, EventEmitter2.prototype.emit = function emit(e, t, r, o, s, i) {
    var v = n ? n + e : e;
    if (!this._events[v]) return !1;
    var c, a, f = this._events[v], l = arguments.length;
    if (f.fn) {
      switch (f.once && this.removeListener(e, f.fn, void 0, !0), l) {
        case 1:
          return f.fn.call(f.context), !0;
        case 2:
          return f.fn.call(f.context, t), !0;
        case 3:
          return f.fn.call(f.context, t, r), !0;
        case 4:
          return f.fn.call(f.context, t, r, o), !0;
        case 5:
          return f.fn.call(f.context, t, r, o, s), !0;
        case 6:
          return f.fn.call(f.context, t, r, o, s, i), !0
      }
      for (a = 1, c = new Array(l - 1); a < l; a++) c[a - 1] = arguments[a];
      f.fn.apply(f.context, c)
    } else {
      var E, u = f.length;
      for (a = 0; a < u; a++) switch (f[a].once && this.removeListener(e, f[a].fn, void 0, !0), l) {
        case 1:
          f[a].fn.call(f[a].context);
          break;
        case 2:
          f[a].fn.call(f[a].context, t);
          break;
        case 3:
          f[a].fn.call(f[a].context, t, r);
          break;
        case 4:
          f[a].fn.call(f[a].context, t, r, o);
          break;
        default:
          if (!c) for (E = 1, c = new Array(l - 1); E < l; E++) c[E - 1] = arguments[E];
          f[a].fn.apply(f[a].context, c)
      }
    }
    return !0
  }, EventEmitter2.prototype.on = function on(e, t, n) {
    return addListener(this, e, t, n, !1)
  }, EventEmitter2.prototype.once = function once(e, t, n) {
    return addListener(this, e, t, n, !0)
  }, EventEmitter2.prototype.removeListener = function removeListener(e, t, r, o) {
    var s = n ? n + e : e;
    if (!this._events[s]) return this;
    if (!t) return clearEvent(this, s), this;
    var i = this._events[s];
    if (i.fn) i.fn !== t || o && !i.once || r && i.context !== r || clearEvent(this, s); else {
      for (var v = 0, c = [], a = i.length; v < a; v++) (i[v].fn !== t || o && !i[v].once || r && i[v].context !== r) && c.push(i[v]);
      c.length ? this._events[s] = 1 === c.length ? c[0] : c : clearEvent(this, s)
    }
    return this
  }, EventEmitter2.prototype.removeAllListeners = function removeAllListeners(e) {
    var t;
    return e ? (t = n ? n + e : e, this._events[t] && clearEvent(this, t)) : (this._events = new Events, this._eventsCount = 0), this
  }, EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener, EventEmitter2.prototype.addListener = EventEmitter2.prototype.on, EventEmitter2.prefixed = n, EventEmitter2.EventEmitter = EventEmitter2, e.exports = EventEmitter2
}(e);
const t = e.exports;
export {t as E};
