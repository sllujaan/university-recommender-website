
import {
    URL_VERIFY_LOGIN
} from "../urls/urlResolver.js";



const resolveLinkColorActivation = (DOM) => {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log( page );

    var linkUsersAuth = DOM.getElementById("link-users-auth");
    var linkUsers = DOM.getElementById("link-users");
    var linkLogin = DOM.getElementById("link-login");
    var linkRegister = DOM.getElementById("link-register");


    //responsive elements---------
    var linkUsersAuthResp = DOM.getElementById("link-usersAuth-resp");
    var linkUsersResp = DOM.getElementById("link-users-resp");
    var linkLoginResp = DOM.getElementById("link-login-resp");
    var linkRegisterResp = DOM.getElementById("link-register-resp");

    var linkRecommended = DOM.getElementById("link-recommended");
    var linkRecommendedResp = DOM.getElementById("link-recommended-resp")
    var linkAddUniversity = DOM.getElementById("link-add-university");
    var linkAddUniversityResp = DOM.getElementById("link-add-university-resp");

    var linkSearch = DOM.getElementById("link-search");
    var linkSearchResp = DOM.getElementById("link-search-resp");
    
    var linkRequests = DOM.getElementById("link-requests");
    var linkRequestsResp = DOM.getElementById("link-requests-resp");

    switch (page) {
        case "userAuth.html":
            linkUsersAuth.setAttribute("style", "color: #6fda44;");
            linkUsersAuthResp.setAttribute("style", "color: #6fda44;");
            break;
        case "user.html":
            linkUsers.setAttribute("style", "color: #6fda44;");
            linkUsersResp.setAttribute("style", "color: #6fda44;");
            break;
        case "login.html":
            linkLogin.setAttribute("style", "color: #6fda44;");
            linkLoginResp.setAttribute("style", "color: #6fda44;");
            break;
        case "register.html":
            linkRegister.setAttribute("style", "color: #6fda44;");
            linkRegisterResp.setAttribute("style", "color: #6fda44;");
            break;
        case "addUniversity.html":
            linkAddUniversity.setAttribute("style", "color: #6fda44;");
            linkAddUniversityResp.setAttribute("style", "color: #6fda44;");
            break;
        case "recommended.html":
            linkRecommended.setAttribute("style", "color: #6fda44;");
            linkRecommendedResp.setAttribute("style", "color: #6fda44;");
            break;
        case "search.html":
            linkSearch.setAttribute("style", "color: #6fda44;");
            linkSearchResp.setAttribute("style", "color: #6fda44;");
            break;
        case "requests.html":
            linkRequests.setAttribute("style", "color: #6fda44;");
            linkRequestsResp.setAttribute("style", "color: #6fda44;");
            break;


        default:
            break;
    }
    
}




export function loadHeaderJS(DOM) {
    var body = DOM.getElementsByTagName("body")[0];
    var barResponsive = DOM.getElementById("bar-responsive");
    var headerSidebar = DOM.getElementById("header-sidebar");
    var closeBar = DOM.getElementById("close-bar");

    resolveLinkColorActivation(DOM);

    barResponsive.addEventListener("click", e => {
        console.log(body);
        body.setAttribute("style", "position: fixed; overflow: hidden;");
        headerSidebar.setAttribute("style", "right: 0");
    })
    
    closeBar.addEventListener("click", e => {
        body.setAttribute("style", "position: relative; overflow: auto;");
        headerSidebar.setAttribute("style", "right: 100%");
    })
    
    
    DOM.addEventListener("DOMContentLoaded", e => {
        barResponsive.click();
    })

    

}







//loadHeaderJS(document);




