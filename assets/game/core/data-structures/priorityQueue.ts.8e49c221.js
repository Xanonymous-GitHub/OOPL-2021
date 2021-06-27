import {M as e} from "./maxHeap.ts.67dcb219.js";
import {C as r} from "./comparator.ts.80612a9e.js";

class PriorityQueue extends e {
  constructor() {
    super(), this.priorities = new Map, this.compare = new r(this.comparePriority.bind(this))
  }

  add(e, r = 0) {
    return this.priorities.set(e, r), super.add(e), this
  }

  remove(e, r) {
    return super.remove(e, r), this.priorities.delete(e), this
  }

  changePriority(e, i) {
    return this.remove(e, new r(this.compareValue)), this.add(e, i), this
  }

  findByValue(e) {
    return this.find(e, new r(this.compareValue))
  }

  hasValue(e) {
    return this.findByValue(e).length > 0
  }

  comparePriority(e, r) {
    return this.priorities.get(e) === this.priorities.get(r) ? 0 : Number(this.priorities.get(e)) < Number(this.priorities.get(r)) ? -1 : 1
  }

  compareValue(e, r) {
    return e === r ? 0 : e < r ? -1 : 1
  }

  size() {
    return this.heapSize()
  }
}

export {PriorityQueue as P};
