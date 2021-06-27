class ObservableSubject {
  constructor() {
    this._changed = !1, this._observers = new Array
  }

  addObserver(e) {
    if (!e) throw new Error("observer is " + typeof e);
    this._observers.includes(e) || this._observers.push(e)
  }

  clearChanged() {
    this._changed = !1
  }

  countObservers() {
    return this._observers.length
  }

  deleteObserver(e) {
    const s = this._observers.findIndex((s => s.observeId === e.observeId));
    -1 !== s && this._observers.splice(s, 1)
  }

  deleteObservers() {
    for (; this._observers.length;) this._observers.pop();
    this._observers.length = 0
  }

  hasChanged() {
    return this._changed
  }

  async notifyObservers(...e) {
    let s = [];
    this.hasChanged() && (s = this._observers.slice(), this.clearChanged());
    const r = [];
    for (let t = s.length - 1; t >= 0; t--) r.push(s[t].update(this, ...e));
    await Promise.allSettled(r)
  }

  setChanged() {
    this._changed = !0
  }
}

export {ObservableSubject as O};
