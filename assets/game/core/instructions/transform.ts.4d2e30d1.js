import {R as s} from "./index.ts.d3e92ee2.js";
import {n as t, a as e, s as i, i as r} from "../../../../TheGameFramework/babel.min.js";
import {s as a} from "../index.ts.35f2becf.js";
import {c as n, g as o} from "../utils/thingType.ts.fb8ee777.js";
import {s as h} from "../utils/time.ts.66310a7d.js";
import {T as m} from "../app/configs.ts.64c86f5e.js";

class TransformInstruction extends s {
  constructor(s) {
    super(s), this._originalName = this._subject.name, this._originalTexture = this._subject.texture, this._thingTypes = t
  }

  addTransformName(s) {
    e(this._thingTypes) ? this._thingTypes.value.push(s) : this._thingTypes = i([s])
  }

  async perform() {
    if (r(this._thingTypes)) return;
    if (this._thingTypes.value.length > 1) return;
    await h(m);
    const s = n(this._thingTypes.value[0]);
    this._subject.name = s;
    const t = o(s);
    this._subject.textures = a.getAnimationTextures(t, this._subject.name)
  }

  async unperform() {
    await h(m), this._subject.texture = this._originalTexture, this._subject.name = this._originalName
  }
}

export {TransformInstruction as T};
