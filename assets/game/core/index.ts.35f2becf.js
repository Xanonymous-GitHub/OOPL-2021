import {c as s} from "./app/index.ts.83822a71.js";
import {c as e} from "./store/index.ts.f85a96c2.js";
import {c as t} from "./builders/stage.ts.1ece3c1a.js";
import {c as r} from "./builders/container.ts.547cd187.js";
import {c as a} from "./builders/sprite.ts.b312f8fd.js";
import {s as i, p as o, r as d, a as c, b as m} from "./game.ts.ddfbe9ad.js";

const n = s(), p = e();
p.bindAppToScreenService(n);
const u = a();
p.setSpriteBuilder(u);
const f = r();
p.setContainerBuilder(f);
const l = t(n.stage);
p.setStageBuilder(l);
const b = {
  gameView: n.view,
  startLevel: i,
  pause: o,
  resume: d,
  setYouGoneOutsideHandler: c,
  setGameOverOutsideHandler: m
}, j = new Promise((s => s(b)));
export {j as G, p as s};
