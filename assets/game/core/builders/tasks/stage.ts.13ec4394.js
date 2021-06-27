class StageTask {
}

class UnmountContainerFromStageTask extends StageTask {
  setArgs(t, e) {
    this._stage = t, this._container = e
  }

  async execute() {
    return await new Promise((t => {
      this._stage.removeChild(this._container), t()
    }))
  }
}

class MountContainerToStageAtIndexTask extends StageTask {
  setArgs(t, e, s) {
    this._stage = t, this._container = e, this._mountAtIndex = s
  }

  async execute() {
    await new Promise((t => {
      this._stage.addChildAt(this._container, this._mountAtIndex), t()
    }))
  }
}

export {MountContainerToStageAtIndexTask as M, UnmountContainerFromStageTask as U};
