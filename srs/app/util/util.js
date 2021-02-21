
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



const getLoginLinks = () => {
    var loginLink = document.getElementById("login-link-container");
    var loginLinkResponsive = document.getElementById("login-link-container-resp");
    return {loginLink: loginLink, loginLinkResponsive: loginLinkResponsive};
}
const hideLoginButtons = () => {
    var loginLinks = getLoginLinks();
    loginLinks.loginLink.setAttribute("style", "display: none;");
    loginLinks.loginLinkResponsive.setAttribute("style", "display: none;");

}

const showLoginButtons = () => {
    var loginLinks = getLoginLinks();
    loginLinks.loginLink.removeAttribute("style");
    loginLinks.loginLinkResponsive.removeAttribute("style");
}


const initUserName = (userName) => {
    var userNameEl = document.getElementById("user-name-uuid");
    var userNameRespEl = document.getElementById("user-name-uuid-resp");

    userNameEl.innerText = userName;
    userNameRespEl.innerText = userName;
}


const showAuthorizedFeatures = (authorizedContainers) => {
    authorizedContainers.forEach(container => {
        container.classList.remove("authorized-container");
        container.classList.remove("person-resp-hide");
        
    })

    initUserName(localStorage.getItem("user_name"));
    hideLoginButtons();

}

const hideAuthorizedFeatures = (authorizedContainers) => {
    authorizedContainers.forEach(container => {
        container.classList.add("authorized-container");
        
    })

    showLoginButtons();
}


//make sure that header has been loaded
const initAuthorizedUserFeatures = () => {
    const authorizedContainers = document.querySelectorAll(".authorized-container");
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


export const disableScroll = (element) => {
    element.style.setProperty("overflow", "hidden");
}

export const enableScroll = (element) => {
    element.style.setProperty("overflow", "auto");
}


