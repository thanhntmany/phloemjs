/**
 * Phloemjs
 * 
 * @author Thanh Nguyen Thuan <thanhntmany@gmail.com>
 */
class StringAr {
 _r(L1) { Object.values(this.$).forEach(_r, L1.add(this.r)) } _f() { return this._.map(_f, this.$) }
 constructor(o, $ = {}) { if (o instanceof StringAr) { this.r = o.r; this._ = o._; this.$ = Object.assign({}, o.$, $) } else { this.r = new Set(); (this._ = String(o).split(pRe)).forEach(sa); this.$ = $ } }
 HTMLrequire() { [...arguments].flat(Infinity).filter(SnhE, this.r).forEach(SaE, this.r = new Set(this.r)); return this }
 HTMLgetRequireList(L = new Set(), L1 = new Set(), iH = "") { var l1 = L1.size; this._r(L1); if ((l1 -= L1.size) < 0) { var l = L.size;[...L1].slice(l1).forEach(SSaE, L); if ((l -= L.size) < 0) return [...L].slice(l).filter(niiH, iH) } return [] }
 toString() { return this._f().flat(Infinity).join(S0) }
 clone($) { return new this.constructor(this, $) }
}
const pRe = /({{[\S]+?}})/g,
 sa = function (e, i, a) { if (e.match(pRe)) a[i] = { k: e.slice(2, -2) } },
 _f = function (e) { return e.k !== undefined && (e = this[e.k]) !== undefined && e._f ? e._f() : Array.isArray(e) ? e.map(_f) : e },
 _r = function (e) { e._r ? e._r(this) : Array.isArray(e) ? e.forEach(_r, this) : undefined },
 niiH = function (e) { return !this.includes(e) },
 SnhE = function (e) { return !this.has(e) }, SaE = function (e) { this.add(e) }, SSaE = function (s) { s.forEach(SaE, this) },
 S = "/", S0 = "", dir = u => u.substring(0, u.lastIndexOf(S)), R = dir(import.meta.url), Rl = R.length, wFu = u => (u = String(u)).startsWith(R) ? u.substring(Rl) : undefined,
 da = "do-active", Hcss = [`<link rel="stylesheet" href="`, , `">`], Hjs = [`<script type="text/javascript" src="`, , `"></script>`], Hmjs = [`<script type="module" src="`, , `"></script>`],
 M = { StringAr, dir, wwwDir: R, w3UrlFromUrl: wFu, w3DirOfUrl: u => dir(wFu(u)), urlFromW3Url: u => R + (u.startsWith(S) ? S0 : S) + u, doActive: da, buildTag: { css: u => { Hcss[1] = u; return Hcss.join(S0) }, js: u => { Hjs[1] = u; return Hjs.join(S0) }, mjs: u => { Hmjs[1] = u; return Hmjs.join(S0) } } }
export default M

if (typeof window !== "undefined") {
 const W = window, doc = W.document, head = doc.head, iH = head.innerHTML, L = new Set(), L1 = new Set(),
  _a = function (e) { this.append(e) }, _iB = function (e) { this.parentNode.insertBefore(e, this) },
  _c = e => { const n = doc.createElement(e.nodeName), att = e.attributes; var a; for (a of att) n.setAttribute(a.name, a.value); e.childNodes.forEach(_a, n); return n },
  daQ = `[${da}]`
 function NfS(s) { const T = doc.createElement("div"); T.innerHTML = s; return T.childNodes }
 function wR() { [...NfS([...arguments].flat(Infinity).join(S0))].map(_c).forEach(_a, head) }
 function aD_(m) { if (m.activeDom) m.activeDom(this) }
 function aD(d) { import(d.getAttribute(da)).then(aD_.bind(d)).catch(console.error).finally(() => d.removeAttribute(da)) }
 function aNL(nl) { nl.forEach(aD); return nl }
 function aDT(d) { aNL(d.querySelectorAll(daQ)); return d }
 W.addEventListener("load", () => aDT(doc)); W.phloemjs = M
 Object.assign(StringAr.prototype, { toDom: function () { wR(this.HTMLgetRequireList(L, L1, iH)); const nl = NfS(this.toString()); nl.forEach(aDT); return nl }, HTMLrequire: wR, nodesFromString: NfS, activeDomTree: aDT, appendInto: function (p) { this.toDom().forEach(_a, p) }, insertBefore: function (n) { this.toDom().forEach(_iB, n) } })
}