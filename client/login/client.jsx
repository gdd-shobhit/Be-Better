const handleLogin = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or Password empty");
        return false;
    }

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

const Container = () =>{
    return(
        <div className="shopContainer">
        </div>
    );
}

const Wrapper = () =>{
    return(
        <div className="shopWrapper">
        </div>
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

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");


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