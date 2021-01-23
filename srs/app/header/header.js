


export function loadHeaderJS(DOM) {
    var barResponsive = DOM.getElementById("bar-responsive");
    var headerSidebar = DOM.getElementById("header-sidebar");
    var closeBar = DOM.getElementById("close-bar");

    barResponsive.addEventListener("click", e => {
        headerSidebar.setAttribute("style", "right: 0");
    })
    
    closeBar.addEventListener("click", e => {
        headerSidebar.setAttribute("style", "right: 100%");
    })
    
    
    DOM.addEventListener("DOMContentLoaded", e => {
        barResponsive.click();
    })
}





//loadHeaderJS(document);




