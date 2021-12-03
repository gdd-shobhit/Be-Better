const handleLogin = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or Password empty");
        return false;
    }

    console.log("here"+ $("loginForm").serialize());
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(),redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Password do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

const handlePassChange = (e) => {
    e.preventDefault();

    if($("#oldPass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '' || $('#user').val() == '') {
        handleError("All fields are required");
        return false;
    }

    if($("#newPass").val() !== $("#newPass2").val()) {
        handleError("Password do not match");
        return false;
    }

    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);

    return false;
};


const LoginWindow = (props) => {
    return (
   
        <form id="loginForm" name="loginForm"
        onSubmit={handleLogin}
        action="/login"
        method="POST"
        className="mainForm"
        >
            
        <label htmlFor="user">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <input className="formSubmit" type="submit" value="Sign In"/>
        <input type="hidden" name="_csrf" value={props.csrf} />

        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm" 
        name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
        className="mainForm"
        >

        <label htmlFor="user">Username*: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Password*: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <label htmlFor="pass2">Password*: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password" />
        <label htmlFor="pass3">Admin Pass: </label>
        <input id="pass3" type="password" name="pass3" placeholder="admin pass(optional)" />    
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up" />
      
        </form>
       
    );
};

const ChangePasswordWindow = (props) => {
    return (
        <form id="changePassForm" 
        name="changePassForm"
        onSubmit={handlePassChange}
        action="/changePassword"
        method="POST"
        className="mainForm"
        >

        <label htmlFor="user">Username*: </label>
        <input id="user" type="text" name="user" placeholder="username"/>
        <label htmlFor="oldPass">Old Password*: </label>
        <input id="oldPass" type="password" name="oldPass" placeholder="Old Password"/>
        <label htmlFor="newPass">New Password*: </label>
        <input id="newPass" type="password" name="newPass" placeholder="New Password" />
        <label htmlFor="newPass2">New Password </label>
        <input id="newPass2" type="password" name="newPass2" placeholder="Retype Password" />    
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Change Password" />
      
        </form>
       
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
                <LoginWindow csrf={csrf} /> ,
        document.querySelector("#shopLogin")
    );
};

const createSignupWindow = (csrf) =>{
    ReactDOM.render(
                <SignupWindow csrf={csrf} />,
        document.querySelector("#shopLogin")
    );
};


const createChangePasswordWindow = (csrf) =>{
    
    ReactDOM.render(
                <ChangePasswordWindow csrf={csrf} />,
        document.querySelector("#shopLogin")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const changePassButton = document.querySelector("#changePassButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    changePassButton.addEventListener("click", (e) => {
        e.preventDefault();
        createChangePasswordWindow(csrf);
        return false;
    });

    createLoginWindow(csrf);
};

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result)=>{
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});