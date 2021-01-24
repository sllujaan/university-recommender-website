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
    if(e.target.value !== "jake") {
        displayNameConflictError(e);
    }

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
        if(res.status === 409) displayNameConflictError(e);
        else displayServerError();
    })
    .catch(err => {
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















const displayNameConflictError = (e) => {
    var errElement = document.getElementById("name-error");
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
    })
    console.log(errElements);
}

const displayNameOK = () => {
    var errElements = document.querySelectorAll("error-text");
    console.log(errElements);
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