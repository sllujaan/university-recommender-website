import { loadHeaderFooter } from "../util/util.js";
import { URL_USER_LOGIN } from "../urls/urlResolver.js";


/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];


/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);

