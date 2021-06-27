import {S as e} from "../../../../../TheGameFramework/ResourceManager.js";
import {D as r} from "../../types/things.ts.f6777fc9.js";
import {O as t} from "../../types/operators.ts.01a24b60.js";
import {n as o, i as n, s, a as i} from "../../../../../TheGameFramework/babel.min.js";
import {c as a} from "../../utils/thingType.ts.fb8ee777.js";

class RuleScannerConcrete {
  constructor(e, r) {
    this._ruleController = e, this._mapController = r
  }

  scanRule(a, c, l, u, f) {
    if (f === r.LEFT || f === r.TOP) throw new Error(`scan direction ${f} should be Direction.RIGHT or Direction.DOWN`);
    const d = [t.IS, t.HAS, t.MAKE], h = [t.ON, t.NEAR, t.FACING];
    let p = a, v = c, R = !1;
    const m = {primaryCharacters: o, conditionSettings: o, effectRules: o};
    for (; ;) {
      if (p >= l || v >= u) return o;
      const a = this._mapController.whoAreThere(p, v);
      if (n(a)) return o;
      if (R) {
        let e = !1;
        for (const r of a.value) {
          if (r.name === t.AND) {
            e = !0;
            break
          }
        }
        if (!e) break
      } else {
        let r = !1;
        for (const t of a.value) {
          if (t.species === e.NOUNS) {
            if (n(m.primaryCharacters) && (m.primaryCharacters = s([])), !i(m.primaryCharacters)) throw new Error("unexpected error cause by rulePattern.primaryCharacters is not a some value");
            {
              const e = t.name;
              m.primaryCharacters.value.push(e), r = !0
            }
          }
        }
        if (!r) return o
      }
      R = !R, f === r.RIGHT && p++, f === r.DOWN && v++
    }
    R = !1;
    let w = !1, b = !0, S = o;
    for (; ;) {
      if (p >= l || v >= u) return o;
      const a = this._mapController.whoAreThere(p, v);
      if (n(a)) return o;
      const addConditionToPattern = (e, r) => {
        if (!h.includes(r)) throw new Error(`currentAdj ${r} was passed in as unacceptable OperatorType`);
        const t = e.name;
        if (n(m.conditionSettings) && (m.conditionSettings = s(new Map)), !i(m.conditionSettings)) throw new Error("unexpected error cause by rulePattern.conditionSettings is not a some value");
        if (m.conditionSettings.value.has(r)) {
          const e = m.conditionSettings.value.get(r);
          e && (e.push(t), m.conditionSettings.value.set(r, e))
        } else m.conditionSettings.value.set(r, [t])
      };
      if (b && w) for (const r of a.value) {
        const t = r.species;
        if (t === e.NOUNS) {
          if (n(S)) throw new Error(`adjective ${S} should not be none`);
          if (!h.includes(S.value)) throw new Error(`currentAdj ${S} should be an adjective operator`);
          addConditionToPattern(r, S.value), w = !1, b = !1, R = !0
        }
        if (t === e.OPERATORS) {
          const e = r.name;
          if (!h.includes(e)) return o;
          S = s(e), w = !0, b = !1, R = !1
        }
      } else if (b) {
        let r = !1, n = !1;
        for (const i of a.value) {
          if (i.species === e.OPERATORS) {
            const e = i.name;
            if (e === t.AND) return o;
            if (h.includes(e)) S = s(e), r = !0; else if (d.includes(e)) {
              n = !0;
              break
            }
          }
        }
        if (n) break;
        if (!r) return o;
        b = !1, w = !0
      } else if (w) for (const r of a.value) {
        if (r.species !== e.NOUNS) return o;
        if (n(S)) throw new Error(`adjective ${S} should not be none`);
        if (!h.includes(S.value)) throw new Error(`currentAdj ${S} should be an adjective operator`);
        addConditionToPattern(r, S.value), R = !0, w = !1
      } else {
        if (!R) throw new Error("unexpected error occurred caused by nonexistent scan condition");
        {
          let r = !1;
          for (const n of a.value) {
            if (n.species !== e.OPERATORS) return o;
            {
              const e = n.name;
              if (e !== t.AND) return o;
              if (d.includes(e)) {
                r = !1;
                break
              }
            }
          }
          if (r) break;
          R = !1, b = !0, w = !0
        }
      }
      f === r.RIGHT && p++, f === r.DOWN && v++
    }
    R = !1;
    let E = !1, O = !0, N = o;
    for (; !(p >= l || v >= u);) {
      const a = this._mapController.whoAreThere(p, v);
      if (n(a)) break;
      const addEffectToPattern = (e, r) => {
        if (!d.includes(r)) throw new Error(`currentVerb ${r} was passed in as unacceptable OperatorType`);
        const t = e.name;
        if (n(m.effectRules) && (m.effectRules = s(new Map)), !i(m.effectRules)) throw new Error("unexpected error cause by rulePattern.effectRules is not a some value");
        if (m.effectRules.value.has(r)) {
          const e = m.effectRules.value.get(r);
          e && (e.push(t), m.effectRules.value.set(r, e))
        } else m.effectRules.value.set(r, [t])
      };
      let c = !1;
      if (O && E) {
        let r = !1;
        for (const o of a.value) {
          const i = o.species;
          if (i === e.OPERATORS) {
            const e = o.name;
            d.includes(e) && (N = s(e), r = !0)
          } else if (i === e.PROPERTIES) {
            if (n(N)) throw new Error(`verb ${N} should not be none`);
            N.value === t.IS && (addEffectToPattern(o, N.value), r = !0)
          } else if (i === e.NOUNS) {
            if (n(N)) throw new Error(`verb ${N} should not be none`);
            if (!d.includes(N.value)) throw new Error(`currentVerb ${N} should be a verb operator`);
            addEffectToPattern(o, N.value), r = !0
          }
        }
        r || (c = !0)
      } else if (O) {
        let r = !1;
        for (const t of a.value) {
          if (t.species === e.OPERATORS) {
            const e = t.name;
            d.includes(e) && (N = s(e), r = !0)
          }
        }
        if (!r) return o;
        E = !0, O = !1
      } else if (E) {
        let r = !1;
        for (const o of a.value) {
          if (n(N)) throw new Error(`verb ${N} should not be none`);
          if (!d.includes(N.value)) throw new Error(`currentVerb ${N} should be a verb operator`);
          const s = o.species;
          (s === e.PROPERTIES && N.value === t.IS || s === e.NOUNS) && (addEffectToPattern(o, N.value), r = !0)
        }
        r || (c = !0), E = !1, R = !0
      } else {
        if (!R) return o;
        {
          let e = !1;
          for (const r of a.value) r.name === t.AND && (e = !0);
          e || (c = !0), R = !1, O = !0, E = !0
        }
      }
      if (f === r.RIGHT && p++, f === r.DOWN && v++, c) break
    }
    return s(m)
  }

  addRulesFromRulePattern(e) {
    if (n(e.primaryCharacters)) return;
    if (n(e.effectRules)) return;
    const r = [t.IS, t.HAS, t.MAKE];
    for (const o of e.primaryCharacters.value) {
      const n = a(o);
      for (const o of r) {
        const r = e.effectRules.value.get(o);
        if (r) for (const s of r) {
          const r = {feature: s, on: [], near: [], facing: []};
          i(e.conditionSettings) && (r.on = e.conditionSettings.value.get(t.ON) || [], r.near = e.conditionSettings.value.get(t.NEAR) || [], r.facing = e.conditionSettings.value.get(t.FACING) || []), this._ruleController.addFeature(n, o, r)
        }
      }
    }
  }

  findRulesFromMap(t) {
    const o = t.maxX + 1, s = t.maxY + 1;
    for (let a = 0; a < o; a++) for (let t = 0; t < s; t++) {
      const c = this._mapController.whoAreThere(a, t);
      if (!n(c)) for (const n of c.value) if (n.species === e.NOUNS) {
        const e = this.scanRule(a, t, o, s, r.RIGHT);
        i(e) && this.addRulesFromRulePattern(e.value);
        const n = this.scanRule(a, t, o, s, r.DOWN);
        i(n) && this.addRulesFromRulePattern(n.value)
      }
    }
  }
}

const createRuleScanner = (e, r) => new RuleScannerConcrete(e, r);
export {createRuleScanner as c};
