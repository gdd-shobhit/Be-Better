"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoLevel").val() == '') {
    handleError("RAWR! All Fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var handleDelete = function handleDelete(e) {
  e.preventDefault();

  if ($("#domoNameDelete").val() == '') {
    handleError("RAWR! All Fields are required");
    return false;
  }

  sendAjax('DELETE', $('#domoDeleteForm').attr("action"), $("#domoDeleteForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var DomoForm = function DomoForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "domoForm",
    onSubmit: handleDomo,
    name: "domoForm",
    action: "/maker",
    method: "POST",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "domoName",
    type: "text",
    name: "name",
    placeholder: "Domo Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "domoAge",
    type: "text",
    name: "age",
    placeholder: "Domo Age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "level"
  }, "Level: "), /*#__PURE__*/React.createElement("input", {
    id: "domoLevel",
    type: "text",
    name: "level",
    placeholder: "Domo Level"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Make Domo"
  }));
};

var DomoDeleteForm = function DomoDeleteForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "domoDeleteForm",
    onSubmit: handleDelete,
    name: "domoFormDelete",
    action: "/maker",
    method: "DELETE",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "deleteName"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "domoNameDelete",
    type: "text",
    name: "deleteName",
    placeholder: "Domo Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Delete Domo"
  }));
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
    return /*#__PURE__*/React.createElement("div", {
      key: item._id,
      className: "item"
    }, /*#__PURE__*/React.createElement("img", {
      src: item.image,
      alt: "item preview",
      className: "domoFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "itemName"
    }, " Name: ", item.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "itemPrice"
    }, " Price: ", item.price, " "), /*#__PURE__*/React.createElement("button", {
      className: "addButton"
    }, " Add To Cart "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "domoList"
  }, domoNodes);
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: csrf
  }), document.querySelector("#makeDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoDeleteForm, {
    csrf: csrf
  }), document.querySelector("#deleteDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ItemList, {
    items: []
  }), document.querySelector("#items"));
  loadDomosFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
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
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
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
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
