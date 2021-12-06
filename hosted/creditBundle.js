"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//TODO: Add components prop-types, add cvv animation
var CURRENT_YEAR = new Date().getFullYear();
var CURRENT_MONTH = new Date().getMonth();
var cartItemsId = [];
var totalPrice = 0;
var MONTHS = {},
    YEARS = [CURRENT_YEAR];

for (var i = 1; i <= 12; i++) {
  MONTHS[i] = i.toString().length === 1 ? "0".concat(i) : i.toString();
  YEARS.push(YEARS[0] + i);
}

var CreditCardForm = /*#__PURE__*/function (_React$Component) {
  _inherits(CreditCardForm, _React$Component);

  var _super = _createSuper(CreditCardForm);

  function CreditCardForm() {
    var _this;

    _classCallCheck(this, CreditCardForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      sliderLocation: "",
      cardNumber: "",
      cardName: "",
      cardMonth: 0,
      cardYear: 0,
      cardCvv: "",
      cardType: "visa",
      toggleMonth: true,
      toggleYear: true,
      showCard: false,
      cardFlipped: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event, type) {
      var value = event.target.value;

      if (type === "cardNumber") {
        value = value.replace(/ /gi, "");

        if (isNaN(value)) {
          return;
        } else {
          var _this$setState;

          var cardType = _this.getCardType(value);

          _this.setState((_this$setState = {}, _defineProperty(_this$setState, type, value), _defineProperty(_this$setState, "cardType", cardType), _this$setState));
        }
      } else if (type === "cardName") {
        var regName = /^[a-zA-Z\s]*$/;

        if (!regName.test(value)) {} else {
          _this.setState(_defineProperty({}, type, value));
        }
      } else if (type === "cardMonth") {
        value = Number(value);

        _this.setState(function (prevState) {
          var _ref;

          return _ref = {}, _defineProperty(_ref, type, value), _defineProperty(_ref, "toggleMonth", !prevState.toggleMonth), _ref;
        });
      } else if (type === "cardYear") {
        value = Number(value);
        var cardMonth = _this.state.cardMonth;

        if (value === CURRENT_YEAR && cardMonth <= CURRENT_MONTH) {
          _this.setState(function (prevState) {
            return {
              cardMonth: 0,
              cardYear: value,
              toggleYear: !prevState.toggleYear,
              toggleMonth: !prevState.toggleMonth
            };
          });
        } else {
          _this.setState(function (prevState) {
            var _ref2;

            return _ref2 = {}, _defineProperty(_ref2, type, value), _defineProperty(_ref2, "toggleYear", !prevState.toggleYear), _ref2;
          });
        }
      } else if (type === "cardCvv") {
        value = value.replace(/ /gi, "");

        if (isNaN(value)) {
          return;
        } else {
          _this.setState(_defineProperty({}, type, value));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (event) {
      event.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "canSubmit", function () {
      var _this$state = _this.state,
          cardNumber = _this$state.cardNumber,
          cardName = _this$state.cardName,
          cardMonth = _this$state.cardMonth,
          cardYear = _this$state.cardYear,
          cardCvv = _this$state.cardCvv;
      return cardNumber.length === 16 && cardName.length > 4 && cardCvv.length === 3 && cardMonth !== 0 && cardYear !== 0;
    });

    _defineProperty(_assertThisInitialized(_this), "moveSlider", function (event, position) {
      position = ["year", "month"].includes(position) ? "expiration" : position;

      _this.setState({
        sliderLocation: position
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setFocus", function (event, type) {
      var sliderLocation = _this.state.sliderLocation;

      if (event.target.className.includes("year")) {
        event.stopPropagation();
      }

      _this["".concat(type, "Input")].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      if (!_this.cvvInput.contains(event.target)) {
        _this.setState({
          cardFlipped: false
        });
      }

      if (_this.nameCard.contains(event.target) || _this.nameInput.contains(event.target) || _this.numberCard.contains(event.target) || _this.numberInput.contains(event.target) || _this.expirationCard.contains(event.target) || _this.monthInput.contains(event.target) || _this.yearInput.contains(event.target)) return;

      _this.setState({
        sliderLocation: ""
      });
    });

    _defineProperty(_assertThisInitialized(_this), "formatCardNumber", function (value) {
      var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      var matches = v.match(/\d{4,16}/g);
      var match = matches && matches[0] || "";
      var parts = [];

      for (var _i = 0, len = match.length; _i < len; _i += 4) {
        parts.push(match.substring(_i, _i + 4));
      }

      if (parts.length) {
        return parts.join(" ");
      } else {
        return value;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getCardType", function (number) {
      var re = new RegExp("^4");
      if (number.match(re) != null) return "visa";
      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";
      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";
      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      return "visa";
    });

    return _this;
  }

  _createClass(CreditCardForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      // console.log("RENDERING ", this.state);
      var _this$state2 = this.state,
          cardNumber = _this$state2.cardNumber,
          cardName = _this$state2.cardName,
          cardMonth = _this$state2.cardMonth,
          cardYear = _this$state2.cardYear,
          cardCvv = _this$state2.cardCvv,
          cardType = _this$state2.cardType,
          sliderLocation = _this$state2.sliderLocation,
          toggleMonth = _this$state2.toggleMonth,
          toggleYear = _this$state2.toggleYear,
          showCard = _this$state2.showCard,
          cardFlipped = _this$state2.cardFlipped;
      var displayNumber = [];

      for (var _i2 = 0; _i2 < 16; _i2++) {
        var displayDigit = "#";

        if (typeof cardNumber[_i2] !== "undefined") {
          displayDigit = _i2 > 3 && _i2 < 12 ? "*" : cardNumber[_i2];
        }

        displayNumber.push(displayDigit);
      }

      var canSubmit = !this.canSubmit();
      var csrf = this.props;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        csrf: csrf,
        className: "card-form",
        onClick: this.handleClick
      }, /*#__PURE__*/React.createElement("div", {
        className: "card container ".concat(showCard ? "show" : "")
      }, /*#__PURE__*/React.createElement("div", {
        className: "card inner ".concat(cardFlipped ? "flipped" : "")
      }, /*#__PURE__*/React.createElement("div", {
        className: "front"
      }, /*#__PURE__*/React.createElement("img", {
        className: "card cover",
        src: "https://source.unsplash.com/collection/8497941/430x270",
        onLoad: function onLoad() {
          return _this2.setState({
            showCard: true
          });
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "card overlay"
      }), /*#__PURE__*/React.createElement("div", {
        className: "card slider ".concat(sliderLocation.length > 0 ? "on-".concat(sliderLocation) : "")
      }), /*#__PURE__*/React.createElement("div", {
        className: "card content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "chip"
      }), /*#__PURE__*/React.createElement("div", {
        className: "type ".concat(cardType)
      }), /*#__PURE__*/React.createElement("div", {
        className: "number",
        onClick: function onClick(event) {
          return _this2.setFocus(event, "number");
        },
        ref: function ref(node) {
          return _this2.numberCard = node;
        }
      }, displayNumber.map(function (digit, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "digit-wrapper",
          key: index
        }, /*#__PURE__*/React.createElement("div", {
          className: digit === "#" ? "digit shown" : "digit hidden"
        }, "#"), /*#__PURE__*/React.createElement("div", {
          className: digit === "#" ? "digit hidden" : "digit shown"
        }, digit === "#" ? "" : digit));
      })), /*#__PURE__*/React.createElement("div", {
        className: "name",
        onClick: function onClick(event) {
          return _this2.setFocus(event, "name");
        },
        ref: function ref(node) {
          return _this2.nameCard = node;
        }
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "name"
      }, "Card Holder"), /*#__PURE__*/React.createElement("div", {
        id: "name"
      }, /*#__PURE__*/React.createElement("div", {
        className: "placeholder ".concat(cardName.length > 0 ? "hidden" : "shown")
      }, "FULL NAME"), /*#__PURE__*/React.createElement("div", {
        className: "name-container"
      }, cardName.split("").map(function (_char, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: "character ".concat(/\s/.test(_char) ? "space" : ""),
          key: index
        }, _char);
      })))), /*#__PURE__*/React.createElement("div", {
        className: "expiration",
        onClick: function onClick(event) {
          return _this2.setFocus(event, "month");
        },
        ref: function ref(node) {
          return _this2.expirationCard = node;
        }
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "expiration"
      }, "Expires"), /*#__PURE__*/React.createElement("div", {
        id: "expiration"
      }, /*#__PURE__*/React.createElement("div", {
        className: "double-digit ".concat(toggleMonth ? "toggle1" : "toggle2")
      }, cardMonth === 0 ? "MM" : "".concat(cardMonth + 100).slice(-2)), /*#__PURE__*/React.createElement("div", {
        className: "double-digit"
      }, "/"), /*#__PURE__*/React.createElement("div", {
        className: "year double-digit ".concat(toggleYear ? "toggle1" : "toggle2"),
        onClick: function onClick(event) {
          return _this2.setFocus(event, "year");
        }
      }, cardYear === 0 ? "YY" : "".concat(cardYear).slice(-2)))))), /*#__PURE__*/React.createElement("div", {
        className: "card cover back"
      }, /*#__PURE__*/React.createElement("p", null, "CVV")))), /*#__PURE__*/React.createElement("div", {
        className: "card-inputs",
        csrf: csrf
      }, /*#__PURE__*/React.createElement("form", {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "lg-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "cardNumber"
      }, " Card Number"), /*#__PURE__*/React.createElement("input", {
        className: "number-input",
        id: "cardNumber",
        type: "text",
        onChange: function onChange(event) {
          return _this2.handleChange(event, "cardNumber");
        },
        onSelect: function onSelect(event) {
          return _this2.moveSlider(event, "number");
        },
        value: this.formatCardNumber(cardNumber),
        ref: function ref(node) {
          return _this2.numberInput = node;
        },
        maxLength: "19"
      })), /*#__PURE__*/React.createElement("div", {
        className: "lg-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "cardName"
      }, "Card Holder's Name"), /*#__PURE__*/React.createElement("input", {
        className: "name-input",
        id: "cardName",
        type: "text",
        onChange: function onChange(event) {
          return _this2.handleChange(event, "cardName");
        },
        onSelect: function onSelect(event) {
          return _this2.moveSlider(event, "name");
        },
        ref: function ref(node) {
          return _this2.nameInput = node;
        },
        value: cardName,
        maxLength: "24"
      })), /*#__PURE__*/React.createElement("div", {
        className: "med-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "cardMonth"
      }, "Expiration Date"), /*#__PURE__*/React.createElement("select", {
        className: "month-input",
        id: "cardMonth",
        value: cardMonth,
        onChange: function onChange(event) {
          return _this2.handleChange(event, "cardMonth");
        },
        onFocus: function onFocus(event) {
          return _this2.moveSlider(event, "month");
        },
        ref: function ref(node) {
          return _this2.monthInput = node;
        }
      }, " ", /*#__PURE__*/React.createElement("option", {
        value: "0",
        disabled: true
      }, "Month"), Object.keys(MONTHS).map(function (monthKey) {
        return /*#__PURE__*/React.createElement("option", {
          key: monthKey,
          value: monthKey,
          disabled: cardYear === CURRENT_YEAR && Number(monthKey) <= CURRENT_MONTH
        }, MONTHS[monthKey]);
      })), /*#__PURE__*/React.createElement("select", {
        className: "year-input",
        id: "cardYear",
        value: cardYear,
        onChange: function onChange(event) {
          return _this2.handleChange(event, "cardYear");
        },
        onFocus: function onFocus(event) {
          return _this2.moveSlider(event, "year");
        },
        ref: function ref(node) {
          return _this2.yearInput = node;
        }
      }, " ", /*#__PURE__*/React.createElement("option", {
        value: "0",
        disabled: true
      }, "Year"), YEARS.map(function (year) {
        return /*#__PURE__*/React.createElement("option", {
          key: year,
          value: year
        }, year);
      }))), /*#__PURE__*/React.createElement("div", {
        className: "sm-input"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "cardCvv"
      }, "CVV"), /*#__PURE__*/React.createElement("input", _defineProperty({
        className: "cvv-input",
        id: "cardCvv",
        value: cardCvv,
        onChange: function onChange(event) {
          return _this2.handleChange(event, "cardCvv");
        },
        onSelect: function onSelect() {
          return _this2.setState({
            cardFlipped: true
          });
        },
        ref: function ref(node) {
          return _this2.cvvInput = node;
        },
        maxLength: "3"
      }, "value", cardCvv))), /*#__PURE__*/React.createElement("button", {
        className: "lg-input ".concat(canSubmit ? "disabled" : ""),
        disabled: canSubmit,
        "data-value": this.props.csrf,
        onClick: handlePayment
      }, "Submit")))));
    }
  }]);

  return CreditCardForm;
}(React.Component);

var handlePayment = function handlePayment() {
  var token = event.target.getAttribute("data-value");
  sendAjax('POST', '/addToCart', {
    cartItemsId: [],
    csrf: token
  }, function (result) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ThankYouPage, {
      csrf: token
    }), document.getElementById("root"));
    cartItemsId = [];
    document.querySelector("#cartButton").innerHTML = "Cart: ".concat(cartItemsId.length);
  });
};

var ThankYouPage = function ThankYouPage(csrf) {
  if (cartItemsId.length != 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "thankYouWrapper"
    }, /*#__PURE__*/React.createElement("h2", null, "Thank you for shopping here. Your total was $", totalPrice, " and your order will be sent soon "), /*#__PURE__*/React.createElement("a", {
      href: "/shop"
    }, /*#__PURE__*/React.createElement("button", {
      className: "continueShop"
    }, "Continue Shopping")));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "thankYouWrapper"
    }, /*#__PURE__*/React.createElement("h2", null, "You forgot to add items to add"), /*#__PURE__*/React.createElement("a", {
      href: "/shop"
    }, /*#__PURE__*/React.createElement("button", {
      className: "continueShop"
    }, "Add items!")));
  }
};

var setupCreditCartForm = function setupCreditCartForm(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CreditCardForm, {
    csrf: csrf
  }), document.getElementById("root"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    var token = result.csrfToken;
    sendAjax('GET', '/getCart', null, function (result) {
      cartItemsId = result.itemsInCart;
      var items = result.items;
      totalPrice = 0;

      var _iterator = _createForOfIteratorHelper(items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          totalPrice += item.price * item.qty;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.querySelector("#cartButton").innerHTML = "Cart: ".concat(cartItemsId.length);

      if (cartItemsId.length == 0) {
        ReactDOM.render( /*#__PURE__*/React.createElement(ThankYouPage, {
          csrf: result.csrf
        }), document.querySelector("#root"));
      } else setupCreditCartForm(token);
    });
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  if (type == "POST") {
    $.ajaxSetup({
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader("X-CSRF-Token", data.csrf);
      }
    });
  }

  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);
      console.log(messageObj);
    }
  });
};
