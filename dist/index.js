function v(c) {
  const { start: u, end: f, disabled: a, gap: i, ampm: m, formatedHours: g, noTime: p } = Object.assign({
    start: 0,
    end: 1440,
    gap: 30,
    ampm: !0,
    noTime: !1,
    disabled: [],
    formatedHours: !0
  }, c || {});
  if (u < 0 || i <= 0 || f > 1440)
    return console.error("invalid value"), !1;
  const b = (t) => {
    const e = t % 60, o = Math.floor(t / 60), r = o >= 12 ? "PM" : "AM", n = o % 12 || 12;
    return `${d(g ? n : o)}:${d(e)} ${m ? r : ""}`.trim();
  }, d = (t) => t.toString().padStart(2, "0"), h = (t) => {
    if (a.length === 0 || !Array.isArray(a))
      return !0;
    let e = !0, o = t + i;
    for (let r = t; r <= o; r++)
      for (let n = 0; n < a.length; n++) {
        const [y, A] = a[n];
        if (y < r && r < A) {
          e = !1;
          break;
        }
      }
    return e;
  }, l = {};
  let s = 0;
  for (let t = u; t + i <= f; t++)
    if (h(t)) {
      if (s === i || s === 0) {
        const e = t.toString();
        l[e] = b(t), s = 0;
      }
      s++;
    } else
      s = 0;
  return p ? Object.keys(l) : l;
}
export {
  v as default
};
