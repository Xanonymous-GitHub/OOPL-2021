import {E as t} from "../instructions/index.ts.d3e92ee2.js";
import {g as s} from "../../../../TheGameFramework/circleComponent.js";
import {M as e} from "./map.ts.7e31983d.js";
import {C as i} from "../store/services/command.ts.dbf1f3a4.js";
import {P as n} from "../types/properties.ts.9ca008cf.js";
import {D as r} from "../types/things.ts.f6777fc9.js";
import {m as o} from "../instructions/move.ts.530f944c.js";
import {s as h} from "../index.ts.35f2becf.js";
import {U as c} from "../instructions/towards.ts.9e530d8e.js";
import {S as a} from "../../../../TheGameFramework/ResourceManager.js";

class ThingControllerConcrete {
  constructor(t) {
    this.observeId = s(), this._instructions = [], h.getDispatchServer().addObserver(this), this._thing = t, this._thing.bindThingController(this), h.getMapController().update(this._thing, e.APPEAR).then()
  }

  clearInstructions() {
    this._instructions = []
  }

  addNewInstruction(t) {
    this._instructions.push(t)
  }

  pushInstructions() {
    h.getDispatchServer().addInstructions(this._instructions), this.clearInstructions()
  }

  async update(s, e) {
    if (!(h.getRuleController().$is(this._thing, n.YOU) || h.getRuleController().$is(this._thing, n.YOU2))) return;
    if (!(await h.getMapController().canIEncounter(this._thing, (() => {
      switch (e.value) {
        case i.UP:
          return r.TOP;
        case i.DOWN:
          return r.DOWN;
        case i.LEFT:
          return r.LEFT;
        case i.RIGHT:
          return r.RIGHT;
        default:
          return r.UNDEFINED
      }
    })()))) return;
    let u;
    switch (e.value) {
      case i.UP:
        u = new o.MoveUpInstruction(this._thing), this._thing.species === a.CHARACTERS && this.addNewInstruction(new c(this._thing, r.TOP));
        break;
      case i.DOWN:
        u = new o.MoveDownInstruction(this._thing), this._thing.species === a.CHARACTERS && this.addNewInstruction(new c(this._thing, r.DOWN));
        break;
      case i.LEFT:
        u = new o.MoveLeftInstruction(this._thing), this._thing.species === a.CHARACTERS && this.addNewInstruction(new c(this._thing, r.LEFT));
        break;
      case i.RIGHT:
        u = new o.MoveRightInstruction(this._thing), this._thing.species === a.CHARACTERS && this.addNewInstruction(new c(this._thing, r.RIGHT));
        break;
      default:
        u = new t(this._thing)
    }
    h.getDispatchServer().needScanRule(), this.addNewInstruction(u), this.pushInstructions()
  }

  stopDispatcher() {
    h.getDispatchServer().disableService()
  }

  disconnect() {
    h.getDispatchServer().deleteObserver(this)
  }
}

const createThingController = t => new ThingControllerConcrete(t);
export {createThingController as c};
