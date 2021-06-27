var r = function parseURI(r, e) {
  if (r) {
    e = e || {};
    for (var o = {
      key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
      q: {name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g},
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    }, t = o.parser[e.strictMode ? "strict" : "loose"].exec(r), a = {}, s = 14; s--;) a[o.key[s]] = t[s] || "";
    return a[o.q.name] = {}, a[o.key[12]].replace(o.q.parser, (function (r, e, t) {
      e && (a[o.q.name][e] = t)
    })), a
  }
};
export {r as p};
