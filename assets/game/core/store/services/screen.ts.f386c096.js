import {g as e} from "../../app/screen.ts.6b359092.js";

class ScreenServiceConcrete {
  getAppEdge() {
    return this._edge
  }

  getScreenSize() {
    return {width: this._screenWidth, height: this._screenHeight}
  }

  setAppSize(t, i) {
    this._edge.maxX = t - 1, this._edge.maxY = i - 1, this._screenHeight = innerHeight, this._screenWidth = innerWidth;
    const s = e(this._edge, this.getScreenSize());
    this._gameApp.renderer.resize(t * s, i * s)
  }

  bindAppToScreenService(e) {
    this._gameApp = e, this._edge = {maxX: this._gameApp.screen.x, maxY: this._gameApp.screen.y}
  }
}

const createScreenService = () => new ScreenServiceConcrete;
export {createScreenService as c};
