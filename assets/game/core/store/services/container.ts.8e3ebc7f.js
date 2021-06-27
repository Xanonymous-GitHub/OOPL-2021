import {g as e} from "../../../../../TheGameFramework/circleComponent.js";
import {n, s as t} from "../../../../../TheGameFramework/babel.min.js";

class ContainerServiceConcrete {
  constructor() {
    this._containerPackages = [], this._emptyContainerPackages = []
  }

  get _nonEmptySize() {
    return this._containerPackages.length
  }

  _removeContainerPackage(e) {
    const n = this._containerPackages.findIndex((n => n.id === e));
    if (-1 !== n) this._containerPackages.splice(n, 1); else {
      if (-1 === this._emptyContainerPackages.findIndex((n => n.id === e))) throw new Error(`containerPackage ${e} does not exist.`);
      this._emptyContainerPackages.splice(n, 1)
    }
  }

  hasContainerById(e) {
    return -1 !== this._containerPackages.concat(this._emptyContainerPackages).findIndex((n => n.id === e))
  }

  hasContainerByName(e) {
    return -1 !== this._containerPackages.concat(this._emptyContainerPackages).findIndex((n => n.name === e))
  }

  hasAnyContainer() {
    return 0 !== this._containerPackages.concat(this._emptyContainerPackages).length
  }

  getNonEmptyContainerByIndex(e) {
    const n = this._nonEmptySize;
    if (e < 0 || e >= n) throw new Error(`Index ${e} out of range`);
    const t = this._containerPackages[e];
    if (!t) throw new Error(`Container package ${e} not a valid container package`);
    return this._removeContainerPackage(t.id), t.container
  }

  getEmptyContainer() {
    const e = this._emptyContainerPackages.length;
    if (0 === e) return n;
    const a = this._emptyContainerPackages[e - 1];
    return this._removeContainerPackage(a.id), t(a.container)
  }

  getContainerByName(e) {
    let n = this._containerPackages.find((n => n.name === e));
    if (!n) {
      const t = this._emptyContainerPackages.find((n => n.name === e));
      if (!t) throw new Error(`Invalid container ${e} not found`);
      n = t
    }
    return this._removeContainerPackage(n.id), n.container
  }

  addContainer(n, t, a) {
    const i = {id: e(), name: t, container: n};
    0 === n.children.length && this._emptyContainerPackages.splice(Number(a), 0, i), this._containerPackages.splice(Number(a), 0, i)
  }
}

const createContainerService = () => new ContainerServiceConcrete;
export {createContainerService as c};
