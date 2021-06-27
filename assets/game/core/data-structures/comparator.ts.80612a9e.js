class Comparator {
  constructor(r) {
    this.compare = r || Comparator.defaultCompareFunction
  }

  static defaultCompareFunction(r, a) {
    return r === a ? 0 : r < a ? -1 : 1
  }

  equal(r, a) {
    return 0 === this.compare(r, a)
  }

  lessThan(r, a) {
    return this.compare(r, a) < 0
  }

  greaterThan(r, a) {
    return this.compare(r, a) > 0
  }

  lessThanOrEqual(r, a) {
    return this.lessThan(r, a) || this.equal(r, a)
  }

  greaterThanOrEqual(r, a) {
    return this.greaterThan(r, a) || this.equal(r, a)
  }

  reverse() {
    const r = this.compare;
    this.compare = (a, e) => r(e, a)
  }
}

export {Comparator as C};
