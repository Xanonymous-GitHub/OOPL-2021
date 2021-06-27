import {g as e} from "../../../../../TheGameFramework/circleComponent.js";
import {n as t, s} from "../../../../../TheGameFramework/babel.min.js";

class SpriteServiceConcrete {
  constructor() {
    this._spritePackages = new Map
  }

  _hasThisSprite(e) {
    return this._spritePackages.has(e)
  }

  _removeSpritePackage(e, t) {
    const s = this._spritePackages.get(e);
    if (!s) return;
    const r = s.findIndex((e => e.id === t));
    if (!r) throw new Error(`sprite ${t} not found`);
    this._spritePackages.get(e).splice(r, 1)
  }

  _removeSpritePackages(e, t) {
    return this._spritePackages.get(e) ? this._spritePackages.get(e).splice(0, t) : null
  }

  addSpriteByName(t, s) {
    const r = {id: e(), sprite: s};
    this._hasThisSprite(t) ? this._spritePackages.get(t).push(r) : this._spritePackages.set(t, [r])
  }

  addSpritesByName(t, s) {
    const r = (t => {
      const s = [];
      for (const r of t) {
        const t = {id: e(), sprite: r};
        s.push(t)
      }
      return s
    })(s);
    this._hasThisSprite(t) ? this._spritePackages.get(t).push(...r) : this._spritePackages.set(t, r)
  }

  getSpriteAmountByName(e) {
    return this._hasThisSprite(e) ? this._spritePackages.get(e).length : 0
  }

  getSpriteByName(e) {
    if (!this._hasThisSprite(e)) return t;
    const r = this._spritePackages.get(e)[0];
    if (!r) throw new Error(`sprite ${e} not found`);
    return this._removeSpritePackage(e, r.id), s(r.sprite)
  }

  getSpritesByName(e, r) {
    if (!this._hasThisSprite(e)) return t;
    const i = this.getSpriteAmountByName(e);
    if (i < r) throw new Error(`sprites amount in store ${i} < ${r}`);
    const a = this._removeSpritePackages(e, r);
    if (!a) throw new Error(`sprites ${e} can not be removed`);
    const o = [];
    for (const t of a) o.push(t.sprite);
    return s(o)
  }
}

const createSpriteService = () => new SpriteServiceConcrete;
export {createSpriteService as c};
