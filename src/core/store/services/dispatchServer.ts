import {InstructionDispatchServer} from '../../observer';
import {RuleController} from '../../observer/rule';
import {MapController} from '../../observer/map';

export interface DispatchServerService {
    setDispatchServer: (server: InstructionDispatchServer) => void
    getDispatchServer: () => InstructionDispatchServer
    initDispatchServer: () => void
    disposeDispatchServer: () => void
    setRuleController: (controller: RuleController) => void
    setMapController: (controller: MapController) => void
    getRuleController: () => RuleController
    getMapController: () => MapController
}

class DispatchServerServiceConcrete implements DispatchServerService {
    private _dispatchServer!: InstructionDispatchServer
    private _ruleController!: RuleController
    private _mapController!: MapController

    public getDispatchServer(): InstructionDispatchServer {
        return this._dispatchServer
    }

    public setDispatchServer(dispatchServer: InstructionDispatchServer): void {
        this._dispatchServer = dispatchServer
    }

    public initDispatchServer() {
        this._dispatchServer.enableService()
    }

    public disposeDispatchServer() {
        this._dispatchServer.disableService()
    }

    public getRuleController() {
        return this._ruleController
    }

    public getMapController() {
        return this._mapController
    }

    public setRuleController(ruleController: RuleController) {
        this._ruleController = ruleController
    }

    public setMapController(mapController: MapController) {
        this._mapController = mapController
    }
}

export const createDispatchServerService = (): DispatchServerService => {
    return new DispatchServerServiceConcrete()
}