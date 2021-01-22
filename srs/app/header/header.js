



var barResponsive = document.getElementById("bar-responsive");
var headerSidebar = document.getElementById("header-sidebar");

console.log(barResponsive);


barResponsive.addEventListener("click", e => {
    headerSidebar.setAttribute("style", "right: 0");
})


// document.addEventListener("DOMContentLoaded", e => {
//     barResponsive.click();
// })