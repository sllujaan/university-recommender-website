
import { loadHeaderJS } from "../header/header.js";

export const HEADER_FILE_URL = "../header/header.html";
export const FOOTER_FILE_URL = "../footer/footer.html";



const readDocument = (fileLocation, htmlElement) => {
    // console.log(fileLocation);
    // console.log(window.location);
    return fetch(fileLocation)
    .then(res => {
        return res.text();
    })
    .then(data => {
        var header = createNewHeader(data, htmlElement);
        return header;
    })
}

const createNewHeader = (htmlAsText, htmlElement) => {
    //console.log(htmlAsText);
    var NewHTML = document.createElement("new-html");
    //console.log(NewHTML);
    NewHTML.innerHTML = htmlAsText;
    console.warn(htmlElement);
    var appHeader = NewHTML.querySelectorAll(htmlElement);
    //console.log(appHeader[0]);
    return appHeader;
}

const copyAppHTMLElment = (fileLocation, htmlElement) => {
    const htmlAsText = readDocument(fileLocation, htmlElement);
    return htmlAsText;
}

export const getAppHeader = (fileLocation) => {
    return copyAppHTMLElment(fileLocation, ".header");
}

export const getAppFooter = (fileLocation) => {
    return copyAppHTMLElment(fileLocation, ".footer");
}


export const loadHeaderFooter = (headerContainer, footerContainer) => {
    getAppHeader(HEADER_FILE_URL, headerContainer)
    .then(header => {
        console.log("initiating header...");
        headerContainer.append(header[0])
        loadHeaderJS(document);
        initAuthorizedUserFeatures();
    })

    getAppFooter(FOOTER_FILE_URL, footerContainer)
    .then(footer => {
        footerContainer.append(footer[0])
    })
}



const isUserLoggedIn = () => {
    const userLogin = localStorage.getItem("user_login");
    const userName = localStorage.getItem("user_name");
    if(userLogin === "true" && userName) return true;
    else return false;
}



const showAuthorizedFeatures = (authorizedContainers) => {
    authorizedContainers.forEach(container => {
        container.classList.remove("authorized-container");
    })
}

const hideAuthorizedFeatures = (authorizedContainers) => {
    authorizedContainers.forEach(container => {
        container.classList.add("authorized-container");
    })
}


//make sure that header has been loaded
const initAuthorizedUserFeatures = () => {
    const authorizedContainers = document.querySelectorAll(".authorized-container");
    console.log(authorizedContainers);
    if(!authorizedContainers) return;

    if(isUserLoggedIn()) {
        console.warn("user is logged in!");
        showAuthorizedFeatures(authorizedContainers);
    }
    else {
        console.warn("user is not logged in!");
        hideAuthorizedFeatures(authorizedContainers);
    }

    console.log(authorizedContainers);
}



