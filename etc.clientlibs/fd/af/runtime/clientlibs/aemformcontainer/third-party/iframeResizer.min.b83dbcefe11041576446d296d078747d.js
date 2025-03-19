/*
 iFrame Resizer (iframeSizer.min.js ) - v3.5.0 - 2015-10-26
  Desc: Force cross domain iframes to size to content.
  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
  Copyright: (c) 2015 David J. Bradshaw - dave@bradshaw.net
  License: MIT
*/
!(function (f) {
  function q(a, b, e) {
    "addEventListener" in f
      ? a.addEventListener(b, e, !1)
      : "attachEvent" in f && a.attachEvent("on" + b, e);
  }
  function S(a, b, e) {
    "removeEventListener" in f
      ? a.removeEventListener(b, e, !1)
      : "detachEvent" in f && a.detachEvent("on" + b, e);
  }
  function T() {
    var a,
      b = ["moz", "webkit", "o", "ms"];
    for (a = 0; a < b.length && !r; a += 1)
      r = f[b[a] + "RequestAnimationFrame"];
    r || k("setup", "RequestAnimationFrame not supported");
  }
  function U(a) {
    var b = "Host page: " + a;
    return (
      f.top !== f.self &&
        (b =
          f.parentIFrame && f.parentIFrame.getId
            ? f.parentIFrame.getId() + ": " + a
            : "Nested host page: " + a),
      b
    );
  }
  function k(a, d) {
    z("log", a, d, b[a] ? b[a].log : A);
  }
  function x(a, b) {
    z("warn", a, b, !0);
  }
  function z(a, b, e, c) {
    !0 === c &&
      "object" == typeof f.console &&
      console[a](B + "[" + U(b) + "]", e);
  }
  function V(a) {
    function d() {
      c("Height");
      c("Width");
      G(
        function () {
          H(l);
          I(g);
        },
        l,
        "init",
      );
    }
    function e() {
      var a = n.substr(F).split(":");
      return {
        iframe: b[a[0]].iframe,
        id: a[0],
        height: a[1],
        width: a[2],
        type: a[3],
      };
    }
    function c(a) {
      var c = Number(b[g]["max" + a]),
        e = Number(b[g]["min" + a]);
      a = a.toLowerCase();
      var d = Number(l[a]);
      k(g, "Checking " + a + " is in range " + e + "-" + c);
      e > d && ((d = e), k(g, "Set " + a + " to min value"));
      d > c && ((d = c), k(g, "Set " + a + " to max value"));
      l[a] = "" + d;
    }
    function W() {
      function c() {
        function a() {
          var a = 0,
            b = !1;
          for (
            k(g, "Checking connection is from allowed list of origins: " + e);
            a < e.length;
            a++
          )
            if (e[a] === d) {
              b = !0;
              break;
            }
          return b;
        }
        function c() {
          var a = b[g].remoteHost;
          return k(g, "Checking connection is from: " + a), d === a;
        }
        return e.constructor === Array ? a() : c();
      }
      var d = a.origin,
        e = b[g].checkOrigin;
      if (e && "null" != "" + d && !c())
        throw Error(
          "Unexpected message received from: " +
            d +
            " for " +
            l.iframe.id +
            ". Message was: " +
            a.data +
            ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.",
        );
      return !0;
    }
    function r() {
      var a = l.type in { true: 1, false: 1, undefined: 1 };
      return a && k(g, "Ignoring init message from meta parent page"), a;
    }
    function h(a) {
      k(
        g,
        "MessageCallback passed: {iframe: " +
          l.iframe.id +
          ", message: " +
          a +
          "}",
      );
      a = { iframe: l.iframe, message: JSON.parse(a) };
      u(g, "messageCallback", a);
      k(g, "--");
    }
    function J(a, b) {
      C(function () {
        var c = p;
        var d = document.body.getBoundingClientRect();
        var e = l.iframe.getBoundingClientRect();
        d = JSON.stringify({
          clientHeight: Math.max(
            document.documentElement.clientHeight,
            f.innerHeight || 0,
          ),
          clientWidth: Math.max(
            document.documentElement.clientWidth,
            f.innerWidth || 0,
          ),
          offsetTop: parseInt(e.top - d.top, 10),
          offsetLeft: parseInt(e.left - d.left, 10),
          scrollTop: f.pageYOffset,
          scrollLeft: f.pageXOffset,
        });
        c("Send Page Info", "pageInfo:" + d, a, b);
      }, 32);
    }
    function X() {
      function a(a, e) {
        function g() {
          b[c] ? J(b[c].iframe, c) : d();
        }
        ["scroll", "resize"].forEach(function (b) {
          k(c, a + b + " listener for sendPageInfo");
          e(f, b, g);
        });
      }
      function d() {
        a("Remove ", S);
      }
      var c = g;
      a("Add ", q);
      b[c].stopPageInfo = d;
    }
    function Y() {
      var a = !0;
      return (
        null === l.iframe &&
          (x(g, "IFrame (" + l.id + ") not found"), (a = !1)),
        a
      );
    }
    function t(a) {
      a = a.getBoundingClientRect();
      return (
        K(g),
        {
          x: Math.floor(Number(a.left) + Number(m.x)),
          y: Math.floor(Number(a.top) + Number(m.y)),
        }
      );
    }
    function v(a) {
      var b = a ? t(l.iframe) : { x: 0, y: 0 },
        c = { x: Number(l.width) + b.x, y: Number(l.height) + b.y };
      k(
        g,
        "Reposition requested from iFrame (offset x:" + b.x + " y:" + b.y + ")",
      );
      f.top !== f.self
        ? f.parentIFrame
          ? f.parentIFrame["scrollTo" + (a ? "Offset" : "")](c.x, c.y)
          : x(
              g,
              "Unable to scroll to requested position, window.parentIFrame not found",
            )
        : ((m = c), w(), k(g, "--"));
    }
    function w() {
      !1 !== u(g, "scrollCallback", m) ? I(g) : (m = null);
    }
    function y(a) {
      a = a.split("#")[1] || "";
      var b = decodeURIComponent(a);
      (b = document.getElementById(b) || document.getElementsByName(b)[0])
        ? ((b = t(b)),
          k(
            g,
            "Moving to in page link (#" + a + ") at x: " + b.x + " y: " + b.y,
          ),
          (m = { x: b.x, y: b.y }),
          w(),
          k(g, "--"))
        : f.top !== f.self
          ? f.parentIFrame
            ? f.parentIFrame.moveToAnchor(a)
            : k(
                g,
                "In page link #" +
                  a +
                  " not found and window.parentIFrame not found",
              )
          : k(g, "In page link #" + a + " not found");
    }
    function D(a) {
      var c = !0;
      return (
        b[a] ||
          ((c = !1),
          x(l.type + " No settings for " + a + ". Message was: " + n)),
        c
      );
    }
    function E() {
      for (var a in b)
        p("iFrame requested init", L(a), document.getElementById(a), a);
    }
    var n = a.data,
      l = {},
      g = null;
    if ("[iFrameResizerChild]Ready" === n) E();
    else if (B === ("" + n).substr(0, F) && n.substr(F).split(":")[0] in b) {
      if (
        ((l = e()),
        (g = l.id),
        !r() && D(g) && (k(g, "Received: " + n), Y() && W()))
      )
        switch ((b[g].firstRun && (b[g].firstRun = !1), l.type)) {
          case "close":
            M(l.iframe);
            break;
          case "message":
            h(n.substr(n.indexOf(":") + N + 6));
            break;
          case "scrollTo":
            v(!1);
            break;
          case "scrollToOffset":
            v(!0);
            break;
          case "pageInfo":
            J(b[g].iframe, g);
            X();
            break;
          case "pageInfoStop":
            b[g] &&
              b[g].stopPageInfo &&
              (b[g].stopPageInfo(), delete b[g].stopPageInfo);
            break;
          case "inPageLink":
            y(n.substr(n.indexOf(":") + N + 9));
            break;
          case "reset":
            O(l);
            break;
          case "init":
            d();
            u(g, "initCallback", l.iframe);
            u(g, "resizedCallback", l);
            break;
          default:
            d(), u(g, "resizedCallback", l);
        }
    } else z("info", g, "Ignored: " + n, b[g] ? b[g].log : A);
  }
  function u(a, d, e) {
    var c = null,
      f = null;
    if (b[a]) {
      if (((c = b[a][d]), "function" != typeof c))
        throw new TypeError(d + " on iFrame[" + a + "] is not a function");
      f = c(e);
    }
    return f;
  }
  function M(a) {
    var d = a.id;
    k(d, "Removing iFrame: " + d);
    a.parentNode.removeChild(a);
    u(d, "closedCallback", d);
    k(d, "--");
    delete b[d];
  }
  function K(a) {
    null === m &&
      ((m = {
        x:
          void 0 !== f.pageXOffset
            ? f.pageXOffset
            : document.documentElement.scrollLeft,
        y:
          void 0 !== f.pageYOffset
            ? f.pageYOffset
            : document.documentElement.scrollTop,
      }),
      k(a, "Get page position: " + m.x + "," + m.y));
  }
  function I(a) {
    null !== m &&
      (f.scrollTo(m.x, m.y),
      k(a, "Set page position: " + m.x + "," + m.y),
      (m = null));
  }
  function O(a) {
    k(
      a.id,
      "Size reset requested by " + ("init" === a.type ? "host page" : "iFrame"),
    );
    K(a.id);
    G(
      function () {
        H(a);
        p("reset", "reset", a.iframe, a.id);
      },
      a,
      "reset",
    );
  }
  function H(a) {
    function d(b) {
      a.iframe.style[b] = a[b] + "px";
      k(a.id, "IFrame (" + e + ") " + b + " set to " + a[b] + "px");
      D ||
        "0" !== a[b] ||
        ((D = !0),
        k(e, "Hidden iFrame detected, creating visibility listener"),
        Z());
    }
    var e = a.iframe.id;
    b[e] && (b[e].sizeHeight && d("height"), b[e].sizeWidth && d("width"));
  }
  function G(a, b, e) {
    e !== b.type && r ? (k(b.id, "Requesting animation frame"), r(a)) : a();
  }
  function p(a, d, e, c) {
    c = c || e.id;
    if (b[c])
      if (e && "contentWindow" in e && null !== e.contentWindow) {
        var f = b[c].targetOrigin;
        k(
          c,
          "[" +
            a +
            "] Sending msg to iframe[" +
            c +
            "] (" +
            d +
            ") targetOrigin: " +
            f,
        );
        e.contentWindow.postMessage(B + d, f);
      } else
        z(
          "info",
          c,
          "[" + a + "] IFrame(" + c + ") not found",
          b[c] ? b[c].log : A,
        ),
          b[c] && delete b[c];
  }
  function L(a) {
    return (
      a +
      ":" +
      b[a].bodyMarginV1 +
      ":" +
      b[a].sizeWidth +
      ":" +
      b[a].log +
      ":" +
      b[a].interval +
      ":" +
      b[a].enablePublicMethods +
      ":" +
      b[a].autoResize +
      ":" +
      b[a].bodyMargin +
      ":" +
      b[a].heightCalculationMethod +
      ":" +
      b[a].bodyBackground +
      ":" +
      b[a].bodyPadding +
      ":" +
      b[a].tolerance +
      ":" +
      b[a].inPageLinks +
      ":" +
      b[a].resizeFrom +
      ":" +
      b[a].widthCalculationMethod
    );
  }
  function E(a, d) {
    function e() {
      function c(c) {
        1 / 0 !== b[h][c] &&
          0 !== b[h][c] &&
          ((a.style[c] = b[h][c] + "px"),
          k(h, "Set " + c + " \x3d " + b[h][c] + "px"));
      }
      function d(a) {
        if (b[h]["min" + a] > b[h]["max" + a])
          throw Error("Value for min" + a + " can not be greater than max" + a);
      }
      d("Height");
      d("Width");
      c("maxHeight");
      c("minHeight");
      c("maxWidth");
      c("minWidth");
    }
    function c() {
      Function.prototype.bind &&
        (b[h].iframe.iFrameResizer = {
          close: M.bind(null, b[h].iframe),
          resize: p.bind(null, "Window resize", "resize", b[h].iframe),
          moveToAnchor: function (a) {
            p("Move to anchor", "inPageLink:" + a, b[h].iframe, h);
          },
          sendMessage: function (a) {
            a = JSON.stringify(a);
            p("Send Message", "message:" + a, b[h].iframe, h);
          },
        });
    }
    function f(c) {
      q(a, "load", function () {
        p("iFrame.onload", c, a);
        var d = b[h].heightCalculationMethod in aa;
        !b[h].firstRun &&
          d &&
          O({ iframe: a, height: 0, width: 0, type: "init" });
      });
      p("init", c, a);
    }
    function m(c) {
      c = c || {};
      b[h] = {
        firstRun: !0,
        iframe: a,
        remoteHost: a.src.split("/").slice(0, 3).join("/"),
      };
      if ("object" != typeof c) throw new TypeError("Options is not an object");
      for (var d in t)
        t.hasOwnProperty(d) && (b[h][d] = c.hasOwnProperty(d) ? c[d] : t[d]);
      d = b[h];
      !0 === b[h].checkOrigin
        ? ((c = b[h].remoteHost), (c = "" === c || "file://" === c ? "*" : c))
        : (c = "*");
      d.targetOrigin = c;
    }
    var h = (function (b) {
      if ("" === b) {
        var c = (d && d.id) || t.id + P++;
        b = (null !== document.getElementById(c) && (c += P++), c);
        a.id = b;
        A = (d || {}).log;
        k(b, "Added missing iframe ID: " + b + " (" + a.src + ")");
      }
      return b;
    })(a.id);
    h in b && "iFrameResizer" in a
      ? x(h, "Ignored iFrame, already setup.")
      : (m(d),
        k(
          h,
          "IFrame scrolling " +
            (b[h].scrolling ? "enabled" : "disabled") +
            " for " +
            h,
        ),
        (a.style.overflow = !1 === b[h].scrolling ? "hidden" : "auto"),
        (a.scrolling = !1 === b[h].scrolling ? "no" : "yes"),
        e(),
        ("number" == typeof b[h].bodyMargin || "0" === b[h].bodyMargin) &&
          ((b[h].bodyMarginV1 = b[h].bodyMargin),
          (b[h].bodyMargin = "" + b[h].bodyMargin + "px")),
        f(L(h)),
        c());
  }
  function C(a, b) {
    null === v &&
      (v = setTimeout(function () {
        v = null;
        a();
      }, b));
  }
  function Z() {
    function a() {
      for (var a in b)
        null === b[a].iframe.offsetParent ||
          ("0px" !== b[a].iframe.style.height &&
            "0px" !== b[a].iframe.style.width) ||
          p("Visibility change", "resize", b[a].iframe, a);
    }
    function d(b) {
      k("window", "Mutation observed: " + b[0].target + " " + b[0].type);
      C(a, 16);
    }
    function e() {
      var a = document.querySelector("body");
      new c(d).observe(a, {
        attributes: !0,
        attributeOldValue: !1,
        characterData: !0,
        characterDataOldValue: !1,
        childList: !0,
        subtree: !0,
      });
    }
    var c = f.MutationObserver || f.WebKitMutationObserver;
    c && e();
  }
  function w(a) {
    k("window", "Trigger event: " + a);
    C(function () {
      Q("Window " + a, "resize");
    }, 16);
  }
  function R() {
    function a() {
      Q("Tab Visable", "resize");
    }
    "hidden" !== document.visibilityState &&
      (k("document", "Trigger event: Visiblity change"), C(a, 16));
  }
  function Q(a, d) {
    for (var e in b)
      "parent" === b[e].resizeFrom &&
        b[e].autoResize &&
        !b[e].firstRun &&
        p(a, d, document.getElementById(e), e);
  }
  function ba() {
    q(f, "message", V);
    q(f, "resize", function () {
      w("resize");
    });
    q(document, "visibilitychange", R);
    q(document, "-webkit-visibilitychange", R);
    q(f, "focusin", function () {
      w("focus");
    });
    q(f, "focus", function () {
      w("focus");
    });
  }
  function y() {
    function a(a, c) {
      if (c) {
        if (!c.tagName)
          throw new TypeError("Object is not a valid DOM element");
        if ("IFRAME" !== c.tagName.toUpperCase())
          throw new TypeError(
            "Expected \x3cIFRAME\x3e tag, found \x3c" + c.tagName + "\x3e",
          );
        E(c, a);
        b.push(c);
      }
    }
    var b;
    return (
      T(),
      ba(),
      function (d, c) {
        switch (((b = []), typeof c)) {
          case "undefined":
          case "string":
            Array.prototype.forEach.call(
              document.querySelectorAll(c || "iframe"),
              a.bind(void 0, d),
            );
            break;
          case "object":
            a(d, c);
            break;
          default:
            throw new TypeError("Unexpected data type (" + typeof c + ")");
        }
        return b;
      }
    );
  }
  function ca(a) {
    a.fn.iFrameResize = function (a) {
      return this.filter("iframe")
        .each(function (b, c) {
          E(c, a);
        })
        .end();
    };
  }
  var P = 0,
    A = !1,
    D = !1,
    N = 7,
    B = "[iFrameSizer]",
    F = B.length,
    m = null,
    r = f.requestAnimationFrame,
    aa = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
    b = {},
    v = null,
    t = {
      autoResize: !0,
      bodyBackground: null,
      bodyMargin: null,
      bodyMarginV1: 8,
      bodyPadding: null,
      checkOrigin: !0,
      inPageLinks: !1,
      enablePublicMethods: !0,
      heightCalculationMethod: "bodyOffset",
      id: "iFrameResizer",
      interval: 32,
      log: !1,
      maxHeight: 1 / 0,
      maxWidth: 1 / 0,
      minHeight: 0,
      minWidth: 0,
      resizeFrom: "parent",
      scrolling: !1,
      sizeHeight: !0,
      sizeWidth: !1,
      tolerance: 0,
      widthCalculationMethod: "scroll",
      closedCallback: function () {},
      initCallback: function () {},
      messageCallback: function () {
        x("MessageCallback function not defined");
      },
      resizedCallback: function () {},
      scrollCallback: function () {
        return !0;
      },
    };
  f.jQuery && ca(jQuery);
  "function" == typeof define && define.amd
    ? define([], y)
    : "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = y())
      : (f.iFrameResize = f.iFrameResize || y());
})(window || {});
