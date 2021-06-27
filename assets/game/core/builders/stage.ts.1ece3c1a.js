import {M as e, U as t} from "./tasks/stage.ts.13ec4394.js";
import {s} from "../index.ts.35f2becf.js";

class StageBuilderConcrete {
  constructor(e) {
    this._stage = e, this._stage.sortableChildren = !0, this._containerBuilder = s.getContainerBuilder()
  }

  async addGameScene(t) {
    s.setAppSize(t.sceneWidth, t.sceneHeight), s.changeMapSize(s.getAppEdge());
    const a = await this._containerBuilder.createGameScene(t), i = new e;
    i.setArgs(this._stage, a, 0), await i.execute()
  }

  async removeScene() {
    const e = this._containerBuilder.gameScene, s = new t;
    s.setArgs(this._stage, e), await s.execute()
  }
}

const createStageBuilder = e => new StageBuilderConcrete(e);
export {createStageBuilder as c};
