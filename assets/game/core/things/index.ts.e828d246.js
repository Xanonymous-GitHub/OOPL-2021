import {b as t} from "../../../../TheGameFramework/Box2D.js";
import {D as s} from "../types/things.ts.f6777fc9.js";
import {g as e} from "../../../../TheGameFramework/circleComponent.js";
import {g as i} from "./_mixins/handleEncounter.ts.052d3f67.js";
import {T as o, E as a, u as r} from "../../../../TheGameFramework/animationSprite.js";
import {T as h} from "../app/configs.ts.64c86f5e.js";
import {r as n} from "../utils/direction.ts.bbe62af2.js";

class Thing extends t {
  constructor(t, s, i, o, a, r, h, n, c) {
    super(i), this._id = e(), this.name = t, this._species = s, this._blockX = o, this._blockY = a, this._maxBlockX = h, this._maxBlockY = n, this._towards = null != c ? c : 0, this.updateTowards(this._towards), this._blockSize = r, this.height = r, this.width = r, this.anchor.set(.5), this.x = (this._blockX + .5) * this._blockSize, this.y = (this._blockY + .5) * this._blockSize, super.animationSpeed = .08, super.play()
  }

  bindThingController(t) {
    this.thingController = t
  }

  setup(t) {
    this.blockX = t.defaultBlockX, this.blockY = t.defaultBlockY, this.updateTowards(t.defaultTowards)
  }

  get blockX() {
    return Number(this._blockX)
  }

  set blockX(t) {
    this._blockX = t;
    const s = {x: this.x}, e = {x: (t + .5) * this._blockSize};
    let i = 0;
    const animate = t => {
      i = requestAnimationFrame(animate), r(t)
    };
    i = requestAnimationFrame(animate), new o(s).to(e, h).onUpdate((() => this.x = s.x)).easing(a.Quadratic.Out).onComplete((() => cancelAnimationFrame(i))).start()
  }

  get blockY() {
    return Number(this._blockY)
  }

  set blockY(t) {
    this._blockY = t;
    const s = {y: this.y}, e = {y: (t + .5) * this._blockSize};
    let i = 0;
    const animate = t => {
      i = requestAnimationFrame(animate), r(t)
    };
    i = requestAnimationFrame(animate), new o(s).to(e, h).easing(a.Quadratic.Out).onUpdate((() => this.y = s.y)).onComplete((() => cancelAnimationFrame(i))).start()
  }

  updateTowards(t) {
    switch (t) {
      case s.LEFT:
        this.scale.x = -1 * Math.abs(this.scale.x);
        break;
      case s.RIGHT:
        this.scale.x = Math.abs(this.scale.x)
    }
    this.towards = t
  }

  set towards(t) {
    this._towards = t
  }

  get towards() {
    return this._towards
  }

  get id() {
    return this._id
  }

  get species() {
    return this._species
  }

  atRightEdge() {
    return this.blockX === this._maxBlockX
  }

  atLeftEdge() {
    return 0 === this.blockX
  }

  atTopEdge() {
    return 0 === this.blockY
  }

  atBottomEdge() {
    return this.blockY === this._maxBlockY
  }

  async moveUp() {
    await new Promise(((t, s) => {
      this.atTopEdge() ? s() : this.blockY--, t()
    }))
  }

  async moveDown() {
    await new Promise(((t, s) => {
      this.atBottomEdge() ? s() : this.blockY++, t()
    }))
  }

  async moveRight() {
    await new Promise(((t, s) => {
      this.atRightEdge() ? s() : this.blockX++, t()
    }))
  }

  async moveLeft() {
    await new Promise(((t, s) => {
      this.atLeftEdge() ? s() : this.blockX--, t()
    }))
  }

  async reverseTowards() {
    await new Promise(((t, e) => {
      this.towards === s.UNDEFINED ? e() : (this.updateTowards(n(this.towards)), t())
    }))
  }

  handleBeside(t, s) {
    return Promise.resolve(void 0)
  }

  async handleEncounter(t, s) {
    return await i(this, t, s, this.thingController)
  }

  handleLeave(t, s) {
    return Promise.resolve(void 0)
  }
}

export {Thing as T};
