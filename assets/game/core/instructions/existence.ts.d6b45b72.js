import {R as t} from "./index.ts.d3e92ee2.js";
import {M as s} from "../controllers/map.ts.7e31983d.js";
import {T as e} from "../app/configs.ts.64c86f5e.js";
import {s as a} from "../index.ts.35f2becf.js";
import {s as r} from "../utils/time.ts.66310a7d.js";

class DisappearInstruction extends t {
  async perform() {
    await r(e), this._subject.thingController.disconnect(), await a.getMapController().update(this._subject, s.DISAPPEAR), await a.getContainerBuilder().removeThingFromGameScene(this._subject)
  }

  async unperform() {
    await r(e), await a.getMapController().update(this._subject, s.APPEAR)
  }
}

export {DisappearInstruction as D};
