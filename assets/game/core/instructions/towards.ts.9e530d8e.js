import {R as s} from "./index.ts.d3e92ee2.js";
import {r as t} from "../utils/direction.ts.bbe62af2.js";

class UpdateTowardsInstruction extends s {
  constructor(s, t) {
    super(s), this._towards = t
  }

  async perform() {
    this._subject.updateTowards(this._towards)
  }

  async unperform() {
    this._subject.updateTowards(t(this._towards))
  }
}

export {UpdateTowardsInstruction as U};
