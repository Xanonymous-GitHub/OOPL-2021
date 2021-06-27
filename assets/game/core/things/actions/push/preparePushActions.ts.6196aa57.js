import {E as t} from "../../../instructions/index.ts.d3e92ee2.js";
import {D as s} from "../../../types/things.ts.f6777fc9.js";
import {m as e} from "../../../instructions/move.ts.530f944c.js";

const preparePushActions = (n, o, r) => {
  let i;
  switch (o) {
    case s.TOP:
      i = new e.MoveDownInstruction(n);
      break;
    case s.DOWN:
      i = new e.MoveUpInstruction(n);
      break;
    case s.LEFT:
      i = new e.MoveRightInstruction(n);
      break;
    case s.RIGHT:
      i = new e.MoveLeftInstruction(n);
      break;
    default:
      i = new t(n)
  }
  r.addNewInstruction(i), r.pushInstructions()
};
export {preparePushActions as p};
