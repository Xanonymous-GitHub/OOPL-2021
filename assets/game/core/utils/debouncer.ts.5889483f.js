const debounce = (e, t, ...o) => {
  let r;
  return () => {
    clearTimeout(r), r = setTimeout((() => {
      e(o)
    }), t)
  }
};
export {debounce as d};
