import {H as r} from "./heap.ts.a1d98132.js";

class MinHeap extends r {
  pairIsInCorrectOrder(r, a) {
    return this.compare.lessThanOrEqual(r, a)
  }
}

export {MinHeap as M};
