import {D as t} from "../../../types/things.ts.f6777fc9.js";
import {r as e} from "../../../utils/direction.ts.bbe62af2.js";

const canBePushed = async (r, a, s) => {
  switch (s) {
    case t.DOWN:
      if (r.atTopEdge()) return !1;
      break;
    case t.TOP:
      if (r.atBottomEdge()) return !1;
      break;
    case t.RIGHT:
      if (r.atLeftEdge()) return !1;
      break;
    case t.LEFT:
      if (r.atRightEdge()) return !1
  }
  return await a.canIEncounter(r, e(s))
};
export {canBePushed as c};
