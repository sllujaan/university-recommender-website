import { 
    loadHeaderFooter, enableScroll, disableScroll,
    getBusyContainer
 } from "../util/util.js";
import { loadPrograms } from "../accordian/accordian.js";


/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var body = document.querySelectorAll("body")[0];
var containerOpts = document.querySelectorAll(".container-opts")[0];
var universitiesContainer = document.querySelectorAll(".Universities-container")[1];
var btnLoadMore = document.querySelectorAll(".btn-load-more")[0];
var savedSearchItemSelected = document.querySelectorAll(".saved-search-item-selected")[0];

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


const UNIVERSITES = [
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"}
]




document.addEventListener("click", e => {
    console.log(e.target);

    const isSelectOption = (e.target.id === "searches-recommended-resp") || (e.target.parentElement.id === "searches-recommended-resp");
    const isLoadMore = (e.target.id === "load-more-button");
    const idUniDetails = e.target.classList.contains("uni-name");
    const isBackCaret = e.target.classList.contains("details-back-caret");

    const TRUE_VALUE = true;

    switch (TRUE_VALUE) {
        case isSelectOption:
            showContainerOpts();
            break;
        case isLoadMore:
            loadMore();
            break;
        case idUniDetails:
            showUniDetails(2);
            break;
        case isBackCaret:
            hideUniDetails();
            break;
    
        default:
            hideContainerOpts();
            break;
    }


    // if(isSelectOption) {
    //     showContainerOpts();
    // }
    // else {
    //     hideContainerOpts();
    // }


    // if(isLoadMore) {
    //     console.log("loadmore")
    //     loadMore();
    // }

    

    
})


const showContainerOpts = () => {
    containerOpts.style.setProperty("top", "0");
    disableScroll(body);
}

const hideContainerOpts = () => {
    containerOpts.style.setProperty("top", "100vh");
    enableScroll(body);
}

const showContainerBusy = () => {
    universitiesContainer.append(getBusyContainer(10));
}

const hideContainerBusy = () => {
    var busy_bundle = universitiesContainer.getElementsByClassName("busy-bundle")[0];
    busy_bundle.remove();
    
}

const showCouldNotLoadError = () => {
    universitiesContainer.innerHTML = "<div>Sorry We could'nt load please try again!</div>";
}

const removeLoadMoreButton = () => {
    btnLoadMore.remove();
}

const emptyContainer = (container) => {
    container.innerHTML = `<div class="title title-opts search-link"><h2 style="font-weight: bold;">Recommended</h2></div>`;
}

const changeContainerTitle = (title) => {
    var titleOpts = document.querySelectorAll(".title-opts > h2")[0];
    if(titleOpts) titleOpts.innerHTML = title;
}

const changeRespOptsTitle = (title) => {
    var selected = document.querySelectorAll(".container-opts .selected")[0];
    if(selected) selected.innerHTML = title;
}

const addLoadMoreButton = () => {
    var div = document.createElement("div");
    div.classList.add("btn-load-more");

    div.innerHTML = `
        <br>
            <div style="text-align: center;">
                <input id="load-more-button" type="button" value="Load More Universities" style="background-color: white; color: #37a000;font-weight: bold; font-size: small; padding: 4px 10px; border-radius: 4px; border: 1px solid #d1d1d1;">
            </div>
        <br>
        `;
    console.log(div);
    btnLoadMore = div;
    universitiesContainer.append(div);
}

const showUniDetails = (id) => {
    disableScroll(body);
    var containerUniDetails = document.querySelectorAll(".container-uni-details")[0];
    containerUniDetails.style.setProperty("left", "0%");

}

const hideUniDetails = () => {
    enableScroll(body);
    var containerUniDetails = document.querySelectorAll(".container-uni-details")[0];
    containerUniDetails.style.setProperty("left", "100%");
}




const loadUniversites = (universities) => {
    var div = document.createDocumentFragment();

    universities.forEach(university => {
        var universityContainer = document.createElement("div");
        universityContainer.classList.add("university-container");
        universityContainer.innerHTML = `
        <div class="title" style="cursor: pointer; -webkit-line-clamp: 1;"><h5 id="${Math.random()}" class="uni-name">${university.name}</h5></div>
        <div class="description" style="color: #222;">${university.description}</div>
        <div class="location"><span><i class="fa fa-map-marker" aria-hidden="true"></i></span><span style="font-size: small; font-weight: bold; color: #656565;">&nbsp;&nbsp;${university.location}</span></div><br>
                `;
        div.append(universityContainer);
    });
    universitiesContainer.append(div);
}

const loadMore = () => {
    removeLoadMoreButton();
    showContainerBusy();

    setTimeout(() => {
        hideContainerBusy();
        loadUniversites(UNIVERSITES);
        addLoadMoreButton();
    }, 3000);

}


const loadFirst = () => {
    emptyContainer(universitiesContainer);
    changeContainerTitle("loading your feed...");
    removeLoadMoreButton();
    showContainerBusy();

    setTimeout(() => {
        changeContainerTitle("Recommneded aaaaaa");
        hideContainerBusy();
        loadUniversites(UNIVERSITES);
        addLoadMoreButton();
    }, 1000);

}





// removeLoadMoreButton();
// showContainerBusy();
// setTimeout(() => {
    
//     hideContainerBusy();
//     loadUniversites(UNIVERSITES);
//     addLoadMoreButton();


//     removeLoadMoreButton();
//     showContainerBusy();
//     //showCouldNotLoadError();
// }, 2000);


// setTimeout(() => {
//     hideContainerBusy();
//     loadUniversites(UNIVERSITES);
//     addLoadMoreButton();
// }, 3000);



loadFirst();
changeRespOptsTitle("new title");


