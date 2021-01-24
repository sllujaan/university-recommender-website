import { loadHeaderFooter } from "../util/util.js";
import {
    URL_REGISTER_NAME, URL_REGISTER_EMAIL, URL_PROGRAM,
    URL_COUNTRY, URL_CITY
} from "../urls/urlResolver.js";



var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var submitInput = document.querySelectorAll('#auth-submit')[0];
var errorText = document.querySelectorAll('.error-text')[0];
var inputs = document.querySelectorAll('input');
var userProram = document.getElementById("user-program");
var userCountry = document.getElementById("user-country");
var userCity = document.getElementById("user-city");
var userPassword = document.getElementById("user-password");
var userRepassword = document.getElementById("user-repassword");

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

    alert("net::ERR_CONNECTION_REFUSED\n\
    1. Make sure that back-end server is running properly.\n\
    2. Make sure Database service is also running properly.");
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


const getProgramsDB = () => {
    fetch(URL_PROGRAM)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Programs from Database!");}
        else {return res.json();}
    })
    .then(programs => {
        initProgramInForm(programs);
    })
    .catch(err => {
        displayServerError();
        console.error(err);
    })
}

const getCountriesDB = () => {
    fetch(URL_COUNTRY)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Countries from Database!");}
        else {return res.json();}
    })
    .then(programs => {
        initCountryInForm(programs);
    })
    .catch(err => {
        displayServerError();
        console.error(err);
    })
}

const getCitiesDB = (CountryID) => {
    const URL = URL_CITY + "?id=" + CountryID;
    fetch(URL)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Cities from Database!");}
        else {return res.json();}
    })
    .then(programs => {
        initCityInForm(programs);
    })
    .catch(err => {
        displayServerError();
        console.error(err);
    })
}

const initProgramInForm = (programs) => {
    console.log(programs);
    programs.forEach(program => {
        var option = document.createElement("option");
        option.setAttribute("value", program.Program_ID);
        option.innerText = program.Name;
        userProram.append(option);
    })
    userProram.disabled = false;
}

const initCountryInForm = (Countries) => {
    console.log(Countries);
    Countries.forEach(Country => {
        var option = document.createElement("option");
        option.setAttribute("value", Country.Country_ID);
        option.innerText = Country.Name;
        userCountry.append(option);
    })
    userCountry.disabled = false;
}

const initCityInForm = (cities) => {
    console.log(cities);
    cities.forEach(city => {
        var option = document.createElement("option");
        option.setAttribute("value", city.City_ID);
        option.innerText = city.Name;
        userCity.append(option);
    })
    userCity.disabled = false;
}


getProgramsDB();
getCountriesDB();



userCountry.addEventListener("change", e => {
    console.log(e.target.value);

    getCitiesDB(e.target.value);
})

userRepassword.addEventListener("change", e => {
    const repassErrorEl = document.getElementById("repassword-error");
    const password = userPassword.value;
    const repassword = e.target.value;

    if(password !== repassword) {
        repassErrorEl.innerHTML = "Passwords do not match!";
        console.log("passwords are not the same.");
    }
    else {
        repassErrorEl.innerHTML = "*";
        repassErrorEl.style.setProperty("color", "#37a000");
    }

})