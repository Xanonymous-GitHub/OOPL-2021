import {P as i} from "../../types/properties.ts.9ca008cf.js";
import {c as s} from "../actions/push/canBePushed.ts.7a17c7a3.js";
import {p as t} from "../actions/push/preparePushActions.ts.6196aa57.js";
import {p as r} from "../actions/win/prepareWinActions.ts.da380aa9.js";
import "../../controllers/map.ts.7e31983d.js";
import "../../app/configs.ts.64c86f5e.js";
import {s as a} from "../../index.ts.35f2becf.js";
import {p as e, a as o} from "../actions/destroy/prepareDestroyActions.ts.9a897ea8.js";

const generalHandleEncounterMixin = async (n, f, p, c) => {
  const $ = !0, u = a.getRuleController(), m = a.getMapController(), w = u.$is(n, i.YOU) || u.$is(n, i.YOU2),
    O = u.$is(f, i.YOU) || u.$is(f, i.YOU2), T = u.$is(n, i.FLOAT), E = u.$is(f, i.FLOAT), A = Boolean(T === E),
    j = u.$is(n, i.WIN), l = u.$is(f, i.WIN);
  if (w && j || O && l) return r(n, c), $;
  if (T === E && (j && O || l && w)) return r(n, c), $;
  if (u.$is(n, i.PUSH)) return !!(await s(n, m, p)) && (t(n, p, c), $);
  const P = u.$is(n, i.OPEN), U = u.$is(f, i.OPEN);
  if (P) {
    if (u.$is(f, i.SHUT)) return await e(n, f, c), $
  }
  if (U) {
    if (u.$is(n, i.SHUT)) return await e(n, f, c), $
  }
  const N = u.$is(n, i.WEAK), S = u.$is(f, i.WEAK);
  if (N && S) return await e(n, f, c), $;
  if (N) return await o(n, c), $;
  if (S) return await o(f, c), $;
  if (!N && u.$is(n, i.STOP)) return !1;
  if (A) {
    const s = u.$is(n, i.SINK), t = u.$is(f, i.SINK);
    if (s || t) return await e(n, f, c), $
  }
  const d = u.$is(n, i.DEFEAT), H = u.$is(f, i.DEFEAT);
  if (A) {
    if (d && O) return await o(f, c), $;
    if (H && w) return await o(n, c), $
  }
  const W = u.$is(n, i.HOT), g = u.$is(f, i.HOT), h = u.$is(n, i.MELT), y = u.$is(f, i.MELT);
  if (A) {
    if (W && y) return await o(f, c), $;
    if (g && h) return await o(n, c), $
  }
  return $
};
export {generalHandleEncounterMixin as g};
