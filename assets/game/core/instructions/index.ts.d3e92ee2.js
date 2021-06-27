import {g as t} from "../../../../TheGameFramework/circleComponent.js";

class RawInstruction {
  constructor(r) {
    this._id = t(), this._subject = r
  }

  setPriority(t) {
    this._priority = t
  }

  getPriority() {
    return this._priority
  }
}

class EmptyInstruction extends RawInstruction {
  async perform() {
  }

  async unperform() {
  }
}

export {EmptyInstruction as E, RawInstruction as R};
