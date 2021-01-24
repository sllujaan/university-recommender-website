import { loadHeaderFooter } from "../util/util.js";
import { REGISTER_NAME } from "../urls/urlResolver.js";




var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var submitInput = document.querySelectorAll('#auth-submit')[0];
var errorText = document.querySelectorAll('.error-text')[0];
var inputs = document.querySelectorAll('input');

var name = inputs[0];
var email = inputs[1];

name.addEventListener("change", e => {

    nameIsValidDB(e);
})

email.addEventListener("change", e => {
    if(e.target.value !== "jake") {
        displayEmailConflictError(e);
    }
})


const nameIsValidDB = async (e) => {
    const reqeustData = "name=" + e.target.value;
    console.log(reqeustData);

    fetch(REGISTER_NAME, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: reqeustData // body data type must match "Content-Type" header
    })
    .then(res => {

        switch (res.status) {
            case 409:
                displayConflictError(document.getElementById("name-error"), e.target.value, "Name")
                //displayNameConflictError(e);
                break;
            case 200:
                displayInputOK(document.getElementById("name-error"), e.target.value);
                //displayNameOK(e);
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




// fetch("http://localhost/university-recommender-website-server-api/register/name.php", {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: "name=admin" // body data type must match "Content-Type" header
// })
// .then(res => res.text())
// .then(text => {
//     console.log(text);
// })
// .catch(err => {
//     console.error(err);
// })











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




const displayNameConflictError = (e) => {
    var errElement = document.getElementById("name-error");
    errElement.classList.remove("success-text");
    errElement.classList.add("error-text");
    errElement.innerHTML = "Name &quot;" + e.target.value + "&quot; already exists";
}

const displayEmailConflictError = (e) => {
    var errElement = document.getElementById("email-error");
    errElement.innerHTML = "Email &quot;" + e.target.value + "&quot; already exists";
}

const displayServerError = () => {
    var errElements = document.querySelectorAll(".error-text");
    errElements.forEach(errElment => {
        console.log(errElment);
        errElment.innerHTML = "Server Error!";
    })

    alert("net::ERR_CONNECTION_REFUSED\nMake sure that back-end server in running properly.");
}



const displayNameOK = (e) => {
    var errElement = document.getElementById("name-error");
    errElement.classList.remove("error-text");
    errElement.classList.add("success-text");
    errElement.innerHTML = e.target.value + "&nbsp;&#10004;";
}





loadHeaderFooter(headerContainer, footerContainer);

// setTimeout(() => {
//     loadHeaderJS(document);
// }, 2000);

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



const showAuthError = (e) => {
    errorText.innerText = "Invalid User Name or Password!";
}


const disableInputs = (e) => {


    // inputs.forEach(input => {

    //     input.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
    //     input.disabled = true;
    //     if(input.getAttribute("type") === "submit") {
    //         input.value = "Signing In...";
    //         errorText.innerHTML = "&nbsp;";
    //     }
    
    // })


    e.target.setAttribute("style", "pointer-events: none;");
    submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
    submitInput.value = "Signing In...";
    errorText.innerHTML = "&nbsp;";

    
    // submitInput.value = "Signing in ...";
    // submitInput.disabled = true;
    // submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
}

const EnableInputs = (e) => {


    // inputs.forEach(input => {

    //     input.setAttribute("style", "background-color: white; color: black;");
    //     input.disabled = false;
    //     if(input.getAttribute("type") === "submit") {
    //         input.setAttribute("style", "cursor: pointer;");
    //         input.value = "Sign In";
    //     }
    
    // })

    e.target.setAttribute("style", "pointer-events: all;");
    submitInput.setAttribute("style", "background-color: #5f0f4e; color: white; cursor: pointer;");
    submitInput.value = "Sign in";

    // submitInput.value = "Sign in";
    // submitInput.disabled = false;
    // submitInput.setAttribute("style", "background-color: #5f0f4e; color: white; cursor: pointer;");
}


const disableElement = (elment) => {
    elment.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
}