import {L as e} from "../../../../../TheGameFramework/Box2D.js";

class TextureServiceConcrete {
  constructor() {
    this._loadingProgress = 0
  }

  _prepareLoadedResources(r) {
    const s = e.shared.resources[r.trim()].spritesheet;
    if (!s) throw new Error("Could not get game resources!");
    this._resourcesSheet = s
  }

  loadResources(r) {
    return this._resourcesSheet ? Promise.resolve() : new Promise((s => {
      e.shared.add(r.trim()).load((() => {
        this._prepareLoadedResources(r), s()
      }))
    }))
  }

  getLoadingProgress() {
    return this._loadingProgress
  }

  getAnimationTextures(e, r) {
    const s = this._resourcesSheet.animations[`${e}/${r}`];
    if (!s) throw new Error(`Could not found the resource of ${e}/${r} !`);
    return s
  }
}

const createTextureService = () => new TextureServiceConcrete;
export {createTextureService as c};
