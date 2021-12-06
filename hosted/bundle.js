"use strict";

var cartItemsId = [];

var ItemList = function ItemList(props) {
  if (props.items.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "itemList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyItemList"
    }, "No Items Yet"));
  }

  var itemNodes = props.items.map(function (item) {
    var imageSource = "/retrieve?fileName=".concat(item.name);
    return /*#__PURE__*/React.createElement("div", {
      key: item._id,
      className: "item-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "itemImg"
    }, /*#__PURE__*/React.createElement("img", {
      src: imageSource,
      alt: "item preview",
      className: "itemFace"
    })), /*#__PURE__*/React.createElement("div", {
      className: "itemInfo"
    }, /*#__PURE__*/React.createElement("h2", null, item.name), /*#__PURE__*/React.createElement("h3", {
      className: "price"
    }, "$", item.price)), /*#__PURE__*/React.createElement("div", {
      "data-value": item._id,
      csrf: props.csrf
    }, /*#__PURE__*/React.createElement("button", {
      className: "item-button",
      onClick: addToCart
    }, " Add To Cart ")));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "itemList"
  }, itemNodes);
};

var addToCart = function addToCart() {
  cartItemsId.push(event.target.parentNode.getAttribute("data-value"));
  sendAjax('POST', '/addToCart', {
    cartItemsId: cartItemsId,
    csrf: event.target.parentNode.getAttribute("csrf")
  }, function (result) {
    cartItemsId = result.itemsInCart;
  });
  document.querySelector("#cartButton").innerHTML = "Cart: ".concat(cartItemsId.length);
};

var loadItemsFromServer = function loadItemsFromServer(csrf) {
  sendAjax('GET', '/getItems', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ShopPage, {
      left: /*#__PURE__*/React.createElement(ItemList, {
        items: data.items,
        csrf: csrf
      })
    }), document.querySelector("#container"));
  });
  return false;
};

var ShopPage = function ShopPage(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "shopWrapper"
  }, props.left);
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ShopPage, {
    left: /*#__PURE__*/React.createElement(ItemList, {
      items: [],
      csrf: csrf
    })
  }), document.querySelector("#container"));
  loadItemsFromServer(csrf);
  document.querySelector("#cartButton").innerHTML = "Cart: ".concat(cartItemsId.length);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
    sendAjax('GET', '/getCart', null, function (result) {
      cartItemsId = result.itemsInCart;
      document.querySelector("#cartButton").innerHTML = "Cart: ".concat(cartItemsId.length);
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
