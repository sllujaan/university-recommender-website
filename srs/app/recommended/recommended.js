import { 
    loadHeaderFooter, enableScroll, disableScroll,
    getBusyContainer
 } from "../util/util.js";
import { loadPrograms, UNIVERSITY_DETAILS } from "../accordian/accordian.js";
import {
    URL_UNIVERSITY_DETAILS
} from "../urls/urlResolver.js";


/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var body = document.querySelectorAll("body")[0];
var containerOpts = document.querySelectorAll(".container-opts")[0];
var universitiesContainer = document.querySelectorAll(".Universities-container")[1];
var btnLoadMore = document.querySelectorAll(".btn-load-more")[0];
var savedSearchItemSelected = document.querySelectorAll(".saved-search-item-selected")[0];
var containerUniDetails = document.querySelectorAll(".container-uni-details")[0];

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


const UNIVERSITES = [
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"}
];




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
            const uniID = parseInt(e.target.id);
            showUniDetails(uniID);
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
    fetchUniverstyDetails(id);

    //setUniDetails(UNIVERSITY_DETAILS);
    //containerUniDetails.style.setProperty("left", "0%");

}

const hideUniDetails = () => {
    enableScroll(body);
    containerUniDetails.style.setProperty("left", "100%");
}




const loadUniversites = (universities) => {
    var div = document.createDocumentFragment();

    universities.forEach(university => {
        var universityContainer = document.createElement("div");
        universityContainer.classList.add("university-container");
        universityContainer.innerHTML = `
        <div class="title" style="cursor: pointer; -webkit-line-clamp: 1;"><h5 id="${2}" class="uni-name">${university.name}</h5></div>
        <div class="description" style="color: #222;">${university.description}</div>
        <div class="location"><span><i class="fa fa-map-marker" aria-hidden="true"></i></span><span style="font-size: small; font-weight: bold; color: #656565;">&nbsp;&nbsp;${university.location}</span></div><br>
                `;
        div.append(universityContainer);
    });
    universitiesContainer.append(div);
}


const setUniDetails = (universityDetails) => {
    const {University} = universityDetails[0];
    var {University_Program} = universityDetails[1];

    var detailsTitle = containerUniDetails.querySelectorAll(".details-title")[0];
    var detailsDescription = containerUniDetails.querySelectorAll(".details-description")[0];
    var detailsCountry = containerUniDetails.querySelectorAll(".details-country")[0];
    var detailsCity = containerUniDetails.querySelectorAll(".details-city")[0];
    var detailsAdmiStart = containerUniDetails.querySelectorAll(".details-admission-start")[0];
    var detailsAdmiEnd = containerUniDetails.querySelectorAll(".details-admission-end")[0];
    var detailsPhone = containerUniDetails.querySelectorAll(".details-phone")[0];
    var detailsEmail = containerUniDetails.querySelectorAll(".details-email")[0];
    var detailsAddress = containerUniDetails.querySelectorAll(".details-address")[0];
    var detailsUniLink = containerUniDetails.querySelectorAll(".details-uni-link")[0];
    var detailsUniLinkCopy = containerUniDetails.querySelectorAll(".details-uni-link-copy")[0];


    detailsTitle.innerText = University.Name;
    detailsDescription.innerText = University.Description;
    detailsCountry.innerText = University.Name_Country;
    detailsCity.innerText = University.Name_City;
    detailsAdmiStart.innerText = University.Start_Admission_Date;
    detailsAdmiEnd.innerText = University.End_Admission_Date;
    detailsPhone.innerText = University.Phone;
    detailsEmail.innerText = University.Email;
    detailsAddress.innerText = University.Address;
    detailsUniLink.setAttribute("placeholder", University.Web_Link);
    detailsUniLinkCopy.setAttribute("data-uni-link", University.Web_Link);


    loadPrograms(universityDetails);

}


const showUniDetailsSomethingWentWrong = () => {
    //display appropriate message when university details are loaded correctly.
}



const fetchUniverstyDetails = (id) => {
    const queriedURL = URL_UNIVERSITY_DETAILS + `?id=${id}`;

    fetch(queriedURL)
    .then(res => {
        if(res.status !== 200) { throw new Error("Something went wrong while fetching University Details from Database!"); }
        else {return res.json();}
    })
    .then(universityDetails => {
        console.log(universityDetails);
        disableScroll(body);
        setUniDetails(universityDetails);
        containerUniDetails.style.setProperty("left", "0%");
    })
    .catch(err => {
        //displayServerError();
        alert(err);
        console.error(err);
    })
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


