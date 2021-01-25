import { loadHeaderFooter } from "../util/util.js";
import { URL_USER_LOGIN } from "../urls/urlResolver.js";


var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userName = document.getElementById("user-name");
var userPassword = document.getElementById("user-password");
var errorElement = document.getElementById("name-password-error");
var submitInput = document.getElementById("auth-submit");

loadHeaderFooter(headerContainer, footerContainer);




const displayInputsError = (errElement, text) => {
    errElement.classList.remove("success-text");
    errElement.classList.add("error-text");
    errElement.innerHTML = text;
}


const displayServerError = () => {
    var errElements = document.querySelectorAll(".error-text");
    errElements.forEach(errElment => {
        console.log(errElment);
        errElment.innerHTML = "Server Error!";
    })

    alert("net::ERR_CONNECTION_REFUSED\n\
    1. Make sure that back-end server is running properly.\n\
    2. Make sure Database service is also running properly.");
}


const disableInputs = (e) => {
    errorElement.innerHTML = "*";
    e.target.setAttribute("style", "pointer-events: none; user-select: none;");
    submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
    submitInput.value = "Signing In...";
}

const EnableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: all; user-select: auto;");
    submitInput.setAttribute("style", "background-color: #5f0f4e; color: white; cursor: pointer;");
    submitInput.value = "Sign in";
}



const sumbitForm = (e, URL, requestData) => {
    fetch(URL, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        console.log(res.status);
        switch (res.status) {
            case 401:
                EnableInputs(e);
                displayInputsError(errorElement, "Name or Password are Invalid!");
                break;
            case 200:
                return res.json();
            default:
                EnableInputs(e);
                alert("Error while serving the request!");
                break;
        }
    })
    .then(data => {
        console.log(data);
        if(data) saveUserData(data.session_id, data.user_id, userName.value);
    })
    .catch(err => {
        EnableInputs(e);
        displayServerError();
        console.error(err);
    })
}


const handleOnSubmit = (e) => {
    const name = `name=${userName.value}&`;
    const password = `password=${userPassword.value}`;
    const requestData = name + password;

    disableInputs(e);                  
    sumbitForm(e, URL_USER_LOGIN, requestData);

}


const saveUserData = (sessionId, userId, userName) => {
    localStorage.setItem("session_id", sessionId);
    localStorage.setItem("user_id", userId);
    localStorage.setItem("user_name", userName);
}


document.forms[0].addEventListener("submit", e => {
    e.preventDefault();
    handleOnSubmit(e);
})

