import {P as t} from "../../data-structures/priorityQueue.ts.8e49c221.js";
import {M as o, C as a} from "../../app/configs.ts.64c86f5e.js";
import {d as e} from "../../utils/debouncer.ts.5889483f.js";
import {m as i} from "../../../../../TheGameFramework/KeyBoardManager.js";
import {n as r, s} from "../../../../../TheGameFramework/babel.min.js";
import {O as m} from "../../observer/observable.ts.50d46e51.js";

var n, c;
(c = n || (n = {})).UP = "up", c.DOWN = "down", c.LEFT = "left", c.RIGHT = "right", c.ESC = "esc";
const d = [{command: {value: n.UP}, priority: 1}, {command: {value: n.DOWN}, priority: 1}, {
  command: {value: n.LEFT},
  priority: 1
}, {command: {value: n.RIGHT}, priority: 1}];

class CommandServiceConcrete {
  constructor() {
    this._commandPackages = new t, this._commandPrioritiesMap = (() => {
      const t = new Map;
      for (const o of d) t.set(o.command, o.priority);
      return t
    })(), this._dispatchNotifier = new m, this._commandWatchServiceStarted = !1
  }

  _judgementCommandPriority(t) {
    const o = this._commandPrioritiesMap.get(t);
    if (void 0 === o || void 0 === o) throw new Error(`this command ${t} is not have any priority defined`);
    return 0 === o ? o : Date.now()
  }

  get _size() {
    return this._commandPackages.size()
  }

  addCommand(t) {
    this._size < o && e((() => {
      const o = this._judgementCommandPriority(t);
      this._commandPackages.add({
        command: t,
        priority: o
      }, o), this._dispatchNotifier.setChanged(), this._dispatchNotifier.notifyObservers().then()
    }), a)()
  }

  connectDispatchListener(t) {
    this._dispatchNotifier.addObserver(t)
  }

  clearCommand() {
    this._commandPackages.clear()
  }

  nextCommand() {
    const t = this._commandPackages.poll();
    return t ? s(t.command) : r
  }

  initCommandWatchService() {
    if (!this._commandWatchServiceStarted) {
      for (const o of d) i.bind(o.command.value, (() => this.addCommand(o.command)));
      const t = ["w", "s", "a", "d"];
      for (let o = 0; o < 4; o++) i.bind(t[o], (() => this.addCommand(d[o].command)));
      this._commandWatchServiceStarted = !0
    }
  }
}

const createCommandService = () => new CommandServiceConcrete;
export {n as C, createCommandService as c};
