var e, t = {exports: {}};
e = t, function (t, n, r) {
  if (t) {
    for (var a, o = {
      8: "backspace",
      9: "tab",
      13: "enter",
      16: "shift",
      17: "ctrl",
      18: "alt",
      20: "capslock",
      27: "esc",
      32: "space",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      45: "ins",
      46: "del",
      91: "meta",
      93: "meta",
      224: "meta"
    }, i = {
      106: "*",
      107: "+",
      109: "-",
      110: ".",
      111: "/",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    }, c = {
      "~": "`",
      "!": "1",
      "@": "2",
      "#": "3",
      $: "4",
      "%": "5",
      "^": "6",
      "&": "7",
      "*": "8",
      "(": "9",
      ")": "0",
      _: "-",
      "+": "=",
      ":": ";",
      '"': "'",
      "<": ",",
      ">": ".",
      "?": "/",
      "|": "\\"
    }, s = {
      option: "alt",
      command: "meta",
      return: "enter",
      escape: "esc",
      plus: "+",
      mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
    }, u = 1; u < 20; ++u) o[111 + u] = "f" + u;
    for (u = 0; u <= 9; ++u) o[u + 96] = u.toString();
    Mousetrap.prototype.bind = function (e, t, n) {
      var r = this;
      return e = e instanceof Array ? e : [e], r._bindMultiple.call(r, e, t, n), r
    }, Mousetrap.prototype.unbind = function (e, t) {
      return this.bind.call(this, e, (function () {
      }), t)
    }, Mousetrap.prototype.trigger = function (e, t) {
      var n = this;
      return n._directMap[e + ":" + t] && n._directMap[e + ":" + t]({}, e), n
    }, Mousetrap.prototype.reset = function () {
      var e = this;
      return e._callbacks = {}, e._directMap = {}, e
    }, Mousetrap.prototype.stopCallback = function (e, t) {
      if ((" " + t.className + " ").indexOf(" mousetrap ") > -1) return !1;
      if (_belongsTo(t, this.target)) return !1;
      if ("composedPath" in e && "function" == typeof e.composedPath) {
        var n = e.composedPath()[0];
        n !== e.target && (t = n)
      }
      return "INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.isContentEditable
    }, Mousetrap.prototype.handleKey = function () {
      var e = this;
      return e._handleKey.apply(e, arguments)
    }, Mousetrap.addKeycodes = function (e) {
      for (var t in e) e.hasOwnProperty(t) && (o[t] = e[t]);
      a = null
    }, Mousetrap.init = function () {
      var e = Mousetrap(n);
      for (var t in e) "_" !== t.charAt(0) && (Mousetrap[t] = function (t) {
        return function () {
          return e[t].apply(e, arguments)
        }
      }(t))
    }, Mousetrap.init(), t.Mousetrap = Mousetrap, e.exports && (e.exports = Mousetrap)
  }

  function _addEvent(e, t, n) {
    e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
  }

  function _characterFromEvent(e) {
    if ("keypress" == e.type) {
      var t = String.fromCharCode(e.which);
      return e.shiftKey || (t = t.toLowerCase()), t
    }
    return o[e.which] ? o[e.which] : i[e.which] ? i[e.which] : String.fromCharCode(e.which).toLowerCase()
  }

  function _isModifier(e) {
    return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e
  }

  function _pickBestAction(e, t, n) {
    return n || (n = function _getReverseMap() {
      if (!a) for (var e in a = {}, o) e > 95 && e < 112 || o.hasOwnProperty(e) && (a[o[e]] = e);
      return a
    }()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), n
  }

  function _getKeyInfo(e, t) {
    var n, r, a, o = [];
    for (n = function _keysFromString(e) {
      return "+" === e ? ["+"] : (e = e.replace(/\+{2}/g, "+plus")).split("+")
    }(e), a = 0; a < n.length; ++a) r = n[a], s[r] && (r = s[r]), t && "keypress" != t && c[r] && (r = c[r], o.push("shift")), _isModifier(r) && o.push(r);
    return {key: r, modifiers: o, action: t = _pickBestAction(r, o, t)}
  }

  function _belongsTo(e, t) {
    return null !== e && e !== n && (e === t || _belongsTo(e.parentNode, t))
  }

  function Mousetrap(e) {
    var t = this;
    if (e = e || n, !(t instanceof Mousetrap)) return new Mousetrap(e);
    t.target = e, t._callbacks = {}, t._directMap = {};
    var r, a = {}, o = !1, i = !1, c = !1;

    function _resetSequences(e) {
      e = e || {};
      var t, n = !1;
      for (t in a) e[t] ? n = !0 : a[t] = 0;
      n || (c = !1)
    }

    function _getMatches(e, n, r, o, i, c) {
      var s, u, l, p, f = [], d = r.type;
      if (!t._callbacks[e]) return [];
      for ("keyup" == d && _isModifier(e) && (n = [e]), s = 0; s < t._callbacks[e].length; ++s) if (u = t._callbacks[e][s], (o || !u.seq || a[u.seq] == u.level) && d == u.action && ("keypress" == d && !r.metaKey && !r.ctrlKey || (l = n, p = u.modifiers, l.sort().join(",") === p.sort().join(",")))) {
        var h = !o && u.combo == i, _ = o && u.seq == o && u.level == c;
        (h || _) && t._callbacks[e].splice(s, 1), f.push(u)
      }
      return f
    }

    function _fireCallback(e, n, r, a) {
      t.stopCallback(n, n.target || n.srcElement, r, a) || !1 === e(n, r) && (function _preventDefault(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
      }(n), function _stopPropagation(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
      }(n))
    }

    function _handleKeyEvent(e) {
      "number" != typeof e.which && (e.which = e.keyCode);
      var n = _characterFromEvent(e);
      n && ("keyup" != e.type || o !== n ? t.handleKey(n, function _eventModifiers(e) {
        var t = [];
        return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), e.metaKey && t.push("meta"), t
      }(e), e) : o = !1)
    }

    function _bindSequence(e, t, n, i) {
      function _increaseSequence(t) {
        return function () {
          c = t, ++a[e], function _resetSequenceTimer() {
            clearTimeout(r), r = setTimeout(_resetSequences, 1e3)
          }()
        }
      }

      function _callbackAndReset(t) {
        _fireCallback(n, t, e), "keyup" !== i && (o = _characterFromEvent(t)), setTimeout(_resetSequences, 10)
      }

      a[e] = 0;
      for (var s = 0; s < t.length; ++s) {
        var u = s + 1 === t.length ? _callbackAndReset : _increaseSequence(i || _getKeyInfo(t[s + 1]).action);
        _bindSingle(t[s], u, i, e, s)
      }
    }

    function _bindSingle(e, n, r, a, o) {
      t._directMap[e + ":" + r] = n;
      var i, c = (e = e.replace(/\s+/g, " ")).split(" ");
      c.length > 1 ? _bindSequence(e, c, n, r) : (i = _getKeyInfo(e, r), t._callbacks[i.key] = t._callbacks[i.key] || [], _getMatches(i.key, i.modifiers, {type: i.action}, a, e, o), t._callbacks[i.key][a ? "unshift" : "push"]({
        callback: n,
        modifiers: i.modifiers,
        action: i.action,
        seq: a,
        level: o,
        combo: e
      }))
    }

    t._handleKey = function (e, t, n) {
      var r, a = _getMatches(e, t, n), o = {}, s = 0, u = !1;
      for (r = 0; r < a.length; ++r) a[r].seq && (s = Math.max(s, a[r].level));
      for (r = 0; r < a.length; ++r) if (a[r].seq) {
        if (a[r].level != s) continue;
        u = !0, o[a[r].seq] = 1, _fireCallback(a[r].callback, n, a[r].combo, a[r].seq)
      } else u || _fireCallback(a[r].callback, n, a[r].combo);
      var l = "keypress" == n.type && i;
      n.type != c || _isModifier(e) || l || _resetSequences(o), i = u && "keydown" == n.type
    }, t._bindMultiple = function (e, t, n) {
      for (var r = 0; r < e.length; ++r) _bindSingle(e[r], t, n)
    }, _addEvent(e, "keypress", _handleKeyEvent), _addEvent(e, "keydown", _handleKeyEvent), _addEvent(e, "keyup", _handleKeyEvent)
  }
}("undefined" != typeof window ? window : null, "undefined" != typeof window ? document : null);
const n = t.exports;
export {n as m};
