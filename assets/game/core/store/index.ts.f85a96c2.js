var e = Object.defineProperty, t = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty,
  n = Object.prototype.propertyIsEnumerable, __defNormalProp = (t, r, n) => r in t ? e(t, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : t[r] = n, __spreadValues = (e, a) => {
    for (var i in a || (a = {})) r.call(a, i) && __defNormalProp(e, i, a[i]);
    if (t) for (var i of t(a)) n.call(a, i) && __defNormalProp(e, i, a[i]);
    return e
  };
import {c as a} from "./services/index.ts.b4d3e161.js";

const createGameStore = () => {
  const e = a(), t = (r = e.containerService, {
    getContainerByName: e => r.getContainerByName(e),
    getNonEmptyContainerByIndex: e => r.getNonEmptyContainerByIndex(e),
    getEmptyContainer: () => r.getEmptyContainer(),
    addContainer: (e, t, n) => r.addContainer(e, t, n),
    hasContainerById: e => r.hasContainerById(e),
    hasContainerByName: e => r.hasContainerByName(e),
    hasAnyContainer: () => r.hasAnyContainer()
  });
  var r;
  const n = (i = e.spriteService, {
    getSpriteByName: e => i.getSpriteByName(e),
    getSpritesByName: (e, t) => i.getSpritesByName(e, t),
    getSpriteAmountByName: e => i.getSpriteAmountByName(e),
    addSpriteByName: (e, t) => i.addSpriteByName(e, t),
    addSpritesByName: (e, t) => i.addSpritesByName(e, t)
  });
  var i;
  const o = (s = e.textureService, {
    loadResources: e => s.loadResources(e),
    getAnimationTextures: (e, t) => s.getAnimationTextures(e, t),
    getLoadingProgress: () => s.getLoadingProgress()
  });
  var s;
  const c = (p = e.controllerService, {
    setDispatchServer: e => p.setDispatchServer(e),
    getDispatchServer: () => p.getDispatchServer(),
    initDispatchServer: () => p.initDispatchServer(),
    disposeDispatchServer: () => p.disposeDispatchServer(),
    setRuleController: e => p.setRuleController(e),
    setMapController: e => p.setMapController(e),
    getRuleController: () => p.getRuleController(),
    getMapController: () => p.getMapController(),
    changeMapSize: e => p.changeMapSize(e)
  });
  var p;
  const d = (S = e.commandService, {
    nextCommand: () => S.nextCommand(),
    addCommand: e => S.addCommand(e),
    clearCommand: () => S.clearCommand(),
    initCommandWatchService: () => S.initCommandWatchService(),
    connectDispatchListener: e => S.connectDispatchListener(e)
  });
  var S;
  const l = (g = e.screenService, {
    setAppSize: (e, t) => g.setAppSize(e, t),
    getAppEdge: () => g.getAppEdge(),
    bindAppToScreenService: e => g.bindAppToScreenService(e),
    getScreenSize: () => g.getScreenSize()
  });
  var g;
  const m = (C = e.scannerService, {setScanner: e => C.setScanner(e), getScanner: () => C.getScanner()});
  var C;
  const v = (y = e.builderService, {
    setStageBuilder: e => y.setStageBuilder(e),
    setContainerBuilder: e => y.setContainerBuilder(e),
    setSpriteBuilder: e => y.setSpriteBuilder(e),
    getStageBuilder: () => y.getStageBuilder(),
    getContainerBuilder: () => y.getContainerBuilder(),
    getSpriteBuilder: () => y.getSpriteBuilder()
  });
  var y;
  return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, t), d), n), o), c), l), m), v)
};
export {createGameStore as c};
