

export function loadHeaderJS(DOM) {
    var body = DOM.getElementsByTagName("body")[0];
    var barResponsive = DOM.getElementById("bar-responsive");
    var headerSidebar = DOM.getElementById("header-sidebar");
    var closeBar = DOM.getElementById("close-bar");

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




