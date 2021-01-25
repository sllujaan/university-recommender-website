import { loadHeaderFooter } from "../util/util.js";
import { URL_USER_LOGIN } from "../urls/urlResolver.js";


var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userRows = document.querySelectorAll(".user-row");
var searchUser = document.getElementById("search-user");


loadHeaderFooter(headerContainer, footerContainer);




const searchTable = (value) => {
    console.log(value);
}



searchUser.addEventListener("keyup", e => {
    console.log(userRows);
    userRows[0].setProperty("style", "display: none;");
    searchTable(e.target.value);
})
