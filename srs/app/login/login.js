import {
    loadHeaderFooter
} from "../util/util.js";

var headerContainer = document.querySelectorAll(".header-container")[0];
var footerContainer = document.querySelectorAll(".footer-container")[0];
var submitInput = document.querySelectorAll('#auth-submit')[0];
var errorText = document.querySelectorAll('.error-text')[0];
var inputs = document.querySelectorAll('input');
console.log(inputs);





loadHeaderFooter(headerContainer, footerContainer);



document.forms[0].addEventListener("submit", e => {
    e.preventDefault();
    handleOnSubmit(e);
    
})


const handleOnSubmit = (e) => {
    console.log("submit it..");

    disableInputs();

    setTimeout(() => {
        showAuthError();
        EnableInputs();
    }, 2000);
}



const showAuthError = () => {
    errorText.innerText = "Invalid User Name or Password!";
}

const disableInputs = () => {


    inputs.forEach(input => {

        input.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
        input.disabled = true;
        if(input.getAttribute("type") === "submit") {
            input.value = "Signing In...";
            errorText.innerHTML = "&nbsp;";
        }
    
    })

    
    // submitInput.value = "Signing in ...";
    // submitInput.disabled = true;
    // submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
}

const EnableInputs = () => {


    inputs.forEach(input => {

        input.setAttribute("style", "background-color: white; color: black;");
        input.disabled = false;
        if(input.getAttribute("type") === "submit") {
            input.setAttribute("style", "cursor: pointer;");
            input.value = "Sign In";
        }
    
    })

    // submitInput.value = "Sign in";
    // submitInput.disabled = false;
    // submitInput.setAttribute("style", "background-color: #5f0f4e; color: white; cursor: pointer;");
}