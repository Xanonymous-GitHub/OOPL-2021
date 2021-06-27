import {O as t} from "../observer/observable.ts.50d46e51.js";
import {n as e, s, a as n, i} from "../../../../TheGameFramework/babel.min.js";
import {P as r} from "../data-structures/priorityQueue.ts.8e49c221.js";
import {g as o} from "../../../../TheGameFramework/circleComponent.js";
import {s as a} from "../index.ts.35f2becf.js";
import {y as u} from "../game.ts.ddfbe9ad.js";

class InstructionDispatchServerConcrete extends t {
  constructor() {
    super(), this._runningCommand = !1, this._isActive = !1, this._needScanRule = !1, this._existYou = !0, this._pendingInstructions = new r, this.commandListener = {
      observeId: o(),
      update: async () => {
        await this._run()
      }
    }
  }

  _setRunning() {
    this._runningCommand = !0
  }

  _setNotRunning() {
    this._runningCommand = !1
  }

  enableService() {
    this._isActive = !0
  }

  disableService() {
    this._isActive = !1
  }

  static _judgementInstructionPriority(t) {
    const e = t.getPriority();
    return e || Date.now()
  }

  addInstructions(t) {
    for (const e of t) {
      const t = InstructionDispatchServerConcrete._judgementInstructionPriority(e);
      this._pendingInstructions.add(e, t)
    }
  }

  _nextInstruction() {
    const t = this._pendingInstructions.poll();
    return t ? s(t) : e
  }

  needScanRule() {
    this._needScanRule = !0
  }

  async _executeInstructions() {
    let t = this._nextInstruction();
    for (; n(t);) await t.value.perform(), t = this._nextInstruction()
  }

  async _run() {
    const t = a.nextCommand();
    if (!this._isActive || this._runningCommand) return;
    if (i(t)) return;
    this._setRunning(), this.setChanged(), await this.notifyObservers(t.value), await this._executeInstructions(), this._needScanRule && (a.getRuleController().refreshAll(), a.getScanner().findRulesFromMap(a.getAppEdge()), await a.getRuleController().processImmediateChanges(), this._needScanRule = !1), await this._executeInstructions();
    const e = await a.getRuleController().checkYouExistsInLevel();
    e !== this._existYou && (this._existYou = e, setTimeout((() => {
      u(this._existYou)
    }), 2e3)), this._setNotRunning()
  }
}

const createInstructionDispatchServer = () => new InstructionDispatchServerConcrete;
export {createInstructionDispatchServer as c};
