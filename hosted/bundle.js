"use strict";

var ItemInCart = function ItemInCart(props) {
  var imageSource = "/retrieve?fileName=".concat(props.item.name);
  return /*#__PURE__*/React.createElement("div", {
    className: "cart-item-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: imageSource
  }), /*#__PURE__*/React.createElement("div", {
    className: "about"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, props.item.name), /*#__PURE__*/React.createElement("h3", {
    className: "subtitle"
  }, "Qty: 1")), /*#__PURE__*/React.createElement("div", {
    className: "prices"
  }, /*#__PURE__*/React.createElement("div", {
    className: "amount"
  }, "$", props.item.price)));
};

var handleAddToCart = function handleAddToCart(item) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ItemInCart, {
    item: item
  }), document.querySelector("#CartItems"));
};

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
    }, "$", item.price)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      className: "item-button",
      onClick: handleAddToCart
    }, " Add To Cart ")));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "itemList"
  }, itemNodes);
};

var loadItemsFromServer = function loadItemsFromServer() {
  sendAjax('GET', '/getItems', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ItemList, {
      items: data.items
    }), document.querySelector("#itemsDiv"));
  });
  return false;
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ItemList, {
    items: [],
    csrf: csrf
  }), document.querySelector("#itemsDiv"));
  loadItemsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    console.log(result.csrfToken);
    setup(result.csrfToken);
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
