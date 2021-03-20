
import { loadHeaderJS } from "../header/header.js";
import {
    URL_VERIFY_LOGIN
} from "../urls/urlResolver.js";


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
const initAuthorizedUserFeatures = async () => {
    const authorizedContainers = document.querySelectorAll(".authorized-container");
    if(!authorizedContainers) return;

    //live verify login. !!new

    
    try {
        //verify login
        const status = await verifyLogin();
        //login succeeded
        console.warn("user is logged in!");
        showAuthorizedFeatures(authorizedContainers);
    } catch (error) {
        console.warn("user is not logged in!");
        hideAuthorizedFeatures(authorizedContainers);
    }




    // if(isUserLoggedIn()) {
    //     console.warn("user is logged in!");
    //     showAuthorizedFeatures(authorizedContainers);
    // }
    // else {
    //     console.warn("user is not logged in!");
    //     hideAuthorizedFeatures(authorizedContainers);
    // }

    console.log(authorizedContainers);
}


export const disableScroll = (element) => {
    element.style.setProperty("overflow", "hidden");
}

export const enableScroll = (element) => {
    element.style.setProperty("overflow", "auto");
}


export const getBusyContainer = (count) => {

    var div = document.createElement("div");
    div.classList.add("busy-bundle");
    for (let i = 0; i < count; i++) {
        var uniContainer = document.createElement("div");
        uniContainer.classList.add("university-container");
        uniContainer.classList.add("busy-generated");
        uniContainer.innerHTML = `
            <div class="container-busy">
                <div class="busy-1"></div>
                <div class="busy-1"></div>
                <div class="busy-1"></div>
            </div>`;

        div.append(uniContainer);
    }

    return div;
}

export const getUserCredentialsLocalStorage = () => {
    const sessionID = localStorage.getItem("session_id");
    const userID = localStorage.getItem("user_id");

    return {session_id:sessionID, user_id:userID};
}


const verifyLogin = () => {

    const userCredentials = getUserCredentialsLocalStorage();
    const requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}`;

    const myPromise = new Promise((resolve, reject) => {
        fetch(URL_VERIFY_LOGIN, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: requestData // body data type must match "Content-Type" header
        })
        .then(res => {
            if(res.status === 200) {resolve(200);}
            else reject("login verification failed.");
        })
        .catch(err => {
            reject("login verification failed.");
        });
    });

    return myPromise;
    
}

const MERITCAL_STRUCT = {
    S_EDUCATION_PCT: null,
    H_EDUCATION_PCT: null,
    ETM_PCT: null,
    S_EDUCATION_MC_PCT: null,
    H_EDUCATION_MC_PCT: null,
    ETM_MC_PCT: null,
}

export const calculateMerit = (MERITCAL_STRUCT = MERITCAL_STRUCT) => {
    const total_merit = (MERITCAL_STRUCT.S_EDUCATION_MC_PCT + MERITCAL_STRUCT.H_EDUCATION_MC_PCT + MERITCAL_STRUCT.ETM_MC_PCT);

    const MC_INVALID = (total_merit < 1 || total_merit > 100);
    if(MC_INVALID) return null;

    const totalSEduPct = (MERITCAL_STRUCT.S_EDUCATION_PCT / 100 ) * MERITCAL_STRUCT.S_EDUCATION_MC_PCT;
    const totalHEduPct = (MERITCAL_STRUCT.H_EDUCATION_PCT / 100 ) * MERITCAL_STRUCT.H_EDUCATION_MC_PCT;
    const totalMCPct = (MERITCAL_STRUCT.ETM_PCT / 100 ) * MERITCAL_STRUCT.ETM_MC_PCT;
    return totalSEduPct + totalHEduPct + totalMCPct;
}

var cal = MERITCAL_STRUCT;
cal.S_EDUCATION_PCT = 90;
cal.H_EDUCATION_PCT = 90;
cal.ETM_PCT = 90;

cal.S_EDUCATION_MC_PCT = 30;
cal.H_EDUCATION_MC_PCT = 30;
cal.ETM_MC_PCT = 40;


//console.log(calculateMerit(cal) );




// verifyLogin()
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.error(err);
// })


// try {
//     const status = await verifyLogin();
//     console.log(status);
// } catch (error) {
//     console.error(error);
// }


