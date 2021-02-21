import { loadHeaderFooter, enableScroll, disableScroll } from "../util/util.js";
import { URL_USER_LOGIN } from "../urls/urlResolver.js";


/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var body = document.querySelectorAll("body")[0];
var containerOpts = document.querySelectorAll(".container-opts")[0];
var universitiesContainer = document.querySelectorAll(".Universities-container")[1];

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


console.log(universitiesContainer);


document.addEventListener("click", e => {
    console.log(e.target);

    if(e.target.id === "searches-recommended-resp") {
        console.log("yes");
        containerOpts.style.setProperty("top", "0");
        disableScroll(body);
    }
    
})



const getBusyContainer = (count) => {

    var div = document.createDocumentFragment();
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



const showContainerBusy = () => {
    universitiesContainer.append(getBusyContainer(10));
}

const hideContainerBusy = () => {
    universitiesContainer.innerHTML = null;
    
}


showContainerBusy();


const showCouldNotLoadError = () => {
    universitiesContainer.innerHTML = "<div>Sorry We could'nt load please try again!</div>";
}

setTimeout(() => {
    hideContainerBusy();
    showCouldNotLoadError();
}, 2000);