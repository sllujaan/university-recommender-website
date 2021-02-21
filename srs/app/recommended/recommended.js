import { loadHeaderFooter, enableScroll, disableScroll } from "../util/util.js";
import { URL_USER_LOGIN } from "../urls/urlResolver.js";


/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var body = document.querySelectorAll("body")[0];
var containerOpts = document.querySelectorAll(".container-opts")[0];

console.log(body);

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);



document.addEventListener("click", e => {
    console.log(e.target);

    if(e.target.id === "searches-recommended-resp") {
        console.log("yes");
        containerOpts.style.setProperty("top", "0");
        disableScroll(body);
    }
    
})



const getBusyContainer = (count) => {

    var div = document.createElement("div");
    for (let i = 0; i < count; i++) {
        var uniContainer = document.createElement("div");
        uniContainer.classList.add("university-container");

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


console.log(getBusyContainer(1000));


