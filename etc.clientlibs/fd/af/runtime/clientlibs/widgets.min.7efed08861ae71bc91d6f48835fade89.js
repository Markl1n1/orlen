/*
 jQuery UI - v1.13.1 - 2022-01-20
 http://jqueryui.com
 Includes: core.js, widget.js, button.js, spinner.js
 Copyright jQuery Foundation and other contributors; Licensed MIT  jQuery UI Keycode 1.13.1
 http://jqueryui.com

 Copyright jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
 jQuery UI Button 1.13.1
 http://jqueryui.com

 Copyright jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
 jQuery UI Spinner 1.13.1
 http://jqueryui.com

 Copyright jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
(function (b) {
  b.widget("xfaWidget.afcaptcha", b.xfaWidget.abstractWidget, {
    _widgetName: "GuideCaptcha",
    captchaImgPath: "",
    captchaStartTime: 0,
    render: function () {
      var e = this;
      this.element.append(
        '\x3cdiv class\x3d"guide-af-captcha"\x3e\x3c/div\x3e'
      );
      var a = b("div.guide-af-captcha");
      this.captchaImgPath = Granite.HTTP.externalize(
        this.options.captchaConfigData["jcr:path"] + ".captcha.png"
      );
      a.html(
        '\x3cinput type\x3d"hidden" id\x3d"afcaptchakey" value\x3d""/\x3e\x3cdiv\x3e\x3cdiv class\x3d"afcaptcha-img"\x3e\x3cimg id\x3d"afcaptchaimg" src\x3d"' +
          this.captchaImgPath +
          '?id\x3d" alt\x3d""\x3e\x3c/div\x3e\x3cdiv class\x3d"afcaptcha-input"\x3e\x3cinput type\x3d"text" id\x3d"afcaptchaToken"/\x3e\x3c/div\x3e\x3cdiv class\x3d"afcaptcha-refresh"\x3e\x3cinput type\x3d"button" class\x3d"afcaptcha-refresh-btn" value\x3d"Reload"\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"timer-bar-holder"\x3e\x3cdiv id\x3d"afcaptchatimer" class\x3d"afcaptchatimer" style\x3d"width: 63px;"\x3e\x3c/div\x3e\x3c/div\x3e'
      );
      b(".afcaptcha-refresh-btn").click(function () {
        c();
      });
      b("#afcaptchaToken").focusout(function () {
        e.tokenChange();
      });
      var c = function () {
          var a = ("" + Math.random()).substring(3, 8);
          var c = document.getElementById("afcaptchaimg");
          var b = document.getElementById("afcaptchakey");
          c.src = Granite.HTTP.externalize(e.captchaImgPath + "?id\x3d" + a);
          b.value = a;
          e.captchaStartTime = new Date().getTime();
        },
        d = function () {
          var a = new Date().getTime();
          6e4 < a - e.captchaStartTime && c();
          var b = document.getElementById("afcaptchatimer");
          b &&
            ((b.innerHTML =
              '\x3cdiv class\x3d"afcaptchatimer-bar" style\x3d"width:' +
              Math.floor(((6e4 - (a - e.captchaStartTime)) / 6e4) * 64) +
              'px;"\x3e\x3c/div\x3e'),
            setTimeout(d, 500));
        };
      d();
      return b("div.guide-af-captcha");
    },
    tokenChange: function () {
      var e = null,
        a = b("#afcaptchaToken").val();
      _.isEmpty(a) ||
        (e = { captchaToken: a, captchaKey: b("#afcaptchakey").val() });
      this.element.trigger({ type: "tokenChange.captcha", token: e });
    },
  });
})($);
(function (b) {
  b.widget("xfaWidget.recaptcha", b.xfaWidget.abstractWidget, {
    _widgetName: "Recaptcha",
    render: function () {
      guidelib.util.RecaptchaUtil.renderRecaptcha(
        this.element,
        this.options.captchaConfigData
      );
      return b("div.g-recaptcha");
    },
  });
})($);
(function (b, e) {
  var a = xfalib.ut.XfaUtil.prototype;
  b.widget("xfaWidget.dateInputWidget", b.xfaWidget.abstractWidget, {
    _widgetName: "dateInputWidget",
    _getFieldOrder: function (a) {
      return ["M", "D", "Y"]
        .map(function (c) {
          return { value: c, index: a.indexOf(c) };
        })
        .sort(function (a, c) {
          return a.index - c.index;
        })
        .map(function (a) {
          return a.value;
        });
    },
    _getCombFieldOptions: function (c, b, e) {
      return {
        commitEvent: a.XFA_EXIT_EVENT,
        zero: this.options.zero,
        dataType: "integer",
        placeholder: c,
        combCells: b || 2,
        screenReaderText: e,
      };
    },
    _getCombFieldControl: function (a) {
      return this.combFieldControls
        ? this.combFieldControls[this.combFieldOrder[a]]
        : null;
    },
    _initializeCombFields: function () {
      var c = {
          D: this._getCombFieldOptions(
            this.options.placeholderDay,
            null,
            this.options.labelDay
          ),
          M: this._getCombFieldOptions(
            this.options.placeholderMonth,
            null,
            this.options.labelMonth
          ),
          Y: this._getCombFieldOptions(
            this.options.placeholderYear,
            4,
            this.options.labelYear
          ),
        },
        d = this;
      this.separator = this.options.dateFormat.match(
        /^date\{.*([^mdy]).*\}$/i
      )[1];
      this.combFieldControls = {
        D: {
          cssClass: "comb-form-group-day",
          regex: /^(?:0?[1-9]|1[0-9]|2[0-9]|3[01])$/,
          placeholder: this.options.placeholderDay,
          label: this.options.labelDay,
        },
        M: {
          cssClass: "comb-form-group-month",
          regex: /^(?:0?[1-9]|1[012])$/,
          placeholder: this.options.placeholderMonth,
          label: this.options.labelMonth,
        },
        Y: {
          cssClass: "comb-form-group-year",
          regex: /^[0-9]{4}$/,
          placeholder: this.options.placeholderYear,
          label: this.options.labelYear,
        },
      };
      this.element.find("[data-dateInput-wrapper]").each(function (n) {
        b(this).addClass("comb-datefield");
        var l = b(this).find("input"),
          q = d.combFieldOrder[n],
          f = d._getCombFieldControl(n);
        n = f.cssClass + new Date().getTime();
        if (!d.options.hideLabels) {
          var t = b(this).children("[data-dateInput-label]");
          0 == t.length &&
            ((t = b(document.createElement("label")).attr(
              "data-dateInput-label"
            )),
            l.before(t));
          t.text(f.label).attr("for", n).addClass("showTitle");
          l.attr("id", n);
        }
        l.addClass(f.cssClass);
        e.isUndefined(b.xfaWidget.numericInput) ||
          ((f.numericInputWidget = l
            .numericInput(c[q])
            .data("xfaWidget-numericInput")),
          l.css("position", "relative"),
          (f.value = null),
          b(this)
            .on(a.XFA_EXIT_EVENT, function (c) {
              d._isCombFieldValid(q)
                ? d._isValidDate(q)
                  ? ((d.options.value = d.getCommitValue()),
                    d.element.trigger(a.XFA_CHANGE_EVENT),
                    d.element.trigger(a.XFA_EXIT_EVENT),
                    (f.value = f.numericInputWidget.option("value")),
                    f.numericInputWidget.option("displayValue", f.value))
                  : ((f.value = f.numericInputWidget.option("value")),
                    f.numericInputWidget.option("displayValue", f.value),
                    c.stopPropagation())
                : f.numericInputWidget.option("value", f.value);
            })
            .on(a.XFA_CHANGE_EVENT, function (a) {
              a.stopPropagation();
            }));
      });
    },
    _getConcatenatedValue: function () {
      var a = this;
      return this.combFieldOrder
        .reduce(function (c, b) {
          b = a.combFieldControls[b].numericInputWidget.option("value");
          return e.isEmpty(b) ? c : c + a.separator + b;
        }, "")
        .substr(1);
    },
    _isCombFieldValid: function (a) {
      a = this.combFieldControls[a];
      var c = a.numericInputWidget.option("value");
      return e.isEmpty(c) || a.regex.test(c);
    },
    _isValidDate: function () {
      var a = this._getConcatenatedValue();
      if (0 == a.length) return !0;
      a = this._parseDate(a);
      return !e.isUndefined(a);
    },
    _parseDate: function (a) {
      var c;
      if (e.isEmpty(a)) return "";
      try {
        return (c = xfalib.ut.PictureFmt.parseDate(a, this.options.dateFormat));
      } catch (n) {
        window.guideBridge._guide.logger().log("Error while parsing date " + n);
      }
    },
    render: function () {
      this.combFieldOrder = this._getFieldOrder(this.options.dateFormat);
      this._initializeCombFields();
      return this.element.find("input").eq(0);
    },
    getCommitValue: function () {
      var a = this._parseDate(this._getConcatenatedValue());
      return e.isUndefined(a) ? "" : a;
    },
    getOptionsMap: function () {
      var a = b.xfaWidget.abstractWidget.prototype.getOptionsMap.apply(
        this,
        arguments
      );
      return b.extend({}, a, {
        value: function (a) {
          if (e.isEmpty(a))
            e.each(this.combFieldControls, function (a) {
              a.value = "";
              a.numericInputWidget.option("value", "");
              a.numericInputWidget.option("displayValue", "");
            });
          else {
            var b = this,
              c = a.match(/[^0-9]/i),
              d = a.split(c);
            ["Y", "M", "D"].forEach(function (a, c) {
              a = b.combFieldControls[a];
              a.value = d[c];
              a.numericInputWidget.option("value", d[c]);
              a.numericInputWidget.option("displayValue", d[c]);
            });
          }
        },
        screenReaderText: function (a) {
          a && this.element.attr("aria-label", a);
        },
        access: function (a) {
          e.each(this.combFieldControls, function (c) {
            c.value = "";
            c.numericInputWidget.option("access", a);
          });
        },
        mandatory: function (a) {
          a
            ? this.element.find("input").attr("aria-required", !0)
            : this.element.find("input").removeAttr("aria-required");
        },
      });
    },
    getEventMap: function () {
      return {};
    },
  });
})($, _);
(function (b) {
  b.widget("xfaWidget.imageCheckRadioButtonWidget", b.xfaWidget.XfaCheckBox, {
    _widgetName: "imageCheckRadioButtonWidget",
    _getItemSkeleton: function (b) {
      return (
        '\x3cdiv class\x3d"' +
        ("radio" === b ? "guideRadioButtonItem" : "guideCheckBoxItem") +
        ' {NAME_PLACEHOLDER} {CSS_PLACEHOLDER}" style\x3d"background-image: url({LABEL_PLACEHOLDER}); background-repeat: no-repeat; background-size: contain;" data-original-title\x3d"" title\x3d""\x3e\n            \x3cdiv class\x3d"guideFieldWidget imageCheckRadioButtonWidget" data-id\x3d"{COUNTER_PLACEHOLDER}" data-af-widgetname\x3d"imageCheckRadioButtonWidget" data-original-title\x3d"" title\x3d""\x3e\n                \x3cinput type\x3d"' +
        b +
        '" id\x3d"{TEMPLATE_ID_PLACEHOLDER}_{COUNTER_PLACEHOLDER}_widget" name\x3d"{TEMPLATE_ID_PLACEHOLDER}_jqName" value\x3d"-100" tabindex\x3d"0" aria-label\x3d"{LABEL_PLACEHOLDER}"  aria-selected\x3d"false" placeholder\x3d"" style\x3d"position: relative;"\x3e\n            \x3c/div\x3e\n            \x3cdiv class\x3d"guideWidgetLabel right"\x3e\n            \x3c/div\x3e\n        \x3c/div\x3e'
      );
    },
    getOptionsMap: function () {
      var e = b.xfaWidget.XfaCheckBox.prototype.getOptionsMap.apply(
        this,
        arguments
      );
      return b.extend({}, e, {
        displayValue: function (a) {
          e.displayValue.apply(this, arguments);
          var c = this.$userControl.parents(
            ".guideRadioButtonItem, .guideCheckBoxItem"
          );
          c && c.toggleClass("imageCheckButtonChecked", this.checkedState);
          "disabled" === this.$userControl.attr("disabled") &&
            c.addClass("imageCheckButtonDisabled");
        },
      });
    },
    renderGroupItem: function (b) {
      var a = this._getItemSkeleton(b.widgetType),
        c = guidelib.util.GuideUtil;
      a = c.replaceAll(a, "{NAME_PLACEHOLDER}", b.modelName);
      a = c.replaceAll(a, "{TEMPLATE_ID_PLACEHOLDER}", b.modelTemplateId);
      a = c.replaceAll(a, "{CSS_PLACEHOLDER}", b.cssValue);
      a = c.replaceAll(a, "{COUNTER_PLACEHOLDER}", b.itemIndex);
      return (a = c.replaceAll(a, "{LABEL_PLACEHOLDER}", b.displayValue));
    },
  });
})($);
(function (b) {
  "function" === typeof define && define.amd
    ? define(["jquery"], b)
    : b(jQuery);
})(function (b) {
  function e(a) {
    return function () {
      var b = this.element.val();
      a.apply(this, arguments);
      this._refresh();
      b !== this.element.val() && this._trigger("change");
    };
  }
  b.ui = b.ui || {};
  b.ui.version = "1.13.1";
  b.ui.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38,
  };
  b.ui.safeActiveElement = function (a) {
    try {
      var b = a.activeElement;
    } catch (d) {
      b = a.body;
    }
    b || (b = a.body);
    b.nodeName || (b = a.body);
    return b;
  };
  b.widget("ui.button", {
    version: "1.13.1",
    defaultElement: "\x3cbutton\x3e",
    options: {
      classes: { "ui-button": "ui-corner-all" },
      disabled: null,
      icon: null,
      iconPosition: "beginning",
      label: null,
      showLabel: !0,
    },
    _getCreateOptions: function () {
      var a = this._super() || {};
      this.isInput = this.element.is("input");
      var b = this.element[0].disabled;
      null != b && (a.disabled = b);
      if (
        (this.originalLabel = this.isInput
          ? this.element.val()
          : this.element.html())
      )
        a.label = this.originalLabel;
      return a;
    },
    _create: function () {
      !this.option.showLabel & !this.options.icon &&
        (this.options.showLabel = !0);
      null == this.options.disabled &&
        (this.options.disabled = this.element[0].disabled || !1);
      this.hasTitle = !!this.element.attr("title");
      this.options.label &&
        this.options.label !== this.originalLabel &&
        (this.isInput
          ? this.element.val(this.options.label)
          : this.element.html(this.options.label));
      this._addClass("ui-button", "ui-widget");
      this._setOption("disabled", this.options.disabled);
      this._enhance();
      this.element.is("a") &&
        this._on({
          keyup: function (a) {
            a.keyCode === b.ui.keyCode.SPACE &&
              (a.preventDefault(),
              this.element[0].click
                ? this.element[0].click()
                : this.element.trigger("click"));
          },
        });
    },
    _enhance: function () {
      this.element.is("button") || this.element.attr("role", "button");
      this.options.icon &&
        (this._updateIcon("icon", this.options.icon), this._updateTooltip());
    },
    _updateTooltip: function () {
      this.title = this.element.attr("title");
      this.options.showLabel ||
        this.title ||
        this.element.attr("title", this.options.label);
    },
    _updateIcon: function (a, c) {
      var d = (a = "iconPosition" !== a) ? this.options.iconPosition : c,
        e = "top" === d || "bottom" === d;
      this.icon
        ? a && this._removeClass(this.icon, null, this.options.icon)
        : ((this.icon = b("\x3cspan\x3e")),
          this._addClass(this.icon, "ui-button-icon", "ui-icon"),
          this.options.showLabel || this._addClass("ui-button-icon-only"));
      a && this._addClass(this.icon, null, c);
      this._attachIcon(d);
      e
        ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
          this.iconSpace && this.iconSpace.remove())
        : (this.iconSpace ||
            ((this.iconSpace = b("\x3cspan\x3e \x3c/span\x3e")),
            this._addClass(this.iconSpace, "ui-button-icon-space")),
          this._removeClass(this.icon, null, "ui-wiget-icon-block"),
          this._attachIconSpace(d));
    },
    _destroy: function () {
      this.element.removeAttr("role");
      this.icon && this.icon.remove();
      this.iconSpace && this.iconSpace.remove();
      this.hasTitle || this.element.removeAttr("title");
    },
    _attachIconSpace: function (a) {
      this.icon[/^(?:end|bottom)/.test(a) ? "before" : "after"](this.iconSpace);
    },
    _attachIcon: function (a) {
      this.element[/^(?:end|bottom)/.test(a) ? "append" : "prepend"](this.icon);
    },
    _setOptions: function (a) {
      var b = void 0 === a.icon ? this.options.icon : a.icon;
      (void 0 === a.showLabel ? this.options.showLabel : a.showLabel) ||
        b ||
        (a.showLabel = !0);
      this._super(a);
    },
    _setOption: function (a, b) {
      "icon" === a &&
        (b
          ? this._updateIcon(a, b)
          : this.icon &&
            (this.icon.remove(), this.iconSpace && this.iconSpace.remove()));
      "iconPosition" === a && this._updateIcon(a, b);
      "showLabel" === a &&
        (this._toggleClass("ui-button-icon-only", null, !b),
        this._updateTooltip());
      "label" === a &&
        (this.isInput
          ? this.element.val(b)
          : (this.element.html(b),
            this.icon &&
              (this._attachIcon(this.options.iconPosition),
              this._attachIconSpace(this.options.iconPosition))));
      this._super(a, b);
      "disabled" === a &&
        (this._toggleClass(null, "ui-state-disabled", b),
        (this.element[0].disabled = b) && this.element.trigger("blur"));
    },
    refresh: function () {
      var a = this.element.is("input, button")
        ? this.element[0].disabled
        : this.element.hasClass("ui-button-disabled");
      a !== this.options.disabled && this._setOptions({ disabled: a });
      this._updateTooltip();
    },
  });
  !1 !== b.uiBackCompat &&
    (b.widget("ui.button", b.ui.button, {
      options: { text: !0, icons: { primary: null, secondary: null } },
      _create: function () {
        this.options.showLabel &&
          !this.options.text &&
          (this.options.showLabel = this.options.text);
        !this.options.showLabel &&
          this.options.text &&
          (this.options.text = this.options.showLabel);
        this.options.icon ||
        (!this.options.icons.primary && !this.options.icons.secondary)
          ? this.options.icon &&
            (this.options.icons.primary = this.options.icon)
          : this.options.icons.primary
          ? (this.options.icon = this.options.icons.primary)
          : ((this.options.icon = this.options.icons.secondary),
            (this.options.iconPosition = "end"));
        this._super();
      },
      _setOption: function (a, b) {
        "text" === a
          ? this._super("showLabel", b)
          : ("showLabel" === a && (this.options.text = b),
            "icon" === a && (this.options.icons.primary = b),
            "icons" === a &&
              (b.primary
                ? (this._super("icon", b.primary),
                  this._super("iconPosition", "beginning"))
                : b.secondary &&
                  (this._super("icon", b.secondary),
                  this._super("iconPosition", "end"))),
            this._superApply(arguments));
      },
    }),
    (b.fn.button = (function (a) {
      return function (c) {
        var d = "string" === typeof c,
          e = Array.prototype.slice.call(arguments, 1),
          l = this;
        d
          ? this.length || "instance" !== c
            ? this.each(function () {
                var a = b(this).attr("type");
                var d = b.data(
                  this,
                  "ui-" +
                    ("checkbox" !== a && "radio" !== a
                      ? "button"
                      : "checkboxradio")
                );
                if ("instance" === c) return (l = d), !1;
                if (!d)
                  return b.error(
                    "cannot call methods on button prior to initialization; attempted to call method '" +
                      c +
                      "'"
                  );
                if ("function" !== typeof d[c] || "_" === c.charAt(0))
                  return b.error(
                    "no such method '" + c + "' for button widget instance"
                  );
                a = d[c].apply(d, e);
                if (a !== d && void 0 !== a)
                  return (l = a && a.jquery ? l.pushStack(a.get()) : a), !1;
              })
            : (l = void 0)
          : (e.length && (c = b.widget.extend.apply(null, [c].concat(e))),
            this.each(function () {
              var d = b(this).attr("type");
              d =
                "checkbox" !== d && "radio" !== d ? "button" : "checkboxradio";
              var e = b.data(this, "ui-" + d);
              e
                ? (e.option(c || {}), e._init && e._init())
                : "button" === d
                ? a.call(b(this), c)
                : b(this).checkboxradio(b.extend({ icon: !1 }, c));
            }));
        return l;
      };
    })(b.fn.button)),
    (b.fn.buttonset = function () {
      b.ui.controlgroup || b.error("Controlgroup widget missing");
      if ("option" === arguments[0] && "items" === arguments[1] && arguments[2])
        return this.controlgroup.apply(this, [
          arguments[0],
          "items.button",
          arguments[2],
        ]);
      if ("option" === arguments[0] && "items" === arguments[1])
        return this.controlgroup.apply(this, [arguments[0], "items.button"]);
      "object" === typeof arguments[0] &&
        arguments[0].items &&
        (arguments[0].items = { button: arguments[0].items });
      return this.controlgroup.apply(this, arguments);
    }));
  b.widget("ui.spinner", {
    version: "1.13.1",
    defaultElement: "\x3cinput\x3e",
    widgetEventPrefix: "spin",
    options: {
      classes: {
        "ui-spinner": "ui-corner-all",
        "ui-spinner-down": "ui-corner-br",
        "ui-spinner-up": "ui-corner-tr",
      },
      culture: null,
      icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
      incremental: !0,
      max: null,
      min: null,
      numberFormat: null,
      page: 10,
      step: 1,
      change: null,
      spin: null,
      start: null,
      stop: null,
    },
    _create: function () {
      this._setOption("max", this.options.max);
      this._setOption("min", this.options.min);
      this._setOption("step", this.options.step);
      "" !== this.value() && this._value(this.element.val(), !0);
      this._draw();
      this._on(this._events);
      this._refresh();
      this._on(this.window, {
        beforeunload: function () {
          this.element.removeAttr("autocomplete");
        },
      });
    },
    _getCreateOptions: function () {
      var a = this._super(),
        c = this.element;
      b.each(["min", "max", "step"], function (b, e) {
        b = c.attr(e);
        null != b && b.length && (a[e] = b);
      });
      return a;
    },
    _events: {
      keydown: function (a) {
        this._start(a) && this._keydown(a) && a.preventDefault();
      },
      keyup: "_stop",
      focus: function () {
        this.previous = this.element.val();
      },
      blur: function (a) {
        this.cancelBlur
          ? delete this.cancelBlur
          : (this._stop(),
            this._refresh(),
            this.previous !== this.element.val() && this._trigger("change", a));
      },
      mousewheel: function (a, c) {
        var d = b.ui.safeActiveElement(this.document[0]);
        if (this.element[0] === d && c) {
          if (!this.spinning && !this._start(a)) return !1;
          this._spin((0 < c ? 1 : -1) * this.options.step, a);
          clearTimeout(this.mousewheelTimer);
          this.mousewheelTimer = this._delay(function () {
            this.spinning && this._stop(a);
          }, 100);
          a.preventDefault();
        }
      },
      "mousedown .ui-spinner-button": function (a) {
        function c() {
          this.element[0] !== b.ui.safeActiveElement(this.document[0]) &&
            (this.element.trigger("focus"),
            (this.previous = d),
            this._delay(function () {
              this.previous = d;
            }));
        }
        var d =
          this.element[0] === b.ui.safeActiveElement(this.document[0])
            ? this.previous
            : this.element.val();
        a.preventDefault();
        c.call(this);
        this.cancelBlur = !0;
        this._delay(function () {
          delete this.cancelBlur;
          c.call(this);
        });
        !1 !== this._start(a) &&
          this._repeat(
            null,
            b(a.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
            a
          );
      },
      "mouseup .ui-spinner-button": "_stop",
      "mouseenter .ui-spinner-button": function (a) {
        if (b(a.currentTarget).hasClass("ui-state-active")) {
          if (!1 === this._start(a)) return !1;
          this._repeat(
            null,
            b(a.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
            a
          );
        }
      },
      "mouseleave .ui-spinner-button": "_stop",
    },
    _enhance: function () {
      this.uiSpinner = this.element
        .attr("autocomplete", "off")
        .wrap("\x3cspan\x3e")
        .parent()
        .append("\x3ca\x3e\x3c/a\x3e\x3ca\x3e\x3c/a\x3e");
    },
    _draw: function () {
      this._enhance();
      this._addClass(
        this.uiSpinner,
        "ui-spinner",
        "ui-widget ui-widget-content"
      );
      this._addClass("ui-spinner-input");
      this.element.attr("role", "spinbutton");
      this.buttons = this.uiSpinner
        .children("a")
        .attr("tabIndex", -1)
        .attr("aria-hidden", !0)
        .button({ classes: { "ui-button": "" } });
      this._removeClass(this.buttons, "ui-corner-all");
      this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up");
      this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down");
      this.buttons
        .first()
        .button({ icon: this.options.icons.up, showLabel: !1 });
      this.buttons
        .last()
        .button({ icon: this.options.icons.down, showLabel: !1 });
      this.buttons.height() > Math.ceil(0.5 * this.uiSpinner.height()) &&
        0 < this.uiSpinner.height() &&
        this.uiSpinner.height(this.uiSpinner.height());
    },
    _keydown: function (a) {
      var c = this.options,
        d = b.ui.keyCode;
      switch (a.keyCode) {
        case d.UP:
          return this._repeat(null, 1, a), !0;
        case d.DOWN:
          return this._repeat(null, -1, a), !0;
        case d.PAGE_UP:
          return this._repeat(null, c.page, a), !0;
        case d.PAGE_DOWN:
          return this._repeat(null, -c.page, a), !0;
      }
      return !1;
    },
    _start: function (a) {
      if (!this.spinning && !1 === this._trigger("start", a)) return !1;
      this.counter || (this.counter = 1);
      return (this.spinning = !0);
    },
    _repeat: function (a, b, d) {
      a = a || 500;
      clearTimeout(this.timer);
      this.timer = this._delay(function () {
        this._repeat(40, b, d);
      }, a);
      this._spin(b * this.options.step, d);
    },
    _spin: function (a, b) {
      var c = this.value() || 0;
      this.counter || (this.counter = 1);
      c = this._adjustValue(c + a * this._increment(this.counter));
      (this.spinning && !1 === this._trigger("spin", b, { value: c })) ||
        (this._value(c), this.counter++);
    },
    _increment: function (a) {
      var b = this.options.incremental;
      return b
        ? "function" === typeof b
          ? b(a)
          : Math.floor((a * a * a) / 5e4 - (a * a) / 500 + (17 * a) / 200 + 1)
        : 1;
    },
    _precision: function () {
      var a = this._precisionOf(this.options.step);
      null !== this.options.min &&
        (a = Math.max(a, this._precisionOf(this.options.min)));
      return a;
    },
    _precisionOf: function (a) {
      a = a.toString();
      var b = a.indexOf(".");
      return -1 === b ? 0 : a.length - b - 1;
    },
    _adjustValue: function (a) {
      var b = this.options;
      var d = null !== b.min ? b.min : 0;
      a = d + Math.round((a - d) / b.step) * b.step;
      a = parseFloat(a.toFixed(this._precision()));
      return null !== b.max && a > b.max
        ? b.max
        : null !== b.min && a < b.min
        ? b.min
        : a;
    },
    _stop: function (a) {
      this.spinning &&
        (clearTimeout(this.timer),
        clearTimeout(this.mousewheelTimer),
        (this.counter = 0),
        (this.spinning = !1),
        this._trigger("stop", a));
    },
    _setOption: function (a, b) {
      if ("culture" === a || "numberFormat" === a) {
        var c = this._parse(this.element.val());
        this.options[a] = b;
        this.element.val(this._format(c));
      } else
        ("max" !== a && "min" !== a && "step" !== a) ||
          "string" !== typeof b ||
          (b = this._parse(b)),
          "icons" === a &&
            ((c = this.buttons.first().find(".ui-icon")),
            this._removeClass(c, null, this.options.icons.up),
            this._addClass(c, null, b.up),
            (c = this.buttons.last().find(".ui-icon")),
            this._removeClass(c, null, this.options.icons.down),
            this._addClass(c, null, b.down)),
          this._super(a, b);
    },
    _setOptionDisabled: function (a) {
      this._super(a);
      this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!a);
      this.element.prop("disabled", !!a);
      this.buttons.button(a ? "disable" : "enable");
    },
    _setOptions: e(function (a) {
      this._super(a);
    }),
    _parse: function (a) {
      "string" === typeof a &&
        "" !== a &&
        (a =
          window.Globalize && this.options.numberFormat
            ? Globalize.parseFloat(a, 10, this.options.culture)
            : +a);
      return "" === a || isNaN(a) ? null : a;
    },
    _format: function (a) {
      return "" === a
        ? ""
        : window.Globalize && this.options.numberFormat
        ? Globalize.format(a, this.options.numberFormat, this.options.culture)
        : a;
    },
    _refresh: function () {
      this.element.attr({
        "aria-valuemin": this.options.min,
        "aria-valuemax": this.options.max,
        "aria-valuenow": this._parse(this.element.val()),
      });
    },
    isValid: function () {
      var a = this.value();
      return null === a ? !1 : a === this._adjustValue(a);
    },
    _value: function (a, b) {
      if ("" !== a) {
        var c = this._parse(a);
        null !== c && (b || (c = this._adjustValue(c)), (a = this._format(c)));
      }
      this.element.val(a);
      this._refresh();
    },
    _destroy: function () {
      this.element
        .prop("disabled", !1)
        .removeAttr(
          "autocomplete role aria-valuemin aria-valuemax aria-valuenow"
        );
      this.uiSpinner.replaceWith(this.element);
    },
    stepUp: e(function (a) {
      this._stepUp(a);
    }),
    _stepUp: function (a) {
      this._start() && (this._spin((a || 1) * this.options.step), this._stop());
    },
    stepDown: e(function (a) {
      this._stepDown(a);
    }),
    _stepDown: function (a) {
      this._start() &&
        (this._spin((a || 1) * -this.options.step), this._stop());
    },
    pageUp: e(function (a) {
      this._stepUp((a || 1) * this.options.page);
    }),
    pageDown: e(function (a) {
      this._stepDown((a || 1) * this.options.page);
    }),
    value: function (a) {
      if (!arguments.length) return this._parse(this.element.val());
      e(this._value).call(this, a);
    },
    widget: function () {
      return this.uiSpinner;
    },
  });
  !1 !== b.uiBackCompat &&
    b.widget("ui.spinner", b.ui.spinner, {
      _enhance: function () {
        this.uiSpinner = this.element
          .attr("autocomplete", "off")
          .wrap(this._uiSpinnerHtml())
          .parent()
          .append(this._buttonHtml());
      },
      _uiSpinnerHtml: function () {
        return "\x3cspan\x3e";
      },
      _buttonHtml: function () {
        return "\x3ca\x3e\x3c/a\x3e\x3ca\x3e\x3c/a\x3e";
      },
    });
});
(function (b) {
  var e = xfalib.ut.XfaUtil.prototype;
  b.widget("xfaWidget.numericStepper", b.xfaWidget.numericInput, {
    _widgetName: "numericStepper",
    render: function () {
      var a = b.xfaWidget.numericInput.prototype.render.apply(this, arguments);
      return b.ui.spinner(this.options, a).element;
    },
    getOptionsMap: function () {
      var a = b.xfaWidget.numericInput.prototype.getOptionsMap.apply(
        this,
        arguments
      );
      return b.extend({}, a, {
        access: function (a) {
          switch (a) {
            case "open":
              this.$userControl.spinner("enable");
              break;
            case "readOnly":
              this.$userControl.spinner("disable");
          }
        },
        value: function (a) {
          this.$userControl.spinner("value", a);
        },
        displayValue: function (a) {},
      });
    },
    getCommitValue: function () {
      return this.$userControl.spinner("value");
    },
    showValue: function () {},
    showDisplayValue: function () {},
    getEventMap: function () {
      var a = b.xfaWidget.numericInput.prototype.getEventMap.apply(
        this,
        arguments
      );
      return b.extend({}, a, {
        spinstop: e.XFA_EXIT_EVENT,
        change: e.XFA_CHANGE_EVENT,
        "onKeyInput.numericInput": null,
      });
    },
  });
})($);
(function (b) {
  b.widget("xfaWidget.richTextField", b.xfaWidget.textField, {
    _widgetName: "richTextField",
    _richTextWidget: null,
    _changeAccess: function (b) {
      switch (b) {
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
      var e = b.xfaWidget.textField.prototype.getOptionsMap.apply(
        this,
        arguments
      );
      return b.extend({}, e, {
        value: function (a) {
          if (null === this._richTextWidget) {
            var b = this.$userControl.find("div.richTextWidget").eq(0);
            this._initializeRichTextEditor(b);
          }
          this._richTextWidget.setRichTextEditorContent(a);
          a && this.$userControl.trigger("blur");
        },
        access: function (a) {
          this._changeAccess(a);
        },
      });
    },
    _initializeRichTextEditor: function (b) {
      this._initializeRTEToolbar();
      this._richTextWidget = new window.Form.rte.RichTextEditor({
        selector: b.attr("id"),
        toolbar: window.Form.rte.RichTextEditor.AFToolbar,
        data: xfalib.ut.XfaUtil.prototype.encodeScriptableTags(
          this.options.value
        ),
        locale: b.data("locale"),
      });
      var a = this;
      this._richTextWidget.editor.on("blur:composer", function () {
        a.$userControl.trigger("blur");
      });
      this.options.access && this._changeAccess(this.options.access);
    },
    getEventMap: function () {
      if (xfalib.ut.XfaUtil.prototype.isIE()) {
        var e = b.xfaWidget.textField.prototype.getEventMap.apply(
          this,
          arguments
        );
        return b.extend({}, e, {
          "activate.richTextField": xfalib.ut.XfaUtil.prototype.XFA_ENTER_EVENT,
        });
      }
      return b.xfaWidget.textField.prototype.getEventMap.apply(this, arguments);
    },
    render: function () {
      var e = this.element.find("div.richTextWidget").eq(0);
      e.children().remove();
      var a = xfalib.ut.XfaUtil.prototype.encodeScriptableTags(
        this.options.value
      );
      e.append(a);
      return b.xfaWidget.defaultWidget.prototype.render.apply(this, arguments);
    },
    getCommitValue: function () {
      var b = "";
      this._richTextWidget &&
        (b = this._richTextWidget.getRichTextEditorContent());
      return b;
    },
    preProcessEnter: function (e) {
      b.xfaWidget.textField.prototype.preProcessEnter.apply(this, arguments);
      var a = this.$userControl.find("div.richTextWidget").eq(0);
      void 0 !== window.Form &&
        void 0 !== window.Form.rte &&
        null === this._richTextWidget &&
        this._initializeRichTextEditor(a);
    },
    _initializeRTEToolbar: function () {
      window.Form.rte.RichTextEditor.AFToolbar = window.Form.rte.RichTextEditor
        .AFToolbar || {
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
                  Form.rte.Commands.SUPERSCIPT,
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
(function (b) {
  function e(a, c, e, d) {
    d = {
      data: d || 0 === d || !1 === d ? d : c ? c.data : {},
      _wrap: c ? c._wrap : null,
      tmpl: null,
      parent: c || null,
      nodes: [],
      calls: f,
      nest: t,
      wrap: C,
      html: D,
      update: E,
    };
    a && b.extend(d, a, { nodes: [], parent: c });
    e &&
      ((d.tmpl = e),
      (d._ctnt = d._ctnt || d.tmpl(b, d)),
      (d.key = ++v),
      ((y.length ? w : p)[v] = d));
    return d;
  }
  function a(d, e, h) {
    var g;
    h = h
      ? b.map(h, function (b) {
          return "string" === typeof b
            ? d.key
              ? b.replace(
                  /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,
                  '$1 _tmplitem\x3d"' + d.key + '" $2'
                )
              : b
            : a(b, d, b._ctnt);
        })
      : d;
    if (e) return h;
    h = h.join("");
    h.replace(
      /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
      function (a, d, e, k) {
        g = b(e).get();
        q(g);
        d && (g = c(d).concat(g));
        k && (g = g.concat(c(k)));
      }
    );
    return g ? g : c(h);
  }
  function c(a) {
    var c = document.createElement("div");
    c.innerHTML = a;
    return b.makeArray(c.childNodes);
  }
  function d(a) {
    return new Function(
      "jQuery",
      "$item",
      "var $\x3djQuery,call,__\x3d[],$data\x3d$item.data;with($data){__.push('" +
        b
          .trim(a)
          .replace(/([\\'])/g, "\\$1")
          .replace(/[\r\t\n]/g, " ")
          .replace(/\$\{([^\}]*)\}/g, "{{\x3d $1}}")
          .replace(
            /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
            function (a, c, d, e, g, m, f) {
              a = b.tmpl.tag[d];
              if (!a) throw "Unknown template tag: " + d;
              d = a._default || [];
              m && !/\w$/.test(g) && ((g += m), (m = ""));
              g
                ? ((g = l(g)),
                  (f = f ? "," + l(f) + ")" : m ? ")" : ""),
                  (f = m
                    ? -1 < g.indexOf(".")
                      ? g + l(m)
                      : "(" + g + ").call($item" + f
                    : g),
                  (m = m
                    ? f
                    : "(typeof(" +
                      g +
                      ")\x3d\x3d\x3d'function'?(" +
                      g +
                      ").call($item):(" +
                      g +
                      "))"))
                : (m = f = d.$1 || "null");
              e = l(e);
              return (
                "');" +
                a[c ? "close" : "open"]
                  .split("$notnull_1")
                  .join(
                    g
                      ? "typeof(" +
                          g +
                          ")!\x3d\x3d'undefined' \x26\x26 (" +
                          g +
                          ")!\x3dnull"
                      : "true"
                  )
                  .split("$1a")
                  .join(m)
                  .split("$1")
                  .join(f)
                  .split("$2")
                  .join(e || d.$2 || "") +
                "__.push('"
              );
            }
          ) +
        "');}return __;"
    );
  }
  function n(c, d) {
    c._wrap = a(c, !0, b.isArray(d) ? d : [z.test(d) ? d : b(d).html()]).join(
      ""
    );
  }
  function l(a) {
    return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null;
  }
  function q(a) {
    function c(a) {
      function c(a) {
        a += d;
        h = f[a] = f[a] || e(h, p[h.parent.key + d] || h.parent);
      }
      var g,
        k = a,
        h,
        u;
      if ((u = a.getAttribute("_tmplitem"))) {
        for (
          ;
          k.parentNode &&
          1 === (k = k.parentNode).nodeType &&
          !(g = k.getAttribute("_tmplitem"));

        );
        g !== u &&
          ((k = k.parentNode
            ? 11 === k.nodeType
              ? 0
              : k.getAttribute("_tmplitem") || 0
            : 0),
          (h = p[u]) ||
            ((h = w[u]), (h = e(h, p[k] || w[k])), (h.key = ++v), (p[v] = h)),
          r && c(u));
        a.removeAttribute("_tmplitem");
      } else
        r &&
          (h = b.data(a, "tmplItem")) &&
          (c(h.key),
          (p[h.key] = h),
          (k = (k = b.data(a.parentNode, "tmplItem")) ? k.key : 0));
      if (h) {
        for (g = h; g && g.key != k; ) g.nodes.push(a), (g = g.parent);
        delete h._ctnt;
        delete h._wrap;
        b.data(a, "tmplItem", h);
      }
    }
    var d = "_" + r,
      g,
      f = {},
      l,
      m;
    var n = 0;
    for (l = a.length; n < l; n++)
      if (1 === (g = a[n]).nodeType) {
        var q = g.getElementsByTagName("*");
        for (m = q.length - 1; 0 <= m; m--) c(q[m]);
        c(g);
      }
  }
  function f(a, b, c, d) {
    if (!a) return y.pop();
    y.push({ _: a, tmpl: b, item: this, data: c, options: d });
  }
  function t(a, c, d) {
    return b.tmpl(b.template(a), c, d, this);
  }
  function C(a, c) {
    var d = a.options || {};
    d.wrapped = c;
    return b.tmpl(b.template(a.tmpl), a.data, d, a.item);
  }
  function D(a, c) {
    var d = this._wrap;
    return b.map(
      b(b.isArray(d) ? d.join("") : d).filter(a || "*"),
      function (a) {
        if (c) a = a.innerText || a.textContent;
        else {
          var b;
          (b = a.outerHTML) ||
            ((b = document.createElement("div")),
            b.appendChild(a.cloneNode(!0)),
            (b = b.innerHTML));
          a = b;
        }
        return a;
      }
    );
  }
  function E() {
    var a = this.nodes;
    b.tmpl(null, null, null, this).insertBefore(a[0]);
    b(a).remove();
  }
  var A = b.fn.domManip,
    z = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{! /,
    p = {},
    w = {},
    x,
    B = { key: 0, data: {} },
    v = 0,
    r = 0,
    y = [];
  b.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith",
    },
    function (a, c) {
      b.fn[a] = function (d) {
        var e = [];
        d = b(d);
        var g;
        var k = 1 === this.length && this[0].parentNode;
        x = p || {};
        if (
          k &&
          11 === k.nodeType &&
          1 === k.childNodes.length &&
          1 === d.length
        )
          d[c](this[0]), (e = this);
        else {
          var h = 0;
          for (g = d.length; h < g; h++)
            (r = h),
              (k = (0 < h ? this.clone(!0) : this).get()),
              b(d[h])[c](k),
              (e = e.concat(k));
          r = 0;
          e = this.pushStack(e, a, d.selector);
        }
        d = x;
        x = null;
        b.tmpl.complete(d);
        return e;
      };
    }
  );
  b.fn.extend({
    tmpl: function (a, c, d) {
      return b.tmpl(this[0], a, c, d);
    },
    tmplItem: function () {
      return b.tmplItem(this[0]);
    },
    template: function (a) {
      return b.template(a, this[0]);
    },
    domManip: function (a, c, d) {
      if (a[0] && b.isArray(a[0])) {
        for (
          var e = b.makeArray(arguments), g = a[0], k = g.length, h = 0, f;
          h < k && !(f = b.data(g[h++], "tmplItem"));

        );
        f &&
          r &&
          (e[2] = function (a) {
            b.tmpl.afterManip(this, a, d);
          });
        A.apply(this, e);
      } else A.apply(this, arguments);
      r = 0;
      !x && b.tmpl.complete(p);
      return this;
    },
  });
  b.extend({
    tmpl: function (c, d, h, f) {
      var g = !f;
      if (g) (f = B), (c = b.template[c] || b.template(null, c)), (w = {});
      else if (!c)
        return (
          (c = f.tmpl),
          (p[f.key] = f),
          (f.nodes = []),
          f.wrapped && n(f, f.wrapped),
          b(a(f, null, f.tmpl(b, f)))
        );
      if (!c) return [];
      "function" === typeof d && (d = d.call(f || {}));
      h && h.wrapped && n(h, h.wrapped);
      d = b.isArray(d)
        ? b.map(d, function (a) {
            return a ? e(h, f, c, a) : null;
          })
        : [e(h, f, c, d)];
      return g ? b(a(f, null, d)) : d;
    },
    tmplItem: function (a) {
      var c;
      for (
        a instanceof b && (a = a[0]);
        a &&
        1 === a.nodeType &&
        !(c = b.data(a, "tmplItem")) &&
        (a = a.parentNode);

      );
      return c || B;
    },
    template: function (a, c) {
      return c
        ? ("string" === typeof c
            ? (c = d(c))
            : c instanceof b && (c = c[0] || {}),
          c.nodeType &&
            (c = b.data(c, "tmpl") || b.data(c, "tmpl", d(c.innerHTML))),
          "string" === typeof a ? (b.template[a] = c) : c)
        : a
        ? "string" !== typeof a
          ? b.template(null, a)
          : b.template[a] || b.template(null, z.test(a) ? a : b(a))
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
  b.extend(b.tmpl, {
    tag: {
      tmpl: {
        _default: { $2: "null" },
        open: "if($notnull_1){__\x3d__.concat($item.nest($1,$2));}",
      },
      wrap: {
        _default: { $2: "null" },
        open: "$item.calls(__,$1,$2);__\x3d[];",
        close:
          "call\x3d$item.calls();__\x3dcall._.concat($item.wrap(call,__));",
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
      html: { open: "if($notnull_1){__.push($1a);}" },
      "\x3d": {
        _default: { $1: "$data" },
        open: "if($notnull_1){__.push($.encode($1a));}",
      },
      "!": { open: "" },
    },
    complete: function () {
      p = {};
    },
    afterManip: function (a, c, d) {
      var e =
        11 === c.nodeType
          ? b.makeArray(c.childNodes)
          : 1 === c.nodeType
          ? [c]
          : [];
      d.call(a, c);
      q(e);
      r++;
    },
  });
})(jQuery);
(function (b, e) {
  b.widget("switchbutton.switchbutton", {
    options: {
      classes: "",
      duration: 200,
      dragThreshold: 5,
      autoResize: !0,
      labels: !0,
      checkedLabel: "ON",
      uncheckedLabel: "OFF",
      disabledClass: "ui-switchbutton-disabled ui-state-disabled",
      template:
        '\x3cdiv class\x3d"ui-switchbutton ui-switchbutton-default ${classes} {{if !labels}}ui-switchbutton-no-labels{{/if}}" tabindex\x3d0\x3e\x3clabel class\x3d"ui-switchbutton-disabled"\x3e\x3cspan\x3e{{if labels}}${uncheckedLabel}{{/if}}\x3c/span\x3e\x3c/label\x3e\x3clabel class\x3d"ui-switchbutton-enabled"\x3e\x3cspan\x3e{{if labels}}${checkedLabel}{{/if}}\x3c/span\x3e\x3c/label\x3e\x3cdiv class\x3d"ui-switchbutton-handle"\x3e\x3c/div\x3e\x3c/div\x3e',
    },
    _create: function () {
      this.element.is(":checkbox") &&
        (this._wrapCheckboxInContainer(),
        this._attachEvents(),
        this._globalEvents(),
        this._disableTextSelection(),
        this.element.prop("checked") &&
          this.$container.toggleClass(
            "ui-state-active",
            this.element.prop("checked")
          ),
        this.options.autoResize && this._autoResize(),
        this._initialPosition());
    },
    _wrapCheckboxInContainer: function () {
      this.$container = b.tmpl(this.options.template, this.options);
      this.element.after(this.$container);
      this.element.remove();
      this.$container.append(this.element);
      this.$disabledLabel = this.$container.children(
        ".ui-switchbutton-disabled"
      );
      this.$disabledSpan = this.$disabledLabel.children("span");
      this.$enabledLabel = this.$container.children(".ui-switchbutton-enabled");
      this.$enabledSpan = this.$enabledLabel.children("span");
      this.$handle = this.$container.children(".ui-switchbutton-handle");
    },
    _attachEvents: function () {
      var a = this;
      this.$container
        .on("keydown", function (b) {
          if (
            !(
              b.ctrlKey ||
              b.altKey ||
              b.metaKey ||
              b.shiftKey ||
              ((32 != b.keyCode && 37 != b.keyCode && 39 != b.keyCode) ||
                b.preventDefault(),
              a.element.prop("disabled"))
            )
          ) {
            var c = a.element.prop("checked");
            if (
              32 == b.keyCode ||
              (37 == b.keyCode && c) ||
              (39 == b.keyCode && !c)
            )
              (b = jQuery.Event("willChange")),
                a.element.trigger(b),
                b.isDefaultPrevented() ||
                  ((c = !c),
                  a.element.prop("checked", c),
                  a.$container.toggleClass("ui-state-active", c),
                  a.element.change(),
                  a.element.trigger("didChange"));
          }
        })
        .on("mousedown touchstart", function (c) {
          c.preventDefault();
          a.element.prop("disabled") ||
            (b(this).focus(),
            (c = c.pageX || c.originalEvent.changedTouches[0].pageX),
            (b[e].currentlyClicking = a.$handle),
            (b[e].dragStartPosition = c),
            (b[e].handleLeftOffset = parseInt(a.$handle.css("left"), 10) || 0),
            (b[e].dragStartedOn = a.element));
        })
        .on("iPhoneDrag", function (c, d) {
          c.preventDefault();
          a.element.prop("disabled") ||
            a.element != b[e].dragStartedOn ||
            ((c =
              (d + b[e].handleLeftOffset - b[e].dragStartPosition) /
              a.rightSide),
            0 > c && (c = 0),
            1 < c && (c = 1),
            a.$handle.css({ left: c * a.rightSide }),
            a.$enabledLabel.css({ width: c * a.rightSide }),
            a.$disabledSpan.css({ "margin-right": -c * a.rightSide }),
            a.$enabledSpan.css({ "margin-left": -(1 - c) * a.rightSide }));
        })
        .on("iPhoneDragEnd", function (c, d) {
          a.element.prop("disabled") ||
            ((c = jQuery.Event("willChange")),
            a.element.trigger(c),
            c.isDefaultPrevented()
              ? (d = a.element.prop("checked"))
              : b[e].dragging
              ? ((d = (d - b[e].dragStartPosition) / a.rightSide),
                (d = 0 > d ? 0.5 > Math.abs(d) : 0.5 <= d))
              : (d = !a.element.prop("checked")),
            (b[e].currentlyClicking = null),
            (b[e].dragging = null),
            a.element.prop("checked", d),
            a.$container.toggleClass("ui-state-active", d),
            a.element.change(),
            a.element.trigger("didChange"));
        });
      this.element.change(function () {
        a.refresh();
        var b = a.element.prop("checked") ? a.rightSide : 0,
          d = a.element.prop("checked")
            ? a.options.checkedLabel
            : a.options.uncheckedLabel;
        a.element.attr("aria-label", d);
        a.$handle.animate({ left: b }, a.options.duration);
        a.$enabledLabel.animate({ width: b }, a.options.duration);
        a.$disabledSpan.animate({ "margin-right": -b }, a.options.duration);
        a.$enabledSpan.animate(
          { "margin-left": b - a.rightSide },
          a.options.duration
        );
      });
    },
    _globalEvents: function () {
      if (!b[e].initComplete) {
        var a = this.options;
        b(document)
          .on("mousemove touchmove", function (c) {
            if (b[e].currentlyClicking) {
              c.preventDefault();
              var d = c.pageX || c.originalEvent.changedTouches[0].pageX;
              !b[e].dragging &&
                Math.abs(b[e].dragStartPosition - d) > a.dragThreshold &&
                (b[e].dragging = !0);
              b(c.target).trigger("iPhoneDrag", [d]);
            }
          })
          .on("mouseup touchend", function (a) {
            b[e].currentlyClicking &&
              (a.preventDefault(),
              (a = a.pageX || a.originalEvent.changedTouches[0].pageX),
              b(b[e].currentlyClicking).trigger("iPhoneDragEnd", [a]));
          });
      }
    },
    _disableTextSelection: function () {
      b([
        this.$handle,
        this.$disabledLabel,
        this.$enabledLabel,
        this.$container,
      ]).attr("unselectable", "on");
    },
    _autoResize: function () {
      var a = this.$enabledLabel.width();
      32 > a && (a = 32);
      var b = this.$disabledLabel.width(),
        d = this.$disabledSpan.innerWidth() - this.$disabledSpan.width();
      handleMargins = this.$handle.outerWidth() - this.$handle.innerWidth();
      a = handleWidth = a > b ? a : b;
      this.$handle.css({ width: handleWidth });
      handleWidth = this.$handle.width();
      a += handleWidth + 6;
      spanWidth = a - handleWidth - d - handleMargins;
      this.$container.css({ width: a });
      this.$container.find("span").width(spanWidth);
    },
    _initialPosition: function () {
      this.$disabledLabel.css({ width: this.$container.width() - 5 });
      this.rightSide = this.$container.width() - this.$handle.outerWidth();
      this.element.prop("checked")
        ? (this.$handle.css({ left: this.rightSide }),
          this.$enabledLabel.css({ width: this.rightSide }),
          this.$disabledSpan.css({ "margin-right": -this.rightSide }))
        : (this.$enabledLabel.css({ width: 0 }),
          this.$enabledSpan.css({ "margin-left": -this.rightSide }));
      this.refresh();
    },
    enable: function () {
      this.element.prop("disabled", !1);
      this.refresh();
      return this._setOption("disabled", !1);
    },
    disable: function () {
      this.element.prop("disabled", !0);
      this.refresh();
      return this._setOption("disabled", !0);
    },
    widget: function () {
      return this.$container;
    },
    refresh: function () {
      if (this.element.prop("disabled"))
        return this.$container.addClass(this.options.disabledClass), !1;
      this.$container.removeClass(this.options.disabledClass);
    },
  });
})(jQuery, "switchbutton");
(function (b) {
  b.widget("xfaWidget.guideSwitch", b.xfaWidget.XfaCheckBox, {
    _widgetName: "guideSwitch",
    options: { value: null, state: -1, states: 2, values: [] },
    checkedState: !1,
    render: function () {
      var e = b.xfaWidget.XfaCheckBox.prototype.render.apply(this, arguments),
        a = {
          checkedLabel: this.options.checkedLabel,
          uncheckedLabel: this.options.uncheckedLabel,
        },
        c = "0" == this.options.state ? !0 : !1;
      e.prop("checked", c);
      this.options.screenReaderText = c ? a.checkedLabel : a.uncheckedLabel;
      return (e = b.switchbutton.switchbutton(a, e).element);
    },
    getOptionsMap: function () {
      return b.xfaWidget.XfaCheckBox.prototype.getOptionsMap.apply(
        this,
        arguments
      );
    },
    getEventMap: function () {
      var e = b.xfaWidget.XfaCheckBox.prototype.getEventMap.apply(
        this,
        arguments
      );
      return b.extend({}, e, {
        change: xfalib.ut.XfaUtil.prototype.XFA_CHANGE_EVENT,
        click: xfalib.ut.XfaUtil.prototype.XFA_CLICK_EVENT,
      });
    },
  });
})($);
(function (b, e) {
  b.widget("xfaWidget.telephoneWidget", b.xfaWidget.textField, {
    _widgetName: "telephoneWidget",
  });
})($, _);
