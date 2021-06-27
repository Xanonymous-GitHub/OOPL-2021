import {s} from "./index.ts.35f2becf.js";
import {g as e} from "../../../TheGameFramework/ResourceManager.js";
import {s as t} from "./utils/time.ts.66310a7d.js";
import {c as a} from "./controllers/dispatcher.ts.c9f80b1c.js";
import {c as r} from "./controllers/map.ts.7e31983d.js";
import {c as o} from "./controllers/rule.ts.a6a5588a.js";
import {c} from "./controllers/tools/ruleScanner.ts.fca26eee.js";
import {R as i} from "./app/configs.ts.64c86f5e.js";

const startLevel = async t => {
  const n = s.getStageBuilder();
  s.getDispatchServer() && s.disposeDispatchServer(), await s.loadResources(i);
  const p = r();
  s.setMapController(p);
  const m = o(p);
  s.setRuleController(m);
  const l = c(m, p);
  s.setScanner(l);
  const f = a();
  s.setDispatchServer(f), s.connectDispatchListener(f.commandListener), await n.removeScene();
  const S = await e(t);
  await n.addGameScene(S), s.initDispatchServer(), s.initCommandWatchService()
};
let n, p;
const setYouGoneOutsideHandler = s => {
  p = async e => {
    await s(e)
  }
}, setGameOverOutsideHandler = e => {
  n = async a => {
    const r = s.getStageBuilder();
    s.disposeDispatchServer(), await t(300), await e(a), await r.removeScene()
  }
}, pause = () => {
  s.disposeDispatchServer()
}, resume = () => {
  s.initDispatchServer()
};
export {
  setYouGoneOutsideHandler as a,
  setGameOverOutsideHandler as b,
  n as g,
  pause as p,
  resume as r,
  startLevel as s,
  p as y
};
