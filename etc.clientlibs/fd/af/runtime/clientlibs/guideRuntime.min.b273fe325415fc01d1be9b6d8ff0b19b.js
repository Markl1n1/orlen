/*
 jQuery Mobile 1.4.1
 Git HEAD hash: 18c1e32bfc4e0e92756dedc105d799131607f5bb <> Date: Wed Feb 12 2014 22:15:20 UTC
 http://jquerymobile.com

 Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
 Released under the MIT license.
 http://jquery.org/license

 code snippet for just swipe-right and swipe-left
*/
(function (d) {
  d.uaMatch = function (a) {
    a = a.toLowerCase();
    a =
      /(chrome)[ \/]([\w.]+)/.exec(a) ||
      /(webkit)[ \/]([\w.]+)/.exec(a) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) ||
      /(msie) ([\w.]+)/.exec(a) ||
      (0 > a.indexOf("compatible") &&
        /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)) ||
      [];
    return { browser: a[1] || "", version: a[2] || "0" };
  };
  if (!d.browser) {
    var c = d.uaMatch(navigator.userAgent),
      f = {};
    c.browser && ((f[c.browser] = !0), (f.version = c.version));
    f.chrome ? (f.webkit = !0) : f.webkit && (f.safari = !0);
    d.browser = f;
  }
})($);
(function (d, c) {
  function f(a, c, f) {
    var e = a.prototype;
    var g =
      c && c.hasOwnProperty("constructor")
        ? c.constructor
        : function () {
            a.apply(this, arguments);
          };
    d.extend(g, a);
    b.prototype = a.prototype;
    g.prototype = new b();
    g._super = a.prototype;
    g._superClass = a;
    if (c)
      for (var k in c)
        "_defaults" == k && (c[k] = d.extend({}, e[k], c[k])),
          (g.prototype[k] = c[k]);
    f && d.extend(g, f);
    g.prototype.constructor = g;
    g.__super__ = a.prototype;
    return g;
  }
  c.ns =
    c.ns ||
    function (a) {
      a = a.split(".");
      for (var b = window, e, c = 0, f = a.length; c < f; c++)
        (e = a[c]), (b[e] = b[e] || {}), (b = b[e]);
      return b;
    };
  var a = (c.ut.Class = function (a) {
    this.options = d.extend({}, this.options, a);
    this.options.jsonModel || (this.options.jsonModel = {});
    this.jsonModel = this.options.jsonModel;
    this.initialize.apply(this, arguments);
  });
  d.extend(a.prototype, {
    initialize: function () {},
    xfaUtil: function () {
      return c.ut.XfaUtil.prototype;
    },
    copyArray: function (a, b, c) {
      var e = this.getOrElse(c, "keepReference", !0);
      if (a instanceof Array) {
        for (var g = 0; g < a.length; g++) {
          if (a[g] instanceof Array) {
            var f = this._createDestination(b, g, e, []);
            this.copyArray(a[g], f, c);
          } else
            "object" == typeof a[g]
              ? ((f = this._createDestination(b, g, e, {})),
                this.copyObject(a[g], f, c))
              : (f = a[g]);
          b[g] = f;
        }
        b.length > a.length && b.splice(a.length, b.length - a.length);
      }
    },
    copyObject: function (a, b, c) {
      var e = this.getOrElse(c, "keepReference", !0),
        g = this.getOrElse(c, "exceptions", []),
        f = this.getOrElse(c, "transformMaps", {});
      if ("object" == typeof a)
        for (var k in a)
          -1 == g.indexOf(k) &&
            (a[k] instanceof Array
              ? ((b[k] = this._createDestination(b, k, e, [])),
                this.copyArray(a[k], b[k], c))
              : "object" == typeof a[k] && null != a[k]
                ? ((b[k] = this._createDestination(b, k, e, {})),
                  this.copyObject(a[k], b[k], c))
                : d.isUndefined(f[k])
                  ? (b[k] = a[k])
                  : (b[k] = f[k](a[k], c, a)));
    },
    _createDestination: function (a, b, c, f) {
      return c ? (d.isObject(a) && !a.hasOwnProperty(b) ? f : a[b] || f) : f;
    },
    _disableFunctions: function (a) {
      var b = function () {},
        e = !d.isFunction(a);
      d.each(
        d.functions(this),
        function (c) {
          if (e || a(c)) this[c] = b;
        },
        this,
      );
    },
    getOrElse: function (a) {
      var b = a;
      if (2 > arguments.length) return b;
      if (2 == arguments.length) {
        if (d.isUndefined(b)) return d.clone(arguments[1]);
      } else {
        var e = (arguments[1] || "").split("."),
          c = arguments[2];
        d.each(
          e,
          function (a) {
            b = d.isObject(b) ? b[a] : void 0;
          },
          this,
        );
        if (d.isUndefined(b)) return d.clone(c);
      }
      return b;
    },
    jqId: function (a) {
      return c.ut.XfaUtil.prototype.jqId(a);
    },
    logger: function () {
      return this.xfaUtil().getLogger();
    },
    validateInput: function (a, b, c) {
      if ("undefined" !== typeof a && null !== a)
        switch (b) {
          case "string":
            a += "";
            break;
          case "object":
            "object" !== typeof a && (a = c);
            break;
          case "integer":
            a = parseInt(a);
            isNaN(a) && (a = c);
            break;
          case "measurement":
            break;
          default:
            b instanceof Array && (~b.indexOf(a) || (a = c));
        }
      return a;
    },
  });
  d.extend(a, {
    defineProps: function (a) {
      d.each(
        a,
        function (a, b) {
          a.resolve &&
            (this.prototype.hasOwnProperty("resolveProperties") ||
              (this.prototype.resolveProperties = this.prototype
                .resolveProperties
                ? d.clone(this.prototype.resolveProperties)
                : []),
            this.prototype.resolveProperties.push(b));
          Object.defineProperty(this.prototype, b, a);
        },
        this,
      );
    },
    extend: function (a) {
      a = f(this, a);
      a.extend = this.extend;
      return a;
    },
    addMixins: function (a) {
      d.isArray(a) || (a = [a]);
      d.each(
        a,
        function (a) {
          a.normalProperties && d.extend(this.prototype, a.normalProperties);
          a.propertyDescriptors && this.defineProps(a.propertyDescriptors);
        },
        this,
      );
    },
  });
  var b = function () {};
})(_, window.xfalib);
(function (d, c) {
  c.ut.XMLUtils = {
    dataSom2xpath: function (c) {
      var a = "";
      d.isEmpty(c) ||
        (d.each(c.split(/\]\./).slice(4), function (b) {
          var e = b.lastIndexOf("[");
          a +=
            b.substring(0, e + 1) + (parseInt(b.substring(e + 1)) + 1) + "]/";
        }),
        d.isEmpty(a)
          ? (a = c)
          : "/" === a[a.length - 1] && (a = a.slice(0, -1)));
      return a;
    },
    iteratorToArray: function (c) {
      for (var a = [], b = c ? c.iterateNext() : null; null != b; )
        a.push(b), (b = c.iterateNext());
      return a;
    },
    evaluateXPath: function (f, a, b, e, g) {
      try {
        if (d.isEmpty(f) || !d.isString(f) || !(a instanceof Node)) return null;
        d.isUndefined(document.evaluate) && wgxpath.install();
        var k = a instanceof Document ? a : a.ownerDocument,
          h = k.evaluate ? k : document;
        f = this.sanitizeXPath(f);
        return h.evaluate(f, a, b, e, g);
      } catch (l) {
        c.ut.XfaUtil.prototype
          .getLogger()
          .error("Could not evaluate xpath: " + f + l);
      }
    },
    sanitizeXPath: function (c) {
      c = c.split("/");
      return d
        .map(c, function (a) {
          return a.replace(/\[(.*\D+.*)\]|\[\]/g, "");
        })
        .join("/");
    },
    createElementsFromXPath: function (f, a, b) {
      if (null != f || null != a) {
        f = f.split("/");
        var e = b ? d.initial(f) : f,
          g = a;
        d.each(
          e,
          function (a, b) {
            if (null == a.match(/^([^[]+)(\[(\d+)\])?/))
              return (
                c.ut.XfaUtil.prototype
                  .getLogger()
                  .error("Unsupported expression in Bindref " + a),
                null
              );
            g = this.findOrCreateElement(a, g, b === e.length - 1);
          },
          this,
        );
        return g;
      }
      return null;
    },
    _getElementNameAndIndexFromXPathPart: function (c) {
      c = c.match(/^([^[]+)(?:\[(\d+|\*)\])?/);
      return null !== c ? { name: c[1], index: c[2] || 0 } : null;
    },
    createElement: function (c, a) {
      return a.ownerDocument.createElement(c);
    },
    findOrCreateElement: function (f, a, b) {
      try {
        if (null == a) return null;
        var e = this.evaluateXPath(
          f,
          a,
          null,
          XPathResult.ORDERED_NODE_ITERATOR_TYPE,
          null,
        ).iterateNext();
        if (null == e) {
          var g = this._getElementNameAndIndexFromXPathPart(f);
          if (null != g)
            if (b && g.name.match(/^@/)) {
              var d = g.name.replace(/^@/, "");
              e = a.ownerDocument.createAttribute(d);
              a.setAttributeNode(e);
            } else
              (e = a.ownerDocument.createElement(g.name)), a.appendChild(e);
        }
        return e;
      } catch (h) {
        c.ut.XfaUtil.prototype
          .getLogger()
          .error(
            "Following exception occurred while executing findOrCreateElement " +
              h,
          );
      }
    },
    getXFARootFormElementFromXML: function (f) {
      d.isUndefined(document.evaluate) && wgxpath.install();
      var a = f instanceof Element,
        b = a ? f.nodeName : f.documentElement.nodeName;
      f = a ? f : f.documentElement;
      if ("xdp:xdp" === b || "xdp" === b)
        c.ut.XfaUtil.prototype.isIE()
          ? (f = f.firstElementChild.firstElementChild.firstElementChild)
          : ((b = this.evaluateXPath(
              "*/xfa:data/*",
              f,
              formBridge.nsResolver,
              XPathResult.ORDERED_NODE_ITERATOR_TYPE,
              null,
            )),
            (f = b.iterateNext()));
      return f;
    },
    getNamespaces: function (c) {
      var a = { _default: null };
      d.each(c.attributes, function (b) {
        var e = b.name.match(/^xmlns(?::(.*))?/);
        if ((e = null != e ? e[1] || "_default" : null)) a[e] = b.value;
      });
      return a;
    },
    getNsResolver: function (c) {
      return (function (a) {
        return function (b) {
          return formBridge.nsResolver(b) || a[b];
        };
      })(this.getNamespaces(c));
    },
    removeDefaultNamespace: function (c) {
      return c.replace(/(\s+)(xmlns=('[^']*'|"[^"]*"))(?=[^<>]*>)/g, "$1");
    },
  };
})(_, xfalib);
(function (d, c, f) {
  var a = { a: "xfa", b: "xfaView", c: "xfaPerf" },
    b = ["off", "console", "server", "consoleServer"],
    e = (c.ut.Logger = c.ut.Class.extend({
      LOG_COUNT: {
        level: {
          FATAL: 0,
          ERROR: 0,
          WARN: 0,
          INFO: 0,
          DEBUG: 0,
          TRACE: 0,
          ALL: 0,
        },
        category: { xfa: 0, xfaView: 0, xfaPerf: 0, Unknown: 0 },
      },
      OFF: 0,
      FATAL: 1,
      ERROR: 2,
      WARN: 3,
      INFO: 4,
      DEBUG: 5,
      TRACE: 6,
      ALL: 7,
      logLevelNames: "OFF FATAL ERROR WARN INFO DEBUG TRACE ALL".split(" "),
      initialize: function () {
        var a = this;
        e._super.initialize.call(this);
        this.logs = {};
        this.logMessages = "";
        this.logServiceProxy = this.options.logServiceProxy;
        this.contextPath = this.options.contextPath;
        this.renderContext = this.options.renderContext;
        this.jsonModel.logConfigString &&
          d.extend(this.jsonModel, this.parse(this.jsonModel.logConfigString));
        d.each(this.jsonModel.category, function (b) {
          a.LOG_COUNT.category[b] = 0;
        });
      },
      parse: function (e) {
        var g = e.split("-"),
          f = d.first(g);
        g = d.rest(g);
        var l = {
          on: "0" === f ? "false" : "true",
          category: [],
          level: [],
          type: b[parseInt(f)],
        };
        d.each(
          g,
          function (b, g) {
            (g = b.match(/^([A-Za-z]+)(\d+)$/)) && 3 === g.length
              ? ((b = this.getOrElse(
                  a,
                  g[1],
                  this.getOrElse(
                    this.jsonModel,
                    "categoryAcronyms." + g[1],
                    g[1],
                  ),
                )),
                l.category.push(b),
                l.level.push(parseInt(g[2])))
              : this.consoleHandler(
                  this.resolveMessage(c.locale.LogMessages["ALC-FRM-901-020"], [
                    b,
                    e,
                  ]),
                );
          },
          this,
        );
        return l;
      },
      resolveMessage: function (a, b) {
        b = b || [];
        return a.replace(/{(\d+)}/g, function (a, e) {
          return "undefined" != typeof b[e] ? b[e] : a;
        });
      },
      log: function (a, b, e, c) {
        var g = new Date(),
          f = g.getDate(),
          d = g.getMonth() + 1,
          l = g.getFullYear(),
          h = g.getMilliseconds(),
          k = g.getSeconds(),
          u = g.getMinutes();
        g = g.getHours();
        f = f + "." + d + "." + l + " " + g + ":" + u + ":" + k + ":" + h;
        if (this.jsonModel && this.jsonModel.category)
          for (d = 0; d < this.jsonModel.category.length; d++)
            0 != b &&
              this.jsonModel.level[d] >= b &&
              this.jsonModel.category[d] == a &&
              "true" == this.jsonModel.on &&
              ((l = e),
              c && (l = this.resolveMessage(e, c)),
              (h = ""),
              (h += f),
              (h += " *" + this.logLevelNames[b] + "*"),
              (h += " [" + a + "]"),
              (h += "  " + l + "\r\n"),
              (this.logMessages += h),
              "console" == this.jsonModel.type ||
                "consoleServer" == this.jsonModel.type) &&
              (++this.LOG_COUNT.category[a || "Unknown"],
              ++this.LOG_COUNT.level[
                this.logLevelNames[8 > parseInt(b) ? b : 7]
              ],
              this.consoleHandler(h, b));
      },
      consoleHandler: function (a, b) {
        if ("undefined" != typeof console) {
          b =
            "string" === typeof this.logLevelNames[b]
              ? this.logLevelNames[b].toLowerCase()
              : "log";
          var e = console.log;
          "function" === typeof console[b] && (e = console[b]);
          e.call(console, "\n\n\n" + a);
          if ("error" !== b)
            try {
              n.test;
            } catch (l) {
              l.stack &&
                e.call(
                  console,
                  l.stack.replace("ReferenceError: n is not defined", ""),
                );
            }
        }
      },
      _getLogServiceProxyUrl: function () {
        var a = "";
        return (a = this.logServiceProxy
          ? a + this.logServiceProxy
          : a +
            ((this.contextPath && "/" != this.contextPath
              ? this.contextPath
              : "") +
              "/content/xfaforms/profiles/default.log.html"));
      },
      _invokeAtServer: function (a) {
        a = {
          async: !0,
          url: this._getLogServiceProxyUrl(),
          type: "POST",
          contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
          data: a,
        };
        f.ajax(a);
      },
      isServerLoggingEnabled: function () {
        return "true" != this.jsonModel.on ||
          ("server" != this.jsonModel.type &&
            "consoleServer" != this.jsonModel.type)
          ? !1
          : !0;
      },
      serverHandler: function () {
        this._invokeAtServer({
          logMessages: this.logMessages,
          renderContext: this.renderContext,
        });
        this.logMessages = "";
      },
      fatal: function (a, b, e) {
        this.log(a, this.FATAL, b, e);
      },
      error: function (a, b, e) {
        this.log(a, this.ERROR, b, e);
      },
      warn: function (a, b, e) {
        this.log(a, this.WARN, b, e);
      },
      info: function (a, b, e) {
        this.log(a, this.INFO, b, e);
      },
      debug: function (a, b, e) {
        this.log(a, this.DEBUG, b, e);
      },
      trace: function (a, b, e) {
        this.log(a, this.TRACE, b, e);
      },
      isLogEnabled: function (a, b) {
        return "true" == this.jsonModel.on &&
          ((a = this.jsonModel.category.indexOf(a)),
          this.jsonModel.level[a] >= b)
          ? !0
          : !1;
      },
    }));
})(_, xfalib, $);
(function (d, c) {
  var f = /\s+/;
  c.ut.EventClass = c.ut.Class.extend({
    on: function (a, b, e) {
      var c = d.isFunction(b) ? b : null;
      if (!b || (!b.handleEvent && !c)) return !1;
      var f = this._callbacks || (this._callbacks = {});
      a = f[a] || (f[a] = []);
      if (c) {
        e = e || this;
        if (
          d.find(
            a,
            function (a) {
              return a.fn == c && a.context == e;
            },
            this,
          )
        )
          return !1;
        a.push({ fn: c, context: e });
      } else {
        if (~a.indexOf(b)) return !1;
        a.push(b);
      }
      return !0;
    },
    off: function (a, b, e) {
      var c, k;
      if ((k = this._callbacks)) {
        if (!a && !b) return delete this._callbacks, this;
        var h = d.isFunction(b) ? b : null;
        for (a = a ? a.split(f) : d.keys(k); (c = a.shift()); )
          (k[c] = d.filter(k[c], function (a) {
            if ("undefined" !== typeof b) {
              if ((h && a.fn == h && a.context == e) || (!h && b === a))
                return !1;
            } else return !1;
            return !0;
          })),
            k[c].length || delete k[c];
        return this;
      }
    },
    trigger: function (a) {
      var b, e;
      if (!(e = this._callbacks)) return this;
      a = a.split(f);
      for (var c = d.rest(arguments); (b = a.shift()); )
        d.each(e[b], function (a) {
          a.fn && a.context
            ? a.fn.apply(a.context, c)
            : d.isFunction(a.handleEvent) && a.handleEvent.apply(a, c);
        });
      return this;
    },
  });
})(_, xfalib);
(function (d, c, f) {
  var a = (f.ut.XfaUtil = function () {}),
    b = null,
    e = !1,
    g = [],
    k = function (a) {
      g.push(a);
      !1 === e &&
        (c(window).one("destroy.xfa", function () {
          d.each(g, function (a) {
            clearTimeout(a);
          });
          g = [];
          e = !1;
        }),
        (e = !0));
    };
  d.extend(a.prototype, {
    _globalUniqueId: new Date().getTime(),
    logger: null,
    formScaleFactor: 1,
    getOrElse: f.ut.Class.prototype.getOrElse,
    _xtgEventName: { $formready: "ready", $layoutready: "ready" },
    generateUID: function () {
      return "UID" + ++a.prototype._globalUniqueId;
    },
    matchJsonType: function (b, e) {
      return (
        b &&
        e &&
        a.prototype.getOrElse(b._class, "").toLowerCase() ==
          ("" + e).toLowerCase()
      );
    },
    $data: function (a, b, e) {
      c.data(a, "_xfaInitialized") ||
        (c(a).data(), c.data(a, "_xfaInitialized", !0));
      return c.data(a, b, e);
    },
    $css: function (a, b) {
      var e = {
          fillOpacity: !0,
          "fill-opacity": !0,
          fontWeight: !0,
          "font-weight": !0,
          lineHeight: !0,
          "line-height": !0,
          zIndex: !0,
          "z-index": !0,
          opacity: !0,
          orphans: !0,
          widows: !0,
          zoom: !0,
        },
        c;
      for (c in b) {
        var g = b[c];
        d.isNumber(g) && !e[c] && (g += "px");
        a.style[c] = g;
      }
    },
    isTableHF: function (a) {
      a = (
        d.find(
          a.children,
          function (a) {
            return "assist" == a._class;
          },
          this,
        ) || {}
      ).role;
      return "TH" == a || "TF" == a ? !0 : !1;
    },
    getUiOneOfChildTag: function (a) {
      if (
        (a = d.find(a.children, function (a) {
          return "ui" == a._class;
        }))
      ) {
        var b = f.runtime.xfa._templateSchema._getOneOfChild("ui");
        if (
          (a = d.find(a.children, function (a) {
            return 1 == b[a._class];
          }))
        )
          return a._class;
      }
    },
    dIndexOf: function (a, b) {
      var e = -1;
      d.find(a, function (a, c) {
        return a == b && (e = c);
      });
      return e;
    },
    splitStringByWidth: function (a, b, e) {
      var c = a.length;
      do {
        var g = f.view.util.TextMetrics.measureExtent(a.slice(0, c), {
          refEl: e,
          maxWidth: -1,
        }).width;
        c--;
      } while (g > b);
      return c != a.length - 1 ? a.slice(0, c + 1) : a;
    },
    isRepeatabeEl: function (a) {
      return "subform" == a || "subformSet" == a ? !0 : !1;
    },
    stripOrCall: function (a, b, e) {
      if (a) return { changed: !1, jsonDifference: {} };
      if (d.isFunction(b)) return b.apply(this, e);
    },
    partialStripOrCall: function (a, b) {
      b = b.call(this, a);
      b.changed ||
        (1 === a
          ? (b = {
              changed: !0,
              jsonDifference: {
                _class: this.jsonModel._class,
                name: this.jsonModel.name,
              },
            })
          : (b.jsonDifference = {}));
      return b;
    },
    stripObject: function (b, e) {
      if (d.isEmpty(b) || !d.isObject(b)) return !0;
      var c = !1;
      d.each(d.keys(b), function (g) {
        var f = !1;
        d.contains(e, g)
          ? (c = !0)
          : (d.isArray(b[g])
              ? d.each(b[g], function (b) {
                  b = a.prototype.stripObject(b, e);
                  f = f || b;
                })
              : d.isObject(b[g]) && (f = a.prototype.stripObject(b[g], e)),
            f ? (c = !0) : delete b[g]);
      });
      return c;
    },
    computeDomJsonDiff: function (a, b) {
      var e = !0;
      a.hasOwnProperty("_modelChanged") && (e = a._modelChanged);
      var c = {};
      e
        ? this.copyObject(a.jsonModel, c, {
            exceptions: ["children", "{default}", "extras"],
          })
        : (c = { _class: a.className });
      !e && a.jsonModel.hasOwnProperty("name") && (c.name = a.jsonModel.name);
      "FS_EXTRAS" === a.name && 3 === b && (a._childModified = !0);
      return { changed: e, jsonDifference: c };
    },
    getLogger: function () {
      return (
        a.prototype.logger ||
        a.prototype.getOrElse(f, "runtime.xfa.Logger", null)
      );
    },
    getErrorManager: function () {
      return a.prototype.getOrElse(f, "runtime.xfa.ErrorManager", null);
    },
    XFA_CLICK_EVENT: "xfaclick",
    XFA_EXIT_EVENT: "xfaexit",
    XFA_ENTER_EVENT: "xfaenter",
    XFA_CHANGE_EVENT: "xfachange",
    XFA_PREOPEN_EVENT: "xfapreopen",
    btwn: function (a, b, e) {
      return a > b && a < e;
    },
    isWebkit: function () {
      return (
        !!c.browser.webkit ||
        /webkit/.test(navigator.userAgent.toLowerCase()) ||
        !!window.chrome ||
        !!c.browser.chrome ||
        /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) ||
        !!c.browser.safari ||
        !!window.webkitURL ||
        (/safari/.test(navigator.userAgent.toLowerCase()) &&
          /apple computer/.test(navigator.vendor.toLowerCase()))
      );
    },
    clearTimeoutOnDestroy: function (a) {
      k(a);
    },
    isSafari: function () {
      return (
        /safari/.test(navigator.userAgent.toLowerCase()) &&
        /apple computer/.test(navigator.vendor.toLowerCase())
      );
    },
    getLocaleStrings: function () {
      return f.locale.Strings;
    },
    getLogMessages: function () {
      return f.locale.LogMessages;
    },
    registerLocaleProperties: function (a) {
      b = a;
    },
    getDefaultLocaleProperty: function (a) {
      var e = b || this.getOrElse(f, "script.Xfa._defaultLocale", null);
      return this.getOrElse(e, a, null);
    },
    encodeScriptableTags: function (a) {
      if (d.isString(a))
        return a
          .replace(/<(\/?)(script[^<>]*)>/gi, "\x26lt;$1$2\x26gt;")
          .replace(/<(\/?)(img[^<>]*)>/gi, "\x26lt;$1$2\x26gt;")
          .replace(/<(\/?)(video[^<>]*)>/gi, "\x26lt;$1$2\x26gt;")
          .replace(/<(\/?)(audio[^<>]*)>/gi, "\x26lt;$1$2\x26gt;");
    },
    jqId: function (a) {
      return "#" + a.replace(/(#|:|\.|\[|\])/g, "\\$1");
    },
    _triggerOnBridge: function (a, b, e, c, g) {
      b = f.script.XfaModelEvent.createEvent(a, b, e, c, g);
      formBridge && window.formBridge.trigger(a, b);
    },
    padString: function (a, b, e) {
      a += "";
      return a.length >= b ? a : Array(b - a.length + 1).join(e || "0") + a;
    },
    isIE: function () {
      return (
        c.browser.msie ||
        ("Netscape" === navigator.appName &&
          navigator.userAgent.match(/Trident\//))
      );
    },
    detectIE: function () {
      if (
        c.browser.msie &&
        c.browser.version &&
        parseInt(c.browser.version, 10)
      )
        return parseInt(c.browser.version, 10);
      var a = window.navigator.userAgent,
        b = a.indexOf("MSIE ");
      if (0 < b) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
      if (0 < a.indexOf("Trident/"))
        return (
          (b = a.indexOf("rv:")),
          parseInt(a.substring(b + 3, a.indexOf(".", b)), 10)
        );
      b = a.indexOf("Edge/");
      return 0 < b ? parseInt(a.substring(b + 5, a.indexOf(".", b)), 10) : !1;
    },
    detectChrome: function () {
      return (
        !!window.chrome ||
        !!c.browser.chrome ||
        /chrom(e|ium)/.test(navigator.userAgent.toLowerCase())
      );
    },
    isHTML: function (a) {
      if (a && /<[a-z][\s\S]*>/.test(a))
        try {
          return 0 < c(a).length;
        } catch (l) {
          return !1;
        }
      else return !1;
    },
    isNonPrintableKey: function (a) {
      return (
        a &&
        !d.contains(
          "MozPrintableKey Divide Multiply Subtract Add Enter Decimal Spacebar Del".split(
            " ",
          ),
          a,
        ) &&
        1 != a.length
      );
    },
    _isIpad: function () {
      return null != navigator.userAgent.match(/iPad/i);
    },
    _tableCheckForAccessibility: function (a) {
      var b = a.model.getElement("assist", 0, !0);
      return (
        this.getOrElse(a, "layoutModel.layout", null) ==
          f.view.LayoutConst.LAYOUT_TABLE ||
        "Table" == this.getOrElse(b, "role", null)
      );
    },
    _getToolTipText: function (a) {
      var b = a.getElement("assist", 0, !0),
        e = "";
      1 != this.getOrElse(b, "speak.disable", 0) &&
        (e =
          this.getOrElse(b, "toolTip.value", "") ||
          this.getOrElse(b, "speak.value", "") ||
          this.getOrElse(a, "jsonModel.name", ""));
      return e;
    },
    _getMandatoryMessage: function (a) {
      var b = a._defaults.validate.message.defaultMessage;
      return (a = this.getOrElse(a, "validate.message.nullTest", b)) && a.value
        ? a.value
        : b.value;
    },
    _compareVal: function (a, b, e) {
      return a && b ? (e ? a >= b : a > b) : !1;
    },
  });
  if (c.browser.msie || c.browser.mozilla)
    a.prototype.$css = function (a, b) {
      c(a).css(b);
    };
})(_, $, xfalib);
(function (d, c, f) {
  f.ut.Utilities = {
    isIE11: function () {
      return !!navigator.userAgent.match(/Trident.*rv:11\./);
    },
    checkMinMozillaVersion: function (a) {
      return (
        !this.isIE11() && c.browser.mozilla && parseInt(c.browser.version) >= a
      );
    },
    getObjectFromKeyValueStringList: function (a) {
      var b = {},
        e;
      d.each(a, function (a, c) {
        (e = a.split("\x3d")) && 1 < e.length && (b[e[0]] = e[1]);
      });
      return b;
    },
    _getNameWithoutMarker: function (a) {
      var b = a.indexOf("__afAttachment__");
      -1 !== b && (a = a.substring(b + 16, a.length));
      return a;
    },
    _isDataContainerSupported: function () {
      try {
        var a = new DataTransfer();
        if (a && a.items) return !0;
      } catch (b) {}
      return !1;
    },
  };
})(_, $, xfalib);
(function (d, c) {
  (c.ut.Scanner = c.ut.Class.extend({
    initialize: function () {
      this._pos = 0;
    },
    isEOF: function () {
      return this.jsonModel._str.length <= this._pos;
    },
    peek: function () {
      return this.isEOF() ? null : this.jsonModel._str.charAt(this._pos);
    },
    optionalConsumeChar: function (c) {
      return this.jsonModel._str.charAt(this._pos) == c
        ? (this._pos++, c)
        : null;
    },
    getNCharIQS: function () {
      this._pos++;
      if (this.jsonModel._str.length <= this._pos) {
        var c = this.jsonModel._str.charAt(this._pos);
        if ("'" != c) return c;
        if (moveNextExpectedChar("'"))
          return this.jsonModel._str.charAt(this._pos);
      }
      return null;
    },
    moveNextExpectedChar: function (c) {
      for (
        this._pos++;
        this._pos < this.jsonModel._str.length &&
        this.jsonModel._str.charAt(this._pos) != c;

      )
        this._pos++;
      return this._pos < this.jsonModel._str.length;
    },
    readInteger: function (f) {
      if (this.pos + f > this.jsonModel._str.length) return null;
      var a = c.ut.PictureUtils.parseIntExact(
        this.jsonModel._str,
        this._pos,
        f,
      );
      this._pos += f;
      return a;
    },
  })).lookupNext = function (c, a, b) {
    var e = c.length;
    if (a >= e) return null;
    var g = {};
    g.startPos = a;
    var f = c.charAt(a),
      d = !1;
    if ("'" == f)
      for (b = a + 1; b < e; b++) {
        if ("'" == c.charAt(b)) {
          g.type = 1;
          g.len = b - a + 1;
          d = !0;
          break;
        }
      }
    else {
      if (("a" <= f && "z" >= f) || ("A" <= f && "Z" >= f) || b.call(null, f)) {
        d = e;
        for (b = 1; a + b < e; b++)
          if (c.charAt(a + b) != f) {
            d = a + b;
            break;
          }
        g.type = 2;
        g.len = d - a;
        g.patChar = f;
        g.patPos = a;
      } else (g.type = "?" == f || "+" == f || "*" == f ? 3 : 4), (g.len = 1);
      d = !0;
    }
    if (d) return g;
    throw "Picture is invalid.";
  };
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.PictureFmt = function () {});
  f.DatePicturePattern = /^date(?:\([a-zA-Z]*_[a-zA-Z]*\))?\{([\w\W]*?)\}$/;
  f.TimePicturePattern = /^time(?:\([a-zA-Z]*_[a-zA-Z]*\))?\{([\w\W]*?)\}$/;
  f.TextPicturePattern = /^text\{([\w\W]*?)\}$/;
  f.NumPicturePattern = /^num\{([\w\W]*?)\}$/;
  f.parse = function (a, b, e) {
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    var g = f.DatePicturePattern.exec(b);
    if (g && g[1]) return e.parseDate(a, g[1]);
    if ((g = f.TimePicturePattern.exec(b)) && g[1]) return e.parseTime(a, g[1]);
    if ((g = f.TextPicturePattern.exec(b)) && g[1]) return e.parseText(a, g[1]);
    if ((g = f.NumPicturePattern.exec(b)) && g[1])
      return e.parseNumeric(a, g[1]);
    throw "Invalid picture clause " + b;
  };
  f.format = function (a, b, e, g, d) {
    var k = new c.ut.PictureEngine({ jsonModel: { locale: e } }),
      l = f.DatePicturePattern.exec(b);
    if (l && l[1]) return k.formatDate(a, l[1]);
    if ((l = f.TimePicturePattern.exec(b)) && l[1])
      return k.formatTime(a, l[1]);
    if ((l = f.TextPicturePattern.exec(b)) && l[1])
      return k.formatText(a, l[1], g);
    if ((l = f.NumPicturePattern.exec(b)) && l[1])
      return k.formatNumeric(a, l[1], e, g, d);
    throw "Invalid picture clause " + b;
  };
  f.formatTest = function (a, b, e, c, k) {
    try {
      var g = f.format(a, b, e, c, k);
    } catch (m) {
      return !1;
    }
    if (d.isString(g)) {
      try {
        var l = f.parse(g, b, e);
      } catch (m) {
        return !1;
      }
      if (!d.isString(l) && l !== g) return !1;
    } else return !1;
    return !0;
  };
  f.parseDate = function (a, b, e) {
    var g = f.DatePicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return g && g[1] ? e.parseDate(a, g[1]) : e.parseDate(a, b);
  };
  f.formatDate = function (a, b, e) {
    var g = f.DatePicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return g && g[1] ? e.formatDate(a, g[1]) : e.formatDate(a, b);
  };
  f.parseTime = function (a, b, e) {
    var g = f.TimePicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return g && g[1] ? e.parseTime(a, g[1]) : e.parseTime(a, b);
  };
  f.formatTime = function (a, b, e) {
    var g = f.TimePicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return g && g[1] ? e.formatTime(a, g[1]) : e.formatTime(a, b);
  };
  f.parseText = function (a, b, e) {
    var g = f.TextPicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return g && g[1] ? e.parseText(a, g[1]) : e.parseText(a, b);
  };
  f.formatText = function (a, b, e, g) {
    var d = f.TextPicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return d && d[1] ? e.formatText(a, d[1], g) : e.formatText(a, b, g);
  };
  f.parseNumeric = function (a, b, e) {
    var g = f.NumPicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return g && g[1] ? e.parseNumeric(a, g[1]) : e.parseNumeric(a, b);
  };
  f.formatNumeric = function (a, b, e) {
    var g = f.NumPicturePattern.exec(b);
    e = new c.ut.PictureEngine({ jsonModel: { locale: e } });
    return g && g[1] ? e.formatNumeric(a, g[1]) : e.formatNumeric(a, b);
  };
  f.parseDateTime = function (a, b, e, c, f) {};
  f.formatDateTime = function (a, b, e, c, f) {};
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.PictureUtils = function () {});
  f.padding = function (a, e, c, f) {
    return (["0", "00", "000", "0000"][e - 1] + a).slice(-e);
  };
  f.parseIntAggressive = function (a, e, c) {
    for (var b = {}, g = 0, f = -1, d = 0; d < c && e + d < a.length; d++) {
      var p = a.charAt(e + d);
      if ("0" <= p && "9" >= p) g = 10 * g + (p - 0);
      else {
        f = d;
        break;
      }
    }
    -1 == f && (f = c);
    b.value = g;
    b.len = f;
    return b;
  };
  f.parseIntExact = function (a, e, c) {
    var b = 0;
    f.assert(e + c <= a.length, "mismatch");
    for (var g = 0; g < c; g++) {
      var d = a.charAt(e + g);
      if ("0" <= d && "9" >= d) b = 10 * b + (d - 0);
      else throw "unexpected currentChar in PictureUtils.parseInt";
    }
    return b;
  };
  f.isDigit = function (a) {
    return /[0-9]/.test(a);
  };
  f.inString = function (a, e) {
    return 0 <= e.indexOf(a);
  };
  var a =
    /[\u0041-\u005a\u0061-\u007a\u00aa-\u00aa\u00b5-\u00b5\u00ba-\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u0236\u0250-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ee-\u02ee\u037a-\u037a\u0386-\u0386\u0388-\u038a\u038c-\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03f5\u03f7-\u03fb\u0400-\u0481\u048a-\u04ce\u04d0-\u04f5\u04f8-\u04f9\u0500-\u050f\u0531-\u0556\u0559-\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u063a\u0640-\u064a\u066e-\u066f\u0671-\u06d3\u06d5-\u06d5\u06e5-\u06e6\u06ee-\u06ef\u06fa-\u06fc\u06ff-\u06ff\u0710-\u0710\u0712-\u072f\u074d-\u074f\u0780-\u07a5\u07b1-\u07b1\u0904-\u0939\u093d-\u093d\u0950-\u0950\u0958-\u0961\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2-\u09b2\u09b6-\u09b9\u09bd-\u09bd\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e-\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd-\u0abd\u0ad0-\u0ad0\u0ae0-\u0ae1\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d-\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b71-\u0b71\u0b83-\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c-\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd-\u0cbd\u0cde-\u0cde\u0ce0-\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd-\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32-\u0e33\u0e40-\u0e46\u0e81-\u0e82\u0e84-\u0e84\u0e87-\u0e88\u0e8a-\u0e8a\u0e8d-\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5-\u0ea5\u0ea7-\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd-\u0ebd\u0ec0-\u0ec4\u0ec6-\u0ec6\u0edc-\u0edd\u0f00-\u0f00\u0f40-\u0f47\u0f49-\u0f6a\u0f88-\u0f8b\u1000-\u1021\u1023-\u1027\u1029-\u102a\u1050-\u1055\u10a0-\u10c5\u10d0-\u10f8\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1206\u1208-\u1246\u1248-\u1248\u124a-\u124d\u1250-\u1256\u1258-\u1258\u125a-\u125d\u1260-\u1286\u1288-\u1288\u128a-\u128d\u1290-\u12ae\u12b0-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0-\u12c0\u12c2-\u12c5\u12c8-\u12ce\u12d0-\u12d6\u12d8-\u12ee\u12f0-\u130e\u1310-\u1310\u1312-\u1315\u1318-\u131e\u1320-\u1346\u1348-\u135a\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7-\u17d7\u17dc-\u17dc\u1820-\u1877\u1880-\u18a8\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1d00-\u1d6b\u1e00-\u1e9b\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59-\u1f59\u1f5b-\u1f5b\u1f5d-\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe-\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071-\u2071\u207f-\u207f\u2102-\u2102\u2107-\u2107\u210a-\u2113\u2115-\u2115\u2119-\u211d\u2124-\u2124\u2126-\u2126\u2128-\u2128\u212a-\u212d\u212f-\u2131\u2133-\u2139\u213d-\u213f\u2145-\u2149\u3005-\u3006\u3031-\u3035\u303b-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312c\u3131-\u318e\u31a0-\u31b7\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fa5\ua000-\ua48c\uac00-\ud7a3\uf900-\ufa2d\ufa30-\ufa6a\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e-\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]/;
  f.isLetter = function (b) {
    return a.test(b);
  };
  f.isLetterOrDigit = function (a) {
    return this.isLetter(a) || this.isDigit(a);
  };
  f.skipUntil = function (a, e, c) {
    for (var b = c; b < a.length; ) {
      var g = b;
      if (0 <= e.indexOf(a.charAt(g++))) break;
      b = g;
    }
    return b - c;
  };
  f.matchString = function (a, e, c) {
    if (e + c.length > a.length) return !1;
    for (var b = 0; b < c.length; b++)
      if (c.charAt(b) != a.charAt(e + b)) return !1;
    return !0;
  };
  f.assert = function (a, e) {
    if (!a) throw e;
  };
  f.getLocaleObject = function (a, e) {
    return null !== a && c.runtime.xfa
      ? c.runtime.xfa._getLocaleSymbols(a, e)
      : c.ut.XfaUtil.prototype.getDefaultLocaleProperty(e);
  };
  f.getHashOfLocaleObject = function (a, e) {
    if (!f.getHashOfLocaleObject[a + "_" + e]) {
      var b = {};
      d.each(f.getLocaleObject(a, e), function (a) {
        a = (a + "").toLowerCase();
        for (var e = 0, c = 0; c < a.length; c++)
          e += (c + 1) * a.charCodeAt(c);
        b[e] = b[e] || [];
        b[e].push(a);
      });
      f.getHashOfLocaleObject[a + "_" + e] = b;
    }
    return f.getHashOfLocaleObject[a + "_" + e];
  };
  f.convertNumberToLocale = function (a, e) {
    a = f.getLocaleObject(a, "numberSymbols.zero").charCodeAt(0);
    e += "";
    for (var b = [], c = 0; c < e.length; c++)
      b.push(String.fromCharCode(a + parseInt(e.charAt(c))));
    return b.join("");
  };
  f.parsePictureClause = function (a) {
    if (null === a || void 0 === a) return [];
    for (
      var b = !1,
        c = !1,
        f = !1,
        d = "",
        l = "",
        m = "",
        p,
        r = [],
        q = /^num$|^text$|^date$/,
        t = /^[a-zA-Z]*_[a-zA-Z]*$/,
        v = 0,
        u = 0;
      v < a.length;
      v++
    )
      if (((p = a.charAt(v)), c && "'" !== p)) m += p;
      else
        switch (p) {
          case "'":
            if (!b) return null;
            c = !c;
            m += p;
            break;
          case "{":
            if (b || f || "" === l) return null;
            b = !0;
            break;
          case "}":
            if (!b || (f && "" === m) || "" === l) return null;
            u = 0;
            b = !1;
            if (null === q.exec(l) || ("" !== d && null === t.exec(d)))
              return null;
            r.push({ category: l, mask: m, locale: d });
            break;
          case "|":
            if ("" === l || b || f) return null;
            l = m = d = "";
            b = f = !1;
            break;
          case "(":
            if ("" === l || 1 === u) return null;
            b ? (m += p) : (f = !0);
            u++;
            break;
          case ")":
            if ((!f && !b) || 0 === u) return null;
            b && (m += p);
            f = !1;
            u--;
            break;
          default:
            if (b) m += p;
            else if (f) d += p;
            else if ("" === l || ("" === m && "" === d)) l += p;
            else return null;
        }
    return b || f || c || 0 !== u ? null : r;
  };
})(_, xfalib);
(function (d, c) {
  c.ut.VisitorBase = c.ut.Class.extend({
    consume: function (c) {
      switch (c.type) {
        case 1:
          this.consumeStringLiteral(c);
          break;
        case 2:
          this.consumeSubPattern(c);
          break;
        case 3:
          this.consumeStringWildCard(c);
          break;
        case 4:
          this.consumeCharLiteral(c);
      }
    },
    acceptPatternChar: function (c) {
      return !1;
    },
    getPicture: function () {
      return this.jsonModel._sPicture;
    },
    abstractMethod: function () {
      throw "Not implemented";
    },
    consumeStringWildCard: this.abstractMethod,
    consumeStringLiteral: this.abstractMethod,
    consumeCharLiteral: this.abstractMethod,
    consumeSubPattern: this.abstractMethod,
    getResult: this.abstractMethod,
  });
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.NumPictureDesc = c.ut.Class.extend({
    initialize: function () {
      this.hasPercent = this.hasSign = this.hasExpon = this.hasRadix = !1;
      this.intDigit = this.fracDigit = 0;
      this._mbRightParenSeen = this._mbLeftParenSeen = !1;
      this._compactPattern();
      this._xlatePattern();
      f._super.initialize.call(this);
    },
    getPicture: function () {
      return this.jsonModel._sPicture;
    },
    _match2Char: function (a, b, e) {
      return e + 1 < this.jsonModel._sPicture.length
        ? this.jsonModel._sPicture.charAt(e) == a &&
            this.jsonModel._sPicture.charAt(e + 1) == b
        : !1;
    },
    _xlatePattern: function () {
      for (
        var a = 0,
          b = c.ut.Scanner.lookupNext(
            this.jsonModel._sPicture,
            a,
            this._acceptPatternChar,
          );
        null != b;

      )
        this._consume(b),
          (a += b.len),
          (b = c.ut.Scanner.lookupNext(
            this.jsonModel._sPicture,
            a,
            this._acceptPatternChar,
          ));
    },
    _compactPattern: function () {
      for (var a = [], b = 0, e = this.jsonModel._sPicture.length; b < e; b++)
        this._match2Char("D", "B", b)
          ? (a.push("D"), b++)
          : this._match2Char("d", "b", b)
            ? (a.push("d"), b++)
            : this._match2Char("C", "R", b)
              ? (a.push("C"), b++)
              : this._match2Char("c", "r", b)
                ? (a.push("c"), b++)
                : a.push(this.jsonModel._sPicture.charAt(b));
      this.jsonModel._sPicture = a.join("");
    },
    _acceptPatternChar: function (a) {
      return c.ut.PictureUtils.inString(a, "(%$,.)89BCDERSVZbcdrsvzt");
    },
    _consume: function (a) {
      2 == a.type && this._subConsume(a.patChar, a.len);
    },
    _subConsume: function (a, b) {
      switch (a) {
        case "E":
          if (1 < b || this.hasExpon || 0 == this.fracDigit + this.intDigit)
            throw "Illegal Numeric Picture: more than one Expon";
          this.hasExpon = !0;
          break;
        case "(":
          if (
            1 < b ||
            this._mbLeftParenSeen ||
            0 < this.fracDigit + this.intDigit
          )
            throw "Illegal Numeric Picture:  ()";
          this._mbLeftParenSeen = !0;
          break;
        case ")":
          if (1 < b || !this._mbLeftParenSeen || this._mbRightParenSeen)
            throw "Illegal Numeric Picture:  ()";
          this._mbRightParenSeen = !0;
          0 < this.fracDigit + this.intDigit && (this.hasSign = !0);
          break;
        case "S":
        case "s":
        case "C":
        case "c":
        case "D":
        case "d":
          this.hasSign = !0;
          break;
        case "%":
          this.hasPercent = !0;
          break;
        case ".":
        case "V":
        case "v":
          if (1 < b || this.hasRadix)
            throw "Illegal Numeric Picture: too many vV.";
          this._mbFracStartSeen = this.hasRadix = !0;
          break;
        case "8":
        case "9":
        case "Z":
        case "z":
          this.hasRadix ? (this.fracDigit += b) : (this.intDigit += b);
      }
    },
    parseNumberInfo: function (a) {
      var b = a,
        e = Number(b),
        c = !1;
      0 > e && ((c = !0), (e = -e), (b = b.replace("-", "")));
      this.hasPercent && ((e *= 100), (b = "" + e));
      var d = 0;
      if (this.hasExpon) {
        b = Math.pow(10, this.intDigit);
        if (e < b) for (; 10 * e < b; ) (e *= 10), d--;
        else for (; e > b; ) (e /= 10), d++;
        b = e + "";
      }
      var f = b.indexOf(".", 0);
      this.fracDigit < (0 > f ? 0 : b.length - f - 1) &&
        ((e = e.toFixed(this.fracDigit)), (b = e + ""));
      0 == b.indexOf("0") && 0 != a.indexOf("0") && (b = b.substring(1));
      f = b.indexOf(".", 0);
      a = 0 > f ? b.length : f;
      e = this.intDigit - a;
      if (0 > e) throw "Exit: most significant " + e + " digit lost";
      return {
        integerDigit: a,
        radixPos: f,
        fractionDigit: 0 > f ? 0 : b.length - f - 1,
        msText: b,
        shift: d,
        isNegative: c,
        padding: e,
      };
    },
  }));
  f.gsDB = "DB";
  f.gsCR = "CR";
  f.gsE = "E";
  f.gsDSP = "  ";
  f.gsSSP = " ";
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.TimeInfo = c.ut.Class.extend({
    initialize: function () {
      this.mThousandthOfSecond =
        this.mSecondOfMinute =
        this.mMinuteOfHour =
        this.mHourOfDay =
        this.mHourOfMeriDiem =
          -1;
    },
    getISOTime: function () {
      var a = "";
      0 < this.mThousandthOfSecond &&
        (a = "-" + this.formatNum(this.mThousandthOfSecond, 3));
      if (0 < this.mSecondOfMinute || "" != a)
        (a = this.formatNum(this.mSecondOfMinute, 2) + a), (a = ":" + a);
      if (0 < this.mMinuteOfHour || "" != a)
        (a = this.formatNum(this.mMinuteOfHour, 2) + a), (a = ":" + a);
      return (a = this.formatNum(this.mHourOfDay, 2) + a);
    },
    formatNum: function (a, b) {
      0 > a && (a = 0);
      return c.ut.PictureUtils.padding(a, b);
    },
    getDate: function () {
      var a = new Date();
      this.setTime(a);
      return a;
    },
    setTime: function (a) {
      a.setHours(this.mHourOfDay);
      a.setMinutes(this.mMinuteOfHour);
      a.setSeconds(this.mSecondOfMinute);
      a.setMilliseconds(this.mThousandthOfSecond);
    },
  }));
  f.Parse = function (a, b) {
    var e = new c.ut.Scanner({ jsonModel: { _str: a } });
    a = e.readInteger(2);
    b = -1;
    e.isEOF() || (e.optionalConsumeChar(":"), (b = e.readInteger(2)));
    var d = -1;
    e.isEOF() || (e.optionalConsumeChar(":"), (d = e.readInteger(2)));
    var k = -1;
    e.isEOF() || (e.optionalConsumeChar("-"), (k = e.readInteger(3)));
    e = new c.ut.TimeInfo();
    f.setPropertyIfNotNull(e, a, "mHourOfDay");
    f.setPropertyIfNotNull(e, b, "mMinuteOfHour");
    f.setPropertyIfNotNull(e, d, "mSecondOfMinute");
    f.setPropertyIfNotNull(e, k, "mThousandthOfSecond");
    return e;
  };
  f.setPropertyIfNotNull = function (a, b, e) {
    null != b && ((b = Number(b)), isNaN(b) || (a[e] = b));
  };
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.DateInfo = c.ut.Class.extend({
    initialize: function (a) {
      a &&
        !a.isParsingCall &&
        ((this.date = new Date()),
        (this._year = this.date.getFullYear()),
        (this._month = this.date.getMonth() + 1),
        (this._day = this.date.getDay()));
      f._super.initialize.call(this);
    },
    formatNum: function (a, b) {
      0 > a && (a = 0);
      return c.ut.PictureUtils.padding(a, b);
    },
    getDate: function () {
      return this.date;
    },
    setDate: function () {
      this.date = new Date(this._year, this._month - 1, this._day);
    },
    getISODate: function () {
      var a = [];
      a.push(this.formatNum(this._year, 4));
      a.push("-");
      a.push(this.formatNum(this._month, 2));
      a.push("-");
      a.push(this.formatNum(this._day, 2));
      return a.join("");
    },
    year: function (a) {
      if (a && 0 < a && 9999 >= a) this._year = a;
      else throw "undefined year";
    },
    month: function (a) {
      if (a && 0 < a && 13 > a) this._month = a;
      else throw "Invalid month " + a;
    },
    _leapYear: function () {
      var a = this._year;
      return 0 == a % 400 || (0 != a % 100 && 0 == a % 4);
    },
    _maxDate: function (a) {
      return this._leapYear() && 2 == a ? 29 : f.dates[a - 1];
    },
    day: function (a) {
      if (a && 0 < a && a <= this._maxDate(this._month || 0)) this._day = a;
      else throw "Invalid Date " + a + " for the month " + this._month;
    },
    validate: function (a, b, e) {
      this.year(a);
      this.month(b);
      this.day(e);
    },
  }));
  f.ParseIsoString = function (a, b) {
    if (
      (b =
        /^(\d{4})(?:-?(\d{1,2})(?:-?(\d{1,2}))?)?(?:T((\d{2}):(\d{2}):(\d{2}))Z)?$/.exec(
          a,
        )) &&
      4 <= b.length
    ) {
      var e = new f();
      a = new Date(a);
      if (b[4] && null != a)
        e.year(a.getFullYear()), e.month(a.getMonth() + 1), e.day(a.getDate());
      else
        try {
          e.year(Number(b[1])), e.month(Number(b[2])), e.day(Number(b[3]));
        } catch (g) {
          return null;
        }
      e.setDate();
      return e;
    }
    return null;
  };
  f.Parse = function (a, b, e) {
    b = b || "en_US";
    var g = c.ut.PictureUtils.getLocaleObject(b, "datePatterns"),
      k = this.ParseIsoString(a, b);
    if (!d.isEmpty(k)) return k;
    !1 === e &&
      d.find(g, function (e) {
        try {
          return (k = c.ut.PictureFmt.parseDate(a, e, b)), !0;
        } catch (l) {
          return !1;
        }
      });
    k = k || a;
    return f.ParseIsoString(k);
  };
  f.dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  f.daysOfWeek =
    "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
})(_, xfalib);
(function (d, c) {
  c.ut.PictureEngine = c.ut.Class.extend({
    _lookupNext: c.ut.Scanner.lookupNext,
    MAX_XFA_PREC: 8,
    MAX_DBL_DIG: 18,
    MAX_INT_DIG: 10,
    MAX_DBL_WIDTH: 15,
    INTEGRAL_FMT: 0,
    DECIMAL_FMT: 1,
    CURRENCY_FMT: 2,
    PERCENT_FMT: 3,
    parseDate: function (f, a, b) {
      return this._acceptVisitor(
        new c.ut.DateParsingVisitor({
          jsonModel: {
            _sPicture: a,
            _dataString: f,
            _locale: this.jsonModel.locale,
          },
        }),
      );
    },
    formatDate: function (f, a) {
      f = c.ut.DateInfo.Parse(
        f,
        this.jsonModel.locale,
        "undefined" !== typeof a,
      );
      return null == f
        ? null
        : this._acceptVisitor(
            new c.ut.DateFormattingVisitor({
              jsonModel: {
                _sPicture: a,
                _dateInfo: f,
                _locale: this.jsonModel.locale,
              },
            }),
          );
    },
    parseTime: function (f, a) {
      return this._acceptVisitor(
        new c.ut.TimeParsingVisitor({
          jsonModel: { _sPicture: a, _dataString: f },
        }),
      );
    },
    formatTime: function (f, a) {
      f = c.ut.TimeInfo.Parse(f, this.jsonModel.locale);
      return null == f
        ? null
        : this._acceptVisitor(
            new c.ut.TimeFormattingVisitor({
              jsonModel: { _sPicture: a, _timeInfo: f },
            }),
          );
    },
    parseText: function (f, a) {
      return this._acceptVisitor(
        new c.ut.TextParsingVisitor({
          jsonModel: { _sPicture: a, _dataString: f },
        }),
      );
    },
    formatText: function (f, a, b) {
      return this._acceptVisitor(
        new c.ut.TextFormattingVisitor({
          jsonModel: { _sPicture: a, _text: f, relaxed: b },
        }),
      );
    },
    parseNumeric: function (f, a) {
      f = new c.ut.NumParsingVisitor({
        jsonModel: {
          _sPicture: a,
          _dataString: f,
          _locale: this.jsonModel.locale,
        },
      });
      f.parse();
      return f.getResult();
    },
    formatNumeric: function (f, a, b, e, d) {
      b = a;
      e &&
        d &&
        (b = this.getNumberFormat(a, 1, {
          formatOption: "WITH_GROUPINGS",
          precision: this.getNumberPrecision(f),
          width: f.length,
        }));
      return this._acceptVisitor(
        new c.ut.NumFormattingVisitor({
          jsonModel: { _sPicture: b, _locale: this.jsonModel.locale },
          text: f,
        }),
      );
    },
    _acceptVisitor: function (c) {
      this._scanPattern(c);
      return c.getResult();
    },
    _scanPattern: function (c) {
      for (
        var a = 0,
          b = c.getPicture(),
          e = this._lookupNext(b, a, c.acceptPatternChar);
        null != e;

      )
        c.consume(e),
          (a += e.len),
          (e = this._lookupNext(b, a, c.acceptPatternChar));
    },
    _swallow: function (c, a, b) {
      if (d.isEmpty(c) || 0 == b) return c;
      a + b > c.length && (b = a + b - c.length);
      return c.substr(0, a) + c.substr(offset + b);
    },
    _replaceAll: function (c, a, b, e) {
      return c.substr(0, b) + a + c.substr(b + e);
    },
    _skipOver: function (c, a, b) {
      for (var e = b, d; e < c.length; ) {
        d = e;
        if (-1 == a.indexOf(c[d])) break;
        d++;
        e = d;
      }
      return e - b;
    },
    getNumberFormat: function (c, a, b) {
      if (a < this.INTEGRAL_FMT || this.PERCENT_FMT < a) a = this.DECIMAL_FMT;
      var e;
      -1 != (e = c.indexOf("|")) && (c = this._swallow(c, 0, e + 1));
      -1 == (e = c.indexOf(".")) &&
        -1 == (e = c.indexOf("v")) &&
        -1 == (e = c.indexOf("V")) &&
        -1 == (e = c.indexOf("E")) &&
        -1 == (e = c.indexOf(" ")) &&
        -1 == (e = c.indexOf("%")) &&
        (e = c.length);
      e && 1 != this._skipOver(c, "89zZ", e - 1) && (e = c.length);
      var d;
      if (-1 != (d = c.indexOf("z,"))) {
        var f = e;
        var h;
        -1 != (h = c.indexOf(",", d + 2)) && (f = h);
        f = f > d + 2 ? Array(f - d).join("z") : Array(1).join("z");
      } else d = 0;
      h = 0;
      var l = this.MAX_INT_DIG;
      if (a != this.INTEGRAL_FMT) {
        h = b.precision;
        var m = 0 == (h & 128);
        h &= 127;
        127 == h && (h = this._skipOver(c, "89zZ", e + 1));
        l = void 0 != b.width ? b.width : this.MAX_DBL_DIG;
        -1 != c.indexOf("s") && (l += 1);
        -1 != c.indexOf("(") && (l += 1);
        -1 != c.indexOf(")") && (l += 1);
        var p = this._skipOver(c, "89zZ", e + 1);
        0 < h && h < p && (l += p - h);
        if (m && 0 < h && l > h)
          for (
            h <= c.length - 1 - e && (l += c.length - 1 - e - h), m = l - 1;
            m > this.MAX_DBL_WIDTH && !(h <= c.length - 1 - e);
            m--
          )
            h--;
      }
      a == this.CURRENCY_FMT &&
        (-1 != c.indexOf("$") && l++, -1 != c.indexOf(" ") && (l += 1));
      if (a == this.PERCENT_FMT)
        (a = this._skipOver(c, "89zZ", e + 1)),
          (c = this._replaceAll(c, "", a, 0)),
          -1 != c.indexOf("%") && l++;
      else if (a == this.INTEGRAL_FMT || 0 == h)
        (a = this._skipOver(c, "89zZ", e + 1)),
          (c = this._replaceAll(c, "", e, a + 1));
      else if ("WITH_EIGHTS" == b.formatOption) {
        for (; -1 != (a = c.indexOf("z")); ) this._replaceAll(c, "8", a, 1);
        for (; c.Length() - e <= h; ) c = this._replaceAll(c, "8", e + 1, 0);
      } else if (
        "WITH_ZEDS" == b.formatOption &&
        "KEEP_NINES" != b.formatOption
      ) {
        for (; -1 != (a = c.indexOf("9")); ) this._replaceAll(c, "z", a, 1);
        for (; c.Length() - e <= h; ) this._replaceAll(c, "z", e + 1, 0);
      }
      if (f)
        if ("WITHOUT_GROUPINGS" == b.formatOption)
          for (h = d + 1, this._replaceAll(c, "z", h, 1); -1 != h && h < e; )
            (h = c.indexOf(",")), (c = this._replaceAll(c, "z", h, 1));
        else
          "WITH_GROUPINGS" == b.formatOption &&
            ((f = this._replaceAll(f, ",", 0, 1)),
            (l += (l + f.length) / f.length));
      else f = "z";
      for (; c.length < l; ) c = this._replaceAll(c, f, d + 1, 0);
      return c;
    },
    getNumberPrecision: function (c) {
      var a,
        b = -1;
      if (-1 != (a = c.indexOf("."))) {
        for (; a <= c.length; a++) b++;
        return b;
      }
      return 0;
    },
  });
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.FormattingVisitorBase = c.ut.VisitorBase.extend({
    initialize: function () {
      this._buffer = [];
      f._super.initialize.call(this);
    },
    consumeStringWildCard: function (a) {
      this._buffer.push(" ");
    },
    consumeStringLiteral: function (a) {
      this._buffer.push(
        this.jsonModel._sPicture.substr(a.startPos + 1, a.len - 2),
      );
    },
    consumeCharLiteral: function (a) {
      this._buffer.push("" + this.jsonModel._sPicture.charAt(a.startPos));
    },
  }));
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.ParsingVisitorBase = c.ut.VisitorBase.extend({
    initialize: function () {
      this._strLen = this.jsonModel._dataString.length;
      this._strPos = 0;
      f._super.initialize.call(this);
    },
    consumeStringWildCard: function (a) {
      if ("?" == chr) this._strPos < this._strLen && (this._strPos += 1);
      else if ("+" == chr) {
        if (this._strPos >= this._strLen) throw "Mismatch";
        for (this._strPos += 1; this._strPos < this._strLen; )
          this._strPos += 1;
      } else if ("*" == chr)
        for (; this._strPos < this._strLen; ) this._strPos += 1;
    },
    consumeStringLiteral: function (a) {
      for (var b = 0; b < a.len - 2; b++)
        if (
          this.jsonModel._sPicture.charAt(a.startPos + b + 1) !=
          this.jsonModel._dataString.charAt(this._strPos + b)
        )
          throw "Mismatch" + this.jsonModel._sPicture.substr(a.startPos, a.len);
      this._strPos += a.len - 2;
    },
    consumeCharLiteral: function (a) {
      if (
        this.jsonModel._sPicture.charAt(a.startPos) ==
        this.jsonModel._dataString.charAt(this._strPos)
      )
        this._strPos += 1;
      else throw "Mismatch";
    },
  }));
})(_, xfalib);
(function (d, c) {
  var f = c.ut.PictureUtils;
  c.ut.DateFormattingVisitor = c.ut.FormattingVisitorBase.extend({
    consumeSubPattern: function (a) {
      var b = a.len;
      switch (a.patChar) {
        case "D":
          a = this.jsonModel._dateInfo.date.getDate();
          switch (b) {
            case 2:
              a = f.padding(a, 2);
          }
          this._buffer.push(f.convertNumberToLocale(this.jsonModel._locale, a));
          break;
        case "J":
          break;
        case "M":
          a = this.jsonModel._dateInfo.date.getMonth();
          switch (b) {
            case 1:
              this._buffer.push(
                f.convertNumberToLocale(this.jsonModel._locale, a + 1),
              );
              break;
            case 2:
              this._buffer.push(
                f.convertNumberToLocale(
                  this.jsonModel._locale,
                  f.padding(a + 1, 2),
                ),
              );
              break;
            case 3:
              b = f.getLocaleObject(
                this.jsonModel._locale,
                "calendarSymbols.abbrmonthNames",
              );
              this._buffer.push(b[a]);
              break;
            case 4:
              (b = f.getLocaleObject(
                this.jsonModel._locale,
                "calendarSymbols.monthNames",
              )),
                this._buffer.push(b[a]);
          }
          break;
        case "E":
          a = this.jsonModel._dateInfo.date.getDay();
          switch (b) {
            case 1:
              this._buffer.push(a);
              break;
            case 3:
              b = f.getLocaleObject(
                this.jsonModel._locale,
                "calendarSymbols.abbrdayNames",
              );
              this._buffer.push(b[a]);
              break;
            case 4:
              b = f.getLocaleObject(
                this.jsonModel._locale,
                "calendarSymbols.dayNames",
              );
              this._buffer.push(b[a]);
              break;
            default:
              throw "unsupported Picture Clause ";
          }
          break;
        case "e":
          break;
        case "G":
          break;
        case "Y":
          a = this.jsonModel._dateInfo.date.getFullYear();
          switch (b) {
            case 2:
              if (2029 < a || 1930 > a)
                throw "unsupported " + a + " by pattern YY";
              a = f.padding(a % 100, 2);
              break;
            case 4:
              a = f.padding(a, 4);
          }
          this._buffer.push(f.convertNumberToLocale(this.jsonModel._locale, a));
          break;
        case "w":
          break;
        case "W":
          break;
        default:
          throw "Unsupported pattern";
      }
    },
    getResult: function () {
      return this._buffer.join("");
    },
  });
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.TextFormattingVisitor = c.ut.FormattingVisitorBase.extend({
    initialize: function () {
      this._textPos = 0;
      this._relaxed =
        "undefined" === typeof this.jsonModel.relaxed
          ? !0
          : this.jsonModel.relaxed;
      f._super.initialize.call(this);
    },
    consumeSubPattern: function (a) {
      var b = a.patChar;
      a = a.len;
      for (
        var e = 0;
        e < a &&
        (!this._relaxed || this._textPos < this.jsonModel._text.length);
        e++
      )
        switch (b) {
          case "9":
            var d = this.jsonModel._text.charAt(this._textPos++);
            if (!c.ut.PictureUtils.isDigit(d))
              throw "TextFormatting: not a digit as expected";
            this._buffer.push(d);
            break;
          case "A":
            d = this.jsonModel._text.charAt(this._textPos++);
            if (!c.ut.PictureUtils.isLetter(d))
              throw "TextFormatting: not a character as expected";
            this._buffer.push(d);
            break;
          case "O":
          case "0":
            d = this.jsonModel._text.charAt(this._textPos++);
            if (
              "" !== d &&
              !c.ut.PictureUtils.isLetter(d) &&
              !c.ut.PictureUtils.isDigit(d)
            )
              throw "TextFormatting: not a character or digit as expected";
            this._buffer.push(d);
            break;
          case "X":
            d = this.jsonModel._text.charAt(this._textPos++);
            this._buffer.push(d);
            break;
          case "t":
            this._buffer.push("\t");
            break;
          default:
            this._buffer.push(b);
        }
    },
    getResult: function () {
      if (this._textPos < this.jsonModel._text.length)
        throw "TextFormatting: picture clause smaller than input Text";
      return this._buffer.join("");
    },
    acceptPatternChar: function (a) {
      return c.ut.PictureUtils.inString(a, "9AO0Xt");
    },
    consumeCharLiteral: function (a) {
      this._buffer.push("" + this.jsonModel._sPicture.charAt(a.startPos));
      this.jsonModel._sPicture.charAt(a.startPos) ==
        this.jsonModel._text.charAt(a.startPos) && this._textPos++;
    },
  }));
})(_, xfalib);
(function (d, c) {
  c.ut.TimeFormattingVisitor = c.ut.FormattingVisitorBase.extend({
    consumeSubPattern: function (d) {
      var a = d.patChar;
      d = d.len;
      switch (a) {
        case "H":
        case "K":
          var b = this.jsonModel._timeInfo.mHourOfDay;
          "K" == a && (b += 1);
          switch (d) {
            case 1:
              this._buffer.push(b);
              break;
            case 2:
              this._buffer.push(c.ut.PictureUtils.padding(b, 2));
          }
          break;
        case "M":
          a = this.jsonModel._timeInfo.mMinuteOfHour;
          switch (d) {
            case 1:
              this._buffer.push(a);
              break;
            case 2:
              this._buffer.push(c.ut.PictureUtils.padding(a, 2));
          }
          break;
        case "S":
          a = this.jsonModel._timeInfo.mSecondOfMinute;
          switch (d) {
            case 1:
              this._buffer.push(a);
              break;
            case 2:
              this._buffer.push(c.ut.PictureUtils.padding(a, 2));
          }
          break;
        case "F":
          this._buffer.push(
            c.ut.PictureUtils.padding(
              this.jsonModel._timeInfo.mThousandthOfSecond,
              3,
            ),
          );
          break;
        default:
          throw "Unsupported pattern";
      }
    },
    getResult: function () {
      return this._buffer.join("");
    },
  });
})(_, xfalib);
(function (d, c) {
  var f = c.ut.PictureUtils,
    a = (c.ut.NumFormattingVisitor = c.ut.FormattingVisitorBase.extend({
      initialize: function (b) {
        a._super.initialize.call(this);
        this._textPos = 0;
        this._mbSignAddedToOutput = this._mbDigitAddedToOutput = !1;
        this._nScannedPatternDigit = 0;
        this._mbRadixSeen = !1;
        this._pictureDesc = new c.ut.NumPictureDesc({
          jsonModel: { _sPicture: this.jsonModel._sPicture },
        });
        this.jsonModel._sPicture = this._pictureDesc.getPicture();
        this._numberInfo = this._pictureDesc.parseNumberInfo(b.text);
        this._mbNegative = this._numberInfo.isNegative;
        this._msText = this._numberInfo.msText;
        this._leadingPadding = this._numberInfo.padding;
        this._mNumberSymbols = c.ut.PictureUtils.getLocaleObject(
          this.jsonModel._locale,
          "numberSymbols",
        );
        this._mCurrencySymbols = c.ut.PictureUtils.getLocaleObject(
          this.jsonModel._locale,
          "currencySymbols",
        );
      },
      _checkAndAddDecimalPoint: function (a) {
        this._mAddRadix &&
          (this._buffer.push(this._fmtStr(this._mNumberSymbols.decimal, a)),
          (this._mAddRadix = !1));
      },
      consumeSubPattern: function (a) {
        var b = a.patChar;
        a = a.len;
        switch (b) {
          case "9":
          case "8":
          case "Z":
          case "z":
            for (
              this._mbSignAddedToOutput || this._ensureSignIsAdded();
              0 < a--;

            )
              if (this._mbRadixSeen)
                this._nScannedPatternDigit++ < this._numberInfo.fractionDigit
                  ? ((d = this._msText.charAt(this._textPos++)),
                    this._ensureCharIsDigit(d),
                    this._checkAndAddDecimalPoint(),
                    this._buffer.push(
                      f.convertNumberToLocale(this.jsonModel._locale, d),
                    ),
                    (this._mbDigitAddedToOutput = !0))
                  : "9" == b || "Z" == b
                    ? (this._checkAndAddDecimalPoint(),
                      this._buffer.push(
                        this._matchChr(this._mNumberSymbols.zero),
                      ))
                    : "8" == b &&
                      ((d = this._msText.charAt(this._textPos++)),
                      "" != d &&
                        this._ensureCharIsDigit(d) &&
                        (this._checkAndAddDecimalPoint(),
                        this._buffer.push(
                          f.convertNumberToLocale(this.jsonModel._locale, d),
                        ),
                        (this._mbDigitAddedToOutput = !0)));
              else if (this._leadingPadding > this._nScannedPatternDigit++) {
                var d = null;
                this._mbDigitAddedToOutput
                  ? (d = this._mNumberSymbols.zero)
                  : "9" == b || "8" == b
                    ? ((d = this._mNumberSymbols.zero),
                      (this._mbDigitAddedToOutput = !0))
                    : "Z" == b && (d = " ");
                d && this._buffer.push(this._matchChr(d));
              } else
                (d = this._msText.charAt(this._textPos++)),
                  this._ensureCharIsDigit(d),
                  this._buffer.push(
                    f.convertNumberToLocale(this.jsonModel._locale, d),
                  ),
                  (this._mbDigitAddedToOutput = !0);
            break;
          case "E":
            this._buffer.push("E");
            this._buffer.push("" + this._numberInfo.shift);
            break;
          case "C":
            this._buffer.push(
              this._mbNegative
                ? c.ut.NumPictureDesc.gsCR
                : c.ut.NumPictureDesc.gsDSP,
            );
            break;
          case "c":
            this._mbNegative && this._buffer.push(c.ut.NumPictureDesc.gsCR);
            break;
          case "D":
            this._buffer.push(
              this._mbNegative
                ? c.ut.NumPictureDesc.gsDB
                : c.ut.NumPictureDesc.gsDSP,
            );
            break;
          case "d":
            this._mbNegative && this._buffer.push(c.ut.NumPictureDesc.gsDB);
            break;
          case "S":
          case "s":
            this._mbNegative
              ? this._buffer.push(this._fmtStr(this._mNumberSymbols.minus))
              : "S" == b && this._buffer.push(this._matchChr(" "));
            break;
          case "V":
          case ".":
          case "v":
            this._textPos < this._msText.length &&
              "." == this._msText.charAt(this._textPos) &&
              this._textPos++;
            if ("V" == b || "." == b) this._mAddRadix = !0;
            this._mbRadixSeen = !0;
            this._nScannedPatternDigit = 0;
            break;
          case 65292:
          case ",":
            for (; 0 < a--; )
              this._mbDigitAddedToOutput &&
                this._buffer.push(this._fmtStr(this._mNumberSymbols.grouping)),
                (this._mbCommaSeen = !0);
            break;
          case 65284:
          case "$":
            for (; 0 < a--; )
              this._buffer.push(this._fmtStr(this._mCurrencySymbols.symbol));
            break;
          case 65285:
          case "%":
            for (; 0 < a--; )
              this._buffer.push(this._fmtStr(this._mNumberSymbols.percent));
            break;
          case 65288:
          case 65289:
          case "(":
          case ")":
            this._buffer.push(this._matchChr(this._mbNegative ? b : " "));
        }
      },
      _ensureCharIsDigit: function (a) {
        if ("0" > a || "9" < a)
          throw "Nuberic Formatting: not a digit as expected " + a;
      },
      _fmtStr: function (a) {
        return a;
      },
      _matchStr: function (a) {
        return a;
      },
      _matchChr: function (a) {
        return a;
      },
      _ensureSignIsAdded: function () {
        !this._mbNegative ||
          this._mbDigitAddedToOutput ||
          this._pictureDesc.hasSign ||
          (this._buffer.push(this._mNumberSymbols.minus),
          (this._mbSignAddedToOutput = !0));
      },
      getResult: function () {
        return this._buffer.join("");
      },
      acceptPatternChar: function (a) {
        return c.ut.PictureUtils.inString(a, "(%$,.)89BCDERSVZbcdrsvzt");
      },
    }));
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.TimeParsingVisitor = c.ut.ParsingVisitorBase.extend({
    initialize: function () {
      this._timeInfo = new c.ut.TimeInfo();
      f._super.initialize.call(this);
    },
    consumeSubPattern: function (a) {
      var b = a.patChar;
      a = a.len;
      var e = this._strPos,
        c = a;
      this._assert(e + a <= this.jsonModel._dataString.length, "Mismatch");
      switch (b) {
        case "h":
          if (
            -1 != this._timeInfo.mHourOfMeriDiem ||
            -1 != this._timeInfo.mHourOfDay
          )
            throw "ambiguity time string";
          b = -1;
          switch (a) {
            case 1:
              a = this.parseIntAggressive(this.jsonModel._dataString, e, 2);
              b = a.value;
              c = a.len;
              break;
            case 2:
              b = this.parseIntExact(this.jsonModel._dataString, e, 2);
          }
          this._timeInfo.mHourOfMeriDiem = b - 1;
          this._assert(
            0 <= this._timeInfo.mHourOfMeriDiem &&
              11 >= this._timeInfo.mHourOfMeriDiem,
            "Invalid Hour Of MeriDiem value.",
          );
          break;
        case "k":
          if (
            -1 != this._timeInfo.mHourOfMeriDiem ||
            -1 != this._timeInfo.mHourOfDay
          )
            throw "ambiguity time string";
          b = -1;
          switch (a) {
            case 1:
              a = this.parseIntAggressive(this.jsonModel._dataString, e, 2);
              b = a.value;
              c = a.len;
              break;
            case 2:
              b = this.parseIntExact(this.jsonModel._dataString, e, 2);
          }
          this._timeInfo.mHourOfMeriDiem = b;
          this._assert(
            0 <= this._timeInfo.mHourOfMeriDiem &&
              11 >= this._timeInfo.mHourOfMeriDiem,
            "Invalid hour of meriDiem value.",
          );
          break;
        case "H":
          if (
            -1 != this._timeInfo.mHourOfMeriDiem ||
            -1 != this._timeInfo.mHourOfDay
          )
            throw "ambiguity time string";
          b = -1;
          switch (a) {
            case 1:
              a = this.parseIntAggressive(this.jsonModel._dataString, e, 2);
              b = a.value;
              c = a.len;
              break;
            case 2:
              b = this.parseIntExact(this.jsonModel._dataString, e, 2);
          }
          this._timeInfo.mHourOfDay = b;
          this._assert(
            0 <= this._timeInfo.mHourOfDay && 23 >= this._timeInfo.mHourOfDay,
            "Invalid hour of day value.",
          );
          break;
        case "K":
          if (
            -1 != this._timeInfo.mHourOfMeriDiem ||
            -1 != this._timeInfo.mHourOfDay
          )
            throw "ambiguity time string";
          b = -1;
          switch (a) {
            case 1:
              a = this.parseIntAggressive(this.jsonModel._dataString, e, 2);
              b = a.value;
              c = a.len;
              break;
            case 2:
              b = this.parseIntExact(this.jsonModel._dataString, e, 2);
          }
          this._timeInfo.mHourOfDay = b - 1;
          this._assert(
            0 <= this._timeInfo.mHourOfDay && 23 >= this._timeInfo.mHourOfDay,
            "Invalid hour of day value.",
          );
          break;
        case "M":
          if (-1 != this._timeInfo.mMinuteOfHour) throw "ambiguity time string";
          b = -1;
          switch (a) {
            case 1:
              a = this.parseIntAggressive(this.jsonModel._dataString, e, 2);
              b = a.value;
              c = a.len;
              break;
            case 2:
              b = this.parseIntExact(this.jsonModel._dataString, e, 2);
          }
          this._timeInfo.mMinuteOfHour = b;
          this._assert(
            0 <= this._timeInfo.mMinuteOfHour &&
              59 >= this._timeInfo.mMinuteOfHour,
            "Invalid minute of hour.",
          );
          break;
        case "S":
          if (-1 != this._timeInfo.mSecondOfMinute)
            throw "ambiguity time string";
          b = -1;
          switch (a) {
            case 1:
              a = this.parseIntAggressive(this.jsonModel._dataString, e, 2);
              b = a.value;
              c = a.len;
              break;
            case 2:
              b = this.parseIntExact(this.jsonModel._dataString, e, 2);
          }
          this._timeInfo.mSecondOfMinute = b;
          this._assert(
            0 <= this._timeInfo.mSecondOfMinute &&
              59 >= this._timeInfo.mSecondOfMinute,
            "Invalid second of minute.",
          );
          break;
        case "F":
          this._assert(3 == a, "Invalid pattern F.");
          this._timeInfo.mThousandthOfSecond = this.parseIntExact(
            this.jsonModel._dataString,
            e,
            3,
          );
          this._assert(
            0 <= this._timeInfo.mThousandthOfSecond &&
              999 >= this._timeInfo.mThousandthOfSecond,
            "Invalid thousand of second.",
          );
          break;
        default:
          throw "Unsupported pattern";
      }
      this._strPos += c;
    },
    parseIntAggressive: c.ut.PictureUtils.parseIntAggressive,
    parseIntExact: c.ut.PictureUtils.parseIntExact,
    getResult: function () {
      return this._timeInfo.getISOTime();
    },
    getTimeInfo: function () {
      return this._timeInfo;
    },
    _assert: function (a, b) {
      if (!a) throw b;
    },
  }));
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.TextParsingVisitor = c.ut.ParsingVisitorBase.extend({
    initialize: function () {
      f._super.initialize.call(this);
      this._buffer = [];
    },
    consumeSubPattern: function (a) {
      var b = a.patChar;
      a = a.len;
      for (var e = 0; e < a; e++)
        switch (b) {
          case "9":
            var d = this.jsonModel._dataString.charAt(this._strPos++);
            if (!c.ut.PictureUtils.isDigit(d))
              throw "TextParsing: not a digit as expected";
            this._buffer.push(d);
            break;
          case "A":
            d = this.jsonModel._dataString.charAt(this._strPos++);
            if (!c.ut.PictureUtils.isLetter(d))
              throw "TextParsing: not a character as expected";
            this._buffer.push(d);
            break;
          case "O":
          case "0":
            d = this.jsonModel._dataString.charAt(this._strPos++);
            if (!c.ut.PictureUtils.isLetterOrDigit(d))
              throw "TextParsing: not a character or digit as expected";
            this._buffer.push(d);
            break;
          case "X":
            d = this.jsonModel._dataString.charAt(this._strPos++);
            this._buffer.push(d);
            break;
          case "t":
            if ("\t" == this.jsonModel._dataString.charAt(this._strPos++))
              this._buffer.push("\t");
            else throw "TextParsing: not a Tab as expected";
            break;
          default:
            if (this.jsonModel._dataString.charAt(this._strPos++) == b)
              this._buffer.push(b);
            else throw "TextParsing: not '" + b + "' as expected";
        }
    },
    getResult: function () {
      if (this._strPos < this.jsonModel._dataString.length)
        throw "TextParsing: picture clause smaller than input Text";
      return this._buffer.join("");
    },
    acceptPatternChar: function (a) {
      return c.ut.PictureUtils.inString(a, "9AO0Xt");
    },
  }));
})(_, xfalib);
(function (d, c) {
  c.ut.NumParsingVisitor = c.ut.ParsingVisitorBase.extend({
    initialize: function (d) {
      this._pictureDesc = new c.ut.NumPictureDesc({
        jsonModel: { _sPicture: this.jsonModel._sPicture },
      });
      this.jsonModel._sPicture = this._pictureDesc.getPicture();
      this._buffer = [];
      this._strPos = 0;
      this._mbSignSeen =
        this._mbDigitSeen =
        this._mbNegative =
        this._hasRadix =
          !1;
      this._mBacktrack = null;
      this._mbExponSeen = this._hasPercent = !1;
      this._mNumberSymbols = c.ut.PictureUtils.getLocaleObject(
        this.options._locale,
        "numberSymbols",
      );
      this._mCurrencySymbols = c.ut.PictureUtils.getLocaleObject(
        this.options._locale,
        "currencySymbols",
      );
    },
    _lookupNext: c.ut.Scanner.lookupNext,
    parse: function () {
      for (var c = 0; ; ) {
        try {
          for (
            var a = this._lookupNext(
              this.jsonModel._sPicture,
              c,
              this.acceptPatternChar,
            );
            null != a;

          )
            this.consume(a),
              (c += a.len),
              (a = this._lookupNext(
                this.jsonModel._sPicture,
                c,
                this.acceptPatternChar,
              ));
        } catch (b) {
          if (this._mBacktrack) {
            c = this._mBacktrack.patPos;
            this._buffer.length = 0;
            this._strPos = this._mBacktrack.strPos;
            this._mbDigitSeen = !1;
            this._mBacktrack = null;
            continue;
          }
        }
        break;
      }
    },
    consumeSubPattern: function (d) {
      var a = d.patChar,
        b = d.len;
      switch (a) {
        case "9":
        case "8":
        case "Z":
        case "z":
          for (; 0 < b--; ) {
            if (this._mbDigitSeen)
              if (
                ((e = this.jsonModel._dataString.charAt(this._strPos)),
                c.ut.PictureUtils.isDigit(e))
              )
                this._buffer.push(e);
              else {
                if ("z" != a) throw "TextParsing: not a digit as expected";
              }
            else {
              var e = this.jsonModel._dataString.charAt(this._strPos);
              "-" == e &&
                ((this._mbNegative = !0),
                (e = this.jsonModel._dataString.charAt(++this._strPos)));
              if ("9" == a || "8" == a) {
                if (!c.ut.PictureUtils.isDigit(e))
                  throw "TextParsing: not a digit as expected";
                this._buffer.push(e);
                this._mbDigitSeen = !0;
              } else if ("Z" == a)
                if (c.ut.PictureUtils.isDigit(e))
                  this._buffer.push(e), (this._mbDigitSeen = !0);
                else {
                  if (" " != e)
                    throw "TextParsing: not a digit or space as expected";
                }
              else if (c.ut.PictureUtils.isDigit(e))
                this._buffer.push(e),
                  (this._mbDigitSeen = !0),
                  (this._mBacktrack = {
                    patPos: d.patPos + d.len - b,
                    strPos: this._strPos,
                  });
              else throw "TextParsing: not a digit or space as expected";
            }
            ++this._strPos;
          }
          break;
        case "V":
        case "v":
        case ".":
          if (this._matchStr(this._mNumberSymbols.decimal))
            (this._hasRadix = !0),
              this._buffer.push("."),
              (this._mbDigitSeen = !0);
          else throw "TextParsing: not a radix as expected";
          break;
        case "E":
          if (this._matchStr("E"))
            for (
              this._buffer.push("E"),
                this._matchStr("+") ||
                  (this._matchStr("-") && this.jsonModel._buffer.push("-")),
                d = this.jsonModel._dataString.length;
              this._strPos < d &&
              c.ut.PictureUtils.isDigit(
                this.jsonModel._dataString.charAt(this._strPos),
              );

            )
              this._buffer.push(
                this.jsonModel._dataString.charAt(this._strPos++),
              );
          break;
        case "C":
          if (this._matchStr(c.ut.NumPictureDesc.gsCR)) this._mbNegative = !0;
          else if (!this._matchStr(c.ut.NumPictureDesc.gsDSP))
            throw "TextParsing: not a CR as expected";
          break;
        case "c":
          this._matchStr(c.ut.NumPictureDesc.gsCR) && (this._mbNegative = !0);
          break;
        case "D":
          if (this._matchStr(c.ut.NumPictureDesc.gsDB)) this._mbNegative = !0;
          else if (!this._matchStr(c.ut.NumPictureDesc.gsDSP))
            throw "TextParsing: not a CR as expected";
          break;
        case "d":
          this._matchStr(c.ut.NumPictureDesc.gsDB) && (this._mbNegative = !0);
          break;
        case "S":
          if (this._matchStr(this._mNumberSymbols.negative, !1))
            this._mbNegative = !0;
          else if (!this._matchStr(" "))
            throw "TextParsing: not a CR as expected";
          break;
        case "s":
          this._matchStr(this._mNumberSymbols.negative, !1) &&
            (this._mbNegative = !0);
          break;
        case 65292:
        case ",":
          for (; 0 < b--; )
            if (!this._matchStr(this._mNumberSymbols.grouping, !1))
              throw "TextParsing: not a grouping symbol as expected";
          break;
        case 65284:
        case "$":
          for (; 0 < b--; )
            if (!this._matchStr(this._mCurrencySymbols.symbol, !1))
              throw "TextParsing: not a grouping symbol as expected";
          break;
        case 65285:
        case "%":
          for (; 0 < b--; )
            if (!this._matchStr(this._mNumberSymbols.percent, !1))
              throw "TextParsing: not a grouping symbol as expected";
          this._hasPercent = !0;
          break;
        case 65288:
        case 65289:
        case "(":
        case ")":
          if (this._matchStr(a, !1)) this._mbNegative = !0;
          else if (!this._matchStr(" "))
            throw "TextParsing: not parentesis as expected";
          break;
        case "t":
          for (; 0 < b--; ) this._matchStr("\t", !1);
      }
    },
    getResult: function () {
      var c = this._buffer.join("");
      if (this._hasPercent) {
        var a = [];
        c = Number(c).toString();
        var b = c.indexOf("."),
          e = b - 2;
        0 == e
          ? a.push("0")
          : -1 == e
            ? a.push("0.0")
            : -3 == e && (e = c.length - 2);
        for (var d = 0; d < c.length; d++)
          d == e && a.push("."), d != b && a.push(c.charAt(d));
        c = a.join("");
      }
      c = Number(c);
      this._mbNegative && (c = -c);
      return c.toString();
    },
    _matchStr: function (d) {
      return c.ut.PictureUtils.matchString(
        this.jsonModel._dataString,
        this._strPos,
        d,
      )
        ? ((this._strPos += d.length), !0)
        : !1;
    },
    acceptPatternChar: function (d) {
      return c.ut.PictureUtils.inString(d, "(%$,.)89BCDERSVZbcdrsvzt");
    },
  });
})(_, xfalib);
(function (d, c) {
  var f = (c.ut.DateParsingVisitor = c.ut.ParsingVisitorBase.extend({
    initialize: function () {
      this._dateInfo = new c.ut.DateInfo({ isParsingCall: !0 });
      this._dayOfMonth = this._monthOfYear = this._yearOfEra = null;
      f._super.initialize.call(this);
    },
    consumeSubPattern: function (a) {
      var b = a.patChar,
        e = a.len;
      a = this._strPos;
      var g = e;
      this._assert(a + e <= this.jsonModel._dataString.length, "Mismatch");
      switch (b) {
        case "D":
          switch (e) {
            case 1:
              g = c.ut.PictureUtils.parseIntAggressive(
                this.jsonModel._dataString,
                a,
                2,
              );
              this._dayOfMonth = g.value;
              g = g.len;
              break;
            case 2:
              this._dayOfMonth = c.ut.PictureUtils.parseIntExact(
                this.jsonModel._dataString,
                a,
                2,
              );
          }
          this._assert(
            31 >= this._dayOfMonth && 0 < this._dayOfMonth,
            "Invalid date string1",
          );
          break;
        case "J":
          break;
        case "M":
          b = "";
          switch (e) {
            case 1:
              g = c.ut.PictureUtils.parseIntAggressive(
                this.jsonModel._dataString,
                a,
                2,
              );
              this._monthOfYear = g.value;
              g = g.len;
              break;
            case 2:
              this._monthOfYear = c.ut.PictureUtils.parseIntExact(
                this.jsonModel._dataString,
                a,
                2,
              );
              break;
            case 3:
              b = "calendarSymbols.abbrmonthNames";
              break;
            case 4:
              b = "calendarSymbols.monthNames";
          }
          if (b) {
            e = c.ut.PictureUtils.getHashOfLocaleObject(
              this.jsonModel._locale,
              b,
            );
            var f = this.jsonModel._dataString.toLowerCase(),
              h = 0,
              l = "";
            for (
              g = 0;
              a + g < f.length &&
              !((h += (g + 1) * f.charCodeAt(a + g)),
              (l += f.charAt(a + g)),
              g++,
              e[h] && -1 < e[h].indexOf(l));

            );
            this._monthOfYear =
              d
                .map(
                  c.ut.PictureUtils.getLocaleObject(this.jsonModel._locale, b),
                  function (a) {
                    return a.toLowerCase();
                  },
                )
                .indexOf(l) + 1;
          }
          this._assert(
            12 >= this._monthOfYear && 0 < this._monthOfYear,
            "Invalid date string2",
          );
          break;
        case "E":
          b = "";
          switch (e) {
            case 1:
              g = 1;
              break;
            case 3:
              b = "calendarSymbols.abbrdayNames";
              break;
            case 4:
              b = "calendarSymbols.dayNames";
              break;
            default:
              throw "unsupported Picture Clause ";
          }
          if (b)
            for (
              e = c.ut.PictureUtils.getHashOfLocaleObject(
                this.jsonModel._locale,
                b,
              ),
                g = 0,
                f = this.jsonModel._dataString.toLowerCase(),
                h = 0,
                l = "";
              a + g < f.length &&
              !((h += (g + 1) * f.charCodeAt(a + g)),
              (l += f.charAt(a + g)),
              g++,
              e[h] && -1 < e[h].indexOf(l));

            );
          break;
        case "e":
          break;
        case "G":
          break;
        case "Y":
          switch (e) {
            case 2:
              this._yearOfEra = c.ut.PictureUtils.parseIntExact(
                this.jsonModel._dataString,
                a,
                2,
              );
              this._yearOfEra += 2e3;
              2029 <= this._yearOfEra && (this._yearOfEra -= 100);
              break;
            case 4:
              this._yearOfEra = c.ut.PictureUtils.parseIntExact(
                this.jsonModel._dataString,
                a,
                4,
              );
          }
          this._assert(
            9999 >= this._yearOfEra && 0 <= this._yearOfEra,
            "Invalid date string3",
          );
          break;
        case "w":
          break;
        case "W":
          break;
        default:
          throw "Unsupported pattern";
      }
      this._yearOfEra &&
        this._monthOfYear &&
        this._dayOfMonth &&
        this._dateInfo.validate(
          this._yearOfEra,
          this._monthOfYear,
          this._dayOfMonth,
        );
      this._strPos += g;
    },
    getDate: function () {
      return this._dateInfo.date;
    },
    getResult: function () {
      if (this._strPos < this.jsonModel._dataString.length)
        throw "DateParsing: picture clause smaller than input Date";
      return this._dateInfo.getISODate();
    },
    _assert: function (a, b) {
      if (!a) throw b;
    },
  }));
})(_, xfalib);
(function (d, c, f) {
  f.ut.LocalizationUtil = f.ut.Class.extend({
    getLocalizedMessage: function (a, b, e) {
      e &&
        (b = b.replace(/{(\d+)}/g, function (a, b) {
          return "undefined" != typeof e[b] ? e[b] : a;
        }));
      var c = "";
      a && (c += " [" + a + "]");
      return c + ("  " + b + "\r\n");
    },
  });
})(_, $, xfalib);
(function (d, c, f) {
  f.view.util.TextMetrics = {
    xfaUtil: f.ut.XfaUtil.prototype,
    ERROR_MARGIN: 1,
    $measureEl: null,
    initialize: function (a) {
      a
        ? (this.$measureEl = a)
        : ((a = c("\x3cdiv\x3e\x3c/div\x3e")),
          a.attr("id", "textMetrics"),
          this.xfaUtil.$css(a.get(0), {
            left: -1e3,
            top: -1e3,
            position: "absolute",
            visibility: "hidden",
          }),
          (this.$measureEl = a),
          c("body").append(this.$measureEl));
    },
    measureExtent: function (a, b) {
      a += " ";
      this.$measureEl || this.initialize();
      b = b || {};
      var e = {},
        d = c(b.refEl || "\x3cdiv\x3e\x3c/div\x3e"),
        k = d.get(0);
      e.fontSize = d.css("fontSize") || b["font-size"] || b.fontSize;
      e.fontStyle = d.css("fontStyle") || b["font-style"] || b.fontStyle;
      e.fontWeight = d.css("fontWeight") || b["font-weight"] || b.fontWeight;
      e.fontFamily = d.css("fontFamily") || b["font-family"] || b.fontFamily;
      e.lineHeight = k.style.lineHeight || b["line-height"] || b.lineHeight;
      e.letterSpacing =
        d.css("letterSpacing") || b["letter-spacing"] || b.letterSpacing;
      e.whiteSpace =
        d.css("whiteSpace") || b["white-space"] || b.whiteSpace || "pre-wrap";
      c.browser.mozilla && d.is("textarea") && (e.whiteSpace = "pre-wrap");
      e.wordBreak =
        d.css("wordBreak") || b["word-break"] || b.wordBreak || "break-all";
      e.wordWrap =
        d.css("wordWrap") || b["word-wrap"] || b.wordWrap || "break-word";
      e.width = this._elWidth(k, b);
      e.height = this._elHeight(k, b);
      e.minWidth = this._elMinWidth(k, b);
      e.minHeight = this._elMinHeight(k, b);
      e.maxWidth = this._elMaxWidth(k, b);
      e.maxHeight = this._elMaxHeight(k, b);
      this.xfaUtil.$css(this.$measureEl.get(0), e);
      "text/html" === b.contentType
        ? b.skipXSSProtection
          ? this.$measureEl.html(a)
          : this.$measureEl.html(f.ut.XfaUtil.prototype.encodeScriptableTags(a))
        : ((a = a
            .replaceAll("\n\r", "\n")
            .replaceAll("\r\n", "\n")
            .replaceAll("\r", "\n")),
          this.$measureEl.text(a));
      a = this.$measureEl.width();
      e = this.$measureEl.height();
      if (a == Math.ceil(b.width) || a == Math.floor(b.width)) a = b.width;
      else if (b.maxWidth > a || (a > b.minWidth > 0 && 0 > (b.maxWidth || -1)))
        a += 1;
      e == Math.ceil(b.height) || e == Math.floor(b.height)
        ? (e = b.height)
        : d.is("textarea") &&
          (b.maxHeight > e ||
            (e > b.minHeight > 0 && 0 > (b.maxHeight || -1))) &&
          (e += 1);
      this.$measureEl.empty();
      return { width: a, height: e };
    },
    _elWidth: function (a, b) {
      return b.minWidth && -1 < b.minWidth
        ? "auto"
        : b.maxWidth && -1 < b.maxWidth
          ? "auto"
          : b.width || "auto";
    },
    _elHeight: function (a, b) {
      return "text/html" === b.contentType || b.isDraw
        ? "auto"
        : c(a).is("textarea")
          ? b.minHeight && -1 < b.minHeight
            ? "auto"
            : b.maxHeight && -1 < b.maxHeight
              ? "auto"
              : b.height || "auto"
          : b.height || "auto";
    },
    _elMinWidth: function (a, b) {
      return b.minWidth && -1 < b.minWidth ? b.minWidth : "0";
    },
    _elMinHeight: function (a, b) {
      return b.minHeight && -1 < b.minHeight ? b.minHeight : "0";
    },
    _elMaxWidth: function (a, b) {
      return b.maxWidth && -1 < b.maxWidth ? b.maxWidth : "none";
    },
    _elMaxHeight: function (a, b) {
      return b.maxHeight && -1 < b.maxHeight ? b.maxHeight : "none";
    },
    _destroy: function () {
      c("#textMetrics").remove();
      this.$measureEl = null;
    },
  };
})(_, $, xfalib);
(function (d) {
  d.alertBox = {
    verticalOffset: -75,
    horizontalOffset: 0,
    repositionOnResize: !0,
    overlayOpacity: 0.01,
    overlayColor: "#FFF",
    draggable: !1,
    dialogClass: null,
    imageDirectory: "..",
    images: [
      "A_Warning_Lg_N.png",
      "A_Alert2_Lg_N.png",
      "C_QuestionBubble_Xl_N.png",
      "A_InfoBlue_32x32_N.png",
    ],
    alert: function (c, d, a, b) {
      this._show(c, a, d, null, "OK", function (a) {
        b && b(a);
      });
    },
    okCancel: function (c, d, a, b) {
      this._show(c, a, d, null, "OK-Cancel", function (a) {
        b && b(a);
      });
    },
    yesNo: function (c, d, a, b) {
      this._show(c, a, d, null, "Yes-No", function (a) {
        b && b(a);
      });
    },
    yesNoCancel: function (c, d, a, b) {
      this._show(c, a, d, null, "Yes-No-Cancel", function (a) {
        b && b(a);
      });
    },
    _createBox: function (c, f, a) {
      var b = this;
      d("#" + c).after("\x3cdiv id\x3d'msgBox_panel'\x3e");
      _.each(f.split("-"), function (e, c) {
        var f = xfalib.locale.Strings[e.toLowerCase()]
          ? xfalib.locale.Strings[e.toLowerCase()]
          : e;
        d("#msgBox_panel").append(
          "\x3cinput type\x3d'button' value\x3d'" +
            f +
            "' id \x3d 'msgBox_" +
            e +
            "' class\x3dmsgbox_input /\x3e",
        );
        d("#msgBox_" + e).click(function () {
          b._hide();
          a(!c);
        });
        c || d("msgBox_" + e).focus();
      });
    },
    _show: function (c, f, a, b, e, g) {
      this._hide();
      this._overlay("show");
      d("BODY").append(
        '\x3cdiv id\x3d"msgBox_container"\x3e\x3ch1 id\x3d"msgBox_title"\x3e\x3c/h1\x3e\x3cdiv id\x3d"msgBox_content"\x3e\x3cdiv id\x3d"msgBox_message"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e',
      );
      this.dialogClass &&
        d("#msgBox_container").addClass(d.alertBox.dialogClass);
      d("#msgBox_container").css({
        position: "absolute",
        zIndex: 99999,
        padding: 0,
        margin: 0,
      });
      d("#msgBox_title").text(f);
      d("#msgBox_content").addClass("msgBoxType" + c);
      a = xfalib.ut.XfaUtil.prototype.encodeScriptableTags(
        a.replace(/\n/g, "\x3cbr /\x3e"),
      );
      d("#msgBox_message").html(a);
      d("#msgBox_container").css({
        minWidth: d("#msgBox_container").outerWidth(),
        maxWidth: d("#msgBox_container").outerWidth(),
      });
      this._reposition();
      this._maintainPosition(!0);
      this._createBox("msgBox_message", e, g);
    },
    _hide: function () {
      d("#msgBox_container").remove();
      this._overlay("hide");
      this._maintainPosition(!1);
    },
    _overlay: function (c) {
      switch (c) {
        case "show":
          this._overlay("hide");
          d("BODY").append('\x3cdiv id\x3d"msgBox_overlay"\x3e\x3c/div\x3e');
          d("#msgBox_overlay").css({
            position: "absolute",
            zIndex: 99998,
            top: "0px",
            left: "0px",
            width: "100%",
            height: d(document).height(),
            background: this.overlayColor,
            opacity: this.overlayOpacity,
          });
          break;
        case "hide":
          d("#msgBox_overlay").remove();
      }
    },
    _reposition: function () {
      var c = d(window).height() / xfalib.ut.XfaUtil.prototype.formScaleFactor,
        f = d(window).width() / xfalib.ut.XfaUtil.prototype.formScaleFactor,
        a = d(window).scrollTop() / xfalib.ut.XfaUtil.prototype.formScaleFactor,
        b =
          d(window).scrollLeft() / xfalib.ut.XfaUtil.prototype.formScaleFactor;
      c =
        c / 2 - d("#msgBox_container").outerHeight() / 2 + this.verticalOffset;
      f =
        f / 2 - d("#msgBox_container").outerWidth() / 2 + this.horizontalOffset;
      0 > c && (c = 0);
      0 > f && (f = 0);
      d.browser.msie && 6 >= parseInt(d.browser.version) && (c += a);
      d("#msgBox_container").css({ top: c + a + "px", left: f + b + "px" });
      d("#msgBox_overlay").height(d(document).height());
    },
    _maintainPosition: function (c) {
      if (this.repositionOnResize)
        switch (c) {
          case !0:
            d(window).on("resize", this._reposition);
            break;
          case !1:
            d(window).off("resize", this._reposition);
        }
    },
  };
})($);
(function (d, c, f) {
  f.view.util.HtmlUtil = {
    getHTMLSupportedAttr: function (a, b) {
      try {
        return a[b];
      } catch (e) {}
    },
    elementSupportsAttribute: function (a, b) {
      a = document.createElement(a);
      if (b in a) return c(a).remove(), !0;
      c(a).remove();
      return !1;
    },
  };
})(_, $, xfalib);
(function (d, c, f) {
  f.view.util.Styles = {
    xfaUtil: f.ut.XfaUtil.prototype,
    _deviceResolution: 144,
    _in2mmFactor: 25.4,
    _pdfResolution: 72,
    getStyleForEdge: function (a, b, e) {
      var c = {
        raised: "outset",
        dashDot: "dashed",
        dashDotDot: "dashed",
        dashed: "dashed",
        dotted: "dotted",
        embossed: "groove",
        etched: "inset",
        lowered: "ridge",
        solid: "solid",
      };
      if (
        a &&
        "hidden" != a.jsonModel.presence &&
        "invisible" != a.jsonModel.presence
      ) {
        e["border" + b + "width"] =
          this._subPixelValue(this._convertToPx(a.getAttribute("thickness"))) ||
          "1px";
        if (
          a.getElement("color") &&
          "" != a.getElement("color").getAttribute("value")
        ) {
          var d = a.getElement("color").getAttribute("value");
          e["border" + b + "color"] = "rgb(" + d + ")";
        } else e["border" + b + "color"] = "rgb(0,0,0)";
        e["border" + b + "style"] = c[a.getAttribute("stroke")] || "solid";
      } else return (e["border" + b + "width"] = "0px"), 1;
    },
    getStyleForBorder: function (a) {
      if (a) {
        var b = a.getElement("edge", 0, !0),
          e = a.getElement("edge", 1, !0),
          c = a.getElement("edge", 2, !0),
          d = a.getElement("edge", 3, !0);
        if (b || e || c || d) {
          a = {};
          var f = this.getStyleForEdge(b, "-top-", a);
          e = this.getStyleForEdge(e || b, "-right-", a);
          c = this.getStyleForEdge(c || b, "-bottom-", a);
          b = this.getStyleForEdge(d || b, "-left-", a);
          if (1 != f || 1 != e || 1 != c || 1 != b) return a;
        }
      }
      return null;
    },
    _convertToPx: function (a) {
      if (!a) return 0;
      var b = (a = "" + a);
      0 <= a.indexOf("in")
        ? (b = this._mm2px(parseFloat(a) * this._in2mmFactor))
        : 0 <= a.indexOf("mm")
          ? (b = this._mm2px(a))
          : 0 <= a.indexOf("cm")
            ? (b = this._mm2px(10 * parseFloat(a)))
            : 0 <= a.indexOf("pt")
              ? (b =
                  parseFloat(a) *
                  (this._deviceResolution / this._pdfResolution))
              : 0 <= a.indexOf("px") && (b = parseFloat(a));
      return b;
    },
    _mm2px: function (a) {
      return (
        (d.isNumber(a) ? a : parseFloat(a)) *
        (1 / 25.4) *
        this._deviceResolution
      );
    },
    _subPixelValue: function (a) {
      return 0.01 < a ? Math.max(a, 1) : a;
    },
  };
})(_, $, xfalib);
(function (d, c, f) {
  f.view.util.traversalManager = {
    _computTabIndex: function (a) {
      var b = a._pageNumber();
      b = this._tabIndexBasedOnRange(b);
      this.geographicalOrder = [];
      this._createGeographicalOrder(a);
      this._createFinalTraversalOrder(b);
      this._lastFieldTabbed = null;
    },
    _tabIndexBasedOnRange: function (a) {
      var b = new f.ut.Version(formBridge.userConfig.behaviorConfig);
      b = (b = b.isOn("mfRangeTabIndex") || b.isOn("rangeTabIndex"))
        ? parseInt(b)
        : 1e3;
      return a * b;
    },
    _createGeographicalOrder: function (a) {
      a = this._sortViewGeographically(a.childViews);
      d.each(
        a,
        function (a) {
          a = a.view;
          var b = this._getMapOfInstanceCheck(a),
            c = this._isViewEligibleForTabbing(a);
          ((b.isField && !b.isChildOfExclGroup) ||
            b.isSubform ||
            b.isDraw ||
            b.isExclGroup) &&
            c &&
            this.geographicalOrder.push({ view: a, visited: !1 });
          b.isContainer && c && this._createGeographicalOrder(a);
        },
        this,
      );
    },
    _sortViewGeographically: function (a) {
      var b = [];
      d.each(a, function (a) {
        var e = a.$el.offset(),
          c = f.ut.XfaUtil.prototype.padString(parseInt(e.left), 5, "0"),
          d = a._marginTop();
        e = e.top - parseFloat(d);
        c = parseInt("" + parseInt(e) + c);
        b.push({ positionalReference: c, view: a });
      });
      return d.sortBy(b, function (a) {
        return a.positionalReference;
      });
    },
    _createFinalTraversalOrder: function (a) {
      for (var b = this.geographicalOrder.length, e, c, d = 0, h = 0; ; ) {
        d >= b && (d = 0);
        e = this.geographicalOrder[d];
        if (!e || e.visited) d++;
        else {
          e.visited = !0;
          h++;
          e = e.view;
          c = this._getMapOfInstanceCheck(e);
          var l = e.model;
          c.isSubform
            ? l && l.getTraversalObject()
              ? ((c = l.getNextTraversalSom(
                  f.template.Constants.firstTraversal,
                )),
                (c = this._findViewInGeographicalOrderArray(c)),
                (d = -1 != c ? c : d + 1))
              : d++
            : c.isField || c.isDraw
              ? (c.isField &&
                  (e.updateTabIndex(a), (this._lastFieldTabbed = e), a++),
                l && l.getTraversalObject()
                  ? ((c = l.getNextTraversalSom(
                      f.template.Constants.nextTraversal,
                    )),
                    (c = this._findViewInGeographicalOrderArray(c)),
                    (d = -1 != c ? c : d + 1))
                  : (d = this._findNextViewToBeTraversed(d)))
              : c.isExclGroup
                ? l && l.getTraversalObject()
                  ? ((c = l.getNextTraversalSom(
                      f.template.Constants.nextTraversal,
                    )),
                    (c = this._findViewInGeographicalOrderArray(c)),
                    (d = -1 != c ? c : d + 1),
                    (c = l.getNextTraversalSom(
                      f.template.Constants.firstTraversal,
                    )),
                    (a = this._updateTabIndexOfExclGroupChildren(e, a, c)))
                  : ((a = this._updateTabIndexOfExclGroupChildren(e, a)),
                    (d = this._findTraversalInExclGroupChildren(e, d)))
                : d++;
        }
        if (h >= b) {
          this._renderNextPageFuture();
          break;
        }
      }
    },
    _getParentNextTraversal: function (a, b, e) {
      a = a.parentView;
      var c = a.model,
        d = b.parentView.model;
      if (c && d && c.somExpression != d.somExpression)
        if (a && a instanceof f.view.SubformView)
          if (c.getTraversalObject()) {
            if (
              ((b = c.getNextTraversalSom(f.template.Constants.nextTraversal)),
              (b = this._findViewInGeographicalOrderArray(b)),
              -1 != b && !this.geographicalOrder[b].visited)
            )
              return b;
          } else this._getParentNextTraversal(a, b, e);
        else this._getParentNextTraversal(a, b, e);
      else return -1;
      return e++;
    },
    _findViewInGeographicalOrderArray: function (a) {
      return d.findIndex(this.geographicalOrder, function (b) {
        return (b = b.view.model) && b.somExpression == a;
      });
    },
    _findNextViewToBeTraversed: function (a) {
      var b = this.geographicalOrder[a].view,
        e = this._getNextUnvisited(a);
      if (-1 != e) {
        var c = this.geographicalOrder[e].view;
        a = this._getParentNextTraversal(b, c, a);
        return -1 != a ? a : e;
      }
      return a++;
    },
    _getNextUnvisited: function (a) {
      for (var b = this.geographicalOrder.length, e = 0, c; e < b; ) {
        c = (e + a) % b;
        if (!this.geographicalOrder[c].visited) return c;
        e++;
      }
      return -1;
    },
    _updateTabIndexOfExclGroupChildren: function (a, b, e) {
      d.each(
        a.childViews,
        function (a) {
          this._isViewEligibleForTabbing(a) &&
            (e && a.model.somExpression == e
              ? (b++, a.updateTabIndex(b - 1), (this._lastFieldTabbed = a))
              : a.updateTabIndex(b));
        },
        this,
      );
      e || (this._lastFieldTabbed = a.childViews[0]);
      return ++b;
    },
    _findTraversalInExclGroupChildren: function (a, b) {
      a = this._sortViewGeographically(a.childViews);
      var e = null,
        c = null,
        k = null,
        h = null;
      e = null;
      e = -1;
      a.reverse();
      (e = d.find(a, function (a) {
        c = a.view;
        if ((k = c.model) && (h = k.getTraversalObject())) return 0 < h.length;
      }))
        ? ((e = e.model.getNextTraversalSom(
            f.template.Constants.nextTraversal,
          )),
          (e = this._findViewInGeographicalOrderArray(e)),
          (b = -1 != e ? e : b + 1))
        : (b = this._findNextViewToBeTraversed(b));
      return b;
    },
    _isViewEligibleForTabbing: function (a) {
      return a._initialized && "hidden" != a.$el.css("visibility") ? !0 : !1;
    },
    _getMapOfInstanceCheck: function (a) {
      var b = {};
      b.isSubform = a instanceof f.view.SubformView;
      b.isField = a instanceof f.view.FieldView;
      b.isDraw = a instanceof f.view.XfaDrawView;
      b.isExclGroup = a instanceof f.view.ExclGroupView;
      b.isChildOfExclGroup = a.parentView instanceof f.view.ExclGroupView;
      b.isContainer = a instanceof f.view.ContainerView;
      return b;
    },
    _renderNextPageFuture: function () {
      if (this._lastFieldTabbed)
        this._lastFieldTabbed.$el.one("focusin.traversalManager", function () {
          var a = window.formBridge ? window.formBridge.pagingManager() : null;
          c(window).on("keyup.traversalManager", function (b) {
            9 == (b.keyCode ? b.keyCode : b.which) &&
              a &&
              a.hasMorePages() &&
              (a.renderNextPage(), c(window).off("keyup.traversalManager"));
          });
        });
    },
    _destroy: function () {
      this.geographicalOrder = null;
    },
  };
})(_, $, xfalib);
(function (d, c, f) {
  f.view.util.ErrorManager = f.ut.Class.extend({
    options: { warningMessageVisible: !1, errorMessageVisible: !1 },
    initialize: function () {
      c(window).on("destroy.xfa", function () {
        c("#error-msg").hide();
        c("#warning-msg").hide();
      });
    },
    onFieldEnter: function (a) {
      var b = a.element;
      if (a.option("errorMessage") || a.option("warningMessage")) {
        var e = c(b).offset(),
          d = {};
        d.left =
          (1 / f.ut.XfaUtil.prototype.formScaleFactor) * e.left +
          b.width() +
          5 +
          "px";
        d.top = (1 / f.ut.XfaUtil.prototype.formScaleFactor) * e.top + "px";
        a.option("errorMessage")
          ? (a.$css(c("#error-msg").get(0), d),
            c("#error-msg").text(a.option("errorMessage")).show(),
            a.option("errorMessageVisible", !0))
          : a.option("warningMessage") &&
            (a.$css(c("#warning-msg").get(0), d),
            c("#warning-msg").text(a.option("warningMessage")).show(),
            a.option("warningMessageVisible", !0));
      }
    },
    onFieldExit: function (a) {
      a.option("errorMessageVisible")
        ? (c("#error-msg").hide(), a.option("errorMessageVisible", !1))
        : a.option("warningMessageVisible") &&
          (c("#warning-msg").hide(), a.option("warningMessageVisible", !1));
    },
    markError: function (a, b, e) {
      "warning" != e
        ? (1 > c("#error-msg").length &&
            c(
              "\x3cdiv id\x3d'error-msg' role\x3d'alert'\x3e\x3c/div\x3e",
            ).appendTo("body"),
          a.option("errorMessage", b),
          a.element.addClass("dataInvalid"))
        : (1 > c("#warning-msg").length &&
            c(
              "\x3cdiv id\x3d'warning-msg' role\x3d'alert'\x3e\x3c/div\x3e",
            ).appendTo("body"),
          a.option("warningMessage", b));
    },
    clearError: function (a) {
      this.onFieldExit(a);
      a.element.removeClass("dataInvalid");
      a.option("errorMessage", null);
      a.option("warningMessage", null);
    },
  });
})(_, $, xfalib);
(function (d, c, f) {
  var a = f.ut.XfaUtil.prototype,
    b = {
      container: "body",
      yearsPerView: 16,
      width: 433,
      viewHeight: 248,
      locale: {
        days: "SMTWTFS".split(""),
        months:
          "January February March April May June July August September October November December".split(
            " ",
          ),
        zero: "0",
        clearText: "Clear",
        name: "en_US",
      },
      format: "YYYY-MM-DD",
      pickerType: "date",
      positioning: null,
      showCalendarIcon: !1,
    },
    e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    g = {
      Month: { caption: "Year", li: null, key: "day", upDown: 7 },
      Year: { caption: "Yearset", li: "Month", key: "month", upDown: 3 },
      Yearset: { caption: null, li: "Year", key: "year", upDown: 4 },
    },
    k = function () {
      this.initialized = !1;
    };
  c.extend(k.prototype, {
    create: function (a) {
      var e = this,
        l = "";
      this.options = c.extend({}, b, a);
      this.options.positioning = null;
      window.guideBridge &&
        this.options.width > window.innerWidth &&
        0 < window.innerWidth &&
        (this.options.width = window.innerWidth - 20);
      this.options.pickerType.match(/date/) &&
        (l +=
          '\x3cdiv class\x3d"dp-header"\x3e\x3cdiv class\x3d"dp-leftnav"\x3e\x3c/div\x3e\x3cdiv class\x3d"dp-caption"\x3e\x3c/div\x3e\x3cdiv class\x3d"dp-rightnav"\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"view dp-monthview"\x3e\x3c/div\x3e\x3cdiv class\x3d"view dp-yearview"\x3e\x3c/div\x3e\x3cdiv class\x3d"view dp-yearsetview"\x3e\x3c/div\x3e');
      this.options.pickerType.match(/time/) &&
        (l +=
          '\x3cdiv class\x3d"dp-header"\x3e\x3cdiv class\x3d"dp-leftnav"\x3e\x3c/div\x3e\x3cdiv class\x3d"dp-caption"\x3e\x3c/div\x3e\x3cdiv class\x3d"dp-rightnav"\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"view dp-monthview"\x3e\x3c/div\x3e\x3cdiv class\x3d"view dp-yearview"\x3e\x3c/div\x3e\x3cdiv class\x3d"view dp-yearsetview"\x3e\x3c/div\x3e');
      l += '\x3cdiv class\x3d"dp-clear"\x3e\x3ca\x3e\x3c/a\x3e\x3c/div\x3e';
      c.extend(this, {
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        currentDay: 0,
        currentMonth: 0,
        currentYear: 0,
        touchSupported: f.ut.TouchUtil.TOUCH_ENABLED,
        _visible: !1,
        _defaultView: "Month",
        _keysEnabled: !1,
        focusedOnLi: !1,
        keyboardAccessibility: !0,
        $dp: c("\x3cdiv\x3e\x3c/div\x3e")
          .addClass("datetimepicker")
          .width(this.options.width)
          .append(l)
          .addClass("datePickerTarget")
          .appendTo(this.options.container)
          .toggleClass("datetimepicker-notouch", this.touchSupported),
        $month: c(".dp-monthview", this.$dp).height(this.options.viewHeight),
        $year: c(".dp-yearview", this.$dp).height(this.options.viewHeight),
        $yearset: c(".dp-yearsetview", this.$dp).height(
          this.options.viewHeight,
        ),
      });
      this.actualWidth = Math.floor(this.$dp.width());
      this.$clear = c(".dp-clear a", this.$dp).on(
        "click",
        c.proxy(this._clearDate, this),
      );
      this.$prevNavWidthBtn = c(".dp-leftnav", this.$dp).on(
        "click",
        function (a) {
          e._adjustDate(-1, e.view, !1);
        },
      );
      this.$nextNavWidthBtn = c(".dp-rightnav", this.$dp).on(
        "click",
        function (a) {
          e._adjustDate(1, e.view, !1);
        },
      );
      a = this.$prevNavWidthBtn.outerWidth(!0);
      l = this.$nextNavWidthBtn.outerWidth(!0);
      this.$caption = c(".dp-caption", this.$dp)
        .width(this.actualWidth - a - l)
        .on("click", function (a) {
          e.$caption.hasClass("disabled") || e._layout(g[e.view].caption);
        });
      this.keyboardAccessibility &&
        d.each(
          [
            this.$prevNavWidthBtn,
            this.$caption,
            this.$nextNavWidthBtn,
            this.$clear,
          ],
          function (a, b) {
            a.attr("tabIndex", b + 1);
          },
        );
      c(this.$dp).on("click", function (a) {
        e.touchSupported || e._curInstance.$field.focus();
      });
      c(window).on(
        "touchstart.datetimepicker mousedown.datetimepicker",
        e._checkWindowClicked,
      );
      this._curInstance = null;
    },
    _attachField: function (b, e, d) {
      d = this._newInst(b, e, d);
      var f = this,
        g = function (b) {
          0 != a.$data(b.target, "datetimepicker").access &&
            (f._curInstance || f._activateField(b),
            f.options.showCalendarIcon
              ? b.type === f.getEvent() &&
                f._iconclicked &&
                ((f._iconclicked = !1),
                f._visible
                  ? (f._hide(), f._curInstance.$field.focus())
                  : f._show())
              : (b.type !== f.getEvent() &&
                  ("focus" !== b.type || f.touchSupported || f.scriptFocus)) ||
                f._show(b),
            (f._clickedWindow = !0),
            (f.scriptFocus = !1));
        };
      a.$data(b[0], "datetimepicker", d);
      b.on(this.getEvent(), g)
        .focus(g)
        .blur(function (a) {
          !f._clickedWindow ||
            f.focusedOnLi ||
            (!f.options.showCalendarIcon && f.touchSupported) ||
            (f._hide(), f._deactivateField(), (f._clickedWindow = !0));
        });
      e.showCalendarIcon &&
        ((e = c("\x3cdiv\x3e\x3c/div\x3e")
          .addClass("datepicker-calendar-icon")
          .css({ width: e.iconWidth + "px", height: e.iconHeight + "px" })),
        e.insertAfter(b),
        this.keyboardAccessibility && e.attr("tabindex", 0),
        e
          .on(this.getEvent(), function (a) {
            f._iconclicked = !0;
            b.click();
          })
          .on("keydown", function (a) {
            (32 !== a.keyCode && 13 !== a.keyCode) || b.click();
          }));
    },
    _newInst: function (a, b, e) {
      return {
        $field: a,
        locale: b.locale,
        positioning: b.positioning || a,
        access: b.access,
        selectedDate: b.value,
        editValue: b.editValue,
        minValidDate: b.minValidDate,
        maxValidDate: b.maxValidDate,
        exclMinDate: b.exclMinDate,
        exclMaxDate: b.exclMaxDate,
      };
    },
    _checkWindowClicked: function (a) {
      var b = h;
      b._curInstance &&
        (c(a.target).closest(".datePickerTarget").length
          ? (b._clickedWindow = !1)
          : b.touchSupported
            ? (b._hide(), b._curInstance.$field[0].blur(), b._deactivateField())
            : (b._clickedWindow = !0));
    },
    _hotKeys: function (a) {
      var b = !1;
      switch (a.keyCode) {
        case 9:
          h._clickedWindow = !0;
          b = !1;
          break;
        case 27:
          this._visible &&
            (h._hide(), this._curInstance.$field.focus(), (b = !0));
          break;
        case 32:
        case 13:
          if (c(a.target).hasClass("datepicker-calendar-icon")) {
            if (!this._visible) {
              this._show();
              return;
            }
            this.$focusedDate.addClass("dp-focus");
          }
          break;
        case 40:
          if (!this._visible) {
            this._show();
            return;
          }
          this.$focusedDate.addClass("dp-focus");
      }
      if (h._visible && this._keysEnabled) {
        var e = g[this.view].key,
          d = g[this.view].upDown;
        switch (a.keyCode) {
          case 9:
            a.shiftKey
              ? c(a.target).hasClass("dp-leftnav") ||
                c(a.target).hasClass("dp-focus")
                ? (this._hide(), this._curInstance.$field.focus(), (b = !0))
                : (b = !1)
              : ((b = c(a.target).attr("tabindex")),
                "0" === b
                  ? "input" === a.target.tagName.toLocaleLowerCase()
                    ? (this._hide(), (b = !1))
                    : (this.$prevNavWidthBtn.focus(), (b = !0))
                  : "4" === b
                    ? (this._hide(), this._curInstance.$field.focus(), (b = !0))
                    : (b = !1));
            break;
          case 32:
          case 13:
            this.hotKeyPressed = !0;
            (this.focusedOnLi = !1),
              c(a.target, this.$dp).triggerHandler("click");
            this.hotKeyPressed = !1;
            b = !0;
            break;
          case 37:
            a.shiftKey
              ? c(".dp-leftnav", this.$dp).triggerHandler("click")
              : this._adjustDate(-1, e, !0);
            b = !0;
            break;
          case 38:
            a.shiftKey
              ? this.$caption.triggerHandler("click")
              : this._adjustDate(-d, e, !0);
            b = !0;
            break;
          case 39:
            a.shiftKey
              ? c(".dp-rightnav", this.$dp).triggerHandler("click")
              : this._adjustDate(1, e, !0);
            b = !0;
            break;
          case 40:
            this._adjustDate(d, e, !0), (b = !0);
        }
      }
      b && a.preventDefault();
    },
    _show: function () {
      if (0 != this._curInstance.access) {
        this.options.locale = this._curInstance.locale;
        if (!this._visible) {
          var a = f.ut.DateInfo.ParseIsoString(this._curInstance.selectedDate);
          a = null != a ? a.getDate() : new Date();
          this.selectedDay = this.currentDay = a.getDate();
          this.selectedMonth = this.currentMonth = a.getMonth();
          this.selectedYear = this.currentYear = a.getFullYear();
          this.maxValidDate = (a = this.options.maxValidDate
            ? f.ut.DateInfo.ParseIsoString(this._curInstance.maxValidDate)
            : null)
            ? a.getDate()
            : null;
          this.minValidDate = (a = this.options.minValidDate
            ? f.ut.DateInfo.ParseIsoString(this._curInstance.minValidDate)
            : null)
            ? a.getDate()
            : null;
          this.exclMaxDate = this._curInstance.exclMaxDate;
          this.exclMinDate = this._curInstance.exclMinDate;
          c(".dp-clear a", this.$dp).text(this.options.locale.clearText);
          this._layout("Month");
          this._position();
          this.$dp.show();
          this.focusedOnLi = !1;
          this._visible = !0;
          this.options.showCalendarIcon &&
            this._curInstance.$field.attr("readonly", !0);
        }
        this.options.showCalendarIcon &&
          !this.touchSupported &&
          this._curInstance.$field.focus();
      }
    },
    _position: function () {
      var b = this._curInstance.positioning,
        e = window.scrollX / f.ut.XfaUtil.prototype.formScaleFactor,
        c = window.scrollY / f.ut.XfaUtil.prototype.formScaleFactor,
        d = window.innerHeight / f.ut.XfaUtil.prototype.formScaleFactor,
        g = window.innerWidth / f.ut.XfaUtil.prototype.formScaleFactor,
        k = b.outerHeight(!0);
      b.outerWidth(!0);
      var h = b.offset().top / f.ut.XfaUtil.prototype.formScaleFactor + k,
        u = b.offset().left / f.ut.XfaUtil.prototype.formScaleFactor;
      b = { top: h + "px", left: u + "px" };
      d = h + this.$dp.outerHeight(!0) - d - c;
      0 < d &&
        ((k = h - k - this.$dp.outerHeight(!0) - 20),
        k < c &&
          ((k = h - d),
          a.isWebkit() &&
            !this.options.showCalendarIcon &&
            this._curInstance.$field.trigger("onoverlap.datetimepicker")),
        (b.top = k + "px"));
      u + this.$dp.outerWidth(!0) > e + g &&
        ((e = e + g - this.$dp.outerWidth(!0) - 20), (b.left = e + "px"));
      a.$css(this.$dp.get(0), b);
      return this;
    },
    _layout: function (a) {
      null == a
        ? this._hide()
        : (this.view && this["$" + this.view.toLowerCase()].hide(),
          (this.view = a),
          this.$caption.toggleClass("disabled", !g[this.view].caption),
          this["$" + this.view.toLowerCase()].show(),
          this["show" + this.view]());
      return this;
    },
    showMonth: function () {
      var a = this,
        b = new Date(this.currentYear, this.currentMonth),
        e = this._maxDate(this.currentMonth),
        c = this._maxDate((this.currentMonth + 12) % 12),
        d = new Date(this.currentYear, this.currentMonth, 1).getDay(),
        g = Math.ceil((d + e) / 7) + 1,
        k,
        h;
      this.tabulateView({
        caption:
          this.options.locale.months[this.currentMonth] +
          ", " +
          this._convertNumberToLocale(this.currentYear),
        header: this.options.locale.days,
        numRows: g,
        numColumns: 7,
        elementAt: function (g, l) {
          g = 7 * (g - 1) + l - d + 1;
          h = a._convertNumberToLocale(g);
          k = g;
          if (1 > g) (h = a._convertNumberToLocale(c + g)), (k = -1);
          else if (g > e) (h = a._convertNumberToLocale(g - e)), (k = -1);
          else if (
            (b.setDate(g),
            (g = f.ut.XfaUtil.prototype._compareVal),
            g(b, a.maxValidDate, a.exclMaxDate) ||
              g(a.minValidDate, b, a.exclMinDate))
          )
            k = -1;
          return {
            data: k,
            display: h,
            ariaLabel: a.options.editValue(
              a.currentYear +
                "-" +
                a._pad2(a.currentMonth + 1) +
                "-" +
                a._pad2(h),
            ),
          };
        },
      });
    },
    showYear: function () {
      var a = this,
        b = this.minValidDate
          ? new Date(
              this.minValidDate.getFullYear(),
              this.minValidDate.getMonth(),
            )
          : null,
        e = this.maxValidDate
          ? new Date(
              this.maxValidDate.getFullYear(),
              this.maxValidDate.getMonth(),
            )
          : null,
        c = new Date(this.currentYear, 0),
        d,
        f;
      this.tabulateView({
        caption: this._convertNumberToLocale(this.currentYear),
        numRows: 4,
        numColumns: 3,
        elementAt: function (g, l) {
          d = f = 3 * g + l;
          c.setMonth(f);
          if ((b && c < b) || (e && c > e)) d = -1;
          return {
            data: d,
            display: a.options.locale.months[f],
            ariaLabel: a.options.locale.months[f] + " " + a.currentYear,
          };
        },
      });
    },
    showYearset: function () {
      var a,
        b = this.minValidDate
          ? new Date(this.minValidDate.getFullYear(), 0)
          : null,
        e = this.maxValidDate
          ? new Date(this.maxValidDate.getFullYear() + 1, 0)
          : null,
        c = new Date(),
        d,
        f = this;
      this.tabulateView({
        caption:
          this._convertNumberToLocale(
            this.currentYear - this.options.yearsPerView / 2,
          ) +
          "-" +
          this._convertNumberToLocale(
            this.currentYear -
              this.options.yearsPerView / 2 +
              this.options.yearsPerView -
              1,
          ),
        numRows: 4,
        numColumns: 4,
        elementAt: function (g, l) {
          d = a = f.currentYear - 8 + (4 * g + l);
          c.setFullYear(a);
          if ((b && c < b) || (e && c > e)) d = -1;
          return {
            data: d,
            display: f._convertNumberToLocale(a),
            ariaLabel: a,
          };
        },
      });
    },
    insertRow: function (b, e, f, g) {
      var l = this["$" + this.view.toLowerCase()],
        k = this.actualWidth / e.length,
        h = c("ul", l).eq(b),
        m,
        p,
        r = this;
      h.length ||
        (h = c("\x3cul\x3e\x3c/ul\x3e")
          .attr("aria-label", "")
          .appendTo(l)
          .toggleClass("header", f));
      h.height(g);
      for (b = c("li", h).length; b++ < e.length; )
        if (((l = c("\x3cli\x3e\x3c/li\x3e").appendTo(h)), !f))
          l.on("click", c.proxy(this._selectDate, this));
      d.each(e, function (b, d) {
        m = c("li", h).eq(d);
        f
          ? m.text(e[d])
          : ((p = e[d]),
            a.$data(m.get(0), "value", p.data),
            r._checkDateIsFocussed(p.data) &&
              (r.$focusedDate &&
                (r.$focusedDate.removeClass("dp-focus"),
                r.$focusedDate.attr("tabindex", "-1")),
              (r.$focusedDate = m),
              r._keysEnabled && r.$focusedDate.addClass("dp-focus")),
            m
              .toggleClass("dp-selected", r._checkDateIsSelected(p.data))
              .toggleClass("disabled", -1 == p.data)
              .text(p.display)
              .attr("title", p.ariaLabel)
              .attr("aria-label", p.ariaLabel)
              .attr("tabindex", -1));
        m.css({ height: g + "px", width: k + "px", "line-height": g + "px" });
      });
      return h;
    },
    tabulateView: function (a) {
      var b = 0,
        e = [],
        d = this.options.viewHeight / a.numRows,
        f;
      this.$caption.text(a.caption);
      for (a.header && this.insertRow(b++, a.header, !0, d); b < a.numRows; ) {
        for (f = 0; f < a.numColumns; ) (e[f] = a.elementAt(b, f)), f++;
        this.insertRow(b++, e, !1, d);
      }
      for (
        b = c(".dp-" + this.view.toLowerCase() + "view ul:visible").length;
        b > a.numRows;

      )
        c(".dp-" + this.view.toLowerCase() + "view ul")
          .eq(--b)
          .hide();
      for (; a.numRows > b; )
        c(".dp-" + this.view.toLowerCase() + "view ul")
          .eq(b++)
          .show();
    },
    _activateField: function (b) {
      this._curInstance = a.$data(b.target, "datetimepicker");
      this._curInstance.$field
        .trigger("onfocus1.datetimepicker")
        .addClass("datePickerTarget");
      this.options.showCalendarIcon &&
        this._curInstance.$field.parent().addClass("datePickerTarget");
      this.touchSupported ||
        this._keysEnabled ||
        (c(window).on("keydown.datetimepicker", c.proxy(this._hotKeys, this)),
        (this._keysEnabled = !0));
    },
    _deactivateField: function () {
      this._curInstance &&
        (this._keysEnabled &&
          (c(window).off("keydown.datetimepicker"), (this._keysEnabled = !1)),
        this._curInstance.$field
          .trigger("onfocusout.datetimepicker")
          .removeClass("datePickerTarget"),
        this.options.showCalendarIcon &&
          this._curInstance.$field.parent().removeClass("datePickerTarget"),
        (this._curInstance = null));
    },
    _hide: function () {
      this._visible &&
        (this.$dp.hide(),
        this._curInstance.$field.trigger("onclose.datetimepicker"),
        (this._visible = !1),
        this.options.showCalendarIcon &&
          this._curInstance.$field.attr("readonly", !1));
    },
    _adjustDate: function (a, b, e) {
      e = e || !1;
      switch (b.toLowerCase()) {
        case "day":
          this.currentDay += a;
          a = this._maxDate(this.currentMonth);
          if (1 > this.currentDay)
            return (
              (a = this._maxDate((this.currentMonth - 1 + 12) % 12)),
              (this.currentDay = a + this.currentDay),
              this._adjustDate(-1, "month", e)
            );
          if (this.currentDay > a)
            return (this.currentDay -= a), this._adjustDate(1, "month", e);
          break;
        case "month":
          this.currentMonth += a;
          11 < this.currentMonth &&
            (this.currentYear++, (this.currentMonth = 0));
          0 > this.currentMonth &&
            (this.currentYear--, (this.currentMonth = 11));
          break;
        case "year":
          this.currentYear += a;
          break;
        case "yearset":
          this.currentYear += a * this.options.yearsPerView;
      }
      this._layout(this.view);
      e &&
        ((this.focusedOnLi = !0),
        this.$focusedDate.attr("tabindex", 0)[0].focus());
    },
    _checkDateIsSelected: function (a) {
      switch (this.view.toLowerCase()) {
        case "month":
          return (
            this.currentYear == this.selectedYear &&
            this.currentMonth == this.selectedMonth &&
            a == this.selectedDay
          );
        case "year":
          return (
            this.currentYear == this.selectedYear && this.selectedMonth == a
          );
        case "yearset":
          return this.selectedYear == a;
      }
    },
    _checkDateIsFocussed: function (a) {
      switch (this.view.toLowerCase()) {
        case "month":
          return a == this.currentDay;
        case "year":
          return this.currentMonth == a;
        case "yearset":
          return this.currentYear == a;
      }
    },
    _convertNumberToLocale: function (a) {
      var b = this.options.locale.zero.charCodeAt(0);
      a += "";
      for (var e = [], c = 0; c < a.length; c++)
        e.push(String.fromCharCode(b + parseInt(a.charAt(c))));
      return e.join("");
    },
    _clearDate: function () {
      var a = this._curInstance.$field.val() ? !1 : !0;
      this.selectedYear = this.selectedMonth = this.selectedYear = -1;
      this._curInstance.selectedDate = "";
      this._curInstance.$field.val("");
      a ||
        this._curInstance.$field.trigger("onvaluechange.datetimepicker", [
          { selectedDate: "" },
        ]);
      c(".dp-selected", this["$" + this.view.toLowerCase()]).removeClass(
        "dp-selected",
      );
    },
    getEvent: function () {
      return "click";
    },
    _pad2: function (a) {
      return 10 > a ? "0" + a : a;
    },
    toString: function () {
      return (
        this.selectedYear +
        "-" +
        this._pad2(this.selectedMonth + 1) +
        "-" +
        this._pad2(this.selectedDay)
      );
    },
    _selectDate: function (b) {
      var e = a.$data(b.target, "value"),
        d = g[this.view].li;
      if (-1 != e) {
        switch (this.view.toLowerCase()) {
          case "month":
            this.selectedMonth = this.currentMonth;
            this.selectedYear = this.currentYear;
            this.selectedDay = e;
            this._curInstance.selectedDate = this.toString();
            e = this._curInstance.editValue(this.toString());
            this._curInstance.$field.val(e).focus();
            this._curInstance.$field.trigger("onvaluechange.datetimepicker", [
              { selectedDate: e },
            ]);
            c(".dp-selected", this["$" + this.view.toLowerCase()]).removeClass(
              "dp-selected",
            );
            c(b.target).addClass("dp-selected");
            break;
          case "year":
            this.currentMonth = e;
            break;
          case "yearset":
            this.currentYear = e;
        }
        this._layout(d);
        this.touchSupported
          ? null == d && this._deactivateField()
          : this.hotKeyPressed || (this.scriptFocus = !0);
      }
    },
    _leapYear: function () {
      return (
        0 == this.currentYear % 400 ||
        (0 != this.currentYear % 100 && 0 == this.currentYear % 4)
      );
    },
    _maxDate: function (a) {
      return this._leapYear() && 1 == a ? 29 : e[a];
    },
    _access: function (a) {
      if ("undefined" == typeof a) return this.access;
      this.access = a;
    },
    _value: function (a) {
      if ("undefined" == typeof a) return this.$field.val();
      this.selectedDate = a;
      var b = this.editValue(a);
      b || (b = a);
      this.$field.val(b);
    },
  });
  var h = new k();
  c.fn.adobeDateTimePicker = function (b, e) {
    h.initialized || (h.create(b), (h.initialized = !0));
    if ("object" === typeof b) h._attachField(this, b);
    else if ("string" === typeof b)
      if (2 == arguments.length)
        h["_" + b].apply(a.$data(this[0], "datetimepicker"), [e]);
      else return h["_" + b].apply(a.$data(this[0], "datetimepicker"));
    return this;
  };
})(_, $, xfalib);
(function (d) {
  d.ut.TouchUtil = (function () {
    var c = !!(
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof DocumentTouch)
      ),
      d = !(!window.MSPointerEvent && !window.PointerEvent),
      a = "mousedown",
      b = "mousemove",
      e = "mouseup",
      g = "MouseEvent";
    window.PointerEvent
      ? ((a = "pointerdown"),
        (b = "pointermove"),
        (e = "pointerup"),
        (g = "PointerEvent"))
      : window.MSPointerEvent
        ? ((a = "MSPointerDown"),
          (b = "MSPointerMove"),
          (e = "MSPointerUp"),
          (g = "MSPointerEvent"))
        : c &&
          ((a = "touchstart"),
          (b = "touchmove"),
          (e = "touchend"),
          (g = "TouchEvent"));
    return {
      TOUCH_ENABLED: c,
      POINTER_EVENT: g,
      POINTER_ENABLED: d,
      POINTER_DOWN: a,
      POINTER_MOVE: b,
      POINTER_UP: e,
      getTouchEvent: function (a) {
        if (d) var b = a.originalEvent;
        else c && ((b = a.originalEvent || a), (b = b.touches[0]));
        return b || a;
      },
      getPointerEvent: function (a) {
        if ("function" === typeof PointerEvent)
          var b = new PointerEvent(a, { bubbles: !0, cancelable: !0 });
        else (b = document.createEvent(g)), b.initEvent(a, !0, !0);
        return b;
      },
      getTouches: function (a) {
        var b = [];
        c &&
          a.originalEvent &&
          a.originalEvent.touches &&
          (b = a.originalEvent.touches);
        return b;
      },
    };
  })();
})(xfalib);
(function (d) {
  d.widget("xfaWidget.abstractWidget", {
    $userControl: null,
    $data: xfalib.ut.XfaUtil.prototype.$data,
    $css: xfalib.ut.XfaUtil.prototype.$css,
    getOrElse: xfalib.ut.Class.prototype.getOrElse,
    dIndexOf: xfalib.ut.XfaUtil.prototype.dIndexOf,
    btwn: xfalib.ut.XfaUtil.prototype.btwn,
    logger: xfalib.ut.XfaUtil.prototype.getLogger,
    localeStrings: xfalib.ut.XfaUtil.prototype.getLocaleStrings,
    logMsgs: xfalib.ut.XfaUtil.prototype.getLogMessages,
    errorManager: xfalib.ut.XfaUtil.prototype.getErrorManager,
    _widgetName: "abstractWidget",
    _blackListedAttributes: ["type"],
    options: {
      name: "",
      value: null,
      commitProperty: "value",
      displayValue: null,
      screenReaderText: null,
      tabIndex: 0,
      role: null,
      paraStyles: null,
      dir: null,
      errorMessage: null,
      warningMessage: null,
      hScrollDisabled: !1,
      placeholder: "",
      isValid: !0,
      mandatory: !1,
    },
    getOptionsMap: function () {
      return {
        tabIndex: function (c) {
          this.$userControl.attr("tabindex", c);
        },
        role: function (c) {
          c && this.$userControl.attr("role", c);
        },
        screenReaderText: function (c) {
          c && this.$userControl.attr("aria-label", c);
        },
        paraStyles: function (c) {
          c && this.$css(this.$userControl.get(0), c);
        },
        dir: function (c) {
          c && this.$userControl.attr("dir", this.options.dir);
        },
        height: function (c) {
          c && this.$css(this.$userControl[0], { height: c });
        },
        width: function (c) {
          c && this.$css(this.$userControl[0], { width: c });
        },
        isValid: function (c) {
          c
            ? this.$userControl.removeAttr("aria-invalid")
            : this.$userControl.attr("aria-invalid", !0);
        },
        color: function (c) {
          _.isEmpty(c) ||
            this.$css(this.$userControl[0], { color: "rgb(" + c + ")" });
        },
        "font-style": function (c) {
          _.isEmpty(c) || this.$css(this.$userControl[0], { "font-style": c });
        },
        mandatory: function (c) {
          c
            ? this.$userControl.attr("aria-required", !0)
            : this.$userControl.removeAttr("aria-required");
        },
      };
    },
    getEventMap: function () {
      return {
        focus: xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT,
        blur: xfalib.ut.XfaUtil.prototype.XFA_EXIT_EVENT,
        click: xfalib.ut.XfaUtil.prototype.XFA_CLICK_EVENT,
      };
    },
    copyAttributesFromSrcToDest: function (c, f) {
      var a = this;
      null != c &&
        c[0] &&
        c[0].attributes &&
        null != f &&
        d.each(c[0].attributes, function () {
          this.specified &&
            null != this.value &&
            _.isString(this.value) &&
            0 < this.value.length &&
            -1 === a._blackListedAttributes.indexOf(this.name) &&
            f.attr(this.name, this.value);
        });
    },
    _create: function () {
      this.widgetEventPrefix = "";
      this.element.addClass(this._widgetName);
      this.$userControl = this.render();
      this.optionsHandler = this.getOptionsMap();
      this.eventMap = this.getEventMap();
      this._initializeOptions();
      this._initializeEventHandlers();
      this.errObj = this.errorManager();
      "undefined" === typeof guidelib &&
        this.$css(this.$userControl.get(0), {
          "box-sizing": "border-box",
          position: "absolute",
        });
    },
    _initializeEventHandlers: function () {
      xfalib.ut.XfaUtil.prototype
        .getLogger()
        .debug("xfa", "initialize event handlers for " + this._widgetName);
      _.each(
        this.eventMap,
        function (c, d) {
          var a = this;
          if (c) {
            c instanceof Array || (c = [c]);
            for (var b = 0; b < c.length; b++)
              xfalib.ut.XfaUtil.prototype
                .getLogger()
                .debug("xfa", "binding " + d + " with " + c[b]),
                this.$userControl.on(
                  d,
                  (function (b) {
                    return function (e) {
                      xfalib.ut.XfaUtil.prototype
                        .getLogger()
                        .debug("xfa", "trigger " + e.type + " xfa-event " + b);
                      a._preProcessEvent.apply(a, [b, e]);
                      e.namespace = "";
                      e.namespace_re = "";
                      a._trigger(b, e);
                      a._postProcessEvent.apply(a, [b, e]);
                    };
                  })(c[b]),
                );
          }
        },
        this,
      );
    },
    _preProcessEvent: function (c, d) {
      c == this.options.commitEvent && this.preProcessCommit(d);
      switch (c) {
        case xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT:
          this.preProcessEnter(d);
          break;
        case xfalib.ut.XfaUtil.prototype.XFA_EXIT_EVENT:
          this.preProcessExit(d);
          break;
        case xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT:
          this.preProcessChange(d);
          break;
        case xfalib.ut.XfaUtil.prototype.XFA_CLICK_EVENT:
          this.preProcessClick(d);
      }
    },
    _postProcessEvent: function (c, d) {
      c == this.options.commitEvent && this.postProcessCommit(d);
      switch (c) {
        case xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT:
          this.postProcessEnter(d);
          break;
        case xfalib.ut.XfaUtil.prototype.XFA_EXIT_EVENT:
          this.postProcessExit(d);
          break;
        case xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT:
          this.postProcessChange(d);
          break;
        case xfalib.ut.XfaUtil.prototype.XFA_CLICK_EVENT:
          this.postProcessClick(d);
      }
    },
    _initializeOptions: function () {
      _.each(
        this.optionsHandler,
        function (c, d) {
          "function" === typeof c && c.apply(this, [this.options[d]]);
        },
        this,
      );
    },
    _setOption: function (c, d) {
      this.options[c] != d &&
        ((this.options[c] = d),
        "function" === typeof this.optionsHandler[c] &&
          this.optionsHandler[c].apply(this, [this.options[c]]));
    },
    option: function (c, f) {
      if (
        1 !== arguments.length ||
        "string" !== typeof c ||
        !this.options.hasOwnProperty(c) ||
        void 0 !== this.options[c]
      )
        return d.Widget.prototype.option.apply(this, arguments);
    },
    destroy: function () {
      this.$userControl.removeClass(this._widgetName);
    },
    render: function () {
      var c =
        0 < this.element.children().length
          ? d(this.element.children().get(0))
          : this.element;
      c.attr("name", this.options.name);
      return c;
    },
    preProcessCommit: function (c) {
      this.options.value = this.getCommitValue();
      xfalib.ut.XfaUtil.prototype
        .getLogger()
        .debug(
          "xfa",
          "passing commit value " + this.options.value + "to model ",
        );
    },
    getCommitValue: function () {},
    preProcessExit: function (c) {},
    preProcessEnter: function (c) {
      "open" === this.options.access && (this._showError(), this.showValue());
    },
    preProcessChange: function (c) {},
    preProcessClick: function (c) {},
    postProcessCommit: function (c) {
      this.showDisplayValue();
    },
    postProcessExit: function (c) {
      "open" === this.options.access &&
        (this.showDisplayValue(), this._hideError());
    },
    postProcessEnter: function (c) {},
    postProcessChange: function (c) {},
    postProcessClick: function (c) {},
    showDisplayValue: function () {
      this.$userControl.val(this.options.displayValue);
    },
    _isValueSame: function () {
      return (
        (null === this.options.value && "" === this.$userControl.val()) ||
        this.options.value === this.$userControl.val()
      );
    },
    showValue: function () {
      this._isValueSame() || this.$userControl.val(this.options.value);
    },
    focus: function () {
      var c = this;
      setTimeout(function () {
        c.$userControl[0].focus();
      }, 1);
    },
    click: function () {
      this.focus();
      this.$userControl.triggerHandler("click");
    },
    _showError: function () {
      if (this.errObj && _.isFunction(this.errObj.onFieldEnter))
        this.errObj.onFieldEnter(this);
    },
    _calculatePaddingForVAlign: function (c) {
      var f =
          d.browser.mozilla &&
          !xfalib.ut.Utilities.isIE11() &&
          this.options.multiLine,
        a =
          this.options.paraStyles &&
          ("bottom" == this.options.paraStyles["vertical-align"] ||
            "top" == this.options.paraStyles["vertical-align"]);
      (f && a) ||
        (d.browser.msie && this.options.multiLine) ||
        ((c = -0.01 < c ? Math.abs(c) : c),
        this.options.paraStyles &&
          0 < c &&
          ((f = this.options.paraStyles["vertical-align"]),
          "bottom" == f
            ? ((c -= this.options.paraStyles["padding-bottom"]),
              this.$userControl.css("padding-top", c),
              (this.padding = this.$userControl.css("padding-top")))
            : "top" == f || ("middle" != f && void 0 == f)
              ? (this.options.paraStyles["padding-top"] &&
                  (c -= this.options.paraStyles["padding-top"]),
                this.$userControl.css("padding-bottom", c),
                (this.padding = this.$userControl.css("padding-bottom")))
              : this.options.multiLine &&
                "middle" == f &&
                ((c = c / 2 - this.options.paraStyles["padding-bottom"]),
                this.options.paraStyles["padding-top"] &&
                  (c += this.options.paraStyles["padding-top"]),
                this.$userControl.css("padding-top", c))));
    },
    _handleVAlignOnExit: function (c) {
      this.options.paraStyles &&
        ((c = xfalib.view.util.TextMetrics.measureExtent(
          this.options.displayValue,
          { refEl: this.$userControl.get(0), maxHeight: -1 },
        ).height),
        this._calculatePaddingForVAlign(this.options.height - c));
    },
    _handleVAlignOnEnter: function (c) {
      c = d.browser.msie && this.options.multiLine;
      this.options.paraStyles &&
        !c &&
        ((c = this.options.paraStyles["vertical-align"]),
        "bottom" == c && this.padding
          ? this.$userControl.css("padding-top", this.padding)
          : "top" == c &&
            this.padding &&
            this.$userControl.css("padding-bottom", this.padding));
    },
    _hideError: function () {
      if (this.errObj && _.isFunction(this.errObj.onFieldExit))
        this.errObj.onFieldExit(this);
    },
    markError: function (c, d) {
      this.errObj &&
        _.isFunction(this.errObj.markError) &&
        this.errObj.markError(this, c, d);
    },
    clearError: function () {
      this.errObj &&
        _.isFunction(this.errObj.clearError) &&
        this.errObj.clearError(this);
    },
    getEditValue: function (c) {
      if (null == this.options.editPattern) return c;
      try {
        return xfalib.ut.PictureFmt.format(c, this.options.editPattern);
      } catch (f) {
        return null;
      }
    },
    parseEditValue: function (c) {
      if (null == this.options.editPattern) return c;
      try {
        return xfalib.ut.PictureFmt.parse(c, this.options.editPattern);
      } catch (f) {
        return c;
      }
    },
  });
})($);
(function (d) {
  d.widget("xfaWidget.defaultWidget", d.xfaWidget.abstractWidget, {
    _widgetName: "defaultWidget",
    getOptionsMap: function () {
      var c = d.xfaWidget.abstractWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        access: function (c) {
          switch (c) {
            case "open":
              this.$userControl.removeAttr("readOnly");
              this.$userControl.removeAttr("aria-readonly");
              this.$userControl.removeAttr("disabled");
              this.$userControl.removeAttr("aria-disabled");
              break;
            case "nonInteractive":
            case "protected":
              this.$userControl.attr("disabled", "disabled");
              this.$userControl.attr("aria-disabled", "true");
              break;
            case "readOnly":
              this.$userControl.attr("readOnly", "readOnly");
              this.$userControl.attr("aria-readonly", "true");
              break;
            default:
              this.$userControl.removeAttr("disabled"),
                this.$userControl.removeAttr("aria-disabled");
          }
        },
        displayValue: function (c) {
          this.options.commitProperty
            ? d.browser.mozilla && "value" == this.options.commitProperty
              ? this.$userControl.val(
                  this._displayEmptyStringForIE(this.options.displayValue),
                )
              : (this.$userControl.prop(
                  this.options.commitProperty,
                  this._displayEmptyStringForIE(this.options.displayValue),
                ),
                this.$userControl.attr(
                  this.options.commitProperty,
                  this._displayEmptyStringForIE(this.options.displayValue),
                ))
            : this.logger().debug(
                "xfaView",
                "[DefaultWidget._update], User Control or Commit Property is null",
              );
        },
        placeholder: function (c) {
          this.$userControl.attr("placeholder", c);
        },
      });
    },
    _displayEmptyStringForIE: function (c) {
      return null == c && xfalib.ut.XfaUtil.prototype.detectIE() ? "" : c;
    },
    render: function () {
      var c = d.xfaWidget.abstractWidget.prototype.render.apply(
        this,
        arguments,
      );
      this._attachEventHandlers(c);
      return c;
    },
    getCommitValue: function () {
      var c = this.$userControl.val();
      this.options.hScrollDisabled &&
        !this.options.multiLine &&
        (c = xfalib.ut.XfaUtil.prototype.splitStringByWidth(
          this.$userControl.val(),
          this.$userControl.width(),
          this.$userControl.get(0),
        ));
      return c;
    },
    _attachEventHandlers: function (c) {
      c.keydown(d.proxy(this._handleKeyDown, this));
      c.keypress(d.proxy(this._handleKeyPress, this));
      c.on("paste", d.proxy(this._handlePaste, this));
      c.on("cut", d.proxy(this._handleCut, this));
    },
    _compositionUpdateCallback: function (c) {
      return !1;
    },
    _attachCompositionEventHandlers: function (c) {
      var d = !1,
        a = this,
        b = function () {
          var b = window.getSelection();
          b.selectAllChildren(a.$userControl[0]);
          b.collapseToEnd();
        };
      c.keyup(function (e) {
        d && (a._compositionUpdateCallback(e) && b(), (d = !1));
      });
      c.on("compositionstart", function (a) {})
        .on("compositionupdate", function (e) {
          a._compositionUpdateCallback(e) && b();
        })
        .on("compositionend", function (a) {
          d = !0;
        })
        .on("keydown", function (a) {
          229 !== a.which && (d = !1);
        });
    },
    _handleKeyDown: function (c) {
      (13 != c.keyCode && 13 != c.charCode && 13 != c.which) ||
        c.preventDefault();
    },
    _handleKeyPress: function (c) {
      (13 != c.keyCode && 13 != c.charCode && 13 != c.which) ||
        c.preventDefault();
    },
  });
})($);
(function (d, c) {
  d.widget("xfaWidget.dateTimeEdit", d.xfaWidget.defaultWidget, {
    _widgetName: "dateTimeEdit",
    getEventMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return !1 === this._nativeWidget
        ? d.extend({}, c, {
            "onfocus1.datetimepicker":
              xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT,
            "onvaluechange.datetimepicker":
              xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
            "onfocusout.datetimepicker":
              xfalib.ut.XfaUtil.prototype.XFA_EXIT_EVENT,
            "onoverlap.datetimepicker":
              xfalib.ut.XfaUtil.prototype.XFA_CLICK_EVENT,
            input: xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
            focus: null,
            blur: null,
          })
        : d.extend({}, c, {
            change: xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
          });
    },
    _getAdobeDatePickerOptionsMap: function (c) {
      return {
        access: function (a) {
          switch (a) {
            case "open":
              this.$userControl.adobeDateTimePicker("access", !0);
              break;
            case "nonInteractive":
            case "protected":
            case "readOnly":
              this.$userControl.adobeDateTimePicker("access", !1);
          }
          c.access.apply(this, arguments);
        },
        displayValue: function (a) {
          this.$userControl.adobeDateTimePicker("value", this.options.value);
          this.showDisplayValue();
        },
      };
    },
    _getNativeDatePickerOptionsMap: function (c) {
      return {
        displayValue: function (a) {
          this.showDisplayValue();
        },
      };
    },
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
          this,
          arguments,
        ),
        a =
          !1 === this._nativeWidget
            ? this._getAdobeDatePickerOptionsMap(c)
            : this._getNativeDatePickerOptionsMap(c);
      return d.extend({}, c, a, {
        paraStyles: function (a) {
          c.paraStyles.apply(this, arguments);
          this._handleVAlignOnExit();
        },
        access: function (a) {
          c.access.apply(this, arguments);
          this.getOptionsMap().width.apply(this, [this.options.width]);
        },
        width: function (a) {
          c.width.apply(this, arguments);
          this.options.showCalendarIcon &&
            a &&
            "open" == this.options.access &&
            this.$userControl.width(
              a > this.options.calendarIconWidth
                ? a - this.options.calendarIconWidth
                : a,
            );
        },
        height: function (a) {
          c.height.apply(this, arguments);
          this._handleVAlignOnExit();
        },
        screenReaderText: function (a) {
          var b = this.options.editPattern,
            c = this._nativeWidget ? "mm/dd/yyyy" : "YYYY-MM-DD",
            d = /(?:date){0,1}{(.*)}/;
          if ((b = "string" === typeof b ? b.match(d)[1] : c))
            var f = xfalib.ut.LocalizationUtil.prototype.getLocalizedMessage(
              "",
              xfalib.locale.Strings.datePickerAriaLabel ||
                "Please Enter date in {0} format only",
              [b],
            );
          this.$userControl.attr("aria-label", void 0 !== a ? a + " " + f : a);
        },
      });
    },
    postProcessExit: function (c) {
      d.xfaWidget.defaultWidget.prototype.postProcessExit.apply(
        this,
        arguments,
      );
      this._handleVAlignOnExit();
    },
    preProcessEnter: function (c) {
      d.xfaWidget.defaultWidget.prototype.preProcessEnter.apply(
        this,
        arguments,
      );
      this._handleVAlignOnEnter();
    },
    preProcessChange: function (c) {
      !0 === this._nativeWidget &&
        (this.options.value = this.$userControl.val());
    },
    showDisplayValue: function () {
      !1 === this._nativeWidget
        ? d.xfaWidget.defaultWidget.prototype.showDisplayValue.apply(
            this,
            arguments,
          )
        : this.showValue();
    },
    showValue: function () {
      0 == this._nativeWidget
        ? this.$userControl.adobeDateTimePicker("value", this.options.value)
        : d.xfaWidget.defaultWidget.prototype.showValue.apply(this, arguments);
      d.xfaWidget.textField.prototype._selectOnFocusInIE.apply(this, arguments);
    },
    getCommitValue: function () {
      if (!1 === this._nativeWidget) {
        var c = this.$userControl.adobeDateTimePicker("value");
        return this.parseEditValue(c);
      }
      return d.xfaWidget.defaultWidget.prototype.getCommitValue.apply(
        this,
        arguments,
      );
    },
    render: function () {
      var c = this,
        a = this.getOrElse(
          this.$data(this.element.get(0), "xfamodel"),
          "textstyle",
          "",
        ),
        b = d.xfaWidget.abstractWidget.prototype.render.apply(this, arguments),
        e = b;
      var g = this.element.find("input").attr("style") || "";
      this._nativeWidget = !0;
      if (!1 === this.options.useNativeWidget || "date" !== b[0].type)
        (this._nativeWidget = !1),
          (b = this.element.find("input")[0].id),
          this.element.children().remove(),
          d("\x3cdiv\x3e\x3c/div\x3e")
            .css({ position: "relative", width: "100%", height: "100%" })
            .append(d("\x3cinput type\x3d'text'/\x3e"))
            .appendTo(this.element),
          (b = d("input", this.element)
            .attr("style", a)
            .attr("name", this.options.name)
            .attr("id", b)
            .adobeDateTimePicker({
              positioning: this.element,
              locale: {
                months: this.options.months,
                days: this.options.days,
                zero: this.options.zero,
                clearText: this.options.clearText,
              },
              access: this.options.access,
              value: this.options.value,
              showCalendarIcon: this.options.showCalendarIcon,
              iconWidth: this.options.calendarIconWidth,
              minValidDate: this.options.minValidDate,
              maxValidDate: this.options.maxValidDate,
              exclMinDate: this.options.exclMinDate,
              exclMaxDate: this.options.exclMaxDate,
              editValue: function (a) {
                return c.getEditValue(a);
              },
            }));
      this._attachEventHandlers(b);
      a = (this.element.find("input").attr("style") || "") + g;
      this.element.find("input").attr("style", a);
      window.guideBridge &&
        this.copyAttributesFromSrcToDest(e, this.element.find("input"));
      return b;
    },
  });
})($, _);
(function (d) {
  d.widget("xfaWidget.numericInput", d.xfaWidget.defaultWidget, {
    _widgetName: "numericInput",
    options: {
      value: null,
      curValue: null,
      pos: 0,
      lengthLimitVisible: !0,
      zero: "0",
      decimal: ".",
      minus: "-",
    },
    _matchArray: {
      integer: "^[+-]?{digits}*$",
      decimal: "^[+-]?{digits}{leading}({decimal}{digits}{fraction})?$",
      float: "^[+-]?{digits}*({decimal}{digits}*)?$",
    },
    _regex: null,
    _engRegex: null,
    _writtenInLocale: !1,
    _previousCompositionVal: "",
    _toLatinForm: function (c) {
      return c.replace(/[\uff00-\uffef]/g, function (c) {
        return String.fromCharCode(c.charCodeAt(0) - 65248);
      });
    },
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        paraStyles: function (d) {
          c.paraStyles.apply(this, arguments);
          this._handleVAlignOnExit();
        },
        height: function (c) {
          c &&
            (this.$css(this.$userControl[0], { height: c }),
            this._handleVAlignOnExit());
        },
      });
    },
    getEventMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        "onKeyInput.numericInput": xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
      });
    },
    _getDigits: function () {
      for (var c = this.options.zero.charCodeAt(0), d = "", a = 0; 10 > a; a++)
        d += String.fromCharCode(c + a);
      return "[" + d + "]";
    },
    _escape: function (c) {
      return c.replace(".", "\\.");
    },
    postProcessExit: function (c) {
      d.xfaWidget.defaultWidget.prototype.postProcessExit.apply(
        this,
        arguments,
      );
      this._handleVAlignOnExit();
    },
    preProcessEnter: function (c) {
      d.xfaWidget.defaultWidget.prototype.preProcessEnter.apply(
        this,
        arguments,
      );
      this._handleVAlignOnEnter();
    },
    render: function () {
      var c = this._matchArray[this.options.dataType];
      if (c) {
        var f = this.options.leadDigits,
          a = this.options.fracDigits;
        a = a && -1 != a ? "{0," + a + "}" : "*";
        c = c
          .replace("{leading}", f && -1 != f ? "{0," + f + "}" : "*")
          .replace("{fraction}", a);
        f = c
          .replace(/{digits}/g, this._getDigits())
          .replace("{decimal}", this._escape(this.options.decimal));
        c = c.replace(/{digits}/g, "[0-9]").replace("{decimal}", "\\.");
        this._processValue = !(
          "[0123456789]" == this._getDigits() && "." == this.options.decimal
        );
        this._regex = new RegExp(f, "g");
        this._engRegex = new RegExp(c, "g");
      }
      return d.xfaWidget.defaultWidget.prototype.render.apply(this, arguments);
    },
    getCommitValue: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getCommitValue.apply(
        this,
        arguments,
      );
      c = this._toLatinForm(c);
      0 < c.length && this._processValue && !c.match(this._engRegex)
        ? ((this._writtenInLocale = !0), (c = this._convertValueFromLocale(c)))
        : (this._writtenInLocale = !1);
      c &&
        c.length >= this.options.combCells &&
        (c = c.slice(0, this.options.combCells));
      return (this._previousCompositionVal = c);
    },
    _compositionUpdateCallback: function (c) {
      var d = !1,
        a = this.options.leadDigits,
        b = this.options.fracDigits;
      if (-1 !== a) {
        var e = this.$userControl.val();
        "compositionupdate" === c.type &&
          c.originalEvent.data &&
          (e += c.originalEvent.data.substr(c.originalEvent.data.length - 1));
        c = a + (-1 !== b ? b + this.options.decimal.length : 0);
        -1 === e.indexOf(this.options.decimal) && (c = a);
        d = this._toLatinForm(e);
        a = d.match(this._regex) || d.match(this._engRegex);
        d = !a;
        null === a
          ? (this.$userControl.val(this._previousCompositionVal), (d = !0))
          : d
            ? ((e = e.substr(0, c)),
              this.$userControl.val(e),
              (this._previousCompositionVal = e),
              (d = !0))
            : (this._previousCompositionVal = e);
      }
      return d;
    },
    _attachEventHandlers: function (c) {
      d.xfaWidget.defaultWidget.prototype._attachEventHandlers.apply(
        this,
        arguments,
      );
      d.xfaWidget.defaultWidget.prototype._attachCompositionEventHandlers.apply(
        this,
        arguments,
      );
    },
    _handleKeyInput: function (c, f, a) {
      if (c.ctrlKey && !_.contains(["paste", "cut"], c.type)) return !0;
      d.xfaWidget.defaultWidget.prototype._handleKeyDown.apply(this, arguments);
      this.options.lengthLimitVisible = !0;
      var b = this.$userControl.prop(this.options.commitProperty) || "",
        e = xfalib.view.util.HtmlUtil.getHTMLSupportedAttr(
          this.$userControl[0],
          "selectionStart",
        ),
        g = !(void 0 === e || null === e);
      e = e || 0;
      var k =
          xfalib.view.util.HtmlUtil.getHTMLSupportedAttr(
            this.$userControl[0],
            "selectionEnd",
          ) || 0,
        h = parseInt(this.options.combCells) || 0,
        l = f;
      0 < h && (l = f.substr(0, h - b.length + k - e));
      if (!g) return !0;
      g = b.substr(0, e) + l + b.substr(k);
      l = this._toLatinForm(g);
      if (
        (null != this._regex &&
          !l.match(this._regex) &&
          !l.match(this._engRegex)) ||
        (!_.contains(["keydown", "cut"], c.type) &&
          h &&
          (b.length >= h || g.length > h) &&
          e === k)
      )
        return c.preventDefault(), !1;
      this._previousCompositionVal = this.options.curValue = b;
      this.options.pos = e;
      this.options.hScrollDisabled &&
        !_.contains(["keydown", "cut"], c.type) &&
        ((b = xfalib.view.util.TextMetrics.measureExtent(g, {
          refEl: this.$userControl[0],
          maxWidth: -1,
        }).width),
        !c.ctrlKey &&
          b > this.$userControl.width() - 5 &&
          (c.preventDefault(), (this.options.lengthLimitVisible = !1)));
      this.$userControl.trigger({
        type: "onKeyInput.numericInput",
        originalType: c.type,
        character: f,
        keyCode: c.keyCode || 0,
        charCode: c.charCode || 0,
        which: c.which || 0,
        ctrlKey: c.ctrlKey || c.metaKey || !1,
        shiftKey: c.shiftKey || !1,
        keyDown: !1,
        selectionStart: e,
        selectionEnd: k,
      });
    },
    _handleKeyDown: function (c) {
      if (c) {
        var d = c.charCode || c.which || c.keyCode || 0;
        if (8 == d || 46 == d) this._handleKeyInput(c, "", d);
        else if (32 == d) return c.preventDefault(), !1;
      }
    },
    _isValidChar: function (c) {
      c = this._toLatinForm(c);
      var d = String.fromCharCode(this.options.zero.charCodeAt(0) + 9);
      return (
        ("0" <= c && "9" >= c) ||
        (c >= this.options.zero && c <= d) ||
        c === this.options.decimal ||
        c === this.options.minus
      );
    },
    _handleKeyPress: function (c) {
      if (c) {
        var d = c.charCode || c.which || c.keyCode || 0,
          a = String.fromCharCode(d);
        if (xfalib.ut.XfaUtil.prototype.isNonPrintableKey(c.key)) return !0;
        if (this._isValidChar(a)) this._handleKeyInput(c, a, d);
        else if (!c.ctrlKey) return c.preventDefault(), !1;
      }
    },
    _handlePaste: function (c) {
      if (c) {
        var d = void 0;
        window.clipboardData && window.clipboardData.getData
          ? (d = window.clipboardData.getData("Text"))
          : c.originalEvent.clipboardData &&
            c.originalEvent.clipboardData.getData &&
            (d = c.originalEvent.clipboardData.getData("text/plain"));
        if (d)
          if (
            _.every(
              d.split(""),
              function (a) {
                return this._isValidChar(a);
              },
              this,
            )
          )
            (d = this._toLatinForm(d)), this._handleKeyInput(c, d, 0);
          else if (!c.ctrlKey) return c.preventDefault(), !1;
      }
    },
    _handleCut: function (c) {
      c && this._handleKeyInput(c, "", 0);
    },
    _convertValueToLocale: function (c) {
      var d = this.options.zero.charCodeAt(0);
      return _.map(
        c,
        function (a) {
          return "." == a
            ? this.options.decimal
            : "-" == a
              ? this.options.minus
              : String.fromCharCode(parseInt(a) + d);
        },
        this,
      ).join("");
    },
    _convertValueFromLocale: function (c) {
      c = this._toLatinForm(c);
      var d = this.options.zero.charCodeAt(0);
      return _.map(
        c,
        function (a) {
          return a == this.options.decimal
            ? "."
            : a == this.options.minus
              ? "-"
              : (a.charCodeAt(0) - d).toString();
        },
        this,
      ).join("");
    },
    showValue: function () {
      this._isValueSame() ||
        (this.options.value && this._writtenInLocale
          ? this.$userControl.val(
              this._convertValueToLocale(this.options.value),
            )
          : this.$userControl.val(this.options.value));
      d.xfaWidget.textField.prototype._selectOnFocusInIE.apply(this, arguments);
    },
  });
})($);
(function (d, c) {
  d.widget("xfaWidget.dropDownList", d.xfaWidget.defaultWidget, {
    _widgetName: "dropDownList",
    options: {
      value: [],
      items: [],
      editable: !1,
      placeholder: "",
      displayValue: [],
    },
    widgetSkeleton:
      '\x3cselect name\x3d"" style\x3d"" size \x3d "1"\x3e\x3coption id\x3d"emptyValue" role\x3d"none" value\x3d""\x3e\x3c/option\x3e\x3c/select\x3e',
    optionSkeleton: "\x3coption data-user-option\x3e\x3c/option\x3e",
    optGroupSkeleton: '\x3coptgroup label\x3d""\x3e\x3c/optgroup\x3e',
    AF_OPTGROUP_NAME: "afOptGroupName",
    PLACE_HOLDER_STYLE_CLASS: "placeHolder",
    getOptionsMap: function () {
      var f = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, f, {
        value: function (a) {
          c.isArray(a) || (a = [a]);
          var b = !1,
            e = this;
          d("option", this.$userControl).each(function (f) {
            f = d(this).val();
            c.contains(a, f)
              ? (d(this).prop("selected", !0), (b = !0))
              : (d(this).prop("selected", !1),
                "emptyValue" === this.id &&
                  (d(this).val("").html(e.options.placeholder),
                  0 == e.options.placeholder.length && d(this).hide()));
          });
          0 == a.length || null == a[0]
            ? this.$userControl.children("#emptyValue").prop("selected", !0)
            : b ||
              this.$userControl
                .children("#emptyValue")
                .text(a[0])
                .prop("selected", !0)
                .val(c.escape(a[0]))
                .show();
          this.$userControl.toggleClass(
            this.PLACE_HOLDER_STYLE_CLASS,
            0 == a.length || null == a,
          );
        },
        items: function (a) {
          c.isArray(a) || (a = [a]);
          var b,
            e,
            f = [],
            k = d("optgroup", this.$userControl);
          if (0 == k.length) {
            var h = this.$userControl.find("[selected]");
            this.$userControl.children("option[data-user-option]").remove();
          }
          for (e = b = 0; e < a.length; e++) {
            var l = a[e];
            if ("afOptGroupName" != l.save) f.push(l);
            else {
              var m = k[b++];
              b > k.length && (m = this.addGroup(l.display));
              c.isUndefined(m) ||
                m.label == l.display ||
                (m.label = l.display || "");
              0 != e && (this.handleOptions(p, f), (f = []));
              var p = m;
            }
          }
          for (; b < k.length; ) (m = k[b++]), this.deleteGroup(m.label);
          0 != f.length && this.handleOptions(p, f, h);
        },
        displayValue: function () {},
        placeholder: function (a) {},
        access: function (a) {
          switch (a) {
            case "open":
              this.$userControl.removeAttr("disabled");
              this.$userControl.removeAttr("aria-disabled");
              break;
            case "nonInteractive":
            case "protected":
            case "readOnly":
              this.$userControl.attr("disabled", "disabled");
              this.$userControl.attr("aria-disabled", "true");
              break;
            default:
              this.$userControl.removeAttr("disabled"),
                this.$userControl.removeAttr("aria-disabled");
          }
        },
      });
    },
    getEventMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        focus: [
          xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT,
          xfalib.ut.XfaUtil.prototype.XFA_PREOPEN_EVENT,
        ],
        change: xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
      });
    },
    render: function () {
      var f = this.element.find("select").attr("style"),
        a = 1;
      this.element.addClass(this._widgetName);
      this.element.children().remove();
      var b = c.uniqueId("select"),
        e = this.getOrElse(
          this.$data(this.element.get(0), "xfamodel"),
          "textstyle",
          "",
        ),
        g = d(this.widgetSkeleton).attr("style", e).attr("name", b);
      this.options.editable && g.addClass("combobox");
      this.options.items &&
        0 < this.options.items.length &&
        (a = this.options.items.length);
      this.options.multiSelect &&
        (g.addClass("multiDropdown"),
        g.attr("multiple", "multiple"),
        g.attr("size", a),
        g.attr("data-multiple-selection", "true"));
      var k = g;
      c.each(
        this.options.items,
        function (a) {
          var b = c.isString(a.save) ? a.save.replace(/"/g, "\x26quot;") : "";
          b === this.AF_OPTGROUP_NAME
            ? (k = d(this.optGroupSkeleton)
                .attr("label", a.display)
                .appendTo(g))
            : d(this.optionSkeleton).val(b).text(a.display).appendTo(k);
        },
        this,
      );
      this.element.append(g);
      a = this.element.children().eq(0).attr("name", this.options.name);
      this._attachEventHandlers(a);
      f = this.element.find("select").attr("style") + f;
      this.element.find("select").attr("style", f);
      return a;
    },
    handleOptions: function (f, a, b) {
      c.isUndefined(f) && (f = this.$userControl[0]);
      for (
        var e = d("option[data-user-option]", f), g = 0, k = 0;
        g < e.length && k < a.length;
        g++, k++
      ) {
        var h = e[g],
          l = a[k];
        h.text != l.display && (h.text = l.display || "");
        h.value != l.save && (h.value = l.save || "");
      }
      for (; g < e.length; ) this.deleteOption(e[g++]);
      for (; k < a.length; ) this.addOption(f, a[k++], b);
    },
    addOption: function (f, a, b) {
      var e = d(this.optionSkeleton).val(a.save).text(a.display);
      e.appendTo(f);
      b &&
        a.save === b.val() &&
        a.display === b.text() &&
        e.prop("selected", !0);
      if (this.options.value && c.isString(this.options.value))
        var g = this.options.value.split("\n");
      else c.isArray(this.options.value) && (g = this.options.value);
      g &&
        0 <= g.indexOf(a.save) &&
        ((f = this.$userControl.children("#emptyValue")),
        f.val("").html(this.options.placeholder).prop("selected", !1),
        0 == this.options.placeholder.length && f.hide(),
        this.$userControl
          .children()
          .filter(function () {
            return this.value == a.save;
          })
          .prop("selected", !0));
    },
    deleteOption: function (c) {
      this.$userControl.find("option[value\x3d" + c.value + "]").remove();
    },
    addGroup: function (c) {
      var a = document.createElement("OPTGROUP");
      a.label = c;
      this.$userControl[0].appendChild(a);
      return a;
    },
    deleteGroup: function (c) {
      this.$userControl.children().remove("optgroup[label\x3d" + c + "]");
    },
    addItem: function (d) {
      var a = new Option(d.sDisplayVal || "", d.sSaveVal || "");
      this.$userControl[0].add(a, null);
      c.contains(this.options.value, d.sSaveVal) &&
        (this.$userControl
          .children("#emptyValue")
          .val("")
          .html("")
          .prop("selected", !1)
          .hide(),
        this.$userControl
          .find("option[value\x3d" + d.sSaveVal + "]")
          .prop("selected", !0));
    },
    clearItems: function () {
      this.$userControl.children().not("#emptyValue").remove();
    },
    deleteItem: function (c) {
      this.$userControl[0].item(0) &&
        "emptyValue" == this.$userControl[0].item(0).id &&
        (c += 1);
      this.$userControl[0].remove(c);
    },
    getCommitValue: function (c) {
      return d("option:selected", this.$userControl)
        .map(function () {
          return d(this).val();
        })
        .get();
    },
    showDisplayValue: function () {},
    destroy: function () {
      this.element.removeClass(this._widgetName).children().remove().text("");
      d.xfaWidget.defaultWidget.prototype.destroy.apply(this, arguments);
    },
    _handleKeyDown: function (c) {
      13 != c.keyCode &&
        d.xfaWidget.defaultWidget.prototype._handleKeyDown.apply(
          this,
          arguments,
        );
    },
    showValue: function () {},
  });
})($, _);
(function (d) {
  d.widget("xfaWidget.listBox", d.xfaWidget.defaultWidget, {
    _widgetName: "listBoxWidget",
    options: { value: [], items: [], multiSelect: !1 },
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        width: function (d) {
          this.options.width = 0.95 * d;
          c.width.apply(this, [this.options.width]);
        },
        access: function () {},
        value: function (c) {
          var a = this.options.value,
            b = this,
            e = !1;
          _.isArray(a) || (a = [a]);
          this.$userControl.children().each(function () {
            var c = d(this).attr("data-save");
            a && _.contains(a, c)
              ? (b._selectListItem(d(this)),
                (e = !0),
                d.data(this, "_xfaInitialized") ||
                  (d(this).data(), d.data(this, "_xfaInitialized", !0)),
                d.data(this, "selected", !0))
              : (d(this).removeClass("item-selected"),
                d(this).addClass("item-selectable"),
                d(this).attr("tabIndex", "-1"));
          });
          e ||
            d(this.$userControl.children().get(0)).attr(
              "tabIndex",
              this.options.tabIndex,
            );
        },
        items: function (c) {
          _.isArray(c) || (c = [c]);
          var a = this.$userControl.children();
          if (a.length > c.length)
            for (var b = a.length; b > c.length; b--) this.deleteItem(b - 1);
          else if (a.length < c.length)
            for (b = c.length; b > a.length; b--)
              this.addItem({
                sDisplayVal: c[b - 1].display,
                sSaveVal: c[b - 1].save,
              });
          _.each(c, function (b, c) {
            c = d(a[c]);
            c.text() != b.display && c.text(b.display || "");
            c.attr("data-save") != b.save && c.attr("data-save", b.save || "");
          });
        },
        displayValue: function () {},
        tabIndex: function () {
          var c = this.$userControl.children(".item-selected"),
            a = this.$userControl.children();
          c.length
            ? c.eq(0).attr("tabIndex", this.options.tabIndex)
            : 0 < a.length && a.eq(0).attr("tabIndex", this.options.tabIndex);
        },
      });
    },
    getEventMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        listboxenter: xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT,
        listboxexit: xfalib.ut.XfaUtil.prototype.XFA_EXIT_EVENT,
        listboxchange: xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
        focus: null,
        blur: null,
      });
    },
    showDisplayValue: function () {},
    render: function () {
      this.element.addClass(this._widgetName);
      this.element.children().remove();
      var c = this.getOrElse(
          this.$data(this.element.get(0), "xfamodel"),
          "textstyle",
          "",
        ),
        f = _.template(
          '\x3col style\x3d"position:absolute;\x3c%\x3dtextStyle%\x3e" role\x3d"listbox"\x3e\x3c% _.each(items, function(item){ %\x3e\x3c% var saveItem \x3d item.save ? item.save.replace(/"/g,"\x26quot;"):null %\x3e\x3cli role\x3d"option" data-save\x3d"\x3c% print(saveItem) %\x3e" data-selected\x3d"false"\x3e\x3c% print(item.display) %\x3e\x3c/li\x3e\x3c%})%\x3e\x3c/ol\x3e',
        );
      c = _.extend({ textStyle: c }, this.options);
      f = f(c);
      this.element.html(xfalib.ut.XfaUtil.prototype.encodeScriptableTags(f));
      f = d(this.element.children().get(0)).attr("name", this.options.name);
      this._attachEventHandlers(f);
      return f;
    },
    focus: function () {
      0 < this.$userControl.children(".item-selected").length
        ? this.$userControl.children(".item-selected")[0].focus()
        : 0 < this.$userControl.children().length &&
          this.$userControl.children()[0].focus();
    },
    addItem: function (c) {
      d("\x3cli\x3e\x3c/li\x3e")
        .attr("data-save", c.sSaveVal || "")
        .text(c.sDisplayVal || "")
        .appendTo(this.$userControl)
        .click(d.proxy(this._handleItemClick, this))
        .focus(d.proxy(this._handleItemFocus, this));
      _.contains(this.options.value, c.sSaveVal) &&
        this._selectListItem(
          this.$userControl.find("[data-save\x3d" + c.sSaveVal + "]"),
        );
    },
    clearItems: function () {
      d(this.$userControl).empty();
    },
    deleteItem: function (c) {
      d(this.$userControl)
        .children("li")
        .each(function (f, a) {
          f == c && d(a).off("click").off("focus").remove();
        });
    },
    _attachEventHandlers: function (c) {
      var f = this;
      c.keydown(d.proxy(this._hotKeys, this))
        .children()
        .on("mousedown", function () {
          1 == f.inFocus && (f.mouseDown = !0);
        })
        .click(d.proxy(this._handleItemClick, this))
        .focus(d.proxy(this._handleItemFocus, this))
        .blur(d.proxy(this._handleFocusOut, this));
    },
    _hotKeys: function (c) {
      if ("open" == this.options.access && this.itemInFocus)
        switch (c.which) {
          case 38:
            var f = d(this.itemInFocus).prev();
            f && ((this.keyDown = !0), f.focus(), (this.keyDown = !1));
            c.preventDefault();
            break;
          case 40:
            if ((f = d(this.itemInFocus).next()))
              (this.keyDown = !0), f.focus(), (this.keyDown = !1);
            c.preventDefault();
            break;
          case 91:
          case 92:
            c.preventDefault();
            break;
          case 32:
            this._toggleItem(this.itemInFocus), c.preventDefault();
        }
    },
    _toggleItem: function (c) {
      var f = d(c),
        a = this.options.multiSelect;
      this.$data(c, "selected", !this.$data(c, "selected"));
      c = this.$data(c, "selected");
      a ||
        ((a = this.$userControl.children(".item-selected")),
        a.length &&
          (this.$data(a[0], "selected", !1),
          a.removeClass("item-selected").addClass("item-selectable")));
      f.toggleClass("item-selectable", !c).toggleClass("item-selected", c);
      this.$userControl.trigger("listboxchange");
    },
    getCommitValue: function () {
      var c = this;
      return this.$userControl
        .children()
        .map(function () {
          return c.$data(this, "selected") ? d(this).attr("data-save") : null;
        })
        .get();
    },
    _handleItemFocus: function (c) {
      "open" == this.options.access &&
        ((this.itemInFocus = c.target),
        this.keyDown ||
          this.mouseDown ||
          this.$userControl.trigger("listboxenter"),
        (this.mouseDown = !1),
        (this.inFocus = !0));
    },
    _handleItemClick: function (c) {
      1 == this.mouseDown && (this.mouseDown = !1);
      "open" == this.options.access && this._toggleItem(c.target);
    },
    _handleFocusOut: function () {
      this.keyDown ||
        this.mouseDown ||
        (this.$userControl.trigger("listboxexit"), (this.inFocus = !1));
    },
    _selectListItem: function (c) {
      c &&
        c.length &&
        c
          .removeClass("item-selectable")
          .addClass("item-selected")
          .attr("tabIndex", this.options.tabIndex);
    },
    destroy: function () {
      this.element.removeClass(this._widgetName).children().remove().text("");
      d.xfaWidget.defaultWidget.prototype.destroy.apply(this, arguments);
    },
  });
})($);
(function (d) {
  d.widget("xfaWidget.nwkListBox", d.xfaWidget.dropDownList, {
    _widgetName: "nwkListBox",
    options: { value: [], multiSelect: !1 },
    render: function () {
      var c = d.xfaWidget.dropDownList.prototype.render.apply(this, arguments);
      c &&
        (c.children("#emptyValue").remove(),
        this.options.multiSelect && c.attr("multiple", "multiple"));
      this._updateSelectSize(c);
      return c;
    },
    addItem: function (c) {
      d.xfaWidget.dropDownList.prototype.addItem.apply(this, arguments);
      this._updateSelectSize();
    },
    clearItems: function () {
      d.xfaWidget.dropDownList.prototype.clearItems.apply(this, arguments);
      this._updateSelectSize();
    },
    deleteItem: function (c) {
      d.xfaWidget.dropDownList.prototype.deleteItem.apply(this, arguments);
      this._updateSelectSize();
    },
    _updateSelectSize: function (c) {
      c = c || this.$userControl;
      c.attr("size", (this.options.items || []).length);
    },
    showValue: function () {},
  });
})($);
(function (d) {
  d.widget("xfaWidget.xfaButton", d.xfaWidget.defaultWidget, {
    _widgetName: "xfaButton",
    options: { value: null, svgCaption: !1 },
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        access: function (c) {
          switch (c) {
            case "open":
              this.$userControl.removeAttr("disabled");
              this.$userControl.removeAttr("aria-disabled");
              break;
            case "nonInteractive":
            case "protected":
            case "readOnly":
              this.$userControl.attr("disabled", "disabled");
              this.$userControl.attr("aria-disabled", "true");
              break;
            default:
              this.$userControl.removeAttr("disabled"),
                this.$userControl.removeAttr("aria-disabled");
          }
        },
        value: function () {},
        displayValue: function () {},
        svgCaption: function (c) {
          c && this.$userControl.removeAttr("value");
        },
      });
    },
    _attachEventHandlers: function (c) {
      c.click(function () {
        this.focus();
      });
    },
    getCommitValue: function () {
      return this.options.value;
    },
    showValue: function () {},
    showDisplayValue: function () {},
  });
})($);
(function (d) {
  d.widget("xfaWidget.XfaCheckBox", d.xfaWidget.defaultWidget, {
    _widgetName: "XfaCheckBox",
    options: { value: null, state: -1, states: 2, values: [], mandatory: !1 },
    checkedState: !1,
    clickPending: !1,
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        access: function (c) {
          switch (c) {
            case "open":
              this.$userControl.removeAttr("disabled");
              this.$userControl.removeAttr("aria-disabled");
              break;
            case "nonInteractive":
            case "protected":
            case "readOnly":
              this.$userControl.attr("disabled", "disabled");
              this.$userControl.attr("aria-disabled", "true");
              break;
            default:
              this.$userControl.removeAttr("disabled"),
                this.$userControl.removeAttr("aria-disabled");
          }
        },
        displayValue: function (c) {
          this.$userControl.attr(
            this.options.commitProperty,
            this.options.value,
          );
          this._state(this.dIndexOf(this.options.values, this.options.value));
          this.$userControl.attr(
            "checked",
            this.checkedState ? "checked" : null,
          );
          this.$userControl.prop(
            "checked",
            this.checkedState ? "checked" : null,
          );
          this.$userControl.attr("aria-checked", this.checkedState);
          2 == this.options.state
            ? this.$userControl.addClass("neutral")
            : 3 == this.options.states &&
              this.$userControl.removeClass("neutral");
        },
        allowNeutral: function (c) {
          c = parseInt(c);
          if (0 == c || 1 == c) this.options.states = 2 + c;
        },
        paraStyles: function (d) {
          c.paraStyles.apply(this, arguments);
          this._handleVAlignOnExit();
        },
      });
    },
    getEventMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        xfacheckboxchange: xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
        xfacheckboxclick: xfalib.ut.XfaUtil.prototype.XFA_CLICK_EVENT,
        change: null,
        click: null,
      });
    },
    _attachEventHandlers: function (c) {
      var f = this,
        a = function (a) {
          f.inFocus || (f.focus(), (f.inFocus = !0));
        };
      c.click(a)
        .change(a)
        .blur(function (a) {
          f.inFocus = !1;
        });
      c.change(d.proxy(this._handleChange, this)).click(
        d.proxy(this._handleClick, this),
      );
    },
    getCommitValue: function () {
      this._state((this.options.state + 1) % this.options.states);
      this.$userControl.attr("checked", this.checkedState ? "checked" : null);
      this.$userControl.attr("aria-checked", this.checkedState);
      2 == this.options.state
        ? this.$userControl.addClass("neutral")
        : 3 == this.options.states && this.$userControl.removeClass("neutral");
      return this.options.values[this.options.state];
    },
    _handleVAlignOnExit: function (c) {},
    _handleChange: function (c) {
      this.$userControl.trigger("xfacheckboxchange");
      !0 === this.clickPending
        ? ((this.clickPending = !1),
          this.$userControl.trigger("xfacheckboxclick"))
        : (this.clickPending = !0);
    },
    _handleClick: function (c) {
      c = xfalib.ut.XfaUtil.prototype.detectChrome();
      var f = xfalib.ut.XfaUtil.prototype.detectIE(),
        a = xfalib.ut.XfaUtil.prototype.isSafari(),
        b = this.$userControl.attr("type");
      (d.browser.mozilla || c || a) &&
      !f &&
      !1 === this.clickPending &&
      (("radio" === b && !1 === this.checkedState) || "checkbox" === b)
        ? (this.clickPending = !0)
        : (this.$userControl.trigger("xfacheckboxclick"),
          (this.clickPending = !1));
    },
    _state: function (c) {
      if (void 0 == c) return this.options.state;
      this.options.state = c;
      this.checkedState = 0 == c || 2 == c;
    },
    click: function () {
      ("radio" === this.$userControl.attr("type") &&
        0 === this.options.state) ||
        this.$userControl.trigger("change");
      this.$userControl.triggerHandler("click");
    },
  });
})($);
(function (d) {
  d.widget("xfaWidget.textField", d.xfaWidget.defaultWidget, {
    _widgetName: "textField",
    options: {
      curValue: null,
      pos: 0,
      lengthLimitVisible: !0,
      maxChars: 0,
      flag: "",
      html5Type: "text",
      length: null,
      minLength: 0,
      totalLengthMessage: "",
      minimumLengthMessage: "",
    },
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        maxChars: function (c) {
          this._maxCharsReached(this.options.value) &&
            ((c = this.options.value.slice(0, c)),
            this._setOption("value", c),
            this._setOption("displayValue", c));
        },
        "multiLine ": function (c) {
          this.options.multiLine
            ? this.$userControl.attr("aria-multiline", "true")
            : this.$userControl.removeAttr("aria-multiline", "false");
        },
        height: function (c) {
          c &&
            (this.$css(this.$userControl[0], { height: c }),
            this._handleVAlignOnExit());
        },
        width: function (d) {
          c.width.apply(this, arguments);
          this._handleVAlignOnExit();
        },
        paraStyles: function (d) {
          c.paraStyles.apply(this, arguments);
          this._handleVAlignOnExit();
        },
      });
    },
    render: function () {
      var c = d.xfaWidget.defaultWidget.prototype.render.apply(this, arguments);
      if (c && 0 < c.length && this.options.html5Type) {
        var f = this.options.minLength,
          a = this.options.maxChars,
          b = this.options.length;
        isMinLengthSet = null != f && 0 < f;
        isMaxLengthSet = null != a && 0 < a;
        isLengthSet = null != b && 0 < b;
        isMultiline = this.options.multiLine;
        minLengthMsg = this.options.minimumLengthMessage;
        totLengthMsg = this.options.totalLengthMessage;
        pattern = "";
        isMinLengthSet &&
          (c.attr("minlength", parseInt(f)),
          minLengthMsg &&
            0 < minLengthMsg.length &&
            c.attr("title", this.options.minimumLengthMessage));
        isMaxLengthSet && c.attr("maxlength", parseInt(a));
        isMinLengthSet && isMaxLengthSet
          ? (pattern += ".{" + f + "," + a + "}")
          : isMinLengthSet && (pattern += ".{" + f + ",}");
        isLengthSet &&
          (isMultiline &&
            (c.attr("minlength", parseInt(b)),
            c.attr("maxlength", parseInt(b))),
          totLengthMsg &&
            0 < totLengthMsg.length &&
            c.attr("title", this.options.totalLengthMessage),
          (pattern = ".{" + b + "," + b + "}"));
        this.options.required && c.attr("required", !0);
        pattern &&
          0 < pattern.length &&
          !isMultiline &&
          c.attr("pattern", pattern);
      }
      return c;
    },
    _handleVAlignOnExit: function () {
      var c = _.isEmpty(this.$userControl.val() || this.options.displayValue);
      if (this.options.paraStyles && !c)
        if (0 < d(this.element[0]).find("textarea").length && !c) {
          var f = {
            height: this.$userControl.css("height"),
            padding: this.$userControl.css("padding"),
          };
          this.$css(this.$userControl[0], { height: "1px", padding: "0px" });
          c = this._getContentHeight();
          this.$css(this.$userControl[0], f);
          f = this.options.height;
          this._calculatePaddingForVAlign(f - c);
        } else
          d.xfaWidget.defaultWidget.prototype._handleVAlignOnExit.apply(
            this,
            arguments,
          );
    },
    getEventMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        "onKeyInput.textField": xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
      });
    },
    _maxCharsReached: function (c) {
      var d = !1,
        a = this.options.multiLine ? "textarea" : "input";
      this.options.html5Type &&
        xfalib.view.util.HtmlUtil.elementSupportsAttribute(a, "maxLength") &&
        (d = !0);
      return (
        !d &&
        this.options.maxChars &&
        "0" !== this.options.maxChars &&
        c &&
        c.length >= this.options.maxChars
      );
    },
    _handleKeyInput: function (c, f, a) {
      if (c.ctrlKey && !_.contains(["paste", "cut"], c.type)) return !0;
      this.options.multiLine ||
        (d.xfaWidget.defaultWidget.prototype._handleKeyDown.apply(
          this,
          arguments,
        ),
        (f = 13 == a ? "" : f));
      var b = this.$userControl.val(),
        e =
          xfalib.view.util.HtmlUtil.getHTMLSupportedAttr(
            this.$userControl[0],
            "selectionStart",
          ) || 0,
        g =
          xfalib.view.util.HtmlUtil.getHTMLSupportedAttr(
            this.$userControl[0],
            "selectionEnd",
          ) || 0,
        k = b.substr(0, e) + f + b.substr(g);
      this.options.curValue = b;
      if (!this.options.multiLine) {
        if (
          ((this.options.lengthLimitVisible = !0),
          (this.options.pos = e),
          this.options.hScrollDisabled &&
            !_.contains(["keydown", "cut"], c.type) &&
            ((k = xfalib.view.util.TextMetrics.measureExtent(k, {
              refEl: this.$userControl[0],
              maxWidth: -1,
            }).width),
            !c.ctrlKey && k > this.$userControl.width()))
        )
          return (this.options.lengthLimitVisible = !1), c.preventDefault(), !1;
      } else if (this.options.multiLine && this.options.hScrollDisabled) {
        var h = this.$userControl;
        h.css("padding", "0px 0px 0px");
        h.one("input", function () {
          h.prop("scrollHeight") > h.prop("offsetHeight") &&
            (h.val(b).prop("selectionStart", g).prop("selectionEnd", g),
            (f = null),
            (a = 0));
        });
      }
      if (
        !_.contains(["keydown", "cut"], c.type) &&
        this._maxCharsReached(b) &&
        e === g
      )
        return c.preventDefault(), !1;
      this.$userControl.trigger({
        type: "onKeyInput.textField",
        originalType: c.type,
        character: f,
        keyCode: c.keyCode || 0,
        charCode: c.charCode || 0,
        which: c.which || 0,
        ctrlKey: c.ctrlKey || c.metaKey || !1,
        shiftKey: c.shiftKey || !1,
        keyDown: !1,
        selectionStart: e,
        selectionEnd: g,
      });
    },
    _handleKeyDown: function (c) {
      if (c) {
        var d = c.charCode || c.which || c.keyCode || 0;
        (8 != d && 46 != d) || this._handleKeyInput(c, "", d);
      }
    },
    _handleKeyPress: function (c) {
      if (c) {
        var d = c.charCode || c.which || c.keyCode || 0,
          a = 13 == d ? "\n" : String.fromCharCode(d);
        if (xfalib.ut.XfaUtil.prototype.isNonPrintableKey(c.key)) return !0;
        this._handleKeyInput(c, a, d);
      }
    },
    _compositionUpdateCallback: function (c) {
      var d = this.$userControl.val();
      "compositionupdate" === c.type &&
        c.originalEvent.data &&
        (d += c.originalEvent.data.substr(c.originalEvent.data.length - 1));
      if ((c = this._maxCharsReached(d)))
        (d = d.substr(0, this.options.maxChars)), this.$userControl.val(d);
      return c;
    },
    _attachEventHandlers: function (c) {
      d.xfaWidget.defaultWidget.prototype._attachEventHandlers.apply(
        this,
        arguments,
      );
      d.xfaWidget.defaultWidget.prototype._attachCompositionEventHandlers.apply(
        this,
        arguments,
      );
    },
    _handlePaste: function (c) {
      if (c) {
        var d = void 0;
        window.clipboardData && window.clipboardData.getData
          ? (d = window.clipboardData.getData("Text"))
          : c.originalEvent.clipboardData &&
            c.originalEvent.clipboardData.getData &&
            (d = c.originalEvent.clipboardData.getData("text/plain"));
        d && this._handleKeyInput(c, d, 0);
      }
    },
    _handleCut: function (c) {
      c && this._handleKeyInput(c, "", 0);
    },
    postProcessExit: function (c) {
      d.xfaWidget.defaultWidget.prototype.postProcessExit.apply(
        this,
        arguments,
      );
      (this.options.multiLine && this.options.hScrollDisabled) ||
        this._handleVAlignOnExit();
    },
    preProcessEnter: function (c) {
      d.xfaWidget.defaultWidget.prototype.preProcessEnter.apply(
        this,
        arguments,
      );
      (this.options.multiLine && this.options.hScrollDisabled) ||
        this._handleVAlignOnEnter();
    },
    _selectOnFocusInIE: function () {
      d.browser.msie && !this._isValueSame() && this.$userControl.select();
    },
    showValue: function () {
      d.xfaWidget.defaultWidget.prototype.showValue.apply(this, arguments);
      this._selectOnFocusInIE();
    },
    getCommitValue: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getCommitValue.apply(
        this,
        arguments,
      );
      this._maxCharsReached(c) && (c = c.slice(0, this.options.maxChars));
      this.$userControl.val(this.options.value);
      return c;
    },
    _getContentHeight: function () {
      var c = Math.ceil(this.$userControl.get(0).scrollHeight);
      return c ? c : this.options.fontSize;
    },
  });
})($);
(function (d) {
  d.widget("xfaWidget.richTextField", d.xfaWidget.textField, {
    _widgetName: "richTextField",
    _richTextWidget: null,
    _changeAccess: function (c) {
      switch (c) {
        case "open":
          this._richTextWidget &&
            (this._richTextWidget.editor.enable(),
            this._richTextWidget.$toolbar.removeClass("hideToolbar"));
          break;
        case "readOnly":
          this._richTextWidget &&
            (this._richTextWidget.editor.disable(),
            this._richTextWidget.$toolbar.addClass("hideToolbar"));
      }
    },
    getOptionsMap: function () {
      var c = d.xfaWidget.textField.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        value: function (c) {
          this._richTextWidget &&
            this._richTextWidget.setRichTextEditorContent(c);
        },
        access: function (c) {
          this._changeAccess(c);
        },
      });
    },
    getEventMap: function () {
      if (xfalib.ut.XfaUtil.prototype.isIE()) {
        var c = d.xfaWidget.textField.prototype.getEventMap.apply(
          this,
          arguments,
        );
        return d.extend({}, c, {
          "activate.richTextField": xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT,
        });
      }
      return d.xfaWidget.textField.prototype.getEventMap.apply(this, arguments);
    },
    render: function () {
      var c = this.element.find("div.richTextWidget").eq(0);
      c.length
        ? c.children().remove()
        : ((c = this.element.children().attr("class")),
          (c =
            '\x3cdiv class\x3d"richTextWidget ' +
            c +
            '" id\x3d"richTextField_' +
            this.options.name +
            "_" +
            c +
            '"\x3e\x3c/div\x3e'),
          this.element.children().remove(),
          this.element.append(c),
          (c = this.element.find("div.richTextWidget").eq(0)));
      c.append(this.options.value);
      return d.xfaWidget.defaultWidget.prototype.render.apply(this, arguments);
    },
    getCommitValue: function () {
      var c = "";
      this._richTextWidget &&
        (c = this._richTextWidget.getRichTextEditorContent());
      return c;
    },
    preProcessEnter: function (c) {
      d.xfaWidget.textField.prototype.preProcessEnter.apply(this, arguments);
      var f = this.$userControl.find("div.richTextWidget").eq(0);
      f.length ||
        ((f = this.element.find("div.richTextWidget").eq(0)),
        this.changeDefaultToolbarConfig(),
        this.$userControl.parents(".richtextsupport").css("z-index", "auto"));
      if (
        void 0 !== window.Form &&
        void 0 !== window.Form.rte &&
        null === this._richTextWidget
      ) {
        this._initializeRTEToolbar();
        this._richTextWidget = new window.Form.rte.RichTextEditor({
          selector: f.attr("id"),
          toolbar: window.Form.rte.RichTextEditor.MFToolbar,
          data: this.options.value,
          locale: f.data("locale"),
        });
        var a = this;
        this._richTextWidget.editor.on("blur:composer", function () {
          a.$userControl.trigger("blur");
        });
        this.options.access && this._changeAccess(this.options.access);
      }
    },
    changeDefaultToolbarConfig: function () {
      if (window.Form && window.Form.rte) {
        var c = window.Form.rte.DefaultConfig;
        c.fontSize.defaultValue = this.options.fontSize;
        c.fontFamily.defaultValue = this.options.fontFamily;
        c.isFontInPx = !0;
        this.changeDefaultParaStyleUtility();
        this.changeMissingParaStyleUtility();
        -1 === c.fontSize.options.indexOf(this.options.fontSize) &&
          c.fontSize.options.push(this.options.fontSize);
        -1 === c.fontFamily.options.indexOf(this.options.fontFamily) &&
          c.fontFamily.options.push(this.options.fontFamily);
      }
    },
    changeDefaultParaStyleUtility: function () {
      Form.rte.util.HtmlUtils.getDefaultParaStyle = function (c) {
        var d = "";
        c &&
          ((d += "font-family:" + c.fontFamily.defaultValue + ";"),
          c.isFontInPx
            ? ((d += "font-size:" + c.fontSize.defaultValue + "px;"),
              (d += "letter-spacing:" + c.letterSpacing.defaultValue + "px;"))
            : ((d += "font-size:" + c.fontSize.defaultValue + "pt;"),
              (d += "letter-spacing:" + c.letterSpacing.defaultValue + "pt;")),
          (d += "color:#000000;text-align:left;"));
        return d;
      };
    },
    changeMissingParaStyleUtility: function () {
      Form.rte.util.HtmlUtils.getMissingParaStyle = function (c, d) {
        c && 0 < c.length
          ? d &&
            (Form.rte.util.StringHelper.endsWith(c, ";") || (c += ";"),
            0 > c.indexOf("font-family") &&
              (c += "font-family:" + d.fontFamily.defaultValue + ";"),
            0 > c.indexOf("font-size") &&
              (c = d.isFontInPx
                ? c + ("font-size:" + d.fontSize.defaultValue + "px;")
                : c + ("font-size:" + d.fontSize.defaultValue + "pt;")),
            0 > c.indexOf("letter-spacing") &&
              (c = d.isFontInPx
                ? c + ("letter-spacing:" + d.letterSpacing.defaultValue + "px;")
                : c +
                  ("letter-spacing:" + d.letterSpacing.defaultValue + "pt;")),
            0 > c.indexOf("color") && (c += "color:#000000;"),
            0 > c.indexOf("text-align") && (c += "text-align:left;"))
          : (c = Form.rte.util.HtmlUtils.getDefaultParaStyle(d));
        return c;
      };
    },
    _initializeRTEToolbar: function () {
      window.Form.rte.RichTextEditor.MFToolbar = window.Form.rte.RichTextEditor
        .MFToolbar || {
        defaultMode: "basic",
        toolbars: {
          basic: {
            layout: [
              { items: [Form.rte.Commands.HEADER] },
              {
                items: [
                  Form.rte.Commands.BOLD,
                  Form.rte.Commands.ITALIC,
                  Form.rte.Commands.UNDERLINE,
                ],
              },
              {
                command: "lists",
                icon: "list",
                title: "List Type",
                type: "popover",
                placement: "bottom",
                items: [
                  Form.rte.Commands.INSERT_UNORDERED_LIST,
                  Form.rte.Commands.INSERT_ORDERED_LIST,
                  Form.rte.Commands.INSERT_LOWERCASE_ALPHABET_LIST,
                ],
              },
              {
                title: "Expand",
                command: Form.rte.Commands.MODE,
                value: Form.rte.ToolbarMode.FULL,
                icon: "resize-full",
              },
            ],
            floating: !0,
          },
          full: {
            layout: [
              {
                items: [
                  Form.rte.Commands.BOLD,
                  Form.rte.Commands.ITALIC,
                  Form.rte.Commands.UNDERLINE,
                ],
              },
              {
                items: [
                  Form.rte.Commands.SUPERSCRIPT,
                  Form.rte.Commands.SUBSCRIPT,
                ],
              },
              {
                items: [
                  Form.rte.Commands.HEADER,
                  Form.rte.Commands.FONT_FAMILY,
                  Form.rte.Commands.LINE_HEIGHT,
                  Form.rte.Commands.FORE_COLOR,
                  Form.rte.Commands.HILITE_COLOR,
                  Form.rte.Commands.LINK,
                ],
              },
              {
                items: [
                  Form.rte.Commands.INSERT_UNORDERED_LIST,
                  Form.rte.Commands.INSERT_ORDERED_LIST,
                  Form.rte.Commands.INSERT_LOWERCASE_ALPHABET_LIST,
                ],
              },
              {
                title: "Collapse",
                command: Form.rte.Commands.MODE,
                value: Form.rte.ToolbarMode.BASIC,
                icon: "resize-small",
                selected: !0,
              },
            ],
          },
        },
      };
    },
  });
})($);
(function (d) {
  d.widget("xfaWidget.imageField", d.xfaWidget.defaultWidget, {
    _widgetName: "imageField",
    options: { tabIndex: 0, role: "img" },
    getEventMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        imagechange: xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
      });
    },
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        screenReaderText: function (c) {
          c && this.$userControl.attr("alt", c);
        },
        displayValue: function (c) {
          c = this.options.value ? "data:;base64," + this.options.value : "";
          this.$userControl.prop(this.options.commitProperty, c);
          this.$userControl.attr(this.options.commitProperty, c);
        },
        access: function () {},
        height: function (c) {
          c &&
            "actual" != this.options.aspect &&
            this.$css(this.$userControl[0], { "max-height": c });
        },
        width: function (c) {
          c &&
            "actual" != this.options.aspect &&
            this.$css(this.$userControl[0], { "max-width": c });
        },
        aspect: function (c) {
          if ("actual" == this.options.aspect) {
            c = this.$userControl.attr("width");
            var a = this.$userControl.attr("height");
            c = 0 <= c.indexOf("px") ? c : c + "px";
            a = 0 <= a.indexOf("px") ? a : a + "px";
            this._cropImage("0px", c, a, "0px");
            this.$userControl.removeAttr("height width");
          } else
            "none" != this.options.aspect &&
              this.$userControl.attr({ height: "auto", width: "auto" });
        },
      });
    },
    _cropImage: function (c, d, a, b) {
      this.$userControl.css({
        clip: "rect(" + c + "," + d + "," + a + "," + b + ")",
        "clip-path":
          "polygon( 0px 0px, 0px " + a + "," + d + " " + a + "," + d + " 0px)",
      });
    },
    render: function () {
      var c = this;
      "undefined" !== typeof FileReader
        ? (this.reader = new FileReader())
        : xfalib.ut.XfaUtil.prototype
            .getLogger()
            .error(
              "Image Field is supported only for HTML5 supported browsers.",
            );
      this.element &&
        ((this.$widgetInput = this.element
          .find("input")
          .on("change.imageField", function () {
            c._handleInputChange();
          })
          .click(function (c) {
            c.stopPropagation();
          })),
        (this.$widgetImg = this.element
          .on("click.imageField", function () {
            c._imageClick();
          })
          .find("img")));
      this.reader &&
        this.reader.addEventListener(
          "load",
          function () {
            c.$widgetImg.attr("src", c.reader.result);
            c.$widgetImg.trigger("imagechange");
          },
          !1,
        );
      return d.xfaWidget.defaultWidget.prototype.render.apply(this, arguments);
    },
    getCommitValue: function () {
      return this._extractData(this.$userControl.attr("src"));
    },
    _handleInputChange: function () {
      this._displayImage();
    },
    _imageClick: function (c) {
      this.$widgetInput.trigger("click");
    },
    _extractData: function (c) {
      return c.replace(/data:.*;base64,/, "");
    },
    _displayImage: function () {
      var c = this.$widgetInput.get(0).files
        ? this.$widgetInput.get(0).files[0]
        : null;
      c &&
        this._isFileOfImageType(c.name) &&
        this.reader &&
        this.reader.readAsDataURL(c);
    },
    _isFileOfImageType: function (c) {
      return c ? /\.(jpe?g|png|gif|tif|bmp)$/i.test(c) : !1;
    },
  });
})($);
(function (d) {
  d.widget("xfaWidget.signatureField", d.xfaWidget.defaultWidget, {
    _widgetName: "signatureField",
    getOptionsMap: function () {
      var c = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        displayValue: function (c) {},
        access: function (c) {},
      });
    },
    render: function () {
      var c = d.xfaWidget.defaultWidget.prototype.render.apply(this, arguments);
      c && c.attr("readOnly", "readonly").attr("disabled", !0);
      return c;
    },
  });
})($);
(function (d, c) {
  function f(a, c, e, g, f) {
    this._callback = f;
    this.canvasID = a;
    this._lineWidth = 5;
    this.canvas = d("#" + a);
    this.context = this.canvas.get(0).getContext("2d");
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._enabled = !0;
    this.context.strokeStyle = "#000000";
    this.canvasBorderWidth = parseInt(this.canvas.css("border-left-width"), 10);
    this.context.lineWidth = this._lineWidth;
    this.lastMousePoint = { x: 0, y: 0 };
    this.canvas[0].width = e;
    this.canvas[0].height = g;
    c
      ? this.context.drawImage(c, 0, 0)
      : ((this.context.fillStyle = "#ffffff"),
        this.context.clearRect(0, 0, e, g));
    this.canvas.on(b.POINTER_DOWN, this.onCanvasMouseDown());
  }
  function a() {}
  var b = c.ut.TouchUtil,
    e = (function () {
      return {
        localeString: function (a) {
          return (
            c.ut.XfaUtil.prototype.encodeScriptableTags(
              d.xfaWidget.abstractWidget.prototype.localeStrings()[a],
            ) || a
          );
        },
      };
    })();
  f.prototype.setLineWidth = function (a) {
    this._lineWidth = a;
  };
  f.prototype.onCanvasMouseDown = function () {
    var a = this;
    return function (c) {
      2 > b.getTouches(c).length &&
        ((a.mouseMoveHandler = a.onCanvasMouseMove()),
        (a.mouseUpHandler = a.onCanvasMouseUp()),
        document.addEventListener(b.POINTER_MOVE, a.mouseMoveHandler, {
          passive: !1,
        }),
        d(document).on(b.POINTER_UP, a.mouseUpHandler),
        a.updateMousePosition(c),
        a.updateCanvas(c));
    };
  };
  f.prototype.onCanvasMouseMove = function () {
    var a = this;
    return function (c) {
      if (2 > b.getTouches(c).length)
        return a.updateCanvas(c), c.preventDefault(), !1;
    };
  };
  f.prototype.onCanvasMouseUp = function (a) {
    var c = this;
    return function (a) {
      document.removeEventListener(b.POINTER_MOVE, c.mouseMoveHandler, {
        passive: !1,
      });
      d(document).off(b.POINTER_UP, c.mouseUpHandler);
      c.mouseMoveHandler = null;
      c.mouseUpHandler = null;
    };
  };
  f.prototype.updateMousePosition = function (a) {
    if (this._enabled) {
      a = b.getTouchEvent(a);
      var c = this.canvas.offset();
      this.lastMousePoint.x =
        a.clientX + d(window).scrollLeft() - c.left - this.canvasBorderWidth;
      this.lastMousePoint.y =
        a.clientY + d(window).scrollTop() - c.top - this.canvasBorderWidth;
    }
  };
  f.prototype._isInsideCanvas = function (a, b) {
    return (
      0 <= b && b < this.canvas[0].height && 0 <= a && a < this.canvas[0].width
    );
  };
  f.prototype.updateCanvas = function (a) {
    if (this._enabled) {
      var b = parseInt(this.canvas[0].style.width, 10);
      var e = parseInt(this.canvas[0].style.height, 10);
      var d = b ? this.canvas[0].width / b : 1;
      var g = e ? this.canvas[0].height / e : 1;
      d /= c.ut.XfaUtil.prototype.formScaleFactor;
      g /= c.ut.XfaUtil.prototype.formScaleFactor;
      e = this.lastMousePoint.x * d;
      b = this.lastMousePoint.y * g;
      this.updateMousePosition(a);
      a = this.lastMousePoint.x * d;
      var f = this.lastMousePoint.y * g;
      d = Math.abs(a - e);
      g = Math.abs(f - b);
      (0 < d || 0 < g) &&
        this._isInsideCanvas(e, b) &&
        this._isInsideCanvas(a, f) &&
        (this.context.beginPath(),
        this.context.moveTo(e, b),
        this.context.lineTo(a, f),
        (this.context.lineWidth = this._lineWidth),
        (this.context.lineCap = "round"),
        this.context.stroke(),
        this._callback());
    }
  };
  f.prototype.toString = function () {
    return this.canvas.get(0).toDataURL("image/png");
  };
  f.prototype.setEnabled = function (a) {
    this._enabled = a;
  };
  f.prototype.clear = function () {
    var a = this.canvas[0];
    this.context.clearRect(0, 0, a.width, a.height);
  };
  var g = (function () {
    var a = function () {
        var a = [
          '\x3cdiv id\x3d"iEBox_container" tabindex\x3d"0" role\x3d"dialog" aria-label\x3d"' +
            e.localeString("pleaseSignText") +
            '"\x3e',
          '\x3cdiv id\x3d"iEBox_panel"\x3e',
          '\x3cdiv  id \x3d "iEBox_Cancel" class\x3d"iEBox_button" tabindex\x3d"0" role\x3d"button" aria-label\x3d"' +
            e.localeString("cancel") +
            '" title\x3d"' +
            e.localeString("cancel") +
            '" \x3e\x3c/div\x3e',
          '\x3c/div\x3e\x3cdiv id\x3d"iEBox_content"\x3e\x3cdiv id\x3d"iEBox_canvases" align\x3dcenter\x3e\x3cdiv style\x3d"display:inline-block; vertical-align:top;"\x3e\x3ccanvas  id\x3d"iEBox_canvas" style\x3d"margin:0px;border-bottom:0px;" width\x3d"696" height\x3d"390" \x3e\x3c/canvas\x3e',
          '\x3cinput type\x3d"text" id\x3d"keyboard_Sign_Box" name\x3d"signatureText" placeholder\x3d"' +
            e.localeString("Type your signature here") +
            '"\x3e',
          '\x3cfieldset id\x3d"iEBox_caption"\x3e\x3clegend align\x3d"center"\x3e' +
            e.localeString("pleaseSignText") +
            "\x3c/legend\x3e\x3c/fieldset\x3e",
          '\x3c/div\x3e\x3ccanvas id\x3d"iEBox_geoCanvasRight" width\x3d"0" height\x3d"0" \x3e\x3c/canvas\x3e\x3cdiv\x3e\x3ccanvas id\x3d"iEBox_geoCanvasBottom" width\x3d"0" height\x3d"0" \x3e\x3c/canvas\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv\x3e',
          '\x3cdiv id\x3d"iEBox_Brush" class\x3d"iEBox_button" tabindex\x3d"0"  role\x3d"button" aria-label\x3d"' +
            e.localeString("brushes") +
            '"  title\x3d"' +
            e.localeString("brushes") +
            '"\x3e\x3c/div\x3e',
          '\x3cdiv id\x3d"iEBox_Clear" class\x3d"iEBox_button" tabindex\x3d"0"  role\x3d"button" aria-label\x3d"' +
            e.localeString("clear") +
            '"  title\x3d"' +
            e.localeString("clear") +
            '" \x3e\x3c/div\x3e',
          '\x3cdiv id\x3d"iEBox_Geo" class\x3d"iEBox_button" tabindex\x3d"0"  role\x3d"button" aria-label\x3d"' +
            e.localeString("geolocation") +
            '"  title\x3d"' +
            e.localeString("geolocation") +
            '" \x3e\x3c/div\x3e',
          '\x3cdiv id\x3d"iEBox_Text" class\x3d"iEBox_button" tabindex\x3d"0"  role\x3d"button" aria-label\x3d"' +
            e.localeString("keyboardsign") +
            '"  title\x3d"' +
            e.localeString("type your name") +
            '"\x3e\x3c/div\x3e',
          '\x3cdiv id\x3d"iEBox_title"\x3e\x3c/div\x3e',
          '\x3cdiv id\x3d"iEBox_Ok" class\x3d"iEBox_button" tabindex\x3d"0"  role\x3d"button" aria-label\x3d"' +
            e.localeString("ok") +
            '"  title\x3d"' +
            e.localeString("ok") +
            '" \x3e\x3c/div\x3e',
          '\x3c/div\x3e\x3c/div\x3e\x3cdiv id\x3d"iEBox_moveframe" \x3e\x3c/div\x3e\x3cdiv id\x3d"iEBox_brushList" \x3e\x3c/div\x3e\x3c/div\x3e',
        ].join("");
        return function () {
          return a;
        };
      },
      g = {
        verticalOffset: 0,
        horizontalOffset: 0,
        repositionOnResize: !0,
        overlayOpacity: 0.75,
        overlayColor: "#CCCCCC",
        draggable: !0,
        _brushes: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        _buttonsEnabled: {},
        _isOpen: !1,
        show: function (a, b) {
          this._show(b);
          this._buttonsEnabled = {
            Geo: !0,
            Clear: !0,
            Ok: !0,
            Cancel: !0,
            Brush: !0,
            Text: !0,
          };
        },
        setEnabled: function (a, b) {
          this._buttonsEnabled[a] != b &&
            ((this._buttonsEnabled[a] = b)
              ? d("#iEBox_" + a)
                  .empty(
                    '\x3cdiv style\x3d"background:white;width:100%;height:100%;opacity:0.75;"\x3e\x3c/div\x3e',
                  )
                  .removeClass("disable_button")
              : d("#iEBox_" + a)
                  .append(
                    '\x3cdiv style\x3d"background:white;width:100%;height:100%;opacity:0.75;"\x3e\x3c/div\x3e',
                  )
                  .addClass("disable_button"));
        },
        enableButtons: function (a) {
          for (var b in a) this.setEnabled(b, a[b]);
        },
        toggleBrushList: function (a) {
          if ("none" != d("#iEBox_brushList").css("display"))
            d("#iEBox_brushList").css({ display: "none" });
          else {
            var b = document.onselectstart;
            document.onselectstart = function () {
              return !1;
            };
            d("#iEBox_brushList").css({
              display: "block",
              visibility: "hidden",
            });
            d("#iEBox_brushList").offset(d("#iEBox_Brush").offset());
            d("#iEBox_brushList").offset({
              top:
                d("#iEBox_Brush").offset().top - d("#iEBox_brushList").height(),
            });
            d("#iEBox_brushList").css({
              display: "block",
              visibility: "visible",
            });
            d("#iEBox_brushList").one("mouseleave", function (a) {
              d("#iEBox_brushList").css({ display: "none" });
              document.onselectstart = b;
            });
          }
        },
        _attachCallbacks: function (a) {
          var c = this,
            e = d("#iEBox_canvas")[0],
            f = e.getContext("2d"),
            l = 10,
            k = l,
            h = !1;
          _.each("Cancel Clear Geo Ok Brush Text".split(" "), function (b, e) {
            d("#iEBox_" + b).click(function (e) {
              c._buttonsEnabled[b] && (e.stopPropagation(), a(b));
            });
            d("#iEBox_" + b).keydown(function (e) {
              !c._buttonsEnabled[b] ||
                (13 != e.keyCode && 13 != e.charCode && 13 != e.which) ||
                (e.stopPropagation(), a(b));
            });
          });
          _.each(d("#iEBox_brushList").children(), function (e, g) {
            d(e).on(b.POINTER_UP, function (b) {
              a("BrushSelect", c._brushes[g]);
              d("#iEBox_brushList").css({ display: "none" });
            });
            d(e).on(b.POINTER_DOWN, function (a) {
              a.preventDefault();
            });
          });
          d("#keyboard_Sign_Box").keydown(function (a) {
            var b = d("#keyboard_Sign_Box")[0].value;
            "Backspace" === a.key &&
              ((f.font = "italic" + l + "px sans-serif, Georgia"),
              (l = g._increaseFontForSignature(
                f.measureText(b).width,
                e.width,
                l,
                k,
              )),
              (f.font = "italic " + l + "px sans-serif, Georgia"),
              f.clearRect(0, 0, e.width, e.height),
              f.fillText(b, 3, l, e.width - 5));
            a.stopPropagation();
          });
          d("#keyboard_Sign_Box").keyup(function (a) {
            var b = d("#keyboard_Sign_Box")[0].value;
            0 == b.length && g.enableButtons({ Ok: !1, Clear: !1 });
            1 <= b.length &&
              0 != b.trim().length &&
              g.enableButtons({ Ok: !0, Clear: !0 });
            !1 === h &&
              ((l = e.height - 20),
              (l = 10 > l ? 10 : l),
              (k = l = 70 < l ? 70 : l),
              (d("#keyboard_Sign_Box")[0].style.font =
                "italic 2rem sans-serif, Georgia"),
              (h = !0));
            f.font = "italic" + l + "px sans-serif, Georgia";
            l = g._decreaseFontForSignature(
              f,
              b,
              e.width,
              l,
              "sans-serif, Georgia",
            );
            f.font = "italic " + l + "px sans-serif, Georgia";
            f.clearRect(0, 0, e.width, e.height);
            f.fillText(b, 3, l, e.width - 5);
            a.stopPropagation();
          });
          d("#iEBox_container").keydown(function (b) {
            var c = document.querySelector("#iEBox_container"),
              e = document.querySelector("#iEBox_Ok"),
              d = "Tab" === b.key || 9 === b.keyCode;
            27 == b.keyCode || 27 == b.charCode || 27 == b.which
              ? (b.stopPropagation(), b.preventDefault(), a("Cancel"))
              : d &&
                (b.shiftKey && document.activeElement === c
                  ? (e.focus(), b.preventDefault())
                  : document.activeElement === e &&
                    (c.focus(), b.preventDefault()));
          });
          this.draggable && this._makeDraggable(b.TOUCH_ENABLED);
        },
        _decreaseFontForSignature: function (a, b, c, e, d) {
          for (; a.measureText(b).width > c - 5 && 20 < e; )
            (e -= 10), (a.font = e + "px " + d);
          return e;
        },
        _increaseFontForSignature: function (a, b, c, e) {
          0 < b - a && (c = e);
          return c;
        },
        _makeDraggable: function (a) {
          var c = !1,
            e,
            g,
            f,
            l,
            k;
          d("#iEBox_panel").on(b.POINTER_DOWN, function (a) {
            2 > b.getTouches(a).length &&
              d(a.target).is("#iEBox_panel") &&
              (d("body")[0].addEventListener(
                b.POINTER_MOVE,
                (l = function (a) {
                  if (2 > b.getTouches(a).length && c) {
                    a.preventDefault();
                    var l = b.getTouchEvent(a);
                    a = l.pageX - e;
                    l = l.pageY - g;
                    d("#iEBox_moveframe").offset({
                      top: f.top + l,
                      left: f.left + a,
                    });
                  }
                }),
                { passive: !1 },
              ),
              d("body").on(
                b.POINTER_UP,
                (k = function (a) {
                  if (c) {
                    a = d("#iEBox_moveframe").offset();
                    var e = d(window).scrollTop(),
                      g = e + d(window).height();
                    1 > a.top - e && (a.top = e);
                    0 < a.top - g + d("#iEBox_panel").height() &&
                      (a.top = g - d("#iEBox_panel").height());
                    d("#iEBox_container").offset(a);
                    d("#iEBox_moveframe").css({ display: "none" }).offset(a);
                    c = !1;
                    d("body")[0].removeEventListener(b.POINTER_MOVE, l, {
                      passive: !1,
                    });
                    d("body").off(b.POINTER_UP, k);
                  }
                }),
              ),
              (a = b.getTouchEvent(a)),
              (c = !0),
              (e = a.pageX),
              (g = a.pageY),
              (f = d("#iEBox_container").offset()),
              d("#iEBox_moveframe").css({ display: "block" }),
              d("#iEBox_moveframe").offset(f),
              d("#iEBox_moveframe").css(
                "width",
                d("#iEBox_container").css("width"),
              ),
              d("#iEBox_moveframe").css(
                "height",
                d("#iEBox_container").css("height"),
              ));
          });
        },
        _createBrushes: function () {
          _.each(this._brushes, function (a, c) {
            c = document.createElement("DIV");
            var e = document.createElement("CANVAS"),
              g = e.getContext("2d");
            e.style.border = "1px solid #AAAAAA";
            e.width = b.TOUCH_ENABLED ? 200 : 100;
            e.height = b.TOUCH_ENABLED ? 40 : 20;
            g.lineWidth = a;
            g.beginPath();
            g.moveTo(10, e.height / 2);
            g.lineTo(e.width - 10, e.height / 2);
            g.stroke();
            c.appendChild(e);
            d("#iEBox_brushList").append(c);
          });
        },
        getIsOpen: function () {
          return g._isOpen;
        },
        setIsOpen: function (a) {
          g._isOpen = a;
        },
        _show: function (b) {
          g.hide();
          g._overlay("show");
          d("BODY").append(a());
          g.setIsOpen(!0);
          d("#iEBox_container").focus();
          g._createBrushes();
          g._reposition();
          d("#iEBox_container");
          var c = d("#iEBox_canvas"),
            e = d("#iEBox_container").outerWidth(!0),
            f = d("#iEBox_container").outerHeight(!0);
          g.canvas_spacing = { x: e - c[0].width, y: f - c[0].height };
          g._maintainPosition(!0);
          g._attachCallbacks(b);
        },
        hide: function () {
          d("#iEBox_container").remove();
          this._overlay("hide");
          g.setIsOpen(!1);
          this._maintainPosition(!1);
        },
        _overlayResize: function (a) {
          d("#iEBox_overlay").height() != d(document).height() &&
            d("#iEBox_overlay").height(d(document).height());
        },
        _disableMove: function (a) {
          a.preventDefault();
        },
        _overlay: function (a) {
          switch (a) {
            case "show":
              this._overlay("hide");
              d("BODY").append('\x3cdiv id\x3d"iEBox_overlay"\x3e\x3c/div\x3e');
              d("#iEBox_overlay").css({
                position: "fixed",
                zIndex: 99997,
                top: "0px",
                left: "0px",
                width: "100%",
                height: d(document).height(),
                background: this.overlayColor,
                opacity: this.overlayOpacity,
              });
              if (c.ut.XfaUtil.prototype.isSafari())
                d("#iEBox_overlay").on("touchmove", this._disableMove);
              d(document).on("scroll", this._overlayResize);
              break;
            case "hide":
              c.ut.XfaUtil.prototype.isSafari() &&
                d("#iEBox_overlay").off("touchmove"),
                d("#iEBox_overlay").remove(),
                d(document).off("scroll", this._overlayResize);
          }
        },
        _resize: function () {
          var a = d(window).width(),
            b = d(window).height(),
            c = d("#iEBox_canvas")[0],
            e = d("#keyboard_Sign_Box")[0],
            f = d("#iEBox_geoCanvasBottom")[0],
            l = d("#iEBox_geoCanvasRight")[0],
            k = c.width + l.width,
            h = c.height + f.height;
          a = k + g.canvas_spacing.x - a;
          0 > a && (a = 0);
          b = h + g.canvas_spacing.y - b;
          0 > b && (b = 0);
          0 < a || 0 < b
            ? (b * k > h * a
                ? ((b = h - b), (a = (b * k) / h))
                : ((a = k - a), (b = (a * h) / k)),
              (k = (a * c.width) / k),
              (h = (b * c.height) / h),
              (c.style.width = k + "px"),
              (c.style.height = h + "px"),
              (e.style.width = k + "px"),
              (e.style.height = h + "px"),
              (f.style.width = k + "px"),
              (f.style.height = b - h + "px"),
              (l.style.width = a - k + "px"),
              (l.style.height = h + "px"),
              d("#iEBox_caption").width(Math.floor(k)))
            : ((c.style.width = c.width + "px"),
              (c.style.height = c.height + "px"),
              (e.style.width = c.width + "px"),
              (e.style.height = c.height + "px"),
              (f.style.width = f.width + "px"),
              (f.style.height = f.height + "px"),
              (l.style.width = l.width + "px"),
              (l.style.height = l.height + "px"),
              d("#iEBox_caption").width(c.width));
        },
        _reposition: function () {
          var a =
              (d(window).height() *
                (1 / c.ut.XfaUtil.prototype.formScaleFactor)) /
                2 -
              d("#iEBox_container").outerHeight() / 2 +
              g.verticalOffset,
            b =
              (d(window).width() *
                (1 / c.ut.XfaUtil.prototype.formScaleFactor)) /
                2 -
              d("#iEBox_container").outerWidth() / 2 +
              g.horizontalOffset;
          0 > a && (a = 0);
          0 > b && (b = 0);
          d("#iEBox_container").css({
            top:
              a +
              d(window).scrollTop() *
                (1 / c.ut.XfaUtil.prototype.formScaleFactor) +
              "px",
            left:
              b +
              d(window).scrollLeft() *
                (1 / c.ut.XfaUtil.prototype.formScaleFactor) +
              "px",
          });
          d("#iEBox_container").focus();
          d("#iEBox_overlay").height(d(document).height());
        },
        _maintainDialog: function () {
          g._resize();
          g._reposition();
        },
        _maintainPosition: function (a) {
          if (g.repositionOnResize)
            switch (a) {
              case !0:
                d(window).on("orientationchange", g._maintainDialog);
                break;
              case !1:
                d(window).off("orientationchange", g._maintainDialog);
            }
        },
      };
    return g;
  })();
  a.prototype = {
    init: function (a, b) {
      this._successHandler = a;
      this._errorHandler = b;
      this._active = !0;
      return this;
    },
    _handleSuccess: function (a) {
      this._successHandler(a);
    },
    _handleError: function (a) {
      this._errorHandler(a);
    },
    query: function () {
      _that = this;
      navigator.geolocation.getCurrentPosition(
        function (a) {
          _that._active && _that._handleSuccess(a);
          _that._active = !1;
        },
        function (a) {
          _that._active && _that._handleError(a);
          _that._active = !1;
        },
        { timeout: 1e4 },
      );
    },
    cancel: function () {
      _that._active = !1;
    },
  };
  var k = {
      _keyStr:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d",
      encode: function (a) {
        for (var b = "", c, e, d, g, f, l, k = 0; k < a.length; )
          (c = a.charCodeAt(k++)),
            (e = a.charCodeAt(k++)),
            (d = a.charCodeAt(k++)),
            (g = c >> 2),
            (c = ((c & 3) << 4) | (e >> 4)),
            (f = ((e & 15) << 2) | (d >> 6)),
            (l = d & 63),
            isNaN(e) ? (f = l = 64) : isNaN(d) && (l = 64),
            (b =
              b +
              this._keyStr.charAt(g) +
              this._keyStr.charAt(c) +
              this._keyStr.charAt(f) +
              this._keyStr.charAt(l));
        return b;
      },
      decode: function (a) {
        var b = "",
          c = 0;
        for (a = a.replace(/[^A-Za-z0-9\+\/=]/g, ""); c < a.length; ) {
          var e = this._keyStr.indexOf(a.charAt(c++));
          var d = this._keyStr.indexOf(a.charAt(c++));
          var g = this._keyStr.indexOf(a.charAt(c++));
          var f = this._keyStr.indexOf(a.charAt(c++));
          e = (e << 2) | (d >> 4);
          d = ((d & 15) << 4) | (g >> 2);
          var l = ((g & 3) << 6) | f;
          b += String.fromCharCode(e);
          64 != g && (b += String.fromCharCode(d));
          64 != f && (b += String.fromCharCode(l));
        }
        return b;
      },
    },
    h = (function () {
      var a = {
        _LC_Scribble_MetaDataKey: "LC_SCIBBLE_METADATA",
        _isPng: function (a) {
          return a && 0 == a.replace(/\s+/g, "").indexOf("iVBORw0KGgo");
        },
        _update_crc: function (b, c) {
          var e;
          for (e = 0; e < c.length; e++)
            b = this._XOR(
              a._crc_table[(this._XOR(b, c.charCodeAt(e)) & 255) >>> 0],
              b >>> 8,
            );
          return b;
        },
        _XOR: function (a, b) {
          return (a ^ b) >>> 0;
        },
        _U32Int2Str: function (a) {
          return (
            String.fromCharCode((a >>> 24) & 255) +
            String.fromCharCode((a >>> 16) & 255) +
            String.fromCharCode((a >>> 8) & 255) +
            String.fromCharCode((a >>> 0) & 255)
          );
        },
        _init_crc_table: function () {
          var b, c;
          a._crc_table = [];
          for (b = 0; 256 > b; b++) {
            var e = b;
            for (c = 0; 8 > c; c++)
              e = 0 < (e & 1) >>> 0 ? a._XOR(3988292384, e >>> 1) : e >>> 1;
            a._crc_table[b] = e;
          }
        },
        _CRC: function (a) {
          this._crc_table || this._init_crc_table();
          return this._XOR(this._update_crc(4294967295, a), 4294967295);
        },
        _prepareTextChunk: function (b, c) {
          c = a._U32Int2Str(b.length);
          var e = a._U32Int2Str(a._CRC("tEXt" + b));
          return c + "tEXt" + b + e;
        },
        _start: function (b) {
          a._startTime = new Date().getTime();
          a._startFun = b;
        },
        _end: function () {
          new Date().getTime();
        },
        _readU32Int: function (a) {
          var b = a.d;
          return (
            ((b.charCodeAt(a.p++) << 24) |
              (b.charCodeAt(a.p++) << 16) |
              (b.charCodeAt(a.p++) << 8) |
              b.charCodeAt(a.p++)) >>>
            0
          );
        },
        _readChunkType: function (a) {
          var b = a.d;
          return b[a.p++] + b[a.p++] + b[a.p++] + b[a.p++];
        },
        _makeReadOnly: function (b) {
          a._start("_makeReadOnly");
          b = { p: 0, d: a._atob(b.replace(/\s+/g, "")) };
          b.p += 8;
          var c = a._readU32Int(b);
          a._readChunkType(b);
          b.p += c;
          a._readU32Int(b);
          c = a._prepareTextChunk(
            a._LC_Scribble_MetaDataKey + String.fromCharCode(0) + "true",
          );
          b = b.d.substring(0, b.p) + c + b.d.substring(b.p);
          b = a._btoa(b);
          a._end();
          return b;
        },
        _atob: function (a) {
          return window.atob ? atob(a) : k.decode(a);
        },
        _btoa: function (a) {
          return window.btoa ? btoa(a) : k.encode(a);
        },
        _isReadOnly: function (b) {
          a._start("_isReadOnly");
          if (a._isPng(b)) {
            var c =
              a._LC_Scribble_MetaDataKey + String.fromCharCode(0) + "true";
            b = { p: 0, d: a._atob(b.replace(/\s+/g, "")) };
            for (b.p += 8; b.p < b.d.length; ) {
              var e = a._readU32Int(b);
              if ("tEXt" == a._readChunkType(b) && b.d.indexOf(c, b.p) == b.p)
                return a._end(), !0;
              b.p += e;
              a._readU32Int(b);
            }
          }
          a._end();
          return !1;
        },
      };
      return a;
    })();
  d.widget("xfaWidget.ScribbleImageField", d.xfaWidget.imageField, {
    _widgetName: "ScribbleImageField",
    _geoLocQuery: null,
    _emptyImageVal: null,
    _extraInfo: null,
    _defaultStatus: "\x26nbsp;",
    _enforceGeoLoc: !!navigator.userAgent.match(/iPad/i),
    _sigCanvasWidth: 696,
    _sigCanvasHeight: 390,
    _geoCanvId: null,
    _geoLocAtBottom: !1,
    _geoCanvasHeight: 100,
    _geoCanvasWidth: 696,
    _is_readonly: !1,
    options: { tabIndex: 0, role: "img" },
    getOptionsMap: function () {
      var a = d.xfaWidget.defaultWidget.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, a, {
        displayValue: function (a) {
          this.options.commitProperty &&
            (a
              ? (this.$userControl.removeClass("emptyScribble"),
                (a = h._isPng(a)
                  ? "data:image/png;base64," + this.options.value
                  : "data:;base64," + this.options.value),
                this._setValue(a))
              : (this._displayValue(
                  this._extractData(this._createEmptyImageData()),
                ),
                this.$userControl.addClass("emptyScribble"),
                (this._is_readonly = !1)));
        },
      });
    },
    getEventMap: function () {
      var a = d.xfaWidget.defaultWidget.prototype.getEventMap.apply(
        this,
        arguments,
      );
      return d.extend({}, a, {
        scribblefocus: c.ut.XfaUtil.prototype.XFA_ENTER_EVENT,
        click: null,
        scribbleclick: c.ut.XfaUtil.prototype.XFA_CLICK_EVENT,
        change: null,
        scribblechange: c.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
        blur: null,
        scribbleclose: c.ut.XfaUtil.prototype.XFA_EXIT_EVENT,
      });
    },
    aspectRatioToBeUsed: function () {
      if (this.options.aspectRatio && 0 < parseFloat(this.options.aspectRatio))
        var a = 1 / parseFloat(this.options.aspectRatio);
      else {
        a = this.element.children("img");
        var b = a.attr("width"),
          c = a.attr("height");
        b = b ? parseInt(b, 10) : a.width();
        a = (c ? parseInt(c, 10) : a.height()) / b;
      }
      return a;
    },
    _setUpCanvas: function () {
      var a = this.aspectRatioToBeUsed();
      var b = 640;
      var c = 640 * a;
      480 < c && ((c = 480), (b = 480 / a));
      1 <= a
        ? ((this._geoCanvId = "iEBox_geoCanvasBottom"),
          (this._geoLocAtBottom = !0),
          (this._geoCanvasWidth = b),
          (this._geoCanvasHeight = Math.min(84, c / 3)),
          (this._sigCanvasWidth = b),
          (this._sigCanvasHeight =
            c - (this._enforceGeoLoc ? this._geoCanvasHeight : 0)))
        : ((this._geoCanvId = "iEBox_geoCanvasRight"),
          (this._geoLocAtBottom = !1),
          (this._geoCanvasHeight = c),
          (this._geoCanvasWidth = Math.min(250, b / 3)),
          (this._sigCanvasHeight = c),
          (this._sigCanvasWidth =
            b - (this._enforceGeoLoc ? this._geoCanvasWidth : 0)));
    },
    render: function () {
      var a = this.options.geoLocMandatoryOnIpad;
      "undefined" != typeof a &&
        (this._enforceGeoLoc =
          this._enforceGeoLoc && /^(true|1)$/i.test(d.trim(a)));
      this._wgtId =
        "wid" + ~~(2e3 * Math.random()) + "_" + new Date().getTime();
      a = d.xfaWidget.defaultWidget.prototype.render.apply(this, arguments);
      if (this.options.value || this.options.value != this._emptyImageVal)
        this._is_readonly = !!h._isReadOnly(this.options.value);
      this._is_readonly
        ? a.after(
            "\x3cdiv id\x3d'" +
              this._wgtId +
              "' class\x3d'sc_popUpMenu'\x3e\x3c/div\x3e",
          )
        : a.after(
            "\x3cdiv id\x3d'" +
              this._wgtId +
              "' style\x3d'display:none;' class\x3d'sc_popUpMenu'\x3e\x3c/div\x3e",
          );
      this._setUpCanvas();
      return a;
    },
    click: function () {
      this.focus();
      var a = this.element.length ? this.element[0] : this.element;
      "open" == this.options.access &&
        (b.POINTER_ENABLED || b.TOUCH_ENABLED
          ? (a.dispatchEvent(b.getPointerEvent(b.POINTER_DOWN)),
            a.dispatchEvent(b.getPointerEvent(b.POINTER_UP)))
          : this.$userControl.triggerHandler("click"));
    },
    _attachEventHandlers: function (a) {
      b.POINTER_ENABLED || b.TOUCH_ENABLED
        ? this._attachTouchEventHandlers(a)
        : this._attachMouseEventHandlers(a);
      a.keydown(d.proxy(this._handleKeyDown, this));
    },
    _attachEventHandlerForCrossIcon: function (a) {
      var b = this;
      a.mouseenter(function (a) {
        if (
          "open" == b.options.access &&
          (a.stopPropagation(), b._is_readonly)
        ) {
          d("#" + b._wgtId).css({ display: "block" });
          var c;
          d("body").on(
            "mousemove",
            (c = function (a) {
              a.target != d("#" + b._wgtId)[0] &&
                a.target != b.$userControl[0] &&
                (d("#" + b._wgtId).css({ display: "none" }),
                d("body").off("mousemove", c));
            }),
          );
        }
      });
      setTimeout(function () {
        d("#" + b._wgtId).click(d.proxy(b._onCrossClick, b));
      }, 50);
    },
    _attachTouchEventHandlers: function (a) {
      var c,
        e = this,
        g = this.element.length ? this.element[0] : this.element;
      g.addEventListener(b.POINTER_DOWN, function (a) {
        "open" == e.options.access &&
          (a.preventDefault(),
          (c = setTimeout(function () {
            c = 0;
            e._onCrossClick(a);
          }, 1e3)));
      });
      g.addEventListener(b.POINTER_UP, function (a) {
        "open" == e.options.access &&
          (a.preventDefault(), c && (clearTimeout(c), e._onImageClick(a)));
      });
      b.POINTER_ENABLED &&
        (this._attachEventHandlerForCrossIcon(a),
        setTimeout(function () {
          d("#" + e._wgtId).on(b.POINTER_UP, function (a) {
            a.stopPropagation();
          });
        }, 50));
    },
    _attachMouseEventHandlers: function (a) {
      var b = 0,
        c = this;
      a.dblclick(function (a) {
        "open" == c.options.access &&
          (a.preventDefault(),
          a.stopPropagation(),
          b.val && (clearTimeout(b), (b = 0)),
          c._onCrossClick(a));
      }).click(function (a) {
        c.$userControl.trigger("scribbleclick", a);
        "open" == c.options.access &&
          (a.preventDefault(),
          a.stopPropagation(),
          b
            ? (clearTimeout(b), (b = 0))
            : (b = setTimeout(function () {
                b = 0;
                c._onImageClick(a);
              }, 500)));
      });
      this._attachEventHandlerForCrossIcon(a);
    },
    _onCrossClick: function (a) {
      this._is_readonly &&
        (this.$userControl.trigger("scribblefocus", a),
        this.$userControl.trigger("scribbleclick", a),
        a.stopPropagation(),
        d.alertBox.yesNo(
          null,
          this.localeStrings().clearSignatureConfirm,
          this.localeStrings().clearSignature,
          d.proxy(this._removeSigConfirmationHandler, this),
        ));
    },
    _removeSigConfirmationHandler: function (a) {
      a &&
        (this._saveValue(this._emptyImageVal),
        this._displayValue(this._extractData(this._createEmptyImageData())),
        this.$userControl
          .addClass("emptyScribble")
          .trigger("scribbleclose", {}),
        (this._is_readonly = !1));
    },
    _createEmptyImageData: function () {
      if (!this._emptyImageData) {
        var a = document.createElement("canvas");
        a.style.width = this._sigCanvasWidth + "px";
        a.style.height = this._sigCanvasHeight + "px";
        a.width = this._sigCanvasWidth;
        a.height = this._sigCanvasHeight;
        var b = a.getContext("2d");
        b.fillStyle = "#ffffff";
        b.clearRect(0, 0, this._sigCanvasWidth, this._sigCanvasHeight);
        this._emptyImageData = a.toDataURL("image/png");
      }
      return this._emptyImageData;
    },
    getCommitValue: function () {
      return this.options.value;
    },
    _saveValue: function (a) {
      this.options.value = a;
      this.$userControl.trigger("scribblechange");
    },
    _displayValue: function (a) {
      this.options.commitProperty
        ? a && this._setValue("data:image/png;base64," + a)
        : this.logger().debug(
            "xfaView",
            "[DefaultWidget._update], User Control or Commit Property is null",
          );
    },
    _doOk: function () {
      var a = document.createElement("CANVAS"),
        b = d("#" + this._geoCanvId)[0],
        c = d("#iEBox_canvas")[0],
        e = a.getContext("2d");
      0 < b.width && 0 < b.height
        ? this._geoLocAtBottom
          ? ((a.width = c.width),
            (a.height = c.height + b.height),
            e.drawImage(c, 0, 0),
            e.drawImage(b, 0, c.height))
          : ((a.width = c.width + b.width),
            (a.height = c.height),
            e.drawImage(c, 0, 0),
            e.drawImage(b, c.width, 0))
        : ((a.width = c.width), (a.height = c.height), e.drawImage(c, 0, 0));
      g.hide();
      a = a.toDataURL("image/png");
      if ((a = this._extractData(a)))
        (a = h._makeReadOnly(a)), this._saveValue(a), (this._is_readonly = !0);
      this._geoLocQuery && this._geoLocQuery.cancel();
      this.$userControl.trigger("scribbleclose");
    },
    _handleOk: function () {
      this._enforceGeoLoc
        ? ((this._geoLocQuery = new a().init(
            d.proxy(function (a) {
              this._geoQuerySuccessHandler(a);
              this._doOk();
            }, this),
            d.proxy(this._geoQueryErrorHandler, this),
          )),
          this._geoLocQuery.query(),
          this._showMessage(this.localeStrings().fetchGeoLocation))
        : this._doOk();
    },
    _handleCancel: function () {
      g.hide();
      this._geoLocQuery && this._geoLocQuery.cancel();
      this.$userControl.trigger("scribbleclose");
    },
    _handleClear: function () {
      this.myScribbleHandle.setEnabled(!0);
      this._is_readonly = !1;
      this._makeReadOnly(this._is_readonly);
      d("#iEBox_canvas")[0].width = this._sigCanvasWidth;
      d("#iEBox_caption").width(this._sigCanvasWidth);
      d("#iEBox_canvas")[0].height = this._sigCanvasHeight;
      d("#keyboard_Sign_Box")[0].value = "";
      var a = d("#" + this._geoCanvId)[0];
      g.enableButtons({ Ok: !1, Clear: !1 });
      a.width = 0;
      a.height = 0;
      g._resize();
      this._geoLocQuery && this._geoLocQuery.cancel();
    },
    _makeReadOnly: function (a) {
      g.enableButtons({ Ok: !1, Clear: !1, Geo: !a, Brush: !a, Text: !a });
      a &&
        (d("#iEBox_canvas").css({ border: "1px solid gray" }),
        d("#iEBox_caption").css({ display: "none" }));
      this._defaultStatus = "\x26nbsp;";
      this._showMessage(this._defaultStatus);
    },
    _showMessage: function (a) {
      var b = this;
      this._msgTimeout &&
        (clearTimeout(this._msgTimeout), (this._msgTimeout = 0));
      d("#iEBox_title").replaceWith(
        '\x3cdiv id\x3d"iEBox_title"\x3e' + a + "\x3c/div\x3e",
      );
      this._msgTimeout = window.setTimeout(function () {
        d("#iEBox_title").replaceWith(
          '\x3cdiv id\x3d"iEBox_title"\x3e' + b._defaultStatus + "\x3c/div\x3e",
        );
      }, 15e3);
    },
    _geoQueryErrorHandler: function (a) {
      this._showMessage(this.localeStrings().errorFetchGeoLocation);
    },
    _getLogMessage: function (a) {
      return this.logMsgs()[a] || a;
    },
    _handleGeo: function () {
      navigator.geolocation
        ? ((this._geoLocQuery = new a().init(
            d.proxy(this._geoQuerySuccessHandler, this),
            d.proxy(this._geoQueryErrorHandler, this),
          )),
          this._geoLocQuery.query(),
          this._showMessage(this.localeStrings().fetchGeoLocation))
        : this.logger().debug(
            "xfaView",
            this._getLogMessage("ALC-FRM-901-011"),
          );
    },
    calculateGeolocation: function () {
      this._handleGeo();
    },
    _handleText: function () {
      var a = document.getElementById("keyboard_Sign_Box");
      document.getElementById("iEBox_canvas");
      0 == a.value.length && this._handleClear();
      this._disableSignatureCanvas();
      this._enableSignatureTextBox();
      a.focus();
    },
    _disableSignatureTextBox: function () {
      document.getElementById("keyboard_Sign_Box").style.display = "none";
    },
    _enableSignatureTextBox: function () {
      document.getElementById("keyboard_Sign_Box").style.display =
        "inline-block";
    },
    _disableSignatureCanvas: function () {
      document.getElementById("iEBox_canvas").style.display = "none";
    },
    _enableSignatureCanvas: function () {
      document.getElementById("iEBox_canvas").style.display = "inline-block";
    },
    _handleBrushSelect: function (a) {
      this.myScribbleHandle &&
        !this._is_readonly &&
        this.myScribbleHandle.setLineWidth(a);
    },
    _handleBrush: function (a) {
      0 < d("#keyboard_Sign_Box")[0].value.length && this._handleClear();
      this._disableSignatureTextBox();
      this._enableSignatureCanvas();
      g.toggleBrushList(a);
    },
    _handleKeyDown: function (a) {
      13 == a.keyCode || 13 == a.charCode || 13 == a.which
        ? (a.preventDefault(), this._onImageClick(a))
        : (46 != a.keyCode && 46 != a.charCode && 46 != a.which) ||
          this._onCrossClick(a);
    },
    _dialogCallback: function (a, b) {
      switch (a) {
        case "Ok":
          this._handleOk();
          break;
        case "Cancel":
          this._handleCancel();
          break;
        case "Clear":
          this._handleClear();
          break;
        case "Geo":
          this.calculateGeolocation();
          break;
        case "BrushSelect":
          this._handleBrushSelect(b);
          break;
        case "Brush":
          this._handleBrush(b);
          break;
        case "Text":
          this._handleText();
      }
    },
    _geoQuerySuccessHandler: function (a) {
      this._renderPosition(a);
    },
    _fitGeoLocText: function (a, b, c, e, d, g) {
      var f = 12;
      e.font = "bold " + f + "pt Arial";
      for (
        var k = Math.max(
            e.measureText(a).width,
            e.measureText(b).width,
            e.measureText(c).width,
          ),
          h = 1.5 * e.measureText("m").width;
        (k > d || 3 * h > g) && 1 < f;

      )
        f--,
          (e.font = "bold " + f + "pt Arial"),
          (k = Math.max(
            e.measureText(a).width,
            e.measureText(b).width,
            e.measureText(c).width,
          )),
          (h = 1.5 * e.measureText("m").width);
      return { width: k, lineHeight: h, fontSize: f };
    },
    _renderPosition: function (a) {
      if (a && a.coords) {
        this._showMessage("\x26nbsp;");
        var b = this.localeStrings().latitude + ": " + a.coords.latitude;
        a = this.localeStrings().longitude + ": " + a.coords.longitude;
        var c = new Date(),
          e = (c.getTimezoneOffset() / 60) * -1;
        c =
          this.localeStrings().time +
          ": " +
          (c.getMonth() + 1) +
          "/" +
          c.getDate() +
          "/" +
          c.getFullYear() +
          " " +
          c.getHours() +
          ":" +
          c.getMinutes() +
          ":" +
          c.getSeconds() +
          (0 < e ? " +" : " ") +
          e;
        e = d("#" + this._geoCanvId)[0];
        var f = d("#iEBox_canvas")[0],
          k = d("#keyboard_Sign_Box")[0],
          h = document.createElement("canvas");
        if (e) {
          var l = e.getContext("2d");
          l.font = "bold 12pt Arial";
          e.width = this._geoCanvasWidth;
          e.height = this._geoCanvasHeight;
          var w = this._fitGeoLocText(b, a, c, l, e.width, e.height);
          var x = this.aspectRatioToBeUsed();
          this._enforceGeoLoc ||
            (this._geoLocAtBottom
              ? ((h.height = this._sigCanvasHeight - e.height),
                (h.width = h.height / x))
              : ((h.width = this._sigCanvasWidth - e.width),
                (h.height = h.width * x)),
            h.getContext("2d").drawImage(f, 0, 0, h.width, h.height),
            this._geoLocAtBottom
              ? ((f.height = h.height),
                (k.height = h.height),
                f.getContext("2d").drawImage(h, (f.width - h.width) / 2, 0))
              : ((f.width = h.width),
                (k.width = h.width),
                f.getContext("2d").drawImage(h, 0, (f.height - h.height) / 2)),
            d("#iEBox_caption").width(f.width),
            g.enableButtons({ Clear: !0 }));
          f = w.lineHeight;
          l.fillStyle = "#555555";
          l.font = "bold " + w.fontSize + "pt Arial";
          l.fillText(b, 0, e.height - 2 * f - 2);
          l.fillText(a, 0, e.height - f - 2);
          l.fillText(c, 0, e.height - 2);
          g._resize();
        }
      }
    },
    _scribbleCallback: function () {
      g.enableButtons({ Clear: !0, Ok: !0 });
    },
    _onImageClick: function () {
      if (!g.getIsOpen()) {
        var a = this;
        g.show("\x26nbsp;", d.proxy(this._dialogCallback, this));
        this._enforceGeoLoc || d("#iEBox_Geo").css({ display: "inline-block" });
        var b = new Image();
        b.onload = function () {
          a.myScribbleHandle = new f(
            "iEBox_canvas",
            b,
            b.width,
            b.height,
            d.proxy(a._scribbleCallback, a),
          );
          a.myScribbleHandle.setEnabled(!a._is_readonly);
          d("#iEBox_caption").width(b.width);
          d("#iEBox_container").css({ display: "table" });
          g._resize();
          g._reposition();
        };
        this.options.value && this.options.value != this._emptyImageVal
          ? (this.$userControl.removeClass("emptyScribble"),
            h._isPng(this.options.value)
              ? ((this._is_readonly = !!h._isReadOnly(this.options.value)),
                (b.src = "data:image/png;base64," + this.options.value))
              : (b.src = "data:;base64," + this.options.value))
          : ((this._is_readonly = !1),
            this.$userControl.addClass("emptyScribble"),
            (b.src = this._createEmptyImageData()));
        this._makeReadOnly(this._is_readonly);
      }
    },
    _extractData: function (a) {
      var b;
      if (
        null != a &&
        0 < a.length &&
        0 == a.indexOf("data:") &&
        0 < (b = a.indexOf(","))
      )
        return a.substr(b + 1);
    },
    _setValue: function (a) {
      this.$userControl.prop(this.options.commitProperty, a);
      this.$userControl.attr(this.options.commitProperty, a);
      this._dummyImg &&
        this._dummyImg.setAttribute(this.options.commitProperty, a);
    },
  });
  d(function () {
    d("body").on("touchstart", function (a) {});
  });
})($, xfalib);
(function (d, c) {
  var f = function (a, b) {
      this.options = b;
      this.$elementFileUploadBtn = [];
      this.$elementFileList = [];
      this.$element = d(a);
      this.$element.attr("multiple") &&
        !xfalib.ut.Utilities._isDataContainerSupported() &&
        this.$element.removeAttr("multiple");
      this.$parent = this.$element.parent();
      this.invalidFeature = { SIZE: 1, NAME: 2, MIMETYPE: 3 };
      Object.freeze(this.invalidFeature);
      this.regexMimeTypeList = this.options.mimeType.map(function (a, b) {
        try {
          return new RegExp(a.trim());
        } catch (l) {
          c.console && console.log(l);
        }
      });
    },
    a =
      d.browser.msie &&
      ("9.0" === d.browser.version || "10.0" === d.browser.version),
    b = 0;
  f.prototype = {
    _fileIframeName: "guide-fu-iframe",
    _addFile: "Add File",
    clear: function () {
      this.$element.val("");
      this.$elementFileList.empty();
    },
    destroy: function () {
      this.$fileDomElements = d.map(this.$fileDomElements, function (a) {
        if (_.isObject(a) && 0 === a.val().length) return a;
      });
      this.values = [];
      a &&
        (null == _.last(this.$fileDomElements)
          ? this.cloneFileInputAndUpdateIdForIE9()
          : this.updateLabelForAttr(_.last(this.$fileDomElements).attr("id")));
      this.$element.trigger("change.fileupload");
    },
    _setUrl: function (a, b) {
      this.$elementFileList.find("span.guide-fu-fileName").eq(b).data("key", a);
    },
    _getUrl: function (a) {
      return this.$elementFileList
        .find("span.guide-fu-fileName")
        .eq(a)
        .data("key");
    },
    getSetFilePathAndReturnNamePathMap: function (a) {
      var b = {},
        c,
        e;
      d.each(this.$elementFileList.children(), function (g, f) {
        c = d(f).find("span.guide-fu-fileName");
        e = c.data("key");
        !e && a && a[g] && c.data("key", a[g]);
        b[c.html()] = e || c.data("key");
      });
      return b;
    },
    value: function (a) {
      if (_.isUndefined(a)) return this.values;
      var b = this,
        c = this.comment(),
        e = !1,
        f = _.isArray(this.options.fileNames) ? this.options.fileNames : null,
        m = {};
      this.$elementFileList
        .children()
        .find("span.guide-fu-fileName")
        .each(function () {
          var a = d(this).data("key");
          if (!_.isUndefined(a)) {
            var b = a.substring(a.lastIndexOf("/") + 1);
            m[b] = a;
          }
        });
      this.$elementFileList.empty();
      if (null != a) {
        a = a.split("\n");
        if (f && _.isEmpty(this._initialFileValueFileNameMap))
          for (var p = 0; p < f.length; p++)
            b._initialFileValueFileNameMap[a[p]] = f[p];
        this.values = _.map(a, function (a, d) {
          var g = a.lastIndexOf("/"),
            h = a,
            k = null;
          -1 !== g
            ? ((h = k = a),
              (a = a.substring(g + 1)),
              (_.isObject(b.$fileDomElements[d]) &&
                0 < b.$fileDomElements[d].val().length) ||
              _.isString(b.$fileDomElements[d])
                ? ((e = !0), (b.$fileDomElements[d] = null))
                : null !== b.$fileDomElements[d] &&
                  ((e = !0), b.$fileDomElements.splice(d, 0, null)))
            : m[a] && (k = m[a]);
          f &&
            b._initialFileValueFileNameMap[h] &&
            (a = b._initialFileValueFileNameMap[h]);
          b.showFileList(a, c[d], k);
          return h;
        });
        e && this.$element.trigger("change.fileupload");
      } else
        _.isArray(this.values) && 0 !== this.values.length && this.destroy();
    },
    fileAttachment: function () {
      return this.values;
    },
    comment: function (a) {
      var b = null;
      if (_.isUndefined(a)) {
        b = this.$elementFileList.find("div.guide-fu-comment");
        var c = [];
        b.each(function () {
          c.push(d(this).text());
        });
        return c;
      }
      null != a &&
        ((c = a.split("\n")),
        (b = this.$elementFileList.find("div.guide-fu-comment")),
        b.each(function (a) {
          d(this).text(c[a]);
        }));
    },
    multiSelect: function (a) {
      if (void 0 !== a) this.options.multiSelect = a;
      else return this.options.multiSelect;
    },
    fileSizeLimit: function (a) {
      if (void 0 !== a) this.options.fileSizeLimit = a;
      else return this.options.fileSizeLimit;
    },
    mimeType: function (a) {
      if (void 0 !== a) this.options.mimeType = a;
      else return this.options.mimeType;
    },
    access: function (a) {
      "readOnly" == a
        ? (this.$element.attr("disabled", "disabled"),
          d(this.$parent).addClass("guide-fu-disabled"))
        : "open" == a &&
          (this.$element.removeAttr("disabled"),
          d(this.$parent).removeClass("guide-fu-disabled"));
    },
    fileList: function (b) {
      var c = this;
      if (void 0 !== b) {
        this.$fileDomElements = [];
        _.each(b, function (b, e) {
          if ((_.isObject(b) && (a || 0 < b.val().length)) || _.isString(b))
            _.isString(b) && (b = null), (c.$fileDomElements[e] = b);
        });
        var e = this.$fileDomElements;
        a &&
          null !== b &&
          (null == _.last(this.$fileDomElements)
            ? this.cloneFileInputAndUpdateIdForIE9()
            : this.updateLabelForAttr(
                _.last(this.$fileDomElements).attr("id"),
              ));
      } else
        e = d.map(this.$fileDomElements, function (a, b) {
          if (!a) return c._getUrl(b);
          if (
            (a[0].files && 0 !== a[0].files.length) ||
            c.options.multiSelect ||
            0 < a[0].value.length
          )
            return a;
        });
      return e;
    },
    fileItemPreview: function () {
      return d("\x3cspan\x3e\x3c/span\x3e").addClass(
        "guide-fu-filePreview glyphicon glyphicon-ok",
      );
    },
    buttonText: function (a, b) {
      if (void 0 !== a)
        b || (this.options.buttonText = a),
          this.$elementFileUploadBtn.find("span.guide-fu-label").html(a);
      else return this.options.buttonText;
    },
    btnIcon: function () {
      return d("\x3cspan\x3e\x3c/span\x3e").addClass(
        "guide-fu-icon glyphicon glyphicon-folder-open",
      );
    },
    btnLabel: function () {
      return d("\x3cspan\x3e\x3c/span\x3e")
        .addClass("guide-fu-label")
        .html(this.options.buttonText);
    },
    fileItemList: function () {
      return this.$parent.find(this.options.fileItemListClass);
    },
    getNewCommentElementSummary: function (a) {
      return d("\x3cdiv title\x3d'Click to edit' tabindex\x3d'0'\x3e\x3c/p\x3e")
        .addClass("guide-fu-comment")
        .text(a || "Enter comments here");
    },
    getNewCommentElement: function (a) {
      return d(
        "\x3cdiv contenteditable\x3d'true' tabindex\x3d'0'\x3e\x3c/div\x3e",
      )
        .addClass("guide-fu-comment")
        .text(a || "");
    },
    fileItem: function (a, b, c) {
      var e = d("\x3cli\x3e\x3c/li\x3e").addClass("guide-fu-fileItem");
      a = xfalib.ut.Utilities._getNameWithoutMarker(a);
      var g = d("\x3cspan tabindex\x3d'0'\x3e\x3c/span\x3e")
        .addClass("guide-fu-fileName")
        .attr("aria-label", a)
        .text(a)
        .appendTo(e)
        .keypress(function (a) {
          (13 !== a.keyCode && 32 !== a.charCode) || d(a.target).click();
        })
        .click(d.proxy(this.handleFilePreview, this));
      this.options.disablePreview && g.addClass("non-preview-fileName");
      null != c && g.attr("data-key", c);
      d("\x3cspan tabindex\x3d'0'\x3e\x3c/span\x3e")
        .addClass("guide-fu-fileClose close")
        .attr("role", "button")
        .attr("aria-label", xfalib.locale.Strings.FileCloseAccessText + a)
        .text("x")
        .appendTo(e)
        .keypress(function (a) {
          (13 !== a.keyCode && 32 !== a.charCode) || d(a.target).click();
        })
        .click(d.proxy(this.handleClick, this));
      this.fileItemPreview().appendTo(e);
      this.options.showComment &&
        this.getNewCommentElementSummary(b)
          .appendTo(e)
          .focus(d.proxy(this.handleCommentClick, this))
          .click(d.proxy(this.handleCommentClick, this));
      return e;
    },
    toggleFileUploadBtn: function () {
      this.options.multiSelect &&
        (0 < this.$elementFileList.children().length
          ? (this.buttonText(this._addFile, !0),
            this.$elementFileUploadBtn
              .find("span.guide-fu-icon")
              .removeClass("glyphicon-folder-open")
              .addClass("glyphicon-plus"))
          : (this.buttonText(this.options.buttonText),
            this.$elementFileUploadBtn
              .find("span.guide-fu-icon")
              .removeClass("glyphicon-plus")
              .addClass("glyphicon-folder-open")));
    },
    showInvalidMessage: function (a, b) {
      var c = this,
        e = null !== navigator.userAgent.match(/iPad/i),
        d = null !== navigator.userAgent.match(/iPhone/i);
      e || d
        ? setTimeout(function () {
            c.invalidMessage(c, a, b);
          }, 0)
        : this.invalidMessage(this, a, b);
    },
    invalidMessage: function (a, b, c) {
      c === a.invalidFeature.SIZE
        ? alert(
            xfalib.ut.LocalizationUtil.prototype.getLocalizedMessage(
              "",
              xfalib.locale.Strings.FileSizeGreater,
              [b, a.options.fileSizeLimit],
            ),
          )
        : c === a.invalidFeature.NAME
          ? alert(
              xfalib.ut.LocalizationUtil.prototype.getLocalizedMessage(
                "",
                xfalib.locale.Strings.FileNameInvalid,
                [b],
              ),
            )
          : c === a.invalidFeature.MIMETYPE &&
            alert(
              xfalib.ut.LocalizationUtil.prototype.getLocalizedMessage(
                "",
                xfalib.locale.Strings.FileMimeTypeInvalid,
                [b],
              ),
            );
    },
    _getIndexOfText: function (a, b) {
      var c = -1,
        e = this,
        d = !1;
      _.find(this.values, function (g, f) {
        var k = g,
          h = _.isObject(e._initialFileValueFileNameMap)
            ? e._initialFileValueFileNameMap[g]
            : null;
        k.match(/\//g) &&
          1 < k.match(/\//g).length &&
          ((k = g.substring(g.lastIndexOf("/") + 1)),
          (k = xfalib.ut.Utilities._getNameWithoutMarker(k)));
        if (k === a || h === a)
          return (
            (c = f),
            (d = -1 !== e.values.indexOf(g, c + 1)),
            b && d && (c = b.closest(".guide-fu-fileItem").index()),
            g
          );
      });
      return c;
    },
    _getFileObjIdx: function (a) {
      if (0 <= a)
        for (var b = 0, c = 0; c < this.$fileDomElements.length; c++)
          if (this.$fileDomElements[c]) {
            var e = this.$fileDomElements[c][0].files;
            if (e) {
              if (a <= b + e.length - 1) return [c, a - b];
              b += e.length;
            }
          } else {
            if (a == b) return [c, 0];
            b++;
          }
      return null;
    },
    _getFileListItem: function (a) {
      try {
        var b = new DataTransfer();
        _.each(a, function (a) {
          b.items.add(a);
        });
        return b.files;
      } catch (k) {
        throw (console.error(k), k);
      }
    },
    _updateFilesInDom: function (a, b) {
      this._isFileUpdate = !0;
      a[0].files = this._getFileListItem(b);
      this._isFileUpdate = !1;
    },
    _deleteFilesFromInputDom: function (a, b) {
      var c = [];
      _.each(a[0].files, function (a, e) {
        b.includes(e) || c.push(a);
      });
      try {
        this._updateFilesInDom(a, c);
      } catch (h) {
        console.error("Deleting files is not supported in your browser");
      }
    },
    handleClick: function (b) {
      b = d(b.target);
      var e = b.prev().text(),
        f = this._getIndexOfText(e, b);
      e = b.prev().data("key");
      var h = b.prev().data("objectUrl");
      if (-1 != f) {
        this.values.splice(f, 1);
        f = this._getFileObjIdx(f);
        var l = this.$fileDomElements[f[0]];
        l && 1 !== l[0].files.length
          ? this._deleteFilesFromInputDom(l, [f[1]])
          : this.$fileDomElements.splice(f[0], 1);
        a && this.cloneFileInputAndUpdateIdForIE9();
        null != e && b.prev().removeData("key");
        h && c.URL.revokeObjectURL(h);
      }
      b.parent().remove();
      this.$element.trigger("change.fileupload");
      this.$elementFileUploadBtn.focus();
    },
    _previewFileUsingObjectUrl: function (a) {
      if (a)
        if (c.navigator && c.navigator.msSaveOrOpenBlob)
          c.navigator.msSaveOrOpenBlob(a, a.name);
        else
          return (
            (a = c.URL.createObjectURL(a)),
            c.open(
              a,
              "",
              "scrollbars\x3dno,menubar\x3dno,height\x3d600,width\x3d800,resizable\x3dyes,toolbar\x3dno,status\x3dno",
            ),
            a
          );
    },
    handleFilePreview: function (a) {
      if (!this.options.disablePreview) {
        a = d(a.target);
        var b = a.text();
        b = this._getIndexOfText(b, a);
        var c = null;
        new Date().getTime();
        -1 != b &&
          (_.isUndefined(a.data("key")) || (c = a.data("key")),
          c
            ? (0 !== c.lastIndexOf(this.options._getUrl, 0) &&
                (c = this.options._getUrl + c),
              this.previewFile.apply(this, [null, { fileUrl: c }]))
            : ((b = this._getFileObjIdx(b)),
              (b = this._previewFileUsingObjectUrl(
                this.$fileDomElements[b[0]][0].files[b[1]],
              )) && a.data("objectUrl", b)));
      }
    },
    previewFile: function (a, b) {
      a = _.isUndefined(b)
        ? this.$element[this.options.uploaderPluginName]("getFileUrl")
        : b.fileUrl;
      b = a.lastIndexOf("/");
      0 <= b &&
        (a = a.substr(0, b) + "/" + encodeURIComponent(a.substr(b + 1)));
      c.open(
        a,
        "",
        "scrollbars\x3dno,menubar\x3dno,height\x3d600,width\x3d800,resizable\x3dyes,toolbar\x3dno,status\x3dno",
      );
    },
    resetIfNotMultiSelect: function () {
      this.options.multiSelect || (this.values = []);
    },
    showFileList: function (a, b, c) {
      (this.options.multiSelect && null != a && !_.isUndefined(a)) ||
        this.$elementFileList.empty();
      null != a &&
        (this.$fileItem = this.$elementFileList.append(this.fileItem(a, b, c)));
    },
    handleCommentClick: function (b) {
      var c = d(b.target);
      b =
        "Enter comments here" === c.text()
          ? this.getNewCommentElement()
          : this.getNewCommentElement(d(b.target).text());
      c.replaceWith(b);
      a
        ? b.focus().focusout(d.proxy(this.handleCommentBlur, this))
        : b.focus().blur(d.proxy(this.handleCommentBlur, this));
    },
    handleCommentBlur: function (a) {
      var b = d(a.target);
      a =
        "Enter comments here" === b.text()
          ? this.getNewCommentElementSummary()
          : this.getNewCommentElementSummary(d(a.target).text());
      b.replaceWith(a);
      a.focus(d.proxy(this.handleCommentClick, this)).click(
        d.proxy(this.handleCommentClick, this),
      );
      this.$element.trigger("change.fileupload");
    },
    isValid: function (a) {
      var b = /^\./,
        c = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i;
      return /^[^\\/:\*;\$%\?"<>\|]+$/.test(a) && !b.test(a) && !c.test(a);
    },
    handleChange: function (b) {
      if (!this._isFileUpdate) {
        var c = "",
          e = "",
          f = "",
          l = "";
        b = d(b.target);
        var m = b[0].files;
        !this.options.multiSelect &&
          1 < this.$fileDomElements.length &&
          this.$fileDomElements.splice(0, 1);
        var p = !1,
          r = !1,
          q = !1;
        this.resetIfNotMultiSelect();
        a &&
          ((c = b.val().split("\\").pop()),
          0 < this.$fileDomElements.length &&
            (this.$fileDomElements[this.$fileDomElements.length - 1] = b),
          this.cloneFileInputAndUpdateIdForIE9(),
          _.isUndefined(m) &&
            (this.showFileList(c),
            this.values.push(c),
            this.$element.trigger("change.fileupload")));
        if (!_.isUndefined(m)) {
          var t = [];
          _.each(
            m,
            function (a, b) {
              var d = !1,
                g = !1,
                h = !1;
              c = a.name.split("\\").pop();
              a.size / 1024 / 1024 > parseFloat(this.options.fileSizeLimit)
                ? ((p = d = !0), (e = c + "," + e))
                : this.isValid(c)
                  ? a.type &&
                    !this.regexMimeTypeList.some(function (b) {
                      return b.test(a.type);
                    }) &&
                    ((q = h = !0), (l = c + "," + l))
                  : ((r = g = !0), (f = c + "," + f));
              d || g || h
                ? t.push(b)
                : (this.showFileList(c), this.values.push(c));
            },
            this,
          );
          0 < t.length &&
            (0 < this.$fileDomElements.length &&
              ((b = this.$fileDomElements.length - 1),
              (b = this.$fileDomElements[b]) &&
                0 < b.length &&
                ((m = b[0].files.length),
                m === t.length
                  ? this.$fileDomElements.splice(-1, 1)
                  : this._deleteFilesFromInputDom(b, t))),
            a && this.cloneFileInputAndUpdateIdForIE9());
          this.$element.trigger("change.fileupload");
        }
        p
          ? this.showInvalidMessage(
              e.substring(0, e.lastIndexOf(",")),
              this.invalidFeature.SIZE,
            )
          : r
            ? this.showInvalidMessage(
                f.substring(0, f.lastIndexOf(",")),
                this.invalidFeature.NAME,
              )
            : q &&
              this.showInvalidMessage(
                l.substring(0, l.lastIndexOf(",")),
                this.invalidFeature.MIMETYPE,
              );
      }
    },
    cloneFileInputAndUpdateIdForIE9: function () {
      var c = _.last(this.$fileDomElements),
        f = null != c,
        k = f && 0 < c.val().length;
      if (!f || k)
        (c = this.$element.clone()),
          c.data(this.$element.data()),
          a &&
            ((f = this.$element.attr("id") + ++b),
            c.attr("id", f),
            c.css({ position: "absolute", top: "-2000px", left: "-2000px" }),
            c.appendTo("body"),
            this.updateLabelForAttr(f)),
          c.change(d.proxy(this.handleChange, this)),
          this.$fileDomElements.push(c);
      this.options.multiSelect ||
        null !== this.$fileDomElements[0] ||
        this.$fileDomElements.splice(0, 1);
      a || c.click();
      return !0;
    },
    updateLabelForAttr: function (a) {
      this.$label.attr("for", a);
    },
    createLabelForFileInput: function (b) {
      a &&
        ((this.$label = d("\x3clabel\x3e\x3c/label\x3e")
          .addClass("guide-fu-attach-button button")
          .text(this.options.buttonText)
          .attr("for", b)),
        this.$elementFileUploadBtn.replaceWith(this.$label),
        this.$label
          .parent()
          .attr("tabindex", 0)
          .attr("role", "button")
          .attr("aria-label", this.options.screenReaderText || ""));
    },
    constructor: function () {
      var b = this;
      this.$elementFileUploadBtn = this.$parent.find(this.options.buttonClass);
      this.$elementFileUploadBtn.attr(
        "aria-label",
        this.options.screenReaderText || "",
      );
      a &&
        ((this.elementId = this.$element.attr("id")),
        this.createLabelForFileInput(this.$element.attr("id")));
      this.$elementFileList = d(this.fileItemList());
      this.values = [];
      this._initialFileValueFileNameMap = {};
      this.$fileDomElements = [];
      var c = !1,
        f = null;
      d(document).mousedown(function (a) {
        f = d(a.target);
      });
      this.$elementFileUploadBtn
        .focus(function () {
          b.$element.trigger("focus.fileupload");
        })
        .click(d.proxy(this.cloneFileInputAndUpdateIdForIE9, this))
        .blur(function (a) {
          !c &&
            null != f &&
            0 >= f.closest(".guide-fu-fileItemList").length &&
            b.$element.trigger("focusout.fileupload");
          c = !1;
        });
      this.$element[this.options.uploaderPluginName]({
        iframeContainer: this.options.iframeContainer,
        _filePath: this.options._filePath,
        _uuidGenerator: this.options._uuidGenerator,
        _getUrl: this.options._getUrl,
      });
      this.$element
        .change(d.proxy(this.handleChange, this))
        .on("adobeFileUploader.fileUploaded", d.proxy(this.previewFile, this));
    },
  };
  d.fn.adobeFileAttachment = function (a, b) {
    var c = "",
      e = this.each(function () {
        if ("file" === d(this).attr("type")) {
          var e = d(this),
            g = e.data("adobeFileAttachment"),
            h = d.extend({}, f.prototype.defaults, "object" === typeof a && a);
          g ||
            (e.data("adobeFileAttachment", (g = new f(this, h))),
            g.constructor());
          "string" === typeof a && (c = g[a](b));
        }
      });
    return "undefined" !== typeof c ? c : e;
  };
  f.prototype.defaults = {
    buttonText: "Attach",
    multiSelect: !1,
    fileSizeLimit: 2,
    uploaderPluginName: "adobeFileUploader",
    mimeType: ["audio/*", "video/*", "image/*", "text/*", "application/pdf"],
  };
})($, window);
(function (d) {
  var c = xfalib.ut.XfaUtil.prototype;
  d.widget("xfaWidget.fileUpload", d.xfaWidget.abstractWidget, {
    _widgetName: "fileUpload",
    _superPrototype: d.xfaWidget.abstractWidget.prototype,
    getOptionsMap: function () {
      var c = this._superPrototype.getOptionsMap.apply(this, arguments);
      return d.extend(
        {},
        c,
        d.extend({}, this.options, {
          value: function (a) {
            this.$userControl.adobeFileAttachment("value", a);
          },
          fileList: function (a) {
            this.$userControl.adobeFileAttachment("fileList", a);
          },
          comment: function (a) {
            this.$userControl.adobeFileAttachment("comment", a);
          },
          access: function (a) {
            this.$userControl.adobeFileAttachment("access", a);
          },
        }),
      );
    },
    _initializeOptions: function () {
      _.each(
        this.optionsHandler,
        function (c, a) {
          "function" === typeof c &&
            "_uuidGenerator" !== a &&
            c.apply(this, [this.options[a]]);
        },
        this,
      );
    },
    _getFileList: function () {
      return this.$userControl.adobeFileAttachment("fileList");
    },
    _getComment: function () {
      return this.$userControl.adobeFileAttachment("comment");
    },
    _getFileNamePathMap: function (c) {
      return this.$userControl.adobeFileAttachment(
        "getSetFilePathAndReturnNamePathMap",
        c,
      );
    },
    getEventMap: function () {
      var f = this._superPrototype.getEventMap.apply(this, arguments);
      return d.extend({}, f, {
        change: null,
        "focusout.fileupload": c.XFA_EXIT_EVENT,
        "focus.fileupload": c.XFA_ENTER_EVENT,
        "change.fileupload": c.XFA_CHANGE_EVENT,
      });
    },
    render: function () {
      var c = this._superPrototype.render.apply(this, arguments);
      c.adobeFileAttachment(this.getOptionsMap());
      return c;
    },
    showDisplayValue: function () {},
    showValue: function () {},
    getCommitValue: function () {
      this.options.fileList = this._getFileList();
      this.options.comment = this._getComment();
      return this.$userControl.adobeFileAttachment("value");
    },
  });
})($);
(function (d) {
  var c = function (c, a) {
    this.options = a;
    this.$element = d(c);
  };
  c.prototype = {
    _fileIframeName: "guide-fu-iframe",
    _filePath: "/tmp/fd/mf",
    _iframeContainer: "body#formBody",
    fileIframe: function (c) {
      return d("\x3ciframe\x3e\x3c/iframe\x3e").attr({
        style: "display:none",
        name: c,
      });
    },
    uploadFile: function (c) {
      var a = !1,
        b = null,
        e = null,
        g = c.fileUploadPath,
        f;
      g || (f = c._uuidGenerator());
      if (_.isObject(c) && (g || f)) {
        var h = c.fileDom,
          l = d(this.options.iframeContainer).find(".filePreview");
        b = c.fileName;
        a = c.multiple;
        g || (g = this.options.fileUploadPath + "/" + f);
        if (null !== h) {
          e = c._getUrl + g;
          a
            ? (this.fileUrl = e)
            : 0 !== g.lastIndexOf(c._getUrl, 0)
              ? (this.fileUrl = c._getUrl + g + "/" + b)
              : (this.fileUrl = g + "/" + b);
          0 === l.length
            ? (l = d(
                "\x3cform method\x3d'post' enctype\x3d'multipart/form-data'/\x3e",
              )
                .addClass("filePreview")
                .attr({
                  id: "form" + new Date().valueOf(),
                  action: e,
                  target: this.options.iframeName,
                })
                .appendTo(this.options.iframeContainer))
            : (l.children().detach(),
              l.attr({ action: e, target: this.options.iframeName }));
          l.one("submit", function (a) {
            a.stopPropagation();
          });
          var m = new FormData();
          a
            ? _.each(
                h,
                function (a, c) {
                  if (null !== a && !_.isString(a)) {
                    d(a[0]).attr("name", b[c]).appendTo(l);
                    c = b[c].split("\n");
                    for (var e = 0; e < c.length; e++)
                      m.append(c[e], a[0].files[e]);
                  }
                },
                this,
              )
            : (h.attr("name", b).appendTo(l), m.append(b, h[0].files[0]));
          d(
            "\x3cinput type\x3d'hidden' name\x3d'_charset_' value\x3d'UTF-8'/\x3e",
          ).appendTo(l);
          m.append("_charset_", "UTF-8");
          a || (this.fileMap[this.fileUrl] = this.$element);
          var p = this;
          d.ajax({
            url: l.attr("action"),
            data: m,
            cache: !1,
            contentType: !1,
            processData: !1,
            method: "POST",
            type: "POST",
            success: function (b) {
              a ? p.handleMultipleFileUpload(b) : p.handleSingleFileUpload(b);
            },
            error: function () {
              this.$element.trigger("adobeFileUploader.fileUploadFailed");
            },
          });
        }
      }
      return this.fileUrl;
    },
    handleMultipleFileUpload: function (c) {
      this.$element.trigger("adobeFileUploader.multipleFileUploaded");
    },
    getFileUrl: function () {
      return this.fileUrl;
    },
    getUrlContentsFromUploadData: function (c) {
      c =
        null != c
          ? d(c).find("#ChangeLog").text().split("br", 2)[1]
          : d(
              this.options.iframeContainer +
                " iframe[name\x3d'" +
                this.options.iframeName +
                "']",
            )
              .contents()
              .find("#ChangeLog")
              .text()
              .split("br", 2)[1];
      c = c.substring(c.indexOf("created") + 9, c.indexOf(";\x3c"));
      c = c.substring(0, c.length - 2);
      var a = c.indexOf("/jcr:content");
      -1 !== a && (c = c.substring(0, a));
      return c;
    },
    handleSingleFileUpload: function (c) {
      c = this.getUrlContentsFromUploadData(c);
      c = this.options._getUrl + c;
      c in this.fileMap &&
        this.fileMap[c].trigger("adobeFileUploader.fileUploaded");
    },
    initialize: function () {
      if (null == this.$iframe || 0 === this.$iframe.length)
        (this.$iframe = this.fileIframe(this.options.iframeName).appendTo(
          this.options.iframeContainer,
        )),
          (this.fileMap = {});
    },
  };
  d.fn.adobeFileUploader = function (f, a) {
    var b = "",
      e = this.each(function () {
        if ("file" === d(this).attr("type")) {
          var e = d(this),
            k = e.data("adobeFileUploader"),
            h = d.extend(
              {},
              c.prototype.defaults(f, a),
              "object" === typeof f && f,
            );
          k
            ? k.$element.get(0) !== this && (k.$element = d(this))
            : (e.data("adobeFileUploader", (k = new c(this, h))),
              k.initialize());
          "string" === typeof f && (b = k[f](a));
        }
      });
    return "undefined" !== typeof b ? b : e;
  };
  c.prototype.defaults = function (d, a) {
    var b = {};
    "object" == typeof d &&
      ((b._fileIframeName = d._fileIframeName),
      (b._filePath = d._filePath),
      (b.actionUrl = d.actionUrl),
      (b._getUrl = d._getUrl));
    "object" == typeof a &&
      ((b._fileIframeName = a._fileIframeName),
      (b._filePath = a._filePath),
      (b.actionUrl = a.actionUrl),
      (b._getUrl = d._getUrl));
    return {
      fileUploadPath: b._filePath || c.prototype._filePath,
      iframeName: c.prototype._fileIframeName + new Date().valueOf(),
      fileUploadServlet: b._filePath || c.prototype._filePath,
      iframeContainer: b._iframeContainer || c.prototype._iframeContainer,
      _getUrl: b._getUrl || "",
    };
  };
})($);
+(function (d) {
  var c = function (a) {
    d(a).on("click", '[data-dismiss\x3d"alert"]', this.close);
  };
  c.prototype.close = function (a) {
    function b() {
      f.trigger("closed.bs.alert").remove();
    }
    var c = d(this),
      g = c.attr("data-target");
    g || (g = (g = c.attr("href")) && g.replace(/.*(?=#[^\s]*$)/, ""));
    var f = d(g);
    a && a.preventDefault();
    f.length || (f = c.hasClass("alert") ? c : c.parent());
    f.trigger((a = d.Event("close.bs.alert")));
    a.isDefaultPrevented() ||
      (f.removeClass("in"),
      d.support.transition && f.hasClass("fade")
        ? f.one(d.support.transition.end, b).emulateTransitionEnd(150)
        : b());
  };
  var f = d.fn.alert;
  d.fn.alert = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.alert");
      e || b.data("bs.alert", (e = new c(this)));
      "string" == typeof a && e[a].call(b);
    });
  };
  d.fn.alert.Constructor = c;
  d.fn.alert.noConflict = function () {
    d.fn.alert = f;
    return this;
  };
  d(document).on(
    "click.bs.alert.data-api",
    '[data-dismiss\x3d"alert"]',
    c.prototype.close,
  );
})(jQuery);
+(function (d) {
  var c = function (a, b) {
    this.$element = d(a);
    this.options = d.extend({}, c.DEFAULTS, b);
    this.isLoading = !1;
  };
  c.DEFAULTS = { loadingText: "loading..." };
  c.prototype.setState = function (a) {
    var b = this.$element,
      c = b.is("input") ? "val" : "html",
      g = b.data();
    a += "Text";
    g.resetText || b.data("resetText", b[c]());
    b[c](g[a] || this.options[a]);
    setTimeout(
      d.proxy(function () {
        "loadingText" == a
          ? ((this.isLoading = !0),
            b.addClass("disabled").attr("disabled", "disabled"))
          : this.isLoading &&
            ((this.isLoading = !1),
            b.removeClass("disabled").removeAttr("disabled"));
      }, this),
      0,
    );
  };
  c.prototype.toggle = function () {
    var a = !0,
      b = this.$element.closest('[data-toggle\x3d"buttons"]');
    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") &&
        (c.prop("checked") && this.$element.hasClass("active")
          ? (a = !1)
          : b.find(".active").removeClass("active"));
      a &&
        c.prop("checked", !this.$element.hasClass("active")).trigger("change");
    }
    a && this.$element.toggleClass("active");
  };
  var f = d.fn.button;
  d.fn.button = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.button"),
        g = "object" == typeof a && a;
      e || b.data("bs.button", (e = new c(this, g)));
      "toggle" == a ? e.toggle() : a && e.setState(a);
    });
  };
  d.fn.button.Constructor = c;
  d.fn.button.noConflict = function () {
    d.fn.button = f;
    return this;
  };
  d(document).on(
    "click.bs.button.data-api",
    "[data-toggle^\x3dbutton]",
    function (a) {
      var b = d(a.target);
      b.hasClass("btn") || (b = b.closest(".btn"));
      b.button("toggle");
      a.preventDefault();
    },
  );
})(jQuery);
+(function (d) {
  var c = function (a, b) {
    this.$element = d(a);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = b;
    this.paused =
      this.sliding =
      this.interval =
      this.$active =
      this.$items =
        null;
    "hover" == this.options.pause &&
      this.$element
        .on("mouseenter", d.proxy(this.pause, this))
        .on("mouseleave", d.proxy(this.cycle, this));
  };
  c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 };
  c.prototype.cycle = function (a) {
    a || (this.paused = !1);
    this.interval && clearInterval(this.interval);
    this.options.interval &&
      !this.paused &&
      (this.interval = setInterval(
        d.proxy(this.next, this),
        this.options.interval,
      ));
    return this;
  };
  c.prototype.getActiveIndex = function () {
    this.$active = this.$element.find(".item.active");
    this.$items = this.$active.parent().children();
    return this.$items.index(this.$active);
  };
  c.prototype.to = function (a) {
    var b = this,
      c = this.getActiveIndex();
    if (!(a > this.$items.length - 1 || 0 > a))
      return this.sliding
        ? this.$element.one("slid.bs.carousel", function () {
            b.to(a);
          })
        : c == a
          ? this.pause().cycle()
          : this.slide(a > c ? "next" : "prev", d(this.$items[a]));
  };
  c.prototype.pause = function (a) {
    a || (this.paused = !0);
    this.$element.find(".next, .prev").length &&
      d.support.transition &&
      (this.$element.trigger(d.support.transition.end), this.cycle(!0));
    this.interval = clearInterval(this.interval);
    return this;
  };
  c.prototype.next = function () {
    if (!this.sliding) return this.slide("next");
  };
  c.prototype.prev = function () {
    if (!this.sliding) return this.slide("prev");
  };
  c.prototype.slide = function (a, b) {
    var c = this.$element.find(".item.active"),
      g = b || c[a]();
    b = this.interval;
    var f = "next" == a ? "left" : "right",
      h = "next" == a ? "first" : "last",
      l = this;
    if (!g.length) {
      if (!this.options.wrap) return;
      g = this.$element.find(".item")[h]();
    }
    if (g.hasClass("active")) return (this.sliding = !1);
    h = d.Event("slide.bs.carousel", { relatedTarget: g[0], direction: f });
    this.$element.trigger(h);
    if (!h.isDefaultPrevented())
      return (
        (this.sliding = !0),
        b && this.pause(),
        this.$indicators.length &&
          (this.$indicators.find(".active").removeClass("active"),
          this.$element.one("slid.bs.carousel", function () {
            var a = d(l.$indicators.children()[l.getActiveIndex()]);
            a && a.addClass("active");
          })),
        d.support.transition && this.$element.hasClass("slide")
          ? (g.addClass(a),
            g[0].offsetWidth,
            c.addClass(f),
            g.addClass(f),
            c
              .one(d.support.transition.end, function () {
                g.removeClass([a, f].join(" ")).addClass("active");
                c.removeClass(["active", f].join(" "));
                l.sliding = !1;
                setTimeout(function () {
                  l.$element.trigger("slid.bs.carousel");
                }, 0);
              })
              .emulateTransitionEnd(
                1e3 * c.css("transition-duration").slice(0, -1),
              ))
          : (c.removeClass("active"),
            g.addClass("active"),
            (this.sliding = !1),
            this.$element.trigger("slid.bs.carousel")),
        b && this.cycle(),
        this
      );
  };
  var f = d.fn.carousel;
  d.fn.carousel = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.carousel"),
        g = d.extend({}, c.DEFAULTS, b.data(), "object" == typeof a && a),
        f = "string" == typeof a ? a : g.slide;
      e || b.data("bs.carousel", (e = new c(this, g)));
      if ("number" == typeof a) e.to(a);
      else if (f) e[f]();
      else g.interval && e.pause().cycle();
    });
  };
  d.fn.carousel.Constructor = c;
  d.fn.carousel.noConflict = function () {
    d.fn.carousel = f;
    return this;
  };
  d(document).on(
    "click.bs.carousel.data-api",
    "[data-slide], [data-slide-to]",
    function (a) {
      var b = d(this),
        c,
        g = d(
          b.attr("data-target") ||
            ((c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
        );
      c = d.extend({}, g.data(), b.data());
      var f = b.attr("data-slide-to");
      f && (c.interval = !1);
      g.carousel(c);
      (f = b.attr("data-slide-to")) && g.data("bs.carousel").to(f);
      a.preventDefault();
    },
  );
  d(window).on("load", function () {
    d('[data-ride\x3d"carousel"]').each(function () {
      var a = d(this);
      a.carousel(a.data());
    });
  });
})(jQuery);
+(function (d) {
  function c(a) {
    d(".dropdown-backdrop").remove();
    d("[data-toggle\x3ddropdown]").each(function () {
      var b = f(d(this)),
        c = { relatedTarget: this };
      b.hasClass("open") &&
        (b.trigger((a = d.Event("hide.bs.dropdown", c))),
        a.isDefaultPrevented() ||
          b.removeClass("open").trigger("hidden.bs.dropdown", c));
    });
  }
  function f(a) {
    var b = a.attr("data-target");
    b ||
      (b =
        (b = a.attr("href")) &&
        /#[A-Za-z]/.test(b) &&
        b.replace(/.*(?=#[^\s]*$)/, ""));
    return (b = b && d(b)) && b.length ? b : a.parent();
  }
  var a = function (a) {
    d(a).on("click.bs.dropdown", this.toggle);
  };
  a.prototype.toggle = function (a) {
    var b = d(this);
    if (!b.is(".disabled, :disabled")) {
      var e = f(b);
      a = e.hasClass("open");
      c();
      if (!a) {
        if (
          "ontouchstart" in document.documentElement &&
          !e.closest(".navbar-nav").length
        )
          d('\x3cdiv class\x3d"dropdown-backdrop"\x3e\x3c/div\x3e')
            .insertAfter(d(this))
            .on("click", c);
        var h = { relatedTarget: this };
        e.trigger((a = d.Event("show.bs.dropdown", h)));
        if (a.isDefaultPrevented()) return;
        e.toggleClass("open").trigger("shown.bs.dropdown", h);
        b.focus();
      }
      return !1;
    }
  };
  a.prototype.keydown = function (a) {
    if (/(38|40|27)/.test(a.keyCode)) {
      var b = d(this);
      a.preventDefault();
      a.stopPropagation();
      if (!b.is(".disabled, :disabled")) {
        var c = f(b),
          e = c.hasClass("open");
        if (!e || (e && 27 == a.keyCode))
          return (
            27 == a.which && c.find("[data-toggle\x3ddropdown]").focus(),
            b.click()
          );
        b = c.find(
          "[role\x3dmenu] li:not(.divider):visible a, [role\x3dlistbox] li:not(.divider):visible a",
        );
        b.length &&
          ((c = b.index(b.filter(":focus"))),
          38 == a.keyCode && 0 < c && c--,
          40 == a.keyCode && c < b.length - 1 && c++,
          ~c || (c = 0),
          b.eq(c).focus());
      }
    }
  };
  var b = d.fn.dropdown;
  d.fn.dropdown = function (b) {
    return this.each(function () {
      var c = d(this),
        e = c.data("bs.dropdown");
      e || c.data("bs.dropdown", (e = new a(this)));
      "string" == typeof b && e[b].call(c);
    });
  };
  d.fn.dropdown.Constructor = a;
  d.fn.dropdown.noConflict = function () {
    d.fn.dropdown = b;
    return this;
  };
  d(document)
    .on("click.bs.dropdown.data-api", c)
    .on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
      a.stopPropagation();
    })
    .on(
      "click.bs.dropdown.data-api",
      "[data-toggle\x3ddropdown]",
      a.prototype.toggle,
    )
    .on(
      "keydown.bs.dropdown.data-api",
      "[data-toggle\x3ddropdown], [role\x3dmenu], [role\x3dlistbox]",
      a.prototype.keydown,
    );
})(jQuery);
+(function (d) {
  var c = function (a, b) {
    this.options = b;
    this.$element = d(a);
    this.$backdrop = this.isShown = null;
    this.options.remote &&
      this.$element.find(".modal-content").load(
        this.options.remote,
        d.proxy(function () {
          this.$element.trigger("loaded.bs.modal");
        }, this),
      );
  };
  c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 };
  c.prototype.toggle = function (a) {
    return this[this.isShown ? "hide" : "show"](a);
  };
  c.prototype.show = function (a) {
    var b = this,
      c = d.Event("show.bs.modal", { relatedTarget: a });
    this.$element.trigger(c);
    this.isShown ||
      c.isDefaultPrevented() ||
      ((this.isShown = !0),
      this.escape(),
      this.$element.on(
        "click.dismiss.bs.modal",
        '[data-dismiss\x3d"modal"]',
        d.proxy(this.hide, this),
      ),
      this.backdrop(function () {
        var c = d.support.transition && b.$element.hasClass("fade");
        b.$element.parent().length || b.$element.appendTo(document.body);
        b.$element.show().scrollTop(0);
        c && b.$element[0].offsetWidth;
        b.$element.addClass("in").attr("aria-hidden", !1);
        b.enforceFocus();
        var e = d.Event("shown.bs.modal", { relatedTarget: a });
        c
          ? b.$element
              .find(".modal-dialog")
              .one(d.support.transition.end, function () {
                b.$element.focus().trigger(e);
              })
              .emulateTransitionEnd(300)
          : b.$element.focus().trigger(e);
      }));
  };
  c.prototype.hide = function (a) {
    a && a.preventDefault();
    a = d.Event("hide.bs.modal");
    this.$element.trigger(a);
    this.isShown &&
      !a.isDefaultPrevented() &&
      ((this.isShown = !1),
      this.escape(),
      d(document).off("focusin.bs.modal"),
      this.$element
        .removeClass("in")
        .attr("aria-hidden", !0)
        .off("click.dismiss.bs.modal"),
      d.support.transition && this.$element.hasClass("fade")
        ? this.$element
            .one(d.support.transition.end, d.proxy(this.hideModal, this))
            .emulateTransitionEnd(300)
        : this.hideModal());
  };
  c.prototype.enforceFocus = function () {
    d(document)
      .off("focusin.bs.modal")
      .on(
        "focusin.bs.modal",
        d.proxy(function (a) {
          this.$element[0] === a.target ||
            this.$element.has(a.target).length ||
            this.$element.focus();
        }, this),
      );
  };
  c.prototype.escape = function () {
    if (this.isShown && this.options.keyboard)
      this.$element.on(
        "keyup.dismiss.bs.modal",
        d.proxy(function (a) {
          27 == a.which && this.hide();
        }, this),
      );
    else this.isShown || this.$element.off("keyup.dismiss.bs.modal");
  };
  c.prototype.hideModal = function () {
    var a = this;
    this.$element.hide();
    this.backdrop(function () {
      a.removeBackdrop();
      a.$element.trigger("hidden.bs.modal");
    });
  };
  c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };
  c.prototype.backdrop = function (a) {
    var b = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var c = d.support.transition && b;
      this.$backdrop = d(
        '\x3cdiv class\x3d"modal-backdrop ' + b + '" \x3e\x3c/div\x3e',
      ).appendTo(document.body);
      this.$element.on(
        "click.dismiss.bs.modal",
        d.proxy(function (a) {
          a.target === a.currentTarget &&
            ("static" == this.options.backdrop
              ? this.$element[0].focus.call(this.$element[0])
              : this.hide.call(this));
        }, this),
      );
      c && this.$backdrop[0].offsetWidth;
      this.$backdrop.addClass("in");
      a &&
        (c
          ? this.$backdrop
              .one(d.support.transition.end, a)
              .emulateTransitionEnd(150)
          : a());
    } else
      !this.isShown && this.$backdrop
        ? (this.$backdrop.removeClass("in"),
          d.support.transition && this.$element.hasClass("fade")
            ? this.$backdrop
                .one(d.support.transition.end, a)
                .emulateTransitionEnd(150)
            : a())
        : a && a();
  };
  var f = d.fn.modal;
  d.fn.modal = function (a, b) {
    return this.each(function () {
      var e = d(this),
        f = e.data("bs.modal"),
        k = d.extend({}, c.DEFAULTS, e.data(), "object" == typeof a && a);
      f || e.data("bs.modal", (f = new c(this, k)));
      if ("string" == typeof a) f[a](b);
      else k.show && f.show(b);
    });
  };
  d.fn.modal.Constructor = c;
  d.fn.modal.noConflict = function () {
    d.fn.modal = f;
    return this;
  };
  d(document).on(
    "click.bs.modal.data-api",
    '[data-toggle\x3d"modal"]',
    function (a) {
      var b = d(this),
        c = b.attr("href"),
        f = d(b.attr("data-target") || (c && c.replace(/.*(?=#[^\s]+$)/, "")));
      c = f.data("bs.modal")
        ? "toggle"
        : d.extend({ remote: !/#/.test(c) && c }, f.data(), b.data());
      b.is("a") && a.preventDefault();
      f.modal(c, this).one("hide", function () {
        b.is(":visible") && b.focus();
      });
    },
  );
  d(document)
    .on("show.bs.modal", ".modal", function () {
      d(document.body).addClass("modal-open");
    })
    .on("hidden.bs.modal", ".modal", function () {
      d(document.body).removeClass("modal-open");
    });
})(jQuery);
+(function (d) {
  var c = function (a, b) {
    this.type =
      this.options =
      this.enabled =
      this.timeout =
      this.hoverState =
      this.$element =
        null;
    this.init("tooltip", a, b);
  };
  c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template:
      '\x3cdiv class\x3d"tooltip"\x3e\x3cdiv class\x3d"tooltip-arrow"\x3e\x3c/div\x3e\x3cdiv class\x3d"tooltip-inner"\x3e\x3c/div\x3e\x3c/div\x3e',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
  };
  c.prototype.init = function (a, b, c) {
    this.enabled = !0;
    this.type = a;
    this.$element = d(b);
    this.options = this.getOptions(c);
    a = this.options.trigger.split(" ");
    for (b = a.length; b--; )
      if (((c = a[b]), "click" == c))
        this.$element.on(
          "click." + this.type,
          this.options.selector,
          d.proxy(this.toggle, this),
        );
      else if ("manual" != c) {
        var e = "hover" == c ? "mouseleave" : "focusout";
        this.$element.on(
          ("hover" == c ? "mouseenter" : "focusin") + "." + this.type,
          this.options.selector,
          d.proxy(this.enter, this),
        );
        this.$element.on(
          e + "." + this.type,
          this.options.selector,
          d.proxy(this.leave, this),
        );
      }
    this.options.selector
      ? (this._options = d.extend({}, this.options, {
          trigger: "manual",
          selector: "",
        }))
      : this.fixTitle();
  };
  c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  };
  c.prototype.getOptions = function (a) {
    a = d.extend({}, this.getDefaults(), this.$element.data(), a);
    a.delay &&
      "number" == typeof a.delay &&
      (a.delay = { show: a.delay, hide: a.delay });
    return a;
  };
  c.prototype.getDelegateOptions = function () {
    var a = {},
      b = this.getDefaults();
    this._options &&
      d.each(this._options, function (c, d) {
        b[c] != d && (a[c] = d);
      });
    return a;
  };
  c.prototype.enter = function (a) {
    var b =
      a instanceof this.constructor
        ? a
        : d(a.currentTarget)
            [this.type](this.getDelegateOptions())
            .data("bs." + this.type);
    clearTimeout(b.timeout);
    b.hoverState = "in";
    if (!b.options.delay || !b.options.delay.show) return b.show();
    b.timeout = setTimeout(function () {
      "in" == b.hoverState && b.show();
    }, b.options.delay.show);
  };
  c.prototype.leave = function (a) {
    var b =
      a instanceof this.constructor
        ? a
        : d(a.currentTarget)
            [this.type](this.getDelegateOptions())
            .data("bs." + this.type);
    clearTimeout(b.timeout);
    b.hoverState = "out";
    if (!b.options.delay || !b.options.delay.hide) return b.hide();
    b.timeout = setTimeout(function () {
      "out" == b.hoverState && b.hide();
    }, b.options.delay.hide);
  };
  c.prototype.show = function () {
    var a = d.Event("show.bs." + this.type);
    if (
      this.hasContent() &&
      this.enabled &&
      (this.$element.trigger(a), !a.isDefaultPrevented())
    ) {
      var b = this;
      a = this.tip();
      this.setContent();
      this.options.animation && a.addClass("fade");
      var c =
          "function" == typeof this.options.placement
            ? this.options.placement.call(this, a[0], this.$element[0])
            : this.options.placement,
        f = /\s?auto?\s?/i,
        k = f.test(c);
      k && (c = c.replace(f, "") || "top");
      a.detach().css({ top: 0, left: 0, display: "block" }).addClass(c);
      this.options.container
        ? a.appendTo(this.options.container)
        : a.insertAfter(this.$element);
      f = this.getPosition();
      var h = a[0].offsetWidth,
        l = a[0].offsetHeight;
      if (k) {
        var m = this.$element.parent();
        k = c;
        var p = document.documentElement.scrollTop || document.body.scrollTop,
          r =
            "body" == this.options.container
              ? window.innerWidth
              : m.outerWidth(),
          q =
            "body" == this.options.container
              ? window.innerHeight
              : m.outerHeight();
        m = "body" == this.options.container ? 0 : m.offset().left;
        c =
          "bottom" == c && f.top + f.height + l - p > q
            ? "top"
            : "top" == c && 0 > f.top - p - l
              ? "bottom"
              : "right" == c && f.right + h > r
                ? "left"
                : "left" == c && f.left - h < m
                  ? "right"
                  : c;
        a.removeClass(k).addClass(c);
      }
      f = this.getCalculatedOffset(c, f, h, l);
      this.applyPlacement(f, c);
      this.hoverState = null;
      c = function () {
        b.$element.trigger("shown.bs." + b.type);
      };
      d.support.transition && this.$tip.hasClass("fade")
        ? a.one(d.support.transition.end, c).emulateTransitionEnd(150)
        : c();
    }
  };
  c.prototype.applyPlacement = function (a, b) {
    var c = this.tip(),
      f = c[0].offsetWidth,
      k = c[0].offsetHeight,
      h = parseInt(c.css("margin-top"), 10),
      l = parseInt(c.css("margin-left"), 10);
    isNaN(h) && (h = 0);
    isNaN(l) && (l = 0);
    a.top += h;
    a.left += l;
    d.offset.setOffset(
      c[0],
      d.extend(
        {
          using: function (a) {
            c.css({ top: Math.round(a.top), left: Math.round(a.left) });
          },
        },
        a,
      ),
      0,
    );
    c.addClass("in");
    h = c[0].offsetWidth;
    l = c[0].offsetHeight;
    if ("top" == b && l != k) {
      var m = !0;
      a.top = a.top + k - l;
    }
    /bottom|top/.test(b)
      ? ((b = 0),
        0 > a.left &&
          ((b = -2 * a.left),
          (a.left = 0),
          c.offset(a),
          (h = c[0].offsetWidth),
          (l = c[0].offsetHeight)),
        this.replaceArrow(b - f + h, h, "left"))
      : this.replaceArrow(l - k, l, "top");
    m && c.offset(a);
  };
  c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
  };
  c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b);
    a.removeClass("fade in top bottom left right");
  };
  c.prototype.hide = function () {
    function a() {
      "in" != b.hoverState && c.detach();
      b.$element.trigger("hidden.bs." + b.type);
    }
    var b = this,
      c = this.tip(),
      f = d.Event("hide.bs." + this.type);
    this.$element.trigger(f);
    if (!f.isDefaultPrevented())
      return (
        c.removeClass("in"),
        d.support.transition && this.$tip.hasClass("fade")
          ? c.one(d.support.transition.end, a).emulateTransitionEnd(150)
          : a(),
        (this.hoverState = null),
        this
      );
  };
  c.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) &&
      a.attr("data-original-title", a.attr("title") || "").attr("title", "");
  };
  c.prototype.hasContent = function () {
    return this.getTitle();
  };
  c.prototype.getPosition = function () {
    var a = this.$element[0];
    return d.extend(
      {},
      "function" == typeof a.getBoundingClientRect
        ? a.getBoundingClientRect()
        : { width: a.offsetWidth, height: a.offsetHeight },
      this.$element.offset(),
    );
  };
  c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a
      ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 }
      : "top" == a
        ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
        : "left" == a
          ? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
          : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
  };
  c.prototype.getTitle = function () {
    var a = this.$element,
      b = this.options;
    return (
      a.attr("data-original-title") ||
      ("function" == typeof b.title ? b.title.call(a[0]) : b.title)
    );
  };
  c.prototype.tip = function () {
    return (this.$tip = this.$tip || d(this.options.template));
  };
  c.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
  };
  c.prototype.validate = function () {
    this.$element[0].parentNode ||
      (this.hide(), (this.options = this.$element = null));
  };
  c.prototype.enable = function () {
    this.enabled = !0;
  };
  c.prototype.disable = function () {
    this.enabled = !1;
  };
  c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };
  c.prototype.toggle = function (a) {
    a = a
      ? d(a.currentTarget)
          [this.type](this.getDelegateOptions())
          .data("bs." + this.type)
      : this;
    a.tip().hasClass("in") ? a.leave(a) : a.enter(a);
  };
  c.prototype.destroy = function () {
    clearTimeout(this.timeout);
    this.hide()
      .$element.off("." + this.type)
      .removeData("bs." + this.type);
  };
  var f = d.fn.tooltip;
  d.fn.tooltip = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.tooltip"),
        f = "object" == typeof a && a;
      if (e || "destroy" != a)
        if (
          (e || b.data("bs.tooltip", (e = new c(this, f))),
          "string" == typeof a)
        )
          e[a]();
    });
  };
  d.fn.tooltip.Constructor = c;
  d.fn.tooltip.noConflict = function () {
    d.fn.tooltip = f;
    return this;
  };
})(jQuery);
+(function (d) {
  var c = function (a, b) {
    this.init("popover", a, b);
  };
  if (!d.fn.tooltip) throw Error("Popover requires tooltip.js");
  c.DEFAULTS = d.extend({}, d.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template:
      '\x3cdiv class\x3d"popover"\x3e\x3cdiv class\x3d"arrow"\x3e\x3c/div\x3e\x3ch3 class\x3d"popover-title"\x3e\x3c/h3\x3e\x3cdiv class\x3d"popover-content"\x3e\x3c/div\x3e\x3c/div\x3e',
  });
  c.prototype = d.extend({}, d.fn.tooltip.Constructor.prototype);
  c.prototype.constructor = c;
  c.prototype.getDefaults = function () {
    return c.DEFAULTS;
  };
  c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle(),
      c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b);
    a.find(".popover-content")[
      this.options.html ? ("string" == typeof c ? "html" : "append") : "text"
    ](c);
    a.removeClass("fade top bottom left right in");
    a.find(".popover-title").html() || a.find(".popover-title").hide();
  };
  c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };
  c.prototype.getContent = function () {
    var a = this.$element,
      b = this.options;
    return (
      a.attr("data-content") ||
      ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    );
  };
  c.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
  };
  c.prototype.tip = function () {
    this.$tip || (this.$tip = d(this.options.template));
    return this.$tip;
  };
  var f = d.fn.popover;
  d.fn.popover = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.popover"),
        f = "object" == typeof a && a;
      if (e || "destroy" != a)
        if (
          (e || b.data("bs.popover", (e = new c(this, f))),
          "string" == typeof a)
        )
          e[a]();
    });
  };
  d.fn.popover.Constructor = c;
  d.fn.popover.noConflict = function () {
    d.fn.popover = f;
    return this;
  };
})(jQuery);
+(function (d) {
  var c = function (a) {
    this.element = d(a);
  };
  c.prototype.show = function () {
    var a = this.element,
      b = a.closest("ul:not(.dropdown-menu)"),
      c = a.data("target");
    c || (c = (c = a.attr("href")) && c.replace(/.*(?=#[^\s]*$)/, ""));
    if (!a.parent("li").hasClass("active")) {
      var f = b.find(".active:last a")[0],
        k = d.Event("show.bs.tab", { relatedTarget: f });
      a.trigger(k);
      k.isDefaultPrevented() ||
        ((c = d(c)),
        this.activate(a.parent("li"), b),
        this.activate(c, c.parent(), function () {
          a.trigger({ type: "shown.bs.tab", relatedTarget: f });
        }));
    }
  };
  c.prototype.activate = function (a, b, c) {
    function e() {
      f.removeClass("active")
        .find("\x3e .dropdown-menu \x3e .active")
        .removeClass("active");
      a.addClass("active");
      h ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade");
      a.parent(".dropdown-menu") && a.closest("li.dropdown").addClass("active");
      c && c();
    }
    var f = b.find("\x3e .active"),
      h = c && d.support.transition && f.hasClass("fade");
    h ? f.one(d.support.transition.end, e).emulateTransitionEnd(150) : e();
    f.removeClass("in");
  };
  var f = d.fn.tab;
  d.fn.tab = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.tab");
      e || b.data("bs.tab", (e = new c(this)));
      if ("string" == typeof a) e[a]();
    });
  };
  d.fn.tab.Constructor = c;
  d.fn.tab.noConflict = function () {
    d.fn.tab = f;
    return this;
  };
  d(document).on(
    "click.bs.tab.data-api",
    '[data-toggle\x3d"tab"], [data-toggle\x3d"pill"]',
    function (a) {
      a.preventDefault();
      d(this).tab("show");
    },
  );
})(jQuery);
+(function (d) {
  var c = function (a, b) {
    this.options = d.extend({}, c.DEFAULTS, b);
    this.$window = d(window)
      .on("scroll.bs.affix.data-api", d.proxy(this.checkPosition, this))
      .on(
        "click.bs.affix.data-api",
        d.proxy(this.checkPositionWithEventLoop, this),
      );
    this.$element = d(a);
    this.affixed = this.unpin = this.pinnedOffset = null;
    this.checkPosition();
  };
  c.RESET = "affix affix-top affix-bottom";
  c.DEFAULTS = { offset: 0 };
  c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$window.scrollTop();
    return (this.pinnedOffset = this.$element.offset().top - a);
  };
  c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(d.proxy(this.checkPosition, this), 1);
  };
  c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var a = d(document).height(),
        b = this.$window.scrollTop(),
        e = this.$element.offset(),
        f = this.options.offset,
        k = f.top,
        h = f.bottom;
      "top" == this.affixed && (e.top += b);
      "object" != typeof f && (h = k = f);
      "function" == typeof k && (k = f.top(this.$element));
      "function" == typeof h && (h = f.bottom(this.$element));
      b =
        null != this.unpin && b + this.unpin <= e.top
          ? !1
          : null != h && e.top + this.$element.height() >= a - h
            ? "bottom"
            : null != k && b <= k
              ? "top"
              : !1;
      this.affixed !== b &&
        (this.unpin && this.$element.css("top", ""),
        (e = "affix" + (b ? "-" + b : "")),
        (f = d.Event(e + ".bs.affix")),
        this.$element.trigger(f),
        f.isDefaultPrevented() ||
          ((this.affixed = b),
          (this.unpin = "bottom" == b ? this.getPinnedOffset() : null),
          this.$element
            .removeClass(c.RESET)
            .addClass(e)
            .trigger(d.Event(e.replace("affix", "affixed"))),
          "bottom" == b &&
            this.$element.offset({ top: a - h - this.$element.height() })));
    }
  };
  var f = d.fn.affix;
  d.fn.affix = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.affix"),
        f = "object" == typeof a && a;
      e || b.data("bs.affix", (e = new c(this, f)));
      if ("string" == typeof a) e[a]();
    });
  };
  d.fn.affix.Constructor = c;
  d.fn.affix.noConflict = function () {
    d.fn.affix = f;
    return this;
  };
  d(window).on("load", function () {
    d('[data-spy\x3d"affix"]').each(function () {
      var a = d(this),
        b = a.data();
      b.offset = b.offset || {};
      b.offsetBottom && (b.offset.bottom = b.offsetBottom);
      b.offsetTop && (b.offset.top = b.offsetTop);
      a.affix(b);
    });
  });
})(jQuery);
+(function (d) {
  var c = function (a, b) {
    this.$element = d(a);
    this.options = d.extend({}, c.DEFAULTS, b);
    this.transitioning = null;
    this.options.parent && (this.$parent = d(this.options.parent));
    this.options.toggle && this.toggle();
  };
  c.DEFAULTS = { toggle: !0 };
  c.prototype.dimension = function () {
    return this.$element.hasClass("width") ? "width" : "height";
  };
  c.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var a = d.Event("show.bs.collapse");
      this.$element.trigger(a);
      if (!a.isDefaultPrevented()) {
        if (
          (a = this.$parent && this.$parent.find("\x3e .panel \x3e .in")) &&
          a.length
        ) {
          var b = a.data("bs.collapse");
          if (b && b.transitioning) return;
          a.collapse("hide");
          b || a.data("bs.collapse", null);
        }
        var c = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[c](0);
        this.transitioning = 1;
        a = function () {
          this.$element
            .removeClass("collapsing")
            .addClass("collapse in")
            [c]("auto");
          this.transitioning = 0;
          this.$element.trigger("shown.bs.collapse");
        };
        if (!d.support.transition) return a.call(this);
        b = d.camelCase(["scroll", c].join("-"));
        this.$element
          .one(d.support.transition.end, d.proxy(a, this))
          .emulateTransitionEnd(350)
          [c](this.$element[0][b]);
      }
    }
  };
  c.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var a = d.Event("hide.bs.collapse");
      this.$element.trigger(a);
      if (!a.isDefaultPrevented()) {
        a = this.dimension();
        this.$element[a](this.$element[a]())[0].offsetHeight;
        this.$element
          .addClass("collapsing")
          .removeClass("collapse")
          .removeClass("in");
        this.transitioning = 1;
        var b = function () {
          this.transitioning = 0;
          this.$element
            .trigger("hidden.bs.collapse")
            .removeClass("collapsing")
            .addClass("collapse");
        };
        if (!d.support.transition) return b.call(this);
        this.$element[a](0)
          .one(d.support.transition.end, d.proxy(b, this))
          .emulateTransitionEnd(350);
      }
    }
  };
  c.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  };
  var f = d.fn.collapse;
  d.fn.collapse = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.collapse"),
        f = d.extend({}, c.DEFAULTS, b.data(), "object" == typeof a && a);
      !e && f.toggle && "show" == a && (a = !a);
      e || b.data("bs.collapse", (e = new c(this, f)));
      if ("string" == typeof a) e[a]();
    });
  };
  d.fn.collapse.Constructor = c;
  d.fn.collapse.noConflict = function () {
    d.fn.collapse = f;
    return this;
  };
  d(document).on(
    "click.bs.collapse.data-api",
    "[data-toggle\x3dcollapse]",
    function (a) {
      var b = d(this),
        c;
      a =
        b.attr("data-target") ||
        a.preventDefault() ||
        ((c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""));
      c = d(a);
      var f = (a = c.data("bs.collapse")) ? "toggle" : b.data(),
        k = b.attr("data-parent"),
        h = k && d(k);
      (a && a.transitioning) ||
        (h &&
          h
            .find('[data-toggle\x3dcollapse][data-parent\x3d"' + k + '"]')
            .not(b)
            .addClass("collapsed"),
        b[c.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
      c.collapse(f);
    },
  );
})(jQuery);
+(function (d) {
  function c(a, b) {
    var e,
      f = d.proxy(this.process, this);
    this.$element = d(a).is("body") ? d(window) : d(a);
    this.$body = d("body");
    this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f);
    this.options = d.extend({}, c.DEFAULTS, b);
    this.selector =
      (this.options.target ||
        ((e = d(a).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "")) ||
        "") + " .nav li \x3e a";
    this.offsets = d([]);
    this.targets = d([]);
    this.activeTarget = null;
    this.refresh();
    this.process();
  }
  c.DEFAULTS = { offset: 10 };
  c.prototype.refresh = function () {
    var a = this.$element[0] == window ? "offset" : "position";
    this.offsets = d([]);
    this.targets = d([]);
    var b = this;
    this.$body
      .find(this.selector)
      .map(function () {
        var c = d(this);
        c = c.data("target") || c.attr("href");
        var f = /^#./.test(c) && d(c);
        return (
          (f &&
            f.length &&
            f.is(":visible") && [
              [
                f[a]().top +
                  (!d.isWindow(b.$scrollElement.get(0)) &&
                    b.$scrollElement.scrollTop()),
                c,
              ],
            ]) ||
          null
        );
      })
      .sort(function (a, b) {
        return a[0] - b[0];
      })
      .each(function () {
        b.offsets.push(this[0]);
        b.targets.push(this[1]);
      });
  };
  c.prototype.process = function () {
    var a = this.$scrollElement.scrollTop() + this.options.offset,
      b =
        (this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight) -
        this.$scrollElement.height(),
      c = this.offsets,
      d = this.targets,
      f = this.activeTarget,
      h;
    if (a >= b) return f != (h = d.last()[0]) && this.activate(h);
    if (f && a <= c[0]) return f != (h = d[0]) && this.activate(h);
    for (h = c.length; h--; )
      f != d[h] &&
        a >= c[h] &&
        (!c[h + 1] || a <= c[h + 1]) &&
        this.activate(d[h]);
  };
  c.prototype.activate = function (a) {
    this.activeTarget = a;
    d(this.selector)
      .parentsUntil(this.options.target, ".active")
      .removeClass("active");
    a = d(
      this.selector +
        '[data-target\x3d"' +
        a +
        '"],' +
        this.selector +
        '[href\x3d"' +
        a +
        '"]',
    )
      .parents("li")
      .addClass("active");
    a.parent(".dropdown-menu").length &&
      (a = a.closest("li.dropdown").addClass("active"));
    a.trigger("activate.bs.scrollspy");
  };
  var f = d.fn.scrollspy;
  d.fn.scrollspy = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("bs.scrollspy"),
        f = "object" == typeof a && a;
      e || b.data("bs.scrollspy", (e = new c(this, f)));
      if ("string" == typeof a) e[a]();
    });
  };
  d.fn.scrollspy.Constructor = c;
  d.fn.scrollspy.noConflict = function () {
    d.fn.scrollspy = f;
    return this;
  };
  d(window).on("load", function () {
    d('[data-spy\x3d"scroll"]').each(function () {
      var a = d(this);
      a.scrollspy(a.data());
    });
  });
})(jQuery);
+(function (d) {
  d.fn.emulateTransitionEnd = function (c) {
    var f = !1,
      a = this;
    d(this).one(d.support.transition.end, function () {
      f = !0;
    });
    setTimeout(function () {
      f || d(a).trigger(d.support.transition.end);
    }, c);
    return this;
  };
  d(function () {
    var c = d.support;
    a: {
      var f = document.createElement("bootstrap");
      var a = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        },
        b;
      for (b in a)
        if (void 0 !== f.style[b]) {
          f = { end: a[b] };
          break a;
        }
      f = !1;
    }
    c.transition = f;
  });
})(jQuery);
(function (d, c) {
  function f(a, b, c, e) {
    e = {
      data: e || (b ? b.data : {}),
      _wrap: b ? b._wrap : null,
      tmpl: null,
      parent: b || null,
      nodes: [],
      calls: l,
      nest: m,
      wrap: p,
      html: r,
      update: q,
    };
    a && d.extend(e, a, { nodes: [], parent: b });
    c &&
      ((e.tmpl = c),
      (e._ctnt = e._ctnt || e.tmpl(d, e)),
      (e.key = ++y),
      ((D.length ? w : u)[y] = e));
    return e;
  }
  function a(c, e, f) {
    var g;
    f = f
      ? d.map(f, function (b) {
          return "string" === typeof b
            ? c.key
              ? b.replace(
                  /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,
                  '$1 _tmplitem\x3d"' + c.key + '" $2',
                )
              : b
            : a(b, c, b._ctnt);
        })
      : c;
    if (e) return f;
    f = f.join("");
    f.replace(
      /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
      function (a, c, e, f) {
        g = d(e).get();
        h(g);
        c && (g = b(c).concat(g));
        f && (g = g.concat(b(f)));
      },
    );
    return g ? g : b(f);
  }
  function b(a) {
    var b = document.createElement("div");
    b.innerHTML = a;
    return d.makeArray(b.childNodes);
  }
  function e(a) {
    return new Function(
      "jQuery",
      "$item",
      "var $\x3djQuery,call,_\x3d[],$data\x3d$item.data;with($data){_.push('" +
        d
          .trim(a)
          .replace(/([\\'])/g, "\\$1")
          .replace(/[\r\t\n]/g, " ")
          .replace(/\$\{([^\}]*)\}/g, "{{\x3d $1}}")
          .replace(
            /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
            function (a, b, c, e, f, g, h) {
              a = d.tmpl.tag[c];
              if (!a) throw "Template command not found: " + c;
              c = a._default || [];
              g && !/\w$/.test(f) && ((f += g), (g = ""));
              f
                ? ((f = k(f)),
                  (h = h ? "," + k(h) + ")" : g ? ")" : ""),
                  (h = g
                    ? -1 < f.indexOf(".")
                      ? f + g
                      : "(" + f + ").call($item" + h
                    : f),
                  (g = g
                    ? h
                    : "(typeof(" +
                      f +
                      ")\x3d\x3d\x3d'function'?(" +
                      f +
                      ").call($item):(" +
                      f +
                      "))"))
                : (g = h = c.$1 || "null");
              e = k(e);
              return (
                "');" +
                a[b ? "close" : "open"]
                  .split("$notnull_1")
                  .join(
                    f
                      ? "typeof(" +
                          f +
                          ")!\x3d\x3d'undefined' \x26\x26 (" +
                          f +
                          ")!\x3dnull"
                      : "true",
                  )
                  .split("$1a")
                  .join(g)
                  .split("$1")
                  .join(h)
                  .split("$2")
                  .join(
                    e
                      ? e.replace(
                          /\s*([^\(]+)\s*(\((.*?)\))?/g,
                          function (a, b, c, e) {
                            return (e = e ? "," + e + ")" : c ? ")" : "")
                              ? "(" + b + ").call($item" + e
                              : a;
                          },
                        )
                      : c.$2 || "",
                  ) +
                "_.push('"
              );
            },
          ) +
        "');}return _;",
    );
  }
  function g(b, c) {
    b._wrap = a(b, !0, d.isArray(c) ? c : [v.test(c) ? c : d(c).html()]).join(
      "",
    );
  }
  function k(a) {
    return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null;
  }
  function h(a) {
    function b(a) {
      function b(a) {
        a += c;
        q = g[a] = g[a] || f(q, u[q.parent.key + c] || q.parent, null, !0);
      }
      var e,
        h = a,
        q,
        k;
      if ((k = a.getAttribute("_tmplitem"))) {
        for (
          ;
          h.parentNode &&
          1 === (h = h.parentNode).nodeType &&
          !(e = h.getAttribute("_tmplitem"));

        );
        e !== k &&
          ((h = h.parentNode
            ? 11 === h.nodeType
              ? 0
              : h.getAttribute("_tmplitem") || 0
            : 0),
          (q = u[k]) ||
            ((q = w[k]),
            (q = f(q, u[h] || w[h], null, !0)),
            (q.key = ++y),
            (u[y] = q)),
          z && b(k));
        a.removeAttribute("_tmplitem");
      } else
        z &&
          (q = d.data(a, "tmplItem")) &&
          (b(q.key),
          (u[q.key] = q),
          (h = (h = d.data(a.parentNode, "tmplItem")) ? h.key : 0));
      if (q) {
        for (e = q; e && e.key != h; ) e.nodes.push(a), (e = e.parent);
        delete q._ctnt;
        delete q._wrap;
        d.data(a, "tmplItem", q);
      }
    }
    var c = "_" + z,
      e,
      g = {},
      h,
      q;
    var k = 0;
    for (h = a.length; k < h; k++)
      if (1 === (e = a[k]).nodeType) {
        var l = e.getElementsByTagName("*");
        for (q = l.length - 1; 0 <= q; q--) b(l[q]);
        b(e);
      }
  }
  function l(a, b, c, e) {
    if (!a) return D.pop();
    D.push({ _: a, tmpl: b, item: this, data: c, options: e });
  }
  function m(a, b, c) {
    return d.tmpl(d.template(a), b, c, this);
  }
  function p(a, b) {
    var c = a.options || {};
    c.wrapped = b;
    return d.tmpl(d.template(a.tmpl), a.data, c, a.item);
  }
  function r(a, b) {
    var c = this._wrap;
    return d.map(
      d(d.isArray(c) ? c.join("") : c).filter(a || "*"),
      function (a) {
        if (b) a = a.innerText || a.textContent;
        else {
          var c;
          (c = a.outerHTML) ||
            ((c = document.createElement("div")),
            c.appendChild(a.cloneNode(!0)),
            (c = c.innerHTML));
          a = c;
        }
        return a;
      },
    );
  }
  function q() {
    var a = this.nodes;
    d.tmpl(null, null, null, this).insertBefore(a[0]);
    d(a).remove();
  }
  var t = d.fn.domManip,
    v = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{! /,
    u = {},
    w = {},
    x,
    A = { key: 0, data: {} },
    y = 0,
    z = 0,
    D = [];
  d.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith",
    },
    function (a, b) {
      d.fn[a] = function (c) {
        var e = [];
        c = d(c);
        var f;
        var g = 1 === this.length && this[0].parentNode;
        x = u || {};
        if (
          g &&
          11 === g.nodeType &&
          1 === g.childNodes.length &&
          1 === c.length
        )
          c[b](this[0]), (e = this);
        else {
          var h = 0;
          for (f = c.length; h < f; h++)
            (z = h),
              (g = (0 < h ? this.clone(!0) : this).get()),
              d.fn[b].apply(d(c[h]), g),
              (e = e.concat(g));
          z = 0;
          e = this.pushStack(e, a, c.selector);
        }
        c = x;
        x = null;
        d.tmpl.complete(c);
        return e;
      };
    },
  );
  d.fn.extend({
    tmpl: function (a, b, c) {
      return d.tmpl(this[0], a, b, c);
    },
    tmplItem: function () {
      return d.tmplItem(this[0]);
    },
    template: function (a) {
      return d.template(a, this[0]);
    },
    domManip: function (a, b, c, e) {
      if (a[0] && a[0].nodeType) {
        for (
          var f = d.makeArray(arguments), g = a.length, h = 0, q;
          h < g && !(q = d.data(a[h++], "tmplItem"));

        );
        1 < g && (f[0] = [d.makeArray(a)]);
        q &&
          z &&
          (f[2] = function (a) {
            d.tmpl.afterManip(this, a, c);
          });
        t.apply(this, f);
      } else t.apply(this, arguments);
      z = 0;
      x || d.tmpl.complete(u);
      return this;
    },
  });
  d.extend({
    tmpl: function (b, c, e, h) {
      var q = !h;
      if (q) (h = A), (b = d.template[b] || d.template(null, b)), (w = {});
      else if (!b)
        return (
          (b = h.tmpl),
          (u[h.key] = h),
          (h.nodes = []),
          h.wrapped && g(h, h.wrapped),
          d(a(h, null, h.tmpl(d, h)))
        );
      if (!b) return [];
      "function" === typeof c && (c = c.call(h || {}));
      e && e.wrapped && g(e, e.wrapped);
      c = d.isArray(c)
        ? d.map(c, function (a) {
            return a ? f(e, h, b, a) : null;
          })
        : [f(e, h, b, c)];
      return q ? d(a(h, null, c)) : c;
    },
    tmplItem: function (a) {
      var b;
      for (
        a instanceof d && (a = a[0]);
        a &&
        1 === a.nodeType &&
        !(b = d.data(a, "tmplItem")) &&
        (a = a.parentNode);

      );
      return b || A;
    },
    template: function (a, b) {
      return b
        ? ("string" === typeof b
            ? (b = e(b))
            : b instanceof d && (b = b[0] || {}),
          b.nodeType &&
            (b = d.data(b, "tmpl") || d.data(b, "tmpl", e(b.innerHTML))),
          "string" === typeof a ? (d.template[a] = b) : b)
        : a
          ? "string" !== typeof a
            ? d.template(null, a)
            : d.template[a] || d.template(null, v.test(a) ? a : d(a))
          : null;
    },
    encode: function (a) {
      return ("" + a)
        .split("\x3c")
        .join("\x26lt;")
        .split("\x3e")
        .join("\x26gt;")
        .split('"')
        .join("\x26#34;")
        .split("'")
        .join("\x26#39;");
    },
  });
  d.extend(d.tmpl, {
    tag: {
      tmpl: {
        _default: { $2: "null" },
        open: "if($notnull_1){_\x3d_.concat($item.nest($1,$2));}",
      },
      wrap: {
        _default: { $2: "null" },
        open: "$item.calls(_,$1,$2);_\x3d[];",
        close: "call\x3d$item.calls();_\x3dcall._.concat($item.wrap(call,_));",
      },
      each: {
        _default: { $2: "$index, $value" },
        open: "if($notnull_1){$.each($1a,function($2){with(this){",
        close: "}});}",
      },
      if: { open: "if(($notnull_1) \x26\x26 $1a){", close: "}" },
      else: {
        _default: { $1: "true" },
        open: "}else if(($notnull_1) \x26\x26 $1a){",
      },
      html: { open: "if($notnull_1){_.push($1a);}" },
      "\x3d": {
        _default: { $1: "$data" },
        open: "if($notnull_1){_.push($.encode($1a));}",
      },
      "!": { open: "" },
    },
    complete: function (a) {
      u = {};
    },
    afterManip: function (a, b, c) {
      var e =
        11 === b.nodeType
          ? d.makeArray(b.childNodes)
          : 1 === b.nodeType
            ? [b]
            : [];
      c.call(a, b);
      h(e);
      z++;
    },
  });
})(jQuery);
(function (d, c, f) {
  var a = d(document),
    b = xfalib.ut.TouchUtil,
    e = b.POINTER_DOWN,
    g = b.POINTER_UP,
    k = b.POINTER_MOVE;
  d.event.special.swipe = {
    scrollSupressionThreshold: 30,
    durationThreshold: 1e3,
    horizontalDistanceThreshold: 30,
    verticalDistanceThreshold: 30,
    getLocation: function (a) {
      var b = c.pageXOffset,
        e = c.pageYOffset,
        d = a.clientX || a.originalEvent.clientX,
        f = a.clientY || a.originalEvent.clientY;
      if (
        (0 === a.pageY && Math.floor(f) > Math.floor(a.pageY)) ||
        (0 === a.pageX && Math.floor(d) > Math.floor(a.pageX))
      )
        (d -= b), (f -= e);
      else if (f < a.pageY - e || d < a.pageX - b)
        (d = a.pageX - b), (f = a.pageY - e);
      return { x: d, y: f };
    },
    start: function (a) {
      var b = d.event.special.swipe.getLocation(
        a.originalEvent.touches ? a.originalEvent.touches[0] : a,
      );
      return {
        time: new Date().getTime(),
        coords: [b.x, b.y],
        origin: d(a.target),
      };
    },
    stop: function (a) {
      a = d.event.special.swipe.getLocation(
        a.originalEvent.touches ? a.originalEvent.touches[0] : a,
      );
      return { time: new Date().getTime(), coords: [a.x, a.y] };
    },
    handleSwipe: function (a, b, c, e) {
      if (
        b.time - a.time < d.event.special.swipe.durationThreshold &&
        Math.abs(a.coords[0] - b.coords[0]) >
          d.event.special.swipe.horizontalDistanceThreshold &&
        Math.abs(a.coords[1] - b.coords[1]) <
          d.event.special.swipe.verticalDistanceThreshold
      ) {
        var g = a.coords[0] > b.coords[0] ? "swipeleft" : "swiperight";
        a = d.Event(g, { target: e, swipestart: a, swipestop: b });
        b = a.type;
        a.type = g;
        d.event.trigger(a, f, c);
        a.type = b;
        return !0;
      }
      return !1;
    },
    eventInProgress: !1,
    setup: function () {
      var b = this,
        c = d(b),
        m = {};
      var p = d.data(this, "mobile-events");
      p || ((p = { length: 0 }), d.data(this, "mobile-events", p));
      p.length++;
      p.swipe = m;
      m.start = function (c) {
        if (
          (c.originalEvent.pointerType === f ||
            2 === c.originalEvent.pointerType ||
            "touch" === c.originalEvent.pointerType) &&
          !d.event.special.swipe.eventInProgress
        ) {
          d.event.special.swipe.eventInProgress = !0;
          var e,
            h = d.event.special.swipe.start(c),
            l = c.target,
            p = !1;
          m.move = function (a) {
            h &&
              ((e = d.event.special.swipe.stop(a)),
              !p &&
                (p = d.event.special.swipe.handleSwipe(h, e, b, l)) &&
                (d.event.special.swipe.eventInProgress = !1),
              Math.abs(h.coords[0] - e.coords[0]) >
                d.event.special.swipe.scrollSupressionThreshold &&
                a.preventDefault());
          };
          m.stop = function () {
            p = !0;
            d.event.special.swipe.eventInProgress = !1;
            a.off(k, m.move);
            m.move = null;
          };
          a.on(k, m.move).one(g, m.stop);
        }
      };
      c.on(e, m.start);
    },
    teardown: function () {
      var b;
      if ((b = d.data(this, "mobile-events"))) {
        var c = b.swipe;
        delete b.swipe;
        b.length--;
        0 === b.length && d.removeData(this, "mobile-events");
      }
      c &&
        (c.start && d(this).off(e, c.start),
        c.move && a.off(k, c.move),
        c.stop && a.off(g, c.stop));
    },
  };
  d.each({ swipeleft: "swipe", swiperight: "swipe" }, function (a, c) {
    "mousedown" !== b.POINTER_DOWN &&
      (d.event.special[a] = {
        setup: function () {
          d(this).on(c, d.noop);
        },
        teardown: function () {
          d(this).off(c);
        },
      });
  });
})(jQuery, this);
(function (d, c) {
  var f = {
    getMultipleTemplateJson: function (a) {
      var b = a.path,
        e = a.listOfTemplateIds;
      0 < e.length &&
        c.ajax({
          url: b,
          type: "GET",
          data: { listOfTemplateIds: JSON.stringify(e), fetchMultipleJson: !0 },
          async: !1,
          success: function (b) {
            a.success.call(this, JSON.parse(b.multipleJson));
          },
          error: function (a) {
            d.guideBridge._guide().logger().log(a);
          },
        });
    },
    getHtmlJson: function (a) {
      c.ajax({
        url: a.path,
        type: "GET",
        data: {
          templateId: a.templateId,
          fetchJSON: a.fetchJSON,
          fetchHTML: a.fetchHTML,
        },
        async: !1,
        success: a.success,
        error: a.error,
        complete: a.complete,
      });
    },
  };
  d.addEventListener("bridgeInitializeStart", function (a) {
    (a = a.detail.guideBridge) && a.registerPanelProvider(f);
  });
})(window, $);
(function (d, c) {
  function f() {
    return xfalib.ut.XfaUtil.prototype.getOrElse.apply(null, arguments);
  }
  Function.prototype.bind =
    Function.prototype.bind ||
    function (a) {
      var b = this;
      return function () {
        b.call(a, arguments);
      };
    };
  var a = 0,
    b = !1,
    e = null,
    g = "",
    k = function () {
      var a = [],
        b = [],
        c = [];
      this.errors = !1;
      this.addMessage = function (e, d, f) {
        this.errors = !0;
        a.push(d);
        c.push(f);
        b.push(e);
      };
      this.getNextMessage = function () {
        return 0 == b.length
          ? null
          : { code: b.pop(), somExpression: c.pop(), message: a.pop() };
      };
    },
    h = function () {
      this._guideView = this._guide = this._$target = null;
      this._version = "1.0";
      this._guideInitHandler = {};
      this._guideModelInitHandler = {};
      d(window).on(
        "guideModelInitialized",
        this._guideModelInitialized.bind(this),
      );
      d(window).on("guideInitialized", this._guideInitialized.bind(this));
      d(window).on("guideInitializationError", this._guideError);
      this.userConfig = {};
      this.panelProvider = null;
      this.hostName = "client";
    },
    l = !1,
    m = function (a) {
      var b = !0;
      if (guideBridge._disablePreview()) return !1;
      d.ajax({
        url: guideBridge._getGuidePathUrl(".fd.tempstorageprovider.jsp"),
        type: "POST",
        async: !1,
        data: { uuidPath: "/tmp/fd/af/" + a },
        error: function (a) {
          guideBridge._guide.logger().log(a);
          b = !1;
          d.proxy(guideBridge._handleSubmitError(a), guideBridge);
        },
      });
      return b;
    },
    p = function (a) {
      if ("undefined" != typeof console)
        for (var b = a.getNextMessage(); b; )
          this._guide.logger().log(b.message), (b = a.getNextMessage());
    };
  d.extend(h.prototype, {
    GUIDE_BRIDGE_INITIALIZE_START: "bridgeInitializeStart",
    GUIDE_BRIDGE_INITIALIZE_COMPLETE: "bridgeInitializeComplete",
    GUIDE_ELEMENT_VISIBLE_CHANGED: "elementVisibleChanged",
    GUIDE_ELEMENT_ENABLE_CHANGED: "elementEnableChanged",
    GUIDE_ELEMENT_VALUE_CHANGED: "elementValueChanged",
    GUIDE_ELEMENT_NAVIGATION_CHANGED: "elementNavigationChanged",
    GUIDE_ELEMENT_FOCUS_CHANGED: "elementFocusChanged",
    GUIDE_ELEMENT_HELP_SHOWN: "elementHelpShown",
    GUIDE_ELEMENT_VALIDATION_STATUS_CHANGED: "elementValidationStatusChanged",
    GUIDE_ELEMENT_BUTTON_CLICKED: "elementButtonclicked",
    GUIDE_VALIDATION_COMPLETE: "validationComplete",
    GUIDE_AUTO_SAVE_START: "guideAutoSaveStart",
    GUIDE_SAVE_START: "saveStarted",
    GUIDE_SAVE_COMPLETED: "saveCompleted",
    GUIDE_SUBMIT_START: "submitStart",
    GUIDE_PATH: "guidePath",
    GUIDE_NAME: "guideName",
    GUIDE_DESC: "guideDesc",
    GUIDE_TYPE: "guideType",
    GUIDE_ELEMENT_LAZY_LOADED: "elementLazyLoaded",
    isConnected: function () {
      return this._guide ? !0 : !1;
    },
    connect: function (a, b) {
      b = b || guideBridge;
      if (this.isConnected())
        try {
          a.call(b);
        } catch (v) {
          this._guide && this._guide.logger().log(v);
        }
      else
        (this._guideInitHandler.handler = this._guideInitHandler.handler || []),
          this._guideInitHandler.handler.push(a),
          (this._guideInitHandler.context =
            this._guideInitHandler.context || []),
          this._guideInitHandler.context.push(b);
    },
    _modelConnect: function (a, b) {
      b = b || guideBridge;
      if (this.isConnected())
        try {
          a.call(b);
        } catch (v) {
          this._guide && this._guide.logger().log(v);
        }
      else
        (this._guideModelInitHandler.handler =
          this._guideModelInitHandler.handler || []),
          this._guideModelInitHandler.handler.push(a),
          (this._guideModelInitHandler.context =
            this._guideModelInitHandler.context || []),
          this._guideModelInitHandler.context.push(b);
    },
    _guideModelInitialized: function (a) {
      this._guide = a.guide;
      if (this._guideModelInitHandler.handler)
        for (a = 0; a < this._guideModelInitHandler.handler.length; a++)
          try {
            this._guideModelInitHandler.handler[a].call(
              this._guideModelInitHandler.context[a],
            );
          } catch (t) {
            this._guide && this._guide.logger().log(t);
          }
    },
    _guideInitialized: function (a) {
      if (this._guideInitHandler.handler)
        for (a = 0; a < this._guideInitHandler.handler.length; a++)
          try {
            this._guideInitHandler.handler[a].call(
              this._guideInitHandler.context[a],
            );
          } catch (t) {
            this._guide && this._guide.logger().log(t);
          }
      window.guideBridge.trigger(
        "bridgeInitializeComplete",
        guidelib.event.GuideModelEvent.createEvent(
          "bridgeInitializeComplete",
          guideBridge,
        ),
      );
    },
    _setGuideView: function (a) {
      this._guideView = a;
    },
    _guideError: function (a) {
      this._guide.logger().debug("AF", a);
    },
    _checkGuide: function (a) {
      return this._guide
        ? !0
        : (a.addMessage(1, "Guide Dom not Initialized", ""), !1);
    },
    getBridgeVersion: function () {
      return this._version;
    },
    registerConfig: function (a, b) {
      var c = new k();
      c.data = this.userConfig[a];
      this.userConfig[a] = b;
      c.completed = !0;
      return c;
    },
    customContextProperty: function (a, b) {
      var e = f(guidelib, "__runtime__.guideContext.customPropertyMap", {});
      e = c.extend(
        {},
        e,
        f(this._guide, "runtime.guideContext.customPropertyMap", {}),
      );
      if (c.isUndefined(b))
        if (c.isObject(a))
          guideBridge._modelConnect(
            (function (a, b) {
              return function () {
                var e = c.extend(
                  {},
                  guideBridge._guide.runtime.guideContext.customPropertyMap,
                  a,
                );
                c.extend(e, b);
                guideBridge._guide.runtime.guideContext.customPropertyMap = e;
              };
            })(e, a),
          );
        else return e[a];
      else {
        var d = e[a];
        guideBridge._modelConnect(
          (function (a, b, e) {
            return function () {
              var d = c.extend(
                {},
                guideBridge._guide.runtime.guideContext.customPropertyMap,
                e,
              );
              d[a] = b;
              guideBridge._guide.runtime.guideContext.customPropertyMap = d;
            };
          })(a, b, e),
        );
        return d;
      }
    },
    getNavigablePanel: function (a) {
      return this._guideView.getSomOnNavigableAncestor(a);
    },
    setProperty: function (a, b, e) {
      if (b && c.isArray(a) && c.isArray(e) && a.length === e.length) {
        var d = this;
        c.each(a, function (a, c) {
          var f = d.resolveNode(a);
          f ? (f[b] = e[c]) : d._guide.logger().log("som not valid:" + a);
        });
        this._guide._currentContext || this._guide.runPendingExpressions();
      }
    },
    getDataXML: function (a) {
      guideBridge.getData(a);
    },
    getData: function (a) {
      a = a || {};
      a.dorData = a.dorData || a.boundData;
      var b = new k();
      a.guideState || this._checkGuide(b)
        ? this._submitInternal({
            success: function (e) {
              e = e || {};
              b.completed = !0;
              b.data = a.dorData ? e.dorDataXml : e.data;
              c.isFunction(a.success) && a.success.call(a.context, b);
            },
            error: function (e, d, f) {
              b.completed = !1;
              b.addMessage(2, "Error in getData API", "");
              c.isFunction(a.error) && a.error.call(a.context, b);
            },
            guideState: a.guideState,
            async: a.async,
            fileUploadPath: a.fileUploadPath,
            excludeFormState: a.excludeFormState || !1,
            dorData: a.dorData || !1,
          })
        : a.error.call(a.context, b);
    },
    _getFormDataObj: function () {
      guideBridge._updateAFSubmissionInfo();
      guideBridge._guide.internal.liveDataUtils.updateLiveData(null, !0);
      guideBridge._guide.internal.liveDataUtils.insertSubmissionInfo(
        guideBridge._guide.runtime.guideContext.afSubmissionInfo,
      );
      var a = guideBridge._guide.internal.liveDataUtils.getLiveDataStr(),
        b = "application/xml";
      guideBridge._guide.internal.liveDataUtils instanceof
        guidelib.model.LiveJsonUtils && (b = "application/json");
      return new guidelib.model.FormData({
        data: a,
        contentType: b,
        attachments: guideBridge.getFileAttachmentWrapper(),
      });
    },
    _getExcludeFromDorData: function (a) {
      var b = a ? a : guideBridge._guide;
      a = null;
      window.guideBridge._updateAFSubmissionInfo(b);
      b = b.runtime.guideContext.afSubmissionInfo;
      b.excludeFromDoR && (a = b.excludeFromDoR);
      return a;
    },
    getFormDataObject: function (a) {
      var b = guideBridge._getFormDataObj(),
        c = new k();
      c.data = b;
      a && "function" === typeof a.success && a.success(c);
    },
    getFormDataString: function (a) {
      var b = guideBridge._getFormDataObj(),
        c = new k();
      c.data = b.data;
      a && "function" === typeof a.success && a.success(c);
    },
    hideSubmitButtons: function () {
      return this._hideElements("guideButton", "submit");
    },
    _evaluateExpression: function (a) {
      if (this._guide)
        return this._guide._compileExpression(a, null).apply(this._guide);
    },
    getAutoSaveEnabledStatus: function () {
      var a = !1;
      this.isConnected() && (a = this._guide.enableAutoSave);
      return a;
    },
    hasAutoSaveStarted: function () {
      return (
        this._guide && this._guide.enableAutoSave && this._guide.autoSaveStart
      );
    },
    getAutoSaveInfo: function () {
      return this._guide.autoSaveInfo;
    },
    afSubmissionInfo: function (a, b) {
      var e = guideBridge._guide.runtime.guideContext.afSubmissionInfo || {};
      if (c.isUndefined(b)) return e[a];
      var d = e[a];
      e[a] = b;
      guideBridge._guide.runtime.guideContext.afSubmissionInfo = e;
      return d;
    },
    getComputedSubmissionMetadata: function () {
      var a = {},
        b = null,
        e = null,
        d = this.getSubmissionMetadataInfo();
      if (d)
        if (c.isObject(d))
          for (var f in d)
            try {
              (b = JSON.parse(d[f])),
                (e = this._guide._compileExpression(b.value)),
                (a[b.key] = e.apply(this._guide));
            } catch (x) {
              this._guide && this._guide.logger().log(x);
            }
        else if (c.isString(d))
          try {
            (b = JSON.parse(d)),
              (e = this._guide._compileExpression(b.value)),
              (a[b.key] = e.apply(this._guide));
          } catch (x) {
            this._guide && this._guide.logger().log(x);
          }
      return a;
    },
    getGlobalMetaInfo: function () {
      return this._guide.globalMetaInfo;
    },
    getSubmissionMetadataInfo: function () {
      return this._guide.submissionMetaInfo &&
        "local" === this._guide.submissionMetaInfo.metadataselector
        ? f(this._guide, "submissionMetaInfo.metadata", null)
        : f(this._guide, "globalMetaInfo.metadata", null);
    },
    setEnabledAutoSave: function (a) {
      this._guide.enableAutoSave = a;
    },
    hideFileAttachmentListingButtons: function () {
      return this._hideElements("guideListFileAttachmentButton");
    },
    isOffline: function () {
      return b;
    },
    setIsOffline: function (a) {
      b = a;
    },
    hideFileAttachments: function () {
      return this._hideElements("guideFileUpload");
    },
    hideGlobalToolbar: function () {
      var a = new k(),
        b;
      if (!this._checkGuide(a)) return a;
      guideBridge._guide.toolbar &&
        (b = this._getGuideDomElement(
          guideBridge._guide.toolbar.somExpression,
        )) &&
        0 < b.length &&
        b.hide();
      a.completed = !0;
      return a;
    },
    hideSaveButtons: function () {
      return this._hideElements("guideButton", "save");
    },
    hideResetButtons: function () {
      return this._hideElements("guideButton", "reset");
    },
    getElementProperty: function (a) {
      var b = a.somExpressions;
      a = a.propertyName;
      var c = new k();
      if (!this._checkGuide(c)) return c;
      c.data = [];
      for (var e = 0; e < b.length; e++) {
        var d = this.resolveNode(b[e]);
        null == d
          ? (c.addMessage(0, "No element " + b[e] + " exists", b[e]),
            c.data.push(null))
          : ((c.completed = !0), c.data.push(d[a]));
      }
      return c;
    },
    _getGuideDomElement: function (a, b) {
      return this._guideView ? this._guideView._getGuideDomElement(a, b) : null;
    },
    getTempPath: function () {
      return "/tmp/fd/af/" + this._getUUID();
    },
    getFileAttachmentsInfo: function (a) {
      var b = this._getFileAttachmentsList(),
        e;
      a = {
        options: a,
        fileAttachmentsList: b,
        fileUploadPath: this.getTempPath(),
        callback: function (a) {
          e = [];
          c.each(
            this.attachments,
            function (a) {
              e.push({ name: a.split("/")[1], path: this.fileUrl + "/" + a });
            },
            this,
          );
          this.options.success &&
            this.options.success.call(this.options.context, e);
        },
      };
      this._getGuideAttachments(a);
    },
    _getGuideAttachments: function (a) {
      var b = [],
        e = [],
        f = null,
        g = !1,
        h = this._getContextRoot(),
        k = a.options,
        l = a.fileAttachmentsList,
        q = a.fileUploadPath,
        m = a.callback;
      a = a.errorCallback;
      h && 0 === q.indexOf(h) && (q = q.substring(h.length));
      e = this._juiceOutNameAndFileDomMap(l);
      b = e.fileDom;
      e = e.fileName;
      if (0 < b.length) {
        var p = c.indexOf(
          b,
          c.find(b, function (a) {
            return null !== a && !c.isString(a);
          }),
        );
        if (-1 !== p && q) {
          f = b[p][
            guideBridge.userConfig.uploaderPluginName || "adobeFileUploader"
          ]("uploadFile", {
            fileName: e,
            fileDom: b,
            fileUploadPath: q,
            multiple: !0,
            _getUrl: guideBridge._getUrl(""),
          });
          h && 0 === f.indexOf(h) && (f = f.substring(h.length));
          b[p].one(
            "adobeFileUploader.multipleFileUploaded",
            d.proxy(m, {
              attachments: e,
              fileUrl: f,
              fileAttachmentsList: l,
              options: k,
            }),
          );
          if (a)
            b[p].one(
              "adobeFileUploader.fileUploadFailed",
              d.proxy(a, {
                attachments: e,
                fileUrl: f,
                fileAttachmentsList: l,
                options: k,
              }),
            );
          g = !0;
        }
        null === f && q && (f = q);
      }
      g ||
        m.apply({
          attachments: e,
          fileUrl: f,
          fileAttachmentsList: l,
          options: k,
        });
    },
    visit: function (a, b) {
      this._guide.visit(a, b || window);
    },
    _hideElements: function (a, b) {
      var c = new k();
      if (!this._checkGuide(c)) return c;
      c.completed = !0;
      this.visit(function (c) {
        "guideButton" === c.className
          ? c.type === b && (c.visible = !1)
          : c.className === a && (c.visible = !1);
      });
      return c;
    },
    hideSummaryPanel: function () {
      var a = new k();
      if (!this._checkGuide(a)) return a;
      a.completed = !0;
      this.visit(function (a) {
        "guideNode" === a.className &&
          "fd/afaddon/components/summary" ===
            a.jsonModel["sling:resourceType"] &&
          (a.panel.visible = !1);
      });
      return a;
    },
    _getFileAttachmentsList: function () {
      var a = [];
      this.visit(function (b) {
        "guideFileUpload" === b.className && a.push(b);
      });
      return a;
    },
    _getCaptchaData: function (a) {
      return a
        ? {
            serviceType: a.captchaService,
            somExpression: a.somExpression,
            validationMessage: a.validateExpMessage,
            mandatoryMessage: a.mandatoryMessage,
            data: a.value,
          }
        : {};
    },
    _getAdditionalSubmitInfo: function () {
      var a = {},
        b = d("#actionField"),
        c = this._getThankYouPageFromConfig();
      "string" === typeof c && (document.getElementById(":redirect").value = c);
      b.find("input").each(function () {
        a[d(this).attr("name")] = d(this).val();
        if (
          "_guideValueMap" == d(this).attr("name") &&
          "yes" == d(this).val()
        ) {
          var b = {};
          window.guideBridge._guide._collectValues(b);
          a._guideValuesMap = JSON.stringify(b);
        }
      });
      return a;
    },
    _getGuideDom: function (a) {
      return a.reducedJSON
        ? guideBridge._guide._getReducedJSON()
        : guideBridge._guide.jsonModel;
    },
    _createGuideStateAndLiveXml: function (a) {
      var b = new k();
      a.obj = b;
      if (this._checkGuide(b)) {
        var c = function (a) {
          !a.errors && a.completed && (e.currentContext = { data: a.data });
        };
        b.data = {};
        var e = null;
        if (this._isXfaGuide() && this._isValidXFAGuide()) {
          var d = null;
          d = a.reducedJSON
            ? window.formBridge.getFormState(!0, !0)
            : window.formBridge.getFormState();
          d.errors &&
            (guideBridge._guide
              .logger()
              .log(
                "Error in getting Xfa State:" +
                  JSON.stringify(d.getNextMessage()),
              ),
            alert(
              guidelib.util.GuideUtil.getLocalizedMessage(
                "AF",
                guidelib.i18n.LogMessages["AEM-AF-901-001"],
              ),
            ));
          e = d.data;
        }
        a = guideBridge._getGuideDom(a);
        d = guideBridge._getAdditionalSubmitInfo();
        guideBridge.customContextProperty(
          "fileAttachmentMap",
          JSON.stringify(this.getFileAttachmentMap()),
        );
        a = {
          guideDom: a,
          guideContext: guideBridge._guide.runtime.guideContext,
          additionalSubmitInfo: d,
        };
        0 < guideBridge._guide.allLazyChildren.length &&
          (guideBridge._guide.internal.liveDataUtils.updateLiveData(),
          (d =
            guideBridge._guide.internal.GuideDirtyMarkerAndVisitor.flattenDirtyPanelMapToCSV()),
          0 < d.length && this.afSubmissionInfo("afDraft", d),
          (a.guideLiveData =
            guideBridge._guide.internal.liveDataUtils.getLiveDataStr()),
          this._isXfaGuide() &&
            this._isValidXFAGuide() &&
            formBridge.getDataXML({ success: c }));
        b.data.guideState = a;
        e && (b.data.guideState.xfaState = e);
      }
    },
    _updateAFSubmissionInfo: function (a) {
      if (guideBridge.isGuideLoaded(!0) && !a) {
        var b = this._guideView._previousFocusItemSom,
          c = guideBridge.resolveNode(this._guideView._previousFocusItemSom);
        "guideToolbar" === f(c, "parent.className", void 0) &&
          (b = c.parent.parent.somExpression);
        this.afSubmissionInfo(
          "lastFocusItem",
          this._guideView.getSomOnNavigableAncestor(b),
        );
      }
      a = a ? a : guideBridge._guide;
      this.afSubmissionInfo("excludeFromDoR", a._getExcludeFromDorMap());
      b = {};
      a.dorType && "none" !== a.dorType && (b = a._getStateOverrideMap());
      this.afSubmissionInfo("stateOverrides", b);
      this.afSubmissionInfo("signers", a._getSigners());
    },
    getGuideState: function (a) {
      var b = [];
      guideBridge._disablePreview() || (b = this._getFileAttachmentsList());
      guideBridge._updateAFSubmissionInfo();
      !guidelib.runtime.progressive &&
        guideBridge.isGuideLoaded(!0) &&
        this.customContextProperty(
          "lastFocusItem",
          this._guideView.getSomOnNavigableAncestor(
            this._guideView._previousFocusItemSom,
          ),
        );
      a.fileUploadPath && !guideBridge._disablePreview()
        ? this._getGuideAttachments({
            options: a,
            fileAttachmentsList: b,
            fileUploadPath: a.fileUploadPath,
            callback: window.guideBridge._collectFileUrls,
            errorCallback: window.guideBridge._fileUploadFailed,
          })
        : (this._createGuideStateAndLiveXml(a),
          a.success && a.success.call(a.context, a.obj));
    },
    validate: function (a, b, e, d) {
      var f = null;
      e = c.isUndefined(e) ? !0 : e;
      var g = guidelib.util.ErrorConstants;
      f = d ? d : this._guide;
      0 < f.allLazyChildren.length &&
        f.guideLazyUtil.putDirtyToTemplateCacheIfMissing(f);
      if (b) {
        if (((f = this.resolveNode(b)), f instanceof guidelib.model.GuidePanel))
          var h = g.CONTEXT_NAVIGATION;
      } else h = g.CONTEXT_SUBMISSION;
      this.setValidationContext(h);
      b = !1;
      a || (a = []);
      b = f.validate(a);
      try {
        if (
          (this._guide._triggerOnBridge(
            "validationComplete",
            this._guide,
            b,
            "",
            a,
          ),
          !b && e)
        ) {
          var k = a[0].som;
          guideBridge._guide.on(
            guidelib.event.GuideModelEvent.LAZY_LOADED,
            function () {
              var a = guideBridge.resolveNode(k);
              a && a.validate();
            },
            {},
          );
          this.setFocus(k);
          guideBridge._guide.off(guidelib.event.GuideModelEvent.LAZY_LOADED);
        }
      } catch (z) {
        this._guide.logger().log(z);
      } finally {
        return this.unsetValidationContext(h), b;
      }
    },
    restoreGuideState: function (a) {
      var b;
      a && a.dataRef
        ? (b = { dataRef: a.dataRef })
        : a &&
          a.guideStatePathRef &&
          (b = { guideStatePathRef: a.guideStatePathRef });
      if (b) {
        var e = window.guideBridge.getGuidePath();
        d.ajax({
          url: e + ".guidejson",
          type: "GET",
          async: !1,
          cache: !1,
          data: b,
          success: function (b) {
            b.guideState &&
              b.guideState.guideContext &&
              b.guideState.guideContext.customPropertyMap &&
              b.guideState.guideContext.customPropertyMap.sections &&
              0 < b.guideState.guideContext.customPropertyMap.sections.length &&
              (window.guideBridge.customContextProperty.sections =
                b.guideState.guideContext.customPropertyMap.sections);
            window.guideBridge.restoreGuideState(
              c.extend({}, a, {
                guideState: b.guideState,
                dataRef: void 0,
                guideStatePathRef: void 0,
              }),
            );
            guidelib.runtime.progressive &&
              (guidelib.runtime.progressive._initializeSectionModelAndPlayJson(
                window.guideBridge.customContextProperty.sections,
              ),
              guidelib.runtime.progressive.renderLastSection());
          },
          error: function (a) {
            window.guideBridge._guide.logger().log("Error: " + a);
          },
        });
      } else
        (guidelib.__runtime__.guideContext =
          guidelib.__runtime__.guideContext || {}),
          guideBridge.isGuideLoaded() &&
            (guideBridge._guide.runtime.guideContext =
              guideBridge._guide.runtime.guideContext || {}),
          (b = f(a, "guideState.guideContext", void 0)),
          c.isUndefined(a.guideState.guideContext) ||
            (c.extend(
              b.customPropertyMap,
              guidelib.__runtime__.guideContext.customPropertyMap,
            ),
            guideBridge.isGuideLoaded() &&
              c.extend(
                b.customPropertyMap,
                guideBridge._guide.runtime.guideContext.customPropertyMap,
              )),
          guideBridge.isGuideLoaded() &&
            c.extend(guideBridge._guide.runtime.guideContext, b),
          this._guide
            ? (this._playGuideJson(a),
              this._guideView &&
                this._guide._triggerEvent(
                  guidelib.event.GuideModelEvent.MODEL_REFRESH,
                  "jsonModel",
                  null,
                  null,
                ))
            : ((this.storage = {}),
              (this.storage.guideState = a.guideState),
              (this.storage.error = a.error),
              (this.storage.success = a.success),
              (this.storage.context = a.context));
    },
    setData: function (a) {
      guideBridge.restoreGuideState(a);
    },
    _getStorage: function () {
      var a = null;
      this.storage && ((a = this.storage), (this.storage = null));
      return a;
    },
    getGuideContext: function () {
      var a = new k();
      a.data = jQuery.extend(
        !0,
        {},
        this._guide ? this._guide.runtime.guideContext : null,
      );
      return a;
    },
    _getContextRoot: function () {
      return this.userConfig.contextPath;
    },
    _getEnableFocusOnFirstField: function () {
      var a = this.userConfig.renderConfig || {};
      a = void 0 === a.enableFocusOnFirstField ? !0 : a.enableFocusOnFirstField;
      return "true" === a || ("false" === a ? !1 : a);
    },
    _updateAjaxUrl: function (a) {
      "server" === this.hostName &&
        d.ajaxPrefilter(function (b, c, e) {
          c = b.url;
          0 !== c.lastIndexOf("http://", 0) &&
            0 !== c.lastIndexOf("https://", 0) &&
            ((c = 0 === c.indexOf("/") ? a + c : a + "/" + c), (b.url = c));
        });
    },
    _getUrl: function (a) {
      var b = this.userConfig.baseUrl,
        c = this.userConfig.contextPath;
      return b
        ? b + a
        : !c ||
            "/" === c ||
            0 === a.indexOf(c) ||
            (0 !== a.length && 0 !== a.indexOf("/"))
          ? a
          : c + a;
    },
    _getGuidePathUrl: function (a, b) {
      b = b || this.getGuidePath();
      return this._getUrl(b + (a || ""));
    },
    getGuidePath: function () {
      var a = this.getGuideContext().data;
      return a && a.hasOwnProperty("guidePath") ? a.guidePath : null;
    },
    resolveNode: function (a) {
      return this._guide.resolveNode(a);
    },
    _resolveId: function (a) {
      return this._guide._modelTemplateCacheStore.getModel(a);
    },
    reset: function () {
      window.xfalib &&
        window.xfalib.runtime &&
        window.xfalib.runtime.xfa &&
        window.xfalib.runtime.xfa.host.resetData();
      this._guide.resetData();
      this._guide.internal.liveDataUtils.isLiveDataInitialized() &&
        this._guide.internal.liveDataUtils.updateLiveData();
      this._guide.internal.GuideDirtyMarkerAndVisitor.visitMap =
        guidelib.model.util.CommonUtils.createMap(
          this._guide.allLazyChildren,
          0,
        );
    },
    _getPreviousFocus: function () {
      return this._guideView._previousFocusItemSom;
    },
    getFocus: function (a) {
      if (c.isUndefined(a)) return this._guideView.currentFocusItemSom;
      if ("navigablePanel" === (a = f(a, "focusOption", null)))
        return this._guideView._lastFocussedPanelForNonActionFields;
      this._guide.logger().log("Invalid Focus option.", a);
    },
    setFocus: function (a, b, e) {
      a = c.isObject(a)
        ? a
        : { somExpression: a, focusOption: b, runCompletionScript: e };
      try {
        var d = this._guideView.skipFieldFocus;
        var f = !this._guide.enableFocusOnFirstField;
        f || (f = !guideBridge._getEnableFocusOnFirstField());
        this._guideView.skipFieldFocus = a.somExpression ? a.skipFieldFocus : f;
        var g = this._guideView.setFocus(a);
      } finally {
        this._guideView.skipFieldFocus = d;
      }
      this._guide._currentContext || this._guide.runPendingExpressions();
      return g;
    },
    loadLazyFragment: function (a) {
      if (
        !c.isUndefined(a) &&
        (a = guidelib.util.GuideUtil.relativeSom(
          this._guide.rootPanel.somExpression,
          a,
        ))
      ) {
        a = a.split(".");
        var b = this._guide.rootPanel;
        c.each(
          a,
          function (a) {
            null != b &&
              ((a = b._findChildren(a, !1)),
              0 < a.length
                ? ((a = a[0]) &&
                    a._lazyReference &&
                    !a._itemsLoaded &&
                    (this._guide.internal.liveDataUtils.updateLiveData(),
                    a._loadLazyFragment()),
                  (b = a))
                : (b = null));
          },
          this,
        );
      }
    },
    getSignedDocDownloadLink: function () {
      var a = "";
      c.isUndefined(FD) ||
        c.isUndefined(FD.AFaddon) ||
        c.isUndefined(FD.AFaddon.Signing) ||
        c.isUndefined(FD.AFaddon.Signing.signedDocDownloadLink) ||
        (a = FD.AFaddon.Signing.signedDocDownloadLink);
      return a;
    },
    isGuideLoaded: function (a) {
      return a
        ? !c.isEmpty(window.guideBridge._guide && window.guideBridge._guideView)
        : !c.isEmpty(window.guideBridge._guide);
    },
    _doInternalSubmit: function (a) {
      if (a.excludeFormState) {
        var b = a.guideState.data.guideState.guideContext.afSubmissionInfo;
        b && b.hasOwnProperty("lastFocusItem") && (b.lastFocusItem = void 0);
      }
      b = JSON.parse(JSON.stringify(a.guideState));
      c.isEmpty(b.data.guideState.additionalSubmitInfo) ||
        (b.data.guideState.additionalSubmitInfo = {});
      var e = this.getMultipartData({
        guideState: JSON.stringify(b.data),
        dorData: a.dorData || !1,
        _charset_: "UTF-8",
      });
      d.ajax({
        url: this._getGuidePathUrl(
          ".af.internalsubmit.jsp",
          b && b.data ? b.data.guideState.guideContext.guidePath : null,
        ),
        type: "POST",
        async: a.async || !1,
        contentType:
          "multipart/form-data; charset\x3dUTF-8; boundary\x3d" + e[0],
        data: e[1],
        success: a.success,
        error: a.error,
      });
    },
    _submitInternal: function (a) {
      var b = this;
      a = a || {};
      a.guideState
        ? this._doInternalSubmit({
            guideState: a.guideState,
            success: a.success,
            error: a.error,
            async: a.async,
            excludeFormState: a.excludeFormState,
            dorData: a.dorData,
          })
        : this.getGuideState({
            diff: "diff",
            fileUploadPath: a.fileUploadPath,
            success: function (c) {
              b._doInternalSubmit({
                guideState: c,
                success: a.success,
                error: a.error,
                async: a.async,
                excludeFormState: a.excludeFormState,
                dorData: a.dorData,
              });
            },
            error: a.error,
            reducedJSON: !0,
          });
    },
    getMultipartData: function (a) {
      var b = this.randomString(),
        e = "--" + b,
        d = "",
        f;
      for (f in a)
        if (a.hasOwnProperty(f)) {
          var g = c.isObject(a[f]) ? JSON.stringify(a[f]) : a[f];
          d +=
            e +
            '\r\nContent-Disposition: form-data; name\x3d"' +
            f +
            '"\r\n\r\n' +
            g +
            "\r\n";
        }
      return [b, d + (e + "--\r\n")];
    },
    randomString: function () {
      for (var a = "", b = 0; 8 > b; b++) {
        var c = Math.floor(61 * Math.random());
        a +=
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".substring(
            c,
            c + 1,
          );
      }
      return a;
    },
    getFileAttachmentMap: function () {
      for (
        var a = {}, b = window.guideBridge._getFileAttachmentsList(), e = 0;
        e < b.length;
        e++
      ) {
        var d = b[e];
        c.isEmpty(d.fileAttachment.value) ||
          (a[d.somExpression] = d.fileAttachment.value);
      }
      b = this._guide.internal.liveDataUtils._getLazyAttachmentMap();
      c.each(b, function (b, c) {
        a[c] = b.value;
      });
      return a;
    },
    putFileAttachmentMap: function (a) {
      c.each(a, function (a, b) {
        guideBridge.resolveNode(b).fileAttachment.value = a;
      });
    },
    _appendFileAttachmentsToFormData: function (a, b, e) {
      var f = b.fileDom;
      b = b.fileName;
      var g = {};
      var h = [],
        k = guidelib.util.GuideUtil._isIOS(),
        l = function (a, b) {
          for (var c = "", e = 0; e < a.length; ++e) c += b + " " + a[e] + "\n";
          return "\n" + c;
        },
        q = function (a) {
          if (a && 0 < a.length)
            throw guidelib.util.GuideUtil.getLocalizedMessage(
              "AF",
              guidelib.i18n.LogMessages["AEM-AF-901-024"],
              [l(a, "\u2022")],
            );
        };
      for (g = 0; g < b.length; g++)
        for (var m = b[g].split("\n"), p = 0; p < m.length; p++)
          f[g] && !c.isString(f[g]) && 0 < f[g].length
            ? a.append(m[p], f[g][0].files[p])
            : m[p] &&
              a.append(
                "_guideFileAttachment." +
                  guideBridge._getRelativeFilePath(m[p]),
                f[g],
              );
      a.append("_guideAttachments", b.toString());
      if (k) {
        var t = [];
        c.each(e, function (a, b) {
          (a = a._fileAttachmentWrapperIOS) && t.push.apply(t, a);
        });
        g = Promise.allSettled(t).then(function (b) {
          for (var c = 0; c < b.length; c++)
            if ("rejected" === b[c].status) h.push(b[c].reason);
            else {
              var e = b[c].value;
              a.append(
                e.formElementName + "/" + e.name,
                e.dataURLtoBlob(),
                e.name,
              );
            }
          q(h);
          return a;
        });
      } else {
        e = [];
        for (g = 0; g < b.length; g++)
          for (m = b[g].split("\n"), p = 0; p < m.length; p++)
            f[g] &&
              !c.isString(f[g]) &&
              0 < f[g].length &&
              (window.Promise
                ? ((k = guidelib.util.GuideUtil._checkIfFileIsAccessible(
                    m[p],
                    f[g][0].files[p],
                  )),
                  e.push(k))
                : a.append(m[p], f[g][0].files[p]));
        g = window.Promise
          ? Promise.allSettled(e).then(function (b) {
              for (var c = 0; c < b.length; c++)
                if ("rejected" === b[c].status) h.push(b[c].reason);
                else {
                  var e = b[c].value;
                  a.append(e.fileName, e.file);
                }
              q(h);
              return a;
            })
          : d.Deferred().resolve(a);
      }
      return g;
    },
    doAjaxSubmitWithFileAttachment: function (a, b, c, e) {
      var f = c || {},
        g = this,
        h = new FormData();
      c = this._juiceOutNameAndFileDomMap(e);
      var k = function () {
        d.ajax({
          url: a,
          type: "POST",
          processData: !1,
          cache: !1,
          contentType: !1,
          dataType: "json",
          data: h,
          success: function (a) {
            g.doAjaxSubmitSuccess(a, f);
          },
          error: function (a) {
            g.doAjaxSubmitError(a, f);
          },
        });
      };
      this._appendFileAttachmentsToFormData(h, c, e)
        .then(function (a) {
          d.each(b, function (b, c) {
            "object" == typeof c && (c = JSON.stringify(c));
            a.append(b, c);
          });
          k();
        })
        .catch(function (a) {
          console.error("Error while reading file bytes in IOS");
          g.doAjaxSubmitError(data, f);
        });
    },
    doAjaxSubmit: function (a, b, c) {
      var e = c || {},
        f = this;
      c = !1 !== e.async;
      b = this.getMultipartData(b);
      d.ajax({
        url: a,
        type: "POST",
        traditional: !0,
        async: c,
        contentType:
          "multipart/form-data; charset\x3dUTF-8; boundary\x3d" + b[0],
        data: b[1],
        success: function (a) {
          f.doAjaxSubmitSuccess(a, e);
        },
        error: function (a) {
          f.doAjaxSubmitError(a, e);
        },
      });
    },
    KEY_AF_SUCCESS_PAYLOAD: "afSuccessPayload",
    doAjaxSubmitSuccess: function (a, b) {
      var e = new k();
      e.data = a;
      e.completed = !0;
      guideBridge._showGuideLoading(!1);
      if (c.isFunction(b.success)) b.success.call(b.context, e);
      else if (a.hasOwnProperty("signingURL"))
        window.location.href = a.signingURL;
      else {
        b = {};
        if (a.hasOwnProperty(guideBridge.KEY_AF_SUCCESS_PAYLOAD))
          try {
            b = JSON.parse(a[guideBridge.KEY_AF_SUCCESS_PAYLOAD]);
            b.data = this._guide.internal.afdata;
            var d = this._guide.runtime.guideContext.schemaType;
            d || (d = "xmlschema");
            b.contentType = d;
          } catch (w) {
            guideBridge._guide
              .logger()
              .log("Error while parsing AF Success Payload: " + w);
          }
        guideBridge._guide.executeExpression("submitSuccess", b);
      }
    },
    doAjaxSubmitError: function (a, b) {
      var e = new k();
      e.data = a;
      e.completed = !1;
      e.addMessage(2, "Error in Async Submit", "");
      guideBridge._showGuideLoading(!1);
      if (c.isFunction(b.error)) b.error.call(b.context, e);
      else {
        b = {};
        try {
          b = JSON.parse(a.responseText);
        } catch (u) {
          guideBridge._guide
            .logger()
            .log("Error while parsing errorPayload." + u);
        }
        guideBridge._guide.executeExpression("submitError", b);
      }
    },
    handleUpload: function () {
      self = this.self;
      this.submitData._guideAttachments = this.attachments.toString();
      c.each(
        this.attachments,
        function (a) {
          this.submitData["_guideFileAttachment." + a] =
            this.submitData.fileUrl + "/" + a;
        },
        this,
      );
      delete this.submitData.fileUrl;
      self.doAjaxSubmit(this.actionUrl, this.submitData, this.options);
    },
    _handleSubmitError: function (a, b) {
      if (b) alert(b);
      else
        switch (Number(a.status)) {
          case 502:
            alert(
              guidelib.util.GuideUtil.getLocalizedMessage(
                "AF",
                guidelib.i18n.LogMessages["AEM-AF-901-003"],
              ),
            );
            break;
          default:
            alert(
              guidelib.util.GuideUtil.getLocalizedMessage(
                "AF",
                guidelib.i18n.LogMessages["AEM-AF-901-004"],
              ),
            );
        }
      guideBridge._showGuideLoading(!1);
    },
    updateSubmitData: function (a, b, e) {
      var d = 0,
        f = [],
        g;
      0 === e.length && 0 < a.length && !guideBridge._disablePreview()
        ? (c.each(
            a,
            function (a, e) {
              var h = window.guideBridge._resolveId(a);
              if ((a = h.fileAttachment.value))
                (a = a.split("\n")),
                  c.each(
                    a,
                    function (a, c) {
                      if (
                        (g = h.name + "/" + a.substring(a.lastIndexOf("/") + 1))
                      )
                        (f[d++] = g), (b["_guideFileAttachment." + g] = a);
                    },
                    this,
                  );
            },
            this,
          ),
          (b._guideAttachments = f))
        : 0 < e.length &&
          (c.each(
            e,
            function (a, c) {
              g = guideBridge._getRelativeFilePath(a);
              f[d++] = g;
              b["_guideFileAttachment." + g] = a;
            },
            this,
          ),
          (b._guideAttachments = f));
    },
    _collectFileUrls: function (a) {
      var b = [];
      c.each(
        this.attachments,
        function (a) {
          c.each(
            a.split("\n"),
            function (a) {
              c.isString(a) && 1 < a.match(/\//g).length
                ? b.push(a)
                : b.push(this.fileUrl + "/" + a);
            },
            this,
          );
        },
        this,
      );
      a = {
        fileUrlList: b,
        fileUploadModelsList: this.fileAttachmentsList,
        lazyAttachmentMap:
          guideBridge._guide.internal.liveDataUtils._getLazyAttachmentMap(),
      };
      guidelib.util.GuideUtil._updateFileModelsAndLazyMap(a);
      (a = this.options.ajaxSubmitObject) && a.ajaxSubmitDataHandler
        ? (a.ajaxSubmitDataHandler.call(
            this.options.context,
            a.fileAttachmentsList,
            a.submitData,
            b,
          ),
          window.guideBridge.doAjaxSubmit(
            a.actionUrl,
            a.submitData,
            this.options,
          ))
        : this.options.success &&
          (guideBridge._createGuideStateAndLiveXml(this.options),
          this.options.success.call(this.options.context, this.options.obj));
    },
    _fileUploadFailed: function (a) {
      d.proxy(guideBridge._handleSubmitError({ status: "500" }), guideBridge);
    },
    _getFormName: function (a) {
      var b = "";
      a &&
        ((b = a.indexOf("/jcr:content/guideContainer")),
        (a = a.substring(0, b)),
        (b = a.substring(a.lastIndexOf("/") + 1)));
      return b;
    },
    _getUUIDForAjaxSubmit: function () {
      var a = Math.floor(1e4 * Math.random() + 1),
        b = new Date().getTime(),
        c = window.guideBridge.getGuidePath();
      this._formInstanceUUID = window.guideBridge._getFormName(c) + b + a;
      return m(this._formInstanceUUID) ? this._formInstanceUUID : null;
    },
    _getFormForSubmission: function () {
      var a =
        (this.userConfig.submitConfig || {}).form ||
        d(
          "\x3cform method\x3d'post' enctype\x3d'multipart/form-data'\x3e\x3c/form\x3e",
        ).appendTo(d("body"));
      return d(a);
    },
    _getThankYouPageFromConfig: function () {
      return (this.userConfig.submitConfig || {}).thankyouPage;
    },
    _prepareGuideValueMap: function () {
      var a = {},
        b = {};
      this.visit(function (e) {
        if (!e.bindRef && !b[e.somExpression])
          if (e instanceof guidelib.model.Field && e.value)
            (b[e.somExpression] = !0), (a[e.getAttribute("name")] = e.value);
          else if (e instanceof guidelib.model.GuideCompositeField) {
            var d = (a[e.getAttribute("name")] = {});
            c.each(
              e.items,
              function (a, c) {
                b[a.somExpression] = !0;
                a.value && (d[a.getAttribute("name")] = a.value);
              },
              this,
            );
          }
      });
      return a;
    },
    _showGuideLoading: function (a, b) {
      !a && e && ((e.enabled = !0), (e = null));
      var c = guidelib.util.GuideUtil;
      c &&
        (c.showGuideLoading(a),
        void 0 !== b ? c.showMessages(b) : c.removeAllMessages());
    },
    _submitAfterValidation: function (a, b, c) {
      var e = this;
      if (guidelib.util.GuideUtil) {
        var d = guidelib.i18n.strings.submittingForm;
        a &&
          "agreement" === a.submissionSelector &&
          (d = guidelib.i18n.strings.generatingSignAgreement);
        guidelib.util.GuideUtil.showMessages(d);
      }
      guideBridge.isGuideLoaded() &&
        e._guide._triggerOnBridge &&
        e._guide._triggerOnBridge("submitStart", "", "", "", "");
      d = !0;
      a && a.hasOwnProperty("excludeFormState") && (d = a.excludeFormState);
      try {
        var g = f(a, "guideState", null);
        if (g || guideBridge.isGuideLoaded()) {
          var h = f(a, "twoStepSubmission", !0);
          g || e._guide.xdpRef || h
            ? e._submitInternal({
                guideState: g,
                success: function () {
                  try {
                    b.apply(e, arguments);
                  } catch (y) {
                    e._handleInternalSubmitError(c, e, arguments);
                  }
                },
                error: function () {
                  e._handleInternalSubmitError(c, e, arguments);
                },
                async: !0,
                excludeFormState: d,
              })
            : e.getFormDataString({
                success: function () {
                  try {
                    b.apply(e, arguments);
                  } catch (y) {
                    e._handleInternalSubmitError(c, e, arguments);
                  }
                },
              });
        } else
          console.error(
            "Form Submission failed as the form doesn't exist on the page",
          );
      } catch (y) {
        e._showGuideLoading(!1), console && console.error && console.error(y);
      }
    },
    submit: function (a) {
      function b(b) {
        a && a.error
          ? a.error.call(a.context || this, b)
          : d.proxy(guideBridge._handleSubmitError(b), guideBridge);
      }
      function g(b) {
        var e = !1;
        a && (e = a.success ? !0 : !1);
        a = a || {};
        a.success =
          a.success || (k.userConfig.submitConfig || {}).submitSuccessHandler;
        e =
          e ||
          (k.userConfig.submitConfig || { useAjax: !1 }).useAjax ||
          guideBridge._guide.enableAsyncSubmission;
        var g = {};
        if (this.isGuideLoaded()) {
          var h = [];
          this.visit(function (a) {
            "guideCaptcha" === a.className && h.push(a);
          });
          var l = h[0];
          l &&
            ((l = window.guideBridge._getCaptchaData(l)), (g.captchaData = l));
        }
        var m =
            f(a, "guideState.data.guideState.guideContext.guidePath", "") ||
            window.guideBridge.getGuidePath(),
          p = this.userConfig.submitConfig
            ? this.userConfig.submitConfig.aemFormComponentPath
            : "";
        l = window.guideBridge._getGuidePathUrl(
          ".af." + (a.submissionSelector || "submit") + ".jsp",
          m,
        );
        g.guideContainerPath = m;
        g.aemFormComponentPath = p;
        g._asyncSubmit = e;
        g._charset_ = "UTF-8";
        m = q.customPropertyMap || {};
        p = ["lastFocusItem"];
        for (var t in m)
          m.hasOwnProperty(t) && 0 > p.indexOf(t) && (g[t] = m[t]);
        this.isGuideLoaded() &&
          (g.afSubmissionInfo =
            this._guide.runtime.guideContext.afSubmissionInfo || {});
        var r;
        t = [];
        m = 0;
        p = b.hasOwnProperty("guideValue")
          ? b.guideValue
          : c.isUndefined(a.guideValueMap)
            ? window.guideBridge._prepareGuideValueMap()
            : a.guideValueMap;
        b.hasOwnProperty("data") && (r = b.data);
        b.hasOwnProperty("fileAttachmentsList");
        for (var v in p) p.hasOwnProperty(v) && (g[v] = p[v]);
        r &&
          ((g["jcr:data"] = r),
          (g["jcr:data@TypeHint"] = "Binary"),
          k.isGuideLoaded() && (k._guide.internal.afdata = r));
        c.isUndefined(a.fileAttachmentMap)
          ? (g.fileAttachmentMap = JSON.stringify(
              guideBridge._getFileAttachmentMapForSubmit(),
            ))
          : (g.fileAttachmentMap = a.fileAttachmentMap);
        b = {};
        b =
          a.guideState && a.guideState.data.guideState.additionalSubmitInfo
            ? a.guideState.data.guideState.additionalSubmitInfo
            : guideBridge._getAdditionalSubmitInfo();
        d.extend(!0, g, b);
        if (e && !0 === e)
          if (a.fileAttachmentMap) {
            var u = JSON.parse(a.fileAttachmentMap);
            e = c.keys(u);
            for (b = 0; b < e.length; b++)
              if (u[e[b]])
                for (r = u[e[b]].split("\n"), v = 0; v < r.length; v++)
                  (p = guideBridge._getRelativeFilePath(r[v])),
                    (t[m++] = p),
                    (g["_guideFileAttachment." + p] = r[v]);
            g._guideAttachments = t;
            k.doAjaxSubmit(l, g, a);
          } else {
            u = [];
            var w = 0;
            guideBridge.isGuideLoaded() &&
              (u = window.guideBridge._getFileAttachmentsList());
            c.each(u, function (a) {
              a.fileAttachment.value && w++;
            });
            0 < w
              ? k.doAjaxSubmitWithFileAttachment(l, g, a, u)
              : k.doAjaxSubmit(l, g, a);
          }
        else {
          var x = k._getFormForSubmission();
          x.attr("action", l);
          x.attr("data-name", "afSubmissionForm");
          for (u in g)
            g.hasOwnProperty(u) &&
              ((l = g[u]),
              d("\x3cinput\x3e")
                .attr("type", "hidden")
                .attr("name", u)
                .val(c.isObject(l) ? JSON.stringify(l) : l)
                .appendTo(x));
          g = guideBridge._getFileNameFileDomMap();
          var A = [],
            y = "";
          g &&
            g.fileDom &&
            ((A = g.fileName),
            c.each(g.fileDom, function (a, b) {
              c.isString(a)
                ? A[b] &&
                  ((b = guideBridge._getRelativeFilePath(A[b])),
                  d("\x3cinput\x3e")
                    .attr("type", "hidden")
                    .attr("name", "_guideFileAttachment." + b)
                    .attr("value", a)
                    .appendTo(x),
                  (y += b + ","))
                : (a
                    .attr("name", A[b].split["\n"])
                    .attr("class", "hidden")
                    .appendTo(x),
                  (y += A[b] + ","));
            }));
          d("\x3cinput\x3e")
            .attr("type", "hidden")
            .attr("name", "_guideAttachments")
            .attr("value", y)
            .appendTo(x);
          x.submit();
        }
      }
      if (this._guideView) {
        var h = guideBridge.getFocus();
        h && ((e = guideBridge.resolveNode(h)), (e.enabled = !1));
      }
      (l = window.guideBridge.getAutoSaveEnabledStatus()) &&
        window.guideBridge.setEnabledAutoSave(!1);
      var k = this;
      h = f(this._guide, "runtime.guideContext", {});
      if (f(a, "guideState", ""))
        var m = a.guideState.data.guideState.guideContext;
      var q = m || h;
      d(".guideContainerFormSubmitButton").click();
      window.guideBridge._populateBindRefToSomMap();
      k._showGuideLoading(!0, guidelib.i18n.strings.validatingForm);
      setTimeout(function () {
        guideBridge.isGuideLoaded() &&
          guideBridge._guide.allLazyChildren &&
          0 < guideBridge._guide.allLazyChildren.length &&
          k._guide.internal.liveDataUtils.updateLiveData();
        var c = !1;
        try {
          c = k._performConditionalValidation(a);
        } catch (z) {
          c = !1;
        } finally {
          k._showGuideLoading(!0);
        }
        c
          ? ((c = d("#recaptchaInvisible")),
            void 0 != c && "" == c.attr("af-recaptcha-execute")
              ? c.trigger({
                  type: "recaptchaExecution",
                  submitParameters: { options: a, success: g, error: b },
                  triggerPostSubmission: !0,
                })
              : guideBridge._submitAfterValidation(a, g, b))
          : (window.guideBridge.setEnabledAutoSave(l), k._showGuideLoading(!1));
      }, 1);
    },
    _handleInternalSubmitError: function (a, b, c) {
      try {
        a.apply(b, c);
      } catch (u) {
      } finally {
        guideBridge._showGuideLoading(!1);
      }
    },
    _getFileAttachmentMapForSubmit: function () {
      for (
        var a = {}, b = window.guideBridge._getFileAttachmentsList(), e = 0;
        e < b.length;
        e++
      ) {
        var d = b[e];
        if (!c.isUndefined(d.value) && 0 < d.value.length) {
          for (var f = d.value.split("\n"), g = 0; g < f.length; g++)
            f[g] = d.name + "/" + f[g];
          a[d.somExpression] = f.join("\n");
        }
      }
      b = this._guide.internal.liveDataUtils._getLazyAttachmentMap();
      c.each(b, function (b, c) {
        b = b.value.split("\n");
        for (var e = 0; e < b.length; e++)
          b[e] =
            guidelib.util.GuideUtil.guideSomToComponentName(c) + "/" + b[e];
        a[c] = b.join("\n");
      });
      return a;
    },
    ERROR_CAUSED_BY: {
      CAPTCHA_VALIDATION: "CAPTCHA_VALIDATION",
      SERVER_SIDE_VALIDATION: "SERVER_SIDE_VALIDATION",
      FORM_SUBMISSION: "FORM_SUBMISSION",
      AGREEMENT_CREATION: "AGREEMENT_CREATION",
    },
    handleServerValidationError: function (a) {
      var b = this;
      if (a && (a = a.errors) && 0 < a.length) {
        var e;
        c.each(a, function (a, c) {
          c = a.errorMessages ? a.errorMessages.join("\n") : a.errorMessage;
          a = a.somExpression
            ? a.somExpression
            : b._guide._bindRefMap[a.bindRef];
          var d = b.resolveNode(a);
          d && (e || (e = a), d.markAsInvalid(c));
        });
        e && b.setFocus(e);
      }
    },
    _handleServerValidationError: function (a) {
      var b = this;
      window.guideBridge.setEnabledAutoSave(l);
      if (a)
        if (
          a.errorCausedBy &&
          a.errorCausedBy === this.ERROR_CAUSED_BY.CAPTCHA_VALIDATION
        ) {
          a = a.errors;
          var e = a[0].somExpression;
          c.each(a, function (a, c) {
            c = a.somExpression;
            a = a.errorMessage;
            b.setFocus(c);
            (c = b.resolveNode(c)) && c.showCaptchaError(a);
          });
          b.setFocus(e);
        } else
          (a.errorCausedBy &&
            a.errorCausedBy === this.ERROR_CAUSED_BY.FORM_SUBMISSION) ||
          a.errorCausedBy === this.ERROR_CAUSED_BY.AGREEMENT_CREATION
            ? a.errors && 0 < a.errors.length
              ? window.guideBridge.handleServerValidationError(a)
              : ((e = a.originCode ? Number(a.originCode) : 500),
                d.proxy(
                  guideBridge._handleSubmitError(
                    { status: e },
                    400 === e ? (a.errorMessage ? a.errorMessage : "") : "",
                  ),
                  guideBridge,
                ))
            : window.guideBridge.handleServerValidationError(a);
    },
    _populateBindRefToSomMap: function (a) {
      var b = function (a, c, e) {
          var d;
          a.bindRef &&
            ((e = a.repeatable
              ? (d = e
                  ? e + "/" + a.bindRef.split("/").slice(-1)[0] + "/" + a.index
                  : a.bindRef + "/" + a.index)
              : e
                ? (d = e + "/" + a.bindRef.split("/").slice(-1)[0])
                : a.bindRef),
            (c[e] = a.somExpression));
          a._children &&
            a._children.forEach(function (a) {
              b(a, c, d);
            });
        },
        c;
      a &&
        a.parent &&
        a.parent.repeatable &&
        a.parent.bindRef &&
        (c = a.parent.bindRef + "/" + a.parent.index);
      a || (a = window.guideBridge._guide);
      window.guideBridge.isGuideLoaded() &&
        (window.guideBridge._guide._bindRefMap ||
          (window.guideBridge._guide._bindRefMap = {}),
        b(a, window.guideBridge._guide._bindRefMap, c));
    },
    SELECTOR_FORM_CONTAINER: "#guideContainerForm",
    THANK_YOU_OPTION: { PAGE: "page", MESSAGE: "message" },
    _defaultSubmitSuccessHandler: function (a) {
      a &&
        (a.thankYouOption === this.THANK_YOU_OPTION.MESSAGE
          ? d(this.SELECTOR_FORM_CONTAINER).replaceWith(
              "\x3cdiv class\x3d'tyMessage'\x3e" +
                a.thankYouContent +
                "\x3c/div\x3e",
            )
          : a.thankYouOption === this.THANK_YOU_OPTION.PAGE &&
            (window.location.href = a.thankYouContent));
    },
    _getRelativeFilePath: function (a) {
      var b = a;
      -1 !== a.indexOf("/") &&
        ((a = a.split("/")),
        2 < a.length && (b = a[a.length - 2] + "/" + a[a.length - 1]));
      return b;
    },
    _performConditionalValidation: function (a) {
      return f(a, "validate", !0)
        ? guideBridge.validate(null, null, !0, !1)
        : !0;
    },
    loadAdaptiveForm: function (a) {
      if (a && a.path) {
        var b = a.path.replace(
          "/content/dam/formsanddocuments/",
          "/content/forms/af/",
        );
        d.ajax({
          url: b + "/jcr:content/guideContainer.html",
          type: "GET",
          data: { wcmmode: "disabled", dataRef: a.dataRef },
          async: !1,
          success: function (b) {
            a.containerSelector && d(a.containerSelector).html(b);
            var e = new k();
            e.data = b;
            e.completed = !0;
            a.success &&
              c.isFunction(a.success) &&
              a.success.call(a.context, e);
          },
          error: function (b) {
            var e = new k();
            e.data = b;
            e.completed = !1;
            e.addMessage(
              2,
              "Error in getting HTML of Adaptive Form: " + a.path,
              "",
            );
            a.error && c.isFunction(a.error) && a.error.call(a.context, e);
          },
        });
      } else
        "undefined" !== typeof console &&
          console.log(
            "Path of Adaptive Form not specified to loadAdaptiveForm API",
          );
    },
    unloadAdaptiveForm: function (a) {
      window.guidelib &&
        window.guidelib.intervals &&
        window.clearInterval(window.guidelib.intervals.intId);
      d(a).children().remove();
      d("body").find(".datePickerTarget").remove();
      d(window).off("guideModelInitialized");
      d(window).off("guideInitialized");
      d(window).off("guideInitializationError");
      d(window).off("load scroll resize");
      d(window).off("keydown.guides");
      d(".guideContainerWrapperNode").off("swiperight");
      d(".guideContainerWrapperNode").off("swipeleft");
      d(document).off("click.guidetab.data-api");
      d(document).off("click.guideAddRemove.data-api");
      d(window).off("touchstart.datetimepicker mousedown.datetimepicker");
      window.guidelib &&
        ((window.guidelib.runtime = {
          guide: null,
          af: null,
          guideContext: null,
          _private: {},
          errorManager: null,
        }),
        (window.guidelib.internal = {
          liveModel: null,
          liveDataUtils: null,
          GuideDirtyMarkerAndVisitor: null,
        }));
      window.guideBridge &&
        ((window.guideBridge._guide = null),
        (window.guideBridge._guideView = null),
        (window.guideBridge._$target = null),
        (window.guideBridge._guideDoc = null));
      window.xfalib && (window.xfalib.ut = null);
      window.formBridge && window.formBridge.destroyForm();
      window.jQuery && (window.jQuery.fragments = {});
      window.guidelib &&
        window.guidelib.model &&
        (window.guidelib.model.GuideNode.guideUtil = null);
      c.each(window.guidelib, function (a, b) {
        window.guidelib[b] = void 0;
      });
      d &&
        ((d.xfaWidget = void 0),
        (d.prototype.abstractWidget = void 0),
        (d.prototype.adobeDateTimePicker = void 0),
        (d.prototype.adobeFileAttachment = void 0),
        (d.prototype.adobeFileUploader = void 0),
        (d.prototype.dateTimeEdit = void 0),
        (d.prototype.dropDownList = void 0),
        (d.prototype.defaultWidget = void 0),
        (d.prototype.fileUpload = void 0),
        (d.prototype.imageField = void 0),
        (d.prototype.listBox = void 0),
        (d.prototype.nwkListBox = void 0),
        (d.prototype.numericInput = void 0),
        (d.prototype.signatureField = void 0),
        (d.prototype.ScribbleImageField = void 0),
        (d.prototype.textField = void 0),
        (d.prototype.xfaButton = void 0),
        (d.prototype.XfaCheckBox = void 0));
    },
    _disableForm: function () {
      var a = guideBridge.resolveNode("guide[0].guide1[0].guideRootPanel[0]"),
        b = guideBridge.resolveNode("guide[0].guide1[0].toolbar[0]");
      a.disableAllFields();
      b && b.disableAllFields();
    },
    disableForm: function () {
      guideBridge._disableForm();
      guideBridge.on("elementLazyLoaded", guideBridge._disableForm);
    },
    _playGuideJson: function (a) {
      this._guide.setGuideState(
        guidelib.model.GuideSchema.prototype.GuideStateConstants
          .GUIDE_STATE_MERGE_PROGRESS,
      );
      if (
        this._isXfaGuide() &&
        a.guideState.xfaState &&
        a.guideState.xfaState.xfaDom
      ) {
        var b = this;
        window.formBridge.restoreFormState({
          formState: a.guideState.xfaState,
          context: this,
          error: a.error || p,
          success: function () {
            b._playNonXfaJson(a);
          },
        });
      } else this._playNonXfaJson(a);
    },
    _playNonXfaJson: function (a) {
      var b =
          f(a, "guideState.guideLiveData", null) ||
          f(a, "guideState.guidePrefillXml", null),
        e =
          f(a, "guideState.xfaState.currentContext.data", null) ||
          JSON.parse(f(a, "guideState.xfaState.xfaRenderContext", "{}")).data,
        d = f(a, "guideState.guidePrefillJson", null);
      b || e
        ? (this._guide.internal.liveDataUtils.initLiveData(
            b,
            e,
            c.isString(this._guide.xdpRef),
            c.isString(this._guide.xsdRef),
            this._guide.getAttribute("xsdRootElement"),
          ),
          this._guide.internal.liveModel.prefillCrossFragFields(this._guide),
          this._guide.internal.liveDataUtils.dropXfaXml())
        : d
          ? this._guide.internal.liveDataUtils.initLiveData(
              d,
              this._guide.runtime.guideContext,
            )
          : this._guide.internal.liveDataUtils.initLiveData(
              null,
              null,
              c.isString(this._guide.xdpRef),
              c.isString(this._guide.xsdRef),
              this._guide.getAttribute("xsdRootElement"),
            );
      a.guideState.guideDom &&
        this._guide.playJson(a.guideState.guideDom, a.attachments);
      a.guideState.unboundDataMap &&
        a.guideState.unboundDataMap.data &&
        this.visit(function (b) {
          if (
            (b instanceof guidelib.model.Field ||
              b instanceof guidelib.model.GuideCompositeField) &&
            !b.getAttribute("bindRef") &&
            a.guideState.unboundDataMap.data[b.name]
          ) {
            var e = a.guideState.unboundDataMap.data[b.name];
            c.isObject(e) && c.isEmpty(e)
              ? b._setGuideValue(null)
              : b._setGuideValue(e);
            "guideRadioButton" === b.className &&
              (b.prevOnItem = b.getSelectedIndex(b.jsonModel._value));
          }
        });
      this._guide.setGuideState(
        guidelib.model.GuideSchema.prototype.GuideStateConstants
          .GUIDE_STATE_MERGE_COMPLETE,
      );
      this._guide.prepare();
      a.success && a.success.call(this);
    },
    _postExternalMessage: function (a) {
      this.userConfig.postExternalMessageConfig &&
        c.isFunction(
          this.userConfig.postExternalMessageConfig.postExternalHandler,
        ) &&
        (0, this.userConfig.postExternalMessageConfig.postExternalHandler)(a);
    },
    _isXfaGuide: function () {
      return this._guide.xdpRef ? !0 : !1;
    },
    _readRuntimeLocale: function (a) {
      return this.customContextProperty("runtimeLocale", a);
    },
    _isValidXFAGuide: function () {
      return !c.isUndefined(this._guide.runtime.guideContext.xdpRef);
    },
    _isEditDesignMode: function () {
      return window.CQ &&
        window.CQ.WCM &&
        (window.CQ.WCM.isEditMode() || window.CQ.WCM.isDesignMode())
        ? !0
        : !1;
    },
    _getUUID: function () {
      if (this._formInstanceUUID) return this._formInstanceUUID;
      this._formInstanceUUID = guideBridge._produceUUID();
      m(this._formInstanceUUID) ||
        guideBridge._guide.logger().log("Could not create UUID storage");
      return this._formInstanceUUID;
    },
    _produceUUID: function () {
      var a = d("div.guideContainerWrapperNode").data("tmproot"),
        b = Math.floor(1e4 * Math.random() + 1),
        c = new Date().getTime();
      return a + "_" + c + b;
    },
    on: function (a, b, c) {
      this._$target.on(a, b, c);
    },
    off: function (a, b, c) {
      this._$target.off(a, b, c);
    },
    trigger: function (a, b) {
      this._$target.trigger(a, b);
    },
    _disablePreview: function () {
      if (
        this._guide &&
        this._guide.runtime &&
        this._guide.runtime.guideContext
      )
        return this._guide.runtime.guideContext.disablePreview;
    },
    _makeFileNameUnique: function () {
      if (
        this._guide &&
        this._guide.runtime &&
        this._guide.runtime.guideContext
      )
        return this._guide.runtime.guideContext.makeFileNameUnique;
    },
    _getFileNameFileDomMap: function () {
      var a = this._getFileAttachmentsList();
      return this._juiceOutNameAndFileDomMap(a);
    },
    getFileAttachmentWrapper: function () {
      var a = this._getFileNameFileDomMap(),
        b = [],
        e = a.fileDom,
        d = a.fileName,
        f = a.fileBindRef;
      a = a.fileContentType;
      var g = function (a, b) {
          if (-1 !== a.indexOf(b)) return a.replace(b + "/", "");
          if (-1 !== a.indexOf("/")) return a.substring(a.lastIndexOf("/") + 1);
        },
        h;
      for (h = 0; h < d.length; h++)
        for (var k = d[h].split("\n"), l = 0; l < k.length; l++)
          e[h] && !c.isString(e[h]) && 0 < e[h].length
            ? b.push(
                new guidelib.model.FileAttachmentWrapper({
                  name: g(k[l], f[h]),
                  data: e[h][0].files[l],
                  contentType: e[h][0].files[l].type,
                  bindRef: f[h],
                }),
              )
            : k[l] &&
              b.push(
                new guidelib.model.FileAttachmentWrapper({
                  name: g(guideBridge._getRelativeFilePath(k[l]), f[h]),
                  data: e[h],
                  contentType: a[h],
                  bindRef: f[h],
                }),
              );
      return b;
    },
    _juiceOutNameAndFileDomMap: function (a) {
      var b = [],
        e = [],
        f = [],
        g = [],
        h = 0,
        k = [],
        l = [],
        m = [],
        p = [];
      c.each(
        a,
        function (a, b) {
          b = a._getFileAttachmentNames();
          var e = a._getEffectiveBindRef();
          if (b) {
            var f = b.split("\n"),
              g = d.extend(!0, [], a.fileList),
              q = 0;
            c.each(
              g,
              function (b, t) {
                var r = null;
                c.isString(b)
                  ? ((p[h] = a.name + "/" + f[t]),
                    (l[h] = e),
                    (m[h] = a._getContentType(g[t])),
                    (k[h++] = g[t]),
                    q++)
                  : (c.each(b[0].files, function (b) {
                      (b = f[q++]) &&
                        (r = r
                          ? r + ("\n" + a.name + "/" + b)
                          : a.name + "/" + b);
                    }),
                    null != r &&
                      0 < d(b).val().length &&
                      (d(b).attr("name", r),
                      (p[h] = r),
                      (l[h] = e),
                      (m[h] = null),
                      (k[h++] = d(b))));
              },
              this,
            );
          }
        },
        this,
      );
      a = this._guide.internal.liveDataUtils._getLazyAttachmentMap();
      var q = [],
        r = [],
        C = [],
        F = [];
      c.each(a, function (a, b) {
        var e = a.fileList,
          d = a.value.split("\n"),
          f = a.bindRef,
          g = a.fileNames.split("\n"),
          h = 0;
        c.each(e, function (a) {
          if (c.isString(a)) {
            var e =
              guidelib.util.GuideUtil.guideSomToComponentName(b) + "/" + g[h];
            q.push(a);
            F.push(e);
            h++;
          } else {
            var k = null;
            c.each(a[0].files, function (a) {
              if ((a = d[h++]))
                (a =
                  guidelib.util.GuideUtil.guideSomToComponentName(b) + "/" + a),
                  (k = k ? k + ("\n" + a) : a);
            });
            q.push(a);
            F.push(k);
          }
          r.push(f);
          C.push(null);
        });
      });
      b = k.concat(q);
      e = p.concat(F);
      f = l.concat(r);
      g = m.concat(C);
      return { fileName: e, fileDom: b, fileBindRef: f, fileContentType: g };
    },
    setValidationContext: function (b) {
      var c = guidelib.util.ErrorConstants;
      "number" === typeof c[b] && ((c = c[b]), a < c && ((a = c), (g = b)));
    },
    unsetValidationContext: function (b) {
      b === g && ((a = 0), (g = ""));
    },
    getValidationContext: function () {
      return g;
    },
    enableSwipeGesture: function (a, b) {
      $guideWrapperNode = d(".guideContainerWrapperNode");
      $guideWrapperNode.off(
        "swipeleft",
        window.guideBridge._performItemDeepNavigationNext,
      );
      $guideWrapperNode.off(
        "swiperight",
        window.guideBridge._performItemDeepNavigationPrevious,
      );
      if (a)
        $guideWrapperNode.on(
          "swipeleft",
          window.guideBridge._performItemDeepNavigationNext,
        );
      if (b)
        $guideWrapperNode.on(
          "swiperight",
          window.guideBridge._performItemDeepNavigationPrevious,
        );
    },
    _performItemDeepNavigationNext: function () {
      window.guideBridge.setFocus({
        somExpression: null,
        focusOption: "nextItemDeep",
        runCompletionScript: !0,
        skipFieldFocus: !0,
      });
    },
    _performItemDeepNavigationPrevious: function () {
      window.guideBridge.setFocus({
        somExpression: null,
        focusOption: "prevItemDeep",
        runCompletionScript: !0,
        skipFieldFocus: !0,
      });
    },
    _updateFileListing: function (a) {
      a = guideBridge._guideView.getView(a.somExpression);
      a._clearFileListing();
      guideBridge.visit(d.proxy(a._updateFileListing, a));
    },
    registerPanelProvider: function (a) {
      var b = new k();
      if (null == this.panelProvider)
        return (this.panelProvider = b.data = a), b;
      b.addMessage(
        2,
        "registrationError: PanelProvider already registered",
        "",
      );
      return b;
    },
  });
  window.guideBridge = new h();
  window.guideBridge._$target = d(window.guideBridge);
  window.guideBridge.on(
    "af.invisibleMandatoryRecaptchaInitialization",
    function (a, b) {
      a = b.jsonModel.target.jsonModel;
      d(".guideContainer,.aemformcontainer").append(
        '\x3cdiv id\x3d"recaptchaInvisible"\x3e\x3c/div\x3e',
      );
      b = d("#recaptchaInvisible");
      var c = d("[data-captchaservice]");
      b.attr({
        modelId: a.id || a.templateId,
        "af-recaptcha-execute": "",
        "data-externaldomain": c.attr("data-externaldomain"),
        "data-locale": c.attr("data-locale"),
      });
      b.on(
        "recaptchaExecution",
        guidelib.util.RecaptchaUtil.recaptchaExecution,
      );
      guidelib.util.RecaptchaUtil.renderRecaptcha(b, a);
    },
  );
  try {
    var r = document.createEvent("CustomEvent");
    r.initCustomEvent("bridgeInitializeStart", !0, !0, {
      guideBridge: window.guideBridge,
    });
    window.dispatchEvent(r);
  } catch (q) {}
  if (
    !window.guideBridge.userConfig.postExternalMessageConfig &&
    window !== window.parent
  )
    try {
      window.parent.document.getElementById(window.name),
        window.guideBridge.registerConfig("postExternalMessageConfig", {
          postExternalHandler: function (a) {
            try {
              var b = document.createEvent("CustomEvent");
              b.initCustomEvent(a.name, !0, !0, a.data);
              window.parent.dispatchEvent(b);
            } catch (v) {}
          },
        });
    } catch (q) {}
  window.guideBridge._postExternalMessage({
    name: "bridgeInitializeStart",
    data: { guideBridge: window.guideBridge },
  });
})($, _);
(function (d, c, f, a, b, e) {
  var g = (a.model.LiveDataUtils = e.ut.Class.extend({
    constants: {
      SKELETON_XML:
        '\x3cafData\x3e\x3cafUnboundData\x3e\x3cdata/\x3e\x3c/afUnboundData\x3e\x3cafBoundData\x3e\x3cdata xmlns:xfa\x3d"http://www.xfa.org/schema/xfa-data/1.0/"/\x3e\x3c/afBoundData\x3e\x3c/afData\x3e',
      SKELETON_JSON:
        '{"afData":{"afUnboundData":{"data":{}},"afBoundData":{"data":{}}}}',
      UNBOUND_SKELETON: "\x3cunBound\x3e\x3c/unBound\x3e",
      UNBOUND_JSON_SKELETON: '{"afUnboundData":{}}',
      INDEXED_XPATH_PAT: new RegExp(/\/[^\/]+\[\d+\]/),
      INDEXED_XPATH_PAT_JSON: new RegExp(/\/[^\/]+\/\d+/),
      XFA_DATA_NODE_ATTR_NAME: "xfa:dataNode",
      XFA_DATA_NODE_ATTR_VALUE: "dataGroup",
      UNKNOWN_XSD_ROOT_ELEMENT: "?",
      AF_ROOT_TAG: "afData",
      BOUND_TAG: "afBoundData",
      UNBOUND_TAG: "afUnboundData",
      XFA_TAG: "xfa",
      DATA_TAG: "data",
      BOUND_DATA_XPATH: "afBoundData/data",
      UNBOUND_DATA_XPATH: "afUnboundData/data",
      AF_DRAFT_TAG: "afSubmissionInfo/afDraft",
    },
    initialize: function () {
      g._super.initialize.call(this);
      this._xfaDataRoot = this._unboundDataRoot = this._boundDataRoot = null;
      this._fetchingClientSideData = !1;
      this.lazyAttachmentMap = {};
      this.attachments = [];
    },
    _updateLazyAttachmentMap: function (a) {
      c.each(
        a,
        function (a, b) {
          this.lazyAttachmentMap[b] = {};
          this.lazyAttachmentMap[b].fileList = a.split("\n");
          this.lazyAttachmentMap[b].value = a;
        },
        this,
      );
    },
    _updateLazyAttachmentMapFromModel: function (a) {
      a.parent._selfOrAncestorIsLazyReference &&
      a.value &&
      a.fileList &&
      !this._fetchingClientSideData
        ? (this.lazyAttachmentMap[a.somExpression] = {
            value: a.value,
            fileList: a.fileList,
            bindRef: a._getEffectiveBindRef(),
            fileNames: a._getFileAttachmentNames(),
          })
        : this.lazyAttachmentMap[a.somExpression] &&
          delete this.lazyAttachmentMap[a.somExpression];
    },
    _getAttachmentDataForModel: function (a) {
      var b = a._getEffectiveBindRef();
      if (a.somExpression && !c.isEmpty(this.lazyAttachmentMap))
        return (
          (b = this.lazyAttachmentMap[a.somExpression]),
          delete this.lazyAttachmentMap[a.somExpression],
          b
        );
      if (b && !c.isEmpty(this.attachments))
        return (b = a._getCurrentFileAttachmentWrapper(this.attachments));
    },
    _getLazyAttachmentMap: function () {
      return this.lazyAttachmentMap;
    },
    dropXfaXml: function () {
      this._xfaDataRoot = null;
    },
    destroy: function () {
      this._xfaDataRoot =
        this._unboundDataRoot =
        this._boundDataRoot =
        this._liveDataDoc =
          null;
    },
    initLiveData: function (a, b, c, e, d, f) {
      this.attachments = f;
    },
    isLiveDataInitialized: function () {},
    getLiveDataStr: function () {},
    getLiveDataDoc: function () {
      return this._liveDataDoc;
    },
    _isNonNaked: function () {},
    _getNameAndIndex: function (a) {},
    isIndexedPath: function (a) {},
    _createElements: function (a, b) {},
    _createRepeatedElements: function (a, b) {},
    _createChildElement: function (a, b) {},
    _createAttributeNode: function (a, b) {},
    getContextNode: function (a, b, c, e) {},
    addIndexToPath: function (a, b) {},
    _getElement: function (a, b, c) {},
    hasChildNodes: function (a) {},
    removeChild: function (a, b, c) {},
    insertNode: function (a, b, c) {},
    _getDataContext: function (a, b, d) {
      var f = a.bindRef;
      if (a._isXfaNode()) {
        var g = this.constants.XFA_TAG;
        b = e.ut.XMLUtils.dataSom2xpath(a.dataSom);
      } else
        c.isEmpty(f)
          ? ((g = this.constants.UNBOUND_TAG),
            (b = d + "/" + a.getAttribute("name").replace(/\s+/g, "")))
          : ((g = this.constants.BOUND_TAG),
            (a = this.getMatchingXpathHierarchy(b, f)),
            a.isCrossHierarchy
              ? (b = f)
              : c.isEmpty(a.suffixParts) ||
                (b += "/" + a.suffixParts.join("/")));
      return { xmlSec: g, indexedXpath: b };
    },
    _cmpXpathParts: function (a, b) {},
    getMatchingXpathHierarchy: function (a, b) {
      var e = !1,
        d = [],
        f = this._sanitizedXpathParts(b);
      c.find(
        this._sanitizedXpathParts(a),
        function (a) {
          if (this._cmpXpathParts(a, f[0])) d.push(a), f.shift();
          else return (e = !0);
        },
        this,
      );
      return { prefixParts: d, suffixParts: f, isCrossHierarchy: e };
    },
    _getXpathContext: function (b) {
      var e = "",
        d = "",
        f = [];
      for (b = b.parent; b instanceof a.model.GuidePanel; )
        b._preserveLazyValue() && f.unshift(b), (b = b.parent);
      c.each(f, function (a) {
        a = a._syncModelAndData(e, d);
        e = a.bound;
        d = a.unBound;
      });
      return { bound: e, unBound: d };
    },
    _applyOnLiveData: function (b, e) {
      c.isString(e) && (e = f.resolveNode(e));
      if (e instanceof a.model.GuidePanel) {
        var d = e._guide().internal.liveDataUtils._getXpathContext(e);
        e[b](d.bound, d.unBound);
      } else f._guide.rootPanel[b]("", "");
    },
    updateLiveData: function (a, b) {
      this._fetchingClientSideData = !c.isUndefined(b);
      this._applyOnLiveData("_updateLiveData", a);
      this._fetchingClientSideData = !1;
    },
    playLiveData: function (a) {
      this._applyOnLiveData("_playLiveData", a);
    },
    getListOfDirtyPanels: function (a) {
      return [];
    },
    addDataNodeInfo: function (a) {},
    setDataValue: function (a, b, c, e) {},
    setRichTextValue: function (a, b, c, e) {
      this.setDataValue(a, b, c, e);
    },
    getDataValue: function (a, b) {},
    _convertModelIndexToDataIndex: function (a) {},
    getParentRef: function (a) {},
    getParentDataNode: function (a, b, e) {
      var d = this.getParentRef(a.indexedXpath);
      return c.isEmpty(d)
        ? this.getContextNode("", a.xmlSec, !1)
        : this.getContextNode(d, a.xmlSec, b, e);
    },
    insertSubmissionInfo: function (a) {},
  }));
})($, _, window.guideBridge, window.guidelib, window.formBridge, window.xfalib);
(function (d, c, f, a, b, e) {
  var g = e.ut.XfaUtil.prototype.getOrElse,
    k = (a.model.LiveJsonUtils = a.model.LiveDataUtils.extend({
      initialize: function () {
        k._super.initialize.call(this);
        this._liveDataDoc = null;
      },
      initLiveData: function (a, b) {
        k._super.initLiveData.apply(this, arguments);
        a = a || g(b, "guidePrefillJson", null);
        if (c.isString(a) && 0 < a.length) {
          var e = JSON.parse(a);
          this._isNonNaked(e)
            ? ((this._liveDataDoc = e),
              (this._boundDataRoot = this._getElement(
                this._liveDataDoc.afData,
                this.constants.BOUND_DATA_XPATH,
              )),
              (this._unboundDataRoot = this._getElement(
                this._liveDataDoc.afData,
                this.constants.UNBOUND_DATA_XPATH,
              )))
            : ((this._boundDataRoot = e),
              (this._unboundDataRoot = JSON.parse(
                this.constants.UNBOUND_JSON_SKELETON,
              )[this.constants.UNBOUND_TAG]),
              (this._liveDataDoc = e));
        } else
          (this._liveDataDoc = JSON.parse(this.constants.SKELETON_JSON)),
            (this._boundDataRoot = this._getElement(
              this._liveDataDoc.afData,
              this.constants.BOUND_DATA_XPATH,
            )),
            (this._unboundDataRoot = this._getElement(
              this._liveDataDoc.afData,
              this.constants.UNBOUND_DATA_XPATH,
            ));
        null == this._boundDataRoot &&
          this._isNonNaked(e) &&
          ((this._liveDataDoc.afData.afBoundData =
            this._liveDataDoc.afData.afBoundData || {}),
          (this._liveDataDoc.afData.afBoundData.data =
            this._liveDataDoc.afData.afBoundData.data || {}),
          (this._boundDataRoot = this._liveDataDoc.afData.afBoundData.data));
      },
      _getElement: function (a, b, e) {
        if (!(a instanceof Object)) return null;
        if (c.isEmpty(b) || !c.isString(b)) return a;
        e = e || {};
        e = e.index;
        b = b.split("/").join(".");
        c.isUndefined(e) || c.isNull(e) || (b = b + "." + e);
        return g(a, b, null);
      },
      _isNonNaked: function (a) {
        return (a = a || this.getLiveDataDoc())
          ? a.hasOwnProperty("afData")
          : !1;
      },
      isLiveDataInitialized: function () {
        return this.getLiveDataDoc() instanceof Object;
      },
      getLiveDataStr: function () {
        return this.isLiveDataInitialized()
          ? JSON.stringify(this.getLiveDataDoc())
          : "";
      },
      _sanitizedXpathParts: function (a) {
        a = (a || "").replace(/^\//, "").replace(/\s+/g, "");
        a = this._splitForIndex(a);
        return c.filter(
          a,
          function (a) {
            return null !== this._getNameAndIndex(a);
          },
          this,
        );
      },
      _splitForIndex: function (a) {
        var b = [];
        a = a.split("/");
        for (var e = 0; e < a.length; e++) {
          var d = a[e];
          e + 1 < a.length &&
            !isNaN(a[e + 1]) &&
            !c.isEmpty(a[e + 1]) &&
            ((d = d + "/" + a[e + 1]), (e += 1));
          b.push(d);
        }
        return b;
      },
      _getNameAndIndex: function (a) {
        return a && ((a = a.match(/^([^\s\/]+)(?:\/(\d+))?$/)), null !== a)
          ? { name: a[1], index: a[2] ? parseInt(a[2]) : -1 }
          : null;
      },
      _cmpXpathParts: function (a, b) {
        return a && b
          ? ((a = this._getNameAndIndex(a)),
            (b = this._getNameAndIndex(b)),
            !c.isEmpty(a && b) &&
              a.name === b.name &&
              (-1 === b.index || a.index === b.index))
          : !1;
      },
      getContextNode: function (a, b, e, d) {
        var f = "";
        a = this._sanitizedXpathParts(a);
        if (b == this.constants.BOUND_TAG) {
          var g = this._boundDataRoot;
          this._isNonNaked(this._liveDataDoc) &&
            (f = "afData/" + this.constants.BOUND_DATA_XPATH + "/");
        } else
          b === this.constants.UNBOUND_TAG &&
            ((g = this._unboundDataRoot),
            this._isNonNaked(this._liveDataDoc) &&
              (f = "afData/" + this.constants.UNBOUND_DATA_XPATH + "/"));
        if (c.isEmpty(a)) b = g;
        else {
          b = f + a.join("/");
          if ("" == b && !this._isNonNaked(this._liveDataDoc)) return g;
          b = this._getElement(this._liveDataDoc, b);
          !b && e && (b = this._createElements(g, a, d));
        }
        return b;
      },
      _createElements: function (a, b, e) {
        return a instanceof Object
          ? c.isEmpty(b)
            ? a
            : (a = this._createRepeatedElements(a, b, e))
          : null;
      },
      _createRepeatedElements: function (a, b, c) {
        var e = a,
          d = this._getNameAndIndex(b[0]),
          f = d.name;
        d = d.index || 0;
        var g = 1 == b.length;
        var h = a[f];
        if (-1 === d) {
          if (((e = null == h ? this._createChildElement(a, f, g, c) : h), g))
            return e;
        } else if (null != h)
          if (((g = h.length), g < d + 1))
            for (h = g; h < d + 1; ++h) (e = {}), a[f].push(e);
          else e = h[d];
        else for (a[f] = [], h = 0; h < d + 1; ++h) (e = {}), a[f].push(e);
        return this._createElements(e, b.slice(1), c);
      },
      _createChildElement: function (a, b, c, e) {
        if (a instanceof Object) return (a[b] = c ? e : {}), a[b];
      },
      isIndexedPath: function (a) {
        return null !== (a || "").match(this.constants.INDEXED_XPATH_PAT_JSON);
      },
      setDataValue: function (a, b, c, e) {
        var d = a.lastIndexOf("/"),
          f = a.substring(0, d);
        a = a.substring(d + 1);
        b = this.getContextNode(f, b, c, {});
        b instanceof Object && (c || b.hasOwnProperty(a)) && (b[a] = e);
      },
      getDataValue: function (a, b) {
        var c = a.lastIndexOf("/"),
          e = a.substring(0, c);
        a = a.substring(c + 1);
        b = this.getContextNode(e, b, !1);
        return b instanceof Object ? (void 0 === b[a] ? null : b[a]) : null;
      },
      getRichTextValue: function (a, b) {
        return this.getDataValue(a, b);
      },
      addIndexToPath: function (a, b) {
        null === a.match(/\/\d+$/)
          ? (a += "/" + b)
          : this.logger().debug(
              "AF",
              "Tried to add index to already indexed JSON path :" + a,
            );
        return a;
      },
      hasChildNodes: function (a) {
        return !c.isEmpty(a);
      },
      removeChild: function (a, b, c) {
        a[b].splice(c, 1);
      },
      insertNode: function (a, b, c) {
        null == a[b] && (a[b] = []);
        for (var e = 0; e < c; e++) null == a[b][e] && (a[b][e] = {});
        a[b].splice(c, 0, {});
        return a[b][c];
      },
      getDataInstances: function (a, b) {
        return this.getContextNode(a.indexedXpath, a.xmlSec);
      },
      _convertModelIndexToDataIndex: function (a) {
        return 0 > a ? 0 : a;
      },
      getParentRef: function (a) {
        return a.replace(/\/[^\/]+(?:\/\d+)?$/, "");
      },
      insertSubmissionInfo: function (a, b) {
        if (this._isNonNaked()) {
          var e = b,
            d = this,
            f,
            g;
          null == e && (e = this._liveDataDoc.afData.afSubmissionInfo);
          null == e &&
            null == this._liveDataDoc.afData.afSubmissionInfo &&
            ((e = {}), (this._liveDataDoc.afData.afSubmissionInfo = e));
          c.each(a, function (a, b) {
            a instanceof Array
              ? ((f = []),
                c.each(a, function (a, b) {
                  "string" === typeof a && f.push(a);
                }),
                (e[b] = f.join(",")))
              : "object" === typeof a && null != a
                ? ((g = e[b]),
                  null == g && ((g = {}), (e[b] = g)),
                  d.insertSubmissionInfo(a, g))
                : (e[b] = a);
          });
        }
      },
    }));
})($, _, window.guideBridge, window.guidelib, window.formBridge, window.xfalib);
(function (d, c, f, a, b, e) {
  var g,
    k = (a.model.LiveXmlUtils = a.model.LiveDataUtils.extend({
      initialize: function () {
        k._super.initialize.call(this);
        c.isUndefined(document.evaluate) && wgxpath.install();
        this._liveDataDoc = null;
      },
      initLiveData: function (a, b, m, p, r) {
        k._super.initLiveData.apply(this, arguments);
        m = m || !1;
        p = p || !1;
        g = !(m || p);
        this.xsdRootElement = r;
        this._liveDataDoc = d.parseXML(this.constants.SKELETON_XML);
        this._boundDataRoot = this._getElement(
          this._liveDataDoc.documentElement,
          this.constants.BOUND_DATA_XPATH,
        );
        this._unboundDataRoot = this._getElement(
          this._liveDataDoc.documentElement,
          this.constants.UNBOUND_DATA_XPATH,
        );
        if (c.isString(a) && 0 < a.length) {
          var h = d.parseXML(a);
          if (this._isNonNaked(h)) {
            if (!m) {
              var l = this._getElement(
                h.documentElement,
                this.constants.BOUND_DATA_XPATH,
              );
              null == l &&
                (l = this._getElement(
                  h.documentElement,
                  this.constants.BOUND_TAG +
                    "/" +
                    f._guide.jsonModel.xsdRootElement,
                ));
              l &&
                ((l = this._liveDataDoc.importNode(l, !0)),
                this._boundDataRoot.parentNode.replaceChild(
                  l,
                  this._boundDataRoot,
                ),
                (this._boundDataRoot = l));
            }
            if (
              (h = this._getElement(
                h.documentElement,
                this.constants.UNBOUND_DATA_XPATH,
              ))
            )
              (l = this._liveDataDoc.importNode(h, !0)),
                this._unboundDataRoot.parentNode.replaceChild(
                  l,
                  this._unboundDataRoot,
                ),
                (this._unboundDataRoot = l);
          } else
            g
              ? ((this._unboundDataRoot = h.documentElement),
                (this._boundDataRoot = null))
              : (p && (this._boundDataRoot = h.documentElement),
                (this._unboundDataRoot = d.parseXML(
                  this.constants.UNBOUND_SKELETON,
                ).documentElement)),
              (this._liveDataDoc = h);
        }
        m &&
          (c.isString(b) &&
            0 < b.length &&
            (this._xfaDataRoot = e.ut.XMLUtils.getXFARootFormElementFromXML(
              d.parseXML(b),
            )),
          this._boundDataRoot.parentNode.parentNode.removeChild(
            this._boundDataRoot.parentNode,
          ),
          (this._boundDataRoot = null));
      },
      isLiveDataInitialized: function () {
        return this.getLiveDataDoc() instanceof Node;
      },
      getLiveDataStr: function () {
        return this.isLiveDataInitialized()
          ? new XMLSerializer().serializeToString(this.getLiveDataDoc())
          : "";
      },
      _ignoreXpathRoot: function (a) {
        return (
          this.xsdRootElement === this.constants.UNKNOWN_XSD_ROOT_ELEMENT ||
          this.xsdRootElement === a
        );
      },
      getContextNode: function (a, b, e) {
        var d,
          f = this._sanitizedXpathParts(a);
        if (b === this.constants.BOUND_TAG) var g = this._boundDataRoot;
        else
          b === this.constants.UNBOUND_TAG
            ? (g = this._unboundDataRoot)
            : b === this.constants.XFA_TAG && (g = this._xfaDataRoot);
        if (c.isEmpty(f)) c.isEmpty(a) && (d = g);
        else {
          if (
            b === this.constants.BOUND_TAG &&
            this._ignoreXpathRoot(f[0]) &&
            ((f = f.slice(1)), 0 === f.length)
          )
            return g;
          d = this._getElement(g, f.join("/"));
          !d && e && (d = this._createElements(g, f));
        }
        return d;
      },
      addIndexToPath: function (a, b) {
        null === a.match(/\[\d+\]$/)
          ? (a += "[" + (b + 1) + "]")
          : this.logger().debug(
              "AF",
              "Tried to add index to already indexed xpath :" + a,
            );
        return a;
      },
      getDataInstances: function (a, b) {
        a = this.getContextNode(a.indexedXpath, a.xmlSec);
        return null != a
          ? c.filter(
              a.parentNode.childNodes,
              function (a) {
                return a instanceof Element && a.nodeName === b;
              },
              this,
            )
          : null;
      },
      _findLastDataNode: function (a, b) {
        var c = e.ut.XMLUtils;
        a = c.evaluateXPath(b, a, null, null, null);
        c = c.iteratorToArray(a);
        return 0 < c.length ? c[c.length - 1] : null;
      },
      hasChildNodes: function (a) {
        return a.hasChildNodes();
      },
      removeChild: function (a, b, c) {
        (b = this._getElement(a, b + "[" + (c + 1) + "]", null)) &&
          a.removeChild(b);
      },
      insertNode: function (a, b, c) {
        var e = this._getElement(a, b + "[" + (c + 1) + "]", null),
          d = a.ownerDocument.createElement(b);
        if (e) a.insertBefore(d, e);
        else if ((e = this._findLastDataNode(a, b)) && e.nextSibling)
          a.insertBefore(d, e.nextSibling);
        else if (e && !e.nextSibling) a.appendChild(d);
        else
          for (e = 0; e <= c; e++) {
            var f = a.ownerDocument.createElement(b);
            a.appendChild(f);
          }
        return d;
      },
      _getNameAndIndex: function (a) {
        return a && ((a = a.match(/^([^[\s\/]+)(?:\[(\d+)\])?$/)), null !== a)
          ? { name: a[1], index: a[2] ? parseInt(a[2]) : 0 }
          : null;
      },
      _cmpXpathParts: function (a, b) {
        return a && b
          ? ((a = this._getNameAndIndex(a)),
            (b = this._getNameAndIndex(b)),
            !c.isEmpty(a && b) &&
              a.name === b.name &&
              (0 === b.index || a.index === b.index))
          : !1;
      },
      _sanitizedXpathParts: function (a) {
        a = (a || "").replace(/^\//, "").replace(/\s+/g, "").split("/");
        "text()" === c.last(a) && a.splice(-1, 1);
        return c.filter(
          a,
          function (a) {
            return null !== this._getNameAndIndex(a);
          },
          this,
        );
      },
      isIndexedPath: function (a) {
        return null !== (a || "").match(this.constants.INDEXED_XPATH_PAT);
      },
      _createElements: function (a, b) {
        if (!(a instanceof Node)) return null;
        if (c.isEmpty(b)) return a;
        "@" === b[0][0]
          ? ((b = b[0].slice(1)), (a = this._createAttributeNode(a, b)))
          : (a = this._createRepeatedElements(a, b));
        return a;
      },
      _createRepeatedElements: function (a, b) {
        var e = a,
          d = this._getNameAndIndex(b[0]),
          f = d.name;
        d = d.index || 1;
        var g = c.filter(a.childNodes, function (a) {
          return a instanceof Element && a.nodeName === f;
        });
        if (g.length < d)
          for (g = g.length; g < d; ++g) e = this._createChildElement(a, f);
        else e = g[d - 1];
        return this._createElements(e, b.slice(1));
      },
      _createChildElement: function (a, b) {
        if (a instanceof Element)
          return (b = a.ownerDocument.createElement(b)), a.appendChild(b), b;
      },
      _createAttributeNode: function (a, b) {
        if (a instanceof Element)
          return (
            (b = a.ownerDocument.createAttribute(b)), a.setAttributeNode(b), b
          );
      },
      _getElement: function (a, b, d) {
        if (!(a instanceof Node)) return null;
        if (c.isEmpty(b) || !c.isString(b)) return a;
        d = d || {};
        var f = d.nsResolver,
          g = d.index,
          k = b.split("/@");
        d = !1;
        if (2 < k.length)
          return (
            e.ut.XfaUtil.prototype
              .getLogger()
              .error("BindRefs must be Xpaths ending in atmost one attribute"),
            null
          );
        if (2 === k.length) {
          b = k[0];
          var h = k[1];
          d = !0;
        }
        c.isUndefined(g) || c.isNull(g) || (b = b + "[" + g + "]");
        a = e.ut.XMLUtils.evaluateXPath(
          b,
          a,
          f,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        );
        if (
          a.resultType === XPathResult.FIRST_ORDERED_NODE_TYPE &&
          ((a = a.singleNodeValue),
          a instanceof Node &&
            (!d ||
              (a.hasAttribute(h) &&
                ((a = a.getAttributeNode(h)), a instanceof Node))))
        )
          return a;
      },
      _isNonNaked: function (a) {
        return (a = a || this.getLiveDataDoc())
          ? a.documentElement.tagName === this.constants.AF_ROOT_TAG
          : !1;
      },
      getListOfDirtyPanels: function (a) {
        if (null == a || "" === a) return [];
        a = d.parseXML(a);
        a = this._getElement(a.documentElement, this.constants.AF_DRAFT_TAG);
        if (c.isUndefined(a) || 0 === a.childNodes.length) return [];
        a = a.firstChild.textContent.replace(/"/g, "");
        var b = [];
        a && (b = a.split(","));
        return b;
      },
      setRichTextValue: function (a, b, c, e) {
        a = this.getContextNode(a, b, c);
        a instanceof Node &&
          ((e = d.parseXML(e)),
          (a.textContent = ""),
          a.appendChild(e.documentElement));
      },
      setDataValue: function (a, b, c, e) {
        a = this.getContextNode(a, b, c);
        a instanceof Node && (a.textContent = e);
      },
      getDataValue: function (a, b) {
        a = this.getContextNode(a, b, !1);
        if (a instanceof Node) return a.textContent || null;
      },
      getRichTextValue: function (a, b) {
        a = this.getContextNode(a, b, !1);
        if (a instanceof Node) return a.innerHTML.trim();
      },
      _convertModelIndexToDataIndex: function (a) {
        return 0 > a ? 1 : a + 1;
      },
      getParentRef: function (a) {
        return a.substring(0, a.lastIndexOf("/"));
      },
      insertSubmissionInfo: function (a, b) {
        if (this._isNonNaked()) {
          var d = e.ut.XMLUtils,
            f =
              void 0 === b
                ? d.findOrCreateElement(
                    "afSubmissionInfo",
                    this._liveDataDoc.documentElement,
                  )
                : b,
            g = this;
          c.each(a, function (a, b) {
            if (a instanceof Array) {
              var e = [],
                k = !0;
              c.each(a, function (a, c) {
                "string" === typeof a
                  ? e.push(a)
                  : a instanceof Object &&
                    null != a &&
                    ((k = !1),
                    (c = f.ownerDocument.createElement(b)),
                    f.appendChild(c),
                    g.insertSubmissionInfo(a, c));
              });
              if (k) {
                var h = d.findOrCreateElement(b, f);
                h.textContent = e.join(",");
                f.appendChild(h);
              }
            } else
              "object" === typeof a && null != a
                ? ((h = d.findOrCreateElement(b, f)),
                  g.insertSubmissionInfo(a, h))
                : ((h = d.findOrCreateElement(b, f)), (h.textContent = a)),
                f.appendChild(h);
          });
        }
      },
    }));
})($, _, window.guideBridge, window.guidelib, window.formBridge, window.xfalib);
(function (d, c, f, a) {
  var b = (a.model.LiveModel = xfalib.ut.Class.extend({
    initialize: function () {
      b._super.initialize.call(this);
      this._crossFragmentFields = {};
      this._dataNodes = {};
    },
    destroy: function () {
      this._crossFragmentFields = {};
      this._dataNodes = {};
    },
    getCrossFragmentFields: function () {
      return this._crossFragmentFields;
    },
    add: function (b, c) {
      if (b) {
        var e = this._dataNodes[b] || new a.model.DataNode();
        e.addField(c);
        this._dataNodes[b] = e;
      }
    },
    isLive: function (a) {
      return c.isString(a) && c.has(this._dataNodes, a);
    },
    remove: function (a, b) {
      this.isLive(a) && this._dataNodes[a].removeField(b);
    },
    getAllFieldModels: function (a) {
      return c.flatten(
        c.map(
          a,
          function (a) {
            var b;
            (a = this._dataNodes[a]) && (b = a.getFieldModels());
            return b;
          },
          this,
        ),
      );
    },
    getAllAbstractFieldModels: function (a) {
      return c.flatten(
        c.map(
          a,
          function (a) {
            return this._dataNodes[a].getAbstractFieldModels();
          },
          this,
        ),
      );
    },
    resetData: function () {
      c.each(this._crossFragmentFields, function (a) {
        c.each(a, function (a) {
          a.resetData();
        });
      });
    },
    createDataNodes: function (a) {
      c.each(
        a,
        function (a) {
          this.add(a);
        },
        this,
      );
    },
    createCrossFragFields: function (b, d) {
      c.each(
        b,
        function (b) {
          var e = b.bindRef || b.name,
            f = b._value || null;
          f = new a.model.AbstractField({
            name: b.name,
            className: b.guideNodeClass,
            bindRef: b.bindRef,
            dataSom: b.dataSom,
            afDataSom: b.afDataSom,
            jsonModel: { _value: f, "{default}": f },
            _guideContainer: d,
          });
          c.isEmpty(this._crossFragmentFields[b.name]) &&
            (this._crossFragmentFields[b.name] = {});
          this._crossFragmentFields[b.name][e] = f;
          this.add(e, f);
        },
        this,
      );
    },
    prefillCrossFragFields: function (a) {
      var b = a.internal.liveDataUtils;
      b.isLiveDataInitialized() &&
        c.each(
          this._crossFragmentFields,
          function (a, e) {
            c.each(
              a,
              function (a, c) {
                c = b._getDataContext(a, "", "");
                a.value = b.getDataValue(c.indexedXpath, c.xmlSec);
              },
              this,
            );
          },
          this,
        );
    },
  }));
})($, _, window.guideBridge, window.guidelib);
(function (d, c, f) {
  var a = (f.model.FormData = xfalib.ut.Class.extend({
    initialize: function () {
      a._super.initialize.call(this);
    },
    toJsObject: function () {
      return {
        data: this.data,
        contentType: this.contentType,
        attachments: this.attachments,
      };
    },
    toHTMLFormData: function () {
      var a = new FormData();
      this.contentType && a.append("contentType", this.contentType);
      a.append("data", this.data);
      for (var c = 0; c < this.attachments.length; c++) {
        var d = this.attachments[c];
        if (d.isFile()) a.append("fileAttachments", d.data, d.name);
        else {
          var f = new Blob(
            [
              JSON.stringify({
                data: d.data,
                name: d.name,
                contentType: d.contentType,
              }),
            ],
            { type: "application/json" },
          );
          a.append("fileAttachments", f);
        }
        a.append("fileAttachmentBindRefs", d.bindRef);
      }
      return a;
    },
  }));
  a.defineProps({
    data: {
      get: function () {
        return this.options.data;
      },
    },
    attachments: {
      get: function () {
        return this.options.attachments;
      },
    },
    contentType: {
      get: function () {
        return this.options.contentType;
      },
    },
  });
})($, _, window.guidelib);
(function (d, c, f) {
  var a = (f.model.FileAttachmentWrapper = xfalib.ut.Class.extend({
    initialize: function () {
      a._super.initialize.call(this);
    },
    toJsObject: function () {
      return {
        name: this.name,
        contentType: this.contentType,
        bindRef: this.bindRef,
        data: this.data,
      };
    },
    isFile: function () {
      return this.data instanceof File;
    },
    dataURLtoBlob: function () {
      var a = this.data.split(","),
        c = a[0].match(/:(.*?);/)[1];
      a = atob(a[1]);
      for (var d = a.length, f = new Uint8Array(d); d--; )
        f[d] = a.charCodeAt(d);
      return new Blob([f], { type: c });
    },
  }));
  a.defineProps({
    name: {
      get: function () {
        return this.options.name;
      },
    },
    contentType: {
      get: function () {
        return this.options.contentType;
      },
    },
    bindRef: {
      get: function () {
        return this.options.bindRef;
      },
    },
    formElementName: {
      get: function () {
        return this.options.formElementName || this.options.bindRef;
      },
    },
    data: {
      get: function () {
        return this.options.data;
      },
    },
  });
})($, _, window.guidelib);
(function (d, c) {
  var f = (c.event.GuideModelEvent = xfalib.ut.Class.extend({
    msClassName: "guideModelEvent",
  }));
  f.defineProps({
    prevText: {
      get: function () {
        return this.jsonModel.prevText;
      },
    },
    newText: {
      get: function () {
        return this.jsonModel.newText;
      },
    },
    name: {
      get: function () {
        return this.jsonModel.name;
      },
    },
    keyDown: {
      get: function () {
        return this.jsonModel.keyDown;
      },
    },
    modifier: {
      get: function () {
        return this.jsonModel.modifier;
      },
    },
    target: {
      get: function () {
        return this.jsonModel.target;
      },
    },
    shift: {
      get: function () {
        return this.jsonModel.shift;
      },
    },
    change: {
      get: function () {
        return this.jsonModel.change;
      },
      set: function (a) {
        this.jsonModel.change = a;
      },
    },
    _property: {
      get: function () {
        return this.jsonModel._property;
      },
    },
  });
  f.createEvent = function (a, b, c, d, k) {
    return new f({
      jsonModel: { name: a, target: b, _property: c, prevText: d, newText: k },
    });
  };
  f.MODEL_REFRESH = "guide.modelRefresh";
  f.CHILD_CHANGED = "guide.childChanged";
  f.MULTIPLE_CHILD_ADDED = "guide.multipleChildAdded";
  f.MODEL_CHANGED = "guide.modelChanged";
  f.VALUE_CHANGED = "guide.valueChanged";
  f.ERROR_CHANGED = "guide.errorChanged";
  f.ERROR_RESET = "guide.errorReset";
  f.VISIBLE_CHANGED = "guide.visibleChanged";
  f.ENABLED_CHANGED = "guide.enabledChanged";
  f.ITEMS_CHANGED = "guide.itemsChanged";
  f.OBJECT_DESTROYED = "guide.objectDestroyed";
  f.NAVIGATE_SECTION = "guide.navigateSection";
  f.LAZY_LOADED = "guide.lazyLoaded";
})(_, guidelib);
(function (d, c, f) {
  f.view.GuideViewRegistry = xfalib.ut.Class.extend({
    _findWidget: function (a, b, e) {
      var d = c.find(a, function (a, c) {
        return b === c;
      });
      void 0 === d &&
        (d = c.find(a, function (a, b) {
          return e === b;
        }));
      return d;
    },
    _findWidgetNameFromCSS: function (a) {
      var b = null;
      c.isString(a) &&
        c.find(a.split(" "), function (a, c) {
          return (a = a.match(/^widget_([\w\W]+)$/)) && 2 === a.length
            ? ((b = a[1]), !0)
            : !1;
        });
      return b;
    },
    createView: function (a, b) {
      a = d(a);
      b = {
        element: a.get(0),
        widgetName: a.data("guideViewWidget"),
        parentView: b,
      };
      a = a.data("guideViewBind");
      if ((a = window.guideBridge._resolveId(a))) {
        b.model = a;
        var c = a.className;
        c = c.charAt(0).toUpperCase() + c.substr(1) + "View";
        c = f.view[c];
        var g = window.guideBridge.userConfig.widgetConfig;
        if (
          a instanceof f.model.Field ||
          a instanceof f.model.GuideCompositeField
        )
          b.widgetName =
            this._findWidgetNameFromCSS(a.cssClassName) ||
            this._findWidget(g, a.name, a.className);
        !c &&
          a instanceof f.model.GuideContainerNode &&
          (c = f.view.GuideContainerView);
        !c && a instanceof f.model.Field && (c = f.view.GuideFieldView);
        !c && a instanceof f.model.GuidePanel && (c = f.view.GuidePanelView);
        !c &&
          a instanceof f.model.GuideItemsContainer &&
          (c = f.view.GuideItemsView);
        c || (c = f.view.GuideBaseView);
        return new c(b);
      }
    },
  });
})($, _, guidelib);
(function (d, c, f) {
  c.model.DataNode = f.ut.Class.extend({
    initialize: function () {
      this.linkedFields = [];
      this.isUpdateInProgress = !1;
    },
    addField: function (a) {
      d.isEmpty(a) ||
        d.contains(this.linkedFields, a) ||
        (this.linkedFields.push(a),
        a.on(c.event.GuideModelEvent.VALUE_CHANGED, this));
    },
    removeField: function (a) {
      d.isEmpty(a) ||
        (a.off(c.event.GuideModelEvent.VALUE_CHANGED, this),
        (this.linkedFields = d.without(this.linkedFields, a)));
    },
    getFieldModels: function () {
      return d.filter(this.linkedFields, function (a) {
        return a instanceof c.model.Field;
      });
    },
    getAbstractFieldModels: function () {
      return d.filter(this.linkedFields, function (a) {
        return a instanceof c.model.AbstractField;
      });
    },
    handleEvent: function (a) {
      switch (a.name) {
        case c.event.GuideModelEvent.VALUE_CHANGED:
          d.contains(
            ["guideButton", "guideTextDraw", "guideAdobeSignBlock"],
            a.target.className,
          ) || this.updateLinkedFieldsValue(a);
          break;
        default:
          a.target.logger().warn("AF", "Unexpected Event type on Data Node", a);
      }
    },
    updateLinkedFieldsValue: function (a) {
      if (!this.isUpdateInProgress) {
        this.isUpdateInProgress = !0;
        var b = a.target._getValue();
        try {
          d.each(
            this.linkedFields,
            function (c) {
              c !== a.target && (c.value = b);
            },
            this,
          );
        } catch (e) {
          a.target.logger().error("AF", "Unable to set Linked Field value" + e);
        } finally {
          this.isUpdateInProgress = !1;
        }
      }
    },
  });
})(_, guidelib, xfalib);
(function (d, c) {
  var f = (c.view.GuideBaseView = xfalib.ut.Class.extend({
    guideUtil: c.util.GuideUtil,
    _triggerOnBridge: function (a, b, e, d, f) {
      b = c.event.GuideModelEvent.createEvent(a, b, e, d, f);
      window.guideBridge.trigger(a, b);
    },
    initialize: function () {
      f._super.initialize.call(this);
      this.$element = d(this.options.element);
      this.id = this.$element.attr("id");
      this._model = this.options.model;
      this.parentView = this.options.parentView;
      this.$element.data("guideView", this);
      this._$itemNav = this._$item = null;
      if (this._model && null != this._model)
        this._model.on(
          c.event.GuideModelEvent.MODEL_CHANGED,
          this.handleModelChanged,
          this,
        );
      this._syncPending = !0;
      this._visibleHelpElement = "none";
    },
    postInitialize: function () {},
    _unloadView: function () {
      this._model.off(
        c.event.GuideModelEvent.MODEL_CHANGED,
        this.handleModelChanged,
        this,
      );
      this.parentView =
        this._$itemNav =
        this._$item =
        this._model =
        this.$widget =
        this.$element =
          null;
    },
    handleVisibleChanged: function (a) {
      a.newText
        ? (this.$item.removeClass("hidden"),
          this.$itemNav.removeClass("hidden"))
        : (this.$item.addClass("hidden"),
          this.$itemNav.addClass("hidden"),
          this.parentView.currentActiveItemView == this &&
            this.parentView.setActive("nextItem"));
    },
    handleModelChanged: function (a) {
      switch (a._property) {
        case "viewVisited":
          a.newText
            ? (this.$item.addClass("stepped"),
              this.$itemNav.addClass("stepped"))
            : (this.$item.removeClass("stepped"),
              this.$itemNav.removeClass("stepped"));
          break;
        case "visible":
          this.handleVisibleChanged(a);
      }
    },
    setActive: function (a, b, c) {
      !b ||
        ("guideNode" !== this._model.className &&
          !this._model.forceElementFocusChange) ||
        null === this.$element ||
        "function" !== typeof this.$element.focus ||
        this._guideView.skipFieldFocus ||
        (this.$element.focus(),
        (this._guideView.currentFocusItemSom = this._model.somExpression));
      return !0;
    },
    focusable: function () {
      return this._model.visible;
    },
    _find: function (a) {
      return this._guideView.$element.find(a);
    },
    _syncGuideNodeToHtml: function (a) {
      this._syncPending = !1;
      this.handleVisibleChanged(
        c.event.GuideModelEvent.createEvent(
          c.event.GuideModelEvent.MODEL_CHANGED,
          this,
          "visible",
          this._model.visible,
          this._model.visible,
        ),
      );
    },
    _updateIds: function (a, b, e) {
      if (b != e) {
        var f = "#" + b,
          k = this.guideUtil.modelElSelector(b),
          h = '[id^\x3d"' + b + '"]',
          l = '[data-guide-longDescription^\x3d"' + b + '"]',
          m = 'label[for^\x3d"' + b + '"]',
          p = "[data-guide-id^\x3d'" + b + "']";
        f = a.find(f).addBack(f);
        var r = {
          id: h,
          for: m,
          "data-guide-longDescription": l,
          "data-guide-id": p,
        };
        void 0 !== f.attr(c.util.GuideUtil.DATA_GUIDE_ITEM_CONTAINER) &&
          f.attr(
            c.util.GuideUtil.DATA_GUIDE_ITEM_CONTAINER,
            e + c.util.GuideUtil.GUIDE_ITEM_CONTAINER_SUFFIX,
          );
        void 0 !== f.attr(c.util.GuideUtil.DATA_GUIDE_ITEM) &&
          f.attr(
            c.util.GuideUtil.DATA_GUIDE_ITEM,
            e + c.util.GuideUtil.GUIDE_ITEM_SUFFIX,
          );
        f.attr("id", e);
        a.find(k).addBack(k).attr(this.guideUtil.GUIDE_VIEW_BIND_ATTR, e);
        _.each(
          _.keys(r),
          function (c, f) {
            f = r[c];
            a.find(f)
              .addBack(f)
              .each(function () {
                var a = d(this),
                  f = a.attr(c);
                f = e + f.substring(b.length);
                a.attr(c, f);
              });
          },
          this,
        );
      }
    },
    getSiblingItemView: function (a) {
      return this.parentView instanceof c.view.GuidePanelView &&
        (a = this.parentView._model.navigationContext.getItemForNav(a))
        ? this.parentView.getQualifiedNamedView(a._escapeQualifiedName())
        : null;
    },
  }));
  f.defineProps({
    _guideView: {
      get: function () {
        return window.guideBridge._guideView;
      },
    },
    _guide: {
      get: function () {
        return window.guideBridge._guide;
      },
    },
    $item: {
      get: function () {
        if (!this._$item || 0 == this._$item.length) {
          var a = this.guideUtil.itemSelector(this._model.id, this._model);
          if ((this._$item = this._find(a)) && 0 == this._$item.length)
            return this.$element;
        }
        return this._$item;
      },
    },
    $itemNav: {
      get: function () {
        if (!this._$itemNav) {
          var a = this.guideUtil.itemNavSelector(this._model.id);
          this._$itemNav = this._find(a);
        }
        return this._$itemNav;
      },
    },
    visibleHelpElement: {
      get: function () {
        return this._visibleHelpElement;
      },
      set: function (a) {
        this._visibleHelpElement = a;
      },
    },
    isItem: {
      get: function () {
        return this._model._isItem;
      },
    },
    qualifiedName: {
      get: function () {
        return this._model._escapeQualifiedName();
      },
    },
  });
})($, guidelib);
(function (d, c) {
  var f = xfalib.ut.XfaUtil.prototype,
    a = (c.view.GuideFieldView = c.view.GuideBaseView.extend({
      _defaultWidgetName: "defaultWidget",
      autofillFieldKeywordToName: {
        name: "name",
        "given-name": "fname",
        "additional-name": "mname",
        "family-name": "lname",
        email: "email",
        "street-address": "address",
        "address-line1": "address",
        "address-line2": "address",
        "address-level1": "state",
        "address-level2": "city",
        "postal-code": "zip",
        country: "country",
        tel: "phone",
        "cc-name": "ccname",
        "cc-number": "cardnumber",
        "cc-csc": "cvc",
        "cc-exp-month": "ccmonth",
        "cc-exp-year": "ccyear",
        "cc-exp": "exp-date",
        "cc-type": "card-type",
      },
      initialize: function () {
        a._super.initialize.call(this);
        this._initializeWidget();
        this._defineModelEvents();
        this._markMandatory();
        this._updateEmptyStatus();
        this.oldValue = null;
      },
      postInitialize: function () {
        this._syncGuideNodeToHtml(!0);
      },
      createWidgetOptions: function () {
        return {
          name: this._model.getAttribute("autocomplete")
            ? this.autofillFieldKeywordToName[
                this._model.getAttribute("autofillFieldKeyword")
              ]
            : this._model.id + "_jqName",
          value: this._model.value,
          displayValue: this._model.formattedValue,
          commitEvent: this.getCommitEvent(),
          access: this._model.enabled ? "open" : "readOnly",
          screenReaderText: this._model._getScreenReaderText(),
          mandatory: this._model.mandatory,
        };
      },
      getCommitEvent: function () {
        return xfalib.ut.XfaUtil.prototype.XFA_EXIT_EVENT;
      },
      getWidgetName: function () {
        var a;
        if (this.$widget) {
          var c = this.$widget
            .find("[data-af-widgetname]")
            .addBack("[data-af-widgetname]");
          c && 0 < c.length && (a = c.attr("data-af-widgetname"));
        }
        a ||
          this.logger().warn(
            "AF",
            "widget name is not specified for field " +
              this._model.somExpression +
              ", falling back to other widget",
          );
        return a || this.options.widgetName || this._defaultWidgetName;
      },
      _unloadView: function () {
        this._model &&
          (this._model.off(
            c.event.GuideModelEvent.VALUE_CHANGED,
            this.handleValueChanged,
            this,
          ),
          this._model.off(
            c.event.GuideModelEvent.ERROR_CHANGED,
            this.handleErrorChanged,
            this,
          ),
          this._model.off(
            c.event.GuideModelEvent.ERROR_RESET,
            this.handleErrorReset,
            this,
          ));
        this.jqwidget = null;
        a._super._unloadView.apply(this, arguments);
      },
      _initializeWidget: function () {
        this.$element.find("div.guideFieldWidget").length
          ? (this.$widget = this.$element.find("div.guideFieldWidget"))
          : (this.$widget = null);
        if (this.$widget)
          d(this.$widget)
            .on(this.getCommitEvent(), d.proxy(this.handleCommit, this))
            .on(f.XFA_CLICK_EVENT, d.proxy(this.handleClick, this))
            .on(f.XFA_EXIT_EVENT, d.proxy(this.handleFocusOut, this))
            .on(f.XFA_ENTER_EVENT, d.proxy(this.handleEnter, this));
      },
      _defineModelEvents: function () {
        this._model &&
          (this._model.on(
            c.event.GuideModelEvent.VALUE_CHANGED,
            this.handleValueChanged,
            this,
          ),
          this._model.on(
            c.event.GuideModelEvent.ERROR_CHANGED,
            this.handleErrorChanged,
            this,
          ),
          this._model.on(
            c.event.GuideModelEvent.ERROR_RESET,
            this.handleErrorReset,
            this,
          ));
      },
      _syncGuideNodeToHtml: function (b) {
        a._super._syncGuideNodeToHtml.apply(this, arguments);
        this._model &&
          (_.each(
            { visible: this._model.visible, "jcr:title": this._model.title },
            function (a, b, e) {
              this.handleModelChanged(
                c.event.GuideModelEvent.createEvent(
                  c.event.GuideModelEvent.MODEL_CHANGED,
                  this,
                  b,
                  a,
                  a,
                ),
              );
            },
            this,
          ),
          this.$element.attr("data-disabled", !this._model.enabled + ""));
        if (this.$widget) {
          var e = this.createWidgetOptions();
          this.jqwidget
            ? this.setWidgetOptions(e)
            : this.createWidget(this.getWidgetName(), e);
        }
        this._model.forceErrorShow &&
          this._model._errorText &&
          this.handleErrorChanged({
            prevText: this._model.validationState,
            newText: this._model._errorText,
          });
      },
      setWidgetOptions: function (a) {
        this.jqwidget.option(a);
      },
      _markMandatory: function (a) {
        this._model.mandatory && this.$element
          ? this.$element.attr("data-mandatory", "true")
          : (this.$element.removeAttr("data-mandatory"),
            this._model._failedTest === this.guideUtil.MANDATORY_TEST &&
              this._model
                ._guide()
                .runtime.errorManager.unMarkError(
                  this.$element,
                  this._model.somExpression,
                ));
        this.jqwidget && this.setWidgetOptions({ mandatory: a });
      },
      _updateEmptyStatus: function (a) {
        a = a ? a.newText : this._model.value;
        null == a || ("string" === typeof a && 0 == a.length)
          ? this.$element
              .removeClass("af-field-filled")
              .addClass("af-field-empty")
          : this.$element
              .removeClass("af-field-empty")
              .addClass("af-field-filled");
      },
      handleValueChanged: function (a) {
        switch (a._property) {
          case "value":
            this.jqwidget.option("value", a.prevText),
              this.jqwidget.option("displayValue", a.newText);
        }
        this._updateEmptyStatus(a);
      },
      handleErrorChanged: function (a) {
        var b = a.newText;
        !0 === a.prevText
          ? (this._model
              ._guide()
              .runtime.errorManager.unMarkError(
                this.$element,
                this._model.somExpression,
              ),
            this.$element
              .addClass("validation-success")
              .removeClass("validation-failure"),
            this.updateWidgetOption("isValid", !0))
          : (this._model
              ._guide()
              .runtime.errorManager.markError(
                b,
                this.$element,
                this._model.somExpression,
                guideBridge.getValidationContext(),
              ),
            this.$element
              .addClass("validation-failure")
              .removeClass("validation-success"),
            this.updateWidgetOption("isValid", !1));
      },
      handleErrorReset: function (a) {
        this._model
          ._guide()
          .runtime.errorManager.unMarkError(
            this.$element,
            this._model.somExpression,
          );
        this.$element
          .removeClass("validation-failure")
          .removeClass("validation-success");
        this.updateWidgetOption("isValid", void 0);
      },
      handleCommit: function () {
        this._model.enabled && this.commitValue(this.jqwidget.option("value"));
      },
      handleClick: function (a) {
        window.guideBridge.clickedOnWindow = !1;
      },
      handleFocusOut: function (a) {
        a = window.guideBridge;
        this.getCommitEvent() !== f.XFA_EXIT_EVENT &&
          this._model.executeExpression("exit");
        a && a.clickedOnWindow && (this._guideView.currentFocusItemSom = null);
        a.clickedOnWindow = !1;
        "guideRadioButton" !== this._model.className &&
          "guideCheckBox" !== this._model.className &&
          "guideButton" !== this._model.className &&
          this._triggerOnBridge("elementFocusOut", "", "", "", "");
        this.oldValue !== this._model.value &&
          this._model._errorText &&
          this.handleErrorChanged({
            prevText: this._model.validationState,
            newText: this._model._errorText,
          });
        this.$element.removeClass("guideActiveField");
      },
      handleModelChanged: function (b) {
        switch (b._property) {
          case "enabled":
            var c = b.newText ? "open" : "readOnly";
            this.jqwidget && this.jqwidget.option("access", c);
            this.$element.attr("data-disabled", !b.newText + "");
            break;
          case "mandatory":
            this._markMandatory(this._model.mandatory);
            break;
          case "validateExpMessage":
            c = b.jsonModel.newText;
            this._changeValidationMessage(c);
            break;
          case "jcr:title":
            c = b.jsonModel.newText;
            this._changeTitle(c);
            break;
          default:
            a._super.handleModelChanged.apply(this, arguments);
        }
      },
      _changeTitle: function (a) {
        var b = d("#" + this.id)
          .children(".guideFieldLabel")
          .children("label");
        b && b.text(a);
      },
      _changeValidationMessage: function (a) {
        d("#" + this.id)
          .children(".guideFieldError")
          .html(a);
      },
      commitValue: function (a) {
        this._model.value = a;
        a = this._model._guide().version;
        a.isOn(a.Flags.RUN_VALUE_COMMMIT_ON_SCRIPT_CHANGE) ||
          this._model.executeExpression("valueCommitScript");
        this.getCommitEvent() === f.XFA_CHANGE_EVENT
          ? this._model.executeExpression("change")
          : this._model.executeExpression("exit");
      },
      tempXfaFixes: function () {
        this.$element &&
          this.$element.find("input").css("position", "relative");
        this.handleAccessibility();
      },
      handleAccessibility: function () {
        this._model.mandatory &&
          this.$widget
            .find("input,textarea,select,button")
            .attr("aria-required", !0);
        this._model._getScreenReaderText() === this._model._getToolTip() &&
          (this.$element
            .find("input,textarea,select,button")
            .removeAttr("aria-label"),
          this.$element
            .find("input,textarea,select,button")
            .attr(
              "aria-labelledby",
              this._model.id + "_guideFieldShortDescription",
            ));
      },
      _getWidgetInitialOptions: function (a) {
        a = a.find("[data-af-widgetname]").addBack("[data-af-widgetname]");
        if (0 < a.length) {
          this.logger().info(
            "AF",
            "Getting widget options for " + this._model.somExpression,
          );
          var b = a.data("af-widgetoptions") || {};
          _.each(
            a[0].attributes,
            function (a) {
              var c = a.name.match(/data-af-widgetoption-([^-]+)$/);
              null != c &&
                1 < c.length &&
                (this.logger().info(
                  "AF",
                  "adding option " + c[1] + " with value  ",
                ),
                (b[c[1]] = a.value));
            },
            this,
          );
          return b;
        }
        return {};
      },
      _newWidget: function (a, c, d) {
        var b = null,
          e = a == this._defaultWidgetName;
        try {
          d[a](c), (b = d.data(a) || d.data("xfaWidget-" + a));
        } catch (l) {
          this.logger().error(
            "AF",
            "widget " + a + " doesn't exists. Falling back to default widget",
          ),
            (e = !0),
            (b = d[this._defaultWidgetName](c).data("xfaWidget-" + a));
        }
        e && this.tempXfaFixes();
        return b;
      },
      createWidget: function (a, c) {
        var b = this._getWidgetInitialOptions(this.$widget);
        c = d.extend({}, c, b);
        this.jqwidget = this._newWidget(a, c, this.$widget);
      },
      handleEnter: function () {
        this._guideView.currentFocusItemSom = this._model.somExpression;
        var a = window.guideBridge;
        a && (a.clickedOnWindow = !1);
        "guideRadioButton" !== this._model.className &&
          "guideCheckBox" !== this._model.className &&
          "guideButton" !== this._model.className &&
          this._triggerOnBridge("elementFocus", "", "", "", "");
        this.oldValue = this._model.value;
        this.$element.addClass("guideActiveField");
      },
      handleChange: function () {},
      setActive: function (b, c, d) {
        a._super.setActive.call(this, b, c, d);
        c &&
          !this._guideView.skipFieldFocus &&
          this.jqwidget &&
          this.jqwidget.focus &&
          (this.jqwidget.focus(),
          (this._guideView.currentFocusItemSom = this._model.somExpression));
        return !0;
      },
      updateWidgetOption: function (a, c) {
        this.jqwidget && this.jqwidget.option(a, c);
      },
    }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideCaptchaView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "afcaptcha",
    syncGuideNodeToHtml: !0,
    initialize: function () {
      this.options.model.captchaInvisible && this.options.model.mandatory
        ? ((this._model = this.options.model), (this.syncGuideNodeToHtml = !1))
        : (this.options.model.captchaInvisible &&
            (this.options.element.classList.add("af-hideRecaptchaView"),
            (this.options.model.captchaValidate = !1)),
          f._super.initialize.apply(this, arguments),
          this._model.captchaWidget &&
            (this._defaultWidgetName = this._model.captchaWidget));
    },
    _initializeWidget: function () {
      f._super._initializeWidget.apply(this, arguments);
      if (0 < this.$widget.length)
        this.$widget.on(
          "tokenChange.captcha",
          d.proxy(this.handleTokenChange, this),
        );
    },
    _syncGuideNodeToHtml: function (a) {
      this.syncGuideNodeToHtml && f._super._syncGuideNodeToHtml.call(this, a);
    },
    handleTokenChange: function (a) {
      this._model.value = a.token;
    },
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments);
      return d.extend({}, a, {
        captchaConfigData: this.options.model.jsonModel,
      });
    },
    handleErrorChanged: function (a) {
      var b = a.newText;
      !1 === a.prevText
        ? (this._model
            ._guide()
            .runtime.errorManager.markError(
              b,
              this.$element,
              this._model.somExpression,
              guideBridge.getValidationContext(),
            ),
          this.$element.addClass("validation-failure"))
        : this.$element.removeClass("validation-failure");
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = xfalib.ut.XfaUtil.prototype,
    a = (c.view.GuideCompositeFieldView = c.view.GuideFieldView.extend({
      _defaultWidgetName: "defaultField",
      getModelNameOptionsMap: function () {
        return {};
      },
      initialize: function () {
        a._super.initialize.call(this);
        this._defineChildModelEvents();
      },
      _unloadView: function () {
        var b = this;
        this.getModelNameOptionsMap() &&
          _.each(this.getModelNameOptionsMap(), function (a, d) {
            a = b._model[d];
            a.off(
              c.event.GuideModelEvent.VALUE_CHANGED,
              b.handleValueChanged,
              b,
            );
            if (a.mandatory || a.validateExp)
              a.off(
                c.event.GuideModelEvent.ERROR_CHANGED,
                b.handleErrorChanged,
                b,
              ),
                a.off(
                  c.event.GuideModelEvent.ERROR_RESET,
                  b.handleErrorReset,
                  b,
                );
          });
        a._super._unloadView.call(b);
      },
      _defineChildModelEvents: function () {
        var a = this;
        this.getModelNameOptionsMap() &&
          _.each(this.getModelNameOptionsMap(), function (b, d) {
            b = a._model[d];
            b.on(
              c.event.GuideModelEvent.VALUE_CHANGED,
              a.handleValueChanged,
              a,
            );
            if (b.mandatory || b.validateExp)
              b.on(
                c.event.GuideModelEvent.ERROR_CHANGED,
                a.handleErrorChanged,
                a,
              ),
                b.on(
                  c.event.GuideModelEvent.ERROR_RESET,
                  a.handleErrorReset,
                  a,
                );
          });
      },
      handleCommit: function () {
        var a = this;
        _.isEmpty(this.getModelNameOptionsMap())
          ? (this._model.value = this.jqwidget.option("value"))
          : _.each(this.getModelNameOptionsMap(), function (b, c) {
              c = a._model[c];
              _.isUndefined(c) ||
                ((b = a.jqwidget.option(b)),
                _.isArray(b) && (b = b.join("\n")),
                (c.value = b));
            });
        this._model.executeExpression("valueCommitScript");
        this.execCommitExpression();
      },
      handleValueChanged: function (a) {
        switch (a._property) {
          case "value":
            var b = this.getModelNameOptionsMap();
            this.jqwidget.option(b[a.target.name], a.prevText);
        }
      },
      execCommitExpression: function () {
        this.getCommitEvent() == f.XFA_CHANGE_EVENT
          ? this._model.executeExpression("change")
          : this._model.executeExpression("exit");
      },
    }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideFileUploadView = c.view.GuideCompositeFieldView.extend({
    _defaultWidgetName: "fileUpload",
    getModelNameOptionsMap: function () {
      var a = f._super.getModelNameOptionsMap.apply(this, arguments);
      return d.extend({}, a, { fileAttachment: "value", comment: "comment" });
    },
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments),
        b = this._model._getFileAttachmentNames(),
        c = [];
      b && (c = b.split("\n"));
      return d.extend({}, a, {
        fileList: this._model.fileList,
        buttonText: this._model.buttonText,
        multiSelect: this._model.multiSelection,
        fileSizeLimit: this._model.fileSizeLimit,
        mimeType: this._model.getOrElse(this._model.jsonModel, "mimeType", ""),
        buttonClass: "button.guide-fu-attach-button",
        fileItemListClass: "ul.guide-fu-fileItemList",
        iframeContainer: "div.guideContainerWrapperNode",
        showComment: this._model.showComment,
        value: this._model.fileAttachment.value,
        fileNames: c,
        comment: this._model.comment.value,
        _uuidGenerator: function () {
          return guideBridge._getUUID.apply(this);
        },
        _filePath: "/tmp/fd/af",
        _getUrl: guideBridge._getUrl(""),
        disablePreview: !1,
        uploaderPluginName:
          guideBridge.userConfig.uploaderPluginName || "adobeFileUploader",
      });
    },
    handleCommit: function () {
      this._model.fileList = this.jqwidget.option("fileList");
      f._super.handleCommit.apply(this, arguments);
    },
    handleModelChanged: function (a) {
      switch (a._property) {
        case "fileList":
          this.jqwidget.option("fileList", a.prevText);
          break;
        default:
          f._super.handleModelChanged.apply(this, arguments);
      }
    },
    handleAccessibility: function () {
      !d.browser.msie ||
      ("9.0" !== d.browser.version && "10.0" !== d.browser.version)
        ? f._super.handleAccessibility.apply(this, arguments)
        : (this._model.mandatory && this.$widget.attr("aria-required", !0),
          this._model._getScreenReaderText() === this._model._getToolTip() &&
            (this.$widget.removeAttr("aria-label"),
            this.$widget.attr(
              "aria-labelledby",
              this._model.id + "_guideFieldShortDescription",
            )));
    },
    setActive: function (a, b, e) {
      c.view.GuideFieldView._super.setActive.call(this, a, b, e);
      b &&
        ((this._guideView.currentFocusItemSom = this._model.somExpression),
        this.$element.find("button").focus());
      return !0;
    },
    tempXfaFixes: function () {
      this.handleAccessibility();
    },
    getCommitEvent: function () {
      return xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT;
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideTermsAndConditionsView =
    c.view.GuideCompositeFieldView.extend({
      _defaultWidgetName: "tnc",
      getModelNameOptionsMap: function () {
        var a = f._super.getModelNameOptionsMap.apply(this, arguments);
        return d.extend({}, a, {
          reviewDocument: "value",
          reviewStatus: "reviewStatus",
        });
      },
      createWidgetOptions: function () {
        var a = f._super.createWidgetOptions.apply(this, arguments);
        return d.extend({}, a, {
          textAreaClass: ".guide-tnc-content",
          checkBoxClass: ".guide-tnc-checkbox",
          linkClass: ".guide-tnc-link",
          checkBoxDisableClass: ".guide-tnc-checkbox-disabled",
          checkBoxReviewedClass: ".guide-tnc-checkbox-reviewed",
          showLink: this._model.showLink,
          showAsPopUp: this._model.showAsPopUp,
          value: this._model.reviewDocument.value,
          reviewStatus: this._model.reviewStatus.value,
          clickStatus: this._model.clickStatus,
        });
      },
      tempXfaFixes: function () {
        this.$widget && this.$widget.css("position", "relative");
      },
      handleCommit: function (a) {
        this._model.clickStatus = this.jqwidget.option("clickStatus");
        f._super.handleCommit.apply(this, arguments);
      },
      handleModelChanged: function (a) {
        switch (a._property) {
          case "clickStatus":
            this.jqwidget.option("clickStatus", a.prevText);
            break;
          default:
            f._super.handleModelChanged.apply(this, arguments);
        }
      },
      getCommitEvent: function () {
        return xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT;
      },
    }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideTelephoneView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "telephoneWidget",
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments);
      return d.extend({}, a, { placeholder: this._model.placeholderText });
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideTextDrawView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "abstractWidget",
    initialize: function () {
      f._super.initialize.call(this);
      if (this.$element && 0 < this.$element.length)
        d(this.$element)
          .on("focus.guideTextDraw", d.proxy(this.handleEnter, this))
          .on("click.guideTextDraw", d.proxy(this.handleClick, this));
      if (this._guide.jsonModel.textReplacementMap)
        for (
          var a = Object.entries(this._guide.jsonModel.textReplacementMap),
            b = 0;
          b < a.length;
          b++
        )
          for (
            var c = d('span[data-af-footnote-id\x3d"' + a[b][0] + '"]'), g = 0;
            g < d(c).length;
            g++
          ) {
            var k = document.createElement("sup"),
              h = document.createElement("a");
            h.setAttribute("href", "#" + a[b][0]);
            h.setAttribute("title", a[b][0]);
            h.innerHTML = a[b][1];
            k.appendChild(h);
            d(d(c)[g]).html(k.outerHTML);
          }
    },
    _syncGuideNodeToHtml: function (a) {
      f._super._syncGuideNodeToHtml.call(this, a);
      a = this._model._isFloatingField();
      (this._model.value !== this._model.jsonModel._value ||
        this.$element.html() === this._model.value ||
        a) &&
        this.handleValueChanged({
          _property: "value",
          newText: this._model.value ? this._model.value : "",
        });
    },
    handleValueChanged: function (a) {
      switch (a._property) {
        case "value":
          this.$element.html(a.newText);
      }
    },
    setActive: function (a, b, e) {
      c.view.GuideFieldView._super.setActive.call(this, a, b, e);
      b &&
        !this._guideView.skipFieldFocus &&
        (this.$element && this.$element.focus(),
        (this._guideView.currentFocusItemSom = this._model.somExpression));
      return !0;
    },
  }));
})($, guidelib);
(function (d, c) {
  c.view.GuideAdobeSignBlockView = c.view.GuideTextDrawView.extend({});
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideButtonView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "xfaButton",
    handleClick: function (a) {
      this._triggerOnBridge(
        "elementButtonclicked",
        this._model,
        "click",
        "",
        "",
      );
      this._model.executeExpression("clickExp");
      f._super.handleClick.call(this);
    },
    _changeTitle: function (a) {
      d("#" + this.id + "_widget")
        .children("[data-guide-button-label]")
        .text(a);
    },
    tempXfaFixes: function () {
      this.$element && this.$element.find("button").css("position", "relative");
      this.handleAccessibility();
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = 0,
    a = (c.view.GuideListFileAttachmentButtonView =
      c.view.GuideButtonView.extend({
        _clearFileListing: function () {
          d("#fileAttachment .modal-list", window.document).children().remove();
          _.each(
            this._fileListViews,
            function (a) {
              a._unloadView();
            },
            this,
          );
          this._fileListViews = [];
          f = 0;
        },
        _updateFileListing: function (a) {
          if ("guideFileUpload" == a.className) {
            var b = this._guideView.$element.find("#" + a.id),
              g = "#" + a.id + "_widget";
            b = b.clone();
            b.find(g).attr("id", a.id + "_widget" + ++f);
            this._addSuffixToHelpIds(b, f);
            a = d("\x3cdiv\x3e\x3c/div\x3e")
              .addClass("row")
              .append('\x3cdiv class\x3d"col-md-12"\x3e\x3c/div\x3e');
            d("#fileAttachment .modal-list", window.document).append(
              b.appendTo(a),
            );
            a = c.view.GuideViewRegistry.prototype.createView(b, this);
            this._fileListViews.push(a);
            a.postInitialize();
          }
        },
        _addSuffixToHelpIds: function (a, c) {
          var b = a.find("[data-guide-longDescription]");
          if (0 < b.length) {
            var e = b.attr("data-guide-longDescription");
            a = d(".guideFieldDescription.long", a);
            e += c;
            a.attr("id", e);
            b.attr("data-guide-longDescription", e);
          }
        },
        _markFileListing: function () {
          this.$element &&
            this.$element.find("button").attr("data-guide-fileListing", !0);
        },
        initialize: function () {
          a._super.initialize.apply(this, arguments);
          this._markFileListing();
          this._fileListViews = [];
        },
      }));
})($, guidelib);
(function (d, c) {
  var f = xfalib.ut.XfaUtil.prototype,
    a = (c.view.GuideDropDownListView = c.view.GuideFieldView.extend({
      _defaultWidgetName: "dropDownList",
      initialize: function () {
        a._super.initialize.apply(this, arguments);
        this._model.multiSelect && (this._defaultWidgetName = "listBox");
      },
      _valueToArray: function (a) {
        var b;
        null === a || _.isUndefined(a)
          ? (b = [null])
          : _.isString(a)
            ? (b = a.split("\n"))
            : _.isNumber(a) && (b = [a.toString()]);
        return b;
      },
      createWidgetOptions: function () {
        var b = a._super.createWidgetOptions.apply(this, arguments);
        return d.extend({}, b, {
          multiSelect: this._model.multiSelect,
          editable: !1,
          items: this._model._getOptionsArray("save", "display"),
          value: this._valueToArray(this._model.value),
          placeholder: this._model.placeholderText,
        });
      },
      handleCommit: function () {
        var a = this.jqwidget.option("value");
        _.isArray(a) && (a = a.join("\n"));
        this.commitValue(a);
      },
      commitValue: function (a) {
        var b = this._model.value;
        this._model.value = a;
        a = this._model._guide().version;
        a.isOn(a.Flags.RUN_VALUE_COMMMIT_ON_SCRIPT_CHANGE) ||
          this._model.executeExpression("valueCommitScript");
        this.getCommitEvent() === f.XFA_CHANGE_EVENT
          ? this._model.executeExpression("change", {
              prevText: b,
              newText: this._model.value,
            })
          : this._model.executeExpression("exit");
      },
      handleValueChanged: function (a) {
        this.jqwidget.option("value", this._valueToArray(a.prevText));
        this.jqwidget.option("displayValue", this._valueToArray(a.newText));
        this._updateEmptyStatus(a);
      },
      getCommitEvent: function () {
        return xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT;
      },
      handleModelChanged: function (b) {
        "addItem" === b._property && this._handleAddItem(b);
        "clearItems" === b._property && this._handleClearItems(b);
        "deleteItem" === b._property
          ? this._handleDeleteItem(b)
          : a._super.handleModelChanged.apply(this, arguments);
      },
      _handleAddItem: function (a) {
        this.jqwidget.addItem({ sDisplayVal: a.newText, sSaveVal: a.prevText });
      },
      _handleClearItems: function (a) {
        this.jqwidget.clearItems();
      },
      _handleDeleteItem: function (a) {
        this.jqwidget.deleteItem(a.newText);
      },
      handleItemsChanged: function (a) {
        a = this._model._getOptionsArray("save", "display");
        this.jqwidget.option("items", a);
        this.jqwidget.option(
          "value",
          this._valueToArray(this._model.jsonModel._value),
        );
        this.jqwidget.option(
          "displayValue",
          this._valueToArray(this._model.formattedValue),
        );
      },
      _defineModelEvents: function () {
        a._super._defineModelEvents.apply(this, arguments);
        if (this._model)
          this._model.on(
            c.event.GuideModelEvent.ITEMS_CHANGED,
            this.handleItemsChanged,
            this,
          );
      },
      tempXfaFixes: function () {
        this.$element &&
          (this._model.multiSelect
            ? (this._model.height &&
                this.$element.find("ol").css("max-height", "none"),
              this.$element
                .find("ol")
                .css("position", "relative")
                .attr("id", this._model.id + "_widget"))
            : this.$element
                .find("select")
                .css("position", "relative")
                .attr("id", this._model.id + "_widget"));
        this.handleAccessibility();
      },
    }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideNumericBoxView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "numericInput",
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments);
      return d.extend({}, a, {
        dataType: this._model.dataType,
        leadDigits: this._model.leadDigits,
        fracDigits: this._model.fracDigits,
        zero: c.i18n.numberSymbols.zero,
        decimal: c.i18n.numberSymbols.decimal,
        commitEvent: this.getCommitEvent(),
        placeholder: this._model.placeholderText,
      });
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuidePasswordBoxView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "defaultWidget",
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments);
      return d.extend({}, a, { placeholder: this._model.placeholderText });
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideTextBoxView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "textField",
    initialize: function () {
      f._super.initialize.apply(this, arguments);
      this._model.allowRichText && (this._defaultWidgetName = "richTextField");
    },
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments),
        b = this._model.getAttribute("html5Type");
      return d.extend({}, a, {
        multiLine: this._model.multiLine,
        minLength: this._model.allowRichText ? null : this._model.minLength,
        length: this._model.allowRichText ? null : this._model.length,
        maxChars: this._model.allowRichText ? null : this._model.maxChars,
        required: this._model.mandatory,
        html5Type: b ? b : "",
        totalLengthMessage: this.guideUtil.getLocalizedMessage(
          "",
          c.i18n.strings.totalLengthMessage,
          [this._model.length],
        ),
        minimumLengthMessage: this.guideUtil.getLocalizedMessage(
          "",
          c.i18n.strings.minimumLengthMessage,
          [this._model.minLength],
        ),
        allowRichText: this._model.allowRichText,
        placeholder: this._model.placeholderText,
      });
    },
    tempXfaFixes: function () {
      this._model.jsonModel.multiLine
        ? (this.$element.find("textarea").css("position", "relative"),
          this.handleAccessibility())
        : f._super.tempXfaFixes.apply(this);
    },
    handleAccessibility: function () {
      f._super.handleAccessibility.apply(this);
      this._model.jsonModel.multiLine &&
        this.$element.find("textarea").attr("aria-multiLine", !0);
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideCheckBoxView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "XfaCheckBox",
    initialize: function () {
      f._super.initialize.apply(this, arguments);
      this._setListenersForLabelClick();
    },
    _setListenersForLabelClick: function () {
      var a = this;
      this.$element.find(".guideWidgetLabel").each(function (b, c) {
        d(c).click(
          (function (b) {
            return function () {
              a._model.enabled &&
                a.jqwidget[a.getJQWidgetIdentifier(b)].click();
            };
          })(b),
        );
      });
    },
    _syncGuideNodeToHtml: function (a) {
      this._model._isStateOverridden("options") &&
        (this._replaceGroupItemsWithNewOptions(
          this._model._getOptionsArray(),
          this._model.getAttribute("alignment"),
        ),
        (this.jqwidget = null));
      f._super._syncGuideNodeToHtml.apply(this, arguments);
    },
    getJQWidgetIdentifier: function (a) {
      return a;
    },
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments);
      return d.extend({}, a, { states: 2 });
    },
    getCommitEvent: function () {
      return xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT;
    },
    getStateFromValue: function (a, b) {
      return null === a
        ? 1
        : -1 !== (a + "").split(",").indexOf(b[0] + "")
          ? 0
          : 1;
    },
    getOnOffValueFromModelValue: function (a, b) {
      return b[this.getStateFromValue(a, b)];
    },
    handleValueChanged: function (a) {
      _.each(
        this.jqwidget,
        function (b) {
          var c = this.getOnOffValueFromModelValue(
            a.prevText,
            b.option("values"),
          );
          b.option("value", c);
          b.option("displayValue", c);
        },
        this,
      );
      this.$widget
        .find("[checked!\x3dchecked]")
        .parents(".guideCheckBoxItem")
        .removeClass("guideItemSelected");
      this.$widget
        .find("[checked\x3dchecked]")
        .parents(".guideCheckBoxItem")
        .addClass("guideItemSelected");
    },
    handleCommit: function () {
      var a = "";
      _.each(
        this.jqwidget,
        function (b, c) {
          c = b.option("values");
          0 === b.option("state") && (a = a + c[0] + ",");
        },
        this,
      );
      a = a.substring(0, a.length - 1);
      this.commitValue(a);
    },
    handleEnabledChanged: function (a) {
      if (!this.$element.hasClass("dontSyncEnabled")) {
        var b = a.newText ? "open" : "readOnly";
        _.each(this.jqwidget, function (a) {
          a.option("access", b);
        });
      }
      this.$element.attr("data-disabled", !this._model.enabled);
    },
    handleModelChanged: function (a) {
      switch (a._property) {
        case "enabled":
          this.handleEnabledChanged(a);
          break;
        default:
          f._super.handleModelChanged.apply(this, arguments);
      }
    },
    handleItemsChanged: function (a) {
      this._replaceGroupItemsWithNewOptions(
        this._model._getOptionsArray(),
        this._model.jsonModel.alignment,
      );
      this.createWidget(this.getWidgetName(), this.createWidgetOptions());
    },
    _getGroupItemIdentifier: function () {
      return ".guideCheckBoxGroupItems";
    },
    _getWidgetType: function () {
      return "checkbox";
    },
    _getItemName: function () {
      return "CheckBoxItem";
    },
    _getItemSkeleton: function () {
      var a = "guide" + this._getItemName(),
        b = "af" + this._getItemName();
      return (
        '\x3cdiv class\x3d"' +
        a +
        " " +
        b +
        ' {NAME_PLACEHOLDER} {CSS_PLACEHOLDER}" data-original-title\x3d"" title\x3d""\x3e\n            \x3cdiv class\x3d"guideFieldWidget left XfaCheckBox" data-id\x3d"{COUNTER_PLACEHOLDER}" data-original-title\x3d"" title\x3d""\x3e\n                \x3cinput type\x3d"' +
        this._getWidgetType() +
        '" id\x3d"{TEMPLATE_ID_PLACEHOLDER}_{COUNTER_PLACEHOLDER}_widget" name\x3d"{TEMPLATE_ID_PLACEHOLDER}_jqName" value\x3d"-100" tabindex\x3d"0" placeholder\x3d"" style\x3d"position: relative;"\x3e\n            \x3c/div\x3e\n            \x3cdiv class\x3d"guideWidgetLabel right"\x3e\n                \x3clabel\x3e{LABEL_PLACEHOLDER}\x3c/label\x3e\n            \x3c/div\x3e\n        \x3c/div\x3e'
      );
    },
    _renderGroupItem: function (a) {
      var b = this._getItemSkeleton(),
        e = c.util.GuideUtil;
      b = e.replaceAll(b, "{NAME_PLACEHOLDER}", a.modelName);
      b = e.replaceAll(b, "{TEMPLATE_ID_PLACEHOLDER}", a.modelTemplateId);
      b = e.replaceAll(b, "{CSS_PLACEHOLDER}", a.cssValue);
      b = e.replaceAll(b, "{COUNTER_PLACEHOLDER}", a.itemIndex);
      return (b = e.replaceAll(b, "{LABEL_PLACEHOLDER}", a.displayValue));
    },
    _replaceGroupItemsWithNewOptions: function (a, b) {
      var c = this.$element.find(this._getGroupItemIdentifier()),
        d = {};
      this.getWidgetName();
      var f = this;
      c.empty();
      d.widgetType = this._getWidgetType();
      d.modelName = this._model.name;
      d.modelTemplateId = this._model.id;
      null === this._model.css ||
        _.isUndefined(this._model.css) ||
        (b += " " + this._model.css);
      d.cssValue = b;
      _.each(a, function (a, b) {
        d.itemIndex = b;
        d.displayValue = a.displayValue;
        d.saveValue = a.saveValue;
        c.append(f._renderGroupItem(d));
      });
      this._initializeWidget();
      this._setListenersForLabelClick();
    },
    _replaceAll: function (a, b, c) {
      return a.split(b).join(c);
    },
    _defineModelEvents: function () {
      f._super._defineModelEvents.apply(this, arguments);
      if (this._model)
        this._model.on(
          c.event.GuideModelEvent.ITEMS_CHANGED,
          this.handleItemsChanged,
          this,
        );
    },
    setWidgetOptions: function (a) {
      var b = 0;
      _.each(
        this.jqwidget,
        function (c, d) {
          this._initOrUpdateWidget(d, this._getOptions(a, b++));
        },
        this,
      );
    },
    _getOptions: function (a, b) {
      var c = this._model.getOnOffValues(b),
        d = this.getOnOffValueFromModelValue(this._model.value, c);
      return _.extend(a, {
        value: d,
        displayValue: d,
        values: c,
        state: this.getStateFromValue(this._model.value, c),
        screenReaderText: this._model._getScreenReaderText(b),
      });
    },
    _initOrUpdateWidget: function (a, b, c, f, k) {
      this.jqwidget[a]
        ? this.jqwidget[a].option(b)
        : ((b = d.extend({}, b, k)),
          (this.jqwidget[a] = this._newWidget(c, b, f)));
      this.$widget
        .find("[checked!\x3dchecked]")
        .parents(".guideCheckBoxItem")
        .removeClass("guideItemSelected");
      this.$widget
        .find("[checked\x3dchecked]")
        .parents(".guideCheckBoxItem")
        .addClass("guideItemSelected");
    },
    initializeJqWidget: function () {
      this.jqwidget = [];
    },
    createWidget: function (a, b) {
      var c = this;
      this.initializeJqWidget();
      this.$widget &&
        (this.$widget.each(function (e, f) {
          c._initOrUpdateWidget(
            c.getJQWidgetIdentifier(e),
            c._getOptions(b, e),
            a,
            d(f),
            c._getWidgetInitialOptions(d(f)),
          );
        }),
        this.tempXfaFixes());
    },
    setActive: function (a, b, e) {
      c.view.GuideFieldView._super.setActive.call(this, a, b, e);
      b &&
        !this._guideView.skipFieldFocus &&
        (this.jqwidget &&
          this.jqwidget[this.getJQWidgetIdentifier(0)] &&
          this.jqwidget[this.getJQWidgetIdentifier(0)].focus(),
        (this._guideView.currentFocusItemSom = this._model.somExpression));
      return !0;
    },
    updateWidgetOption: function (a, b) {
      _.each(
        this.jqwidget,
        function (c, d) {
          "isValid" == a && c.option(a, b);
        },
        this,
      );
    },
    handleAccessibility: function () {
      f._super.handleAccessibility.apply(this, arguments);
      this.$element.attr("role", "group");
      if (
        this._model.jsonModel.assistPriority &&
        this._model.jsonModel.custom &&
        "custom" === this._model.jsonModel.assistPriority
      )
        this.$element.attr("aria-label", this._model.jsonModel.custom[0]);
      else {
        var a = this.$element.find(".guideFieldLabel label").get(0);
        a && a.id && this.$element.attr("aria-labelledby", a.id);
      }
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideRadioButtonView = c.view.GuideCheckBoxView.extend({
    _defaultWidgetName: "XfaCheckBox",
    _prevOnWidget: null,
    _getWidgetType: function () {
      return "radio";
    },
    _getItemName: function () {
      return "RadioButtonItem";
    },
    _getGroupItemIdentifier: function () {
      return ".guideRadioButtonGroupItems";
    },
    getJQWidgetIdentifier: function (a) {
      return this._model.getItemIdentifier(a);
    },
    handleValueChanged: function (a) {
      var b = a.prevText;
      this.jqwidget[b] &&
        (this.jqwidget[b].option("value", a.newText),
        this.jqwidget[b].option("displayValue", a.newText),
        (this._prevOnWidget = null === a.newText ? null : this.jqwidget[b]));
      this.$widget
        .find("[checked!\x3dchecked]")
        .parents(".guideRadioButtonItem")
        .removeClass("guideItemSelected");
      this.$widget
        .find("[checked\x3dchecked]")
        .parents(".guideRadioButtonItem")
        .addClass("guideItemSelected");
      this._updateEmptyStatus();
    },
    handleCommit: function () {
      var a = _.find(
        this.jqwidget,
        function (a) {
          return 0 === a.option("state") && a !== this._prevOnWidget;
        },
        this,
      );
      this.commitValue(a.option("value"));
      this._prevOnWidget = a;
    },
    _initOrUpdateWidget: function (a, b, c, d) {
      f._super._initOrUpdateWidget.apply(this, arguments);
      0 === b.state && (this._prevOnWidget = this.jqwidget[a]);
      this.$widget
        .find("[checked!\x3dchecked]")
        .parents(".guideRadioButtonItem")
        .removeClass("guideItemSelected");
      this.$widget
        .find("[checked\x3dchecked]")
        .parents(".guideRadioButtonItem")
        .addClass("guideItemSelected");
    },
    initializeJqWidget: function () {
      this.jqwidget = {};
      this.$widget.find("[checked]").removeAttr("checked");
      this.$widget.find("[checked\x3dchecked]").removeAttr("checked");
    },
    handleAccessibility: function () {
      f._super.handleAccessibility.apply(this, arguments);
      this.$element.attr("role", "radiogroup");
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideSwitchView = c.view.GuideCheckBoxView.extend({
    _defaultWidgetName: "guideSwitch",
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments),
        b = this._model.jsonModel.options;
      var c =
        Array.isArray(b) && 0 < b.length
          ? b[0]
          : !_.isUndefined(b) && 0 < b.length
            ? b
            : " ";
      b = Array.isArray(b) && 1 < b.length ? b[1] : "    ";
      return d.extend({}, a, {
        checkedLabel: c.substring(c.indexOf("\x3d") + 1),
        uncheckedLabel: b.substring(b.indexOf("\x3d") + 1),
      });
    },
    handleValueChanged: function (a) {
      var b = this.jqwidget[0],
        c = b.options;
      a = this.getOnOffValueFromModelValue(a.prevText, b.option("values"));
      c.value !== a &&
        (b.option("value", a),
        (b = b.$userControl),
        (c = c.value === c.values[0]),
        b.prop("checked", c),
        b.parent().toggleClass("ui-state-active", c),
        b.change());
    },
    handleCommit: function () {
      var a = this.jqwidget[0],
        b = a.option("values");
      a = a.option("state");
      this.commitValue(b[a]);
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideDatePickerView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "dateTimeEdit",
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments);
      return d.extend({}, a, {
        days: c.i18n.calendarSymbols.abbrdayNames,
        months: c.i18n.calendarSymbols.monthNames,
        zero: c.i18n.numberSymbols.zero,
        clearText: xfalib.locale.Strings.clearText,
        useNativeWidget:
          null === this._model.displayPictureClause &&
          null == this._model.editPictureClause,
        showCalendarIcon: !0,
        editPattern: this._model.editPictureClause,
        placeholder: this._model.placeholderText,
        minValidDate: this._model.minimum,
        maxValidDate: this._model.maximum,
        exclMaxDate: this._model.exclusiveMaximum,
        exclMinDate: this._model.exclusiveMinimum,
        allowNonIsoValue: !0,
      });
    },
    tempXfaFixes: function () {
      f._super.tempXfaFixes.apply(this, arguments);
      this.$widget &&
        this.$widget.children("not:input[type\x3ddate]").height("100%");
    },
    handleAccessibility: function () {
      f._super.handleAccessibility.apply(this, arguments);
      this.$widget.children("div[tabIndex]").removeAttr("tabIndex");
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideFootnotePlaceHolderView =
    c.view.GuideTextDrawView.extend({
      _defaultWidgetName: "abstractWidget",
      initialize: function () {
        f._super.initialize.call(this);
        var a = this;
        d(function () {
          a._renderFootnotes();
        });
      },
      _renderFootnotes: function () {
        var a = this._model.footnoteMap;
        if (0 < Object.entries(a).length) {
          var b = "\x3cdiv\x3e";
          for (footnoteID in a)
            d('a[title\x3d"' + footnoteID + '"]').is(":visible") &&
              (b += a[footnoteID]);
          this._model.value = b + "\x3c/div\x3e";
        }
      },
      setActive: function () {
        this._renderFootnotes();
      },
    }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideScribbleView = c.view.GuideFieldView.extend({
    _defaultWidgetName: "ScribbleImageField",
    createWidgetOptions: function () {
      var a = f._super.createWidgetOptions.apply(this, arguments);
      return d.extend({}, a, {
        commitProperty: "src",
        geoLocMandatoryOnIpad: "false",
        aspectRatio: this._valueOfAspectRatioToBeUsed(),
      });
    },
    _valueOfAspectRatioToBeUsed: function () {
      var a;
      this._model.jsonModel.aspectRatio
        ? (a = this._model.jsonModel.aspectRatio)
        : this._presenceOfHeight() || (a = "6.8888");
      return a;
    },
    _presenceOfHeight: function () {
      return (
        this._model.jsonModel.hasOwnProperty("height") &&
        0 < this._model.jsonModel.height.toString().length
      );
    },
    postInitialize: function () {
      f._super.postInitialize.call(this);
      var a = this;
      this._presenceOfHeight() ||
        (setTimeout(function () {
          c.util.GuideUtil._computeHeightAndWidthForScribble(a.$widget);
        }, c.util.GuideUtil.SCRIBBLE_RESIZE_TIME_INTERVAL),
        d(window).off("resize", c.util.GuideUtil._resizeScribbleField),
        d(window).on("resize", c.util.GuideUtil._resizeScribbleField));
    },
    handleAccessibility: function () {
      this._model.mandatory &&
        this.$widget.find("img").attr("aria-required", !0);
      this._model._getScreenReaderText() === this._model._getToolTip()
        ? (this.$element.find("img").removeAttr("aria-label"),
          this.$element
            .find("img")
            .attr(
              "aria-labelledby",
              this._model.id + "_guideFieldShortDescription",
            ))
        : "none" === this._model._getAssistPriority() &&
          this.$element.find("img").attr("aria-label", " ");
    },
    tempXfaFixes: function () {
      this.$widget &&
        this.$widget
          .css("position", "relative")
          .find("img")
          .css("position", "relative");
      this.handleAccessibility();
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideImageView = c.view.GuideBaseView.extend({
    initialize: function () {
      f._super.initialize.call(this);
      if (null != this._model.value) {
        var a = "data:image/*;base64," + this._model.value;
        this.$element.children("img").attr("src", a);
      }
    },
    postInitialize: function () {
      this._syncGuideNodeToHtml();
    },
    setActive: function (a, b, e) {
      c.view.GuideFieldView._super.setActive.call(this, a, b, e);
      b &&
        !this._guideView.skipFieldFocus &&
        (this.$element && this.$element.focus(),
        (this._guideView.currentFocusItemSom = this._model.somExpression));
      return !0;
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideChartView = c.view.GuideBaseView.extend({
    initialize: function () {
      f._super.initialize.call(this);
      var a = this;
      d(window).on("resize orientationchange", function () {
        a.renderChart.apply(a);
      });
    },
    postInitialize: function () {
      this._syncGuideNodeToHtml(!0);
    },
    handleModelChanged: function (a) {
      switch (a._property) {
        case "data":
        case "chartType":
          this.renderChart();
          break;
        case "visible":
          this.handleVisibleChanged(a);
      }
    },
    handleVisibleChanged: function (a) {
      a.newText
        ? this.$element.removeClass("hidden")
        : (this.$element.addClass("hidden"),
          this.parentView.currentActiveItemView == this &&
            this.parentView.setActive("nextItem"));
    },
    _generateChart: function () {
      var a = this.$element,
        b = this._model,
        e = a.find(
          b.jsonModel.isInteractiveCommunicationChartResource
            ? ".highcharts-container"
            : ".dv-chart-container",
        );
      if (
        ((0 < a.parent().width() && 0 < a.width()) || 0 == e.length) &&
        b.repeatableItem
      )
        try {
          if (
            (e.remove(), b.jsonModel.isInteractiveCommunicationChartResource)
          ) {
            var d = new fd.chart.ChartInstanceGenerator().generate(
              b.jsonModel,
              b.jsonModel.data,
            );
            Highcharts.chart(a.attr("id"), d);
          } else (d = c.chartUtils.constructChart(b, a)) && d.render();
        } catch (k) {
          this.logger().error(
            "AF Chart view",
            "Error while rendering chart " + k,
          );
        }
    },
    renderChart: function () {
      if (this._model.data) {
        var a = this;
        window.requestAnimationFrame(function () {
          a._generateChart.apply(a);
        });
      }
    },
    _syncGuideNodeToHtml: function (a) {
      this.renderChart();
      c.view.GuideChartView._super._syncGuideNodeToHtml.call(this, a);
    },
    setActive: function (a, b, e) {
      c.view.GuideChartView._super.setActive.call(this, a, b, e);
      b &&
        !this._guideView.skipFieldFocus &&
        (this.$element && this.$element.focus(),
        (this._guideView.currentFocusItemSom = this._model.somExpression));
      return !0;
    },
  }));
})($, guidelib);
(function (d, c) {
  var f = (c.view.GuideAdModuleView = c.view.GuideBaseView.extend({
    initialize: function () {
      f._super.initialize.call(this);
      if (this._model)
        this._model.on(
          c.event.GuideModelEvent.VALUE_CHANGED,
          this.handleValueChanged,
          this,
        );
      this.oldValue = null;
    },
    postInitialize: function () {
      this._syncGuideNodeToHtml(!0);
    },
    handleValueChanged: function (a) {
      switch (a._property) {
        case "value":
          this.$element.html(a.newText);
      }
    },
    handleVisibleChanged: function (a) {
      a.newText
        ? this.$element.removeClass("hidden")
        : (this.$element.addClass("hidden"),
          this.parentView.currentActiveItemView == this &&
            this.parentView.setActive("nextItem"));
    },
    handleModelChanged: function (a) {
      f._super.handleModelChanged.apply(this, arguments);
    },
    _syncGuideNodeToHtml: function (a) {
      this._model.value &&
        this.$element
          .html(this._model.value)
          .find("img")
          .attr("src", function (a, c) {
            return Granite.HTTP.externalize(c);
          });
      this._model.layoutConfigs &&
        c.util.AdUtil.applyLayouts({
          $element: this.$element,
          layoutConfigs: this._model.layoutConfigs,
        });
      this._model &&
        this.handleModelChanged(
          c.event.GuideModelEvent.createEvent(
            c.event.GuideModelEvent.MODEL_CHANGED,
            this,
            "visible",
            this._model.visible,
            this._model.visible,
          ),
        );
    },
    setActive: function (a, b, e) {
      c.view.GuideFieldView._super.setActive.call(this, a, b, e);
      b &&
        (this.$element && this.$element.focus(),
        (this._guideView.currentFocusItemSom = this._model.somExpression));
      return !0;
    },
  }));
})($, guidelib);
(function (d, c, f) {
  var a = (f.view.GuideItemsView = f.view.GuideBaseView.extend({
    initialize: function () {
      a._super.initialize.call(this);
      this.childViews = [];
    },
    _unloadView: function () {
      if (this._model._selfOrAncestorIsLazyReference) {
        var a;
        d("#" + this.id)
          .children()
          .remove();
        var e = this._guideView._queueViewForLazyItems;
        -1 !== (a = c.indexOf(e, this)) && (e[a] = void 0);
        c.each(
          this.childViews,
          function (a) {
            a._unloadView();
          },
          this,
        );
        this.childViews = [];
        this._currentActiveItemView = null;
        this._guideView._domTemplateCacheStore.removeDomElement(
          "#" + this._model.templateId,
        );
        this._guideView._reInitializeGuideContainerDom();
      }
    },
    postInitialize: function () {
      this.childViews = c.reduce(
        this._model.children,
        function (a, c) {
          (c = this._createNonRepeatChildView(c)) && a.push(c);
          return a;
        },
        [],
        this,
      );
      this._syncGuideNodeToHtml(!1);
    },
    _createNonRepeatChildView: function (a) {
      var b = this.guideUtil.modelElSelector(a.id);
      b = this.$element.find(b);
      b.length ||
        ((b = this.$element.find(this.guideUtil.modelElSelector(a.templateId))),
        this._updateIds(b, a.templateId, a.id));
      return b.length
        ? ((a = f.view.GuideViewRegistry.prototype.createView(b, this)),
          a.postInitialize(),
          a)
        : null;
    },
    _syncGuideNodeToHtml: function (b) {
      b &&
        c.each(
          this.childViews,
          function (a) {
            a._syncGuideNodeToHtml(!0);
          },
          this,
        );
      a._super._syncGuideNodeToHtml.call(this, b);
    },
    _findChildView: function (a) {
      return c.find(
        this.childViews,
        function (b) {
          return b._model == a;
        },
        this,
      );
    },
  }));
  a.defineProps({
    itemsView: {
      get: function () {
        return c.filter(
          this.childViews,
          function (a) {
            return a.isItem;
          },
          this,
        );
      },
    },
  });
})($, _, guidelib);
(function (d, c, f, a) {
  var b = (f.view.GuideProgressiveSectionView = f.view.GuideItemsView.extend({
    initialize: function () {
      b._super.initialize.call(this);
      this._model &&
        null != this._model &&
        (this._model.off(f.event.GuideModelEvent.NAVIGATE_SECTION),
        this._model.on(
          f.event.GuideModelEvent.NAVIGATE_SECTION,
          this.handleNavigateSection,
          this,
        ));
    },
    handleNavigateSection: function (a) {
      var b = f.runtime.progressive,
        e = this._model;
      "next" === a.newText
        ? e.currentActivePart++
        : "prev" === a.newText && e.currentActivePart--;
      c.each(e._parts, function (a, d) {
        d == e.currentActivePart
          ? c.each(a, function (a, c) {
              b.isFieldVisible(a)
                ? b.markFieldVisible(
                    window.guideBridge
                      ._getGuideDomElement(a.somExpression)
                      .parent(),
                  )
                : b.markFieldHidden(
                    window.guideBridge
                      ._getGuideDomElement(a.somExpression)
                      .parent(),
                  );
            })
          : c.each(a, function (a, c) {
              b.markFieldHidden(
                window.guideBridge
                  ._getGuideDomElement(a.somExpression)
                  .parent(),
              );
            });
      });
      (1 !== e.currentActivePart + 1 || 1 !== e._parts.length) &&
        0 < e._parts.length &&
        this._updateSectionTitle();
    },
    _updateSectionTitle: function () {
      this.$element
        .find(
          f.runtime.progressive.PROGRESSIVE_CONSTANTS
            .PDC_SECTION_TITLE_SELECTOR,
        )
        .html(
          this._model.sectionTitle +
            " (" +
            (this._model.currentActivePart + 1) +
            "/" +
            this._model._parts.length +
            ")",
        );
    },
    postInitialize: function () {
      var a = this,
        b,
        c = null;
      if (this.$element && null != this.$element) {
        var h = this.$element.find(".progressiveSectionField");
        h.each(function (e, g) {
          b = d(g).children("div")[0];
          c = d(b).attr("id");
          e = f.view.GuideViewRegistry.prototype.createView(b, a);
          e.postInitialize();
          a.childViews.push(e);
          a.childViewsToId = a.childViewsToId || {};
          a.childViewsToId[c] = e;
        });
        this._calculatePartsOfSection();
      }
    },
    _getPdcSizeConfiguration: function () {
      return window.guideBridge.userConfig["progressive.pdcSize"];
    },
    _calculatePartsOfSection: function () {
      var a = window.guideBridge.userConfig,
        b = f.runtime.progressive,
        k = this.$element.parents(b.PROGRESSIVE_CONSTANTS.PDC_SELECTOR);
      this._getPdcSizeConfiguration() &&
        (this._getPdcSizeConfiguration() &&
          this._getPdcSizeConfiguration().height &&
          k.height(this._getPdcSizeConfiguration().height),
        this._getPdcSizeConfiguration() &&
          this._getPdcSizeConfiguration().width &&
          k.width(this._getPdcSizeConfiguration().width));
      if (
        a &&
        a.calculatePartsOfSectionConfig &&
        c.isFunction(
          a.calculatePartsOfSectionConfig.calculatePartsOfSectionHandler,
        )
      )
        (a = (0,
        a.calculatePartsOfSectionConfig.calculatePartsOfSectionHandler)(
          this._model,
        )),
          this._updatePartsFromArray(a);
      else {
        var h = this.$element.find(
            b.PROGRESSIVE_CONSTANTS.PDC_SECTION_FIELD_CONTAINER_SELECTOR,
          ),
          l = k.innerHeight();
        k.find(b.PROGRESSIVE_CONSTANTS.PDC_TITLE_SELECTOR).outerHeight();
        k.find("[" + b.PROGRESSIVE_CONSTANTS.PDC_CONTROLS + "]").outerHeight();
        this.$element
          .find(b.PROGRESSIVE_CONSTANTS.PDC_SECTION_TITLE_SELECTOR)
          .outerHeight();
        a = k.find(
          b.PROGRESSIVE_CONSTANTS.PDC_SECTION_REPEATABLE_CONTROLS_SELECTOR,
        );
        a.outerHeight() && a.outerHeight();
        d(
          b.PROGRESSIVE_CONSTANTS.PDC_SECTION_TITLE_CONTAINER_SELECTOR,
        ).outerHeight();
        a = this.$element.find(".progressiveSectionField");
        h.find(".progressiveSectionField.pdcCurrentPanelField");
        var m = this,
          p = 0,
          r = k.find("[" + b.PROGRESSIVE_CONSTANTS.PDC_OFFSET_SELECTOR + "]");
        k = b = !1;
        h.css("max-height", "");
        var q = h.height();
        var t = l;
        c.each(r, function (a) {
          t -= d(a).outerHeight();
        });
        t -= f.runtime.progressive.heightBuffer;
        h.css("max-height", t + "px");
        h = t;
        if (q > t)
          for (l = 0; l < a.length; l++)
            (q = d(a[l])),
              (r = q.outerHeight() + f.runtime.progressive.fieldHeightBuffer),
              r <= h && !k
                ? ((h -= r),
                  (b = !0),
                  (q = q.children("div").first().attr("id")),
                  this._updateParts(p, q))
                : b
                  ? ((h = t), p++, l--)
                  : ((q = q.children("div").first().attr("id")),
                    this._updateParts(p, q),
                    (k = b = !0));
        else
          d.each(a, function (a) {
            m._updateParts(p, d(this).children("div").first().attr("id"));
          });
      }
    },
    _updatePartsFromArray: function (a) {
      c.isArray(a) &&
        c.each(a, function (a, b) {
          c.isArray(a) &&
            c.each(a, function (a, c) {
              this._updateParts(b, a.id);
            });
        });
    },
    _updateParts: function (a, b) {
      this._model._parts[a] = this._model._parts[a] || {};
      this._model._parts[a][b] = this._model._getChildModelFromId(b);
    },
    focusable: function () {
      return !1;
    },
    setActive: function (a, b, c) {
      return !0;
    },
    handleChildChanged: function (a) {},
    handleModelChanged: function (a) {},
    handleVisibleChanged: function (a) {},
    handleAccessibility: function () {},
    getSiblingItemView: function (a) {
      return null;
    },
    getQualifiedNamedView: function (a) {
      return c.find(
        this.childViews,
        function (b) {
          return b._model._escapeQualifiedName() == a;
        },
        this,
      );
    },
  }));
  b.defineProps({
    $item: {
      get: function () {
        return null;
      },
    },
    $itemNav: {
      get: function () {
        return null;
      },
    },
    isItem: {
      get: function () {
        return !1;
      },
    },
    qualifiedName: {
      get: function () {
        return null;
      },
    },
  });
})($, _, guidelib, window.guideBridge);
(function (d, c, f) {
  var a = (f.view.GuideProgressiveRepeatableSectionView =
    f.view.GuideProgressiveSectionView.extend({
      initialize: function () {
        a._super.initialize.call(this);
        this._$summary = null;
        this._model &&
          null != this._model &&
          (this._model &&
            this._model.instance &&
            (this._model.instance.off(
              f.event.GuideModelEvent.MODEL_CHANGED,
              this.handleModelChanged,
              this,
            ),
            this._model.instance.on(
              f.event.GuideModelEvent.MODEL_CHANGED,
              this.handleModelChanged,
              this,
            )),
          (this._summarySelector = this.guideUtil.summarySelector(
            this._model.instance.id,
          )));
      },
      postInitialize: function () {
        a._super.postInitialize.call(this);
        this.handleSummaryChanged();
      },
      _updateSectionTitle: function () {},
      handleRepeatableProgressivePanel: function () {
        this._updateIds(
          this.$element,
          this._model.repeatablePanelId,
          this._model.instance.id,
        );
        this.childViews = [];
        c.each(
          this._model.children,
          function (a) {
            var b = a.templateId;
            a = a.id;
            this.$element.find("#" + b).length &&
              this._updateIds(this.$element, b, a);
          },
          this,
        );
      },
      handleNavigateSection: function (b) {
        a._super.handleNavigateSection.apply(this, arguments);
      },
      _calculatePartsOfSection: function () {
        var a = window.guideBridge.userConfig;
        if (
          a &&
          a.calculatePartsOfSectionConfig &&
          c.isFunction(
            a.calculatePartsOfSectionConfig.calculatePartsOfSectionHandler,
          )
        )
          (a = (0,
          a.calculatePartsOfSectionConfig.calculatePartsOfSectionHandler)(
            this._model,
          )),
            this._updatePartsFromArray(a);
        else {
          var e = f.runtime.progressive;
          a = d(e.PROGRESSIVE_CONSTANTS.PDC_SELECTOR);
          var g = a.find(
            e.PROGRESSIVE_CONSTANTS.PDC_SECTION_REPEATABLE_CONTROLS_SELECTOR,
          );
          g.find(".hidden").removeClass("hidden");
          var k = this.$element.find(
              e.PROGRESSIVE_CONSTANTS.PDC_SECTION_FIELD_CONTAINER_SELECTOR,
            ),
            h = a.outerHeight(),
            l = a
              .find(e.PROGRESSIVE_CONSTANTS.PDC_TITLE_SELECTOR)
              .outerHeight();
          g.outerHeight(!0) && g.outerHeight(!0);
          var m =
            this.$element
              .find(
                e.PROGRESSIVE_CONSTANTS.PDC_SECTION_TITLE_CONTAINER_SELECTOR,
              )
              .outerHeight(!0) || 0;
          a = this.$element.find(".progressiveSectionField");
          g.find("[data-guide-repeatable\x3d'back']").addClass("hidden");
          g.outerHeight(!0) ? g.outerHeight(!0) + e.heightBuffer : 0;
          k.css(
            "max-height",
            h - l - m - 1.5 * f.runtime.progressive.heightBuffer + "px",
          );
          k.css("overflow", "auto");
          for (g = 0; g < a.length; g++)
            (e = d(a[g]).children("div").first().attr("id")),
              this._updateParts(0, e);
        }
      },
      handleSummaryChanged: function () {
        if (0 < this.$summary.length) {
          var a = this._model.instance;
          null == a &&
            (a = window.guideBridge._resolveId(
              "im_" + this._model.repeatablePanelId,
            ).instances[0]);
          if (a.summary) this.$summary.text(a.summary);
          else {
            var c = a.title || a.name;
            this._model.instanceIndex &&
              a.repeatable &&
              (c += " " + this._model.instanceIndex);
            this.$summary.text(c);
          }
        }
      },
      handleModelChanged: function (b) {
        switch (b._property) {
          case "summary":
            this.handleSummaryChanged();
            break;
          default:
            a._super.handleModelChanged.apply(this, arguments);
        }
      },
    }));
  a.defineProps({
    $summary: {
      get: function () {
        this._$summary || (this._$summary = this._find(this._summarySelector));
        return this._$summary;
      },
    },
  });
})($, _, guidelib);
(function (d, c) {
  var f = (c.view.GuideAdModuleGroupView = c.view.GuideItemsView.extend({
    initialize: function () {
      f._super.initialize.call(this);
      if (this._model)
        this._model.on(
          c.event.GuideModelEvent.VALUE_CHANGED,
          this.handleValueChanged,
          this,
        );
    },
    postInitialize: function () {
      this._model.value || "" === this._model.value
        ? this._syncGuideNodeToHtml(!0)
        : f._super.postInitialize.call(this);
    },
    handleValueChanged: function (a) {
      switch (a._property) {
        case "value":
          this.$element.html(a.newText);
      }
    },
    _syncGuideNodeToHtml: function (a) {
      this._model.value || "" === this._model.value
        ? this.$element
            .html(this._model.value)
            .find("img")
            .attr("src", function (a, c) {
              return Granite.HTTP.externalize(c);
            })
        : f._super._syncGuideNodeToHtml.call(this, a);
    },
    setActive: function (a, b, e) {
      c.view.GuideAdModuleGroupView._super.setActive.call(this, a, b, e);
      b &&
        (this.$element && this.$element.focus(),
        (this._guideView.currentFocusItemSom = this._model.somExpression));
      return !0;
    },
  }));
})($, guidelib);
(function (d, c, f) {
  var a = (f.view.GuidePanelView = f.view.GuideItemsView.extend({
    initialize: function () {
      a._super.initialize.call(this);
      this._$title =
        this._$summary =
        this._$itemsNavContainer =
        this._$itemsContainer =
        this._currentActiveItemView =
          null;
      this._childInitializeWaiting = !0;
      this._model.on(
        f.event.GuideModelEvent.CHILD_CHANGED,
        this.handleChildChanged,
        this,
      );
      this._model.on(
        f.event.GuideModelEvent.MULTIPLE_CHILD_ADDED,
        this.multipleChildAdded,
        this,
      );
      this._summarySelector = this.guideUtil.summarySelector(this._model.id);
      this._titleSelector = this.guideUtil.propSelector(
        "title",
        this._model.id,
      );
    },
    addRemoveTemplateMarker: function () {
      c.each(
        this._model.children,
        function (a) {
          if (a instanceof f.model.GuideInstanceManager) {
            var b = (a._instances[0] || {}).id || a.instanceTemplateId,
              c =
                '\x3cdiv id\x3d"' +
                a.id +
                '" style\x3d"display: none" data-guide-template-marker\x3d"true"\x3e\x3c/div\x3e',
              k = this.guideUtil.itemSelector(b, a);
            b = this.guideUtil.itemNavSelector(b);
            this.$itemsContainer.find(k).before(c);
            this.$itemsNavContainer.find(b).before(c);
            a._instances &&
              0 === a._instances.length &&
              (d(b, this.$element).remove(), d(k, this.$element).remove());
          }
        },
        this,
      );
    },
    postInitialize: function () {
      this.handleSummaryChanged();
      this.handleTitleChanged();
      this._model.repeatable && this._toggleAddRemoveButtons();
      this.parentView._model.enableLayoutOptimization
        ? this.handleVisibleChanged(
            f.event.GuideModelEvent.createEvent(
              f.event.GuideModelEvent.MODEL_CHANGED,
              this,
              "visible",
              this._model.visible,
              this._model.visible,
            ),
          )
        : this._postInitializeChildren();
      this.addRemoveTemplateMarker();
    },
    _postInitializeChildren: function () {
      this._childInitializeWaiting = !1;
      this._syncGuideNodeToHtml(!0);
      this.handleAccessibility();
      this.parentView.$itemsNavContainer &&
        0 ===
          this.parentView.$itemsNavContainer.filter(
            ":not(.tab-navigators-mobile)",
          ).length &&
        this.setActive("firstItem", !1, !0);
    },
    _syncGuideNodeToHtml: function (a, e) {
      if (!this._childInitializeWaiting) {
        var b = this,
          k = this._guideView._domTemplateCacheStore,
          h = {},
          l = {},
          m = {};
        c.each(
          this.childViews,
          function (a) {
            a.isItem ? (h[a.id] = a) : (l[a.id] = a);
          },
          this,
        );
        c.each(
          this._model.items,
          function (d) {
            var g = d.templateId,
              l = d.id;
            var p = this._find(this.guideUtil.itemSelector(l, d));
            var v = this._find(this.guideUtil.itemNavSelector(l));
            p.length ||
              m[g] ||
              0 === e ||
              ((p = this.$itemsContainer.find(
                this.guideUtil.itemSelector(g, d),
              )),
              (v = this.$itemsNavContainer.find(
                this.guideUtil.itemNavSelector(g),
              )));
            if (
              !p.length &&
              ((p = k.cloneDomElement(this.guideUtil.itemSelector(g, d))),
              (v = k.cloneDomElement(this.guideUtil.itemNavSelector(g))),
              !p.length)
            ) {
              this.logger().error(
                "AF",
                "Html template could not be found. cTemplateId:" +
                  g +
                  ", som:" +
                  d.somExpression,
              );
              return;
            }
            this._updateIds(p, g, l);
            this._updateIds(v, g, l);
            p.attr("data-guide-parent-id", this._model.id);
            v.attr("data-guide-parent-id", this._model.id);
            d = null;
            h.hasOwnProperty(l)
              ? ((d = h[l]),
                d instanceof f.view.GuidePanelView &&
                  d._model.instanceManager.repeatable &&
                  !c.isUndefined(b._model.bindNode) &&
                  this._fixChildDom(d),
                a && d._syncGuideNodeToHtml(a))
              : ((g = this._find("#" + l)),
                g.length
                  ? (d = this._createChild(g))
                  : ((g = p.find("#" + l).addBack("#" + l)),
                    g.length
                      ? (d = this._createChild(g, p, v))
                      : this.logger().debug(
                          "AF",
                          "Skip creating view. could not find el for id:" + l,
                        )),
                this._model.repeatable &&
                  f.util.GuideUtil._initializeShortDescription(g));
            d && (m[l] = d);
          },
          this,
        );
        this.$itemsContainer
          .find('[data-guide-parent-id\x3d"' + b._model.id + '"]')
          .each(function () {
            var a = d(this),
              c = a.attr("id");
            -1 === c.indexOf(b.guideUtil.GUIDE_ITEM_SUFFIX) &&
              (c = a.attr(b.guideUtil.DATA_GUIDE_ITEM));
            var e = c.substring(
              0,
              c.length - b.guideUtil.GUIDE_ITEM_SUFFIX.length,
            );
            m.hasOwnProperty(e) ||
              window.guideBridge._resolveId(e) ||
              (b
                .logger()
                .log(
                  "guideView",
                  5,
                  "removing element as no corresponding form dom node found. id:" +
                    c +
                    ", parent id:" +
                    b.id,
                ),
              a.remove(),
              b._find(b.guideUtil.itemNavSelector(e)).remove());
          });
        this.childViews = [];
        c.each(
          this._model.children,
          function (b) {
            var c = b._isItem,
              e = b.id;
            c && m.hasOwnProperty(e)
              ? this.childViews.push(m[e])
              : !c &&
                (b = l.hasOwnProperty(e)
                  ? l[e]
                  : this._createNonRepeatChildView(b)) &&
                (a && b._syncGuideNodeToHtml(a), this.childViews.push(b));
          },
          this,
        );
        f.view.GuideBaseView.prototype._syncGuideNodeToHtml.apply(
          this,
          arguments,
        );
      }
    },
    _createChild: function (a, c, d) {
      a = f.view.GuideViewRegistry.prototype.createView(a, this);
      this._fixChildDom(a, c, d);
      a.postInitialize();
      return a;
    },
    _fixChildDom: function (a, c, g) {
      var b = a._model;
      if (b instanceof f.model.GuidePanel && b.repeatable) {
        var e = c || a.$item,
          l = g || a.$itemNav;
        a = this._model.children;
        var m = (a = 0 < b.instanceIndex ? a[a.indexOf(b) - 1].id : null)
            ? this.guideUtil.itemSelector(a, b)
            : "#" + b.instanceManager.id,
          p = a
            ? this.guideUtil.itemNavSelector(a)
            : "#" + b.instanceManager.id;
        this.$itemsContainer.each(function (a) {
          a = e.get(a) || e.get(0);
          var c = d(this).find(m);
          0 == c.length &&
            ((m =
              "[data-guide-template-marker\x3d" + b.instanceManager.id + "]"),
            (c = d(this).find(m)),
            0 === b.instanceIndex &&
              0 < c.length &&
              (c.removeAttr("data-guide-template-marker"),
              d(a).attr("data-guide-template-marker", b.instanceManager.id)));
          c.get(0) !== a && c.after(d(a));
        });
        this.$itemsNavContainer.each(function (a) {
          a = l.get(a) || l.get(0);
          d(this).find(p).after(d(a));
        });
      }
    },
    multipleChildAdded: function (a) {
      a.jsonModel.newText &&
        0 < a.jsonModel.newText.length &&
        (this._syncGuideNodeToHtml(!0),
        this.childViews.forEach(function (a) {
          a._model.repeatable && a._toggleAddRemoveButtons();
        }));
    },
    handleChildChanged: function (a) {
      var b = null,
        c = -1;
      if ("childRemoved" == a._property)
        var d = this.$element.find("#" + a.prevText.id),
          f = d.index();
      "childAdded" == a._property && ((b = a.newText), (c = b.instanceIndex));
      this._syncGuideNodeToHtml(!0, c);
      this.childViews.forEach(function (a) {
        a._model.repeatable && a._toggleAddRemoveButtons();
      });
      "childRemoved" == a._property &&
        (this.$element.trigger("panelRemoved.af", [d, f]),
        this.currentActiveItemView &&
          a.prevText == this.currentActiveItemView._model &&
          ((this._currentActiveItemView = null), this.setActive("nextItem")));
      null != b &&
        this.$element.trigger("panelAdded.af", [
          this.$element.find("#" + b.id),
        ]);
    },
    handleSummaryChanged: function () {
      if (0 < this.$summary.length)
        if (this._model.summary) this.$summary.text(this._model.summary);
        else {
          var a = this._model.title;
          this._model.instanceIndex &&
            this._model.repeatable &&
            (a += " " + this._model.instanceIndex);
          this.$summary.text(a);
        }
    },
    handleTitleChanged: function () {
      0 < this.$title.length && this.$title.text(this._model.title);
      d("#" + this.id + "_guide-item").hasClass("active") &&
        d("[data-target-guide-content]").text(this._model.title);
    },
    handleModelChanged: function (b) {
      switch (b._property) {
        case "summary":
          this.handleSummaryChanged();
          break;
        case "title":
          this.handleTitleChanged();
          break;
        default:
          a._super.handleModelChanged.apply(this, arguments);
      }
    },
    _createReferredView: function () {
      this._postInitializeChildren();
    },
    _loadLazyFragment: function () {
      var a = this;
      this._model._guide().internal.liveDataUtils.updateLiveData();
      this._guideView._clearInactiveLazyViews(this);
      this._viewCreationInProgress = !0;
      this._model._loadLazyFragment({
        preFetch: function () {
          d("#loadingPage").addClass("guideLoading");
        },
        postFetch: function () {
          d("#loadingPage").removeClass("guideLoading");
        },
        success: function () {
          a._createReferredView();
          a._viewCreationInProgress = void 0;
          a._itemsLoaded = !0;
        },
      });
    },
    setActive: function (a, e, d) {
      this._model._lazyReference &&
        c.isUndefined(this._viewCreationInProgress) &&
        c.isUndefined(this._itemsLoaded) &&
        this._guideView._currentActiveItemView !== this &&
        this._loadLazyFragment();
      var b = this.getOrElse(this.currentActiveItemView, "qualifiedName", null);
      a = a || b || "firstItem";
      if (a != b) {
        var f = this._model.navigationContext.getItemForNav(a);
        if (!f)
          return (
            this.logger().log(
              "AF",
              "activeItemToken not found:" +
                a +
                ",currentActiveItem:" +
                b +
                ":" +
                this._model.somExpression,
            ),
            !1
          );
        a = this.getQualifiedNamedView(f._escapeQualifiedName());
        if (
          !d &&
          this._model.completionExpReq &&
          this.currentActiveItemView &&
          this.currentActiveItemView.focusable() &&
          this.childViews.indexOf(a) >
            this.childViews.indexOf(this.currentActiveItemView)
        ) {
          b = !0;
          this._model.getAttribute("validateOnStepCompletion") &&
            (b = window.guideBridge.validate(
              [],
              this._model.panel.navigationContext.currentItem.somExpression,
            ));
          b = b && this._model.executeExpression("completionExp");
          if (!b) return !1;
          this.currentActiveItemView &&
            (this.currentActiveItemView.$item.addClass("completed"),
            this.currentActiveItemView.$itemNav.addClass("completed"));
        }
        this.currentActiveItemView = a;
      }
      this.currentActiveItemView &&
        this.currentActiveItemView.setActive(null, e, d);
      return !0;
    },
    _clearInactiveLazyViews: function (a) {
      c.each(
        this.childViews,
        function (b) {
          b &&
            "guidePanel" === b._model.className &&
            b._ancestorHasNavigableLayout &&
            (b._model._itemsLoaded &&
            !a._isSelfOrAncestor(b) &&
            !b._hasEffectiveActiveClass() &&
            b._model._lazyReference
              ? (b._model._unloadLazyReferenceModel(),
                b._unloadView(),
                (b._itemsLoaded = void 0),
                (b._model._itemsLoaded = void 0))
              : b._clearInactiveLazyViews(a));
        },
        this,
      );
    },
    _isSelfOrAncestor: function (a) {
      for (
        var b = this;
        !c.isUndefined(b) && "rootPanelNode" !== b._model.className;

      ) {
        if (a === b) return !0;
        b = b.parentView;
      }
      return !1;
    },
    _hasEffectiveActiveClass: function () {
      for (
        var a = this;
        !c.isUndefined(a) && "rootPanelNode" !== this._model.className;

      )
        if (a.$item.hasClass("active")) a = a.parentView;
        else return !1;
      return !0;
    },
    handleAccessibility: function () {
      var a = this._model._getScreenReaderText();
      this._model._getRole();
      a && this.$itemNav.attr("aria-label", a);
      this.$itemNav.find("a").attr("tabindex", function (a, b) {
        return -1 == b ? b : 0;
      });
    },
    getQualifiedNamedView: function (a) {
      return c.find(
        this.childViews,
        function (b) {
          return b._model._escapeQualifiedName() == a;
        },
        this,
      );
    },
    _toggleAddRemoveButtons: function () {
      var a = this._model,
        c = a.instanceManager;
      d(
        '[data-guide-id\x3d"' + a.id + '"][data-guide-addremove\x3d"remove"]',
      ).toggleClass("hidden", c.instanceCount == c.minOccur);
      d(
        '[data-guide-id\x3d"' + a.id + '"][data-guide-addremove\x3d"add"]',
      ).toggleClass("hidden", c.instanceCount == c.maxOccur);
    },
  }));
  a.defineProps({
    hasNavigableLayout: {
      get: function () {
        return 0 < this.$itemsNavContainer.length;
      },
    },
    $itemsContainer: {
      get: function () {
        if (
          this._model._selfOrAncestorIsLazyReference ||
          !this._$itemsContainer ||
          0 === this._$itemsContainer.length
        )
          (this._$itemsContainer = this._find(
            this.guideUtil.itemContainerSelector(this._model.id),
          )),
            0 === this._$itemsContainer.length &&
              (this._$itemsContainer = this._find(
                this.guideUtil.alternateItemContainerSelector(this._model.id),
              ));
        return this._$itemsContainer;
      },
    },
    $itemsNavContainer: {
      get: function () {
        if (
          this._model._selfOrAncestorIsLazyReference ||
          !this._$itemsNavContainer ||
          0 === this._$itemsNavContainer.length
        )
          this._$itemsNavContainer = this._find(
            this.guideUtil.itemNavContainerSelector(this._model.id),
          );
        return this._$itemsNavContainer;
      },
    },
    $summary: {
      get: function () {
        this._$summary || (this._$summary = this._find(this._summarySelector));
        return this._$summary;
      },
    },
    $title: {
      get: function () {
        this._$title || (this._$title = this._find(this._titleSelector));
        return this._$title;
      },
    },
    currentActiveItemView: {
      get: function () {
        return this._currentActiveItemView;
      },
      set: function (a) {
        if (a != this._currentActiveItemView) {
          this._currentActiveItemView &&
            (this._currentActiveItemView._model.viewVisited = !0);
          if (!a) {
            var b = this._model.navigationContext.firstItem;
            b && (a = this.getQualifiedNamedView(b._escapeQualifiedName()));
          }
          this._currentActiveItemView = a;
          this._model.navigationContext.currentItem = (
            this._currentActiveItemView || {}
          )._model;
          c.each(
            this.childViews,
            function (a) {
              a == this._currentActiveItemView
                ? (a.$item.addClass("active"),
                  a.$itemNav.addClass("active"),
                  a.$itemNav.attr("aria-selected", !0),
                  a.$itemNav.attr("aria-disabled", !1),
                  a.$itemNav.removeClass("wizard-tab-disabled"))
                : (a.$item.removeClass("active"),
                  a.$itemNav.removeClass("active"),
                  a.$itemNav.attr("aria-selected", !1));
            },
            this,
          );
          this._currentActiveItemView instanceof f.view.GuidePanelView &&
            this._currentActiveItemView._childInitializeWaiting &&
            this._currentActiveItemView._postInitializeChildren();
          if (c.isUndefined(this._model._ajaxCallDone)) {
            for (a = this._model; a && !(a instanceof f.model.RootPanelNode); )
              a.toolbar && a.toolbar.execNavigationChangeExpression(),
                (a = a.parent);
            a &&
              a.toolbar &&
              a instanceof f.model.RootPanelNode &&
              a.toolbar.execNavigationChangeExpression();
          }
        }
      },
    },
    _ancestorHasNavigableLayout: {
      get: function () {
        for (var a = this.parentView; a; ) {
          if (a.$itemsNavContainer && 0 < a.$itemsNavContainer.length)
            return !0;
          a = a.parentView;
        }
        return !1;
      },
    },
  });
})($, _, guidelib);
(function (d, c, f) {
  var a = 0,
    b = (f.view.GuideTableView = f.view.GuidePanelView.extend({
      TABLE_WIDTH_BUFFER: 23,
      _getPluginOptions: function () {
        var a = { bAutoWidth: this.bAutoWidth },
          b = null,
          d = 0,
          f = null,
          l = this.$tableElement.find("th").length;
        !1 === this.bAutoWidth &&
          ((b = this._model.columnWidth.split(",")),
          b.length === l &&
            (c.each(b, function (a) {
              d += parseInt(a, 10);
            }),
            (f = c.map(b, function (a) {
              return { pWidth: Math.floor((100 * a) / d) };
            }))),
          (a = c.extend({}, a, { aWidthPercentage: f, aWidth: b })));
        return a;
      },
      setAutoWidth: function () {
        this.bAutoWidth =
          this._model.columnWidth && 0 < this._model.columnWidth.length
            ? !1
            : !0;
      },
      createView: function (b) {
        var c = this._guideView._domTemplateCacheStore.cloneDomElement("#" + b),
          e = "#" + b + "_widget",
          d = ++a;
        0 == c.length && (c = this.$element.find("#" + b).clone());
        c.find(e).attr("id", b + "_widget" + d);
        f.view.GuideViewRegistry.prototype.createView(c, this).postInitialize();
        return c;
      },
      initializeTableColumnWidth: function (a) {
        if (
          0 == this.bAutoWidth &&
          "headersLeft" === this._model.mobileLayout
        ) {
          this.$tableElement.css("table-layout", "fixed");
          var b = a.aWidthPercentage;
          a = this.$tableElement.find("th").length;
          b &&
            b.length == a &&
            this.$tableElement.find("th").each(function (a) {
              d(this).width(b[a].pWidth + "%");
            });
        }
      },
      _checkIfTableSortingEnabled: function () {
        return "true" === this._model.jsonModel.sortingEnabled;
      },
      handleParentVisibleChanged: function (a) {
        switch (a._property) {
          case "visible":
            this.handleVisibleChanged(a);
        }
      },
      _checkParentModelChanged: function () {
        for (var a = this.parentView; null != a; )
          a._model.on(
            f.event.GuideModelEvent.MODEL_CHANGED,
            this.handleParentVisibleChanged,
            this,
          ),
            (a = a.parentView);
      },
      initialize: function () {
        b._super.initialize.apply(this, arguments);
        this._checkParentModelChanged();
        this.$tableElement = this.$element.find("\x3e table");
        this.setAutoWidth();
        var a = this._getPluginOptions(),
          f = this;
        this.initializeTableColumnWidth(a);
        this._fixTableControls(!0);
        if ("collapsibleColumns" === this._model.mobileLayout)
          (a = c.extend({}, a, {
            bControlRowHiddenCells: !1,
            bDisableControlRowCells: !0,
            viewCallback: d.proxy(this.createView, this),
            tableRuntimeEditControlClass: "guideTableRuntimeEditControl",
            fixTableControls: d.proxy(this._fixTableControls, this),
          })),
            (this.jqwidget = this.$tableElement
              .responsiveTablePlugin(a)
              .data("responsiveTablePlugin"));
        else
          d(window).on("resize orientationchange", function (a) {
            f._fixTableControls(a);
          });
        this._checkIfTableSortingEnabled() &&
          ((this.$tableElement.tableSorting = this.guideTableSorter.initialize),
          this.$tableElement.tableSorting({
            model: this._model,
            tableContext: this,
          }));
      },
      handleVisibleChanged: function (a) {
        b._super.handleVisibleChanged.apply(this, arguments);
        this.handleTableShown();
      },
      handleTableShown: function () {
        "collapsibleColumns" === this._model.mobileLayout &&
          (this.jqwidget._initializeColumnVisibility(),
          this.jqwidget.isColumnHidden() &&
            (this.$tableElement
              .find(".guideFieldNode")
              .addClass("dontSyncEnabled"),
            this.$tableElement
              .find("input, select, textarea, button")
              .attr("disabled", "disabled")));
      },
      _resetTableCellWidth: function () {
        var a = this,
          b = this.TABLE_WIDTH_BUFFER;
        this.$tableElement.find(".guideTableRuntimeControls").each(function () {
          var c = this;
          setTimeout(function () {
            a._resetTableCell(d(c), b);
          }, 1);
        });
      },
      _resetTableCell: function (a, b) {
        if (a.hasClass("guideTableRuntimeRightControls")) {
          var c = a.prev(),
            e = a.parent();
          a.is(":visible")
            ? (c.css("display", "inline-block"),
              c.css("float", "left"),
              (b = e.width() - a.outerWidth() - b),
              (e = (b / e.width()) * 100),
              c.width(e + "%"))
            : (c.css("display", "block"),
              c.css("float", "none"),
              c.width(e.width()));
        } else
          a.hasClass("guideTableRuntimeLeftControls") &&
            (a.is(":visible")
              ? (a.next().css("display", "inline-block"),
                (b = a.parent().width() - a.outerWidth() - b),
                (e = (b / a.parent().width()) * 100),
                a.next().width(e + "%"))
              : a.next().css("display", "block"));
      },
      _fixTableControls: function (a) {
        "collapsibleColumns" === this._model.mobileLayout &&
          this.jqwidget &&
          (this.jqwidget.isColumnHidden()
            ? (this.$tableElement
                .find("tr:not(.child)")
                .find(".guideFieldNode")
                .addClass("dontSyncEnabled"),
              this.$tableElement
                .find("tr:not(.child)")
                .find("input, select, textarea, button")
                .attr("disabled", "disabled"))
            : (this.$tableElement
                .find(".guideFieldNode")
                .removeClass("dontSyncEnabled"),
              this.$tableElement
                .find("input, select, textarea, button")
                .removeAttr("disabled")));
        a && this._resetTableCellWidth();
      },
      _fixChildDom: function (a, c, d) {
        b._super._fixChildDom.apply(this, arguments);
        "collapsibleColumns" === this._model.mobileLayout &&
          this.jqwidget._fixControlRows();
        this._fixTableControls();
        this._resetTableCellWidth();
      },
      _postInitializeChildren: function () {
        b._super._postInitializeChildren.call(this);
        "collapsibleColumns" === this._model.mobileLayout
          ? this.handleTableShown()
          : "headersLeft" === this._model.mobileLayout &&
            this._fixTableCellForHeaderLeftLayout();
        this._resetTableCellWidth();
      },
      _fixTableCellForHeaderLeftLayout: function () {
        var a = this,
          b = f.util.GuideUtil;
        this.$tableElement.find("tr td").each(function () {
          b._setGuideDataHeader(d(this), a.$tableElement);
        });
      },
      handleChildChanged: function (a) {
        b._super.handleChildChanged.apply(this, arguments);
        "headersLeft" === this._model.mobileLayout &&
          this._fixTableCellForHeaderLeftLayout();
        "childAdded" == a._property && this._resetTableCellWidth();
      },
      addRemoveTemplateMarker: function () {
        c.each(
          this._model.children,
          function (a) {
            if (a instanceof f.model.GuideInstanceManager) {
              var b = a.id,
                c = (a._instances[0] || {}).id || a.instanceTemplateId;
              a = this.guideUtil.itemSelector(c, a._instances[0]);
              this.guideUtil.itemNavSelector(c);
              c = this.$itemsContainer.find(a);
              c.is("tr") && c.attr("data-guide-template-marker", b);
            }
          },
          this,
        );
      },
      tableSortComparator: {
        DATE: function (a, b, c) {
          return a.sort(function (a, e) {
            var d = b[0][0],
              f = b[0][1],
              g = c.guideTableSorter;
            a = g.formatDateValue(g.getValueFromJsonModel(a, d));
            e = g.formatDateValue(g.getValueFromJsonModel(e, d));
            return g.ComparedOrder(a, e, f);
          });
        },
        NUMBER: function (a, b, c) {
          return a.sort(function (a, e) {
            var d = b[0][0],
              f = b[0][1],
              g = c.guideTableSorter;
            a = g.formatRegexFloatData(g.getValueFromJsonModel(a, d));
            e = g.formatRegexFloatData(g.getValueFromJsonModel(e, d));
            return g.ComparedOrder(a, e, f);
          });
        },
        STRING: function (a, b, c) {
          return a.sort(function (a, e) {
            var d = b[0][0],
              f = b[0][1],
              g = c.guideTableSorter;
            a = g.formatRichTextString(g.getValueFromJsonModel(a, d, !0));
            e = g.formatRichTextString(g.getValueFromJsonModel(e, d, !0));
            return g.ComparedOrder(a, e, f);
          });
        },
      },
      guideTableSorter: new (function () {
        function a(a, b) {
          b = d(a.selectorsHeaders, b).each(function (a) {
            this.column = a;
            this.order = 1;
          });
          for (var c = 0; c < a.tableHeader.children.length; c++) {
            var e = a.tableHeader.children[c];
            b[c].sortingAllowed = !0;
            var f = e.jsonModel.sortingDataType;
            f = f ? f : "STRING";
            e.jsonModel.sortingDataType = f;
            (a.tableHeader.visible && "noSort" !== f) ||
              ((b[c].sortingAllowed = !1),
              d(b[c]).removeClass("sortEnabled"),
              d(b[c]).find(".sortingButton").remove());
          }
          return b;
        }
        function b(a, b, e, d) {
          0 < ((b[0].tBodies[0] && b[0].tBodies[0].rows.length) || 0) &&
            ((a.order = ++a.order % 2),
            (e.sortList = []),
            e.sortList.push([a.column, a.order]),
            setTimeout(function () {
              c(d, e.sortList, e);
              var a = e.sortList,
                b = e.model,
                g,
                k = 0,
                l = b.children,
                p = [],
                t = [],
                q = e.tableContext;
              for (g = 0; g < l.length; g++)
                "guideInstanceManager" !== l[g].className &&
                  h(l[g]) &&
                  p.push(l[g]);
              p = q.tableSortComparator[
                e.tableHeader.children[[a[0][0]]].jsonModel.sortingDataType
              ].call(e, p, a, q);
              for (g = 0; g < b.children.length; g++)
                h(b.children[g]) ? (t.push(p[k]), k++) : t.push(b.children[g]);
              b.children = t;
              b._triggerEvent(
                f.event.GuideModelEvent.MODEL_CHANGED,
                "tableModelSorted",
                b,
                b,
              );
              m(e.tableContext, b);
            }, 1));
        }
        function c(a, b, c) {
          var e,
            f = [c.headerCss.asc, c.headerCss.desc, c.headerCss.random];
          a.each(function (g) {
            var k = d(this).find(".sortingButton");
            k.removeClass(f[0]).removeClass(f[1]).removeClass(f[2]);
            a[g].sortingAllowed &&
              (g === b[0][0]
                ? ((e = b[0][1]), k.addClass(f[e]))
                : k.addClass(c.headerCss.random));
          });
        }
        function h(a) {
          var b = a.options.jsonModel["sling:resourceType"];
          return !(
            "guideInstanceManager" === a.className ||
            "fd/af/components/tableHeader" === b ||
            "fd/ccm/web-channel/components/tableHeader/v1/tableHeader" === b
          );
        }
        function l(a) {
          a = a.options.jsonModel["sling:resourceType"];
          return (
            "fd/af/components/tableHeader" === a ||
            "fd/ccm/web-channel/components/tableHeader/v1/tableHeader" === a
          );
        }
        function m(a, b) {
          var c = {},
            e;
          for (e = 0; e < a.childViews.length; e++) {
            var f = a.childViews[e];
            f.isItem && (c[f.id] = f);
          }
          for (e = 1; e < a._model.items.length; e++) {
            f = c[a._model.items[e].id];
            var g = f._model,
              k = f.$item;
            if (1 === e) {
              if (2 < b.items.length) var h = b.items[e + 1].id;
            } else var l = b.items[e - 1].id;
            var m = l
                ? a.guideUtil.itemSelector(l, g)
                : "#" + g.instanceManager.id,
              p = h
                ? a.guideUtil.itemSelector(h, g)
                : "#" + g.instanceManager.id;
            a.$itemsContainer.each(function (a) {
              a = k.get(a) || k.get(0);
              var b = d(this).find(m);
              b.get(0) !== a
                ? b.after(d(a))
                : ((b = d(this).find(p)), b.before(d(a)));
            });
          }
        }
        this.initialize = function (c) {
          return this.each(function () {
            this.tableConfig = {};
            if (this.tHead && this.tBodies) {
              var e = d(this),
                g = {};
              g = d.extend(
                this.tableConfig,
                {
                  sortList: [],
                  selectorsHeaders: "thead th",
                  headerCss: { asc: "asc", desc: "desc", random: "random" },
                },
                c,
              );
              var k,
                h = g.model;
              for (k = 0; k < h.children.length; k++)
                if (l(h.children[k])) {
                  k = h.children[k];
                  g.tableHeader = k;
                  break;
                }
              var m = a(g, this);
              m.click(function () {
                this.sortingAllowed && b(this, e, g, m);
              });
              m.each(function (a) {
                if (this.sortingAllowed)
                  return (
                    "undefined" !== typeof h._guide &&
                      h._guide() &&
                      ((a =
                        (a = f.util.GuideUtil._fetchJSONNodeValue(
                          h._guide().runtime.guideContext.guidePrefillJson,
                          "afSubmissionInfo",
                        )) ||
                        f.util.GuideUtil.fetchXMLNodeValue(
                          h._guide().runtime.guideContext.guidePrefillXml,
                          "afSubmissionInfo",
                        )) ||
                        d(this).trigger("click")),
                    !1
                  );
              });
            }
          });
        };
        this.formatRegexFloatData = function (a) {
          return isNaN(parseFloat(a)) ? 0 : parseFloat(a);
        };
        this.formatDateValue = function (a) {
          return isNaN(new Date(a).getTime()) ? 0 : new Date(a).getTime();
        };
        this.formatRichTextString = function (a) {
          return d("\x3cdiv\x3e" + a + "\x3c/div\x3e")
            .text()
            .trim();
        };
        this.ComparedOrder = function (a, b, c) {
          return a > b ? (0 === c ? 1 : -1) : a < b ? (0 === c ? -1 : 1) : -1;
        };
        this.getValueFromJsonModel = function (a, b, c) {
          for (var e = a.children, d = b, f = 0; 0 < b; )
            "guideInstanceManager" === a.children[f].jsonModel.guideNodeClass
              ? d++
              : b--,
              f++;
          a = e[d].jsonModel;
          e = null;
          !c &&
            a.defaultValue &&
            1 === a.defaultValue.length &&
            (e = a.defaultValue[0]);
          e || (e = a._value);
          return null === e ? "" : this.formatRichTextString(e);
        };
      })(),
    }));
})($, _, guidelib);
(function (d, c) {
  c.view.GuideTableRowView = c.view.GuidePanelView.extend({
    handleChildChanged: function (c) {},
  });
})($, guidelib);
(function (d, c, f) {
  var a = (c.view.GuideContainerView = c.view.GuideItemsView.extend({
    initialize: function () {
      this._queueViewForLazyItems = [];
      window.guideBridge._guideView = this;
      var b = d(this.options.element).clone();
      this._domTemplateCacheStore = new c.view.util.DomTemplateCacheStore({
        $htmlTemplateDom: b,
      });
      this._lastFocussedPanelForNonActionFields = null;
      a._super.initialize.call(this);
      this._currentFocusItemSom = null;
      this._previousFocusItemSom = "FIRST_TIME";
      d(window).on("keydown.guides", d.proxy(this.hotKeys, this));
      this.postInitialize();
      this._model.on(
        c.event.GuideModelEvent.MODEL_REFRESH,
        function (a) {
          switch (a._property) {
            case "jsonModel":
              this._syncGuideNodeToHtml(!0);
              break;
            default:
              this._model
                .logger()
                .error("unexpected event property " + a._property);
          }
        },
        this,
      );
    },
    _reInitializeGuideContainerDom: function () {
      this.$element = d("div.guideContainerWrapperNode");
    },
    setFocus: function (a, e, d) {
      if (f.isObject(a)) {
        var b = a.somExpression;
        e = a.focusOption;
        a = a.runCompletionScript;
      } else (b = a), (a = d);
      var g = !a;
      if ("nextItemDeep" == e || "prevItemDeep" == e) {
        if (b)
          return (
            this.logger().warn(
              "AF",
              "somExpression is currently not supported for deepNavigation:" +
                b +
                ":" +
                e,
            ),
            !1
          );
        a = this.getSomOnNavigableAncestor(
          this._lastFocussedPanelForNonActionFields,
        );
        a = this.getView(a);
        for (
          d = "nextItemDeep" == e ? "nextItem" : "prevItem";
          a && a.parentView != this && !a.getSiblingItemView(d);

        )
          (a = this.getSomOnNavigableAncestor(
            a.parentView._model.somExpression,
          )),
            (a = this.getView(a));
        if (a && a.parentView != this && a.getSiblingItemView(d)) {
          if (!a.parentView.setActive(d, !1, g))
            return (
              this.logger().log(
                "AF",
                "could not setActive for the deepNav:" + a._model.somExpression,
              ),
              !1
            );
          e = "nextItem" == d ? "firstItem" : "lastItem";
          for (a = a.parentView.currentActiveItemView; a; )
            a.setActive(e, !a.currentActiveItemView, !0),
              (a = a.currentActiveItemView);
          return !0;
        }
        this.logger().warn(
          "AF",
          "could not locate view for given somExpression:" + b + ":" + e,
        );
        return !1;
      }
      b || (b = this.guideModel.rootPanel.somExpression);
      var l = this.rootPanelView;
      if (l) {
        if (
          (a = this.guideUtil.relativeSom(
            this.guideModel.rootPanel.somExpression,
            b,
          ))
        )
          if (
            ((a = a.split(".")),
            f.find(
              a,
              function (a) {
                l.setActive(a, !1, g);
                if (
                  l instanceof c.view.GuidePanelView &&
                  (null == l.currentActiveItemView ||
                    l.currentActiveItemView.qualifiedName != a)
                )
                  return (
                    this.logger().log(
                      "AF",
                      "could not find token:" + a + ", som:" + b,
                    ),
                    !0
                  );
                null != l.currentActiveItemView &&
                  (l = l.currentActiveItemView);
              },
              this,
            ))
          )
            return !1;
      } else
        (a = this._getGuideDomElement(b)) &&
          0 < a.length &&
          (l = a.data("guideView"));
      return l ? l.setActive(e, !0, g) : !1;
    },
    _getGuideDomElement: function (a, c) {
      if (a && "string" === typeof a && (a = this.guideModel.resolveNode(a))) {
        var b = "#" + a.id;
        "nav" === c && (b = this.guideUtil.itemNavSelector(a.id));
        return (c = this.$element.find(b));
      }
    },
    getView: function (a) {
      if (!a) return null;
      var b = this._getGuideDomElement(a),
        d = null,
        k = null;
      return b && 0 < b.length
        ? (b.data("guideView") ||
            ((d = this.guideModel.rootPanel.somExpression),
            (a = c.util.GuideUtil.relativeSom(d, a) || ""),
            f.reduce(
              a.split("."),
              function (a, b) {
                a = a ? a + "." + b : b;
                k = this.getView(a);
                k instanceof c.view.GuidePanelView &&
                  k._childInitializeWaiting &&
                  k._postInitializeChildren();
                return a;
              },
              d,
              this,
            )),
          (d = b.data("guideView")),
          d instanceof c.view.GuidePanelView &&
            d._childInitializeWaiting &&
            d._postInitializeChildren(),
          d)
        : null;
    },
    hotKeys: function (a) {
      var b = !1;
      switch (a.keyCode) {
        case 37:
          a.altKey &&
            (window.guideBridge.setFocus(null, "prevItemDeep", !0), (b = !0));
          break;
        case 39:
          a.altKey &&
            (window.guideBridge.setFocus(null, "nextItemDeep", !0), (b = !0));
          break;
        case 82:
          a.altKey && (window.guideBridge.reset(), (b = !0));
          break;
        case 83:
          a.altKey && (window.guideBridge.submit(), (b = !0));
      }
      b && a.preventDefault();
    },
    getSomOnNavigableAncestor: function (a) {
      if (!a || "" === a) return null;
      var b = a.lastIndexOf(".");
      if (-1 !== b) {
        var c = a.substring(0, b);
        if ((b = this.getView(c))) var d = b.hasNavigableLayout;
        return d ? a : this.getSomOnNavigableAncestor(c);
      }
      return this.guideModel.rootPanel.somExpression;
    },
    __printSyncPending: function () {
      f.each(
        this.childViews,
        function (b) {
          b._syncPending
            ? this.logger().error("AF", b._model.somExpression)
            : a.prototype.__printSyncPending.call(b);
        },
        this,
      );
    },
    _clearInactiveLazyViews: function (a) {
      f.each(this.childViews, function (b) {
        "rootPanelNode" === b._model.className && b._clearInactiveLazyViews(a);
      });
    },
  }));
  a.defineProps({
    guideModel: {
      get: function () {
        return this._model;
      },
    },
    rootPanelView: {
      get: function () {
        return this._findChildView(this.guideModel.rootPanel);
      },
    },
    currentFocusItemSom: {
      get: function () {
        return this._currentFocusItemSom;
      },
      set: function (a) {
        if (this._currentFocusItemSom !== a) {
          var b = this._currentFocusItemSom;
          b && (this._previousFocusItemSom = b);
          this._currentFocusItemSom = a;
          this._model._guide().runtime.progressive ||
            null == a ||
            "guideToolbar" === this._model.resolveNode(a).parent.className ||
            ((this._lastFocussedPanelForNonActionFields =
              this.getSomOnNavigableAncestor(this._currentFocusItemSom)),
            (this._model._currentNavigablePanelSom =
              this._lastFocussedPanelForNonActionFields));
          a &&
            (this._triggerOnBridge(
              "elementFocusChanged",
              this._model.resolveNode(a),
              "focus",
              this._previousFocusItemSom,
              a,
            ),
            this._previousFocusItemSom &&
              !this._model._guide().runtime.progressive &&
              ((b = this.getSomOnNavigableAncestor(this._previousFocusItemSom)),
              (a = this.getSomOnNavigableAncestor(a)),
              a !== b &&
                this._triggerOnBridge(
                  "elementNavigationChanged",
                  this._model.resolveNode(a),
                  "navigate",
                  b,
                  a,
                )));
        }
      },
    },
    skipFieldFocus: {
      get: function () {
        return this._skipFieldFocus;
      },
      set: function (a) {
        this._skipFieldFocus = a;
      },
    },
  });
})($, guidelib, _);
(function (d, c) {
  (c.view.util.DomTemplateCacheStore = xfalib.ut.Class.extend({
    cloneDomElement: function (c) {
      return this.$htmlTemplateDom.find(c).clone();
    },
    putDomElement: function (c, a) {
      this.$htmlTemplateDom.find(c).eq(0).append(a);
    },
    removeDomElement: function (c) {
      this.$htmlTemplateDom.find(c).children().remove();
    },
  })).defineProps({
    $htmlTemplateDom: {
      get: function () {
        return this.options.$htmlTemplateDom;
      },
    },
  });
})($, guidelib);
(function (d, c) {
  c.model.mixin.AddMinMaxValidation = {
    normalProperties: {
      _runMaximumValueTest: function () {
        return this.exclusiveMaximum
          ? this.value < this.maximum
          : this.value <= this.maximum;
      },
      _runMinimumValueTest: function () {
        return this.exclusiveMinimum
          ? this.value > this.minimum
          : this.value >= this.minimum;
      },
      _minMaxValidation: function (d, a) {
        null != d &&
          a.validFlag &&
          (this.maximum &&
            ((a.validFlag = this._runMaximumValueTest()),
            a.validFlag ||
              ((d = this._getFormattedValue(this.maximum)),
              (this._errorText = this.exclusiveMaximum
                ? this.guideUtil.getLocalizedMessage(
                    "",
                    c.i18n.strings.exclusiveMaxValErrorMessage,
                    [d],
                  )
                : this.guideUtil.getLocalizedMessage(
                    "",
                    c.i18n.strings.maxValErrorMessage,
                    [d],
                  )),
              (this._failedTest = this.guideUtil.MAXIMUM_VALUE_TEST))),
          a.validFlag &&
            null !== this.minimum &&
            ((a.validFlag = this._runMinimumValueTest()),
            a.validFlag ||
              ((a = this._getFormattedValue(this.minimum)),
              (this._errorText = this.exclusiveMinimum
                ? this.guideUtil.getLocalizedMessage(
                    "",
                    c.i18n.strings.exclusiveMinValErrorMessage,
                    [a],
                  )
                : this.guideUtil.getLocalizedMessage(
                    "",
                    c.i18n.strings.minValErrorMessage,
                    [a],
                  )),
              (this._failedTest = this.guideUtil.MINIMUM_VALUE_TEST))));
      },
    },
    propertyDescriptors: {
      maximum: {
        get: function () {
          return this.getAttribute("maximum");
        },
      },
      minimum: {
        get: function () {
          return this.getAttribute("minimum");
        },
      },
      exclusiveMaximum: {
        get: function () {
          return this.getAttribute("exclusiveMaximum");
        },
      },
      exclusiveMinimum: {
        get: function () {
          return this.getAttribute("exclusiveMinimum");
        },
      },
    },
  };
})(_, guidelib);
(function (d, c) {
  c.model.mixin.ChoiceGroupOptionHandler = {
    normalProperties: {
      _getOptionsArray: function (c, a) {
        var b = [],
          e = this.items;
        c = c || "saveValue";
        a = a || "displayValue";
        d.isArray(e) &&
          d.each(e, function (e) {
            e = e.split("\x3d");
            var d = {};
            d[c] = e[0];
            d[a] = e[1] || e[0];
            b.push(d);
          });
        return b;
      },
      _getPossibleValueArray: function () {
        var c = [],
          a = this.items;
        d.isArray(a) &&
          d.each(a, function (a) {
            a = a.split("\x3d");
            c.push(a[0]);
          });
        return c;
      },
      _triggerItemsChange: function (d, a) {
        this.trigger(
          c.event.GuideModelEvent.ITEMS_CHANGED,
          c.event.GuideModelEvent.createEvent(
            c.event.GuideModelEvent.ITEMS_CHANGED,
            this,
            "items",
            d,
            a,
          ),
        );
      },
      _resetModelValueForOptionChange: function () {
        if (
          !d.isUndefined(this.jsonModel._value) &&
          null != this.jsonModel._value
        ) {
          var c = this.jsonModel._value.split(","),
            a = this._getPossibleValueArray(),
            b = "";
          d.each(
            c,
            function (c) {
              -1 !== $.inArray(c, a, 0) && (b += c + ",");
            },
            this,
          );
          0 < b.length && (b = b.substring(0, b.length - 1));
          this.jsonModel._value = b;
        }
      },
    },
  };
})(_, guidelib);
(function (d) {
  d.widget("xfaWidget.imageCheckButtonWidget", d.xfaWidget.XfaCheckBox, {
    _widgetName: "imageCheckButtonWidget",
    getOptionsMap: function () {
      var c = d.xfaWidget.XfaCheckBox.prototype.getOptionsMap.apply(
        this,
        arguments,
      );
      return d.extend({}, c, {
        displayValue: function (d) {
          c.displayValue.apply(this, arguments);
          var a = this.$userControl.parents(
            ".guideRadioButtonItem, .guideCheckBoxItem",
          );
          a && a.toggleClass("imageCheckButtonChecked", this.checkedState);
          "disabled" === this.$userControl.attr("disabled") &&
            a.addClass("imageCheckButtonDisabled");
        },
      });
    },
  });
})($);
(function (d, c) {
  c.model.GuideModelRegistry = xfalib.ut.Class.extend({
    _nodeClassToFactoryMap: {},
    createModel: function (d, a) {
      var b = null,
        e = "GuideNode";
      d.guideNodeClass &&
        0 < d.guideNodeClass.length &&
        (e =
          d.guideNodeClass.charAt(0).toUpperCase() +
          d.guideNodeClass.substr(1));
      var f = "create" + e;
      d.guideNodeClass &&
        this._nodeClassToFactoryMap[d.guideNodeClass] &&
        (f = this._nodeClassToFactoryMap[d.guideNodeClass]);
      this[f] && (b = this[f].call(this, d, a));
      !b && c.model[e] && (b = new c.model[e](this._getOptions(d, a)));
      b ||
        (b = d.items
          ? new c.model.GuideItemsContainer(this._getOptions(d, a))
          : new c.model.GuideNode(this._getOptions(d, a)));
      return b;
    },
    _getOptions: function (c, a) {
      return d.extend({}, a, { jsonModel: c });
    },
    createInstanceManager: function (f) {
      var a = f.getAttribute("name");
      a = {
        guideNodeClass: "guideInstanceManager",
        minOccur: f.minOccur,
        maxOccur: f.maxOccur,
        initialOccur: f.initialOccur,
        instanceTemplateId: f.templateId,
        name: "_" + a,
        instanceName: a,
        templateId: "im_" + f.templateId,
        id: "im_" + f.id,
      };
      var b = {};
      f.options._guideContainer &&
        (b = d.extend({}, b, { _guideContainer: f.options._guideContainer }));
      return c.model.GuideModelRegistry.prototype.createModel(a, b);
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = xfalib.ut.XfaUtil.prototype.detectIE(),
    a = {
      showLink: !1,
      scrollMode: "vertical",
      textAreaClass: ".guide-tnc-content",
      checkBoxClass: ".guide-tnc-checkbox",
      checkBoxDisableClass: ".guide-tnc-checkbox-disabled",
      checkBoxReviewedClass: ".guide-tnc-checkbox-reviewed",
      linkClass: ".guide-tnc-link",
      documentVisitedClass: ".guide-tnc-document-visited",
      documentUnVisitedClass: ".guide-tnc-document-unvisited",
    },
    b = function (b, d) {
      this.options = d;
      this.$element = c(b);
      this.enters = this.leaves = 0;
      this.inside = !1;
      this.reviewdoc = this.status = "unreviewed";
      this.$elementCheckBox = this.$element.find(
        this.options.checkBoxClass || a.checkBoxClass,
      );
      this.$elementTextArea = c(this.textArea());
      this.$elementLink = c(this.link());
      this.isTextContentVisible = !1;
      this.options.showLink
        ? this.$elementLink
            .find("a")
            .click(c.proxy(this.handleReviewStatusChange, this))
        : ((b = function () {
            this.hasScrollBar(this.$elementTextArea.parent().get(0))
              ? this.$elementTextArea
                  .parent()
                  .scroll(c.proxy(this.handleReviewStatusChange, this))
              : "none" !== this.$elementTextArea.css("display") &&
                ((this.status = "reviewed"),
                (this.isTextContentVisible = !0),
                this.options.showAsPopUp || this.enableCheckBox(),
                (this.reviewDoc = this.$elementTextArea.text()));
          }),
          "complete" === document.readyState
            ? b.call(this)
            : c(c.proxy(b, this)));
      if (this.options.showAsPopUp) {
        var e = this.options.documentUnVisitedClass || a.documentUnVisitedClass,
          g = this.options.documentVisitedClass || a.documentVisitedClass,
          l = this;
        b = this.$elementCheckBox
          .find("a")
          .keydown(function (a) {
            if (13 === a.keyCode || 13 == a.which || 32 === a.charCode)
              return c(this).click(), !1;
          })
          .click(function (a) {
            c(this).hasClass(e.substring(1)) &&
              c(this).toggleClass(g.substring(1) + " " + e.substring(1));
            (f || l.isTextContentVisible) && l.enableCheckBox();
          })
          .attr("href");
        c(b).on("hidden.bs.modal", function (a) {
          l.$elementCheckBox.find("input").focus();
        });
      } else this._updateScreenReaderText();
      this.$elementCheckBox
        .find("input")
        .change(c.proxy(this.handleCheckBoxChange, this));
    };
  b.prototype = {
    clear: function () {
      this.$element.val("");
    },
    destroy: function () {
      this.$element.val("");
      this.$element.empty();
    },
    _updateScreenReaderText: function () {
      if (!this.options.showAsPopUp) {
        var a = this;
        this.$element.find(".guide-tnc-sr-only").each(function (b, e) {
          c(this).html(a.options.screenReaderText);
        });
      }
    },
    _restoreClickState: function (b) {
      if (this.options.showLink) {
        b = b.split("\n");
        var e = [];
        d.each(b, function (a, b) {
          e.push(d.last(a.split("\x3d")));
        });
        var f = this.options.documentUnVisitedClass || a.documentUnVisitedClass,
          h = this.options.documentVisitedClass || a.documentVisitedClass;
        this.$elementLink.find("a").each(function (a) {
          c(this).data("clicked", e[a]);
          "1" === e[a]
            ? c(this).addClass(h.substring(1))
            : c(this).addClass(f.substring(1));
        });
      }
    },
    value: function (a) {
      if (a)
        this.options.showLink && this._restoreClickState(a),
          (this.reviewDoc = a);
      else return this.reviewDoc;
    },
    reviewStatus: function (a) {
      this.getClickState();
      if (d.isUndefined(a)) {
        if ("reviewed" == this.status || "unreviewed" == this.status)
          return null;
        if ("agree" == this.status) return !0;
      } else {
        if ("true" == a)
          this.enableCheckBox(),
            this.$elementCheckBox.find("input").attr("checked", "checked"),
            this.$elementCheckBox.find("input").prop("checked", !0);
        else if (null == a || "false" == a)
          this.$elementCheckBox.find("input").removeAttr("checked"),
            this.$elementCheckBox.find("input").removeProp("checked");
        this.approvalStatus = a;
      }
    },
    clickStatus: function (a) {
      if (a) {
        if ("reviewed" === a) {
          var b = this.getClickState();
          d.isArray(b) &&
            0 < b.length &&
            ((b = b.join("\n")), this._restoreClickState(b));
          this.enableCheckBox();
        }
        this.status = a;
      } else return this.status;
    },
    showLink: function (a) {
      if (void 0 !== a) this.options.showLink = a;
      else return this.options.showLink;
    },
    access: function (a) {
      this.accessOption = a;
      "readOnly" == a
        ? (this.disableCheckBox(),
          this.options.showLink &&
            this.$elementLink.find("a").each(function (a, b) {
              c(b).css("pointer-events", "none");
              c(b).attr("disabled", "disabled");
            }))
        : "open" == a &&
          (("reviewed" != this.status && "agree" != this.status) ||
            this.options.showAsPopUp ||
            this.enableCheckBox(),
          this.options.showLink &&
            this.$element.find("a").each(function (a, b) {
              c(b).css("pointer-events", "");
              c(b).removeAttr("disabled");
            }));
    },
    link: function () {
      return this.$element.find(this.options.linkClass || a.linkClass);
    },
    textArea: function () {
      return this.$element.find(this.options.textAreaClass || a.textAreaClass);
    },
    getClickState: function () {
      if (this.options.showLink) {
        var a = [];
        this.$elementLink.find("a").each(function (b) {
          a.push({
            displayText: c(this).text(),
            linkText: c(this).attr("href"),
            clicked: c(this).data("clicked"),
          });
        });
        return a;
      }
    },
    enableCheckBox: function () {
      "readOnly" !== this.accessOption &&
        (this.$elementCheckBox.find("input").removeAttr("disabled"),
        this.$elementCheckBox.removeClass(
          this.options.checkBoxDisableClass.substring(1),
        ));
    },
    disableCheckBox: function () {
      this.$elementCheckBox.find("input").attr("disabled", "disabled");
      this.$elementCheckBox.addClass(
        this.options.checkBoxDisableClass.substring(1),
      );
    },
    handleReviewStatusChange: function (b) {
      var e = [],
        f = this.options.documentVisitedClass || a.documentVisitedClass;
      if (this.options.showLink)
        (this.status = "reviewed"),
          c(b.target).data("clicked", 1),
          c(b.target).addClass(f.substring(1)),
          (this.linkStateMap = this.getClickState()),
          d.each(
            this.linkStateMap,
            function (a, b) {
              a.clicked || (this.status = "unreviewed");
              e.push(
                a.displayText +
                  "\x3d" +
                  a.linkText +
                  "\x3d" +
                  (d.isUndefined(a.clicked) ? "0" : "1"),
              );
            },
            this,
          ),
          0 < e.length && (this.reviewDoc = e.join("\n")),
          "reviewed" == this.status && this.enableCheckBox(),
          this.$element.trigger("reviewComplete.tnc");
      else {
        f = this.getScroll(this.$elementTextArea.get(0));
        var h = f["vertical" == this.options.scrollMode ? "y" : "x"],
          l =
            this.getScrollSize(this.$elementTextArea.get(0)).y -
            this.getSize(this.$elementTextArea.get(0)).y;
        this.reviewDoc = this.$elementTextArea.text();
        h >= l
          ? this.inside ||
            ((this.inside = !0),
            this.enters++,
            (this.status = "reviewed"),
            this.enableCheckBox(),
            this.$element.trigger("reviewComplete.tnc", [f, this.enters, b]))
          : this.inside && ((this.inside = !1), this.leaves++);
      }
    },
    handleCheckBoxChange: function (a) {
      c(a.target).is(":checked")
        ? ((this.status = "agree"),
          this.$elementCheckBox.addClass(
            this.options.checkBoxReviewedClass.substring(1),
          ))
        : ((this.status = "unreviewed"),
          this.$elementCheckBox.removeClass(
            this.options.checkBoxReviewedClass.substring(1),
          ));
      this.$element.trigger("checkboxStateChange.tnc");
    },
    getScrollSize: function (a) {
      return { x: a.scrollWidth, y: a.scrollHeight };
    },
    getScroll: function (a) {
      return { x: a.scrollLeft, y: a.scrollTop };
    },
    getSize: function (a) {
      return { x: a.offsetWidth, y: a.offsetHeight };
    },
    hasScrollBar: function (a) {
      return f
        ? a.scrollHeight - 2 > a.clientHeight ||
            a.scrollWidth - 2 > a.clientWidth
        : a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth;
    },
  };
  c.fn.afTnc = function (d, f) {
    var e = "";
    this.each(function () {
      var g = c(this),
        k = g.data("AfTnc"),
        m = c.extend({}, a, "object" === typeof d && d);
      k || g.data("AfTnc", (k = new b(this, m)));
      "string" === typeof d && (e = k[d](f));
    });
    return e;
  };
})(_, $);
(function (d) {
  var c = xfalib.ut.XfaUtil.prototype;
  d.widget("xfaWidget.tnc", d.xfaWidget.abstractWidget, {
    _widgetName: "tnc",
    _superPrototype: d.xfaWidget.abstractWidget.prototype,
    getOptionsMap: function () {
      var c = this._superPrototype.getOptionsMap.apply(this, arguments);
      return d.extend(
        {},
        c,
        d.extend({}, this.options, {
          value: function (a) {
            this.$userControl.afTnc("value", a);
          },
          reviewStatus: function (a) {
            this.$userControl.afTnc("reviewStatus", a);
          },
          clickStatus: function (a) {
            this.$userControl.afTnc("clickStatus", a);
          },
          access: function (a) {
            this.$userControl.afTnc("access", a);
          },
        }),
      );
    },
    _getReviewStatus: function () {
      return d(this.element).afTnc("reviewStatus");
    },
    _getClickStatus: function () {
      return d(this.element).afTnc("clickStatus");
    },
    getEventMap: function () {
      var f = this._superPrototype.getEventMap.apply(this, arguments);
      return d.extend({}, f, {
        change: null,
        "reviewComplete.tnc": c.XFA_CHANGE_EVENT,
        "checkboxStateChange.tnc": c.XFA_CHANGE_EVENT,
      });
    },
    render: function () {
      this._superPrototype.render.apply(this, arguments);
      d(this.element).afTnc(this.getOptionsMap());
      return d(this.element);
    },
    showDisplayValue: function () {},
    showValue: function () {},
    getCommitValue: function () {
      this.options.reviewStatus = this._getReviewStatus();
      this.options.clickStatus = this._getClickStatus();
      return d(this.element).afTnc("value");
    },
  });
})($);
(function (d, c) {
  var f = { Guide: "XFA", XFA: "Guide" },
    a = ["enabled", "visible"];
  (c.model.GuideNode = xfalib.ut.EventClass.extend({
    msClassName: "guideNode",
    guideUtil: c.util.GuideUtil,
    initialize: function () {
      this.className = this.jsonModel.guideNodeClass || this.msClassName;
      this.parent = null;
      this._isItem = !1;
      this._index = 0;
    },
    _postInitialize: function () {},
    _triggerOnBridge: function (a, d, f, k, h) {
      window.guideBridge &&
        window.guideBridge.trigger(
          a,
          c.event.GuideModelEvent.createEvent(a, d, f, k, h),
        );
    },
    _getEffectiveBindRef: function () {
      return this.bindRef || this.getAttribute("name");
    },
    validate: function (a) {},
    _getXFAOptionStringFromGuideItems: function (a) {
      var b = "",
        c = 0;
      d.isEmpty(a) || d.isArray(a) || (a = [a]);
      d.each(a, function (d, e, f) {
        c = d.indexOf("\x3d");
        b =
          -1 < c
            ? b + (d.substring(c + 1) + "," + d.substring(0, c))
            : b + (d + "," + d);
        e < a.length - 1 && (b += ",");
      });
      return b;
    },
    _compareXFAItemsWithGuideItems: function (a, c) {
      var b = !0;
      a.length !== c.length && (b = !1);
      if (b) {
        var e = this.bindNode;
        d.each(c, function (a, c, d) {
          -1 < a.indexOf("\x3d")
            ? e.getSaveItem(c) + "\x3d" + e.getDisplayItem(c) == a && (b = !1)
            : e.getSaveItem(c) + "\x3d" + e.getDisplayItem(c) ==
                a + "\x3d" + a && (b = !1);
        });
      }
      return b;
    },
    syncXFAProps: function () {
      this.bindNode &&
        d.each(
          this._guide()._guideSchema.getAttributes(this.className),
          function (b, c) {
            var e = b.xfaProp,
              f = (e || "").split("."),
              h = 0 < f.length ? f[f.length - 1] : void 0;
            if (
              h &&
              (-1 == a.indexOf(c) || !d.isUndefined(this.jsonModel[c]))
            ) {
              f = f.splice(0, f.length - 1);
              f = d.reduce(
                f,
                function (a, b) {
                  if (d.isObject(a)) return a[b];
                },
                this.bindNode,
              );
              b = this.getGuideProp(c, b);
              var l = this._guide()._guideSchema.getConvertor(c);
              b = l ? l.guideToXfa.apply(this, [b]) : b;
              try {
                if (f) {
                  var m = f[h];
                  if (void 0 !== b)
                    if ("items" === h) {
                      if (!this._compareXFAItemsWithGuideItems(f, b)) {
                        var p = this._getXFAOptionStringFromGuideItems(b);
                        "" !== p ? f.setItems(p, 2) : f.clearItems();
                      }
                    } else b !== m && (f[h] = b);
                }
              } catch (r) {
                this.logger().error(
                  "AF",
                  "setting {0}(guide {1}) for {2} is not supported in xfa",
                  [e, c, this.bindNode.somExpression],
                ),
                  r.stack && this.logger().error("AF", r.stack);
              }
            }
          },
          this,
        );
    },
    prepare: function () {},
    nakedChildReferences: function (a, c) {},
    getNaked: function (a, d, f) {
      var b = this.getAttribute("name"),
        e = d._private["_" + b + "_"],
        g = d._isOverriden && !d._isOverriden["_" + b + "_"],
        m =
          this.isGlobal &&
          (d === c.__runtime__ || d === this._guide().runtime) &&
          d[b] instanceof c.model.AbstractField;
      if ((f && 1 === f._nameArray[b]) || a === this.index)
        if (null === e || void 0 === e || g || m)
          c.util.GuideUtil._createGetterSetter(d, b, this),
            !0 === g && (d._isOverriden["_" + b + "_"] = !0);
    },
    _getReducedJSON: function () {
      var a = {};
      c.model.util.CommonUtils.returnMinimalJSON(
        ["name", "templateId", "_value", "guideNodeClass"],
        a,
        this,
      );
      return a;
    },
    _getNakedThis: function () {
      return this;
    },
    _xfa: function () {
      return window.xfalib ? window.xfalib.runtime.xfa : null;
    },
    _guide: function () {
      return this.options._guideContainer;
    },
    playJson: function (a) {},
    visit: function (a, c) {
      a.apply(c, [this]);
    },
    _collectValues: function (a) {},
    _setParentAccess: function (a) {},
    _unloadModel: function () {
      this.trigger(
        c.event.GuideModelEvent.OBJECT_DESTROYED,
        c.event.GuideModelEvent.createEvent(
          c.event.GuideModelEvent.OBJECT_DESTROYED,
          this,
          "destroy",
          null,
          this,
        ),
      );
      this._guide()._modelTemplateCacheStore.removeModel(this.id);
      this.off();
      !d.isObject(c.__runtime__[this.name]) ||
        (c.__runtime__[this.name] !== this &&
          c.__runtime__[this.name].somExpression !== this.somExpression) ||
        ((c.__runtime__[this.name] = void 0),
        d.isObject(c.__runtime__._private["_" + this.name + "_"]) &&
          (c.__runtime__._private["_" + this.name + "_"] = void 0));
      !d.isObject(this._guide().runtime[this.name]) ||
        (this._guide().runtime[this.name] !== this &&
          this._guide().runtime[this.name].somExpression !==
            this.somExpression) ||
        ((this._guide().runtime[this.name] = void 0),
        d.isObject(this._guide().runtime._private["_" + this.name + "_"]) &&
          (this._guide().runtime._private["_" + this.name + "_"] = void 0));
    },
    _triggerEvent: function (a, d, f, k) {
      this.trigger(a, c.event.GuideModelEvent.createEvent(a, this, d, f, k));
    },
    dispatchEvent: function (a, c) {
      this._triggerEvent(a, c);
      null !== this.parent && this.parent.dispatchEvent(a, c);
    },
    setAttribute: function (a, d) {
      if (this.jsonModel[d] !== a) {
        var b = this.jsonModel[d];
        this.jsonModel[d] = a;
        this._triggerEvent(c.event.GuideModelEvent.MODEL_CHANGED, d, b, a);
      }
    },
    _getSomExpression: function () {
      return null == this.parent
        ? "guide[0]." + this._escapeQualifiedName()
        : this.parent.somExpression + "." + this._escapeQualifiedName();
    },
    _escapeQualifiedName: function () {
      return (this.getAttribute("name") + "[" + this._index + "]").replace(
        /\./,
        "\\.",
      );
    },
    getGuideProp: function (a, d) {
      a = this.getOrElse(this.jsonModel, a, d["default"]);
      if (void 0 !== a)
        return c.model.GuideSchema.prototype.getTypedValue(d.type, a);
    },
    getXFAProp: function (a, d) {
      d = d.xfaProp;
      a = c.model.GuideSchema.prototype.getConvertor(a);
      if (
        this.bindNode &&
        void 0 !== d &&
        ((d = this.bindNode.getOrElse(this.bindNode, d, void 0)),
        a && (d = a.xfaToGuide.apply(this, [d])),
        void 0 !== d)
      )
        return d;
    },
    getAttribute: function (a) {
      var b = c.model.GuideSchema.prototype.getAttributeProps(
          this.className,
          a,
        ),
        d = b.priority || (void 0 !== b.xfaProp ? "XFA" : "Guide"),
        k = this["get" + d + "Prop"].apply(this, [a, b]);
      void 0 === k && (k = this["get" + f[d] + "Prop"].apply(this, [a, b]));
      return k;
    },
    resetData: function () {},
  })).defineProps({
    name: {
      get: function () {
        return (this.getAttribute("name") || "").replace(/\s+/g, "");
      },
    },
    templateId: {
      get: function () {
        return this.getAttribute("templateId");
      },
    },
    id: {
      get: function () {
        return this.getAttribute("id") || this.templateId;
      },
    },
    somExpression: {
      get: function () {
        return this._getSomExpression();
      },
    },
    title: {
      get: function () {
        return this.getAttribute("jcr:title");
      },
    },
    nonLocalizedTitle: {
      get: function () {
        return this.getAttribute("nonLocalizedTitle");
      },
    },
    panel: {
      get: function () {
        return this.parent.panel;
      },
    },
    viewVisited: {
      get: function () {
        return this.getAttribute("viewVisited");
      },
      set: function (a) {
        this.setAttribute(a, "viewVisited");
      },
    },
    index: {
      get: function () {
        return this._index;
      },
    },
    visible: {
      get: function () {
        return !0;
      },
      set: function (a) {},
    },
    enabled: {
      get: function () {
        return !0;
      },
      set: function (a) {},
    },
    cssClassName: {
      get: function () {
        return this.getAttribute("css");
      },
    },
    enableLayoutOptimization: {
      get: function () {
        return !1;
      },
    },
    jcrPath: {
      get: function () {
        return this.jsonModel["jcr:path"];
      },
    },
    targetVersion: {
      get: function () {
        return this.getAttribute("fd:targetVersion");
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.Esign = c.model.GuideNode.extend({
    msClassName: "esign",
    initialize: function () {
      f._super.initialize.call(this);
      this.validationStatus = !0;
    },
    validate: function (a) {
      var b = !0;
      void 0 !== FD.AFaddon.Signing &&
        null !== FD.AFaddon.Signing &&
        ((b = FD.AFaddon.Signing.isDocumentSigned(
          this.jsonModel.signingService,
        )) ||
          a.push({
            som: this.somExpression,
            errorText: "Signing not complete.",
          }));
      return (this.validationStatus = b);
    },
  }));
  f.defineProps({
    forceElementFocusChange: {
      get: function () {
        return !0;
      },
    },
  });
})(_, guidelib);
(function (d, c, f) {
  var a = (c.model.Verify = c.model.GuideNode.extend({
    msClassName: "verify",
    initialize: function () {
      a._super.initialize.call(this);
      this.validationStatus = !0;
    },
    validate: function (a) {
      var b = null,
        c = !0;
      void 0 !== this.jsonModel.interactive &&
        "true" === this.jsonModel.interactive &&
        ("client" === guideBridge.hostName &&
          (b = f("#verifiable_form").get(0).contentWindow.formBridge),
        void 0 !== b &&
          null !== b &&
          ((c = b.validateForm()) ||
            a.push({
              som: this.somExpression,
              errorText: "XFA validation errors.",
            }),
          (this.validationStatus = c)));
      return c;
    },
  }));
  a.defineProps({
    forceElementFocusChange: {
      get: function () {
        return !0;
      },
    },
  });
})(_, guidelib, $);
(function (d, c, f) {
  var a = (f.model.Scriptable = f.model.GuideNode.extend({
    msClassName: "scriptable",
    initialize: function () {
      a._super.initialize.call(this);
      this.className = this.jsonModel.guideNodeClass || this.msClassName;
      this._compiledExpressions = {};
      this._compiledScripts = {};
      this.mActiveEvents = [];
      this.dependants = [];
      this.initScript && (this._isInitScriptExecuted = !1);
      this._collectExpressions();
    },
    _postInitialize: function () {
      if (
        this._isXfaNode() &&
        (this.bindNode = this.options.bindNode || this._getBindNode())
      )
        this.bindNode.on(c.script.XfaModelEvent.FORM_MODEL_CHANGED, this);
      this._parentAccess = this.getOrElse(this, "parent.enabled", !0);
    },
    _unloadModel: function () {
      this._isXfaNode &&
        this._isXfaNode() &&
        this.bindNode &&
        this.bindNode.off(c.script.XfaModelEvent.FORM_MODEL_CHANGED, this);
      a._super._unloadModel.call(this);
    },
    _collectExpressions: function () {
      this.visibleExp &&
        (this._compiledExpressions.visibleExp = this._compileExpression(
          this.visibleExp,
          "visible",
        ));
      this.enabledExp &&
        (this._compiledExpressions.enabledExp = this._compileExpression(
          this.enabledExp,
          "enabled",
        ));
      this.initScript &&
        (this._compiledScripts.initScript = this._compileExpression(
          this.initScript,
          null,
        ));
    },
    _compileExpression: function (a, c) {
      if (a)
        try {
          var b = c
            ? 'with(this) {\n\t with(guidelib.__runtime__) {\n\t with(this._guide().runtime) {\n\t\t var _guide_result \x3d this[${affectedProp}] \x3d eval("${expression}");\n\t\t return _guide_result ;\n\t }\n}};'
                .replace(/\${affectedProp}/g, '"' + c + '"')
                .replace(
                  /\${expression}/g,
                  a
                    .replace(/\\/g, "\\\\")
                    .replace(/"/g, '\\"')
                    .replace(/(?:\r\n|\r|\n)/g, " "),
                )
            : 'with(this) {\n\t with(guidelib.__runtime__) {\n\t with(this._guide().runtime) {\n\t var result \x3d eval("${expression}");\n\t\t return result; \n\t }\n}}'.replace(
                /\${expression}/g,
                a
                  .replace(/\\/g, "\\\\")
                  .replace(/"/g, '\\"')
                  .replace(/(?:\r\n|\r|\n)/g, " "),
              );
          return new Function(b);
        } catch (k) {
          this.logger().error("AF", "Error in compiling expression:" + a);
        }
      return null;
    },
    _isXfaNode: function () {
      return (
        this._xfa() &&
        0 ===
          this.getOrElse(this, "jsonModel.bindRef", "").indexOf(
            "xfa[0].form[0].",
          )
      );
    },
    _xfa: function () {
      return this.getOrElse(window, "xfalib.runtime.xfa", null);
    },
    prepare: function () {
      a._super.prepare.apply(this);
      this.initScript &&
        !this._isInitScriptExecuted &&
        (this.executeExpression("initScript"),
        (this._isInitScriptExecuted = !0));
      var b = d.keys(this._compiledExpressions);
      this._guide().queueExpressions(this, b);
    },
    handleEvent: function (a) {
      if (a instanceof c.script.XfaModelEvent)
        switch (a.name) {
          case c.script.XfaModelEvent.FORM_MODEL_CHANGED:
            this._handleXfaModelChanged(a);
        }
      else a instanceof f.event.GuideModelEvent && this.handleGuideEvent(a);
    },
    handleGuideEvent: function (a) {},
    executeExpression: function (a, e) {
      var b = this._guide();
      this._isXfaNode() &&
        this.bindNode instanceof c.script.EventContainerNode &&
        null !== f.util.GuideUtil.xfaExprMap[a] &&
        this.bindNode.execEvent(f.util.GuideUtil.xfaExprMap[a] || a, e);
      if (
        d.isUndefined(this._compiledExpressions[a]) &&
        d.isUndefined(this._compiledScripts[a])
      )
        return (
          b._currentContext
            ? this.logger().log(
                "AF",
                "executeExpression called withing from another executeExpression. Should NEVER happen ",
              )
            : b.runPendingExpressions(),
          !0
        );
      if (!this.mActiveEvents[a]) {
        this.mActiveEvents[a] = !0;
        var k = b._currentContext;
        b._currentContext = {
          contextNode: this,
          expression: a,
          managedExp: this._compiledExpressions[a] ? !0 : !1,
        };
        this._setExpressionContext(this, this.index);
        b.runtime.$event = { name: a, target: this, data: e };
        e = this._expressionHandler(a);
        this.mActiveEvents[a] = !1;
        (b._currentContext = k) &&
          k.contextNode &&
          k.contextNode._setExpressionContext(
            k.contextNode,
            k.contextNode.index,
          );
        b.runtime.$event = null;
        b.runPendingExpressions();
        return e;
      }
    },
    _setExpressionContext: function (a, c) {
      function b(a) {
        return f.util.GuideUtil.commonPrefixLen(e, a.somExpression);
      }
      var e = this.somExpression;
      this._guide().internal.liveModel &&
        d.each(
          this._guide().internal.liveModel.getCrossFragmentFields(),
          function (a, c) {
            var e;
            var g = this._guide().internal.liveModel.getAllFieldModels(
              d.keys(a),
            );
            d.isEmpty(g) || (e = d.max(g, b));
            f.util.GuideUtil._createGetterSetter(
              f.__runtime__,
              c,
              e || a[d.keys(a)[0]],
            );
            f.util.GuideUtil._createGetterSetter(
              this._guide().runtime,
              c,
              e || a[d.keys(a)[0]],
            );
          },
          this,
        );
      this._guide().runtime._isOverriden = {};
      for (f.__runtime__._isOverriden = {}; a; )
        a.nakedChildReferences(c, f.__runtime__),
          a.nakedChildReferences(c, this._guide().runtime),
          (c = a.index),
          (a = a.parent);
    },
    _expressionHandler: function (a) {
      if (this._compiledExpressions[a]) {
        var b = this._compiledExpressions[a];
        try {
          var c = b.apply(this);
        } catch (k) {
          this.logger().error(
            "AF",
            "Error in compiling expression:" +
              this.name +
              ":" +
              a +
              ":" +
              k.stack,
          );
        }
      } else if (this._compiledScripts[a]) {
        b = this._compiledScripts[a];
        try {
          return b.apply(this);
        } catch (k) {
          this.logger().error(
            "AF",
            "Error in compiling expression:" +
              this.name +
              ":" +
              a +
              ":" +
              k.stack,
          );
        }
      }
      return c;
    },
    _handleXfaModelChanged: function (a) {
      "presence" == a._property
        ? this._triggerEvent(
            f.event.GuideModelEvent.MODEL_CHANGED,
            "visible",
            a.prevText,
            "visible" == a.newText,
          )
        : "access" == a._property &&
          this.trigger(
            f.event.GuideModelEvent.MODEL_CHANGED,
            f.event.GuideModelEvent.createEvent(
              f.event.GuideModelEvent.MODEL_CHANGED,
              this,
              "enabled",
              "open" == a.prevText,
              "open" == a.newText,
            ),
          );
    },
    _getScreenReaderText: function (a) {
      var b,
        c = this._getAssistPriority();
      "custom" == c
        ? (b =
            this._getCustomAssist(a) ||
            this._getToolTip(a) ||
            this._getCaption(a) ||
            this._getName(a))
        : "shortDescription" == c
          ? (b = this._getToolTip(a) || this._getCaption(a) || this._getName(a))
          : "label" == c
            ? (b = this._getCaption(a) || this._getName(a))
            : "name" == c && (b = this._getName(a));
      return b;
    },
    _getAssistPriority: function () {
      return this.getAttribute("assistPriority") || "custom";
    },
    _getCustomAssist: function () {
      if (
        this.bindNode &&
        this.bindNode.assist &&
        this.bindNode.assist.speak &&
        this.bindNode.assist.speak.value
      )
        var a = this.bindNode.assist.speak.value;
      else this.jsonModel.custom && (a = this.jsonModel.custom);
      return a;
    },
    _getToolTip: function () {
      return this.shortDescription;
    },
    _getCaption: function () {
      return this.getAttribute("jcr:title");
    },
    _getName: function (a) {
      return this.getAttribute("name");
    },
    _getBindNode: function () {
      var a = this.getAttribute("bindRef");
      if (!a) return null;
      var c = null,
        d = this.parent ? this.parent._bindParent() : null;
      if (d) {
        var f = d.getAttribute("bindRef");
        a.substring(0, f.length) == f &&
          ((c = a.substring(f.length + 1)), (c = d.bindNode.resolveNode(c)));
      }
      !c && this._isXfaNode() && (c = this._xfa().resolveNode(a));
      return c;
    },
    _bindParent: function () {
      return this.bindNode
        ? this
        : this.parent
          ? this.parent._bindParent()
          : null;
    },
    _getEnabled: function () {
      return this.bindNode
        ? "open" == this.bindNode.access
        : this.getAttribute("enabled") && this._parentAccess;
    },
    _setEnabled: function (a) {
      if (this.bindNode) {
        var b = this._guide()._guideSchema.getConvertor("enabled");
        b && (this.bindNode.access = b.guideToXfa.apply(this, [a]));
      } else
        this.getAttribute("enabled") !== a &&
          ((b = this.getAttribute("enabled")),
          this.setAttribute(a, "enabled"),
          this.trigger(
            f.event.GuideModelEvent.MODEL_CHANGED,
            f.event.GuideModelEvent.createEvent(
              f.event.GuideModelEvent.MODEL_CHANGED,
              this,
              "enabled",
              b,
              this.jsonModel.enabled,
            ),
          ),
          this._triggerOnBridge(
            "elementEnableChanged",
            this,
            "enablement",
            b,
            this.jsonModel.enabled,
          ));
    },
    _setParentAccess: function (a) {
      var b = this._parentAccess;
      this._parentAccess = a;
      this.trigger(
        f.event.GuideModelEvent.MODEL_CHANGED,
        f.event.GuideModelEvent.createEvent(
          f.event.GuideModelEvent.MODEL_CHANGED,
          this,
          "enabled",
          b,
          this.enabled,
        ),
      );
    },
    _addStateOverride: function (a, c) {
      if (null !== a && d.isString(a) && null !== c) {
        var b = this.somExpression;
        b = b.substring(this._guide().somExpression.length + 1);
        this.jsonModel.stateOverrides = this.jsonModel.stateOverrides || {
          somExpr: b,
        };
        this.jsonModel.stateOverrides[a] = c;
        this._guide()._addToStateOverrideMap(
          this.id + this.name,
          this.jsonModel.stateOverrides,
        );
      }
    },
  }));
  a.defineProps({
    shortDescription: {
      get: function () {
        return this.getAttribute("shortDescription");
      },
    },
    longDescription: {
      get: function () {
        return this.getAttribute("longDescription");
      },
    },
    visibleExp: {
      get: function () {
        return this.getAttribute("visibleExp");
      },
    },
    initScript: {
      get: function () {
        return this.jsonModel.initScript;
      },
    },
    enabledExp: {
      get: function () {
        return this.getAttribute("enabledExp");
      },
    },
    visible: {
      get: function () {
        return this.getAttribute("visible");
      },
      set: function (a) {
        if (this.bindNode)
          this.bindNode.presence = 1 == a ? "visible" : "hidden";
        else if (this.getAttribute("visible") !== a) {
          var b = this.getAttribute("visible");
          this.setAttribute(a, "visible");
          null !== this.getAttribute("dorExclusion") &&
            ("true" === this._guide().getAttribute("excludeFromDoRIfHidden") ||
              (this._guide().print &&
                "true" === this._guide().print.excludeFromDoRIfHidden)) &&
            (this.dorExclusion = !a);
          this.trigger(
            f.event.GuideModelEvent.MODEL_CHANGED,
            f.event.GuideModelEvent.createEvent(
              f.event.GuideModelEvent.MODEL_CHANGED,
              this,
              "visible",
              b,
              this.jsonModel.visible,
            ),
          );
          this._triggerOnBridge(
            "elementVisibleChanged",
            this,
            "visible",
            b,
            this.jsonModel.visible,
          );
        }
      },
    },
    dorExclusion: {
      get: function () {
        return null != this.jsonModel.dorExclusion
          ? d.isString(this.jsonModel.dorExclusion)
            ? "true" === this.jsonModel.dorExclusion
            : this.jsonModel.dorExclusion
          : "true" === this._guide().getAttribute("excludeFromDoRIfHidden") ||
              (this._guide().print &&
                "true" === this._guide().print.excludeFromDoRIfHidden)
            ? !this.visible
            : !1;
      },
      set: function (a) {
        var b = this.somExpression;
        b = b.substring(this._guide().somExpression.length + 1);
        this._guide()._addToExcludeFromDorMap(b, a);
        this.jsonModel.dorExclusion = a;
      },
    },
    stateOverrides: {
      get: function () {
        return this.jsonModel.stateOverrides;
      },
    },
    enabled: {
      get: function () {
        return this._getEnabled();
      },
      set: function (a) {
        this._setEnabled(!!a);
      },
    },
    bindRef: {
      get: function () {
        return (this.getAttribute("bindRef") || "").replace(/\s+/g, "");
      },
    },
    isXsd: {
      get: function () {
        return (
          d.isString(guideBridge._guide.xsdRef) &&
          !d.isEmpty(this.bindRef) &&
          "/" === this.bindRef[0]
        );
      },
    },
  });
})(_, window.xfalib, guidelib);
(function (d, c) {
  (c.model.GuideImage = c.model.Scriptable.extend({
    msClassName: "guideImage",
  })).defineProps({
    value: {
      get: function () {
        return this.bindNode ? this.bindNode.rawValue : null;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideAdModule = c.model.Scriptable.extend({
    msClassName: "guideAdModule",
    initialize: function () {
      f._super.initialize.call(this);
      this.jsonModel["{default}"] = this.getOrElse(
        this.jsonModel,
        "{default}",
        this.jsonModel._value,
      );
      this.layoutConfigs = [];
      "string" === typeof this.jsonModel.layoutConfig
        ? this.layoutConfigs.push(JSON.parse(this.jsonModel.layoutConfig))
        : d.each(
            this.jsonModel.layoutConfig,
            function (a) {
              this.layoutConfigs.push(JSON.parse(a));
            },
            this,
          );
    },
    _getTypedValue: function (a) {
      return d.isUndefined(a) || null === a || "" === a ? null : a + "";
    },
    playJson: function (a) {
      var b = this.jsonModel._value;
      this.jsonModel._value = a._value;
      this._triggerOnBridge(
        "elementValueChanged",
        this,
        "value",
        b,
        this.jsonModel._value,
      );
    },
  }));
  f.defineProps({
    value: {
      get: function () {
        return this._getTypedValue(this.jsonModel._value);
      },
      set: function (a) {
        var b = this._getTypedValue(this.jsonModel._value),
          c = this._getTypedValue(a);
        void 0 !== c &&
          c !== b &&
          (this.jsonModel._value !== a && (this.jsonModel._value = c || ""),
          this._triggerOnBridge("elementValueChanged", this, "value", b, c));
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = [],
    a = {};
  f = null !== navigator.userAgent.match(/iPad/i);
  var b =
      null !== navigator.userAgent.match(/iPhone/i) ||
      null !== navigator.userAgent.match(/iPod/i),
    e = f || b;
  f = [
    { name: "desktop", width: Infinity },
    { name: "tablet-landscape", width: 1024 },
    { name: "tablet-potrait", width: 768 },
    { name: "mobile-landscape", width: 480 },
    { name: "mobile-potrait", width: 320 },
  ];
  a = {
    breakpoints: f,
    controlRowDetails: {
      renderer: function (a, b) {
        var d = null;
        a.options.bControlRowHiddenCells
          ? (d = b.$tableRowElement.find("td:hidden"))
          : ((d = b.$tableRowElement.find("td")),
            a.options.bDisableControlRowCells &&
              b.$tableRowElement
                .find("input, select, textarea, button")
                .attr("disabled", "disabled"));
        d = d.map(function (d, e) {
          e = c(e);
          d = a.header(e);
          e = { row: b.$tableRowElement.index(), column: e.index() };
          var f = a._getCellData(e);
          return c("\x3cli\x3e\x3c/li\x3e")
            .attr("data-rtp-index", e.column)
            .addClass("clearfix")
            .append(
              c("\x3cdiv\x3e\x3c/div\x3e")
                .addClass("rtp-title")
                .text(c.trim(d.text())),
            )
            .append(
              c("\x3cdiv\x3e\x3c/div\x3e").addClass("rtp-data").append(f),
            );
        });
        return c(
          '\x3cul data-rtp-index\x3d"' + b.index + '"\x3e\x3c/ul\x3e',
        ).append(d.get());
      },
      target: 0,
      type: "inline",
    },
  };
  var g = function (a, b) {
      this.options = b;
      this.$element = c(a);
      this.columns = [];
    },
    k = function (a, b, c) {
      var d = a.find("th").eq(b);
      this.minWidth = c ? parseInt(d.css("min-width"), 10) : d.outerWidth();
      this.header = d;
      this.colIndex = b;
      this.$tableElement = a;
    };
  k.prototype = {
    cells: function () {
      var a = this.header.attr("id");
      return this.$tableElement.find("tr td").filter(function () {
        var b = c(this).attr("headers");
        if (b && -1 < b.indexOf(a)) return c(this);
      });
    },
    visible: function (a) {
      var b = this.cells();
      this.isVisible = a;
      if (!0 === a) b.show(), this.header.show();
      else {
        this.header.hide();
        var d = this.header.prevAll().filter(":visible").length;
        c.each(b, function () {
          c(this).data("shown") || c(this).hide();
          if (1 < (c(this).data("colspan") || c(this).attr("colspan"))) {
            var a = 0;
            c(this)
              .prevAll()
              .each(function () {
                a += +(c(this).data("colspan") || c(this).attr("colspan"));
              });
            0 == a
              ? (c(this).show(),
                c(this).data("shown", !0),
                null == c(this).data("colspan") &&
                  c(this).data("colspan", c(this).attr("colspan")),
                c(this).attr("colspan", d))
              : a < d &&
                (c(this).show(),
                c(this).data("shown", !0),
                null == c(this).data("colspan") &&
                  c(this).data("colspan", c(this).attr("colspan")),
                c(this).attr("colspan", d - a));
          }
        });
      }
    },
  };
  var h = function (a) {
    this.$tableRowElement = a;
    this.index = a.index();
    this.child = { $element: null, isShown: !1 };
    a.data("tableRow", this);
  };
  h.prototype = {
    updateChild: function (a, b) {
      this.child.$element && 0 < this.child.$element.length
        ? (this.child.$element.empty(),
          this.child.$element.append(
            c("\x3ctd\x3e\x3c/td\x3e")
              .addClass(g.prototype.defaults.CONTROL_ROW_CLASS)
              .attr("colspan", b)
              .append(c(a)),
          ))
        : 0 <
            this.$tableRowElement.next(
              g.prototype.defaults.CONTROL_ROW_SELECTOR,
            ).length
          ? ((this.child.$element = this.$tableRowElement.next()),
            this.child.$element.append(
              c("\x3ctd\x3e\x3c/td\x3e")
                .addClass(g.prototype.defaults.CONTROL_ROW_CLASS)
                .attr("colspan", b)
                .append(c(a)),
            ))
          : ((this.child.$element = c("\x3ctr\x3e\x3c/tr\x3e")
              .addClass(g.prototype.defaults.CONTROL_ROW_CLASS)
              .append(
                c("\x3ctd\x3e\x3c/td\x3e")
                  .addClass(g.prototype.defaults.CONTROL_ROW_CLASS)
                  .attr("colspan", b)
                  .append(c(a)),
              )),
            this.$tableRowElement.after(this.child.$element));
    },
    showChild: function () {
      this.child.$element.get(0).style.display = "";
      this.child.isShown = !0;
    },
    hideChild: function () {
      this.child.$element.hide();
      this.child.isShown = !1;
    },
  };
  g.prototype = {
    _getCellData: function (a) {
      a = this.$element.find("tbody tr").eq(a.row).find("td").eq(a.column);
      return this.options.viewCallback
        ? ((a = a.find(g.prototype.defaults.GUIDE_ID_SELECTOR).attr("id")),
          this.options.viewCallback(a))
        : a.html();
    },
    header: function (a) {
      a = a.attr("headers").split(" ")[0];
      return this.$element.find("#" + a);
    },
    initializeColumns: function (a) {
      var b = [];
      this.colLength = this.$element.find("th").length;
      for (var c = 0; c < this.colLength; c++)
        b.push(new k(this.$element, c, a));
      return b;
    },
    _initializeColumnWidth: function () {
      var a = this._getColumnsVisibility(),
        b = d.filter(a, function (a) {
          return 1 == a;
        }).length,
        c = this.$element.find("th"),
        e = null,
        f = null,
        g = 0;
      if (this.options.bAutoWidth) g = b;
      else
        for (var k = 0; k < b; k++) g += parseInt(this.options.aWidth[k], 10);
      if (a.length == this.colLength)
        for (k = 0; k < b; k++)
          (f = this.options.aWidth
            ? Math.floor((100 * this.options.aWidth[k]) / g) + "%"
            : Math.floor(100 / g) + "%"),
            (e = c.eq(k)),
            (e[0].style.width = f);
    },
    _constructor: function () {
      var b = this;
      this.controlRow = c.extend(!0, {}, a);
      this.columns = this.initializeColumns();
      c(window).on("resize orientationchange", function (a) {
        b._initializeColumnVisibility(a);
      });
      this.controlRow.breakpoints.sort(function (a, b) {
        return a.width < b.width ? 1 : a.width > b.width ? -1 : 0;
      });
      this._initializeColumnVisibility();
      this._controlRowInitialization();
    },
    _initializeColumnVisibility: function (a) {
      var b = this;
      a &&
        (this.$element.find("td").each(function () {
          c(this).removeData("shown");
          null != c(this).data("colspan") &&
            c(this).attr("colspan", c(this).data("colspan"));
        }),
        (this.columns = this.initializeColumns(a)));
      this._initializeColumnWidth();
      this.display = this._resize();
      this.$element.find("tbody tr:not(.child)").each(function () {
        0 == c(this).next(g.prototype.defaults.CONTROL_ROW_SELECTOR).length &&
          c(this).after(
            c("\x3ctr\x3e\x3c/tr\x3e")
              .addClass(g.prototype.defaults.CONTROL_ROW_CLASS)
              .hide(),
          );
      });
      var f = this.controlRow.controlRowDetails;
      f.type &&
        (this._controlRowVisibility(a),
        this.$element.on(
          g.prototype.defaults.EVENT_COLUMN_VISIBILITY,
          function () {
            b._controlRowVisibility();
          },
        ),
        this.$element.addClass("rtp-" + f.type));
      this.options.fixTableControls &&
        (d.isUndefined(a) ||
          "orientationchange" === a.type ||
          ("resize" === a.type && !e)) &&
        this.options.fixTableControls(a);
    },
    _fixControlRows: function () {
      this.$element.find(g.prototype.defaults.CONTROL_ROW_SELECTOR).remove();
    },
    isColumnHidden: function () {
      return this.bColumnHidden || !1;
    },
    _rearrangeTableRuntimeControls: function (a, b) {
      b = this.$element.find(
        ".guideTableRuntimeControls .guideTableRuntimeAddControl",
      );
      var d = 0;
      b.each(function () {
        if (c(this).is(":visible"))
          return (d = c(this).closest("td").index()), !1;
      });
      d <= a &&
        b.each(function () {
          var b = c(this).closest(".guideTableRuntimeControls"),
            e = c(this).closest("tr");
          b.hasClass("guideTableRuntimeRightControls") &&
            (b.appendTo(e.find("td").eq(a)),
            d !== a &&
              ((b = b.prev()),
              b.css("display", "block"),
              b.css("float", "none")));
        });
    },
    _controlRowVisibility: function (a) {
      var b = d.filter(this.columns, function (a) {
        return !0 !== a.isVisible;
      });
      this._rearrangeTableRuntimeControls(
        this.columns.length - b.length - 1,
        a,
      );
      b && 0 < b.length
        ? (this.$element.addClass("collapsed"), (this.bColumnHidden = !0))
        : (this.$element.removeClass("collapsed"), (this.bColumnHidden = !1));
    },
    _controlRowInitialization: function () {
      var a = this,
        b = this.controlRow.controlRowDetails;
      "inline" === b.type &&
        (b.target =
          "." +
          (this.options.tableRuntimeEditControlClass ||
            "tableRuntimeEditControl"));
      b = b.target;
      this.$element.on(
        "click keypress",
        "string" === typeof b ? b : "td",
        function (b) {
          if (
            (("keypress" == b.type && 13 == b.keyCode) || "click" == b.type) &&
            a.$element.hasClass("collapsed")
          ) {
            var d = c(this).closest("tr");
            b = d.data("tableRow");
            if (null == b || 0 === b.child.$element.parent().length)
              (b = new h(d)), d.data("tableRow", b);
            b.child.isShown
              ? (b.hideChild(), b.$tableRowElement.removeClass("parent"))
              : ((d = a.controlRow.controlRowDetails.renderer(a, b)),
                b.updateChild(d, a.colLength),
                b.showChild(),
                b.$tableRowElement.addClass("parent"),
                b.child.$element
                  .find("input, select, textarea, button")
                  .eq(0)
                  .focus());
          }
        },
      );
    },
    _resize: function () {
      for (
        var a = c(window).width(),
          b = this.controlRow.breakpoints,
          e = b[0].name,
          f = b.length - 1;
        0 <= f;
        f--
      )
        if (a <= b[f].width) {
          e = b[f].name;
          break;
        }
      var g = this._getColumnsVisibility(e);
      d.each(this.columns, function (a, b) {
        a.visible(g[b]);
      });
      return g;
    },
    _getColumnsVisibility: function (a) {
      a = this.columns;
      this.$element.find("th");
      var b = [],
        c = this.$element.parent().outerWidth();
      b = d.map(a, function (a) {
        c -= a.minWidth;
        return 0 > c ? !1 : !0;
      });
      b[0] = !0;
      return b;
    },
  };
  c.fn.responsiveTablePlugin = function (a, b) {
    var d = "",
      e = this.each(function () {
        if (!0 === c(this).is("table")) {
          var e = c(this),
            f = e.data("responsiveTablePlugin"),
            k = c.extend({}, g.prototype.defaults, "object" === typeof a && a);
          f ||
            (e.data("responsiveTablePlugin", (f = new g(this, k))),
            f._constructor());
          "string" === typeof a && (d = f[a](b));
        }
      });
    return "" != d ? d : e;
  };
  g.prototype.defaults = {
    EVENT_COLUMN_VISIBILITY: "responsiveTablePlugin.columnVisibility",
    GUIDE_ID_SELECTOR: "div[data-guide-view-bind]",
    CONTROL_ROW_CLASS: "child",
    CONTROL_ROW_SELECTOR: "tr.child",
  };
})(_, $);
(function (d, c, f) {
  var a = function (a, b) {
      if (c.isUndefined(a) || null === a) return [];
      c.isArray(a) || (a = [a]);
      return c.filter(a, function (a) {
        return (
          a instanceof f.model.GuidePanel &&
          a[b] instanceof f.model.GuideNumericBox
        );
      });
    },
    b = function (a, b) {
      return c.reduce(
        a,
        function (a, c) {
          c = parseFloat(c.getOrElse(c, b + ".value", 0));
          isNaN(c) && (c = 0);
          return a + c;
        },
        0,
      );
    };
  f.__runtime__.af.sum = function (c, d) {
    return b(a(c, d), d);
  };
  f.__runtime__.af.avg = function (c, d) {
    c = a(c, d);
    d = b(c, d);
    return 0 === c.length ? 0 : d / c.length;
  };
  f.__runtime__.af.max = function (b, d) {
    b = c.max(a(b, d), function (a) {
      return a.getOrElse(a, d + ".value", Number.NEGATIVE_INFINITY);
    });
    return b instanceof f.model.GuidePanel ? b[d] : null;
  };
  f.__runtime__.af.min = function (b, d) {
    b = c.min(a(b, d), function (a) {
      return a.getOrElse(a, d + ".value", Number.POSITIVE_INFINITY);
    });
    return b instanceof f.model.GuidePanel ? b[d] : null;
  };
})($, _, guidelib);
(function (d, c) {
  (c.model.GuideProgressiveSection = xfalib.ut.EventClass.extend({
    msClassName: "guideProgressiveSection",
    initialize: function () {
      this.jsonModel = this.options.jsonModel;
      this.instanceIndex = this.options.instanceIndex;
      this.instance = this.options.instance;
      this.parent = this.options.parent;
      this._currActivePart = 0;
      this.className = this.jsonModel.guideNodeClass || this.msClassName;
      this._parts = [];
      this.initializeChildren();
    },
    _getChildModelFromId: function (c) {
      return this.childIdToModel[c];
    },
    initializeChildren: function () {
      var c = this,
        a = this.jsonModel.fields;
      this.children = this.children || [];
      this.childIdToModel = this.childIdToModel || {};
      d.each(a, function (a) {
        var b = guideBridge._resolveId(a.id);
        c.children.push(b);
        c.childIdToModel[a.id] = b;
      });
    },
    setFocus: function () {
      this._triggerEvent(
        c.event.GuideModelEvent.NAVIGATE_SECTION,
        "navigateWithinSection",
        null,
        null,
      );
    },
    _triggerEvent: function (d, a, b, e) {
      c.model.GuideNode.prototype._triggerEvent.apply(this, arguments);
    },
    playJson: function (c) {
      this.jsonModel = d.extend({}, c);
    },
  })).defineProps({
    sectionId: {
      get: function () {
        return this.jsonModel.id;
      },
    },
    activePart: {
      get: function () {
        return this._parts[this._currActivePart];
      },
    },
    isLastPart: {
      get: function () {
        return this._currActivePart === this._parts.length - 1;
      },
    },
    isFirstPart: {
      get: function () {
        return 0 === this._currActivePart;
      },
    },
    currentActivePart: {
      set: function (c) {
        this._currActivePart = c;
      },
      get: function () {
        return this._currActivePart;
      },
    },
    sectionTitle: {
      get: function () {
        return this.jsonModel.title;
      },
    },
    sectionName: {
      get: function () {
        return this.jsonModel.name;
      },
    },
    sectionFields: {
      get: function () {
        return this.jsonModel.fields;
      },
    },
    fetchedFromService: {
      get: function () {
        return "true" === this.jsonModel.fetchedFromService;
      },
    },
    repeatablePanelPath: {
      get: function () {
        return this.jsonModel.repeatablePanelPath;
      },
    },
    repeatablePanelId: {
      get: function () {
        return this.jsonModel.repeatablePanelId;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  (c.model.GuideProgressiveCompletionSection =
    c.model.GuideProgressiveSection.extend({
      msClassName: "guideProgressiveCompletionSection",
    })).defineProps({
    sectionId: {
      get: function () {
        return this.jsonModel.id;
      },
    },
    sectionTitle: {
      get: function () {
        return this.jsonModel.completionTitle;
      },
    },
    completionScript: {
      get: function () {
        return this.jsonModel.completionScript;
      },
    },
    completionBeforeMessage: {
      get: function () {
        return this.jsonModel.completionBeforeMessage;
      },
    },
    completionAfterMessage: {
      get: function () {
        return this.jsonModel.completionAfterMessage;
      },
    },
    completionSuccessScript: {
      get: function () {
        return this.jsonModel.completionSuccessScript;
      },
    },
    completionFailureScript: {
      get: function () {
        return this.jsonModel.completionFailureScript;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideProgressiveRepeatableSectionManager =
    c.model.GuideProgressiveSection.extend({
      msClassName: "guideProgressiveRepeatableSectionManager",
      initialize: function () {
        f._super.initialize.apply(this, arguments);
        this.isRepeatable = !0;
        this._instances = this._instances || [];
        this._initializeRepeatability();
      },
      _getSectionFromPanelId: function (a) {
        return d.find(this._instances, function (b) {
          return b.instance.id === a.id;
        });
      },
      insertInstance: function (a) {
        var b = this.instanceManager.insertInstance(a);
        null != b &&
          ((b = this._getSection(b)),
          null != b &&
            (this._instances.splice(a, 0, b),
            c.runtime.progressive.addRepeatable(b)));
      },
      removeInstance: function (a) {
        var b = a.id;
        a = a.instanceIndex;
        -1 < a &&
          this.instanceManager.instanceCount > this.instanceManager.minOccur &&
          a < this.instanceManager.instanceCount &&
          (this.instanceManager.removeInstance(a),
          this._instances.splice(a, 1),
          c.runtime.progressive.deleteRepeatable(b));
      },
      _getSection: function (a) {
        var b = null,
          e = {},
          f = a.id,
          k = a.templateId,
          h = null;
        f !== k
          ? ((h = f.substring(0, f.indexOf(k) - 2)),
            this.copyObject(this.jsonModel, e, {
              transformMaps: {
                id: function (a, b, c) {
                  return c.guideNodeClass &&
                    -1 !== c.guideNodeClass.indexOf("Progressive")
                    ? a
                    : h + "__" + a;
                },
              },
            }))
          : (e = d.extend({}, this.jsonModel));
        null != a &&
          (b = new c.model.GuideProgressiveSection({
            jsonModel: e,
            instanceIndex: a.instanceIndex,
            parent: this,
            instance: this.instanceManager.instances[a.instanceIndex],
          }));
        return b;
      },
      _initializeRepeatability: function () {
        var a = guideBridge._resolveId(this.repeatablePanelId),
          b = this;
        this.activeInstanceIndex = 0;
        this.instanceManager =
          null == a
            ? guideBridge._resolveId("im_" + this.repeatablePanelId)
            : a.instanceManager;
        null != this.instanceManager &&
          this.instanceManager.instances &&
          0 < this.instanceManager.instances.length &&
          d.each(this.instanceManager.instances, function (a) {
            b._instances.push(b._getSection(a));
          });
      },
      _getChildModelFromId: function (a) {
        return this.childIdToModel[a];
      },
      initializeChildren: function () {
        var a = this;
        this.children = this.children || [];
        this.childIdToModel = this.childIdToModel || {};
        d.each(this.jsonModel.fields, function (b) {
          var c = guideBridge._resolveId(b.id);
          a.children.push(c);
          a.childIdToModel[b.id] = c;
        });
      },
      setFocus: function () {
        this._triggerEvent(
          c.event.GuideModelEvent.NAVIGATE_SECTION,
          "navigateWithinSection",
          null,
          null,
        );
      },
      playJson: function (a) {
        this.jsonModel = d.extend({}, a);
      },
    }));
  f.defineProps({
    activeInstance: {
      set: function (a) {
        this.activeInstanceIndex = guideBridge._resolveId(a).instanceIndex;
      },
      get: function () {
        return this._instances[this.activeInstanceIndex];
      },
    },
  });
})(_, guidelib);
(function (d, c, f) {
  f.__runtime__.af.reduce = function (a, b, d, g, k) {
    c.isArray(a) || (a = [a]);
    return c.reduce(
      a,
      function (a, e) {
        return e instanceof f.model.GuidePanel &&
          !c.isUndefined(e[b]) &&
          c.isFunction(d)
          ? d.apply(k, [a, e, e[b]])
          : a;
      },
      g,
    );
  };
  f.__runtime__.af.filter = function (a, b, d, g) {
    c.isArray(a) || (a = [a]);
    return c.map(
      c.filter(a, function (a) {
        if (a instanceof f.model.GuidePanel && !c.isUndefined(a[b]))
          return c.isFunction(d) ? d.apply(g, [a, a[b]]) : !1;
      }),
      function (a) {
        return a[b];
      },
    );
  };
  f.__runtime__.af.formatDateToISOString = function (a) {
    if (!c.isUndefined(a) && c.isObject(a)) {
      var b = a.getDate().toString();
      var d = (a.getMonth() + 1).toString();
      a = a.getFullYear().toString();
      1 === d.length && (d = "0" + d.toString());
      return a + "-" + d + "-" + b;
    }
  };
})($, _, guidelib);
(function (d, c) {
  var f = (c.model.util.GuideNavigationContext = xfalib.ut.Class.extend({
    msClassName: "guideNavigationContext",
    initialize: function () {
      f._super.initialize.call(this);
      this._currentItem = this.options.currentItem;
      this._parentPanel = this.options.parentPanel;
      this.guideUtil = c.util.GuideUtil;
    },
    getQualifiedNamedItem: function (a) {
      var b = this._getNavigableItems();
      return d.find(
        b,
        function (b) {
          return b._escapeQualifiedName() == a;
        },
        this,
      );
    },
    getItemForNav: function (a) {
      return "prevItem" == a ||
        "nextItem" == a ||
        "firstItem" == a ||
        "lastItem" == a
        ? this[a]
        : this.getQualifiedNamedItem(a);
    },
    _isNavigableItem: function (a) {
      return a.visible;
    },
    _isNavigablePanel: function (a) {
      if (a && a instanceof c.model.GuidePanel)
        return a.visible && a.isNavigable;
    },
    _getNavigableItems: function () {
      return d.filter(
        this._parentPanel.items,
        function (a) {
          return this._isNavigableItem(a);
        },
        this,
      );
    },
    _getNavigableDescendant: function (a) {
      if (a && a != this._parentPanel) {
        a = a.parent._navigationContext.currentItem;
        for (var b = null; a instanceof c.model.GuidePanel; )
          (b = a), (a = a._navigationContext.currentItem);
        return b;
      }
      return null;
    },
    _getSomOnNavigableAncestor: function (a) {
      if (d.isEmpty(a)) return null;
      var b = a.lastIndexOf("."),
        c;
      var f = this._parentPanel._guide();
      return -1 !== b
        ? ((b = a.substring(0, b)),
          (f = f.resolveNode(b)) && (c = this._isNavigablePanel(f)),
          c ? a : this._getSomOnNavigableAncestor(b))
        : f.rootPanel.somExpression;
    },
    _getNavigableAncestor: function (a) {
      var b = this._parentPanel._guide(),
        c = this._getSomOnNavigableAncestor(b._currentNavigablePanelSom);
      for (
        c = b.resolveNode(c);
        c &&
        c != this._parentPanel &&
        !c.parent._navigationContext[a] &&
        this.guideUtil.isChildPartOfContainer(this._parentPanel, c);

      )
        (c = this._getSomOnNavigableAncestor(c.parent.somExpression)),
          (c = b.resolveNode(c));
      return c;
    },
    _getNakedThis: function () {
      return this;
    },
  }));
  f.defineProps({
    currentItem: {
      get: function () {
        return this._currentItem ? this._currentItem : this.firstItem;
      },
      set: function (a) {
        this._currentItem = a;
      },
    },
    prevItem: {
      get: function () {
        var a = this._getNavigableItems(),
          b = this.currentItem;
        return 0 < a.indexOf(b) ? a[a.indexOf(b) - 1] : null;
      },
    },
    nextItem: {
      get: function () {
        var a = this._getNavigableItems(),
          b = this.currentItem;
        return a.indexOf(b) < a.length - 1 ? a[a.indexOf(b) + 1] : null;
      },
    },
    nextNavigablePanel: {
      get: function () {
        var a = this._getNavigableAncestor("nextItem");
        return this._getNavigableDescendant(a);
      },
    },
    prevNavigablePanel: {
      get: function () {
        var a = this._getNavigableAncestor("prevItem");
        return this._getNavigableDescendant(a);
      },
    },
    firstItem: {
      get: function () {
        return this._getNavigableItems()[0] || null;
      },
    },
    lastItem: {
      get: function () {
        var a = this._getNavigableItems();
        return a.length ? a[a.length - 1] : null;
      },
    },
    hasNextItem: {
      get: function () {
        return null != this.nextItem;
      },
    },
    hasPrevItem: {
      get: function () {
        return null != this.prevItem;
      },
    },
    hasNextNavigablePanel: {
      get: function () {
        return null != this.nextNavigablePanel;
      },
    },
    hasPrevNavigablePanel: {
      get: function () {
        return null != this.prevNavigablePanel;
      },
    },
    isFirstItem: {
      get: function () {
        return this.currentItem == this.firstItem;
      },
    },
    isLastItem: {
      get: function () {
        return this.currentItem == this.lastItem;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = {},
    a = function (a) {
      a = a.match(/AEM(\d+)(?:\.(\d+))?/);
      return null == a
        ? null
        : { major: a[1], minor: void 0 === a[2] ? "0" : a[2] };
    },
    b = function (b, c) {
      if ("string" !== typeof b || "string" !== typeof c)
        throw "Comparing Invalid Versions";
      b = a(b);
      c = a(c);
      if (null == b || null == c) throw "Comparing Invalid Versions";
      var d = +b.major - +c.major;
      return 0 !== d ? d : +b.minor - +c.minor;
    };
  d = d.util.Version = xfalib.ut.Class.extend({
    initialize: function (b) {
      f = {};
      b = b.scriptingBehaviourVersion;
      "None" === b && (b = this.current());
      this.scriptingBehaviourVersion = b || "AEM6.5";
      b = a(this.scriptingBehaviourVersion);
      if (null == b) throw "Invalid Version number";
      this.major = b.major;
      this.minor = b.minor;
    },
    current: function () {
      return "AEM6.5";
    },
    compatibleVersion: function () {
      return this.scriptingBehaviourVersion;
    },
    isPrevious: function (a) {
      return 0 > b(this.scriptingBehaviourVersion, a);
    },
    isPreviousOrSame: function (a) {
      a = b(this.scriptingBehaviourVersion, a);
      return 0 > a || 0 == a;
    },
    isAfter: function (a) {
      return 0 < b(this.scriptingBehaviourVersion, a);
    },
    isAfterOrSame: function (a) {
      a = b(this.scriptingBehaviourVersion, a);
      return 0 < a || 0 == a;
    },
    isSame: function (a) {
      return 0 == b(this.scriptingBehaviourVersion, a);
    },
    isOn: function (a) {
      switch (a) {
        case this.Flags.RUN_VALUE_COMMMIT_ON_SCRIPT_CHANGE:
          return void 0 == f[a] && (f[a] = this.isAfter(this.AEM_61)), f[a];
        case this.Flags.RUN_VALUE_COMMMIT_ON_PREFILL:
          return void 0 == f[a] && (f[a] = this.isAfter(this.AEM_63)), f[a];
      }
      throw "Invalid Flag";
    },
  });
  d.prototype.Flags = {};
  Object.defineProperties(d.prototype.Flags, {
    RUN_VALUE_COMMMIT_ON_SCRIPT_CHANGE: {
      value: "manageValueCommit",
      writable: !1,
    },
    RUN_VALUE_COMMMIT_ON_PREFILL: {
      value: "manageValueCommitOnPrefill",
      writable: !1,
    },
  });
  d.defineProps({
    AEM_61: { value: "AEM6.1", writable: !1 },
    AEM_62: { value: "AEM6.2", writable: !1 },
    AEM_63: { value: "AEM6.3", writable: !1 },
    AEM_65: { value: "AEM6.5", writable: !1 },
  });
})(guidelib, $);
(function (d, c) {
  c.model.mixin.ValidationsDisabled = {
    normalProperties: {
      setParentValidationsDisabled: function (c) {
        var a = this.validationsDisabled;
        this._bParentValidationsDisabled = c;
        this.handleChildValidationsDisabled(this.validationsDisabled, a);
      },
      handleChildValidationsDisabled: function (f, a) {
        f !== a &&
          (this instanceof c.model.Field &&
            !0 === f &&
            !1 === this.validationState &&
            ((this._errorText = ""),
            (this.validationState = !0),
            this._triggerEvent(
              c.event.GuideModelEvent.ERROR_CHANGED,
              "validationStatus",
              this.validationState,
              this._errorText,
            )),
          d.each(this._children, function (a) {
            (a instanceof c.model.Field ||
              a instanceof c.model.GuideItemsContainer) &&
              a.setParentValidationsDisabled(f);
          }));
      },
    },
    propertyDescriptors: {
      validationsDisabled: {
        get: function () {
          return this._bParentValidationsDisabled || this._validationsDisabled;
        },
        set: function (c) {
          var a = this.validationsDisabled;
          this._validationsDisabled = c;
          this.handleChildValidationsDisabled(this.validationsDisabled, a);
        },
      },
    },
  };
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideItemsContainer = c.model.Scriptable.extend({
    msClassName: "guideItemsContainer",
    initialize: function () {
      f._super.initialize.call(this);
      this._children = [];
      this._nameArray = {};
      this._private = {};
      this._initChildren();
      this._normalizeChildren();
      this._validationsDisabled = this._bParentValidationsDisabled = !1;
    },
    _postInitialize: function () {
      f._super._postInitialize.call(this);
      d.each(
        this._children,
        function (a) {
          a._postInitialize();
        },
        this,
      );
    },
    validate: function (a) {
      var b = !0;
      if (!this.visible) return !0;
      d.isUndefined(a) && (a = []);
      var c = [],
        g;
      d.each(
        this.children,
        function (a) {
          k = a.validate(c);
          !1 === k && (b = !1);
        },
        this,
      );
      var k = f._super.validate.call(this, c);
      !1 === k && (b = !1);
      for (g = c.length; 0 < g; ) (a[a.length] = c[c.length - g]), g--;
      return b;
    },
    prepare: function () {
      d.each(
        this._children,
        function (a) {
          a.prepare();
        },
        this,
      );
      f._super.prepare.call(this);
    },
    syncXFAProps: function () {
      f._super.syncXFAProps.apply(this, arguments);
      d.each(this._children, function (a) {
        a.syncXFAProps();
      });
    },
    _initChildren: function (a) {
      var b = [],
        e = {},
        f = (a = 0);
      d.each(this.jsonModel.items, function (a) {
        a.templateId &&
          -1 === a.templateId.indexOf("GUID") &&
          (e[a.templateId] = a);
      });
      a = d.keys(e).length;
      f = d.keys(this.jsonModel.items || {}).length;
      0 < a && a !== f && (this.jsonModel.items = e);
      d.each(
        this.jsonModel.items,
        function (a) {
          if (d.isObject(a)) {
            var e = {};
            this.options._guideContainer &&
              (e = d.extend({}, e, {
                _guideContainer: this.options._guideContainer,
              }));
            a = c.model.GuideModelRegistry.prototype.createModel(a, e);
            a._isItem = !0;
            this._initializeChild(a);
            b.push(a);
          }
        },
        this,
      );
      this._children = b;
    },
    _initializeChild: function (a) {
      a.parent = this;
    },
    _normalizeChildren: function () {
      this._nameArray = {};
      this._private = {};
      d.each(
        this.children,
        function (a) {
          a._index = this._addProperty(a);
          a.getNaked(a._index, c.__runtime__, null);
          a.getNaked(a._index, this._guide().runtime, null);
        },
        this,
      );
    },
    nakedChildReferences: function (a, b) {
      var c;
      for (c = 0; c < this._children.length; c++) {
        var d = this._children[c];
        d.getNaked(a, b, this);
      }
    },
    _getReducedJSON: function (a) {
      var b = this,
        c = 0;
      var g = f._super._getReducedJSON.call(this);
      g.items = {};
      d.each(this.jsonModel.items, function (d, e) {
        g.items[e] = b.items[c]._getReducedJSON(a);
        c += 1;
      });
      return g;
    },
    _addProperty: function (a) {
      var b = a.getAttribute("name");
      this._nameArray[b] = this._nameArray[b] || 0;
      var d = this._nameArray[b]++;
      0 === d && c.util.GuideUtil._createGetterSetter(this, b, a);
      return d;
    },
    _getTitle: function () {
      return this.jsonModel["jcr:title"];
    },
    visit: function (a, b) {
      f._super.visit.apply(this, arguments);
      d.each(this._children, function (c, d) {
        c.visit(a, b);
      });
    },
    playJson: function (a) {
      if (a) {
        var b = d.filter(
          a.items,
          function (a) {
            return d.isObject(a) ? !0 : !1;
          },
          this,
        );
        d.each(
          this.items,
          function (a, c) {
            a.playJson(b[c]);
          },
          this,
        );
        f._super.playJson.call(this, a);
      }
    },
    _collectValues: function (a) {
      d.each(
        this._children,
        function (b) {
          b._collectValues(a);
        },
        this,
      );
    },
    getElement: function (a) {
      return d.find(
        this._children,
        function (b) {
          return b.className === a;
        },
        this,
      );
    },
    _unloadModel: function () {
      d.each(
        this.children,
        function (a) {
          a._unloadModel();
        },
        this,
      );
      f._super._unloadModel.call(this);
    },
    _findChildren: function (a, b) {
      var c = [],
        f = !1;
      d.find(
        this._children,
        function (d) {
          a === d._escapeQualifiedName() &&
            (c.push(d._getNakedThis()), (f = !0));
          if ((f && !b) || (f && 0 > a.indexOf("[*]"))) return !0;
        },
        this,
      );
      return c;
    },
    resetData: function () {
      d.each(
        this._children,
        function (a) {
          a.resetData();
        },
        this,
      );
    },
    _changeDescendantsAccess: function (a) {
      d.each(
        this.items,
        function (b) {
          b._setParentAccess(a);
          b instanceof c.model.GuideItemsContainer &&
            b._changeDescendantsAccess(a);
        },
        this,
      );
    },
    _changeContainerAccess: function (a) {
      this._changeDescendantsAccess(a);
    },
    _changeDescendantsProperty: function (a, b, e) {
      d.each(
        this.items,
        function (d) {
          d instanceof c.model.GuideItemsContainer
            ? (e || (d[b] = a), d._changeDescendantsProperty(a, b))
            : (d[b] = a);
        },
        this,
      );
    },
    disableAllFields: function () {
      this.enabled = !1;
      this._changeDescendantsProperty(!1, "enabled", !0);
    },
  }));
  f.defineProps({
    children: {
      get: function () {
        return (this._children || []).slice(0);
      },
      set: function (a) {
        this._children = a;
      },
    },
    items: {
      get: function () {
        return d.filter(
          this._children,
          function (a) {
            return a._isItem ? !0 : !1;
          },
          this,
        );
      },
    },
    _selfOrAncestorIsLazyReference: {
      get: function () {
        return this._lazyReference
          ? !0
          : c.util.GuideUtil._checkIfAncestorIsALazyReference(this);
      },
    },
    _lazyReference: {
      get: function () {
        return (
          !d.isUndefined(this.jsonModel.fragRef) &&
          !d.isUndefined(this.jsonModel.optimizeRenderPerformance)
        );
      },
    },
  });
  f.addMixins([c.model.mixin.ValidationsDisabled]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideCompositeField = c.model.GuideItemsContainer.extend({
    msClassName: "guideCompositeField",
    initialize: function () {
      this._uuid = guideBridge._produceUUID();
      f._super.initialize.call(this);
    },
    _setGuideValue: function (a) {
      d.isEmpty(a) ||
        d.each(
          this.items,
          function (b) {
            a.hasOwnProperty(b.name) &&
              d.isFunction(b._setGuideValue) &&
              b._setGuideValue(a[b.name]);
          },
          this,
        );
    },
    _collectExpressions: function () {
      f._super._collectExpressions.apply(this);
      this.valueCommitScript &&
        (this._compiledScripts.valueCommitScript = this._compileExpression(
          this.valueCommitScript,
          null,
        ));
    },
  }));
  f.defineProps({
    valueCommitScript: {
      get: function () {
        return this.getAttribute("valueCommitScript");
      },
    },
    uuid: {
      get: function () {
        return this._uuid;
      },
      set: function (a) {
        this._uuid != a && (this._uuid = a);
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideFileUpload = c.model.GuideCompositeField.extend({
    msClassName: "guideFileUpload",
    _getReducedJSON: function () {
      this._syncModelToAttachments();
      var a = f._super._getReducedJSON.call(this);
      c.model.util.CommonUtils.returnMinimalJSON(["id", "files"], a, this);
      a.files = this._getFileAttachmentNames(a.files);
      return a;
    },
    _getContentType: function (a) {
      var b = null;
      if (this._fileAttachmentWrapper) {
        var c = this._fileAttachmentWrapper.find(function (b) {
          return b.data === a;
        });
        c && (b = c.contentType);
      }
      return b;
    },
    _getFileAttachmentNames: function (a) {
      if ((a = a || this.value)) {
        var b = this;
        return d
          .map(a.split("\n"), function (a) {
            if (b._fileAttachmentWrapper) {
              var c = b._fileAttachmentWrapper.find(function (b) {
                return b.data === a;
              });
              if (c) return c.name;
            }
            c = a;
            c.lastIndexOf("/") === c.length - 1 &&
              (c = c.substring(0, c.length - 1));
            return c.substring(c.lastIndexOf("/") + 1);
          })
          .join("\n");
      }
    },
    _triggerFileListChange: function () {
      var a = this._fileList;
      this.trigger(
        c.event.GuideModelEvent.MODEL_CHANGED,
        c.event.GuideModelEvent.createEvent(
          c.event.GuideModelEvent.MODEL_CHANGED,
          this,
          "fileList",
          a,
          a,
        ),
      );
    },
    _getCurrentFileAttachmentWrapper: function (a) {
      var b = null,
        c = this._getEffectiveBindRef();
      d.isArray(a) &&
        0 < a.length &&
        (b = a.filter(function (a) {
          return a.bindRef === c;
        }));
      return b;
    },
    _playAttachmentWrappers: function (a) {
      var b = this.fileAttachment.value,
        c = this._guide();
      d.isArray(a) &&
        0 < a.length &&
        ((this._fileAttachmentWrapper = a),
        this.valueCommitScript &&
          c.version.isOn(c.version.Flags.RUN_VALUE_COMMMIT_ON_PREFILL) &&
          b &&
          c.queueExpressions(this, ["valueCommitScript"]),
        (a = a
          .map(function (a) {
            return a.data;
          })
          .join("\n")),
        this.fileAttachment._setGuideValue(a),
        d.isEmpty(a) || (this._fileList = a.split("\n")));
    },
    playJson: function (a, b) {
      a = this._getCurrentFileAttachmentWrapper(b);
      this._playAttachmentWrappers(a);
    },
    _syncModelToAttachments: function () {
      var a = this.fileAttachment.value || "",
        b = guideBridge._makeFileNameUnique();
      this.jsonModel.files = d
        .map(
          a.split("\n"),
          function (a, c) {
            d.isEmpty(a) ||
              (b &&
                "/" !== a[0] &&
                (a = this.uuid + "-" + (c + 1) + "__afAttachment__" + a));
            return a;
          },
          this,
        )
        .join("\n");
    },
    _updateLiveData: function (a, b) {
      this._syncModelAndData(a, b, "_updateLiveData");
    },
    _playLiveData: function (a, b) {
      this._syncModelAndData(a, b, "_playLiveData");
    },
    _handleFileAttachmentItem: function (a, b, c, f) {
      var e = this._guide().internal.liveDataUtils;
      b = e._getDataContext(a, b, c);
      if ("_updateLiveData" == f)
        e._updateLazyAttachmentMapFromModel(this),
          e.setDataValue(
            b.indexedXpath,
            b.xmlSec,
            !a.isEmpty(),
            a.isEmpty() ? "" : this._getFileAttachmentValue(),
          );
      else {
        f = e._getAttachmentDataForModel(this);
        if (!d.isArray(f) && !d.isEmpty(f)) {
          this.fileList = f.fileList;
          var g = [];
          e = f.value.split("\n");
          d.each(e, function (a, b) {
            "/" != a[0]
              ? ((a = a.substr(a.lastIndexOf("_") + 1)), g.push(a))
              : g.push(a);
          });
          a.value = g.join("\n");
        }
        d.isArray(f) && 0 < f.length && this._playAttachmentWrappers(f);
        this._syncModelToAttachments();
      }
    },
    _syncModelAndData: function (a, b, c) {
      if (d.isString(c)) {
        var e = this._guide().internal.liveDataUtils,
          f = e._getDataContext(this, a, b);
        f.xmlSec === e.constants.BOUND_TAG
          ? (a = f.indexedXpath)
          : (b = f.indexedXpath);
        d.each(
          this.items,
          function (e) {
            if (d.isFunction(e[c]))
              if ("fileAttachment" == e.name)
                this._handleFileAttachmentItem(e, a, b, c);
              else e[c](a, b);
          },
          this,
        );
      }
    },
    _getIndexedXpath: function (a, b, c) {
      a = a.getAttribute("name").replace(/\s+/g, "");
      return c ? c + "/" + a : b + "/" + a;
    },
    _getFileAttachmentValue: function () {
      this._syncModelToAttachments();
      return this._getFileAttachmentNames(this.jsonModel.files);
    },
  }));
  f.defineProps({
    multiSelection: {
      get: function () {
        return this.getAttribute("multiSelection");
      },
    },
    buttonText: {
      get: function () {
        return this.getAttribute("buttonText");
      },
    },
    showComment: {
      get: function () {
        return this.getAttribute("showComment");
      },
    },
    fileSizeLimit: {
      get: function () {
        return this.getAttribute("fileSizeLimit");
      },
    },
    fileList: {
      get: function () {
        return this._fileList;
      },
      set: function (a) {
        a != this._fileList && (this._fileList = a);
        var b = c.util.GuideUtil._isIOS();
        a = this._fileList;
        var e = this;
        if (b && a)
          for (this._fileAttachmentWrapperIOS = [], b = 0; b < a.length; b++)
            if (!d.isString(a[b])) {
              var f = a[b].get(0).files,
                k = function (a) {
                  e._fileAttachmentWrapperIOS.push(
                    new Promise(function (b, d) {
                      var f = new FileReader();
                      f.onload = function () {
                        var d = new c.model.FileAttachmentWrapper({
                          name: a.name,
                          data: this.result,
                          formElementName: e.name,
                          contentType: a.type,
                          bindRef: e._getEffectiveBindRef(),
                        });
                        b(d);
                      };
                      f.onerror = d;
                      f.readAsDataURL(a);
                    }),
                  );
                };
              f && [].forEach.call(f, k);
            }
        this._triggerFileListChange();
      },
    },
    value: {
      get: function () {
        this._syncModelToAttachments();
        return this.jsonModel.files;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideTermsAndConditions = c.model.GuideCompositeField.extend(
    {
      msClassName: "guideTermsAndConditions",
      playJson: function (a) {
        this.jsonModel.clickStatus = a.clickStatus;
        f._super.playJson.apply(this, arguments);
      },
      _updateLiveData: function (a, b) {
        this._syncModelAndData(a, b, "_updateLiveData");
      },
      _playLiveData: function (a, b) {
        this._syncModelAndData(a, b, "_playLiveData");
        this.clickStatus =
          "true" === this.reviewStatus.value ? "agree" : "unreviewed";
      },
      _syncModelAndData: function (a, b, c) {
        if (d.isString(c)) {
          var e = this._guide().internal.liveDataUtils._getDataContext(
            this,
            a,
            b,
          );
          e.xmlSec === this._guide().internal.liveDataUtils.constants.BOUND_TAG
            ? (a = e.indexedXpath)
            : (b = e.indexedXpath);
          d.each(this.items, function (e) {
            if (d.isFunction(e[c])) e[c](a, b);
          });
        }
      },
    },
  ));
  f.defineProps({
    showLink: {
      get: function () {
        return this.getAttribute("showLink");
      },
    },
    clickStatus: {
      get: function () {
        return this.getAttribute("clickStatus");
      },
      set: function (a) {
        this.setAttribute(a, "clickStatus");
      },
    },
    showAsPopUp: {
      get: function () {
        return this.getAttribute("showAsPopUp");
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideToolbar = c.model.GuideItemsContainer.extend({
    msClassName: "guideToolbar",
    initialize: function () {
      f._super.initialize.call(this);
    },
    execNavigationChangeExpression: function () {
      d.each(
        this.items,
        function (a) {
          a.navigationChangeExp &&
            this._guide().queueExpressions(a, "navigationChangeExp");
        },
        this,
      );
    },
  }));
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideAdModuleGroup = c.model.GuideItemsContainer.extend({
    msClassName: "guideAdModuleGroup",
    _getTypedValue: function (a) {
      return d.isUndefined(a) || null === a ? null : a + "";
    },
    playJson: function (a) {
      var b = this._getTypedValue(a._value);
      b || "" === b
        ? ((b = this.jsonModel._value),
          (this.jsonModel._value = a._value),
          this._triggerOnBridge(
            "elementValueChanged",
            this,
            "value",
            b,
            this.jsonModel._value,
          ))
        : f._super.playJson.call(this, a);
    },
  }));
  f.defineProps({
    value: {
      get: function () {
        return this._getTypedValue(this.jsonModel._value);
      },
      set: function (a) {
        var b = this._getTypedValue(this.jsonModel._value),
          c = this._getTypedValue(a);
        void 0 !== c &&
          c !== b &&
          (this.jsonModel._value !== a && (this.jsonModel._value = c || ""),
          this._triggerOnBridge("elementValueChanged", this, "value", b, c));
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  c.model.mixin.AddDependencyMgmt = {
    normalProperties: {
      _addDependant: function (d, a) {
        var b = this._findDependant(d);
        b || ((b = { dependant: d, events: [] }), this.dependants.push(b));
        0 > b.events.indexOf(a) &&
          (b.events.push(a),
          d.on(
            c.event.GuideModelEvent.OBJECT_DESTROYED,
            this._handleDependentDestroyed,
            this,
          ));
      },
      _notifyDependants: function () {
        d.each(
          this.dependants,
          function (c) {
            this._guide().queueExpressions(c.dependant, c.events);
          },
          this,
        );
      },
      _removeDependant: function (f) {
        f.off(
          c.event.GuideModelEvent.OBJECT_DESTROYED,
          this._handleDependentDestroyed,
          this,
        );
        f = this._findDependant(f);
        this.dependants = d.without(this.dependants, f);
      },
      _findDependant: function (c) {
        return d.find(this.dependants, function (a) {
          return a.dependant === c;
        });
      },
      _handleDependentDestroyed: function (c) {
        this._removeDependant(c.target);
      },
    },
  };
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideChart = c.model.Scriptable.extend({
    msClassName: "guideChart",
    _collectExpressions: function () {
      f._super._collectExpressions.apply(this);
      this._compiledExpressions.aggregateExp = this._compileExpression(
        "guidelib.chartUtils.gatherAxisData(this);",
        "data",
      );
    },
  }));
  f.defineProps({
    data: {
      get: function () {
        var a = this._guide()._currentContext;
        a &&
          a.contextNode &&
          a.expression &&
          (a.contextNode !== this || "aggregateExp" !== a.expression) &&
          this._addDependant(a.contextNode, a.expression);
        return this.jsonModel.data;
      },
      set: function (a) {
        var b = this.jsonModel.data;
        this.jsonModel.data = a;
        d.isEqual(b, a) ||
          (this._notifyDependants(),
          this._triggerEvent(
            c.event.GuideModelEvent.MODEL_CHANGED,
            "data",
            b,
            a,
          ));
      },
    },
    dataSourceType: {
      get: function () {
        return this.getAttribute("dataSourceType");
      },
      set: function (a) {
        var b = this.jsonModel.dataSourceType;
        this.jsonModel.dataSourceType = a;
        this._triggerEvent(
          c.event.GuideModelEvent.MODEL_CHANGED,
          "dataSourceType",
          b,
          a,
        );
      },
    },
    width: {
      get: function () {
        return this.getAttribute("width");
      },
      set: function (a) {
        this.jsonModel.width = a;
      },
    },
    height: {
      get: function () {
        return this.getAttribute("height");
      },
      set: function (a) {
        this.jsonModel.height = a;
      },
    },
    xAxisTitle: {
      get: function () {
        return this.getAttribute("xAxisTitle");
      },
      set: function (a) {
        this.jsonModel.chartType = a;
      },
    },
    yAxisTitle: {
      get: function () {
        return this.getAttribute("yAxisTitle");
      },
      set: function (a) {
        this.jsonModel.chartType = a;
      },
    },
    chartType: {
      get: function () {
        return this.getAttribute("chartType");
      },
      set: function (a) {
        var b = this.jsonModel.chartType;
        this.jsonModel.chartType = a;
        this._triggerEvent(
          c.event.GuideModelEvent.MODEL_CHANGED,
          "chartType",
          b,
          a,
        );
      },
    },
    repeatableItem: {
      get: function () {
        return this.getAttribute("repeatableItem");
      },
      set: function (a) {
        this.jsonModel.repeatableItem = a;
      },
    },
    xExp: {
      get: function () {
        return this.getAttribute("xExp");
      },
      set: function (a) {
        this.jsonModel.xExp = a;
      },
    },
    reducerXFunction: {
      get: function () {
        return this.getAttribute("reducerXFunction");
      },
      set: function (a) {
        this.jsonModel.reducerXFunction = a;
        "none" !== a && (this.jsonModel.reducerYFunction = "none");
      },
    },
    yExp: {
      get: function () {
        return this.getAttribute("yExp");
      },
      set: function (a) {
        this.jsonModel.yExp = a;
      },
    },
    reducerYFunction: {
      get: function () {
        return this.getAttribute("reducerYFunction");
      },
      set: function (a) {
        this.jsonModel.reducerYFunction = a;
        "none" !== a && (this.jsonModel.reducerXFunction = "none");
      },
    },
    innerRadius: {
      get: function () {
        return this.getAttribute("innerRadius");
      },
      set: function (a) {
        this.jsonModel.innerRadius = a;
      },
    },
    lineColor: {
      get: function () {
        return this.getAttribute("lineColor");
      },
      set: function (a) {
        this.jsonModel.lineColor = a;
      },
    },
    pointColor: {
      get: function () {
        return this.getAttribute("pointColor");
      },
      set: function (a) {
        this.jsonModel.pointColor = a;
      },
    },
    areaColor: {
      get: function () {
        return this.getAttribute("areaColor");
      },
      set: function (a) {
        this.jsonModel.areaColor = a;
      },
    },
    tooltipHtml: {
      get: function () {
        return this.getAttribute("tooltipHtml");
      },
      set: function (a) {
        this.jsonModel.tooltipHtml = a;
      },
    },
    showLegends: {
      get: function () {
        return this.getAttribute("showLegends");
      },
      set: function (a) {
        this.jsonModel.showLegends = a;
      },
    },
    legendPosition: {
      get: function () {
        return this.getAttribute("legendPosition");
      },
      set: function (a) {
        this.jsonModel.legendPosition = a;
      },
    },
  });
  f.addMixins([c.model.mixin.AddDependencyMgmt]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.Field = c.model.Scriptable.extend({
    msClassName: "field",
    _runValidation: !0,
    initialize: function () {
      f._super.initialize.call(this);
      this.jsonModel["{default}"] = this.getOrElse(
        this.jsonModel,
        "{default}",
        this.jsonModel._value,
      );
      this.isValid = !0;
      this._validationsDisabled =
        this._bParentValidationsDisabled =
        this.forceErrorShow =
          !1;
      this._failedTest = null;
      this._errorText = "";
      var a = this._getEffectiveBindRef();
      (this.isGlobal ||
        (this._guide() && this._guide().internal.liveModel.isLive(a))) &&
        this._guide().internal.liveModel.add(a, this);
    },
    _postInitialize: function () {
      f._super._postInitialize.call(this);
      null !== this.getAttribute("dorExclusion") &&
        !1 === this.jsonModel.visible &&
        ("true" === this._guide().getAttribute("excludeFromDoRIfHidden") ||
          (this._guide().print &&
            "true" === this._guide().print.excludeFromDoRIfHidden)) &&
        (this.dorExclusion = !0);
    },
    _unloadModel: function () {
      var a = this.bindRef || this.getAttribute("name");
      (this.isGlobal || this._guide().internal.liveModel.isLive(a)) &&
        this._guide().internal.liveModel.remove(a, this);
      f._super._unloadModel.call(this);
    },
    _collectExpressions: function () {
      f._super._collectExpressions.apply(this);
      this.calcExp &&
        (this._compiledExpressions.calcExp = this._compileExpression(
          this.calcExp,
          "value",
        ));
      this.validateExp &&
        (this._compiledScripts.validateExp = this._compileExpression(
          this.validateExp,
          null,
        ));
      this.valueCommitScript &&
        (this._compiledScripts.valueCommitScript = this._compileExpression(
          this.valueCommitScript,
          null,
        ));
      this._compiledScripts.validateAllExp = this._compileExpression(
        "this._runTests()",
        null,
      );
    },
    _handleXfaModelChanged: function (a) {
      "rawValue" === a._property
        ? this._triggerEvent(
            c.event.GuideModelEvent.VALUE_CHANGED,
            "value",
            a.prevText,
            a.newText,
          )
        : "ClearError" == a._property || "ValidationState" == a._property
          ? this._guide().queueExpressions(this, ["validateAllExp"])
          : f._super._handleXfaModelChanged.call(this, a);
    },
    validate: function (a) {
      if (!this.visible) return !0;
      d.isUndefined(a) && (a = []);
      var b = !0;
      this._runTests(!0);
      this._errorText &&
        (a.push({ som: this.somExpression, errorText: this._errorText }),
        (b = !1));
      return b;
    },
    _getTypedValue: function (a) {
      return this.checkIfNull(a) ? null : a + "";
    },
    _getFormattedValue: function (a) {
      if (d.isUndefined(a) || null === a || "" === a) return null;
      var b = this.jsonModel.displayPictureClause;
      if (b)
        try {
          var c = xfalib.ut.PictureFmt.format(a + "", b, null, !0);
          return null != c && "" !== c ? c : a;
        } catch (g) {}
      return a;
    },
    _getValue: function () {
      return this.bindNode
        ? this.bindNode.rawValue
        : this._getTypedValue(this.jsonModel._value);
    },
    _triggerDisplayFormatChange: function () {
      var a = this._getValue();
      this._triggerEvent(
        c.event.GuideModelEvent.VALUE_CHANGED,
        "value",
        a,
        this._getFormattedValue(a),
      );
    },
    checkIfNull: function (a) {
      return null == a || "" === a;
    },
    isEmpty: function () {
      return this.checkIfNull(this.value);
    },
    _setXFAValue: function (a) {
      this.bindNode.rawValue = a;
    },
    _setXFAMandatory: function (a) {
      var b = this._guide()._guideSchema.getConvertor("mandatory");
      b && (this.bindNode.validate.nullTest = b.guideToXfa.apply(this, [!!a]));
    },
    _setGuideValue: function (a) {
      this.jsonModel._value = void 0 === a || null === a ? null : a;
    },
    _runMandatoryTest: function () {
      var a = this._getValue();
      return !this.checkIfNull(a);
    },
    _runValidatePictureTest: function () {
      var a = this._getValue(),
        b = !0;
      if (!this.checkIfNull(a) && this.validatePictureClause)
        try {
          a = xfalib.ut.PictureFmt.format(
            a + "",
            this.validatePictureClause,
            null,
            !1,
          );
        } catch (g) {
          this.logger().log("AF", g),
            (a = -1 !== g.indexOf("Invalid picture clause") ? void 0 : null);
        }
      if (d.isUndefined(a))
        try {
          var c = new RegExp(this.validatePictureClause);
          b = c.test(this._getValue());
        } catch (g) {
          this.logger().error("AF", "Invalid Regular Expression" + g), (b = !1);
        }
      else null === a && (b = !1);
      return b;
    },
    _runTests: function (a) {
      var b = this._errorText,
        d = this.validationState,
        f = { validFlag: !0, forceRun: a };
      if (!0 === this.validationsDisabled) return !0;
      this._runValidations(f);
      f.validFlag
        ? ((this._errorText = ""),
          (this.validationState = !0),
          (this._failedTest = null))
        : (this.validationState = !1);
      if (b !== this._errorText || d !== this.validationState || a)
        a && (this.forceErrorShow = !0),
          this._triggerEvent(
            c.event.GuideModelEvent.ERROR_CHANGED,
            "validationStatus",
            this.validationState,
            this._errorText,
          );
      return this.validationState;
    },
    playJson: function (a) {
      var b = a._value,
        c = this._guide();
      this.valueCommitScript &&
        c.version.isOn(c.version.Flags.RUN_VALUE_COMMMIT_ON_PREFILL) &&
        b &&
        c.queueExpressions(this, ["valueCommitScript"]);
      this._setGuideValue(a._value);
    },
    _runValidations: function (a) {
      var b = !1,
        c =
          "date.default{} date.short{} date.medium{} date.long{} date.full{} num.percent{} num.decimal{} num.currency{}".split(
            " ",
          );
      if (this.bindNode) {
        if (this.validatePictureClause && (this.value || 0 === this.value))
          try {
            xfalib.ut.PictureFmt.format(
              this.value + "",
              this.validatePictureClause,
              null,
              !1,
            );
          } catch (g) {
            0 <= c.indexOf(this.validatePictureClause)
              ? (b = !1)
              : -1 !== g.indexOf("Invalid picture clause") && (b = !0);
          }
        if (b) {
          try {
            a.validFlag = new RegExp(this.validatePictureClause).test(
              this._getValue(),
            );
          } catch (g) {
            this.logger().error(
              "AF",
              "Error in running regular expression" + g,
            ),
              (a.validFlag = !1);
          }
          a.validFlag ||
            (this.bindNode._setErrorData(
              "formatTest",
              this.getOrElse(
                this.bindNode.validate.formatTest,
                this.bindNode._defaults.validate.formatTest,
              ),
              this.bindNode.formatMessage,
            ),
            (this._errorText = this.bindNode._errorText),
            xfalib.ut.XfaUtil.prototype._triggerOnBridge(
              "elementValidationStatusChanged",
              this.bindNode,
              "validationStatus",
              !1,
              !0,
            ),
            this.bindNode.execEvent("validationState"));
        } else if (
          (a.forceRun && this.bindNode.execValidate(),
          (this._errorText = this.bindNode._errorText))
        )
          a.validFlag = !1;
        this._failedTest = this.bindNode._mFailedValTest;
      } else
        this.mandatory &&
          ((a.validFlag = this._runMandatoryTest()),
          a.validFlag ||
            ((this._errorText = this.mandatoryMessage),
            (this._failedTest = this.guideUtil.MANDATORY_TEST))),
          a.validFlag &&
            this.validatePictureClause &&
            !this.checkIfNull(this.value) &&
            ((a.validFlag = this._runValidatePictureTest()),
            a.validFlag ||
              ((this._errorText = this.validatePictureClauseMessage),
              (this._failedTest = this.guideUtil.FORMAT_TEST)));
      a.validFlag &&
        this.validateExp &&
        ((a.validFlag = this.executeExpression("validateExp")),
        a.validFlag ||
          ((this._errorText = this.validateExpMessage),
          (this._failedTest = this.guideUtil.SCRIPT_TEST)));
    },
    _collectValues: function (a) {
      a[this.name] = this.value;
    },
    resetData: function () {
      this._runValidation = !1;
      this.value = this.jsonModel["{default}"];
      this._runValidation = !0;
      this._errorText = "";
      this.validationState = !0;
      this._failedTest = null;
      this._triggerEvent(
        c.event.GuideModelEvent.ERROR_RESET,
        "validationStatus",
        this.validationState,
        this._errorText,
      );
    },
    _preserveLazyValue: function () {
      return !(
        d.contains(
          ["guideButton", "guideTextDraw", "guideAdobeSignBlock"],
          this.className,
        ) || this._isXfaNode()
      );
    },
    _updateLiveData: function (a, b) {
      if (this._preserveLazyValue()) {
        var d = this._guide().internal.liveDataUtils;
        a = d._getDataContext(this, a, b);
        (this instanceof c.model.GuideTextBox && this.allowRichText
          ? d.setRichTextValue
          : d.setDataValue
        ).apply(d, [
          a.indexedXpath,
          a.xmlSec,
          !this.isEmpty(),
          this.isEmpty() ? "" : this.value,
        ]);
      }
    },
    _playLiveData: function (a, b) {
      if (this._preserveLazyValue()) {
        var d = this._guide().internal.liveDataUtils;
        a = d._getDataContext(this, a, b);
        d = (
          this instanceof c.model.GuideTextBox && this.allowRichText
            ? d.getRichTextValue
            : d.getDataValue
        ).apply(d, [a.indexedXpath, a.xmlSec]);
        void 0 != d && (this.value = d);
      }
    },
    _allowEmptyValueString: function () {
      return !1;
    },
    markAsInvalid: function (a) {
      this.validationState = !1;
      a || (a = this.validateExpMessage);
      this._triggerEvent(
        c.event.GuideModelEvent.ERROR_CHANGED,
        "validationStatus",
        this.validationState,
        a,
      );
    },
    _isStateOverridden: function (a) {
      return null != this.getOrElse(this.jsonModel.stateOverrides, a, null);
    },
  }));
  f.defineProps({
    calcExp: {
      get: function () {
        return this.getAttribute("calcExp");
      },
    },
    isGlobal: {
      get: function () {
        return "true" === this.getAttribute("isGlobal");
      },
    },
    title: {
      get: function () {
        return this.getAttribute("jcr:title");
      },
      set: function (a) {
        this.setAttribute(a, "jcr:title");
      },
    },
    valueCommitScript: {
      get: function () {
        return this.getAttribute("valueCommitScript");
      },
    },
    validateExp: {
      get: function () {
        return this.getAttribute("validateExp");
      },
    },
    placeholderText: {
      get: function () {
        return this.getAttribute("placeholderText");
      },
    },
    value: {
      get: function () {
        var a = this.getOrElse(this._guide(), "_currentContext", null);
        a &&
          a.managedExp &&
          (a.contextNode !== this || "calcExp" !== a.expression) &&
          this._addDependant(a.contextNode, a.expression);
        return this._getValue();
      },
      set: function (a) {
        var b = this._getValue(),
          c = this._getTypedValue(a),
          d = this._guide();
        this._allowEmptyValueString() && "" === a && (c = "");
        if (
          !(void 0 === c || (this.checkIfNull(c) && this.checkIfNull(b))) &&
          c !== b
        ) {
          this.bindNode
            ? this._setXFAValue(c)
            : this.jsonModel._value !== a && this._setGuideValue(c);
          if (
            d &&
            d.version.isOn(d.version.Flags.RUN_VALUE_COMMMIT_ON_SCRIPT_CHANGE)
          ) {
            a = d._currentContext;
            var f = this.getOrElse(a, "contextNode", null),
              h = this.getOrElse(a, "expression", null);
            (a && f == this && "valueCommitScript" == h) ||
              d.queueExpressions(this, ["valueCommitScript"]);
          }
          this._notifyDependants();
          this._runValidation &&
            d &&
            d.queueExpressions(this, ["validateAllExp"]);
          this._triggerOnBridge("elementValueChanged", this, "value", b, c);
          (!this.bindNode ||
            (this.bindNode && void 0 !== this.getAttribute("html5Type"))) &&
            this._triggerDisplayFormatChange();
        }
      },
    },
    formattedValue: {
      get: function () {
        return this.bindNode
          ? this.bindNode.formattedValue
          : this._getFormattedValue(this._getValue());
      },
    },
    displayPictureClause: {
      get: function () {
        return this.getAttribute("displayPictureClause");
      },
    },
    validatePictureClause: {
      get: function () {
        return this.jsonModel.displayIsSameAsValidate
          ? this.displayPictureClause
          : this.getAttribute("validatePictureClause");
      },
    },
    editPictureClause: {
      get: function () {
        return this.jsonModel.isEditSameAsDisplayPattern
          ? this.displayPictureClause
          : this.getAttribute("editPictureClause");
      },
    },
    isEditPictureClausePresent: {
      get: function () {
        return "undefined" !== typeof this.editPictureClause;
      },
    },
    mandatory: {
      get: function () {
        return this.getAttribute("mandatory");
      },
      set: function (a) {
        var b = this.getAttribute("mandatory");
        void 0 !== a &&
          b !== a &&
          (this.bindNode
            ? this._setXFAMandatory(a)
            : (this.jsonModel.mandatory = !!a),
          this._triggerEvent(
            c.event.GuideModelEvent.MODEL_CHANGED,
            "mandatory",
            b,
            a,
          ));
      },
    },
    mandatoryMessage: {
      get: function () {
        return this.getAttribute("mandatoryMessage");
      },
    },
    validateExpMessage: {
      set: function (a) {
        this.isValid
          ? (this.jsonModel.validateExpMessage = a)
          : this.setAttribute(a, "validateExpMessage");
      },
      get: function () {
        return this.getAttribute("validateExpMessage");
      },
    },
    validatePictureClauseMessage: {
      get: function () {
        return this.getAttribute("validatePictureClauseMessage");
      },
    },
    validationState: {
      get: function () {
        return this.isValid;
      },
      set: function (a) {
        var b = this.isValid;
        b != a &&
          ((this.isValid = a),
          this._triggerOnBridge(
            "elementValidationStatusChanged",
            this,
            "validationStatus",
            b,
            a,
          ));
      },
    },
    width: {
      get: function () {
        return this.getAttribute("width");
      },
      set: function (a) {
        this.jsonModel.width = a;
      },
    },
    height: {
      get: function () {
        return this.getAttribute("height");
      },
      set: function (a) {
        this.jsonModel.height = a;
      },
    },
  });
  f.addMixins([
    c.model.mixin.AddDependencyMgmt,
    c.model.mixin.ValidationsDisabled,
  ]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideButton = c.model.Field.extend({
    msClassName: "guideButton",
    defaultClickExpressions: {
      moveNext:
        "window.guideBridge.setFocus(this.panel.somExpression, 'nextItem', true)",
      movePrev:
        "window.guideBridge.setFocus(this.panel.somExpression, 'prevItem', true)",
    },
    defaultNavigationExpressions: {
      moveNext: "this.visible\x3dthis.panel.navigationContext.hasNextItem",
      movePrev: "this.visible\x3dthis.panel.navigationContext.hasPrevItem",
    },
    _collectExpressions: function () {
      f._super._collectExpressions.apply(this);
      this.clickExp
        ? (this._compiledScripts.clickExp = this._compileExpression(
            this.clickExp,
            null,
          ))
        : 1.1 <= this.targetVersion &&
          this.defaultClickExpressions[this.type] &&
          ((this.jsonModel.clickExp = this.defaultClickExpressions[this.type]),
          (this._compiledScripts.clickExp = this._compileExpression(
            this.clickExp,
            null,
          )));
      this.navigationChangeExp
        ? (this._compiledScripts.navigationChangeExp = this._compileExpression(
            this.navigationChangeExp,
            null,
          ))
        : 1.1 <= this.targetVersion &&
          this.defaultNavigationExpressions[this.type] &&
          ((this.jsonModel.navigationChangeExp =
            this.defaultNavigationExpressions[this.type]),
          (this._compiledScripts.navigationChangeExp = this._compileExpression(
            this.navigationChangeExp,
            null,
          )));
    },
  }));
  f.defineProps({
    clickExp: {
      get: function () {
        return this.jsonModel.clickExp;
      },
    },
    navigationChangeExp: {
      get: function () {
        return this.jsonModel.navigationChangeExp;
      },
    },
    type: {
      get: function () {
        return this.getAttribute("type");
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideListFileAttachmentButton = c.model.GuideButton.extend({
    msClassName: "guideListFileAttachmentButton",
    initialize: function () {
      d.isUndefined(this.jsonModel.clickExp) &&
        (this.jsonModel.clickExp =
          "guideBridge._updateFileListing.call(this,this)");
      f._super.initialize.apply(this, arguments);
    },
  }));
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideCheckBox = c.model.Field.extend({
    msClassName: "guideCheckBox",
    _collectExpressions: function () {
      f._super._collectExpressions.apply(this);
      this.optionsExp &&
        (this._compiledExpressions.optionsExp = this._compileExpression(
          this.optionsExp,
          "items",
        ));
    },
    getOnOffValues: function (a) {
      var b = this.jsonModel.options || [];
      this.bindNode
        ? ((a = this.bindNode.getSaveItem(0)),
          (b = this.bindNode.getSaveItem(1)))
        : ((a = 0 == b.length ? "0" : b[a].split("\x3d")[0].trim()),
          (b = "-100"));
      return [a, b];
    },
    _setXFAValue: function (a) {
      this.bindNode.rawValue =
        "" === a || null === a ? this.bindNode.getSaveItem(1) : a;
    },
    _getCustomAssist: function (a) {
      if (null == a)
        return this.bindNode &&
          this.bindNode.assist &&
          this.bindNode.assist.speak &&
          this.bindNode.assist.speak.value
          ? this.bindNode.assist.speak.value
          : null;
      if (
        this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item
      ) {
        if (
          (a = this.bindNode.members.item(a)) &&
          a.assist &&
          a.assist.speak &&
          a.assist.speak.value
        )
          var b = a.assist.speak.value;
      } else if (this.jsonModel.custom) {
        var c = this.jsonModel.custom || [];
        d.isString(c) && 0 >= a && (b = c);
      }
      return b;
    },
    _getToolTip: function (a) {
      if (
        this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item
      ) {
        if (
          (a = this.bindNode.members.item(a)) &&
          a.assist &&
          a.assist.speak &&
          a.assist.speak.value
        )
          var b = a.assist.toolTip.value;
      } else
        this.jsonModel.shortDescription &&
          (b = this.jsonModel.shortDescription);
      return b;
    },
    _getCaption: function (a) {
      if (null == a)
        return this.bindNode &&
          this.bindNode.caption &&
          this.bindNode.caption.value &&
          this.bindNode.caption.value.oneOfChild &&
          this.bindNode.caption.value.oneOfChild.value
          ? this.bindNode.caption.value.oneOfChild.value
          : null;
      if (
        this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item
      ) {
        if (
          ((a = this.bindNode.members.item(a)),
          a.caption &&
            a.caption.value &&
            a.caption.value.oneOfChild &&
            a.caption.value.oneOfChild.value)
        )
          var b = a.caption.value.oneOfChild.value;
      } else if (this.jsonModel.options) {
        var d = this.jsonModel.options || [];
        0 > a && (a = 0);
        0 == !d.length &&
          ((b = d[a]), (b = c.util.GuideUtil.getOptionsKeyValue(b).pop()));
      }
      return b;
    },
    _getName: function (a) {
      return this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item &&
        this.bindNode.members.item(a)
        ? this.bindNode.members.item(a).name
        : null;
    },
    _getScreenReaderText: function (a) {
      var b,
        c = this._getAssistPriority() || "caption";
      this.bindNode
        ? (b = f._super._getScreenReaderText.apply(this, [a]))
        : "custom" == c
          ? (b = this._getCustomAssist(a) || this._getCaption(a))
          : "caption" == c && (b = this._getCaption(a));
      return b;
    },
  }));
  f.defineProps({
    optionsExp: {
      get: function () {
        return this.getAttribute("optionsExp");
      },
    },
    items: {
      get: function () {
        var a = this.jsonModel.options;
        a && !d.isArray(a) ? (a = a.split(",")) : a && (a = a.slice(0));
        return a;
      },
      set: function (a) {
        if (!this.bindNode) {
          var b = this.jsonModel.options;
          JSON.stringify(a) !== JSON.stringify(b) &&
            ((this.jsonModel.options = a),
            this._resetModelValueForOptionChange(),
            this._addStateOverride("options", {
              option: this._getOptionsArray(),
            }),
            this._triggerItemsChange(b, a));
        }
      },
    },
  });
  f.addMixins([c.model.mixin.ChoiceGroupOptionHandler]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideSwitch = c.model.GuideCheckBox.extend({
    msClassName: "guideSwitch",
    initialize: function () {
      var a = this.getOnOffValues()[1];
      this.jsonModel._value = this.getOrElse(this.jsonModel, "_value", a);
      f._super.initialize.call(this);
    },
    getOnOffValues: function (a) {
      if (this.bindNode) {
        a = this.bindNode.getSaveItem(0);
        var b = this.bindNode.getSaveItem(1);
      } else
        (b = this.jsonModel.options),
          (a =
            Array.isArray(b) && 0 < b.length
              ? b[0].split("\x3d")[0].trim()
              : !d.isUndefined(b) && 0 < b.length
                ? b.split("\x3d")[0].trim()
                : "1"),
          (b =
            Array.isArray(b) && 1 < b.length
              ? b[1].split("\x3d")[0].trim()
              : "0");
      return [a, b];
    },
    resetData: function () {
      this.value = this.jsonModel["{default}"];
    },
  }));
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideTextDraw = c.model.Field.extend({
    msClassName: "guideTextDraw",
    _valueEscapeRegex: /\$/g,
    _getValue: function () {
      return this.bindNode
        ? this.bindNode._getValue(null, !0)
        : this._getTypedValue(this.jsonModel._value);
    },
    playJson: function (a) {
      this._setGuideValue(this._floatingFieldResolutionFunction(a));
    },
    _allowEmptyValueString: function () {
      return !0;
    },
    _isFloatingField: function () {
      return (
        this.documentFragmentVariables &&
        0 < this.documentFragmentVariables.length
      );
    },
    _floatingFieldResolutionFunction: function (a) {
      var b = this.value,
        e = this._variableRegexMap,
        f = this._valueEscapeRegex,
        k = this.somExpression,
        h = [],
        l = this.documentFragmentVariables;
      if (a.documentFragmentVariables)
        for (var m = 0; m < a.documentFragmentVariables.length; m++)
          h[m] = a.documentFragmentVariables[m]._value;
      this.jsonModel.defaultValue = h;
      d.each(e, function (d, e) {
        var g = l.filter(function (a) {
          return a.variableId === e;
        })[0];
        var h = g.bindRef;
        h || (h = g.name);
        if (
          (h = (h =
            a &&
            a.documentFragmentVariables &&
            0 < a.documentFragmentVariables.length
              ? a.documentFragmentVariables.filter(function (a) {
                  return a.variableId === e;
                })[0]._value
              : c.util.GuideUtil.getValueForBindRefField(h, k, this._guide()))
            ? h.replace(f, "$$$$")
            : "")
        ) {
          var m = g.dataType,
            p = g.displayPictureClause;
          if ("number" === m || "integer" === m)
            p = p ? p : "num{zzz,zzz,zzz,zzz,zzz,zzz,zzz.zzzzzzzzzzzzzzz}";
          else if ("date-time" === m || "date" === m)
            p = p ? p : "date{" + c.i18n.datePatterns.med + "}";
          if (p)
            if (-1 !== h.indexOf(",")) {
              var r = "";
              h.split(",").forEach(function (a) {
                r = r + c.util.GuideUtil.formatValue(a, p, m) + ", ";
              });
              h = r.substr(0, r.length - 2);
            } else h = c.util.GuideUtil.formatValue(h, p, m);
        }
        b = b.replace(d, h);
      });
      return b;
    },
    initialize: function () {
      if (this._isFloatingField()) {
        var a = (this._variableRegexMap = {});
        d.each(this.documentFragmentVariables, function (b) {
          b = b.variableId;
          a[b] ||
            (a[b] = new RegExp(
              '(?:\x3cdf-variable[^\x3e]*variableid\x3d"' +
                b +
                '"[^\x3e]*\x3e)[^\x3c]*(?:\x3c/df-variable\x3e)',
              "ig",
            ));
        });
      }
      f._super.initialize.apply(this, [arguments]);
    },
  }));
  f.defineProps({
    calcExp: {
      get: function () {
        return this._calcExp;
      },
    },
    documentFragmentVariables: {
      get: function () {
        return this.jsonModel.documentFragmentVariables;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  c.model.GuideAdobeSignBlock = c.model.GuideTextDraw.extend({
    msClassName: "guideAdobeSignBlock",
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideTextBox = c.model.Field.extend({
    msClassName: "guideTextBox",
    _runMinimumLengthTest: function () {
      return this.value && this.value.length >= this.minLength;
    },
    _runTotalLengthTest: function () {
      return this.value && this.value.length === this.length;
    },
    _runValidations: function (a) {
      f._super._runValidations.call(this, a);
      a.validFlag &&
        (null != this.length
          ? ((a.validFlag = this._runTotalLengthTest()),
            a.validFlag ||
              ((this._errorText = this.guideUtil.getLocalizedMessage(
                "",
                c.i18n.strings.totalLengthMessage,
                [this.length],
              )),
              (this._failedTest = this.guideUtil.LENGTH_TEST)))
          : null != this.minLength &&
            ((a.validFlag = this._runMinimumLengthTest()),
            a.validFlag ||
              ((this._errorText = this.guideUtil.getLocalizedMessage(
                "",
                c.i18n.strings.minimumLengthMessage,
                [this.minLength],
              )),
              (this._failedTest = this.guideUtil.MINIMUM_LENGTH_TEST))));
    },
    _runMandatoryTest: function () {
      if (this.allowRichText) {
        var a = this._getValue(),
          b = a;
        null != a && ((b = /(<([^>]+)>)/gi), (b = a.replace(b, "")));
        return !this.checkIfNull(b);
      }
      return f._super._runMandatoryTest.apply(this, arguments);
    },
    _allowEmptyValueString: function () {
      return !0;
    },
  }));
  f.defineProps({
    multiLine: {
      get: function () {
        return this.getAttribute("multiLine");
      },
    },
    maxChars: {
      get: function () {
        return this.getAttribute("maxChars");
      },
    },
    minLength: {
      get: function () {
        return this.getAttribute("minLength");
      },
    },
    length: {
      get: function () {
        return this.getAttribute("length");
      },
    },
    allowRichText: {
      get: function () {
        return this.getAttribute("allowRichText");
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = {
    441481: "Guernsey",
    441624: "Isle of Man",
    441534: "Jersey",
    1868: "Trinidad and Tobago",
    1473: "Grenada",
    1670: "Northern Mariana Islands",
    1869: "Saint Kitts and Nevis",
    1758: "Saint Lucia",
    1671: "Guam",
    1684: "American Samoa",
    1268: "Antigua and Barbuda",
    1264: "Anguilla",
    1242: "Bahamas",
    1246: "Barbados",
    1441: "Bermuda",
    1284: "British Virgin Islands",
    1345: "Cayman Islands",
    1787: "Puerto Rico",
    1876: "Jamaica",
    1939: "Puerto Rico",
    1767: "Dominica",
    1809: "Dominican Republic",
    1829: "Dominican Republic",
    1664: "Montserrat",
    1849: "Dominican Republic",
    1340: "U.S. Virgin Islands",
    1784: "Saint Vincent and the Grenadines",
    1649: "Turks and Caicos Islands",
    1721: "Sint Maarten",
    355: "Albania",
    213: "Algeria",
    376: "Andorra",
    244: "Angola",
    672: "Antarctica",
    374: "Armenia",
    297: "Aruba",
    994: "Azerbaijan",
    973: "Bahrain",
    880: "Bangladesh",
    375: "Belarus",
    501: "Belize",
    229: "Benin",
    975: "Bhutan",
    591: "Bolivia",
    387: "Bosnia and Herzegovina",
    267: "Botswana",
    246: "British Indian Ocean Territory",
    673: "Brunei",
    359: "Bulgaria",
    226: "Burkina Faso",
    257: "Burundi",
    855: "Cambodia",
    237: "Cameroon",
    238: "Cape Verde",
    236: "Central African Republic",
    235: "Chad",
    269: "Comoros",
    682: "Cook Islands",
    506: "Costa Rica",
    385: "Croatia",
    357: "Cyprus",
    420: "Czech Republic",
    243: "Democratic Republic of the Congo",
    253: "Djibouti",
    670: "East Timor",
    593: "Ecuador",
    503: "El Salvador",
    240: "Equatorial Guinea",
    291: "Eritrea",
    372: "Estonia",
    251: "Ethiopia",
    500: "Falkland Islands",
    298: "Faroe Islands",
    679: "Fiji",
    358: "Finland",
    689: "French Polynesia",
    241: "Gabon",
    220: "Gambia",
    995: "Georgia",
    233: "Ghana",
    350: "Gibraltar",
    299: "Greenland",
    502: "Guatemala",
    224: "Guinea",
    245: "Guinea-Bissau",
    592: "Guyana",
    509: "Haiti",
    504: "Honduras",
    852: "Hong Kong",
    354: "Iceland",
    964: "Iraq",
    353: "Ireland",
    972: "Israel",
    225: "Ivory Coast",
    962: "Jordan",
    254: "Kenya",
    686: "Kiribati",
    383: "Kosovo",
    965: "Kuwait",
    996: "Kyrgyzstan",
    856: "Laos",
    371: "Latvia",
    961: "Lebanon",
    266: "Lesotho",
    231: "Liberia",
    218: "Libya",
    423: "Liechtenstein",
    370: "Lithuania",
    352: "Luxembourg",
    853: "Macau",
    389: "Macedonia",
    261: "Madagascar",
    265: "Malawi",
    960: "Maldives",
    223: "Mali",
    356: "Malta",
    692: "Marshall Islands",
    222: "Mauritania",
    230: "Mauritius",
    691: "Micronesia",
    373: "Moldova",
    377: "Monaco",
    976: "Mongolia",
    382: "Montenegro",
    258: "Mozambique",
    264: "Namibia",
    674: "Nauru",
    977: "Nepal",
    599: "Netherlands Antilles",
    687: "New Caledonia",
    505: "Nicaragua",
    227: "Niger",
    234: "Nigeria",
    683: "Niue",
    850: "North Korea",
    968: "Oman",
    680: "Palau",
    970: "Palestine",
    507: "Panama",
    675: "Papua New Guinea",
    595: "Paraguay",
    351: "Portugal",
    974: "Qatar",
    242: "Republic of the Congo",
    262: "Reunion",
    250: "Rwanda",
    290: "Saint Helena",
    590: "Saint Martin",
    508: "Saint Pierre and Miquelon",
    685: "Samoa",
    378: "San Marino",
    239: "Sao Tome and Principe",
    966: "Saudi Arabia",
    221: "Senegal",
    381: "Serbia",
    248: "Seychelles",
    232: "Sierra Leone",
    421: "Slovakia",
    386: "Slovenia",
    677: "Solomon Islands",
    252: "Somalia",
    211: "South Sudan",
    249: "Sudan",
    597: "Suriname",
    268: "Swaziland",
    963: "Syria",
    886: "Taiwan",
    992: "Tajikistan",
    255: "Tanzania",
    228: "Togo",
    690: "Tokelau",
    676: "Tonga",
    216: "Tunisia",
    993: "Turkmenistan",
    688: "Tuvalu",
    256: "Uganda",
    380: "Ukraine",
    971: "United Arab Emirates",
    598: "Uruguay",
    998: "Uzbekistan",
    678: "Vanuatu",
    379: "Vatican",
    681: "Wallis and Futuna",
    212: "Western Sahara",
    967: "Yemen",
    260: "Zambia",
    263: "Zimbabwe",
    60: "Malaysia",
    58: "Venezuela",
    30: "Greece",
    84: "Vietnam",
    44: "United Kingdom",
    45: "Denmark",
    53: "Cuba",
    46: "Sweden",
    52: "Mexico",
    41: "Switzerland",
    40: "Romania",
    36: "Hungary",
    43: "Austria",
    34: "Spain",
    91: "India",
    62: "Indonesia",
    98: "Iran",
    94: "Sri Lanka",
    27: "South Africa",
    95: "Myanmar",
    65: "Singapore",
    39: "Italy",
    82: "South Korea",
    32: "Belgium",
    81: "Japan",
    31: "Netherlands",
    20: "Egypt",
    54: "Argentina",
    93: "Afghanistan",
    56: "Chile",
    86: "China",
    51: "Peru",
    63: "Philippines",
    64: "Pitcairn",
    48: "Poland",
    47: "Norway",
    33: "France",
    61: "Cocos Islands",
    55: "Brazil",
    92: "Pakistan",
    49: "Germany",
    57: "Colombia",
    66: "Thailand",
    90: "Turkey",
    1: "Canada",
    7: "Russia",
  };
  (c.model.GuideTelephone = c.model.GuideTextBox.extend({
    msClassName: "guideTelephone",
    _extractNumericDigits: function (a) {
      var b = "";
      a && (a = a.match(/\d+/g)) && (b = a.join(""));
      return b;
    },
    _extractCountryCode: function (a) {
      var b = this._extractNumericDigits(a);
      if (!b || (a && b && 0 !== a.lastIndexOf("+", 0))) return "";
      for (var c in f) if (b && 0 === b.lastIndexOf(c, 0)) return c;
      return "";
    },
    _extractPhoneNumber: function (a) {
      var b = this._extractCountryCode(a);
      a = this._extractNumericDigits(a);
      var c = "";
      a && (c = a.substr(b.length));
      return c;
    },
  })).defineProps({
    countryCode: {
      get: function () {
        var a = this._getValue();
        return this._extractCountryCode(a);
      },
    },
    phoneNumber: {
      get: function () {
        var a = this._getValue();
        return this._extractPhoneNumber(a);
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideRadioButton = c.model.Field.extend({
    msClassName: "guideRadioButton",
    prevOnItem: null,
    initialize: function () {
      f._super.initialize.call(this);
    },
    _postInitialize: function () {
      f._super._postInitialize.call(this);
      this.prevOnItem = this.getSelectedIndex(this.value);
      if (this.bindNode && this.bindNode.members)
        for (var a = 0; a < this.bindNode.members.length; a++)
          this.bindNode.members
            .item(a)
            .on(xfalib.script.XfaModelEvent.FORM_MODEL_CHANGED, this);
    },
    _unloadModel: function () {
      if (this.bindNode && this.bindNode.members)
        for (var a = 0; a < this.bindNode.members.length; a++)
          this.bindNode.members
            .item(a)
            .off(xfalib.script.XfaModelEvent.FORM_MODEL_CHANGED, this);
      f._super._unloadModel.call(this);
    },
    _collectExpressions: function () {
      f._super._collectExpressions.apply(this);
      this.optionsExp &&
        (this._compiledExpressions.optionsExp = this._compileExpression(
          this.optionsExp,
          "items",
        ));
    },
    getItemIdentifier: function (a) {
      return this.bindNode ? this.bindNode.members.item(a).somExpression : a;
    },
    playJson: function (a) {
      f._super.playJson.call(this, a);
      this.prevOnItem = this.getSelectedIndex(this.jsonModel._value);
    },
    getOnOffValues: function (a) {
      var b = this.jsonModel.options || [];
      this.bindNode
        ? ((b = this.bindNode.members.item(a)),
          (a = b.getSaveItem(0)),
          (b = b.getSaveItem(1) ? b.getSaveItem(1) : null))
        : ((a = 0 == b.length ? "0" : b[a].split("\x3d")[0].trim()),
          (b = null));
      return [a, b];
    },
    _handleXfaModelChanged: function (a) {
      "rawValue" == a._property
        ? this.trigger(
            c.event.GuideModelEvent.VALUE_CHANGED,
            c.event.GuideModelEvent.createEvent(
              c.event.GuideModelEvent.VALUE_CHANGED,
              this,
              "value",
              a.target.somExpression,
              a.newText,
            ),
          )
        : f._super._handleXfaModelChanged.call(this, a);
    },
    getSelectedIndex: function (a) {
      var b = null;
      d.isEmpty(this.jsonModel.options) ||
        d.isArray(this.jsonModel.options) ||
        (this.jsonModel.options = [this.jsonModel.options]);
      return d.find(
        this.jsonModel.options,
        function (c, d) {
          c = this.getOnOffValues(d);
          b = d;
          return c[0] == a;
        },
        this,
      )
        ? b
        : null;
    },
    _triggerDisplayFormatChange: function () {
      if (!this.bindNode) {
        var a = this._getValue(),
          b = this.getSelectedIndex(a);
        null !== this.prevOnItem &&
          this._triggerEvent(
            c.event.GuideModelEvent.VALUE_CHANGED,
            "value",
            this.prevOnItem,
            null,
          );
        null !== b &&
          this._triggerEvent(
            c.event.GuideModelEvent.VALUE_CHANGED,
            "value",
            b,
            this._getFormattedValue(a),
          );
        this.prevOnItem = b;
      }
    },
    _getCustomAssist: function (a) {
      if (null == a)
        return this.bindNode &&
          this.bindNode.assist &&
          this.bindNode.assist.speak &&
          this.bindNode.assist.speak.value
          ? this.bindNode.assist.speak.value
          : null;
      if (
        this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item
      ) {
        if (
          (a = this.bindNode.members.item(a)) &&
          a.assist &&
          a.assist.speak &&
          a.assist.speak.value
        )
          var b = a.assist.speak.value;
      } else if (this.jsonModel.custom) {
        var c = this.jsonModel.custom || [];
        d.isString(c) && 0 >= a ? (b = c) : 0 == !c.length && (b = c[a]);
      }
      return b;
    },
    _getToolTip: function (a) {
      if (
        this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item
      ) {
        if (
          (a = this.bindNode.members.item(a)) &&
          a.assist &&
          a.assist.speak &&
          a.assist.speak.value
        )
          var b = a.assist.toolTip.value;
      } else
        this.jsonModel.shortDescription &&
          (b = this.jsonModel.shortDescription);
      return b;
    },
    _getCaption: function (a) {
      if (null == a)
        return this.bindNode &&
          this.bindNode.caption &&
          this.bindNode.caption.value &&
          this.bindNode.caption.value.oneOfChild &&
          this.bindNode.caption.value.oneOfChild.value
          ? this.bindNode.caption.value.oneOfChild.value
          : null;
      if (
        this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item
      ) {
        if (
          ((a = this.bindNode.members.item(a)),
          a.caption &&
            a.caption.value &&
            a.caption.value.oneOfChild &&
            a.caption.value.oneOfChild.value)
        )
          var b = a.caption.value.oneOfChild.value;
      } else if (this.jsonModel.options) {
        var d = this.jsonModel.options || [];
        0 > a && (a = 0);
        0 == !d.length &&
          ((b = d[a]), (b = c.util.GuideUtil.getOptionsKeyValue(b).pop()));
      }
      return b;
    },
    _getName: function (a) {
      return this.bindNode &&
        this.bindNode.members &&
        this.bindNode.members.item &&
        this.bindNode.members.item(a)
        ? this.bindNode.members.item(a).name
        : null;
    },
    _getScreenReaderText: function (a) {
      var b,
        c = this._getAssistPriority() || "caption";
      this.bindNode
        ? (b = f._super._getScreenReaderText.apply(this, [a]))
        : "custom" == c
          ? (b = this._getCustomAssist(a) || this._getCaption(a))
          : "caption" == c && (b = this._getCaption(a));
      return b;
    },
  }));
  f.defineProps({
    optionsExp: {
      get: function () {
        return this.getAttribute("optionsExp");
      },
    },
    items: {
      get: function () {
        var a = this.jsonModel.options;
        a && !d.isArray(a) ? (a = a.split(",")) : a && (a = a.slice(0));
        return a;
      },
      set: function (a) {
        if (!this.bindNode && a && 1 < a.length) {
          var b = this.jsonModel.options;
          JSON.stringify(a) !== JSON.stringify(b) &&
            ((this.jsonModel.options = a),
            this._resetModelValueForOptionChange(),
            this._addStateOverride("options", {
              option: this._getOptionsArray(),
            }),
            this._triggerItemsChange(b, a));
        }
      },
    },
  });
  f.addMixins([c.model.mixin.ChoiceGroupOptionHandler]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuidePasswordBox = c.model.Field.extend({
    msClassName: "guidePasswordBox",
    _getReducedJSON: function () {
      if (this.submitPassword) return f._super._getReducedJSON.call(this);
      var a = {};
      c.model.util.CommonUtils.returnMinimalJSON(
        ["name", "templateId", "guideNodeClass"],
        a,
        this,
      );
      return a;
    },
    _preserveLazyValue: function () {
      return !!this.submitPassword && f._super._preserveLazyValue.call(this);
    },
    _allowEmptyValueString: function () {
      return !0;
    },
  }));
  f.defineProps({
    submitPassword: {
      get: function () {
        return this.getAttribute("submitPassword");
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  c.model.GuideScribble = c.model.Field.extend({
    msClassName: "guideScribble",
  });
})(_, guidelib);
(function (d, c) {
  (c.model.GuideCompositeFieldItem = c.model.Field.extend({
    msClassName: "GuideCompositeFieldItem",
  })).defineProps({
    bindRef: {
      get: function () {
        return !this.parent ||
          this.parent._isXfaNode() ||
          d.isEmpty(this.parent.bindRef)
          ? (this.getAttribute("bindRef") || "").replace(/\s+/g, "")
          : this.parent.bindRef +
              "/" +
              this.getAttribute("name").replace(/\s+/g, "");
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideNumericBox = c.model.Field.extend({
    msClassName: "guideNumericBox",
    _getTypedValue: function (a) {
      var b = this.dataType;
      if (this.checkIfNull(a)) return null;
      switch (b) {
        case "integer":
          var c = parseInt(a);
          break;
        case "float":
          c = parseFloat(a);
          break;
        case "decimal":
          if (
            ((c = parseFloat(a)),
            !isNaN(c) &&
              ((b = c.toString()),
              (a = b.indexOf(".")),
              (a = -1 === a ? b.length : a),
              (b = b.length - a - 1),
              b > this.fracDigits &&
                -1 !== this.fracDigits &&
                (c = parseFloat(c.toFixed(this.fracDigits))),
              a > this.leadDigits && -1 !== this.leadDigits))
          )
            return;
      }
      if (!isNaN(c)) return c;
    },
    _getFormattedValue: function (a) {
      if (d.isUndefined(a) || null === a || "" === a) return null;
      var b = this.jsonModel.displayPictureClause;
      try {
        return b && "number" !== this.jsonModel.html5Type
          ? xfalib.ut.PictureFmt.format(
              a + "",
              b,
              guideBridge._readRuntimeLocale(),
              !0,
            )
          : xfalib.ut.PictureFmt.format(
              a + "",
              "num{" +
                ("number" === this.jsonModel.html5Type
                  ? "zzzzzzzzzzzzzzzzzzzzz.zzzzzzzzzzzzzzz"
                  : c.i18n.numberPatterns.numeric) +
                "}",
              guideBridge._readRuntimeLocale(),
              !0,
              !0,
            );
      } catch (e) {
        return this.logger().error("Cannot format value " + a + " " + e), a;
      }
    },
    _totalDigitValidation: function (a, b) {
      a &&
        b.validFlag &&
        -1 < this.leadDigits &&
        ((b.validFlag = !0),
        "integer" === this.dataType &&
          (b.validFlag = this.value.toString().length <= this.leadDigits),
        b.validFlag ||
          ((this._errorText = c.util.GuideUtil.getLocalizedMessage(
            "",
            c.i18n.strings.totalDigitMessage,
            [this.leadDigits],
          )),
          (this._failedTest = this.guideUtil.TOTAL_DIGITS_TEST)));
    },
    _datatypeValidation: function (a) {
      if (a.validFlag) {
        var b = this.getAttribute("_value");
        a.validFlag = !isNaN(b);
        a.validFlag ||
          ((this._errorText = c.util.GuideUtil.getLocalizedMessage(
            "",
            c.i18n.strings.datatypeMessage,
            ["numeric"],
          )),
          (this._failedTest = this.guideUtil.FORMAT_TEST));
      }
    },
    _runValidations: function (a) {
      var b = this.value;
      f._super._runValidations.call(this, a);
      this._datatypeValidation(a);
      this._minMaxValidation(b, a);
      this._totalDigitValidation(b, a);
    },
  }));
  f.defineProps({
    dataType: {
      get: function () {
        return this.getAttribute("dataType");
      },
    },
    leadDigits: {
      get: function () {
        return this.getAttribute("leadDigits");
      },
    },
    fracDigits: {
      get: function () {
        return this.getAttribute("fracDigits");
      },
    },
  });
  f.addMixins([c.model.mixin.AddMinMaxValidation]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideFootnotePlaceHolder = c.model.GuideTextDraw.extend({
    msClassName: "guideFootnotePlaceHolder",
    initialize: function () {
      f._super.initialize.apply(this);
    },
  }));
  f.defineProps({
    footnoteMap: {
      get: function () {
        if (this.options._guideContainer.jsonModel.footnoteMap) {
          var a = {},
            b = Object.entries(
              this.options._guideContainer.jsonModel.footnoteMap,
            );
          document.createElement("p").setAttribute("class", "footnoteClass");
          for (var c = 0; c < b.length; c++) {
            var d = document.getElementById(b[c][0]);
            if (null != d && "P" == d.tagName) {
              d.removeAttribute("id");
              var f = document.createElement("p");
              f.setAttribute("role", "footnote");
              f.setAttribute("aria-live", "polite");
              f.setAttribute("aria-atomic", "true");
              var h = document.createElement("sup"),
                l = document.createElement("a");
              l.setAttribute("id", b[c][0]);
              l.innerHTML = b[c][1];
              h.appendChild(l);
              d.insertBefore(h, d.children[0]);
              d.style.display = "block";
              f.appendChild(d);
              a[b[c][0]] = f.outerHTML;
            }
          }
          return a;
        }
        return null;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideDatePicker = c.model.Field.extend({
    msClassName: "guideDatePicker",
    initialize: function () {
      f._super.initialize.call(this);
      d.isEmpty(this.jsonModel._value) &&
        "true" === this.jsonModel.defaultToCurrentDate &&
        this._setGuideValue(new Date().toISOString().slice(0, 10));
    },
    _setGuideValue: function (a) {
      a = c.util.GuideUtil._reformatDate(a, this.isEditPictureClausePresent);
      f._super._setGuideValue.call(this, a);
    },
    _getTypedValue: function (a) {
      if (a) {
        var b = xfalib.ut.DateInfo.Parse(
          a,
          void 0,
          this.isEditPictureClausePresent,
        );
        null !== b && (b = b.getISODate());
        return b ? b : a;
      }
      return null;
    },
    _datatypeValidation: function (a) {
      if (a.validFlag) {
        var b = this.getAttribute("_value");
        a.validFlag = !0;
        null != b &&
          null ==
            xfalib.ut.DateInfo.Parse(
              b,
              void 0,
              this.isEditPictureClausePresent,
            ) &&
          (a.validFlag = !1);
        a.validFlag ||
          ((this._errorText = c.util.GuideUtil.getLocalizedMessage(
            "",
            c.i18n.strings.datatypeMessage,
            ["date"],
          )),
          (this._failedTest = this.guideUtil.FORMAT_TEST));
      }
    },
    _runValidations: function (a) {
      var b = this.value;
      f._super._runValidations.call(this, a);
      this._datatypeValidation(a);
      this._minMaxValidation(b, a);
    },
  }));
  f.addMixins([c.model.mixin.AddMinMaxValidation]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideCaptcha = c.model.Field.extend({
    msClassName: "guideCaptcha",
    initialize: function () {
      f._super.initialize.call(this);
      this.captchaInvisible &&
        this.mandatory &&
        ((this.captchaValidate = !1),
        this._triggerOnBridge(
          "af.invisibleMandatoryRecaptchaInitialization",
          this,
          null,
          null,
          null,
        ));
    },
    showCaptchaError: function (a) {
      this.captchaInvisible ||
        (d.isEmpty(a) &&
          (a = c.util.GuideUtil.getLocalizedMessage(
            "",
            c.i18n.LogMessages["AEM-AF-901-006"],
          )),
        this._triggerEvent(
          c.event.GuideModelEvent.ERROR_CHANGED,
          "validationStatus",
          !1,
          a,
        ));
    },
    validate: function (a) {
      d.isUndefined(a) && (a = []);
      if (this.captchaValidate && "server" !== window.guideBridge.hostName) {
        if ((this.visible && !this.value) || (this.mandatory && !this.visible))
          return (
            a.push({
              som: this.somExpression,
              errorText: this.mandatoryMessage,
            }),
            this._triggerEvent(
              c.event.GuideModelEvent.ERROR_CHANGED,
              "validationStatus",
              !1,
              this.mandatoryMessage,
            ),
            !1
          );
        this._triggerEvent(
          c.event.GuideModelEvent.ERROR_CHANGED,
          "validationStatus",
          !0,
          null,
        );
      }
    },
  }));
  f.defineProps({
    value: {
      get: function () {
        return this.jsonModel._value;
      },
      set: function (a) {
        var b = this.jsonModel._value;
        this.jsonModel._value = void 0 === a ? b : a;
        a = this.jsonModel._value;
        this.validate();
        this._triggerOnBridge("elementValueChanged", this, "value", b, a);
      },
    },
    captchaService: {
      get: function () {
        return this.getAttribute("captchaService");
      },
    },
    captchaWidget: {
      get: function () {
        return this.getAttribute("captchaService");
      },
    },
    captchaValidate: {
      get: function () {
        return void 0 == this._captchaValidate ? !0 : this._captchaValidate;
      },
      set: function (a) {
        this._captchaValidate = a;
      },
    },
    captchaInvisible: {
      get: function () {
        return "invisible" == this.getAttribute("rcSize") ? !0 : !1;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideDropDownList = c.model.Field.extend({
    msClassName: "guideDropDownList",
    _collectExpressions: function () {
      f._super._collectExpressions.apply(this);
      this.optionsExp &&
        (this._compiledExpressions.optionsExp = this._compileExpression(
          this.optionsExp,
          "items",
        ));
    },
    _handleXfaModelChanged: function (a) {
      "addItem" === a._property ||
      "clearItems" === a._property ||
      "deleteItem" === a._property
        ? this._triggerEvent(
            c.event.GuideModelEvent.MODEL_CHANGED,
            a._property,
            a.prevText,
            a.newText,
          )
        : f._super._handleXfaModelChanged.call(this, a);
    },
    _getDisplayValue: function (a) {
      var b = this._getOptionsArray(),
        c = null;
      d.each(
        b,
        function (b) {
          a === b.saveValue && (c = b.displayValue);
        },
        this,
      );
      return c;
    },
    _getItems: function () {
      return this.jsonModel.options;
    },
    _setXFAItems: function (a) {
      (a = this._getXFAOptionStringFromGuideItems(a))
        ? this.bindNode.setItems(a, 2)
        : this.bindNode.clearItems();
    },
    _allowEmptyValueString: function () {
      return !0;
    },
  }));
  f.defineProps({
    multiSelect: {
      get: function () {
        return this.getAttribute("multiSelect");
      },
      set: function () {
        this.setAttribute("multiSelect");
      },
    },
    optionsExp: {
      get: function () {
        return this.getAttribute("optionsExp");
      },
    },
    displayValue: {
      get: function () {
        return this._getDisplayValue(this.value);
      },
    },
    items: {
      get: function () {
        var a = [];
        if (this.bindNode)
          for (var b = this.bindNode, c = 0; c < b.length; c++) {
            var f = b.getSaveItem(c) + "\x3d" + b.getDisplayItem(c);
            a.push(f);
          }
        else
          (a = this._getItems()) && !d.isArray(a)
            ? (a = a.split(","))
            : a && (a = a.slice(0));
        return a;
      },
      set: function (a) {
        var b = this._getItems();
        JSON.stringify(a) !== JSON.stringify(b) &&
          (this.bindNode ? this._setXFAItems(a) : (this.jsonModel.options = a),
          this.multiSelect && this._resetModelValueForOptionChange(),
          this._addStateOverride("options", {
            option: this._getOptionsArray(),
          }),
          this._triggerItemsChange(b, this.items));
      },
    },
  });
  f.addMixins([c.model.mixin.ChoiceGroupOptionHandler]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideInstanceManager = c.model.GuideNode.extend({
    msClassName: "guideInstanceManager",
    initialize: function () {
      f._super.initialize.call(this);
      this._instances = [];
      this.dependants = [];
      this.deafen = !1;
      this._bindPending = !0;
    },
    _postInitializeBinding: function () {
      if (this._bindPending) {
        this._bindPending = !1;
        var a = this._instances[this.instanceCount - 1];
        a ||
          this.logger().log(
            "There was no instance found for InstanceManager at postInitialize:" +
              this.somExpression,
          );
        a.bindNode &&
          a.bindNode.instanceManager &&
          ((this.bindNode = a.bindNode.instanceManager),
          this.bindNode.parent.on(
            xfalib.script.XfaModelEvent.CHILD_ADDED,
            this,
          ),
          this.bindNode.parent.on(
            xfalib.script.XfaModelEvent.CHILD_REMOVED,
            this,
          ));
      }
    },
    _unloadModel: function () {
      var a = this._instances[this.instanceCount - 1];
      a.bindNode &&
        a.bindNode.instanceManager &&
        (this.bindNode.parent.off(
          xfalib.script.XfaModelEvent.CHILD_ADDED,
          this,
        ),
        this.bindNode.parent.off(
          xfalib.script.XfaModelEvent.CHILD_REMOVED,
          this,
        ));
      f._super._unloadModel.call(this);
    },
    handleEvent: function (a) {
      if (!this.deafen && a instanceof xfalib.script.XfaModelEvent)
        switch (a.name) {
          case xfalib.script.XfaModelEvent.CHILD_ADDED:
            a = a.newText;
            a.instanceManager == this.bindNode &&
              this._insertInstance(a.instanceIndex, a);
            break;
          case xfalib.script.XfaModelEvent.CHILD_REMOVED:
            a = a.prevText;
            a.instanceManager == this.bindNode &&
              this._removeInstance(a.instanceIndex, !1);
            break;
          case xfalib.script.XfaModelEvent.CHILD_MOVED:
            this.logger().log(
              "CHILD_REMOVED should never be dispatched. It's achieved via ad and remove child.",
            );
        }
    },
    _instanceTemplate: function () {
      return this._guide()._modelTemplateCacheStore.cloneJsonTemplate(
        this.jsonModel.instanceTemplateId,
      );
    },
    addInstance: function (a) {
      return this._insertInstance(void 0, a);
    },
    addInstances: function (a, b) {
      a = a.instanceCount;
      if (-1 != this.maxOccur) {
        var d = this.maxOccur - this.instanceCount;
        a = a > d ? d : a;
      }
      d = [];
      for (var f = 0; f < a; f++) d.push(this._insertInstance(void 0, b, !0));
      this.parent._triggerEvent(
        c.event.GuideModelEvent.MULTIPLE_CHILD_ADDED,
        "multipleChildAdded",
        null,
        d,
      );
    },
    _manageChild: function (a, b) {
      a._instanceManager = this;
      void 0 === b ? this._instances.push(a) : this._instances.splice(b, 0, a);
    },
    _insertInstance: function (a, b, e) {
      if (
        (0 <= +this.maxOccur && +this.maxOccur == this.instanceCount) ||
        (void 0 !== a && a > +this.maxOccur && -1 < +this.maxOccur)
      )
        return null;
      var f = b;
      b &&
        null == this.bindNode &&
        this.logger().error("AF", "Invalid argument addedXfaInstance.");
      if (!b && this.bindNode) {
        this.deafen = !0;
        try {
          f = this.bindNode.insertInstance(a);
        } finally {
          this.deafen = !1;
        }
      }
      var k = this._instanceTemplate();
      b = {};
      var h = this.guideUtil.generateUID(),
        l = this;
      this.copyObject(k, b, {
        transformMaps: {
          id: function (a, b, c) {
            return h + "__" + c.templateId;
          },
          bindRef: function (a, b, c) {
            if (null != f && null != l.bindNode) {
              if (k.bindRef === a) return f.somExpression;
              if (a.substring(0, k.bindRef.length) === k.bindRef)
                return a.replace(k.bindRef, f.somExpression);
            }
            return a;
          },
        },
      });
      var m = f && this.bindNode ? { bindNode: f } : null;
      this.options._guideContainer &&
        (m = d.extend({}, m, {
          _guideContainer: this.options._guideContainer,
        }));
      b = c.model.GuideModelRegistry.prototype.createModel(b, m);
      if (null != b) {
        this._manageChild(b, a);
        m = this.parent;
        if (null != m) {
          if (0 < this._instances.length)
            if (((a = void 0 !== a ? a : this._instances.length - 1), 0 === a))
              m._addChildAt(b, m._children.indexOf(this) + 1, e);
            else {
              var p = m._children.indexOf(this._instances[a - 1]);
              m._addChildAt(b, p + 1, e);
            }
          else m._addChildAt(b, m._children.indexOf(this) + 1, e);
          e = this._guide().internal.liveDataUtils;
          this._isDataNodeUpdateRequired(b) &&
            ((m = e.getParentDataNode(this._getDataContext(b), !0, {})),
            (p = e._convertModelIndexToDataIndex(b.instanceIndex)),
            (p = e._getElement(m, b._getDataNodeName(), { index: p })),
            !p || (p && b.instanceIndex != this._instances.length - 1)) &&
            (e.insertNode(m, b._getDataNodeName(), b.instanceIndex) ||
              this.logger().warn(
                "AF",
                "Unable to store the data of the element",
              ));
        }
        this._execExpressions(a);
        return b;
      }
      this.logger().log(
        "guide",
        "insertInstance could not create child" +
          this.jsonModel.instanceTemplateId,
      );
      return null;
    },
    insertInstance: function (a) {
      return this._insertInstance(a);
    },
    removeInstance: function (a) {
      this._removeInstance(a, !0);
    },
    _removeInstance: function (a, b) {
      if (
        !(
          0 == this.instanceCount ||
          this.minOccur >= this.instanceCount ||
          a >= +this.instanceCount
        )
      ) {
        if (b && this.bindNode) {
          this.deafen = !0;
          try {
            this.bindNode.removeInstance(a);
          } finally {
            this.deafen = !1;
          }
        }
        b = this._instances[a];
        var c = this._guide().internal.liveDataUtils;
        if (this._isDataNodeUpdateRequired(b)) {
          var d = c.getParentDataNode(this._getDataContext(b));
          c.removeChild(d, b._getDataNodeName(), b.instanceIndex);
        }
        this._instances.splice(a, 1);
        b.parent._removeChild(b);
        this._execExpressions(a);
      }
    },
    _isDataNodeUpdateRequired: function (a) {
      var b = c.model.GuideSchema.prototype.GuideStateConstants,
        d = guideBridge._guide;
      return (
        d &&
        d.getGuideState() === b.GUIDE_STATE_MODEL_COMPLETE &&
        a._hasLazyDescendant
      );
    },
    _getDataContext: function (a) {
      var b = this._guide().internal.liveDataUtils,
        c = b._getXpathContext(a);
      c = b._getDataContext(a, c.bound, c.unBound);
      var d = c.indexedXpath;
      d = b.addIndexToPath(d, a.instanceIndex);
      return { indexedXpath: d, xmlSec: c.xmlSec };
    },
    _getInstanceName: function () {
      return this.jsonModel.instanceName;
    },
    _instanceIsTableRow: function () {
      return "guideTableRow" === this._instanceTemplate().guideNodeClass;
    },
    _execExpressions: function (a) {
      try {
        for (this._notifyDependants(); a < this.instances.length; a++)
          this.instances[a]._notifyDependants();
        this._guide().runPendingExpressions();
      } catch (b) {
        this.logger().error("guide", b.message);
      }
    },
  }));
  f.defineProps({
    minOccur: {
      get: function () {
        return this._instanceIsTableRow()
          ? +this.jsonModel.minOccur || 1
          : this.getOrElse(this.jsonModel.minOccur, 1);
      },
    },
    maxOccur: {
      get: function () {
        return this.getOrElse(this.jsonModel.maxOccur, 1);
      },
    },
    initialOccur: {
      get: function () {
        return this.getOrElse(this.jsonModel.initialOccur, 1);
      },
    },
    instanceTemplateId: {
      get: function () {
        return this.jsonModel.instanceTemplateId;
      },
    },
    instanceCount: {
      get: function () {
        var a = this._guide()._currentContext;
        a && a.managedExp && this._addDependant(a.contextNode, a.expression);
        return this._instances.length;
      },
    },
    repeatable: {
      get: function () {
        return 1 != this.minOccur || 1 != this.maxOccur;
      },
    },
    instances: {
      get: function () {
        var a = this._guide()._currentContext;
        a && a.managedExp && this._addDependant(a.contextNode, a.expression);
        return (this._instances || []).slice(0);
      },
    },
  });
  f.addMixins([c.model.mixin.AddDependencyMgmt]);
})(_, guidelib);
(function (d, c) {
  d = c.model.AbstractField = c.model.GuideNode.extend({
    msClassName: "abstractField",
    initialize: function () {
      this._name = this.options.name || "";
      this._className = this.options.className || "";
      this._bindRef = this.options.bindRef || "";
      this._afDataSom = this.options.afDataSom || "";
      this._dataSom = this._isXfaNode() ? this.options.dataSom : "";
      this.dependants = [];
      this._depdendantIds = [];
    },
    _getValue: function () {
      return this.jsonModel._value;
    },
    _setValue: function (c) {
      this.jsonModel._value = c;
    },
    resetData: function () {
      return c.model.Field.prototype.resetData.call(this);
    },
    _isXfaNode: function () {
      return 0 === this.bindRef.indexOf("xfa[0].form[0].");
    },
    getAttribute: function (c) {
      switch (c) {
        case "name":
          c = this.name;
          break;
        case "bindRef":
          c = this.bindRef;
          break;
        default:
          c = null;
      }
      return c;
    },
  });
  d.defineProps({
    somExpression: {
      get: function () {
        return "";
      },
    },
    name: {
      get: function () {
        return (this._name || "").replace(/\s+/g, "");
      },
    },
    className: {
      get: function () {
        return this._className || "";
      },
    },
    bindRef: {
      get: function () {
        return (this._bindRef || "").replace(/\s+/g, "");
      },
    },
    dataSom: {
      get: function () {
        return this._dataSom;
      },
    },
    afDataSom: {
      get: function () {
        return this._afDataSom.replace(/\s+/g, "");
      },
    },
    value: {
      get: function () {
        var c = this._guide()._currentContext;
        c &&
          c.managedExp &&
          c.contextNode &&
          c.expression &&
          (this._addDependant(c.contextNode, c.expression),
          this._depdendantIds.push(c.contextNode.id));
        return this.jsonModel._value;
      },
      set: function (c) {
        this.jsonModel._value !== c &&
          ((this.jsonModel._value = c),
          (c = this._guide().internal.GuideDirtyMarkerAndVisitor),
          c._findAndMarkDirty(c.visitMap, this._depdendantIds),
          this._notifyDependants());
      },
    },
  });
  d.addMixins([c.model.mixin.AddDependencyMgmt]);
})(_, guidelib);
(function (d, c) {
  var f = (c.model.util.ModelTemplateCacheStore = xfalib.ut.Class.extend({
    initialize: function () {
      f._super.initialize.apply(this);
      this._modelIdCache = {};
      this._templateIdCache = {};
      this._lazyTemplateIdCache = {};
      var a = JSON.parse(JSON.stringify(this.options.modelTemplateJson));
      this._putTemplate(a);
    },
    putModel: function (a) {
      a.id
        ? ((this._modelIdCache[a.id] = a),
          a.children &&
            _.each(
              a.children,
              function (a) {
                this.putModel(a);
              },
              this,
            ))
        : this.logger().log("no Id found for model" + a.getAttribute("name"));
    },
    removeModel: function (a) {
      this._modelIdCache.hasOwnProperty(a) && delete this._modelIdCache[a];
    },
    getModel: function (a) {
      if (this._modelIdCache.hasOwnProperty(a)) return this._modelIdCache[a];
    },
    _putTemplate: function (a) {
      a.templateId &&
        a.guideNodeClass &&
        (this._templateIdCache[a.templateId] = a);
      _.each(
        a,
        function (a, c) {
          _.isObject(a) && this._putTemplate(a);
        },
        this,
      );
    },
    _putLazyTemplate: function (a) {
      a.templateId &&
        a.guideNodeClass &&
        (this._lazyTemplateIdCache[a.templateId] = a);
    },
    cloneJsonTemplate: function (a) {
      if (this._templateIdCache[a])
        return JSON.parse(JSON.stringify(this._templateIdCache[a]));
    },
    _getTemplate: function (a, b) {
      var d = this._templateIdCache[a];
      b && c.util.GuideUtil.isLazyJson(d) && (d = this._lazyTemplateIdCache[a]);
      if (!_.isUndefined(d)) return JSON.parse(JSON.stringify(d));
    },
  }));
  f.defineProps({});
})($, guidelib);
(function (d, c) {
  var f = (d.util.ErrorConstants = {
    DATA_ATTRIBUTE_ERROR_ITEM: "data-af-global-error-item",
    DATA_ATTRIBUTE_DISPLAY_ON: "data-af-global-errors-display-on",
    DATA_ATTRIBUTE_ERROR_TEXT_CONTAINER: "data-af-global-error-text",
    DATA_ATTRIBUTE_ERROR_CONTAINER: "data-af-global-errors",
    DATA_ATTRIBUTE_SOM: "data-af-som",
    CONTEXT_SUBMISSION: "form",
    CONTEXT_NAVIGATION: "panel",
    CONTEXT_FIELD: "field",
  });
  f[f.CONTEXT_SUBMISSION] = 4;
  f[f.CONTEXT_NAVIGATION] = 2;
  f[f.CONTEXT_FIELD] = 1;
  var a = function (a, c) {
    this.$container = a;
    c = a.find("[" + f.DATA_ATTRIBUTE_ERROR_ITEM + "]").first();
    a = a.attr(f.DATA_ATTRIBUTE_DISPLAY_ON) || "";
    this.errorCount = this.displayOn = 0;
    this.$container.addClass("no-validation-errors");
    _.each(
      a.split(","),
      function (a) {
        this.displayOn += f[a] || 0;
      },
      this,
    );
    this.$item = c.eq(0).clone();
    c.remove();
  };
  _.extend(a.prototype, {
    showError: function (a, c, d) {
      var b = this.$container.find(
        "[" + f.DATA_ATTRIBUTE_SOM + '\x3d"' + d + '"]',
      );
      0 < b.length
        ? b
            .find("[" + f.DATA_ATTRIBUTE_ERROR_TEXT_CONTAINER + "]")
            .addBack("[" + f.DATA_ATTRIBUTE_ERROR_TEXT_CONTAINER + "]")
            .text(a)
        : "number" === typeof f[c] &&
          ((c = f[c]),
          (c & this.displayOn) === c &&
            (0 === this.errorCount &&
              this.$container.removeClass("no-validation-errors"),
            this.errorCount++,
            this.$item
              .clone()
              .find("[" + f.DATA_ATTRIBUTE_ERROR_TEXT_CONTAINER + "]")
              .addBack("[" + f.DATA_ATTRIBUTE_ERROR_TEXT_CONTAINER + "]")
              .text(a)
              .click(function (a) {
                guideBridge.setFocus(d);
              })
              .end()
              .end()
              .attr(f.DATA_ATTRIBUTE_SOM, d)
              .appendTo(this.$container)));
    },
    hideError: function (a) {
      a = this.$container.find("[" + f.DATA_ATTRIBUTE_SOM + '\x3d"' + a + '"]');
      0 < a.length && (a.remove(), this.errorCount--);
      0 === this.errorCount && this.$container.addClass("no-validation-errors");
    },
  });
  c.fn.globalErrorContainer = function (b) {
    var d = arguments;
    return this.each(function () {
      var e = c(this),
        f = e.data("global-error-container");
      void 0 === f &&
        ((f = new a(e, c.extend({}, "object" === typeof b && b))),
        e.data("global-error-container", f));
      "string" === typeof b &&
        "function" === typeof f[b] &&
        f[b].apply(f, [].splice.apply(d, [1]));
    });
  };
})(guidelib, $);
(function (d, c) {
  var f = d.util.ErrorConstants,
    a,
    b = (d.util.GuideErrorManager = xfalib.ut.Class.extend({
      _defaultErrorMessage: "There is an error in this field !",
      initialize: function () {
        b._super.initialize.apply(arguments);
        a = c(
          "[" + f.DATA_ATTRIBUTE_ERROR_CONTAINER + "]",
        ).globalErrorContainer();
      },
      markError: function (b, d, f, h, l) {
        _.isUndefined(b) && (b = this._defaultErrorMessage);
        b = b.trim();
        a.globalErrorContainer("showError", b, h, f);
        d &&
          1 <= d.length &&
          ((f = d.find(".guideFieldError")),
          1 > f.length
            ? c("\x3cdiv class\x3d'guideFieldError'\x3e\x3c/div\x3e")
                .appendTo(d)
                .text(b)
            : (f.text(b),
              (b = f.attr("role")),
              (void 0 == b && !1 === b) || f.attr("role", "alert"),
              f.show()));
      },
      unMarkError: function (b, c) {
        b.find(".guideFieldError").hide();
        b.find(".guideFieldError").text("");
        a.globalErrorContainer("hideError", c);
      },
    }));
})(guidelib, $);
(function (d, c) {
  d.util.GuideLazyUtil = xfalib.ut.Class.extend({
    putDirtyToTemplateCacheIfMissing: function (c) {
      c = (
        c.internal.GuideDirtyMarkerAndVisitor ||
        this._guide().internal.GuideDirtyMarkerAndVisitor
      )._flattenDirtyPanelToList();
      this._getAllDirtyJsonTemplateInCache(c);
    },
    _getAllDirtyJsonTemplateInCache: function (c) {
      function a(a) {
        _.each(a, function (a) {
          a = JSON.parse(a);
          b._putLazyTemplate(a);
        });
      }
      var b = window.guideBridge._guide._modelTemplateCacheStore;
      c = this._generateListOfCacheMissFromTemplateJson(c);
      0 < c.length &&
        window.guideBridge.panelProvider &&
        ((c = {
          path: window.guideBridge._getGuidePathUrl(".jsonhtmlemitter"),
          listOfTemplateIds: c,
          success: a,
        }),
        window.guideBridge.panelProvider.getMultipleTemplateJson(c));
    },
    _generateListOfCacheMissFromTemplateJson: function (c) {
      var a = window.guideBridge._guide._modelTemplateCacheStore,
        b = [];
      _.each(c, function (c) {
        var e = a._getTemplate(c, !0);
        d.util.GuideUtil.isLazyJson(e) && b.push(c);
      });
      return b;
    },
    _guide: function () {
      return this.options._guideContainer;
    },
  });
})(guidelib, $);
(function (d, c) {
  var f = {},
    a = {
      visible: {
        xfaToGuide: function (a) {
          return "visible" === a;
        },
        guideToXfa: function (a) {
          return !0 === a ? "visible" : "hidden";
        },
      },
      enabled: {
        xfaToGuide: function (a) {
          return "open" === a;
        },
        guideToXfa: function (a) {
          return !0 === a ? "open" : "readOnly";
        },
      },
      assistPriority: {
        xfaToGuide: function (a) {
          return {
            custom: "custom",
            toolTip: "shortDescription",
            caption: "label",
            name: "name",
          }[a];
        },
        guideToXfa: function (a) {
          return {
            custom: "custom",
            shortDescription: "toolTip",
            title: "caption",
            name: "name",
          }[a];
        },
      },
      mandatory: {
        xfaToGuide: function (a) {
          return "error" === a;
        },
        guideToXfa: function (a) {
          return !0 === a ? "error" : "disabled";
        },
      },
      multiLine: {
        xfaToGuide: function (a) {
          return 1 == a;
        },
        guideToXfa: function (a) {
          return !0 === a ? 1 : 0;
        },
      },
      options: {
        xfaToGuide: function (a) {
          var b = [];
          if (a) {
            var c = this.bindNode;
            d.each(a, function (a, d, e) {
              b.push(c.getSaveItem(d) + "\x3d" + c.getDisplayItem(d));
            });
          }
          return b;
        },
        guideToXfa: function (a) {
          return a;
        },
      },
      multiSelect: {
        xfaToGuide: function (a) {
          return "multiSelect" === a;
        },
        guideToXfa: function (a) {
          return !0 === a ? "multiSelect" : "userControl";
        },
      },
      calcExp: {
        xfaToGuide: function (a) {
          return null !== a && "" !== a ? null : void 0;
        },
        guideToXfa: function (a) {
          return null !== a && "" !== a ? null : void 0;
        },
      },
      dataType: {
        xfaToGuide: function (a) {
          return a;
        },
        guideToXfa: function (a) {},
      },
    };
  a.validateExp = a.visibleExp = a.enabledExp = a.clickExp = a.calcExp;
  c.model.GuideSchema = xfalib.ut.Class.extend({
    GuideStateConstants: {
      GUIDE_STATE_MODEL_CREATION: 0,
      GUIDE_STATE_MODEL_CREATED: 1,
      GUIDE_STATE_MERGE_PROGRESS: 2,
      GUIDE_STATE_MERGE_COMPLETE: 3,
      GUIDE_STATE_MODEL_COMPLETE: 4,
    },
    initialize: function () {
      this.addSchema("guideNode", [
        ["name", "string", null],
        ["id", "string", null],
        ["jcr:title", "string", null],
        ["jcr:description", "string", null],
        ["css", "string", ""],
        ["fd:targetVersion", "float", 1],
      ]);
      this.addSchema(
        "scriptable",
        [
          ["visibleExp", "string", null],
          ["enabledExp", "string", null],
          ["visible", "boolean", !0, "presence"],
          ["enabled", "boolean", !0, "access"],
          ["assistPriority", "string", null, "assist.speak.priority"],
          ["custom", "string", null, "assist.speak.value"],
          ["shortDescription", "string", null, "assist.toolTip.value"],
          ["longDescription", "string", null],
        ],
        "guideNode",
      );
      this.addSchema("guideInstanceManager", [], "guideNode");
      this.addSchema("esign", [], "guideNode");
      this.addSchema("verify", [], "guideNode");
      this.addSchema("guideItemsContainer", [], "scriptable");
      this.addSchema("guideImage", [], "scriptable");
      this.addSchema(
        "guideContainerNode",
        [["disableSwipeGesture", "boolean", !1]],
        "guideItemsContainer",
      );
      this.addSchema(
        "guidePanel",
        [["validateOnStepCompletion", "boolean", !1]],
        "guideItemsContainer",
      );
      this.addSchema("rootPanelNode", [], "guidePanel");
      this.addSchema("guideTable", [], "guidePanel");
      this.addSchema("guideTableRow", [], "guidePanel");
      this.addSchema("guideToolbar", [], "guideItemsContainer");
      this.addSchema("guideCompositeField", [], "guideItemsContainer");
      this.addSchema(
        "guideFileUpload",
        [
          ["multiSelection", "boolean", !1],
          ["buttonText", "string", null],
          ["fileSizeLimit", "integer", 2],
          ["showComment", "boolean", !1],
        ],
        "guideCompositeField",
      );
      this.addSchema(
        "guideField",
        [
          [
            "jcr:title",
            "string",
            null,
            "caption.value.oneOfChild.value",
            "Guide",
          ],
          ["calcExp", "string", null, "calculate.script.value", "Guide"],
          ["validateExp", "string", null, "validate.script.value", "Guide"],
          ["_value", "string", null, "rawValue"],
          ["displayPictureClause", "string", null, "format.picture.value"],
          ["validatePictureClause", "string", null, "validate.picture.value"],
          ["mandatory", "boolean", !1, "validate.nullTest"],
          [
            "mandatoryMessage",
            "string",
            c.util.GuideUtil.getLocalizedMessage(
              "",
              c.i18n.LogMessages["AEM-AF-901-005"],
            ),
            "mandatoryMessage",
          ],
          [
            "validateExpMessage",
            "string",
            c.util.GuideUtil.getLocalizedMessage(
              "",
              c.i18n.LogMessages["AEM-AF-901-006"],
            ),
            "validationMessage",
            "Guide",
          ],
          [
            "validatePictureClauseMessage",
            "string",
            c.util.GuideUtil.getLocalizedMessage(
              "",
              c.i18n.LogMessages["AEM-AF-901-007"],
            ),
            "formatMessage",
          ],
          ["validationState", "boolean", !1],
          ["width", "string", null],
          ["height", "string", null],
        ],
        "scriptable",
      );
      this.addSchema(
        "guideTextBox",
        [
          ["multiLine", "boolean", !1, "ui.textEdit.multiLine"],
          ["maxChars", "integer", 0, "value.text.maxChars"],
          ["minLength", "integer", null],
          ["length", "integer", null],
        ],
        "guideField",
      );
      this.addSchema("guideCaptcha", [], "guideField");
      this.addSchema("guideTelephone", [], "guideField");
      this.addSchema(
        "guideNumericBox",
        [
          ["dataType", "string", "decimal", "value.oneOfChild.className"],
          ["leadDigits", "integer", -1, "value.decimal.leadDigits"],
          ["fracDigits", "integer", 2, "value.decimal.fracDigits"],
          ["maximum", "integer", null],
          ["minimum", "integer", null],
          ["exclusiveMaximum", "boolean", null],
          ["exclusiveMinimum", "boolean", null],
        ],
        "guideField",
      );
      this.addSchema("guidePasswordBox", [], "guideField");
      this.addSchema(
        "guideRadioButton",
        [
          ["optionsExp", "string", null],
          ["options", "object", null, "items"],
        ],
        "guideField",
      );
      this.addSchema(
        "guideCheckBox",
        [
          ["optionsExp", "string", null],
          ["options", "object", null, "items"],
        ],
        "guideField",
      );
      this.addSchema("guideSwitch", [], "guideCheckBox");
      this.addSchema("guideScribble", [], "guideField");
      this.addSchema(
        "guideDatePicker",
        [
          ["maximum", "string", null],
          ["minimum", "string", null],
          ["exclusiveMaximum", "boolean", null],
          ["exclusiveMinimum", "boolean", null],
        ],
        "guideField",
      );
      this.addSchema("guideButton", [], "guideField");
      this.addSchema("guideListFileAttachmentButton", [], "guideButton");
      this.addSchema(
        "guideTextDraw",
        [["documentFragmentVariables", "string", null]],
        "guideField",
      );
      this.addSchema("guideFootnotePlaceHolder", [], "guideTextDraw");
      this.addSchema(
        "guideAdobeSignBlock",
        [["documentFragmentVariables", "string", null]],
        "guideField",
      );
      this.addSchema("guideCompositeFieldItem", [], "guideField");
      this.addSchema(
        "guideDropDownList",
        [
          ["title", "string", "DropDown"],
          ["multiSelect", "boolean", !1, "ui.oneOfChild.open"],
          ["optionsExp", "string", null],
          ["options", "object", null, "items"],
        ],
        "guideField",
      );
      this.addSchema(
        "guideTermsAndConditions",
        [
          ["showLink", "boolean", !1],
          ["showAsPopUp", "boolean", !1],
          ["clickStatus", "string", null],
        ],
        "guideCompositeField",
      );
      this.addSchema(
        "guideChart",
        [
          ["height", "integer", 300],
          ["width", "integer", 100],
          ["data", "object", null],
          ["xAxisTitle", "string", null],
          ["yAxisTitle", "string", null],
          ["chartType", "string", "linepoint"],
          ["repeatableItem", "string", null],
          ["xExp", "string", null],
          ["reducerXFunction", "string", "none"],
          ["yExp", "string", null],
          ["reducerYFunction", "string", "none"],
          ["innerRadius", "integer", 0],
          ["lineColor", "string", "#000000"],
          ["pointColor", "string", "#000000"],
          ["areaColor", "string", "#000000"],
          ["tooltipHtml", "string", "\x3cp\x3e${x}(${y})\x3c/p\x3e"],
          ["showLegends", "boolean", !1],
          ["legendPosition", "string", "right"],
        ],
        "scriptable",
      );
      this.addSchema(
        "guideAdModule",
        [["_value", "string", null]],
        "scriptable",
      );
      this.addSchema(
        "guideAdModuleGroup",
        [["_value", "string", null]],
        "scriptable",
      );
    },
    addSchema: function (a, c, g) {
      var b = {};
      "object" === typeof g
        ? d.extend(b, g)
        : "string" === typeof g && f[g] && d.extend(b, f[g]);
      this.addAttributes(b, c);
      f[a] = b;
    },
    addAttributes: function (a, c) {
      d.each(c, function (b) {
        a[b[0]] = { type: b[1], default: b[2], xfaProp: b[3], priority: b[4] };
      });
    },
    getAttributeProps: function (a, c) {
      try {
        return f[a][c] || {};
      } catch (g) {
        this.logger().error("AF", "schema has no element " + a);
      }
    },
    getAttributes: function (a) {
      return f[a];
    },
    getTypedValue: function (a, c) {
      if (null === c || void 0 === c || a instanceof Array) return c;
      switch (a) {
        case "string":
          return c + "";
        case "integer":
          return parseInt(c);
        case "boolean":
          return !0 === c || "true" === c ? !0 : !1;
        case "float":
          return parseFloat(c);
        default:
          return c;
      }
    },
    getConvertor: function (b) {
      return a[b];
    },
  });
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuideContainerNode = c.model.GuideItemsContainer.extend({
    msClassName: "guideContainerNode",
    setGuideState: function (a) {
      !0 ===
        d.some(c.model.GuideSchema.prototype.GuideStateConstants, function (b) {
          return b === a;
        }) && (this._guideState = a);
    },
    getGuideState: function () {
      return this._guideState;
    },
    initialize: function () {
      c.__runtime__.guide = this;
      this._guideState =
        c.model.GuideSchema.prototype.GuideStateConstants.GUIDE_STATE_MODEL_CREATION;
      this.internal = this.internal || {};
      this.internal.liveDataUtils =
        this.options.liveDataUtils || new c.model.LiveXmlUtils();
      this.internal.liveModel =
        this.options.liveModel || new c.model.LiveModel();
      this.internal.GuideDirtyMarkerAndVisitor =
        new c.model.GuideDirtyMarkerAndVisitor();
      this.runtime = { guideContext: {}, _private: {}, errorManager: {} };
      this.runtime.errorManager = new c.util.GuideErrorManager();
      this._modelTemplateCacheStore = new c.model.util.ModelTemplateCacheStore({
        modelTemplateJson: this.jsonModel,
      });
      this._guideSchema = new c.model.GuideSchema();
      this.guideLazyUtil = new c.util.GuideLazyUtil({ _guideContainer: this });
      this._pendingQueues = {
        calcExp: [],
        valueCommitScript: [],
        enabledExp: [],
        visibleExp: [],
        validateAllExp: [],
        optionsExp: [],
        navigationChangeExp: [],
        summaryExp: [],
        autoSaveStartExp: [],
        aggregateExp: [],
        submitSuccess: [],
        submitError: [],
      };
      this._resetExpressionCounters();
      this._currentContext = null;
      f._super.initialize.call(this);
      this.autoSaveStart = !1;
      this._modelTemplateCacheStore.putModel(this);
      this._postInitialize();
      var a = this.getOrElse(xfalib, "runtime.xfa.host", null);
      if (null !== a)
        a.on(
          xfalib.script.XfaModelEvent.FORM_MODEL_REFRESH,
          function (a) {
            switch (a.name) {
              case xfalib.script.XfaModelEvent.FORM_MODEL_REFRESH:
                this._triggerEvent(
                  c.event.GuideModelEvent.MODEL_REFRESH,
                  "jsonModel",
                  null,
                  null,
                );
            }
          },
          this,
        );
    },
    _resetExpressionCounters: function () {
      this._runningExpressionCount = {
        calcExp: {},
        valueCommitScript: {},
        enabledExp: {},
        visibleExp: {},
        validateAllExp: {},
        optionsExp: {},
        navigationChangeExp: {},
        summaryExp: {},
        autoSaveStartExp: {},
        aggregateExp: {},
        submitSuccess: {},
        submitError: {},
      };
    },
    _getReducedJSON: function () {
      var a = c.model.GuideNode.prototype._getReducedJSON.call(this);
      c.model.util.CommonUtils.returnMinimalJSON(
        "xdpRef xsdRef id dorTemplateRef dorType excludeFromDoRIfHidden schemaRef schemaType".split(
          " ",
        ),
        a,
        this,
      );
      a.rootPanel = this.rootPanel._getReducedJSON();
      this.jsonModel.toolbar && (a.toolbar = this.toolbar._getReducedJSON());
      return a;
    },
    _initChildren: function () {
      var a = { _guideContainer: this };
      this.rootPanel = c.model.GuideModelRegistry.prototype.createModel(
        this.jsonModel.rootPanel,
        a,
      );
      this._initializeChild(this.rootPanel);
      this._children.push(this.rootPanel);
      a = c.model.GuideModelRegistry.prototype.createInstanceManager(
        this.rootPanel,
      );
      this._initializeChild(a);
      this._children.splice(this._children.indexOf(this.rootPanel), 0, a);
      a._manageChild(this.rootPanel);
      this.jsonModel.toolbar &&
        ((a = {}),
        this._guide() &&
          (a = d.extend({}, a, { _guideContainer: this._guide() })),
        (this.toolbar = c.model.GuideModelRegistry.prototype.createModel(
          this.jsonModel.toolbar,
          a,
        )),
        this._initializeChild(this.toolbar),
        this._children.push(this.toolbar));
    },
    _addToExcludeFromDorMap: function (a, b) {
      this._excludeFromDorMap = this._excludeFromDorMap || {};
      this._excludeFromDorMap[a] = b;
    },
    _getExcludeFromDorMap: function () {
      var a = this;
      if (!d.isUndefined(a._excludeFromDorMap))
        return d.keys(a._excludeFromDorMap).map(function (b) {
          return b + "\x3d" + a._excludeFromDorMap[b];
        });
    },
    _addToStateOverrideMap: function (a, b) {
      this._stateOverrideMap = this._stateOverrideMap || {};
      this._stateOverrideMap[a] = b;
    },
    _getStateOverrideMap: function () {
      var a = this,
        b = {};
      d.isUndefined(a._stateOverrideMap) ||
        (b = {
          element: d.keys(a._stateOverrideMap).map(function (b) {
            return a._stateOverrideMap[b];
          }),
        });
      return b;
    },
    _resolveAfDataSom: function (a) {
      var b = null;
      d.each(this.internal.liveModel.getCrossFragmentFields(), function (c) {
        c = this.internal.liveModel.getAllAbstractFieldModels(d.keys(c));
        d.each(c, function (c) {
          if (c.afDataSom === a) return (b = c), !1;
        });
        if (b) return !1;
      });
      return b;
    },
    _getSigners: function () {
      var a = {};
      if (
        this.enableAdobeSign &&
        (d.isString(this.xdpRef) ||
          d.isString(this.xsdRef) ||
          !d.isString(this.jsonModel.schemaRef))
      ) {
        var b,
          e = this,
          f,
          k,
          h,
          l = function (a, b, d) {
            var e = null,
              f;
            try {
              (f = guideBridge._guide.resolveNode(a)) ||
                (f = guideBridge._guide._resolveAfDataSom(b)),
                (e = f.value),
                "guideTelephone" === f.className &&
                  ("countryCode" === d
                    ? (e =
                        c.model.GuideTelephone.prototype._extractCountryCode(e))
                    : "phone" === d &&
                      (e =
                        c.model.GuideTelephone.prototype._extractPhoneNumber(
                          e,
                        )));
            } catch (v) {}
            return e ? e.toString() : e;
          };
        this.signerInfo &&
          d.each(d.keys(this.signerInfo), function (c) {
            (b = e.signerInfo[c]) &&
              "object" === typeof b &&
              ((h = k = f = null),
              "form" === b.emailSource &&
                b.email &&
                (f = l(b.email, b.emailAfDataSom, "email")),
              (a[c] = {}),
              (a[c].email = f ? f : ""),
              "PHONE" === b.securityOption &&
                ("form" === b.phoneSource &&
                  b.phone &&
                  (k = l(b.phone, b.phoneAfDataSom, "phone")),
                "form" === b.countryCodeSource &&
                  b.countryCode &&
                  (h = l(b.countryCode, b.countryCodeAfDataSom, "countryCode")),
                (a[c].phone = {}),
                (a[c].phone.countryCode = h ? h : ""),
                (a[c].phone.number = k ? k : "")));
          });
      }
      return a;
    },
    defaultSubmitSuccess:
      "window.guideBridge._defaultSubmitSuccessHandler($event.data)",
    defaultSubmitError:
      "window.guideBridge._handleServerValidationError($event.data)",
    _collectExpressions: function () {
      this.autoSaveStartExpression &&
        (this._compiledExpressions.autoSaveStartExp = this._compileExpression(
          this.autoSaveStartExpression,
          "autoSaveStart",
        ));
      this.submitSuccess ||
        (this.jsonModel.submitSuccess = this.defaultSubmitSuccess);
      this._compiledScripts.submitSuccess = this._compileExpression(
        this.submitSuccess,
        null,
      );
      this.submitError ||
        (this.jsonModel.submitError = this.defaultSubmitError);
      this._compiledScripts.submitError = this._compileExpression(
        this.submitError,
        null,
      );
    },
    prepare: function () {
      this.getGuideState() !==
        c.model.GuideSchema.prototype.GuideStateConstants
          .GUIDE_STATE_MERGE_PROGRESS &&
        this.getGuideState() !==
          c.model.GuideSchema.prototype.GuideStateConstants
            .GUIDE_STATE_MODEL_CREATION &&
        (d.each(
          this._children,
          function (a) {
            a.prepare();
          },
          this,
        ),
        this.queueExpressions(this, ["autoSaveStartExp"]),
        this.runPendingExpressions());
    },
    runPendingExpressions: function () {
      this._runExpressionQueue("calcExp");
      this._runExpressionQueue("enabledExp");
      this._runExpressionQueue("visibleExp");
      this._runExpressionQueue("valueCommitScript");
      this._runExpressionQueue("validateAllExp");
      this._runExpressionQueue("optionsExp");
      this._runExpressionQueue("navigationChangeExp");
      this._runExpressionQueue("summaryExp");
      this._runExpressionQueue("aggregateExp");
      this._runExpressionQueue("submitSuccess");
      this._runExpressionQueue("submitError");
      "server" !== window.guideBridge.hostName &&
        this._runExpressionQueue("autoSaveStartExp");
      this._resetExpressionCounters();
    },
    _runExpressionQueue: function (a) {
      var b = this._pendingQueues[a],
        c;
      if (b)
        for (; 0 < b.length; )
          (c = this._pendingQueues[a].shift()) && c.executeExpression(a);
    },
    queueExpressions: function (a, b) {
      a &&
        b &&
        (d.isString(b) && (b = [b]),
        d.each(
          b,
          function (b) {
            var c = this._pendingQueues[b],
              d = a.somExpression;
            b = this._runningExpressionCount[b];
            b[d] = b[d] || 0;
            c && 0 > c.indexOf(a) && 10 > b[d] && (c.push(a), (b[d] += 1));
          },
          this,
        ));
    },
    playJson: function (a, b) {
      this.rootPanel.playJson(a.rootPanel, b);
      this.toolbar && this.toolbar.playJson(a.toolbar, b);
    },
    _guide: function () {
      return this;
    },
    _collectValues: function (a) {
      d.each(
        this._children,
        function (b) {
          b._collectValues(a);
        },
        this,
      );
    },
    resolveNode: function (a) {
      if (a && "" !== a) {
        var b = a.split("."),
          c = null;
        "guide[0]" === b[0] && (b.shift(), (c = this));
        b[0] === this._escapeQualifiedName()
          ? ((c = this), b.shift())
          : this.hasOwnProperty(b[0])
            ? ((c = this[b[0]]), b.shift())
            : c || (c = this.rootPanel);
        d.each(
          b,
          function (a) {
            c = c && c._findChildren ? c._findChildren(a, !1)[0] : null;
          },
          this,
        );
        null == c && (c = this.getOrElse(this._guide().runtime, a, null));
        return c;
      }
    },
  }));
  f.defineProps({
    submitSuccess: {
      get: function () {
        return this.jsonModel.submitSuccess;
      },
    },
    submitError: {
      get: function () {
        return this.jsonModel.submitError;
      },
    },
    autoSaveStart: {
      get: function () {
        return this.jsonModel.autoSaveStart;
      },
      set: function (a) {
        this.jsonModel.autoSaveStart = a;
        !0 === a &&
          (delete this._compiledExpressions.autoSaveStartExp,
          this._triggerOnBridge(
            window.guideBridge.GUIDE_AUTO_SAVE_START,
            this,
          ));
      },
    },
    enableAutoSave: {
      set: function (a) {
        this.jsonModel.enableAutoSave = a;
      },
      get: function () {
        return this.jsonModel.enableAutoSave || !1;
      },
    },
    autoSaveStartExpression: {
      get: function () {
        return this.jsonModel.autoSaveStartExpression;
      },
    },
    autoSaveInfo: {
      get: function () {
        return this.jsonModel.autoSaveInfo;
      },
    },
    globalMetaInfo: {
      get: function () {
        return this.jsonModel.globalMetaInfo;
      },
    },
    submissionMetaInfo: {
      get: function () {
        return this.jsonModel.submissionMetaInfo;
      },
    },
    signerInfo: {
      get: function () {
        return this.jsonModel.signerInfo;
      },
    },
    xdpRef: {
      get: function () {
        return this.jsonModel.xdpRef;
      },
    },
    dorTemplateRef: {
      get: function () {
        return this.jsonModel.dorTemplateRef;
      },
    },
    dorType: {
      get: function () {
        return this.jsonModel.dorType;
      },
    },
    actionType: {
      get: function () {
        return this.jsonModel.actionType;
      },
    },
    xsdRef: {
      get: function () {
        return this.jsonModel.xsdRef;
      },
    },
    panel: {
      get: function () {
        return this.rootPanel;
      },
    },
    print: {
      get: function () {
        return "generate" === this.dorType && this.jsonModel.view
          ? this.jsonModel.view.print
          : null;
      },
    },
    allLazyChildren: {
      get: function () {
        return this.jsonModel.allLazyChildren;
      },
    },
    enableAsyncSubmission: {
      set: function (a) {
        this.jsonModel.enableAsyncSubmission = a;
      },
      get: function () {
        return !this.jsonModel.enableAsyncSubmission ||
          ("true" !== this.jsonModel.enableAsyncSubmission &&
            !0 !== this.jsonModel.enableAsyncSubmission)
          ? !1
          : !0;
      },
    },
    enableAdobeSign: {
      get: function () {
        return this.jsonModel._useSignedPdf;
      },
    },
    enableFocusOnFirstField: {
      set: function (a) {
        this.jsonModel.enableFocusOnFirstField = a;
      },
      get: function () {
        return void 0 === this.jsonModel.enableFocusOnFirstField
          ? !0
          : this.jsonModel.enableFocusOnFirstField;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  c.model.mixin.AddNavigationContext = {
    propertyDescriptors: {
      navigationContext: {
        get: function () {
          this._navigationContext ||
            (this._navigationContext = new c.model.util.GuideNavigationContext({
              currentItem: null,
              parentPanel: this.panel,
            }));
          return this._navigationContext;
        },
      },
    },
  };
})(_, guidelib);
(function (d, c) {
  var f = (c.model.GuidePanel = c.model.GuideItemsContainer.extend({
    msClassName: "guidePanel",
    defaultExpressions: {
      summary:
        "this.title + (this.instanceIndex \x3e 0 ? ' ' + this.instanceIndex : '')",
    },
    initialize: function () {
      f._super.initialize.call(this);
      this._navigationContext = this._currentItem = null;
    },
    _collectExpressions: function () {
      f._super._collectExpressions.call(this);
      this.completionExp &&
        (this._compiledScripts.completionExp = this._compileExpression(
          this.completionExp,
          null,
        ));
      this._compiledExpressions.summaryExp = this.jsonModel.summaryExp
        ? this._compileExpression(this.jsonModel.summaryExp, "summary")
        : this._compileExpression(this.defaultExpressions.summary, "summary");
    },
    _initializeInstanceManager: function (a, b, d) {
      var e = c.model.GuideModelRegistry.prototype.createInstanceManager(a);
      this._initializeChild(e);
      this._children.splice(b + d++, 0, e);
      e._manageChild(a);
      b = a._getBindNode();
      var f = this.getOrElse(b, "instanceManager.count", 0);
      a = Math.max(a.minOccur, f) - 1;
      for (var h = 1, l; 0 < a; )
        (l = null),
          1 < f && (l = b.instanceManager.instances[h++]),
          e.addInstance(l),
          --a,
          (d += 1);
      return d;
    },
    _initChildren: function (a) {
      f._super._initChildren.call(this);
      a || (this._instanceManager = null);
      this._childInitializeGoingOn = !0;
      var b = 0;
      d.each(
        this.children,
        function (a, d) {
          a instanceof c.model.GuidePanel &&
            (b = this._initializeInstanceManager(a, d, b));
        },
        this,
      );
      this.jsonModel.toolbar &&
        ((a = {}),
        this.options._guideContainer &&
          (a = d.extend({}, a, {
            _guideContainer: this.options._guideContainer,
          })),
        (a = c.model.GuideModelRegistry.prototype.createModel(
          this.jsonModel.toolbar,
          a,
        )),
        this._initializeChild(a),
        this._children.push(a));
      this._summary = null;
      this._childInitializeGoingOn = !1;
    },
    _postInitialize: function () {
      f._super._postInitialize.call(this);
      this.instanceManager._postInitializeBinding();
    },
    _addChildAt: function (a, b, e) {
      if (a) {
        this._initializeChild(a);
        this._guide()._modelTemplateCacheStore.putModel(a);
        var f = this._getItemsInsertIndex(b - 1),
          k = {},
          h = a.id,
          l = -1;
        d.each(
          this.jsonModel.items,
          function (b, c) {
            l == f - 1 && (k[h] = a.jsonModel);
            k[c] = b;
            l++;
          },
          this,
        );
        l == f - 1 && (k[h] = a.jsonModel);
        this.jsonModel.items = k;
        a._isItem = !0;
        this._children.splice(b, 0, a);
        this._normalizeChildren();
        a._postInitialize();
        this._guide().getGuideState() >=
          c.model.GuideSchema.prototype.GuideStateConstants
            .GUIDE_STATE_MERGE_COMPLETE && a.prepare();
        (this._lazyReference && this._childInitializeGoingOn) ||
          e ||
          this._triggerEvent(
            c.event.GuideModelEvent.CHILD_CHANGED,
            "childAdded",
            null,
            a,
          );
      }
    },
    validate: function (a) {
      var b = !1;
      if (!this.visible) return !0;
      var e = !1;
      if (this._lazyReference && this.guideUtil.isLazyJson(this.jsonModel)) {
        var g = this._guide().internal.GuideDirtyMarkerAndVisitor.visitMap,
          k = this._guide()._modelTemplateCacheStore,
          h = c.util.GuideUtil,
          l = this.templateId,
          m;
        0 === g[l] &&
          (this._ancestorRepeatable && (m = h.generateUID()),
          (g = k._getTemplate(l, !0)),
          d.isEmpty(g)
            ? (b = !0)
            : (this._embedJson(g.items, m),
              this._guide().internal.liveDataUtils.playLiveData(this),
              this.prepare(),
              this._guide().runPendingExpressions(),
              this._guide().internal.liveDataUtils.updateLiveData(),
              (e = !0)));
      }
      a = f._super.validate.call(this, a);
      e && this._unloadLazyReferenceModel(!0);
      !0 === b && (a = !1);
      return a;
    },
    _loadLazyFragment: function (a) {
      a = a || {};
      if (d.isUndefined(this._itemsLoaded)) {
        var b = guideBridge._getGuidePathUrl(".jsonhtmlemitter");
        this._fetchFromAjaxCall(b, a);
      } else d.isFunction(a.success) && a.success.call(this);
    },
    _fetchFromAjaxCall: function (a, b) {
      b && d.isFunction(b.preFetch) && b.preFetch.call(this);
      var e = this;
      window.guideBridge.panelProvider.getHtmlJson({
        path: a,
        templateId: e.templateId,
        fetchJSON: !0,
        fetchHTML: !0,
        success: function (a) {
          if (e.repeatable || e._ancestorRepeatable)
            var f = e.guideUtil.generateUID();
          c.util.GuideUtil._embedHtml(e, a.html, f) &&
            ((e._ajaxCallDone = !0),
            (a = JSON.parse(a.json).items),
            e._embedJson(a, f),
            (f = e._guide().internal.GuideDirtyMarkerAndVisitor),
            e.repeatable || f._updateCountOrInsert(f.visitMap, e.templateId),
            e._guide().internal.liveDataUtils.playLiveData(e),
            e.prepare(),
            (e._itemsLoaded = !0),
            e._guide().trigger(c.event.GuideModelEvent.LAZY_LOADED),
            e._triggerOnBridge("elementLazyLoaded", e),
            b && d.isFunction(b.success) && b.success.call(this));
        },
        error: function () {
          e.logger().error("AF", "Failed to fetch HTML and JSON for :" + a);
        },
        complete: function () {
          b && d.isFunction(b.postFetch) && b.postFetch.call(this);
        },
      });
    },
    _unloadLazyReferenceModel: function (a) {
      try {
        if (this._lazyReference) {
          window.guideBridge._populateBindRefToSomMap(this);
          if (!a) {
            var b = this.validate(),
              c = this._guide().internal.GuideDirtyMarkerAndVisitor.visitMap;
            !1 === b && 0 < c[this.id] && (c[this.id] = 0);
          }
          d.each(
            this.children,
            function (b) {
              b._unloadModel(a);
              var c = this._children.indexOf(b);
              this._children.splice(c, 1);
              var e = null;
              d.each(
                this.jsonModel.items,
                function (a, c) {
                  a === b.jsonModel && (e = c);
                },
                this,
              );
              e && delete this.jsonModel.items[e];
              this._normalizeChildren();
            },
            this,
          );
          this._currentItem = this._navigationContext = null;
        }
      } catch (g) {
        this.logger().error(g);
      }
    },
    _unloadModel: function (a) {
      var b = this._guide().internal.GuideDirtyMarkerAndVisitor.visitMap;
      d.each(
        this.children,
        function (c) {
          this._lazyReference &&
            !a &&
            !1 === c.validate() &&
            (d.isUndefined(b[this.templateId]) || (b[this.templateId] = 0));
          c._unloadModel(a);
        },
        this,
      );
      c.model.Scriptable.prototype._unloadModel.call(this);
    },
    _removeChild: function (a) {
      a._unloadModel();
      var b = this._children.indexOf(a);
      this._children.splice(b, 1);
      var e = null;
      d.each(
        this.jsonModel.items,
        function (b, c) {
          b === a.jsonModel && (e = c);
        },
        this,
      );
      e && delete this.jsonModel.items[e];
      this._normalizeChildren();
      this._triggerEvent(
        c.event.GuideModelEvent.CHILD_CHANGED,
        "childRemoved",
        a,
        null,
      );
    },
    _embedJson: function (a, b) {
      var c = !1,
        f = JSON.parse(JSON.stringify(a)),
        k = this.id;
      k = k.slice(0, -2);
      a &&
        ((this.repeatable || this._ancestorRepeatable) &&
          this.copyObject(a, f, {
            transformMaps: {
              id: function (a, c, d) {
                return b + "__" + d.templateId;
              },
            },
          }),
        d.each(
          f,
          function (a, b) {
            d.isObject(a) &&
              ((c = !0),
              (this.jsonModel.items = this.jsonModel.items || {}),
              (this.jsonModel.items[b] = a),
              this._guide()._modelTemplateCacheStore._putTemplate(
                JSON.parse(JSON.stringify(a)),
              ));
          },
          this,
        ),
        this._embedModel());
      return c;
    },
    _embedModel: function () {
      this._initChildren(!0);
      this._guide()._modelTemplateCacheStore.putModel(this);
      this._postInitialize();
      this._normalizeChildren();
    },
    _getItemsInsertIndex: function (a) {
      var b = 0;
      d.find(
        this._children,
        function (c, d) {
          c._isItem && b++;
          if (d >= a) return !0;
        },
        this,
      );
      return b;
    },
    playJson: function (a, b) {
      var e = {},
        f = {};
      d.each(
        a.items,
        function (a) {
          d.isObject(a) &&
            ("guidePanel" === a.guideNodeClass ||
            "guideTable" === a.guideNodeClass ||
            "guideTableRow" === a.guideNodeClass
              ? f[a.name]
                ? f[a.name].push(a)
                : (f[a.name] = [a])
              : e[a.name]
                ? e[a.name].push(a)
                : (e[a.name] = [a]));
        },
        this,
      );
      var k = d.filter(
        this._children,
        function (a) {
          return a instanceof c.model.GuideInstanceManager;
        },
        this,
      );
      d.each(
        k,
        function (a) {
          var c = a._getInstanceName(),
            e = f[c] || [];
          c = a._instances.slice(0);
          d.each(
            c,
            function (c, d) {
              0 < e.length
                ? ((d = e.shift()), c.playJson(d, b))
                : a.removeInstance(d);
            },
            this,
          );
          0 < e.length &&
            d.each(
              e,
              function (c) {
                var d = a.addInstance();
                d && d.playJson(c, b);
              },
              this,
            );
        },
        this,
      );
      d.each(
        this.items,
        function (a) {
          if (!(a instanceof c.model.GuidePanel)) {
            var d = e[a.name];
            d && 0 < d.length && a.playJson(d.shift(), b);
          }
        },
        this,
      );
      this.toolbar && this.toolbar.playJson(a.toolbar, b);
    },
    _getReducedJSON: function (a) {
      a = f._super._getReducedJSON.call(this, a || this.canBeRepeatable);
      this.jsonModel.toolbar && (a.toolbar = this.toolbar._getReducedJSON());
      return a;
    },
    _getRole: function () {
      var a, b;
      var c = {
        Table: "grid",
        "Header Row": "rowHeader",
        "Body Row": "rowGroup",
        "Footer Row": "rowGroup",
        List: "list",
      };
      this.bindNode &&
        (b = this.getOrElse(
          this.bindNode.assist && this.bindNode.assist.role,
          null,
        )) &&
        (a = c[b]);
      return a;
    },
    _getAssistPriority: function () {
      return this.getAttribute("assistPriority") || "description";
    },
    _getScreenReaderText: function () {
      var a;
      "description" !== this._getAssistPriority() &&
        (a = f._super._getScreenReaderText.apply(this));
      return a;
    },
    execCompletion: function () {
      var a = !0;
      d.find(
        this.children,
        function (b) {
          if (b instanceof c.model.GuidePanel && !b.execCompletion())
            return (a = !1), !0;
        },
        this,
      );
      a && this.completionExp && (a = this.executeExpression("completionExp"));
      return a;
    },
    _preserveLazyValue: function () {
      return (
        !this._isXfaNode() &&
        !(this instanceof c.model.RootPanelNode) &&
        (this.canBeRepeatable ||
          this._guide().internal.liveDataUtils.isIndexedPath(this.bindRef))
      );
    },
    _syncModelAndData: function (a, b, c, f) {
      var e = this._guide().internal.liveDataUtils;
      if (this._preserveLazyValue()) {
        var g = e._getDataContext(this, a, b),
          l = g.indexedXpath;
        this.canBeRepeatable &&
          (d.isFunction(c) &&
            0 === this.instanceIndex &&
            c(
              e.getDataInstances(g, this._getDataNodeName()),
              e.getParentDataNode(g),
            ),
          (l = e.addIndexToPath(l, this.instanceIndex)));
        g.xmlSec === e.constants.UNBOUND_TAG
          ? (b = l)
          : g.xmlSec === e.constants.BOUND_TAG && (a = l);
      }
      d.isString(f) &&
        d.each(this.items, function (c) {
          if (d.isFunction(c[f])) c[f](a, b);
        });
      return { bound: a, unBound: b };
    },
    _getDataNodeName: function () {
      var a = this.bindRef;
      return a
        ? a.substring(a.lastIndexOf("/") + 1)
        : this.getAttribute("name");
    },
    _updateLiveData: function (a, b) {
      var c = this._guide().internal.liveDataUtils,
        d = this;
      this._syncModelAndData(
        a,
        b,
        function (a, b) {
          var e = d.instanceManager.instanceCount;
          if (a && a.length > e)
            for (a = a.length - 1; a >= e; --a)
              c.removeChild(b, d._getDataNodeName(), a);
        },
        "_updateLiveData",
      );
    },
    _playLiveData: function (a, b) {
      var c = arguments,
        d = this;
      this._syncModelAndData(
        a,
        b,
        function (a, b) {
          null == a && (a = []);
          if (a && a.length < d.instanceManager.instanceCount)
            for (
              a = Math.max(a.length, Math.abs(d.minOccur));
              a < d.instanceManager.instanceCount;
              ++a
            )
              d.instanceManager.removeInstance(a);
          else if (a && a.length > d.instanceManager.instanceCount)
            for (
              b = 0 > d.maxOccur ? a.length : Math.min(a.length, d.maxOccur),
                a = d.instanceManager.instanceCount;
              a < b;
              ++a
            ) {
              var e = d.instanceManager.addInstance();
              e && d._playLiveData.apply(e, c);
            }
        },
        "_playLiveData",
      );
    },
  }));
  f.defineProps({
    completionExp: {
      get: function () {
        return this.getAttribute("completionExp");
      },
    },
    completionExpReq: {
      get: function () {
        return this.getAttribute("completionExpReq");
      },
    },
    minOccur: {
      get: function () {
        return this.getOrElse(this.jsonModel.minOccur, 1);
      },
    },
    maxOccur: {
      get: function () {
        return this.getOrElse(this.jsonModel.maxOccur, 1);
      },
    },
    initialOccur: {
      get: function () {
        return this.getOrElse(this.jsonModel.initialOccur, 1);
      },
    },
    repeatable: {
      get: function () {
        return 1 != this.minOccur || 1 != this.maxOccur;
      },
    },
    canBeRepeatable: {
      get: function () {
        return 0 > this.maxOccur || 1 < this.maxOccur;
      },
    },
    panel: {
      get: function () {
        return this;
      },
    },
    toolbar: {
      get: function () {
        this.getElement("guideToolbar");
      },
    },
    instanceManager: {
      get: function () {
        return this._instanceManager;
      },
    },
    instanceIndex: {
      get: function () {
        var a = this._guide()._currentContext;
        a && a.managedExp && this._addDependant(a.contextNode, a.expression);
        return this.instanceManager._instances.indexOf(this);
      },
    },
    title: {
      get: function () {
        return this.jsonModel["jcr:title"];
      },
      set: function (a) {
        var b = this.title;
        b !== a &&
          ((this.jsonModel["jcr:title"] = a),
          this.trigger(
            c.event.GuideModelEvent.MODEL_CHANGED,
            c.event.GuideModelEvent.createEvent(
              c.event.GuideModelEvent.MODEL_CHANGED,
              this,
              "title",
              b,
              a,
            ),
          ));
      },
    },
    summary: {
      get: function () {
        return this._summary;
      },
      set: function (a) {
        var b = this._summary;
        b !== a &&
          ((this._summary = a),
          this.trigger(
            c.event.GuideModelEvent.MODEL_CHANGED,
            c.event.GuideModelEvent.createEvent(
              c.event.GuideModelEvent.MODEL_CHANGED,
              this,
              "summary",
              b,
              this._summary,
            ),
          ));
      },
    },
    enableLayoutOptimization: {
      get: function () {
        return this.getOrElse(
          this.jsonModel,
          "layout.enableLayoutOptimization",
          !1,
        );
      },
    },
    isNavigable: {
      get: function () {
        var a = this.getOrElse(this.jsonModel, "layout.nonNavigable", !1);
        return "string" === typeof a ? "true" !== a : !a;
      },
    },
    _hopsToRootPanel: {
      get: function () {
        return c.util.GuideUtil._countHopsToRootPanel(this);
      },
    },
    _ancestorRepeatable: {
      get: function () {
        for (var a = this.parent; a; ) {
          if (a && a.repeatable) return !0;
          a = a.parent;
        }
        return !1;
      },
    },
    enabled: {
      get: function () {
        return c.model.Scriptable.prototype._getEnabled.call(this);
      },
      set: function (a) {
        var b = this.enabled;
        c.model.Scriptable.prototype._setEnabled.call(this, a);
        this._parentAccess && a != b && this._changeContainerAccess(a);
      },
    },
    _hasLazyDescendant: {
      get: function () {
        return d.isEmpty(guideBridge._guide.allLazyChildren) ? !1 : !0;
      },
    },
  });
  f.addMixins([
    c.model.mixin.AddNavigationContext,
    c.model.mixin.AddDependencyMgmt,
  ]);
})(_, guidelib);
(function (d, c) {
  c.model.GuideTableRow = c.model.GuidePanel.extend({
    msClassName: "guideTableRow",
  });
})(_, guidelib);
(function (d, c) {
  (c.model.GuideTable = c.model.GuidePanel.extend({
    msClassName: "guideTable",
  })).defineProps({
    mobileLayout: {
      get: function () {
        return this.jsonModel.layout.mobileLayout;
      },
    },
    columnWidth: {
      get: function () {
        return this.jsonModel.columnWidth;
      },
    },
  });
})(_, guidelib);
(function (d, c) {
  (c.model.RootPanelNode = c.model.GuidePanel.extend({
    msClassName: "rootPanelNode",
    _clearInactiveLazyViews: function (c) {
      d.each(this.childViews, function (a) {
        a._clearInactiveLazyViews(c);
      });
    },
  })).defineProps({
    toolbar: {
      get: function () {
        return this.getElement("guideToolbar") || this.parent.toolbar;
      },
    },
  });
})(_, guidelib);
(function (d, c, f) {
  function a(a) {
    return function () {
      return !a.apply(this, arguments);
    };
  }
  function b(a) {
    return a instanceof Array ? Array.prototype.includes.bind(a) : a;
  }
  c.model.util.CommonUtils = {
    returnMinimalJSON: function (a, b, c) {
      f.isObject(b) || (b = {});
      f.each(a, function (a) {
        f.isUndefined(c.jsonModel[a])
          ? f.isUndefined(c[a]) || (b[a] = c[a])
          : (b[a] = c.jsonModel[a]);
      });
    },
    createMap: function (a, b) {
      return f.mapObject(f.object(a, []), function () {
        return b;
      });
    },
    updatedMapIfNot: function (c, d, f) {
      return _updateMap(c, a(b(d)), f);
    },
    updatedMap: function (a, c, d) {
      return _updateMap(a, b(c), d);
    },
    _updatedMap: function (a, b, c) {
      var d = {},
        e;
      for (e in a) a.hasOwnProperty(e) && (d[e] = b(e) ? c : a[e]);
      return d;
    },
    _getScope: function (a) {
      return Object.assign(c.runtime, a._guide().runtime);
    },
  };
})($, guidelib, _);
(function (d, c, f) {
  var a = xfalib.ut.XfaUtil.prototype.getOrElse,
    b = f.model.util.CommonUtils,
    e = f.model.GuideSchema.prototype.GuideStateConstants,
    g = function () {
      var a =
        void 0 === window.AF_log_config ? "0-a9" : "1-" + window.AF_log_config;
      xfalib.ut.XfaUtil.prototype.registerLocaleProperties(f.i18n);
      window.formBridge
        ? (window.formBridge.registerConfig(
            "contextPath",
            window.guideBridge.userConfig.contextPath,
          ),
          window.formBridge.registerConfig("LoggerConfig", {
            logConfigString: a,
            categoryAcronyms: { d: "AF" },
          }))
        : (xfalib.ut.XfaUtil.prototype.logger = new xfalib.ut.Logger({
            jsonModel: { logConfigString: a, categoryAcronyms: { d: "AF" } },
          }));
    },
    k = {
      triggerEventOnWindow: function (a) {
        c(window).trigger(a);
      },
      postExternalMessage: function (a) {
        window.guideBridge._postExternalMessage({ name: a });
      },
    },
    h = {
      createView: function (a, b) {
        k.postExternalMessage("_layoutstart");
        a = new f.view.GuideContainerView({ element: b, model: a });
        window.guideBridge._setGuideView(a);
        f.util.GuideUtil.initializeHelp();
        f.util.AdUtil.applyDescriptionPlugin();
        k.postExternalMessage("_layoutend");
        c(window).on("mousedown.guidebridge", function () {
          window.guideBridge.clickedOnWindow = !0;
        });
      },
      getLastFocusItem: function (a) {
        var b;
        a.runtime.guideContext &&
          (b = f.util.GuideUtil.fetchXMLNodeValue(
            a.runtime.guideContext.guidePrefillXml,
            "lastFocusItem",
          ));
        d.isUndefined(b) &&
          (b = f.util.GuideUtil._fetchJSONNodeValue(
            a.runtime.guideContext.guidePrefillJson,
            "afSubmissionInfo.lastFocusItem",
          ));
        d.isUndefined(b) &&
          (b = window.guideBridge.customContextProperty("lastFocusItem"));
        return b;
      },
      setFocus: function (a) {
        a ? window.guideBridge.setFocus(a) : window.guideBridge.setFocus();
      },
      preventCheckBoxMovementOnClick: function () {
        xfalib.ut.XfaUtil.prototype.isSafari() &&
          !xfalib.ut.TouchUtil.TOUCH_ENABLED &&
          c("#guideContainerForm").addClass("macSafariForm");
      },
      disableDefaultSubmit: function () {
        c("#guideContainerForm").submit(function (a) {
          a.preventDefault();
        });
      },
      preventFormSubmitOnEnter: function () {
        c("#guideContainerForm input").keypress(function (a) {
          (13 != a.keyCode && 13 != a.charCode && 13 != a.which) ||
            a.preventDefault();
        });
      },
      renderView: function (a, b) {
        h.createView(a, b);
        b = h.getLastFocusItem(a);
        h.setFocus(b);
        k.triggerEventOnWindow({ type: "guideInitialized", guide: a });
        h.preventCheckBoxMovementOnClick();
        h.disableDefaultSubmit();
        h.preventFormSubmitOnEnter();
      },
    };
  f.model._createXfaAndGuideModel = function (a, b, c) {
    b &&
      (xfalib.script.XfaModelRegistry.prototype.createModel(b),
      new xfalib.acrobat.Acrobat());
    a = f.model.GuideModelRegistry.prototype.createModel(a, c);
    a._bindRefMap = {};
    return a;
  };
  f.model._getGuideJsonWithSyncXfaProps = function (a, b) {
    f.model._createXfaAndGuideModel(a, b).syncXFAProps();
    return { guidejson: JSON.stringify(a), xfajson: JSON.stringify(b) };
  };
  f.model._prepareGuide = function (a, b) {
    var c = b.internal.liveDataUtils,
      g = b.internal.liveModel,
      h = function (a) {
        var c = [];
        try {
          c = JSON.parse(a).map(function (a) {
            return new f.model.FileAttachmentWrapper(JSON.parse(a));
          });
        } catch (w) {
          w.stack && b.logger().error(w.stack);
        }
        return c;
      };
    a.isMergedJson && a.data
      ? (a.data.guideState &&
          a.data.guideState.attachments &&
          (a.data.attachments = h(a.data.guideState.attachments)),
        window.guideBridge.restoreGuideState(a.data))
      : a.data
        ? (b.setGuideState(e.GUIDE_STATE_MERGE_PROGRESS),
          c.initLiveData(
            a.data,
            null,
            d.isString(b.xdpRef),
            d.isString(b.xsdRef),
            b.getAttribute("xsdRootElement"),
            h(a.attachments),
          ),
          c.playLiveData(b.rootPanel),
          g.prefillCrossFragFields(b),
          b.setGuideState(e.GUIDE_STATE_MERGE_COMPLETE),
          b.prepare())
        : (b.prepare(),
          c.initLiveData(
            null,
            null,
            d.isString(b.xdpRef),
            d.isString(b.xsdRef),
            b.getAttribute("xsdRootElement"),
          ));
    a = guideBridge.customContextProperty("fileAttachmentMap");
    if (!d.isUndefined(a) && "string" === typeof a)
      try {
        a = JSON.parse(a);
      } catch (v) {
        v.stack && b.logger().error(v.stack), (a = void 0);
      }
    var k = window.guideBridge._getFileAttachmentsList();
    if (!d.isUndefined(a))
      for (c = 0; c < k.length; c++)
        (g = k[c]),
          (h = a[g.somExpression]),
          (g.fileAttachment.value = h),
          d.isEmpty(h) || (g._fileList = h.split("\n"));
    b.setGuideState(e.GUIDE_STATE_MODEL_COMPLETE);
  };
  f.model.markDirtyPanels = function (a, c, e, f) {
    a = b.createMap(a, 0);
    if (d.isEmpty(c)) f.internal.GuideDirtyMarkerAndVisitor.visitMap = a;
    else {
      if (null === e || 0 === e.length)
        e = f.internal.liveDataUtils.getListOfDirtyPanels(c);
      e &&
        0 < e.length &&
        ((a = b.updatedMapIfNot(a, e, 1)),
        (f.internal.GuideDirtyMarkerAndVisitor.visitMap = a));
    }
  };
  f.model.initializeLiveDataUtils = function (a) {
    return "formdatamodel" === a || "jsonschema" === a
      ? new f.model.LiveJsonUtils()
      : new f.model.LiveXmlUtils();
  };
  f.model.prepareInput = function (a) {
    return {
      guideJson: JSON.parse(a.guidejson || "null"),
      guideContext: JSON.parse(a.guidecontext || "null"),
      guidemergedjson: JSON.parse(a.guidemergedjson || "null"),
      xfaJson: JSON.parse(a.xfajson || "null"),
      xfaRenderContext: JSON.parse(a.xfarendercontext || "null"),
    };
  };
  f.model.mergeData = function (b, e, g) {
    var h = b.data,
      k = [],
      l = {};
    e.runtime.guideContext = e.runtime.guideContext || {};
    if (b.isMergedJson) {
      if ("string" === typeof b.data)
        try {
          b.data = JSON.parse(b.data);
        } catch (w) {
          b.data = "";
        }
      h = a(
        b.data,
        "guideState.guideLiveData",
        a(
          h,
          "guideState.guidePrefillXml",
          a(b.data, "guideState.guidePrefillJson", void 0),
        ),
      );
      (l = a(
        b.data,
        "guideState.guideContext.afSubmissionInfo.afDraft",
        "",
      ).replace(/"/g, "")) && (k = l.split(","));
      l = a(b.data, "guideState.guideContext.customPropertyMap", {});
      var m = a(b.data, "guideState.customContext", null);
      var p = a(f, "__runtime__.guideContext.customPropertyMap", {});
      p = d.extend({}, p, a(e, "runtime.guideContext.customPropertyMap", {}));
      !d.isEmpty(m) && d.isEmpty(p) && guideBridge.customContextProperty(p);
      m = a(b.data, "guideState.fileAttachmentMap", null);
      p = guideBridge.customContextProperty("fileAttachmentMap");
      !d.isEmpty(m) &&
        d.isEmpty(p) &&
        guideBridge.customContextProperty("fileAttachmentMap", m);
    } else
      guideBridge.customContextProperty(
        "fileAttachmentMap",
        b.fileAttachmentMap,
      ),
        guideBridge.customContextProperty(
          "fileAttachmentWrappers",
          b.fileAttachmentWrappers,
        );
    e.xdpRef &&
      ((m = a(b.data, "guideState.xfaState.xfaRenderContext", null)),
      null != m && (xfalib.runtime.renderContext = JSON.parse(m)),
      xfalib.runtime.xfa.form._initialize(!0),
      c(window).trigger("XfaInitialized"));
    "" !== h &&
      ("formdatamodel" === g.schemaType || "jsonschema" === g.schemaType
        ? (g.guidePrefillJson = h)
        : (g.guidePrefillXml = h));
    g.customPropertyMap = c.extend({}, g.customPropertyMap, l);
    c.extend(!0, e.runtime.guideContext, g);
    f.model.markDirtyPanels(e.allLazyChildren, h, k, e);
    f.model._prepareGuide(b, e);
    0 < e.allLazyChildren.length &&
      guideBridge.customContextProperty("fileAttachmentMap") &&
      ((b = guideBridge.customContextProperty("fileAttachmentMap")),
      "string" === typeof b && (b = JSON.parse(b)),
      e.internal.liveDataUtils._updateLazyAttachmentMap(b));
  };
  f.model.fireOnContainerDomElementReady = function (b, m, p, r) {
    g();
    var l = this.prepareInput(b);
    b = l.guideJson;
    var t = l.guideContext,
      v = l.guidemergedjson,
      u = l.xfaJson;
    l = l.xfaRenderContext;
    var w;
    if (null === b || null == t)
      console.error("Unable to load Form. Adaptive Form Json is invalid.");
    else {
      void 0 !== window.guideBridge && (w = window.guideBridge._getStorage());
      try {
        (r = d.isObject(r) ? JSON.stringify(r) : r), (r = JSON.parse(r));
      } catch (D) {
        r = {};
      }
      !m || (null !== v && "" !== v && null === a(w, "guideState", null))
        ? ((m = v),
          null !== a(w, "guideState", null) && (m = w),
          (m = { data: m, isMergedJson: !0 }))
        : m instanceof Function
          ? ((w = m()),
            (m =
              w.then instanceof Function
                ? w
                : d.extend({}, { isMergedJson: !1 }, m())))
          : ((m = a(
              window.guideBridge,
              "userConfig.submitConfig.aemFormComponentPath",
              t.guidePath,
            )),
            (m = window.guideBridge._getGuidePathUrl(
              ".af.prefilldata.json",
              m,
            )),
            (m = this.fetchData(m + window.location.search)));
      w = this.initializeLiveDataUtils(t.schemaType);
      v = new f.model.LiveModel();
      "server" == window.guideBridge.hostName &&
        (v._disableFunctions(),
        w._disableFunctions(),
        d.each(d.functions(h), function (a) {
          h[a] = function () {};
        }),
        window.formBridge && (window.formBridge.ajaxCallMode = "server"));
      v.createDataNodes(b.repeatBindRef);
      var x = a(b, "allLazyChildren", []),
        A = {};
      A = d.extend({}, A, { liveModel: v, liveDataUtils: w });
      k.postExternalMessage("_formdomstart");
      try {
        var y = f.model._createXfaAndGuideModel(b, u, A);
        y.runtime.guideContext.customPropertyMap = d.extend(
          {},
          y.runtime.guideContext.customPropertyMap,
          r,
        );
        0 < x.length && v.createCrossFragFields(b.guideGlobalLazyField, y);
        y.version = new f.util.Version({
          scriptingBehaviourVersion: t.scriptingBehaviourVersion,
        });
        y.setGuideState(e.GUIDE_STATE_MODEL_CREATED);
        u && l && (xfalib.runtime.renderContext = l);
        k.triggerEventOnWindow({ type: "guideModelInitialized", guide: y });
      } catch (D) {
        D.stack && console.error(D.stack);
      }
      var z = p || c("div.guideContainerWrapperNode");
      if (m.then instanceof Function)
        return m.then(function (a) {
          f.model.mergeData(a, y, t);
          h.renderView(y, z);
        });
      f.model.mergeData(m, y, t);
      h.renderView(y, z);
      return y;
    }
  };
  f.model.fetchData = function (a) {
    var b = c.Deferred();
    "server" === window.guideBridge.hostName
      ? b.resolve({ data: "", isMergedJson: !1 })
      : c
          .ajax({ url: a, type: "POST", dataType: "json" })
          .done(function (a) {
            a = d.extend({}, a, { isMergedJson: !1 });
            b.resolve(a);
          })
          .fail(function (a, c, d) {
            console.error(c + " " + d);
            b.resolve({ data: "", isMergedJson: !1 });
          });
    return b.promise();
  };
})(_, $, window.guidelib);
(function (d, c) {
  c.intervals = c.intervals || {};
  c.intervals.intId = setInterval(function () {
    var f = d("div.fileattachmentlisting button[data-guide-fileListing]");
    if (0 < f.length) {
      clearInterval(c.intervals.intId);
      var a;
      f.click(function () {
        a = d(this);
        d("#fileAttachment").addClass("fileAttachmentDialog");
        d("#fileAttachment").appendTo("body");
        d("#fileAttachment").modal("show");
      });
      d(".fileAttachmentDialog").on("hidden.bs.modal", function (b) {
        d(this).removeClass("fileAttachmentDialog");
        a.focus();
      });
    }
  }, 1e3);
})($, guidelib);
(function (d) {
  var c = function (a) {
    this.element = d(a);
  };
  c.prototype.add = function () {
    $this = this.element;
    var a = $this.attr("data-guide-id");
    a &&
      (window.guideBridge
        ? (a = window.guideBridge._resolveId(a)) &&
          (a = a.instanceManager.insertInstance(a.instanceIndex + 1)) &&
          window.guideBridge.setFocus(a.somExpression, "firstItem")
        : console.log("could not add new instance" + a));
  };
  c.prototype.remove = function () {
    $this = this.element;
    var a = $this.attr("data-guide-id");
    a &&
      (window.guideBridge
        ? (a = window.guideBridge._resolveId(a)) &&
          a.instanceManager.removeInstance(a.instanceIndex)
        : console.log("could not remove instance"));
  };
  var f = d.fn.guideAddRemove;
  d.fn.guideAddRemove = function (a) {
    return this.each(function () {
      var b = d(this),
        e = b.data("guideAddRemove");
      e || b.data("guideAddRemove", (e = new c(this)));
      if ("string" == typeof a) e[a]();
    });
  };
  d.fn.guideAddRemove.Constructor = c();
  d.fn.guideAddRemove.noConflict = function () {
    d.fn.guideAddRemove = f;
    return this;
  };
  d(document)
    .on(
      "click.guideAddRemove.data-api keypress.guideAddRemove.data-api",
      '[data-guide-addremove\x3d"add"]',
      function (a) {
        if (
          "keypress" != a.type ||
          guidelib.util.GuideUtil.isEnterKeyPressed(a)
        )
          a.preventDefault(),
            a.stopImmediatePropagation(),
            d(this).guideAddRemove("add");
      },
    )
    .on(
      "click.guideAddRemove.data-api keypress.guideAddRemove.data-api",
      '[data-guide-addremove\x3d"remove"]',
      function (a) {
        if (
          "keypress" != a.type ||
          guidelib.util.GuideUtil.isEnterKeyPressed(a)
        )
          a.preventDefault(), d(this).guideAddRemove("remove");
      },
    );
})($);
(function (d) {
  d(document).on("panelRemoved.af", ".guideTableNode", function (c, f, a) {
    c.stopPropagation();
    c = d(c.target).find("tr.guideTableRowNode:not(.guideTableHeader)");
    1 < a
      ? ((a = c.eq(a - 1)),
        guidelib.util.GuideUtil.setFocusOnFirstItemOfTableRow(a))
      : 1 == a &&
        ((a = c.eq(1)),
        0 < a.length &&
          guidelib.util.GuideUtil.setFocusOnFirstItemOfTableRow(a));
  });
})($);
$(function (d) {
  var c = function (a) {
      a = window.guideBridge._resolveId(a);
      return void 0 === a || null === a ? "" : a.somExpression;
    },
    f = xfalib.ut.TouchUtil.POINTER_UP;
  "touchend" === f && (f = "mouseup");
  d("body").on(f + " keydown", "[data-guide-wizard-nav]", function (a) {
    var b = !1;
    "keydown" !== a.type ||
      (32 !== a.keyCode && 13 !== a.keyCode) ||
      (a.preventDefault(), (b = !0));
    if ("pointerup" === a.type || b)
      (a = d(this).data("guide-wizard-nav")),
        _.isObject(a)
          ? (a.somExpression = c(a.panelId))
          : ((a = c(a)),
            (b = d(this).data("guide-wizard-nav-type")),
            (a = {
              somExpression: a,
              focusOption: b,
              runCompletionScript: !0,
            })),
        window.guideBridge.setFocus(a);
  });
  window.guideBridge.on("elementNavigationChanged", function (a, b) {
    a = window.guideBridge._guideView.getView(b.newText);
    if (
      a instanceof guidelib.view.GuidePanelView &&
      ((b = a.parentView.$element.find(
        '[id*\x3d"' +
          guidelib.util.GuideUtil.GUIDE_ITEM_NAV_CONTAINER_SUFFIX +
          '"]',
      )),
      !_.isUndefined(b) && !_.isNull(b) && 0 < b.length)
    ) {
      var c = b.eq(0);
      _.isUndefined(c.data("guideNavScrollPos")) &&
        c.data("guideNavScrollPos", 0);
      b = c.data("guideNavScrollPos");
      var d = a.parentView.childViews,
        f,
        h = 0;
      for (f = 0; f < d.length && a !== d[f]; f++)
        d[f]._model.visible && (h += 1);
      a = Math.abs(h - b);
      guidelib.util.GuideUtil.navScroll(
        c,
        h > b ? "right" : "left",
        a,
        '[id*\x3d"' +
          guidelib.util.GuideUtil.GUIDE_ITEM_NAV_SUFFIX +
          '"]:not(.hidden)',
      );
    }
  });
});
$(function (d) {
  window.guideBridge.connect(function () {
    var c = !window.guideBridge._guide.getAttribute("disableSwipeGesture");
    window.guideBridge.enableSwipeGesture(c, c);
  }, this);
  var c = function () {
    d(window).scrollTop() == d(document).height() - d(window).height()
      ? d("[data-guide-scroll-indicator]").removeClass("mobileScrollIndicator")
      : d(window).scrollTop() < d(document).height() - d(window).height() &&
        d("[data-guide-scroll-indicator]").addClass("mobileScrollIndicator");
  };
  d(window).on("load scroll resize", c);
  window.guideBridge.on("elementNavigationChanged", c);
});
(function (d) {
  window.guideBridge.on("elementNavigationChanged", function (c, f) {
    if ((c = window.guideBridge.resolveNode(f.newText)))
      (f = d("[data-target-guide-content]").text()),
        null != f &&
          0 < f.length &&
          !(c instanceof guidelib.model.RootPanelNode) &&
          d("[data-target-guide-content]").text(c.title ? c.title : "");
  });
})($);
$(function (d) {
  window.guideBridge.connect(function () {
    var c = window.guideBridge.progressive;
    if (c)
      d(document).on(
        "click",
        "button[data-guide-progressive-nav]",
        d.proxy(c.navigateSection, c),
      );
  });
});
(function (d, c, f) {
  var a = c.util.GuideUtil,
    b = a.chartType,
    e = (c.chartUtils = {
      reducerOptions: window.chartReducer.reducerOptions,
      getDisplayFormat: function (a) {
        var b = "";
        if ("date" === a || "date-time" === a)
          b = "date{" + c.i18n.datePatterns.med + "}";
        return b;
      },
      gatherAxisData: function (a) {
        var b,
          c = 0,
          d,
          f;
        new Map();
        var g = {},
          r =
            "fd/ccm/web-channel/components/chart/v1/chart" ===
            a.jsonModel["sling:resourceType"],
          q = {};
        g.isFDMDataSource = "fdm" === a.dataSourceType ? !0 : !1;
        g.chartModel = a;
        q.valueDisplayFormat = "";
        q.labelDisplayFormat = "";
        q.categoryDataType = "";
        q.valueDataType = "";
        var t = a.getOrElse(a._guide().runtime, a.repeatableItem, void 0);
        a.reducerXFunction && "none" !== a.reducerXFunction && !r
          ? ((g.categoryExp = a.yExp),
            (g.valueExp = a.xExp),
            (g.reducerFunction = a.reducerXFunction),
            (q = e._setProp(q, "categoryDataType", a.jsonModel.yDataType)),
            (q = e._setProp(q, "valueDataType", a.jsonModel.xDataType)))
          : ((g.categoryExp = a.xExp),
            (g.valueExp = a.yExp),
            (q = e._setProp(q, "categoryDataType", a.jsonModel.yDataType)),
            (q = e._setProp(q, "valueDataType", a.jsonModel.xDataType)),
            a.reducerYFunction &&
              "none" !== a.reducerYFunction &&
              (g.reducerFunction = a.reducerYFunction));
        if (g.isFDMDataSource) {
          q.valueDisplayFormat = e.getDisplayFormat(q.valueDataType);
          q.labelDisplayFormat = e.getDisplayFormat(q.categoryDataType);
          t = a.repeatableItem;
          g.categoryExp = g.categoryExp
            .substring(t.length + 1, g.categoryExp.length)
            .split("/");
          g.valueExp = g.valueExp
            .substring(t.length + 1, g.valueExp.length)
            .split("/");
          if (
            r &&
            ((q.series = b = []),
            "quadrant" === a.jsonModel.chartType &&
              ((g.isXYReferencePointSet = !1),
              "staticReferencePoint" === a.jsonModel.referencePointType))
          ) {
            if (
              "date" === a.jsonModel.xDataType ||
              "date-time" === a.jsonModel.xDataType
            )
              a.jsonModel.xAxisReferencePoint = new Date(
                a.jsonModel.xAxisReferencePoint,
              ).getTime();
            g.isXYReferencePointSet = !0;
          }
          if ("true" == a.jsonModel.multiSeries) {
            var v = a.jsonModel.seriesRepeatableItem;
            var u = a.jsonModel.seriesName.substring(
              v.length + 1,
              a.jsonModel.seriesName.length,
            );
            c = (d = this._getRepeatableInstances(v, null, a)) ? d.length : c;
            var w = t.substring(v.length, t.length);
            "quadrant" === a.jsonModel.chartType &&
              "fdmReferencePoint" === a.jsonModel.referencePointType &&
              (f = a.jsonModel.seriesReferenceExp.substring(
                v.length + 1,
                a.jsonModel.seriesReferenceExp.length,
              ));
            for (var x = 0; x < c; x++)
              (g.repeatableInstances = this._getRepeatableInstances(
                w,
                d[x],
                a,
              )),
                g.repeatableItemForReferencePoint,
                f &&
                  !g.isXYReferencePointSet &&
                  ((g.repeatableItemForReferencePoint = void 0),
                  this.matchUserInputWithFDM(
                    a.jsonModel.seriesReferenceDataType,
                    d[x][f],
                    a.jsonModel.seriesReferenceValue,
                  ) && (g.repeatableItemForReferencePoint = t)),
                (v = this.buildChartData(g)),
                (v.name = d[x][u]),
                b.push(v);
          } else
            (g.repeatableInstances = this._getRepeatableInstances(t, null, a)),
              (g.repeatableItemForReferencePoint = t),
              (v = this.buildChartData(g)),
              b.push(v);
          r &&
            "quadrant" === a.jsonModel.chartType &&
            "fdmReferencePoint" === a.jsonModel.referencePointType &&
            !g.isXYReferencePointSet &&
            ((a.jsonModel.xAxisReferencePoint = void 0),
            (a.jsonModel.yAxisReferencePoint = void 0));
          g.repeatableInstances = null;
        } else t && (g.repeatableInstances = t.instanceManager.instances);
        g.repeatableInstances &&
          ((a = this.buildChartData(g)),
          (q.label = a.label),
          (q.value = a.value));
        return q;
      },
      buildChartData: function (a) {
        var b = {},
          c = new Map(),
          d;
        b.value = [];
        b.label = [];
        "quadrant" === a.chartModel.jsonModel.chartType &&
          "fdmReferencePoint" === a.chartModel.jsonModel.referencePointType &&
          a.repeatableItemForReferencePoint &&
          (d = a.chartModel.jsonModel.xyReferencePointExp
            .substring(
              a.repeatableItemForReferencePoint.length + 1,
              a.chartModel.jsonModel.xyReferencePointExp.length,
            )
            .split("/"));
        var g = this;
        f.each(a.repeatableInstances, function (e, h) {
          if (a.isFDMDataSource) {
            if (f.isArray(a.categoryExp) && f.isArray(a.valueExp)) {
              var k = e;
              f.each(a.categoryExp, function (a) {
                k = k[a];
              });
              var l = k;
              k = e;
              f.each(a.valueExp, function (a) {
                k = k[a];
              });
              var m = k;
              "quadrant" === a.chartModel.jsonModel.chartType &&
                !a.isXYReferencePointSet &&
                a.repeatableItemForReferencePoint &&
                "fdmReferencePoint" ===
                  a.chartModel.jsonModel.referencePointType &&
                ((k = e),
                f.each(d, function (a) {
                  k = k[a];
                }),
                g.matchUserInputWithFDM(
                  a.chartModel.jsonModel.xyReferencePointDataType,
                  k,
                  a.chartModel.jsonModel.xyReferencePointValue,
                ) &&
                  ((a.chartModel.jsonModel.xAxisReferencePoint =
                    "date" === a.chartModel.jsonModel.xDataType ||
                    "date-time" === a.chartModel.jsonModel.xDataType
                      ? new Date(l).getTime()
                      : l),
                  (a.chartModel.jsonModel.yAxisReferencePoint = m),
                  (a.isXYReferencePointSet = !0)));
            }
          } else (l = e[a.categoryExp].value), (m = e[a.valueExp].value);
          l = f.isUndefined(l) ? "" : l;
          m = f.isUndefined(m) ? "" : m;
          a.reducerFunction
            ? (c.has(l) || c.set(l, []), c.get(l).push(m))
            : (b.label.push(l), b.value.push(m));
        });
        if (a.reducerFunction) {
          var p =
            e.reducerOptions[a.reducerFunction] || window[a.reducerFunction];
          c.forEach(function (a, d) {
            b.label.push(d);
            b.value.push(p(c.get(d)));
          });
        }
        return b;
      },
      matchUserInputWithFDM: function (a, b, c) {
        return (
          (("date-time" == a || "date" == a) &&
            new Date(c).getTime() == new Date(b).getTime()) ||
          ("boolean" == a && JSON.parse(c) == b) ||
          c == b
        );
      },
      constructChart: function (d, e) {
        var f = d.chartType,
          g = d.showLegends,
          k = d.legendPosition,
          p = d.tooltipHtml,
          r = d.innerRadius,
          q = d.lineColor,
          t = d.pointColor,
          v = d.areaColor,
          u = d.data,
          w = [],
          x = {},
          A = {},
          y;
        if (d.reducerXFunction && "none" !== d.reducerXFunction) {
          var z = "y";
          var D = "x";
        } else (z = "x"), (D = "y");
        u.labelDisplayFormat &&
          (u.label = u.label.map(function (a) {
            return c.util.GuideUtil.formatValue(
              a,
              u.labelDisplayFormat,
              u.categoryDataType,
            );
          }));
        u.valueDisplayFormat &&
          (u.value = u.value.map(function (a) {
            return c.util.GuideUtil.formatValue(
              a,
              u.valueDisplayFormat,
              u.valueDataType,
            );
          }));
        x[z] = "label";
        x[D] = "value";
        A[D] = dv.scale.linear().lowerLimit(0);
        try {
          if (a.isChartTooltipApplicable(f) && p && "" !== p) {
            var J = x.x,
              K = x.y;
            w = [
              dv.behavior.rollover().content(function (a) {
                var b = p.replace(/\${x}/g, a.data[J]);
                return (b = b.replace(/\${y}/g, a.data[K]));
              }),
            ];
          }
          A[z] = dv.scale.ordinal();
          var C = dv.chart();
          C.map("fill", "label").map("x", x.x, A.x).map("y", x.y, A.y);
          var F = dv.geom.point().set("fill", t).behaviors(w),
            I = dv.geom.line().set("fill", q),
            H = dv.geom.area().set("alpha", 0.1).set("fill", v),
            G = dv.coord.cartesian().flip(!0);
          t = function () {
            C.set("stroke", q);
            y = [dv.geom.line()];
          };
          var E = function () {
              y = [dv.geom.bar().behaviors(w)];
              C.map("x", "label", A[z]).map("y", "value");
            },
            B = function () {
              E();
              "y" === z && C.coord(G);
            };
          v = function (a) {
            B();
            u[z] = Array.apply(null, Array(u.label.length)).map(function () {
              return 1;
            });
            x[z] = z;
            0 < a && (A[z] = A[z].padding(0.3));
            C.map("x", x[z], A[z]);
            C.coord(dv.coord.polar().flip(!0).innerRadius(a))
              .guide(["x", "y"], "none")
              .position("fill");
          };
          switch (f) {
            case b.LINE:
              t();
              y.push(I);
              break;
            case b.POINT:
              t();
              y.push(F);
              break;
            case b.AREA:
              t();
              y.push(I);
              y.push(H);
              break;
            case b.LINE_POINT:
              t();
              y.push(F);
              y.push(I);
              break;
            case b.BAR:
              E();
              "x" === z && C.coord(G);
              break;
            case b.COLUMN:
              B();
              break;
            case b.PIE:
              v(0);
              break;
            case b.DONUT:
              v(r);
          }
          C.layers(y);
          C.data(u)
            .width(d.width + "%")
            .height(d.height)
            .parent("#" + e.attr("id"))
            .padding({ left: 10, top: 10, right: 10, bottom: 10 });
          a.isChartAxisTitleApplicable(f) &&
            C.guide("x", dv.guide.axis().title(d.xAxisTitle)).guide(
              "y",
              dv.guide.axis().title(d.yAxisTitle),
            );
          a.isChartLegendApplicable(f) &&
            g &&
            C.guide("fill", dv.guide.legend().orientation(k));
        } catch (L) {
          window.guideBridge._guide
            .logger()
            .log("Error while constructing chart " + L);
        }
        return C;
      },
      _setProp: function (a, b, c) {
        a.constructor != {}.constructor || f.isEmpty(c) || (a[b] = c);
        return a;
      },
      _getRepeatableInstances: function (a, b, c) {
        c = c._guide().internal.liveDataUtils;
        b = b ? b : c._liveDataDoc;
        var d = "";
        if (!f.isEmpty(b) && !f.isEmpty(a))
          return (
            f.isEmpty(b.afData)
              ? (a = a.substring(1, a.length))
              : ((b = b.afData), (d = c.constants.BOUND_DATA_XPATH)),
            (repeatableInstances = c._getElement(b, d + a))
          );
      },
    });
})($, guidelib, _);
(function () {
  var d = 0;
  window.requestAnimationFrame ||
    (window.requestAnimationFrame = function (c, f) {
      var a = new Date().getTime(),
        b = Math.max(0, 16 - (a - d));
      f = window.setTimeout(function () {
        c(a + b);
      }, b);
      d = a + b;
      return f;
    });
  window.cancelAnimationFrame ||
    (window.cancelAnimationFrame = function (c) {
      clearTimeout(c);
    });
})();
(function (d, c, f, a) {
  function b(a, c) {
    if (null === a || "undefined" === typeof a) return [];
    "string" == typeof c && (c = c.split("."));
    if (0 == c.length) return [a];
    var d = [];
    if (a instanceof Array) {
      for (var e = 0; e < a.length; e++) d = d.concat(b(a[e], c));
      return d;
    }
    if (!a.hasOwnProperty(c[0])) return [];
    e = c[0];
    c = c.slice(1);
    a = a[e];
    a instanceof Array || (a = [a]);
    for (e = 0; e < a.length; e++) d = d.concat(b(a[e], c));
    return d;
  }
  function e(c) {
    var d = this.callbackData,
      e = [];
    if (!a.isEmpty(c)) {
      var f = JSON.parse(c);
      c = b(f, d.savedValue);
      f = b(f, d.displayedValue);
      for (var g = 0; g < c.length; g++) e.push(c[g] + "\x3d" + f[g]);
    }
    d.field.items = e;
  }
  function g(a) {
    var c = this.callbackData;
    a = JSON.parse(a);
    c.field.value = b(a, c.value);
  }
  function k() {
    d("#loadingPage").addClass("guideServiceLoading");
  }
  function h() {
    d("#loadingPage").removeClass("guideServiceLoading");
  }
  var l = function (a) {
      if (a.responseText) {
        var b = this.inputMapping;
        try {
          var c = JSON.parse(a.responseText);
        } catch (w) {}
        c &&
          c.errors &&
          d.each(c.errors, function (a, c) {
            c &&
              c.bindRef &&
              c.errorMessages &&
              ((a = c.bindRef.slice(1).split("/").join(".")),
              (a = b[a]) && a.markAsInvalid(c.errorMessages.join("\n")));
          });
      }
      this.customErrorHandler && this.customErrorHandler.call(this, a, c);
    },
    m = function (a, b) {
      var c = 0,
        e = a.split(".");
      Array.isArray(b) && (c++, (b = b[0]));
      d.each(e, function (a) {
        b && ((b = b[e[a]]), Array.isArray(b) && (c++, (b = b[0])));
      });
      return c;
    },
    p = function (a, b, c, e) {
      if (0 === c.length) b.value = f.ut.XfaUtil.prototype.getOrElse(e, a, "");
      else {
        var g = c.pop();
        if (b.repeatable) {
          for (; "object" === typeof e && !Array.isArray(e); ) {
            var h = a.indexOf(".");
            e = e[a.substring(0, h)] || "";
            a = a.substring(h + 1);
          }
          h = e.length;
          b.instanceManager.instanceCount < h &&
            b.instanceManager.addInstances({ instanceCount: h });
          Array.isArray(e) &&
            d.each(e, function (d) {
              if (d >= b.instanceManager.instanceCount) return !1;
              b = b.instanceManager.instances[d];
              p(a, b[g], c, e[d]);
            });
        } else p(a, b[g], c, e);
        c.push(g);
      }
    },
    r = function (b, c, e) {
      if (null != b && 0 != b.length) {
        c = this.callbackData;
        try {
          var f = JSON.parse(b);
        } catch (x) {
          f = { response: b };
        }
        d.each(c, function (b, c) {
          var d = m(b, f),
            e = [];
          a: for (; 0 < d; ) {
            if (a.isNull(c.parent)) break a;
            e.push(c.name);
            c = c.parent;
            c.repeatable && d--;
          }
          p(b, c, e, f);
        });
        window.guideBridge._guide.runPendingExpressions();
      }
    },
    q = (c.dataIntegrationUtils = {
      setOptionsFromService: function (a, b, c) {
        this.executeOperation(a, b, c, e);
        return c.field.items;
      },
      setValueFromService: function (a, b, c) {
        this.executeOperation(a, b, c, g);
        return c.field.items;
      },
      executeOperation: function (a, b, e, f, g, m) {
        f = f || r;
        var p = {};
        d.each(b, function (a, b) {
          a = a.split(".");
          var c = p,
            d;
          for (d = 0; d < a.length - 1; d++)
            (c[a[d]] = c[a[d]] || {}), (c = c[a[d]]);
          c[a[d]] = "object" === typeof b ? b.value : b;
        });
        var q = a.wsdlEndPoint;
        var t = a.operationName;
        var u = JSON.stringify(p);
        var v = a.port;
        var x = a.soapActionURI;
        var w = a.namespace;
        var A = a.inputRoot;
        var H = JSON.stringify(a.inputAttr);
        var G = a.serviceEndPoint;
        m ||
          console.log(
            "No model parameter passed to this API, this may fail during server side re-validation. Please correct your scripts.",
          );
        m = m && m._guide && m._guide();
        var E = (m ? m.jcrPath : c.__runtime__.guide.jcrPath) + ".af.dermis";
        E =
          null != guideBridge
            ? guideBridge._getUrl(E)
            : Granite.HTTP.externalize(E);
        var B = {};
        a.wsdlEndPoint
          ? ((B.functionToExecute = "invokeWsdlOperation"),
            (B.wsdlEndPoint = q),
            (B.operationName = t),
            (B.input = u),
            v && (B.port = v),
            x && (B.soapActionURI = x),
            w && (B.namespace = w),
            A && (B.inputRoot = A),
            H && (B.inputAttr = H),
            G && (B.serviceEndPoint = G))
          : a.formDataModelId &&
            ((B.functionToExecute = "invokeFDMOperation"),
            (B.formDataModelId = a.formDataModelId),
            (B.input = JSON.stringify(p)),
            (B.operationName = a.operationName),
            (B.runValidation = a.runValidation));
        B.guideNodePath = m
          ? m._currentContext.contextNode.jcrPath
          : c.__runtime__.guide._currentContext.contextNode.jcrPath;
        d.ajax({
          type: "POST",
          url: E,
          data: B,
          beforeSend: k,
          complete: h,
          dataType: "text",
          success: f,
          error: l,
          context: { callbackData: e, inputMapping: b, customErrorHandler: g },
        });
      },
    });
  c.wsdlUtils = {
    setOptionsFromWSDL: function (a, b, c) {
      q.executeOperation(a, b, c, e);
      return c.field.items;
    },
    setValueFromWSDL: function (a, b, c) {
      q.executeOperation(a, b, c, g);
      return c.field.items;
    },
    executeWSDLFunction: function (a, b, c) {
      q.executeOperation(a, b, c);
    },
  };
})($, guidelib, xfalib, _);
(function (d, c, f) {
  f.model.GuideDirtyMarkerAndVisitor = xfalib.ut.EventClass.extend({
    initialize: function () {
      this.visitMap = {};
    },
    _flattenDirtyPanelToList: function () {
      var a = this.flattenDirtyPanelMapToCSV();
      if (0 < a.length) return a.split(",");
    },
    flattenDirtyPanelMapToCSV: function () {
      var a = "";
      c.each(
        c.keys(this.visitMap),
        function (b, c) {
          0 === this.visitMap[b] && (a += b + ",");
        },
        this,
      );
      0 < a.length && (a = a.substring(0, a.length - 1));
      return a;
    },
    _findAndMarkDirty: function (a, b) {
      var d = c.keys(a);
      c.each(b, function (b, c) {
        c = 0;
        var e = null,
          g;
        for (g = 0; g < d.length; ++g) {
          var k = f.util.GuideUtil.commonPrefixLen(b, d[g]);
          c < k && ((c = k), (e = d[g]));
        }
        0 < c && (a[e] = 0);
      });
    },
    _iterateMapAndReturnKeyOnValueFound: function (a, b) {
      var d;
      c.each(c.keys(a), function (c, e) {
        a[c] === b && (d = c);
      });
      return d;
    },
    _updateCountOrInsert: function (a, b) {
      c.isUndefined(a[b]) ? (a[b] = 0) : a[b]++;
      return a;
    },
  });
})($, _, window.guidelib);
(function (d) {
  d(function () {
    d(window).trigger("resize");
  });
})($);
(function (d, c) {
  window.FD = window.FD || {};
  FD.FP = FD.FP || {};
  FD.FP.AF = {
    _handleDraftSave: function (f) {
      var a = f.isAutoSaveTriggered,
        b = f.metadataToSave,
        e = f.enableAnonymous,
        g =
          window.guideBridge.getGuideContext().data[
            window.guideBridge.GUIDE_PATH
          ],
        k = window.guideBridge.customContextProperty("draftID"),
        h = xfalib.ut.Class.prototype.getOrElse(
          window.guidelib.runtime.guideContext.customPropertyMap,
          {},
        ),
        l,
        m,
        p = {};
      d("#draftID").attr("value", k);
      var r = d("#saveButtonPath").data("savebuttonpath") || g,
        q = window.guideBridge._getUrl(r);
      null == h && (h = {});
      window.guideBridge.getData({
        success: function (l) {
          window.guideBridge.trigger(
            "saveStarted",
            window.guidelib.event.GuideModelEvent.createEvent("saveStarted"),
          );
          m = l.data;
          l = guideBridge
            .resolveNode("guide[0].guide1[0]")
            .getAttribute("schemaType");
          var r = "XML";
          c.isUndefined(l) ||
            (r = "jsonschema" == l || "formdatamodel" == l ? "JSON" : "XML");
          p = window.guideBridge.getFileAttachmentMap();
          l = q + ".fp.draft.json?func\x3dsaveDraft";
          r = {
            formPath: g,
            formData: m,
            draftID: k,
            formType: "af",
            _charset_: "UTF-8",
            enableAnonymousSave: e,
            dataType: r,
            fileAttachmentMap: JSON.stringify(p),
            customContextProperty: JSON.stringify(h),
          };
          if (b) for (var t in b) b.hasOwnProperty(t) && (r[t] = b[t]);
          var w = [];
          for (t in r) "formData" !== t && w.push(t);
          r.fpAllowedMetadata = w.toString();
          d.ajax({
            type: "POST",
            url: l,
            async: !0,
            cache: !1,
            mimeType: "multipart/form-data",
            data: r,
            success: function (b) {
              a ||
                alert(
                  guidelib.util.GuideUtil.getLocalizedMessage(
                    "",
                    guidelib.i18n.strings.draftSavedSuccessMessage,
                  ),
                );
              window.guideBridge.trigger(
                "saveCompleted",
                window.guidelib.event.GuideModelEvent.createEvent(
                  "saveCompleted",
                ),
              );
              c.isUndefined(f.success) || f.success.call(f.context || this);
            },
            error: function (b) {
              a ||
                ("503" == b.status
                  ? alert(
                      guidelib.util.GuideUtil.getLocalizedMessage(
                        "",
                        guidelib.i18n.LogMessages["AEM-AF-901-008"],
                      ),
                    )
                  : alert(
                      guidelib.util.GuideUtil.getLocalizedMessage(
                        "",
                        guidelib.i18n.LogMessages["AEM-AF-901-009"],
                      ),
                    ));
              c.isUndefined(f.error) || f.error.call(f.context || this);
            },
          });
        },
        error: function (a) {
          l = a;
          if (null != l)
            return (
              console.log(
                guidelib.util.GuideUtil.getLocalizedMessage(
                  "",
                  guidelib.i18n.LogMessages["AEM-AF-901-009"],
                ),
              ),
              0
            );
        },
        fileUploadPath: q + ".fp.attach.jsp/" + k,
      });
    },
    _handleDraftSaveWrapper: function (c) {
      "undefined" ===
        typeof window.guideBridge.customContextProperty("draftID") ||
      null == window.guideBridge.customContextProperty("draftID")
        ? d
            .ajax({
              method: "GET",
              url: Granite.HTTP.externalize(
                "/content/forms/portal/draftandsubmission.fp.draft.json?func\x3dgetUid",
              ),
              cache: !1,
              dataType: "json",
            })
            .done(function (a) {
              window.guideBridge.customContextProperty("draftID", a.id + "_af");
              FD.FP.AF._handleDraftSave(c);
            })
            .fail(function (a) {
              alert(
                guidelib.util.GuideUtil.getLocalizedMessage(
                  "",
                  guidelib.i18n.LogMessages["AEM-AF-901-009"],
                ),
              );
              return 0;
            })
        : FD.FP.AF._handleDraftSave(c);
    },
  };
  handleDraftSave = function (d, a) {
    var b = {},
      e = !1,
      f;
    if (d) {
      f =
        (f = d.getAttribute("metadataselector")) && "local" === f
          ? d.getAttribute("fpmetadata")
          : (f = window.guideBridge.getGlobalMetaInfo()) &&
              f.hasOwnProperty("metadata")
            ? f.metadata
            : null;
      if (f)
        if ("object" === typeof f)
          for (var k in f) {
            var h = JSON.parse(f[k]);
            b[h.key] = window.guideBridge._guide._compileExpression(h.value)();
          }
        else
          "string" === typeof f &&
            ((h = JSON.parse(f)),
            (b[h.key] = window.guideBridge._guide._compileExpression(
              h.value,
            )()));
      d.getAttribute("enableAnonymous") &&
        (e = d.getAttribute("enableAnonymous"));
    }
    c.isUndefined(a) && (a = {});
    a.metadataToSave = b;
    a.enableAnonymous = e;
    a.isAutoSaveTriggered = !1;
    window.FD.FP.AF._handleDraftSaveWrapper(a);
  };
})(jQuery, _);
(function () {
  window.FD = window.FD || {};
  FD.FP = FD.FP || {};
  FD.FP.SaveConfigChangeListener = function (d) {
    var c = d instanceof CQ.Dialog ? d : d.findParentByType("dialog");
    d = c.getField("./clickExp");
    if ((c = c.getField("./hasClickExpChanged"))) {
      var f = c.getValue(),
        a = d.getValue();
      (f && "true" == f) ||
        "handleDraftSave()" !== a ||
        (d.setValue("handleDraftSave(this)"), c.setValue("true"));
    }
  };
})();
