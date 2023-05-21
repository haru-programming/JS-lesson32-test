const be = function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) a(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === 'childList')
        for (const o of i.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && a(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerpolicy && (i.referrerPolicy = r.referrerpolicy),
      r.crossorigin === 'use-credentials'
        ? (i.credentials = 'include')
        : r.crossorigin === 'anonymous'
        ? (i.credentials = 'omit')
        : (i.credentials = 'same-origin'),
      i
    );
  }
  function a(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = e(r);
    fetch(r.href, i);
  }
};
be();
const O = document.getElementById('js-pict-list'),
  ye = document.getElementById('js-pagination'),
  Ce = document.getElementById('js-button-previous'),
  Te = document.getElementById('js-button-next'),
  U = (n, t) => {
    const e = document.createElement(n);
    return (e.className = t), e;
  },
  De = () => {
    const n = document.createElement('img'),
      t = U('div', 'loading');
    (n.src = './img/loading-circle.gif'),
      (n.id = 'js-loading'),
      O.appendChild(t).appendChild(n);
  },
  Oe = () => {
    document.getElementById('js-loading').remove();
  },
  Me = async (n) => {
    const t = await fetch(n);
    if (!t.ok) {
      const e = `${t.status}:${t.statusText}`;
      O.appendChild(oe(e)), console.error(e);
      return;
    }
    return await t.json();
  },
  xe = async () =>
    new Promise((n) => {
      setTimeout(
        () => n(Me('https://mocki.io/v1/2db56900-1359-4d61-bd4c-d477c01b0122')),
        3e3
      );
    }),
  _e = async () => {
    De();
    try {
      const n = await xe();
      if (!n) return;
      const t = n.data;
      return (
        t.length === 0 &&
          ((O.textContent =
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'),
          console.log(
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'
          )),
        t
      );
    } catch (n) {
      console.error(n), O.appendChild(oe(n));
    } finally {
      Oe();
    }
  },
  oe = (n) => {
    const t = U('p', 'tab__error');
    return (t.textContent = n), t;
  },
  Se = (n) => {
    const t = document.createDocumentFragment();
    for (let e = 0; e < n.length; e++) {
      const a = U('li', 'slideshow__pict-item js-slideshow-item'),
        r = document.createElement('img');
      (a.dataset.index = `${e}`),
        (r.src = n[e].img),
        (r.alt = n[e].alt),
        n[e].display && a.classList.add('is-active'),
        t.appendChild(a).appendChild(r);
    }
    O.appendChild(t);
  },
  Pe = (n) => {
    const t = document.getElementById('js-pagination-list'),
      e = document.createDocumentFragment();
    for (let a = 0; a < n.length; a++) {
      const r = U('li', 'pagination__item js-pagination-item'),
        i = U('li', 'pagination__btn js-pagination-btn');
      (r.dataset.index = `${a}`),
        (i.dataset.index = `${a}`),
        n[a].display && r.classList.add('is-active'),
        e.appendChild(r).appendChild(i);
    }
    ye.insertAdjacentElement('afterbegin', t).appendChild(e);
  },
  Ee = (n) => {
    const t = document.getElementById('js-counter-all');
    (t.textContent = n.length), A(B()), q(n.length);
  },
  q = (n) => {
    const t = B(),
      e = 0,
      a = n - 1;
    (Ce.disabled = t === e), (Te.disabled = t === a);
  },
  B = () => {
    const n = O.querySelector('.is-active');
    return Number(n.dataset.index);
  },
  A = (n) => {
    const t = document.getElementById('js-counter-current');
    t.textContent = ++n;
  },
  z = (n) => {
    const t = O.querySelector('.is-active'),
      e = [...document.getElementsByClassName('js-slideshow-item')];
    t.classList.remove('is-active'), e[n].classList.add('is-active');
  },
  Z = (n) => {
    const t = document.getElementById('js-pagination-list'),
      e = [...document.getElementsByClassName('js-pagination-item')];
    t.querySelector('.is-active').classList.remove('is-active'),
      e[n].classList.add('is-active');
  },
  ke = (n) => {
    document.querySelectorAll('.js-button-arrow').forEach((e) => {
      e.addEventListener('click', (a) => {
        let r = B();
        a.currentTarget.id === 'js-button-next' ? ++r : --r,
          z(r),
          Z(r),
          A(r),
          q(n),
          ce(n);
      });
    });
  },
  We = (n) => {
    document
      .getElementById('js-pagination-list')
      .addEventListener('click', (e) => {
        if (e.currentTarget === e.target) return;
        const a = Number(e.target.dataset.index);
        z(a), Z(a), A(a), q(n), ce(n);
      });
  },
  se = { count: 0 },
  ue = (n) => {
    se.count = setInterval(() => {
      let t = B();
      t++, t === n && (t = 0), z(t), Z(t), A(t), q(n);
    }, 3e3);
  },
  ce = (n) => {
    clearInterval(se.count), ue(n);
  },
  Ne = async () => {
    const n = await _e();
    n && (Se(n), Pe(n), Ee(n), ke(n.length), We(n.length), ue(n.length));
  };
Ne();
function M(n) {
  if (n === null || n === !0 || n === !1) return NaN;
  var t = Number(n);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function m(n, t) {
  if (t.length < n)
    throw new TypeError(
      n +
        ' argument' +
        (n > 1 ? 's' : '') +
        ' required, but only ' +
        t.length +
        ' present'
    );
}
function L(n) {
  return (
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? (L = function (e) {
          return typeof e;
        })
      : (L = function (e) {
          return e &&
            typeof Symbol == 'function' &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        }),
    L(n)
  );
}
function b(n) {
  m(1, arguments);
  var t = Object.prototype.toString.call(n);
  return n instanceof Date || (L(n) === 'object' && t === '[object Date]')
    ? new Date(n.getTime())
    : typeof n == 'number' || t === '[object Number]'
    ? new Date(n)
    : ((typeof n == 'string' || t === '[object String]') &&
        typeof console != 'undefined' &&
        (console.warn(
          "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
        ),
        console.warn(new Error().stack)),
      new Date(NaN));
}
function Ue(n, t) {
  m(2, arguments);
  var e = b(n).getTime(),
    a = M(t);
  return new Date(e + a);
}
var Ie = {};
function H() {
  return Ie;
}
function K(n) {
  var t = new Date(
    Date.UTC(
      n.getFullYear(),
      n.getMonth(),
      n.getDate(),
      n.getHours(),
      n.getMinutes(),
      n.getSeconds(),
      n.getMilliseconds()
    )
  );
  return t.setUTCFullYear(n.getFullYear()), n.getTime() - t.getTime();
}
function ee(n) {
  m(1, arguments);
  var t = b(n);
  return t.setHours(0, 0, 0, 0), t;
}
var Ye = 864e5;
function Le(n, t) {
  m(2, arguments);
  var e = ee(n),
    a = ee(t),
    r = e.getTime() - K(e),
    i = a.getTime() - K(a);
  return Math.round((r - i) / Ye);
}
function $(n) {
  return (
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? ($ = function (e) {
          return typeof e;
        })
      : ($ = function (e) {
          return e &&
            typeof Symbol == 'function' &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        }),
    $(n)
  );
}
function $e(n) {
  return (
    m(1, arguments),
    n instanceof Date ||
      ($(n) === 'object' &&
        Object.prototype.toString.call(n) === '[object Date]')
  );
}
function Fe(n) {
  if ((m(1, arguments), !$e(n) && typeof n != 'number')) return !1;
  var t = b(n);
  return !isNaN(Number(t));
}
function je(n, t) {
  m(2, arguments);
  var e = M(t);
  return Ue(n, -e);
}
var qe = 864e5;
function Be(n) {
  m(1, arguments);
  var t = b(n),
    e = t.getTime();
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  var a = t.getTime(),
    r = e - a;
  return Math.floor(r / qe) + 1;
}
function F(n) {
  m(1, arguments);
  var t = 1,
    e = b(n),
    a = e.getUTCDay(),
    r = (a < t ? 7 : 0) + a - t;
  return e.setUTCDate(e.getUTCDate() - r), e.setUTCHours(0, 0, 0, 0), e;
}
function de(n) {
  m(1, arguments);
  var t = b(n),
    e = t.getUTCFullYear(),
    a = new Date(0);
  a.setUTCFullYear(e + 1, 0, 4), a.setUTCHours(0, 0, 0, 0);
  var r = F(a),
    i = new Date(0);
  i.setUTCFullYear(e, 0, 4), i.setUTCHours(0, 0, 0, 0);
  var o = F(i);
  return t.getTime() >= r.getTime()
    ? e + 1
    : t.getTime() >= o.getTime()
    ? e
    : e - 1;
}
function Ae(n) {
  m(1, arguments);
  var t = de(n),
    e = new Date(0);
  e.setUTCFullYear(t, 0, 4), e.setUTCHours(0, 0, 0, 0);
  var a = F(e);
  return a;
}
var He = 6048e5;
function Re(n) {
  m(1, arguments);
  var t = b(n),
    e = F(t).getTime() - Ae(t).getTime();
  return Math.round(e / He) + 1;
}
function j(n, t) {
  var e, a, r, i, o, s, d, c;
  m(1, arguments);
  var f = H(),
    l = M(
      (e =
        (a =
          (r =
            (i = t == null ? void 0 : t.weekStartsOn) !== null && i !== void 0
              ? i
              : t == null ||
                (o = t.locale) === null ||
                o === void 0 ||
                (s = o.options) === null ||
                s === void 0
              ? void 0
              : s.weekStartsOn) !== null && r !== void 0
            ? r
            : f.weekStartsOn) !== null && a !== void 0
          ? a
          : (d = f.locale) === null ||
            d === void 0 ||
            (c = d.options) === null ||
            c === void 0
          ? void 0
          : c.weekStartsOn) !== null && e !== void 0
        ? e
        : 0
    );
  if (!(l >= 0 && l <= 6))
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  var v = b(n),
    h = v.getUTCDay(),
    w = (h < l ? 7 : 0) + h - l;
  return v.setUTCDate(v.getUTCDate() - w), v.setUTCHours(0, 0, 0, 0), v;
}
function le(n, t) {
  var e, a, r, i, o, s, d, c;
  m(1, arguments);
  var f = b(n),
    l = f.getUTCFullYear(),
    v = H(),
    h = M(
      (e =
        (a =
          (r =
            (i = t == null ? void 0 : t.firstWeekContainsDate) !== null &&
            i !== void 0
              ? i
              : t == null ||
                (o = t.locale) === null ||
                o === void 0 ||
                (s = o.options) === null ||
                s === void 0
              ? void 0
              : s.firstWeekContainsDate) !== null && r !== void 0
            ? r
            : v.firstWeekContainsDate) !== null && a !== void 0
          ? a
          : (d = v.locale) === null ||
            d === void 0 ||
            (c = d.options) === null ||
            c === void 0
          ? void 0
          : c.firstWeekContainsDate) !== null && e !== void 0
        ? e
        : 1
    );
  if (!(h >= 1 && h <= 7))
    throw new RangeError(
      'firstWeekContainsDate must be between 1 and 7 inclusively'
    );
  var w = new Date(0);
  w.setUTCFullYear(l + 1, 0, h), w.setUTCHours(0, 0, 0, 0);
  var S = j(w, t),
    T = new Date(0);
  T.setUTCFullYear(l, 0, h), T.setUTCHours(0, 0, 0, 0);
  var P = j(T, t);
  return f.getTime() >= S.getTime()
    ? l + 1
    : f.getTime() >= P.getTime()
    ? l
    : l - 1;
}
function Qe(n, t) {
  var e, a, r, i, o, s, d, c;
  m(1, arguments);
  var f = H(),
    l = M(
      (e =
        (a =
          (r =
            (i = t == null ? void 0 : t.firstWeekContainsDate) !== null &&
            i !== void 0
              ? i
              : t == null ||
                (o = t.locale) === null ||
                o === void 0 ||
                (s = o.options) === null ||
                s === void 0
              ? void 0
              : s.firstWeekContainsDate) !== null && r !== void 0
            ? r
            : f.firstWeekContainsDate) !== null && a !== void 0
          ? a
          : (d = f.locale) === null ||
            d === void 0 ||
            (c = d.options) === null ||
            c === void 0
          ? void 0
          : c.firstWeekContainsDate) !== null && e !== void 0
        ? e
        : 1
    ),
    v = le(n, t),
    h = new Date(0);
  h.setUTCFullYear(v, 0, l), h.setUTCHours(0, 0, 0, 0);
  var w = j(h, t);
  return w;
}
var Xe = 6048e5;
function Ge(n, t) {
  m(1, arguments);
  var e = b(n),
    a = j(e, t).getTime() - Qe(e, t).getTime();
  return Math.round(a / Xe) + 1;
}
function u(n, t) {
  for (var e = n < 0 ? '-' : '', a = Math.abs(n).toString(); a.length < t; )
    a = '0' + a;
  return e + a;
}
var Ve = {
    y: function (t, e) {
      var a = t.getUTCFullYear(),
        r = a > 0 ? a : 1 - a;
      return u(e === 'yy' ? r % 100 : r, e.length);
    },
    M: function (t, e) {
      var a = t.getUTCMonth();
      return e === 'M' ? String(a + 1) : u(a + 1, 2);
    },
    d: function (t, e) {
      return u(t.getUTCDate(), e.length);
    },
    a: function (t, e) {
      var a = t.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
      switch (e) {
        case 'a':
        case 'aa':
          return a.toUpperCase();
        case 'aaa':
          return a;
        case 'aaaaa':
          return a[0];
        case 'aaaa':
        default:
          return a === 'am' ? 'a.m.' : 'p.m.';
      }
    },
    h: function (t, e) {
      return u(t.getUTCHours() % 12 || 12, e.length);
    },
    H: function (t, e) {
      return u(t.getUTCHours(), e.length);
    },
    m: function (t, e) {
      return u(t.getUTCMinutes(), e.length);
    },
    s: function (t, e) {
      return u(t.getUTCSeconds(), e.length);
    },
    S: function (t, e) {
      var a = e.length,
        r = t.getUTCMilliseconds(),
        i = Math.floor(r * Math.pow(10, a - 3));
      return u(i, e.length);
    },
  },
  C = Ve,
  _ = {
    am: 'am',
    pm: 'pm',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
  },
  Je = {
    G: function (t, e, a) {
      var r = t.getUTCFullYear() > 0 ? 1 : 0;
      switch (e) {
        case 'G':
        case 'GG':
        case 'GGG':
          return a.era(r, { width: 'abbreviated' });
        case 'GGGGG':
          return a.era(r, { width: 'narrow' });
        case 'GGGG':
        default:
          return a.era(r, { width: 'wide' });
      }
    },
    y: function (t, e, a) {
      if (e === 'yo') {
        var r = t.getUTCFullYear(),
          i = r > 0 ? r : 1 - r;
        return a.ordinalNumber(i, { unit: 'year' });
      }
      return C.y(t, e);
    },
    Y: function (t, e, a, r) {
      var i = le(t, r),
        o = i > 0 ? i : 1 - i;
      if (e === 'YY') {
        var s = o % 100;
        return u(s, 2);
      }
      return e === 'Yo' ? a.ordinalNumber(o, { unit: 'year' }) : u(o, e.length);
    },
    R: function (t, e) {
      var a = de(t);
      return u(a, e.length);
    },
    u: function (t, e) {
      var a = t.getUTCFullYear();
      return u(a, e.length);
    },
    Q: function (t, e, a) {
      var r = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (e) {
        case 'Q':
          return String(r);
        case 'QQ':
          return u(r, 2);
        case 'Qo':
          return a.ordinalNumber(r, { unit: 'quarter' });
        case 'QQQ':
          return a.quarter(r, { width: 'abbreviated', context: 'formatting' });
        case 'QQQQQ':
          return a.quarter(r, { width: 'narrow', context: 'formatting' });
        case 'QQQQ':
        default:
          return a.quarter(r, { width: 'wide', context: 'formatting' });
      }
    },
    q: function (t, e, a) {
      var r = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (e) {
        case 'q':
          return String(r);
        case 'qq':
          return u(r, 2);
        case 'qo':
          return a.ordinalNumber(r, { unit: 'quarter' });
        case 'qqq':
          return a.quarter(r, { width: 'abbreviated', context: 'standalone' });
        case 'qqqqq':
          return a.quarter(r, { width: 'narrow', context: 'standalone' });
        case 'qqqq':
        default:
          return a.quarter(r, { width: 'wide', context: 'standalone' });
      }
    },
    M: function (t, e, a) {
      var r = t.getUTCMonth();
      switch (e) {
        case 'M':
        case 'MM':
          return C.M(t, e);
        case 'Mo':
          return a.ordinalNumber(r + 1, { unit: 'month' });
        case 'MMM':
          return a.month(r, { width: 'abbreviated', context: 'formatting' });
        case 'MMMMM':
          return a.month(r, { width: 'narrow', context: 'formatting' });
        case 'MMMM':
        default:
          return a.month(r, { width: 'wide', context: 'formatting' });
      }
    },
    L: function (t, e, a) {
      var r = t.getUTCMonth();
      switch (e) {
        case 'L':
          return String(r + 1);
        case 'LL':
          return u(r + 1, 2);
        case 'Lo':
          return a.ordinalNumber(r + 1, { unit: 'month' });
        case 'LLL':
          return a.month(r, { width: 'abbreviated', context: 'standalone' });
        case 'LLLLL':
          return a.month(r, { width: 'narrow', context: 'standalone' });
        case 'LLLL':
        default:
          return a.month(r, { width: 'wide', context: 'standalone' });
      }
    },
    w: function (t, e, a, r) {
      var i = Ge(t, r);
      return e === 'wo' ? a.ordinalNumber(i, { unit: 'week' }) : u(i, e.length);
    },
    I: function (t, e, a) {
      var r = Re(t);
      return e === 'Io' ? a.ordinalNumber(r, { unit: 'week' }) : u(r, e.length);
    },
    d: function (t, e, a) {
      return e === 'do'
        ? a.ordinalNumber(t.getUTCDate(), { unit: 'date' })
        : C.d(t, e);
    },
    D: function (t, e, a) {
      var r = Be(t);
      return e === 'Do'
        ? a.ordinalNumber(r, { unit: 'dayOfYear' })
        : u(r, e.length);
    },
    E: function (t, e, a) {
      var r = t.getUTCDay();
      switch (e) {
        case 'E':
        case 'EE':
        case 'EEE':
          return a.day(r, { width: 'abbreviated', context: 'formatting' });
        case 'EEEEE':
          return a.day(r, { width: 'narrow', context: 'formatting' });
        case 'EEEEEE':
          return a.day(r, { width: 'short', context: 'formatting' });
        case 'EEEE':
        default:
          return a.day(r, { width: 'wide', context: 'formatting' });
      }
    },
    e: function (t, e, a, r) {
      var i = t.getUTCDay(),
        o = (i - r.weekStartsOn + 8) % 7 || 7;
      switch (e) {
        case 'e':
          return String(o);
        case 'ee':
          return u(o, 2);
        case 'eo':
          return a.ordinalNumber(o, { unit: 'day' });
        case 'eee':
          return a.day(i, { width: 'abbreviated', context: 'formatting' });
        case 'eeeee':
          return a.day(i, { width: 'narrow', context: 'formatting' });
        case 'eeeeee':
          return a.day(i, { width: 'short', context: 'formatting' });
        case 'eeee':
        default:
          return a.day(i, { width: 'wide', context: 'formatting' });
      }
    },
    c: function (t, e, a, r) {
      var i = t.getUTCDay(),
        o = (i - r.weekStartsOn + 8) % 7 || 7;
      switch (e) {
        case 'c':
          return String(o);
        case 'cc':
          return u(o, e.length);
        case 'co':
          return a.ordinalNumber(o, { unit: 'day' });
        case 'ccc':
          return a.day(i, { width: 'abbreviated', context: 'standalone' });
        case 'ccccc':
          return a.day(i, { width: 'narrow', context: 'standalone' });
        case 'cccccc':
          return a.day(i, { width: 'short', context: 'standalone' });
        case 'cccc':
        default:
          return a.day(i, { width: 'wide', context: 'standalone' });
      }
    },
    i: function (t, e, a) {
      var r = t.getUTCDay(),
        i = r === 0 ? 7 : r;
      switch (e) {
        case 'i':
          return String(i);
        case 'ii':
          return u(i, e.length);
        case 'io':
          return a.ordinalNumber(i, { unit: 'day' });
        case 'iii':
          return a.day(r, { width: 'abbreviated', context: 'formatting' });
        case 'iiiii':
          return a.day(r, { width: 'narrow', context: 'formatting' });
        case 'iiiiii':
          return a.day(r, { width: 'short', context: 'formatting' });
        case 'iiii':
        default:
          return a.day(r, { width: 'wide', context: 'formatting' });
      }
    },
    a: function (t, e, a) {
      var r = t.getUTCHours(),
        i = r / 12 >= 1 ? 'pm' : 'am';
      switch (e) {
        case 'a':
        case 'aa':
          return a.dayPeriod(i, {
            width: 'abbreviated',
            context: 'formatting',
          });
        case 'aaa':
          return a
            .dayPeriod(i, { width: 'abbreviated', context: 'formatting' })
            .toLowerCase();
        case 'aaaaa':
          return a.dayPeriod(i, { width: 'narrow', context: 'formatting' });
        case 'aaaa':
        default:
          return a.dayPeriod(i, { width: 'wide', context: 'formatting' });
      }
    },
    b: function (t, e, a) {
      var r = t.getUTCHours(),
        i;
      switch (
        (r === 12
          ? (i = _.noon)
          : r === 0
          ? (i = _.midnight)
          : (i = r / 12 >= 1 ? 'pm' : 'am'),
        e)
      ) {
        case 'b':
        case 'bb':
          return a.dayPeriod(i, {
            width: 'abbreviated',
            context: 'formatting',
          });
        case 'bbb':
          return a
            .dayPeriod(i, { width: 'abbreviated', context: 'formatting' })
            .toLowerCase();
        case 'bbbbb':
          return a.dayPeriod(i, { width: 'narrow', context: 'formatting' });
        case 'bbbb':
        default:
          return a.dayPeriod(i, { width: 'wide', context: 'formatting' });
      }
    },
    B: function (t, e, a) {
      var r = t.getUTCHours(),
        i;
      switch (
        (r >= 17
          ? (i = _.evening)
          : r >= 12
          ? (i = _.afternoon)
          : r >= 4
          ? (i = _.morning)
          : (i = _.night),
        e)
      ) {
        case 'B':
        case 'BB':
        case 'BBB':
          return a.dayPeriod(i, {
            width: 'abbreviated',
            context: 'formatting',
          });
        case 'BBBBB':
          return a.dayPeriod(i, { width: 'narrow', context: 'formatting' });
        case 'BBBB':
        default:
          return a.dayPeriod(i, { width: 'wide', context: 'formatting' });
      }
    },
    h: function (t, e, a) {
      if (e === 'ho') {
        var r = t.getUTCHours() % 12;
        return r === 0 && (r = 12), a.ordinalNumber(r, { unit: 'hour' });
      }
      return C.h(t, e);
    },
    H: function (t, e, a) {
      return e === 'Ho'
        ? a.ordinalNumber(t.getUTCHours(), { unit: 'hour' })
        : C.H(t, e);
    },
    K: function (t, e, a) {
      var r = t.getUTCHours() % 12;
      return e === 'Ko' ? a.ordinalNumber(r, { unit: 'hour' }) : u(r, e.length);
    },
    k: function (t, e, a) {
      var r = t.getUTCHours();
      return (
        r === 0 && (r = 24),
        e === 'ko' ? a.ordinalNumber(r, { unit: 'hour' }) : u(r, e.length)
      );
    },
    m: function (t, e, a) {
      return e === 'mo'
        ? a.ordinalNumber(t.getUTCMinutes(), { unit: 'minute' })
        : C.m(t, e);
    },
    s: function (t, e, a) {
      return e === 'so'
        ? a.ordinalNumber(t.getUTCSeconds(), { unit: 'second' })
        : C.s(t, e);
    },
    S: function (t, e) {
      return C.S(t, e);
    },
    X: function (t, e, a, r) {
      var i = r._originalDate || t,
        o = i.getTimezoneOffset();
      if (o === 0) return 'Z';
      switch (e) {
        case 'X':
          return ne(o);
        case 'XXXX':
        case 'XX':
          return D(o);
        case 'XXXXX':
        case 'XXX':
        default:
          return D(o, ':');
      }
    },
    x: function (t, e, a, r) {
      var i = r._originalDate || t,
        o = i.getTimezoneOffset();
      switch (e) {
        case 'x':
          return ne(o);
        case 'xxxx':
        case 'xx':
          return D(o);
        case 'xxxxx':
        case 'xxx':
        default:
          return D(o, ':');
      }
    },
    O: function (t, e, a, r) {
      var i = r._originalDate || t,
        o = i.getTimezoneOffset();
      switch (e) {
        case 'O':
        case 'OO':
        case 'OOO':
          return 'GMT' + te(o, ':');
        case 'OOOO':
        default:
          return 'GMT' + D(o, ':');
      }
    },
    z: function (t, e, a, r) {
      var i = r._originalDate || t,
        o = i.getTimezoneOffset();
      switch (e) {
        case 'z':
        case 'zz':
        case 'zzz':
          return 'GMT' + te(o, ':');
        case 'zzzz':
        default:
          return 'GMT' + D(o, ':');
      }
    },
    t: function (t, e, a, r) {
      var i = r._originalDate || t,
        o = Math.floor(i.getTime() / 1e3);
      return u(o, e.length);
    },
    T: function (t, e, a, r) {
      var i = r._originalDate || t,
        o = i.getTime();
      return u(o, e.length);
    },
  };
function te(n, t) {
  var e = n > 0 ? '-' : '+',
    a = Math.abs(n),
    r = Math.floor(a / 60),
    i = a % 60;
  if (i === 0) return e + String(r);
  var o = t || '';
  return e + String(r) + o + u(i, 2);
}
function ne(n, t) {
  if (n % 60 === 0) {
    var e = n > 0 ? '-' : '+';
    return e + u(Math.abs(n) / 60, 2);
  }
  return D(n, t);
}
function D(n, t) {
  var e = t || '',
    a = n > 0 ? '-' : '+',
    r = Math.abs(n),
    i = u(Math.floor(r / 60), 2),
    o = u(r % 60, 2);
  return a + i + e + o;
}
var Ke = Je,
  ae = function (t, e) {
    switch (t) {
      case 'P':
        return e.date({ width: 'short' });
      case 'PP':
        return e.date({ width: 'medium' });
      case 'PPP':
        return e.date({ width: 'long' });
      case 'PPPP':
      default:
        return e.date({ width: 'full' });
    }
  },
  me = function (t, e) {
    switch (t) {
      case 'p':
        return e.time({ width: 'short' });
      case 'pp':
        return e.time({ width: 'medium' });
      case 'ppp':
        return e.time({ width: 'long' });
      case 'pppp':
      default:
        return e.time({ width: 'full' });
    }
  },
  ze = function (t, e) {
    var a = t.match(/(P+)(p+)?/) || [],
      r = a[1],
      i = a[2];
    if (!i) return ae(t, e);
    var o;
    switch (r) {
      case 'P':
        o = e.dateTime({ width: 'short' });
        break;
      case 'PP':
        o = e.dateTime({ width: 'medium' });
        break;
      case 'PPP':
        o = e.dateTime({ width: 'long' });
        break;
      case 'PPPP':
      default:
        o = e.dateTime({ width: 'full' });
        break;
    }
    return o.replace('{{date}}', ae(r, e)).replace('{{time}}', me(i, e));
  },
  Ze = { p: me, P: ze },
  et = Ze,
  tt = ['D', 'DD'],
  nt = ['YY', 'YYYY'];
function at(n) {
  return tt.indexOf(n) !== -1;
}
function rt(n) {
  return nt.indexOf(n) !== -1;
}
function re(n, t, e) {
  if (n === 'YYYY')
    throw new RangeError(
      'Use `yyyy` instead of `YYYY` (in `'
        .concat(t, '`) for formatting years to the input `')
        .concat(
          e,
          '`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md'
        )
    );
  if (n === 'YY')
    throw new RangeError(
      'Use `yy` instead of `YY` (in `'
        .concat(t, '`) for formatting years to the input `')
        .concat(
          e,
          '`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md'
        )
    );
  if (n === 'D')
    throw new RangeError(
      'Use `d` instead of `D` (in `'
        .concat(t, '`) for formatting days of the month to the input `')
        .concat(
          e,
          '`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md'
        )
    );
  if (n === 'DD')
    throw new RangeError(
      'Use `dd` instead of `DD` (in `'
        .concat(t, '`) for formatting days of the month to the input `')
        .concat(
          e,
          '`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md'
        )
    );
}
var it = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds',
    },
    xSeconds: { one: '1 second', other: '{{count}} seconds' },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes',
    },
    xMinutes: { one: '1 minute', other: '{{count}} minutes' },
    aboutXHours: { one: 'about 1 hour', other: 'about {{count}} hours' },
    xHours: { one: '1 hour', other: '{{count}} hours' },
    xDays: { one: '1 day', other: '{{count}} days' },
    aboutXWeeks: { one: 'about 1 week', other: 'about {{count}} weeks' },
    xWeeks: { one: '1 week', other: '{{count}} weeks' },
    aboutXMonths: { one: 'about 1 month', other: 'about {{count}} months' },
    xMonths: { one: '1 month', other: '{{count}} months' },
    aboutXYears: { one: 'about 1 year', other: 'about {{count}} years' },
    xYears: { one: '1 year', other: '{{count}} years' },
    overXYears: { one: 'over 1 year', other: 'over {{count}} years' },
    almostXYears: { one: 'almost 1 year', other: 'almost {{count}} years' },
  },
  ot = function (t, e, a) {
    var r,
      i = it[t];
    return (
      typeof i == 'string'
        ? (r = i)
        : e === 1
        ? (r = i.one)
        : (r = i.other.replace('{{count}}', e.toString())),
      a != null && a.addSuffix
        ? a.comparison && a.comparison > 0
          ? 'in ' + r
          : r + ' ago'
        : r
    );
  },
  st = ot;
function J(n) {
  return function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      e = t.width ? String(t.width) : n.defaultWidth,
      a = n.formats[e] || n.formats[n.defaultWidth];
    return a;
  };
}
var ut = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy',
  },
  ct = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a',
  },
  dt = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}',
  },
  lt = {
    date: J({ formats: ut, defaultWidth: 'full' }),
    time: J({ formats: ct, defaultWidth: 'full' }),
    dateTime: J({ formats: dt, defaultWidth: 'full' }),
  },
  mt = lt,
  ft = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P',
  },
  ht = function (t, e, a, r) {
    return ft[t];
  },
  vt = ht;
function W(n) {
  return function (t, e) {
    var a = e != null && e.context ? String(e.context) : 'standalone',
      r;
    if (a === 'formatting' && n.formattingValues) {
      var i = n.defaultFormattingWidth || n.defaultWidth,
        o = e != null && e.width ? String(e.width) : i;
      r = n.formattingValues[o] || n.formattingValues[i];
    } else {
      var s = n.defaultWidth,
        d = e != null && e.width ? String(e.width) : n.defaultWidth;
      r = n.values[d] || n.values[s];
    }
    var c = n.argumentCallback ? n.argumentCallback(t) : t;
    return r[c];
  };
}
var gt = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini'],
  },
  pt = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  },
  wt = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    wide: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  bt = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
  yt = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night',
    },
  },
  Ct = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night',
    },
  },
  Tt = function (t, e) {
    var a = Number(t),
      r = a % 100;
    if (r > 20 || r < 10)
      switch (r % 10) {
        case 1:
          return a + 'st';
        case 2:
          return a + 'nd';
        case 3:
          return a + 'rd';
      }
    return a + 'th';
  },
  Dt = {
    ordinalNumber: Tt,
    era: W({ values: gt, defaultWidth: 'wide' }),
    quarter: W({
      values: pt,
      defaultWidth: 'wide',
      argumentCallback: function (t) {
        return t - 1;
      },
    }),
    month: W({ values: wt, defaultWidth: 'wide' }),
    day: W({ values: bt, defaultWidth: 'wide' }),
    dayPeriod: W({
      values: yt,
      defaultWidth: 'wide',
      formattingValues: Ct,
      defaultFormattingWidth: 'wide',
    }),
  },
  Ot = Dt;
function N(n) {
  return function (t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      a = e.width,
      r = (a && n.matchPatterns[a]) || n.matchPatterns[n.defaultMatchWidth],
      i = t.match(r);
    if (!i) return null;
    var o = i[0],
      s = (a && n.parsePatterns[a]) || n.parsePatterns[n.defaultParseWidth],
      d = Array.isArray(s)
        ? xt(s, function (l) {
            return l.test(o);
          })
        : Mt(s, function (l) {
            return l.test(o);
          }),
      c;
    (c = n.valueCallback ? n.valueCallback(d) : d),
      (c = e.valueCallback ? e.valueCallback(c) : c);
    var f = t.slice(o.length);
    return { value: c, rest: f };
  };
}
function Mt(n, t) {
  for (var e in n) if (n.hasOwnProperty(e) && t(n[e])) return e;
}
function xt(n, t) {
  for (var e = 0; e < n.length; e++) if (t(n[e])) return e;
}
function _t(n) {
  return function (t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      a = t.match(n.matchPattern);
    if (!a) return null;
    var r = a[0],
      i = t.match(n.parsePattern);
    if (!i) return null;
    var o = n.valueCallback ? n.valueCallback(i[0]) : i[0];
    o = e.valueCallback ? e.valueCallback(o) : o;
    var s = t.slice(r.length);
    return { value: o, rest: s };
  };
}
var St = /^(\d+)(th|st|nd|rd)?/i,
  Pt = /\d+/i,
  Et = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  kt = { any: [/^b/i, /^(a|c)/i] },
  Wt = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  Nt = { any: [/1/i, /2/i, /3/i, /4/i] },
  Ut = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  It = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  Yt = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  Lt = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  $t = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  Ft = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  jt = {
    ordinalNumber: _t({
      matchPattern: St,
      parsePattern: Pt,
      valueCallback: function (t) {
        return parseInt(t, 10);
      },
    }),
    era: N({
      matchPatterns: Et,
      defaultMatchWidth: 'wide',
      parsePatterns: kt,
      defaultParseWidth: 'any',
    }),
    quarter: N({
      matchPatterns: Wt,
      defaultMatchWidth: 'wide',
      parsePatterns: Nt,
      defaultParseWidth: 'any',
      valueCallback: function (t) {
        return t + 1;
      },
    }),
    month: N({
      matchPatterns: Ut,
      defaultMatchWidth: 'wide',
      parsePatterns: It,
      defaultParseWidth: 'any',
    }),
    day: N({
      matchPatterns: Yt,
      defaultMatchWidth: 'wide',
      parsePatterns: Lt,
      defaultParseWidth: 'any',
    }),
    dayPeriod: N({
      matchPatterns: $t,
      defaultMatchWidth: 'any',
      parsePatterns: Ft,
      defaultParseWidth: 'any',
    }),
  },
  qt = jt,
  Bt = {
    code: 'en-US',
    formatDistance: st,
    formatLong: mt,
    formatRelative: vt,
    localize: Ot,
    match: qt,
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  },
  At = Bt,
  Ht = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  Rt = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  Qt = /^'([^]*?)'?$/,
  Xt = /''/g,
  Gt = /[a-zA-Z]/;
function ie(n, t, e) {
  var a, r, i, o, s, d, c, f, l, v, h, w, S, T, P, R, Q, X;
  m(2, arguments);
  var he = String(t),
    E = H(),
    k =
      (a =
        (r = e == null ? void 0 : e.locale) !== null && r !== void 0
          ? r
          : E.locale) !== null && a !== void 0
        ? a
        : At,
    G = M(
      (i =
        (o =
          (s =
            (d = e == null ? void 0 : e.firstWeekContainsDate) !== null &&
            d !== void 0
              ? d
              : e == null ||
                (c = e.locale) === null ||
                c === void 0 ||
                (f = c.options) === null ||
                f === void 0
              ? void 0
              : f.firstWeekContainsDate) !== null && s !== void 0
            ? s
            : E.firstWeekContainsDate) !== null && o !== void 0
          ? o
          : (l = E.locale) === null ||
            l === void 0 ||
            (v = l.options) === null ||
            v === void 0
          ? void 0
          : v.firstWeekContainsDate) !== null && i !== void 0
        ? i
        : 1
    );
  if (!(G >= 1 && G <= 7))
    throw new RangeError(
      'firstWeekContainsDate must be between 1 and 7 inclusively'
    );
  var V = M(
    (h =
      (w =
        (S =
          (T = e == null ? void 0 : e.weekStartsOn) !== null && T !== void 0
            ? T
            : e == null ||
              (P = e.locale) === null ||
              P === void 0 ||
              (R = P.options) === null ||
              R === void 0
            ? void 0
            : R.weekStartsOn) !== null && S !== void 0
          ? S
          : E.weekStartsOn) !== null && w !== void 0
        ? w
        : (Q = E.locale) === null ||
          Q === void 0 ||
          (X = Q.options) === null ||
          X === void 0
        ? void 0
        : X.weekStartsOn) !== null && h !== void 0
      ? h
      : 0
  );
  if (!(V >= 0 && V <= 6))
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  if (!k.localize)
    throw new RangeError('locale must contain localize property');
  if (!k.formatLong)
    throw new RangeError('locale must contain formatLong property');
  var I = b(n);
  if (!Fe(I)) throw new RangeError('Invalid time value');
  var ve = K(I),
    ge = je(I, ve),
    pe = {
      firstWeekContainsDate: G,
      weekStartsOn: V,
      locale: k,
      _originalDate: I,
    },
    we = he
      .match(Rt)
      .map(function (p) {
        var y = p[0];
        if (y === 'p' || y === 'P') {
          var Y = et[y];
          return Y(p, k.formatLong);
        }
        return p;
      })
      .join('')
      .match(Ht)
      .map(function (p) {
        if (p === "''") return "'";
        var y = p[0];
        if (y === "'") return Vt(p);
        var Y = Ke[y];
        if (Y)
          return (
            !(e != null && e.useAdditionalWeekYearTokens) &&
              rt(p) &&
              re(p, t, String(n)),
            !(e != null && e.useAdditionalDayOfYearTokens) &&
              at(p) &&
              re(p, t, String(n)),
            Y(ge, p, k.localize, pe)
          );
        if (y.match(Gt))
          throw new RangeError(
            'Format string contains an unescaped latin alphabet character `' +
              y +
              '`'
          );
        return p;
      })
      .join('');
  return we;
}
function Vt(n) {
  var t = n.match(Qt);
  return t ? t[1].replace(Xt, "'") : n;
}
const x = document.getElementById('js-tabNav'),
  g = (n, t) => {
    const e = document.createElement(n);
    return (e.className = t), e;
  },
  Jt = async (n) => {
    const t = await fetch(n);
    if (!t.ok) {
      const e = `${t.status}:${t.statusText}`;
      x.appendChild(fe(e)), console.error(e);
      return;
    }
    return await t.json();
  },
  Kt = async () => {
    try {
      const n = await Jt(
        'https://mocki.io/v1/c437e37c-8c23-4255-abf1-fe6892bbeea9'
      );
      if (!n) return;
      const t = n.data;
      return (
        t.length === 0 &&
          ((x.textContent =
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'),
          console.log(
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'
          )),
        t
      );
    } catch (n) {
      console.error(n), x.appendChild(fe(n));
    }
  },
  fe = (n) => {
    const t = g('p', 'tab__error');
    return (t.textContent = n), t;
  },
  zt = (n) => {
    const t = ie(new Date(), 'yyyy,MM,dd'),
      e = ie(new Date(n), 'yyyy,MM,dd');
    return Le(new Date(t), new Date(e)) <= 3;
  },
  Zt = (n) => {
    const t = document.createDocumentFragment();
    for (let e = 0; e < n.length; e++) {
      const a = g('li', 'tab__nav-item'),
        r = g('button', 'tab__nav-button js-tabNavButton');
      (a.id = `js-tabNavItem${e + 1}`),
        (r.dataset.index = `${e}`),
        (r.textContent = n[e].category),
        n[e].display && r.classList.add('is-active'),
        t.appendChild(a).appendChild(r);
    }
    x.appendChild(t);
    for (let e = 0; e < n.length; e++)
      document
        .getElementsByClassName('js-tabNavButton')
        [e].addEventListener('click', en);
  },
  en = (n) => {
    const t = document.getElementsByClassName('js-tabContents'),
      e = x.querySelector('.is-active'),
      a = n.target.dataset.index;
    e.classList.remove('is-active'),
      t[e.dataset.index].classList.remove('is-active'),
      n.target.classList.add('is-active'),
      t[a].classList.add('is-active');
  },
  tn = () => {
    const n = g('div', 'tab');
    (n.id = 'js-tab'), n.appendChild(x.parentNode.replaceChild(n, x));
  },
  nn = (n) => {
    const t = document.createDocumentFragment(),
      e = n.map((i) => i.title),
      a = n.map((i) => i.comments),
      r = n.map((i) => i.date);
    for (let i = 0; i < e.length; i++) {
      const o = g('li', 'tab__contents-item'),
        s = g('a', 'tab__contents-link'),
        d = a[i].length;
      if (
        ((s.href = '#'),
        (s.textContent = e[i]),
        t.appendChild(o).appendChild(s),
        d > 0)
      ) {
        const c = an(a[i]);
        o.appendChild(c);
      }
      zt(r[i]) && o.insertAdjacentElement('beforeend', rn());
    }
    return t;
  },
  an = (n) => {
    const t = document.createDocumentFragment(),
      e = g('div', 'tab__contents-icon'),
      a = document.createElement('img'),
      r = g('div', 'tab__contents-info');
    return (
      (a.src = './img/icon-comment.svg'),
      (r.textContent = `${n.length}\u4EF6`),
      e.appendChild(a),
      t.appendChild(e).insertAdjacentElement('afterend', r),
      t
    );
  },
  rn = () => {
    const n = g('div', 'tab__contents-new'),
      t = document.createElement('img');
    return (t.src = './img/icon-new.svg'), n.appendChild(t), n;
  },
  on = (n) => {
    const t = n.map((a) => a.articles),
      e = document.getElementById('js-tab');
    for (let a = 0; a < t.length; a++) {
      const r = g('div', 'tab__contents js-tabContents'),
        i = g('div', 'tab__contents-inner'),
        o = g('ul', 'tab__contents-list');
      n[a].display && r.classList.add('is-active');
      const s = nn(t[a]),
        d = sn(n[a]);
      e.appendChild(r).appendChild(i).appendChild(o).appendChild(s),
        i.appendChild(d);
    }
  },
  sn = (n) => {
    const t = document.createDocumentFragment(),
      e = g('div', 'tab__img-wrapper'),
      a = g('img', 'tab__img');
    return (a.src = `${n.img}`), t.appendChild(e).appendChild(a), t;
  },
  un = async () => {
    const n = await Kt();
    n && (Zt(n), on(n));
  };
tn();
un();
