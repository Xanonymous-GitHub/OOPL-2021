import {D as s} from "../../../instructions/existence.ts.d6b45b72.js";

const prepareSingleDestroyActions = async (t, n) => {
  const i = new s(t);
  i.setPriority(9999999990001), n.addNewInstruction(i), n.pushInstructions()
}, prepareMutualDestroyActions = async (t, n, i) => {
  const o = new s(t), r = new s(n);
  o.setPriority(9999999990001), r.setPriority(9999999990001), i.addNewInstruction(o), i.addNewInstruction(r), i.pushInstructions()
};
export {prepareSingleDestroyActions as a, prepareMutualDestroyActions as p};
