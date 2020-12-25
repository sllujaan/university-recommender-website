import {
    HEADER_FILE_URL,
    FOOTER_FILE_URL,
    getAppHeader
} from "../util/util.js";

var headerContainer = document.querySelectorAll(".header-container")[0];



getAppHeader(HEADER_FILE_URL)
.then(header => {
    headerContainer.append(header[0])
})

console.log(headerContainer);