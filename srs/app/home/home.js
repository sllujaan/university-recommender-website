import { HEADER_FILE_URL } from "../util/util.js";
import { getAppHeader } from "../header/header.js";

var headerContainer = document.querySelectorAll(".header-container")[0];


getAppHeader(HEADER_FILE_URL)
.then(header => {
    headerContainer.append(header[0])
})

console.log(headerContainer);