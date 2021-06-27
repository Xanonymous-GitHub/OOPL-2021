var t, e = {
  Linear: {
    None: function (t) {
      return t
    }
  }, Quadratic: {
    In: function (t) {
      return t * t
    }, Out: function (t) {
      return t * (2 - t)
    }, InOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
    }
  }, Cubic: {
    In: function (t) {
      return t * t * t
    }, Out: function (t) {
      return --t * t * t + 1
    }, InOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
    }
  }, Quartic: {
    In: function (t) {
      return t * t * t * t
    }, Out: function (t) {
      return 1 - --t * t * t * t
    }, InOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
    }
  }, Quintic: {
    In: function (t) {
      return t * t * t * t * t
    }, Out: function (t) {
      return --t * t * t * t * t + 1
    }, InOut: function (t) {
      return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
    }
  }, Sinusoidal: {
    In: function (t) {
      return 1 - Math.cos(t * Math.PI / 2)
    }, Out: function (t) {
      return Math.sin(t * Math.PI / 2)
    }, InOut: function (t) {
      return .5 * (1 - Math.cos(Math.PI * t))
    }
  }, Exponential: {
    In: function (t) {
      return 0 === t ? 0 : Math.pow(1024, t - 1)
    }, Out: function (t) {
      return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
    }, InOut: function (t) {
      return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
    }
  }, Circular: {
    In: function (t) {
      return 1 - Math.sqrt(1 - t * t)
    }, Out: function (t) {
      return Math.sqrt(1 - --t * t)
    }, InOut: function (t) {
      return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    }
  }, Elastic: {
    In: function (t) {
      return 0 === t ? 0 : 1 === t ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI)
    }, Out: function (t) {
      return 0 === t ? 0 : 1 === t ? 1 : Math.pow(2, -10 * t) * Math.sin(5 * (t - .1) * Math.PI) + 1
    }, InOut: function (t) {
      return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) + 1
    }
  }, Back: {
    In: function (t) {
      var e = 1.70158;
      return t * t * ((e + 1) * t - e)
    }, Out: function (t) {
      var e = 1.70158;
      return --t * t * ((e + 1) * t + e) + 1
    }, InOut: function (t) {
      var e = 2.5949095;
      return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
    }
  }, Bounce: {
    In: function (t) {
      return 1 - e.Bounce.Out(1 - t)
    }, Out: function (t) {
      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }, InOut: function (t) {
      return t < .5 ? .5 * e.Bounce.In(2 * t) : .5 * e.Bounce.Out(2 * t - 1) + .5
    }
  }
}, n = "undefined" == typeof self && "undefined" != typeof process && process.hrtime ? function () {
  var t = process.hrtime();
  return 1e3 * t[0] + t[1] / 1e6
} : "undefined" != typeof self && void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now.bind(self.performance) : void 0 !== Date.now ? Date.now : function () {
  return (new Date).getTime()
}, i = function () {
  function Group2() {
    this._tweens = {}, this._tweensAddedDuringUpdate = {}
  }

  return Group2.prototype.getAll = function () {
    var t = this;
    return Object.keys(this._tweens).map((function (e) {
      return t._tweens[e]
    }))
  }, Group2.prototype.removeAll = function () {
    this._tweens = {}
  }, Group2.prototype.add = function (t) {
    this._tweens[t.getId()] = t, this._tweensAddedDuringUpdate[t.getId()] = t
  }, Group2.prototype.remove = function (t) {
    delete this._tweens[t.getId()], delete this._tweensAddedDuringUpdate[t.getId()]
  }, Group2.prototype.update = function (t, e) {
    void 0 === t && (t = n()), void 0 === e && (e = !1);
    var i = Object.keys(this._tweens);
    if (0 === i.length) return !1;
    for (; i.length > 0;) {
      this._tweensAddedDuringUpdate = {};
      for (var r = 0; r < i.length; r++) {
        var s = this._tweens[i[r]], o = !e;
        s && !1 === s.update(t, o) && !e && delete this._tweens[i[r]]
      }
      i = Object.keys(this._tweensAddedDuringUpdate)
    }
    return !0
  }, Group2
}(), r = {
  Linear: function (t, e) {
    var n = t.length - 1, i = n * e, s = Math.floor(i), o = r.Utils.Linear;
    return e < 0 ? o(t[0], t[1], i) : e > 1 ? o(t[n], t[n - 1], n - i) : o(t[s], t[s + 1 > n ? n : s + 1], i - s)
  }, Bezier: function (t, e) {
    for (var n = 0, i = t.length - 1, s = Math.pow, o = r.Utils.Bernstein, a = 0; a <= i; a++) n += s(1 - e, i - a) * s(e, a) * t[a] * o(i, a);
    return n
  }, CatmullRom: function (t, e) {
    var n = t.length - 1, i = n * e, s = Math.floor(i), o = r.Utils.CatmullRom;
    return t[0] === t[n] ? (e < 0 && (s = Math.floor(i = n * (1 + e))), o(t[(s - 1 + n) % n], t[s], t[(s + 1) % n], t[(s + 2) % n], i - s)) : e < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -i) - t[0]) : e > 1 ? t[n] - (o(t[n], t[n], t[n - 1], t[n - 1], i - n) - t[n]) : o(t[s ? s - 1 : 0], t[s], t[n < s + 1 ? n : s + 1], t[n < s + 2 ? n : s + 2], i - s)
  }, Utils: {
    Linear: function (t, e, n) {
      return (e - t) * n + t
    }, Bernstein: function (t, e) {
      var n = r.Utils.Factorial;
      return n(t) / n(e) / n(t - e)
    }, Factorial: (t = [1], function (e) {
      var n = 1;
      if (t[e]) return t[e];
      for (var i = e; i > 1; i--) n *= i;
      return t[e] = n, n
    }), CatmullRom: function (t, e, n, i, r) {
      var s = .5 * (n - t), o = .5 * (i - e), a = r * r;
      return (2 * e - 2 * n + s + o) * (r * a) + (-3 * e + 3 * n - 2 * s - o) * a + s * r + e
    }
  }
}, s = function () {
  function Sequence2() {
  }

  return Sequence2.nextId = function () {
    return Sequence2._nextId++
  }, Sequence2._nextId = 0, Sequence2
}(), o = new i, a = function () {
  function Tween2(t, n) {
    void 0 === n && (n = o), this._object = t, this._group = n, this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = e.Linear.None, this._interpolationFunction = r.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._id = s.nextId(), this._isChainStopped = !1, this._goToEnd = !1
  }

  return Tween2.prototype.getId = function () {
    return this._id
  }, Tween2.prototype.isPlaying = function () {
    return this._isPlaying
  }, Tween2.prototype.isPaused = function () {
    return this._isPaused
  }, Tween2.prototype.to = function (t, e) {
    return this._valuesEnd = Object.create(t), void 0 !== e && (this._duration = e), this
  }, Tween2.prototype.duration = function (t) {
    return this._duration = t, this
  }, Tween2.prototype.start = function (t) {
    if (this._isPlaying) return this;
    if (this._group && this._group.add(this), this._repeat = this._initialRepeat, this._reversed) for (var e in this._reversed = !1, this._valuesStartRepeat) this._swapEndStartRepeatValues(e), this._valuesStart[e] = this._valuesStartRepeat[e];
    return this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = void 0 !== t ? "string" == typeof t ? n() + parseFloat(t) : t : n(), this._startTime += this._delayTime, this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat), this
  }, Tween2.prototype._setupProperties = function (t, e, n, i) {
    for (var r in n) {
      var s = t[r], o = Array.isArray(s), a = o ? "array" : typeof s, u = !o && Array.isArray(n[r]);
      if ("undefined" !== a && "function" !== a) {
        if (u) {
          var h = n[r];
          if (0 === h.length) continue;
          h = h.map(this._handleRelativeValue.bind(this, s)), n[r] = [s].concat(h)
        }
        if ("object" !== a && !o || !s || u) void 0 === e[r] && (e[r] = s), o || (e[r] *= 1), i[r] = u ? n[r].slice().reverse() : e[r] || 0; else {
          for (var p in e[r] = o ? [] : {}, s) e[r][p] = s[p];
          i[r] = o ? [] : {}, this._setupProperties(s, e[r], n[r], i[r])
        }
      }
    }
  }, Tween2.prototype.stop = function () {
    return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._group && this._group.remove(this), this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this
  }, Tween2.prototype.end = function () {
    return this._goToEnd = !0, this.update(1 / 0), this
  }, Tween2.prototype.pause = function (t) {
    return void 0 === t && (t = n()), this._isPaused || !this._isPlaying || (this._isPaused = !0, this._pauseStart = t, this._group && this._group.remove(this)), this
  }, Tween2.prototype.resume = function (t) {
    return void 0 === t && (t = n()), this._isPaused && this._isPlaying ? (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this._group && this._group.add(this), this) : this
  }, Tween2.prototype.stopChainedTweens = function () {
    for (var t = 0, e = this._chainedTweens.length; t < e; t++) this._chainedTweens[t].stop();
    return this
  }, Tween2.prototype.group = function (t) {
    return this._group = t, this
  }, Tween2.prototype.delay = function (t) {
    return this._delayTime = t, this
  }, Tween2.prototype.repeat = function (t) {
    return this._initialRepeat = t, this._repeat = t, this
  }, Tween2.prototype.repeatDelay = function (t) {
    return this._repeatDelayTime = t, this
  }, Tween2.prototype.yoyo = function (t) {
    return this._yoyo = t, this
  }, Tween2.prototype.easing = function (t) {
    return this._easingFunction = t, this
  }, Tween2.prototype.interpolation = function (t) {
    return this._interpolationFunction = t, this
  }, Tween2.prototype.chain = function () {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    return this._chainedTweens = t, this
  }, Tween2.prototype.onStart = function (t) {
    return this._onStartCallback = t, this
  }, Tween2.prototype.onUpdate = function (t) {
    return this._onUpdateCallback = t, this
  }, Tween2.prototype.onRepeat = function (t) {
    return this._onRepeatCallback = t, this
  }, Tween2.prototype.onComplete = function (t) {
    return this._onCompleteCallback = t, this
  }, Tween2.prototype.onStop = function (t) {
    return this._onStopCallback = t, this
  }, Tween2.prototype.update = function (t, e) {
    if (void 0 === t && (t = n()), void 0 === e && (e = !0), this._isPaused) return !0;
    var i, r, s = this._startTime + this._duration;
    if (!this._goToEnd && !this._isPlaying) {
      if (t > s) return !1;
      e && this.start(t)
    }
    if (this._goToEnd = !1, t < this._startTime) return !0;
    !1 === this._onStartCallbackFired && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), r = (t - this._startTime) / this._duration, r = 0 === this._duration || r > 1 ? 1 : r;
    var o = this._easingFunction(r);
    if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, o), this._onUpdateCallback && this._onUpdateCallback(this._object, r), 1 === r) {
      if (this._repeat > 0) {
        for (i in isFinite(this._repeat) && this._repeat--, this._valuesStartRepeat) this._yoyo || "string" != typeof this._valuesEnd[i] || (this._valuesStartRepeat[i] = this._valuesStartRepeat[i] + parseFloat(this._valuesEnd[i])), this._yoyo && this._swapEndStartRepeatValues(i), this._valuesStart[i] = this._valuesStartRepeat[i];
        return this._yoyo && (this._reversed = !this._reversed), void 0 !== this._repeatDelayTime ? this._startTime = t + this._repeatDelayTime : this._startTime = t + this._delayTime, this._onRepeatCallback && this._onRepeatCallback(this._object), !0
      }
      this._onCompleteCallback && this._onCompleteCallback(this._object);
      for (var a = 0, u = this._chainedTweens.length; a < u; a++) this._chainedTweens[a].start(this._startTime + this._duration);
      return this._isPlaying = !1, !1
    }
    return !0
  }, Tween2.prototype._updateProperties = function (t, e, n, i) {
    for (var r in n) if (void 0 !== e[r]) {
      var s = e[r] || 0, o = n[r], a = Array.isArray(t[r]), u = Array.isArray(o);
      !a && u ? t[r] = this._interpolationFunction(o, i) : "object" == typeof o && o ? this._updateProperties(t[r], s, o, i) : "number" == typeof (o = this._handleRelativeValue(s, o)) && (t[r] = s + (o - s) * i)
    }
  }, Tween2.prototype._handleRelativeValue = function (t, e) {
    return "string" != typeof e ? e : "+" === e.charAt(0) || "-" === e.charAt(0) ? t + parseFloat(e) : parseFloat(e)
  }, Tween2.prototype._swapEndStartRepeatValues = function (t) {
    var e = this._valuesStartRepeat[t], n = this._valuesEnd[t];
    this._valuesStartRepeat[t] = "string" == typeof n ? this._valuesStartRepeat[t] + parseFloat(n) : this._valuesEnd[t], this._valuesEnd[t] = e
  }, Tween2
}(), u = o;
u.getAll.bind(u), u.removeAll.bind(u), u.add.bind(u), u.remove.bind(u);
var h = u.update.bind(u);
export {e as E, a as T, h as u};
