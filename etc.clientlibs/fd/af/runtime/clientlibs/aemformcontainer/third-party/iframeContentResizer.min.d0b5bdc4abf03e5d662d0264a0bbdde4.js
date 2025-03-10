/*
 iFrame Resizer (iframeSizer.contentWindow.min.js) - v3.5.0 - 2015-10-26
  Desc: Include this file in any page being loaded into an iframe
        to force the iframe to resize to the content size.
  Requires: iframeResizer.min.js on host page.
  Copyright: (c) 2015 David J. Bradshaw - dave@bradshaw.net
  License: MIT
*/
!(function (e) {
  function D(a, b, c) {
    "addEventListener" in e
      ? a.addEventListener(b, c, !1)
      : "attachEvent" in e && a.attachEvent("on" + b, c);
  }
  function Z(a, b, c) {
    "removeEventListener" in e
      ? a.removeEventListener(b, c, !1)
      : "detachEvent" in e && a.detachEvent("on" + b, c);
  }
  function aa(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }
  function c(a) {
    K && "object" == typeof e.console && console.log(x + "[" + y + "] " + a);
  }
  function v(a) {
    "object" == typeof e.console && console.warn(x + "[" + y + "] " + a);
  }
  function ya() {
    var a = ba.substr(ca).split(":");
    y = a[0];
    L = void 0 !== a[1] ? Number(a[1]) : L;
    E = void 0 !== a[2] ? ("true" === a[2] ? !0 : !1) : E;
    K = void 0 !== a[3] ? ("true" === a[3] ? !0 : !1) : K;
    u = void 0 !== a[4] ? Number(a[4]) : u;
    n = void 0 !== a[6] ? ("true" === a[6] ? !0 : !1) : n;
    F = a[7];
    g = void 0 !== a[8] ? a[8] : g;
    da = a[9];
    ea = a[10];
    G = void 0 !== a[11] ? Number(a[11]) : G;
    z.enable = void 0 !== a[12] ? ("true" === a[12] ? !0 : !1) : !1;
    M = void 0 !== a[13] ? a[13] : M;
    l = void 0 !== a[14] ? a[14] : l;
  }
  function za() {
    if ("iFrameResizer" in e && Object === e.iFrameResizer.constructor) {
      var a = e.iFrameResizer;
      c("Reading data from page: " + JSON.stringify(a));
      N = "messageCallback" in a ? a.messageCallback : N;
      O = "readyCallback" in a ? a.readyCallback : O;
      A = "targetOrigin" in a ? a.targetOrigin : A;
      g = "heightCalculationMethod" in a ? a.heightCalculationMethod : g;
      l = "widthCalculationMethod" in a ? a.widthCalculationMethod : l;
    }
    c("TargetOrigin for parent set to: " + A);
  }
  function P(a, b) {
    void 0 !== b &&
      "" !== b &&
      "null" !== b &&
      ((document.body.style[a] = b), c("Body " + a + ' set to "' + b + '"'));
  }
  function Aa() {
    void 0 === F && (F = L + "px");
    var a = F;
    var b =
      (-1 !== a.indexOf("-") &&
        (v("Negative CSS value ignored for margin"), (a = "")),
      a);
    P("margin", b);
  }
  function d(a) {
    function b() {
      q(a.eventName, a.eventType);
    }
    var f = {
      add: function (a) {
        D(e, a, b);
      },
      remove: function (a) {
        Z(e, a, b);
      },
    };
    a.eventNames && Array.prototype.map
      ? ((a.eventName = a.eventNames[0]), a.eventNames.map(f[a.method]))
      : f[a.method](a.eventName);
    c(aa(a.method) + " event listener: " + a.eventType);
  }
  function fa(a) {
    d({
      method: a,
      eventType: "Animation Start",
      eventNames: ["animationstart", "webkitAnimationStart"],
    });
    d({
      method: a,
      eventType: "Animation Iteration",
      eventNames: ["animationiteration", "webkitAnimationIteration"],
    });
    d({
      method: a,
      eventType: "Animation End",
      eventNames: ["animationend", "webkitAnimationEnd"],
    });
    d({ method: a, eventType: "Input", eventName: "input" });
    d({ method: a, eventType: "Mouse Up", eventName: "mouseup" });
    d({ method: a, eventType: "Mouse Down", eventName: "mousedown" });
    d({
      method: a,
      eventType: "Orientation Change",
      eventName: "orientationchange",
    });
    d({ method: a, eventType: "Touch Start", eventName: "touchstart" });
    d({ method: a, eventType: "Touch End", eventName: "touchend" });
    d({ method: a, eventType: "Touch Cancel", eventName: "touchcancel" });
    d({
      method: a,
      eventType: "Print",
      eventName: ["afterprint", "beforeprint"],
    });
    d({
      method: a,
      eventType: "Transition Start",
      eventNames: [
        "transitionstart",
        "webkitTransitionStart",
        "MSTransitionStart",
        "oTransitionStart",
        "otransitionstart",
      ],
    });
    d({
      method: a,
      eventType: "Transition Iteration",
      eventNames: [
        "transitioniteration",
        "webkitTransitionIteration",
        "MSTransitionIteration",
        "oTransitionIteration",
        "otransitioniteration",
      ],
    });
    d({
      method: a,
      eventType: "Transition End",
      eventNames: [
        "transitionend",
        "webkitTransitionEnd",
        "MSTransitionEnd",
        "oTransitionEnd",
        "otransitionend",
      ],
    });
    "child" === M &&
      d({ method: a, eventType: "IFrame Resized", eventName: "resize" });
  }
  function Q(a, b, f, k) {
    return (
      b !== a &&
        (a in f ||
          (v(a + " is not a valid option for " + k + "CalculationMethod."),
          (a = b)),
        c(k + ' calculation method set to "' + a + '"')),
      a
    );
  }
  function ha() {
    g = Q(g, R, r, "height");
  }
  function ia() {
    if (!0 === n) {
      fa("add");
      var a = 0 > u;
      e.MutationObserver || e.WebKitMutationObserver
        ? a
          ? ja()
          : (S = Ba())
        : (c("MutationObserver not supported in this browser!"), ja());
    } else c("Auto Resize disabled");
  }
  function ka() {
    fa("remove");
    null !== S && S.disconnect();
    clearInterval(la);
  }
  function Ca() {
    var a = document.createElement("div");
    a.style.clear = "both";
    a.style.display = "block";
    document.body.appendChild(a);
  }
  function Da() {
    function a(a) {
      a = a.split("#")[1] || a;
      var b = decodeURIComponent(a);
      b = document.getElementById(b) || document.getElementsByName(b)[0];
      if (void 0 !== b) {
        var f = b.getBoundingClientRect();
        b =
          void 0 !== e.pageXOffset
            ? e.pageXOffset
            : document.documentElement.scrollLeft;
        var k =
          void 0 !== e.pageYOffset
            ? e.pageYOffset
            : document.documentElement.scrollTop;
        b = parseInt(f.left, 10) + parseInt(b, 10);
        f = parseInt(f.top, 10) + parseInt(k, 10);
        c("Moving to in page link (#" + a + ") at x: " + b + " y: " + f);
        m(f, b, "scrollToOffset");
      } else
        c(
          "In page link (#" + a + ") not found in iFrame, so sending to parent"
        ),
          m(0, 0, "inPageLink", "#" + a);
    }
    function b() {
      "" !== location.hash && "#" !== location.hash && a(location.href);
    }
    function f() {
      Array.prototype.forEach.call(
        document.querySelectorAll('a[href^\x3d"#"]'),
        function (b) {
          function c(b) {
            b.preventDefault();
            a(this.getAttribute("href"));
          }
          "#" !== b.getAttribute("href") && D(b, "click", c);
        }
      );
    }
    z.enable
      ? Array.prototype.forEach && document.querySelectorAll
        ? (c("Setting up location.hash handlers"),
          f(),
          D(e, "hashchange", b),
          setTimeout(b, U))
        : v(
            "In page linking not fully supported in this browser! (See README.md for IE8 workaround)"
          )
      : c("In page linking not enabled");
    return { findTarget: a };
  }
  function Ea() {
    c("Enable public methods");
    Fa.parentIFrame = {
      autoResize: function (a) {
        return (
          !0 === a && !1 === n
            ? ((n = !0), ia())
            : !1 === a && !0 === n && ((n = !1), ka()),
          n
        );
      },
      close: function () {
        m(0, 0, "close");
        c("Disable outgoing messages");
        ma = !1;
        c("Remove event listener: Message");
        Z(e, "message", na);
        !0 === n && ka();
      },
      getId: function () {
        return y;
      },
      getPageInfo: function (a) {
        "function" == typeof a
          ? ((V = a), m(0, 0, "pageInfo"))
          : ((V = a), m(0, 0, "pageInfoStop"));
      },
      moveToAnchor: function (a) {
        z.findTarget(a);
      },
      reset: function () {
        oa("parentIFrame.reset");
      },
      scrollTo: function (a, b) {
        m(b, a, "scrollTo");
      },
      scrollToOffset: function (a, b) {
        m(b, a, "scrollToOffset");
      },
      sendMessage: function (a, b) {
        m(0, 0, "message", JSON.stringify(a), b);
      },
      setHeightCalculationMethod: function (a) {
        g = a;
        ha();
      },
      setWidthCalculationMethod: function (a) {
        l = a;
        l = Q(l, W, t, "width");
      },
      setTargetOrigin: function (a) {
        c("Set targetOrigin: " + a);
        A = a;
      },
      size: function (a, b) {
        q(
          "size",
          "parentIFrame.size(" + ("" + (a ? a : "") + (b ? "," + b : "")) + ")",
          a,
          b
        );
      },
    };
  }
  function ja() {
    0 !== u &&
      (c("setInterval: " + u + "ms"),
      (la = setInterval(function () {
        q("interval", "setInterval: " + u);
      }, Math.abs(u))));
  }
  function Ba() {
    function a(a) {
      function b(a) {
        !1 === a.complete &&
          (c("Attach listeners to " + a.src),
          a.addEventListener("load", f, !1),
          a.addEventListener("error", k, !1),
          h.push(a));
      }
      "attributes" === a.type && "src" === a.attributeName
        ? b(a.target)
        : "childList" === a.type &&
          Array.prototype.forEach.call(a.target.querySelectorAll("img"), b);
    }
    function b(a) {
      c("Remove listeners from " + a.src);
      a.removeEventListener("load", f, !1);
      a.removeEventListener("error", k, !1);
      h.splice(h.indexOf(a), 1);
    }
    function f(a) {
      b(a.target);
      q("imageLoad", "Image loaded: " + a.target.src, void 0, void 0);
    }
    function k(a) {
      b(a.target);
      q(
        "imageLoadFailed",
        "Image load failed: " + a.target.src,
        void 0,
        void 0
      );
    }
    function T(b) {
      q(
        "mutationObserver",
        "mutationObserver: " + b[0].target + " " + b[0].type
      );
      b.forEach(a);
    }
    var h = [],
      d = e.MutationObserver || e.WebKitMutationObserver,
      p = (function () {
        var a = document.querySelector("body");
        return (
          (p = new d(T)),
          c("Create body MutationObserver"),
          p.observe(a, {
            attributes: !0,
            attributeOldValue: !1,
            characterData: !0,
            characterDataOldValue: !1,
            childList: !0,
            subtree: !0,
          }),
          p
        );
      })();
    return {
      disconnect: function () {
        "disconnect" in p &&
          (c("Disconnect body MutationObserver"), p.disconnect(), h.forEach(b));
      },
    };
  }
  function X(a) {
    var b = document.body;
    if ("defaultView" in document && "getComputedStyle" in document.defaultView)
      (b = document.defaultView.getComputedStyle(b, null)),
        (b = null !== b ? b[a] : 0);
    else if (((a = b.currentStyle[a]), /^\d+(px)?$/i.test(a)))
      b = parseInt(a, pa);
    else {
      var c = b.style.left,
        k = b.runtimeStyle.left;
      b =
        ((b.runtimeStyle.left = b.currentStyle.left),
        (b.style.left = a || 0),
        (a = b.style.pixelLeft),
        (b.style.left = c),
        (b.runtimeStyle.left = k),
        a);
    }
    return parseInt(b, pa);
  }
  function Y(a, b) {
    for (var f = b.length, k, e = 0, h = aa(a), d = H(), p = 0; f > p; p++)
      (k = b[p].getBoundingClientRect()[a] + X("margin" + h)), k > e && (e = k);
    d = H() - d;
    c("Parsed " + f + " HTML elements");
    c("Element position calculated in " + d + "ms");
    d > B / 2 && ((B = 2 * d), c("Event throttle increased to " + B + "ms"));
    return e;
  }
  function I(a) {
    return [
      a.bodyOffset(),
      a.bodyScroll(),
      a.documentElementOffset(),
      a.documentElementScroll(),
    ];
  }
  function qa(a, b) {
    var c = document.querySelectorAll("[" + b + "]");
    return 0 === c.length
      ? (v("No tagged elements (" + b + ") found on page"), w)
      : Y(a, c);
  }
  function q(a, b, f, e) {
    J && a in Ga
      ? c("Trigger event cancelled: " + a)
      : (a in { reset: 1, resetPage: 1, init: 1 } || c("Trigger event: " + b),
        Ha(a, b, f, e));
  }
  function ra() {
    J || ((J = !0), c("Trigger event lock on"));
    clearTimeout(sa);
    sa = setTimeout(function () {
      J = !1;
      c("Trigger event lock off");
      c("--");
    }, U);
  }
  function ta(a) {
    w = r[g]();
    C = t[l]();
    m(w, C, a);
  }
  function oa(a) {
    var b = g;
    g = R;
    c("Reset trigger event: " + a);
    ra();
    ta("reset");
    g = b;
  }
  function m(a, b, f, e, d) {
    !0 === ma &&
      (void 0 === d ? (d = A) : c("Message targetOrigin: " + d),
      (a = y + ":" + (a + ":" + b) + ":" + f + (void 0 !== e ? ":" + e : "")),
      c("Sending message to host page (" + a + ")"),
      ua.postMessage(x + a, d));
  }
  function na(a) {
    function b() {
      ba = a.data;
      ua = a.source;
      ya();
      c("Initialising iFrame (" + location.href + ")");
      za();
      Aa();
      P("background", da);
      P("padding", ea);
      Ca();
      ha();
      l = Q(l, W, t, "width");
      document.documentElement.style.height = "";
      document.body.style.height = "";
      c('HTML \x26 body height set to "auto"');
      Ea();
      ia();
      z = Da();
      q("init", "Init message from host page");
      O();
      va = !1;
      setTimeout(function () {
        wa = !1;
      }, U);
    }
    function f() {
      var a = d();
      z.findTarget(a);
    }
    function d() {
      return a.data.substr(a.data.indexOf(":") + 1);
    }
    function T() {
      var a = d();
      c("MessageCallback called from parent: " + a);
      N(JSON.parse(a));
      c(" --");
    }
    function h() {
      var a = d();
      c("PageInfoFromParent called from parent: " + a);
      V(JSON.parse(a));
      c(" --");
    }
    function g() {
      return a.data.split(":")[2] in { true: 1, false: 1 };
    }
    if (x === ("" + a.data).substr(0, ca))
      if (!1 === va)
        switch (a.data.split("]")[1].split(":")[0]) {
          case "reset":
            wa
              ? c("Page reset ignored by init")
              : (c("Page size reset by host page"), ta("resetPage"));
            break;
          case "resize":
            q("resizeParent", "Parent window requested size check");
            break;
          case "moveToAnchor":
            f();
            break;
          case "message":
            T();
            break;
          case "pageInfo":
            h();
            break;
          default:
            "iFrameResize" in e ||
              g() ||
              v("Unexpected message (" + a.data + ")");
        }
      else
        g()
          ? b()
          : c(
              'Ignored message of type "' +
                a.data.split("]")[1].split(":")[0] +
                '". Received before initialization.'
            );
  }
  var n = !0,
    pa = 10,
    da = "",
    L = 0,
    F = "",
    S = null,
    ea = "",
    E = !1,
    Ga = { resize: 1, click: 1 },
    U = 128,
    va = !0,
    w = 1,
    R = "bodyOffset",
    g = R,
    wa = !0,
    ba = "",
    z = {},
    u = 32,
    la = null,
    K = !1,
    x = "[iFrameSizer]",
    ca = x.length,
    y = "",
    xa = { max: 1, min: 1, bodyScroll: 1, documentElementScroll: 1 },
    M = "child",
    ma = !0,
    ua = e.parent,
    A = "*",
    G = 0,
    J = !1,
    sa = null,
    B = 16,
    C = 1,
    W = "scroll",
    l = W,
    Fa = e,
    N = function () {
      v("MessageCallback function not defined");
    },
    O = function () {},
    V = function () {},
    H =
      Date.now ||
      function () {
        return new Date().getTime();
      },
    r = {
      bodyOffset: function () {
        return document.body.offsetHeight + X("marginTop") + X("marginBottom");
      },
      offset: function () {
        return r.bodyOffset();
      },
      bodyScroll: function () {
        return document.body.scrollHeight;
      },
      documentElementOffset: function () {
        return document.documentElement.offsetHeight;
      },
      documentElementScroll: function () {
        return document.documentElement.scrollHeight;
      },
      max: function () {
        return Math.max.apply(null, I(r));
      },
      min: function () {
        return Math.min.apply(null, I(r));
      },
      grow: function () {
        return r.max();
      },
      lowestElement: function () {
        return Math.max(
          r.bodyOffset(),
          Y("bottom", document.querySelectorAll("body *"))
        );
      },
      taggedElement: function () {
        return qa("bottom", "data-iframe-height");
      },
    },
    t = {
      bodyScroll: function () {
        return document.body.scrollWidth;
      },
      bodyOffset: function () {
        return document.body.offsetWidth;
      },
      documentElementScroll: function () {
        return document.documentElement.scrollWidth;
      },
      documentElementOffset: function () {
        return document.documentElement.offsetWidth;
      },
      scroll: function () {
        return Math.max(t.bodyScroll(), t.documentElementScroll());
      },
      max: function () {
        return Math.max.apply(null, I(t));
      },
      min: function () {
        return Math.min.apply(null, I(t));
      },
      rightMostElement: function () {
        return Y("right", document.querySelectorAll("body *"));
      },
      taggedElement: function () {
        return qa("right", "data-iframe-width");
      },
    },
    Ha = (function (a) {
      var b,
        c,
        e,
        d = null,
        h = 0,
        g = function () {
          h = H();
          d = null;
          e = a.apply(b, c);
          d || (b = c = null);
        };
      return function () {
        var f = H();
        h || (h = f);
        var k = B - (f - h);
        return (
          (b = this),
          (c = arguments),
          0 >= k || k > B
            ? (d && (clearTimeout(d), (d = null)),
              (h = f),
              (e = a.apply(b, c)),
              d || (b = c = null))
            : d || (d = setTimeout(g, k)),
          e
        );
      };
    })(function (a, b, d, e) {
      var f, h;
      ((f = void 0 !== d ? d : r[g]()),
      (h = void 0 !== e ? e : t[l]()),
      Math.abs(w - f) <= G && (!E || Math.abs(C - h) <= G)) && "init" !== a
        ? a in { init: 1, interval: 1, size: 1 } || !(g in xa || (E && l in xa))
          ? a in { interval: 1 } || c("No change in size detected")
          : oa(b)
        : (ra(), (w = f), (C = h), m(w, C, a));
    });
  D(e, "message", na);
  "loading" !== document.readyState &&
    e.parent.postMessage("[iFrameResizerChild]Ready", "*");
})(window || {});
