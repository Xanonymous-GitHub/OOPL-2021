import {R as t} from "./index.ts.d3e92ee2.js";
import {D as e} from "../types/things.ts.f6777fc9.js";
import {M as o} from "../controllers/map.ts.7e31983d.js";
import {s} from "../index.ts.35f2becf.js";

class MoveUpInstruction extends t {
  async perform() {
    await s.getMapController().notifyLeave(this._subject, [e.LEFT, e.RIGHT, e.DOWN]), await this._subject.moveUp(), await s.getMapController().update(this._subject, o.UP), await s.getMapController().notifyBeside(this._subject, [e.LEFT, e.RIGHT, e.TOP])
  }

  async unperform() {
    await s.getMapController().notifyLeave(this._subject, [e.TOP, e.LEFT, e.RIGHT]), await s.getMapController().update(this._subject, o.DOWN), await this._subject.moveDown(), await s.getMapController().notifyBeside(this._subject, [e.LEFT, e.RIGHT, e.DOWN])
  }
}

class MoveDownInstruction extends t {
  async perform() {
    await s.getMapController().notifyLeave(this._subject, [e.TOP, e.RIGHT, e.LEFT]), await this._subject.moveDown(), await s.getMapController().update(this._subject, o.DOWN), await s.getMapController().notifyBeside(this._subject, [e.DOWN, e.RIGHT, e.LEFT])
  }

  async unperform() {
    await s.getMapController().notifyLeave(this._subject, [e.TOP, e.RIGHT, e.LEFT]), await s.getMapController().update(this._subject, o.UP), await this._subject.moveUp(), await s.getMapController().notifyBeside(this._subject, [e.DOWN, e.RIGHT, e.LEFT])
  }
}

class MoveLeftInstruction extends t {
  async perform() {
    await s.getMapController().notifyLeave(this._subject, [e.TOP, e.DOWN, e.RIGHT]), await this._subject.moveLeft(), await s.getMapController().update(this._subject, o.LEFT), await s.getMapController().notifyBeside(this._subject, [e.TOP, e.DOWN, e.LEFT])
  }

  async unperform() {
    await s.getMapController().notifyLeave(this._subject, [e.TOP, e.DOWN, e.LEFT]), await s.getMapController().update(this._subject, o.RIGHT), await this._subject.moveRight(), await s.getMapController().notifyBeside(this._subject, [e.TOP, e.DOWN, e.RIGHT])
  }
}

class MoveRightInstruction extends t {
  async perform() {
    await s.getMapController().notifyLeave(this._subject, [e.TOP, e.DOWN, e.LEFT]), await this._subject.moveRight(), await s.getMapController().update(this._subject, o.RIGHT), await s.getMapController().notifyBeside(this._subject, [e.TOP, e.DOWN, e.RIGHT])
  }

  async unperform() {
    await s.getMapController().notifyLeave(this._subject, [e.TOP, e.DOWN, e.RIGHT]), await s.getMapController().update(this._subject, o.LEFT), await this._subject.moveLeft(), await s.getMapController().notifyBeside(this._subject, [e.TOP, e.DOWN, e.LEFT])
  }
}

const a = {MoveUpInstruction, MoveDownInstruction, MoveLeftInstruction, MoveRightInstruction};
export {MoveLeftInstruction as M, MoveRightInstruction as a, MoveDownInstruction as b, MoveUpInstruction as c, a as m};
