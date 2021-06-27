import {P as e} from "../types/properties.ts.9ca008cf.js";
import {N as t} from "../types/nouns.ts.d68a0573.js";
import {O as r} from "../types/operators.ts.01a24b60.js";
import {S as s} from "../../../../TheGameFramework/ResourceManager.js";
import {n as a, s as o} from "../../../../TheGameFramework/babel.min.js";
import {i as n} from "../utils/thingType.ts.fb8ee777.js";

class RuleControllerConcrete {
  constructor(e) {
    this._features = new Map, this._patterns = new Map, this._mapController = e, this._giveDefaultRules()
  }

  refreshAll() {
    this._features.clear(), this._giveDefaultRules()
  }

  _giveDefaultRules() {
    const s = {_is: [{feature: e.PUSH, on: [], near: [], facing: []}], _has: [], _make: []},
      a = [...Object.values(t), ...Object.values(e), ...Object.values(r)];
    for (const e of a) this._features.set(e, s)
  }

  async processImmediateChanges() {
    const t = new Map;
    this._features.forEach(((e, r) => {
      const s = e._is.filter((e => n(e.feature)));
      t.set(r, s)
    })), await this._mapController.appendTransformInstructions(t);
    const r = new Map;
    this._features.forEach(((t, s) => {
      const a = t._is.filter((t => {
        switch (t.feature) {
          case e.MOVE:
          case e.TELE:
            return !0;
          default:
            return !1
        }
      }));
      r.set(s, a)
    })), await this._mapController.processMoveInstructions(r)
  }

  async checkYouExistsInLevel() {
    const t = [];
    return this._features.forEach(((r, s) => {
      for (const a of r._is) if (a.feature === e.YOU) {
        t.push(s);
        break
      }
    })), 0 !== t.length && await this._mapController.checkYouExistsInMap(t)
  }

  $is(e, t) {
    const r = e.name, s = this._features.get(r);
    if (!s) return !1;
    const a = Boolean(s._is.find((e => e.feature === t)));
    return Boolean(s && a)
  }

  $has(e, t) {
    const r = e.name, s = this._features.get(r);
    if (!s) return !1;
    const a = Boolean(s._has.find((e => e.feature === t)));
    return Boolean(s && a)
  }

  $make(e, t) {
    const r = e.name, s = this._features.get(r);
    if (!s) return !1;
    const a = Boolean(s._make.find((e => e.feature === t)));
    return Boolean(s && a)
  }

  getFeaturesOfThing(e, t) {
    if (e.species !== s.CHARACTERS) throw new Error('[MY FAULT] Feature "getFeaturesOfThings" for Text-type things are not implemented yet');
    const n = e.name;
    if (!this._features.has(n)) return a;
    const i = this._features.get(n);
    if (!i) throw new Error(`Thing ${n} in featureList has unexpected undefined value`);
    switch (t) {
      case r.IS:
        return o(i._is);
      case r.HAS:
        return o(i._has);
      case r.MAKE:
        return o(i._make);
      default:
        throw new Error(`operator ${t} should be a verb (OperatorType.IS, OperatorType.HAS, OperatorType.MAKE) instead of an adjective`)
    }
  }

  addFeature(e, t, s) {
    if (!this._features.has(e)) {
      const t = {_is: [], _has: [], _make: []};
      this._features.set(e, t)
    }
    switch (t) {
      case r.IS:
        this._features.get(e)._is.push(s);
        break;
      case r.HAS:
        this._features.get(e)._has.push(s);
        break;
      case r.MAKE:
        this._features.get(e)._make.push(s);
        break;
      default:
        throw new Error(`operator ${t} should be a verb (OperatorType.IS, OperatorType.HAS, OperatorType.MAKE) instead of an adjective`)
    }
  }

  removeFeature(e, t, s) {
    if (!this._features.has(e)) throw new Error(`thingType ${e} not been recorded yet`);
    let a = -1;
    switch (t) {
      case r.IS:
        if (a = this._features.get(e)._is.indexOf(s), -1 === a) throw new Error(`thingType ${e} does not contain feature ${s}`);
        this._features.get(e)._is.splice(a, 1);
        break;
      case r.HAS:
        if (a = this._features.get(e)._has.indexOf(s), -1 === a) throw new Error(`thingType ${e} does not contain feature ${s}`);
        this._features.get(e)._has.splice(a, 1);
        break;
      case r.MAKE:
        if (a = this._features.get(e)._make.indexOf(s), -1 === a) throw new Error(`thingType ${e} does not contain feature ${s}`);
        this._features.get(e)._make.splice(a, 1);
        break;
      default:
        throw new Error(`operator ${t} should be a verb (OperatorType.IS, OperatorType.HAS, OperatorType.MAKE) instead of an adjective`)
    }
  }
}

const createRuleController = e => new RuleControllerConcrete(e);
export {createRuleController as c};
