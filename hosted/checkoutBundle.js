"use strict";

var cartItemsId = [];
var items = [];

var ItemsInCart = function ItemsInCart(props) {
  console.log(props.itemsInCart);

  if (props.itemsInCart.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "cartItemList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCart"
    }, "No Items Yet"));
  }

  var filteredCart = props.itemsInCart.sort();
  console.log(filteredCart);
  var cartItemNodes = props.itemsInCart.map(function (item) {
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
    }, "Qty: 1")), /*#__PURE__*/React.createElement("div", {
      className: "prices"
    }, /*#__PURE__*/React.createElement("div", {
      className: "amount"
    }, "$", item.price)));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "CartItemsList"
  }, cartItemNodes);
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
  }, "Shopping Cart"), /*#__PURE__*/React.createElement("h5", {
    className: "Action"
  }, "Remove all")), props.right));
};

var loadCart = function loadCart() {
  sendAjax('GET', '/getItems', null, function (data) {});
};

var setupCartPage = function setupCartPage(csrf) {
  getCart();
  console.log(cartItemsId);
  ReactDOM.render( /*#__PURE__*/React.createElement(CartPage, {
    right: /*#__PURE__*/React.createElement(ItemsInCart, {
      itemsInCart: cartItemsId,
      csrf: csrf
    })
  }), document.querySelector("#container"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupCartPage(result.csrfToken);
  });
  console.log(cartItemsId);
};

var getCart = function getCart() {
  sendAjax('GET', '/getCart', null, function (result) {
    cartItemsId = result.itemsInCart;
    items = result.items;
    document.querySelector("#cartButton").innerHTML = "Cart: ".concat(cartItemsId.length);
  });
};

var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    return resolve();
  }, 1000);
});
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
    console.log(data);
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
