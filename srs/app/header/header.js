



const resolveLinkColorActivation = (DOM) => {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log( page );

    var linkUsersAuth = DOM.getElementById("link-users-auth");
    var linkUsers = DOM.getElementById("link-users");
    var linkLogin = DOM.getElementById("link-login");
    var linkRegister = DOM.getElementById("link-register");

    switch (page) {
        case "userAuth.html":
            linkUsersAuth.setAttribute("style", "color: #6fda44;");
            break;
        case "user.html":
            linkUsers.setAttribute("style", "color: #6fda44;");
            break;
        case "login.html":
            linkLogin.setAttribute("style", "color: #6fda44;");
            break;
        case "register.html":
            linkRegister.setAttribute("style", "color: #6fda44;");
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




