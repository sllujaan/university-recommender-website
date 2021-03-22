
import { loadHeaderJS } from "../header/header.js";
import {
    URL_VERIFY_LOGIN, URL_VERIFY_ADMIN
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
        initAdminFeatures();
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

const showAdminFeatures = (authorizedContainersAdmin) => {
    authorizedContainersAdmin.forEach(container => {
        container.classList.remove("authorized-container-admin");
    });
}

const hideAuthorizedFeatures = (authorizedContainers) => {
    
    authorizedContainers.forEach(container => {
        container.classList.add("authorized-container");
        
    })

    showLoginButtons();

    //set 100% width of search bar
    var searchBarUniSerch = document.querySelectorAll(".search-bar-uni-serch")[0];
    if(searchBarUniSerch) searchBarUniSerch.style.setProperty("width", "100%");
}

const hideAdminFeatures = (authorizedContainersAdmin) => {
    authorizedContainersAdmin.forEach(container => {
        container.classList.add("authorized-container-admin");
    });
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


//make sure that header has been loaded
const initAdminFeatures = async () => {
    const authorizedContainersAdmin = document.querySelectorAll(".authorized-container-admin");
    if(!authorizedContainersAdmin) return;

    //live verify login. !!new

    
    try {
        //verify login
        const status = await verifyAdmin();
        //login succeeded
        console.warn("admin is verified!");
        showAdminFeatures(authorizedContainersAdmin);
    } catch (error) {
        console.warn("admin is not verified!");
        hideAdminFeatures(authorizedContainersAdmin);
    }




    // if(isUserLoggedIn()) {
    //     console.warn("user is logged in!");
    //     showAuthorizedFeatures(authorizedContainers);
    // }
    // else {
    //     console.warn("user is not logged in!");
    //     hideAuthorizedFeatures(authorizedContainers);
    // }

    console.log(authorizedContainersAdmin);
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



const verifyAdmin = () =>   {

    const userCredentials = getUserCredentialsLocalStorage();
    const requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}`;

    const myPromise = new Promise((resolve, reject) => {
        fetch(URL_VERIFY_ADMIN, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: requestData // body data type must match "Content-Type" header
        })
        .then(res => {
            if(res.status === 200) {resolve(200);}
            else reject("admin verification failed.");
        })
        .catch(err => {
            reject("admin verification failed.");
        });
    });

    return myPromise;    
}

export const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
}




export const MERITCAL_STRUCT = {
    S_EDUCATION_PCT: null,
    H_EDUCATION_PCT: null,
    ETM_PCT: null,
    S_EDUCATION_MC_PCT: null,
    H_EDUCATION_MC_PCT: null,
    ETM_MC_PCT: null,
}


export const validatePercentageValue = (value) => {
    return ((value >= 0) && (value <= 100));
}

export const validateMeritValues = (meritStruct = MERITCAL_STRUCT) => {
    //total merit should be greater than 0 and less than 100
    const total_merit = (meritStruct.S_EDUCATION_MC_PCT + meritStruct.H_EDUCATION_MC_PCT + meritStruct.ETM_MC_PCT);
    const MC_INVALID = (total_merit !== 100);
    if(MC_INVALID) return false;

    const validSEdu_PCT = validatePercentageValue(meritStruct.S_EDUCATION_PCT);
    const validHEdu_PCT = validatePercentageValue(meritStruct.H_EDUCATION_PCT);
    const validETM_PCT = validatePercentageValue(meritStruct.ETM_PCT);

    if(!validSEdu_PCT || !validHEdu_PCT || !validETM_PCT) return false;

    return true;
}

export const calculateMerit = (meritStruct = MERITCAL_STRUCT) => {
    
    if(!validateMeritValues(meritStruct)) return null;

    const totalSEduPct = (meritStruct.S_EDUCATION_PCT / 100 ) * meritStruct.S_EDUCATION_MC_PCT;
    const totalHEduPct = (meritStruct.H_EDUCATION_PCT / 100 ) * meritStruct.H_EDUCATION_MC_PCT;
    const totalMCPct = (meritStruct.ETM_PCT / 100 ) * meritStruct.ETM_MC_PCT;
    return totalSEduPct + totalHEduPct + totalMCPct;
}

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


