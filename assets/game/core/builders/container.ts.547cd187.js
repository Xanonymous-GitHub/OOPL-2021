import {C as e} from "../../../../TheGameFramework/Box2D.js";
import {i as t} from "../../../../TheGameFramework/babel.min.js";
import {M as n, U as r} from "./tasks/container.ts.918497bc.js";
import {s} from "../index.ts.35f2becf.js";

class ContainerBuilderConcrete {
  constructor() {
    this.gameScene = new e, this._spriteController = s.getSpriteBuilder()
  }

  async createEmptyScene() {
    const n = s.getEmptyContainer();
    return t(n) ? new e : n.value
  }

  async createGameScene(e) {
    const t = await this.createEmptyScene(), r = await this._spriteController.getThings(e.thingsMap);
    await this._spriteController.connectThingsToThingController(r), s.getScanner().findRulesFromMap(s.getAppEdge());
    const a = new n;
    return a.setArgs(t, r), await a.execute(), this.gameScene = t, t
  }

  async removeThingFromGameScene(e) {
    const t = new r;
    t.setArgs(e, this.gameScene), await t.execute()
  }
}

const createContainerBuilder = () => new ContainerBuilderConcrete;
export {createContainerBuilder as c};
