import { loadHeaderFooter } from "../util/util.js";
import { URL_USER_LOGIN } from "../urls/urlResolver.js";


/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userName = document.getElementById("user-name");
var userPassword = document.getElementById("user-password");
var errorElement = document.getElementById("name-password-error");
var submitInput = document.getElementById("auth-submit");


/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


/**
 * get token value from the url
 */
const getURLToken = () => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const token = url.searchParams.get("token");
    return token;
}


/**
 * handle user navigation on login success!
 */
const handleUserNavigation = () => {
    switch (getURLToken()) {
        case "usersAuth":
            window.location.href = "../userAuth/userAuth.html";
            break;
        default:
            window.location.href = "../user/user.html";
            break;
    }
}

/**
 * display input errors
 * @param {Element} errElement 
 * @param {string} text 
 */
const displayInputsError = (errElement, text) => {
    errElement.classList.remove("success-text");
    errElement.classList.add("error-text");
    errElement.innerHTML = text;
}

/**
 * display server error
 */
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

/**
 * disable inputs
 * used when user clicks on login button.
 * @param {Event} e 
 */
const disableInputs = (e) => {
    errorElement.innerHTML = "*";
    e.target.setAttribute("style", "pointer-events: none; user-select: none;");
    submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
    submitInput.value = "Signing In...";
}

/**
 * enable inputs
 * used when there is an error while login.
 * @param {Event} e 
 */
const EnableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: all; user-select: auto;");
    submitInput.removeAttribute("style");
    submitInput.value = "Sign in";
}


/**
 * submit form data.
 * used when clicks login button.
 * user name and password are sent to backend server to validate the user.
 * @param {Event} e 
 * @param {string} URL 
 * @param {string} requestData 
 */
const sumbitForm = (e, URL, requestData) => {
    fetch(URL, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        switch (res.status) {
            case 401:   //unauthorized
                EnableInputs(e);
                displayInputsError(errorElement, "Name or Password are Invalid!");
                break;
            case 200:   //login success
                //convert response text into json format. it returns another promise
                //which is hand
                return res.json(); 
            default:    //login error
                EnableInputs(e);
                alert("Error while serving the request!");
                displayServerError();
                break;
        }
    })
    .then(data => {
        console.log(data);
        if(data) {
            saveUserData(data.session_id, data.user_id, userName.value);
            handleUserNavigation();
        }
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


const SESSION_ID = "session_id";
const USER_ID = "user_id";
const USER_NAME = "user_name";
const USER_LOGIN = "user_login";


const saveUserData = (sessionId, userId, userName) => {
    localStorage.setItem(SESSION_ID, sessionId);
    localStorage.setItem(USER_ID, userId);
    localStorage.setItem(USER_NAME, userName);
    localStorage.setItem(USER_LOGIN, true);
}

const removeUserData = () => {
    localStorage.removeItem(SESSION_ID);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(USER_LOGIN);
}


document.forms[0].addEventListener("submit", e => {
    e.preventDefault();
    handleOnSubmit(e);
})


removeUserData();
