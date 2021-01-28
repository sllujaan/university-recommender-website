import { loadHeaderFooter } from "../util/util.js";
import {
    URL_REGISTER_NAME, URL_REGISTER_EMAIL, URL_PROGRAM,
    URL_COUNTRY, URL_CITY, URL_USER_REGISTER
} from "../urls/urlResolver.js";


var NAME_VALID = false;
var EMAIL_VALID = false;
var PASSOWRD_VALID = false;

var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];

var userName = document.getElementById("user-name");
var userEmail = document.getElementById("user-email");
var userPassword = document.getElementById("user-password");
var userRepassword = document.getElementById("user-repassword");
var userCountry = document.getElementById("user-country");
var userCity = document.getElementById("user-city");
var userProram = document.getElementById("user-program");
var userAddmissionDate= document.getElementById("user-addmission-date");
var userHeducationPct = document.getElementById("user-h_education_pct");
var userSeducationPct = document.getElementById("user-s_education_pct");
var userEtmPct = document.getElementById("user-etm_pct");
var userBudgetUS$ = document.getElementById("user_budget_US_$");
var submitInput = document.getElementById("auth-submit");

loadHeaderFooter(headerContainer, footerContainer);



// var name = inputs[0];
// var email = inputs[1];

userName.addEventListener("change", e => {
    //nameIsValidDB(e);
    validateFieldDB(e, URL_REGISTER_NAME);
})

userEmail.addEventListener("change", e => {
    validateFieldDB(e, URL_REGISTER_EMAIL);
})


const setFormValidityVars = (fieldName, value) => {
    switch (fieldName) {
        case "name":
            NAME_VALID = value;
            break;
        case "email":
            EMAIL_VALID = value;
            break;
        default:
            break;
    }
}




const validateFieldDB = async (e, url) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    var errElement = e.target.parentElement.nextElementSibling;
    const requestData = fieldName + "=" + fieldValue;

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        switch (res.status) {
            case 409:
                setFormValidityVars(fieldName, false);
                displayConflictError(errElement , e.target.value, fieldName);
                break;
            case 200:
                setFormValidityVars(fieldName, true);
                displayInputOK(errElement, e.target.value);
                break;
            default:
                setFormValidityVars(fieldName, false);
                displayServerError();
                break;
        }
    })
    .catch(err => {
        setFormValidityVars(fieldName, false);
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






const disableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: none; user-select: none;");
    submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
    submitInput.value = "Signing In...";
}

const EnableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: all; user-select: auto;");
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
    userCity.innerHTML = null;
    
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
    
    userCity.disabled = true;
    getCitiesDB(e.target.value);
})

userRepassword.addEventListener("change", e => {
    const repassErrorEl = document.getElementById("repassword-error");
    const password = userPassword.value;
    const repassword = e.target.value;

    if(password !== repassword) {
        PASSOWRD_VALID = false;
        repassErrorEl.setAttribute("style", "color: red;");
        repassErrorEl.innerHTML = "Passwords do not match!";
        console.log("passwords are not the same.");
    }
    else {
        PASSOWRD_VALID = true;
        repassErrorEl.innerHTML = "*";
        repassErrorEl.style.setProperty("color", "#37a000");
    }

})






const sumbitForm = (e, URL, requestData) => {
    fetch(URL, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        if(res.status !== 200) {EnableInputs(e);alert("Error while serving the request!")}
        else {window.location.href = "../user/user.html";}
    })
    .catch(err => {
        EnableInputs(e);
        console.error(err);
    })
}





const handleOnSubmit = (e) => {
    if(!NAME_VALID) {
        userName.focus();
        return;
    }
    
    if(!EMAIL_VALID) {
        userEmail.focus();
        return;
    }

    if(!PASSOWRD_VALID) {
        userRepassword.focus();
        return;
    }

    const name = `name=${userName.value}&`;
    const email = `email=${userEmail.value}&`;
    const password = `password=${userPassword.value}&`;
    const countryID = `country_id=${userCountry.value}&`;
    const cityID = `city_id=${userCity.value}&`;
    const programID = `program_id=${userProram.value}&`;
    const admissionDate = `start_admission_date=${userAddmissionDate.value}&`;
    const sEdu = `s_education_pct=${userSeducationPct.value/100}&`;
    const hEdu = `h_education_pct=${userHeducationPct.value/100}&`;
    const etm = `etm_pct=${userEtmPct.value/100}&`;
    const budget = `budget_us_%24=${userBudgetUS$.value}`;


    const requestData = name+email+password+countryID+cityID+programID+admissionDate+sEdu+hEdu+etm+budget;

    
    disableInputs(e);                  
    sumbitForm(e, URL_USER_REGISTER, requestData);

    // setTimeout(() => {
    //     EnableInputs(e);
    // }, 2000);
}