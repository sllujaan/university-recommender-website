import { loadHeaderFooter } from "../util/util.js";
import {
    URL_REGISTER_NAME, URL_REGISTER_EMAIL, URL_PROGRAM,
    URL_COUNTRY, URL_CITY, URL_USER_REGISTER
} from "../urls/urlResolver.js";

/*register form validation variables*/
var NAME_VALID = false;
var EMAIL_VALID = false;
var PASSOWRD_VALID = false;

/*dom elements*/
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
var stage1Container = document.querySelectorAll(".stage1-container")[0];
var stage2Container = document.querySelectorAll(".stage2-container")[0];
var stageUniDetails = document.querySelectorAll(".stage-uni-details")[0];
var stageUniPrograms = document.querySelectorAll(".stage-uni-programs")[0];
var stageUniDetailsTab = document.querySelectorAll(".stage-uni-details-tab")[0];
var stageUniProgramsTab = document.querySelectorAll(".stage-uni-programs-tab")[0];
var lineSeparator = document.querySelectorAll(".line-separator")[0];


/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);





/**
 * validate all form fields are valid
 * @param {string} fieldName 
 * @param {string} value 
 */
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


/**
 * validate input fields (i.e. name or password) from database.
 * it tells if name or passowrds already exist in the database.
 * @param {Event} e 
 * @param {string} url 
 */
const validateInputFieldDB = async (e, url) => {
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
            case 409:   //conflict, user name exists in the database.
                setFormValidityVars(fieldName, false);
                displayConflictError(errElement , e.target.value, fieldName);
                break;
            case 200:   //ok user name does not exit in the database.
                setFormValidityVars(fieldName, true);
                displayInputOK(errElement, e.target.value);
                break;
            default:    //other response from backend server
                setFormValidityVars(fieldName, false);
                displayServerError();
                break;
        }
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        setFormValidityVars(fieldName, false);
        displayServerError();
        console.error(err);
    })
}

/**
 * displays input field error.
 * @param {Element} errElement 
 * @param {string} text 
 * @param {string} textPrefix 
 */
const displayConflictError = (errElement, text, textPrefix) => {
    errElement.classList.remove("success-text");
    errElement.classList.add("error-text");
    errElement.innerHTML = textPrefix + " &quot;" + text + "&quot; already exists";
}

/**
 * displays input is OK.
 * @param {Element} errElement 
 * @param {string} text 
 */
const displayInputOK = (errElement, text) => {
    errElement.classList.remove("error-text");
    errElement.classList.add("success-text");
    errElement.innerHTML = text + "&nbsp;&#10004;";
}

/**
 * displays server error.
 */
const displayServerError = () => {
    var errElements = document.querySelectorAll(".error-text");
    errElements.forEach(errElment => {
        console.log(errElment);
        errElment.setAttribute("style", "color: red;");
        errElment.innerHTML = "Server Error!";
    });

    alert("net::ERR_CONNECTION_REFUSED\n\
    1. Make sure that back-end server is running properly.\n\
    2. Make sure Database service is also running properly.");
}



/**
 * disable inputs on form submition
 * @param {Event} e 
 */
const disableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: none; user-select: none;");
    submitInput.setAttribute("style", "background-color: #d1d1d1; color: gray; cursor: default;");
    submitInput.value = "Signing In...";
}

/**
 * Enable inputs if there is any error while submitting form.
 * @param {Event} e 
 */
const EnableInputs = (e) => {
    e.target.setAttribute("style", "pointer-events: all; user-select: auto;");
    submitInput.setAttribute("style", "background-color: #5f0f4e; color: white; cursor: pointer;");
    submitInput.value = "Sign in";
}

/**
 * retrieves programs from database.
 */
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

/**
 * retrieves countries from database.
 */
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

/**
 * retrieves cities from database.
 */
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

/**
 * initialize programs in the register form.
 * @param {JSON} programs 
 */
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

/**
 * initialize countries in the register form.
 * @param {JSON} Countries 
 */
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

/**
 * initialize cities in the register form.
 * @param {JSON} cities 
 */
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



/**
 * submits the form data to backend server.
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
        if(res.status !== 200) {EnableInputs(e);alert("Error while serving the request!")}
        else {window.location.href = "../user/user.html";}
    })
    .catch(err => {
        EnableInputs(e);
        console.error(err);
    })
}

/**
 * handles form submission process.
 * @param {Event} e 
 */
const handleOnSubmit = (e) => {
    //user name field is not valid.
    if(!NAME_VALID) {
        userName.focus();
        return;
    }
    //user email field is not valid.
    if(!EMAIL_VALID) {
        userEmail.focus();
        return;
    }

    //user passwords fields do not match.
    if(!PASSOWRD_VALID) {
        userRepassword.focus();
        return;
    }

    //get form data
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

    //prepare request data to send.
    const requestData = name+email+password+countryID+cityID+programID+admissionDate+sEdu+hEdu+etm+budget;
    disableInputs(e);                  
    sumbitForm(e, URL_USER_REGISTER, requestData);
}





const goToProgramsStage = () => {

    stageUniDetails.setAttribute("style", "display: none;");
    stageUniPrograms.setAttribute("style", "display: block;");

    stageUniDetailsTab.setAttribute("style", "color: #37a000;");
    stageUniProgramsTab.setAttribute("style", "color: #37a000;");

    lineSeparator.setAttribute("style", "border-color: #37a000; background-color: #37a000;");
}

const goToUniversityStage = () => {
    stageUniPrograms.setAttribute("style", "display: none;");
    stageUniDetails.setAttribute("style", "display: block;");

    stageUniDetailsTab.setAttribute("style", "color: #37a000;");
    stageUniProgramsTab.setAttribute("style", "color: black;");

    lineSeparator.setAttribute("style", "border-color: lightgray; background-color: inherit;");
}


/*fired when user click submit button or hits enter key.*/
document.forms[0].addEventListener("submit", e => {
    e.preventDefault();
    console.log("forms0");
    //handleOnSubmit(e);
    goToProgramsStage();
});

document.addEventListener("click", e => {
    console.log(e.target);
});


// document.forms[1].addEventListener("submit", e => {
//     e.preventDefault();
//     console.log("forms0");
//     //handleOnSubmit(e);
// });


goToProgramsStage();


// setTimeout(() => {
//     goToProgramsStage();
// }, 2000);


// setTimeout(() => {
//     goToUniversityStage();
// }, 3000);




