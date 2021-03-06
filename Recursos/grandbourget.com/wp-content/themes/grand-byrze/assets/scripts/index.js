!(function (e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : (("undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this
      ).BezierEasing = e());
})(function () {
  return (function e(t, i, n) {
    function a(s, o) {
      if (!i[s]) {
        if (!t[s]) {
          var l = "function" == typeof require && require;
          if (!o && l) return l(s, !0);
          if (r) return r(s, !0);
          var u = new Error("Cannot find module '" + s + "'");
          throw ((u.code = "MODULE_NOT_FOUND"), u);
        }
        var c = (i[s] = { exports: {} });
        t[s][0].call(
          c.exports,
          function (e) {
            return a(t[s][1][e] || e);
          },
          c,
          c.exports,
          e,
          t,
          i,
          n
        );
      }
      return i[s].exports;
    }
    for (
      var r = "function" == typeof require && require, s = 0;
      s < n.length;
      s++
    )
      a(n[s]);
    return a;
  })(
    {
      1: [
        function (e, t, i) {
          var n = "function" == typeof Float32Array;
          function a(e, t) {
            return 1 - 3 * t + 3 * e;
          }
          function r(e, t) {
            return 3 * t - 6 * e;
          }
          function s(e) {
            return 3 * e;
          }
          function o(e, t, i) {
            return ((a(t, i) * e + r(t, i)) * e + s(t)) * e;
          }
          function l(e, t, i) {
            return 3 * a(t, i) * e * e + 2 * r(t, i) * e + s(t);
          }
          function u(e) {
            return e;
          }
          t.exports = function (e, t, i, a) {
            if (!(0 <= e && e <= 1 && 0 <= i && i <= 1))
              throw new Error("bezier x values must be in [0, 1] range");
            if (e === t && i === a) return u;
            for (
              var r = n ? new Float32Array(11) : new Array(11), s = 0;
              s < 11;
              ++s
            )
              r[s] = o(0.1 * s, e, i);
            return function (n) {
              return 0 === n
                ? 0
                : 1 === n
                ? 1
                : o(
                    (function (t) {
                      for (var n = 0, a = 1; 10 !== a && r[a] <= t; ++a)
                        n += 0.1;
                      var s = n + ((t - r[--a]) / (r[a + 1] - r[a])) * 0.1,
                        u = l(s, e, i);
                      return 0.001 <= u
                        ? (function (e, t, i, n) {
                            for (var a = 0; a < 4; ++a) {
                              var r = l(t, i, n);
                              if (0 === r) return t;
                              t -= (o(t, i, n) - e) / r;
                            }
                            return t;
                          })(t, s, e, i)
                        : 0 === u
                        ? s
                        : (function (e, t, i, n, a) {
                            for (
                              var r, s, l = 0;
                              0 < (r = o((s = t + (i - t) / 2), n, a) - e)
                                ? (i = s)
                                : (t = s),
                                Math.abs(r) > 1e-7 && ++l < 10;

                            );
                            return s;
                          })(t, n, n + 0.1, e, i);
                    })(n),
                    t,
                    a
                  );
            };
          };
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
}),
  (function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e.document
          ? t(e, !0)
          : function (e) {
              if (!e.document)
                throw new Error("jQuery requires a window with a document");
              return t(e);
            })
      : t(e);
  })("undefined" != typeof window ? window : this, function (e, t) {
    "use strict";
    var i = [],
      n = e.document,
      a = Object.getPrototypeOf,
      r = i.slice,
      s = i.concat,
      o = i.push,
      l = i.indexOf,
      u = {},
      c = u.toString,
      d = u.hasOwnProperty,
      p = d.toString,
      h = p.call(Object),
      f = {},
      v = function (e) {
        return "function" == typeof e && "number" != typeof e.nodeType;
      },
      m = function (e) {
        return null != e && e === e.window;
      },
      g = { type: !0, src: !0, noModule: !0 };
    function y(e, t, i) {
      var a,
        r = (t = t || n).createElement("script");
      if (((r.text = e), i)) for (a in g) i[a] && (r[a] = i[a]);
      t.head.appendChild(r).parentNode.removeChild(r);
    }
    function b(e) {
      return null == e
        ? e + ""
        : "object" == typeof e || "function" == typeof e
        ? u[c.call(e)] || "object"
        : typeof e;
    }
    var x = function (e, t) {
        return new x.fn.init(e, t);
      },
      w = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function k(e) {
      var t = !!e && "length" in e && e.length,
        i = b(e);
      return (
        !v(e) &&
        !m(e) &&
        ("array" === i ||
          0 === t ||
          ("number" == typeof t && t > 0 && t - 1 in e))
      );
    }
    (x.fn = x.prototype =
      {
        jquery: "3.3.1",
        constructor: x,
        length: 0,
        toArray: function () {
          return r.call(this);
        },
        get: function (e) {
          return null == e
            ? r.call(this)
            : e < 0
            ? this[e + this.length]
            : this[e];
        },
        pushStack: function (e) {
          var t = x.merge(this.constructor(), e);
          return (t.prevObject = this), t;
        },
        each: function (e) {
          return x.each(this, e);
        },
        map: function (e) {
          return this.pushStack(
            x.map(this, function (t, i) {
              return e.call(t, i, t);
            })
          );
        },
        slice: function () {
          return this.pushStack(r.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (e) {
          var t = this.length,
            i = +e + (e < 0 ? t : 0);
          return this.pushStack(i >= 0 && i < t ? [this[i]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: o,
        sort: i.sort,
        splice: i.splice,
      }),
      (x.extend = x.fn.extend =
        function () {
          var e,
            t,
            i,
            n,
            a,
            r,
            s = arguments[0] || {},
            o = 1,
            l = arguments.length,
            u = !1;
          for (
            "boolean" == typeof s && ((u = s), (s = arguments[o] || {}), o++),
              "object" == typeof s || v(s) || (s = {}),
              o === l && ((s = this), o--);
            o < l;
            o++
          )
            if (null != (e = arguments[o]))
              for (t in e)
                (i = s[t]),
                  s !== (n = e[t]) &&
                    (u && n && (x.isPlainObject(n) || (a = Array.isArray(n)))
                      ? (a
                          ? ((a = !1), (r = i && Array.isArray(i) ? i : []))
                          : (r = i && x.isPlainObject(i) ? i : {}),
                        (s[t] = x.extend(u, r, n)))
                      : void 0 !== n && (s[t] = n));
          return s;
        }),
      x.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e);
        },
        noop: function () {},
        isPlainObject: function (e) {
          var t, i;
          return !(
            !e ||
            "[object Object]" !== c.call(e) ||
            ((t = a(e)) &&
              ("function" !=
                typeof (i = d.call(t, "constructor") && t.constructor) ||
                p.call(i) !== h))
          );
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0;
        },
        globalEval: function (e) {
          y(e);
        },
        each: function (e, t) {
          var i,
            n = 0;
          if (k(e))
            for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
          else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
          return e;
        },
        trim: function (e) {
          return null == e ? "" : (e + "").replace(w, "");
        },
        makeArray: function (e, t) {
          var i = t || [];
          return (
            null != e &&
              (k(Object(e))
                ? x.merge(i, "string" == typeof e ? [e] : e)
                : o.call(i, e)),
            i
          );
        },
        inArray: function (e, t, i) {
          return null == t ? -1 : l.call(t, e, i);
        },
        merge: function (e, t) {
          for (var i = +t.length, n = 0, a = e.length; n < i; n++)
            e[a++] = t[n];
          return (e.length = a), e;
        },
        grep: function (e, t, i) {
          for (var n = [], a = 0, r = e.length, s = !i; a < r; a++)
            !t(e[a], a) !== s && n.push(e[a]);
          return n;
        },
        map: function (e, t, i) {
          var n,
            a,
            r = 0,
            o = [];
          if (k(e))
            for (n = e.length; r < n; r++)
              null != (a = t(e[r], r, i)) && o.push(a);
          else for (r in e) null != (a = t(e[r], r, i)) && o.push(a);
          return s.apply([], o);
        },
        guid: 1,
        support: f,
      }),
      "function" == typeof Symbol &&
        (x.fn[Symbol.iterator] = i[Symbol.iterator]),
      x.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (e, t) {
          u["[object " + t + "]"] = t.toLowerCase();
        }
      );
    var E = (function (e) {
      var t,
        i,
        n,
        a,
        r,
        s,
        o,
        l,
        u,
        c,
        d,
        p,
        h,
        f,
        v,
        m,
        g,
        y,
        b,
        x = "sizzle" + 1 * new Date(),
        w = e.document,
        k = 0,
        E = 0,
        T = se(),
        S = se(),
        C = se(),
        M = function (e, t) {
          return e === t && (d = !0), 0;
        },
        P = {}.hasOwnProperty,
        O = [],
        A = O.pop,
        L = O.push,
        D = O.push,
        I = O.slice,
        j = function (e, t) {
          for (var i = 0, n = e.length; i < n; i++) if (e[i] === t) return i;
          return -1;
        },
        N =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        z = "[\\x20\\t\\r\\n\\f]",
        _ = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        $ =
          "\\[" +
          z +
          "*(" +
          _ +
          ")(?:" +
          z +
          "*([*^$|!~]?=)" +
          z +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          _ +
          "))|)" +
          z +
          "*\\]",
        B =
          ":(" +
          _ +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          $ +
          ")*)|.*)\\)|)",
        R = new RegExp(z + "+", "g"),
        H = new RegExp("^" + z + "+|((?:^|[^\\\\])(?:\\\\.)*)" + z + "+$", "g"),
        F = new RegExp("^" + z + "*," + z + "*"),
        G = new RegExp("^" + z + "*([>+~]|" + z + ")" + z + "*"),
        q = new RegExp("=" + z + "*([^\\]'\"]*?)" + z + "*\\]", "g"),
        V = new RegExp(B),
        W = new RegExp("^" + _ + "$"),
        X = {
          ID: new RegExp("^#(" + _ + ")"),
          CLASS: new RegExp("^\\.(" + _ + ")"),
          TAG: new RegExp("^(" + _ + "|[*])"),
          ATTR: new RegExp("^" + $),
          PSEUDO: new RegExp("^" + B),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              z +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              z +
              "*(?:([+-]|)" +
              z +
              "*(\\d+)|))" +
              z +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + N + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              z +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              z +
              "*((?:-\\d)?\\d*)" +
              z +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        Y = /^(?:input|select|textarea|button)$/i,
        U = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Z = /[+~]/,
        J = new RegExp("\\\\([\\da-f]{1,6}" + z + "?|(" + z + ")|.)", "ig"),
        ee = function (e, t, i) {
          var n = "0x" + t - 65536;
          return n != n || i
            ? t
            : n < 0
            ? String.fromCharCode(n + 65536)
            : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
        },
        te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ie = function (e, t) {
          return t
            ? "\0" === e
              ? "???"
              : e.slice(0, -1) +
                "\\" +
                e.charCodeAt(e.length - 1).toString(16) +
                " "
            : "\\" + e;
        },
        ne = function () {
          p();
        },
        ae = ye(
          function (e) {
            return !0 === e.disabled && ("form" in e || "label" in e);
          },
          { dir: "parentNode", next: "legend" }
        );
      try {
        D.apply((O = I.call(w.childNodes)), w.childNodes),
          O[w.childNodes.length].nodeType;
      } catch (e) {
        D = {
          apply: O.length
            ? function (e, t) {
                L.apply(e, I.call(t));
              }
            : function (e, t) {
                for (var i = e.length, n = 0; (e[i++] = t[n++]); );
                e.length = i - 1;
              },
        };
      }
      function re(e, t, n, a) {
        var r,
          o,
          u,
          c,
          d,
          f,
          g,
          y = t && t.ownerDocument,
          k = t ? t.nodeType : 9;
        if (
          ((n = n || []),
          "string" != typeof e || !e || (1 !== k && 9 !== k && 11 !== k))
        )
          return n;
        if (
          !a &&
          ((t ? t.ownerDocument || t : w) !== h && p(t), (t = t || h), v)
        ) {
          if (11 !== k && (d = Q.exec(e)))
            if ((r = d[1])) {
              if (9 === k) {
                if (!(u = t.getElementById(r))) return n;
                if (u.id === r) return n.push(u), n;
              } else if (
                y &&
                (u = y.getElementById(r)) &&
                b(t, u) &&
                u.id === r
              )
                return n.push(u), n;
            } else {
              if (d[2]) return D.apply(n, t.getElementsByTagName(e)), n;
              if (
                (r = d[3]) &&
                i.getElementsByClassName &&
                t.getElementsByClassName
              )
                return D.apply(n, t.getElementsByClassName(r)), n;
            }
          if (i.qsa && !C[e + " "] && (!m || !m.test(e))) {
            if (1 !== k) (y = t), (g = e);
            else if ("object" !== t.nodeName.toLowerCase()) {
              for (
                (c = t.getAttribute("id"))
                  ? (c = c.replace(te, ie))
                  : t.setAttribute("id", (c = x)),
                  o = (f = s(e)).length;
                o--;

              )
                f[o] = "#" + c + " " + ge(f[o]);
              (g = f.join(",")), (y = (Z.test(e) && ve(t.parentNode)) || t);
            }
            if (g)
              try {
                return D.apply(n, y.querySelectorAll(g)), n;
              } catch (e) {
              } finally {
                c === x && t.removeAttribute("id");
              }
          }
        }
        return l(e.replace(H, "$1"), t, n, a);
      }
      function se() {
        var e = [];
        return function t(i, a) {
          return (
            e.push(i + " ") > n.cacheLength && delete t[e.shift()],
            (t[i + " "] = a)
          );
        };
      }
      function oe(e) {
        return (e[x] = !0), e;
      }
      function le(e) {
        var t = h.createElement("fieldset");
        try {
          return !!e(t);
        } catch (e) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null);
        }
      }
      function ue(e, t) {
        for (var i = e.split("|"), a = i.length; a--; ) n.attrHandle[i[a]] = t;
      }
      function ce(e, t) {
        var i = t && e,
          n =
            i &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            e.sourceIndex - t.sourceIndex;
        if (n) return n;
        if (i) for (; (i = i.nextSibling); ) if (i === t) return -1;
        return e ? 1 : -1;
      }
      function de(e) {
        return function (t) {
          return "input" === t.nodeName.toLowerCase() && t.type === e;
        };
      }
      function pe(e) {
        return function (t) {
          var i = t.nodeName.toLowerCase();
          return ("input" === i || "button" === i) && t.type === e;
        };
      }
      function he(e) {
        return function (t) {
          return "form" in t
            ? t.parentNode && !1 === t.disabled
              ? "label" in t
                ? "label" in t.parentNode
                  ? t.parentNode.disabled === e
                  : t.disabled === e
                : t.isDisabled === e || (t.isDisabled !== !e && ae(t) === e)
              : t.disabled === e
            : "label" in t && t.disabled === e;
        };
      }
      function fe(e) {
        return oe(function (t) {
          return (
            (t = +t),
            oe(function (i, n) {
              for (var a, r = e([], i.length, t), s = r.length; s--; )
                i[(a = r[s])] && (i[a] = !(n[a] = i[a]));
            })
          );
        });
      }
      function ve(e) {
        return e && void 0 !== e.getElementsByTagName && e;
      }
      for (t in ((i = re.support = {}),
      (r = re.isXML =
        function (e) {
          var t = e && (e.ownerDocument || e).documentElement;
          return !!t && "HTML" !== t.nodeName;
        }),
      (p = re.setDocument =
        function (e) {
          var t,
            a,
            s = e ? e.ownerDocument || e : w;
          return s !== h && 9 === s.nodeType && s.documentElement
            ? ((f = (h = s).documentElement),
              (v = !r(h)),
              w !== h &&
                (a = h.defaultView) &&
                a.top !== a &&
                (a.addEventListener
                  ? a.addEventListener("unload", ne, !1)
                  : a.attachEvent && a.attachEvent("onunload", ne)),
              (i.attributes = le(function (e) {
                return (e.className = "i"), !e.getAttribute("className");
              })),
              (i.getElementsByTagName = le(function (e) {
                return (
                  e.appendChild(h.createComment("")),
                  !e.getElementsByTagName("*").length
                );
              })),
              (i.getElementsByClassName = K.test(h.getElementsByClassName)),
              (i.getById = le(function (e) {
                return (
                  (f.appendChild(e).id = x),
                  !h.getElementsByName || !h.getElementsByName(x).length
                );
              })),
              i.getById
                ? ((n.filter.ID = function (e) {
                    var t = e.replace(J, ee);
                    return function (e) {
                      return e.getAttribute("id") === t;
                    };
                  }),
                  (n.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && v) {
                      var i = t.getElementById(e);
                      return i ? [i] : [];
                    }
                  }))
                : ((n.filter.ID = function (e) {
                    var t = e.replace(J, ee);
                    return function (e) {
                      var i =
                        void 0 !== e.getAttributeNode &&
                        e.getAttributeNode("id");
                      return i && i.value === t;
                    };
                  }),
                  (n.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && v) {
                      var i,
                        n,
                        a,
                        r = t.getElementById(e);
                      if (r) {
                        if ((i = r.getAttributeNode("id")) && i.value === e)
                          return [r];
                        for (a = t.getElementsByName(e), n = 0; (r = a[n++]); )
                          if ((i = r.getAttributeNode("id")) && i.value === e)
                            return [r];
                      }
                      return [];
                    }
                  })),
              (n.find.TAG = i.getElementsByTagName
                ? function (e, t) {
                    return void 0 !== t.getElementsByTagName
                      ? t.getElementsByTagName(e)
                      : i.qsa
                      ? t.querySelectorAll(e)
                      : void 0;
                  }
                : function (e, t) {
                    var i,
                      n = [],
                      a = 0,
                      r = t.getElementsByTagName(e);
                    if ("*" === e) {
                      for (; (i = r[a++]); ) 1 === i.nodeType && n.push(i);
                      return n;
                    }
                    return r;
                  }),
              (n.find.CLASS =
                i.getElementsByClassName &&
                function (e, t) {
                  if (void 0 !== t.getElementsByClassName && v)
                    return t.getElementsByClassName(e);
                }),
              (g = []),
              (m = []),
              (i.qsa = K.test(h.querySelectorAll)) &&
                (le(function (e) {
                  (f.appendChild(e).innerHTML =
                    "<a id='" +
                    x +
                    "'></a><select id='" +
                    x +
                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                    e.querySelectorAll("[msallowcapture^='']").length &&
                      m.push("[*^$]=" + z + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length ||
                      m.push("\\[" + z + "*(?:value|" + N + ")"),
                    e.querySelectorAll("[id~=" + x + "-]").length ||
                      m.push("~="),
                    e.querySelectorAll(":checked").length || m.push(":checked"),
                    e.querySelectorAll("a#" + x + "+*").length ||
                      m.push(".#.+[+~]");
                }),
                le(function (e) {
                  e.innerHTML =
                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                  var t = h.createElement("input");
                  t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length &&
                      m.push("name" + z + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length &&
                      m.push(":enabled", ":disabled"),
                    (f.appendChild(e).disabled = !0),
                    2 !== e.querySelectorAll(":disabled").length &&
                      m.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    m.push(",.*:");
                })),
              (i.matchesSelector = K.test(
                (y =
                  f.matches ||
                  f.webkitMatchesSelector ||
                  f.mozMatchesSelector ||
                  f.oMatchesSelector ||
                  f.msMatchesSelector)
              )) &&
                le(function (e) {
                  (i.disconnectedMatch = y.call(e, "*")),
                    y.call(e, "[s!='']:x"),
                    g.push("!=", B);
                }),
              (m = m.length && new RegExp(m.join("|"))),
              (g = g.length && new RegExp(g.join("|"))),
              (t = K.test(f.compareDocumentPosition)),
              (b =
                t || K.test(f.contains)
                  ? function (e, t) {
                      var i = 9 === e.nodeType ? e.documentElement : e,
                        n = t && t.parentNode;
                      return (
                        e === n ||
                        !(
                          !n ||
                          1 !== n.nodeType ||
                          !(i.contains
                            ? i.contains(n)
                            : e.compareDocumentPosition &&
                              16 & e.compareDocumentPosition(n))
                        )
                      );
                    }
                  : function (e, t) {
                      if (t)
                        for (; (t = t.parentNode); ) if (t === e) return !0;
                      return !1;
                    }),
              (M = t
                ? function (e, t) {
                    if (e === t) return (d = !0), 0;
                    var n =
                      !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return (
                      n ||
                      (1 &
                        (n =
                          (e.ownerDocument || e) === (t.ownerDocument || t)
                            ? e.compareDocumentPosition(t)
                            : 1) ||
                      (!i.sortDetached && t.compareDocumentPosition(e) === n)
                        ? e === h || (e.ownerDocument === w && b(w, e))
                          ? -1
                          : t === h || (t.ownerDocument === w && b(w, t))
                          ? 1
                          : c
                          ? j(c, e) - j(c, t)
                          : 0
                        : 4 & n
                        ? -1
                        : 1)
                    );
                  }
                : function (e, t) {
                    if (e === t) return (d = !0), 0;
                    var i,
                      n = 0,
                      a = e.parentNode,
                      r = t.parentNode,
                      s = [e],
                      o = [t];
                    if (!a || !r)
                      return e === h
                        ? -1
                        : t === h
                        ? 1
                        : a
                        ? -1
                        : r
                        ? 1
                        : c
                        ? j(c, e) - j(c, t)
                        : 0;
                    if (a === r) return ce(e, t);
                    for (i = e; (i = i.parentNode); ) s.unshift(i);
                    for (i = t; (i = i.parentNode); ) o.unshift(i);
                    for (; s[n] === o[n]; ) n++;
                    return n
                      ? ce(s[n], o[n])
                      : s[n] === w
                      ? -1
                      : o[n] === w
                      ? 1
                      : 0;
                  }),
              h)
            : h;
        }),
      (re.matches = function (e, t) {
        return re(e, null, null, t);
      }),
      (re.matchesSelector = function (e, t) {
        if (
          ((e.ownerDocument || e) !== h && p(e),
          (t = t.replace(q, "='$1']")),
          i.matchesSelector &&
            v &&
            !C[t + " "] &&
            (!g || !g.test(t)) &&
            (!m || !m.test(t)))
        )
          try {
            var n = y.call(e, t);
            if (
              n ||
              i.disconnectedMatch ||
              (e.document && 11 !== e.document.nodeType)
            )
              return n;
          } catch (e) {}
        return re(t, h, null, [e]).length > 0;
      }),
      (re.contains = function (e, t) {
        return (e.ownerDocument || e) !== h && p(e), b(e, t);
      }),
      (re.attr = function (e, t) {
        (e.ownerDocument || e) !== h && p(e);
        var a = n.attrHandle[t.toLowerCase()],
          r = a && P.call(n.attrHandle, t.toLowerCase()) ? a(e, t, !v) : void 0;
        return void 0 !== r
          ? r
          : i.attributes || !v
          ? e.getAttribute(t)
          : (r = e.getAttributeNode(t)) && r.specified
          ? r.value
          : null;
      }),
      (re.escape = function (e) {
        return (e + "").replace(te, ie);
      }),
      (re.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e);
      }),
      (re.uniqueSort = function (e) {
        var t,
          n = [],
          a = 0,
          r = 0;
        if (
          ((d = !i.detectDuplicates),
          (c = !i.sortStable && e.slice(0)),
          e.sort(M),
          d)
        ) {
          for (; (t = e[r++]); ) t === e[r] && (a = n.push(r));
          for (; a--; ) e.splice(n[a], 1);
        }
        return (c = null), e;
      }),
      (a = re.getText =
        function (e) {
          var t,
            i = "",
            n = 0,
            r = e.nodeType;
          if (r) {
            if (1 === r || 9 === r || 11 === r) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) i += a(e);
            } else if (3 === r || 4 === r) return e.nodeValue;
          } else for (; (t = e[n++]); ) i += a(t);
          return i;
        }),
      ((n = re.selectors =
        {
          cacheLength: 50,
          createPseudo: oe,
          match: X,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (e) {
              return (
                (e[1] = e[1].replace(J, ee)),
                (e[3] = (e[3] || e[4] || e[5] || "").replace(J, ee)),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
              );
            },
            CHILD: function (e) {
              return (
                (e[1] = e[1].toLowerCase()),
                "nth" === e[1].slice(0, 3)
                  ? (e[3] || re.error(e[0]),
                    (e[4] = +(e[4]
                      ? e[5] + (e[6] || 1)
                      : 2 * ("even" === e[3] || "odd" === e[3]))),
                    (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                  : e[3] && re.error(e[0]),
                e
              );
            },
            PSEUDO: function (e) {
              var t,
                i = !e[6] && e[2];
              return X.CHILD.test(e[0])
                ? null
                : (e[3]
                    ? (e[2] = e[4] || e[5] || "")
                    : i &&
                      V.test(i) &&
                      (t = s(i, !0)) &&
                      (t = i.indexOf(")", i.length - t) - i.length) &&
                      ((e[0] = e[0].slice(0, t)), (e[2] = i.slice(0, t))),
                  e.slice(0, 3));
            },
          },
          filter: {
            TAG: function (e) {
              var t = e.replace(J, ee).toLowerCase();
              return "*" === e
                ? function () {
                    return !0;
                  }
                : function (e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t;
                  };
            },
            CLASS: function (e) {
              var t = T[e + " "];
              return (
                t ||
                ((t = new RegExp("(^|" + z + ")" + e + "(" + z + "|$)")) &&
                  T(e, function (e) {
                    return t.test(
                      ("string" == typeof e.className && e.className) ||
                        (void 0 !== e.getAttribute &&
                          e.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (e, t, i) {
              return function (n) {
                var a = re.attr(n, e);
                return null == a
                  ? "!=" === t
                  : !t ||
                      ((a += ""),
                      "=" === t
                        ? a === i
                        : "!=" === t
                        ? a !== i
                        : "^=" === t
                        ? i && 0 === a.indexOf(i)
                        : "*=" === t
                        ? i && a.indexOf(i) > -1
                        : "$=" === t
                        ? i && a.slice(-i.length) === i
                        : "~=" === t
                        ? (" " + a.replace(R, " ") + " ").indexOf(i) > -1
                        : "|=" === t &&
                          (a === i || a.slice(0, i.length + 1) === i + "-"));
              };
            },
            CHILD: function (e, t, i, n, a) {
              var r = "nth" !== e.slice(0, 3),
                s = "last" !== e.slice(-4),
                o = "of-type" === t;
              return 1 === n && 0 === a
                ? function (e) {
                    return !!e.parentNode;
                  }
                : function (t, i, l) {
                    var u,
                      c,
                      d,
                      p,
                      h,
                      f,
                      v = r !== s ? "nextSibling" : "previousSibling",
                      m = t.parentNode,
                      g = o && t.nodeName.toLowerCase(),
                      y = !l && !o,
                      b = !1;
                    if (m) {
                      if (r) {
                        for (; v; ) {
                          for (p = t; (p = p[v]); )
                            if (
                              o
                                ? p.nodeName.toLowerCase() === g
                                : 1 === p.nodeType
                            )
                              return !1;
                          f = v = "only" === e && !f && "nextSibling";
                        }
                        return !0;
                      }
                      if (((f = [s ? m.firstChild : m.lastChild]), s && y)) {
                        for (
                          b =
                            (h =
                              (u =
                                (c =
                                  (d = (p = m)[x] || (p[x] = {}))[p.uniqueID] ||
                                  (d[p.uniqueID] = {}))[e] || [])[0] === k &&
                              u[1]) && u[2],
                            p = h && m.childNodes[h];
                          (p = (++h && p && p[v]) || (b = h = 0) || f.pop());

                        )
                          if (1 === p.nodeType && ++b && p === t) {
                            c[e] = [k, h, b];
                            break;
                          }
                      } else if (
                        (y &&
                          (b = h =
                            (u =
                              (c =
                                (d = (p = t)[x] || (p[x] = {}))[p.uniqueID] ||
                                (d[p.uniqueID] = {}))[e] || [])[0] === k &&
                            u[1]),
                        !1 === b)
                      )
                        for (
                          ;
                          (p = (++h && p && p[v]) || (b = h = 0) || f.pop()) &&
                          ((o
                            ? p.nodeName.toLowerCase() !== g
                            : 1 !== p.nodeType) ||
                            !++b ||
                            (y &&
                              ((c =
                                (d = p[x] || (p[x] = {}))[p.uniqueID] ||
                                (d[p.uniqueID] = {}))[e] = [k, b]),
                            p !== t));

                        );
                      return (b -= a) === n || (b % n == 0 && b / n >= 0);
                    }
                  };
            },
            PSEUDO: function (e, t) {
              var i,
                a =
                  n.pseudos[e] ||
                  n.setFilters[e.toLowerCase()] ||
                  re.error("unsupported pseudo: " + e);
              return a[x]
                ? a(t)
                : a.length > 1
                ? ((i = [e, e, "", t]),
                  n.setFilters.hasOwnProperty(e.toLowerCase())
                    ? oe(function (e, i) {
                        for (var n, r = a(e, t), s = r.length; s--; )
                          e[(n = j(e, r[s]))] = !(i[n] = r[s]);
                      })
                    : function (e) {
                        return a(e, 0, i);
                      })
                : a;
            },
          },
          pseudos: {
            not: oe(function (e) {
              var t = [],
                i = [],
                n = o(e.replace(H, "$1"));
              return n[x]
                ? oe(function (e, t, i, a) {
                    for (var r, s = n(e, null, a, []), o = e.length; o--; )
                      (r = s[o]) && (e[o] = !(t[o] = r));
                  })
                : function (e, a, r) {
                    return (
                      (t[0] = e), n(t, null, r, i), (t[0] = null), !i.pop()
                    );
                  };
            }),
            has: oe(function (e) {
              return function (t) {
                return re(e, t).length > 0;
              };
            }),
            contains: oe(function (e) {
              return (
                (e = e.replace(J, ee)),
                function (t) {
                  return (t.textContent || t.innerText || a(t)).indexOf(e) > -1;
                }
              );
            }),
            lang: oe(function (e) {
              return (
                W.test(e || "") || re.error("unsupported lang: " + e),
                (e = e.replace(J, ee).toLowerCase()),
                function (t) {
                  var i;
                  do {
                    if (
                      (i = v
                        ? t.lang
                        : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                    )
                      return (
                        (i = i.toLowerCase()) === e || 0 === i.indexOf(e + "-")
                      );
                  } while ((t = t.parentNode) && 1 === t.nodeType);
                  return !1;
                }
              );
            }),
            target: function (t) {
              var i = e.location && e.location.hash;
              return i && i.slice(1) === t.id;
            },
            root: function (e) {
              return e === f;
            },
            focus: function (e) {
              return (
                e === h.activeElement &&
                (!h.hasFocus || h.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              );
            },
            enabled: he(!1),
            disabled: he(!0),
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return (
                ("input" === t && !!e.checked) ||
                ("option" === t && !!e.selected)
              );
            },
            selected: function (e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
              );
            },
            empty: function (e) {
              for (e = e.firstChild; e; e = e.nextSibling)
                if (e.nodeType < 6) return !1;
              return !0;
            },
            parent: function (e) {
              return !n.pseudos.empty(e);
            },
            header: function (e) {
              return U.test(e.nodeName);
            },
            input: function (e) {
              return Y.test(e.nodeName);
            },
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t && "button" === e.type) || "button" === t;
            },
            text: function (e) {
              var t;
              return (
                "input" === e.nodeName.toLowerCase() &&
                "text" === e.type &&
                (null == (t = e.getAttribute("type")) ||
                  "text" === t.toLowerCase())
              );
            },
            first: fe(function () {
              return [0];
            }),
            last: fe(function (e, t) {
              return [t - 1];
            }),
            eq: fe(function (e, t, i) {
              return [i < 0 ? i + t : i];
            }),
            even: fe(function (e, t) {
              for (var i = 0; i < t; i += 2) e.push(i);
              return e;
            }),
            odd: fe(function (e, t) {
              for (var i = 1; i < t; i += 2) e.push(i);
              return e;
            }),
            lt: fe(function (e, t, i) {
              for (var n = i < 0 ? i + t : i; --n >= 0; ) e.push(n);
              return e;
            }),
            gt: fe(function (e, t, i) {
              for (var n = i < 0 ? i + t : i; ++n < t; ) e.push(n);
              return e;
            }),
          },
        }).pseudos.nth = n.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        n.pseudos[t] = de(t);
      for (t in { submit: !0, reset: !0 }) n.pseudos[t] = pe(t);
      function me() {}
      function ge(e) {
        for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
        return n;
      }
      function ye(e, t, i) {
        var n = t.dir,
          a = t.next,
          r = a || n,
          s = i && "parentNode" === r,
          o = E++;
        return t.first
          ? function (t, i, a) {
              for (; (t = t[n]); ) if (1 === t.nodeType || s) return e(t, i, a);
              return !1;
            }
          : function (t, i, l) {
              var u,
                c,
                d,
                p = [k, o];
              if (l) {
                for (; (t = t[n]); )
                  if ((1 === t.nodeType || s) && e(t, i, l)) return !0;
              } else
                for (; (t = t[n]); )
                  if (1 === t.nodeType || s)
                    if (
                      ((c =
                        (d = t[x] || (t[x] = {}))[t.uniqueID] ||
                        (d[t.uniqueID] = {})),
                      a && a === t.nodeName.toLowerCase())
                    )
                      t = t[n] || t;
                    else {
                      if ((u = c[r]) && u[0] === k && u[1] === o)
                        return (p[2] = u[2]);
                      if (((c[r] = p), (p[2] = e(t, i, l)))) return !0;
                    }
              return !1;
            };
      }
      function be(e) {
        return e.length > 1
          ? function (t, i, n) {
              for (var a = e.length; a--; ) if (!e[a](t, i, n)) return !1;
              return !0;
            }
          : e[0];
      }
      function xe(e, t, i, n, a) {
        for (var r, s = [], o = 0, l = e.length, u = null != t; o < l; o++)
          (r = e[o]) && ((i && !i(r, n, a)) || (s.push(r), u && t.push(o)));
        return s;
      }
      function we(e, t, i, n, a, r) {
        return (
          n && !n[x] && (n = we(n)),
          a && !a[x] && (a = we(a, r)),
          oe(function (r, s, o, l) {
            var u,
              c,
              d,
              p = [],
              h = [],
              f = s.length,
              v =
                r ||
                (function (e, t, i) {
                  for (var n = 0, a = t.length; n < a; n++) re(e, t[n], i);
                  return i;
                })(t || "*", o.nodeType ? [o] : o, []),
              m = !e || (!r && t) ? v : xe(v, p, e, o, l),
              g = i ? (a || (r ? e : f || n) ? [] : s) : m;
            if ((i && i(m, g, o, l), n))
              for (u = xe(g, h), n(u, [], o, l), c = u.length; c--; )
                (d = u[c]) && (g[h[c]] = !(m[h[c]] = d));
            if (r) {
              if (a || e) {
                if (a) {
                  for (u = [], c = g.length; c--; )
                    (d = g[c]) && u.push((m[c] = d));
                  a(null, (g = []), u, l);
                }
                for (c = g.length; c--; )
                  (d = g[c]) &&
                    (u = a ? j(r, d) : p[c]) > -1 &&
                    (r[u] = !(s[u] = d));
              }
            } else (g = xe(g === s ? g.splice(f, g.length) : g)), a ? a(null, s, g, l) : D.apply(s, g);
          })
        );
      }
      function ke(e) {
        for (
          var t,
            i,
            a,
            r = e.length,
            s = n.relative[e[0].type],
            o = s || n.relative[" "],
            l = s ? 1 : 0,
            c = ye(
              function (e) {
                return e === t;
              },
              o,
              !0
            ),
            d = ye(
              function (e) {
                return j(t, e) > -1;
              },
              o,
              !0
            ),
            p = [
              function (e, i, n) {
                var a =
                  (!s && (n || i !== u)) ||
                  ((t = i).nodeType ? c(e, i, n) : d(e, i, n));
                return (t = null), a;
              },
            ];
          l < r;
          l++
        )
          if ((i = n.relative[e[l].type])) p = [ye(be(p), i)];
          else {
            if ((i = n.filter[e[l].type].apply(null, e[l].matches))[x]) {
              for (a = ++l; a < r && !n.relative[e[a].type]; a++);
              return we(
                l > 1 && be(p),
                l > 1 &&
                  ge(
                    e
                      .slice(0, l - 1)
                      .concat({ value: " " === e[l - 2].type ? "*" : "" })
                  ).replace(H, "$1"),
                i,
                l < a && ke(e.slice(l, a)),
                a < r && ke((e = e.slice(a))),
                a < r && ge(e)
              );
            }
            p.push(i);
          }
        return be(p);
      }
      function Ee(e, t) {
        var i = t.length > 0,
          a = e.length > 0,
          r = function (r, s, o, l, c) {
            var d,
              f,
              m,
              g = 0,
              y = "0",
              b = r && [],
              x = [],
              w = u,
              E = r || (a && n.find.TAG("*", c)),
              T = (k += null == w ? 1 : Math.random() || 0.1),
              S = E.length;
            for (
              c && (u = s === h || s || c);
              y !== S && null != (d = E[y]);
              y++
            ) {
              if (a && d) {
                for (
                  f = 0, s || d.ownerDocument === h || (p(d), (o = !v));
                  (m = e[f++]);

                )
                  if (m(d, s || h, o)) {
                    l.push(d);
                    break;
                  }
                c && (k = T);
              }
              i && ((d = !m && d) && g--, r && b.push(d));
            }
            if (((g += y), i && y !== g)) {
              for (f = 0; (m = t[f++]); ) m(b, x, s, o);
              if (r) {
                if (g > 0) for (; y--; ) b[y] || x[y] || (x[y] = A.call(l));
                x = xe(x);
              }
              D.apply(l, x),
                c && !r && x.length > 0 && g + t.length > 1 && re.uniqueSort(l);
            }
            return c && ((k = T), (u = w)), b;
          };
        return i ? oe(r) : r;
      }
      return (
        (me.prototype = n.filters = n.pseudos),
        (n.setFilters = new me()),
        (s = re.tokenize =
          function (e, t) {
            var i,
              a,
              r,
              s,
              o,
              l,
              u,
              c = S[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (o = e, l = [], u = n.preFilter; o; ) {
              for (s in ((i && !(a = F.exec(o))) ||
                (a && (o = o.slice(a[0].length) || o), l.push((r = []))),
              (i = !1),
              (a = G.exec(o)) &&
                ((i = a.shift()),
                r.push({ value: i, type: a[0].replace(H, " ") }),
                (o = o.slice(i.length))),
              n.filter))
                !(a = X[s].exec(o)) ||
                  (u[s] && !(a = u[s](a))) ||
                  ((i = a.shift()),
                  r.push({ value: i, type: s, matches: a }),
                  (o = o.slice(i.length)));
              if (!i) break;
            }
            return t ? o.length : o ? re.error(e) : S(e, l).slice(0);
          }),
        (o = re.compile =
          function (e, t) {
            var i,
              n = [],
              a = [],
              r = C[e + " "];
            if (!r) {
              for (t || (t = s(e)), i = t.length; i--; )
                (r = ke(t[i]))[x] ? n.push(r) : a.push(r);
              (r = C(e, Ee(a, n))).selector = e;
            }
            return r;
          }),
        (l = re.select =
          function (e, t, i, a) {
            var r,
              l,
              u,
              c,
              d,
              p = "function" == typeof e && e,
              h = !a && s((e = p.selector || e));
            if (((i = i || []), 1 === h.length)) {
              if (
                (l = h[0] = h[0].slice(0)).length > 2 &&
                "ID" === (u = l[0]).type &&
                9 === t.nodeType &&
                v &&
                n.relative[l[1].type]
              ) {
                if (!(t = (n.find.ID(u.matches[0].replace(J, ee), t) || [])[0]))
                  return i;
                p && (t = t.parentNode), (e = e.slice(l.shift().value.length));
              }
              for (
                r = X.needsContext.test(e) ? 0 : l.length;
                r-- && ((u = l[r]), !n.relative[(c = u.type)]);

              )
                if (
                  (d = n.find[c]) &&
                  (a = d(
                    u.matches[0].replace(J, ee),
                    (Z.test(l[0].type) && ve(t.parentNode)) || t
                  ))
                ) {
                  if ((l.splice(r, 1), !(e = a.length && ge(l))))
                    return D.apply(i, a), i;
                  break;
                }
            }
            return (
              (p || o(e, h))(
                a,
                t,
                !v,
                i,
                !t || (Z.test(e) && ve(t.parentNode)) || t
              ),
              i
            );
          }),
        (i.sortStable = x.split("").sort(M).join("") === x),
        (i.detectDuplicates = !!d),
        p(),
        (i.sortDetached = le(function (e) {
          return 1 & e.compareDocumentPosition(h.createElement("fieldset"));
        })),
        le(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            "#" === e.firstChild.getAttribute("href")
          );
        }) ||
          ue("type|href|height|width", function (e, t, i) {
            if (!i)
              return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
          }),
        (i.attributes &&
          le(function (e) {
            return (
              (e.innerHTML = "<input/>"),
              e.firstChild.setAttribute("value", ""),
              "" === e.firstChild.getAttribute("value")
            );
          })) ||
          ue("value", function (e, t, i) {
            if (!i && "input" === e.nodeName.toLowerCase())
              return e.defaultValue;
          }),
        le(function (e) {
          return null == e.getAttribute("disabled");
        }) ||
          ue(N, function (e, t, i) {
            var n;
            if (!i)
              return !0 === e[t]
                ? t.toLowerCase()
                : (n = e.getAttributeNode(t)) && n.specified
                ? n.value
                : null;
          }),
        re
      );
    })(e);
    (x.find = E),
      (x.expr = E.selectors),
      (x.expr[":"] = x.expr.pseudos),
      (x.uniqueSort = x.unique = E.uniqueSort),
      (x.text = E.getText),
      (x.isXMLDoc = E.isXML),
      (x.contains = E.contains),
      (x.escapeSelector = E.escape);
    var T = function (e, t, i) {
        for (var n = [], a = void 0 !== i; (e = e[t]) && 9 !== e.nodeType; )
          if (1 === e.nodeType) {
            if (a && x(e).is(i)) break;
            n.push(e);
          }
        return n;
      },
      S = function (e, t) {
        for (var i = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && i.push(e);
        return i;
      },
      C = x.expr.match.needsContext;
    function M(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }
    var P = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function O(e, t, i) {
      return v(t)
        ? x.grep(e, function (e, n) {
            return !!t.call(e, n, e) !== i;
          })
        : t.nodeType
        ? x.grep(e, function (e) {
            return (e === t) !== i;
          })
        : "string" != typeof t
        ? x.grep(e, function (e) {
            return l.call(t, e) > -1 !== i;
          })
        : x.filter(t, e, i);
    }
    (x.filter = function (e, t, i) {
      var n = t[0];
      return (
        i && (e = ":not(" + e + ")"),
        1 === t.length && 1 === n.nodeType
          ? x.find.matchesSelector(n, e)
            ? [n]
            : []
          : x.find.matches(
              e,
              x.grep(t, function (e) {
                return 1 === e.nodeType;
              })
            )
      );
    }),
      x.fn.extend({
        find: function (e) {
          var t,
            i,
            n = this.length,
            a = this;
          if ("string" != typeof e)
            return this.pushStack(
              x(e).filter(function () {
                for (t = 0; t < n; t++) if (x.contains(a[t], this)) return !0;
              })
            );
          for (i = this.pushStack([]), t = 0; t < n; t++) x.find(e, a[t], i);
          return n > 1 ? x.uniqueSort(i) : i;
        },
        filter: function (e) {
          return this.pushStack(O(this, e || [], !1));
        },
        not: function (e) {
          return this.pushStack(O(this, e || [], !0));
        },
        is: function (e) {
          return !!O(
            this,
            "string" == typeof e && C.test(e) ? x(e) : e || [],
            !1
          ).length;
        },
      });
    var A,
      L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((x.fn.init = function (e, t, i) {
      var a, r;
      if (!e) return this;
      if (((i = i || A), "string" == typeof e)) {
        if (
          !(a =
            "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
              ? [null, e, null]
              : L.exec(e)) ||
          (!a[1] && t)
        )
          return !t || t.jquery
            ? (t || i).find(e)
            : this.constructor(t).find(e);
        if (a[1]) {
          if (
            ((t = t instanceof x ? t[0] : t),
            x.merge(
              this,
              x.parseHTML(a[1], t && t.nodeType ? t.ownerDocument || t : n, !0)
            ),
            P.test(a[1]) && x.isPlainObject(t))
          )
            for (a in t) v(this[a]) ? this[a](t[a]) : this.attr(a, t[a]);
          return this;
        }
        return (
          (r = n.getElementById(a[2])) && ((this[0] = r), (this.length = 1)),
          this
        );
      }
      return e.nodeType
        ? ((this[0] = e), (this.length = 1), this)
        : v(e)
        ? void 0 !== i.ready
          ? i.ready(e)
          : e(x)
        : x.makeArray(e, this);
    }).prototype = x.fn),
      (A = x(n));
    var D = /^(?:parents|prev(?:Until|All))/,
      I = { children: !0, contents: !0, next: !0, prev: !0 };
    function j(e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    }
    x.fn.extend({
      has: function (e) {
        var t = x(e, this),
          i = t.length;
        return this.filter(function () {
          for (var e = 0; e < i; e++) if (x.contains(this, t[e])) return !0;
        });
      },
      closest: function (e, t) {
        var i,
          n = 0,
          a = this.length,
          r = [],
          s = "string" != typeof e && x(e);
        if (!C.test(e))
          for (; n < a; n++)
            for (i = this[n]; i && i !== t; i = i.parentNode)
              if (
                i.nodeType < 11 &&
                (s
                  ? s.index(i) > -1
                  : 1 === i.nodeType && x.find.matchesSelector(i, e))
              ) {
                r.push(i);
                break;
              }
        return this.pushStack(r.length > 1 ? x.uniqueSort(r) : r);
      },
      index: function (e) {
        return e
          ? "string" == typeof e
            ? l.call(x(e), this[0])
            : l.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (e, t) {
        return this.pushStack(x.uniqueSort(x.merge(this.get(), x(e, t))));
      },
      addBack: function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      },
    }),
      x.each(
        {
          parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
          },
          parents: function (e) {
            return T(e, "parentNode");
          },
          parentsUntil: function (e, t, i) {
            return T(e, "parentNode", i);
          },
          next: function (e) {
            return j(e, "nextSibling");
          },
          prev: function (e) {
            return j(e, "previousSibling");
          },
          nextAll: function (e) {
            return T(e, "nextSibling");
          },
          prevAll: function (e) {
            return T(e, "previousSibling");
          },
          nextUntil: function (e, t, i) {
            return T(e, "nextSibling", i);
          },
          prevUntil: function (e, t, i) {
            return T(e, "previousSibling", i);
          },
          siblings: function (e) {
            return S((e.parentNode || {}).firstChild, e);
          },
          children: function (e) {
            return S(e.firstChild);
          },
          contents: function (e) {
            return M(e, "iframe")
              ? e.contentDocument
              : (M(e, "template") && (e = e.content || e),
                x.merge([], e.childNodes));
          },
        },
        function (e, t) {
          x.fn[e] = function (i, n) {
            var a = x.map(this, t, i);
            return (
              "Until" !== e.slice(-5) && (n = i),
              n && "string" == typeof n && (a = x.filter(n, a)),
              this.length > 1 &&
                (I[e] || x.uniqueSort(a), D.test(e) && a.reverse()),
              this.pushStack(a)
            );
          };
        }
      );
    var N = /[^\x20\t\r\n\f]+/g;
    function z(e) {
      return e;
    }
    function _(e) {
      throw e;
    }
    function $(e, t, i, n) {
      var a;
      try {
        e && v((a = e.promise))
          ? a.call(e).done(t).fail(i)
          : e && v((a = e.then))
          ? a.call(e, t, i)
          : t.apply(void 0, [e].slice(n));
      } catch (e) {
        i.apply(void 0, [e]);
      }
    }
    (x.Callbacks = function (e) {
      e =
        "string" == typeof e
          ? (function (e) {
              var t = {};
              return (
                x.each(e.match(N) || [], function (e, i) {
                  t[i] = !0;
                }),
                t
              );
            })(e)
          : x.extend({}, e);
      var t,
        i,
        n,
        a,
        r = [],
        s = [],
        o = -1,
        l = function () {
          for (a = a || e.once, n = t = !0; s.length; o = -1)
            for (i = s.shift(); ++o < r.length; )
              !1 === r[o].apply(i[0], i[1]) &&
                e.stopOnFalse &&
                ((o = r.length), (i = !1));
          e.memory || (i = !1), (t = !1), a && (r = i ? [] : "");
        },
        u = {
          add: function () {
            return (
              r &&
                (i && !t && ((o = r.length - 1), s.push(i)),
                (function t(i) {
                  x.each(i, function (i, n) {
                    v(n)
                      ? (e.unique && u.has(n)) || r.push(n)
                      : n && n.length && "string" !== b(n) && t(n);
                  });
                })(arguments),
                i && !t && l()),
              this
            );
          },
          remove: function () {
            return (
              x.each(arguments, function (e, t) {
                for (var i; (i = x.inArray(t, r, i)) > -1; )
                  r.splice(i, 1), i <= o && o--;
              }),
              this
            );
          },
          has: function (e) {
            return e ? x.inArray(e, r) > -1 : r.length > 0;
          },
          empty: function () {
            return r && (r = []), this;
          },
          disable: function () {
            return (a = s = []), (r = i = ""), this;
          },
          disabled: function () {
            return !r;
          },
          lock: function () {
            return (a = s = []), i || t || (r = i = ""), this;
          },
          locked: function () {
            return !!a;
          },
          fireWith: function (e, i) {
            return (
              a ||
                ((i = [e, (i = i || []).slice ? i.slice() : i]),
                s.push(i),
                t || l()),
              this
            );
          },
          fire: function () {
            return u.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!n;
          },
        };
      return u;
    }),
      x.extend({
        Deferred: function (t) {
          var i = [
              [
                "notify",
                "progress",
                x.Callbacks("memory"),
                x.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                x.Callbacks("once memory"),
                x.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                x.Callbacks("once memory"),
                x.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            n = "pending",
            a = {
              state: function () {
                return n;
              },
              always: function () {
                return r.done(arguments).fail(arguments), this;
              },
              catch: function (e) {
                return a.then(null, e);
              },
              pipe: function () {
                var e = arguments;
                return x
                  .Deferred(function (t) {
                    x.each(i, function (i, n) {
                      var a = v(e[n[4]]) && e[n[4]];
                      r[n[1]](function () {
                        var e = a && a.apply(this, arguments);
                        e && v(e.promise)
                          ? e
                              .promise()
                              .progress(t.notify)
                              .done(t.resolve)
                              .fail(t.reject)
                          : t[n[0] + "With"](this, a ? [e] : arguments);
                      });
                    }),
                      (e = null);
                  })
                  .promise();
              },
              then: function (t, n, a) {
                var r = 0;
                function s(t, i, n, a) {
                  return function () {
                    var o = this,
                      l = arguments,
                      u = function () {
                        var e, u;
                        if (!(t < r)) {
                          if ((e = n.apply(o, l)) === i.promise())
                            throw new TypeError("Thenable self-resolution");
                          (u =
                            e &&
                            ("object" == typeof e || "function" == typeof e) &&
                            e.then),
                            v(u)
                              ? a
                                ? u.call(e, s(r, i, z, a), s(r, i, _, a))
                                : (r++,
                                  u.call(
                                    e,
                                    s(r, i, z, a),
                                    s(r, i, _, a),
                                    s(r, i, z, i.notifyWith)
                                  ))
                              : (n !== z && ((o = void 0), (l = [e])),
                                (a || i.resolveWith)(o, l));
                        }
                      },
                      c = a
                        ? u
                        : function () {
                            try {
                              u();
                            } catch (e) {
                              x.Deferred.exceptionHook &&
                                x.Deferred.exceptionHook(e, c.stackTrace),
                                t + 1 >= r &&
                                  (n !== _ && ((o = void 0), (l = [e])),
                                  i.rejectWith(o, l));
                            }
                          };
                    t
                      ? c()
                      : (x.Deferred.getStackHook &&
                          (c.stackTrace = x.Deferred.getStackHook()),
                        e.setTimeout(c));
                  };
                }
                return x
                  .Deferred(function (e) {
                    i[0][3].add(s(0, e, v(a) ? a : z, e.notifyWith)),
                      i[1][3].add(s(0, e, v(t) ? t : z)),
                      i[2][3].add(s(0, e, v(n) ? n : _));
                  })
                  .promise();
              },
              promise: function (e) {
                return null != e ? x.extend(e, a) : a;
              },
            },
            r = {};
          return (
            x.each(i, function (e, t) {
              var s = t[2],
                o = t[5];
              (a[t[1]] = s.add),
                o &&
                  s.add(
                    function () {
                      n = o;
                    },
                    i[3 - e][2].disable,
                    i[3 - e][3].disable,
                    i[0][2].lock,
                    i[0][3].lock
                  ),
                s.add(t[3].fire),
                (r[t[0]] = function () {
                  return (
                    r[t[0] + "With"](this === r ? void 0 : this, arguments),
                    this
                  );
                }),
                (r[t[0] + "With"] = s.fireWith);
            }),
            a.promise(r),
            t && t.call(r, r),
            r
          );
        },
        when: function (e) {
          var t = arguments.length,
            i = t,
            n = Array(i),
            a = r.call(arguments),
            s = x.Deferred(),
            o = function (e) {
              return function (i) {
                (n[e] = this),
                  (a[e] = arguments.length > 1 ? r.call(arguments) : i),
                  --t || s.resolveWith(n, a);
              };
            };
          if (
            t <= 1 &&
            ($(e, s.done(o(i)).resolve, s.reject, !t),
            "pending" === s.state() || v(a[i] && a[i].then))
          )
            return s.then();
          for (; i--; ) $(a[i], o(i), s.reject);
          return s.promise();
        },
      });
    var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (x.Deferred.exceptionHook = function (t, i) {
      e.console &&
        e.console.warn &&
        t &&
        B.test(t.name) &&
        e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i);
    }),
      (x.readyException = function (t) {
        e.setTimeout(function () {
          throw t;
        });
      });
    var R = x.Deferred();
    function H() {
      n.removeEventListener("DOMContentLoaded", H),
        e.removeEventListener("load", H),
        x.ready();
    }
    (x.fn.ready = function (e) {
      return (
        R.then(e).catch(function (e) {
          x.readyException(e);
        }),
        this
      );
    }),
      x.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
          (!0 === e ? --x.readyWait : x.isReady) ||
            ((x.isReady = !0),
            (!0 !== e && --x.readyWait > 0) || R.resolveWith(n, [x]));
        },
      }),
      (x.ready.then = R.then),
      "complete" === n.readyState ||
      ("loading" !== n.readyState && !n.documentElement.doScroll)
        ? e.setTimeout(x.ready)
        : (n.addEventListener("DOMContentLoaded", H),
          e.addEventListener("load", H));
    var F = function (e, t, i, n, a, r, s) {
        var o = 0,
          l = e.length,
          u = null == i;
        if ("object" === b(i))
          for (o in ((a = !0), i)) F(e, t, o, i[o], !0, r, s);
        else if (
          void 0 !== n &&
          ((a = !0),
          v(n) || (s = !0),
          u &&
            (s
              ? (t.call(e, n), (t = null))
              : ((u = t),
                (t = function (e, t, i) {
                  return u.call(x(e), i);
                }))),
          t)
        )
          for (; o < l; o++) t(e[o], i, s ? n : n.call(e[o], o, t(e[o], i)));
        return a ? e : u ? t.call(e) : l ? t(e[0], i) : r;
      },
      G = /^-ms-/,
      q = /-([a-z])/g;
    function V(e, t) {
      return t.toUpperCase();
    }
    function W(e) {
      return e.replace(G, "ms-").replace(q, V);
    }
    var X = function (e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    };
    function Y() {
      this.expando = x.expando + Y.uid++;
    }
    (Y.uid = 1),
      (Y.prototype = {
        cache: function (e) {
          var t = e[this.expando];
          return (
            t ||
              ((t = {}),
              X(e) &&
                (e.nodeType
                  ? (e[this.expando] = t)
                  : Object.defineProperty(e, this.expando, {
                      value: t,
                      configurable: !0,
                    }))),
            t
          );
        },
        set: function (e, t, i) {
          var n,
            a = this.cache(e);
          if ("string" == typeof t) a[W(t)] = i;
          else for (n in t) a[W(n)] = t[n];
          return a;
        },
        get: function (e, t) {
          return void 0 === t
            ? this.cache(e)
            : e[this.expando] && e[this.expando][W(t)];
        },
        access: function (e, t, i) {
          return void 0 === t || (t && "string" == typeof t && void 0 === i)
            ? this.get(e, t)
            : (this.set(e, t, i), void 0 !== i ? i : t);
        },
        remove: function (e, t) {
          var i,
            n = e[this.expando];
          if (void 0 !== n) {
            if (void 0 !== t) {
              i = (t = Array.isArray(t)
                ? t.map(W)
                : (t = W(t)) in n
                ? [t]
                : t.match(N) || []).length;
              for (; i--; ) delete n[t[i]];
            }
            (void 0 === t || x.isEmptyObject(n)) &&
              (e.nodeType
                ? (e[this.expando] = void 0)
                : delete e[this.expando]);
          }
        },
        hasData: function (e) {
          var t = e[this.expando];
          return void 0 !== t && !x.isEmptyObject(t);
        },
      });
    var U = new Y(),
      K = new Y(),
      Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Z = /[A-Z]/g;
    function J(e, t, i) {
      var n;
      if (void 0 === i && 1 === e.nodeType)
        if (
          ((n = "data-" + t.replace(Z, "-$&").toLowerCase()),
          "string" == typeof (i = e.getAttribute(n)))
        ) {
          try {
            i = (function (e) {
              return (
                "true" === e ||
                ("false" !== e &&
                  ("null" === e
                    ? null
                    : e === +e + ""
                    ? +e
                    : Q.test(e)
                    ? JSON.parse(e)
                    : e))
              );
            })(i);
          } catch (e) {}
          K.set(e, t, i);
        } else i = void 0;
      return i;
    }
    x.extend({
      hasData: function (e) {
        return K.hasData(e) || U.hasData(e);
      },
      data: function (e, t, i) {
        return K.access(e, t, i);
      },
      removeData: function (e, t) {
        K.remove(e, t);
      },
      _data: function (e, t, i) {
        return U.access(e, t, i);
      },
      _removeData: function (e, t) {
        U.remove(e, t);
      },
    }),
      x.fn.extend({
        data: function (e, t) {
          var i,
            n,
            a,
            r = this[0],
            s = r && r.attributes;
          if (void 0 === e) {
            if (
              this.length &&
              ((a = K.get(r)), 1 === r.nodeType && !U.get(r, "hasDataAttrs"))
            ) {
              for (i = s.length; i--; )
                s[i] &&
                  0 === (n = s[i].name).indexOf("data-") &&
                  ((n = W(n.slice(5))), J(r, n, a[n]));
              U.set(r, "hasDataAttrs", !0);
            }
            return a;
          }
          return "object" == typeof e
            ? this.each(function () {
                K.set(this, e);
              })
            : F(
                this,
                function (t) {
                  var i;
                  if (r && void 0 === t) {
                    if (void 0 !== (i = K.get(r, e))) return i;
                    if (void 0 !== (i = J(r, e))) return i;
                  } else
                    this.each(function () {
                      K.set(this, e, t);
                    });
                },
                null,
                t,
                arguments.length > 1,
                null,
                !0
              );
        },
        removeData: function (e) {
          return this.each(function () {
            K.remove(this, e);
          });
        },
      }),
      x.extend({
        queue: function (e, t, i) {
          var n;
          if (e)
            return (
              (t = (t || "fx") + "queue"),
              (n = U.get(e, t)),
              i &&
                (!n || Array.isArray(i)
                  ? (n = U.access(e, t, x.makeArray(i)))
                  : n.push(i)),
              n || []
            );
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var i = x.queue(e, t),
            n = i.length,
            a = i.shift(),
            r = x._queueHooks(e, t);
          "inprogress" === a && ((a = i.shift()), n--),
            a &&
              ("fx" === t && i.unshift("inprogress"),
              delete r.stop,
              a.call(
                e,
                function () {
                  x.dequeue(e, t);
                },
                r
              )),
            !n && r && r.empty.fire();
        },
        _queueHooks: function (e, t) {
          var i = t + "queueHooks";
          return (
            U.get(e, i) ||
            U.access(e, i, {
              empty: x.Callbacks("once memory").add(function () {
                U.remove(e, [t + "queue", i]);
              }),
            })
          );
        },
      }),
      x.fn.extend({
        queue: function (e, t) {
          var i = 2;
          return (
            "string" != typeof e && ((t = e), (e = "fx"), i--),
            arguments.length < i
              ? x.queue(this[0], e)
              : void 0 === t
              ? this
              : this.each(function () {
                  var i = x.queue(this, e, t);
                  x._queueHooks(this, e),
                    "fx" === e && "inprogress" !== i[0] && x.dequeue(this, e);
                })
          );
        },
        dequeue: function (e) {
          return this.each(function () {
            x.dequeue(this, e);
          });
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", []);
        },
        promise: function (e, t) {
          var i,
            n = 1,
            a = x.Deferred(),
            r = this,
            s = this.length,
            o = function () {
              --n || a.resolveWith(r, [r]);
            };
          for (
            "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
            s--;

          )
            (i = U.get(r[s], e + "queueHooks")) &&
              i.empty &&
              (n++, i.empty.add(o));
          return o(), a.promise(t);
        },
      });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ie = ["Top", "Right", "Bottom", "Left"],
      ne = function (e, t) {
        return (
          "none" === (e = t || e).style.display ||
          ("" === e.style.display &&
            x.contains(e.ownerDocument, e) &&
            "none" === x.css(e, "display"))
        );
      },
      ae = function (e, t, i, n) {
        var a,
          r,
          s = {};
        for (r in t) (s[r] = e.style[r]), (e.style[r] = t[r]);
        for (r in ((a = i.apply(e, n || [])), t)) e.style[r] = s[r];
        return a;
      };
    function re(e, t, i, n) {
      var a,
        r,
        s = 20,
        o = n
          ? function () {
              return n.cur();
            }
          : function () {
              return x.css(e, t, "");
            },
        l = o(),
        u = (i && i[3]) || (x.cssNumber[t] ? "" : "px"),
        c = (x.cssNumber[t] || ("px" !== u && +l)) && te.exec(x.css(e, t));
      if (c && c[3] !== u) {
        for (l /= 2, u = u || c[3], c = +l || 1; s--; )
          x.style(e, t, c + u),
            (1 - r) * (1 - (r = o() / l || 0.5)) <= 0 && (s = 0),
            (c /= r);
        (c *= 2), x.style(e, t, c + u), (i = i || []);
      }
      return (
        i &&
          ((c = +c || +l || 0),
          (a = i[1] ? c + (i[1] + 1) * i[2] : +i[2]),
          n && ((n.unit = u), (n.start = c), (n.end = a))),
        a
      );
    }
    var se = {};
    function oe(e) {
      var t,
        i = e.ownerDocument,
        n = e.nodeName,
        a = se[n];
      return (
        a ||
        ((t = i.body.appendChild(i.createElement(n))),
        (a = x.css(t, "display")),
        t.parentNode.removeChild(t),
        "none" === a && (a = "block"),
        (se[n] = a),
        a)
      );
    }
    function le(e, t) {
      for (var i, n, a = [], r = 0, s = e.length; r < s; r++)
        (n = e[r]).style &&
          ((i = n.style.display),
          t
            ? ("none" === i &&
                ((a[r] = U.get(n, "display") || null),
                a[r] || (n.style.display = "")),
              "" === n.style.display && ne(n) && (a[r] = oe(n)))
            : "none" !== i && ((a[r] = "none"), U.set(n, "display", i)));
      for (r = 0; r < s; r++) null != a[r] && (e[r].style.display = a[r]);
      return e;
    }
    x.fn.extend({
      show: function () {
        return le(this, !0);
      },
      hide: function () {
        return le(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              ne(this) ? x(this).show() : x(this).hide();
            });
      },
    });
    var ue = /^(?:checkbox|radio)$/i,
      ce = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      de = /^$|^module$|\/(?:java|ecma)script/i,
      pe = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
      };
    function he(e, t) {
      var i;
      return (
        (i =
          void 0 !== e.getElementsByTagName
            ? e.getElementsByTagName(t || "*")
            : void 0 !== e.querySelectorAll
            ? e.querySelectorAll(t || "*")
            : []),
        void 0 === t || (t && M(e, t)) ? x.merge([e], i) : i
      );
    }
    function fe(e, t) {
      for (var i = 0, n = e.length; i < n; i++)
        U.set(e[i], "globalEval", !t || U.get(t[i], "globalEval"));
    }
    (pe.optgroup = pe.option),
      (pe.tbody = pe.tfoot = pe.colgroup = pe.caption = pe.thead),
      (pe.th = pe.td);
    var ve = /<|&#?\w+;/;
    function me(e, t, i, n, a) {
      for (
        var r,
          s,
          o,
          l,
          u,
          c,
          d = t.createDocumentFragment(),
          p = [],
          h = 0,
          f = e.length;
        h < f;
        h++
      )
        if ((r = e[h]) || 0 === r)
          if ("object" === b(r)) x.merge(p, r.nodeType ? [r] : r);
          else if (ve.test(r)) {
            for (
              s = s || d.appendChild(t.createElement("div")),
                o = (ce.exec(r) || ["", ""])[1].toLowerCase(),
                l = pe[o] || pe._default,
                s.innerHTML = l[1] + x.htmlPrefilter(r) + l[2],
                c = l[0];
              c--;

            )
              s = s.lastChild;
            x.merge(p, s.childNodes), ((s = d.firstChild).textContent = "");
          } else p.push(t.createTextNode(r));
      for (d.textContent = "", h = 0; (r = p[h++]); )
        if (n && x.inArray(r, n) > -1) a && a.push(r);
        else if (
          ((u = x.contains(r.ownerDocument, r)),
          (s = he(d.appendChild(r), "script")),
          u && fe(s),
          i)
        )
          for (c = 0; (r = s[c++]); ) de.test(r.type || "") && i.push(r);
      return d;
    }
    !(function () {
      var e = n.createDocumentFragment().appendChild(n.createElement("div")),
        t = n.createElement("input");
      t.setAttribute("type", "radio"),
        t.setAttribute("checked", "checked"),
        t.setAttribute("name", "t"),
        e.appendChild(t),
        (f.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (e.innerHTML = "<textarea>x</textarea>"),
        (f.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue);
    })();
    var ge = n.documentElement,
      ye = /^key/,
      be = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      xe = /^([^.]*)(?:\.(.+)|)/;
    function we() {
      return !0;
    }
    function ke() {
      return !1;
    }
    function Ee() {
      try {
        return n.activeElement;
      } catch (e) {}
    }
    function Te(e, t, i, n, a, r) {
      var s, o;
      if ("object" == typeof t) {
        for (o in ("string" != typeof i && ((n = n || i), (i = void 0)), t))
          Te(e, o, i, n, t[o], r);
        return e;
      }
      if (
        (null == n && null == a
          ? ((a = i), (n = i = void 0))
          : null == a &&
            ("string" == typeof i
              ? ((a = n), (n = void 0))
              : ((a = n), (n = i), (i = void 0))),
        !1 === a)
      )
        a = ke;
      else if (!a) return e;
      return (
        1 === r &&
          ((s = a),
          ((a = function (e) {
            return x().off(e), s.apply(this, arguments);
          }).guid = s.guid || (s.guid = x.guid++))),
        e.each(function () {
          x.event.add(this, t, a, n, i);
        })
      );
    }
    (x.event = {
      global: {},
      add: function (e, t, i, n, a) {
        var r,
          s,
          o,
          l,
          u,
          c,
          d,
          p,
          h,
          f,
          v,
          m = U.get(e);
        if (m)
          for (
            i.handler && ((i = (r = i).handler), (a = r.selector)),
              a && x.find.matchesSelector(ge, a),
              i.guid || (i.guid = x.guid++),
              (l = m.events) || (l = m.events = {}),
              (s = m.handle) ||
                (s = m.handle =
                  function (t) {
                    return void 0 !== x && x.event.triggered !== t.type
                      ? x.event.dispatch.apply(e, arguments)
                      : void 0;
                  }),
              u = (t = (t || "").match(N) || [""]).length;
            u--;

          )
            (h = v = (o = xe.exec(t[u]) || [])[1]),
              (f = (o[2] || "").split(".").sort()),
              h &&
                ((d = x.event.special[h] || {}),
                (h = (a ? d.delegateType : d.bindType) || h),
                (d = x.event.special[h] || {}),
                (c = x.extend(
                  {
                    type: h,
                    origType: v,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: a,
                    needsContext: a && x.expr.match.needsContext.test(a),
                    namespace: f.join("."),
                  },
                  r
                )),
                (p = l[h]) ||
                  (((p = l[h] = []).delegateCount = 0),
                  (d.setup && !1 !== d.setup.call(e, n, f, s)) ||
                    (e.addEventListener && e.addEventListener(h, s))),
                d.add &&
                  (d.add.call(e, c),
                  c.handler.guid || (c.handler.guid = i.guid)),
                a ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                (x.event.global[h] = !0));
      },
      remove: function (e, t, i, n, a) {
        var r,
          s,
          o,
          l,
          u,
          c,
          d,
          p,
          h,
          f,
          v,
          m = U.hasData(e) && U.get(e);
        if (m && (l = m.events)) {
          for (u = (t = (t || "").match(N) || [""]).length; u--; )
            if (
              ((h = v = (o = xe.exec(t[u]) || [])[1]),
              (f = (o[2] || "").split(".").sort()),
              h)
            ) {
              for (
                d = x.event.special[h] || {},
                  p = l[(h = (n ? d.delegateType : d.bindType) || h)] || [],
                  o =
                    o[2] &&
                    new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  s = r = p.length;
                r--;

              )
                (c = p[r]),
                  (!a && v !== c.origType) ||
                    (i && i.guid !== c.guid) ||
                    (o && !o.test(c.namespace)) ||
                    (n && n !== c.selector && ("**" !== n || !c.selector)) ||
                    (p.splice(r, 1),
                    c.selector && p.delegateCount--,
                    d.remove && d.remove.call(e, c));
              s &&
                !p.length &&
                ((d.teardown && !1 !== d.teardown.call(e, f, m.handle)) ||
                  x.removeEvent(e, h, m.handle),
                delete l[h]);
            } else for (h in l) x.event.remove(e, h + t[u], i, n, !0);
          x.isEmptyObject(l) && U.remove(e, "handle events");
        }
      },
      dispatch: function (e) {
        var t,
          i,
          n,
          a,
          r,
          s,
          o = x.event.fix(e),
          l = new Array(arguments.length),
          u = (U.get(this, "events") || {})[o.type] || [],
          c = x.event.special[o.type] || {};
        for (l[0] = o, t = 1; t < arguments.length; t++) l[t] = arguments[t];
        if (
          ((o.delegateTarget = this),
          !c.preDispatch || !1 !== c.preDispatch.call(this, o))
        ) {
          for (
            s = x.event.handlers.call(this, o, u), t = 0;
            (a = s[t++]) && !o.isPropagationStopped();

          )
            for (
              o.currentTarget = a.elem, i = 0;
              (r = a.handlers[i++]) && !o.isImmediatePropagationStopped();

            )
              (o.rnamespace && !o.rnamespace.test(r.namespace)) ||
                ((o.handleObj = r),
                (o.data = r.data),
                void 0 !==
                  (n = (
                    (x.event.special[r.origType] || {}).handle || r.handler
                  ).apply(a.elem, l)) &&
                  !1 === (o.result = n) &&
                  (o.preventDefault(), o.stopPropagation()));
          return c.postDispatch && c.postDispatch.call(this, o), o.result;
        }
      },
      handlers: function (e, t) {
        var i,
          n,
          a,
          r,
          s,
          o = [],
          l = t.delegateCount,
          u = e.target;
        if (l && u.nodeType && !("click" === e.type && e.button >= 1))
          for (; u !== this; u = u.parentNode || this)
            if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
              for (r = [], s = {}, i = 0; i < l; i++)
                void 0 === s[(a = (n = t[i]).selector + " ")] &&
                  (s[a] = n.needsContext
                    ? x(a, this).index(u) > -1
                    : x.find(a, this, null, [u]).length),
                  s[a] && r.push(n);
              r.length && o.push({ elem: u, handlers: r });
            }
        return (
          (u = this),
          l < t.length && o.push({ elem: u, handlers: t.slice(l) }),
          o
        );
      },
      addProp: function (e, t) {
        Object.defineProperty(x.Event.prototype, e, {
          enumerable: !0,
          configurable: !0,
          get: v(t)
            ? function () {
                if (this.originalEvent) return t(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[e];
              },
          set: function (t) {
            Object.defineProperty(this, e, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: t,
            });
          },
        });
      },
      fix: function (e) {
        return e[x.expando] ? e : new x.Event(e);
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== Ee() && this.focus) return this.focus(), !1;
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            if (this === Ee() && this.blur) return this.blur(), !1;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            if ("checkbox" === this.type && this.click && M(this, "input"))
              return this.click(), !1;
          },
          _default: function (e) {
            return M(e.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result);
          },
        },
      },
    }),
      (x.removeEvent = function (e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i);
      }),
      (x.Event = function (e, t) {
        if (!(this instanceof x.Event)) return new x.Event(e, t);
        e && e.type
          ? ((this.originalEvent = e),
            (this.type = e.type),
            (this.isDefaultPrevented =
              e.defaultPrevented ||
              (void 0 === e.defaultPrevented && !1 === e.returnValue)
                ? we
                : ke),
            (this.target =
              e.target && 3 === e.target.nodeType
                ? e.target.parentNode
                : e.target),
            (this.currentTarget = e.currentTarget),
            (this.relatedTarget = e.relatedTarget))
          : (this.type = e),
          t && x.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || Date.now()),
          (this[x.expando] = !0);
      }),
      (x.Event.prototype = {
        constructor: x.Event,
        isDefaultPrevented: ke,
        isPropagationStopped: ke,
        isImmediatePropagationStopped: ke,
        isSimulated: !1,
        preventDefault: function () {
          var e = this.originalEvent;
          (this.isDefaultPrevented = we),
            e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = we),
            e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = we),
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      x.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: function (e) {
            var t = e.button;
            return null == e.which && ye.test(e.type)
              ? null != e.charCode
                ? e.charCode
                : e.keyCode
              : !e.which && void 0 !== t && be.test(e.type)
              ? 1 & t
                ? 1
                : 2 & t
                ? 3
                : 4 & t
                ? 2
                : 0
              : e.which;
          },
        },
        x.event.addProp
      ),
      x.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (e, t) {
          x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
              var i,
                n = this,
                a = e.relatedTarget,
                r = e.handleObj;
              return (
                (a && (a === n || x.contains(n, a))) ||
                  ((e.type = r.origType),
                  (i = r.handler.apply(this, arguments)),
                  (e.type = t)),
                i
              );
            },
          };
        }
      ),
      x.fn.extend({
        on: function (e, t, i, n) {
          return Te(this, e, t, i, n);
        },
        one: function (e, t, i, n) {
          return Te(this, e, t, i, n, 1);
        },
        off: function (e, t, i) {
          var n, a;
          if (e && e.preventDefault && e.handleObj)
            return (
              (n = e.handleObj),
              x(e.delegateTarget).off(
                n.namespace ? n.origType + "." + n.namespace : n.origType,
                n.selector,
                n.handler
              ),
              this
            );
          if ("object" == typeof e) {
            for (a in e) this.off(a, t, e[a]);
            return this;
          }
          return (
            (!1 !== t && "function" != typeof t) || ((i = t), (t = void 0)),
            !1 === i && (i = ke),
            this.each(function () {
              x.event.remove(this, e, i, t);
            })
          );
        },
      });
    var Se =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Ce = /<script|<style|<link/i,
      Me = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Oe(e, t) {
      return (
        (M(e, "table") &&
          M(11 !== t.nodeType ? t : t.firstChild, "tr") &&
          x(e).children("tbody")[0]) ||
        e
      );
    }
    function Ae(e) {
      return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function Le(e) {
      return (
        "true/" === (e.type || "").slice(0, 5)
          ? (e.type = e.type.slice(5))
          : e.removeAttribute("type"),
        e
      );
    }
    function De(e, t) {
      var i, n, a, r, s, o, l, u;
      if (1 === t.nodeType) {
        if (
          U.hasData(e) &&
          ((r = U.access(e)), (s = U.set(t, r)), (u = r.events))
        )
          for (a in (delete s.handle, (s.events = {}), u))
            for (i = 0, n = u[a].length; i < n; i++) x.event.add(t, a, u[a][i]);
        K.hasData(e) && ((o = K.access(e)), (l = x.extend({}, o)), K.set(t, l));
      }
    }
    function Ie(e, t) {
      var i = t.nodeName.toLowerCase();
      "input" === i && ue.test(e.type)
        ? (t.checked = e.checked)
        : ("input" !== i && "textarea" !== i) ||
          (t.defaultValue = e.defaultValue);
    }
    function je(e, t, i, n) {
      t = s.apply([], t);
      var a,
        r,
        o,
        l,
        u,
        c,
        d = 0,
        p = e.length,
        h = p - 1,
        m = t[0],
        g = v(m);
      if (g || (p > 1 && "string" == typeof m && !f.checkClone && Me.test(m)))
        return e.each(function (a) {
          var r = e.eq(a);
          g && (t[0] = m.call(this, a, r.html())), je(r, t, i, n);
        });
      if (
        p &&
        ((r = (a = me(t, e[0].ownerDocument, !1, e, n)).firstChild),
        1 === a.childNodes.length && (a = r),
        r || n)
      ) {
        for (l = (o = x.map(he(a, "script"), Ae)).length; d < p; d++)
          (u = a),
            d !== h &&
              ((u = x.clone(u, !0, !0)), l && x.merge(o, he(u, "script"))),
            i.call(e[d], u, d);
        if (l)
          for (
            c = o[o.length - 1].ownerDocument, x.map(o, Le), d = 0;
            d < l;
            d++
          )
            (u = o[d]),
              de.test(u.type || "") &&
                !U.access(u, "globalEval") &&
                x.contains(c, u) &&
                (u.src && "module" !== (u.type || "").toLowerCase()
                  ? x._evalUrl && x._evalUrl(u.src)
                  : y(u.textContent.replace(Pe, ""), c, u));
      }
      return e;
    }
    function Ne(e, t, i) {
      for (var n, a = t ? x.filter(t, e) : e, r = 0; null != (n = a[r]); r++)
        i || 1 !== n.nodeType || x.cleanData(he(n)),
          n.parentNode &&
            (i && x.contains(n.ownerDocument, n) && fe(he(n, "script")),
            n.parentNode.removeChild(n));
      return e;
    }
    x.extend({
      htmlPrefilter: function (e) {
        return e.replace(Se, "<$1></$2>");
      },
      clone: function (e, t, i) {
        var n,
          a,
          r,
          s,
          o = e.cloneNode(!0),
          l = x.contains(e.ownerDocument, e);
        if (
          !(
            f.noCloneChecked ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            x.isXMLDoc(e)
          )
        )
          for (s = he(o), n = 0, a = (r = he(e)).length; n < a; n++)
            Ie(r[n], s[n]);
        if (t)
          if (i)
            for (
              r = r || he(e), s = s || he(o), n = 0, a = r.length;
              n < a;
              n++
            )
              De(r[n], s[n]);
          else De(e, o);
        return (
          (s = he(o, "script")).length > 0 && fe(s, !l && he(e, "script")), o
        );
      },
      cleanData: function (e) {
        for (
          var t, i, n, a = x.event.special, r = 0;
          void 0 !== (i = e[r]);
          r++
        )
          if (X(i)) {
            if ((t = i[U.expando])) {
              if (t.events)
                for (n in t.events)
                  a[n] ? x.event.remove(i, n) : x.removeEvent(i, n, t.handle);
              i[U.expando] = void 0;
            }
            i[K.expando] && (i[K.expando] = void 0);
          }
      },
    }),
      x.fn.extend({
        detach: function (e) {
          return Ne(this, e, !0);
        },
        remove: function (e) {
          return Ne(this, e);
        },
        text: function (e) {
          return F(
            this,
            function (e) {
              return void 0 === e
                ? x.text(this)
                : this.empty().each(function () {
                    (1 !== this.nodeType &&
                      11 !== this.nodeType &&
                      9 !== this.nodeType) ||
                      (this.textContent = e);
                  });
            },
            null,
            e,
            arguments.length
          );
        },
        append: function () {
          return je(this, arguments, function (e) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              Oe(this, e).appendChild(e);
          });
        },
        prepend: function () {
          return je(this, arguments, function (e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = Oe(this, e);
              t.insertBefore(e, t.firstChild);
            }
          });
        },
        before: function () {
          return je(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        },
        after: function () {
          return je(this, arguments, function (e) {
            this.parentNode &&
              this.parentNode.insertBefore(e, this.nextSibling);
          });
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++)
            1 === e.nodeType && (x.cleanData(he(e, !1)), (e.textContent = ""));
          return this;
        },
        clone: function (e, t) {
          return (
            (e = null != e && e),
            (t = null == t ? e : t),
            this.map(function () {
              return x.clone(this, e, t);
            })
          );
        },
        html: function (e) {
          return F(
            this,
            function (e) {
              var t = this[0] || {},
                i = 0,
                n = this.length;
              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
              if (
                "string" == typeof e &&
                !Ce.test(e) &&
                !pe[(ce.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = x.htmlPrefilter(e);
                try {
                  for (; i < n; i++)
                    1 === (t = this[i] || {}).nodeType &&
                      (x.cleanData(he(t, !1)), (t.innerHTML = e));
                  t = 0;
                } catch (e) {}
              }
              t && this.empty().append(e);
            },
            null,
            e,
            arguments.length
          );
        },
        replaceWith: function () {
          var e = [];
          return je(
            this,
            arguments,
            function (t) {
              var i = this.parentNode;
              x.inArray(this, e) < 0 &&
                (x.cleanData(he(this)), i && i.replaceChild(t, this));
            },
            e
          );
        },
      }),
      x.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (e, t) {
          x.fn[e] = function (e) {
            for (var i, n = [], a = x(e), r = a.length - 1, s = 0; s <= r; s++)
              (i = s === r ? this : this.clone(!0)),
                x(a[s])[t](i),
                o.apply(n, i.get());
            return this.pushStack(n);
          };
        }
      );
    var ze = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      _e = function (t) {
        var i = t.ownerDocument.defaultView;
        return (i && i.opener) || (i = e), i.getComputedStyle(t);
      },
      $e = new RegExp(ie.join("|"), "i");
    function Be(e, t, i) {
      var n,
        a,
        r,
        s,
        o = e.style;
      return (
        (i = i || _e(e)) &&
          ("" !== (s = i.getPropertyValue(t) || i[t]) ||
            x.contains(e.ownerDocument, e) ||
            (s = x.style(e, t)),
          !f.pixelBoxStyles() &&
            ze.test(s) &&
            $e.test(t) &&
            ((n = o.width),
            (a = o.minWidth),
            (r = o.maxWidth),
            (o.minWidth = o.maxWidth = o.width = s),
            (s = i.width),
            (o.width = n),
            (o.minWidth = a),
            (o.maxWidth = r))),
        void 0 !== s ? s + "" : s
      );
    }
    function Re(e, t) {
      return {
        get: function () {
          if (!e()) return (this.get = t).apply(this, arguments);
          delete this.get;
        },
      };
    }
    !(function () {
      function t() {
        if (c) {
          (u.style.cssText =
            "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            (c.style.cssText =
              "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            ge.appendChild(u).appendChild(c);
          var t = e.getComputedStyle(c);
          (a = "1%" !== t.top),
            (l = 12 === i(t.marginLeft)),
            (c.style.right = "60%"),
            (o = 36 === i(t.right)),
            (r = 36 === i(t.width)),
            (c.style.position = "absolute"),
            (s = 36 === c.offsetWidth || "absolute"),
            ge.removeChild(u),
            (c = null);
        }
      }
      function i(e) {
        return Math.round(parseFloat(e));
      }
      var a,
        r,
        s,
        o,
        l,
        u = n.createElement("div"),
        c = n.createElement("div");
      c.style &&
        ((c.style.backgroundClip = "content-box"),
        (c.cloneNode(!0).style.backgroundClip = ""),
        (f.clearCloneStyle = "content-box" === c.style.backgroundClip),
        x.extend(f, {
          boxSizingReliable: function () {
            return t(), r;
          },
          pixelBoxStyles: function () {
            return t(), o;
          },
          pixelPosition: function () {
            return t(), a;
          },
          reliableMarginLeft: function () {
            return t(), l;
          },
          scrollboxSize: function () {
            return t(), s;
          },
        }));
    })();
    var He = /^(none|table(?!-c[ea]).+)/,
      Fe = /^--/,
      Ge = { position: "absolute", visibility: "hidden", display: "block" },
      qe = { letterSpacing: "0", fontWeight: "400" },
      Ve = ["Webkit", "Moz", "ms"],
      We = n.createElement("div").style;
    function Xe(e) {
      var t = x.cssProps[e];
      return (
        t ||
          (t = x.cssProps[e] =
            (function (e) {
              if (e in We) return e;
              for (
                var t = e[0].toUpperCase() + e.slice(1), i = Ve.length;
                i--;

              )
                if ((e = Ve[i] + t) in We) return e;
            })(e) || e),
        t
      );
    }
    function Ye(e, t, i) {
      var n = te.exec(t);
      return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t;
    }
    function Ue(e, t, i, n, a, r) {
      var s = "width" === t ? 1 : 0,
        o = 0,
        l = 0;
      if (i === (n ? "border" : "content")) return 0;
      for (; s < 4; s += 2)
        "margin" === i && (l += x.css(e, i + ie[s], !0, a)),
          n
            ? ("content" === i && (l -= x.css(e, "padding" + ie[s], !0, a)),
              "margin" !== i &&
                (l -= x.css(e, "border" + ie[s] + "Width", !0, a)))
            : ((l += x.css(e, "padding" + ie[s], !0, a)),
              "padding" !== i
                ? (l += x.css(e, "border" + ie[s] + "Width", !0, a))
                : (o += x.css(e, "border" + ie[s] + "Width", !0, a)));
      return (
        !n &&
          r >= 0 &&
          (l += Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - o - 0.5
            )
          )),
        l
      );
    }
    function Ke(e, t, i) {
      var n = _e(e),
        a = Be(e, t, n),
        r = "border-box" === x.css(e, "boxSizing", !1, n),
        s = r;
      if (ze.test(a)) {
        if (!i) return a;
        a = "auto";
      }
      return (
        (s = s && (f.boxSizingReliable() || a === e.style[t])),
        ("auto" === a ||
          (!parseFloat(a) && "inline" === x.css(e, "display", !1, n))) &&
          ((a = e["offset" + t[0].toUpperCase() + t.slice(1)]), (s = !0)),
        (a = parseFloat(a) || 0) +
          Ue(e, t, i || (r ? "border" : "content"), s, n, a) +
          "px"
      );
    }
    function Qe(e, t, i, n, a) {
      return new Qe.prototype.init(e, t, i, n, a);
    }
    x.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var i = Be(e, "opacity");
              return "" === i ? "1" : i;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (e, t, i, n) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var a,
            r,
            s,
            o = W(t),
            l = Fe.test(t),
            u = e.style;
          if (
            (l || (t = Xe(o)),
            (s = x.cssHooks[t] || x.cssHooks[o]),
            void 0 === i)
          )
            return s && "get" in s && void 0 !== (a = s.get(e, !1, n))
              ? a
              : u[t];
          "string" == (r = typeof i) &&
            (a = te.exec(i)) &&
            a[1] &&
            ((i = re(e, t, a)), (r = "number")),
            null != i &&
              i == i &&
              ("number" === r &&
                (i += (a && a[3]) || (x.cssNumber[o] ? "" : "px")),
              f.clearCloneStyle ||
                "" !== i ||
                0 !== t.indexOf("background") ||
                (u[t] = "inherit"),
              (s && "set" in s && void 0 === (i = s.set(e, i, n))) ||
                (l ? u.setProperty(t, i) : (u[t] = i)));
        }
      },
      css: function (e, t, i, n) {
        var a,
          r,
          s,
          o = W(t);
        return (
          Fe.test(t) || (t = Xe(o)),
          (s = x.cssHooks[t] || x.cssHooks[o]) &&
            "get" in s &&
            (a = s.get(e, !0, i)),
          void 0 === a && (a = Be(e, t, n)),
          "normal" === a && t in qe && (a = qe[t]),
          "" === i || i
            ? ((r = parseFloat(a)), !0 === i || isFinite(r) ? r || 0 : a)
            : a
        );
      },
    }),
      x.each(["height", "width"], function (e, t) {
        x.cssHooks[t] = {
          get: function (e, i, n) {
            if (i)
              return !He.test(x.css(e, "display")) ||
                (e.getClientRects().length && e.getBoundingClientRect().width)
                ? Ke(e, t, n)
                : ae(e, Ge, function () {
                    return Ke(e, t, n);
                  });
          },
          set: function (e, i, n) {
            var a,
              r = _e(e),
              s = "border-box" === x.css(e, "boxSizing", !1, r),
              o = n && Ue(e, t, n, s, r);
            return (
              s &&
                f.scrollboxSize() === r.position &&
                (o -= Math.ceil(
                  e["offset" + t[0].toUpperCase() + t.slice(1)] -
                    parseFloat(r[t]) -
                    Ue(e, t, "border", !1, r) -
                    0.5
                )),
              o &&
                (a = te.exec(i)) &&
                "px" !== (a[3] || "px") &&
                ((e.style[t] = i), (i = x.css(e, t))),
              Ye(0, i, o)
            );
          },
        };
      }),
      (x.cssHooks.marginLeft = Re(f.reliableMarginLeft, function (e, t) {
        if (t)
          return (
            (parseFloat(Be(e, "marginLeft")) ||
              e.getBoundingClientRect().left -
                ae(e, { marginLeft: 0 }, function () {
                  return e.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      x.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
        (x.cssHooks[e + t] = {
          expand: function (i) {
            for (
              var n = 0, a = {}, r = "string" == typeof i ? i.split(" ") : [i];
              n < 4;
              n++
            )
              a[e + ie[n] + t] = r[n] || r[n - 2] || r[0];
            return a;
          },
        }),
          "margin" !== e && (x.cssHooks[e + t].set = Ye);
      }),
      x.fn.extend({
        css: function (e, t) {
          return F(
            this,
            function (e, t, i) {
              var n,
                a,
                r = {},
                s = 0;
              if (Array.isArray(t)) {
                for (n = _e(e), a = t.length; s < a; s++)
                  r[t[s]] = x.css(e, t[s], !1, n);
                return r;
              }
              return void 0 !== i ? x.style(e, t, i) : x.css(e, t);
            },
            e,
            t,
            arguments.length > 1
          );
        },
      }),
      (x.Tween = Qe),
      (Qe.prototype = {
        constructor: Qe,
        init: function (e, t, i, n, a, r) {
          (this.elem = e),
            (this.prop = i),
            (this.easing = a || x.easing._default),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = n),
            (this.unit = r || (x.cssNumber[i] ? "" : "px"));
        },
        cur: function () {
          var e = Qe.propHooks[this.prop];
          return e && e.get ? e.get(this) : Qe.propHooks._default.get(this);
        },
        run: function (e) {
          var t,
            i = Qe.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = t =
                  x.easing[this.easing](
                    e,
                    this.options.duration * e,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = t = e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            i && i.set ? i.set(this) : Qe.propHooks._default.set(this),
            this
          );
        },
      }),
      (Qe.prototype.init.prototype = Qe.prototype),
      (Qe.propHooks = {
        _default: {
          get: function (e) {
            var t;
            return 1 !== e.elem.nodeType ||
              (null != e.elem[e.prop] && null == e.elem.style[e.prop])
              ? e.elem[e.prop]
              : (t = x.css(e.elem, e.prop, "")) && "auto" !== t
              ? t
              : 0;
          },
          set: function (e) {
            x.fx.step[e.prop]
              ? x.fx.step[e.prop](e)
              : 1 !== e.elem.nodeType ||
                (null == e.elem.style[x.cssProps[e.prop]] &&
                  !x.cssHooks[e.prop])
              ? (e.elem[e.prop] = e.now)
              : x.style(e.elem, e.prop, e.now + e.unit);
          },
        },
      }),
      (Qe.propHooks.scrollTop = Qe.propHooks.scrollLeft =
        {
          set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
          },
        }),
      (x.easing = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (x.fx = Qe.prototype.init),
      (x.fx.step = {});
    var Ze,
      Je,
      et = /^(?:toggle|show|hide)$/,
      tt = /queueHooks$/;
    function it() {
      Je &&
        (!1 === n.hidden && e.requestAnimationFrame
          ? e.requestAnimationFrame(it)
          : e.setTimeout(it, x.fx.interval),
        x.fx.tick());
    }
    function nt() {
      return (
        e.setTimeout(function () {
          Ze = void 0;
        }),
        (Ze = Date.now())
      );
    }
    function at(e, t) {
      var i,
        n = 0,
        a = { height: e };
      for (t = t ? 1 : 0; n < 4; n += 2 - t)
        a["margin" + (i = ie[n])] = a["padding" + i] = e;
      return t && (a.opacity = a.width = e), a;
    }
    function rt(e, t, i) {
      for (
        var n,
          a = (st.tweeners[t] || []).concat(st.tweeners["*"]),
          r = 0,
          s = a.length;
        r < s;
        r++
      )
        if ((n = a[r].call(i, t, e))) return n;
    }
    function st(e, t, i) {
      var n,
        a,
        r = 0,
        s = st.prefilters.length,
        o = x.Deferred().always(function () {
          delete l.elem;
        }),
        l = function () {
          if (a) return !1;
          for (
            var t = Ze || nt(),
              i = Math.max(0, u.startTime + u.duration - t),
              n = 1 - (i / u.duration || 0),
              r = 0,
              s = u.tweens.length;
            r < s;
            r++
          )
            u.tweens[r].run(n);
          return (
            o.notifyWith(e, [u, n, i]),
            n < 1 && s
              ? i
              : (s || o.notifyWith(e, [u, 1, 0]), o.resolveWith(e, [u]), !1)
          );
        },
        u = o.promise({
          elem: e,
          props: x.extend({}, t),
          opts: x.extend(
            !0,
            { specialEasing: {}, easing: x.easing._default },
            i
          ),
          originalProperties: t,
          originalOptions: i,
          startTime: Ze || nt(),
          duration: i.duration,
          tweens: [],
          createTween: function (t, i) {
            var n = x.Tween(
              e,
              u.opts,
              t,
              i,
              u.opts.specialEasing[t] || u.opts.easing
            );
            return u.tweens.push(n), n;
          },
          stop: function (t) {
            var i = 0,
              n = t ? u.tweens.length : 0;
            if (a) return this;
            for (a = !0; i < n; i++) u.tweens[i].run(1);
            return (
              t
                ? (o.notifyWith(e, [u, 1, 0]), o.resolveWith(e, [u, t]))
                : o.rejectWith(e, [u, t]),
              this
            );
          },
        }),
        c = u.props;
      for (
        (function (e, t) {
          var i, n, a, r, s;
          for (i in e)
            if (
              ((a = t[(n = W(i))]),
              (r = e[i]),
              Array.isArray(r) && ((a = r[1]), (r = e[i] = r[0])),
              i !== n && ((e[n] = r), delete e[i]),
              (s = x.cssHooks[n]) && ("expand" in s))
            )
              for (i in ((r = s.expand(r)), delete e[n], r))
                (i in e) || ((e[i] = r[i]), (t[i] = a));
            else t[n] = a;
        })(c, u.opts.specialEasing);
        r < s;
        r++
      )
        if ((n = st.prefilters[r].call(u, e, c, u.opts)))
          return (
            v(n.stop) &&
              (x._queueHooks(u.elem, u.opts.queue).stop = n.stop.bind(n)),
            n
          );
      return (
        x.map(c, rt, u),
        v(u.opts.start) && u.opts.start.call(e, u),
        u
          .progress(u.opts.progress)
          .done(u.opts.done, u.opts.complete)
          .fail(u.opts.fail)
          .always(u.opts.always),
        x.fx.timer(x.extend(l, { elem: e, anim: u, queue: u.opts.queue })),
        u
      );
    }
    (x.Animation = x.extend(st, {
      tweeners: {
        "*": [
          function (e, t) {
            var i = this.createTween(e, t);
            return re(i.elem, e, te.exec(t), i), i;
          },
        ],
      },
      tweener: function (e, t) {
        v(e) ? ((t = e), (e = ["*"])) : (e = e.match(N));
        for (var i, n = 0, a = e.length; n < a; n++)
          (i = e[n]),
            (st.tweeners[i] = st.tweeners[i] || []),
            st.tweeners[i].unshift(t);
      },
      prefilters: [
        function (e, t, i) {
          var n,
            a,
            r,
            s,
            o,
            l,
            u,
            c,
            d = "width" in t || "height" in t,
            p = this,
            h = {},
            f = e.style,
            v = e.nodeType && ne(e),
            m = U.get(e, "fxshow");
          for (n in (i.queue ||
            (null == (s = x._queueHooks(e, "fx")).unqueued &&
              ((s.unqueued = 0),
              (o = s.empty.fire),
              (s.empty.fire = function () {
                s.unqueued || o();
              })),
            s.unqueued++,
            p.always(function () {
              p.always(function () {
                s.unqueued--, x.queue(e, "fx").length || s.empty.fire();
              });
            })),
          t))
            if (((a = t[n]), et.test(a))) {
              if (
                (delete t[n],
                (r = r || "toggle" === a),
                a === (v ? "hide" : "show"))
              ) {
                if ("show" !== a || !m || void 0 === m[n]) continue;
                v = !0;
              }
              h[n] = (m && m[n]) || x.style(e, n);
            }
          if ((l = !x.isEmptyObject(t)) || !x.isEmptyObject(h))
            for (n in (d &&
              1 === e.nodeType &&
              ((i.overflow = [f.overflow, f.overflowX, f.overflowY]),
              null == (u = m && m.display) && (u = U.get(e, "display")),
              "none" === (c = x.css(e, "display")) &&
                (u
                  ? (c = u)
                  : (le([e], !0),
                    (u = e.style.display || u),
                    (c = x.css(e, "display")),
                    le([e]))),
              ("inline" === c || ("inline-block" === c && null != u)) &&
                "none" === x.css(e, "float") &&
                (l ||
                  (p.done(function () {
                    f.display = u;
                  }),
                  null == u && ((c = f.display), (u = "none" === c ? "" : c))),
                (f.display = "inline-block"))),
            i.overflow &&
              ((f.overflow = "hidden"),
              p.always(function () {
                (f.overflow = i.overflow[0]),
                  (f.overflowX = i.overflow[1]),
                  (f.overflowY = i.overflow[2]);
              })),
            (l = !1),
            h))
              l ||
                (m
                  ? "hidden" in m && (v = m.hidden)
                  : (m = U.access(e, "fxshow", { display: u })),
                r && (m.hidden = !v),
                v && le([e], !0),
                p.done(function () {
                  for (n in (v || le([e]), U.remove(e, "fxshow"), h))
                    x.style(e, n, h[n]);
                })),
                (l = rt(v ? m[n] : 0, n, p)),
                n in m ||
                  ((m[n] = l.start), v && ((l.end = l.start), (l.start = 0)));
        },
      ],
      prefilter: function (e, t) {
        t ? st.prefilters.unshift(e) : st.prefilters.push(e);
      },
    })),
      (x.speed = function (e, t, i) {
        var n =
          e && "object" == typeof e
            ? x.extend({}, e)
            : {
                complete: i || (!i && t) || (v(e) && e),
                duration: e,
                easing: (i && t) || (t && !v(t) && t),
              };
        return (
          x.fx.off
            ? (n.duration = 0)
            : "number" != typeof n.duration &&
              (n.duration in x.fx.speeds
                ? (n.duration = x.fx.speeds[n.duration])
                : (n.duration = x.fx.speeds._default)),
          (null != n.queue && !0 !== n.queue) || (n.queue = "fx"),
          (n.old = n.complete),
          (n.complete = function () {
            v(n.old) && n.old.call(this), n.queue && x.dequeue(this, n.queue);
          }),
          n
        );
      }),
      x.fn.extend({
        fadeTo: function (e, t, i, n) {
          return this.filter(ne)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, e, i, n);
        },
        animate: function (e, t, i, n) {
          var a = x.isEmptyObject(e),
            r = x.speed(t, i, n),
            s = function () {
              var t = st(this, x.extend({}, e), r);
              (a || U.get(this, "finish")) && t.stop(!0);
            };
          return (
            (s.finish = s),
            a || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
          );
        },
        stop: function (e, t, i) {
          var n = function (e) {
            var t = e.stop;
            delete e.stop, t(i);
          };
          return (
            "string" != typeof e && ((i = t), (t = e), (e = void 0)),
            t && !1 !== e && this.queue(e || "fx", []),
            this.each(function () {
              var t = !0,
                a = null != e && e + "queueHooks",
                r = x.timers,
                s = U.get(this);
              if (a) s[a] && s[a].stop && n(s[a]);
              else for (a in s) s[a] && s[a].stop && tt.test(a) && n(s[a]);
              for (a = r.length; a--; )
                r[a].elem !== this ||
                  (null != e && r[a].queue !== e) ||
                  (r[a].anim.stop(i), (t = !1), r.splice(a, 1));
              (!t && i) || x.dequeue(this, e);
            })
          );
        },
        finish: function (e) {
          return (
            !1 !== e && (e = e || "fx"),
            this.each(function () {
              var t,
                i = U.get(this),
                n = i[e + "queue"],
                a = i[e + "queueHooks"],
                r = x.timers,
                s = n ? n.length : 0;
              for (
                i.finish = !0,
                  x.queue(this, e, []),
                  a && a.stop && a.stop.call(this, !0),
                  t = r.length;
                t--;

              )
                r[t].elem === this &&
                  r[t].queue === e &&
                  (r[t].anim.stop(!0), r.splice(t, 1));
              for (t = 0; t < s; t++)
                n[t] && n[t].finish && n[t].finish.call(this);
              delete i.finish;
            })
          );
        },
      }),
      x.each(["toggle", "show", "hide"], function (e, t) {
        var i = x.fn[t];
        x.fn[t] = function (e, n, a) {
          return null == e || "boolean" == typeof e
            ? i.apply(this, arguments)
            : this.animate(at(t, !0), e, n, a);
        };
      }),
      x.each(
        {
          slideDown: at("show"),
          slideUp: at("hide"),
          slideToggle: at("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (e, t) {
          x.fn[e] = function (e, i, n) {
            return this.animate(t, e, i, n);
          };
        }
      ),
      (x.timers = []),
      (x.fx.tick = function () {
        var e,
          t = 0,
          i = x.timers;
        for (Ze = Date.now(); t < i.length; t++)
          (e = i[t])() || i[t] !== e || i.splice(t--, 1);
        i.length || x.fx.stop(), (Ze = void 0);
      }),
      (x.fx.timer = function (e) {
        x.timers.push(e), x.fx.start();
      }),
      (x.fx.interval = 13),
      (x.fx.start = function () {
        Je || ((Je = !0), it());
      }),
      (x.fx.stop = function () {
        Je = null;
      }),
      (x.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (x.fn.delay = function (t, i) {
        return (
          (t = (x.fx && x.fx.speeds[t]) || t),
          (i = i || "fx"),
          this.queue(i, function (i, n) {
            var a = e.setTimeout(i, t);
            n.stop = function () {
              e.clearTimeout(a);
            };
          })
        );
      }),
      (function () {
        var e = n.createElement("input"),
          t = n.createElement("select").appendChild(n.createElement("option"));
        (e.type = "checkbox"),
          (f.checkOn = "" !== e.value),
          (f.optSelected = t.selected),
          ((e = n.createElement("input")).value = "t"),
          (e.type = "radio"),
          (f.radioValue = "t" === e.value);
      })();
    var ot,
      lt = x.expr.attrHandle;
    x.fn.extend({
      attr: function (e, t) {
        return F(this, x.attr, e, t, arguments.length > 1);
      },
      removeAttr: function (e) {
        return this.each(function () {
          x.removeAttr(this, e);
        });
      },
    }),
      x.extend({
        attr: function (e, t, i) {
          var n,
            a,
            r = e.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return void 0 === e.getAttribute
              ? x.prop(e, t, i)
              : ((1 === r && x.isXMLDoc(e)) ||
                  (a =
                    x.attrHooks[t.toLowerCase()] ||
                    (x.expr.match.bool.test(t) ? ot : void 0)),
                void 0 !== i
                  ? null === i
                    ? void x.removeAttr(e, t)
                    : a && "set" in a && void 0 !== (n = a.set(e, i, t))
                    ? n
                    : (e.setAttribute(t, i + ""), i)
                  : a && "get" in a && null !== (n = a.get(e, t))
                  ? n
                  : null == (n = x.find.attr(e, t))
                  ? void 0
                  : n);
        },
        attrHooks: {
          type: {
            set: function (e, t) {
              if (!f.radioValue && "radio" === t && M(e, "input")) {
                var i = e.value;
                return e.setAttribute("type", t), i && (e.value = i), t;
              }
            },
          },
        },
        removeAttr: function (e, t) {
          var i,
            n = 0,
            a = t && t.match(N);
          if (a && 1 === e.nodeType)
            for (; (i = a[n++]); ) e.removeAttribute(i);
        },
      }),
      (ot = {
        set: function (e, t, i) {
          return !1 === t ? x.removeAttr(e, i) : e.setAttribute(i, i), i;
        },
      }),
      x.each(x.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var i = lt[t] || x.find.attr;
        lt[t] = function (e, t, n) {
          var a,
            r,
            s = t.toLowerCase();
          return (
            n ||
              ((r = lt[s]),
              (lt[s] = a),
              (a = null != i(e, t, n) ? s : null),
              (lt[s] = r)),
            a
          );
        };
      });
    var ut = /^(?:input|select|textarea|button)$/i,
      ct = /^(?:a|area)$/i;
    function dt(e) {
      return (e.match(N) || []).join(" ");
    }
    function pt(e) {
      return (e.getAttribute && e.getAttribute("class")) || "";
    }
    function ht(e) {
      return Array.isArray(e) ? e : ("string" == typeof e && e.match(N)) || [];
    }
    x.fn.extend({
      prop: function (e, t) {
        return F(this, x.prop, e, t, arguments.length > 1);
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[x.propFix[e] || e];
        });
      },
    }),
      x.extend({
        prop: function (e, t, i) {
          var n,
            a,
            r = e.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return (
              (1 === r && x.isXMLDoc(e)) ||
                ((t = x.propFix[t] || t), (a = x.propHooks[t])),
              void 0 !== i
                ? a && "set" in a && void 0 !== (n = a.set(e, i, t))
                  ? n
                  : (e[t] = i)
                : a && "get" in a && null !== (n = a.get(e, t))
                ? n
                : e[t]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              var t = x.find.attr(e, "tabindex");
              return t
                ? parseInt(t, 10)
                : ut.test(e.nodeName) || (ct.test(e.nodeName) && e.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      f.optSelected ||
        (x.propHooks.selected = {
          get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
          },
          set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
          },
        }),
      x.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          x.propFix[this.toLowerCase()] = this;
        }
      ),
      x.fn.extend({
        addClass: function (e) {
          var t,
            i,
            n,
            a,
            r,
            s,
            o,
            l = 0;
          if (v(e))
            return this.each(function (t) {
              x(this).addClass(e.call(this, t, pt(this)));
            });
          if ((t = ht(e)).length)
            for (; (i = this[l++]); )
              if (((a = pt(i)), (n = 1 === i.nodeType && " " + dt(a) + " "))) {
                for (s = 0; (r = t[s++]); )
                  n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                a !== (o = dt(n)) && i.setAttribute("class", o);
              }
          return this;
        },
        removeClass: function (e) {
          var t,
            i,
            n,
            a,
            r,
            s,
            o,
            l = 0;
          if (v(e))
            return this.each(function (t) {
              x(this).removeClass(e.call(this, t, pt(this)));
            });
          if (!arguments.length) return this.attr("class", "");
          if ((t = ht(e)).length)
            for (; (i = this[l++]); )
              if (((a = pt(i)), (n = 1 === i.nodeType && " " + dt(a) + " "))) {
                for (s = 0; (r = t[s++]); )
                  for (; n.indexOf(" " + r + " ") > -1; )
                    n = n.replace(" " + r + " ", " ");
                a !== (o = dt(n)) && i.setAttribute("class", o);
              }
          return this;
        },
        toggleClass: function (e, t) {
          var i = typeof e,
            n = "string" === i || Array.isArray(e);
          return "boolean" == typeof t && n
            ? t
              ? this.addClass(e)
              : this.removeClass(e)
            : v(e)
            ? this.each(function (i) {
                x(this).toggleClass(e.call(this, i, pt(this), t), t);
              })
            : this.each(function () {
                var t, a, r, s;
                if (n)
                  for (a = 0, r = x(this), s = ht(e); (t = s[a++]); )
                    r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else
                  (void 0 !== e && "boolean" !== i) ||
                    ((t = pt(this)) && U.set(this, "__className__", t),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        t || !1 === e ? "" : U.get(this, "__className__") || ""
                      ));
              });
        },
        hasClass: function (e) {
          var t,
            i,
            n = 0;
          for (t = " " + e + " "; (i = this[n++]); )
            if (1 === i.nodeType && (" " + dt(pt(i)) + " ").indexOf(t) > -1)
              return !0;
          return !1;
        },
      });
    var ft = /\r/g;
    x.fn.extend({
      val: function (e) {
        var t,
          i,
          n,
          a = this[0];
        return arguments.length
          ? ((n = v(e)),
            this.each(function (i) {
              var a;
              1 === this.nodeType &&
                (null == (a = n ? e.call(this, i, x(this).val()) : e)
                  ? (a = "")
                  : "number" == typeof a
                  ? (a += "")
                  : Array.isArray(a) &&
                    (a = x.map(a, function (e) {
                      return null == e ? "" : e + "";
                    })),
                ((t =
                  x.valHooks[this.type] ||
                  x.valHooks[this.nodeName.toLowerCase()]) &&
                  "set" in t &&
                  void 0 !== t.set(this, a, "value")) ||
                  (this.value = a));
            }))
          : a
          ? (t = x.valHooks[a.type] || x.valHooks[a.nodeName.toLowerCase()]) &&
            "get" in t &&
            void 0 !== (i = t.get(a, "value"))
            ? i
            : "string" == typeof (i = a.value)
            ? i.replace(ft, "")
            : null == i
            ? ""
            : i
          : void 0;
      },
    }),
      x.extend({
        valHooks: {
          option: {
            get: function (e) {
              var t = x.find.attr(e, "value");
              return null != t ? t : dt(x.text(e));
            },
          },
          select: {
            get: function (e) {
              var t,
                i,
                n,
                a = e.options,
                r = e.selectedIndex,
                s = "select-one" === e.type,
                o = s ? null : [],
                l = s ? r + 1 : a.length;
              for (n = r < 0 ? l : s ? r : 0; n < l; n++)
                if (
                  ((i = a[n]).selected || n === r) &&
                  !i.disabled &&
                  (!i.parentNode.disabled || !M(i.parentNode, "optgroup"))
                ) {
                  if (((t = x(i).val()), s)) return t;
                  o.push(t);
                }
              return o;
            },
            set: function (e, t) {
              for (
                var i, n, a = e.options, r = x.makeArray(t), s = a.length;
                s--;

              )
                ((n = a[s]).selected =
                  x.inArray(x.valHooks.option.get(n), r) > -1) && (i = !0);
              return i || (e.selectedIndex = -1), r;
            },
          },
        },
      }),
      x.each(["radio", "checkbox"], function () {
        (x.valHooks[this] = {
          set: function (e, t) {
            if (Array.isArray(t))
              return (e.checked = x.inArray(x(e).val(), t) > -1);
          },
        }),
          f.checkOn ||
            (x.valHooks[this].get = function (e) {
              return null === e.getAttribute("value") ? "on" : e.value;
            });
      }),
      (f.focusin = "onfocusin" in e);
    var vt = /^(?:focusinfocus|focusoutblur)$/,
      mt = function (e) {
        e.stopPropagation();
      };
    x.extend(x.event, {
      trigger: function (t, i, a, r) {
        var s,
          o,
          l,
          u,
          c,
          p,
          h,
          f,
          g = [a || n],
          y = d.call(t, "type") ? t.type : t,
          b = d.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((o = f = l = a = a || n),
          3 !== a.nodeType &&
            8 !== a.nodeType &&
            !vt.test(y + x.event.triggered) &&
            (y.indexOf(".") > -1 &&
              ((y = (b = y.split(".")).shift()), b.sort()),
            (c = y.indexOf(":") < 0 && "on" + y),
            ((t = t[x.expando]
              ? t
              : new x.Event(y, "object" == typeof t && t)).isTrigger = r
              ? 2
              : 3),
            (t.namespace = b.join(".")),
            (t.rnamespace = t.namespace
              ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = void 0),
            t.target || (t.target = a),
            (i = null == i ? [t] : x.makeArray(i, [t])),
            (h = x.event.special[y] || {}),
            r || !h.trigger || !1 !== h.trigger.apply(a, i)))
        ) {
          if (!r && !h.noBubble && !m(a)) {
            for (
              u = h.delegateType || y, vt.test(u + y) || (o = o.parentNode);
              o;
              o = o.parentNode
            )
              g.push(o), (l = o);
            l === (a.ownerDocument || n) &&
              g.push(l.defaultView || l.parentWindow || e);
          }
          for (s = 0; (o = g[s++]) && !t.isPropagationStopped(); )
            (f = o),
              (t.type = s > 1 ? u : h.bindType || y),
              (p = (U.get(o, "events") || {})[t.type] && U.get(o, "handle")) &&
                p.apply(o, i),
              (p = c && o[c]) &&
                p.apply &&
                X(o) &&
                ((t.result = p.apply(o, i)),
                !1 === t.result && t.preventDefault());
          return (
            (t.type = y),
            r ||
              t.isDefaultPrevented() ||
              (h._default && !1 !== h._default.apply(g.pop(), i)) ||
              !X(a) ||
              (c &&
                v(a[y]) &&
                !m(a) &&
                ((l = a[c]) && (a[c] = null),
                (x.event.triggered = y),
                t.isPropagationStopped() && f.addEventListener(y, mt),
                a[y](),
                t.isPropagationStopped() && f.removeEventListener(y, mt),
                (x.event.triggered = void 0),
                l && (a[c] = l))),
            t.result
          );
        }
      },
      simulate: function (e, t, i) {
        var n = x.extend(new x.Event(), i, { type: e, isSimulated: !0 });
        x.event.trigger(n, null, t);
      },
    }),
      x.fn.extend({
        trigger: function (e, t) {
          return this.each(function () {
            x.event.trigger(e, t, this);
          });
        },
        triggerHandler: function (e, t) {
          var i = this[0];
          if (i) return x.event.trigger(e, t, i, !0);
        },
      }),
      f.focusin ||
        x.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
          var i = function (e) {
            x.event.simulate(t, e.target, x.event.fix(e));
          };
          x.event.special[t] = {
            setup: function () {
              var n = this.ownerDocument || this,
                a = U.access(n, t);
              a || n.addEventListener(e, i, !0), U.access(n, t, (a || 0) + 1);
            },
            teardown: function () {
              var n = this.ownerDocument || this,
                a = U.access(n, t) - 1;
              a
                ? U.access(n, t, a)
                : (n.removeEventListener(e, i, !0), U.remove(n, t));
            },
          };
        });
    var gt = e.location,
      yt = Date.now(),
      bt = /\?/;
    x.parseXML = function (t) {
      var i;
      if (!t || "string" != typeof t) return null;
      try {
        i = new e.DOMParser().parseFromString(t, "text/xml");
      } catch (e) {
        i = void 0;
      }
      return (
        (i && !i.getElementsByTagName("parsererror").length) ||
          x.error("Invalid XML: " + t),
        i
      );
    };
    var xt = /\[\]$/,
      wt = /\r?\n/g,
      kt = /^(?:submit|button|image|reset|file)$/i,
      Et = /^(?:input|select|textarea|keygen)/i;
    function Tt(e, t, i, n) {
      var a;
      if (Array.isArray(t))
        x.each(t, function (t, a) {
          i || xt.test(e)
            ? n(e, a)
            : Tt(
                e + "[" + ("object" == typeof a && null != a ? t : "") + "]",
                a,
                i,
                n
              );
        });
      else if (i || "object" !== b(t)) n(e, t);
      else for (a in t) Tt(e + "[" + a + "]", t[a], i, n);
    }
    (x.param = function (e, t) {
      var i,
        n = [],
        a = function (e, t) {
          var i = v(t) ? t() : t;
          n[n.length] =
            encodeURIComponent(e) +
            "=" +
            encodeURIComponent(null == i ? "" : i);
        };
      if (Array.isArray(e) || (e.jquery && !x.isPlainObject(e)))
        x.each(e, function () {
          a(this.name, this.value);
        });
      else for (i in e) Tt(i, e[i], t, a);
      return n.join("&");
    }),
      x.fn.extend({
        serialize: function () {
          return x.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var e = x.prop(this, "elements");
            return e ? x.makeArray(e) : this;
          })
            .filter(function () {
              var e = this.type;
              return (
                this.name &&
                !x(this).is(":disabled") &&
                Et.test(this.nodeName) &&
                !kt.test(e) &&
                (this.checked || !ue.test(e))
              );
            })
            .map(function (e, t) {
              var i = x(this).val();
              return null == i
                ? null
                : Array.isArray(i)
                ? x.map(i, function (e) {
                    return { name: t.name, value: e.replace(wt, "\r\n") };
                  })
                : { name: t.name, value: i.replace(wt, "\r\n") };
            })
            .get();
        },
      });
    var St = /%20/g,
      Ct = /#.*$/,
      Mt = /([?&])_=[^&]*/,
      Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Ot = /^(?:GET|HEAD)$/,
      At = /^\/\//,
      Lt = {},
      Dt = {},
      It = "*/".concat("*"),
      jt = n.createElement("a");
    function Nt(e) {
      return function (t, i) {
        "string" != typeof t && ((i = t), (t = "*"));
        var n,
          a = 0,
          r = t.toLowerCase().match(N) || [];
        if (v(i))
          for (; (n = r[a++]); )
            "+" === n[0]
              ? ((n = n.slice(1) || "*"), (e[n] = e[n] || []).unshift(i))
              : (e[n] = e[n] || []).push(i);
      };
    }
    function zt(e, t, i, n) {
      var a = {},
        r = e === Dt;
      function s(o) {
        var l;
        return (
          (a[o] = !0),
          x.each(e[o] || [], function (e, o) {
            var u = o(t, i, n);
            return "string" != typeof u || r || a[u]
              ? r
                ? !(l = u)
                : void 0
              : (t.dataTypes.unshift(u), s(u), !1);
          }),
          l
        );
      }
      return s(t.dataTypes[0]) || (!a["*"] && s("*"));
    }
    function _t(e, t) {
      var i,
        n,
        a = x.ajaxSettings.flatOptions || {};
      for (i in t) void 0 !== t[i] && ((a[i] ? e : n || (n = {}))[i] = t[i]);
      return n && x.extend(!0, e, n), e;
    }
    (jt.href = gt.href),
      x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: gt.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              gt.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": It,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": x.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
          return t ? _t(_t(e, x.ajaxSettings), t) : _t(x.ajaxSettings, e);
        },
        ajaxPrefilter: Nt(Lt),
        ajaxTransport: Nt(Dt),
        ajax: function (t, i) {
          "object" == typeof t && ((i = t), (t = void 0)), (i = i || {});
          var a,
            r,
            s,
            o,
            l,
            u,
            c,
            d,
            p,
            h,
            f = x.ajaxSetup({}, i),
            v = f.context || f,
            m = f.context && (v.nodeType || v.jquery) ? x(v) : x.event,
            g = x.Deferred(),
            y = x.Callbacks("once memory"),
            b = f.statusCode || {},
            w = {},
            k = {},
            E = "canceled",
            T = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (c) {
                  if (!o)
                    for (o = {}; (t = Pt.exec(s)); )
                      o[t[1].toLowerCase()] = t[2];
                  t = o[e.toLowerCase()];
                }
                return null == t ? null : t;
              },
              getAllResponseHeaders: function () {
                return c ? s : null;
              },
              setRequestHeader: function (e, t) {
                return (
                  null == c &&
                    ((e = k[e.toLowerCase()] = k[e.toLowerCase()] || e),
                    (w[e] = t)),
                  this
                );
              },
              overrideMimeType: function (e) {
                return null == c && (f.mimeType = e), this;
              },
              statusCode: function (e) {
                var t;
                if (e)
                  if (c) T.always(e[T.status]);
                  else for (t in e) b[t] = [b[t], e[t]];
                return this;
              },
              abort: function (e) {
                var t = e || E;
                return a && a.abort(t), S(0, t), this;
              },
            };
          if (
            (g.promise(T),
            (f.url = ((t || f.url || gt.href) + "").replace(
              At,
              gt.protocol + "//"
            )),
            (f.type = i.method || i.type || f.method || f.type),
            (f.dataTypes = (f.dataType || "*").toLowerCase().match(N) || [""]),
            null == f.crossDomain)
          ) {
            u = n.createElement("a");
            try {
              (u.href = f.url),
                (u.href = u.href),
                (f.crossDomain =
                  jt.protocol + "//" + jt.host != u.protocol + "//" + u.host);
            } catch (e) {
              f.crossDomain = !0;
            }
          }
          if (
            (f.data &&
              f.processData &&
              "string" != typeof f.data &&
              (f.data = x.param(f.data, f.traditional)),
            zt(Lt, f, i, T),
            c)
          )
            return T;
          for (p in ((d = x.event && f.global) &&
            0 == x.active++ &&
            x.event.trigger("ajaxStart"),
          (f.type = f.type.toUpperCase()),
          (f.hasContent = !Ot.test(f.type)),
          (r = f.url.replace(Ct, "")),
          f.hasContent
            ? f.data &&
              f.processData &&
              0 ===
                (f.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (f.data = f.data.replace(St, "+"))
            : ((h = f.url.slice(r.length)),
              f.data &&
                (f.processData || "string" == typeof f.data) &&
                ((r += (bt.test(r) ? "&" : "?") + f.data), delete f.data),
              !1 === f.cache &&
                ((r = r.replace(Mt, "$1")),
                (h = (bt.test(r) ? "&" : "?") + "_=" + yt++ + h)),
              (f.url = r + h)),
          f.ifModified &&
            (x.lastModified[r] &&
              T.setRequestHeader("If-Modified-Since", x.lastModified[r]),
            x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])),
          ((f.data && f.hasContent && !1 !== f.contentType) || i.contentType) &&
            T.setRequestHeader("Content-Type", f.contentType),
          T.setRequestHeader(
            "Accept",
            f.dataTypes[0] && f.accepts[f.dataTypes[0]]
              ? f.accepts[f.dataTypes[0]] +
                  ("*" !== f.dataTypes[0] ? ", " + It + "; q=0.01" : "")
              : f.accepts["*"]
          ),
          f.headers))
            T.setRequestHeader(p, f.headers[p]);
          if (f.beforeSend && (!1 === f.beforeSend.call(v, T, f) || c))
            return T.abort();
          if (
            ((E = "abort"),
            y.add(f.complete),
            T.done(f.success),
            T.fail(f.error),
            (a = zt(Dt, f, i, T)))
          ) {
            if (((T.readyState = 1), d && m.trigger("ajaxSend", [T, f]), c))
              return T;
            f.async &&
              f.timeout > 0 &&
              (l = e.setTimeout(function () {
                T.abort("timeout");
              }, f.timeout));
            try {
              (c = !1), a.send(w, S);
            } catch (e) {
              if (c) throw e;
              S(-1, e);
            }
          } else S(-1, "No Transport");
          function S(t, i, n, o) {
            var u,
              p,
              h,
              w,
              k,
              E = i;
            c ||
              ((c = !0),
              l && e.clearTimeout(l),
              (a = void 0),
              (s = o || ""),
              (T.readyState = t > 0 ? 4 : 0),
              (u = (t >= 200 && t < 300) || 304 === t),
              n &&
                (w = (function (e, t, i) {
                  for (
                    var n, a, r, s, o = e.contents, l = e.dataTypes;
                    "*" === l[0];

                  )
                    l.shift(),
                      void 0 === n &&
                        (n = e.mimeType || t.getResponseHeader("Content-Type"));
                  if (n)
                    for (a in o)
                      if (o[a] && o[a].test(n)) {
                        l.unshift(a);
                        break;
                      }
                  if (l[0] in i) r = l[0];
                  else {
                    for (a in i) {
                      if (!l[0] || e.converters[a + " " + l[0]]) {
                        r = a;
                        break;
                      }
                      s || (s = a);
                    }
                    r = r || s;
                  }
                  if (r) return r !== l[0] && l.unshift(r), i[r];
                })(f, T, n)),
              (w = (function (e, t, i, n) {
                var a,
                  r,
                  s,
                  o,
                  l,
                  u = {},
                  c = e.dataTypes.slice();
                if (c[1])
                  for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
                for (r = c.shift(); r; )
                  if (
                    (e.responseFields[r] && (i[e.responseFields[r]] = t),
                    !l &&
                      n &&
                      e.dataFilter &&
                      (t = e.dataFilter(t, e.dataType)),
                    (l = r),
                    (r = c.shift()))
                  )
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                      if (!(s = u[l + " " + r] || u["* " + r]))
                        for (a in u)
                          if (
                            (o = a.split(" "))[1] === r &&
                            (s = u[l + " " + o[0]] || u["* " + o[0]])
                          ) {
                            !0 === s
                              ? (s = u[a])
                              : !0 !== u[a] && ((r = o[0]), c.unshift(o[1]));
                            break;
                          }
                      if (!0 !== s)
                        if (s && e.throws) t = s(t);
                        else
                          try {
                            t = s(t);
                          } catch (e) {
                            return {
                              state: "parsererror",
                              error: s
                                ? e
                                : "No conversion from " + l + " to " + r,
                            };
                          }
                    }
                return { state: "success", data: t };
              })(f, w, T, u)),
              u
                ? (f.ifModified &&
                    ((k = T.getResponseHeader("Last-Modified")) &&
                      (x.lastModified[r] = k),
                    (k = T.getResponseHeader("etag")) && (x.etag[r] = k)),
                  204 === t || "HEAD" === f.type
                    ? (E = "nocontent")
                    : 304 === t
                    ? (E = "notmodified")
                    : ((E = w.state), (p = w.data), (u = !(h = w.error))))
                : ((h = E), (!t && E) || ((E = "error"), t < 0 && (t = 0))),
              (T.status = t),
              (T.statusText = (i || E) + ""),
              u ? g.resolveWith(v, [p, E, T]) : g.rejectWith(v, [T, E, h]),
              T.statusCode(b),
              (b = void 0),
              d &&
                m.trigger(u ? "ajaxSuccess" : "ajaxError", [T, f, u ? p : h]),
              y.fireWith(v, [T, E]),
              d &&
                (m.trigger("ajaxComplete", [T, f]),
                --x.active || x.event.trigger("ajaxStop")));
          }
          return T;
        },
        getJSON: function (e, t, i) {
          return x.get(e, t, i, "json");
        },
        getScript: function (e, t) {
          return x.get(e, void 0, t, "script");
        },
      }),
      x.each(["get", "post"], function (e, t) {
        x[t] = function (e, i, n, a) {
          return (
            v(i) && ((a = a || n), (n = i), (i = void 0)),
            x.ajax(
              x.extend(
                { url: e, type: t, dataType: a, data: i, success: n },
                x.isPlainObject(e) && e
              )
            )
          );
        };
      }),
      (x._evalUrl = function (e) {
        return x.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          throws: !0,
        });
      }),
      x.fn.extend({
        wrapAll: function (e) {
          var t;
          return (
            this[0] &&
              (v(e) && (e = e.call(this[0])),
              (t = x(e, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function () {
                  for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                  return e;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (e) {
          return v(e)
            ? this.each(function (t) {
                x(this).wrapInner(e.call(this, t));
              })
            : this.each(function () {
                var t = x(this),
                  i = t.contents();
                i.length ? i.wrapAll(e) : t.append(e);
              });
        },
        wrap: function (e) {
          var t = v(e);
          return this.each(function (i) {
            x(this).wrapAll(t ? e.call(this, i) : e);
          });
        },
        unwrap: function (e) {
          return (
            this.parent(e)
              .not("body")
              .each(function () {
                x(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (x.expr.pseudos.hidden = function (e) {
        return !x.expr.pseudos.visible(e);
      }),
      (x.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }),
      (x.ajaxSettings.xhr = function () {
        try {
          return new e.XMLHttpRequest();
        } catch (e) {}
      });
    var $t = { 0: 200, 1223: 204 },
      Bt = x.ajaxSettings.xhr();
    (f.cors = !!Bt && "withCredentials" in Bt),
      (f.ajax = Bt = !!Bt),
      x.ajaxTransport(function (t) {
        var i, n;
        if (f.cors || (Bt && !t.crossDomain))
          return {
            send: function (a, r) {
              var s,
                o = t.xhr();
              if (
                (o.open(t.type, t.url, t.async, t.username, t.password),
                t.xhrFields)
              )
                for (s in t.xhrFields) o[s] = t.xhrFields[s];
              for (s in (t.mimeType &&
                o.overrideMimeType &&
                o.overrideMimeType(t.mimeType),
              t.crossDomain ||
                a["X-Requested-With"] ||
                (a["X-Requested-With"] = "XMLHttpRequest"),
              a))
                o.setRequestHeader(s, a[s]);
              (i = function (e) {
                return function () {
                  i &&
                    ((i =
                      n =
                      o.onload =
                      o.onerror =
                      o.onabort =
                      o.ontimeout =
                      o.onreadystatechange =
                        null),
                    "abort" === e
                      ? o.abort()
                      : "error" === e
                      ? "number" != typeof o.status
                        ? r(0, "error")
                        : r(o.status, o.statusText)
                      : r(
                          $t[o.status] || o.status,
                          o.statusText,
                          "text" !== (o.responseType || "text") ||
                            "string" != typeof o.responseText
                            ? { binary: o.response }
                            : { text: o.responseText },
                          o.getAllResponseHeaders()
                        ));
                };
              }),
                (o.onload = i()),
                (n = o.onerror = o.ontimeout = i("error")),
                void 0 !== o.onabort
                  ? (o.onabort = n)
                  : (o.onreadystatechange = function () {
                      4 === o.readyState &&
                        e.setTimeout(function () {
                          i && n();
                        });
                    }),
                (i = i("abort"));
              try {
                o.send((t.hasContent && t.data) || null);
              } catch (e) {
                if (i) throw e;
              }
            },
            abort: function () {
              i && i();
            },
          };
      }),
      x.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1);
      }),
      x.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (e) {
            return x.globalEval(e), e;
          },
        },
      }),
      x.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
      }),
      x.ajaxTransport("script", function (e) {
        var t, i;
        if (e.crossDomain)
          return {
            send: function (a, r) {
              (t = x("<script>")
                .prop({ charset: e.scriptCharset, src: e.url })
                .on(
                  "load error",
                  (i = function (e) {
                    t.remove(),
                      (i = null),
                      e && r("error" === e.type ? 404 : 200, e.type);
                  })
                )),
                n.head.appendChild(t[0]);
            },
            abort: function () {
              i && i();
            },
          };
      });
    var Rt = [],
      Ht = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var e = Rt.pop() || x.expando + "_" + yt++;
        return (this[e] = !0), e;
      },
    }),
      x.ajaxPrefilter("json jsonp", function (t, i, n) {
        var a,
          r,
          s,
          o =
            !1 !== t.jsonp &&
            (Ht.test(t.url)
              ? "url"
              : "string" == typeof t.data &&
                0 ===
                  (t.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                Ht.test(t.data) &&
                "data");
        if (o || "jsonp" === t.dataTypes[0])
          return (
            (a = t.jsonpCallback =
              v(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
            o
              ? (t[o] = t[o].replace(Ht, "$1" + a))
              : !1 !== t.jsonp &&
                (t.url += (bt.test(t.url) ? "&" : "?") + t.jsonp + "=" + a),
            (t.converters["script json"] = function () {
              return s || x.error(a + " was not called"), s[0];
            }),
            (t.dataTypes[0] = "json"),
            (r = e[a]),
            (e[a] = function () {
              s = arguments;
            }),
            n.always(function () {
              void 0 === r ? x(e).removeProp(a) : (e[a] = r),
                t[a] && ((t.jsonpCallback = i.jsonpCallback), Rt.push(a)),
                s && v(r) && r(s[0]),
                (s = r = void 0);
            }),
            "script"
          );
      }),
      (f.createHTMLDocument = (function () {
        var e = n.implementation.createHTMLDocument("").body;
        return (
          (e.innerHTML = "<form></form><form></form>"),
          2 === e.childNodes.length
        );
      })()),
      (x.parseHTML = function (e, t, i) {
        return "string" != typeof e
          ? []
          : ("boolean" == typeof t && ((i = t), (t = !1)),
            t ||
              (f.createHTMLDocument
                ? (((a = (t =
                    n.implementation.createHTMLDocument("")).createElement(
                    "base"
                  )).href = n.location.href),
                  t.head.appendChild(a))
                : (t = n)),
            (s = !i && []),
            (r = P.exec(e))
              ? [t.createElement(r[1])]
              : ((r = me([e], t, s)),
                s && s.length && x(s).remove(),
                x.merge([], r.childNodes)));
        var a, r, s;
      }),
      (x.fn.load = function (e, t, i) {
        var n,
          a,
          r,
          s = this,
          o = e.indexOf(" ");
        return (
          o > -1 && ((n = dt(e.slice(o))), (e = e.slice(0, o))),
          v(t)
            ? ((i = t), (t = void 0))
            : t && "object" == typeof t && (a = "POST"),
          s.length > 0 &&
            x
              .ajax({ url: e, type: a || "GET", dataType: "html", data: t })
              .done(function (e) {
                (r = arguments),
                  s.html(n ? x("<div>").append(x.parseHTML(e)).find(n) : e);
              })
              .always(
                i &&
                  function (e, t) {
                    s.each(function () {
                      i.apply(this, r || [e.responseText, t, e]);
                    });
                  }
              ),
          this
        );
      }),
      x.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (e, t) {
          x.fn[t] = function (e) {
            return this.on(t, e);
          };
        }
      ),
      (x.expr.pseudos.animated = function (e) {
        return x.grep(x.timers, function (t) {
          return e === t.elem;
        }).length;
      }),
      (x.offset = {
        setOffset: function (e, t, i) {
          var n,
            a,
            r,
            s,
            o,
            l,
            u = x.css(e, "position"),
            c = x(e),
            d = {};
          "static" === u && (e.style.position = "relative"),
            (o = c.offset()),
            (r = x.css(e, "top")),
            (l = x.css(e, "left")),
            ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1
              ? ((s = (n = c.position()).top), (a = n.left))
              : ((s = parseFloat(r) || 0), (a = parseFloat(l) || 0)),
            v(t) && (t = t.call(e, i, x.extend({}, o))),
            null != t.top && (d.top = t.top - o.top + s),
            null != t.left && (d.left = t.left - o.left + a),
            "using" in t ? t.using.call(e, d) : c.css(d);
        },
      }),
      x.fn.extend({
        offset: function (e) {
          if (arguments.length)
            return void 0 === e
              ? this
              : this.each(function (t) {
                  x.offset.setOffset(this, e, t);
                });
          var t,
            i,
            n = this[0];
          return n
            ? n.getClientRects().length
              ? ((t = n.getBoundingClientRect()),
                (i = n.ownerDocument.defaultView),
                { top: t.top + i.pageYOffset, left: t.left + i.pageXOffset })
              : { top: 0, left: 0 }
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var e,
              t,
              i,
              n = this[0],
              a = { top: 0, left: 0 };
            if ("fixed" === x.css(n, "position")) t = n.getBoundingClientRect();
            else {
              for (
                t = this.offset(),
                  i = n.ownerDocument,
                  e = n.offsetParent || i.documentElement;
                e &&
                (e === i.body || e === i.documentElement) &&
                "static" === x.css(e, "position");

              )
                e = e.parentNode;
              e &&
                e !== n &&
                1 === e.nodeType &&
                (((a = x(e).offset()).top += x.css(e, "borderTopWidth", !0)),
                (a.left += x.css(e, "borderLeftWidth", !0)));
            }
            return {
              top: t.top - a.top - x.css(n, "marginTop", !0),
              left: t.left - a.left - x.css(n, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var e = this.offsetParent;
              e && "static" === x.css(e, "position");

            )
              e = e.offsetParent;
            return e || ge;
          });
        },
      }),
      x.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (e, t) {
          var i = "pageYOffset" === t;
          x.fn[e] = function (n) {
            return F(
              this,
              function (e, n, a) {
                var r;
                if (
                  (m(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView),
                  void 0 === a)
                )
                  return r ? r[t] : e[n];
                r
                  ? r.scrollTo(i ? r.pageXOffset : a, i ? a : r.pageYOffset)
                  : (e[n] = a);
              },
              e,
              n,
              arguments.length
            );
          };
        }
      ),
      x.each(["top", "left"], function (e, t) {
        x.cssHooks[t] = Re(f.pixelPosition, function (e, i) {
          if (i)
            return (i = Be(e, t)), ze.test(i) ? x(e).position()[t] + "px" : i;
        });
      }),
      x.each({ Height: "height", Width: "width" }, function (e, t) {
        x.each(
          { padding: "inner" + e, content: t, "": "outer" + e },
          function (i, n) {
            x.fn[n] = function (a, r) {
              var s = arguments.length && (i || "boolean" != typeof a),
                o = i || (!0 === a || !0 === r ? "margin" : "border");
              return F(
                this,
                function (t, i, a) {
                  var r;
                  return m(t)
                    ? 0 === n.indexOf("outer")
                      ? t["inner" + e]
                      : t.document.documentElement["client" + e]
                    : 9 === t.nodeType
                    ? ((r = t.documentElement),
                      Math.max(
                        t.body["scroll" + e],
                        r["scroll" + e],
                        t.body["offset" + e],
                        r["offset" + e],
                        r["client" + e]
                      ))
                    : void 0 === a
                    ? x.css(t, i, o)
                    : x.style(t, i, a, o);
                },
                t,
                s ? a : void 0,
                s
              );
            };
          }
        );
      }),
      x.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (e, t) {
          x.fn[t] = function (e, i) {
            return arguments.length > 0
              ? this.on(t, null, e, i)
              : this.trigger(t);
          };
        }
      ),
      x.fn.extend({
        hover: function (e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        },
      }),
      x.fn.extend({
        bind: function (e, t, i) {
          return this.on(e, null, t, i);
        },
        unbind: function (e, t) {
          return this.off(e, null, t);
        },
        delegate: function (e, t, i, n) {
          return this.on(t, e, i, n);
        },
        undelegate: function (e, t, i) {
          return 1 === arguments.length
            ? this.off(e, "**")
            : this.off(t, e || "**", i);
        },
      }),
      (x.proxy = function (e, t) {
        var i, n, a;
        if (("string" == typeof t && ((i = e[t]), (t = e), (e = i)), v(e)))
          return (
            (n = r.call(arguments, 2)),
            ((a = function () {
              return e.apply(t || this, n.concat(r.call(arguments)));
            }).guid = e.guid =
              e.guid || x.guid++),
            a
          );
      }),
      (x.holdReady = function (e) {
        e ? x.readyWait++ : x.ready(!0);
      }),
      (x.isArray = Array.isArray),
      (x.parseJSON = JSON.parse),
      (x.nodeName = M),
      (x.isFunction = v),
      (x.isWindow = m),
      (x.camelCase = W),
      (x.type = b),
      (x.now = Date.now),
      (x.isNumeric = function (e) {
        var t = x.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
      }),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return x;
        });
    var Ft = e.jQuery,
      Gt = e.$;
    return (
      (x.noConflict = function (t) {
        return (
          e.$ === x && (e.$ = Gt), t && e.jQuery === x && (e.jQuery = Ft), x
        );
      }),
      t || (e.jQuery = e.$ = x),
      x
    );
  }),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).Swiper =
          t());
  })(this, function () {
    "use strict";
    function e(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    function t() {
      return (t =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var i = arguments[t];
            for (var n in i)
              Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
          }
          return e;
        }).apply(this, arguments);
    }
    function i(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function n(e, t) {
      void 0 === e && (e = {}),
        void 0 === t && (t = {}),
        Object.keys(t).forEach(function (a) {
          void 0 === e[a]
            ? (e[a] = t[a])
            : i(t[a]) &&
              i(e[a]) &&
              Object.keys(t[a]).length > 0 &&
              n(e[a], t[a]);
        });
    }
    var a = {
      body: {},
      addEventListener: function () {},
      removeEventListener: function () {},
      activeElement: { blur: function () {}, nodeName: "" },
      querySelector: function () {
        return null;
      },
      querySelectorAll: function () {
        return [];
      },
      getElementById: function () {
        return null;
      },
      createEvent: function () {
        return { initEvent: function () {} };
      },
      createElement: function () {
        return {
          children: [],
          childNodes: [],
          style: {},
          setAttribute: function () {},
          getElementsByTagName: function () {
            return [];
          },
        };
      },
      createElementNS: function () {
        return {};
      },
      importNode: function () {
        return null;
      },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function r() {
      var e = "undefined" != typeof document ? document : {};
      return n(e, a), e;
    }
    var s = {
      document: a,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: {
        replaceState: function () {},
        pushState: function () {},
        go: function () {},
        back: function () {},
      },
      CustomEvent: function () {
        return this;
      },
      addEventListener: function () {},
      removeEventListener: function () {},
      getComputedStyle: function () {
        return {
          getPropertyValue: function () {
            return "";
          },
        };
      },
      Image: function () {},
      Date: function () {},
      screen: {},
      setTimeout: function () {},
      clearTimeout: function () {},
      matchMedia: function () {
        return {};
      },
      requestAnimationFrame: function (e) {
        return "undefined" == typeof setTimeout
          ? (e(), null)
          : setTimeout(e, 0);
      },
      cancelAnimationFrame: function (e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function o() {
      var e = "undefined" != typeof window ? window : {};
      return n(e, s), e;
    }
    function l(e) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function u(e, t) {
      return (u =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function c() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        );
      } catch (e) {
        return !1;
      }
    }
    function d(e, t, i) {
      return (d = c()
        ? Reflect.construct
        : function (e, t, i) {
            var n = [null];
            n.push.apply(n, t);
            var a = new (Function.bind.apply(e, n))();
            return i && u(a, i.prototype), a;
          }).apply(null, arguments);
    }
    function p(e) {
      var t = "function" == typeof Map ? new Map() : void 0;
      return (p = function (e) {
        if (
          null === e ||
          ((i = e), -1 === Function.toString.call(i).indexOf("[native code]"))
        )
          return e;
        var i;
        if ("function" != typeof e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        if (void 0 !== t) {
          if (t.has(e)) return t.get(e);
          t.set(e, n);
        }
        function n() {
          return d(e, arguments, l(this).constructor);
        }
        return (
          (n.prototype = Object.create(e.prototype, {
            constructor: {
              value: n,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          u(n, e)
        );
      })(e);
    }
    var h = (function (e) {
      var t, i;
      function n(t) {
        var i, n, a;
        return (
          (i = e.call.apply(e, [this].concat(t)) || this),
          (n = (function (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return e;
          })(i)),
          (a = n.__proto__),
          Object.defineProperty(n, "__proto__", {
            get: function () {
              return a;
            },
            set: function (e) {
              a.__proto__ = e;
            },
          }),
          i
        );
      }
      return (
        (i = e),
        ((t = n).prototype = Object.create(i.prototype)),
        (t.prototype.constructor = t),
        (t.__proto__ = i),
        n
      );
    })(p(Array));
    function f(e) {
      void 0 === e && (e = []);
      var t = [];
      return (
        e.forEach(function (e) {
          Array.isArray(e) ? t.push.apply(t, f(e)) : t.push(e);
        }),
        t
      );
    }
    function v(e, t) {
      return Array.prototype.filter.call(e, t);
    }
    function m(e, t) {
      var i = o(),
        n = r(),
        a = [];
      if (!t && e instanceof h) return e;
      if (!e) return new h(a);
      if ("string" == typeof e) {
        var s = e.trim();
        if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
          var l = "div";
          0 === s.indexOf("<li") && (l = "ul"),
            0 === s.indexOf("<tr") && (l = "tbody"),
            (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (l = "tr"),
            0 === s.indexOf("<tbody") && (l = "table"),
            0 === s.indexOf("<option") && (l = "select");
          var u = n.createElement(l);
          u.innerHTML = s;
          for (var c = 0; c < u.childNodes.length; c += 1)
            a.push(u.childNodes[c]);
        } else
          a = (function (e, t) {
            if ("string" != typeof e) return [e];
            for (
              var i = [], n = t.querySelectorAll(e), a = 0;
              a < n.length;
              a += 1
            )
              i.push(n[a]);
            return i;
          })(e.trim(), t || n);
      } else if (e.nodeType || e === i || e === n) a.push(e);
      else if (Array.isArray(e)) {
        if (e instanceof h) return e;
        a = e;
      }
      return new h(
        (function (e) {
          for (var t = [], i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
          return t;
        })(a)
      );
    }
    m.fn = h.prototype;
    var g,
      y,
      b,
      x = {
        addClass: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          var n = f(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          return (
            this.forEach(function (e) {
              var t;
              (t = e.classList).add.apply(t, n);
            }),
            this
          );
        },
        removeClass: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          var n = f(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          return (
            this.forEach(function (e) {
              var t;
              (t = e.classList).remove.apply(t, n);
            }),
            this
          );
        },
        hasClass: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          var n = f(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          return (
            v(this, function (e) {
              return (
                n.filter(function (t) {
                  return e.classList.contains(t);
                }).length > 0
              );
            }).length > 0
          );
        },
        toggleClass: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          var n = f(
            t.map(function (e) {
              return e.split(" ");
            })
          );
          this.forEach(function (e) {
            n.forEach(function (t) {
              e.classList.toggle(t);
            });
          });
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (var i = 0; i < this.length; i += 1)
            if (2 === arguments.length) this[i].setAttribute(e, t);
            else
              for (var n in e)
                (this[i][n] = e[n]), this[i].setAttribute(n, e[n]);
          return this;
        },
        removeAttr: function (e) {
          for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        transform: function (e) {
          for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
          return this;
        },
        transition: function (e) {
          for (var t = 0; t < this.length; t += 1)
            this[t].style.transitionDuration =
              "string" != typeof e ? e + "ms" : e;
          return this;
        },
        on: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          var n = t[0],
            a = t[1],
            r = t[2],
            s = t[3];
          function o(e) {
            var t = e.target;
            if (t) {
              var i = e.target.dom7EventData || [];
              if ((i.indexOf(e) < 0 && i.unshift(e), m(t).is(a))) r.apply(t, i);
              else
                for (var n = m(t).parents(), s = 0; s < n.length; s += 1)
                  m(n[s]).is(a) && r.apply(n[s], i);
            }
          }
          function l(e) {
            var t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
          }
          "function" == typeof t[1] &&
            ((n = t[0]), (r = t[1]), (s = t[2]), (a = void 0)),
            s || (s = !1);
          for (var u, c = n.split(" "), d = 0; d < this.length; d += 1) {
            var p = this[d];
            if (a)
              for (u = 0; u < c.length; u += 1) {
                var h = c[u];
                p.dom7LiveListeners || (p.dom7LiveListeners = {}),
                  p.dom7LiveListeners[h] || (p.dom7LiveListeners[h] = []),
                  p.dom7LiveListeners[h].push({
                    listener: r,
                    proxyListener: o,
                  }),
                  p.addEventListener(h, o, s);
              }
            else
              for (u = 0; u < c.length; u += 1) {
                var f = c[u];
                p.dom7Listeners || (p.dom7Listeners = {}),
                  p.dom7Listeners[f] || (p.dom7Listeners[f] = []),
                  p.dom7Listeners[f].push({ listener: r, proxyListener: l }),
                  p.addEventListener(f, l, s);
              }
          }
          return this;
        },
        off: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          var n = t[0],
            a = t[1],
            r = t[2],
            s = t[3];
          "function" == typeof t[1] &&
            ((n = t[0]), (r = t[1]), (s = t[2]), (a = void 0)),
            s || (s = !1);
          for (var o = n.split(" "), l = 0; l < o.length; l += 1)
            for (var u = o[l], c = 0; c < this.length; c += 1) {
              var d = this[c],
                p = void 0;
              if (
                (!a && d.dom7Listeners
                  ? (p = d.dom7Listeners[u])
                  : a && d.dom7LiveListeners && (p = d.dom7LiveListeners[u]),
                p && p.length)
              )
                for (var h = p.length - 1; h >= 0; h -= 1) {
                  var f = p[h];
                  (r && f.listener === r) ||
                  (r &&
                    f.listener &&
                    f.listener.dom7proxy &&
                    f.listener.dom7proxy === r)
                    ? (d.removeEventListener(u, f.proxyListener, s),
                      p.splice(h, 1))
                    : r ||
                      (d.removeEventListener(u, f.proxyListener, s),
                      p.splice(h, 1));
                }
            }
          return this;
        },
        trigger: function () {
          for (
            var e = o(), t = arguments.length, i = new Array(t), n = 0;
            n < t;
            n++
          )
            i[n] = arguments[n];
          for (var a = i[0].split(" "), r = i[1], s = 0; s < a.length; s += 1)
            for (var l = a[s], u = 0; u < this.length; u += 1) {
              var c = this[u];
              if (e.CustomEvent) {
                var d = new e.CustomEvent(l, {
                  detail: r,
                  bubbles: !0,
                  cancelable: !0,
                });
                (c.dom7EventData = i.filter(function (e, t) {
                  return t > 0;
                })),
                  c.dispatchEvent(d),
                  (c.dom7EventData = []),
                  delete c.dom7EventData;
              }
            }
          return this;
        },
        transitionEnd: function (e) {
          var t = this;
          return (
            e &&
              t.on("transitionend", function i(n) {
                n.target === this &&
                  (e.call(this, n), t.off("transitionend", i));
              }),
            this
          );
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              var t = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(t.getPropertyValue("margin-right")) +
                parseFloat(t.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              var t = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(t.getPropertyValue("margin-top")) +
                parseFloat(t.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          var e = o();
          return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            var e = o(),
              t = r(),
              i = this[0],
              n = i.getBoundingClientRect(),
              a = t.body,
              s = i.clientTop || a.clientTop || 0,
              l = i.clientLeft || a.clientLeft || 0,
              u = i === e ? e.scrollY : i.scrollTop,
              c = i === e ? e.scrollX : i.scrollLeft;
            return { top: n.top + u - s, left: n.left + c - l };
          }
          return null;
        },
        css: function (e, t) {
          var i,
            n = o();
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (i = 0; i < this.length; i += 1)
                for (var a in e) this[i].style[a] = e[a];
              return this;
            }
            if (this[0])
              return n.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          return e
            ? (this.forEach(function (t, i) {
                e.apply(t, [t, i]);
              }),
              this)
            : this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : null;
          for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          var t,
            i,
            n = o(),
            a = r(),
            s = this[0];
          if (!s || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (s.matches) return s.matches(e);
            if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
            if (s.msMatchesSelector) return s.msMatchesSelector(e);
            for (t = m(e), i = 0; i < t.length; i += 1)
              if (t[i] === s) return !0;
            return !1;
          }
          if (e === a) return s === a;
          if (e === n) return s === n;
          if (e.nodeType || e instanceof h) {
            for (t = e.nodeType ? [e] : e, i = 0; i < t.length; i += 1)
              if (t[i] === s) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          var e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          var t = this.length;
          if (e > t - 1) return m([]);
          if (e < 0) {
            var i = t + e;
            return m(i < 0 ? [] : [this[i]]);
          }
          return m([this[e]]);
        },
        append: function () {
          for (var e, t = r(), i = 0; i < arguments.length; i += 1) {
            e = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            for (var n = 0; n < this.length; n += 1)
              if ("string" == typeof e) {
                var a = t.createElement("div");
                for (a.innerHTML = e; a.firstChild; )
                  this[n].appendChild(a.firstChild);
              } else if (e instanceof h)
                for (var s = 0; s < e.length; s += 1) this[n].appendChild(e[s]);
              else this[n].appendChild(e);
          }
          return this;
        },
        prepend: function (e) {
          var t,
            i,
            n = r();
          for (t = 0; t < this.length; t += 1)
            if ("string" == typeof e) {
              var a = n.createElement("div");
              for (a.innerHTML = e, i = a.childNodes.length - 1; i >= 0; i -= 1)
                this[t].insertBefore(a.childNodes[i], this[t].childNodes[0]);
            } else if (e instanceof h)
              for (i = 0; i < e.length; i += 1)
                this[t].insertBefore(e[i], this[t].childNodes[0]);
            else this[t].insertBefore(e, this[t].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                m(this[0].nextElementSibling).is(e)
                ? m([this[0].nextElementSibling])
                : m([])
              : this[0].nextElementSibling
              ? m([this[0].nextElementSibling])
              : m([])
            : m([]);
        },
        nextAll: function (e) {
          var t = [],
            i = this[0];
          if (!i) return m([]);
          for (; i.nextElementSibling; ) {
            var n = i.nextElementSibling;
            e ? m(n).is(e) && t.push(n) : t.push(n), (i = n);
          }
          return m(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            var t = this[0];
            return e
              ? t.previousElementSibling && m(t.previousElementSibling).is(e)
                ? m([t.previousElementSibling])
                : m([])
              : t.previousElementSibling
              ? m([t.previousElementSibling])
              : m([]);
          }
          return m([]);
        },
        prevAll: function (e) {
          var t = [],
            i = this[0];
          if (!i) return m([]);
          for (; i.previousElementSibling; ) {
            var n = i.previousElementSibling;
            e ? m(n).is(e) && t.push(n) : t.push(n), (i = n);
          }
          return m(t);
        },
        parent: function (e) {
          for (var t = [], i = 0; i < this.length; i += 1)
            null !== this[i].parentNode &&
              (e
                ? m(this[i].parentNode).is(e) && t.push(this[i].parentNode)
                : t.push(this[i].parentNode));
          return m(t);
        },
        parents: function (e) {
          for (var t = [], i = 0; i < this.length; i += 1)
            for (var n = this[i].parentNode; n; )
              e ? m(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
          return m(t);
        },
        closest: function (e) {
          var t = this;
          return void 0 === e
            ? m([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          for (var t = [], i = 0; i < this.length; i += 1) {
            try {
              var n = this[i].querySelectorAll(e);
            } catch (t) {
              console.log(e);
            }
            for (var a = 0; a < n.length; a += 1) t.push(n[a]);
          }
          return m(t);
        },
        children: function (e) {
          for (var t = [], i = 0; i < this.length; i += 1)
            for (var n = this[i].children, a = 0; a < n.length; a += 1)
              (e && !m(n[a]).is(e)) || t.push(n[a]);
          return m(t);
        },
        filter: function (e) {
          return m(v(this, e));
        },
        remove: function () {
          for (var e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
      };
    function w(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function k() {
      return Date.now();
    }
    function E(e, t) {
      void 0 === t && (t = "x");
      var i,
        n,
        a,
        r = o(),
        s = (function (e) {
          var t,
            i = o();
          return (
            i.getComputedStyle && (t = i.getComputedStyle(e, null)),
            !t && e.currentStyle && (t = e.currentStyle),
            t || (t = e.style),
            t
          );
        })(e);
      return (
        r.WebKitCSSMatrix
          ? ((n = s.transform || s.webkitTransform).split(",").length > 6 &&
              (n = n
                .split(", ")
                .map(function (e) {
                  return e.replace(",", ".");
                })
                .join(", ")),
            (a = new r.WebKitCSSMatrix("none" === n ? "" : n)))
          : (i = (a =
              s.MozTransform ||
              s.OTransform ||
              s.MsTransform ||
              s.msTransform ||
              s.transform ||
              s
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,"))
              .toString()
              .split(",")),
        "x" === t &&
          (n = r.WebKitCSSMatrix
            ? a.m41
            : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
        "y" === t &&
          (n = r.WebKitCSSMatrix
            ? a.m42
            : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
        n || 0
      );
    }
    function T(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function S() {
      for (
        var e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
          t = ["__proto__", "constructor", "prototype"],
          i = 1;
        i < arguments.length;
        i += 1
      ) {
        var n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (null != n)
          for (
            var a = Object.keys(Object(n)).filter(function (e) {
                return t.indexOf(e) < 0;
              }),
              r = 0,
              s = a.length;
            r < s;
            r += 1
          ) {
            var o = a[r],
              l = Object.getOwnPropertyDescriptor(n, o);
            void 0 !== l &&
              l.enumerable &&
              (T(e[o]) && T(n[o])
                ? n[o].__swiper__
                  ? (e[o] = n[o])
                  : S(e[o], n[o])
                : !T(e[o]) && T(n[o])
                ? ((e[o] = {}), n[o].__swiper__ ? (e[o] = n[o]) : S(e[o], n[o]))
                : (e[o] = n[o]));
          }
      }
      return e;
    }
    function C(e, t) {
      Object.keys(t).forEach(function (i) {
        T(t[i]) &&
          Object.keys(t[i]).forEach(function (n) {
            "function" == typeof t[i][n] && (t[i][n] = t[i][n].bind(e));
          }),
          (e[i] = t[i]);
      });
    }
    function M(e) {
      return (
        void 0 === e && (e = ""),
        "." +
          e
            .trim()
            .replace(/([\.:\/])/g, "\\$1")
            .replace(/ /g, ".")
      );
    }
    function P() {
      return (
        g ||
          (g = (function () {
            var e = o(),
              t = r();
            return {
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
              pointerEvents:
                !!e.PointerEvent &&
                "maxTouchPoints" in e.navigator &&
                e.navigator.maxTouchPoints >= 0,
              observer:
                "MutationObserver" in e || "WebkitMutationObserver" in e,
              passiveListener: (function () {
                var t = !1;
                try {
                  var i = Object.defineProperty({}, "passive", {
                    get: function () {
                      t = !0;
                    },
                  });
                  e.addEventListener("testPassiveListener", null, i);
                } catch (e) {}
                return t;
              })(),
              gestures: "ongesturestart" in e,
            };
          })()),
        g
      );
    }
    function O(e) {
      return (
        void 0 === e && (e = {}),
        y ||
          (y = (function (e) {
            var t = (void 0 === e ? {} : e).userAgent,
              i = P(),
              n = o(),
              a = n.navigator.platform,
              r = t || n.navigator.userAgent,
              s = { ios: !1, android: !1 },
              l = n.screen.width,
              u = n.screen.height,
              c = r.match(/(Android);?[\s\/]+([\d.]+)?/),
              d = r.match(/(iPad).*OS\s([\d_]+)/),
              p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
              h = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              f = "Win32" === a,
              v = "MacIntel" === a;
            return (
              !d &&
                v &&
                i.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(l + "x" + u) >= 0 &&
                ((d = r.match(/(Version)\/([\d.]+)/)) || (d = [0, 1, "13_0_0"]),
                (v = !1)),
              c && !f && ((s.os = "android"), (s.android = !0)),
              (d || h || p) && ((s.os = "ios"), (s.ios = !0)),
              s
            );
          })(e)),
        y
      );
    }
    function A() {
      return (
        b ||
          (b = (function () {
            var e,
              t = o();
            return {
              isEdge: !!t.navigator.userAgent.match(/Edge/g),
              isSafari:
                ((e = t.navigator.userAgent.toLowerCase()),
                e.indexOf("safari") >= 0 &&
                  e.indexOf("chrome") < 0 &&
                  e.indexOf("android") < 0),
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                t.navigator.userAgent
              ),
            };
          })()),
        b
      );
    }
    Object.keys(x).forEach(function (e) {
      Object.defineProperty(m.fn, e, { value: x[e], writable: !0 });
    });
    var L = {
        name: "resize",
        create: function () {
          var e = this;
          S(e, {
            resize: {
              observer: null,
              createObserver: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  ((e.resize.observer = new ResizeObserver(function (t) {
                    var i = e.width,
                      n = e.height,
                      a = i,
                      r = n;
                    t.forEach(function (t) {
                      var i = t.contentBoxSize,
                        n = t.contentRect,
                        s = t.target;
                      (s && s !== e.el) ||
                        ((a = n ? n.width : (i[0] || i).inlineSize),
                        (r = n ? n.height : (i[0] || i).blockSize));
                    }),
                      (a === i && r === n) || e.resize.resizeHandler();
                  })),
                  e.resize.observer.observe(e.el));
              },
              removeObserver: function () {
                e.resize.observer &&
                  e.resize.observer.unobserve &&
                  e.el &&
                  (e.resize.observer.unobserve(e.el),
                  (e.resize.observer = null));
              },
              resizeHandler: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  (e.emit("beforeResize"), e.emit("resize"));
              },
              orientationChangeHandler: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  e.emit("orientationchange");
              },
            },
          });
        },
        on: {
          init: function (e) {
            var t = o();
            e.params.resizeObserver && void 0 !== o().ResizeObserver
              ? e.resize.createObserver()
              : (t.addEventListener("resize", e.resize.resizeHandler),
                t.addEventListener(
                  "orientationchange",
                  e.resize.orientationChangeHandler
                ));
          },
          destroy: function (e) {
            var t = o();
            e.resize.removeObserver(),
              t.removeEventListener("resize", e.resize.resizeHandler),
              t.removeEventListener(
                "orientationchange",
                e.resize.orientationChangeHandler
              );
          },
        },
      },
      D = {
        attach: function (e, t) {
          void 0 === t && (t = {});
          var i = o(),
            n = this,
            a = new (i.MutationObserver || i.WebkitMutationObserver)(function (
              e
            ) {
              if (1 !== e.length) {
                var t = function () {
                  n.emit("observerUpdate", e[0]);
                };
                i.requestAnimationFrame
                  ? i.requestAnimationFrame(t)
                  : i.setTimeout(t, 0);
              } else n.emit("observerUpdate", e[0]);
            });
          a.observe(e, {
            attributes: void 0 === t.attributes || t.attributes,
            childList: void 0 === t.childList || t.childList,
            characterData: void 0 === t.characterData || t.characterData,
          }),
            n.observer.observers.push(a);
        },
        init: function () {
          if (this.support.observer && this.params.observer) {
            if (this.params.observeParents)
              for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)
                this.observer.attach(e[t]);
            this.observer.attach(this.$el[0], {
              childList: this.params.observeSlideChildren,
            }),
              this.observer.attach(this.$wrapperEl[0], { attributes: !1 });
          }
        },
        destroy: function () {
          this.observer.observers.forEach(function (e) {
            e.disconnect();
          }),
            (this.observer.observers = []);
        },
      },
      I = {
        name: "observer",
        params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
        create: function () {
          C(this, { observer: t({}, D, { observers: [] }) });
        },
        on: {
          init: function (e) {
            e.observer.init();
          },
          destroy: function (e) {
            e.observer.destroy();
          },
        },
      };
    function j(e) {
      var t = r(),
        i = o(),
        n = this.touchEventsData,
        a = this.params,
        s = this.touches;
      if (!this.animating || !a.preventInteractionOnTransition) {
        var l = e;
        l.originalEvent && (l = l.originalEvent);
        var u = m(l.target);
        if (
          "wrapper" !== a.touchEventsTarget ||
          u.closest(this.wrapperEl).length
        )
          if (
            ((n.isTouchEvent = "touchstart" === l.type),
            n.isTouchEvent || !("which" in l) || 3 !== l.which)
          )
            if (!(!n.isTouchEvent && "button" in l && l.button > 0))
              if (!n.isTouched || !n.isMoved)
                if (
                  (!!a.noSwipingClass &&
                    "" !== a.noSwipingClass &&
                    l.target &&
                    l.target.shadowRoot &&
                    e.path &&
                    e.path[0] &&
                    (u = m(e.path[0])),
                  a.noSwiping &&
                    u.closest(
                      a.noSwipingSelector
                        ? a.noSwipingSelector
                        : "." + a.noSwipingClass
                    )[0])
                )
                  this.allowClick = !0;
                else if (!a.swipeHandler || u.closest(a.swipeHandler)[0]) {
                  (s.currentX =
                    "touchstart" === l.type
                      ? l.targetTouches[0].pageX
                      : l.pageX),
                    (s.currentY =
                      "touchstart" === l.type
                        ? l.targetTouches[0].pageY
                        : l.pageY);
                  var c = s.currentX,
                    d = s.currentY,
                    p = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
                    h = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
                  if (p && (c <= h || c >= i.innerWidth - h)) {
                    if ("prevent" !== p) return;
                    e.preventDefault();
                  }
                  if (
                    (S(n, {
                      isTouched: !0,
                      isMoved: !1,
                      allowTouchCallbacks: !0,
                      isScrolling: void 0,
                      startMoving: void 0,
                    }),
                    (s.startX = c),
                    (s.startY = d),
                    (n.touchStartTime = k()),
                    (this.allowClick = !0),
                    this.updateSize(),
                    (this.swipeDirection = void 0),
                    a.threshold > 0 && (n.allowThresholdMove = !1),
                    "touchstart" !== l.type)
                  ) {
                    var f = !0;
                    u.is(n.formElements) && (f = !1),
                      t.activeElement &&
                        m(t.activeElement).is(n.formElements) &&
                        t.activeElement !== u[0] &&
                        t.activeElement.blur();
                    var v =
                      f && this.allowTouchMove && a.touchStartPreventDefault;
                    (!a.touchStartForcePreventDefault && !v) ||
                      u[0].isContentEditable ||
                      l.preventDefault();
                  }
                  this.emit("touchStart", l);
                }
      }
    }
    function N(e) {
      var t = r(),
        i = this.touchEventsData,
        n = this.params,
        a = this.touches,
        s = this.rtlTranslate,
        o = e;
      if ((o.originalEvent && (o = o.originalEvent), i.isTouched)) {
        if (!i.isTouchEvent || "touchmove" === o.type) {
          var l =
              "touchmove" === o.type &&
              o.targetTouches &&
              (o.targetTouches[0] || o.changedTouches[0]),
            u = "touchmove" === o.type ? l.pageX : o.pageX,
            c = "touchmove" === o.type ? l.pageY : o.pageY;
          if (o.preventedByNestedSwiper)
            return (a.startX = u), void (a.startY = c);
          if (!this.allowTouchMove)
            return (
              (this.allowClick = !1),
              void (
                i.isTouched &&
                (S(a, { startX: u, startY: c, currentX: u, currentY: c }),
                (i.touchStartTime = k()))
              )
            );
          if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
            if (this.isVertical()) {
              if (
                (c < a.startY && this.translate <= this.maxTranslate()) ||
                (c > a.startY && this.translate >= this.minTranslate())
              )
                return (i.isTouched = !1), void (i.isMoved = !1);
            } else if (
              (u < a.startX && this.translate <= this.maxTranslate()) ||
              (u > a.startX && this.translate >= this.minTranslate())
            )
              return;
          if (
            i.isTouchEvent &&
            t.activeElement &&
            o.target === t.activeElement &&
            m(o.target).is(i.formElements)
          )
            return (i.isMoved = !0), void (this.allowClick = !1);
          if (
            (i.allowTouchCallbacks && this.emit("touchMove", o),
            !(o.targetTouches && o.targetTouches.length > 1))
          ) {
            (a.currentX = u), (a.currentY = c);
            var d = a.currentX - a.startX,
              p = a.currentY - a.startY;
            if (
              !(
                this.params.threshold &&
                Math.sqrt(Math.pow(d, 2) + Math.pow(p, 2)) <
                  this.params.threshold
              )
            ) {
              var h;
              if (void 0 === i.isScrolling)
                (this.isHorizontal() && a.currentY === a.startY) ||
                (this.isVertical() && a.currentX === a.startX)
                  ? (i.isScrolling = !1)
                  : d * d + p * p >= 25 &&
                    ((h =
                      (180 * Math.atan2(Math.abs(p), Math.abs(d))) / Math.PI),
                    (i.isScrolling = this.isHorizontal()
                      ? h > n.touchAngle
                      : 90 - h > n.touchAngle));
              if (
                (i.isScrolling && this.emit("touchMoveOpposite", o),
                void 0 === i.startMoving &&
                  ((a.currentX === a.startX && a.currentY === a.startY) ||
                    (i.startMoving = !0)),
                i.isScrolling)
              )
                i.isTouched = !1;
              else if (i.startMoving) {
                (this.allowClick = !1),
                  !n.cssMode && o.cancelable && o.preventDefault(),
                  n.touchMoveStopPropagation &&
                    !n.nested &&
                    o.stopPropagation(),
                  i.isMoved ||
                    (n.loop && this.loopFix(),
                    (i.startTranslate = this.getTranslate()),
                    this.setTransition(0),
                    this.animating &&
                      this.$wrapperEl.trigger(
                        "webkitTransitionEnd transitionend"
                      ),
                    (i.allowMomentumBounce = !1),
                    !n.grabCursor ||
                      (!0 !== this.allowSlideNext &&
                        !0 !== this.allowSlidePrev) ||
                      this.setGrabCursor(!0),
                    this.emit("sliderFirstMove", o)),
                  this.emit("sliderMove", o),
                  (i.isMoved = !0);
                var f = this.isHorizontal() ? d : p;
                (a.diff = f),
                  (f *= n.touchRatio),
                  s && (f = -f),
                  (this.swipeDirection = f > 0 ? "prev" : "next"),
                  (i.currentTranslate = f + i.startTranslate);
                var v = !0,
                  g = n.resistanceRatio;
                if (
                  (n.touchReleaseOnEdges && (g = 0),
                  f > 0 && i.currentTranslate > this.minTranslate()
                    ? ((v = !1),
                      n.resistance &&
                        (i.currentTranslate =
                          this.minTranslate() -
                          1 +
                          Math.pow(
                            -this.minTranslate() + i.startTranslate + f,
                            g
                          )))
                    : f < 0 &&
                      i.currentTranslate < this.maxTranslate() &&
                      ((v = !1),
                      n.resistance &&
                        (i.currentTranslate =
                          this.maxTranslate() +
                          1 -
                          Math.pow(
                            this.maxTranslate() - i.startTranslate - f,
                            g
                          ))),
                  v && (o.preventedByNestedSwiper = !0),
                  !this.allowSlideNext &&
                    "next" === this.swipeDirection &&
                    i.currentTranslate < i.startTranslate &&
                    (i.currentTranslate = i.startTranslate),
                  !this.allowSlidePrev &&
                    "prev" === this.swipeDirection &&
                    i.currentTranslate > i.startTranslate &&
                    (i.currentTranslate = i.startTranslate),
                  this.allowSlidePrev ||
                    this.allowSlideNext ||
                    (i.currentTranslate = i.startTranslate),
                  n.threshold > 0)
                ) {
                  if (!(Math.abs(f) > n.threshold || i.allowThresholdMove))
                    return void (i.currentTranslate = i.startTranslate);
                  if (!i.allowThresholdMove)
                    return (
                      (i.allowThresholdMove = !0),
                      (a.startX = a.currentX),
                      (a.startY = a.currentY),
                      (i.currentTranslate = i.startTranslate),
                      void (a.diff = this.isHorizontal()
                        ? a.currentX - a.startX
                        : a.currentY - a.startY)
                    );
                }
                n.followFinger &&
                  !n.cssMode &&
                  ((n.freeMode ||
                    n.watchSlidesProgress ||
                    n.watchSlidesVisibility) &&
                    (this.updateActiveIndex(), this.updateSlidesClasses()),
                  n.freeMode &&
                    (0 === i.velocities.length &&
                      i.velocities.push({
                        position: a[this.isHorizontal() ? "startX" : "startY"],
                        time: i.touchStartTime,
                      }),
                    i.velocities.push({
                      position:
                        a[this.isHorizontal() ? "currentX" : "currentY"],
                      time: k(),
                    })),
                  this.updateProgress(i.currentTranslate),
                  this.setTranslate(i.currentTranslate));
              }
            }
          }
        }
      } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o);
    }
    function z(e) {
      var t = this,
        i = t.touchEventsData,
        n = t.params,
        a = t.touches,
        r = t.rtlTranslate,
        s = t.$wrapperEl,
        o = t.slidesGrid,
        l = t.snapGrid,
        u = e;
      if (
        (u.originalEvent && (u = u.originalEvent),
        i.allowTouchCallbacks && t.emit("touchEnd", u),
        (i.allowTouchCallbacks = !1),
        !i.isTouched)
      )
        return (
          i.isMoved && n.grabCursor && t.setGrabCursor(!1),
          (i.isMoved = !1),
          void (i.startMoving = !1)
        );
      n.grabCursor &&
        i.isMoved &&
        i.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      var c,
        d = k(),
        p = d - i.touchStartTime;
      if (
        (t.allowClick &&
          (t.updateClickedSlide(u),
          t.emit("tap click", u),
          p < 300 &&
            d - i.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", u)),
        (i.lastClickTime = k()),
        w(function () {
          t.destroyed || (t.allowClick = !0);
        }),
        !i.isTouched ||
          !i.isMoved ||
          !t.swipeDirection ||
          0 === a.diff ||
          i.currentTranslate === i.startTranslate)
      )
        return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
      if (
        ((i.isTouched = !1),
        (i.isMoved = !1),
        (i.startMoving = !1),
        (c = n.followFinger
          ? r
            ? t.translate
            : -t.translate
          : -i.currentTranslate),
        !n.cssMode)
      )
        if (n.freeMode) {
          if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
          if (c > -t.maxTranslate())
            return void (t.slides.length < l.length
              ? t.slideTo(l.length - 1)
              : t.slideTo(t.slides.length - 1));
          if (n.freeModeMomentum) {
            if (i.velocities.length > 1) {
              var h = i.velocities.pop(),
                f = i.velocities.pop(),
                v = h.position - f.position,
                m = h.time - f.time;
              (t.velocity = v / m),
                (t.velocity /= 2),
                Math.abs(t.velocity) < n.freeModeMinimumVelocity &&
                  (t.velocity = 0),
                (m > 150 || k() - h.time > 300) && (t.velocity = 0);
            } else t.velocity = 0;
            (t.velocity *= n.freeModeMomentumVelocityRatio),
              (i.velocities.length = 0);
            var g = 1e3 * n.freeModeMomentumRatio,
              y = t.velocity * g,
              b = t.translate + y;
            r && (b = -b);
            var x,
              E,
              T = !1,
              S = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
            if (b < t.maxTranslate())
              n.freeModeMomentumBounce
                ? (b + t.maxTranslate() < -S && (b = t.maxTranslate() - S),
                  (x = t.maxTranslate()),
                  (T = !0),
                  (i.allowMomentumBounce = !0))
                : (b = t.maxTranslate()),
                n.loop && n.centeredSlides && (E = !0);
            else if (b > t.minTranslate())
              n.freeModeMomentumBounce
                ? (b - t.minTranslate() > S && (b = t.minTranslate() + S),
                  (x = t.minTranslate()),
                  (T = !0),
                  (i.allowMomentumBounce = !0))
                : (b = t.minTranslate()),
                n.loop && n.centeredSlides && (E = !0);
            else if (n.freeModeSticky) {
              for (var C, M = 0; M < l.length; M += 1)
                if (l[M] > -b) {
                  C = M;
                  break;
                }
              b = -(b =
                Math.abs(l[C] - b) < Math.abs(l[C - 1] - b) ||
                "next" === t.swipeDirection
                  ? l[C]
                  : l[C - 1]);
            }
            if (
              (E &&
                t.once("transitionEnd", function () {
                  t.loopFix();
                }),
              0 !== t.velocity)
            ) {
              if (
                ((g = r
                  ? Math.abs((-b - t.translate) / t.velocity)
                  : Math.abs((b - t.translate) / t.velocity)),
                n.freeModeSticky)
              ) {
                var P = Math.abs((r ? -b : b) - t.translate),
                  O = t.slidesSizesGrid[t.activeIndex];
                g = P < O ? n.speed : P < 2 * O ? 1.5 * n.speed : 2.5 * n.speed;
              }
            } else if (n.freeModeSticky) return void t.slideToClosest();
            n.freeModeMomentumBounce && T
              ? (t.updateProgress(x),
                t.setTransition(g),
                t.setTranslate(b),
                t.transitionStart(!0, t.swipeDirection),
                (t.animating = !0),
                s.transitionEnd(function () {
                  t &&
                    !t.destroyed &&
                    i.allowMomentumBounce &&
                    (t.emit("momentumBounce"),
                    t.setTransition(n.speed),
                    setTimeout(function () {
                      t.setTranslate(x),
                        s.transitionEnd(function () {
                          t && !t.destroyed && t.transitionEnd();
                        });
                    }, 0));
                }))
              : t.velocity
              ? (t.updateProgress(b),
                t.setTransition(g),
                t.setTranslate(b),
                t.transitionStart(!0, t.swipeDirection),
                t.animating ||
                  ((t.animating = !0),
                  s.transitionEnd(function () {
                    t && !t.destroyed && t.transitionEnd();
                  })))
              : (t.emit("_freeModeNoMomentumRelease"), t.updateProgress(b)),
              t.updateActiveIndex(),
              t.updateSlidesClasses();
          } else {
            if (n.freeModeSticky) return void t.slideToClosest();
            n.freeMode && t.emit("_freeModeNoMomentumRelease");
          }
          (!n.freeModeMomentum || p >= n.longSwipesMs) &&
            (t.updateProgress(),
            t.updateActiveIndex(),
            t.updateSlidesClasses());
        } else {
          for (
            var A = 0, L = t.slidesSizesGrid[0], D = 0;
            D < o.length;
            D += D < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
          ) {
            var I = D < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
            void 0 !== o[D + I]
              ? c >= o[D] && c < o[D + I] && ((A = D), (L = o[D + I] - o[D]))
              : c >= o[D] && ((A = D), (L = o[o.length - 1] - o[o.length - 2]));
          }
          var j = (c - o[A]) / L,
            N = A < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
          if (p > n.longSwipesMs) {
            if (!n.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection &&
              (j >= n.longSwipesRatio ? t.slideTo(A + N) : t.slideTo(A)),
              "prev" === t.swipeDirection &&
                (j > 1 - n.longSwipesRatio ? t.slideTo(A + N) : t.slideTo(A));
          } else {
            if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
            t.navigation &&
            (u.target === t.navigation.nextEl ||
              u.target === t.navigation.prevEl)
              ? u.target === t.navigation.nextEl
                ? t.slideTo(A + N)
                : t.slideTo(A)
              : ("next" === t.swipeDirection && t.slideTo(A + N),
                "prev" === t.swipeDirection && t.slideTo(A));
          }
        }
    }
    function _() {
      var e = this.params,
        t = this.el;
      if (!t || 0 !== t.offsetWidth) {
        e.breakpoints && this.setBreakpoint();
        var i = this.allowSlideNext,
          n = this.allowSlidePrev,
          a = this.snapGrid;
        (this.allowSlideNext = !0),
          (this.allowSlidePrev = !0),
          this.updateSize(),
          this.updateSlides(),
          this.updateSlidesClasses(),
          ("auto" === e.slidesPerView || e.slidesPerView > 1) &&
          this.isEnd &&
          !this.isBeginning &&
          !this.params.centeredSlides
            ? this.slideTo(this.slides.length - 1, 0, !1, !0)
            : this.slideTo(this.activeIndex, 0, !1, !0),
          this.autoplay &&
            this.autoplay.running &&
            this.autoplay.paused &&
            this.autoplay.run(),
          (this.allowSlidePrev = n),
          (this.allowSlideNext = i),
          this.params.watchOverflow &&
            a !== this.snapGrid &&
            this.checkOverflow();
      }
    }
    function $(e) {
      this.allowClick ||
        (this.params.preventClicks && e.preventDefault(),
        this.params.preventClicksPropagation &&
          this.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation()));
    }
    function B() {
      var e = this.wrapperEl,
        t = this.rtlTranslate;
      (this.previousTranslate = this.translate),
        this.isHorizontal()
          ? (this.translate = t
              ? e.scrollWidth - e.offsetWidth - e.scrollLeft
              : -e.scrollLeft)
          : (this.translate = -e.scrollTop),
        -0 === this.translate && (this.translate = 0),
        this.updateActiveIndex(),
        this.updateSlidesClasses();
      var i = this.maxTranslate() - this.minTranslate();
      (0 === i ? 0 : (this.translate - this.minTranslate()) / i) !==
        this.progress &&
        this.updateProgress(t ? -this.translate : this.translate),
        this.emit("setTranslate", this.translate, !1);
    }
    var R = !1;
    function H() {}
    var F = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !1,
        nested: !1,
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: 0.02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      },
      G = {
        modular: {
          useParams: function (e) {
            var t = this;
            t.modules &&
              Object.keys(t.modules).forEach(function (i) {
                var n = t.modules[i];
                n.params && S(e, n.params);
              });
          },
          useModules: function (e) {
            void 0 === e && (e = {});
            var t = this;
            t.modules &&
              Object.keys(t.modules).forEach(function (i) {
                var n = t.modules[i],
                  a = e[i] || {};
                n.on &&
                  t.on &&
                  Object.keys(n.on).forEach(function (e) {
                    t.on(e, n.on[e]);
                  }),
                  n.create && n.create.bind(t)(a);
              });
          },
        },
        eventsEmitter: {
          on: function (e, t, i) {
            var n = this;
            if ("function" != typeof t) return n;
            var a = i ? "unshift" : "push";
            return (
              e.split(" ").forEach(function (e) {
                n.eventsListeners[e] || (n.eventsListeners[e] = []),
                  n.eventsListeners[e][a](t);
              }),
              n
            );
          },
          once: function (e, t, i) {
            var n = this;
            if ("function" != typeof t) return n;
            function a() {
              n.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
              for (
                var i = arguments.length, r = new Array(i), s = 0;
                s < i;
                s++
              )
                r[s] = arguments[s];
              t.apply(n, r);
            }
            return (a.__emitterProxy = t), n.on(e, a, i);
          },
          onAny: function (e, t) {
            if ("function" != typeof e) return this;
            var i = t ? "unshift" : "push";
            return (
              this.eventsAnyListeners.indexOf(e) < 0 &&
                this.eventsAnyListeners[i](e),
              this
            );
          },
          offAny: function (e) {
            if (!this.eventsAnyListeners) return this;
            var t = this.eventsAnyListeners.indexOf(e);
            return t >= 0 && this.eventsAnyListeners.splice(t, 1), this;
          },
          off: function (e, t) {
            var i = this;
            return i.eventsListeners
              ? (e.split(" ").forEach(function (e) {
                  void 0 === t
                    ? (i.eventsListeners[e] = [])
                    : i.eventsListeners[e] &&
                      i.eventsListeners[e].forEach(function (n, a) {
                        (n === t ||
                          (n.__emitterProxy && n.__emitterProxy === t)) &&
                          i.eventsListeners[e].splice(a, 1);
                      });
                }),
                i)
              : i;
          },
          emit: function () {
            var e,
              t,
              i,
              n = this;
            if (!n.eventsListeners) return n;
            for (var a = arguments.length, r = new Array(a), s = 0; s < a; s++)
              r[s] = arguments[s];
            "string" == typeof r[0] || Array.isArray(r[0])
              ? ((e = r[0]), (t = r.slice(1, r.length)), (i = n))
              : ((e = r[0].events), (t = r[0].data), (i = r[0].context || n)),
              t.unshift(i);
            var o = Array.isArray(e) ? e : e.split(" ");
            return (
              o.forEach(function (e) {
                n.eventsAnyListeners &&
                  n.eventsAnyListeners.length &&
                  n.eventsAnyListeners.forEach(function (n) {
                    n.apply(i, [e].concat(t));
                  }),
                  n.eventsListeners &&
                    n.eventsListeners[e] &&
                    n.eventsListeners[e].forEach(function (e) {
                      e.apply(i, t);
                    });
              }),
              n
            );
          },
        },
        update: {
          updateSize: function () {
            var e,
              t,
              i = this.$el;
            (e =
              void 0 !== this.params.width && null !== this.params.width
                ? this.params.width
                : i[0].clientWidth),
              (t =
                void 0 !== this.params.height && null !== this.params.height
                  ? this.params.height
                  : i[0].clientHeight),
              (0 === e && this.isHorizontal()) ||
                (0 === t && this.isVertical()) ||
                ((e =
                  e -
                  parseInt(i.css("padding-left") || 0, 10) -
                  parseInt(i.css("padding-right") || 0, 10)),
                (t =
                  t -
                  parseInt(i.css("padding-top") || 0, 10) -
                  parseInt(i.css("padding-bottom") || 0, 10)),
                Number.isNaN(e) && (e = 0),
                Number.isNaN(t) && (t = 0),
                S(this, {
                  width: e,
                  height: t,
                  size: this.isHorizontal() ? e : t,
                }));
          },
          updateSlides: function () {
            var e = this,
              t = function (t) {
                return e.isHorizontal()
                  ? t
                  : {
                      width: "height",
                      "margin-top": "margin-left",
                      "margin-bottom ": "margin-right",
                      "margin-left": "margin-top",
                      "margin-right": "margin-bottom",
                      "padding-left": "padding-top",
                      "padding-right": "padding-bottom",
                      marginRight: "marginBottom",
                    }[t];
              },
              i = function (e, i) {
                return parseFloat(e.getPropertyValue(t(i)) || 0);
              },
              n = e.params,
              a = e.$wrapperEl,
              r = e.size,
              s = e.rtlTranslate,
              o = e.wrongRTL,
              l = e.virtual && n.virtual.enabled,
              u = l ? e.virtual.slides.length : e.slides.length,
              c = a.children("." + e.params.slideClass),
              d = l ? e.virtual.slides.length : c.length,
              p = [],
              h = [],
              f = [],
              v = n.slidesOffsetBefore;
            "function" == typeof v && (v = n.slidesOffsetBefore.call(e));
            var m = n.slidesOffsetAfter;
            "function" == typeof m && (m = n.slidesOffsetAfter.call(e));
            var g = e.snapGrid.length,
              y = e.slidesGrid.length,
              b = n.spaceBetween,
              x = -v,
              w = 0,
              k = 0;
            if (void 0 !== r) {
              var E, T;
              "string" == typeof b &&
                b.indexOf("%") >= 0 &&
                (b = (parseFloat(b.replace("%", "")) / 100) * r),
                (e.virtualSize = -b),
                s
                  ? c.css({ marginLeft: "", marginTop: "" })
                  : c.css({ marginRight: "", marginBottom: "" }),
                n.slidesPerColumn > 1 &&
                  ((E =
                    Math.floor(d / n.slidesPerColumn) ===
                    d / e.params.slidesPerColumn
                      ? d
                      : Math.ceil(d / n.slidesPerColumn) * n.slidesPerColumn),
                  "auto" !== n.slidesPerView &&
                    "row" === n.slidesPerColumnFill &&
                    (E = Math.max(E, n.slidesPerView * n.slidesPerColumn)));
              for (
                var C,
                  M,
                  P,
                  O = n.slidesPerColumn,
                  A = E / O,
                  L = Math.floor(d / n.slidesPerColumn),
                  D = 0;
                D < d;
                D += 1
              ) {
                T = 0;
                var I = c.eq(D);
                if (n.slidesPerColumn > 1) {
                  var j = void 0,
                    N = void 0,
                    z = void 0;
                  if ("row" === n.slidesPerColumnFill && n.slidesPerGroup > 1) {
                    var _ = Math.floor(
                        D / (n.slidesPerGroup * n.slidesPerColumn)
                      ),
                      $ = D - n.slidesPerColumn * n.slidesPerGroup * _,
                      B =
                        0 === _
                          ? n.slidesPerGroup
                          : Math.min(
                              Math.ceil((d - _ * O * n.slidesPerGroup) / O),
                              n.slidesPerGroup
                            );
                    (j =
                      (N =
                        $ -
                        (z = Math.floor($ / B)) * B +
                        _ * n.slidesPerGroup) +
                      (z * E) / O),
                      I.css({
                        "-webkit-box-ordinal-group": j,
                        "-moz-box-ordinal-group": j,
                        "-ms-flex-order": j,
                        "-webkit-order": j,
                        order: j,
                      });
                  } else
                    "column" === n.slidesPerColumnFill
                      ? ((z = D - (N = Math.floor(D / O)) * O),
                        (N > L || (N === L && z === O - 1)) &&
                          (z += 1) >= O &&
                          ((z = 0), (N += 1)))
                      : (N = D - (z = Math.floor(D / A)) * A);
                  I.css(
                    t("margin-top"),
                    0 !== z && n.spaceBetween && n.spaceBetween + "px"
                  );
                }
                if ("none" !== I.css("display")) {
                  if ("auto" === n.slidesPerView) {
                    var R = getComputedStyle(I[0]),
                      H = I[0].style.transform,
                      F = I[0].style.webkitTransform;
                    if (
                      (H && (I[0].style.transform = "none"),
                      F && (I[0].style.webkitTransform = "none"),
                      n.roundLengths)
                    )
                      T = e.isHorizontal()
                        ? I.outerWidth(!0)
                        : I.outerHeight(!0);
                    else {
                      var G = i(R, "width"),
                        q = i(R, "padding-left"),
                        V = i(R, "padding-right"),
                        W = i(R, "margin-left"),
                        X = i(R, "margin-right"),
                        Y = R.getPropertyValue("box-sizing");
                      if (Y && "border-box" === Y) T = G + W + X;
                      else {
                        var U = I[0],
                          K = U.clientWidth;
                        T = G + q + V + W + X + (U.offsetWidth - K);
                      }
                    }
                    H && (I[0].style.transform = H),
                      F && (I[0].style.webkitTransform = F),
                      n.roundLengths && (T = Math.floor(T));
                  } else
                    (T = (r - (n.slidesPerView - 1) * b) / n.slidesPerView),
                      n.roundLengths && (T = Math.floor(T)),
                      c[D] && (c[D].style[t("width")] = T + "px");
                  c[D] && (c[D].swiperSlideSize = T),
                    f.push(T),
                    n.centeredSlides
                      ? ((x = x + T / 2 + w / 2 + b),
                        0 === w && 0 !== D && (x = x - r / 2 - b),
                        0 === D && (x = x - r / 2 - b),
                        Math.abs(x) < 0.001 && (x = 0),
                        n.roundLengths && (x = Math.floor(x)),
                        k % n.slidesPerGroup == 0 && p.push(x),
                        h.push(x))
                      : (n.roundLengths && (x = Math.floor(x)),
                        (k - Math.min(e.params.slidesPerGroupSkip, k)) %
                          e.params.slidesPerGroup ==
                          0 && p.push(x),
                        h.push(x),
                        (x = x + T + b)),
                    (e.virtualSize += T + b),
                    (w = T),
                    (k += 1);
                }
              }
              if (
                ((e.virtualSize = Math.max(e.virtualSize, r) + m),
                s &&
                  o &&
                  ("slide" === n.effect || "coverflow" === n.effect) &&
                  a.css({ width: e.virtualSize + n.spaceBetween + "px" }),
                n.setWrapperSize)
              )
                a.css(
                  (((M = {})[t("width")] =
                    e.virtualSize + n.spaceBetween + "px"),
                  M)
                );
              if (n.slidesPerColumn > 1)
                if (
                  ((e.virtualSize = (T + n.spaceBetween) * E),
                  (e.virtualSize =
                    Math.ceil(e.virtualSize / n.slidesPerColumn) -
                    n.spaceBetween),
                  a.css(
                    (((P = {})[t("width")] =
                      e.virtualSize + n.spaceBetween + "px"),
                    P)
                  ),
                  n.centeredSlides)
                ) {
                  C = [];
                  for (var Q = 0; Q < p.length; Q += 1) {
                    var Z = p[Q];
                    n.roundLengths && (Z = Math.floor(Z)),
                      p[Q] < e.virtualSize + p[0] && C.push(Z);
                  }
                  p = C;
                }
              if (!n.centeredSlides) {
                C = [];
                for (var J = 0; J < p.length; J += 1) {
                  var ee = p[J];
                  n.roundLengths && (ee = Math.floor(ee)),
                    p[J] <= e.virtualSize - r && C.push(ee);
                }
                (p = C),
                  Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) >
                    1 && p.push(e.virtualSize - r);
              }
              if ((0 === p.length && (p = [0]), 0 !== n.spaceBetween)) {
                var te,
                  ie = e.isHorizontal() && s ? "marginLeft" : t("marginRight");
                c.filter(function (e, t) {
                  return !n.cssMode || t !== c.length - 1;
                }).css((((te = {})[ie] = b + "px"), te));
              }
              if (n.centeredSlides && n.centeredSlidesBounds) {
                var ne = 0;
                f.forEach(function (e) {
                  ne += e + (n.spaceBetween ? n.spaceBetween : 0);
                });
                var ae = (ne -= n.spaceBetween) - r;
                p = p.map(function (e) {
                  return e < 0 ? -v : e > ae ? ae + m : e;
                });
              }
              if (n.centerInsufficientSlides) {
                var re = 0;
                if (
                  (f.forEach(function (e) {
                    re += e + (n.spaceBetween ? n.spaceBetween : 0);
                  }),
                  (re -= n.spaceBetween) < r)
                ) {
                  var se = (r - re) / 2;
                  p.forEach(function (e, t) {
                    p[t] = e - se;
                  }),
                    h.forEach(function (e, t) {
                      h[t] = e + se;
                    });
                }
              }
              S(e, {
                slides: c,
                snapGrid: p,
                slidesGrid: h,
                slidesSizesGrid: f,
              }),
                d !== u && e.emit("slidesLengthChange"),
                p.length !== g &&
                  (e.params.watchOverflow && e.checkOverflow(),
                  e.emit("snapGridLengthChange")),
                h.length !== y && e.emit("slidesGridLengthChange"),
                (n.watchSlidesProgress || n.watchSlidesVisibility) &&
                  e.updateSlidesOffset();
            }
          },
          updateAutoHeight: function (e) {
            var t,
              i = [],
              n = 0;
            if (
              ("number" == typeof e
                ? this.setTransition(e)
                : !0 === e && this.setTransition(this.params.speed),
              "auto" !== this.params.slidesPerView &&
                this.params.slidesPerView > 1)
            )
              if (this.params.centeredSlides)
                this.visibleSlides.each(function (e) {
                  i.push(e);
                });
              else
                for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                  var a = this.activeIndex + t;
                  if (a > this.slides.length) break;
                  i.push(this.slides.eq(a)[0]);
                }
            else i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
              if (void 0 !== i[t]) {
                var r = i[t].offsetHeight;
                n = r > n ? r : n;
              }
            n && this.$wrapperEl.css("height", n + "px");
          },
          updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1)
              e[t].swiperSlideOffset = this.isHorizontal()
                ? e[t].offsetLeft
                : e[t].offsetTop;
          },
          updateSlidesProgress: function (e) {
            void 0 === e && (e = (this && this.translate) || 0);
            var t = this.params,
              i = this.slides,
              n = this.rtlTranslate;
            if (0 !== i.length) {
              void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
              var a = -e;
              n && (a = e),
                i.removeClass(t.slideVisibleClass),
                (this.visibleSlidesIndexes = []),
                (this.visibleSlides = []);
              for (var r = 0; r < i.length; r += 1) {
                var s = i[r],
                  o =
                    (a +
                      (t.centeredSlides ? this.minTranslate() : 0) -
                      s.swiperSlideOffset) /
                    (s.swiperSlideSize + t.spaceBetween);
                if (
                  t.watchSlidesVisibility ||
                  (t.centeredSlides && t.autoHeight)
                ) {
                  var l = -(a - s.swiperSlideOffset),
                    u = l + this.slidesSizesGrid[r];
                  ((l >= 0 && l < this.size - 1) ||
                    (u > 1 && u <= this.size) ||
                    (l <= 0 && u >= this.size)) &&
                    (this.visibleSlides.push(s),
                    this.visibleSlidesIndexes.push(r),
                    i.eq(r).addClass(t.slideVisibleClass));
                }
                s.progress = n ? -o : o;
              }
              this.visibleSlides = m(this.visibleSlides);
            }
          },
          updateProgress: function (e) {
            if (void 0 === e) {
              var t = this.rtlTranslate ? -1 : 1;
              e = (this && this.translate && this.translate * t) || 0;
            }
            var i = this.params,
              n = this.maxTranslate() - this.minTranslate(),
              a = this.progress,
              r = this.isBeginning,
              s = this.isEnd,
              o = r,
              l = s;
            0 === n
              ? ((a = 0), (r = !0), (s = !0))
              : ((r = (a = (e - this.minTranslate()) / n) <= 0), (s = a >= 1)),
              S(this, { progress: a, isBeginning: r, isEnd: s }),
              (i.watchSlidesProgress ||
                i.watchSlidesVisibility ||
                (i.centeredSlides && i.autoHeight)) &&
                this.updateSlidesProgress(e),
              r && !o && this.emit("reachBeginning toEdge"),
              s && !l && this.emit("reachEnd toEdge"),
              ((o && !r) || (l && !s)) && this.emit("fromEdge"),
              this.emit("progress", a);
          },
          updateSlidesClasses: function () {
            var e,
              t = this.slides,
              i = this.params,
              n = this.$wrapperEl,
              a = this.activeIndex,
              r = this.realIndex,
              s = this.virtual && i.virtual.enabled;
            t.removeClass(
              i.slideActiveClass +
                " " +
                i.slideNextClass +
                " " +
                i.slidePrevClass +
                " " +
                i.slideDuplicateActiveClass +
                " " +
                i.slideDuplicateNextClass +
                " " +
                i.slideDuplicatePrevClass
            ),
              (e = s
                ? this.$wrapperEl.find(
                    "." + i.slideClass + '[data-swiper-slide-index="' + a + '"]'
                  )
                : t.eq(a)).addClass(i.slideActiveClass),
              i.loop &&
                (e.hasClass(i.slideDuplicateClass)
                  ? n
                      .children(
                        "." +
                          i.slideClass +
                          ":not(." +
                          i.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          r +
                          '"]'
                      )
                      .addClass(i.slideDuplicateActiveClass)
                  : n
                      .children(
                        "." +
                          i.slideClass +
                          "." +
                          i.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          r +
                          '"]'
                      )
                      .addClass(i.slideDuplicateActiveClass));
            var o = e
              .nextAll("." + i.slideClass)
              .eq(0)
              .addClass(i.slideNextClass);
            i.loop &&
              0 === o.length &&
              (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e
              .prevAll("." + i.slideClass)
              .eq(0)
              .addClass(i.slidePrevClass);
            i.loop &&
              0 === l.length &&
              (l = t.eq(-1)).addClass(i.slidePrevClass),
              i.loop &&
                (o.hasClass(i.slideDuplicateClass)
                  ? n
                      .children(
                        "." +
                          i.slideClass +
                          ":not(." +
                          i.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          o.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(i.slideDuplicateNextClass)
                  : n
                      .children(
                        "." +
                          i.slideClass +
                          "." +
                          i.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          o.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(i.slideDuplicateNextClass),
                l.hasClass(i.slideDuplicateClass)
                  ? n
                      .children(
                        "." +
                          i.slideClass +
                          ":not(." +
                          i.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          l.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(i.slideDuplicatePrevClass)
                  : n
                      .children(
                        "." +
                          i.slideClass +
                          "." +
                          i.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          l.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(i.slideDuplicatePrevClass)),
              this.emitSlidesClasses();
          },
          updateActiveIndex: function (e) {
            var t,
              i = this.rtlTranslate ? this.translate : -this.translate,
              n = this.slidesGrid,
              a = this.snapGrid,
              r = this.params,
              s = this.activeIndex,
              o = this.realIndex,
              l = this.snapIndex,
              u = e;
            if (void 0 === u) {
              for (var c = 0; c < n.length; c += 1)
                void 0 !== n[c + 1]
                  ? i >= n[c] && i < n[c + 1] - (n[c + 1] - n[c]) / 2
                    ? (u = c)
                    : i >= n[c] && i < n[c + 1] && (u = c + 1)
                  : i >= n[c] && (u = c);
              r.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0);
            }
            if (a.indexOf(i) >= 0) t = a.indexOf(i);
            else {
              var d = Math.min(r.slidesPerGroupSkip, u);
              t = d + Math.floor((u - d) / r.slidesPerGroup);
            }
            if ((t >= a.length && (t = a.length - 1), u !== s)) {
              var p = parseInt(
                this.slides.eq(u).attr("data-swiper-slide-index") || u,
                10
              );
              S(this, {
                snapIndex: t,
                realIndex: p,
                previousIndex: s,
                activeIndex: u,
              }),
                this.emit("activeIndexChange"),
                this.emit("snapIndexChange"),
                o !== p && this.emit("realIndexChange"),
                (this.initialized || this.params.runCallbacksOnInit) &&
                  this.emit("slideChange");
            } else
              t !== l && ((this.snapIndex = t), this.emit("snapIndexChange"));
          },
          updateClickedSlide: function (e) {
            var t,
              i = this.params,
              n = m(e.target).closest("." + i.slideClass)[0],
              a = !1;
            if (n)
              for (var r = 0; r < this.slides.length; r += 1)
                if (this.slides[r] === n) {
                  (a = !0), (t = r);
                  break;
                }
            if (!n || !a)
              return (
                (this.clickedSlide = void 0), void (this.clickedIndex = void 0)
              );
            (this.clickedSlide = n),
              this.virtual && this.params.virtual.enabled
                ? (this.clickedIndex = parseInt(
                    m(n).attr("data-swiper-slide-index"),
                    10
                  ))
                : (this.clickedIndex = t),
              i.slideToClickedSlide &&
                void 0 !== this.clickedIndex &&
                this.clickedIndex !== this.activeIndex &&
                this.slideToClickedSlide();
          },
        },
        translate: {
          getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
              i = this.rtlTranslate,
              n = this.translate,
              a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -n : n;
            if (t.cssMode) return n;
            var r = E(a[0], e);
            return i && (r = -r), r || 0;
          },
          setTranslate: function (e, t) {
            var i = this.rtlTranslate,
              n = this.params,
              a = this.$wrapperEl,
              r = this.wrapperEl,
              s = this.progress,
              o = 0,
              l = 0;
            this.isHorizontal() ? (o = i ? -e : e) : (l = e),
              n.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
              n.cssMode
                ? (r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                    this.isHorizontal() ? -o : -l)
                : n.virtualTranslate ||
                  a.transform("translate3d(" + o + "px, " + l + "px, 0px)"),
              (this.previousTranslate = this.translate),
              (this.translate = this.isHorizontal() ? o : l);
            var u = this.maxTranslate() - this.minTranslate();
            (0 === u ? 0 : (e - this.minTranslate()) / u) !== s &&
              this.updateProgress(e),
              this.emit("setTranslate", this.translate, t);
          },
          minTranslate: function () {
            return -this.snapGrid[0];
          },
          maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
          },
          translateTo: function (e, t, i, n, a) {
            void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === i && (i = !0),
              void 0 === n && (n = !0);
            var r = this,
              s = r.params,
              o = r.wrapperEl;
            if (r.animating && s.preventInteractionOnTransition) return !1;
            var l,
              u = r.minTranslate(),
              c = r.maxTranslate();
            if (
              ((l = n && e > u ? u : n && e < c ? c : e),
              r.updateProgress(l),
              s.cssMode)
            ) {
              var d,
                p = r.isHorizontal();
              if (0 === t) o[p ? "scrollLeft" : "scrollTop"] = -l;
              else if (o.scrollTo)
                o.scrollTo(
                  (((d = {})[p ? "left" : "top"] = -l),
                  (d.behavior = "smooth"),
                  d)
                );
              else o[p ? "scrollLeft" : "scrollTop"] = -l;
              return !0;
            }
            return (
              0 === t
                ? (r.setTransition(0),
                  r.setTranslate(l),
                  i &&
                    (r.emit("beforeTransitionStart", t, a),
                    r.emit("transitionEnd")))
                : (r.setTransition(t),
                  r.setTranslate(l),
                  i &&
                    (r.emit("beforeTransitionStart", t, a),
                    r.emit("transitionStart")),
                  r.animating ||
                    ((r.animating = !0),
                    r.onTranslateToWrapperTransitionEnd ||
                      (r.onTranslateToWrapperTransitionEnd = function (e) {
                        r &&
                          !r.destroyed &&
                          e.target === this &&
                          (r.$wrapperEl[0].removeEventListener(
                            "transitionend",
                            r.onTranslateToWrapperTransitionEnd
                          ),
                          r.$wrapperEl[0].removeEventListener(
                            "webkitTransitionEnd",
                            r.onTranslateToWrapperTransitionEnd
                          ),
                          (r.onTranslateToWrapperTransitionEnd = null),
                          delete r.onTranslateToWrapperTransitionEnd,
                          i && r.emit("transitionEnd"));
                      }),
                    r.$wrapperEl[0].addEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].addEventListener(
                      "webkitTransitionEnd",
                      r.onTranslateToWrapperTransitionEnd
                    ))),
              !0
            );
          },
        },
        transition: {
          setTransition: function (e, t) {
            this.params.cssMode || this.$wrapperEl.transition(e),
              this.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
              n = this.params,
              a = this.previousIndex;
            if (!n.cssMode) {
              n.autoHeight && this.updateAutoHeight();
              var r = t;
              if (
                (r || (r = i > a ? "next" : i < a ? "prev" : "reset"),
                this.emit("transitionStart"),
                e && i !== a)
              ) {
                if ("reset" === r)
                  return void this.emit("slideResetTransitionStart");
                this.emit("slideChangeTransitionStart"),
                  "next" === r
                    ? this.emit("slideNextTransitionStart")
                    : this.emit("slidePrevTransitionStart");
              }
            }
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
              n = this.previousIndex,
              a = this.params;
            if (((this.animating = !1), !a.cssMode)) {
              this.setTransition(0);
              var r = t;
              if (
                (r || (r = i > n ? "next" : i < n ? "prev" : "reset"),
                this.emit("transitionEnd"),
                e && i !== n)
              ) {
                if ("reset" === r)
                  return void this.emit("slideResetTransitionEnd");
                this.emit("slideChangeTransitionEnd"),
                  "next" === r
                    ? this.emit("slideNextTransitionEnd")
                    : this.emit("slidePrevTransitionEnd");
              }
            }
          },
        },
        slide: {
          slideTo: function (e, t, i, n) {
            if (
              (void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === i && (i = !0),
              "number" != typeof e && "string" != typeof e)
            )
              throw new Error(
                "The 'index' argument cannot have type other than 'number' or 'string'. [" +
                  typeof e +
                  "] given."
              );
            if ("string" == typeof e) {
              var a = parseInt(e, 10);
              if (!isFinite(a))
                throw new Error(
                  "The passed-in 'index' (string) couldn't be converted to 'number'. [" +
                    e +
                    "] given."
                );
              e = a;
            }
            var r = this,
              s = e;
            s < 0 && (s = 0);
            var o = r.params,
              l = r.snapGrid,
              u = r.slidesGrid,
              c = r.previousIndex,
              d = r.activeIndex,
              p = r.rtlTranslate,
              h = r.wrapperEl;
            if (r.animating && o.preventInteractionOnTransition) return !1;
            var f = Math.min(r.params.slidesPerGroupSkip, s),
              v = f + Math.floor((s - f) / r.params.slidesPerGroup);
            v >= l.length && (v = l.length - 1),
              (d || o.initialSlide || 0) === (c || 0) &&
                i &&
                r.emit("beforeSlideChangeStart");
            var m,
              g = -l[v];
            if ((r.updateProgress(g), o.normalizeSlideIndex))
              for (var y = 0; y < u.length; y += 1) {
                var b = -Math.floor(100 * g),
                  x = Math.floor(100 * u[y]),
                  w = Math.floor(100 * u[y + 1]);
                void 0 !== u[y + 1]
                  ? b >= x && b < w - (w - x) / 2
                    ? (s = y)
                    : b >= x && b < w && (s = y + 1)
                  : b >= x && (s = y);
              }
            if (r.initialized && s !== d) {
              if (!r.allowSlideNext && g < r.translate && g < r.minTranslate())
                return !1;
              if (
                !r.allowSlidePrev &&
                g > r.translate &&
                g > r.maxTranslate() &&
                (d || 0) !== s
              )
                return !1;
            }
            if (
              ((m = s > d ? "next" : s < d ? "prev" : "reset"),
              (p && -g === r.translate) || (!p && g === r.translate))
            )
              return (
                r.updateActiveIndex(s),
                o.autoHeight && r.updateAutoHeight(),
                r.updateSlidesClasses(),
                "slide" !== o.effect && r.setTranslate(g),
                "reset" !== m &&
                  (r.transitionStart(i, m), r.transitionEnd(i, m)),
                !1
              );
            if (o.cssMode) {
              var k,
                E = r.isHorizontal(),
                T = -g;
              if ((p && (T = h.scrollWidth - h.offsetWidth - T), 0 === t))
                h[E ? "scrollLeft" : "scrollTop"] = T;
              else if (h.scrollTo)
                h.scrollTo(
                  (((k = {})[E ? "left" : "top"] = T),
                  (k.behavior = "smooth"),
                  k)
                );
              else h[E ? "scrollLeft" : "scrollTop"] = T;
              return !0;
            }
            return (
              0 === t
                ? (r.setTransition(0),
                  r.setTranslate(g),
                  r.updateActiveIndex(s),
                  r.updateSlidesClasses(),
                  r.emit("beforeTransitionStart", t, n),
                  r.transitionStart(i, m),
                  r.transitionEnd(i, m))
                : (r.setTransition(t),
                  r.setTranslate(g),
                  r.updateActiveIndex(s),
                  r.updateSlidesClasses(),
                  r.emit("beforeTransitionStart", t, n),
                  r.transitionStart(i, m),
                  r.animating ||
                    ((r.animating = !0),
                    r.onSlideToWrapperTransitionEnd ||
                      (r.onSlideToWrapperTransitionEnd = function (e) {
                        r &&
                          !r.destroyed &&
                          e.target === this &&
                          (r.$wrapperEl[0].removeEventListener(
                            "transitionend",
                            r.onSlideToWrapperTransitionEnd
                          ),
                          r.$wrapperEl[0].removeEventListener(
                            "webkitTransitionEnd",
                            r.onSlideToWrapperTransitionEnd
                          ),
                          (r.onSlideToWrapperTransitionEnd = null),
                          delete r.onSlideToWrapperTransitionEnd,
                          r.transitionEnd(i, m));
                      }),
                    r.$wrapperEl[0].addEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].addEventListener(
                      "webkitTransitionEnd",
                      r.onSlideToWrapperTransitionEnd
                    ))),
              !0
            );
          },
          slideToLoop: function (e, t, i, n) {
            void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === i && (i = !0);
            var a = e;
            return (
              this.params.loop && (a += this.loopedSlides),
              this.slideTo(a, t, i, n)
            );
          },
          slideNext: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this.params,
              a = this.animating,
              r =
                this.activeIndex < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup;
            if (n.loop) {
              if (a && n.loopPreventsSlide) return !1;
              this.loopFix(),
                (this._clientLeft = this.$wrapperEl[0].clientLeft);
            }
            return this.slideTo(this.activeIndex + r, e, t, i);
          },
          slidePrev: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this.params,
              a = this.animating,
              r = this.snapGrid,
              s = this.slidesGrid,
              o = this.rtlTranslate;
            if (n.loop) {
              if (a && n.loopPreventsSlide) return !1;
              this.loopFix(),
                (this._clientLeft = this.$wrapperEl[0].clientLeft);
            }
            function l(e) {
              return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            var u = l(o ? this.translate : -this.translate),
              c = r.map(function (e) {
                return l(e);
              });
            r[c.indexOf(u)];
            var d,
              p = r[c.indexOf(u) - 1];
            return (
              void 0 === p &&
                n.cssMode &&
                r.forEach(function (e) {
                  !p && u >= e && (p = e);
                }),
              void 0 !== p &&
                (d = s.indexOf(p)) < 0 &&
                (d = this.activeIndex - 1),
              this.slideTo(d, e, t, i)
            );
          },
          slideReset: function (e, t, i) {
            return (
              void 0 === e && (e = this.params.speed),
              void 0 === t && (t = !0),
              this.slideTo(this.activeIndex, e, t, i)
            );
          },
          slideToClosest: function (e, t, i, n) {
            void 0 === e && (e = this.params.speed),
              void 0 === t && (t = !0),
              void 0 === n && (n = 0.5);
            var a = this.activeIndex,
              r = Math.min(this.params.slidesPerGroupSkip, a),
              s = r + Math.floor((a - r) / this.params.slidesPerGroup),
              o = this.rtlTranslate ? this.translate : -this.translate;
            if (o >= this.snapGrid[s]) {
              var l = this.snapGrid[s];
              o - l > (this.snapGrid[s + 1] - l) * n &&
                (a += this.params.slidesPerGroup);
            } else {
              var u = this.snapGrid[s - 1];
              o - u <= (this.snapGrid[s] - u) * n &&
                (a -= this.params.slidesPerGroup);
            }
            return (
              (a = Math.max(a, 0)),
              (a = Math.min(a, this.slidesGrid.length - 1)),
              this.slideTo(a, e, t, i)
            );
          },
          slideToClickedSlide: function () {
            var e,
              t = this,
              i = t.params,
              n = t.$wrapperEl,
              a =
                "auto" === i.slidesPerView
                  ? t.slidesPerViewDynamic()
                  : i.slidesPerView,
              r = t.clickedIndex;
            if (i.loop) {
              if (t.animating) return;
              (e = parseInt(
                m(t.clickedSlide).attr("data-swiper-slide-index"),
                10
              )),
                i.centeredSlides
                  ? r < t.loopedSlides - a / 2 ||
                    r > t.slides.length - t.loopedSlides + a / 2
                    ? (t.loopFix(),
                      (r = n
                        .children(
                          "." +
                            i.slideClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            i.slideDuplicateClass +
                            ")"
                        )
                        .eq(0)
                        .index()),
                      w(function () {
                        t.slideTo(r);
                      }))
                    : t.slideTo(r)
                  : r > t.slides.length - a
                  ? (t.loopFix(),
                    (r = n
                      .children(
                        "." +
                          i.slideClass +
                          '[data-swiper-slide-index="' +
                          e +
                          '"]:not(.' +
                          i.slideDuplicateClass +
                          ")"
                      )
                      .eq(0)
                      .index()),
                    w(function () {
                      t.slideTo(r);
                    }))
                  : t.slideTo(r);
            } else t.slideTo(r);
          },
        },
        loop: {
          loopCreate: function () {
            var e = this,
              t = r(),
              i = e.params,
              n = e.$wrapperEl;
            n.children(
              "." + i.slideClass + "." + i.slideDuplicateClass
            ).remove();
            var a = n.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
              var s = i.slidesPerGroup - (a.length % i.slidesPerGroup);
              if (s !== i.slidesPerGroup) {
                for (var o = 0; o < s; o += 1) {
                  var l = m(t.createElement("div")).addClass(
                    i.slideClass + " " + i.slideBlankClass
                  );
                  n.append(l);
                }
                a = n.children("." + i.slideClass);
              }
            }
            "auto" !== i.slidesPerView ||
              i.loopedSlides ||
              (i.loopedSlides = a.length),
              (e.loopedSlides = Math.ceil(
                parseFloat(i.loopedSlides || i.slidesPerView, 10)
              )),
              (e.loopedSlides += i.loopAdditionalSlides),
              e.loopedSlides > a.length && (e.loopedSlides = a.length);
            var u = [],
              c = [];
            a.each(function (t, i) {
              var n = m(t);
              i < e.loopedSlides && c.push(t),
                i < a.length && i >= a.length - e.loopedSlides && u.push(t),
                n.attr("data-swiper-slide-index", i);
            });
            for (var d = 0; d < c.length; d += 1)
              n.append(m(c[d].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var p = u.length - 1; p >= 0; p -= 1)
              n.prepend(m(u[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
          },
          loopFix: function () {
            this.emit("beforeLoopFix");
            var e,
              t = this.activeIndex,
              i = this.slides,
              n = this.loopedSlides,
              a = this.allowSlidePrev,
              r = this.allowSlideNext,
              s = this.snapGrid,
              o = this.rtlTranslate;
            (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
            var l = -s[t] - this.getTranslate();
            if (t < n)
              (e = i.length - 3 * n + t),
                (e += n),
                this.slideTo(e, 0, !1, !0) &&
                  0 !== l &&
                  this.setTranslate((o ? -this.translate : this.translate) - l);
            else if (t >= i.length - n) {
              (e = -i.length + t + n),
                (e += n),
                this.slideTo(e, 0, !1, !0) &&
                  0 !== l &&
                  this.setTranslate((o ? -this.translate : this.translate) - l);
            }
            (this.allowSlidePrev = a),
              (this.allowSlideNext = r),
              this.emit("loopFix");
          },
          loopDestroy: function () {
            var e = this.$wrapperEl,
              t = this.params,
              i = this.slides;
            e
              .children(
                "." +
                  t.slideClass +
                  "." +
                  t.slideDuplicateClass +
                  ",." +
                  t.slideClass +
                  "." +
                  t.slideBlankClass
              )
              .remove(),
              i.removeAttr("data-swiper-slide-index");
          },
        },
        grabCursor: {
          setGrabCursor: function (e) {
            if (
              !(
                this.support.touch ||
                !this.params.simulateTouch ||
                (this.params.watchOverflow && this.isLocked) ||
                this.params.cssMode
              )
            ) {
              var t = this.el;
              (t.style.cursor = "move"),
                (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                (t.style.cursor = e ? "grabbing" : "grab");
            }
          },
          unsetGrabCursor: function () {
            this.support.touch ||
              (this.params.watchOverflow && this.isLocked) ||
              this.params.cssMode ||
              (this.el.style.cursor = "");
          },
        },
        manipulation: {
          appendSlide: function (e) {
            var t = this.$wrapperEl,
              i = this.params;
            if (
              (i.loop && this.loopDestroy(),
              "object" == typeof e && "length" in e)
            )
              for (var n = 0; n < e.length; n += 1) e[n] && t.append(e[n]);
            else t.append(e);
            i.loop && this.loopCreate(),
              (i.observer && this.support.observer) || this.update();
          },
          prependSlide: function (e) {
            var t = this.params,
              i = this.$wrapperEl,
              n = this.activeIndex;
            t.loop && this.loopDestroy();
            var a = n + 1;
            if ("object" == typeof e && "length" in e) {
              for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
              a = n + e.length;
            } else i.prepend(e);
            t.loop && this.loopCreate(),
              (t.observer && this.support.observer) || this.update(),
              this.slideTo(a, 0, !1);
          },
          addSlide: function (e, t) {
            var i = this.$wrapperEl,
              n = this.params,
              a = this.activeIndex;
            n.loop &&
              ((a -= this.loopedSlides),
              this.loopDestroy(),
              (this.slides = i.children("." + n.slideClass)));
            var r = this.slides.length;
            if (e <= 0) this.prependSlide(t);
            else if (e >= r) this.appendSlide(t);
            else {
              for (
                var s = a > e ? a + 1 : a, o = [], l = r - 1;
                l >= e;
                l -= 1
              ) {
                var u = this.slides.eq(l);
                u.remove(), o.unshift(u);
              }
              if ("object" == typeof t && "length" in t) {
                for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
                s = a > e ? a + t.length : a;
              } else i.append(t);
              for (var d = 0; d < o.length; d += 1) i.append(o[d]);
              n.loop && this.loopCreate(),
                (n.observer && this.support.observer) || this.update(),
                n.loop
                  ? this.slideTo(s + this.loopedSlides, 0, !1)
                  : this.slideTo(s, 0, !1);
            }
          },
          removeSlide: function (e) {
            var t = this.params,
              i = this.$wrapperEl,
              n = this.activeIndex;
            t.loop &&
              ((n -= this.loopedSlides),
              this.loopDestroy(),
              (this.slides = i.children("." + t.slideClass)));
            var a,
              r = n;
            if ("object" == typeof e && "length" in e) {
              for (var s = 0; s < e.length; s += 1)
                (a = e[s]),
                  this.slides[a] && this.slides.eq(a).remove(),
                  a < r && (r -= 1);
              r = Math.max(r, 0);
            } else
              (a = e),
                this.slides[a] && this.slides.eq(a).remove(),
                a < r && (r -= 1),
                (r = Math.max(r, 0));
            t.loop && this.loopCreate(),
              (t.observer && this.support.observer) || this.update(),
              t.loop
                ? this.slideTo(r + this.loopedSlides, 0, !1)
                : this.slideTo(r, 0, !1);
          },
          removeAllSlides: function () {
            for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
            this.removeSlide(e);
          },
        },
        events: {
          attachEvents: function () {
            var e = r(),
              t = this.params,
              i = this.touchEvents,
              n = this.el,
              a = this.wrapperEl,
              s = this.device,
              o = this.support;
            (this.onTouchStart = j.bind(this)),
              (this.onTouchMove = N.bind(this)),
              (this.onTouchEnd = z.bind(this)),
              t.cssMode && (this.onScroll = B.bind(this)),
              (this.onClick = $.bind(this));
            var l = !!t.nested;
            if (!o.touch && o.pointerEvents)
              n.addEventListener(i.start, this.onTouchStart, !1),
                e.addEventListener(i.move, this.onTouchMove, l),
                e.addEventListener(i.end, this.onTouchEnd, !1);
            else {
              if (o.touch) {
                var u = !(
                  "touchstart" !== i.start ||
                  !o.passiveListener ||
                  !t.passiveListeners
                ) && { passive: !0, capture: !1 };
                n.addEventListener(i.start, this.onTouchStart, u),
                  n.addEventListener(
                    i.move,
                    this.onTouchMove,
                    o.passiveListener ? { passive: !1, capture: l } : l
                  ),
                  n.addEventListener(i.end, this.onTouchEnd, u),
                  i.cancel && n.addEventListener(i.cancel, this.onTouchEnd, u),
                  R || (e.addEventListener("touchstart", H), (R = !0));
              }
              ((t.simulateTouch && !s.ios && !s.android) ||
                (t.simulateTouch && !o.touch && s.ios)) &&
                (n.addEventListener("mousedown", this.onTouchStart, !1),
                e.addEventListener("mousemove", this.onTouchMove, l),
                e.addEventListener("mouseup", this.onTouchEnd, !1));
            }
            (t.preventClicks || t.preventClicksPropagation) &&
              n.addEventListener("click", this.onClick, !0),
              t.cssMode && a.addEventListener("scroll", this.onScroll),
              t.updateOnWindowResize
                ? this.on(
                    s.ios || s.android
                      ? "resize orientationchange observerUpdate"
                      : "resize observerUpdate",
                    _,
                    !0
                  )
                : this.on("observerUpdate", _, !0);
          },
          detachEvents: function () {
            var e = r(),
              t = this.params,
              i = this.touchEvents,
              n = this.el,
              a = this.wrapperEl,
              s = this.device,
              o = this.support,
              l = !!t.nested;
            if (!o.touch && o.pointerEvents)
              n.removeEventListener(i.start, this.onTouchStart, !1),
                e.removeEventListener(i.move, this.onTouchMove, l),
                e.removeEventListener(i.end, this.onTouchEnd, !1);
            else {
              if (o.touch) {
                var u = !(
                  "onTouchStart" !== i.start ||
                  !o.passiveListener ||
                  !t.passiveListeners
                ) && { passive: !0, capture: !1 };
                n.removeEventListener(i.start, this.onTouchStart, u),
                  n.removeEventListener(i.move, this.onTouchMove, l),
                  n.removeEventListener(i.end, this.onTouchEnd, u),
                  i.cancel &&
                    n.removeEventListener(i.cancel, this.onTouchEnd, u);
              }
              ((t.simulateTouch && !s.ios && !s.android) ||
                (t.simulateTouch && !o.touch && s.ios)) &&
                (n.removeEventListener("mousedown", this.onTouchStart, !1),
                e.removeEventListener("mousemove", this.onTouchMove, l),
                e.removeEventListener("mouseup", this.onTouchEnd, !1));
            }
            (t.preventClicks || t.preventClicksPropagation) &&
              n.removeEventListener("click", this.onClick, !0),
              t.cssMode && a.removeEventListener("scroll", this.onScroll),
              this.off(
                s.ios || s.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                _
              );
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            var e = this.activeIndex,
              t = this.initialized,
              i = this.loopedSlides,
              n = void 0 === i ? 0 : i,
              a = this.params,
              r = this.$el,
              s = a.breakpoints;
            if (s && (!s || 0 !== Object.keys(s).length)) {
              var o = this.getBreakpoint(
                s,
                this.params.breakpointsBase,
                this.el
              );
              if (o && this.currentBreakpoint !== o) {
                var l = o in s ? s[o] : void 0;
                l &&
                  [
                    "slidesPerView",
                    "spaceBetween",
                    "slidesPerGroup",
                    "slidesPerGroupSkip",
                    "slidesPerColumn",
                  ].forEach(function (e) {
                    var t = l[e];
                    void 0 !== t &&
                      (l[e] =
                        "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t)
                          ? "slidesPerView" === e
                            ? parseFloat(t)
                            : parseInt(t, 10)
                          : "auto");
                  });
                var u = l || this.originalParams,
                  c = a.slidesPerColumn > 1,
                  d = u.slidesPerColumn > 1;
                c && !d
                  ? (r.removeClass(
                      a.containerModifierClass +
                        "multirow " +
                        a.containerModifierClass +
                        "multirow-column"
                    ),
                    this.emitContainerClasses())
                  : !c &&
                    d &&
                    (r.addClass(a.containerModifierClass + "multirow"),
                    "column" === u.slidesPerColumnFill &&
                      r.addClass(a.containerModifierClass + "multirow-column"),
                    this.emitContainerClasses());
                var p = u.direction && u.direction !== a.direction,
                  h = a.loop && (u.slidesPerView !== a.slidesPerView || p);
                p && t && this.changeDirection(),
                  S(this.params, u),
                  S(this, {
                    allowTouchMove: this.params.allowTouchMove,
                    allowSlideNext: this.params.allowSlideNext,
                    allowSlidePrev: this.params.allowSlidePrev,
                  }),
                  (this.currentBreakpoint = o),
                  this.emit("_beforeBreakpoint", u),
                  h &&
                    t &&
                    (this.loopDestroy(),
                    this.loopCreate(),
                    this.updateSlides(),
                    this.slideTo(e - n + this.loopedSlides, 0, !1)),
                  this.emit("breakpoint", u);
              }
            }
          },
          getBreakpoint: function (e, t, i) {
            if (
              (void 0 === t && (t = "window"), e && ("container" !== t || i))
            ) {
              var n = !1,
                a = o(),
                r = "window" === t ? a.innerWidth : i.clientWidth,
                s = "window" === t ? a.innerHeight : i.clientHeight,
                l = Object.keys(e).map(function (e) {
                  if ("string" == typeof e && 0 === e.indexOf("@")) {
                    var t = parseFloat(e.substr(1));
                    return { value: s * t, point: e };
                  }
                  return { value: e, point: e };
                });
              l.sort(function (e, t) {
                return parseInt(e.value, 10) - parseInt(t.value, 10);
              });
              for (var u = 0; u < l.length; u += 1) {
                var c = l[u],
                  d = c.point;
                c.value <= r && (n = d);
              }
              return n || "max";
            }
          },
        },
        checkOverflow: {
          checkOverflow: function () {
            var e = this.params,
              t = this.isLocked,
              i =
                this.slides.length > 0 &&
                e.slidesOffsetBefore +
                  e.spaceBetween * (this.slides.length - 1) +
                  this.slides[0].offsetWidth * this.slides.length;
            e.slidesOffsetBefore && e.slidesOffsetAfter && i
              ? (this.isLocked = i <= this.size)
              : (this.isLocked = 1 === this.snapGrid.length),
              (this.allowSlideNext = !this.isLocked),
              (this.allowSlidePrev = !this.isLocked),
              t !== this.isLocked &&
                this.emit(this.isLocked ? "lock" : "unlock"),
              t &&
                t !== this.isLocked &&
                ((this.isEnd = !1),
                this.navigation && this.navigation.update());
          },
        },
        classes: {
          addClasses: function () {
            var e,
              t,
              i,
              n = this.classNames,
              a = this.params,
              r = this.rtl,
              s = this.$el,
              o = this.device,
              l = this.support,
              u =
                ((e = [
                  "initialized",
                  a.direction,
                  { "pointer-events": l.pointerEvents && !l.touch },
                  { "free-mode": a.freeMode },
                  { autoheight: a.autoHeight },
                  { rtl: r },
                  { multirow: a.slidesPerColumn > 1 },
                  {
                    "multirow-column":
                      a.slidesPerColumn > 1 &&
                      "column" === a.slidesPerColumnFill,
                  },
                  { android: o.android },
                  { ios: o.ios },
                  { "css-mode": a.cssMode },
                ]),
                (t = a.containerModifierClass),
                (i = []),
                e.forEach(function (e) {
                  "object" == typeof e
                    ? Object.keys(e).forEach(function (n) {
                        e[n] && i.push(t + n);
                      })
                    : "string" == typeof e && i.push(t + e);
                }),
                i);
            n.push.apply(n, u),
              s.addClass([].concat(n).join(" ")),
              this.emitContainerClasses();
          },
          removeClasses: function () {
            var e = this.$el,
              t = this.classNames;
            e.removeClass(t.join(" ")), this.emitContainerClasses();
          },
        },
        images: {
          loadImage: function (e, t, i, n, a, r) {
            var s,
              l = o();
            function u() {
              r && r();
            }
            m(e).parent("picture")[0] || (e.complete && a)
              ? u()
              : t
              ? (((s = new l.Image()).onload = u),
                (s.onerror = u),
                n && (s.sizes = n),
                i && (s.srcset = i),
                t && (s.src = t))
              : u();
          },
          preloadImages: function () {
            var e = this;
            function t() {
              null != e &&
                e &&
                !e.destroyed &&
                (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                e.imagesLoaded === e.imagesToLoad.length &&
                  (e.params.updateOnImagesReady && e.update(),
                  e.emit("imagesReady")));
            }
            e.imagesToLoad = e.$el.find("img");
            for (var i = 0; i < e.imagesToLoad.length; i += 1) {
              var n = e.imagesToLoad[i];
              e.loadImage(
                n,
                n.currentSrc || n.getAttribute("src"),
                n.srcset || n.getAttribute("srcset"),
                n.sizes || n.getAttribute("sizes"),
                !0,
                t
              );
            }
          },
        },
      },
      q = {},
      V = (function () {
        function t() {
          for (
            var e, i, n = arguments.length, a = new Array(n), r = 0;
            r < n;
            r++
          )
            a[r] = arguments[r];
          if (
            (1 === a.length &&
            a[0].constructor &&
            "Object" === Object.prototype.toString.call(a[0]).slice(8, -1)
              ? (i = a[0])
              : ((e = a[0]), (i = a[1])),
            i || (i = {}),
            (i = S({}, i)),
            e && !i.el && (i.el = e),
            i.el && m(i.el).length > 1)
          ) {
            var s = [];
            return (
              m(i.el).each(function (e) {
                var n = S({}, i, { el: e });
                s.push(new t(n));
              }),
              s
            );
          }
          var o = this;
          (o.__swiper__ = !0),
            (o.support = P()),
            (o.device = O({ userAgent: i.userAgent })),
            (o.browser = A()),
            (o.eventsListeners = {}),
            (o.eventsAnyListeners = []),
            void 0 === o.modules && (o.modules = {}),
            Object.keys(o.modules).forEach(function (e) {
              var t = o.modules[e];
              if (t.params) {
                var n = Object.keys(t.params)[0],
                  a = t.params[n];
                if ("object" != typeof a || null === a) return;
                if (!(n in i) || !("enabled" in a)) return;
                !0 === i[n] && (i[n] = { enabled: !0 }),
                  "object" != typeof i[n] ||
                    "enabled" in i[n] ||
                    (i[n].enabled = !0),
                  i[n] || (i[n] = { enabled: !1 });
              }
            });
          var l,
            u,
            c = S({}, F);
          return (
            o.useParams(c),
            (o.params = S({}, c, q, i)),
            (o.originalParams = S({}, o.params)),
            (o.passedParams = S({}, i)),
            o.params &&
              o.params.on &&
              Object.keys(o.params.on).forEach(function (e) {
                o.on(e, o.params.on[e]);
              }),
            o.params && o.params.onAny && o.onAny(o.params.onAny),
            (o.$ = m),
            S(o, {
              el: e,
              classNames: [],
              slides: m(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: function () {
                return "horizontal" === o.params.direction;
              },
              isVertical: function () {
                return "vertical" === o.params.direction;
              },
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: o.params.allowSlideNext,
              allowSlidePrev: o.params.allowSlidePrev,
              touchEvents:
                ((l = ["touchstart", "touchmove", "touchend", "touchcancel"]),
                (u = ["mousedown", "mousemove", "mouseup"]),
                o.support.pointerEvents &&
                  (u = ["pointerdown", "pointermove", "pointerup"]),
                (o.touchEventsTouch = {
                  start: l[0],
                  move: l[1],
                  end: l[2],
                  cancel: l[3],
                }),
                (o.touchEventsDesktop = { start: u[0], move: u[1], end: u[2] }),
                o.support.touch || !o.params.simulateTouch
                  ? o.touchEventsTouch
                  : o.touchEventsDesktop),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements:
                  "input, select, option, textarea, button, video, label",
                lastClickTime: k(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: o.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            o.useModules(),
            o.emit("_swiper"),
            o.params.init && o.init(),
            o
          );
        }
        var i,
          n,
          a,
          r = t.prototype;
        return (
          (r.setProgress = function (e, t) {
            e = Math.min(Math.max(e, 0), 1);
            var i = this.minTranslate(),
              n = (this.maxTranslate() - i) * e + i;
            this.translateTo(n, void 0 === t ? 0 : t),
              this.updateActiveIndex(),
              this.updateSlidesClasses();
          }),
          (r.emitContainerClasses = function () {
            var e = this;
            if (e.params._emitClasses && e.el) {
              var t = e.el.className.split(" ").filter(function (t) {
                return (
                  0 === t.indexOf("swiper-container") ||
                  0 === t.indexOf(e.params.containerModifierClass)
                );
              });
              e.emit("_containerClasses", t.join(" "));
            }
          }),
          (r.getSlideClasses = function (e) {
            var t = this;
            return e.className
              .split(" ")
              .filter(function (e) {
                return (
                  0 === e.indexOf("swiper-slide") ||
                  0 === e.indexOf(t.params.slideClass)
                );
              })
              .join(" ");
          }),
          (r.emitSlidesClasses = function () {
            var e = this;
            if (e.params._emitClasses && e.el) {
              var t = [];
              e.slides.each(function (i) {
                var n = e.getSlideClasses(i);
                t.push({ slideEl: i, classNames: n }),
                  e.emit("_slideClass", i, n);
              }),
                e.emit("_slideClasses", t);
            }
          }),
          (r.slidesPerViewDynamic = function () {
            var e = this.params,
              t = this.slides,
              i = this.slidesGrid,
              n = this.size,
              a = this.activeIndex,
              r = 1;
            if (e.centeredSlides) {
              for (
                var s, o = t[a].swiperSlideSize, l = a + 1;
                l < t.length;
                l += 1
              )
                t[l] &&
                  !s &&
                  ((r += 1), (o += t[l].swiperSlideSize) > n && (s = !0));
              for (var u = a - 1; u >= 0; u -= 1)
                t[u] &&
                  !s &&
                  ((r += 1), (o += t[u].swiperSlideSize) > n && (s = !0));
            } else
              for (var c = a + 1; c < t.length; c += 1)
                i[c] - i[a] < n && (r += 1);
            return r;
          }),
          (r.update = function () {
            var e = this;
            if (e && !e.destroyed) {
              var t = e.snapGrid,
                i = e.params;
              i.breakpoints && e.setBreakpoint(),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.params.freeMode
                  ? (n(), e.params.autoHeight && e.updateAutoHeight())
                  : (("auto" === e.params.slidesPerView ||
                      e.params.slidesPerView > 1) &&
                    e.isEnd &&
                    !e.params.centeredSlides
                      ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                      : e.slideTo(e.activeIndex, 0, !1, !0)) || n(),
                i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                e.emit("update");
            }
            function n() {
              var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
              e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
            }
          }),
          (r.changeDirection = function (e, t) {
            void 0 === t && (t = !0);
            var i = this.params.direction;
            return (
              e || (e = "horizontal" === i ? "vertical" : "horizontal"),
              e === i ||
                ("horizontal" !== e && "vertical" !== e) ||
                (this.$el
                  .removeClass("" + this.params.containerModifierClass + i)
                  .addClass("" + this.params.containerModifierClass + e),
                this.emitContainerClasses(),
                (this.params.direction = e),
                this.slides.each(function (t) {
                  "vertical" === e
                    ? (t.style.width = "")
                    : (t.style.height = "");
                }),
                this.emit("changeDirection"),
                t && this.update()),
              this
            );
          }),
          (r.mount = function (e) {
            if (this.mounted) return !0;
            var t,
              i = m(e || this.params.el);
            return (
              !!(e = i[0]) &&
              ((e.swiper = this),
              e && e.shadowRoot && e.shadowRoot.querySelector
                ? ((t = m(
                    e.shadowRoot.querySelector("." + this.params.wrapperClass)
                  )).children = function (e) {
                    return i.children(e);
                  })
                : (t = i.children("." + this.params.wrapperClass)),
              S(this, {
                $el: i,
                el: e,
                $wrapperEl: t,
                wrapperEl: t[0],
                mounted: !0,
                rtl:
                  "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
                rtlTranslate:
                  "horizontal" === this.params.direction &&
                  ("rtl" === e.dir.toLowerCase() ||
                    "rtl" === i.css("direction")),
                wrongRTL: "-webkit-box" === t.css("display"),
              }),
              !0)
            );
          }),
          (r.init = function (e) {
            return (
              this.initialized ||
                !1 === this.mount(e) ||
                (this.emit("beforeInit"),
                this.params.breakpoints && this.setBreakpoint(),
                this.addClasses(),
                this.params.loop && this.loopCreate(),
                this.updateSize(),
                this.updateSlides(),
                this.params.watchOverflow && this.checkOverflow(),
                this.params.grabCursor && this.setGrabCursor(),
                this.params.preloadImages && this.preloadImages(),
                this.params.loop
                  ? this.slideTo(
                      this.params.initialSlide + this.loopedSlides,
                      0,
                      this.params.runCallbacksOnInit
                    )
                  : this.slideTo(
                      this.params.initialSlide,
                      0,
                      this.params.runCallbacksOnInit
                    ),
                this.attachEvents(),
                (this.initialized = !0),
                this.emit("init"),
                this.emit("afterInit")),
              this
            );
          }),
          (r.destroy = function (e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            var i,
              n = this,
              a = n.params,
              r = n.$el,
              s = n.$wrapperEl,
              o = n.slides;
            return (
              void 0 === n.params ||
                n.destroyed ||
                (n.emit("beforeDestroy"),
                (n.initialized = !1),
                n.detachEvents(),
                a.loop && n.loopDestroy(),
                t &&
                  (n.removeClasses(),
                  r.removeAttr("style"),
                  s.removeAttr("style"),
                  o &&
                    o.length &&
                    o
                      .removeClass(
                        [
                          a.slideVisibleClass,
                          a.slideActiveClass,
                          a.slideNextClass,
                          a.slidePrevClass,
                        ].join(" ")
                      )
                      .removeAttr("style")
                      .removeAttr("data-swiper-slide-index")),
                n.emit("destroy"),
                Object.keys(n.eventsListeners).forEach(function (e) {
                  n.off(e);
                }),
                !1 !== e &&
                  ((n.$el[0].swiper = null),
                  (i = n),
                  Object.keys(i).forEach(function (e) {
                    try {
                      i[e] = null;
                    } catch (e) {}
                    try {
                      delete i[e];
                    } catch (e) {}
                  })),
                (n.destroyed = !0)),
              null
            );
          }),
          (t.extendDefaults = function (e) {
            S(q, e);
          }),
          (t.installModule = function (e) {
            t.prototype.modules || (t.prototype.modules = {});
            var i =
              e.name || Object.keys(t.prototype.modules).length + "_" + k();
            t.prototype.modules[i] = e;
          }),
          (t.use = function (e) {
            return Array.isArray(e)
              ? (e.forEach(function (e) {
                  return t.installModule(e);
                }),
                t)
              : (t.installModule(e), t);
          }),
          (i = t),
          (a = [
            {
              key: "extendedDefaults",
              get: function () {
                return q;
              },
            },
            {
              key: "defaults",
              get: function () {
                return F;
              },
            },
          ]),
          (n = null) && e(i.prototype, n),
          a && e(i, a),
          t
        );
      })();
    Object.keys(G).forEach(function (e) {
      Object.keys(G[e]).forEach(function (t) {
        V.prototype[t] = G[e][t];
      });
    }),
      V.use([L, I]);
    var W = {
        update: function (e) {
          var t = this,
            i = t.params,
            n = i.slidesPerView,
            a = i.slidesPerGroup,
            r = i.centeredSlides,
            s = t.params.virtual,
            o = s.addSlidesBefore,
            l = s.addSlidesAfter,
            u = t.virtual,
            c = u.from,
            d = u.to,
            p = u.slides,
            h = u.slidesGrid,
            f = u.renderSlide,
            v = u.offset;
          t.updateActiveIndex();
          var m,
            g,
            y,
            b = t.activeIndex || 0;
          (m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
            r
              ? ((g = Math.floor(n / 2) + a + l),
                (y = Math.floor(n / 2) + a + o))
              : ((g = n + (a - 1) + l), (y = a + o));
          var x = Math.max((b || 0) - y, 0),
            w = Math.min((b || 0) + g, p.length - 1),
            k = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);
          function E() {
            t.updateSlides(),
              t.updateProgress(),
              t.updateSlidesClasses(),
              t.lazy && t.params.lazy.enabled && t.lazy.load();
          }
          if (
            (S(t.virtual, {
              from: x,
              to: w,
              offset: k,
              slidesGrid: t.slidesGrid,
            }),
            c === x && d === w && !e)
          )
            return (
              t.slidesGrid !== h && k !== v && t.slides.css(m, k + "px"),
              void t.updateProgress()
            );
          if (t.params.virtual.renderExternal)
            return (
              t.params.virtual.renderExternal.call(t, {
                offset: k,
                from: x,
                to: w,
                slides: (function () {
                  for (var e = [], t = x; t <= w; t += 1) e.push(p[t]);
                  return e;
                })(),
              }),
              void (t.params.virtual.renderExternalUpdate && E())
            );
          var T = [],
            C = [];
          if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
          else
            for (var M = c; M <= d; M += 1)
              (M < x || M > w) &&
                t.$wrapperEl
                  .find(
                    "." +
                      t.params.slideClass +
                      '[data-swiper-slide-index="' +
                      M +
                      '"]'
                  )
                  .remove();
          for (var P = 0; P < p.length; P += 1)
            P >= x &&
              P <= w &&
              (void 0 === d || e
                ? C.push(P)
                : (P > d && C.push(P), P < c && T.push(P)));
          C.forEach(function (e) {
            t.$wrapperEl.append(f(p[e], e));
          }),
            T.sort(function (e, t) {
              return t - e;
            }).forEach(function (e) {
              t.$wrapperEl.prepend(f(p[e], e));
            }),
            t.$wrapperEl.children(".swiper-slide").css(m, k + "px"),
            E();
        },
        renderSlide: function (e, t) {
          var i = this.params.virtual;
          if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
          var n = i.renderSlide
            ? m(i.renderSlide.call(this, e, t))
            : m(
                '<div class="' +
                  this.params.slideClass +
                  '" data-swiper-slide-index="' +
                  t +
                  '">' +
                  e +
                  "</div>"
              );
          return (
            n.attr("data-swiper-slide-index") ||
              n.attr("data-swiper-slide-index", t),
            i.cache && (this.virtual.cache[t] = n),
            n
          );
        },
        appendSlide: function (e) {
          if ("object" == typeof e && "length" in e)
            for (var t = 0; t < e.length; t += 1)
              e[t] && this.virtual.slides.push(e[t]);
          else this.virtual.slides.push(e);
          this.virtual.update(!0);
        },
        prependSlide: function (e) {
          var t = this.activeIndex,
            i = t + 1,
            n = 1;
          if (Array.isArray(e)) {
            for (var a = 0; a < e.length; a += 1)
              e[a] && this.virtual.slides.unshift(e[a]);
            (i = t + e.length), (n = e.length);
          } else this.virtual.slides.unshift(e);
          if (this.params.virtual.cache) {
            var r = this.virtual.cache,
              s = {};
            Object.keys(r).forEach(function (e) {
              var t = r[e],
                i = t.attr("data-swiper-slide-index");
              i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1),
                (s[parseInt(e, 10) + n] = t);
            }),
              (this.virtual.cache = s);
          }
          this.virtual.update(!0), this.slideTo(i, 0);
        },
        removeSlide: function (e) {
          if (null != e) {
            var t = this.activeIndex;
            if (Array.isArray(e))
              for (var i = e.length - 1; i >= 0; i -= 1)
                this.virtual.slides.splice(e[i], 1),
                  this.params.virtual.cache && delete this.virtual.cache[e[i]],
                  e[i] < t && (t -= 1),
                  (t = Math.max(t, 0));
            else
              this.virtual.slides.splice(e, 1),
                this.params.virtual.cache && delete this.virtual.cache[e],
                e < t && (t -= 1),
                (t = Math.max(t, 0));
            this.virtual.update(!0), this.slideTo(t, 0);
          }
        },
        removeAllSlides: function () {
          (this.virtual.slides = []),
            this.params.virtual.cache && (this.virtual.cache = {}),
            this.virtual.update(!0),
            this.slideTo(0, 0);
        },
      },
      X = {
        name: "virtual",
        params: {
          virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: !0,
            addSlidesBefore: 0,
            addSlidesAfter: 0,
          },
        },
        create: function () {
          C(this, {
            virtual: t({}, W, {
              slides: this.params.virtual.slides,
              cache: {},
            }),
          });
        },
        on: {
          beforeInit: function (e) {
            if (e.params.virtual.enabled) {
              e.classNames.push(e.params.containerModifierClass + "virtual");
              var t = { watchSlidesProgress: !0 };
              S(e.params, t),
                S(e.originalParams, t),
                e.params.initialSlide || e.virtual.update();
            }
          },
          setTranslate: function (e) {
            e.params.virtual.enabled && e.virtual.update();
          },
        },
      },
      Y = {
        handle: function (e) {
          var t = o(),
            i = r(),
            n = this.rtlTranslate,
            a = e;
          a.originalEvent && (a = a.originalEvent);
          var s = a.keyCode || a.charCode,
            l = this.params.keyboard.pageUpDown,
            u = l && 33 === s,
            c = l && 34 === s,
            d = 37 === s,
            p = 39 === s,
            h = 38 === s,
            f = 40 === s;
          if (
            !this.allowSlideNext &&
            ((this.isHorizontal() && p) || (this.isVertical() && f) || c)
          )
            return !1;
          if (
            !this.allowSlidePrev &&
            ((this.isHorizontal() && d) || (this.isVertical() && h) || u)
          )
            return !1;
          if (
            !(
              a.shiftKey ||
              a.altKey ||
              a.ctrlKey ||
              a.metaKey ||
              (i.activeElement &&
                i.activeElement.nodeName &&
                ("input" === i.activeElement.nodeName.toLowerCase() ||
                  "textarea" === i.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (
              this.params.keyboard.onlyInViewport &&
              (u || c || d || p || h || f)
            ) {
              var v = !1;
              if (
                this.$el.parents("." + this.params.slideClass).length > 0 &&
                0 ===
                  this.$el.parents("." + this.params.slideActiveClass).length
              )
                return;
              var m = this.$el,
                g = m[0].clientWidth,
                y = m[0].clientHeight,
                b = t.innerWidth,
                x = t.innerHeight,
                w = this.$el.offset();
              n && (w.left -= this.$el[0].scrollLeft);
              for (
                var k = [
                    [w.left, w.top],
                    [w.left + g, w.top],
                    [w.left, w.top + y],
                    [w.left + g, w.top + y],
                  ],
                  E = 0;
                E < k.length;
                E += 1
              ) {
                var T = k[E];
                if (T[0] >= 0 && T[0] <= b && T[1] >= 0 && T[1] <= x) {
                  if (0 === T[0] && 0 === T[1]) continue;
                  v = !0;
                }
              }
              if (!v) return;
            }
            this.isHorizontal()
              ? ((u || c || d || p) &&
                  (a.preventDefault
                    ? a.preventDefault()
                    : (a.returnValue = !1)),
                (((c || p) && !n) || ((u || d) && n)) && this.slideNext(),
                (((u || d) && !n) || ((c || p) && n)) && this.slidePrev())
              : ((u || c || h || f) &&
                  (a.preventDefault
                    ? a.preventDefault()
                    : (a.returnValue = !1)),
                (c || f) && this.slideNext(),
                (u || h) && this.slidePrev()),
              this.emit("keyPress", s);
          }
        },
        enable: function () {
          var e = r();
          this.keyboard.enabled ||
            (m(e).on("keydown", this.keyboard.handle),
            (this.keyboard.enabled = !0));
        },
        disable: function () {
          var e = r();
          this.keyboard.enabled &&
            (m(e).off("keydown", this.keyboard.handle),
            (this.keyboard.enabled = !1));
        },
      },
      U = {
        name: "keyboard",
        params: {
          keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 },
        },
        create: function () {
          C(this, { keyboard: t({ enabled: !1 }, Y) });
        },
        on: {
          init: function (e) {
            e.params.keyboard.enabled && e.keyboard.enable();
          },
          destroy: function (e) {
            e.keyboard.enabled && e.keyboard.disable();
          },
        },
      };
    var K = {
        lastScrollTime: k(),
        lastEventBeforeSnap: void 0,
        recentWheelEvents: [],
        event: function () {
          return o().navigator.userAgent.indexOf("firefox") > -1
            ? "DOMMouseScroll"
            : (function () {
                var e = r(),
                  t = "onwheel" in e;
                if (!t) {
                  var i = e.createElement("div");
                  i.setAttribute("onwheel", "return;"),
                    (t = "function" == typeof i.onwheel);
                }
                return (
                  !t &&
                    e.implementation &&
                    e.implementation.hasFeature &&
                    !0 !== e.implementation.hasFeature("", "") &&
                    (t = e.implementation.hasFeature("Events.wheel", "3.0")),
                  t
                );
              })()
            ? "wheel"
            : "mousewheel";
        },
        normalize: function (e) {
          var t = 0,
            i = 0,
            n = 0,
            a = 0;
          return (
            "detail" in e && (i = e.detail),
            "wheelDelta" in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
            "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
            (n = 10 * t),
            (a = 10 * i),
            "deltaY" in e && (a = e.deltaY),
            "deltaX" in e && (n = e.deltaX),
            e.shiftKey && !n && ((n = a), (a = 0)),
            (n || a) &&
              e.deltaMode &&
              (1 === e.deltaMode
                ? ((n *= 40), (a *= 40))
                : ((n *= 800), (a *= 800))),
            n && !t && (t = n < 1 ? -1 : 1),
            a && !i && (i = a < 1 ? -1 : 1),
            { spinX: t, spinY: i, pixelX: n, pixelY: a }
          );
        },
        handleMouseEnter: function () {
          this.mouseEntered = !0;
        },
        handleMouseLeave: function () {
          this.mouseEntered = !1;
        },
        handle: function (e) {
          var t = e,
            i = this,
            n = i.params.mousewheel;
          i.params.cssMode && t.preventDefault();
          var a = i.$el;
          if (
            ("container" !== i.params.mousewheel.eventsTarget &&
              (a = m(i.params.mousewheel.eventsTarget)),
            !i.mouseEntered && !a[0].contains(t.target) && !n.releaseOnEdges)
          )
            return !0;
          t.originalEvent && (t = t.originalEvent);
          var r = 0,
            s = i.rtlTranslate ? -1 : 1,
            o = K.normalize(t);
          if (n.forceToAxis)
            if (i.isHorizontal()) {
              if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
              r = -o.pixelX * s;
            } else {
              if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
              r = -o.pixelY;
            }
          else
            r =
              Math.abs(o.pixelX) > Math.abs(o.pixelY)
                ? -o.pixelX * s
                : -o.pixelY;
          if (0 === r) return !0;
          n.invert && (r = -r);
          var l = i.getTranslate() + r * n.sensitivity;
          if (
            (l >= i.minTranslate() && (l = i.minTranslate()),
            l <= i.maxTranslate() && (l = i.maxTranslate()),
            (!!i.params.loop ||
              !(l === i.minTranslate() || l === i.maxTranslate())) &&
              i.params.nested &&
              t.stopPropagation(),
            i.params.freeMode)
          ) {
            var u = { time: k(), delta: Math.abs(r), direction: Math.sign(r) },
              c = i.mousewheel.lastEventBeforeSnap,
              d =
                c &&
                u.time < c.time + 500 &&
                u.delta <= c.delta &&
                u.direction === c.direction;
            if (!d) {
              (i.mousewheel.lastEventBeforeSnap = void 0),
                i.params.loop && i.loopFix();
              var p = i.getTranslate() + r * n.sensitivity,
                h = i.isBeginning,
                f = i.isEnd;
              if (
                (p >= i.minTranslate() && (p = i.minTranslate()),
                p <= i.maxTranslate() && (p = i.maxTranslate()),
                i.setTransition(0),
                i.setTranslate(p),
                i.updateProgress(),
                i.updateActiveIndex(),
                i.updateSlidesClasses(),
                ((!h && i.isBeginning) || (!f && i.isEnd)) &&
                  i.updateSlidesClasses(),
                i.params.freeModeSticky)
              ) {
                clearTimeout(i.mousewheel.timeout),
                  (i.mousewheel.timeout = void 0);
                var v = i.mousewheel.recentWheelEvents;
                v.length >= 15 && v.shift();
                var g = v.length ? v[v.length - 1] : void 0,
                  y = v[0];
                if (
                  (v.push(u),
                  g && (u.delta > g.delta || u.direction !== g.direction))
                )
                  v.splice(0);
                else if (
                  v.length >= 15 &&
                  u.time - y.time < 500 &&
                  y.delta - u.delta >= 1 &&
                  u.delta <= 6
                ) {
                  var b = r > 0 ? 0.8 : 0.2;
                  (i.mousewheel.lastEventBeforeSnap = u),
                    v.splice(0),
                    (i.mousewheel.timeout = w(function () {
                      i.slideToClosest(i.params.speed, !0, void 0, b);
                    }, 0));
                }
                i.mousewheel.timeout ||
                  (i.mousewheel.timeout = w(function () {
                    (i.mousewheel.lastEventBeforeSnap = u),
                      v.splice(0),
                      i.slideToClosest(i.params.speed, !0, void 0, 0.5);
                  }, 500));
              }
              if (
                (d || i.emit("scroll", t),
                i.params.autoplay &&
                  i.params.autoplayDisableOnInteraction &&
                  i.autoplay.stop(),
                p === i.minTranslate() || p === i.maxTranslate())
              )
                return !0;
            }
          } else {
            var x = {
                time: k(),
                delta: Math.abs(r),
                direction: Math.sign(r),
                raw: e,
              },
              E = i.mousewheel.recentWheelEvents;
            E.length >= 2 && E.shift();
            var T = E.length ? E[E.length - 1] : void 0;
            if (
              (E.push(x),
              T
                ? (x.direction !== T.direction ||
                    x.delta > T.delta ||
                    x.time > T.time + 150) &&
                  i.mousewheel.animateSlider(x)
                : i.mousewheel.animateSlider(x),
              i.mousewheel.releaseScroll(x))
            )
              return !0;
          }
          return (
            t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1
          );
        },
        animateSlider: function (e) {
          var t = o();
          return (
            !(
              this.params.mousewheel.thresholdDelta &&
              e.delta < this.params.mousewheel.thresholdDelta
            ) &&
            !(
              this.params.mousewheel.thresholdTime &&
              k() - this.mousewheel.lastScrollTime <
                this.params.mousewheel.thresholdTime
            ) &&
            ((e.delta >= 6 && k() - this.mousewheel.lastScrollTime < 60) ||
              (e.direction < 0
                ? (this.isEnd && !this.params.loop) ||
                  this.animating ||
                  (this.slideNext(), this.emit("scroll", e.raw))
                : (this.isBeginning && !this.params.loop) ||
                  this.animating ||
                  (this.slidePrev(), this.emit("scroll", e.raw)),
              (this.mousewheel.lastScrollTime = new t.Date().getTime()),
              !1))
          );
        },
        releaseScroll: function (e) {
          var t = this.params.mousewheel;
          if (e.direction < 0) {
            if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0;
          } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges)
            return !0;
          return !1;
        },
        enable: function () {
          var e = K.event();
          if (this.params.cssMode)
            return (
              this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0
            );
          if (!e) return !1;
          if (this.mousewheel.enabled) return !1;
          var t = this.$el;
          return (
            "container" !== this.params.mousewheel.eventsTarget &&
              (t = m(this.params.mousewheel.eventsTarget)),
            t.on("mouseenter", this.mousewheel.handleMouseEnter),
            t.on("mouseleave", this.mousewheel.handleMouseLeave),
            t.on(e, this.mousewheel.handle),
            (this.mousewheel.enabled = !0),
            !0
          );
        },
        disable: function () {
          var e = K.event();
          if (this.params.cssMode)
            return (
              this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0
            );
          if (!e) return !1;
          if (!this.mousewheel.enabled) return !1;
          var t = this.$el;
          return (
            "container" !== this.params.mousewheel.eventsTarget &&
              (t = m(this.params.mousewheel.eventsTarget)),
            t.off(e, this.mousewheel.handle),
            (this.mousewheel.enabled = !1),
            !0
          );
        },
      },
      Q = {
        toggleEl: function (e, t) {
          e[t ? "addClass" : "removeClass"](
            this.params.navigation.disabledClass
          ),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = t);
        },
        update: function () {
          var e = this.params.navigation,
            t = this.navigation.toggleEl;
          if (!this.params.loop) {
            var i = this.navigation,
              n = i.$nextEl,
              a = i.$prevEl;
            a &&
              a.length > 0 &&
              (this.isBeginning ? t(a, !0) : t(a, !1),
              a[
                this.params.watchOverflow && this.isLocked
                  ? "addClass"
                  : "removeClass"
              ](e.lockClass)),
              n &&
                n.length > 0 &&
                (this.isEnd ? t(n, !0) : t(n, !1),
                n[
                  this.params.watchOverflow && this.isLocked
                    ? "addClass"
                    : "removeClass"
                ](e.lockClass));
          }
        },
        onPrevClick: function (e) {
          e.preventDefault(),
            (this.isBeginning && !this.params.loop) || this.slidePrev();
        },
        onNextClick: function (e) {
          e.preventDefault(),
            (this.isEnd && !this.params.loop) || this.slideNext();
        },
        init: function () {
          var e,
            t,
            i = this.params.navigation;
          (i.nextEl || i.prevEl) &&
            (i.nextEl &&
              ((e = m(i.nextEl)),
              this.params.uniqueNavElements &&
                "string" == typeof i.nextEl &&
                e.length > 1 &&
                1 === this.$el.find(i.nextEl).length &&
                (e = this.$el.find(i.nextEl))),
            i.prevEl &&
              ((t = m(i.prevEl)),
              this.params.uniqueNavElements &&
                "string" == typeof i.prevEl &&
                t.length > 1 &&
                1 === this.$el.find(i.prevEl).length &&
                (t = this.$el.find(i.prevEl))),
            e && e.length > 0 && e.on("click", this.navigation.onNextClick),
            t && t.length > 0 && t.on("click", this.navigation.onPrevClick),
            S(this.navigation, {
              $nextEl: e,
              nextEl: e && e[0],
              $prevEl: t,
              prevEl: t && t[0],
            }));
        },
        destroy: function () {
          var e = this.navigation,
            t = e.$nextEl,
            i = e.$prevEl;
          t &&
            t.length &&
            (t.off("click", this.navigation.onNextClick),
            t.removeClass(this.params.navigation.disabledClass)),
            i &&
              i.length &&
              (i.off("click", this.navigation.onPrevClick),
              i.removeClass(this.params.navigation.disabledClass));
        },
      },
      Z = {
        update: function () {
          var e = this.rtl,
            t = this.params.pagination;
          if (
            t.el &&
            this.pagination.el &&
            this.pagination.$el &&
            0 !== this.pagination.$el.length
          ) {
            var i,
              n =
                this.virtual && this.params.virtual.enabled
                  ? this.virtual.slides.length
                  : this.slides.length,
              a = this.pagination.$el,
              r = this.params.loop
                ? Math.ceil(
                    (n - 2 * this.loopedSlides) / this.params.slidesPerGroup
                  )
                : this.snapGrid.length;
            if (
              (this.params.loop
                ? ((i = Math.ceil(
                    (this.activeIndex - this.loopedSlides) /
                      this.params.slidesPerGroup
                  )) >
                    n - 1 - 2 * this.loopedSlides &&
                    (i -= n - 2 * this.loopedSlides),
                  i > r - 1 && (i -= r),
                  i < 0 &&
                    "bullets" !== this.params.paginationType &&
                    (i = r + i))
                : (i =
                    void 0 !== this.snapIndex
                      ? this.snapIndex
                      : this.activeIndex || 0),
              "bullets" === t.type &&
                this.pagination.bullets &&
                this.pagination.bullets.length > 0)
            ) {
              var s,
                o,
                l,
                u = this.pagination.bullets;
              if (
                (t.dynamicBullets &&
                  ((this.pagination.bulletSize = u
                    .eq(0)
                    [this.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                  a.css(
                    this.isHorizontal() ? "width" : "height",
                    this.pagination.bulletSize * (t.dynamicMainBullets + 4) +
                      "px"
                  ),
                  t.dynamicMainBullets > 1 &&
                    void 0 !== this.previousIndex &&
                    ((this.pagination.dynamicBulletIndex +=
                      i - this.previousIndex),
                    this.pagination.dynamicBulletIndex >
                    t.dynamicMainBullets - 1
                      ? (this.pagination.dynamicBulletIndex =
                          t.dynamicMainBullets - 1)
                      : this.pagination.dynamicBulletIndex < 0 &&
                        (this.pagination.dynamicBulletIndex = 0)),
                  (s = i - this.pagination.dynamicBulletIndex),
                  (l =
                    ((o = s + (Math.min(u.length, t.dynamicMainBullets) - 1)) +
                      s) /
                    2)),
                u.removeClass(
                  t.bulletActiveClass +
                    " " +
                    t.bulletActiveClass +
                    "-next " +
                    t.bulletActiveClass +
                    "-next-next " +
                    t.bulletActiveClass +
                    "-prev " +
                    t.bulletActiveClass +
                    "-prev-prev " +
                    t.bulletActiveClass +
                    "-main"
                ),
                a.length > 1)
              )
                u.each(function (e) {
                  var n = m(e),
                    a = n.index();
                  a === i && n.addClass(t.bulletActiveClass),
                    t.dynamicBullets &&
                      (a >= s &&
                        a <= o &&
                        n.addClass(t.bulletActiveClass + "-main"),
                      a === s &&
                        n
                          .prev()
                          .addClass(t.bulletActiveClass + "-prev")
                          .prev()
                          .addClass(t.bulletActiveClass + "-prev-prev"),
                      a === o &&
                        n
                          .next()
                          .addClass(t.bulletActiveClass + "-next")
                          .next()
                          .addClass(t.bulletActiveClass + "-next-next"));
                });
              else {
                var c = u.eq(i),
                  d = c.index();
                if ((c.addClass(t.bulletActiveClass), t.dynamicBullets)) {
                  for (var p = u.eq(s), h = u.eq(o), f = s; f <= o; f += 1)
                    u.eq(f).addClass(t.bulletActiveClass + "-main");
                  if (this.params.loop)
                    if (d >= u.length - t.dynamicMainBullets) {
                      for (var v = t.dynamicMainBullets; v >= 0; v -= 1)
                        u.eq(u.length - v).addClass(
                          t.bulletActiveClass + "-main"
                        );
                      u.eq(u.length - t.dynamicMainBullets - 1).addClass(
                        t.bulletActiveClass + "-prev"
                      );
                    } else
                      p
                        .prev()
                        .addClass(t.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(t.bulletActiveClass + "-prev-prev"),
                        h
                          .next()
                          .addClass(t.bulletActiveClass + "-next")
                          .next()
                          .addClass(t.bulletActiveClass + "-next-next");
                  else
                    p
                      .prev()
                      .addClass(t.bulletActiveClass + "-prev")
                      .prev()
                      .addClass(t.bulletActiveClass + "-prev-prev"),
                      h
                        .next()
                        .addClass(t.bulletActiveClass + "-next")
                        .next()
                        .addClass(t.bulletActiveClass + "-next-next");
                }
              }
              if (t.dynamicBullets) {
                var g = Math.min(u.length, t.dynamicMainBullets + 4),
                  y =
                    (this.pagination.bulletSize * g -
                      this.pagination.bulletSize) /
                      2 -
                    l * this.pagination.bulletSize,
                  b = e ? "right" : "left";
                u.css(this.isHorizontal() ? b : "top", y + "px");
              }
            }
            if (
              ("fraction" === t.type &&
                (a.find(M(t.currentClass)).text(t.formatFractionCurrent(i + 1)),
                a.find(M(t.totalClass)).text(t.formatFractionTotal(r))),
              "progressbar" === t.type)
            ) {
              var x;
              x = t.progressbarOpposite
                ? this.isHorizontal()
                  ? "vertical"
                  : "horizontal"
                : this.isHorizontal()
                ? "horizontal"
                : "vertical";
              var w = (i + 1) / r,
                k = 1,
                E = 1;
              "horizontal" === x ? (k = w) : (E = w),
                a
                  .find(M(t.progressbarFillClass))
                  .transform(
                    "translate3d(0,0,0) scaleX(" + k + ") scaleY(" + E + ")"
                  )
                  .transition(this.params.speed);
            }
            "custom" === t.type && t.renderCustom
              ? (a.html(t.renderCustom(this, i + 1, r)),
                this.emit("paginationRender", a[0]))
              : this.emit("paginationUpdate", a[0]),
              a[
                this.params.watchOverflow && this.isLocked
                  ? "addClass"
                  : "removeClass"
              ](t.lockClass);
          }
        },
        render: function () {
          var e = this.params.pagination;
          if (
            e.el &&
            this.pagination.el &&
            this.pagination.$el &&
            0 !== this.pagination.$el.length
          ) {
            var t =
                this.virtual && this.params.virtual.enabled
                  ? this.virtual.slides.length
                  : this.slides.length,
              i = this.pagination.$el,
              n = "";
            if ("bullets" === e.type) {
              var a = this.params.loop
                ? Math.ceil(
                    (t - 2 * this.loopedSlides) / this.params.slidesPerGroup
                  )
                : this.snapGrid.length;
              this.params.freeMode && !this.params.loop && a > t && (a = t);
              for (var r = 0; r < a; r += 1)
                e.renderBullet
                  ? (n += e.renderBullet.call(this, r, e.bulletClass))
                  : (n +=
                      "<" +
                      e.bulletElement +
                      ' class="' +
                      e.bulletClass +
                      '"></' +
                      e.bulletElement +
                      ">");
              i.html(n), (this.pagination.bullets = i.find(M(e.bulletClass)));
            }
            "fraction" === e.type &&
              ((n = e.renderFraction
                ? e.renderFraction.call(this, e.currentClass, e.totalClass)
                : '<span class="' +
                  e.currentClass +
                  '"></span> / <span class="' +
                  e.totalClass +
                  '"></span>'),
              i.html(n)),
              "progressbar" === e.type &&
                ((n = e.renderProgressbar
                  ? e.renderProgressbar.call(this, e.progressbarFillClass)
                  : '<span class="' + e.progressbarFillClass + '"></span>'),
                i.html(n)),
              "custom" !== e.type &&
                this.emit("paginationRender", this.pagination.$el[0]);
          }
        },
        init: function () {
          var e = this,
            t = e.params.pagination;
          if (t.el) {
            var i = m(t.el);
            0 !== i.length &&
              (e.params.uniqueNavElements &&
                "string" == typeof t.el &&
                i.length > 1 &&
                (i = e.$el.find(t.el)),
              "bullets" === t.type &&
                t.clickable &&
                i.addClass(t.clickableClass),
              i.addClass(t.modifierClass + t.type),
              "bullets" === t.type &&
                t.dynamicBullets &&
                (i.addClass("" + t.modifierClass + t.type + "-dynamic"),
                (e.pagination.dynamicBulletIndex = 0),
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
              "progressbar" === t.type &&
                t.progressbarOpposite &&
                i.addClass(t.progressbarOppositeClass),
              t.clickable &&
                i.on("click", M(t.bulletClass), function (t) {
                  t.preventDefault();
                  var i = m(this).index() * e.params.slidesPerGroup;
                  e.params.loop && (i += e.loopedSlides), e.slideTo(i);
                }),
              S(e.pagination, { $el: i, el: i[0] }));
          }
        },
        destroy: function () {
          var e = this.params.pagination;
          if (
            e.el &&
            this.pagination.el &&
            this.pagination.$el &&
            0 !== this.pagination.$el.length
          ) {
            var t = this.pagination.$el;
            t.removeClass(e.hiddenClass),
              t.removeClass(e.modifierClass + e.type),
              this.pagination.bullets &&
                this.pagination.bullets.removeClass(e.bulletActiveClass),
              e.clickable && t.off("click", M(e.bulletClass));
          }
        },
      },
      J = {
        setTranslate: function () {
          if (this.params.scrollbar.el && this.scrollbar.el) {
            var e = this.scrollbar,
              t = this.rtlTranslate,
              i = this.progress,
              n = e.dragSize,
              a = e.trackSize,
              r = e.$dragEl,
              s = e.$el,
              o = this.params.scrollbar,
              l = n,
              u = (a - n) * i;
            t
              ? (u = -u) > 0
                ? ((l = n - u), (u = 0))
                : -u + n > a && (l = a + u)
              : u < 0
              ? ((l = n + u), (u = 0))
              : u + n > a && (l = a - u),
              this.isHorizontal()
                ? (r.transform("translate3d(" + u + "px, 0, 0)"),
                  (r[0].style.width = l + "px"))
                : (r.transform("translate3d(0px, " + u + "px, 0)"),
                  (r[0].style.height = l + "px")),
              o.hide &&
                (clearTimeout(this.scrollbar.timeout),
                (s[0].style.opacity = 1),
                (this.scrollbar.timeout = setTimeout(function () {
                  (s[0].style.opacity = 0), s.transition(400);
                }, 1e3)));
          }
        },
        setTransition: function (e) {
          this.params.scrollbar.el &&
            this.scrollbar.el &&
            this.scrollbar.$dragEl.transition(e);
        },
        updateSize: function () {
          if (this.params.scrollbar.el && this.scrollbar.el) {
            var e = this.scrollbar,
              t = e.$dragEl,
              i = e.$el;
            (t[0].style.width = ""), (t[0].style.height = "");
            var n,
              a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
              r = this.size / this.virtualSize,
              s = r * (a / this.size);
            (n =
              "auto" === this.params.scrollbar.dragSize
                ? a * r
                : parseInt(this.params.scrollbar.dragSize, 10)),
              this.isHorizontal()
                ? (t[0].style.width = n + "px")
                : (t[0].style.height = n + "px"),
              (i[0].style.display = r >= 1 ? "none" : ""),
              this.params.scrollbar.hide && (i[0].style.opacity = 0),
              S(e, { trackSize: a, divider: r, moveDivider: s, dragSize: n }),
              e.$el[
                this.params.watchOverflow && this.isLocked
                  ? "addClass"
                  : "removeClass"
              ](this.params.scrollbar.lockClass);
          }
        },
        getPointerPosition: function (e) {
          return this.isHorizontal()
            ? "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].clientX
              : e.clientX
            : "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].clientY
            : e.clientY;
        },
        setDragPosition: function (e) {
          var t,
            i = this.scrollbar,
            n = this.rtlTranslate,
            a = i.$el,
            r = i.dragSize,
            s = i.trackSize,
            o = i.dragStartPos;
          (t =
            (i.getPointerPosition(e) -
              a.offset()[this.isHorizontal() ? "left" : "top"] -
              (null !== o ? o : r / 2)) /
            (s - r)),
            (t = Math.max(Math.min(t, 1), 0)),
            n && (t = 1 - t);
          var l =
            this.minTranslate() +
            (this.maxTranslate() - this.minTranslate()) * t;
          this.updateProgress(l),
            this.setTranslate(l),
            this.updateActiveIndex(),
            this.updateSlidesClasses();
        },
        onDragStart: function (e) {
          var t = this.params.scrollbar,
            i = this.scrollbar,
            n = this.$wrapperEl,
            a = i.$el,
            r = i.$dragEl;
          (this.scrollbar.isTouched = !0),
            (this.scrollbar.dragStartPos =
              e.target === r[0] || e.target === r
                ? i.getPointerPosition(e) -
                  e.target.getBoundingClientRect()[
                    this.isHorizontal() ? "left" : "top"
                  ]
                : null),
            e.preventDefault(),
            e.stopPropagation(),
            n.transition(100),
            r.transition(100),
            i.setDragPosition(e),
            clearTimeout(this.scrollbar.dragTimeout),
            a.transition(0),
            t.hide && a.css("opacity", 1),
            this.params.cssMode &&
              this.$wrapperEl.css("scroll-snap-type", "none"),
            this.emit("scrollbarDragStart", e);
        },
        onDragMove: function (e) {
          var t = this.scrollbar,
            i = this.$wrapperEl,
            n = t.$el,
            a = t.$dragEl;
          this.scrollbar.isTouched &&
            (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            t.setDragPosition(e),
            i.transition(0),
            n.transition(0),
            a.transition(0),
            this.emit("scrollbarDragMove", e));
        },
        onDragEnd: function (e) {
          var t = this.params.scrollbar,
            i = this.scrollbar,
            n = this.$wrapperEl,
            a = i.$el;
          this.scrollbar.isTouched &&
            ((this.scrollbar.isTouched = !1),
            this.params.cssMode &&
              (this.$wrapperEl.css("scroll-snap-type", ""), n.transition("")),
            t.hide &&
              (clearTimeout(this.scrollbar.dragTimeout),
              (this.scrollbar.dragTimeout = w(function () {
                a.css("opacity", 0), a.transition(400);
              }, 1e3))),
            this.emit("scrollbarDragEnd", e),
            t.snapOnRelease && this.slideToClosest());
        },
        enableDraggable: function () {
          if (this.params.scrollbar.el) {
            var e = r(),
              t = this.scrollbar,
              i = this.touchEventsTouch,
              n = this.touchEventsDesktop,
              a = this.params,
              s = this.support,
              o = t.$el[0],
              l = !(!s.passiveListener || !a.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              u = !(!s.passiveListener || !a.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            o &&
              (s.touch
                ? (o.addEventListener(i.start, this.scrollbar.onDragStart, l),
                  o.addEventListener(i.move, this.scrollbar.onDragMove, l),
                  o.addEventListener(i.end, this.scrollbar.onDragEnd, u))
                : (o.addEventListener(n.start, this.scrollbar.onDragStart, l),
                  e.addEventListener(n.move, this.scrollbar.onDragMove, l),
                  e.addEventListener(n.end, this.scrollbar.onDragEnd, u)));
          }
        },
        disableDraggable: function () {
          if (this.params.scrollbar.el) {
            var e = r(),
              t = this.scrollbar,
              i = this.touchEventsTouch,
              n = this.touchEventsDesktop,
              a = this.params,
              s = this.support,
              o = t.$el[0],
              l = !(!s.passiveListener || !a.passiveListeners) && {
                passive: !1,
                capture: !1,
              },
              u = !(!s.passiveListener || !a.passiveListeners) && {
                passive: !0,
                capture: !1,
              };
            o &&
              (s.touch
                ? (o.removeEventListener(
                    i.start,
                    this.scrollbar.onDragStart,
                    l
                  ),
                  o.removeEventListener(i.move, this.scrollbar.onDragMove, l),
                  o.removeEventListener(i.end, this.scrollbar.onDragEnd, u))
                : (o.removeEventListener(
                    n.start,
                    this.scrollbar.onDragStart,
                    l
                  ),
                  e.removeEventListener(n.move, this.scrollbar.onDragMove, l),
                  e.removeEventListener(n.end, this.scrollbar.onDragEnd, u)));
          }
        },
        init: function () {
          if (this.params.scrollbar.el) {
            var e = this.scrollbar,
              t = this.$el,
              i = this.params.scrollbar,
              n = m(i.el);
            this.params.uniqueNavElements &&
              "string" == typeof i.el &&
              n.length > 1 &&
              1 === t.find(i.el).length &&
              (n = t.find(i.el));
            var a = n.find("." + this.params.scrollbar.dragClass);
            0 === a.length &&
              ((a = m(
                '<div class="' + this.params.scrollbar.dragClass + '"></div>'
              )),
              n.append(a)),
              S(e, { $el: n, el: n[0], $dragEl: a, dragEl: a[0] }),
              i.draggable && e.enableDraggable();
          }
        },
        destroy: function () {
          this.scrollbar.disableDraggable();
        },
      },
      ee = {
        setTransform: function (e, t) {
          var i = this.rtl,
            n = m(e),
            a = i ? -1 : 1,
            r = n.attr("data-swiper-parallax") || "0",
            s = n.attr("data-swiper-parallax-x"),
            o = n.attr("data-swiper-parallax-y"),
            l = n.attr("data-swiper-parallax-scale"),
            u = n.attr("data-swiper-parallax-opacity");
          if (
            (s || o
              ? ((s = s || "0"), (o = o || "0"))
              : this.isHorizontal()
              ? ((s = r), (o = "0"))
              : ((o = r), (s = "0")),
            (s =
              s.indexOf("%") >= 0
                ? parseInt(s, 10) * t * a + "%"
                : s * t * a + "px"),
            (o =
              o.indexOf("%") >= 0 ? parseInt(o, 10) * t + "%" : o * t + "px"),
            null != u)
          ) {
            var c = u - (u - 1) * (1 - Math.abs(t));
            n[0].style.opacity = c;
          }
          if (null == l) n.transform("translate3d(" + s + ", " + o + ", 0px)");
          else {
            var d = l - (l - 1) * (1 - Math.abs(t));
            n.transform(
              "translate3d(" + s + ", " + o + ", 0px) scale(" + d + ")"
            );
          }
        },
        setTranslate: function () {
          var e = this,
            t = e.$el,
            i = e.slides,
            n = e.progress,
            a = e.snapGrid;
          t
            .children(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            )
            .each(function (t) {
              e.parallax.setTransform(t, n);
            }),
            i.each(function (t, i) {
              var r = t.progress;
              e.params.slidesPerGroup > 1 &&
                "auto" !== e.params.slidesPerView &&
                (r += Math.ceil(i / 2) - n * (a.length - 1)),
                (r = Math.min(Math.max(r, -1), 1)),
                m(t)
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                  )
                  .each(function (t) {
                    e.parallax.setTransform(t, r);
                  });
            });
        },
        setTransition: function (e) {
          void 0 === e && (e = this.params.speed);
          this.$el
            .find(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
            )
            .each(function (t) {
              var i = m(t),
                n = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
              0 === e && (n = 0), i.transition(n);
            });
        },
      },
      te = {
        getDistanceBetweenTouches: function (e) {
          if (e.targetTouches.length < 2) return 1;
          var t = e.targetTouches[0].pageX,
            i = e.targetTouches[0].pageY,
            n = e.targetTouches[1].pageX,
            a = e.targetTouches[1].pageY;
          return Math.sqrt(Math.pow(n - t, 2) + Math.pow(a - i, 2));
        },
        onGestureStart: function (e) {
          var t = this.support,
            i = this.params.zoom,
            n = this.zoom,
            a = n.gesture;
          if (
            ((n.fakeGestureTouched = !1),
            (n.fakeGestureMoved = !1),
            !t.gestures)
          ) {
            if (
              "touchstart" !== e.type ||
              ("touchstart" === e.type && e.targetTouches.length < 2)
            )
              return;
            (n.fakeGestureTouched = !0),
              (a.scaleStart = te.getDistanceBetweenTouches(e));
          }
          (a.$slideEl && a.$slideEl.length) ||
          ((a.$slideEl = m(e.target).closest("." + this.params.slideClass)),
          0 === a.$slideEl.length &&
            (a.$slideEl = this.slides.eq(this.activeIndex)),
          (a.$imageEl = a.$slideEl.find(
            "img, svg, canvas, picture, .swiper-zoom-target"
          )),
          (a.$imageWrapEl = a.$imageEl.parent("." + i.containerClass)),
          (a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
          0 !== a.$imageWrapEl.length)
            ? (a.$imageEl && a.$imageEl.transition(0),
              (this.zoom.isScaling = !0))
            : (a.$imageEl = void 0);
        },
        onGestureChange: function (e) {
          var t = this.support,
            i = this.params.zoom,
            n = this.zoom,
            a = n.gesture;
          if (!t.gestures) {
            if (
              "touchmove" !== e.type ||
              ("touchmove" === e.type && e.targetTouches.length < 2)
            )
              return;
            (n.fakeGestureMoved = !0),
              (a.scaleMove = te.getDistanceBetweenTouches(e));
          }
          a.$imageEl && 0 !== a.$imageEl.length
            ? (t.gestures
                ? (n.scale = e.scale * n.currentScale)
                : (n.scale = (a.scaleMove / a.scaleStart) * n.currentScale),
              n.scale > a.maxRatio &&
                (n.scale =
                  a.maxRatio - 1 + Math.pow(n.scale - a.maxRatio + 1, 0.5)),
              n.scale < i.minRatio &&
                (n.scale =
                  i.minRatio + 1 - Math.pow(i.minRatio - n.scale + 1, 0.5)),
              a.$imageEl.transform("translate3d(0,0,0) scale(" + n.scale + ")"))
            : "gesturechange" === e.type && n.onGestureStart(e);
        },
        onGestureEnd: function (e) {
          var t = this.device,
            i = this.support,
            n = this.params.zoom,
            a = this.zoom,
            r = a.gesture;
          if (!i.gestures) {
            if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
            if (
              "touchend" !== e.type ||
              ("touchend" === e.type &&
                e.changedTouches.length < 2 &&
                !t.android)
            )
              return;
            (a.fakeGestureTouched = !1), (a.fakeGestureMoved = !1);
          }
          r.$imageEl &&
            0 !== r.$imageEl.length &&
            ((a.scale = Math.max(Math.min(a.scale, r.maxRatio), n.minRatio)),
            r.$imageEl
              .transition(this.params.speed)
              .transform("translate3d(0,0,0) scale(" + a.scale + ")"),
            (a.currentScale = a.scale),
            (a.isScaling = !1),
            1 === a.scale && (r.$slideEl = void 0));
        },
        onTouchStart: function (e) {
          var t = this.device,
            i = this.zoom,
            n = i.gesture,
            a = i.image;
          n.$imageEl &&
            0 !== n.$imageEl.length &&
            (a.isTouched ||
              (t.android && e.cancelable && e.preventDefault(),
              (a.isTouched = !0),
              (a.touchesStart.x =
                "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (a.touchesStart.y =
                "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
        },
        onTouchMove: function (e) {
          var t = this.zoom,
            i = t.gesture,
            n = t.image,
            a = t.velocity;
          if (
            i.$imageEl &&
            0 !== i.$imageEl.length &&
            ((this.allowClick = !1), n.isTouched && i.$slideEl)
          ) {
            n.isMoved ||
              ((n.width = i.$imageEl[0].offsetWidth),
              (n.height = i.$imageEl[0].offsetHeight),
              (n.startX = E(i.$imageWrapEl[0], "x") || 0),
              (n.startY = E(i.$imageWrapEl[0], "y") || 0),
              (i.slideWidth = i.$slideEl[0].offsetWidth),
              (i.slideHeight = i.$slideEl[0].offsetHeight),
              i.$imageWrapEl.transition(0),
              this.rtl && ((n.startX = -n.startX), (n.startY = -n.startY)));
            var r = n.width * t.scale,
              s = n.height * t.scale;
            if (!(r < i.slideWidth && s < i.slideHeight)) {
              if (
                ((n.minX = Math.min(i.slideWidth / 2 - r / 2, 0)),
                (n.maxX = -n.minX),
                (n.minY = Math.min(i.slideHeight / 2 - s / 2, 0)),
                (n.maxY = -n.minY),
                (n.touchesCurrent.x =
                  "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                (n.touchesCurrent.y =
                  "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                !n.isMoved && !t.isScaling)
              ) {
                if (
                  this.isHorizontal() &&
                  ((Math.floor(n.minX) === Math.floor(n.startX) &&
                    n.touchesCurrent.x < n.touchesStart.x) ||
                    (Math.floor(n.maxX) === Math.floor(n.startX) &&
                      n.touchesCurrent.x > n.touchesStart.x))
                )
                  return void (n.isTouched = !1);
                if (
                  !this.isHorizontal() &&
                  ((Math.floor(n.minY) === Math.floor(n.startY) &&
                    n.touchesCurrent.y < n.touchesStart.y) ||
                    (Math.floor(n.maxY) === Math.floor(n.startY) &&
                      n.touchesCurrent.y > n.touchesStart.y))
                )
                  return void (n.isTouched = !1);
              }
              e.cancelable && e.preventDefault(),
                e.stopPropagation(),
                (n.isMoved = !0),
                (n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX),
                (n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY),
                n.currentX < n.minX &&
                  (n.currentX =
                    n.minX + 1 - Math.pow(n.minX - n.currentX + 1, 0.8)),
                n.currentX > n.maxX &&
                  (n.currentX =
                    n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, 0.8)),
                n.currentY < n.minY &&
                  (n.currentY =
                    n.minY + 1 - Math.pow(n.minY - n.currentY + 1, 0.8)),
                n.currentY > n.maxY &&
                  (n.currentY =
                    n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, 0.8)),
                a.prevPositionX || (a.prevPositionX = n.touchesCurrent.x),
                a.prevPositionY || (a.prevPositionY = n.touchesCurrent.y),
                a.prevTime || (a.prevTime = Date.now()),
                (a.x =
                  (n.touchesCurrent.x - a.prevPositionX) /
                  (Date.now() - a.prevTime) /
                  2),
                (a.y =
                  (n.touchesCurrent.y - a.prevPositionY) /
                  (Date.now() - a.prevTime) /
                  2),
                Math.abs(n.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
                Math.abs(n.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
                (a.prevPositionX = n.touchesCurrent.x),
                (a.prevPositionY = n.touchesCurrent.y),
                (a.prevTime = Date.now()),
                i.$imageWrapEl.transform(
                  "translate3d(" + n.currentX + "px, " + n.currentY + "px,0)"
                );
            }
          }
        },
        onTouchEnd: function () {
          var e = this.zoom,
            t = e.gesture,
            i = e.image,
            n = e.velocity;
          if (t.$imageEl && 0 !== t.$imageEl.length) {
            if (!i.isTouched || !i.isMoved)
              return (i.isTouched = !1), void (i.isMoved = !1);
            (i.isTouched = !1), (i.isMoved = !1);
            var a = 300,
              r = 300,
              s = n.x * a,
              o = i.currentX + s,
              l = n.y * r,
              u = i.currentY + l;
            0 !== n.x && (a = Math.abs((o - i.currentX) / n.x)),
              0 !== n.y && (r = Math.abs((u - i.currentY) / n.y));
            var c = Math.max(a, r);
            (i.currentX = o), (i.currentY = u);
            var d = i.width * e.scale,
              p = i.height * e.scale;
            (i.minX = Math.min(t.slideWidth / 2 - d / 2, 0)),
              (i.maxX = -i.minX),
              (i.minY = Math.min(t.slideHeight / 2 - p / 2, 0)),
              (i.maxY = -i.minY),
              (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
              (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
              t.$imageWrapEl
                .transition(c)
                .transform(
                  "translate3d(" + i.currentX + "px, " + i.currentY + "px,0)"
                );
          }
        },
        onTransitionEnd: function () {
          var e = this.zoom,
            t = e.gesture;
          t.$slideEl &&
            this.previousIndex !== this.activeIndex &&
            (t.$imageEl && t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            t.$imageWrapEl && t.$imageWrapEl.transform("translate3d(0,0,0)"),
            (e.scale = 1),
            (e.currentScale = 1),
            (t.$slideEl = void 0),
            (t.$imageEl = void 0),
            (t.$imageWrapEl = void 0));
        },
        toggle: function (e) {
          var t = this.zoom;
          t.scale && 1 !== t.scale ? t.out() : t.in(e);
        },
        in: function (e) {
          var t,
            i,
            n,
            a,
            r,
            s,
            l,
            u,
            c,
            d,
            p,
            h,
            f,
            v,
            m,
            g,
            y = o(),
            b = this.zoom,
            x = this.params.zoom,
            w = b.gesture,
            k = b.image;
          (w.$slideEl ||
            (this.params.virtual && this.params.virtual.enabled && this.virtual
              ? (w.$slideEl = this.$wrapperEl.children(
                  "." + this.params.slideActiveClass
                ))
              : (w.$slideEl = this.slides.eq(this.activeIndex)),
            (w.$imageEl = w.$slideEl.find(
              "img, svg, canvas, picture, .swiper-zoom-target"
            )),
            (w.$imageWrapEl = w.$imageEl.parent("." + x.containerClass))),
          w.$imageEl && 0 !== w.$imageEl.length) &&
            (w.$slideEl.addClass("" + x.zoomedSlideClass),
            void 0 === k.touchesStart.x && e
              ? ((t =
                  "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
                (i =
                  "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
              : ((t = k.touchesStart.x), (i = k.touchesStart.y)),
            (b.scale = w.$imageWrapEl.attr("data-swiper-zoom") || x.maxRatio),
            (b.currentScale =
              w.$imageWrapEl.attr("data-swiper-zoom") || x.maxRatio),
            e
              ? ((m = w.$slideEl[0].offsetWidth),
                (g = w.$slideEl[0].offsetHeight),
                (n = w.$slideEl.offset().left + y.scrollX + m / 2 - t),
                (a = w.$slideEl.offset().top + y.scrollY + g / 2 - i),
                (l = w.$imageEl[0].offsetWidth),
                (u = w.$imageEl[0].offsetHeight),
                (c = l * b.scale),
                (d = u * b.scale),
                (f = -(p = Math.min(m / 2 - c / 2, 0))),
                (v = -(h = Math.min(g / 2 - d / 2, 0))),
                (r = n * b.scale) < p && (r = p),
                r > f && (r = f),
                (s = a * b.scale) < h && (s = h),
                s > v && (s = v))
              : ((r = 0), (s = 0)),
            w.$imageWrapEl
              .transition(300)
              .transform("translate3d(" + r + "px, " + s + "px,0)"),
            w.$imageEl
              .transition(300)
              .transform("translate3d(0,0,0) scale(" + b.scale + ")"));
        },
        out: function () {
          var e = this.zoom,
            t = this.params.zoom,
            i = e.gesture;
          i.$slideEl ||
            (this.params.virtual && this.params.virtual.enabled && this.virtual
              ? (i.$slideEl = this.$wrapperEl.children(
                  "." + this.params.slideActiveClass
                ))
              : (i.$slideEl = this.slides.eq(this.activeIndex)),
            (i.$imageEl = i.$slideEl.find(
              "img, svg, canvas, picture, .swiper-zoom-target"
            )),
            (i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass))),
            i.$imageEl &&
              0 !== i.$imageEl.length &&
              ((e.scale = 1),
              (e.currentScale = 1),
              i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
              i.$imageEl
                .transition(300)
                .transform("translate3d(0,0,0) scale(1)"),
              i.$slideEl.removeClass("" + t.zoomedSlideClass),
              (i.$slideEl = void 0));
        },
        toggleGestures: function (e) {
          var t = this.zoom,
            i = t.slideSelector,
            n = t.passiveListener;
          this.$wrapperEl[e]("gesturestart", i, t.onGestureStart, n),
            this.$wrapperEl[e]("gesturechange", i, t.onGestureChange, n),
            this.$wrapperEl[e]("gestureend", i, t.onGestureEnd, n);
        },
        enableGestures: function () {
          this.zoom.gesturesEnabled ||
            ((this.zoom.gesturesEnabled = !0), this.zoom.toggleGestures("on"));
        },
        disableGestures: function () {
          this.zoom.gesturesEnabled &&
            ((this.zoom.gesturesEnabled = !1), this.zoom.toggleGestures("off"));
        },
        enable: function () {
          var e = this.support,
            t = this.zoom;
          if (!t.enabled) {
            t.enabled = !0;
            var i = !(
                "touchstart" !== this.touchEvents.start ||
                !e.passiveListener ||
                !this.params.passiveListeners
              ) && { passive: !0, capture: !1 },
              n = !e.passiveListener || { passive: !1, capture: !0 },
              a = "." + this.params.slideClass;
            (this.zoom.passiveListener = i),
              (this.zoom.slideSelector = a),
              e.gestures
                ? (this.$wrapperEl.on(
                    this.touchEvents.start,
                    this.zoom.enableGestures,
                    i
                  ),
                  this.$wrapperEl.on(
                    this.touchEvents.end,
                    this.zoom.disableGestures,
                    i
                  ))
                : "touchstart" === this.touchEvents.start &&
                  (this.$wrapperEl.on(
                    this.touchEvents.start,
                    a,
                    t.onGestureStart,
                    i
                  ),
                  this.$wrapperEl.on(
                    this.touchEvents.move,
                    a,
                    t.onGestureChange,
                    n
                  ),
                  this.$wrapperEl.on(
                    this.touchEvents.end,
                    a,
                    t.onGestureEnd,
                    i
                  ),
                  this.touchEvents.cancel &&
                    this.$wrapperEl.on(
                      this.touchEvents.cancel,
                      a,
                      t.onGestureEnd,
                      i
                    )),
              this.$wrapperEl.on(
                this.touchEvents.move,
                "." + this.params.zoom.containerClass,
                t.onTouchMove,
                n
              );
          }
        },
        disable: function () {
          var e = this.zoom;
          if (e.enabled) {
            var t = this.support;
            this.zoom.enabled = !1;
            var i = !(
                "touchstart" !== this.touchEvents.start ||
                !t.passiveListener ||
                !this.params.passiveListeners
              ) && { passive: !0, capture: !1 },
              n = !t.passiveListener || { passive: !1, capture: !0 },
              a = "." + this.params.slideClass;
            t.gestures
              ? (this.$wrapperEl.off(
                  this.touchEvents.start,
                  this.zoom.enableGestures,
                  i
                ),
                this.$wrapperEl.off(
                  this.touchEvents.end,
                  this.zoom.disableGestures,
                  i
                ))
              : "touchstart" === this.touchEvents.start &&
                (this.$wrapperEl.off(
                  this.touchEvents.start,
                  a,
                  e.onGestureStart,
                  i
                ),
                this.$wrapperEl.off(
                  this.touchEvents.move,
                  a,
                  e.onGestureChange,
                  n
                ),
                this.$wrapperEl.off(this.touchEvents.end, a, e.onGestureEnd, i),
                this.touchEvents.cancel &&
                  this.$wrapperEl.off(
                    this.touchEvents.cancel,
                    a,
                    e.onGestureEnd,
                    i
                  )),
              this.$wrapperEl.off(
                this.touchEvents.move,
                "." + this.params.zoom.containerClass,
                e.onTouchMove,
                n
              );
          }
        },
      },
      ie = {
        loadInSlide: function (e, t) {
          void 0 === t && (t = !0);
          var i = this,
            n = i.params.lazy;
          if (void 0 !== e && 0 !== i.slides.length) {
            var a =
                i.virtual && i.params.virtual.enabled
                  ? i.$wrapperEl.children(
                      "." +
                        i.params.slideClass +
                        '[data-swiper-slide-index="' +
                        e +
                        '"]'
                    )
                  : i.slides.eq(e),
              r = a.find(
                "." +
                  n.elementClass +
                  ":not(." +
                  n.loadedClass +
                  "):not(." +
                  n.loadingClass +
                  ")"
              );
            !a.hasClass(n.elementClass) ||
              a.hasClass(n.loadedClass) ||
              a.hasClass(n.loadingClass) ||
              r.push(a[0]),
              0 !== r.length &&
                r.each(function (e) {
                  var r = m(e);
                  r.addClass(n.loadingClass);
                  var s = r.attr("data-background"),
                    o = r.attr("data-src"),
                    l = r.attr("data-srcset"),
                    u = r.attr("data-sizes"),
                    c = r.parent("picture");
                  i.loadImage(r[0], o || s, l, u, !1, function () {
                    if (null != i && i && (!i || i.params) && !i.destroyed) {
                      if (
                        (s
                          ? (r.css("background-image", 'url("' + s + '")'),
                            r.removeAttr("data-background"))
                          : (l &&
                              (r.attr("srcset", l),
                              r.removeAttr("data-srcset")),
                            u &&
                              (r.attr("sizes", u), r.removeAttr("data-sizes")),
                            c.length &&
                              c.children("source").each(function (e) {
                                var t = m(e);
                                t.attr("data-srcset") &&
                                  (t.attr("srcset", t.attr("data-srcset")),
                                  t.removeAttr("data-srcset"));
                              }),
                            o && (r.attr("src", o), r.removeAttr("data-src"))),
                        r.addClass(n.loadedClass).removeClass(n.loadingClass),
                        a.find("." + n.preloaderClass).remove(),
                        i.params.loop && t)
                      ) {
                        var e = a.attr("data-swiper-slide-index");
                        if (a.hasClass(i.params.slideDuplicateClass)) {
                          var d = i.$wrapperEl.children(
                            '[data-swiper-slide-index="' +
                              e +
                              '"]:not(.' +
                              i.params.slideDuplicateClass +
                              ")"
                          );
                          i.lazy.loadInSlide(d.index(), !1);
                        } else {
                          var p = i.$wrapperEl.children(
                            "." +
                              i.params.slideDuplicateClass +
                              '[data-swiper-slide-index="' +
                              e +
                              '"]'
                          );
                          i.lazy.loadInSlide(p.index(), !1);
                        }
                      }
                      i.emit("lazyImageReady", a[0], r[0]),
                        i.params.autoHeight && i.updateAutoHeight();
                    }
                  }),
                    i.emit("lazyImageLoad", a[0], r[0]);
                });
          }
        },
        load: function () {
          var e = this,
            t = e.$wrapperEl,
            i = e.params,
            n = e.slides,
            a = e.activeIndex,
            r = e.virtual && i.virtual.enabled,
            s = i.lazy,
            o = i.slidesPerView;
          function l(e) {
            if (r) {
              if (
                t.children(
                  "." + i.slideClass + '[data-swiper-slide-index="' + e + '"]'
                ).length
              )
                return !0;
            } else if (n[e]) return !0;
            return !1;
          }
          function u(e) {
            return r ? m(e).attr("data-swiper-slide-index") : m(e).index();
          }
          if (
            ("auto" === o && (o = 0),
            e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
            e.params.watchSlidesVisibility)
          )
            t.children("." + i.slideVisibleClass).each(function (t) {
              var i = r ? m(t).attr("data-swiper-slide-index") : m(t).index();
              e.lazy.loadInSlide(i);
            });
          else if (o > 1)
            for (var c = a; c < a + o; c += 1) l(c) && e.lazy.loadInSlide(c);
          else e.lazy.loadInSlide(a);
          if (s.loadPrevNext)
            if (o > 1 || (s.loadPrevNextAmount && s.loadPrevNextAmount > 1)) {
              for (
                var d = s.loadPrevNextAmount,
                  p = o,
                  h = Math.min(a + p + Math.max(d, p), n.length),
                  f = Math.max(a - Math.max(p, d), 0),
                  v = a + o;
                v < h;
                v += 1
              )
                l(v) && e.lazy.loadInSlide(v);
              for (var g = f; g < a; g += 1) l(g) && e.lazy.loadInSlide(g);
            } else {
              var y = t.children("." + i.slideNextClass);
              y.length > 0 && e.lazy.loadInSlide(u(y));
              var b = t.children("." + i.slidePrevClass);
              b.length > 0 && e.lazy.loadInSlide(u(b));
            }
        },
        checkInViewOnLoad: function () {
          var e = o();
          if (this && !this.destroyed) {
            var t = this.params.lazy.scrollingElement
                ? m(this.params.lazy.scrollingElement)
                : m(e),
              i = t[0] === e,
              n = i ? e.innerWidth : t[0].offsetWidth,
              a = i ? e.innerHeight : t[0].offsetHeight,
              r = this.$el.offset(),
              s = !1;
            this.rtlTranslate && (r.left -= this.$el[0].scrollLeft);
            for (
              var l = [
                  [r.left, r.top],
                  [r.left + this.width, r.top],
                  [r.left, r.top + this.height],
                  [r.left + this.width, r.top + this.height],
                ],
                u = 0;
              u < l.length;
              u += 1
            ) {
              var c = l[u];
              if (c[0] >= 0 && c[0] <= n && c[1] >= 0 && c[1] <= a) {
                if (0 === c[0] && 0 === c[1]) continue;
                s = !0;
              }
            }
            s
              ? (this.lazy.load(), t.off("scroll", this.lazy.checkInViewOnLoad))
              : this.lazy.scrollHandlerAttached ||
                ((this.lazy.scrollHandlerAttached = !0),
                t.on("scroll", this.lazy.checkInViewOnLoad));
          }
        },
      },
      ne = {
        LinearSpline: function (e, t) {
          var i,
            n,
            a,
            r,
            s,
            o = function (e, t) {
              for (n = -1, i = e.length; i - n > 1; )
                e[(a = (i + n) >> 1)] <= t ? (n = a) : (i = a);
              return i;
            };
          return (
            (this.x = e),
            (this.y = t),
            (this.lastIndex = e.length - 1),
            (this.interpolate = function (e) {
              return e
                ? ((s = o(this.x, e)),
                  (r = s - 1),
                  ((e - this.x[r]) * (this.y[s] - this.y[r])) /
                    (this.x[s] - this.x[r]) +
                    this.y[r])
                : 0;
            }),
            this
          );
        },
        getInterpolateFunction: function (e) {
          this.controller.spline ||
            (this.controller.spline = this.params.loop
              ? new ne.LinearSpline(this.slidesGrid, e.slidesGrid)
              : new ne.LinearSpline(this.snapGrid, e.snapGrid));
        },
        setTranslate: function (e, t) {
          var i,
            n,
            a = this,
            r = a.controller.control,
            s = a.constructor;
          function o(e) {
            var t = a.rtlTranslate ? -a.translate : a.translate;
            "slide" === a.params.controller.by &&
              (a.controller.getInterpolateFunction(e),
              (n = -a.controller.spline.interpolate(-t))),
              (n && "container" !== a.params.controller.by) ||
                ((i =
                  (e.maxTranslate() - e.minTranslate()) /
                  (a.maxTranslate() - a.minTranslate())),
                (n = (t - a.minTranslate()) * i + e.minTranslate())),
              a.params.controller.inverse && (n = e.maxTranslate() - n),
              e.updateProgress(n),
              e.setTranslate(n, a),
              e.updateActiveIndex(),
              e.updateSlidesClasses();
          }
          if (Array.isArray(r))
            for (var l = 0; l < r.length; l += 1)
              r[l] !== t && r[l] instanceof s && o(r[l]);
          else r instanceof s && t !== r && o(r);
        },
        setTransition: function (e, t) {
          var i,
            n = this,
            a = n.constructor,
            r = n.controller.control;
          function s(t) {
            t.setTransition(e, n),
              0 !== e &&
                (t.transitionStart(),
                t.params.autoHeight &&
                  w(function () {
                    t.updateAutoHeight();
                  }),
                t.$wrapperEl.transitionEnd(function () {
                  r &&
                    (t.params.loop &&
                      "slide" === n.params.controller.by &&
                      t.loopFix(),
                    t.transitionEnd());
                }));
          }
          if (Array.isArray(r))
            for (i = 0; i < r.length; i += 1)
              r[i] !== t && r[i] instanceof a && s(r[i]);
          else r instanceof a && t !== r && s(r);
        },
      },
      ae = {
        getRandomNumber: function (e) {
          void 0 === e && (e = 16);
          return "x".repeat(e).replace(/x/g, function () {
            return Math.round(16 * Math.random()).toString(16);
          });
        },
        makeElFocusable: function (e) {
          return e.attr("tabIndex", "0"), e;
        },
        makeElNotFocusable: function (e) {
          return e.attr("tabIndex", "-1"), e;
        },
        addElRole: function (e, t) {
          return e.attr("role", t), e;
        },
        addElRoleDescription: function (e, t) {
          return e.attr("aria-roledescription", t), e;
        },
        addElControls: function (e, t) {
          return e.attr("aria-controls", t), e;
        },
        addElLabel: function (e, t) {
          return e.attr("aria-label", t), e;
        },
        addElId: function (e, t) {
          return e.attr("id", t), e;
        },
        addElLive: function (e, t) {
          return e.attr("aria-live", t), e;
        },
        disableEl: function (e) {
          return e.attr("aria-disabled", !0), e;
        },
        enableEl: function (e) {
          return e.attr("aria-disabled", !1), e;
        },
        onEnterOrSpaceKey: function (e) {
          if (13 === e.keyCode || 32 === e.keyCode) {
            var t = this.params.a11y,
              i = m(e.target);
            this.navigation &&
              this.navigation.$nextEl &&
              i.is(this.navigation.$nextEl) &&
              ((this.isEnd && !this.params.loop) || this.slideNext(),
              this.isEnd
                ? this.a11y.notify(t.lastSlideMessage)
                : this.a11y.notify(t.nextSlideMessage)),
              this.navigation &&
                this.navigation.$prevEl &&
                i.is(this.navigation.$prevEl) &&
                ((this.isBeginning && !this.params.loop) || this.slidePrev(),
                this.isBeginning
                  ? this.a11y.notify(t.firstSlideMessage)
                  : this.a11y.notify(t.prevSlideMessage)),
              this.pagination &&
                i.is(M(this.params.pagination.bulletClass)) &&
                i[0].click();
          }
        },
        notify: function (e) {
          var t = this.a11y.liveRegion;
          0 !== t.length && (t.html(""), t.html(e));
        },
        updateNavigation: function () {
          if (!this.params.loop && this.navigation) {
            var e = this.navigation,
              t = e.$nextEl,
              i = e.$prevEl;
            i &&
              i.length > 0 &&
              (this.isBeginning
                ? (this.a11y.disableEl(i), this.a11y.makeElNotFocusable(i))
                : (this.a11y.enableEl(i), this.a11y.makeElFocusable(i))),
              t &&
                t.length > 0 &&
                (this.isEnd
                  ? (this.a11y.disableEl(t), this.a11y.makeElNotFocusable(t))
                  : (this.a11y.enableEl(t), this.a11y.makeElFocusable(t)));
          }
        },
        updatePagination: function () {
          var e = this,
            t = e.params.a11y;
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.bullets.each(function (i) {
              var n = m(i);
              e.a11y.makeElFocusable(n),
                e.params.pagination.renderBullet ||
                  (e.a11y.addElRole(n, "button"),
                  e.a11y.addElLabel(
                    n,
                    t.paginationBulletMessage.replace(
                      /\{\{index\}\}/,
                      n.index() + 1
                    )
                  ));
            });
        },
        init: function () {
          var e = this,
            t = e.params.a11y;
          e.$el.append(e.a11y.liveRegion);
          var i = e.$el;
          t.containerRoleDescriptionMessage &&
            e.a11y.addElRoleDescription(i, t.containerRoleDescriptionMessage),
            t.containerMessage && e.a11y.addElLabel(i, t.containerMessage);
          var n,
            a,
            r,
            s = e.$wrapperEl,
            o = s.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16);
          e.a11y.addElId(s, o),
            (n =
              e.params.autoplay && e.params.autoplay.enabled
                ? "off"
                : "polite"),
            e.a11y.addElLive(s, n),
            t.itemRoleDescriptionMessage &&
              e.a11y.addElRoleDescription(
                m(e.slides),
                t.itemRoleDescriptionMessage
              ),
            e.a11y.addElRole(m(e.slides), "group"),
            e.slides.each(function (i) {
              var n = m(i),
                a = t.slideLabelMessage
                  .replace(/\{\{index\}\}/, n.index() + 1)
                  .replace(/\{\{slidesLength\}\}/, e.slides.length);
              e.a11y.addElLabel(n, a);
            }),
            e.navigation && e.navigation.$nextEl && (a = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (r = e.navigation.$prevEl),
            a &&
              a.length &&
              (e.a11y.makeElFocusable(a),
              "BUTTON" !== a[0].tagName &&
                (e.a11y.addElRole(a, "button"),
                a.on("keydown", e.a11y.onEnterOrSpaceKey)),
              e.a11y.addElLabel(a, t.nextSlideMessage),
              e.a11y.addElControls(a, o)),
            r &&
              r.length &&
              (e.a11y.makeElFocusable(r),
              "BUTTON" !== r[0].tagName &&
                (e.a11y.addElRole(r, "button"),
                r.on("keydown", e.a11y.onEnterOrSpaceKey)),
              e.a11y.addElLabel(r, t.prevSlideMessage),
              e.a11y.addElControls(r, o)),
            e.pagination &&
              e.params.pagination.clickable &&
              e.pagination.bullets &&
              e.pagination.bullets.length &&
              e.pagination.$el.on(
                "keydown",
                M(e.params.pagination.bulletClass),
                e.a11y.onEnterOrSpaceKey
              );
        },
        destroy: function () {
          var e, t;
          this.a11y.liveRegion &&
            this.a11y.liveRegion.length > 0 &&
            this.a11y.liveRegion.remove(),
            this.navigation &&
              this.navigation.$nextEl &&
              (e = this.navigation.$nextEl),
            this.navigation &&
              this.navigation.$prevEl &&
              (t = this.navigation.$prevEl),
            e && e.off("keydown", this.a11y.onEnterOrSpaceKey),
            t && t.off("keydown", this.a11y.onEnterOrSpaceKey),
            this.pagination &&
              this.params.pagination.clickable &&
              this.pagination.bullets &&
              this.pagination.bullets.length &&
              this.pagination.$el.off(
                "keydown",
                M(this.params.pagination.bulletClass),
                this.a11y.onEnterOrSpaceKey
              );
        },
      },
      re = {
        init: function () {
          var e = o();
          if (this.params.history) {
            if (!e.history || !e.history.pushState)
              return (
                (this.params.history.enabled = !1),
                void (this.params.hashNavigation.enabled = !0)
              );
            var t = this.history;
            (t.initialized = !0),
              (t.paths = re.getPathValues(this.params.url)),
              (t.paths.key || t.paths.value) &&
                (t.scrollToSlide(
                  0,
                  t.paths.value,
                  this.params.runCallbacksOnInit
                ),
                this.params.history.replaceState ||
                  e.addEventListener(
                    "popstate",
                    this.history.setHistoryPopState
                  ));
          }
        },
        destroy: function () {
          var e = o();
          this.params.history.replaceState ||
            e.removeEventListener("popstate", this.history.setHistoryPopState);
        },
        setHistoryPopState: function () {
          (this.history.paths = re.getPathValues(this.params.url)),
            this.history.scrollToSlide(
              this.params.speed,
              this.history.paths.value,
              !1
            );
        },
        getPathValues: function (e) {
          var t = o(),
            i = (e ? new URL(e) : t.location).pathname
              .slice(1)
              .split("/")
              .filter(function (e) {
                return "" !== e;
              }),
            n = i.length;
          return { key: i[n - 2], value: i[n - 1] };
        },
        setHistory: function (e, t) {
          var i = o();
          if (this.history.initialized && this.params.history.enabled) {
            var n;
            n = this.params.url ? new URL(this.params.url) : i.location;
            var a = this.slides.eq(t),
              r = re.slugify(a.attr("data-history"));
            n.pathname.includes(e) || (r = e + "/" + r);
            var s = i.history.state;
            (s && s.value === r) ||
              (this.params.history.replaceState
                ? i.history.replaceState({ value: r }, null, r)
                : i.history.pushState({ value: r }, null, r));
          }
        },
        slugify: function (e) {
          return e
            .toString()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
        },
        scrollToSlide: function (e, t, i) {
          if (t)
            for (var n = 0, a = this.slides.length; n < a; n += 1) {
              var r = this.slides.eq(n);
              if (
                re.slugify(r.attr("data-history")) === t &&
                !r.hasClass(this.params.slideDuplicateClass)
              ) {
                var s = r.index();
                this.slideTo(s, e, i);
              }
            }
          else this.slideTo(0, e, i);
        },
      },
      se = {
        onHashCange: function () {
          var e = r();
          this.emit("hashChange");
          var t = e.location.hash.replace("#", "");
          if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
            var i = this.$wrapperEl
              .children(
                "." + this.params.slideClass + '[data-hash="' + t + '"]'
              )
              .index();
            if (void 0 === i) return;
            this.slideTo(i);
          }
        },
        setHash: function () {
          var e = o(),
            t = r();
          if (
            this.hashNavigation.initialized &&
            this.params.hashNavigation.enabled
          )
            if (
              this.params.hashNavigation.replaceState &&
              e.history &&
              e.history.replaceState
            )
              e.history.replaceState(
                null,
                null,
                "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""
              ),
                this.emit("hashSet");
            else {
              var i = this.slides.eq(this.activeIndex),
                n = i.attr("data-hash") || i.attr("data-history");
              (t.location.hash = n || ""), this.emit("hashSet");
            }
        },
        init: function () {
          var e = r(),
            t = o();
          if (
            !(
              !this.params.hashNavigation.enabled ||
              (this.params.history && this.params.history.enabled)
            )
          ) {
            this.hashNavigation.initialized = !0;
            var i = e.location.hash.replace("#", "");
            if (i)
              for (var n = 0, a = this.slides.length; n < a; n += 1) {
                var s = this.slides.eq(n);
                if (
                  (s.attr("data-hash") || s.attr("data-history")) === i &&
                  !s.hasClass(this.params.slideDuplicateClass)
                ) {
                  var l = s.index();
                  this.slideTo(l, 0, this.params.runCallbacksOnInit, !0);
                }
              }
            this.params.hashNavigation.watchState &&
              m(t).on("hashchange", this.hashNavigation.onHashCange);
          }
        },
        destroy: function () {
          var e = o();
          this.params.hashNavigation.watchState &&
            m(e).off("hashchange", this.hashNavigation.onHashCange);
        },
      },
      oe = {
        run: function () {
          var e = this,
            t = e.slides.eq(e.activeIndex),
            i = e.params.autoplay.delay;
          t.attr("data-swiper-autoplay") &&
            (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(e.autoplay.timeout),
            (e.autoplay.timeout = w(function () {
              var t;
              e.params.autoplay.reverseDirection
                ? e.params.loop
                  ? (e.loopFix(),
                    (t = e.slidePrev(e.params.speed, !0, !0)),
                    e.emit("autoplay"))
                  : e.isBeginning
                  ? e.params.autoplay.stopOnLastSlide
                    ? e.autoplay.stop()
                    : ((t = e.slideTo(
                        e.slides.length - 1,
                        e.params.speed,
                        !0,
                        !0
                      )),
                      e.emit("autoplay"))
                  : ((t = e.slidePrev(e.params.speed, !0, !0)),
                    e.emit("autoplay"))
                : e.params.loop
                ? (e.loopFix(),
                  (t = e.slideNext(e.params.speed, !0, !0)),
                  e.emit("autoplay"))
                : e.isEnd
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : ((t = e.slideTo(0, e.params.speed, !0, !0)),
                    e.emit("autoplay"))
                : ((t = e.slideNext(e.params.speed, !0, !0)),
                  e.emit("autoplay")),
                ((e.params.cssMode && e.autoplay.running) || !1 === t) &&
                  e.autoplay.run();
            }, i));
        },
        start: function () {
          return (
            void 0 === this.autoplay.timeout &&
            !this.autoplay.running &&
            ((this.autoplay.running = !0),
            this.emit("autoplayStart"),
            this.autoplay.run(),
            !0)
          );
        },
        stop: function () {
          return (
            !!this.autoplay.running &&
            void 0 !== this.autoplay.timeout &&
            (this.autoplay.timeout &&
              (clearTimeout(this.autoplay.timeout),
              (this.autoplay.timeout = void 0)),
            (this.autoplay.running = !1),
            this.emit("autoplayStop"),
            !0)
          );
        },
        pause: function (e) {
          this.autoplay.running &&
            (this.autoplay.paused ||
              (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
              (this.autoplay.paused = !0),
              0 !== e && this.params.autoplay.waitForTransition
                ? (this.$wrapperEl[0].addEventListener(
                    "transitionend",
                    this.autoplay.onTransitionEnd
                  ),
                  this.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    this.autoplay.onTransitionEnd
                  ))
                : ((this.autoplay.paused = !1), this.autoplay.run())));
        },
        onVisibilityChange: function () {
          var e = r();
          "hidden" === e.visibilityState &&
            this.autoplay.running &&
            this.autoplay.pause(),
            "visible" === e.visibilityState &&
              this.autoplay.paused &&
              (this.autoplay.run(), (this.autoplay.paused = !1));
        },
        onTransitionEnd: function (e) {
          this &&
            !this.destroyed &&
            this.$wrapperEl &&
            e.target === this.$wrapperEl[0] &&
            (this.$wrapperEl[0].removeEventListener(
              "transitionend",
              this.autoplay.onTransitionEnd
            ),
            this.$wrapperEl[0].removeEventListener(
              "webkitTransitionEnd",
              this.autoplay.onTransitionEnd
            ),
            (this.autoplay.paused = !1),
            this.autoplay.running ? this.autoplay.run() : this.autoplay.stop());
        },
      },
      le = {
        setTranslate: function () {
          for (var e = this.slides, t = 0; t < e.length; t += 1) {
            var i = this.slides.eq(t),
              n = -i[0].swiperSlideOffset;
            this.params.virtualTranslate || (n -= this.translate);
            var a = 0;
            this.isHorizontal() || ((a = n), (n = 0));
            var r = this.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(i[0].progress), 0)
              : 1 + Math.min(Math.max(i[0].progress, -1), 0);
            i.css({ opacity: r }).transform(
              "translate3d(" + n + "px, " + a + "px, 0px)"
            );
          }
        },
        setTransition: function (e) {
          var t = this,
            i = t.slides,
            n = t.$wrapperEl;
          if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
            var a = !1;
            i.transitionEnd(function () {
              if (!a && t && !t.destroyed) {
                (a = !0), (t.animating = !1);
                for (
                  var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                  i < e.length;
                  i += 1
                )
                  n.trigger(e[i]);
              }
            });
          }
        },
      },
      ue = {
        setTranslate: function () {
          var e,
            t = this.$el,
            i = this.$wrapperEl,
            n = this.slides,
            a = this.width,
            r = this.height,
            s = this.rtlTranslate,
            o = this.size,
            l = this.browser,
            u = this.params.cubeEffect,
            c = this.isHorizontal(),
            d = this.virtual && this.params.virtual.enabled,
            p = 0;
          u.shadow &&
            (c
              ? (0 === (e = i.find(".swiper-cube-shadow")).length &&
                  ((e = m('<div class="swiper-cube-shadow"></div>')),
                  i.append(e)),
                e.css({ height: a + "px" }))
              : 0 === (e = t.find(".swiper-cube-shadow")).length &&
                ((e = m('<div class="swiper-cube-shadow"></div>')),
                t.append(e)));
          for (var h = 0; h < n.length; h += 1) {
            var f = n.eq(h),
              v = h;
            d && (v = parseInt(f.attr("data-swiper-slide-index"), 10));
            var g = 90 * v,
              y = Math.floor(g / 360);
            s && ((g = -g), (y = Math.floor(-g / 360)));
            var b = Math.max(Math.min(f[0].progress, 1), -1),
              x = 0,
              w = 0,
              k = 0;
            v % 4 == 0
              ? ((x = 4 * -y * o), (k = 0))
              : (v - 1) % 4 == 0
              ? ((x = 0), (k = 4 * -y * o))
              : (v - 2) % 4 == 0
              ? ((x = o + 4 * y * o), (k = o))
              : (v - 3) % 4 == 0 && ((x = -o), (k = 3 * o + 4 * o * y)),
              s && (x = -x),
              c || ((w = x), (x = 0));
            var E =
              "rotateX(" +
              (c ? 0 : -g) +
              "deg) rotateY(" +
              (c ? g : 0) +
              "deg) translate3d(" +
              x +
              "px, " +
              w +
              "px, " +
              k +
              "px)";
            if (
              (b <= 1 &&
                b > -1 &&
                ((p = 90 * v + 90 * b), s && (p = 90 * -v - 90 * b)),
              f.transform(E),
              u.slideShadows)
            ) {
              var T = c
                  ? f.find(".swiper-slide-shadow-left")
                  : f.find(".swiper-slide-shadow-top"),
                S = c
                  ? f.find(".swiper-slide-shadow-right")
                  : f.find(".swiper-slide-shadow-bottom");
              0 === T.length &&
                ((T = m(
                  '<div class="swiper-slide-shadow-' +
                    (c ? "left" : "top") +
                    '"></div>'
                )),
                f.append(T)),
                0 === S.length &&
                  ((S = m(
                    '<div class="swiper-slide-shadow-' +
                      (c ? "right" : "bottom") +
                      '"></div>'
                  )),
                  f.append(S)),
                T.length && (T[0].style.opacity = Math.max(-b, 0)),
                S.length && (S[0].style.opacity = Math.max(b, 0));
            }
          }
          if (
            (i.css({
              "-webkit-transform-origin": "50% 50% -" + o / 2 + "px",
              "-moz-transform-origin": "50% 50% -" + o / 2 + "px",
              "-ms-transform-origin": "50% 50% -" + o / 2 + "px",
              "transform-origin": "50% 50% -" + o / 2 + "px",
            }),
            u.shadow)
          )
            if (c)
              e.transform(
                "translate3d(0px, " +
                  (a / 2 + u.shadowOffset) +
                  "px, " +
                  -a / 2 +
                  "px) rotateX(90deg) rotateZ(0deg) scale(" +
                  u.shadowScale +
                  ")"
              );
            else {
              var C = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
                M =
                  1.5 -
                  (Math.sin((2 * C * Math.PI) / 360) / 2 +
                    Math.cos((2 * C * Math.PI) / 360) / 2),
                P = u.shadowScale,
                O = u.shadowScale / M,
                A = u.shadowOffset;
              e.transform(
                "scale3d(" +
                  P +
                  ", 1, " +
                  O +
                  ") translate3d(0px, " +
                  (r / 2 + A) +
                  "px, " +
                  -r / 2 / O +
                  "px) rotateX(-90deg)"
              );
            }
          var L = l.isSafari || l.isWebView ? -o / 2 : 0;
          i.transform(
            "translate3d(0px,0," +
              L +
              "px) rotateX(" +
              (this.isHorizontal() ? 0 : p) +
              "deg) rotateY(" +
              (this.isHorizontal() ? -p : 0) +
              "deg)"
          );
        },
        setTransition: function (e) {
          var t = this.$el;
          this.slides
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
            this.params.cubeEffect.shadow &&
              !this.isHorizontal() &&
              t.find(".swiper-cube-shadow").transition(e);
        },
      },
      ce = {
        setTranslate: function () {
          for (
            var e = this.slides, t = this.rtlTranslate, i = 0;
            i < e.length;
            i += 1
          ) {
            var n = e.eq(i),
              a = n[0].progress;
            this.params.flipEffect.limitRotation &&
              (a = Math.max(Math.min(n[0].progress, 1), -1));
            var r = -180 * a,
              s = 0,
              o = -n[0].swiperSlideOffset,
              l = 0;
            if (
              (this.isHorizontal()
                ? t && (r = -r)
                : ((l = o), (o = 0), (s = -r), (r = 0)),
              (n[0].style.zIndex = -Math.abs(Math.round(a)) + e.length),
              this.params.flipEffect.slideShadows)
            ) {
              var u = this.isHorizontal()
                  ? n.find(".swiper-slide-shadow-left")
                  : n.find(".swiper-slide-shadow-top"),
                c = this.isHorizontal()
                  ? n.find(".swiper-slide-shadow-right")
                  : n.find(".swiper-slide-shadow-bottom");
              0 === u.length &&
                ((u = m(
                  '<div class="swiper-slide-shadow-' +
                    (this.isHorizontal() ? "left" : "top") +
                    '"></div>'
                )),
                n.append(u)),
                0 === c.length &&
                  ((c = m(
                    '<div class="swiper-slide-shadow-' +
                      (this.isHorizontal() ? "right" : "bottom") +
                      '"></div>'
                  )),
                  n.append(c)),
                u.length && (u[0].style.opacity = Math.max(-a, 0)),
                c.length && (c[0].style.opacity = Math.max(a, 0));
            }
            n.transform(
              "translate3d(" +
                o +
                "px, " +
                l +
                "px, 0px) rotateX(" +
                s +
                "deg) rotateY(" +
                r +
                "deg)"
            );
          }
        },
        setTransition: function (e) {
          var t = this,
            i = t.slides,
            n = t.activeIndex,
            a = t.$wrapperEl;
          if (
            (i
              .transition(e)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(e),
            t.params.virtualTranslate && 0 !== e)
          ) {
            var r = !1;
            i.eq(n).transitionEnd(function () {
              if (!r && t && !t.destroyed) {
                (r = !0), (t.animating = !1);
                for (
                  var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                  i < e.length;
                  i += 1
                )
                  a.trigger(e[i]);
              }
            });
          }
        },
      },
      de = {
        setTranslate: function () {
          for (
            var e = this.width,
              t = this.height,
              i = this.slides,
              n = this.slidesSizesGrid,
              a = this.params.coverflowEffect,
              r = this.isHorizontal(),
              s = this.translate,
              o = r ? e / 2 - s : t / 2 - s,
              l = r ? a.rotate : -a.rotate,
              u = a.depth,
              c = 0,
              d = i.length;
            c < d;
            c += 1
          ) {
            var p = i.eq(c),
              h = n[c],
              f = ((o - p[0].swiperSlideOffset - h / 2) / h) * a.modifier,
              v = r ? l * f : 0,
              g = r ? 0 : l * f,
              y = -u * Math.abs(f),
              b = a.stretch;
            "string" == typeof b &&
              -1 !== b.indexOf("%") &&
              (b = (parseFloat(a.stretch) / 100) * h);
            var x = r ? 0 : b * f,
              w = r ? b * f : 0,
              k = 1 - (1 - a.scale) * Math.abs(f);
            Math.abs(w) < 0.001 && (w = 0),
              Math.abs(x) < 0.001 && (x = 0),
              Math.abs(y) < 0.001 && (y = 0),
              Math.abs(v) < 0.001 && (v = 0),
              Math.abs(g) < 0.001 && (g = 0),
              Math.abs(k) < 0.001 && (k = 0);
            var E =
              "translate3d(" +
              w +
              "px," +
              x +
              "px," +
              y +
              "px)  rotateX(" +
              g +
              "deg) rotateY(" +
              v +
              "deg) scale(" +
              k +
              ")";
            if (
              (p.transform(E),
              (p[0].style.zIndex = 1 - Math.abs(Math.round(f))),
              a.slideShadows)
            ) {
              var T = r
                  ? p.find(".swiper-slide-shadow-left")
                  : p.find(".swiper-slide-shadow-top"),
                S = r
                  ? p.find(".swiper-slide-shadow-right")
                  : p.find(".swiper-slide-shadow-bottom");
              0 === T.length &&
                ((T = m(
                  '<div class="swiper-slide-shadow-' +
                    (r ? "left" : "top") +
                    '"></div>'
                )),
                p.append(T)),
                0 === S.length &&
                  ((S = m(
                    '<div class="swiper-slide-shadow-' +
                      (r ? "right" : "bottom") +
                      '"></div>'
                  )),
                  p.append(S)),
                T.length && (T[0].style.opacity = f > 0 ? f : 0),
                S.length && (S[0].style.opacity = -f > 0 ? -f : 0);
            }
          }
        },
        setTransition: function (e) {
          this.slides
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e);
        },
      },
      pe = {
        init: function () {
          var e = this.params.thumbs;
          if (this.thumbs.initialized) return !1;
          this.thumbs.initialized = !0;
          var t = this.constructor;
          return (
            e.swiper instanceof t
              ? ((this.thumbs.swiper = e.swiper),
                S(this.thumbs.swiper.originalParams, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }),
                S(this.thumbs.swiper.params, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }))
              : T(e.swiper) &&
                ((this.thumbs.swiper = new t(
                  S({}, e.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1,
                  })
                )),
                (this.thumbs.swiperCreated = !0)),
            this.thumbs.swiper.$el.addClass(
              this.params.thumbs.thumbsContainerClass
            ),
            this.thumbs.swiper.on("tap", this.thumbs.onThumbClick),
            !0
          );
        },
        onThumbClick: function () {
          var e = this.thumbs.swiper;
          if (e) {
            var t = e.clickedIndex,
              i = e.clickedSlide;
            if (
              !(
                (i &&
                  m(i).hasClass(this.params.thumbs.slideThumbActiveClass)) ||
                null == t
              )
            ) {
              var n;
              if (
                ((n = e.params.loop
                  ? parseInt(
                      m(e.clickedSlide).attr("data-swiper-slide-index"),
                      10
                    )
                  : t),
                this.params.loop)
              ) {
                var a = this.activeIndex;
                this.slides.eq(a).hasClass(this.params.slideDuplicateClass) &&
                  (this.loopFix(),
                  (this._clientLeft = this.$wrapperEl[0].clientLeft),
                  (a = this.activeIndex));
                var r = this.slides
                    .eq(a)
                    .prevAll('[data-swiper-slide-index="' + n + '"]')
                    .eq(0)
                    .index(),
                  s = this.slides
                    .eq(a)
                    .nextAll('[data-swiper-slide-index="' + n + '"]')
                    .eq(0)
                    .index();
                n = void 0 === r ? s : void 0 === s ? r : s - a < a - r ? s : r;
              }
              this.slideTo(n);
            }
          }
        },
        update: function (e) {
          var t = this.thumbs.swiper;
          if (t) {
            var i =
                "auto" === t.params.slidesPerView
                  ? t.slidesPerViewDynamic()
                  : t.params.slidesPerView,
              n = this.params.thumbs.autoScrollOffset,
              a = n && !t.params.loop;
            if (this.realIndex !== t.realIndex || a) {
              var r,
                s,
                o = t.activeIndex;
              if (t.params.loop) {
                t.slides.eq(o).hasClass(t.params.slideDuplicateClass) &&
                  (t.loopFix(),
                  (t._clientLeft = t.$wrapperEl[0].clientLeft),
                  (o = t.activeIndex));
                var l = t.slides
                    .eq(o)
                    .prevAll(
                      '[data-swiper-slide-index="' + this.realIndex + '"]'
                    )
                    .eq(0)
                    .index(),
                  u = t.slides
                    .eq(o)
                    .nextAll(
                      '[data-swiper-slide-index="' + this.realIndex + '"]'
                    )
                    .eq(0)
                    .index();
                (r =
                  void 0 === l
                    ? u
                    : void 0 === u
                    ? l
                    : u - o == o - l
                    ? o
                    : u - o < o - l
                    ? u
                    : l),
                  (s = this.activeIndex > this.previousIndex ? "next" : "prev");
              } else
                s = (r = this.realIndex) > this.previousIndex ? "next" : "prev";
              a && (r += "next" === s ? n : -1 * n),
                t.visibleSlidesIndexes &&
                  t.visibleSlidesIndexes.indexOf(r) < 0 &&
                  (t.params.centeredSlides
                    ? (r =
                        r > o
                          ? r - Math.floor(i / 2) + 1
                          : r + Math.floor(i / 2) - 1)
                    : r > o && (r = r - i + 1),
                  t.slideTo(r, e ? 0 : void 0));
            }
            var c = 1,
              d = this.params.thumbs.slideThumbActiveClass;
            if (
              (this.params.slidesPerView > 1 &&
                !this.params.centeredSlides &&
                (c = this.params.slidesPerView),
              this.params.thumbs.multipleActiveThumbs || (c = 1),
              (c = Math.floor(c)),
              t.slides.removeClass(d),
              t.params.loop || (t.params.virtual && t.params.virtual.enabled))
            )
              for (var p = 0; p < c; p += 1)
                t.$wrapperEl
                  .children(
                    '[data-swiper-slide-index="' + (this.realIndex + p) + '"]'
                  )
                  .addClass(d);
            else
              for (var h = 0; h < c; h += 1)
                t.slides.eq(this.realIndex + h).addClass(d);
          }
        },
      },
      he = [
        X,
        U,
        {
          name: "mousewheel",
          params: {
            mousewheel: {
              enabled: !1,
              releaseOnEdges: !1,
              invert: !1,
              forceToAxis: !1,
              sensitivity: 1,
              eventsTarget: "container",
              thresholdDelta: null,
              thresholdTime: null,
            },
          },
          create: function () {
            C(this, {
              mousewheel: {
                enabled: !1,
                lastScrollTime: k(),
                lastEventBeforeSnap: void 0,
                recentWheelEvents: [],
                enable: K.enable,
                disable: K.disable,
                handle: K.handle,
                handleMouseEnter: K.handleMouseEnter,
                handleMouseLeave: K.handleMouseLeave,
                animateSlider: K.animateSlider,
                releaseScroll: K.releaseScroll,
              },
            });
          },
          on: {
            init: function (e) {
              !e.params.mousewheel.enabled &&
                e.params.cssMode &&
                e.mousewheel.disable(),
                e.params.mousewheel.enabled && e.mousewheel.enable();
            },
            destroy: function (e) {
              e.params.cssMode && e.mousewheel.enable(),
                e.mousewheel.enabled && e.mousewheel.disable();
            },
          },
        },
        {
          name: "navigation",
          params: {
            navigation: {
              nextEl: null,
              prevEl: null,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
            },
          },
          create: function () {
            C(this, { navigation: t({}, Q) });
          },
          on: {
            init: function (e) {
              e.navigation.init(), e.navigation.update();
            },
            toEdge: function (e) {
              e.navigation.update();
            },
            fromEdge: function (e) {
              e.navigation.update();
            },
            destroy: function (e) {
              e.navigation.destroy();
            },
            click: function (e, t) {
              var i = e.navigation,
                n = i.$nextEl,
                a = i.$prevEl,
                r = t.target;
              if (
                e.params.navigation.hideOnClick &&
                !m(r).is(a) &&
                !m(r).is(n)
              ) {
                if (
                  e.pagination &&
                  e.params.pagination &&
                  e.params.pagination.clickable &&
                  (e.pagination.el === r || e.pagination.el.contains(r))
                )
                  return;
                var s;
                n
                  ? (s = n.hasClass(e.params.navigation.hiddenClass))
                  : a && (s = a.hasClass(e.params.navigation.hiddenClass)),
                  !0 === s
                    ? e.emit("navigationShow")
                    : e.emit("navigationHide"),
                  n && n.toggleClass(e.params.navigation.hiddenClass),
                  a && a.toggleClass(e.params.navigation.hiddenClass);
              }
            },
          },
        },
        {
          name: "pagination",
          params: {
            pagination: {
              el: null,
              bulletElement: "span",
              clickable: !1,
              hideOnClick: !1,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: !1,
              type: "bullets",
              dynamicBullets: !1,
              dynamicMainBullets: 1,
              formatFractionCurrent: function (e) {
                return e;
              },
              formatFractionTotal: function (e) {
                return e;
              },
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
              modifierClass: "swiper-pagination-",
              currentClass: "swiper-pagination-current",
              totalClass: "swiper-pagination-total",
              hiddenClass: "swiper-pagination-hidden",
              progressbarFillClass: "swiper-pagination-progressbar-fill",
              progressbarOppositeClass:
                "swiper-pagination-progressbar-opposite",
              clickableClass: "swiper-pagination-clickable",
              lockClass: "swiper-pagination-lock",
            },
          },
          create: function () {
            C(this, { pagination: t({ dynamicBulletIndex: 0 }, Z) });
          },
          on: {
            init: function (e) {
              e.pagination.init(), e.pagination.render(), e.pagination.update();
            },
            activeIndexChange: function (e) {
              (e.params.loop || void 0 === e.snapIndex) &&
                e.pagination.update();
            },
            snapIndexChange: function (e) {
              e.params.loop || e.pagination.update();
            },
            slidesLengthChange: function (e) {
              e.params.loop && (e.pagination.render(), e.pagination.update());
            },
            snapGridLengthChange: function (e) {
              e.params.loop || (e.pagination.render(), e.pagination.update());
            },
            destroy: function (e) {
              e.pagination.destroy();
            },
            click: function (e, t) {
              var i = t.target;
              if (
                e.params.pagination.el &&
                e.params.pagination.hideOnClick &&
                e.pagination.$el.length > 0 &&
                !m(i).hasClass(e.params.pagination.bulletClass)
              ) {
                if (
                  e.navigation &&
                  ((e.navigation.nextEl && i === e.navigation.nextEl) ||
                    (e.navigation.prevEl && i === e.navigation.prevEl))
                )
                  return;
                !0 ===
                e.pagination.$el.hasClass(e.params.pagination.hiddenClass)
                  ? e.emit("paginationShow")
                  : e.emit("paginationHide"),
                  e.pagination.$el.toggleClass(e.params.pagination.hiddenClass);
              }
            },
          },
        },
        {
          name: "scrollbar",
          params: {
            scrollbar: {
              el: null,
              dragSize: "auto",
              hide: !1,
              draggable: !1,
              snapOnRelease: !0,
              lockClass: "swiper-scrollbar-lock",
              dragClass: "swiper-scrollbar-drag",
            },
          },
          create: function () {
            C(this, {
              scrollbar: t(
                { isTouched: !1, timeout: null, dragTimeout: null },
                J
              ),
            });
          },
          on: {
            init: function (e) {
              e.scrollbar.init(),
                e.scrollbar.updateSize(),
                e.scrollbar.setTranslate();
            },
            update: function (e) {
              e.scrollbar.updateSize();
            },
            resize: function (e) {
              e.scrollbar.updateSize();
            },
            observerUpdate: function (e) {
              e.scrollbar.updateSize();
            },
            setTranslate: function (e) {
              e.scrollbar.setTranslate();
            },
            setTransition: function (e, t) {
              e.scrollbar.setTransition(t);
            },
            destroy: function (e) {
              e.scrollbar.destroy();
            },
          },
        },
        {
          name: "parallax",
          params: { parallax: { enabled: !1 } },
          create: function () {
            C(this, { parallax: t({}, ee) });
          },
          on: {
            beforeInit: function (e) {
              e.params.parallax.enabled &&
                ((e.params.watchSlidesProgress = !0),
                (e.originalParams.watchSlidesProgress = !0));
            },
            init: function (e) {
              e.params.parallax.enabled && e.parallax.setTranslate();
            },
            setTranslate: function (e) {
              e.params.parallax.enabled && e.parallax.setTranslate();
            },
            setTransition: function (e, t) {
              e.params.parallax.enabled && e.parallax.setTransition(t);
            },
          },
        },
        {
          name: "zoom",
          params: {
            zoom: {
              enabled: !1,
              maxRatio: 3,
              minRatio: 1,
              toggle: !0,
              containerClass: "swiper-zoom-container",
              zoomedSlideClass: "swiper-slide-zoomed",
            },
          },
          create: function () {
            var e = this;
            C(e, {
              zoom: t(
                {
                  enabled: !1,
                  scale: 1,
                  currentScale: 1,
                  isScaling: !1,
                  gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3,
                  },
                  image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {},
                  },
                  velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0,
                  },
                },
                te
              ),
            });
            var i = 1;
            Object.defineProperty(e.zoom, "scale", {
              get: function () {
                return i;
              },
              set: function (t) {
                if (i !== t) {
                  var n = e.zoom.gesture.$imageEl
                      ? e.zoom.gesture.$imageEl[0]
                      : void 0,
                    a = e.zoom.gesture.$slideEl
                      ? e.zoom.gesture.$slideEl[0]
                      : void 0;
                  e.emit("zoomChange", t, n, a);
                }
                i = t;
              },
            });
          },
          on: {
            init: function (e) {
              e.params.zoom.enabled && e.zoom.enable();
            },
            destroy: function (e) {
              e.zoom.disable();
            },
            touchStart: function (e, t) {
              e.zoom.enabled && e.zoom.onTouchStart(t);
            },
            touchEnd: function (e, t) {
              e.zoom.enabled && e.zoom.onTouchEnd(t);
            },
            doubleTap: function (e, t) {
              !e.animating &&
                e.params.zoom.enabled &&
                e.zoom.enabled &&
                e.params.zoom.toggle &&
                e.zoom.toggle(t);
            },
            transitionEnd: function (e) {
              e.zoom.enabled &&
                e.params.zoom.enabled &&
                e.zoom.onTransitionEnd();
            },
            slideChange: function (e) {
              e.zoom.enabled &&
                e.params.zoom.enabled &&
                e.params.cssMode &&
                e.zoom.onTransitionEnd();
            },
          },
        },
        {
          name: "lazy",
          params: {
            lazy: {
              checkInView: !1,
              enabled: !1,
              loadPrevNext: !1,
              loadPrevNextAmount: 1,
              loadOnTransitionStart: !1,
              scrollingElement: "",
              elementClass: "swiper-lazy",
              loadingClass: "swiper-lazy-loading",
              loadedClass: "swiper-lazy-loaded",
              preloaderClass: "swiper-lazy-preloader",
            },
          },
          create: function () {
            C(this, { lazy: t({ initialImageLoaded: !1 }, ie) });
          },
          on: {
            beforeInit: function (e) {
              e.params.lazy.enabled &&
                e.params.preloadImages &&
                (e.params.preloadImages = !1);
            },
            init: function (e) {
              e.params.lazy.enabled &&
                !e.params.loop &&
                0 === e.params.initialSlide &&
                (e.params.lazy.checkInView
                  ? e.lazy.checkInViewOnLoad()
                  : e.lazy.load());
            },
            scroll: function (e) {
              e.params.freeMode && !e.params.freeModeSticky && e.lazy.load();
            },
            "scrollbarDragMove resize _freeModeNoMomentumRelease": function (
              e
            ) {
              e.params.lazy.enabled && e.lazy.load();
            },
            transitionStart: function (e) {
              e.params.lazy.enabled &&
                (e.params.lazy.loadOnTransitionStart ||
                  (!e.params.lazy.loadOnTransitionStart &&
                    !e.lazy.initialImageLoaded)) &&
                e.lazy.load();
            },
            transitionEnd: function (e) {
              e.params.lazy.enabled &&
                !e.params.lazy.loadOnTransitionStart &&
                e.lazy.load();
            },
            slideChange: function (e) {
              e.params.lazy.enabled && e.params.cssMode && e.lazy.load();
            },
          },
        },
        {
          name: "controller",
          params: { controller: { control: void 0, inverse: !1, by: "slide" } },
          create: function () {
            C(this, {
              controller: t({ control: this.params.controller.control }, ne),
            });
          },
          on: {
            update: function (e) {
              e.controller.control &&
                e.controller.spline &&
                ((e.controller.spline = void 0), delete e.controller.spline);
            },
            resize: function (e) {
              e.controller.control &&
                e.controller.spline &&
                ((e.controller.spline = void 0), delete e.controller.spline);
            },
            observerUpdate: function (e) {
              e.controller.control &&
                e.controller.spline &&
                ((e.controller.spline = void 0), delete e.controller.spline);
            },
            setTranslate: function (e, t, i) {
              e.controller.control && e.controller.setTranslate(t, i);
            },
            setTransition: function (e, t, i) {
              e.controller.control && e.controller.setTransition(t, i);
            },
          },
        },
        {
          name: "a11y",
          params: {
            a11y: {
              enabled: !0,
              notificationClass: "swiper-notification",
              prevSlideMessage: "Previous slide",
              nextSlideMessage: "Next slide",
              firstSlideMessage: "This is the first slide",
              lastSlideMessage: "This is the last slide",
              paginationBulletMessage: "Go to slide {{index}}",
              slideLabelMessage: "{{index}} / {{slidesLength}}",
              containerMessage: null,
              containerRoleDescriptionMessage: null,
              itemRoleDescriptionMessage: null,
            },
          },
          create: function () {
            C(this, {
              a11y: t({}, ae, {
                liveRegion: m(
                  '<span class="' +
                    this.params.a11y.notificationClass +
                    '" aria-live="assertive" aria-atomic="true"></span>'
                ),
              }),
            });
          },
          on: {
            afterInit: function (e) {
              e.params.a11y.enabled &&
                (e.a11y.init(), e.a11y.updateNavigation());
            },
            toEdge: function (e) {
              e.params.a11y.enabled && e.a11y.updateNavigation();
            },
            fromEdge: function (e) {
              e.params.a11y.enabled && e.a11y.updateNavigation();
            },
            paginationUpdate: function (e) {
              e.params.a11y.enabled && e.a11y.updatePagination();
            },
            destroy: function (e) {
              e.params.a11y.enabled && e.a11y.destroy();
            },
          },
        },
        {
          name: "history",
          params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
          create: function () {
            C(this, { history: t({}, re) });
          },
          on: {
            init: function (e) {
              e.params.history.enabled && e.history.init();
            },
            destroy: function (e) {
              e.params.history.enabled && e.history.destroy();
            },
            transitionEnd: function (e) {
              e.history.initialized &&
                e.history.setHistory(e.params.history.key, e.activeIndex);
            },
            slideChange: function (e) {
              e.history.initialized &&
                e.params.cssMode &&
                e.history.setHistory(e.params.history.key, e.activeIndex);
            },
          },
        },
        {
          name: "hash-navigation",
          params: {
            hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
          },
          create: function () {
            C(this, { hashNavigation: t({ initialized: !1 }, se) });
          },
          on: {
            init: function (e) {
              e.params.hashNavigation.enabled && e.hashNavigation.init();
            },
            destroy: function (e) {
              e.params.hashNavigation.enabled && e.hashNavigation.destroy();
            },
            transitionEnd: function (e) {
              e.hashNavigation.initialized && e.hashNavigation.setHash();
            },
            slideChange: function (e) {
              e.hashNavigation.initialized &&
                e.params.cssMode &&
                e.hashNavigation.setHash();
            },
          },
        },
        {
          name: "autoplay",
          params: {
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !0,
              stopOnLastSlide: !1,
              reverseDirection: !1,
            },
          },
          create: function () {
            C(this, { autoplay: t({}, oe, { running: !1, paused: !1 }) });
          },
          on: {
            init: function (e) {
              e.params.autoplay.enabled &&
                (e.autoplay.start(),
                r().addEventListener(
                  "visibilitychange",
                  e.autoplay.onVisibilityChange
                ));
            },
            beforeTransitionStart: function (e, t, i) {
              e.autoplay.running &&
                (i || !e.params.autoplay.disableOnInteraction
                  ? e.autoplay.pause(t)
                  : e.autoplay.stop());
            },
            sliderFirstMove: function (e) {
              e.autoplay.running &&
                (e.params.autoplay.disableOnInteraction
                  ? e.autoplay.stop()
                  : e.autoplay.pause());
            },
            touchEnd: function (e) {
              e.params.cssMode &&
                e.autoplay.paused &&
                !e.params.autoplay.disableOnInteraction &&
                e.autoplay.run();
            },
            destroy: function (e) {
              e.autoplay.running && e.autoplay.stop(),
                r().removeEventListener(
                  "visibilitychange",
                  e.autoplay.onVisibilityChange
                );
            },
          },
        },
        {
          name: "effect-fade",
          params: { fadeEffect: { crossFade: !1 } },
          create: function () {
            C(this, { fadeEffect: t({}, le) });
          },
          on: {
            beforeInit: function (e) {
              if ("fade" === e.params.effect) {
                e.classNames.push(e.params.containerModifierClass + "fade");
                var t = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  spaceBetween: 0,
                  virtualTranslate: !0,
                };
                S(e.params, t), S(e.originalParams, t);
              }
            },
            setTranslate: function (e) {
              "fade" === e.params.effect && e.fadeEffect.setTranslate();
            },
            setTransition: function (e, t) {
              "fade" === e.params.effect && e.fadeEffect.setTransition(t);
            },
          },
        },
        {
          name: "effect-cube",
          params: {
            cubeEffect: {
              slideShadows: !0,
              shadow: !0,
              shadowOffset: 20,
              shadowScale: 0.94,
            },
          },
          create: function () {
            C(this, { cubeEffect: t({}, ue) });
          },
          on: {
            beforeInit: function (e) {
              if ("cube" === e.params.effect) {
                e.classNames.push(e.params.containerModifierClass + "cube"),
                  e.classNames.push(e.params.containerModifierClass + "3d");
                var t = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  resistanceRatio: 0,
                  spaceBetween: 0,
                  centeredSlides: !1,
                  virtualTranslate: !0,
                };
                S(e.params, t), S(e.originalParams, t);
              }
            },
            setTranslate: function (e) {
              "cube" === e.params.effect && e.cubeEffect.setTranslate();
            },
            setTransition: function (e, t) {
              "cube" === e.params.effect && e.cubeEffect.setTransition(t);
            },
          },
        },
        {
          name: "effect-flip",
          params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
          create: function () {
            C(this, { flipEffect: t({}, ce) });
          },
          on: {
            beforeInit: function (e) {
              if ("flip" === e.params.effect) {
                e.classNames.push(e.params.containerModifierClass + "flip"),
                  e.classNames.push(e.params.containerModifierClass + "3d");
                var t = {
                  slidesPerView: 1,
                  slidesPerColumn: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  spaceBetween: 0,
                  virtualTranslate: !0,
                };
                S(e.params, t), S(e.originalParams, t);
              }
            },
            setTranslate: function (e) {
              "flip" === e.params.effect && e.flipEffect.setTranslate();
            },
            setTransition: function (e, t) {
              "flip" === e.params.effect && e.flipEffect.setTransition(t);
            },
          },
        },
        {
          name: "effect-coverflow",
          params: {
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              scale: 1,
              modifier: 1,
              slideShadows: !0,
            },
          },
          create: function () {
            C(this, { coverflowEffect: t({}, de) });
          },
          on: {
            beforeInit: function (e) {
              "coverflow" === e.params.effect &&
                (e.classNames.push(
                  e.params.containerModifierClass + "coverflow"
                ),
                e.classNames.push(e.params.containerModifierClass + "3d"),
                (e.params.watchSlidesProgress = !0),
                (e.originalParams.watchSlidesProgress = !0));
            },
            setTranslate: function (e) {
              "coverflow" === e.params.effect &&
                e.coverflowEffect.setTranslate();
            },
            setTransition: function (e, t) {
              "coverflow" === e.params.effect &&
                e.coverflowEffect.setTransition(t);
            },
          },
        },
        {
          name: "thumbs",
          params: {
            thumbs: {
              swiper: null,
              multipleActiveThumbs: !0,
              autoScrollOffset: 0,
              slideThumbActiveClass: "swiper-slide-thumb-active",
              thumbsContainerClass: "swiper-container-thumbs",
            },
          },
          create: function () {
            C(this, { thumbs: t({ swiper: null, initialized: !1 }, pe) });
          },
          on: {
            beforeInit: function (e) {
              var t = e.params.thumbs;
              t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0));
            },
            slideChange: function (e) {
              e.thumbs.swiper && e.thumbs.update();
            },
            update: function (e) {
              e.thumbs.swiper && e.thumbs.update();
            },
            resize: function (e) {
              e.thumbs.swiper && e.thumbs.update();
            },
            observerUpdate: function (e) {
              e.thumbs.swiper && e.thumbs.update();
            },
            setTransition: function (e, t) {
              var i = e.thumbs.swiper;
              i && i.setTransition(t);
            },
            beforeDestroy: function (e) {
              var t = e.thumbs.swiper;
              t && e.thumbs.swiperCreated && t && t.destroy();
            },
          },
        },
      ];
    return V.use(he), V;
  }),
  (function (e, t) {
    if ("object" == typeof exports && "object" == typeof module)
      module.exports = t(require("jquery"));
    else if ("function" == typeof define && define.amd) define(["jquery"], t);
    else {
      var i = "object" == typeof exports ? t(require("jquery")) : t(e.jQuery);
      for (var n in i) ("object" == typeof exports ? exports : e)[n] = i[n];
    }
  })(this, function (e) {
    return (
      (i = [
        function (e) {
          e.exports = JSON.parse(
            '{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17,"KEY_229":229}'
          );
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.caret = function (e, t, i, n, a) {
              var r,
                s = this.opts;
              if (void 0 === t)
                return (
                  "selectionStart" in e && "selectionEnd" in e
                    ? ((t = e.selectionStart), (i = e.selectionEnd))
                    : window.getSelection
                    ? ((r = window.getSelection().getRangeAt(0))
                        .commonAncestorContainer.parentNode !== e &&
                        r.commonAncestorContainer !== e) ||
                      ((t = r.startOffset), (i = r.endOffset))
                    : document.selection &&
                      document.selection.createRange &&
                      ((r = document.selection.createRange()),
                      (t =
                        0 -
                        r
                          .duplicate()
                          .moveStart(
                            "character",
                            -e.inputmask._valueGet().length
                          )),
                      (i = t + r.text.length)),
                  {
                    begin: n ? t : u.call(this, t),
                    end: n ? i : u.call(this, i),
                  }
                );
              if (
                (Array.isArray(t) &&
                  ((i = this.isRTL ? t[0] : t[1]),
                  (t = this.isRTL ? t[1] : t[0])),
                void 0 !== t.begin &&
                  ((i = this.isRTL ? t.begin : t.end),
                  (t = this.isRTL ? t.end : t.begin)),
                "number" == typeof t)
              ) {
                (t = n ? t : u.call(this, t)),
                  (i =
                    "number" == typeof (i = n ? i : u.call(this, i)) ? i : t);
                var o =
                  parseInt(
                    ((e.ownerDocument.defaultView || window).getComputedStyle
                      ? (
                          e.ownerDocument.defaultView || window
                        ).getComputedStyle(e, null)
                      : e.currentStyle
                    ).fontSize
                  ) * i;
                if (
                  ((e.scrollLeft = o > e.scrollWidth ? o : 0),
                  (e.inputmask.caretPos = { begin: t, end: i }),
                  s.insertModeVisual &&
                    !1 === s.insertMode &&
                    t === i &&
                    (a || i++),
                  e === (e.inputmask.shadowRoot || document).activeElement)
                )
                  if ("setSelectionRange" in e) e.setSelectionRange(t, i);
                  else if (window.getSelection) {
                    if (
                      ((r = document.createRange()),
                      void 0 === e.firstChild || null === e.firstChild)
                    ) {
                      var l = document.createTextNode("");
                      e.appendChild(l);
                    }
                    r.setStart(
                      e.firstChild,
                      t < e.inputmask._valueGet().length
                        ? t
                        : e.inputmask._valueGet().length
                    ),
                      r.setEnd(
                        e.firstChild,
                        i < e.inputmask._valueGet().length
                          ? i
                          : e.inputmask._valueGet().length
                      ),
                      r.collapse(!0);
                    var c = window.getSelection();
                    c.removeAllRanges(), c.addRange(r);
                  } else
                    e.createTextRange &&
                      ((r = e.createTextRange()).collapse(!0),
                      r.moveEnd("character", i),
                      r.moveStart("character", t),
                      r.select());
              }
            }),
            (t.determineLastRequiredPosition = function (e) {
              var t,
                i,
                r = this.maskset,
                o = this.dependencyLib,
                l = n.getMaskTemplate.call(this, !0, s.call(this), !0, !0),
                u = l.length,
                c = s.call(this),
                d = {},
                p = r.validPositions[c],
                h = void 0 !== p ? p.locator.slice() : void 0;
              for (t = c + 1; t < l.length; t++)
                (i = n.getTestTemplate.call(this, t, h, t - 1)),
                  (h = i.locator.slice()),
                  (d[t] = o.extend(!0, {}, i));
              var f =
                p && void 0 !== p.alternation
                  ? p.locator[p.alternation]
                  : void 0;
              for (
                t = u - 1;
                c < t &&
                ((i = d[t]).match.optionality ||
                  (i.match.optionalQuantifier && i.match.newBlockMarker) ||
                  (f &&
                    ((f !== d[t].locator[p.alternation] &&
                      1 != i.match.static) ||
                      (!0 === i.match.static &&
                        i.locator[p.alternation] &&
                        a.checkAlternationMatch.call(
                          this,
                          i.locator[p.alternation].toString().split(","),
                          f.toString().split(",")
                        ) &&
                        "" !== n.getTests.call(this, t)[0].def)))) &&
                l[t] === n.getPlaceholder.call(this, t, i.match);
                t--
              )
                u--;
              return e ? { l: u, def: d[u] ? d[u].match : void 0 } : u;
            }),
            (t.determineNewCaretPosition = function (e, t, i) {
              var a = this,
                u = this.maskset,
                c = this.opts;
              if (
                (t && (a.isRTL ? (e.end = e.begin) : (e.begin = e.end)),
                e.begin === e.end)
              ) {
                switch ((i = i || c.positionCaretOnClick)) {
                  case "none":
                    break;
                  case "select":
                    e = { begin: 0, end: r.call(a).length };
                    break;
                  case "ignore":
                    e.end = e.begin = l.call(a, s.call(a));
                    break;
                  case "radixFocus":
                    if (
                      (function (e) {
                        if ("" !== c.radixPoint && 0 !== c.digits) {
                          var t = u.validPositions;
                          if (
                            void 0 === t[e] ||
                            t[e].input === n.getPlaceholder.call(a, e)
                          ) {
                            if (e < l.call(a, -1)) return !0;
                            var i = r.call(a).indexOf(c.radixPoint);
                            if (-1 !== i) {
                              for (var s in t)
                                if (
                                  t[s] &&
                                  i < s &&
                                  t[s].input !== n.getPlaceholder.call(a, s)
                                )
                                  return !1;
                              return !0;
                            }
                          }
                        }
                        return !1;
                      })(e.begin)
                    ) {
                      var d = r.call(a).join("").indexOf(c.radixPoint);
                      e.end = e.begin = c.numericInput ? l.call(a, d) : d;
                      break;
                    }
                  default:
                    var p = e.begin,
                      h = s.call(a, p, !0),
                      f = l.call(a, -1 !== h || o.call(a, 0) ? h : -1);
                    if (p <= f)
                      e.end = e.begin = o.call(a, p, !1, !0) ? p : l.call(a, p);
                    else {
                      var v = u.validPositions[h],
                        m = n.getTestTemplate.call(
                          a,
                          f,
                          v ? v.match.locator : void 0,
                          v
                        ),
                        g = n.getPlaceholder.call(a, f, m.match);
                      if (
                        ("" !== g &&
                          r.call(a)[f] !== g &&
                          !0 !== m.match.optionalQuantifier &&
                          !0 !== m.match.newBlockMarker) ||
                        (!o.call(a, f, c.keepStatic, !0) && m.match.def === g)
                      ) {
                        var y = l.call(a, f);
                        (y <= p || p === f) && (f = y);
                      }
                      e.end = e.begin = f;
                    }
                }
                return e;
              }
            }),
            (t.getBuffer = r),
            (t.getBufferTemplate = function () {
              var e = this.maskset;
              return (
                void 0 === e._buffer &&
                  ((e._buffer = n.getMaskTemplate.call(this, !1, 1)),
                  void 0 === e.buffer && (e.buffer = e._buffer.slice())),
                e._buffer
              );
            }),
            (t.getLastValidPosition = s),
            (t.isMask = o),
            (t.resetMaskSet = function (e) {
              var t = this.maskset;
              (t.buffer = void 0),
                !0 !== e && ((t.validPositions = {}), (t.p = 0));
            }),
            (t.seekNext = l),
            (t.seekPrevious = function (e, t) {
              var i = e - 1;
              if (e <= 0) return 0;
              for (
                ;
                0 < i &&
                ((!0 === t &&
                  (!0 !== n.getTest.call(this, i).match.newBlockMarker ||
                    !o.call(this, i, void 0, !0))) ||
                  (!0 !== t && !o.call(this, i, void 0, !0)));

              )
                i--;
              return i;
            }),
            (t.translatePosition = u);
          var n = i(3),
            a = i(4);
          function r(e) {
            var t = this.maskset;
            return (
              (void 0 !== t.buffer && !0 !== e) ||
                ((t.buffer = n.getMaskTemplate.call(
                  this,
                  !0,
                  s.call(this),
                  !0
                )),
                void 0 === t._buffer && (t._buffer = t.buffer.slice())),
              t.buffer
            );
          }
          function s(e, t, i) {
            var n = this.maskset,
              a = -1,
              r = -1,
              s = i || n.validPositions;
            for (var o in (void 0 === e && (e = -1), s)) {
              var l = parseInt(o);
              s[l] &&
                (t || !0 !== s[l].generatedInput) &&
                (l <= e && (a = l), e <= l && (r = l));
            }
            return -1 === a || a == e ? r : -1 == r || e - a < r - e ? a : r;
          }
          function o(e, t, i) {
            var a = this.maskset,
              r = n.getTestTemplate.call(this, e).match;
            if (
              ("" === r.def && (r = n.getTest.call(this, e).match),
              !0 !== r.static)
            )
              return r.fn;
            if (
              !0 === i &&
              void 0 !== a.validPositions[e] &&
              !0 !== a.validPositions[e].generatedInput
            )
              return !0;
            if (!0 !== t && -1 < e) {
              if (i) {
                var s = n.getTests.call(this, e);
                return (
                  s.length > 1 + ("" === s[s.length - 1].match.def ? 1 : 0)
                );
              }
              var o = n.determineTestTemplate.call(
                  this,
                  e,
                  n.getTests.call(this, e)
                ),
                l = n.getPlaceholder.call(this, e, o.match);
              return o.match.def !== l;
            }
            return !1;
          }
          function l(e, t, i) {
            void 0 === i && (i = !0);
            for (
              var a = e + 1;
              "" !== n.getTest.call(this, a).match.def &&
              ((!0 === t &&
                (!0 !== n.getTest.call(this, a).match.newBlockMarker ||
                  !o.call(this, a, void 0, !0))) ||
                (!0 !== t && !o.call(this, a, void 0, i)));

            )
              a++;
            return a;
          }
          function u(e) {
            var t = this.opts,
              i = this.el;
            return (
              !this.isRTL ||
                "number" != typeof e ||
                (t.greedy && "" === t.placeholder) ||
                !i ||
                (e = Math.abs(this._valueGet().length - e)),
              e
            );
          }
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0),
            i(16),
            i(17);
          var n = i(18),
            a = m(i(12)),
            r = m(i(8)),
            s = i(19),
            o = i(3),
            l = i(1),
            u = i(4),
            c = i(5),
            d = i(11),
            p = m(i(20)),
            h = m(i(21)),
            f = m(i(9));
          function v(e) {
            return (v =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function m(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var g = r.default.document;
          function y(e, t, i) {
            if (f.default) {
              if (!(this instanceof y)) return new y(e, t, i);
              (this.dependencyLib = a.default),
                (this.el = void 0),
                (this.events = {}),
                (this.maskset = void 0),
                !0 !== i &&
                  ("[object Object]" === Object.prototype.toString.call(e)
                    ? (t = e)
                    : ((t = t || {}), e && (t.alias = e)),
                  (this.opts = a.default.extend(!0, {}, this.defaults, t)),
                  (this.noMasksCache = t && void 0 !== t.definitions),
                  (this.userOptions = t || {}),
                  b(this.opts.alias, t, this.opts)),
                (this.refreshValue = !1),
                (this.undoValue = void 0),
                (this.$el = void 0),
                (this.skipKeyPressEvent = !1),
                (this.skipInputEvent = !1),
                (this.validationEvent = !1),
                (this.ignorable = !1),
                this.maxLength,
                (this.mouseEnter = !1),
                (this.originalPlaceholder = void 0),
                (this.isComposing = !1);
            }
          }
          function b(e, t, i) {
            var n = y.prototype.aliases[e];
            return n
              ? (n.alias && b(n.alias, void 0, i),
                a.default.extend(!0, i, n),
                a.default.extend(!0, i, t),
                !0)
              : (null === i.mask && (i.mask = e), !1);
          }
          (y.prototype = {
            dataAttribute: "data-inputmask",
            defaults: h.default,
            definitions: p.default,
            aliases: {},
            masksCache: {},
            get isRTL() {
              return this.opts.isRTL || this.opts.numericInput;
            },
            mask: function (e) {
              var t = this;
              return (
                "string" == typeof e &&
                  (e = g.getElementById(e) || g.querySelectorAll(e)),
                (e = e.nodeName
                  ? [e]
                  : Array.isArray(e)
                  ? e
                  : Array.from(e)).forEach(function (e, i) {
                  var o = a.default.extend(!0, {}, t.opts);
                  if (
                    (function (e, t, i, n) {
                      function s(t, a) {
                        var s = "" === n ? t : n + "-" + t;
                        null !== (a = void 0 !== a ? a : e.getAttribute(s)) &&
                          ("string" == typeof a &&
                            (0 === t.indexOf("on")
                              ? (a = r.default[a])
                              : "false" === a
                              ? (a = !1)
                              : "true" === a && (a = !0)),
                          (i[t] = a));
                      }
                      if (!0 === t.importDataAttributes) {
                        var o,
                          l,
                          u,
                          c,
                          d = e.getAttribute(n);
                        if (
                          (d &&
                            "" !== d &&
                            ((d = d.replace(/'/g, '"')),
                            (l = JSON.parse("{" + d + "}"))),
                          l)
                        )
                          for (c in ((u = void 0), l))
                            if ("alias" === c.toLowerCase()) {
                              u = l[c];
                              break;
                            }
                        for (o in (s("alias", u),
                        i.alias && b(i.alias, i, t),
                        t)) {
                          if (l)
                            for (c in ((u = void 0), l))
                              if (c.toLowerCase() === o.toLowerCase()) {
                                u = l[c];
                                break;
                              }
                          s(o, u);
                        }
                      }
                      return (
                        a.default.extend(!0, t, i),
                        ("rtl" !== e.dir && !t.rightAlign) ||
                          (e.style.textAlign = "right"),
                        ("rtl" !== e.dir && !t.numericInput) ||
                          ((e.dir = "ltr"),
                          e.removeAttribute("dir"),
                          (t.isRTL = !0)),
                        Object.keys(i).length
                      );
                    })(
                      e,
                      o,
                      a.default.extend(!0, {}, t.userOptions),
                      t.dataAttribute
                    )
                  ) {
                    var l = (0, s.generateMaskSet)(o, t.noMasksCache);
                    void 0 !== l &&
                      (void 0 !== e.inputmask &&
                        ((e.inputmask.opts.autoUnmask = !0),
                        e.inputmask.remove()),
                      (e.inputmask = new y(void 0, void 0, !0)),
                      (e.inputmask.opts = o),
                      (e.inputmask.noMasksCache = t.noMasksCache),
                      (e.inputmask.userOptions = a.default.extend(
                        !0,
                        {},
                        t.userOptions
                      )),
                      (e.inputmask.el = e),
                      (e.inputmask.$el = (0, a.default)(e)),
                      (e.inputmask.maskset = l),
                      a.default.data(e, "_inputmask_opts", t.userOptions),
                      n.mask.call(e.inputmask));
                  }
                }),
                (e && e[0] && e[0].inputmask) || this
              );
            },
            option: function (e, t) {
              return "string" == typeof e
                ? this.opts[e]
                : "object" === v(e)
                ? (a.default.extend(this.userOptions, e),
                  this.el && !0 !== t && this.mask(this.el),
                  this)
                : void 0;
            },
            unmaskedvalue: function (e) {
              if (
                ((this.maskset =
                  this.maskset ||
                  (0, s.generateMaskSet)(this.opts, this.noMasksCache)),
                void 0 === this.el || void 0 !== e)
              ) {
                var t = (
                  ("function" == typeof this.opts.onBeforeMask &&
                    this.opts.onBeforeMask.call(this, e, this.opts)) ||
                  e
                ).split("");
                c.checkVal.call(this, void 0, !1, !1, t),
                  "function" == typeof this.opts.onBeforeWrite &&
                    this.opts.onBeforeWrite.call(
                      this,
                      void 0,
                      l.getBuffer.call(this),
                      0,
                      this.opts
                    );
              }
              return c.unmaskedvalue.call(this, this.el);
            },
            remove: function () {
              if (this.el) {
                a.default.data(this.el, "_inputmask_opts", null);
                var e = this.opts.autoUnmask
                  ? (0, c.unmaskedvalue)(this.el)
                  : this._valueGet(this.opts.autoUnmask);
                e !== l.getBufferTemplate.call(this).join("")
                  ? this._valueSet(e, this.opts.autoUnmask)
                  : this._valueSet(""),
                  d.EventRuler.off(this.el),
                  Object.getOwnPropertyDescriptor && Object.getPrototypeOf
                    ? Object.getOwnPropertyDescriptor(
                        Object.getPrototypeOf(this.el),
                        "value"
                      ) &&
                      this.__valueGet &&
                      Object.defineProperty(this.el, "value", {
                        get: this.__valueGet,
                        set: this.__valueSet,
                        configurable: !0,
                      })
                    : g.__lookupGetter__ &&
                      this.el.__lookupGetter__("value") &&
                      this.__valueGet &&
                      (this.el.__defineGetter__("value", this.__valueGet),
                      this.el.__defineSetter__("value", this.__valueSet)),
                  (this.el.inputmask = void 0);
              }
              return this.el;
            },
            getemptymask: function () {
              return (
                (this.maskset =
                  this.maskset ||
                  (0, s.generateMaskSet)(this.opts, this.noMasksCache)),
                l.getBufferTemplate.call(this).join("")
              );
            },
            hasMaskedValue: function () {
              return !this.opts.autoUnmask;
            },
            isComplete: function () {
              return (
                (this.maskset =
                  this.maskset ||
                  (0, s.generateMaskSet)(this.opts, this.noMasksCache)),
                u.isComplete.call(this, l.getBuffer.call(this))
              );
            },
            getmetadata: function () {
              if (
                ((this.maskset =
                  this.maskset ||
                  (0, s.generateMaskSet)(this.opts, this.noMasksCache)),
                Array.isArray(this.maskset.metadata))
              ) {
                var e = o.getMaskTemplate.call(this, !0, 0, !1).join("");
                return (
                  this.maskset.metadata.forEach(function (t) {
                    return t.mask !== e || ((e = t), !1);
                  }),
                  e
                );
              }
              return this.maskset.metadata;
            },
            isValid: function (e) {
              if (
                ((this.maskset =
                  this.maskset ||
                  (0, s.generateMaskSet)(this.opts, this.noMasksCache)),
                e)
              ) {
                var t = (
                  ("function" == typeof this.opts.onBeforeMask &&
                    this.opts.onBeforeMask.call(this, e, this.opts)) ||
                  e
                ).split("");
                c.checkVal.call(this, void 0, !0, !1, t);
              } else
                e = this.isRTL
                  ? l.getBuffer.call(this).slice().reverse().join("")
                  : l.getBuffer.call(this).join("");
              for (
                var i = l.getBuffer.call(this),
                  n = l.determineLastRequiredPosition.call(this),
                  a = i.length - 1;
                n < a && !l.isMask.call(this, a);
                a--
              );
              return (
                i.splice(n, a + 1 - n),
                u.isComplete.call(this, i) &&
                  e ===
                    (this.isRTL
                      ? l.getBuffer.call(this).slice().reverse().join("")
                      : l.getBuffer.call(this).join(""))
              );
            },
            format: function (e, t) {
              this.maskset =
                this.maskset ||
                (0, s.generateMaskSet)(this.opts, this.noMasksCache);
              var i = (
                ("function" == typeof this.opts.onBeforeMask &&
                  this.opts.onBeforeMask.call(this, e, this.opts)) ||
                e
              ).split("");
              c.checkVal.call(this, void 0, !0, !1, i);
              var n = this.isRTL
                ? l.getBuffer.call(this).slice().reverse().join("")
                : l.getBuffer.call(this).join("");
              return t ? { value: n, metadata: this.getmetadata() } : n;
            },
            setValue: function (e) {
              this.el && (0, a.default)(this.el).trigger("setvalue", [e]);
            },
            analyseMask: s.analyseMask,
          }),
            (y.extendDefaults = function (e) {
              a.default.extend(!0, y.prototype.defaults, e);
            }),
            (y.extendDefinitions = function (e) {
              a.default.extend(!0, y.prototype.definitions, e);
            }),
            (y.extendAliases = function (e) {
              a.default.extend(!0, y.prototype.aliases, e);
            }),
            (y.format = function (e, t, i) {
              return y(t).format(e, i);
            }),
            (y.unmask = function (e, t) {
              return y(t).unmaskedvalue(e);
            }),
            (y.isValid = function (e, t) {
              return y(t).isValid(e);
            }),
            (y.remove = function (e) {
              "string" == typeof e &&
                (e = g.getElementById(e) || g.querySelectorAll(e)),
                (e = e.nodeName ? [e] : e).forEach(function (e) {
                  e.inputmask && e.inputmask.remove();
                });
            }),
            (y.setValue = function (e, t) {
              "string" == typeof e &&
                (e = g.getElementById(e) || g.querySelectorAll(e)),
                (e = e.nodeName ? [e] : e).forEach(function (e) {
                  e.inputmask
                    ? e.inputmask.setValue(t)
                    : (0, a.default)(e).trigger("setvalue", [t]);
                });
            }),
            (y.dependencyLib = a.default),
            (r.default.Inputmask = y);
          var x = y;
          t.default = x;
        },
        function (e, t, i) {
          "use strict";
          function n(e, t) {
            var i = (null != e.alternation ? e.mloc[a(e)] : e.locator).join("");
            if ("" !== i) for (; i.length < t; ) i += "0";
            return i;
          }
          function a(e) {
            var t = e.locator[e.alternation];
            return (
              "string" == typeof t && 0 < t.length && (t = t.split(",")[0]),
              void 0 !== t ? t.toString() : ""
            );
          }
          function r(e, t, i) {
            var n = this.opts,
              a = this.maskset;
            if (
              void 0 !== (t = t || l.call(this, e).match).placeholder ||
              !0 === i
            )
              return "function" == typeof t.placeholder
                ? t.placeholder(n)
                : t.placeholder;
            if (!0 !== t.static)
              return n.placeholder.charAt(e % n.placeholder.length);
            if (-1 < e && void 0 === a.validPositions[e]) {
              var r,
                s = c.call(this, e),
                o = [];
              if (s.length > 1 + ("" === s[s.length - 1].match.def ? 1 : 0))
                for (var u = 0; u < s.length; u++)
                  if (
                    "" !== s[u].match.def &&
                    !0 !== s[u].match.optionality &&
                    !0 !== s[u].match.optionalQuantifier &&
                    (!0 === s[u].match.static ||
                      void 0 === r ||
                      !1 !== s[u].match.fn.test(r.match.def, a, e, !0, n)) &&
                    (o.push(s[u]),
                    !0 === s[u].match.static && (r = s[u]),
                    1 < o.length && /[0-9a-bA-Z]/.test(o[0].match.def))
                  )
                    return n.placeholder.charAt(e % n.placeholder.length);
            }
            return t.def;
          }
          function s(e, t, i) {
            return (
              this.maskset.validPositions[e] ||
              o.call(this, e, c.call(this, e, t ? t.slice() : t, i))
            );
          }
          function o(e, t) {
            var i = this.opts;
            e = 0 < e ? e - 1 : 0;
            for (
              var a, r, s, o = n(l.call(this, e)), u = 0;
              u < t.length;
              u++
            ) {
              var c = t[u];
              a = n(c, o.length);
              var d = Math.abs(a - o);
              (void 0 === r ||
                ("" !== a && d < r) ||
                (s &&
                  !i.greedy &&
                  s.match.optionality &&
                  "master" === s.match.newBlockMarker &&
                  (!c.match.optionality || !c.match.newBlockMarker)) ||
                (s &&
                  s.match.optionalQuantifier &&
                  !c.match.optionalQuantifier)) &&
                ((r = d), (s = c));
            }
            return s;
          }
          function l(e, t) {
            var i = this.maskset;
            return i.validPositions[e]
              ? i.validPositions[e]
              : (t || c.call(this, e))[0];
          }
          function u(e, t, i) {
            function n(e) {
              for (var t, i = [], n = -1, a = 0, r = e.length; a < r; a++)
                if ("-" === e.charAt(a))
                  for (t = e.charCodeAt(a + 1); ++n < t; )
                    i.push(String.fromCharCode(n));
                else (n = e.charCodeAt(a)), i.push(e.charAt(a));
              return i.join("");
            }
            return (
              e.match.def === t.match.nativeDef ||
              (!(
                !(
                  i.regex ||
                  (e.match.fn instanceof RegExp && t.match.fn instanceof RegExp)
                ) ||
                !0 === e.match.static ||
                !0 === t.match.static
              ) &&
                -1 !==
                  n(t.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(
                    n(e.match.fn.toString().replace(/[[\]/]/g, ""))
                  ))
            );
          }
          function c(e, t, i) {
            var n,
              a = this,
              r = this.dependencyLib,
              s = this.maskset,
              l = this.opts,
              c = this.el,
              d = s.maskToken,
              p = t ? i : 0,
              h = t ? t.slice() : [0],
              f = [],
              v = !1,
              m = t ? t.join("") : "";
            function g(t, i, a, r) {
              function o(a, r, d) {
                function h(e, t) {
                  var i = 0 === t.matches.indexOf(e);
                  return (
                    i ||
                      t.matches.every(function (n, a) {
                        return (
                          !0 === n.isQuantifier
                            ? (i = h(e, t.matches[a - 1]))
                            : Object.prototype.hasOwnProperty.call(
                                n,
                                "matches"
                              ) && (i = h(e, n)),
                          !i
                        );
                      }),
                    i
                  );
                }
                function y(e, t, i) {
                  var n, a;
                  if (
                    ((s.tests[e] || s.validPositions[e]) &&
                      (s.tests[e] || [s.validPositions[e]]).every(function (
                        e,
                        r
                      ) {
                        if (e.mloc[t]) return (n = e), !1;
                        var s = void 0 !== i ? i : e.alternation,
                          o =
                            void 0 !== e.locator[s]
                              ? e.locator[s].toString().indexOf(t)
                              : -1;
                        return (
                          (void 0 === a || o < a) &&
                            -1 !== o &&
                            ((n = e), (a = o)),
                          !0
                        );
                      }),
                    n)
                  ) {
                    var r = n.locator[n.alternation];
                    return (n.mloc[t] || n.mloc[r] || n.locator).slice(
                      (void 0 !== i ? i : n.alternation) + 1
                    );
                  }
                  return void 0 !== i ? y(e, t) : void 0;
                }
                function b(e, t) {
                  var i = e.alternation,
                    n =
                      void 0 === t ||
                      (i === t.alternation &&
                        -1 === e.locator[i].toString().indexOf(t.locator[i]));
                  if (!n && i > t.alternation)
                    for (var a = t.alternation; a < i; a++)
                      if (e.locator[a] !== t.locator[a]) {
                        (i = a), (n = !0);
                        break;
                      }
                  if (n) {
                    e.mloc = e.mloc || {};
                    var r = e.locator[i];
                    if (void 0 !== r) {
                      if (
                        ("string" == typeof r && (r = r.split(",")[0]),
                        void 0 === e.mloc[r] && (e.mloc[r] = e.locator.slice()),
                        void 0 !== t)
                      ) {
                        for (var s in t.mloc)
                          "string" == typeof s && (s = s.split(",")[0]),
                            void 0 === e.mloc[s] && (e.mloc[s] = t.mloc[s]);
                        e.locator[i] = Object.keys(e.mloc).join(",");
                      }
                      return !0;
                    }
                    e.alternation = void 0;
                  }
                  return !1;
                }
                function x(e, t) {
                  if (e.locator.length !== t.locator.length) return !1;
                  for (var i = e.alternation + 1; i < e.locator.length; i++)
                    if (e.locator[i] !== t.locator[i]) return !1;
                  return !0;
                }
                if (p > e + l._maxTestPos)
                  throw (
                    "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " +
                    s.mask
                  );
                if (p === e && void 0 === a.matches)
                  return (
                    f.push({ match: a, locator: r.reverse(), cd: m, mloc: {} }),
                    !0
                  );
                if (void 0 !== a.matches) {
                  if (a.isGroup && d !== a) {
                    if ((a = o(t.matches[t.matches.indexOf(a) + 1], r, d)))
                      return !0;
                  } else if (a.isOptional) {
                    var w = a,
                      k = f.length;
                    if ((a = g(a, i, r, d))) {
                      if (
                        (f.forEach(function (e, t) {
                          k <= t && (e.match.optionality = !0);
                        }),
                        (n = f[f.length - 1].match),
                        void 0 !== d || !h(n, w))
                      )
                        return !0;
                      (v = !0), (p = e);
                    }
                  } else if (a.isAlternator) {
                    var E,
                      T = a,
                      S = [],
                      C = f.slice(),
                      M = r.length,
                      P = !1,
                      O = 0 < i.length ? i.shift() : -1;
                    if (-1 === O || "string" == typeof O) {
                      var A,
                        L = p,
                        D = i.slice(),
                        I = [];
                      if ("string" == typeof O) I = O.split(",");
                      else
                        for (A = 0; A < T.matches.length; A++)
                          I.push(A.toString());
                      if (void 0 !== s.excludes[e]) {
                        for (
                          var j = I.slice(), N = 0, z = s.excludes[e].length;
                          N < z;
                          N++
                        ) {
                          var _ = s.excludes[e][N].toString().split(":");
                          r.length == _[1] && I.splice(I.indexOf(_[0]), 1);
                        }
                        0 === I.length && (delete s.excludes[e], (I = j));
                      }
                      (!0 === l.keepStatic ||
                        (isFinite(parseInt(l.keepStatic)) &&
                          L >= l.keepStatic)) &&
                        (I = I.slice(0, 1));
                      for (var $ = 0; $ < I.length; $++) {
                        (A = parseInt(I[$])),
                          (f = []),
                          (i =
                            ("string" == typeof O && y(p, A, M)) || D.slice());
                        var B = T.matches[A];
                        if (B && o(B, [A].concat(r), d)) a = !0;
                        else if (
                          (0 === $ && (P = !0),
                          B &&
                            B.matches &&
                            B.matches.length > T.matches[0].matches.length)
                        )
                          break;
                        (E = f.slice()), (p = L), (f = []);
                        for (var R = 0; R < E.length; R++) {
                          var H = E[R],
                            F = !1;
                          (H.match.jit = H.match.jit || P),
                            (H.alternation = H.alternation || M),
                            b(H);
                          for (var G = 0; G < S.length; G++) {
                            var q = S[G];
                            if (
                              "string" != typeof O ||
                              (void 0 !== H.alternation &&
                                I.includes(H.locator[H.alternation].toString()))
                            ) {
                              if (H.match.nativeDef === q.match.nativeDef) {
                                (F = !0), b(q, H);
                                break;
                              }
                              if (u(H, q, l)) {
                                b(H, q) &&
                                  ((F = !0), S.splice(S.indexOf(q), 0, H));
                                break;
                              }
                              if (u(q, H, l)) {
                                b(q, H);
                                break;
                              }
                              if (
                                ((U = q),
                                !0 === (Y = H).match.static &&
                                  !0 !== U.match.static &&
                                  U.match.fn.test(Y.match.def, s, e, !1, l, !1))
                              ) {
                                x(H, q) ||
                                void 0 !== c.inputmask.userOptions.keepStatic
                                  ? b(H, q) &&
                                    ((F = !0), S.splice(S.indexOf(q), 0, H))
                                  : (l.keepStatic = !0);
                                break;
                              }
                            }
                          }
                          F || S.push(H);
                        }
                      }
                      (f = C.concat(S)),
                        (p = e),
                        (v = 0 < f.length),
                        (a = 0 < S.length),
                        (i = D.slice());
                    } else
                      a = o(T.matches[O] || t.matches[O], [O].concat(r), d);
                    if (a) return !0;
                  } else if (
                    a.isQuantifier &&
                    d !== t.matches[t.matches.indexOf(a) - 1]
                  )
                    for (
                      var V = a, W = 0 < i.length ? i.shift() : 0;
                      W <
                        (isNaN(V.quantifier.max) ? W + 1 : V.quantifier.max) &&
                      p <= e;
                      W++
                    ) {
                      var X = t.matches[t.matches.indexOf(V) - 1];
                      if ((a = o(X, [W].concat(r), X))) {
                        if (
                          (((n = f[f.length - 1].match).optionalQuantifier =
                            W >= V.quantifier.min),
                          (n.jit =
                            (W || 1) * X.matches.indexOf(n) >=
                            V.quantifier.jit),
                          n.optionalQuantifier && h(n, X))
                        ) {
                          (v = !0), (p = e);
                          break;
                        }
                        return (
                          n.jit &&
                            (s.jitOffset[e] =
                              X.matches.length - X.matches.indexOf(n)),
                          !0
                        );
                      }
                    }
                  else if ((a = g(a, i, r, d))) return !0;
                } else p++;
                var Y, U;
              }
              for (
                var d = 0 < i.length ? i.shift() : 0;
                d < t.matches.length;
                d++
              )
                if (!0 !== t.matches[d].isQuantifier) {
                  var h = o(t.matches[d], [d].concat(a), r);
                  if (h && p === e) return h;
                  if (e < p) break;
                }
            }
            if (-1 < e && (void 0 === a.maxLength || e < a.maxLength)) {
              if (void 0 === t) {
                for (
                  var y, b = e - 1;
                  void 0 === (y = s.validPositions[b] || s.tests[b]) && -1 < b;

                )
                  b--;
                void 0 !== y &&
                  -1 < b &&
                  ((h = (function (e, t) {
                    var i,
                      n = [];
                    return (
                      Array.isArray(t) || (t = [t]),
                      0 < t.length &&
                        (void 0 === t[0].alternation || !0 === l.keepStatic
                          ? 0 ===
                              (n = o.call(a, e, t.slice()).locator.slice())
                                .length && (n = t[0].locator.slice())
                          : t.forEach(function (e) {
                              "" !== e.def &&
                                (0 === n.length
                                  ? ((i = e.alternation),
                                    (n = e.locator.slice()))
                                  : e.locator[i] &&
                                    -1 ===
                                      n[i].toString().indexOf(e.locator[i]) &&
                                    (n[i] += "," + e.locator[i]));
                            })),
                      n
                    );
                  })(b, y)),
                  (m = h.join("")),
                  (p = b));
              }
              if (s.tests[e] && s.tests[e][0].cd === m) return s.tests[e];
              for (var x = h.shift(); x < d.length; x++) {
                if ((g(d[x], h, [x]) && p === e) || e < p) break;
              }
            }
            return (
              (0 !== f.length && !v) ||
                f.push({
                  match: {
                    fn: null,
                    static: !0,
                    optionality: !1,
                    casing: null,
                    def: "",
                    placeholder: "",
                  },
                  locator: [],
                  mloc: {},
                  cd: m,
                }),
              void 0 !== t && s.tests[e]
                ? r.extend(!0, [], f)
                : ((s.tests[e] = r.extend(!0, [], f)), s.tests[e])
            );
          }
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.determineTestTemplate = o),
            (t.getDecisionTaker = a),
            (t.getMaskTemplate = function (e, t, i, n, a) {
              var l = this.opts,
                u = this.maskset,
                d = l.greedy;
              a && (l.greedy = !1), (t = t || 0);
              var p,
                h,
                f,
                v,
                m = [],
                g = 0;
              do {
                if (!0 === e && u.validPositions[g])
                  (h = (f =
                    a &&
                    !0 === u.validPositions[g].match.optionality &&
                    void 0 === u.validPositions[g + 1] &&
                    (!0 === u.validPositions[g].generatedInput ||
                      (u.validPositions[g].input ==
                        l.skipOptionalPartCharacter &&
                        0 < g))
                      ? o.call(this, g, c.call(this, g, p, g - 1))
                      : u.validPositions[g]).match),
                    (p = f.locator.slice()),
                    m.push(
                      !0 === i
                        ? f.input
                        : !1 === i
                        ? h.nativeDef
                        : r.call(this, g, h)
                    );
                else {
                  (h = (f = s.call(this, g, p, g - 1)).match),
                    (p = f.locator.slice());
                  var y =
                    !0 !== n && (!1 !== l.jitMasking ? l.jitMasking : h.jit);
                  (v =
                    ((v &&
                      h.static &&
                      h.def !== l.groupSeparator &&
                      null === h.fn) ||
                      (u.validPositions[g - 1] &&
                        h.static &&
                        h.def !== l.groupSeparator &&
                        null === h.fn)) &&
                    u.tests[g] &&
                    1 === u.tests[g].length) ||
                  !1 === y ||
                  void 0 === y ||
                  ("number" == typeof y && isFinite(y) && g < y)
                    ? m.push(!1 === i ? h.nativeDef : r.call(this, g, h))
                    : (v = !1);
                }
                g++;
              } while (
                ((void 0 === this.maxLength || g < this.maxLength) &&
                  (!0 !== h.static || "" !== h.def)) ||
                g < t
              );
              return (
                "" === m[m.length - 1] && m.pop(),
                (!1 === i && void 0 !== u.maskLength) || (u.maskLength = g - 1),
                (l.greedy = d),
                m
              );
            }),
            (t.getPlaceholder = r),
            (t.getTest = l),
            (t.getTests = c),
            (t.getTestTemplate = s),
            (t.isSubsetOf = u);
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.alternate = l),
            (t.checkAlternationMatch = function (e, t, i) {
              for (
                var n,
                  a = this.opts.greedy ? t : t.slice(0, 1),
                  r = !1,
                  s = void 0 !== i ? i.split(",") : [],
                  o = 0;
                o < s.length;
                o++
              )
                -1 !== (n = e.indexOf(s[o])) && e.splice(n, 1);
              for (var l = 0; l < e.length; l++)
                if (a.includes(e[l])) {
                  r = !0;
                  break;
                }
              return r;
            }),
            (t.isComplete = c),
            (t.isValid = d),
            (t.refreshFromBuffer = h),
            (t.revalidateMask = v),
            (t.handleRemove = function (e, t, i, n, o) {
              var u = this.maskset,
                c = this.opts;
              if (
                (c.numericInput || this.isRTL) &&
                (t === r.default.BACKSPACE
                  ? (t = r.default.DELETE)
                  : t === r.default.DELETE && (t = r.default.BACKSPACE),
                this.isRTL)
              ) {
                var d = i.end;
                (i.end = i.begin), (i.begin = d);
              }
              var p,
                h = s.getLastValidPosition.call(this, void 0, !0);
              if (
                (i.end >= s.getBuffer.call(this).length &&
                  h >= i.end &&
                  (i.end = h + 1),
                t === r.default.BACKSPACE
                  ? i.end - i.begin < 1 &&
                    (i.begin = s.seekPrevious.call(this, i.begin))
                  : t === r.default.DELETE &&
                    i.begin === i.end &&
                    (i.end = s.isMask.call(this, i.end, !0, !0)
                      ? i.end + 1
                      : s.seekNext.call(this, i.end) + 1),
                !1 !== (p = v.call(this, i)))
              ) {
                if (
                  (!0 !== n && !1 !== c.keepStatic) ||
                  (null !== c.regex &&
                    -1 !== a.getTest.call(this, i.begin).match.def.indexOf("|"))
                ) {
                  var f = l.call(this, !0);
                  if (f) {
                    var m =
                      void 0 !== f.caret
                        ? f.caret
                        : f.pos
                        ? s.seekNext.call(
                            this,
                            f.pos.begin ? f.pos.begin : f.pos
                          )
                        : s.getLastValidPosition.call(this, -1, !0);
                    (t !== r.default.DELETE || i.begin > m) && i.begin;
                  }
                }
                !0 !== n &&
                  (u.p = t === r.default.DELETE ? i.begin + p : i.begin);
              }
            });
          var n,
            a = i(3),
            r = (n = i(0)) && n.__esModule ? n : { default: n },
            s = i(1),
            o = i(6);
          function l(e, t, i, n, r, o) {
            var u,
              c,
              p,
              h,
              f,
              v,
              m,
              g,
              y,
              b,
              x,
              w = this.dependencyLib,
              k = this.opts,
              E = this.maskset,
              T = w.extend(!0, {}, E.validPositions),
              S = w.extend(!0, {}, E.tests),
              C = !1,
              M = !1,
              P = void 0 !== r ? r : s.getLastValidPosition.call(this);
            if (
              (o &&
                ((b = o.begin),
                (x = o.end),
                o.begin > o.end && ((b = o.end), (x = o.begin))),
              -1 === P && void 0 === r)
            )
              (u = 0), (c = (h = a.getTest.call(this, u)).alternation);
            else
              for (; 0 <= P; P--)
                if ((p = E.validPositions[P]) && void 0 !== p.alternation) {
                  if (
                    h &&
                    h.locator[p.alternation] !== p.locator[p.alternation]
                  )
                    break;
                  (u = P), (c = E.validPositions[u].alternation), (h = p);
                }
            if (void 0 !== c) {
              (m = parseInt(u)),
                (E.excludes[m] = E.excludes[m] || []),
                !0 !== e &&
                  E.excludes[m].push(
                    (0, a.getDecisionTaker)(h) + ":" + h.alternation
                  );
              var O = [],
                A = -1;
              for (
                f = m;
                f < s.getLastValidPosition.call(this, void 0, !0) + 1;
                f++
              )
                -1 === A &&
                  e <= f &&
                  void 0 !== t &&
                  (O.push(t), (A = O.length - 1)),
                  (v = E.validPositions[f]) &&
                    !0 !== v.generatedInput &&
                    (void 0 === o || f < b || x <= f) &&
                    O.push(v.input),
                  delete E.validPositions[f];
              for (
                -1 === A && void 0 !== t && (O.push(t), (A = O.length - 1));
                void 0 !== E.excludes[m] && E.excludes[m].length < 10;

              ) {
                for (
                  E.tests = {}, s.resetMaskSet.call(this, !0), C = !0, f = 0;
                  f < O.length &&
                  ((g =
                    C.caret ||
                    s.getLastValidPosition.call(this, void 0, !0) + 1),
                  (y = O[f]),
                  (C = d.call(this, g, y, !1, n, !0)));
                  f++
                )
                  f === A && (M = C), 1 == e && C && (M = { caretPos: f });
                if (C) break;
                if (
                  (s.resetMaskSet.call(this),
                  (h = a.getTest.call(this, m)),
                  (E.validPositions = w.extend(!0, {}, T)),
                  (E.tests = w.extend(!0, {}, S)),
                  !E.excludes[m])
                ) {
                  M = l.call(this, e, t, i, n, m - 1, o);
                  break;
                }
                var L = (0, a.getDecisionTaker)(h);
                if (-1 !== E.excludes[m].indexOf(L + ":" + h.alternation)) {
                  M = l.call(this, e, t, i, n, m - 1, o);
                  break;
                }
                for (
                  E.excludes[m].push(L + ":" + h.alternation), f = m;
                  f < s.getLastValidPosition.call(this, void 0, !0) + 1;
                  f++
                )
                  delete E.validPositions[f];
              }
            }
            return (M && !1 === k.keepStatic) || delete E.excludes[m], M;
          }
          function u(e, t, i) {
            var n = this.opts,
              a = this.maskset;
            switch (n.casing || t.casing) {
              case "upper":
                e = e.toUpperCase();
                break;
              case "lower":
                e = e.toLowerCase();
                break;
              case "title":
                var s = a.validPositions[i - 1];
                e =
                  0 === i ||
                  (s && s.input === String.fromCharCode(r.default.SPACE))
                    ? e.toUpperCase()
                    : e.toLowerCase();
                break;
              default:
                if ("function" == typeof n.casing) {
                  var o = Array.prototype.slice.call(arguments);
                  o.push(a.validPositions), (e = n.casing.apply(this, o));
                }
            }
            return e;
          }
          function c(e) {
            var t = this.opts,
              i = this.maskset;
            if ("function" == typeof t.isComplete) return t.isComplete(e, t);
            if ("*" !== t.repeat) {
              var n = !1,
                r = s.determineLastRequiredPosition.call(this, !0),
                o = s.seekPrevious.call(this, r.l);
              if (
                void 0 === r.def ||
                r.def.newBlockMarker ||
                r.def.optionality ||
                r.def.optionalQuantifier
              ) {
                n = !0;
                for (var l = 0; l <= o; l++) {
                  var u = a.getTestTemplate.call(this, l).match;
                  if (
                    (!0 !== u.static &&
                      void 0 === i.validPositions[l] &&
                      !0 !== u.optionality &&
                      !0 !== u.optionalQuantifier) ||
                    (!0 === u.static &&
                      e[l] !== a.getPlaceholder.call(this, l, u))
                  ) {
                    n = !1;
                    break;
                  }
                }
              }
              return n;
            }
          }
          function d(e, t, i, n, r, o, p) {
            var m = this,
              g = this.dependencyLib,
              y = this.opts,
              b = m.maskset;
            function x(e) {
              return m.isRTL
                ? 1 < e.begin - e.end || e.begin - e.end == 1
                : 1 < e.end - e.begin || e.end - e.begin == 1;
            }
            i = !0 === i;
            var w = e;
            function k(e) {
              if (void 0 !== e) {
                if (
                  (void 0 !== e.remove &&
                    (Array.isArray(e.remove) || (e.remove = [e.remove]),
                    e.remove
                      .sort(function (e, t) {
                        return t.pos - e.pos;
                      })
                      .forEach(function (e) {
                        v.call(m, { begin: e, end: e + 1 });
                      }),
                    (e.remove = void 0)),
                  void 0 !== e.insert &&
                    (Array.isArray(e.insert) || (e.insert = [e.insert]),
                    e.insert
                      .sort(function (e, t) {
                        return e.pos - t.pos;
                      })
                      .forEach(function (e) {
                        "" !== e.c &&
                          d.call(
                            m,
                            e.pos,
                            e.c,
                            void 0 === e.strict || e.strict,
                            void 0 !== e.fromIsValid ? e.fromIsValid : n
                          );
                      }),
                    (e.insert = void 0)),
                  e.refreshFromBuffer && e.buffer)
                ) {
                  var t = e.refreshFromBuffer;
                  h.call(m, !0 === t ? t : t.start, t.end, e.buffer),
                    (e.refreshFromBuffer = void 0);
                }
                void 0 !== e.rewritePosition &&
                  ((w = e.rewritePosition), (e = !0));
              }
              return e;
            }
            function E(t, i, r) {
              var o = !1;
              return (
                a.getTests.call(m, t).every(function (l, c) {
                  var d = l.match;
                  if (
                    (s.getBuffer.call(m, !0),
                    !1 ===
                      (o =
                        null != d.fn
                          ? d.fn.test(i, b, t, r, y, x(e))
                          : (i === d.def ||
                              i === y.skipOptionalPartCharacter) &&
                            "" !== d.def && {
                              c: a.getPlaceholder.call(m, t, d, !0) || d.def,
                              pos: t,
                            }))
                  )
                    return !0;
                  var p = void 0 !== o.c ? o.c : i,
                    h = t;
                  return (
                    (p =
                      p === y.skipOptionalPartCharacter && !0 === d.static
                        ? a.getPlaceholder.call(m, t, d, !0) || d.def
                        : p),
                    !0 !== (o = k(o)) &&
                      void 0 !== o.pos &&
                      o.pos !== t &&
                      (h = o.pos),
                    (!0 !== o && void 0 === o.pos && void 0 === o.c) ||
                      (!1 ===
                        v.call(
                          m,
                          e,
                          g.extend({}, l, { input: u.call(m, p, d, h) }),
                          n,
                          h
                        ) &&
                        (o = !1)),
                    !1
                  );
                }),
                o
              );
            }
            void 0 !== e.begin && (w = m.isRTL ? e.end : e.begin);
            var T = !0,
              S = g.extend(!0, {}, b.validPositions);
            if (
              !1 === y.keepStatic &&
              void 0 !== b.excludes[w] &&
              !0 !== r &&
              !0 !== n
            )
              for (var C = w; C < (m.isRTL ? e.begin : e.end); C++)
                void 0 !== b.excludes[C] &&
                  ((b.excludes[C] = void 0), delete b.tests[C]);
            if (
              ("function" == typeof y.preValidation &&
                !0 !== n &&
                !0 !== o &&
                (T = k(
                  (T = y.preValidation.call(
                    m,
                    s.getBuffer.call(m),
                    w,
                    t,
                    x(e),
                    y,
                    b,
                    e,
                    i || r
                  ))
                )),
              !0 === T)
            ) {
              if (
                void 0 === m.maxLength ||
                w < s.translatePosition.call(m, m.maxLength)
              ) {
                if (
                  ((T = E(w, t, i)), (!i || !0 === n) && !1 === T && !0 !== o)
                ) {
                  var M = b.validPositions[w];
                  if (
                    !M ||
                    !0 !== M.match.static ||
                    (M.match.def !== t && t !== y.skipOptionalPartCharacter)
                  ) {
                    if (
                      y.insertMode ||
                      void 0 === b.validPositions[s.seekNext.call(m, w)] ||
                      e.end > w
                    ) {
                      var P = !1;
                      if (
                        (b.jitOffset[w] &&
                          void 0 === b.validPositions[s.seekNext.call(m, w)] &&
                          !1 !== (T = d.call(m, w + b.jitOffset[w], t, !0)) &&
                          (!0 !== r && (T.caret = w), (P = !0)),
                        e.end > w && (b.validPositions[w] = void 0),
                        !P && !s.isMask.call(m, w, y.keepStatic && 0 === w))
                      )
                        for (
                          var O = w + 1, A = s.seekNext.call(m, w, !1, 0 !== w);
                          O <= A;
                          O++
                        )
                          if (!1 !== (T = E(O, t, i))) {
                            (T =
                              f.call(m, w, void 0 !== T.pos ? T.pos : O) || T),
                              (w = O);
                            break;
                          }
                    }
                  } else T = { caret: s.seekNext.call(m, w) };
                }
              } else T = !1;
              !1 !== T ||
              !y.keepStatic ||
              (!c.call(m, s.getBuffer.call(m)) && 0 !== w) ||
              i ||
              !0 === r
                ? x(e) &&
                  b.tests[w] &&
                  1 < b.tests[w].length &&
                  y.keepStatic &&
                  !i &&
                  !0 !== r &&
                  (T = l.call(m, !0))
                : (T = l.call(m, w, t, i, n, void 0, e)),
                !0 === T && (T = { pos: w });
            }
            if ("function" == typeof y.postValidation && !0 !== n && !0 !== o) {
              var L = y.postValidation.call(
                m,
                s.getBuffer.call(m, !0),
                void 0 !== e.begin ? (m.isRTL ? e.end : e.begin) : e,
                t,
                T,
                y,
                b,
                i,
                p
              );
              void 0 !== L && (T = !0 === L ? T : L);
            }
            return (
              T && void 0 === T.pos && (T.pos = w),
              !1 === T || !0 === o
                ? (s.resetMaskSet.call(m, !0),
                  (b.validPositions = g.extend(!0, {}, S)))
                : f.call(m, void 0, w, !0),
              k(T)
            );
          }
          function p(e, t, i) {
            for (
              var n = this.maskset, r = !1, s = a.getTests.call(this, e), o = 0;
              o < s.length;
              o++
            ) {
              if (
                s[o].match &&
                ((s[o].match.nativeDef ===
                  t.match[i.shiftPositions ? "def" : "nativeDef"] &&
                  (!i.shiftPositions || !t.match.static)) ||
                  s[o].match.nativeDef === t.match.nativeDef ||
                  (i.regex &&
                    !s[o].match.static &&
                    s[o].match.fn.test(t.input)))
              ) {
                r = !0;
                break;
              }
              if (s[o].match && s[o].match.def === t.match.nativeDef) {
                r = void 0;
                break;
              }
            }
            return (
              !1 === r &&
                void 0 !== n.jitOffset[e] &&
                (r = p.call(this, e + n.jitOffset[e], t, i)),
              r
            );
          }
          function h(e, t, i) {
            var n,
              a,
              r = this.maskset,
              l = this.opts,
              u = this.dependencyLib,
              c = l.skipOptionalPartCharacter,
              d = this.isRTL ? i.slice().reverse() : i;
            if (((l.skipOptionalPartCharacter = ""), !0 === e))
              s.resetMaskSet.call(this),
                (r.tests = {}),
                (e = 0),
                (t = i.length),
                (a = s.determineNewCaretPosition.call(
                  this,
                  { begin: 0, end: 0 },
                  !1
                ).begin);
            else {
              for (n = e; n < t; n++) delete r.validPositions[n];
              a = e;
            }
            var p = new u.Event("keypress");
            for (n = e; n < t; n++) {
              (p.which = d[n].toString().charCodeAt(0)), (this.ignorable = !1);
              var h = o.EventHandlers.keypressEvent.call(
                this,
                p,
                !0,
                !1,
                !1,
                a
              );
              !1 !== h && (a = h.forwardPosition);
            }
            l.skipOptionalPartCharacter = c;
          }
          function f(e, t, i) {
            var n = this.maskset,
              r = this.dependencyLib;
            if (void 0 === e)
              for (e = t - 1; 0 < e && !n.validPositions[e]; e--);
            for (var o = e; o < t; o++)
              if (
                void 0 === n.validPositions[o] &&
                !s.isMask.call(this, o, !1)
              ) {
                if (
                  0 == o ? a.getTest.call(this, o) : n.validPositions[o - 1]
                ) {
                  var l = a.getTests.call(this, o).slice();
                  "" === l[l.length - 1].match.def && l.pop();
                  var u,
                    c = a.determineTestTemplate.call(this, o, l);
                  if (
                    c &&
                    (!0 !== c.match.jit ||
                      ("master" === c.match.newBlockMarker &&
                        (u = n.validPositions[o + 1]) &&
                        !0 === u.match.optionalQuantifier)) &&
                    (((c = r.extend({}, c, {
                      input:
                        a.getPlaceholder.call(this, o, c.match, !0) ||
                        c.match.def,
                    })).generatedInput = !0),
                    v.call(this, o, c, !0),
                    !0 !== i)
                  ) {
                    var p = n.validPositions[t].input;
                    return (
                      (n.validPositions[t] = void 0), d.call(this, t, p, !0, !0)
                    );
                  }
                }
              }
          }
          function v(e, t, i, n) {
            var r = this.maskset,
              o = this.opts,
              l = this.dependencyLib;
            function u(e, t, i) {
              var n = t[e];
              if (
                void 0 === n ||
                !0 !== n.match.static ||
                !0 === n.match.optionality ||
                (void 0 !== t[0] && void 0 !== t[0].alternation)
              )
                return !1;
              var a =
                  i.begin <= e - 1
                    ? t[e - 1] && !0 === t[e - 1].match.static && t[e - 1]
                    : t[e - 1],
                r =
                  i.end > e + 1
                    ? t[e + 1] && !0 === t[e + 1].match.static && t[e + 1]
                    : t[e + 1];
              return a && r;
            }
            var c = 0,
              h = void 0 !== e.begin ? e.begin : e,
              f = void 0 !== e.end ? e.end : e;
            if (
              (e.begin > e.end && ((h = e.end), (f = e.begin)),
              (n = void 0 !== n ? n : h),
              h !== f ||
                (o.insertMode &&
                  void 0 !== r.validPositions[n] &&
                  void 0 === i) ||
                void 0 === t)
            ) {
              var v,
                m = l.extend(!0, {}, r.validPositions),
                g = s.getLastValidPosition.call(this, void 0, !0);
              for (r.p = h, v = g; h <= v; v--)
                delete r.validPositions[v],
                  void 0 === t && delete r.tests[v + 1];
              var y,
                b,
                x = !0,
                w = n,
                k = w;
              for (
                t && ((r.validPositions[n] = l.extend(!0, {}, t)), k++, w++),
                  v = t ? f : f - 1;
                v <= g;
                v++
              ) {
                if (
                  void 0 !== (y = m[v]) &&
                  !0 !== y.generatedInput &&
                  (f <= v || (h <= v && u(v, m, { begin: h, end: f })))
                ) {
                  for (; "" !== a.getTest.call(this, k).match.def; ) {
                    if (
                      !1 !== (b = p.call(this, k, y, o)) ||
                      "+" === y.match.def
                    ) {
                      "+" === y.match.def && s.getBuffer.call(this, !0);
                      var E = d.call(
                        this,
                        k,
                        y.input,
                        "+" !== y.match.def,
                        "+" !== y.match.def
                      );
                      if (((x = !1 !== E), (w = (E.pos || k) + 1), !x && b))
                        break;
                    } else x = !1;
                    if (x) {
                      void 0 === t && y.match.static && v === e.begin && c++;
                      break;
                    }
                    if (!x && k > r.maskLength) break;
                    k++;
                  }
                  "" == a.getTest.call(this, k).match.def && (x = !1), (k = w);
                }
                if (!x) break;
              }
              if (!x)
                return (
                  (r.validPositions = l.extend(!0, {}, m)),
                  s.resetMaskSet.call(this, !0),
                  !1
                );
            } else
              t &&
                a.getTest.call(this, n).match.cd === t.match.cd &&
                (r.validPositions[n] = l.extend(!0, {}, t));
            return s.resetMaskSet.call(this, !0), c;
          }
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.applyInputValue = c),
            (t.clearOptionalTail = d),
            (t.checkVal = p),
            (t.HandleNativePlaceholder = function (e, t) {
              var i = e ? e.inputmask : this;
              if (l.ie) {
                if (
                  e.inputmask._valueGet() !== t &&
                  (e.placeholder !== t || "" === e.placeholder)
                ) {
                  var n = s.getBuffer.call(i).slice(),
                    a = e.inputmask._valueGet();
                  if (a !== t) {
                    var r = s.getLastValidPosition.call(i);
                    -1 === r && a === s.getBufferTemplate.call(i).join("")
                      ? (n = [])
                      : -1 !== r && d.call(i, n),
                      h(e, n);
                  }
                }
              } else
                e.placeholder !== t &&
                  ((e.placeholder = t),
                  "" === e.placeholder && e.removeAttribute("placeholder"));
            }),
            (t.unmaskedvalue = function (e) {
              var t = e ? e.inputmask : this,
                i = t.opts,
                n = t.maskset;
              if (e) {
                if (void 0 === e.inputmask) return e.value;
                e.inputmask &&
                  e.inputmask.refreshValue &&
                  c(e, e.inputmask._valueGet(!0));
              }
              var a = [],
                r = n.validPositions;
              for (var o in r)
                r[o] &&
                  r[o].match &&
                  (1 != r[o].match.static ||
                    (Array.isArray(n.metadata) &&
                      !0 !== r[o].generatedInput)) &&
                  a.push(r[o].input);
              var l =
                0 === a.length ? "" : (t.isRTL ? a.reverse() : a).join("");
              if ("function" == typeof i.onUnMask) {
                var u = (
                  t.isRTL
                    ? s.getBuffer.call(t).slice().reverse()
                    : s.getBuffer.call(t)
                ).join("");
                l = i.onUnMask.call(t, u, l, i);
              }
              return l;
            }),
            (t.writeBuffer = h);
          var n,
            a = (n = i(0)) && n.__esModule ? n : { default: n },
            r = i(3),
            s = i(1),
            o = i(4),
            l = i(7),
            u = i(6);
          function c(e, t) {
            var i = e ? e.inputmask : this,
              n = i.opts;
            (e.inputmask.refreshValue = !1),
              "function" == typeof n.onBeforeMask &&
                (t = n.onBeforeMask.call(i, t, n) || t),
              p(e, !0, !1, (t = t.toString().split(""))),
              (i.undoValue = s.getBuffer.call(i).join("")),
              (n.clearMaskOnLostFocus || n.clearIncomplete) &&
                e.inputmask._valueGet() ===
                  s.getBufferTemplate.call(i).join("") &&
                -1 === s.getLastValidPosition.call(i) &&
                e.inputmask._valueSet("");
          }
          function d(e) {
            e.length = 0;
            for (
              var t, i = r.getMaskTemplate.call(this, !0, 0, !0, void 0, !0);
              void 0 !== (t = i.shift());

            )
              e.push(t);
            return e;
          }
          function p(e, t, i, n, a) {
            var l = e ? e.inputmask : this,
              c = l.maskset,
              d = l.opts,
              p = l.dependencyLib,
              f = n.slice(),
              v = "",
              m = -1,
              g = void 0,
              y = d.skipOptionalPartCharacter;
            (d.skipOptionalPartCharacter = ""),
              s.resetMaskSet.call(l),
              (c.tests = {}),
              (m = d.radixPoint
                ? s.determineNewCaretPosition.call(
                    l,
                    { begin: 0, end: 0 },
                    !1,
                    !1 === d.__financeInput ? "radixFocus" : void 0
                  ).begin
                : 0),
              (c.p = m),
              (l.caretPos = { begin: m });
            var b = [],
              x = l.caretPos;
            if (
              (f.forEach(function (e, t) {
                if (void 0 !== e) {
                  var n = new p.Event("_checkval");
                  (n.which = e.toString().charCodeAt(0)), (v += e);
                  var a = s.getLastValidPosition.call(l, void 0, !0);
                  !(function (e, t) {
                    for (
                      var i = r.getMaskTemplate
                          .call(l, !0, 0)
                          .slice(e, s.seekNext.call(l, e, !1, !1))
                          .join("")
                          .replace(/'/g, ""),
                        n = i.indexOf(t);
                      0 < n && " " === i[n - 1];

                    )
                      n--;
                    var a =
                      0 === n &&
                      !s.isMask.call(l, e) &&
                      (r.getTest.call(l, e).match.nativeDef === t.charAt(0) ||
                        (!0 === r.getTest.call(l, e).match.static &&
                          r.getTest.call(l, e).match.nativeDef ===
                            "'" + t.charAt(0)) ||
                        (" " === r.getTest.call(l, e).match.nativeDef &&
                          (r.getTest.call(l, e + 1).match.nativeDef ===
                            t.charAt(0) ||
                            (!0 === r.getTest.call(l, e + 1).match.static &&
                              r.getTest.call(l, e + 1).match.nativeDef ===
                                "'" + t.charAt(0)))));
                    if (!a && 0 < n && !s.isMask.call(l, e, !1, !0)) {
                      var o = s.seekNext.call(l, e);
                      l.caretPos.begin < o && (l.caretPos = { begin: o });
                    }
                    return a;
                  })(m, v)
                    ? (g = u.EventHandlers.keypressEvent.call(
                        l,
                        n,
                        !0,
                        !1,
                        i,
                        l.caretPos.begin
                      )) && ((m = l.caretPos.begin + 1), (v = ""))
                    : (g = u.EventHandlers.keypressEvent.call(
                        l,
                        n,
                        !0,
                        !1,
                        i,
                        a + 1
                      )),
                    g
                      ? (void 0 !== g.pos &&
                          c.validPositions[g.pos] &&
                          !0 === c.validPositions[g.pos].match.static &&
                          void 0 === c.validPositions[g.pos].alternation &&
                          (b.push(g.pos),
                          l.isRTL || (g.forwardPosition = g.pos + 1)),
                        h.call(
                          l,
                          void 0,
                          s.getBuffer.call(l),
                          g.forwardPosition,
                          n,
                          !1
                        ),
                        (l.caretPos = {
                          begin: g.forwardPosition,
                          end: g.forwardPosition,
                        }),
                        (x = l.caretPos))
                      : void 0 === c.validPositions[t] &&
                        f[t] === r.getPlaceholder.call(l, t) &&
                        s.isMask.call(l, t, !0)
                      ? l.caretPos.begin++
                      : (l.caretPos = x);
                }
              }),
              0 < b.length)
            ) {
              var w,
                k,
                E = s.seekNext.call(l, -1, void 0, !1);
              if (
                (!o.isComplete.call(l, s.getBuffer.call(l)) && b.length <= E) ||
                (o.isComplete.call(l, s.getBuffer.call(l)) &&
                  0 < b.length &&
                  b.length !== E &&
                  0 === b[0])
              )
                for (var T = E; void 0 !== (w = b.shift()); ) {
                  var S = new p.Event("_checkval");
                  if (
                    (((k = c.validPositions[w]).generatedInput = !0),
                    (S.which = k.input.charCodeAt(0)),
                    (g = u.EventHandlers.keypressEvent.call(
                      l,
                      S,
                      !0,
                      !1,
                      i,
                      T
                    )) &&
                      void 0 !== g.pos &&
                      g.pos !== w &&
                      c.validPositions[g.pos] &&
                      !0 === c.validPositions[g.pos].match.static)
                  )
                    b.push(g.pos);
                  else if (!g) break;
                  T++;
                }
            }
            t &&
              h.call(
                l,
                e,
                s.getBuffer.call(l),
                g ? g.forwardPosition : l.caretPos.begin,
                a || new p.Event("checkval"),
                a &&
                  "input" === a.type &&
                  l.undoValue !== s.getBuffer.call(l).join("")
              ),
              (d.skipOptionalPartCharacter = y);
          }
          function h(e, t, i, n, r) {
            var l = e ? e.inputmask : this,
              u = l.opts,
              c = l.dependencyLib;
            if (n && "function" == typeof u.onBeforeWrite) {
              var d = u.onBeforeWrite.call(l, n, t, i, u);
              if (d) {
                if (d.refreshFromBuffer) {
                  var p = d.refreshFromBuffer;
                  o.refreshFromBuffer.call(
                    l,
                    !0 === p ? p : p.start,
                    p.end,
                    d.buffer || t
                  ),
                    (t = s.getBuffer.call(l, !0));
                }
                void 0 !== i && (i = void 0 !== d.caret ? d.caret : i);
              }
            }
            if (
              void 0 !== e &&
              (e.inputmask._valueSet(t.join("")),
              void 0 === i ||
                (void 0 !== n && "blur" === n.type) ||
                s.caret.call(
                  l,
                  e,
                  i,
                  void 0,
                  void 0,
                  void 0 !== n &&
                    "keydown" === n.type &&
                    (n.keyCode === a.default.DELETE ||
                      n.keyCode === a.default.BACKSPACE)
                ),
              !0 === r)
            ) {
              var h = c(e),
                f = e.inputmask._valueGet();
              (e.inputmask.skipInputEvent = !0),
                h.trigger("input"),
                setTimeout(function () {
                  f === s.getBufferTemplate.call(l).join("")
                    ? h.trigger("cleared")
                    : !0 === o.isComplete.call(l, t) && h.trigger("complete");
                }, 0);
            }
          }
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.EventHandlers = void 0);
          var n,
            a = i(1),
            r = (n = i(0)) && n.__esModule ? n : { default: n },
            s = i(7),
            o = i(4),
            l = i(5),
            u = i(3);
          var c = {
            keydownEvent: function (e) {
              var t = this.inputmask,
                i = t.opts,
                n = t.dependencyLib,
                c = t.maskset,
                d = this,
                p = n(d),
                h = e.keyCode,
                f = a.caret.call(t, d),
                v = i.onKeyDown.call(this, e, a.getBuffer.call(t), f, i);
              if (void 0 !== v) return v;
              if (
                h === r.default.BACKSPACE ||
                h === r.default.DELETE ||
                (s.iphone && h === r.default.BACKSPACE_SAFARI) ||
                (e.ctrlKey && h === r.default.X && !("oncut" in d))
              )
                e.preventDefault(),
                  o.handleRemove.call(t, d, h, f),
                  (0, l.writeBuffer)(
                    d,
                    a.getBuffer.call(t, !0),
                    c.p,
                    e,
                    d.inputmask._valueGet() !== a.getBuffer.call(t).join("")
                  );
              else if (h === r.default.END || h === r.default.PAGE_DOWN) {
                e.preventDefault();
                var m = a.seekNext.call(t, a.getLastValidPosition.call(t));
                a.caret.call(t, d, e.shiftKey ? f.begin : m, m, !0);
              } else
                (h === r.default.HOME && !e.shiftKey) || h === r.default.PAGE_UP
                  ? (e.preventDefault(),
                    a.caret.call(t, d, 0, e.shiftKey ? f.begin : 0, !0))
                  : ((i.undoOnEscape && h === r.default.ESCAPE) ||
                      (90 === h && e.ctrlKey)) &&
                    !0 !== e.altKey
                  ? ((0, l.checkVal)(d, !0, !1, t.undoValue.split("")),
                    p.trigger("click"))
                  : !0 === i.tabThrough && h === r.default.TAB
                  ? !0 === e.shiftKey
                    ? ((f.end = a.seekPrevious.call(t, f.end, !0)),
                      !0 === u.getTest.call(t, f.end - 1).match.static &&
                        f.end--,
                      (f.begin = a.seekPrevious.call(t, f.end, !0)),
                      0 <= f.begin &&
                        0 < f.end &&
                        (e.preventDefault(),
                        a.caret.call(t, d, f.begin, f.end)))
                    : ((f.begin = a.seekNext.call(t, f.begin, !0)),
                      (f.end = a.seekNext.call(t, f.begin, !0)),
                      f.end < c.maskLength && f.end--,
                      f.begin <= c.maskLength &&
                        (e.preventDefault(),
                        a.caret.call(t, d, f.begin, f.end)))
                  : e.shiftKey ||
                    (i.insertModeVisual &&
                      !1 === i.insertMode &&
                      (h === r.default.RIGHT
                        ? setTimeout(function () {
                            var e = a.caret.call(t, d);
                            a.caret.call(t, d, e.begin);
                          }, 0)
                        : h === r.default.LEFT &&
                          setTimeout(function () {
                            var e = a.translatePosition.call(
                              t,
                              d.inputmask.caretPos.begin
                            );
                            a.translatePosition.call(
                              t,
                              d.inputmask.caretPos.end
                            );
                            t.isRTL
                              ? a.caret.call(
                                  t,
                                  d,
                                  e + (e === c.maskLength ? 0 : 1)
                                )
                              : a.caret.call(t, d, e - (0 === e ? 0 : 1));
                          }, 0)));
              t.ignorable = i.ignorables.includes(h);
            },
            keypressEvent: function (e, t, i, n, s) {
              var u = this.inputmask || this,
                c = u.opts,
                d = u.dependencyLib,
                p = u.maskset,
                h = u.el,
                f = d(h),
                v = e.which || e.charCode || e.keyCode;
              if (
                !(!0 === t || (e.ctrlKey && e.altKey)) &&
                (e.ctrlKey || e.metaKey || u.ignorable)
              )
                return (
                  v === r.default.ENTER &&
                    u.undoValue !== a.getBuffer.call(u).join("") &&
                    ((u.undoValue = a.getBuffer.call(u).join("")),
                    setTimeout(function () {
                      f.trigger("change");
                    }, 0)),
                  (u.skipInputEvent = !0),
                  !0
                );
              if (v) {
                (44 !== v && 46 !== v) ||
                  3 !== e.location ||
                  "" === c.radixPoint ||
                  (v = c.radixPoint.charCodeAt(0));
                var m,
                  g = t ? { begin: s, end: s } : a.caret.call(u, h),
                  y = String.fromCharCode(v);
                p.writeOutBuffer = !0;
                var b = o.isValid.call(u, g, y, n, void 0, void 0, void 0, t);
                if (
                  (!1 !== b &&
                    (a.resetMaskSet.call(u, !0),
                    (m =
                      void 0 !== b.caret
                        ? b.caret
                        : a.seekNext.call(
                            u,
                            b.pos.begin ? b.pos.begin : b.pos
                          )),
                    (p.p = m)),
                  (m =
                    c.numericInput && void 0 === b.caret
                      ? a.seekPrevious.call(u, m)
                      : m),
                  !1 !== i &&
                    (setTimeout(function () {
                      c.onKeyValidation.call(h, v, b);
                    }, 0),
                    p.writeOutBuffer && !1 !== b))
                ) {
                  var x = a.getBuffer.call(u);
                  (0, l.writeBuffer)(h, x, m, e, !0 !== t);
                }
                if ((e.preventDefault(), t))
                  return !1 !== b && (b.forwardPosition = m), b;
              }
            },
            keyupEvent: function (e) {
              var t = this.inputmask;
              !t.isComposing ||
                (e.keyCode !== r.default.KEY_229 &&
                  e.keyCode !== r.default.ENTER) ||
                t.$el.trigger("input");
            },
            pasteEvent: function (e) {
              var t,
                i = this.inputmask,
                n = i.opts,
                r = i._valueGet(!0),
                s = a.caret.call(i, this);
              i.isRTL && ((t = s.end), (s.end = s.begin), (s.begin = t));
              var o = r.substr(0, s.begin),
                u = r.substr(s.end, r.length);
              if (
                (o ==
                  (i.isRTL
                    ? a.getBufferTemplate.call(i).slice().reverse()
                    : a.getBufferTemplate.call(i)
                  )
                    .slice(0, s.begin)
                    .join("") && (o = ""),
                u ==
                  (i.isRTL
                    ? a.getBufferTemplate.call(i).slice().reverse()
                    : a.getBufferTemplate.call(i)
                  )
                    .slice(s.end)
                    .join("") && (u = ""),
                window.clipboardData && window.clipboardData.getData)
              )
                r = o + window.clipboardData.getData("Text") + u;
              else {
                if (!e.clipboardData || !e.clipboardData.getData) return !0;
                r = o + e.clipboardData.getData("text/plain") + u;
              }
              var c = r;
              if ("function" == typeof n.onBeforePaste) {
                if (!1 === (c = n.onBeforePaste.call(i, r, n)))
                  return e.preventDefault();
                c = c || r;
              }
              return (
                (0, l.checkVal)(this, !0, !1, c.toString().split(""), e),
                e.preventDefault()
              );
            },
            inputFallBackEvent: function (e) {
              var t = this.inputmask,
                i = t.opts,
                n = t.dependencyLib;
              var o = this,
                d = o.inputmask._valueGet(!0),
                p = (
                  t.isRTL
                    ? a.getBuffer.call(t).slice().reverse()
                    : a.getBuffer.call(t)
                ).join(""),
                h = a.caret.call(t, o, void 0, void 0, !0);
              if (p !== d) {
                var f = (function (e, n, r) {
                  for (
                    var s,
                      o,
                      l,
                      c = e.substr(0, r.begin).split(""),
                      d = e.substr(r.begin).split(""),
                      p = n.substr(0, r.begin).split(""),
                      h = n.substr(r.begin).split(""),
                      f = c.length >= p.length ? c.length : p.length,
                      v = d.length >= h.length ? d.length : h.length,
                      m = "",
                      g = [];
                    c.length < f;

                  )
                    c.push("~");
                  for (; p.length < f; ) p.push("~");
                  for (; d.length < v; ) d.unshift("~");
                  for (; h.length < v; ) h.unshift("~");
                  var y = c.concat(d),
                    b = p.concat(h);
                  for (o = 0, s = y.length; o < s; o++)
                    switch (
                      ((l = u.getPlaceholder.call(
                        t,
                        a.translatePosition.call(t, o)
                      )),
                      m)
                    ) {
                      case "insertText":
                        b[o - 1] === y[o] &&
                          r.begin == y.length - 1 &&
                          g.push(y[o]),
                          (o = s);
                        break;
                      case "insertReplacementText":
                      case "deleteContentBackward":
                        "~" === y[o] ? r.end++ : (o = s);
                        break;
                      default:
                        y[o] !== b[o] &&
                          (("~" !== y[o + 1] &&
                            y[o + 1] !== l &&
                            void 0 !== y[o + 1]) ||
                          ((b[o] !== l || "~" !== b[o + 1]) && "~" !== b[o])
                            ? "~" === b[o + 1] && b[o] === y[o + 1]
                              ? ((m = "insertText"),
                                g.push(y[o]),
                                r.begin--,
                                r.end--)
                              : y[o] !== l &&
                                "~" !== y[o] &&
                                ("~" === y[o + 1] ||
                                  (b[o] !== y[o] && b[o + 1] === y[o + 1]))
                              ? ((m = "insertReplacementText"),
                                g.push(y[o]),
                                r.begin--)
                              : "~" === y[o]
                              ? ((m = "deleteContentBackward"),
                                (!a.isMask.call(
                                  t,
                                  a.translatePosition.call(t, o),
                                  !0
                                ) &&
                                  b[o] !== i.radixPoint) ||
                                  r.end++)
                              : (o = s)
                            : ((m = "insertText"),
                              g.push(y[o]),
                              r.begin--,
                              r.end--));
                    }
                  return { action: m, data: g, caret: r };
                })(
                  (d = (function (e, i, n) {
                    if (s.iemobile) {
                      var r = i.replace(a.getBuffer.call(t).join(""), "");
                      if (1 === r.length) {
                        var o = i.split("");
                        o.splice(n.begin, 0, r), (i = o.join(""));
                      }
                    }
                    return i;
                  })(0, d, h)),
                  p,
                  h
                );
                switch (
                  ((o.inputmask.shadowRoot || document).activeElement !== o &&
                    o.focus(),
                  (0, l.writeBuffer)(o, a.getBuffer.call(t)),
                  a.caret.call(t, o, h.begin, h.end, !0),
                  f.action)
                ) {
                  case "insertText":
                  case "insertReplacementText":
                    f.data.forEach(function (e, i) {
                      var a = new n.Event("keypress");
                      (a.which = e.charCodeAt(0)),
                        (t.ignorable = !1),
                        c.keypressEvent.call(o, a);
                    }),
                      setTimeout(function () {
                        t.$el.trigger("keyup");
                      }, 0);
                    break;
                  case "deleteContentBackward":
                    var v = new n.Event("keydown");
                    (v.keyCode = r.default.BACKSPACE),
                      c.keydownEvent.call(o, v);
                    break;
                  default:
                    (0, l.applyInputValue)(o, d);
                }
                e.preventDefault();
              }
            },
            compositionendEvent: function (e) {
              var t = this.inputmask;
              (t.isComposing = !1), t.$el.trigger("input");
            },
            setValueEvent: function (e, t, i) {
              var n = this.inputmask,
                r = e && e.detail ? e.detail[0] : t;
              void 0 === r && (r = this.inputmask._valueGet(!0)),
                (0, l.applyInputValue)(this, r),
                ((e.detail && void 0 !== e.detail[1]) || void 0 !== i) &&
                  a.caret.call(n, this, e.detail ? e.detail[1] : i);
            },
            focusEvent: function (e) {
              var t = this.inputmask,
                i = t.opts,
                n = this.inputmask._valueGet();
              i.showMaskOnFocus &&
                n !== a.getBuffer.call(t).join("") &&
                (0, l.writeBuffer)(
                  this,
                  a.getBuffer.call(t),
                  a.seekNext.call(t, a.getLastValidPosition.call(t))
                ),
                !0 !== i.positionCaretOnTab ||
                  !1 !== t.mouseEnter ||
                  (o.isComplete.call(t, a.getBuffer.call(t)) &&
                    -1 !== a.getLastValidPosition.call(t)) ||
                  c.clickEvent.apply(this, [e, !0]),
                (t.undoValue = a.getBuffer.call(t).join(""));
            },
            invalidEvent: function (e) {
              this.inputmask.validationEvent = !0;
            },
            mouseleaveEvent: function () {
              var e = this.inputmask,
                t = e.opts;
              (e.mouseEnter = !1),
                t.clearMaskOnLostFocus &&
                  (this.inputmask.shadowRoot || document).activeElement !==
                    this &&
                  (0, l.HandleNativePlaceholder)(this, e.originalPlaceholder);
            },
            clickEvent: function (e, t) {
              var i = this.inputmask;
              if (
                (this.inputmask.shadowRoot || document).activeElement === this
              ) {
                var n = a.determineNewCaretPosition.call(
                  i,
                  a.caret.call(i, this),
                  t
                );
                void 0 !== n && a.caret.call(i, this, n);
              }
            },
            cutEvent: function (e) {
              var t = this.inputmask,
                i = t.maskset,
                n = a.caret.call(t, this),
                s = window.clipboardData || e.clipboardData,
                u = t.isRTL
                  ? a.getBuffer.call(t).slice(n.end, n.begin)
                  : a.getBuffer.call(t).slice(n.begin, n.end);
              s.setData("text", t.isRTL ? u.reverse().join("") : u.join("")),
                document.execCommand && document.execCommand("copy"),
                o.handleRemove.call(t, this, r.default.DELETE, n),
                (0, l.writeBuffer)(
                  this,
                  a.getBuffer.call(t),
                  i.p,
                  e,
                  t.undoValue !== a.getBuffer.call(t).join("")
                );
            },
            blurEvent: function (e) {
              var t = this.inputmask,
                i = t.opts,
                n = (0, t.dependencyLib)(this);
              if (this.inputmask) {
                (0, l.HandleNativePlaceholder)(this, t.originalPlaceholder);
                var r = this.inputmask._valueGet(),
                  s = a.getBuffer.call(t).slice();
                "" !== r &&
                  (i.clearMaskOnLostFocus &&
                    (-1 === a.getLastValidPosition.call(t) &&
                    r === a.getBufferTemplate.call(t).join("")
                      ? (s = [])
                      : l.clearOptionalTail.call(t, s)),
                  !1 === o.isComplete.call(t, s) &&
                    (setTimeout(function () {
                      n.trigger("incomplete");
                    }, 0),
                    i.clearIncomplete &&
                      (a.resetMaskSet.call(t),
                      (s = i.clearMaskOnLostFocus
                        ? []
                        : a.getBufferTemplate.call(t).slice()))),
                  (0, l.writeBuffer)(this, s, void 0, e)),
                  t.undoValue !== a.getBuffer.call(t).join("") &&
                    ((t.undoValue = a.getBuffer.call(t).join("")),
                    n.trigger("change"));
              }
            },
            mouseenterEvent: function () {
              var e = this.inputmask,
                t = e.opts;
              if (
                ((e.mouseEnter = !0),
                (this.inputmask.shadowRoot || document).activeElement !== this)
              ) {
                var i = (
                  e.isRTL
                    ? a.getBufferTemplate.call(e).slice().reverse()
                    : a.getBufferTemplate.call(e)
                ).join("");
                e.placeholder !== i &&
                  this.placeholder !== e.originalPlaceholder &&
                  (e.originalPlaceholder = this.placeholder),
                  t.showMaskOnHover && (0, l.HandleNativePlaceholder)(this, i);
              }
            },
            submitEvent: function () {
              var e = this.inputmask,
                t = e.opts;
              e.undoValue !== a.getBuffer.call(e).join("") &&
                e.$el.trigger("change"),
                t.clearMaskOnLostFocus &&
                  -1 === a.getLastValidPosition.call(e) &&
                  e._valueGet &&
                  e._valueGet() === a.getBufferTemplate.call(e).join("") &&
                  e._valueSet(""),
                t.clearIncomplete &&
                  !1 === o.isComplete.call(e, a.getBuffer.call(e)) &&
                  e._valueSet(""),
                t.removeMaskOnSubmit &&
                  (e._valueSet(e.unmaskedvalue(), !0),
                  setTimeout(function () {
                    (0, l.writeBuffer)(e.el, a.getBuffer.call(e));
                  }, 0));
            },
            resetEvent: function () {
              var e = this.inputmask;
              (e.refreshValue = !0),
                setTimeout(function () {
                  (0, l.applyInputValue)(e.el, e._valueGet(!0));
                }, 0);
            },
          };
          t.EventHandlers = c;
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.iphone = t.iemobile = t.mobile = t.ie = t.ua = void 0);
          var n,
            a = (n = i(8)) && n.__esModule ? n : { default: n };
          var r = (a.default.navigator && a.default.navigator.userAgent) || "",
            s = 0 < r.indexOf("MSIE ") || 0 < r.indexOf("Trident/"),
            o = "ontouchstart" in a.default,
            l = /iemobile/i.test(r),
            u = /iphone/i.test(r) && !l;
          (t.iphone = u),
            (t.iemobile = l),
            (t.mobile = o),
            (t.ie = s),
            (t.ua = r);
        },
        function (e, t, i) {
          "use strict";
          var n;
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          var a = ((n = i(9)) && n.__esModule ? n : { default: n }).default
            ? window
            : {};
          t.default = a;
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          var n = !(
            "undefined" == typeof window ||
            !window.document ||
            !window.document.createElement
          );
          t.default = n;
        },
        function (t, i) {
          t.exports = e;
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.EventRuler = void 0);
          var n = o(i(2)),
            a = o(i(0)),
            r = i(1),
            s = i(5);
          function o(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var l = {
            on: function (e, t, i) {
              var o = e.inputmask.dependencyLib,
                l = function (t) {
                  t.originalEvent &&
                    ((t = t.originalEvent || t), (arguments[0] = t));
                  var l,
                    u = this,
                    c = u.inputmask,
                    d = c ? c.opts : void 0;
                  if (void 0 === c && "FORM" !== this.nodeName) {
                    var p = o.data(u, "_inputmask_opts");
                    o(u).off(), p && new n.default(p).mask(u);
                  } else {
                    if (
                      ["submit", "reset", "setvalue"].includes(t.type) ||
                      "FORM" === this.nodeName ||
                      !(
                        u.disabled ||
                        (u.readOnly &&
                          !(
                            ("keydown" === t.type &&
                              t.ctrlKey &&
                              67 === t.keyCode) ||
                            (!1 === d.tabThrough && t.keyCode === a.default.TAB)
                          ))
                      )
                    ) {
                      switch (t.type) {
                        case "input":
                          if (
                            !0 === c.skipInputEvent ||
                            (t.inputType &&
                              "insertCompositionText" === t.inputType)
                          )
                            return (c.skipInputEvent = !1), t.preventDefault();
                          break;
                        case "keydown":
                          (c.skipKeyPressEvent = !1),
                            (c.skipInputEvent = c.isComposing =
                              t.keyCode === a.default.KEY_229);
                          break;
                        case "keyup":
                        case "compositionend":
                          c.isComposing && (c.skipInputEvent = !1);
                          break;
                        case "keypress":
                          if (!0 === c.skipKeyPressEvent)
                            return t.preventDefault();
                          c.skipKeyPressEvent = !0;
                          break;
                        case "click":
                        case "focus":
                          return (
                            c.validationEvent
                              ? ((c.validationEvent = !1),
                                e.blur(),
                                (0, s.HandleNativePlaceholder)(
                                  e,
                                  (c.isRTL
                                    ? r.getBufferTemplate
                                        .call(c)
                                        .slice()
                                        .reverse()
                                    : r.getBufferTemplate.call(c)
                                  ).join("")
                                ),
                                setTimeout(function () {
                                  e.focus();
                                }, 3e3))
                              : ((l = arguments),
                                setTimeout(function () {
                                  e.inputmask && i.apply(u, l);
                                }, 0)),
                            !1
                          );
                      }
                      var h = i.apply(u, arguments);
                      return (
                        !1 === h && (t.preventDefault(), t.stopPropagation()), h
                      );
                    }
                    t.preventDefault();
                  }
                };
              ["submit", "reset"].includes(t)
                ? ((l = l.bind(e)), null !== e.form && o(e.form).on(t, l))
                : o(e).on(t, l),
                (e.inputmask.events[t] = e.inputmask.events[t] || []),
                e.inputmask.events[t].push(l);
            },
            off: function (e, t) {
              if (e.inputmask && e.inputmask.events) {
                var i = e.inputmask.dependencyLib,
                  n = e.inputmask.events;
                for (var a in (t && ((n = [])[t] = e.inputmask.events[t]), n)) {
                  for (var r = n[a]; 0 < r.length; ) {
                    var s = r.pop();
                    ["submit", "reset"].includes(a)
                      ? null !== e.form && i(e.form).off(a, s)
                      : i(e).off(a, s);
                  }
                  delete e.inputmask.events[a];
                }
              }
            },
          };
          t.EventRuler = l;
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          var n,
            a = (n = i(10)) && n.__esModule ? n : { default: n };
          if (void 0 === a.default) throw "jQuery not loaded!";
          var r = a.default;
          t.default = r;
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function (e) {
              return e.replace(n, "\\$1");
            });
          var n = new RegExp(
            "(\\" +
              [
                "/",
                ".",
                "*",
                "+",
                "?",
                "|",
                "(",
                ")",
                "[",
                "]",
                "{",
                "}",
                "\\",
                "$",
                "^",
              ].join("|\\") +
              ")",
            "gim"
          );
        },
        function (e, t, i) {
          "use strict";
          var n;
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0),
            i(15),
            i(22),
            i(23),
            i(24);
          var a = ((n = i(2)) && n.__esModule ? n : { default: n }).default;
          t.default = a;
        },
        function (e, t, i) {
          "use strict";
          var n,
            a = (n = i(2)) && n.__esModule ? n : { default: n },
            r = i(1),
            s = i(3);
          a.default.extendDefinitions({
            A: { validator: "[A-Za-z??-????????-????]", casing: "upper" },
            "&": { validator: "[0-9A-Za-z??-????????-????]", casing: "upper" },
            "#": { validator: "[0-9A-Fa-f]", casing: "upper" },
          });
          var o = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
          function l(e, t, i, n, a) {
            return (
              (e =
                -1 < i - 1 && "." !== t.buffer[i - 1]
                  ? ((e = t.buffer[i - 1] + e),
                    -1 < i - 2 && "." !== t.buffer[i - 2]
                      ? t.buffer[i - 2] + e
                      : "0" + e)
                  : "00" + e),
              o.test(e)
            );
          }
          a.default.extendAliases({
            cssunit: {
              regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)",
            },
            url: {
              regex: "(https?|ftp)://.*",
              autoUnmask: !1,
              keepStatic: !1,
              tabThrough: !0,
            },
            ip: {
              mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
              definitions: {
                i: { validator: l },
                j: { validator: l },
                k: { validator: l },
                l: { validator: l },
              },
              onUnMask: function (e, t, i) {
                return e;
              },
              inputmode: "numeric",
            },
            email: {
              mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
              greedy: !1,
              casing: "lower",
              onBeforePaste: function (e, t) {
                return (e = e.toLowerCase()).replace("mailto:", "");
              },
              definitions: {
                "*": {
                  validator: "[0-9???-???A-Za-z??-????????-????!#$%&'*+/=?^_`{|}~-]",
                },
                "-": { validator: "[0-9A-Za-z-]" },
              },
              onUnMask: function (e, t, i) {
                return e;
              },
              inputmode: "email",
            },
            mac: { mask: "##:##:##:##:##:##" },
            phone: { mask: "+38 (0##) ###-##-##" },
            vin: {
              mask: "V{13}9{4}",
              definitions: {
                V: { validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", casing: "upper" },
              },
              clearIncomplete: !0,
              autoUnmask: !0,
            },
            ssn: {
              mask: "999-99-9999",
              postValidation: function (e, t, i, n, a, o, l) {
                var u = s.getMaskTemplate.call(
                  this,
                  !0,
                  r.getLastValidPosition.call(this),
                  !0,
                  !0
                );
                return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(
                  u.join("")
                );
              },
            },
          });
        },
        function (e, t, i) {
          "use strict";
          function n(e) {
            return (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          "function" != typeof Object.getPrototypeOf &&
            (Object.getPrototypeOf =
              "object" === n("test".__proto__)
                ? function (e) {
                    return e.__proto__;
                  }
                : function (e) {
                    return e.constructor.prototype;
                  });
        },
        function (e, t, i) {
          "use strict";
          Array.prototype.includes ||
            Object.defineProperty(Array.prototype, "includes", {
              value: function (e, t) {
                if (null == this)
                  throw new TypeError('"this" is null or not defined');
                var i = Object(this),
                  n = i.length >>> 0;
                if (0 == n) return !1;
                for (
                  var a = 0 | t, r = Math.max(0 <= a ? a : n - Math.abs(a), 0);
                  r < n;

                ) {
                  if (i[r] === e) return !0;
                  r++;
                }
                return !1;
              },
            });
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.mask = function () {
              var e = this,
                t = this.opts,
                i = this.el,
                n = this.dependencyLib;
              o.EventRuler.off(i);
              var d = (function (t, i) {
                "textarea" !== t.tagName.toLowerCase() &&
                  i.ignorables.push(a.default.ENTER);
                var l = t.getAttribute("type"),
                  u =
                    ("input" === t.tagName.toLowerCase() &&
                      i.supportsInputType.includes(l)) ||
                    t.isContentEditable ||
                    "textarea" === t.tagName.toLowerCase();
                if (!u)
                  if ("input" === t.tagName.toLowerCase()) {
                    var c = document.createElement("input");
                    c.setAttribute("type", l),
                      (u = "text" === c.type),
                      (c = null);
                  } else u = "partial";
                return (
                  !1 !== u
                    ? (function (t) {
                        var a, l;
                        function u() {
                          return this.inputmask
                            ? this.inputmask.opts.autoUnmask
                              ? this.inputmask.unmaskedvalue()
                              : -1 !== r.getLastValidPosition.call(e) ||
                                !0 !== i.nullable
                              ? (this.inputmask.shadowRoot ||
                                  document.activeElement) === this &&
                                i.clearMaskOnLostFocus
                                ? (e.isRTL
                                    ? s.clearOptionalTail
                                        .call(e, r.getBuffer.call(e).slice())
                                        .reverse()
                                    : s.clearOptionalTail.call(
                                        e,
                                        r.getBuffer.call(e).slice()
                                      )
                                  ).join("")
                                : a.call(this)
                              : ""
                            : a.call(this);
                        }
                        function c(e) {
                          l.call(this, e),
                            this.inputmask && (0, s.applyInputValue)(this, e);
                        }
                        if (!t.inputmask.__valueGet) {
                          if (!0 !== i.noValuePatching) {
                            if (Object.getOwnPropertyDescriptor) {
                              var d = Object.getPrototypeOf
                                ? Object.getOwnPropertyDescriptor(
                                    Object.getPrototypeOf(t),
                                    "value"
                                  )
                                : void 0;
                              d && d.get && d.set
                                ? ((a = d.get),
                                  (l = d.set),
                                  Object.defineProperty(t, "value", {
                                    get: u,
                                    set: c,
                                    configurable: !0,
                                  }))
                                : "input" !== t.tagName.toLowerCase() &&
                                  ((a = function () {
                                    return this.textContent;
                                  }),
                                  (l = function (e) {
                                    this.textContent = e;
                                  }),
                                  Object.defineProperty(t, "value", {
                                    get: u,
                                    set: c,
                                    configurable: !0,
                                  }));
                            } else
                              document.__lookupGetter__ &&
                                t.__lookupGetter__("value") &&
                                ((a = t.__lookupGetter__("value")),
                                (l = t.__lookupSetter__("value")),
                                t.__defineGetter__("value", u),
                                t.__defineSetter__("value", c));
                            (t.inputmask.__valueGet = a),
                              (t.inputmask.__valueSet = l);
                          }
                          (t.inputmask._valueGet = function (t) {
                            return e.isRTL && !0 !== t
                              ? a.call(this.el).split("").reverse().join("")
                              : a.call(this.el);
                          }),
                            (t.inputmask._valueSet = function (t, i) {
                              l.call(
                                this.el,
                                null == t
                                  ? ""
                                  : !0 !== i && e.isRTL
                                  ? t.split("").reverse().join("")
                                  : t
                              );
                            }),
                            void 0 === a &&
                              ((a = function () {
                                return this.value;
                              }),
                              (l = function (e) {
                                this.value = e;
                              }),
                              (function (t) {
                                if (
                                  n.valHooks &&
                                  (void 0 === n.valHooks[t] ||
                                    !0 !== n.valHooks[t].inputmaskpatch)
                                ) {
                                  var a =
                                      n.valHooks[t] && n.valHooks[t].get
                                        ? n.valHooks[t].get
                                        : function (e) {
                                            return e.value;
                                          },
                                    o =
                                      n.valHooks[t] && n.valHooks[t].set
                                        ? n.valHooks[t].set
                                        : function (e, t) {
                                            return (e.value = t), e;
                                          };
                                  n.valHooks[t] = {
                                    get: function (t) {
                                      if (t.inputmask) {
                                        if (t.inputmask.opts.autoUnmask)
                                          return t.inputmask.unmaskedvalue();
                                        var n = a(t);
                                        return -1 !==
                                          r.getLastValidPosition.call(
                                            e,
                                            void 0,
                                            void 0,
                                            t.inputmask.maskset.validPositions
                                          ) || !0 !== i.nullable
                                          ? n
                                          : "";
                                      }
                                      return a(t);
                                    },
                                    set: function (e, t) {
                                      var i = o(e, t);
                                      return (
                                        e.inputmask &&
                                          (0, s.applyInputValue)(e, t),
                                        i
                                      );
                                    },
                                    inputmaskpatch: !0,
                                  };
                                }
                              })(t.type),
                              (function (t) {
                                o.EventRuler.on(t, "mouseenter", function () {
                                  var t = this.inputmask._valueGet(!0);
                                  t !==
                                    (e.isRTL
                                      ? r.getBuffer.call(e).reverse()
                                      : r.getBuffer.call(e)
                                    ).join("") &&
                                    (0, s.applyInputValue)(this, t);
                                });
                              })(t));
                        }
                      })(t)
                    : (t.inputmask = void 0),
                  u
                );
              })(i, t);
              if (!1 !== d) {
                (e.originalPlaceholder = i.placeholder),
                  (e.maxLength = void 0 !== i ? i.maxLength : void 0),
                  -1 === e.maxLength && (e.maxLength = void 0),
                  "inputMode" in i &&
                    null === i.getAttribute("inputmode") &&
                    ((i.inputMode = t.inputmode),
                    i.setAttribute("inputmode", t.inputmode)),
                  !0 === d &&
                    ((t.showMaskOnFocus =
                      t.showMaskOnFocus &&
                      -1 === ["cc-number", "cc-exp"].indexOf(i.autocomplete)),
                    l.iphone && (t.insertModeVisual = !1),
                    o.EventRuler.on(i, "submit", c.EventHandlers.submitEvent),
                    o.EventRuler.on(i, "reset", c.EventHandlers.resetEvent),
                    o.EventRuler.on(i, "blur", c.EventHandlers.blurEvent),
                    o.EventRuler.on(i, "focus", c.EventHandlers.focusEvent),
                    o.EventRuler.on(i, "invalid", c.EventHandlers.invalidEvent),
                    o.EventRuler.on(i, "click", c.EventHandlers.clickEvent),
                    o.EventRuler.on(
                      i,
                      "mouseleave",
                      c.EventHandlers.mouseleaveEvent
                    ),
                    o.EventRuler.on(
                      i,
                      "mouseenter",
                      c.EventHandlers.mouseenterEvent
                    ),
                    o.EventRuler.on(i, "paste", c.EventHandlers.pasteEvent),
                    o.EventRuler.on(i, "cut", c.EventHandlers.cutEvent),
                    o.EventRuler.on(i, "complete", t.oncomplete),
                    o.EventRuler.on(i, "incomplete", t.onincomplete),
                    o.EventRuler.on(i, "cleared", t.oncleared),
                    !0 !== t.inputEventOnly &&
                      (o.EventRuler.on(
                        i,
                        "keydown",
                        c.EventHandlers.keydownEvent
                      ),
                      o.EventRuler.on(
                        i,
                        "keypress",
                        c.EventHandlers.keypressEvent
                      ),
                      o.EventRuler.on(i, "keyup", c.EventHandlers.keyupEvent)),
                    (l.mobile || t.inputEventOnly) &&
                      i.removeAttribute("maxLength"),
                    o.EventRuler.on(
                      i,
                      "input",
                      c.EventHandlers.inputFallBackEvent
                    ),
                    o.EventRuler.on(
                      i,
                      "compositionend",
                      c.EventHandlers.compositionendEvent
                    )),
                  o.EventRuler.on(i, "setvalue", c.EventHandlers.setValueEvent),
                  (e.undoValue = r.getBufferTemplate.call(e).join(""));
                var p = (i.inputmask.shadowRoot || document).activeElement;
                if (
                  "" !== i.inputmask._valueGet(!0) ||
                  !1 === t.clearMaskOnLostFocus ||
                  p === i
                ) {
                  (0, s.applyInputValue)(i, i.inputmask._valueGet(!0), t);
                  var h = r.getBuffer.call(e).slice();
                  !1 === u.isComplete.call(e, h) &&
                    t.clearIncomplete &&
                    r.resetMaskSet.call(e),
                    t.clearMaskOnLostFocus &&
                      p !== i &&
                      (-1 === r.getLastValidPosition.call(e)
                        ? (h = [])
                        : s.clearOptionalTail.call(e, h)),
                    (!1 === t.clearMaskOnLostFocus ||
                      (t.showMaskOnFocus && p === i) ||
                      "" !== i.inputmask._valueGet(!0)) &&
                      (0, s.writeBuffer)(i, h),
                    p === i &&
                      r.caret.call(
                        e,
                        i,
                        r.seekNext.call(e, r.getLastValidPosition.call(e))
                      );
                }
              }
            });
          var n,
            a = (n = i(0)) && n.__esModule ? n : { default: n },
            r = i(1),
            s = i(5),
            o = i(11),
            l = i(7),
            u = i(4),
            c = i(6);
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.generateMaskSet = function (e, t) {
              function i(e, i, n) {
                var r,
                  s,
                  o = !1;
                if (
                  ((null !== e && "" !== e) ||
                    (e = (o = null !== n.regex)
                      ? (e = n.regex).replace(/^(\^)(.*)(\$)$/, "$2")
                      : ((o = !0), ".*")),
                  1 === e.length &&
                    !1 === n.greedy &&
                    0 !== n.repeat &&
                    (n.placeholder = ""),
                  0 < n.repeat || "*" === n.repeat || "+" === n.repeat)
                ) {
                  var l =
                    "*" === n.repeat ? 0 : "+" === n.repeat ? 1 : n.repeat;
                  e =
                    n.groupmarker[0] +
                    e +
                    n.groupmarker[1] +
                    n.quantifiermarker[0] +
                    l +
                    "," +
                    n.repeat +
                    n.quantifiermarker[1];
                }
                return (
                  (s = o
                    ? "regex_" + n.regex
                    : n.numericInput
                    ? e.split("").reverse().join("")
                    : e),
                  !1 !== n.keepStatic && (s = "ks_" + s),
                  void 0 === Inputmask.prototype.masksCache[s] || !0 === t
                    ? ((r = {
                        mask: e,
                        maskToken: Inputmask.prototype.analyseMask(e, o, n),
                        validPositions: {},
                        _buffer: void 0,
                        buffer: void 0,
                        tests: {},
                        excludes: {},
                        metadata: i,
                        maskLength: void 0,
                        jitOffset: {},
                      }),
                      !0 !== t &&
                        ((Inputmask.prototype.masksCache[s] = r),
                        (r = a.default.extend(
                          !0,
                          {},
                          Inputmask.prototype.masksCache[s]
                        ))))
                    : (r = a.default.extend(
                        !0,
                        {},
                        Inputmask.prototype.masksCache[s]
                      )),
                  r
                );
              }
              if (
                ("function" == typeof e.mask && (e.mask = e.mask(e)),
                Array.isArray(e.mask))
              ) {
                if (1 < e.mask.length) {
                  null === e.keepStatic && (e.keepStatic = !0);
                  var n = e.groupmarker[0];
                  return (
                    (e.isRTL ? e.mask.reverse() : e.mask).forEach(function (t) {
                      1 < n.length &&
                        (n +=
                          e.groupmarker[1] +
                          e.alternatormarker +
                          e.groupmarker[0]),
                        void 0 !== t.mask && "function" != typeof t.mask
                          ? (n += t.mask)
                          : (n += t);
                    }),
                    i((n += e.groupmarker[1]), e.mask, e)
                  );
                }
                e.mask = e.mask.pop();
              }
              return (
                null === e.keepStatic && (e.keepStatic = !1),
                e.mask &&
                void 0 !== e.mask.mask &&
                "function" != typeof e.mask.mask
                  ? i(e.mask.mask, e.mask, e)
                  : i(e.mask, e.mask, e)
              );
            }),
            (t.analyseMask = function (e, t, i) {
              var n,
                a,
                r,
                s,
                o,
                l,
                u =
                  /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                c =
                  /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                d = !1,
                p = new m(),
                h = [],
                f = [],
                v = !1;
              function m(e, t, i, n) {
                (this.matches = []),
                  (this.openGroup = e || !1),
                  (this.alternatorGroup = !1),
                  (this.isGroup = e || !1),
                  (this.isOptional = t || !1),
                  (this.isQuantifier = i || !1),
                  (this.isAlternator = n || !1),
                  (this.quantifier = { min: 1, max: 1 });
              }
              function g(e, n, a) {
                a = void 0 !== a ? a : e.matches.length;
                var r = e.matches[a - 1];
                if (t)
                  0 === n.indexOf("[") ||
                  (d && /\\d|\\s|\\w]/i.test(n)) ||
                  "." === n
                    ? e.matches.splice(a++, 0, {
                        fn: new RegExp(n, i.casing ? "i" : ""),
                        static: !1,
                        optionality: !1,
                        newBlockMarker: void 0 === r ? "master" : r.def !== n,
                        casing: null,
                        def: n,
                        placeholder: void 0,
                        nativeDef: n,
                      })
                    : (d && (n = n[n.length - 1]),
                      n.split("").forEach(function (t, n) {
                        (r = e.matches[a - 1]),
                          e.matches.splice(a++, 0, {
                            fn: /[a-z]/i.test(i.staticDefinitionSymbol || t)
                              ? new RegExp(
                                  "[" + (i.staticDefinitionSymbol || t) + "]",
                                  i.casing ? "i" : ""
                                )
                              : null,
                            static: !0,
                            optionality: !1,
                            newBlockMarker:
                              void 0 === r
                                ? "master"
                                : r.def !== t && !0 !== r.static,
                            casing: null,
                            def: i.staticDefinitionSymbol || t,
                            placeholder:
                              void 0 !== i.staticDefinitionSymbol ? t : void 0,
                            nativeDef: (d ? "'" : "") + t,
                          });
                      })),
                    (d = !1);
                else {
                  var s =
                    (i.definitions && i.definitions[n]) ||
                    (i.usePrototypeDefinitions &&
                      Inputmask.prototype.definitions[n]);
                  s && !d
                    ? e.matches.splice(a++, 0, {
                        fn: s.validator
                          ? "string" == typeof s.validator
                            ? new RegExp(s.validator, i.casing ? "i" : "")
                            : new (function () {
                                this.test = s.validator;
                              })()
                          : new RegExp("."),
                        static: s.static || !1,
                        optionality: !1,
                        newBlockMarker:
                          void 0 === r
                            ? "master"
                            : r.def !== (s.definitionSymbol || n),
                        casing: s.casing,
                        def: s.definitionSymbol || n,
                        placeholder: s.placeholder,
                        nativeDef: n,
                        generated: s.generated,
                      })
                    : (e.matches.splice(a++, 0, {
                        fn: /[a-z]/i.test(i.staticDefinitionSymbol || n)
                          ? new RegExp(
                              "[" + (i.staticDefinitionSymbol || n) + "]",
                              i.casing ? "i" : ""
                            )
                          : null,
                        static: !0,
                        optionality: !1,
                        newBlockMarker:
                          void 0 === r
                            ? "master"
                            : r.def !== n && !0 !== r.static,
                        casing: null,
                        def: i.staticDefinitionSymbol || n,
                        placeholder:
                          void 0 !== i.staticDefinitionSymbol ? n : void 0,
                        nativeDef: (d ? "'" : "") + n,
                      }),
                      (d = !1));
                }
              }
              function y() {
                if (0 < h.length) {
                  if ((g((s = h[h.length - 1]), a), s.isAlternator)) {
                    o = h.pop();
                    for (var e = 0; e < o.matches.length; e++)
                      o.matches[e].isGroup && (o.matches[e].isGroup = !1);
                    0 < h.length
                      ? (s = h[h.length - 1]).matches.push(o)
                      : p.matches.push(o);
                  }
                } else g(p, a);
              }
              function b(e) {
                var t = new m(!0);
                return (t.openGroup = !1), (t.matches = e), t;
              }
              function x() {
                if ((((r = h.pop()).openGroup = !1), void 0 !== r))
                  if (0 < h.length) {
                    if (
                      ((s = h[h.length - 1]).matches.push(r), s.isAlternator)
                    ) {
                      o = h.pop();
                      for (var e = 0; e < o.matches.length; e++)
                        (o.matches[e].isGroup = !1),
                          (o.matches[e].alternatorGroup = !1);
                      0 < h.length
                        ? (s = h[h.length - 1]).matches.push(o)
                        : p.matches.push(o);
                    }
                  } else p.matches.push(r);
                else y();
              }
              function w(e) {
                var t = e.pop();
                return t.isQuantifier && (t = b([e.pop(), t])), t;
              }
              for (
                t &&
                ((i.optionalmarker[0] = void 0),
                (i.optionalmarker[1] = void 0));
                (n = t ? c.exec(e) : u.exec(e));

              ) {
                if (((a = n[0]), t))
                  switch (a.charAt(0)) {
                    case "?":
                      a = "{0,1}";
                      break;
                    case "+":
                    case "*":
                      a = "{" + a + "}";
                      break;
                    case "|":
                      if (0 === h.length) {
                        var k = b(p.matches);
                        (k.openGroup = !0),
                          h.push(k),
                          (p.matches = []),
                          (v = !0);
                      }
                  }
                if (d) y();
                else
                  switch (a.charAt(0)) {
                    case "$":
                    case "^":
                      t || y();
                      break;
                    case "(?=":
                    case "(?!":
                    case "(?<=":
                    case "(?<!":
                      break;
                    case i.escapeChar:
                      (d = !0), t && y();
                      break;
                    case i.optionalmarker[1]:
                    case i.groupmarker[1]:
                      x();
                      break;
                    case i.optionalmarker[0]:
                      h.push(new m(!1, !0));
                      break;
                    case i.groupmarker[0]:
                      h.push(new m(!0));
                      break;
                    case i.quantifiermarker[0]:
                      var E = new m(!1, !1, !0),
                        T = (a = a.replace(/[{}]/g, "")).split("|"),
                        S = T[0].split(","),
                        C = isNaN(S[0]) ? S[0] : parseInt(S[0]),
                        M =
                          1 === S.length
                            ? C
                            : isNaN(S[1])
                            ? S[1]
                            : parseInt(S[1]);
                      ("*" !== C && "+" !== C) || (C = "*" === M ? 0 : 1),
                        (E.quantifier = { min: C, max: M, jit: T[1] });
                      var P =
                        0 < h.length ? h[h.length - 1].matches : p.matches;
                      if ((n = P.pop()).isAlternator) {
                        P.push(n), (P = n.matches);
                        var O = new m(!0),
                          A = P.pop();
                        P.push(O), (P = O.matches), (n = A);
                      }
                      n.isGroup || (n = b([n])), P.push(n), P.push(E);
                      break;
                    case i.alternatormarker:
                      if (0 < h.length) {
                        var L = (s = h[h.length - 1]).matches[
                          s.matches.length - 1
                        ];
                        l =
                          s.openGroup &&
                          (void 0 === L.matches ||
                            (!1 === L.isGroup && !1 === L.isAlternator))
                            ? h.pop()
                            : w(s.matches);
                      } else l = w(p.matches);
                      if (l.isAlternator) h.push(l);
                      else if (
                        (l.alternatorGroup
                          ? ((o = h.pop()), (l.alternatorGroup = !1))
                          : (o = new m(!1, !1, !1, !0)),
                        o.matches.push(l),
                        h.push(o),
                        l.openGroup)
                      ) {
                        l.openGroup = !1;
                        var D = new m(!0);
                        (D.alternatorGroup = !0), h.push(D);
                      }
                      break;
                    default:
                      y();
                  }
              }
              for (v && x(); 0 < h.length; ) (r = h.pop()), p.matches.push(r);
              return (
                0 < p.matches.length &&
                  ((function e(n) {
                    n &&
                      n.matches &&
                      n.matches.forEach(function (a, r) {
                        var s = n.matches[r + 1];
                        (void 0 === s ||
                          void 0 === s.matches ||
                          !1 === s.isQuantifier) &&
                          a &&
                          a.isGroup &&
                          ((a.isGroup = !1),
                          t ||
                            (g(a, i.groupmarker[0], 0),
                            !0 !== a.openGroup && g(a, i.groupmarker[1]))),
                          e(a);
                      });
                  })(p),
                  f.push(p)),
                (i.numericInput || i.isRTL) &&
                  (function e(t) {
                    for (var n in ((t.matches = t.matches.reverse()),
                    t.matches))
                      if (Object.prototype.hasOwnProperty.call(t.matches, n)) {
                        var a = parseInt(n);
                        if (
                          t.matches[n].isQuantifier &&
                          t.matches[a + 1] &&
                          t.matches[a + 1].isGroup
                        ) {
                          var r = t.matches[n];
                          t.matches.splice(n, 1), t.matches.splice(a + 1, 0, r);
                        }
                        void 0 !== t.matches[n].matches
                          ? (t.matches[n] = e(t.matches[n]))
                          : (t.matches[n] =
                              ((s = t.matches[n]) === i.optionalmarker[0]
                                ? (s = i.optionalmarker[1])
                                : s === i.optionalmarker[1]
                                ? (s = i.optionalmarker[0])
                                : s === i.groupmarker[0]
                                ? (s = i.groupmarker[1])
                                : s === i.groupmarker[1] &&
                                  (s = i.groupmarker[0]),
                              s));
                      }
                    var s;
                    return t;
                  })(f[0]),
                f
              );
            });
          var n,
            a = (n = i(12)) && n.__esModule ? n : { default: n };
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          t.default = {
            9: { validator: "[0-9???-???]", definitionSymbol: "*" },
            a: { validator: "[A-Za-z??-????????-????]", definitionSymbol: "*" },
            "*": { validator: "[0-9???-???A-Za-z??-????????-????]" },
          };
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          t.default = {
            _maxTestPos: 500,
            placeholder: "_",
            optionalmarker: ["[", "]"],
            quantifiermarker: ["{", "}"],
            groupmarker: ["(", ")"],
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            regex: null,
            oncomplete: function () {},
            onincomplete: function () {},
            oncleared: function () {},
            repeat: 0,
            greedy: !1,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            insertModeVisual: !0,
            clearIncomplete: !1,
            alias: null,
            onKeyDown: function () {},
            onBeforeMask: null,
            onBeforePaste: function (e, t) {
              return "function" == typeof t.onBeforeMask
                ? t.onBeforeMask.call(this, e, t)
                : e;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: function () {},
            skipOptionalPartCharacter: " ",
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            _radixDance: !1,
            groupSeparator: "",
            keepStatic: null,
            positionCaretOnTab: !0,
            tabThrough: !1,
            supportsInputType: ["text", "tel", "url", "password", "search"],
            ignorables: [
              8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112,
              113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229,
            ],
            isComplete: null,
            preValidation: null,
            postValidation: null,
            staticDefinitionSymbol: void 0,
            jitMasking: !1,
            nullable: !0,
            inputEventOnly: !1,
            noValuePatching: !1,
            positionCaretOnClick: "lvp",
            casing: null,
            inputmode: "text",
            importDataAttributes: !0,
            shiftPositions: !0,
            usePrototypeDefinitions: !0,
          };
        },
        function (e, t, i) {
          "use strict";
          var n = l(i(2)),
            a = l(i(0)),
            r = l(i(13)),
            s = i(1);
          function o(e) {
            return (o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function l(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var u = n.default.dependencyLib,
            c = new Date().getFullYear(),
            d = {
              d: [
                "[1-9]|[12][0-9]|3[01]",
                Date.prototype.setDate,
                "day",
                Date.prototype.getDate,
              ],
              dd: [
                "0[1-9]|[12][0-9]|3[01]",
                Date.prototype.setDate,
                "day",
                function () {
                  return g(Date.prototype.getDate.call(this), 2);
                },
              ],
              ddd: [""],
              dddd: [""],
              m: [
                "[1-9]|1[012]",
                Date.prototype.setMonth,
                "month",
                function () {
                  return Date.prototype.getMonth.call(this) + 1;
                },
              ],
              mm: [
                "0[1-9]|1[012]",
                Date.prototype.setMonth,
                "month",
                function () {
                  return g(Date.prototype.getMonth.call(this) + 1, 2);
                },
              ],
              mmm: [""],
              mmmm: [""],
              yy: [
                "[0-9]{2}",
                Date.prototype.setFullYear,
                "year",
                function () {
                  return g(Date.prototype.getFullYear.call(this), 2);
                },
              ],
              yyyy: [
                "[0-9]{4}",
                Date.prototype.setFullYear,
                "year",
                function () {
                  return g(Date.prototype.getFullYear.call(this), 4);
                },
              ],
              h: [
                "[1-9]|1[0-2]",
                Date.prototype.setHours,
                "hours",
                Date.prototype.getHours,
              ],
              hh: [
                "0[1-9]|1[0-2]",
                Date.prototype.setHours,
                "hours",
                function () {
                  return g(Date.prototype.getHours.call(this), 2);
                },
              ],
              hx: [
                function (e) {
                  return "[0-9]{".concat(e, "}");
                },
                Date.prototype.setHours,
                "hours",
                function (e) {
                  return Date.prototype.getHours;
                },
              ],
              H: [
                "1?[0-9]|2[0-3]",
                Date.prototype.setHours,
                "hours",
                Date.prototype.getHours,
              ],
              HH: [
                "0[0-9]|1[0-9]|2[0-3]",
                Date.prototype.setHours,
                "hours",
                function () {
                  return g(Date.prototype.getHours.call(this), 2);
                },
              ],
              Hx: [
                function (e) {
                  return "[0-9]{".concat(e, "}");
                },
                Date.prototype.setHours,
                "hours",
                function (e) {
                  return function () {
                    return g(Date.prototype.getHours.call(this), e);
                  };
                },
              ],
              M: [
                "[1-5]?[0-9]",
                Date.prototype.setMinutes,
                "minutes",
                Date.prototype.getMinutes,
              ],
              MM: [
                "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                Date.prototype.setMinutes,
                "minutes",
                function () {
                  return g(Date.prototype.getMinutes.call(this), 2);
                },
              ],
              s: [
                "[1-5]?[0-9]",
                Date.prototype.setSeconds,
                "seconds",
                Date.prototype.getSeconds,
              ],
              ss: [
                "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                Date.prototype.setSeconds,
                "seconds",
                function () {
                  return g(Date.prototype.getSeconds.call(this), 2);
                },
              ],
              l: [
                "[0-9]{3}",
                Date.prototype.setMilliseconds,
                "milliseconds",
                function () {
                  return g(Date.prototype.getMilliseconds.call(this), 3);
                },
              ],
              L: [
                "[0-9]{2}",
                Date.prototype.setMilliseconds,
                "milliseconds",
                function () {
                  return g(Date.prototype.getMilliseconds.call(this), 2);
                },
              ],
              t: ["[ap]"],
              tt: ["[ap]m"],
              T: ["[AP]"],
              TT: ["[AP]M"],
              Z: [""],
              o: [""],
              S: [""],
            },
            p = {
              isoDate: "yyyy-mm-dd",
              isoTime: "HH:MM:ss",
              isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
              isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
            };
          function h(e) {
            var t = new RegExp("\\d+$").exec(e[0]);
            if (t && void 0 !== t[0]) {
              var i = d[e[0][0] + "x"].slice("");
              return (i[0] = i[0](t[0])), (i[3] = i[3](t[0])), i;
            }
            if (d[e[0]]) return d[e[0]];
          }
          function f(e) {
            if (!e.tokenizer) {
              var t = [],
                i = [];
              for (var n in d)
                if (/\.*x$/.test(n)) {
                  var a = n[0] + "\\d+";
                  -1 === i.indexOf(a) && i.push(a);
                } else -1 === t.indexOf(n[0]) && t.push(n[0]);
              (e.tokenizer =
                "(" +
                (0 < i.length ? i.join("|") + "|" : "") +
                t.join("+|") +
                ")+?|."),
                (e.tokenizer = new RegExp(e.tokenizer, "g"));
            }
            return e.tokenizer;
          }
          function v(e, t, i) {
            if (
              void 0 === e.rawday ||
              (!isFinite(e.rawday) &&
                new Date(
                  e.date.getFullYear(),
                  isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1,
                  0
                ).getDate() >= e.day) ||
              ("29" == e.day &&
                (!isFinite(e.rawyear) ||
                  void 0 === e.rawyear ||
                  "" === e.rawyear)) ||
              new Date(
                e.date.getFullYear(),
                isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1,
                0
              ).getDate() >= e.day
            )
              return t;
            if ("29" == e.day) {
              var n = x(t.pos, i);
              if (
                "yyyy" === n.targetMatch[0] &&
                t.pos - n.targetMatchIndex == 2
              )
                return (t.remove = t.pos + 1), t;
            } else if ("02" == e.month && "30" == e.day && void 0 !== t.c)
              return (
                (e.day = "03"),
                e.date.setDate(3),
                e.date.setMonth(1),
                (t.insert = [
                  { pos: t.pos, c: "0" },
                  { pos: t.pos + 1, c: t.c },
                ]),
                (t.caret = s.seekNext.call(this, t.pos + 1)),
                t
              );
            return !1;
          }
          function m(e, t, i, n) {
            var a,
              s,
              o = "";
            for (f(i).lastIndex = 0; (a = f(i).exec(e)); )
              if (void 0 === t)
                if ((s = h(a))) o += "(" + s[0] + ")";
                else
                  switch (a[0]) {
                    case "[":
                      o += "(";
                      break;
                    case "]":
                      o += ")?";
                      break;
                    default:
                      o += (0, r.default)(a[0]);
                  }
              else if ((s = h(a)))
                if (!0 !== n && s[3]) {
                  o += s[3].call(t.date);
                } else s[2] ? (o += t["raw" + s[2]]) : (o += a[0]);
              else o += a[0];
            return o;
          }
          function g(e, t, i) {
            for (e = String(e), t = t || 2; e.length < t; )
              e = i ? e + "0" : "0" + e;
            return e;
          }
          function y(e, t, i) {
            var n,
              a,
              r,
              s = { date: new Date(1, 0, 1) },
              l = e;
            function u(e, t, i) {
              if (
                ((e[n] = t.replace(/[^0-9]/g, "0")),
                (e["raw" + n] = t),
                void 0 !== r)
              ) {
                var a = e[n];
                (("day" === n && 29 === parseInt(a)) ||
                  ("month" === n && 2 === parseInt(a))) &&
                  (29 !== parseInt(e.day) ||
                    2 !== parseInt(e.month) ||
                    ("" !== e.year && void 0 !== e.year) ||
                    e.date.setFullYear(2012, 1, 29)),
                  "day" === n && 0 === parseInt(a) && (a = 1),
                  "month" === n && 0 < (a = parseInt(a)) && (a -= 1),
                  "year" === n && a.length < 4 && (a = g(a, 4, !0)),
                  "" !== a && r.call(e.date, a);
              }
            }
            if ("string" == typeof l) {
              for (f(i).lastIndex = 0; (a = f(i).exec(t)); ) {
                var c = new RegExp("\\d+$").exec(a[0]),
                  p = c ? a[0][0] + "x" : a[0],
                  h = void 0;
                if (c) {
                  var v = f(i).lastIndex,
                    m = x(a.index, i);
                  (f(i).lastIndex = v),
                    (h = l.slice(0, l.indexOf(m.nextMatch[0])));
                } else h = l.slice(0, p.length);
                Object.prototype.hasOwnProperty.call(d, p) &&
                  ((n = d[p][2]), (r = d[p][1]), u(s, h)),
                  (l = l.slice(h.length));
              }
              return s;
            }
            if (
              l &&
              "object" === o(l) &&
              Object.prototype.hasOwnProperty.call(l, "date")
            )
              return l;
          }
          function b(e, t) {
            return m(t.inputFormat, { date: e }, t);
          }
          function x(e, t) {
            var i,
              n,
              a = 0,
              r = 0;
            for (f(t).lastIndex = 0; (n = f(t).exec(t.inputFormat)); ) {
              var s = new RegExp("\\d+$").exec(n[0]);
              if (e <= (a += r = s ? parseInt(s[0]) : n[0].length)) {
                (i = n), (n = f(t).exec(t.inputFormat));
                break;
              }
            }
            return { targetMatchIndex: a - r, nextMatch: n, targetMatch: i };
          }
          n.default.extendAliases({
            datetime: {
              mask: function (e) {
                return (
                  (e.numericInput = !1),
                  (d.S = e.i18n.ordinalSuffix.join("|")),
                  (e.inputFormat = p[e.inputFormat] || e.inputFormat),
                  (e.displayFormat =
                    p[e.displayFormat] || e.displayFormat || e.inputFormat),
                  (e.outputFormat =
                    p[e.outputFormat] || e.outputFormat || e.inputFormat),
                  (e.placeholder =
                    "" !== e.placeholder
                      ? e.placeholder
                      : e.inputFormat.replace(/[[\]]/, "")),
                  (e.regex = m(e.inputFormat, void 0, e)),
                  (e.min = y(e.min, e.inputFormat, e)),
                  (e.max = y(e.max, e.inputFormat, e)),
                  null
                );
              },
              placeholder: "",
              inputFormat: "isoDateTime",
              displayFormat: void 0,
              outputFormat: void 0,
              min: null,
              max: null,
              skipOptionalPartCharacter: "",
              i18n: {
                dayNames: [
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                monthNames: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                ordinalSuffix: ["st", "nd", "rd", "th"],
              },
              preValidation: function (e, t, i, n, a, r, s, o) {
                if (o) return !0;
                if (isNaN(i) && e[t] !== i) {
                  var l = x(t, a);
                  if (
                    l.nextMatch &&
                    l.nextMatch[0] === i &&
                    1 < l.targetMatch[0].length
                  ) {
                    var u = d[l.targetMatch[0]][0];
                    if (new RegExp(u).test("0" + e[t - 1]))
                      return (
                        (e[t] = e[t - 1]),
                        (e[t - 1] = "0"),
                        {
                          fuzzy: !0,
                          buffer: e,
                          refreshFromBuffer: { start: t - 1, end: t + 1 },
                          pos: t + 1,
                        }
                      );
                  }
                }
                return !0;
              },
              postValidation: function (e, t, i, n, a, r, s, o) {
                var l, u;
                if (s) return !0;
                if (
                  !1 === n &&
                  ((l = x(t + 1, a)).targetMatch &&
                    l.targetMatchIndex === t &&
                    1 < l.targetMatch[0].length &&
                    void 0 !== d[l.targetMatch[0]] &&
                    ((u = d[l.targetMatch[0]][0]),
                    void 0 !== r.validPositions[t + 1] &&
                    new RegExp(u).test(i + "0")
                      ? ((e[t] = i),
                        (e[t + 1] = "0"),
                        (n = { pos: t + 2, caret: t }))
                      : new RegExp(u).test("0" + i) &&
                        ((e[t] = "0"), (e[t + 1] = i), (n = { pos: t + 2 }))),
                  !1 === n)
                )
                  return n;
                if (
                  (n.fuzzy && ((e = n.buffer), (t = n.pos)),
                  (l = x(t, a)).targetMatch &&
                    l.targetMatch[0] &&
                    void 0 !== d[l.targetMatch[0]])
                ) {
                  u = d[l.targetMatch[0]][0];
                  var p = e.slice(
                    l.targetMatchIndex,
                    l.targetMatchIndex + l.targetMatch[0].length
                  );
                  !1 === new RegExp(u).test(p.join("")) &&
                    2 === l.targetMatch[0].length &&
                    r.validPositions[l.targetMatchIndex] &&
                    r.validPositions[l.targetMatchIndex + 1] &&
                    (r.validPositions[l.targetMatchIndex + 1].input = "0");
                }
                var h = n,
                  f = y(e.join(""), a.inputFormat, a);
                return (
                  h &&
                    f.date.getTime() == f.date.getTime() &&
                    ((h = (function (e, t, i) {
                      if (e.year !== e.rawyear) {
                        var n = c.toString(),
                          a = e.rawyear.replace(/[^0-9]/g, ""),
                          r = n.slice(0, a.length),
                          s = n.slice(a.length);
                        if (2 === a.length && a === r) {
                          var o = new Date(c, e.month - 1, e.day);
                          e.day == o.getDate() &&
                            (!i.max || i.max.date.getTime() >= o.getTime()) &&
                            (e.date.setFullYear(c),
                            (e.year = n),
                            (t.insert = [
                              { pos: t.pos + 1, c: s[0] },
                              { pos: t.pos + 2, c: s[1] },
                            ]));
                        }
                      }
                      return t;
                    })(f, h, a)),
                    (h = (function (e, t, i, n, a) {
                      if (!t) return t;
                      if (i.min) {
                        if (e.rawyear) {
                          var r,
                            s = e.rawyear.replace(/[^0-9]/g, ""),
                            o = i.min.year.substr(0, s.length);
                          if (s < o) {
                            var l = x(t.pos, i);
                            if (
                              ((s = e.rawyear
                                .substr(0, t.pos - l.targetMatchIndex + 1)
                                .replace(/[^0-9]/g, "0")),
                              (o = i.min.year.substr(0, s.length)) <= s)
                            )
                              return (
                                (t.remove = l.targetMatchIndex + s.length), t
                              );
                            if (
                              ((s =
                                "yyyy" === l.targetMatch[0]
                                  ? e.rawyear.substr(1, 1)
                                  : e.rawyear.substr(0, 1)),
                              (o = i.min.year.substr(2, 1)),
                              (r = i.max ? i.max.year.substr(2, 1) : s),
                              1 === s.length && o <= s && s <= r && !0 !== a)
                            )
                              return (
                                "yyyy" === l.targetMatch[0]
                                  ? ((t.insert = [
                                      { pos: t.pos + 1, c: s, strict: !0 },
                                    ]),
                                    (t.caret = t.pos + 2),
                                    (n.validPositions[t.pos].input =
                                      i.min.year[1]))
                                  : ((t.insert = [
                                      {
                                        pos: t.pos + 1,
                                        c: i.min.year[1],
                                        strict: !0,
                                      },
                                      { pos: t.pos + 2, c: s, strict: !0 },
                                    ]),
                                    (t.caret = t.pos + 3),
                                    (n.validPositions[t.pos].input =
                                      i.min.year[0])),
                                t
                              );
                            t = !1;
                          }
                        }
                        t &&
                          e.year &&
                          e.year === e.rawyear &&
                          i.min.date.getTime() == i.min.date.getTime() &&
                          (t = i.min.date.getTime() <= e.date.getTime());
                      }
                      return (
                        t &&
                          i.max &&
                          i.max.date.getTime() == i.max.date.getTime() &&
                          (t = i.max.date.getTime() >= e.date.getTime()),
                        t
                      );
                    })(f, (h = v.call(this, f, h, a)), a, r, o))),
                  void 0 !== t && h && n.pos !== t
                    ? {
                        buffer: m(a.inputFormat, f, a).split(""),
                        refreshFromBuffer: { start: t, end: n.pos },
                        pos: n.caret || n.pos,
                      }
                    : h
                );
              },
              onKeyDown: function (e, t, i, n) {
                e.ctrlKey &&
                  e.keyCode === a.default.RIGHT &&
                  (this.inputmask._valueSet(b(new Date(), n)),
                  u(this).trigger("setvalue"));
              },
              onUnMask: function (e, t, i) {
                return t ? m(i.outputFormat, y(e, i.inputFormat, i), i, !0) : t;
              },
              casing: function (e, t, i, n) {
                return 0 == t.nativeDef.indexOf("[ap]")
                  ? e.toLowerCase()
                  : 0 == t.nativeDef.indexOf("[AP]")
                  ? e.toUpperCase()
                  : e;
              },
              onBeforeMask: function (e, t) {
                return (
                  "[object Date]" === Object.prototype.toString.call(e) &&
                    (e = b(e, t)),
                  e
                );
              },
              insertMode: !1,
              shiftPositions: !1,
              keepStatic: !1,
              inputmode: "numeric",
            },
          });
        },
        function (e, t, i) {
          "use strict";
          var n = s(i(2)),
            a = s(i(0)),
            r = s(i(13));
          function s(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var o = n.default.dependencyLib;
          function l(e, t) {
            for (var i = "", a = 0; a < e.length; a++)
              n.default.prototype.definitions[e.charAt(a)] ||
              t.definitions[e.charAt(a)] ||
              t.optionalmarker[0] === e.charAt(a) ||
              t.optionalmarker[1] === e.charAt(a) ||
              t.quantifiermarker[0] === e.charAt(a) ||
              t.quantifiermarker[1] === e.charAt(a) ||
              t.groupmarker[0] === e.charAt(a) ||
              t.groupmarker[1] === e.charAt(a) ||
              t.alternatormarker === e.charAt(a)
                ? (i += "\\" + e.charAt(a))
                : (i += e.charAt(a));
            return i;
          }
          function u(e, t, i, n) {
            if (0 < e.length && 0 < t && (!i.digitsOptional || n)) {
              var a = e.indexOf(i.radixPoint),
                r = !1;
              i.negationSymbol.back === e[e.length - 1] &&
                ((r = !0), e.length--),
                -1 === a && (e.push(i.radixPoint), (a = e.length - 1));
              for (var s = 1; s <= t; s++)
                isFinite(e[a + s]) || (e[a + s] = "0");
            }
            return r && e.push(i.negationSymbol.back), e;
          }
          function c(e, t) {
            var i = 0;
            if ("+" === e) {
              for (i in t.validPositions);
              i = parseInt(i);
            }
            for (var n in t.tests)
              if (i <= (n = parseInt(n)))
                for (var a = 0, r = t.tests[n].length; a < r; a++)
                  if (
                    (void 0 === t.validPositions[n] || "-" === e) &&
                    t.tests[n][a].match.def === e
                  )
                    return (
                      n + (void 0 !== t.validPositions[n] && "-" !== e ? 1 : 0)
                    );
            return i;
          }
          function d(e, t) {
            var i = -1;
            for (var n in t.validPositions) {
              var a = t.validPositions[n];
              if (a && a.match.def === e) {
                i = parseInt(n);
                break;
              }
            }
            return i;
          }
          function p(e, t, i, n, a) {
            var r = t.buffer ? t.buffer.indexOf(a.radixPoint) : -1,
              s = -1 !== r && new RegExp("[0-9???-???]").test(e);
            return a._radixDance && s && null == t.validPositions[r]
              ? {
                  insert: { pos: r === i ? r + 1 : r, c: a.radixPoint },
                  pos: i,
                }
              : s;
          }
          n.default.extendAliases({
            numeric: {
              mask: function (e) {
                (e.repeat = 0),
                  e.groupSeparator === e.radixPoint &&
                    e.digits &&
                    "0" !== e.digits &&
                    ("." === e.radixPoint
                      ? (e.groupSeparator = ",")
                      : "," === e.radixPoint
                      ? (e.groupSeparator = ".")
                      : (e.groupSeparator = "")),
                  " " === e.groupSeparator &&
                    (e.skipOptionalPartCharacter = void 0),
                  1 < e.placeholder.length &&
                    (e.placeholder = e.placeholder.charAt(0)),
                  "radixFocus" === e.positionCaretOnClick &&
                    "" === e.placeholder &&
                    (e.positionCaretOnClick = "lvp");
                var t = "0",
                  i = e.radixPoint;
                !0 === e.numericInput && void 0 === e.__financeInput
                  ? ((t = "1"),
                    (e.positionCaretOnClick =
                      "radixFocus" === e.positionCaretOnClick
                        ? "lvp"
                        : e.positionCaretOnClick),
                    (e.digitsOptional = !1),
                    isNaN(e.digits) && (e.digits = 2),
                    (e._radixDance = !1),
                    (i = "," === e.radixPoint ? "?" : "!"),
                    "" !== e.radixPoint &&
                      void 0 === e.definitions[i] &&
                      ((e.definitions[i] = {}),
                      (e.definitions[i].validator = "[" + e.radixPoint + "]"),
                      (e.definitions[i].placeholder = e.radixPoint),
                      (e.definitions[i].static = !0),
                      (e.definitions[i].generated = !0)))
                  : ((e.__financeInput = !1), (e.numericInput = !0));
                var n,
                  a = "[+]";
                if (
                  ((a += l(e.prefix, e)),
                  "" !== e.groupSeparator
                    ? (void 0 === e.definitions[e.groupSeparator] &&
                        ((e.definitions[e.groupSeparator] = {}),
                        (e.definitions[e.groupSeparator].validator =
                          "[" + e.groupSeparator + "]"),
                        (e.definitions[e.groupSeparator].placeholder =
                          e.groupSeparator),
                        (e.definitions[e.groupSeparator].static = !0),
                        (e.definitions[e.groupSeparator].generated = !0)),
                      (a += e._mask(e)))
                    : (a += "9{+}"),
                  void 0 !== e.digits && 0 !== e.digits)
                ) {
                  var s = e.digits.toString().split(",");
                  isFinite(s[0]) && s[1] && isFinite(s[1])
                    ? (a += i + t + "{" + e.digits + "}")
                    : (isNaN(e.digits) || 0 < parseInt(e.digits)) &&
                      (e.digitsOptional
                        ? ((n = a + i + t + "{0," + e.digits + "}"),
                          (e.keepStatic = !0))
                        : (a += i + t + "{" + e.digits + "}"));
                }
                return (
                  (a += l(e.suffix, e)),
                  (a += "[-]"),
                  n && (a = [n + l(e.suffix, e) + "[-]", a]),
                  (e.greedy = !1),
                  (function (e) {
                    void 0 === e.parseMinMaxOptions &&
                      (null !== e.min &&
                        ((e.min = e.min
                          .toString()
                          .replace(
                            new RegExp((0, r.default)(e.groupSeparator), "g"),
                            ""
                          )),
                        "," === e.radixPoint &&
                          (e.min = e.min.replace(e.radixPoint, ".")),
                        (e.min = isFinite(e.min) ? parseFloat(e.min) : NaN),
                        isNaN(e.min) && (e.min = Number.MIN_VALUE)),
                      null !== e.max &&
                        ((e.max = e.max
                          .toString()
                          .replace(
                            new RegExp((0, r.default)(e.groupSeparator), "g"),
                            ""
                          )),
                        "," === e.radixPoint &&
                          (e.max = e.max.replace(e.radixPoint, ".")),
                        (e.max = isFinite(e.max) ? parseFloat(e.max) : NaN),
                        isNaN(e.max) && (e.max = Number.MAX_VALUE)),
                      (e.parseMinMaxOptions = "done"));
                  })(e),
                  a
                );
              },
              _mask: function (e) {
                return "(" + e.groupSeparator + "999){+|1}";
              },
              digits: "*",
              digitsOptional: !0,
              enforceDigitsOnBlur: !1,
              radixPoint: ".",
              positionCaretOnClick: "radixFocus",
              _radixDance: !0,
              groupSeparator: "",
              allowMinus: !0,
              negationSymbol: { front: "-", back: "" },
              prefix: "",
              suffix: "",
              min: null,
              max: null,
              SetMaxOnOverflow: !1,
              step: 1,
              inputType: "text",
              unmaskAsNumber: !1,
              roundingFN: Math.round,
              inputmode: "decimal",
              shortcuts: { k: "000", m: "000000" },
              placeholder: "0",
              greedy: !1,
              rightAlign: !0,
              insertMode: !0,
              autoUnmask: !1,
              skipOptionalPartCharacter: "",
              definitions: {
                0: { validator: p },
                1: { validator: p, definitionSymbol: "9" },
                "+": {
                  validator: function (e, t, i, n, a) {
                    return (
                      a.allowMinus &&
                      ("-" === e || e === a.negationSymbol.front)
                    );
                  },
                },
                "-": {
                  validator: function (e, t, i, n, a) {
                    return a.allowMinus && e === a.negationSymbol.back;
                  },
                },
              },
              preValidation: function (e, t, i, n, a, r, s, o) {
                if (!1 !== a.__financeInput && i === a.radixPoint) return !1;
                var l;
                if ((l = a.shortcuts && a.shortcuts[i])) {
                  if (1 < l.length)
                    for (var u = [], p = 0; p < l.length; p++)
                      u.push({ pos: t + p, c: l[p], strict: !1 });
                  return { insert: u };
                }
                var h = e.indexOf(a.radixPoint),
                  f = t;
                if (
                  ((t = (function (e, t, i, n, a) {
                    return (
                      a._radixDance &&
                        a.numericInput &&
                        t !== a.negationSymbol.back &&
                        e <= i &&
                        (0 < i || t == a.radixPoint) &&
                        (void 0 === n.validPositions[e - 1] ||
                          n.validPositions[e - 1].input !==
                            a.negationSymbol.back) &&
                        (e -= 1),
                      e
                    );
                  })(t, i, h, r, a)),
                  "-" === i || i === a.negationSymbol.front)
                ) {
                  if (!0 !== a.allowMinus) return !1;
                  var v = !1,
                    m = d("+", r),
                    g = d("-", r);
                  return (
                    -1 !== m && (v = [m, g]),
                    !1 !== v
                      ? { remove: v, caret: f - a.negationSymbol.front.length }
                      : {
                          insert: [
                            {
                              pos: c("+", r),
                              c: a.negationSymbol.front,
                              fromIsValid: !0,
                            },
                            {
                              pos: c("-", r),
                              c: a.negationSymbol.back,
                              fromIsValid: void 0,
                            },
                          ],
                          caret: f + a.negationSymbol.back.length,
                        }
                  );
                }
                if (i === a.groupSeparator) return { caret: f };
                if (o) return !0;
                if (
                  -1 !== h &&
                  !0 === a._radixDance &&
                  !1 === n &&
                  i === a.radixPoint &&
                  void 0 !== a.digits &&
                  (isNaN(a.digits) || 0 < parseInt(a.digits)) &&
                  h !== t
                )
                  return { caret: a._radixDance && t === h - 1 ? h + 1 : h };
                if (!1 === a.__financeInput)
                  if (n) {
                    if (a.digitsOptional) return { rewritePosition: s.end };
                    if (!a.digitsOptional) {
                      if (s.begin > h && s.end <= h)
                        return i === a.radixPoint
                          ? {
                              insert: { pos: h + 1, c: "0", fromIsValid: !0 },
                              rewritePosition: h,
                            }
                          : { rewritePosition: h + 1 };
                      if (s.begin < h) return { rewritePosition: s.begin - 1 };
                    }
                  } else if (
                    !a.showMaskOnHover &&
                    !a.showMaskOnFocus &&
                    !a.digitsOptional &&
                    0 < a.digits &&
                    "" === this.__valueGet.call(this.el)
                  )
                    return { rewritePosition: h };
                return { rewritePosition: t };
              },
              postValidation: function (e, t, i, n, a, r, s) {
                if (!1 === n) return n;
                if (s) return !0;
                if (null !== a.min || null !== a.max) {
                  var l = a.onUnMask(
                    e.slice().reverse().join(""),
                    void 0,
                    o.extend({}, a, { unmaskAsNumber: !0 })
                  );
                  if (
                    null !== a.min &&
                    l < a.min &&
                    (l.toString().length > a.min.toString().length || l < 0)
                  )
                    return !1;
                  if (null !== a.max && l > a.max)
                    return (
                      !!a.SetMaxOnOverflow && {
                        refreshFromBuffer: !0,
                        buffer: u(
                          a.max.toString().replace(".", a.radixPoint).split(""),
                          a.digits,
                          a
                        ).reverse(),
                      }
                    );
                }
                return n;
              },
              onUnMask: function (e, t, i) {
                if ("" === t && !0 === i.nullable) return t;
                var n = e.replace(i.prefix, "");
                return (
                  (n = (n = n.replace(i.suffix, "")).replace(
                    new RegExp((0, r.default)(i.groupSeparator), "g"),
                    ""
                  )),
                  "" !== i.placeholder.charAt(0) &&
                    (n = n.replace(
                      new RegExp(i.placeholder.charAt(0), "g"),
                      "0"
                    )),
                  i.unmaskAsNumber
                    ? ("" !== i.radixPoint &&
                        -1 !== n.indexOf(i.radixPoint) &&
                        (n = n.replace(
                          r.default.call(this, i.radixPoint),
                          "."
                        )),
                      (n = (n = n.replace(
                        new RegExp(
                          "^" + (0, r.default)(i.negationSymbol.front)
                        ),
                        "-"
                      )).replace(
                        new RegExp((0, r.default)(i.negationSymbol.back) + "$"),
                        ""
                      )),
                      Number(n))
                    : n
                );
              },
              isComplete: function (e, t) {
                var i = (t.numericInput ? e.slice().reverse() : e).join("");
                return (
                  (i = (i = (i = (i = (i = i.replace(
                    new RegExp("^" + (0, r.default)(t.negationSymbol.front)),
                    "-"
                  )).replace(
                    new RegExp((0, r.default)(t.negationSymbol.back) + "$"),
                    ""
                  )).replace(t.prefix, "")).replace(t.suffix, "")).replace(
                    new RegExp(
                      (0, r.default)(t.groupSeparator) + "([0-9]{3})",
                      "g"
                    ),
                    "$1"
                  )),
                  "," === t.radixPoint &&
                    (i = i.replace((0, r.default)(t.radixPoint), ".")),
                  isFinite(i)
                );
              },
              onBeforeMask: function (e, t) {
                var i = t.radixPoint || ",";
                isFinite(t.digits) && (t.digits = parseInt(t.digits)),
                  ("number" != typeof e && "number" !== t.inputType) ||
                    "" === i ||
                    (e = e.toString().replace(".", i));
                var n =
                    "-" === e.charAt(0) ||
                    e.charAt(0) === t.negationSymbol.front,
                  a = e.split(i),
                  s = a[0].replace(/[^\-0-9]/g, ""),
                  o = 1 < a.length ? a[1].replace(/[^0-9]/g, "") : "",
                  l = 1 < a.length;
                e = s + ("" !== o ? i + o : o);
                var c = 0;
                if (
                  "" !== i &&
                  ((c = t.digitsOptional
                    ? t.digits < o.length
                      ? t.digits
                      : o.length
                    : t.digits),
                  "" !== o || !t.digitsOptional)
                ) {
                  var d = Math.pow(10, c || 1);
                  (e = e.replace((0, r.default)(i), ".")),
                    isNaN(parseFloat(e)) ||
                      (e = (t.roundingFN(parseFloat(e) * d) / d).toFixed(c)),
                    (e = e.toString().replace(".", i));
                }
                if (
                  (0 === t.digits &&
                    -1 !== e.indexOf(i) &&
                    (e = e.substring(0, e.indexOf(i))),
                  null !== t.min || null !== t.max)
                ) {
                  var p = e.toString().replace(i, ".");
                  null !== t.min && p < t.min
                    ? (e = t.min.toString().replace(".", i))
                    : null !== t.max &&
                      p > t.max &&
                      (e = t.max.toString().replace(".", i));
                }
                return (
                  n && "-" !== e.charAt(0) && (e = "-" + e),
                  u(e.toString().split(""), c, t, l).join("")
                );
              },
              onBeforeWrite: function (e, t, i, n) {
                function a(e, t) {
                  if (!1 !== n.__financeInput || t) {
                    var i = e.indexOf(n.radixPoint);
                    -1 !== i && e.splice(i, 1);
                  }
                  if ("" !== n.groupSeparator)
                    for (; -1 !== (i = e.indexOf(n.groupSeparator)); )
                      e.splice(i, 1);
                  return e;
                }
                var s,
                  l = (function (e, t) {
                    var i = new RegExp(
                        "(^" +
                          ("" !== t.negationSymbol.front
                            ? (0, r.default)(t.negationSymbol.front) + "?"
                            : "") +
                          (0, r.default)(t.prefix) +
                          ")(.*)(" +
                          (0, r.default)(t.suffix) +
                          ("" != t.negationSymbol.back
                            ? (0, r.default)(t.negationSymbol.back) + "?"
                            : "") +
                          "$)"
                      ).exec(e.slice().reverse().join("")),
                      n = i ? i[2] : "",
                      a = !1;
                    return (
                      n &&
                        ((n = n.split(t.radixPoint.charAt(0))[0]),
                        (a = new RegExp("^[0" + t.groupSeparator + "]*").exec(
                          n
                        ))),
                      !(
                        !a ||
                        !(
                          1 < a[0].length ||
                          (0 < a[0].length && a[0].length < n.length)
                        )
                      ) && a
                    );
                  })(t, n);
                if (l)
                  for (
                    var c =
                        t
                          .join("")
                          .lastIndexOf(l[0].split("").reverse().join("")) -
                        (l[0] == l.input ? 0 : 1),
                      d = l[0] == l.input ? 1 : 0,
                      p = l[0].length - d;
                    0 < p;
                    p--
                  )
                    delete this.maskset.validPositions[c + p], delete t[c + p];
                if (e)
                  switch (e.type) {
                    case "blur":
                    case "checkval":
                      if (null !== n.min) {
                        var h = n.onUnMask(
                          t.slice().reverse().join(""),
                          void 0,
                          o.extend({}, n, { unmaskAsNumber: !0 })
                        );
                        if (null !== n.min && h < n.min)
                          return {
                            refreshFromBuffer: !0,
                            buffer: u(
                              n.min
                                .toString()
                                .replace(".", n.radixPoint)
                                .split(""),
                              n.digits,
                              n
                            ).reverse(),
                          };
                      }
                      if (t[t.length - 1] === n.negationSymbol.front) {
                        var f = new RegExp(
                          "(^" +
                            ("" != n.negationSymbol.front
                              ? (0, r.default)(n.negationSymbol.front) + "?"
                              : "") +
                            (0, r.default)(n.prefix) +
                            ")(.*)(" +
                            (0, r.default)(n.suffix) +
                            ("" != n.negationSymbol.back
                              ? (0, r.default)(n.negationSymbol.back) + "?"
                              : "") +
                            "$)"
                        ).exec(a(t.slice(), !0).reverse().join(""));
                        0 == (f ? f[2] : "") &&
                          (s = { refreshFromBuffer: !0, buffer: [0] });
                      } else
                        "" !== n.radixPoint &&
                          t[0] === n.radixPoint &&
                          (s && s.buffer
                            ? s.buffer.shift()
                            : (t.shift(),
                              (s = { refreshFromBuffer: !0, buffer: a(t) })));
                      if (n.enforceDigitsOnBlur) {
                        var v =
                          ((s = s || {}) && s.buffer) || t.slice().reverse();
                        (s.refreshFromBuffer = !0),
                          (s.buffer = u(v, n.digits, n, !0).reverse());
                      }
                  }
                return s;
              },
              onKeyDown: function (e, t, i, n) {
                var r,
                  s = o(this);
                if (e.ctrlKey)
                  switch (e.keyCode) {
                    case a.default.UP:
                      return (
                        this.inputmask.__valueSet.call(
                          this,
                          parseFloat(this.inputmask.unmaskedvalue()) +
                            parseInt(n.step)
                        ),
                        s.trigger("setvalue"),
                        !1
                      );
                    case a.default.DOWN:
                      return (
                        this.inputmask.__valueSet.call(
                          this,
                          parseFloat(this.inputmask.unmaskedvalue()) -
                            parseInt(n.step)
                        ),
                        s.trigger("setvalue"),
                        !1
                      );
                  }
                if (
                  !e.shiftKey &&
                  (e.keyCode === a.default.DELETE ||
                    e.keyCode === a.default.BACKSPACE ||
                    e.keyCode === a.default.BACKSPACE_SAFARI) &&
                  i.begin !== t.length
                ) {
                  if (
                    t[e.keyCode === a.default.DELETE ? i.begin - 1 : i.end] ===
                    n.negationSymbol.front
                  )
                    return (
                      (r = t.slice().reverse()),
                      "" !== n.negationSymbol.front && r.shift(),
                      "" !== n.negationSymbol.back && r.pop(),
                      s.trigger("setvalue", [r.join(""), i.begin]),
                      !1
                    );
                  if (!0 === n._radixDance) {
                    var l = t.indexOf(n.radixPoint);
                    if (n.digitsOptional) {
                      if (0 === l)
                        return (
                          (r = t.slice().reverse()).pop(),
                          s.trigger("setvalue", [
                            r.join(""),
                            i.begin >= r.length ? r.length : i.begin,
                          ]),
                          !1
                        );
                    } else if (
                      -1 !== l &&
                      (i.begin < l ||
                        i.end < l ||
                        (e.keyCode === a.default.DELETE && i.begin === l))
                    )
                      return (
                        i.begin !== i.end ||
                          (e.keyCode !== a.default.BACKSPACE &&
                            e.keyCode !== a.default.BACKSPACE_SAFARI) ||
                          i.begin++,
                        (r = t.slice().reverse()).splice(
                          r.length - i.begin,
                          i.begin - i.end + 1
                        ),
                        (r = u(r, n.digits, n).join("")),
                        s.trigger("setvalue", [
                          r,
                          i.begin >= r.length ? l + 1 : i.begin,
                        ]),
                        !1
                      );
                  }
                }
              },
            },
            currency: {
              prefix: "",
              groupSeparator: ",",
              alias: "numeric",
              digits: 2,
              digitsOptional: !1,
            },
            decimal: { alias: "numeric" },
            integer: { alias: "numeric", inputmode: "numeric", digits: 0 },
            percentage: {
              alias: "numeric",
              min: 0,
              max: 100,
              suffix: " %",
              digits: 0,
              allowMinus: !1,
            },
            indianns: {
              alias: "numeric",
              _mask: function (e) {
                return (
                  "(" +
                  e.groupSeparator +
                  "99){*|1}(" +
                  e.groupSeparator +
                  "999){1|1}"
                );
              },
              groupSeparator: ",",
              radixPoint: ".",
              placeholder: "0",
              digits: 2,
              digitsOptional: !1,
            },
          });
        },
        function (e, t, i) {
          "use strict";
          var n = h(i(8)),
            a = h(i(2)),
            r = h(i(9));
          function s(e) {
            return (s =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function o(e, t) {
            return !t || ("object" !== s(t) && "function" != typeof t)
              ? (function (e) {
                  if (void 0 === e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return e;
                })(e)
              : t;
          }
          function l(e) {
            var t = "function" == typeof Map ? new Map() : void 0;
            return (l = function (e) {
              if (
                null === e ||
                ((i = e),
                -1 === Function.toString.call(i).indexOf("[native code]"))
              )
                return e;
              var i;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n);
              }
              function n() {
                return u(e, arguments, p(this).constructor);
              }
              return (
                (n.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                d(n, e)
              );
            })(e);
          }
          function u(e, t, i) {
            return (u = c()
              ? Reflect.construct
              : function (e, t, i) {
                  var n = [null];
                  n.push.apply(n, t);
                  var a = new (Function.bind.apply(e, n))();
                  return i && d(a, i.prototype), a;
                }).apply(null, arguments);
          }
          function c() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Date.prototype.toString.call(
                  Reflect.construct(Date, [], function () {})
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          }
          function d(e, t) {
            return (d =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              })(e, t);
          }
          function p(e) {
            return (p = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                })(e);
          }
          function h(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var f = n.default.document;
          if (
            r.default &&
            f &&
            f.head &&
            f.head.attachShadow &&
            n.default.customElements &&
            void 0 === n.default.customElements.get("input-mask")
          ) {
            var v = (function (e) {
              !(function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function"
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: { value: e, writable: !0, configurable: !0 },
                })),
                  t && d(e, t);
              })(r, e);
              var t,
                i,
                n =
                  ((t = r),
                  (i = c()),
                  function () {
                    var e,
                      n = p(t);
                    if (i) {
                      var a = p(this).constructor;
                      e = Reflect.construct(n, arguments, a);
                    } else e = n.apply(this, arguments);
                    return o(this, e);
                  });
              function r() {
                var e;
                !(function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, r);
                var t = (e = n.call(this)).getAttributeNames(),
                  i = e.attachShadow({ mode: "closed" }),
                  s = f.createElement("input");
                for (var o in ((s.type = "text"), i.appendChild(s), t))
                  Object.prototype.hasOwnProperty.call(t, o) &&
                    s.setAttribute(t[o], e.getAttribute(t[o]));
                var l = new a.default();
                return (
                  (l.dataAttribute = ""),
                  l.mask(s),
                  (s.inputmask.shadowRoot = i),
                  e
                );
              }
              return r;
            })(l(HTMLElement));
            n.default.customElements.define("input-mask", v);
          }
        },
        function (e, t, i) {
          "use strict";
          var n = s(i(10)),
            a = s(i(2));
          function r(e) {
            return (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(e);
          }
          function s(e) {
            return e && e.__esModule ? e : { default: e };
          }
          void 0 === n.default.fn.inputmask &&
            (n.default.fn.inputmask = function (e, t) {
              var i,
                s = this[0];
              if ((void 0 === t && (t = {}), "string" == typeof e))
                switch (e) {
                  case "unmaskedvalue":
                    return s && s.inputmask
                      ? s.inputmask.unmaskedvalue()
                      : (0, n.default)(s).val();
                  case "remove":
                    return this.each(function () {
                      this.inputmask && this.inputmask.remove();
                    });
                  case "getemptymask":
                    return s && s.inputmask ? s.inputmask.getemptymask() : "";
                  case "hasMaskedValue":
                    return (
                      !(!s || !s.inputmask) && s.inputmask.hasMaskedValue()
                    );
                  case "isComplete":
                    return !s || !s.inputmask || s.inputmask.isComplete();
                  case "getmetadata":
                    return s && s.inputmask
                      ? s.inputmask.getmetadata()
                      : void 0;
                  case "setvalue":
                    a.default.setValue(s, t);
                    break;
                  case "option":
                    if ("string" != typeof t)
                      return this.each(function () {
                        if (void 0 !== this.inputmask)
                          return this.inputmask.option(t);
                      });
                    if (s && void 0 !== s.inputmask)
                      return s.inputmask.option(t);
                    break;
                  default:
                    return (
                      (t.alias = e),
                      (i = new a.default(t)),
                      this.each(function () {
                        i.mask(this);
                      })
                    );
                }
              else {
                if (Array.isArray(e))
                  return (
                    (t.alias = e),
                    (i = new a.default(t)),
                    this.each(function () {
                      i.mask(this);
                    })
                  );
                if ("object" == r(e))
                  return (
                    (i = new a.default(e)),
                    void 0 === e.mask && void 0 === e.alias
                      ? this.each(function () {
                          if (void 0 !== this.inputmask)
                            return this.inputmask.option(e);
                          i.mask(this);
                        })
                      : this.each(function () {
                          i.mask(this);
                        })
                  );
                if (void 0 === e)
                  return this.each(function () {
                    (i = new a.default(t)).mask(this);
                  });
              }
            });
        },
        function (e, t, i) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          var n,
            a = (n = i(14)) && n.__esModule ? n : { default: n };
          i(25);
          var r = a.default;
          t.default = r;
        },
      ]),
      (n = {}),
      (t.m = i),
      (t.c = n),
      (t.d = function (e, i, n) {
        t.o(e, i) || Object.defineProperty(e, i, { enumerable: !0, get: n });
      }),
      (t.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (t.t = function (e, i) {
        if ((1 & i && (e = t(e)), 8 & i)) return e;
        if (4 & i && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (t.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: e }),
          2 & i && "string" != typeof e)
        )
          for (var a in e)
            t.d(
              n,
              a,
              function (t) {
                return e[t];
              }.bind(null, a)
            );
        return n;
      }),
      (t.n = function (e) {
        var i =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(i, "a", i), i;
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ""),
      t((t.s = 26))
    );
    function t(e) {
      if (n[e]) return n[e].exports;
      var a = (n[e] = { i: e, l: !1, exports: {} });
      return i[e].call(a.exports, a, a.exports, t), (a.l = !0), a.exports;
    }
    var i, n;
  });
var $jscomp = $jscomp || {};
($jscomp.scope = {}),
  ($jscomp.findInternal = function (e, t, i) {
    e instanceof String && (e = String(e));
    for (var n = e.length, a = 0; a < n; a++) {
      var r = e[a];
      if (t.call(i, r, a, e)) return { i: a, v: r };
    }
    return { i: -1, v: void 0 };
  }),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.SIMPLE_FROUND_POLYFILL = !1),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (e, t, i) {
          e != Array.prototype && e != Object.prototype && (e[t] = i.value);
        }),
  ($jscomp.getGlobal = function (e) {
    return "undefined" != typeof window && window === e
      ? e
      : "undefined" != typeof global && null != global
      ? global
      : e;
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.polyfill = function (e, t, i, n) {
    if (t) {
      for (i = $jscomp.global, e = e.split("."), n = 0; n < e.length - 1; n++) {
        var a = e[n];
        a in i || (i[a] = {}), (i = i[a]);
      }
      (t = t((n = i[(e = e[e.length - 1])]))) != n &&
        null != t &&
        $jscomp.defineProperty(i, e, {
          configurable: !0,
          writable: !0,
          value: t,
        });
    }
  }),
  $jscomp.polyfill(
    "Array.prototype.find",
    function (e) {
      return (
        e ||
        function (e, t) {
          return $jscomp.findInternal(this, e, t).v;
        }
      );
    },
    "es6",
    "es3"
  ),
  (function (e, t, i) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof exports && "undefined" == typeof Meteor
      ? (module.exports = e(require("jquery")))
      : e(t || i);
  })(
    function (e) {
      var t = function (t, i, n) {
        var a = {
          invalid: [],
          getCaret: function () {
            try {
              var e = 0,
                i = t.get(0),
                n = document.selection,
                r = i.selectionStart;
              if (n && -1 === navigator.appVersion.indexOf("MSIE 10")) {
                var s = n.createRange();
                s.moveStart("character", -a.val().length), (e = s.text.length);
              } else (r || "0" === r) && (e = r);
              return e;
            } catch (e) {}
          },
          setCaret: function (e) {
            try {
              if (t.is(":focus")) {
                var i = t.get(0);
                if (i.setSelectionRange) i.setSelectionRange(e, e);
                else {
                  var n = i.createTextRange();
                  n.collapse(!0),
                    n.moveEnd("character", e),
                    n.moveStart("character", e),
                    n.select();
                }
              }
            } catch (e) {}
          },
          events: function () {
            t.on("keydown.mask", function (e) {
              t.data("mask-keycode", e.keyCode || e.which),
                t.data("mask-previus-value", t.val()),
                t.data("mask-previus-caret-pos", a.getCaret()),
                (a.maskDigitPosMapOld = a.maskDigitPosMap);
            })
              .on(
                e.jMaskGlobals.useInput ? "input.mask" : "keyup.mask",
                a.behaviour
              )
              .on("paste.mask drop.mask", function () {
                setTimeout(function () {
                  t.keydown().keyup();
                }, 100);
              })
              .on("change.mask", function () {
                t.data("changed", !0);
              })
              .on("blur.mask", function () {
                o === a.val() || t.data("changed") || t.trigger("change"),
                  t.data("changed", !1);
              })
              .on("blur.mask", function () {
                o = a.val();
              })
              .on("focus.mask", function (t) {
                !0 === n.selectOnFocus && e(t.target).select();
              })
              .on("focusout.mask", function () {
                n.clearIfNotMatch && !r.test(a.val()) && a.val("");
              });
          },
          getRegexMask: function () {
            for (var e, t, n, a, r = [], o = 0; o < i.length; o++)
              (e = s.translation[i.charAt(o)])
                ? ((t = e.pattern.toString().replace(/.{1}$|^.{1}/g, "")),
                  (n = e.optional),
                  (e = e.recursive)
                    ? (r.push(i.charAt(o)),
                      (a = { digit: i.charAt(o), pattern: t }))
                    : r.push(n || e ? t + "?" : t))
                : r.push(i.charAt(o).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
            return (
              (r = r.join("")),
              a &&
                (r = r
                  .replace(
                    new RegExp("(" + a.digit + "(.*" + a.digit + ")?)"),
                    "($1)?"
                  )
                  .replace(new RegExp(a.digit, "g"), a.pattern)),
              new RegExp(r)
            );
          },
          destroyEvents: function () {
            t.off(
              "input keydown keyup paste drop blur focusout "
                .split(" ")
                .join(".mask ")
            );
          },
          val: function (e) {
            var i = t.is("input") ? "val" : "text";
            return (
              0 < arguments.length
                ? (t[i]() !== e && t[i](e), (i = t))
                : (i = t[i]()),
              i
            );
          },
          calculateCaretPosition: function (e) {
            var i = a.getMasked(),
              n = a.getCaret();
            if (e !== i) {
              var r = t.data("mask-previus-caret-pos") || 0;
              i = i.length;
              var s,
                o = e.length,
                l = (e = 0),
                u = 0,
                c = 0;
              for (s = n; s < i && a.maskDigitPosMap[s]; s++) l++;
              for (s = n - 1; 0 <= s && a.maskDigitPosMap[s]; s--) e++;
              for (s = n - 1; 0 <= s; s--) a.maskDigitPosMap[s] && u++;
              for (s = r - 1; 0 <= s; s--) a.maskDigitPosMapOld[s] && c++;
              n > o
                ? (n = 10 * i)
                : r >= n && r !== o
                ? a.maskDigitPosMapOld[n] ||
                  ((r = n),
                  (n = n - (c - u) - e),
                  a.maskDigitPosMap[n] && (n = r))
                : n > r && (n = n + (u - c) + l);
            }
            return n;
          },
          behaviour: function (i) {
            (i = i || window.event), (a.invalid = []);
            var n = t.data("mask-keycode");
            if (-1 === e.inArray(n, s.byPassKeys)) {
              n = a.getMasked();
              var r = a.getCaret(),
                o = t.data("mask-previus-value") || "";
              return (
                setTimeout(function () {
                  a.setCaret(a.calculateCaretPosition(o));
                }, e.jMaskGlobals.keyStrokeCompensation),
                a.val(n),
                a.setCaret(r),
                a.callbacks(i)
              );
            }
          },
          getMasked: function (e, t) {
            var r,
              o = [],
              l = void 0 === t ? a.val() : t + "",
              u = 0,
              c = i.length,
              d = 0,
              p = l.length,
              h = 1,
              f = "push",
              v = -1,
              m = 0;
            if (((t = []), n.reverse)) {
              (f = "unshift"), (h = -1);
              var g = 0;
              (u = c - 1), (d = p - 1);
              var y = function () {
                return -1 < u && -1 < d;
              };
            } else
              (g = c - 1),
                (y = function () {
                  return u < c && d < p;
                });
            for (; y(); ) {
              var b = i.charAt(u),
                x = l.charAt(d),
                w = s.translation[b];
              w
                ? (x.match(w.pattern)
                    ? (o[f](x),
                      w.recursive &&
                        (-1 === v ? (v = u) : u === g && u !== v && (u = v - h),
                        g === v && (u -= h)),
                      (u += h))
                    : x === r
                    ? (m--, (r = void 0))
                    : w.optional
                    ? ((u += h), (d -= h))
                    : w.fallback
                    ? (o[f](w.fallback), (u += h), (d -= h))
                    : a.invalid.push({ p: d, v: x, e: w.pattern }),
                  (d += h))
                : (e || o[f](b),
                  x === b
                    ? (t.push(d), (d += h))
                    : ((r = b), t.push(d + m), m++),
                  (u += h));
            }
            return (
              (e = i.charAt(g)),
              c !== p + 1 || s.translation[e] || o.push(e),
              (o = o.join("")),
              a.mapMaskdigitPositions(o, t, p),
              o
            );
          },
          mapMaskdigitPositions: function (e, t, i) {
            for (
              e = n.reverse ? e.length - i : 0, a.maskDigitPosMap = {}, i = 0;
              i < t.length;
              i++
            )
              a.maskDigitPosMap[t[i] + e] = 1;
          },
          callbacks: function (e) {
            var r = a.val(),
              s = r !== o,
              l = [r, e, t, n],
              u = function (e, t, i) {
                "function" == typeof n[e] && t && n[e].apply(this, i);
              };
            u("onChange", !0 === s, l),
              u("onKeyPress", !0 === s, l),
              u("onComplete", r.length === i.length, l),
              u("onInvalid", 0 < a.invalid.length, [r, e, t, a.invalid, n]);
          },
        };
        t = e(t);
        var r,
          s = this,
          o = a.val();
        (i = "function" == typeof i ? i(a.val(), void 0, t, n) : i),
          (s.mask = i),
          (s.options = n),
          (s.remove = function () {
            var e = a.getCaret();
            return (
              s.options.placeholder && t.removeAttr("placeholder"),
              t.data("mask-maxlength") && t.removeAttr("maxlength"),
              a.destroyEvents(),
              a.val(s.getCleanVal()),
              a.setCaret(e),
              t
            );
          }),
          (s.getCleanVal = function () {
            return a.getMasked(!0);
          }),
          (s.getMaskedVal = function (e) {
            return a.getMasked(!1, e);
          }),
          (s.init = function (o) {
            if (
              ((o = o || !1),
              (n = n || {}),
              (s.clearIfNotMatch = e.jMaskGlobals.clearIfNotMatch),
              (s.byPassKeys = e.jMaskGlobals.byPassKeys),
              (s.translation = e.extend(
                {},
                e.jMaskGlobals.translation,
                n.translation
              )),
              (s = e.extend(!0, {}, s, n)),
              (r = a.getRegexMask()),
              o)
            )
              a.events(), a.val(a.getMasked());
            else {
              n.placeholder && t.attr("placeholder", n.placeholder),
                t.data("mask") && t.attr("autocomplete", "off"),
                (o = 0);
              for (var l = !0; o < i.length; o++) {
                var u = s.translation[i.charAt(o)];
                if (u && u.recursive) {
                  l = !1;
                  break;
                }
              }
              l && t.attr("maxlength", i.length).data("mask-maxlength", !0),
                a.destroyEvents(),
                a.events(),
                (o = a.getCaret()),
                a.val(a.getMasked()),
                a.setCaret(o);
            }
          }),
          s.init(!t.is("input"));
      };
      e.maskWatchers = {};
      var i = function () {
          var i = e(this),
            a = {},
            r = i.attr("data-mask");
          if (
            (i.attr("data-mask-reverse") && (a.reverse = !0),
            i.attr("data-mask-clearifnotmatch") && (a.clearIfNotMatch = !0),
            "true" === i.attr("data-mask-selectonfocus") &&
              (a.selectOnFocus = !0),
            n(i, r, a))
          )
            return i.data("mask", new t(this, r, a));
        },
        n = function (t, i, n) {
          n = n || {};
          var a = e(t).data("mask"),
            r = JSON.stringify;
          t = e(t).val() || e(t).text();
          try {
            return (
              "function" == typeof i && (i = i(t)),
              "object" != typeof a || r(a.options) !== r(n) || a.mask !== i
            );
          } catch (e) {}
        },
        a = function (e) {
          var t = document.createElement("div"),
            i = (e = "on" + e) in t;
          return (
            i ||
              (t.setAttribute(e, "return;"), (i = "function" == typeof t[e])),
            i
          );
        };
      (e.fn.mask = function (i, a) {
        a = a || {};
        var r = this.selector,
          s = e.jMaskGlobals,
          o = s.watchInterval;
        s = a.watchInputs || s.watchInputs;
        var l = function () {
          if (n(this, i, a)) return e(this).data("mask", new t(this, i, a));
        };
        return (
          e(this).each(l),
          r &&
            "" !== r &&
            s &&
            (clearInterval(e.maskWatchers[r]),
            (e.maskWatchers[r] = setInterval(function () {
              e(document).find(r).each(l);
            }, o))),
          this
        );
      }),
        (e.fn.masked = function (e) {
          return this.data("mask").getMaskedVal(e);
        }),
        (e.fn.unmask = function () {
          return (
            clearInterval(e.maskWatchers[this.selector]),
            delete e.maskWatchers[this.selector],
            this.each(function () {
              var t = e(this).data("mask");
              t && t.remove().removeData("mask");
            })
          );
        }),
        (e.fn.cleanVal = function () {
          return this.data("mask").getCleanVal();
        }),
        (e.applyDataMask = function (t) {
          ((t = t || e.jMaskGlobals.maskElements) instanceof e ? t : e(t))
            .filter(e.jMaskGlobals.dataMaskAttr)
            .each(i);
        }),
        (a = {
          maskElements: "input,td,span,div",
          dataMaskAttr: "*[data-mask]",
          dataMask: !0,
          watchInterval: 300,
          watchInputs: !0,
          keyStrokeCompensation: 10,
          useInput:
            !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(
              window.navigator.userAgent
            ) && a("input"),
          watchDataMask: !1,
          byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
          translation: {
            0: { pattern: /\d/ },
            9: { pattern: /\d/, optional: !0 },
            "#": { pattern: /\d/, recursive: !0 },
            A: { pattern: /[a-zA-Z0-9]/ },
            S: { pattern: /[a-zA-Z]/ },
          },
        }),
        (e.jMaskGlobals = e.jMaskGlobals || {}),
        (a = e.jMaskGlobals = e.extend(!0, {}, a, e.jMaskGlobals)).dataMask &&
          e.applyDataMask(),
        setInterval(function () {
          e.jMaskGlobals.watchDataMask && e.applyDataMask();
        }, a.watchInterval);
    },
    window.jQuery,
    window.Zepto
  );

$("[name=phone]").each(function () {
  if ($(this).hasClass("js-footer-phone")) {
    //$(this).attr("placeholder", "+ (38) ___ - ___ - ____");
    $(this).attr("placeholder", "+38 (0__) ___ - __ - __");
    $(this).inputmask("+38 (099) 999 - 99 - 99", {
      clearMaskOnLostFocus: false,
    });
    return;
  }

  $(this).attr("placeholder", "+38 (0__) ___ - __ - __");
  $(this).inputmask("+38 (099) 999 - 99 - 99", { clearMaskOnLostFocus: false });
});

const currentLanguage = $("html").attr("lang");

const msgWarnObj = {
  uk: {
    email: "?????????????? ?????????????????? Email",
    phone: "?????????????? ?????????????? ?????????????? ???? ?????????? 8 ????????????????",
    warn: "???? ???????? ????????'????????????",
  },
  ru: {
    email: "?????????????? ???????????????????? Email",
    phone: "?????????????? ?????????????? ?????????????? ???? ?????????? 8 ????????????????",
    warn: "?????? ???????? ????????????????????????",
  },
  en: {
    email: "Enter a valid Email",
    phone: "Phone must have not less 8 symbol",
    warn: "field is required",
  },
};

function removeFormTextWarn(input) {
  input.parent().find(".field__error-msg").remove();
}

function checkNumbers(str) {
  return str.replace(/[\W_]+/g, "");
}

function removeNodeByDelay(node, delay) {
  setTimeout(() => {
    node.remove();
  }, delay);
}

function validateForm(inputs) {
  let isValid = true;
  inputs.each(function () {
    if (this.dataset.required) {
      if (
        $(this).val().replace(/\s+/g, "").length === 0 &&
        $(this).attr("name") === "name"
      ) {
        const parent = $(this).parent().parent();

        parent.addClass("warn");
        isValid = false;
      }

      if (
        $(this).attr("name") === "phone" &&
        checkNumbers(this.value).length < 12
      ) {
        const parent = $(this).parent().parent();

        parent.addClass("warn");
        isValid = false;
      }
    }
  });
  return isValid;
}

$("body").on("input", '[name="name"]', (event) => {
  let maxLen = 100;
  if (event.target.value.length > maxLen) {
    event.target.value = event.target.value.substring(0, maxLen);
  }

  let parent = $(event.target).parent().parent();

  if (event.target.value.replace(/\s+/g, "").length === 0) {
    parent.addClass("warn");
  } else {
    parent.removeClass("warn");
  }
});

$("body").on("input", '[name="phone"]', (event) => {
  let parent = $(event.target).parent().parent();

  if (checkNumbers(event.target.value).length < 12) {
    parent.addClass("warn");
  } else {
    parent.removeClass("warn");
  }
});

$("body").on("input", '[name="message"]', (event) => {
  let maxLen = 500;
  if (event.target.value.length > maxLen) {
    event.target.value = event.target.value.substring(0, maxLen);
  }
});

//Success message realize
/* let clear;

$("body").on("click", ".success-message__close", () => {
  $(".success-message").removeClass("active");
  if (clear) {
    clearTimeout(clear);
  }
}); */

$("form").on("submit", (e) => {
  e.preventDefault();
  let $form = $(e.target);
  const inputs = $form.find($("[name]"));
  const isValid = validateForm(inputs);

  if (isValid) {
    // window.location.href = "../../message";
    // sendAjaxForm("static/mail.php", $form);
    /* $(".success-message").addClass("active");
    if (clear) {
      clearTimeout(clear);
    }
    clear = setTimeout(() => {
      $(".success-message").removeClass("active");
    }, 4000); */

    sendAjaxForm("/wp-admin/admin-ajax.php", $form);
    /* ../../../../../wp-admin/admin-ajax.php */
  }
});
function sendMessageStatus(form, status) {
    let element = document.createElement('span');
    element.style.cssText = `animation: fadeIn 1s 1 ease-in-out ; 
             color:var(--white); position:absolute; 
             padding:10px 20px; 
             background:white;
             left:50%;
             font-weight:600;
             font-size: 30px;
             line-height: 30px;
             text-transform: uppercase;
             width:70%;
                top:18%;
             text-align:center;
             transform:translateX(-50%) `;
    element.innerHTML = status;
    element.classList.add('send-message');
    form.append(element);
    setTimeout(() => {
        form.querySelector('.send-message').remove();
    }, 2000);


}
function sendAjaxForm(url, selectorForm) {
  const data = new FormData(selectorForm[0]);
  data.append("action", "app");
  let processData = true;
  let contentType = "application/x-www-form-urlencoded";

  selectorForm.find("button[type=submit]").css("pointer-events", "none");

  contentType = processData = false;

  $.ajax({
    url: url, //url ???????????????? (action_ajax_form.php)
    type: "POST", //?????????? ????????????????
    processData: processData,
    contentType: contentType,
    dataType: "html", //???????????? ????????????
    data: data, // ?????????????????????? ????????????
    success: function (response) {
      //???????????? ???????????????????? ??????????????
      selectorForm.find("button[type=submit]").css("pointer-events", "initial");
      var json = JSON.parse(response);
      if (json.error === 0) {
        gtag('event', 'click', {
          'event_category': 'Phones',
          'event_action': 'click',
          'event_label': 'find_price'
        });
        setTimeout(() => {
          window.location.href = "message";
        }, 1500);
      } else {
        if(json.description != null){
           sendMessageStatus(selectorForm[0], json.description); 
        }
        else{
            sendMessageStatus(selectorForm[0], '?????????????? ??????????????????');
        }
      }
      /* $(".form__status").remove();
      $(selectorForm).append(
        `<div class="form__status">Form has been submitted success</div>`
      ); */

      /* const msg = $(selectorForm).find(".form__status"); */
      // removeNodeByDelay(msg, 5000);

      if (selectorForm[0].tagName.toLowerCase() === "form") {
        selectorForm[0].reset();
      } else {
        selectorForm.find("form")[0].reset();
      }
    },
    error: function (response) {
      // ???????????? ???? ????????????????????
      /*  $(".form__status").remove();
      $(selectorForm).append(
        `<div class="form__status">${status.error[currentLanguage]}</div>`
      ); */
      /* const msg = $(selectorForm).find(".form__status"); */

      removeNodeByDelay(msg, 5000);

      if (selectorForm[0].tagName.toLowerCase() === "form") {
        selectorForm[0].reset();
      } else {
        selectorForm.find("form")[0].reset();
      }
    },
  });
}

const preloader = document.querySelector(".js-preloader");
const preloaderPercent = preloader.querySelector(".js-preloader-percent");
const preloaderLogo = preloader.querySelector(".js-preloader-logo");

function preloaderFinish() {
  const preloaderTl = gsap.timeline({ paused: true });
  gsap.set(".preloader", { transition: "none" });
  preloaderTl
    .fromTo(
      ".preloader",
      { autoAlpha: 1 },
      {
        pointerEvents: "none",
        autoAlpha: 0,
        ease: "power4.inOut",
        duration: 1.2,
        opacity: 1,
        onStart() {
          gsap.set(".preloader__content", {
            display: "none",
          });
          gsap.set(".js-preloader", {
            pointerEvents: "none",
          });
        },
      },
      "<"
    )
    .from(
      ".header__left",
      {
        y: -50,
        duration: 0.9,
      },
      "<"
    )
    .from(
      ".header__right",
      {
        duration: 0.9,
        y: -50,
      },
      "<"
    )

    .from(
      ".swiper-slide-img img",
      {
        scale: 1.45,
        duration: 1.3,
      },
      "<"
    )

    /* .add(() => window.dispatchEvent(new Event("preloaderOff")), "<"); */
    .add(() => window.dispatchEvent(new Event("preloaderOff")), ">");

  sessionStorage.setItem("hidePreloader", true);
  return preloaderTl;
}
if (!sessionStorage.getItem("hidePreloader")) {
  const preloaderFinishTl = preloaderFinish();
  let w = 0,
    t = setInterval(function () {
      w = w + 1;
      preloaderPercent.textContent = w;
      if (w === 100) {
        clearInterval(t);
        preloaderLogo.classList.add("finish");

        setTimeout(() => {
          console.log("I play");
          preloaderFinishTl.play();
          preloader.classList.add("finish");

          setTimeout(() => {
            if (window.initMainSlider) {
              console.log("I`m alive");
              setTimeout(() => {
                window.initMainSlider();
              }, 0);
            }
            window.dispatchEvent(new Event("preloaderOff"));
          }, 1);
        }, 1000 / 60);

        w = 0;
      }
    }, 1000 / 60);
} else {
  $(".preloader").css("display", "none");
  console.log("I`m in else");

  setTimeout(() => {
    if (window.initMainSlider) {
      console.log("I`m alive");
      setTimeout(() => {
        window.initMainSlider();
      }, 0);
    }
    window.dispatchEvent(new Event("preloaderOff"));
  }, 1);
}

const pageId = document.body.getAttribute("id");

$(window)
  .on("resize", () => {
    // if(pageId === 'gallery-page') {
    //   const offsetTop = $('.page-top').outerHeight()

    //   $('.gallery').css('margin-top', offsetTop - 100 + 'px')
    // }

    if ($(window).width() <= 1100 && $(window).width() >= 525) {
      $(".js-footer__item").each((_, item) => {
        document.querySelector(".footer__item-tablet").append(item);
      });
    } else {
      $(".js-footer__item").each((_, item) => {
        document.querySelector(".footer__left").append(item);
      });
    }

    if ($(window).width() <= 480) {
      $(".js-header-phone").on("click", (e) => {
        e.preventDefault();
        stopScroll();

        $(".overlay").addClass("show");
        hideMobilePopup();
      });
    }
  })
  .resize();
