"use strict";

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
      className: "item"
    }, /*#__PURE__*/React.createElement("img", {
      src: imageSource,
      alt: "item preview",
      className: "itemFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "itemName"
    }, " Name: ", item.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "itemPrice"
    }, " Price: ", item.price, " "), /*#__PURE__*/React.createElement("button", {
      className: "addButton"
    }, " Add To Cart "));
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

var handleUpload = function handleUpload(e) {
  e.preventDefault();
  sendAjax('POST', $("#uploadForm").attr("action"), $("#uploadForm").serialize(), function () {// loadItemsFromServer();
  });
  return false;
};

var UploadItemForm = function UploadItemForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "uploadForm",
    onSubmit: handleUpload,
    action: "/upload",
    method: "POST",
    encType: "multipart/form-data"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "productName"
  }, "Product Name: "), /*#__PURE__*/React.createElement("input", {
    id: "productName",
    type: "text",
    name: "productName",
    placeholder: "Product Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "price"
  }, "Price: "), /*#__PURE__*/React.createElement("input", {
    id: "price",
    type: "text",
    name: "price",
    placeholder: "Price"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "productImage"
  }, "Product Image"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    name: "sampleFile"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Upload!"
  }));
};

var setupItemUpload = function setupItemUpload(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(UploadItemForm, {
    csrf: csrf
  }), document.querySelector("#uploadFormSection"));
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
    setup(result.csrfToken); // setupItemUpload(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
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
