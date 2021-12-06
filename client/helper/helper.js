const handleError = (message) => {
    $("#errorMessage").text(message);
};

const redirect = (response) => {
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {

    if(type=="POST")
    {
        $.ajaxSetup({
            beforeSend: function(xhr) {
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
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
            var messageObj = JSON.parse(xhr.responseText);
            console.log(messageObj);
        },
    });
};

