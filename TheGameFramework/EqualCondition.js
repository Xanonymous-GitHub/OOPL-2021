var e = /iPhone/i, i = /iPod/i, o = /iPad/i, t = /\biOS-universal(?:.+)Mac\b/i, n = /\bAndroid(?:.+)Mobile\b/i,
  a = /Android/i, r = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, d = /Silk/i, l = /Windows Phone/i,
  p = /\bWindows(?:.+)ARM\b/i, b = /BlackBerry/i, s = /BB10/i, c = /Opera Mini/i, u = /\b(CriOS|Chrome)(?:.+)Mobile/i,
  h = /Mobile(?:.+)Firefox\b/i, isAppleTabletOnIos13 = function (e) {
    return void 0 !== e && "MacIntel" === e.platform && "number" == typeof e.maxTouchPoints && e.maxTouchPoints > 1 && "undefined" == typeof MSStream
  };

function isMobile(v) {
  var f = {userAgent: "", platform: "", maxTouchPoints: 0};
  v || "undefined" == typeof navigator ? "string" == typeof v ? f.userAgent = v : v && v.userAgent && (f = {
    userAgent: v.userAgent,
    platform: v.platform,
    maxTouchPoints: v.maxTouchPoints || 0
  }) : f = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  };
  var m = f.userAgent, g = m.split("[FBAN");
  void 0 !== g[1] && (m = g[0]), void 0 !== (g = m.split("Twitter"))[1] && (m = g[0]);
  var A = function createMatch(e) {
    return function (i) {
      return i.test(e)
    }
  }(m), M = {
    apple: {
      phone: A(e) && !A(l),
      ipod: A(i),
      tablet: !A(e) && (A(o) || isAppleTabletOnIos13(f)) && !A(l),
      universal: A(t),
      device: (A(e) || A(i) || A(o) || A(t) || isAppleTabletOnIos13(f)) && !A(l)
    },
    amazon: {phone: A(r), tablet: !A(r) && A(d), device: A(r) || A(d)},
    android: {
      phone: !A(l) && A(r) || !A(l) && A(n),
      tablet: !A(l) && !A(r) && !A(n) && (A(d) || A(a)),
      device: !A(l) && (A(r) || A(d) || A(n) || A(a)) || A(/\bokhttp\b/i)
    },
    windows: {phone: A(l), tablet: A(p), device: A(l) || A(p)},
    other: {
      blackberry: A(b),
      blackberry10: A(s),
      opera: A(c),
      firefox: A(h),
      chrome: A(u),
      device: A(b) || A(s) || A(c) || A(h) || A(u)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return M.any = M.apple.device || M.android.device || M.windows.device || M.other.device, M.phone = M.apple.phone || M.android.phone || M.windows.phone, M.tablet = M.apple.tablet || M.android.tablet || M.windows.tablet, M
}

export {isMobile as i};
