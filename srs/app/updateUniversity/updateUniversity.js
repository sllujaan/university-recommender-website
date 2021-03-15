import { disableScroll, enableScroll, getUserCredentialsLocalStorage, loadHeaderFooter } from "../util/util.js";
import {
    URL_ADD_UNIVERSITY, URL_UNIVERSITY_DETAILS, URL_ADD_UNIVERSITY_NAME, URL_PROGRAM,
    URL_COUNTRY, URL_CITY, URL_USER_REGISTER
} from "../urls/urlResolver.js";

/*register form validation variables*/
var NAME_VALID = false;
var EMAIL_VALID = false;
var PASSOWRD_VALID = false;
var PROGRAMS = null;
var CHOSEN_PROGRAMS = [];
var UNIVERSITY_DATA = null;
const UPDATE_PROGRAM = 0x0ffd;
const ADD_PROGRAM = 0x0fcc;
var programFormType = ADD_PROGRAM;


var COUNTRY_EVENT = {
    aCOUNTRY_LOADED: false,
    aListener: function(val) {},
    set COUNTRY_LOADED(val) {
      this.aCOUNTRY_LOADED = val;
      this.aListener(val);
    },
    get COUNTRY_LOADED() {
      return this.aCOUNTRY_LOADED;
    },
    registerListener: function(listener) {
      this.aListener = listener;
    }
}

var CITY_EVENT = {
    aCITY_LOADED: false,
    aListener: function(val) {},
    set CITY_LOADED(val) {
      this.aCITY_LOADED = val;
      this.aListener(val);
    },
    get CITY_LOADED() {
      return this.aCITY_LOADED;
    },
    registerListener: function(listener) {
      this.aListener = listener;
    }
}




const UNIVERSITY_DATA_SAMPLE = {
	"session_id": "268db496390eb6a5c1f62103fa90e780",
	"user_id": 1,
	"Name": "punjab university9",
	"Description": "punjab university",
	"Country_ID": 100,
	"City_ID": 10,
	"Admission_Criteria": "punjab university",
	"Start_Admission_Date": "2022-02-01",
	"End_Admission_Date": "2022-02-01",
	"Total_ETM": 500,
	"S_Education_MC_PCT": 1,
	"H_Education_MC_PCT": 1,
	"PCT_MC_ETM": 1, 
	"Phone": "0000",
	"Web_Link": "punjab university",
	"Email": "punjab university",
	"Address": "punjab university",
	"programs": [
		    {"Program_ID": 2, "Description": "saaaaaaaaaaa", "Admission_Fee": 500,  "Registration_Fee": 500, "Security_Fee": 500, "Admission_Processing_Fee": 500, "Enrollment_Fee_Per_Semester": 500, "Tuition_Fee_per_Credit_Hour": 500, "Convocation_Fee": 500, "Fee_Description": "fee description", "MM_PCT": 1, "MM_PN": "CS1"},
		
		    {"Program_ID": 3, "Description": "saaaaaaaaaaa", "Admission_Fee": 0,  "Registration_Fee": 0, "Security_Fee": 500, "Admission_Processing_Fee": 500, "Enrollment_Fee_Per_Semester": 500, "Tuition_Fee_per_Credit_Hour": 500, "Convocation_Fee": 500, "Fee_Description": "fee description", "MM_PCT": 1, "MM_PN": "CS1"}
		]
	
};

const PROGRAM_SAMPLE = {"Program_ID": 2, "Description": "saaaaaaaaaaa", "Admission_Fee": 1,  "Registration_Fee": 1, "Security_Fee": 1, "Admission_Processing_Fee": 1, "Enrollment_Fee_Per_Semester": 1, "Tuition_Fee_per_Credit_Hour": 1, "Convocation_Fee": 1, "Fee_Description": "fee description", "MM_PCT": 1, "MM_PN": "CS1"};


/*dom elements*/
var body = document.getElementsByTagName("body")[0];
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userName = document.getElementById("user-name");
var userEmail = document.getElementById("user-email");
var userPassword = document.getElementById("user-password");
var userRepassword = document.getElementById("user-repassword");

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

/*-----------------------------university form variables------------------------*/
var uniName = document.getElementById("uni-name");
var uniCountry = document.getElementById("uni-country");
var uniCity = document.getElementById("uni-city");
var uniAdmiStartDate = document.getElementById("uni-admi-start-date");
var uniAdmiEndDate = document.getElementById("uni-admi-end-date");
var uniHEduMcPct = document.getElementById("uni-h_edu_mc_pct");
var uniSEduMcPct = document.getElementById("uni-s_edu_mc_pct");
var uniETM = document.getElementById("uni-ETM");
var uniEtmMcPct = document.getElementById("uni-etm_mc_pct");
var universityDescription = document.getElementById("university-description");
var uniMcDescription = document.getElementById("uni-mc_description");
var uniPhone = document.getElementById("uni-phone");
var uniWeb = document.getElementById("uni-web");
var uniEmail = document.getElementById("uni-email");
var uniAddress = document.getElementById("uni-address");

var userCountry = uniCountry;
var userCity = uniCity;
/*----------------------------------------------------------------------------*/


/*-----------------------------program form variables------------------------*/
var programDescription = document.getElementById("program-description");
var programAdmiFee = document.getElementById("program-admi-fee");
var programRegFee = document.getElementById("program-reg-fee");
var programSecurityFee = document.getElementById("program-security-fee");
var programAdmiProcFee = document.getElementById("program-admi-proc-fee");
var programEnrollFee = document.getElementById("program-enroll-fee");
var programTuitionFee = document.getElementById("program-tuition-fee");
var programConvocFee = document.getElementById("program-convoc-fee");
var feeDescription = document.getElementById("program-fee-description");
var programMinMarksPct = document.getElementById("program-min-marks-pct");
var programMinMarkProgramName = document.getElementById("program-min-mark-program-name");
/*-----------------------------------------------------------------------------------------*/

var programContainerWrapper = document.querySelectorAll(".program-container-wrapper")[0];
var choosenProgramsContainer = document.querySelectorAll(".choosen-programs-container")[0];
//var programDescription = document.querySelectorAll(".program-description")[0];
//var feeDescription = document.querySelectorAll(".fee-description")[0];

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
        PROGRAMS = programs;
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
    .then(countries => {
        if(countries) {
            initCountryInForm(countries);
            COUNTRY_EVENT.COUNTRY_LOADED = true;
        }
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
    console.log("getcitiesDB called.");
    const URL = URL_CITY + "?id=" + CountryID;
    fetch(URL)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Cities from Database!");}
        else {return res.json();}
    })
    .then(cities => {
        if(cities) {
            initCityInForm(cities);
            CITY_EVENT.CITY_LOADED = true;
        }
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
    userCity.innerHTML = `<option value="" selected disabled hidden>Select City</option>`;
    
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

    lineSeparator.setAttribute("style", "border-color: #37a000;");
}

const goToUniversityStage = () => {
    stageUniPrograms.setAttribute("style", "display: none;");
    stageUniDetails.setAttribute("style", "display: block;");

    stageUniDetailsTab.setAttribute("style", "color: #37a000;");
    stageUniProgramsTab.setAttribute("style", "color: black;");

    lineSeparator.setAttribute("style", "border-color: lightgray;");
}


/*fired when user selects country.*/
userCountry.addEventListener("change", e => {
    console.log(e.target.value);
    userCity.disabled = true;
    if(e.target.value) getCitiesDB(e.target.value);
});

uniName.addEventListener("change", e => {
    console.log(uniName.value);
    verfiyUniName(e);
});


const verfiyUniName = (e) => {
    validateInputFieldDB(e, URL_ADD_UNIVERSITY_NAME);

}

/*fired when user click submit button or hits enter key.*/
document.forms[0].addEventListener("submit", e => {
    e.preventDefault();
    console.log("forms0");


    if(!verifyUniversityFormInputs()) return;

    const university = handleUniversityFormSubmit();

    // console.log(university);

    // console.log(getFinalUniversityRequestData());

    goToProgramsStage();
});


/*fired when user click submit button or hits enter key.*/
document.forms[1].addEventListener("submit", e => {
    e.preventDefault();

    if(isNoPorgramChosen()) {
        alert("Please choose at-least one program!");
        return;
    }

    console.log(getFinalUniversityRequestData());
    
    const requestData = getFinalUniversityRequestData();

    submitFinalFormData(requestData);

    console.log("final submit.");
});

/*fired when user click submit button or hits enter key.*/
document.forms[2].addEventListener("submit", e => {
    e.preventDefault();
    console.log("forms2");
    console.log(e.target);

    

    if(!verifyProgramFormInputs()) return;

    const program = handleProgramFormSubmit();

    const { Name } = getProgramByID(PROGRAMS, program.Program_ID);


    if(programFormType === ADD_PROGRAM) {
        addNewChosenProgram(program, Name);
    }
    else {  //user is updating the existing program
        if(!updateExistingProgram(program)) {
            alert("Something went wrong while updating the program internally!");
            console.log(CHOSEN_PROGRAMS);
            return;
        }
    }

    hideProgramContainer();
    clearProgramFormFields();

    console.log(CHOSEN_PROGRAMS);

});

document.addEventListener("click", e => {
    const isprogramContainerWrapper = (e.target.classList.contains("program-container-wrapper"));
    const isaddProgramBtn = (e.target.classList.contains("add-program-icon"));
    const isProgramCancel = (e.target.classList.contains("program-cancel"));
    const isbackToUniBtn = (e.target.classList.contains("back-to-uni-btn"));
    const ischoosenProgramInput = (e.target.classList.contains("choosen-program-input"));
    const isChoosenProgramRemove = (e.target.classList.contains("choosen-program-remove"));
    
    const TRUE_VALUE = true;

    switch (TRUE_VALUE) {
        case isProgramCancel:
            hideProgramContainer();
            break;
        case isaddProgramBtn:
            setProgramFormTypeToADD();
            showProgramContainer();
            break;
        case isbackToUniBtn:
            goToUniversityStage();
            break;
        case ischoosenProgramInput:
            updateChoosenProgram(e);
            break;
        case isChoosenProgramRemove:
            removeChoosenProgram(e);
            break;
    
        default:
            break;
    }

    console.log(e.target);
});


const generateNewChoosenProgram = (id, name) => {

    var div = document.createElement("div");
    div.classList.add("form-content", "choosen-program");
    div.setAttribute("id", id);
    div.innerHTML = `
            <input class="choosen-program-input" type="text" name="email" id="${id}" placeholder="${name}" disabled>
            <i class="fas fa-times fa-1x choosen-program-remove" id="${id}"></i>`
    
    return div;
}

const removeChoosenProgram = (e) => {
    const _confirm = confirm("Do You really want to remove the Program?");
    if(_confirm) {
        console.log(e.target.id);
        if(!removeExistingProgramArr(e.target.id)) {
            alert("something went wrong while removing the existing program internally!");
            console.log(CHOSEN_PROGRAMS);
            return;
        }
        e.target.parentElement.remove();
    }

    console.log(CHOSEN_PROGRAMS);
    
}

const updateChoosenProgram = (e) => {
    setProgramFormTypeToUPDATE();
    const program = getProgramByID(CHOSEN_PROGRAMS, e.target.id);

    if(setProgramFormValues(program)) {
        showProgramContainer();
    }
    
}

const setProgramFormValues = (program) => {
    console.log(program);
    if(!program) {
        alert("No Program found!");
        clearProgramFormFields();
        return false;
    }


        // program.Program_ID = userProram.value;
        // program.Description = programDescription.value;
        // program.Admission_Fee = programAdmiFee.value;
        // program.Registration_Fee = programRegFee.value;
        // program.Security_Fee = programSecurityFee.value;
        // program.Admission_Processing_Fee = programAdmiProcFee.value;
        // program.Enrollment_Fee_Per_Semester = programEnrollFee.value;
        // program.Tuition_Fee_per_Credit_Hour = programTuitionFee.value;
        // program.Convocation_Fee = programConvocFee.value;
        // program.Fee_Description = feeDescription.value;
        // program.MM_PCT = programMinMarksPct.value;
        // program.MM_PN = programMinMarkProgramName.value;



    console.log(program);
    userProram.value = program.Program_ID;
    programDescription.value = program.Description;
    programAdmiFee.value = program.Admission_Fee;
    programRegFee.value = program.Registration_Fee;
    programSecurityFee.value = program.Security_Fee;
    programAdmiProcFee.value = program.Admission_Processing_Fee;
    programEnrollFee.value = program.Enrollment_Fee_Per_Semester;
    programTuitionFee.value = program.Tuition_Fee_per_Credit_Hour;
    programConvocFee.value = program.Convocation_Fee;
    feeDescription.value = program.Fee_Description;
    programMinMarksPct.value = program.MM_PCT;
    programMinMarkProgramName.value = program.MM_PN;

    //disable user program selection
    userProram.disabled = true;

    return true;

}

const hideProgramContainer = () => {
    enableScroll(body);
    programContainerWrapper.classList.add("hide");
}

const showProgramContainer = () => {
    disableScroll(body);
    programContainerWrapper.classList.remove("hide");
}


const verifyUniversityFormInputs = () => {

    if(NAME_VALID === false) {
        uniName.focus();
        return false;
    }

    if(universityDescription.value === "") {
        universityDescription.style.setProperty("border-color", "red");
        return false;
    }
    else {
        universityDescription.style.setProperty("border-color", "lightgray");
    }

    if(uniMcDescription.value === "") {
        uniMcDescription.style.setProperty("border-color", "red");
        return false;
    }
    else {
        uniMcDescription.style.setProperty("border-color", "lightgray");
    }

    return true;
}


const verifyProgramFormInputs = () => {

    if(programFormType === ADD_PROGRAM && verifyProgramAlreadyChosen()) {
        return false;
    }

    if(programDescription.value === "") {
        programDescription.style.setProperty("border-color", "red");
        return false;
    }
    else {
        programDescription.style.setProperty("border-color", "lightgray");
    }

    if(feeDescription.value === "") {
        feeDescription.style.setProperty("border-color", "red");
        return false;
    }
    else {
        feeDescription.style.setProperty("border-color", "lightgray");
    }

    return true;

}




const isProgramAlreadyChosen = (id) => {
    var chosenPrograms = document.querySelectorAll(".choosen-program");
    console.log(chosenPrograms);
    
    for (let i = 0; i < chosenPrograms.length; i++) {
        if(parseInt(chosenPrograms[i].id) === parseInt(id)) {
            return true;
        }
        
    }

    return false;

}

const isNoPorgramChosen = () => {
    var chosenPrograms = document.querySelectorAll(".choosen-program");
    if(chosenPrograms.length === 0) {
        return true;
    }
    return false;
}








// document.forms[1].addEventListener("submit", e => {
//     e.preventDefault();
//     console.log("forms0");
//     //handleOnSubmit(e);
// });



// setTimeout(() => {
//     goToProgramsStage();
// }, 2000);


// setTimeout(() => {
//     goToUniversityStage();
// }, 3000);



// choosenProgramsContainer.append(generateNewChoosenProgram(1));
// choosenProgramsContainer.append(generateNewChoosenProgram(2));
// choosenProgramsContainer.append(generateNewChoosenProgram(3));
// choosenProgramsContainer.append(generateNewChoosenProgram(4));
// choosenProgramsContainer.append(generateNewChoosenProgram(5));



//initialize programs in the form.
getProgramsDB();
//initialize countries in the form.
getCountriesDB();



isProgramAlreadyChosen(3);





const handleUniversityFormSubmit = () => {

    var university = {
        "session_id": null,
        "user_id": null,
        "Name": null,
        "Description": null,
        "Country_ID": null,
        "City_ID": null,
        "Admission_Criteria": null,
        "Start_Admission_Date": null,
        "End_Admission_Date": null,
        "Total_ETM": null,
        "S_Education_MC_PCT": null,
        "H_Education_MC_PCT": null,
        "PCT_MC_ETM": null, 
        "Phone": null,
        "Web_Link": null,
        "Email": null,
        "Address": null
    };

    const userCredentials = getUserCredentialsLocalStorage();

    university.session_id = userCredentials.session_id;
    university.user_id = userCredentials.user_id;
    university.Name = uniName.value;
    university.Description = universityDescription.value;
    university.Country_ID = uniCountry.value;
    university.City_ID = uniCity.value;
    university.Admission_Criteria = uniMcDescription.value;
    university.Start_Admission_Date = uniAdmiStartDate.value;
    university.End_Admission_Date = uniAdmiEndDate.value;
    university.Total_ETM = uniETM.value;
    university.S_Education_MC_PCT = uniSEduMcPct.value;
    university.H_Education_MC_PCT = uniHEduMcPct.value;
    university.PCT_MC_ETM = uniEtmMcPct.value;
    university.Phone = uniPhone.value;
    university.Web_Link = uniWeb.value;
    university.Email = uniEmail.value;
    university.Address = uniAddress.value;


    UNIVERSITY_DATA = university;
    return UNIVERSITY_DATA;
}


const setUniversityFormData = (university) => {

    uniName.value = university.Name;
    universityDescription.value = university.Description;
    
    
    uniMcDescription.value = university.Admission_Criteria;
    uniAdmiStartDate.value = university.Start_Admission_Date;
    uniAdmiEndDate.value = university.End_Admission_Date;
    uniETM.value = university.Total_ETM;
    uniSEduMcPct.value = university.S_Education_MC_PCT;
    uniHEduMcPct.value = university.H_Education_MC_PCT;
    uniEtmMcPct.value = university.PCT_MC_ETM;
    uniPhone.value = university.Phone;
    uniWeb.value = university.Web_Link;
    uniEmail.value = university.Email;
    uniAddress.value = university.Address;


    //set country  when ready or fetched from database---
    COUNTRY_EVENT.registerListener(() => {
        if(COUNTRY_EVENT.COUNTRY_LOADED === true) {
            uniCountry.value = university.Country_ID;
            uniCountry.dispatchEvent(new Event("change"));
            //getCitiesDB(university.Country_ID);
        }
        
    })

    //set city when ready or fetched from database---
    CITY_EVENT.registerListener(() => {
        if(CITY_EVENT.CITY_LOADED === true) {
            
            uniCity.value = university.City_ID;
            if(uniCity.value === "") uniCity.selectedIndex = 0;
            //uniCity.selectedIndex = 0;
        }
        
    })

    console.log(university);

    return UNIVERSITY_DATA;
}


const handleProgramFormSubmit = () => {

        var program = {
            "Program_ID": null,
            "Description": null,
            "Admission_Fee": null,
            "Registration_Fee": null,
            "Security_Fee": null,
            "Admission_Processing_Fee": null,
            "Enrollment_Fee_Per_Semester": null,
            "Tuition_Fee_per_Credit_Hour": null,
            "Convocation_Fee": null,
            "Fee_Description": null,
            "MM_PCT": null,
            "MM_PN": null
        };



        program.Program_ID = userProram.value;
        program.Description = programDescription.value;
        program.Admission_Fee = programAdmiFee.value;
        program.Registration_Fee = programRegFee.value;
        program.Security_Fee = programSecurityFee.value;
        program.Admission_Processing_Fee = programAdmiProcFee.value;
        program.Enrollment_Fee_Per_Semester = programEnrollFee.value;
        program.Tuition_Fee_per_Credit_Hour = programTuitionFee.value;
        program.Convocation_Fee = programConvocFee.value;
        program.Fee_Description = feeDescription.value;
        program.MM_PCT = programMinMarksPct.value;
        program.MM_PN = programMinMarkProgramName.value;

        return program;
}

const verifyProgramAlreadyChosen = () => {
    if(isProgramAlreadyChosen(userProram.value)) {
        userProram.style.setProperty("border-color", "red");
        alert("The program already has been added!");
        userProram.blur();
        return true;
    }
    else {
        userProram.style.setProperty("border-color", "lightgray");
        return false;
    }
}


userProram.addEventListener("change", e => {
    console.log(PROGRAMS);
    verifyProgramAlreadyChosen();
})


const getProgramByID =  (programs, id) => {
    for (let i = 0; i < programs.length; i++) {
        if(parseInt(programs[i].Program_ID) === parseInt(id)) return programs[i];
    }
}

const clearProgramFormFields = () => {
    var form = document.forms[2];
    var inputs = form.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    userProram.selectedIndex = 0;
    programDescription.value = "";
    feeDescription.value = "";
}



const setProgramFormType = () => {
    var formTitle = document.querySelectorAll(".program-auth-cart-title")[0];
    var formSubmitBtn = document.querySelectorAll(".program-form-submit")[0];
    if(programFormType === ADD_PROGRAM) {
        formTitle.innerText = "Add Program";
        formSubmitBtn.value = "Add";
    }
    else {
        formTitle.innerText = "Update Program";
        formSubmitBtn.value = "Update";
    }
}

const setProgramFormTypeToADD = () => {
    userProram.disabled = false;
    programFormType = ADD_PROGRAM;
    setProgramFormType();
}

const setProgramFormTypeToUPDATE = () => {
    programFormType = UPDATE_PROGRAM;
    setProgramFormType();
}



// CHOSEN_PROGRAMS.push(PROGRAM_SAMPLE);
// choosenProgramsContainer.append(
//     generateNewChoosenProgram(PROGRAM_SAMPLE.Program_ID, "auto generated")
// );


const getFinalUniversityRequestData = () => {
    var requestData = UNIVERSITY_DATA;
    requestData.programs = CHOSEN_PROGRAMS;
    return requestData;
}

const updateExistingProgram = (program) => {

    for (let i = 0; i < CHOSEN_PROGRAMS.length; i++) {
        if(parseInt(CHOSEN_PROGRAMS[i].Program_ID) === parseInt(program.Program_ID)) {
            CHOSEN_PROGRAMS[i] = program;
            return true;
        }
    }
    return false;
}

const removeExistingProgramArr = (id) => {
    for (let i = 0; i < CHOSEN_PROGRAMS.length; i++) {
        if(parseInt(CHOSEN_PROGRAMS[i].Program_ID) === parseInt(id)) {
            CHOSEN_PROGRAMS.splice(i, 1);
            return true;
        }
    }
    return false;
}


const addNewChosenProgram = (program, name) => {
    choosenProgramsContainer.append(
        generateNewChoosenProgram(program.Program_ID, name)
    );
    CHOSEN_PROGRAMS.push(program)
}

const setUniProgFromsData = (universityDetails) => {
    setUniversityFormData(universityDetails);
    universityDetails.programs.forEach(program => {
        addNewChosenProgram(program, "auto generated");
    });
}



const submitFinalFormData = (universityDetails) => {

    fetch(URL_ADD_UNIVERSITY, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(universityDetails) // body data type must match "Content-Type" header
    })
    .then(res => {
        if(res.status !== 200) {throw new Error("Something went wrong while processing the request!");}
        else {alert("Request Processed Successfully!");}
    })
    .catch(err => {
        console.error(err);
        alert(err);
    })
}

const getUniveristyID_URL = () => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = parseInt(url.searchParams.get("id"));
    return id;
}

//get university details
const fetchUniverstyDetails = (id) => {
    const queriedURL = URL_UNIVERSITY_DETAILS + `?id=${id}`;

    fetch(queriedURL)
    .then(res => {
        if(res.status !== 200) { throw new Error("Something went wrong while fetching University Details from Database!"); }
        else {return res.json();}
    })
    .then(universityDetails => {
        console.log(universityDetails);
    })
    .catch(err => {
        //displayServerError();
        alert(err);
        console.error(err);
    })
}

//load university details
const loadUniDetailsInForm = () => {
    const universityID = getUniveristyID_URL();
    if(!universityID) {
        alert("invalid url parameter: id?");
        return;
    }

    fetchUniverstyDetails(universityID);
}


loadUniDetailsInForm();


//submitFinalFormData(UNIVERSITY_DATA_SAMPLE);


//addNewChosenProgram(PROGRAM_SAMPLE, "auto generated");


//console.log(CHOSEN_PROGRAMS);
//goToProgramsStage();


//setUniversityFormData(UNIVERSITY_DATA_SAMPLE);


setUniProgFromsData(UNIVERSITY_DATA_SAMPLE);
console.log(CHOSEN_PROGRAMS);


//CUSTOM_EVENT.COUNTRY_LOADED = true;

// setInterval(() => {
//     CUSTOM_EVENT.COUNTRY_LOADED = true;
// }, 1000);




