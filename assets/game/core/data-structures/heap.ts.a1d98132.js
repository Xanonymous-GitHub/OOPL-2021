import {C as t} from "./comparator.ts.80612a9e.js";

class Heap {
  constructor(e) {
    if (new.target === Heap) throw new TypeError("Cannot construct Heap instance directly");
    this.heapContainer = [], this.compare = new t(e)
  }

  getLeftChildIndex(t) {
    return 2 * t + 1
  }

  getRightChildIndex(t) {
    return 2 * t + 2
  }

  getParentIndex(t) {
    return Math.floor((t - 1) / 2)
  }

  hasParent(t) {
    return this.getParentIndex(t) >= 0
  }

  hasLeftChild(t) {
    return this.getLeftChildIndex(t) < this.heapContainer.length
  }

  hasRightChild(t) {
    return this.getRightChildIndex(t) < this.heapContainer.length
  }

  leftChild(t) {
    return this.heapContainer[this.getLeftChildIndex(t)]
  }

  rightChild(t) {
    return this.heapContainer[this.getRightChildIndex(t)]
  }

  parent(t) {
    return this.heapContainer[this.getParentIndex(t)]
  }

  swap(t, e) {
    const h = this.heapContainer[e];
    this.heapContainer[e] = this.heapContainer[t], this.heapContainer[t] = h
  }

  peek() {
    return 0 === this.heapContainer.length ? null : this.heapContainer[0]
  }

  poll() {
    if (0 === this.heapContainer.length) return null;
    if (1 === this.heapContainer.length) return this.heapContainer.pop();
    const t = this.heapContainer[0];
    return this.heapContainer[0] = this.heapContainer.pop(), this.heapifyDown(), t
  }

  add(t) {
    return this.heapContainer.push(t), this.heapifyUp(), this
  }

  remove(t, e = this.compare) {
    const h = this.find(t, e).length;
    for (let n = 0; n < h; n += 1) {
      const h = Number(this.find(t, e).pop());
      if (h === this.heapContainer.length - 1) this.heapContainer.pop(); else {
        this.heapContainer[h] = this.heapContainer.pop();
        const t = this.parent(h);
        !this.hasLeftChild(h) || t && !this.pairIsInCorrectOrder(t, this.heapContainer[h]) ? this.heapifyUp(h) : this.heapifyDown(h)
      }
    }
    return this
  }

  find(t, e = this.compare) {
    const h = [];
    for (let n = 0; n < this.heapContainer.length; n += 1) e.equal(t, this.heapContainer[n]) && h.push(n);
    return h
  }

  isEmpty() {
    return !this.heapContainer.length
  }

  toString() {
    return this.heapContainer.toString()
  }

  heapifyUp(t) {
    let e = t || this.heapContainer.length - 1;
    for (; this.hasParent(e) && !this.pairIsInCorrectOrder(this.parent(e), this.heapContainer[e]);) this.swap(e, this.getParentIndex(e)), e = this.getParentIndex(e)
  }

  heapifyDown(t = 0) {
    let e = t, h = null;
    for (; this.hasLeftChild(e) && (h = this.hasRightChild(e) && this.pairIsInCorrectOrder(this.rightChild(e), this.leftChild(e)) ? this.getRightChildIndex(e) : this.getLeftChildIndex(e), !this.pairIsInCorrectOrder(this.heapContainer[e], this.heapContainer[h]));) this.swap(e, h), e = h
  }

  pairIsInCorrectOrder(t, e) {
    throw new Error(`\n      You have to implement heap pair comparision method\n      for ${t} and ${e} values.\n    `)
  }

  clear() {
    this.heapContainer.length = 0
  }

  heapSize() {
    return this.heapContainer.length
  }
}

export {Heap as H};
