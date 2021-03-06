var e = {exports: {}};

function earcut(e, n, t) {
  t = t || 2;
  var r, i, x, a, o, l, u, s = n && n.length, v = s ? n[0] * t : e.length, f = linkedList(e, 0, v, t, !0), y = [];
  if (!f || f.next === f.prev) return y;
  if (s && (f = function eliminateHoles(e, n, t, r) {
    var i, x, a, o = [];
    for (i = 0, x = n.length; i < x; i++) (a = linkedList(e, n[i] * r, i < x - 1 ? n[i + 1] * r : e.length, r, !1)) === a.next && (a.steiner = !0), o.push(getLeftmost(a));
    for (o.sort(compareX), i = 0; i < o.length; i++) eliminateHole(o[i], t), t = filterPoints(t, t.next);
    return t
  }(e, n, f, t)), e.length > 80 * t) {
    r = x = e[0], i = a = e[1];
    for (var p = t; p < v; p += t) (o = e[p]) < r && (r = o), (l = e[p + 1]) < i && (i = l), o > x && (x = o), l > a && (a = l);
    u = 0 !== (u = Math.max(x - r, a - i)) ? 1 / u : 0
  }
  return earcutLinked(f, y, t, r, i, u), y
}

function linkedList(e, n, t, r, i) {
  var x, a;
  if (i === signedArea(e, n, t, r) > 0) for (x = n; x < t; x += r) a = insertNode(x, e[x], e[x + 1], a); else for (x = t - r; x >= n; x -= r) a = insertNode(x, e[x], e[x + 1], a);
  return a && equals(a, a.next) && (removeNode(a), a = a.next), a
}

function filterPoints(e, n) {
  if (!e) return e;
  n || (n = e);
  var t, r = e;
  do {
    if (t = !1, r.steiner || !equals(r, r.next) && 0 !== area(r.prev, r, r.next)) r = r.next; else {
      if (removeNode(r), (r = n = r.prev) === r.next) break;
      t = !0
    }
  } while (t || r !== n);
  return n
}

function earcutLinked(e, n, t, r, i, x, a) {
  if (e) {
    !a && x && function indexCurve(e, n, t, r) {
      var i = e;
      do {
        null === i.z && (i.z = zOrder(i.x, i.y, n, t, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next
      } while (i !== e);
      i.prevZ.nextZ = null, i.prevZ = null, function sortLinked(e) {
        var n, t, r, i, x, a, o, l, u = 1;
        do {
          for (t = e, e = null, x = null, a = 0; t;) {
            for (a++, r = t, o = 0, n = 0; n < u && (o++, r = r.nextZ); n++) ;
            for (l = u; o > 0 || l > 0 && r;) 0 !== o && (0 === l || !r || t.z <= r.z) ? (i = t, t = t.nextZ, o--) : (i = r, r = r.nextZ, l--), x ? x.nextZ = i : e = i, i.prevZ = x, x = i;
            t = r
          }
          x.nextZ = null, u *= 2
        } while (a > 1);
        return e
      }(i)
    }(e, r, i, x);
    for (var o, l, u = e; e.prev !== e.next;) if (o = e.prev, l = e.next, x ? isEarHashed(e, r, i, x) : isEar(e)) n.push(o.i / t), n.push(e.i / t), n.push(l.i / t), removeNode(e), e = l.next, u = l.next; else if ((e = l) === u) {
      a ? 1 === a ? earcutLinked(e = cureLocalIntersections(filterPoints(e), n, t), n, t, r, i, x, 2) : 2 === a && splitEarcut(e, n, t, r, i, x) : earcutLinked(filterPoints(e), n, t, r, i, x, 1);
      break
    }
  }
}

function isEar(e) {
  var n = e.prev, t = e, r = e.next;
  if (area(n, t, r) >= 0) return !1;
  for (var i = e.next.next; i !== e.prev;) {
    if (pointInTriangle(n.x, n.y, t.x, t.y, r.x, r.y, i.x, i.y) && area(i.prev, i, i.next) >= 0) return !1;
    i = i.next
  }
  return !0
}

function isEarHashed(e, n, t, r) {
  var i = e.prev, x = e, a = e.next;
  if (area(i, x, a) >= 0) return !1;
  for (var o = i.x < x.x ? i.x < a.x ? i.x : a.x : x.x < a.x ? x.x : a.x, l = i.y < x.y ? i.y < a.y ? i.y : a.y : x.y < a.y ? x.y : a.y, u = i.x > x.x ? i.x > a.x ? i.x : a.x : x.x > a.x ? x.x : a.x, s = i.y > x.y ? i.y > a.y ? i.y : a.y : x.y > a.y ? x.y : a.y, v = zOrder(o, l, n, t, r), f = zOrder(u, s, n, t, r), y = e.prevZ, p = e.nextZ; y && y.z >= v && p && p.z <= f;) {
    if (y !== e.prev && y !== e.next && pointInTriangle(i.x, i.y, x.x, x.y, a.x, a.y, y.x, y.y) && area(y.prev, y, y.next) >= 0) return !1;
    if (y = y.prevZ, p !== e.prev && p !== e.next && pointInTriangle(i.x, i.y, x.x, x.y, a.x, a.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
    p = p.nextZ
  }
  for (; y && y.z >= v;) {
    if (y !== e.prev && y !== e.next && pointInTriangle(i.x, i.y, x.x, x.y, a.x, a.y, y.x, y.y) && area(y.prev, y, y.next) >= 0) return !1;
    y = y.prevZ
  }
  for (; p && p.z <= f;) {
    if (p !== e.prev && p !== e.next && pointInTriangle(i.x, i.y, x.x, x.y, a.x, a.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return !1;
    p = p.nextZ
  }
  return !0
}

function cureLocalIntersections(e, n, t) {
  var r = e;
  do {
    var i = r.prev, x = r.next.next;
    !equals(i, x) && intersects(i, r, r.next, x) && locallyInside(i, x) && locallyInside(x, i) && (n.push(i.i / t), n.push(r.i / t), n.push(x.i / t), removeNode(r), removeNode(r.next), r = e = x), r = r.next
  } while (r !== e);
  return filterPoints(r)
}

function splitEarcut(e, n, t, r, i, x) {
  var a = e;
  do {
    for (var o = a.next.next; o !== a.prev;) {
      if (a.i !== o.i && isValidDiagonal(a, o)) {
        var l = splitPolygon(a, o);
        return a = filterPoints(a, a.next), l = filterPoints(l, l.next), earcutLinked(a, n, t, r, i, x), void earcutLinked(l, n, t, r, i, x)
      }
      o = o.next
    }
    a = a.next
  } while (a !== e)
}

function compareX(e, n) {
  return e.x - n.x
}

function eliminateHole(e, n) {
  if (n = function findHoleBridge(e, n) {
    var t, r = n, i = e.x, x = e.y, a = -1 / 0;
    do {
      if (x <= r.y && x >= r.next.y && r.next.y !== r.y) {
        var o = r.x + (x - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
        if (o <= i && o > a) {
          if (a = o, o === i) {
            if (x === r.y) return r;
            if (x === r.next.y) return r.next
          }
          t = r.x < r.next.x ? r : r.next
        }
      }
      r = r.next
    } while (r !== n);
    if (!t) return null;
    if (i === a) return t;
    var l, u = t, s = t.x, v = t.y, f = 1 / 0;
    r = t;
    do {
      i >= r.x && r.x >= s && i !== r.x && pointInTriangle(x < v ? i : a, x, s, v, x < v ? a : i, x, r.x, r.y) && (l = Math.abs(x - r.y) / (i - r.x), locallyInside(r, e) && (l < f || l === f && (r.x > t.x || r.x === t.x && sectorContainsSector(t, r))) && (t = r, f = l)), r = r.next
    } while (r !== u);
    return t
  }(e, n)) {
    var t = splitPolygon(n, e);
    filterPoints(n, n.next), filterPoints(t, t.next)
  }
}

function sectorContainsSector(e, n) {
  return area(e.prev, e, n.prev) < 0 && area(n.next, e, e.next) < 0
}

function zOrder(e, n, t, r, i) {
  return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - t) * i) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (n = 1431655765 & ((n = 858993459 & ((n = 252645135 & ((n = 16711935 & ((n = 32767 * (n - r) * i) | n << 8)) | n << 4)) | n << 2)) | n << 1)) << 1
}

function getLeftmost(e) {
  var n = e, t = e;
  do {
    (n.x < t.x || n.x === t.x && n.y < t.y) && (t = n), n = n.next
  } while (n !== e);
  return t
}

function pointInTriangle(e, n, t, r, i, x, a, o) {
  return (i - a) * (n - o) - (e - a) * (x - o) >= 0 && (e - a) * (r - o) - (t - a) * (n - o) >= 0 && (t - a) * (x - o) - (i - a) * (r - o) >= 0
}

function isValidDiagonal(e, n) {
  return e.next.i !== n.i && e.prev.i !== n.i && !function intersectsPolygon(e, n) {
    var t = e;
    do {
      if (t.i !== e.i && t.next.i !== e.i && t.i !== n.i && t.next.i !== n.i && intersects(t, t.next, e, n)) return !0;
      t = t.next
    } while (t !== e);
    return !1
  }(e, n) && (locallyInside(e, n) && locallyInside(n, e) && function middleInside(e, n) {
    var t = e, r = !1, i = (e.x + n.x) / 2, x = (e.y + n.y) / 2;
    do {
      t.y > x != t.next.y > x && t.next.y !== t.y && i < (t.next.x - t.x) * (x - t.y) / (t.next.y - t.y) + t.x && (r = !r), t = t.next
    } while (t !== e);
    return r
  }(e, n) && (area(e.prev, e, n.prev) || area(e, n.prev, n)) || equals(e, n) && area(e.prev, e, e.next) > 0 && area(n.prev, n, n.next) > 0)
}

function area(e, n, t) {
  return (n.y - e.y) * (t.x - n.x) - (n.x - e.x) * (t.y - n.y)
}

function equals(e, n) {
  return e.x === n.x && e.y === n.y
}

function intersects(e, n, t, r) {
  var i = sign(area(e, n, t)), x = sign(area(e, n, r)), a = sign(area(t, r, e)), o = sign(area(t, r, n));
  return i !== x && a !== o || (!(0 !== i || !onSegment(e, t, n)) || (!(0 !== x || !onSegment(e, r, n)) || (!(0 !== a || !onSegment(t, e, r)) || !(0 !== o || !onSegment(t, n, r)))))
}

function onSegment(e, n, t) {
  return n.x <= Math.max(e.x, t.x) && n.x >= Math.min(e.x, t.x) && n.y <= Math.max(e.y, t.y) && n.y >= Math.min(e.y, t.y)
}

function sign(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0
}

function locallyInside(e, n) {
  return area(e.prev, e, e.next) < 0 ? area(e, n, e.next) >= 0 && area(e, e.prev, n) >= 0 : area(e, n, e.prev) < 0 || area(e, e.next, n) < 0
}

function splitPolygon(e, n) {
  var t = new Node(e.i, e.x, e.y), r = new Node(n.i, n.x, n.y), i = e.next, x = n.prev;
  return e.next = n, n.prev = e, t.next = i, i.prev = t, r.next = t, t.prev = r, x.next = r, r.prev = x, r
}

function insertNode(e, n, t, r) {
  var i = new Node(e, n, t);
  return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i
}

function removeNode(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ)
}

function Node(e, n, t) {
  this.i = e, this.x = n, this.y = t, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
}

function signedArea(e, n, t, r) {
  for (var i = 0, x = n, a = t - r; x < t; x += r) i += (e[a] - e[x]) * (e[x + 1] + e[a + 1]), a = x;
  return i
}

e.exports = earcut, e.exports.default = earcut, earcut.deviation = function (e, n, t, r) {
  var i = n && n.length, x = i ? n[0] * t : e.length, a = Math.abs(signedArea(e, 0, x, t));
  if (i) for (var o = 0, l = n.length; o < l; o++) {
    var u = n[o] * t, s = o < l - 1 ? n[o + 1] * t : e.length;
    a -= Math.abs(signedArea(e, u, s, t))
  }
  var v = 0;
  for (o = 0; o < r.length; o += 3) {
    var f = r[o] * t, y = r[o + 1] * t, p = r[o + 2] * t;
    v += Math.abs((e[f] - e[p]) * (e[y + 1] - e[f + 1]) - (e[f] - e[y]) * (e[p + 1] - e[f + 1]))
  }
  return 0 === a && 0 === v ? 0 : Math.abs((v - a) / a)
}, earcut.flatten = function (e) {
  for (var n = e[0][0].length, t = {vertices: [], holes: [], dimensions: n}, r = 0, i = 0; i < e.length; i++) {
    for (var x = 0; x < e[i].length; x++) for (var a = 0; a < n; a++) t.vertices.push(e[i][x][a]);
    i > 0 && (r += e[i - 1].length, t.holes.push(r))
  }
  return t
};
const n = e.exports;
export {n as e};
