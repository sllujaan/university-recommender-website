import {
    loadHeaderFooter
} from "../util/util.js";

var headerContainer = document.querySelectorAll(".header-container")[0];
var footerContainer = document.querySelectorAll(".footer-container")[0];
var submitInput = document.querySelectorAll('#auth-submit')[0];


loadHeaderFooter(headerContainer, footerContainer);



document.forms[0].addEventListener("submit", e => {
    e.preventDefault();

    console.log("submit it..");
    console.log(e.target);

    //document.querySelectorAll('[type="submit"]')
    console.log(submitInput);

    submitInput.value = "Signing in ...";
    submitInput.disabled = true;
    submitInput.setAttribute("style", "background-color: grey;")


})