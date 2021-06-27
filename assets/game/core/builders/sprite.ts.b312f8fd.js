var e = Object.defineProperty, t = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty,
  o = Object.prototype.propertyIsEnumerable, __defNormalProp = (t, r, o) => r in t ? e(t, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
  }) : t[r] = o, __spreadValues = (e, s) => {
    for (var n in s || (s = {})) r.call(s, n) && __defNormalProp(e, n, s[n]);
    if (t) for (var n of t(s)) o.call(s, n) && __defNormalProp(e, n, s[n]);
    return e
  };
import {C as s, c as n} from "./tasks/sprite.ts.fd124a9c.js";
import {i as a} from "../../../../TheGameFramework/babel.min.js";
import {g as c} from "../app/screen.ts.6b359092.js";
import {s as i} from "../index.ts.35f2becf.js";

class SpriteBuilderConcrete {
  async getThings(e) {
    const t = [];
    for (const [{species: r, name: o}, n] of e) {
      const e = n.length;
      if (!e) break;
      const p = i.getSpriteAmountByName(o), f = i.getSpritesByName(o, Math.min(p, e));
      let l = [];
      a(f) || (l = f.value);
      let m = 0;
      for (const t of l) t.setup(__spreadValues({}, n[m++]));
      if (p < e) {
        const t = e - p, a = i.getAnimationTextures(r, o), f = new s, u = c(), {maxX: g, maxY: b} = i.getAppEdge();
        for (let e = 0; e < t; e++) {
          const e = n[m++];
          f.setArgs(o, r, a, e.defaultBlockX, e.defaultBlockY, u, g, b, e.defaultTowards), l.push(await f.execute())
        }
      }
      t.push(...l)
    }
    return t
  }

  async connectThingsToThingController(e) {
    const t = new n;
    for (const r of e) t.setArgs(r), await t.execute()
  }
}

const createSpriteBuilder = () => new SpriteBuilderConcrete;
export {createSpriteBuilder as c};
