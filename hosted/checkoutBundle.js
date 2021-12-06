"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var cartItemsId = [];
var items = [];
var totalPrice = 0;

var ItemsInCart = function ItemsInCart(props) {
  if (props.itemsInCart.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "cartItemList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCart"
    }, "No Items Yet"));
  }

  var cartItemNodes = items.map(function (item) {
    totalPrice += item.price * item.qty;
    var imageSource = "/retrieve?fileName=".concat(item.name);
    return /*#__PURE__*/React.createElement("div", {
      key: item._id,
      className: "cart-item-container"
    }, /*#__PURE__*/React.createElement("img", {
      src: imageSource
    }), /*#__PURE__*/React.createElement("div", {
      className: "about"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "title"
    }, item.name), /*#__PURE__*/React.createElement("h3", {
      className: "subtitle"
    }, "Qty: ", item.qty)), /*#__PURE__*/React.createElement("div", {
      className: "prices"
    }, /*#__PURE__*/React.createElement("div", {
      className: "amount"
    }, "$", item.price)));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "CartItemsList"
  }, cartItemNodes);
};

var emptyCart = function emptyCart() {
  var csrf = event.target.parentNode.getAttribute("csrf");
  sendAjax('POST', '/addToCart', {
    cartItemsId: [],
    csrf: event.target.parentNode.getAttribute("csrf")
  }, function (result) {
    cartItemsId = [];
    totalPrice = 0;
    document.querySelector("#cartButton").innerHTML = "Cart: ".concat(cartItemsId.length);
    ReactDOM.render( /*#__PURE__*/React.createElement(CartPage, {
      right: /*#__PURE__*/React.createElement(ItemsInCart, {
        itemsInCart: [],
        csrf: csrf
      })
    }), document.querySelector("#container"));
  });
};

var CheckoutPage = function CheckoutPage(props) {
  return /*#__PURE__*/React.createElement("div", {
    csrf: props.csrf
  }, /*#__PURE__*/React.createElement("h5", {
    className: "Action",
    onClick: setupCartPage
  }, "Go back to Cart"));
};

var CreateCheckoutPage = function CreateCheckoutPage() {
  var csrf = event.target.parentNode.getAttribute("csrf");
  ReactDOM.render( /*#__PURE__*/React.createElement(CheckoutPage, {
    csrf: csrf
  }), document.querySelector("#container"));
};

var CartPage = function CartPage(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "CheckoutPanel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "headings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "Heading"
  }, "Shopping Cart"), /*#__PURE__*/React.createElement("div", {
    csrf: props.right.props.csrf
  }, /*#__PURE__*/React.createElement("h5", {
    className: "Action",
    onClick: emptyCart
  }, "Remove all"))), props.right), /*#__PURE__*/React.createElement("div", {
    className: "footerCart",
    csrf: props.right.props.csrf
  }, /*#__PURE__*/React.createElement("a", {
    href: "/checkoutPage"
  }, /*#__PURE__*/React.createElement("button", {
    className: "checkoutButton"
  }, "Checkout")), /*#__PURE__*/React.createElement("h2", null, "Total: $", totalPrice)));
};

var setupCartPage = function setupCartPage() {
  var csrf = event.target.parentNode.getAttribute("csrf");
  getCart(csrf);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    getCart(result.csrfToken);
  });
};

var getCart = function getCart(csrf) {
  sendAjax('GET', '/getCart', null, function (result) {
    cartItemsId = result.itemsInCart;
    items = result.items;
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
    ReactDOM.render( /*#__PURE__*/React.createElement(CartPage, {
      right: /*#__PURE__*/React.createElement(ItemsInCart, {
        itemsInCart: cartItemsId,
        csrf: csrf
      })
    }), document.querySelector("#container"));
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
