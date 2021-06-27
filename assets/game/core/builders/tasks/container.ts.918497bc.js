class ContainerTask {
}

class MountThingsToContainerTask extends ContainerTask {
  setArgs(n, t) {
    this._things = t, this._container = n
  }

  async execute() {
    return await new Promise((n => {
      this._container.addChild(...this._things), n(this._container)
    }))
  }
}

class UnMountThingFromContainerTask extends ContainerTask {
  setArgs(n, t) {
    this._container = t, this._target = n
  }

  async execute() {
    return await new Promise((n => {
      const t = this._container.getChildIndex(this._target);
      n(this._container.removeChildAt(t))
    }))
  }
}

export {MountThingsToContainerTask as M, UnMountThingFromContainerTask as U};
