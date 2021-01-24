import { loadHeaderFooter } from "../util/util.js";
import { URL_REGISTER_NAME, URL_REGISTER_EMAIL } from "../urls/urlResolver.js";



var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var submitInput = document.querySelectorAll('#auth-submit')[0];
var errorText = document.querySelectorAll('.error-text')[0];
var inputs = document.querySelectorAll('input');
loadHeaderFooter(headerContainer, footerContainer);


var name = inputs[0];
var email = inputs[1];

name.addEventListener("change", e => {
    //nameIsValidDB(e);
    validateFieldDB(e, URL_REGISTER_NAME);
})

email.addEventListener("change", e => {
    validateFieldDB(e, URL_REGISTER_EMAIL);
})




const validateFieldDB = async (e, url) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    var errElement = e.target.parentElement.nextElementSibling;
    const reqeustData = fieldName + "=" + fieldValue;
    console.log(reqeustData);

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: reqeustData // body data type must match "Content-Type" header
    })
    .then(res => {
        switch (res.status) {
            case 409:
                displayConflictError(errElement , e.target.value, fieldName);
                break;
            case 200:
                displayInputOK(errElement, e.target.value);
                break;
            default:
                displayServerError();
                break;
        }
    })
    .catch(err => {
        displayServerError();
        console.error(err);
    })
}




const displayConflictError = (errElement, text, textPrefix) => {
    errElement.classList.remove("success-text");
    errElement.classList.add("error-text");
    errElement.innerHTML = textPrefix + " &quot;" + text + "&quot; already exists";
}

const displayInputOK = (errElement, text) => {
    errElement.classList.remove("error-text");
    errElement.classList.add("success-text");
    errElement.innerHTML = text + "&nbsp;&#10004;";
}


const displayServerError = () => {
    var errElements = document.querySelectorAll(".error-text");
    errElements.forEach(errElment => {
        console.log(errElment);
        errElment.innerHTML = "Server Error!";
    })

    alert("net::ERR_CONNECTION_REFUSED\nMake sure that back-end server in running properly.");
}



document.forms[0].addEventListener("submit", e => {
    e.preventDefault();
    handleOnSubmit(e);
    
})


const handleOnSubmit = (e) => {
    console.log("submit it..");
    console.log(e.target);

    disableInputs(e);

    setTimeout(() => {
        showAuthError(e);
        EnableInputs(e);
    }, 2000);
}



const disableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: none;");
    submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
    submitInput.value = "Signing In...";
    errorText.innerHTML = "&nbsp;";
}

const EnableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: all;");
    submitInput.setAttribute("style", "background-color: #5f0f4e; color: white; cursor: pointer;");
    submitInput.value = "Sign in";
}
