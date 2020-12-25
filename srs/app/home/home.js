import {
    HEADER_FILE_URL,
    FOOTER_FILE_URL,
    getAppHeader,
    getAppFooter
} from "../util/util.js";

var headerContainer = document.querySelectorAll(".header-container")[0];
var footerContainer = document.querySelectorAll(".footer-container")[0];


getAppHeader(FOOTER_FILE_URL)
.then(header => {
    console.log(header);
    headerContainer.append(header[0])
})

// getAppHeader(FOOTER_FILE_URL)
// .then(footer => {
//     footerContainer.append(footer[0])
// })


console.log(footerContainer);