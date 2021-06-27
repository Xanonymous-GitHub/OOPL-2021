class ControllerServiceConcrete {
  getDispatchServer() {
    return this._dispatchServer
  }

  setDispatchServer(e) {
    this._dispatchServer = e
  }

  initDispatchServer() {
    this._dispatchServer.enableService()
  }

  disposeDispatchServer() {
    this._dispatchServer.disableService()
  }

  getRuleController() {
    return this._ruleController
  }

  getMapController() {
    return this._mapController
  }

  setRuleController(e) {
    this._ruleController = e
  }

  setMapController(e) {
    this._mapController = e
  }

  changeMapSize(e) {
    this._mapController.changeMapSize(e)
  }
}

const createControllerService = () => new ControllerServiceConcrete;
export {createControllerService as c};
