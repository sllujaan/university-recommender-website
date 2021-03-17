import { 
    loadHeaderFooter, enableScroll, disableScroll,
    getBusyContainer, getUserCredentialsLocalStorage
 } from "../util/util.js";
import { loadPrograms, UNIVERSITY_DETAILS } from "../accordian/accordian.js";
import {
    URL_UNIVERSITY_DETAILS, URL_RECOMENDED, URL_SAVED_SEARCHES, URL_SEARCH
} from "../urls/urlResolver.js";

/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var accountMsg = document.querySelectorAll(".account-msg")[0];


loadHeaderFooter(headerContainer, footerContainer);


const getUrlParamStatus = () => {
    var url_string = window.location.href;
    const url = new URL(url_string);
    const status = url.searchParams.get("status");
    return status;
}

console.log(getUrlParamStatus());


const handleStatusMsg = (status) => {
    const msg = "Your Account has been ";
    switch (status) {
        case "rejected":
            displayMsg("Your Account has been rejected!", true);
            break;
        case "pending":
            displayMsg("Your Account is in pending state!", false);
            break;
    
        default:
            displayMsg("Something went wrong!", true);
            break;
    }
}

const displayMsg = (msg, danger) => {
    accountMsg.innerText = msg;

    if(danger) {
        accountMsg.style.setProperty("color", "red");
    }
    else {
        accountMsg.style.removeProperty("color");
    }
}


handleStatusMsg(getUrlParamStatus());
