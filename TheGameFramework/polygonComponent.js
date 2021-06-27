class MiniSignalBinding {
  constructor(i, n = !1, t) {
    this._fn = i, this._once = n, this._thisArg = t, this._next = this._prev = this._owner = null
  }

  detach() {
    return null !== this._owner && (this._owner.detach(this), !0)
  }
}

function _addMiniSignalBinding(i, n) {
  return i._head ? (i._tail._next = n, n._prev = i._tail, i._tail = n) : (i._head = n, i._tail = n), n._owner = i, n
}

class MiniSignal {
  constructor() {
    this._head = this._tail = void 0
  }

  handlers(i = !1) {
    let n = this._head;
    if (i) return !!n;
    const t = [];
    for (; n;) t.push(n), n = n._next;
    return t
  }

  has(i) {
    if (!(i instanceof MiniSignalBinding)) throw new Error("MiniSignal#has(): First arg must be a MiniSignalBinding object.");
    return i._owner === this
  }

  dispatch() {
    let i = this._head;
    if (!i) return !1;
    for (; i;) i._once && this.detach(i), i._fn.apply(i._thisArg, arguments), i = i._next;
    return !0
  }

  add(i, n = null) {
    if ("function" != typeof i) throw new Error("MiniSignal#add(): First arg must be a Function.");
    return _addMiniSignalBinding(this, new MiniSignalBinding(i, !1, n))
  }

  once(i, n = null) {
    if ("function" != typeof i) throw new Error("MiniSignal#once(): First arg must be a Function.");
    return _addMiniSignalBinding(this, new MiniSignalBinding(i, !0, n))
  }

  detach(i) {
    if (!(i instanceof MiniSignalBinding)) throw new Error("MiniSignal#detach(): First arg must be a MiniSignalBinding object.");
    return i._owner !== this || (i._prev && (i._prev._next = i._next), i._next && (i._next._prev = i._prev), i === this._head ? (this._head = i._next, null === i._next && (this._tail = null)) : i === this._tail && (this._tail = i._prev, this._tail._next = null), i._owner = null), this
  }

  detachAll() {
    let i = this._head;
    if (!i) return this;
    for (this._head = this._tail = null; i;) i._owner = null, i = i._next;
    return this
  }
}

export {MiniSignal as M};
