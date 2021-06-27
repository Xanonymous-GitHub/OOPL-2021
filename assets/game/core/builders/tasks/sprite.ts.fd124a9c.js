import {T as s} from "../../things/factory.ts.8e4dfd75.js";
import {c as t} from "../../controllers/thing.ts.81b0e558.js";

class SpriteTask {
}

class CreateThingTask extends SpriteTask {
  setArgs(s, t, e, i, a, c, h, n, r) {
    this._name = s, this._species = t, this._textures = e, this._defaultBlockX = i, this._defaultBlockY = a, this._blockSize = c, this._maxBlockX = h, this._maxBlockY = n, this._defaultTowards = r
  }

  async execute() {
    return await new Promise(((t, e) => {
      const i = new s(this._species, this._name).createInstance(this._name, this._species, this._textures, this._defaultBlockX, this._defaultBlockY, this._blockSize, this._maxBlockX, this._maxBlockY, this._defaultTowards);
      i && t(i), e(i)
    }))
  }
}

class connectThingControllerTask extends SpriteTask {
  setArgs(s) {
    this._thing = s
  }

  async execute() {
    return await new Promise((s => {
      t(this._thing), s()
    }))
  }
}

export {CreateThingTask as C, connectThingControllerTask as c};
