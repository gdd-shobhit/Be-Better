"use strict";

var _react = require("react");

var _this = void 0;

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var handleUpload = function handleUpload(e) {
  e.preventDefault();
  sendAjax('POST', $("#uploadForm").attr("action"), $("#uploadForm").serialize(), function () {//loadItemsFromServer();
  });
  return false;
};

var handleDeleteItem = function handleDeleteItem(e) {
  e.preventDefault();
  sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {
    console.log("here");
  });
  return false;
};

var DeleteItemForm = function DeleteItemForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "deleteForm",
    onSubmit: handleDeleteItem,
    action: "/deleteItem",
    method: "DELETE"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "fileName"
  }, "Delete Product By Name: "), /*#__PURE__*/React.createElement("input", {
    name: "fileName",
    type: "text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Delete!"
  }));
};

var state = {
  // Initially, no file is selected
  selectedFile: null
}; // On file select (from the pop up)

(function (event) {
  // Update the state
  _this.setState({
    selectedFile: event.target.files[0]
  });
}), _readOnlyError("onFileChange");

var onFileChange = function onFileChange(e) {
  e.preventDefault();
};

var UploadItemForm = function UploadItemForm(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
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
    onChange: onFileChange,
    name: "sampleFile"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Upload!"
  })));
};

var setupItemUpload = function setupItemUpload(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(UploadItemForm, {
    csrf: csrf
  }), document.querySelector("#uploadFormSection"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DeleteItemForm, {
    csrf: csrf
  }), document.querySelector("#deleteFormSection"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    console.log(result.csrfToken);
    setupItemUpload(result.csrfToken);
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
