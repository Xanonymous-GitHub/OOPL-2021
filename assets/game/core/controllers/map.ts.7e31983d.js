import {D as e} from "../types/things.ts.f6777fc9.js";
import {n as a, i as t, s, a as r} from "../../../../TheGameFramework/babel.min.js";
import {T as o} from "../instructions/transform.ts.4d2e30d1.js";
import {P as i} from "../types/properties.ts.9ca008cf.js";
import {M as n, a as m, b as l, c as h} from "../instructions/move.ts.530f944c.js";
import {E as c} from "../instructions/index.ts.d3e92ee2.js";
import {r as p} from "../utils/direction.ts.bbe62af2.js";

var g, d;
(d = g || (g = {})).UP = "up", d.DOWN = "down", d.RIGHT = "right", d.LEFT = "left", d.APPEAR = "appear", d.DISAPPEAR = "disappear";

class MapControllerConcrete {
  constructor() {
    this.maxX = 0, this.maxY = 0, this._gameMap = new Array(this.maxX + 1);
    for (let e = 0; e <= this.maxX; e++) this._gameMap[e] = new Array(this.maxY + 1);
    this._resetMap()
  }

  _resetMap() {
    for (let e = 0; e <= this.maxX; e++) for (let t = 0; t <= this.maxY; t++) this._gameMap[e][t] = a
  }

  _placeToPosition(e, a, o) {
    if (e < 0 || e > this.maxX || a < 0 || a > this.maxY) throw new Error(`Map system error, pos @ x:${e} y:${a} is out of range!`);
    if (t(this._gameMap[e][a])) this._gameMap[e][a] = s([o]); else {
      if (!r(this._gameMap[e][a])) throw new Error(`Map system error, pos @ x:${e} y:${a} is invalid type!`);
      this._gameMap[e][a].value.push(o)
    }
  }

  _removeFromPosition(e, a, t) {
    if (e < 0 || e > this.maxX || a < 0 || a > this.maxY) throw new Error(`Map system error, pos @ x:${e} y:${a} is out of range!`);
    if (!r(this._gameMap[e][a])) throw new Error(`Map system error, pos @ x:${e} y:${a} is invalid type!`);
    {
      const s = this._gameMap[e][a].value.findIndex((e => e.id === t.id));
      if (-1 === s) throw new Error(`Thing ${t.id} name = ${t.name} is not in the pos @ x:${e} y:${a}, can't be removed!`);
      this._gameMap[e][a].value.splice(s, 1)
    }
  }

  async canIEncounter(a, s) {
    const r = a.blockX, o = a.blockY;
    switch (s) {
      case e.UNDEFINED:
        return !1;
      case e.LEFT:
        return !a.atLeftEdge() && (!!t(this._gameMap[r - 1][o]) || (await Promise.all(this._gameMap[r - 1][o].value.map((t => t.handleEncounter(a, e.RIGHT))))).reduce(((e, a) => e && a), !0));
      case e.RIGHT:
        return !a.atRightEdge() && (!!t(this._gameMap[r + 1][o]) || (await Promise.all(this._gameMap[r + 1][o].value.map((t => t.handleEncounter(a, e.LEFT))))).reduce(((e, a) => e && a), !0));
      case e.TOP:
        return !a.atTopEdge() && (!!t(this._gameMap[r][o - 1]) || (await Promise.all(this._gameMap[r][o - 1].value.map((t => t.handleEncounter(a, e.DOWN))))).reduce(((e, a) => e && a), !0));
      case e.DOWN:
        return !a.atBottomEdge() && (!!t(this._gameMap[r][o + 1]) || (await Promise.all(this._gameMap[r][o + 1].value.map((t => t.handleEncounter(a, e.TOP))))).reduce(((e, a) => e && a), !0))
    }
  }

  async notifyBeside(a, s) {
    const r = a.blockX, o = a.blockY;
    await Promise.allSettled(s.map((s => {
      switch (s) {
        case e.UNDEFINED:
          return Promise.resolve();
        case e.LEFT:
          return a.atLeftEdge() || t(this._gameMap[r - 1][o]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r - 1][o].value.map((t => t.handleBeside(a, e.RIGHT))));
        case e.RIGHT:
          return a.atRightEdge() || t(this._gameMap[r + 1][o]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r + 1][o].value.map((t => t.handleBeside(a, e.LEFT))));
        case e.TOP:
          return a.atTopEdge() || t(this._gameMap[r][o - 1]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r][o - 1].value.map((t => t.handleBeside(a, e.DOWN))));
        case e.DOWN:
          return a.atBottomEdge() || t(this._gameMap[r][o + 1]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r][o + 1].value.map((t => t.handleBeside(a, e.TOP))))
      }
    })))
  }

  async notifyLeave(a, s) {
    const r = a.blockX, o = a.blockY;
    await Promise.allSettled(s.map((s => {
      switch (s) {
        case e.UNDEFINED:
          return Promise.resolve();
        case e.LEFT:
          return a.atLeftEdge() || t(this._gameMap[r - 1][o]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r - 1][o].value.map((t => t.handleLeave(a, e.RIGHT))));
        case e.RIGHT:
          return a.atRightEdge() || t(this._gameMap[r + 1][o]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r + 1][o].value.map((t => t.handleLeave(a, e.LEFT))));
        case e.TOP:
          return a.atTopEdge() || t(this._gameMap[r][o - 1]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r][o - 1].value.map((t => t.handleLeave(a, e.DOWN))));
        case e.DOWN:
          return a.atBottomEdge() || t(this._gameMap[r][o + 1]) ? Promise.resolve() : Promise.allSettled(this._gameMap[r][o + 1].value.map((t => t.handleLeave(a, e.TOP))))
      }
    })))
  }

  async update(e, a) {
    const t = e.blockX, s = e.blockY;
    switch (a) {
      case g.APPEAR:
        this._placeToPosition(t, s, e);
        break;
      case g.DISAPPEAR:
        this._removeFromPosition(t, s, e);
        break;
      case g.UP:
        this._removeFromPosition(t, s + 1, e), this._placeToPosition(t, s, e);
        break;
      case g.DOWN:
        this._removeFromPosition(t, s - 1, e), this._placeToPosition(t, s, e);
        break;
      case g.LEFT:
        this._removeFromPosition(t + 1, s, e), this._placeToPosition(t, s, e);
        break;
      case g.RIGHT:
        this._removeFromPosition(t - 1, s, e), this._placeToPosition(t, s, e)
    }
  }

  async appendTransformInstructions(e) {
    for (let a = 0; a <= this.maxX; a++) for (let s = 0; s <= this.maxY; s++) {
      const r = this._gameMap[a][s];
      if (!t(r)) for (const a of r.value) {
        const t = e.get(a.name);
        if (!t) continue;
        if (0 === t.length) continue;
        const s = new o(a);
        for (const e of t) s.addTransformName(e.feature);
        s.setPriority(9999999990002), a.thingController.addNewInstruction(s), a.thingController.pushInstructions()
      }
    }
  }

  async processMoveInstructions(a) {
    for (let s = 0; s <= this.maxX; s++) for (let r = 0; r <= this.maxY; r++) {
      const o = this._gameMap[s][r];
      if (!t(o)) for (const t of o.value) {
        const s = a.get(t.name);
        if (s && 0 !== s.length) for (const a of s) if (a.feature === i.MOVE) {
          const appendMoveInstruction = a => {
            let t;
            switch (a.towards) {
              case e.TOP:
                t = new h(a);
                break;
              case e.DOWN:
                t = new l(a);
                break;
              case e.RIGHT:
                t = new m(a);
                break;
              case e.LEFT:
                t = new n(a);
                break;
              default:
                t = new c(a)
            }
            t.setPriority(9999999990001), a.thingController.addNewInstruction(t), a.thingController.pushInstructions()
          };
          await this.canIEncounter(t, t.towards) ? await appendMoveInstruction(t) : await this.canIEncounter(t, p(t.towards)) && (await t.reverseTowards(), await appendMoveInstruction(t))
        }
      }
    }
  }

  async checkYouExistsInMap(e) {
    for (let a = 0; a <= this.maxX; a++) for (let s = 0; s <= this.maxY; s++) {
      const r = this._gameMap[a][s];
      if (!t(r)) for (const a of r.value) if (e.includes(a.name)) return !0
    }
    return !1
  }

  clean() {
    this._resetMap()
  }

  whoAreThere(e, a) {
    if (e < 0 || e > this.maxX || a < 0 || a > this.maxY) throw new Error(`Map system error, pos @ x:${e} y:${a} is out of range!`);
    return this._gameMap[e][a]
  }

  whoNearMe(e) {
    const t = e.blockX, s = e.blockY;
    return {
      up: e.atTopEdge() ? a : this._gameMap[t][s - 1],
      down: e.atBottomEdge() ? a : this._gameMap[t][s + 1],
      left: e.atLeftEdge() ? a : this._gameMap[t - 1][s],
      right: e.atRightEdge() ? a : this._gameMap[t + 1][s]
    }
  }

  changeMapSize(e) {
    this.maxX = e.maxX, this.maxY = e.maxY, this._gameMap = new Array(this.maxX + 1);
    for (let a = 0; a <= this.maxX; a++) this._gameMap[a] = new Array(this.maxY + 1);
    this.clean()
  }
}

const createMapController = () => new MapControllerConcrete;
export {g as M, createMapController as c};
