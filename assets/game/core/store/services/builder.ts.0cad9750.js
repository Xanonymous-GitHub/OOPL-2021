class BuilderServiceConcrete {
  getContainerBuilder() {
    return this._containerBuilder
  }

  getSpriteBuilder() {
    return this._spriteBuilder
  }

  getStageBuilder() {
    return this._stageBuilder
  }

  setContainerBuilder(e) {
    this._containerBuilder = e
  }

  setSpriteBuilder(e) {
    this._spriteBuilder = e
  }

  setStageBuilder(e) {
    this._stageBuilder = e
  }
}

const createBuilderService = () => new BuilderServiceConcrete;
export {createBuilderService as c};
