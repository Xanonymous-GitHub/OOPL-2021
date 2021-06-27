import "./configs.ts.64c86f5e.js";

let t = 0, s = 0, e = 0, i = 0, o = 0;
const getBlockSize = (a, c) => (a && c && (t = a.maxX, s = a.maxY, e = c.width, i = c.height, o = e > i ? .95 * i / (s + 1) : .95 * e / (t + 1)), o);
export {getBlockSize as g};
