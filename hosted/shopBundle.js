"use strict";

var handleDeleteItem = function handleDeleteItem(e) {
  e.preventDefault();
  sendAjax('DELETE', $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {});
  return false;
};

var DeleteItemForm = function DeleteItemForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "deleteForm",
    onSubmit: handleDeleteItem,
    action: "/deleteItem",
    className: "mainForm",
    method: "DELETE"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "fileName"
  }, "Delete Product By Name: "), /*#__PURE__*/React.createElement("input", {
    name: "fileName",
    type: "text",
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "generalButtons",
    type: "submit",
    value: "Delete!"
  }));
};

var setupItemUpload = function setupItemUpload(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DeleteItemForm, {
    csrf: csrf
  }), document.querySelector("#deleteFormSection"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupItemUpload(result.csrfToken);
    document.querySelector("#csrf").value = result.csrfToken;
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
