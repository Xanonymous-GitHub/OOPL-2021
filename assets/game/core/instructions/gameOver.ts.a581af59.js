import {R as s} from "./index.ts.d3e92ee2.js";
import {g as t} from "../game.ts.ddfbe9ad.js";
import {G as r} from "../types/index.ts.fefdd3ef.js";
import {T as a} from "../app/configs.ts.64c86f5e.js";
import {s as e} from "../utils/time.ts.66310a7d.js";

class CongratulationInstruction extends s {
  async perform() {
    await e(a), await t(r.WIN)
  }

  async unperform() {
    return Promise.reject()
  }
}

export {CongratulationInstruction as C};
