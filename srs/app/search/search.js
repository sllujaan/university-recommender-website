import { 
    loadHeaderFooter, enableScroll, disableScroll,
    getBusyContainer
 } from "../util/util.js";
import { loadPrograms, UNIVERSITY_DETAILS } from "../accordian/accordian.js";
import {
    URL_UNIVERSITY_DETAILS, URL_COUNTRY, URL_PROGRAM
} from "../urls/urlResolver.js";


const RECOMMENDED_SEARCH_ID = -123;

const SEARCH_CATEGORIES = {
    LOCATION: 0x0ffd,
    PROGRAM: 0x0aaa,
    ADMI_DATE: 0x0abc,
    BUDGET: 0x0def,
    MIN_MARKS: 0xeff,
}

/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var body = document.querySelectorAll("body")[0];
var containerOpts = document.querySelectorAll(".container-opts")[0];
var universitiesContainer = document.querySelectorAll(".Universities-container")[0];
var btnLoadMore = document.querySelectorAll(".btn-load-more")[0];
var savedSearchItemSelected = document.querySelectorAll(".saved-search-item-selected")[0];
var containerUniDetails = document.querySelectorAll(".container-uni-details")[0];
var searchFilterItemWrapper = document.querySelectorAll(".search-filter-item-wrapper")[0];


var sidebar = document.querySelectorAll(".side-bar")[0];
var contianersavedSearchesResp = document.querySelectorAll(".container-saved-searches")[0];
var containerSearchFilters = document.querySelectorAll(".container-search-filters")[0];
var userCountry = document.getElementById("user-country");
var userProram = document.getElementById("user-program");
var userAdmissionDate= document.getElementById("user-addmission-date");

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


const UNIVERSITES = [
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"},
    {name: "University of the Punjab", description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", location: "Pakistan"}
];


const SAVED_SEARCHES = [
    {"Search_ID":"1","User_ID":"3","Name":"mySearch1","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"2","User_ID":"3","Name":"mySearch2","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"3","User_ID":"3","Name":"mySearch3","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"4","User_ID":"3","Name":"mySearch4","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null}
];




document.addEventListener("click", e => {
    console.log(e.target);

    const isSelectOption = (e.target.id === "searches-recommended-resp") || (e.target.parentElement.id === "searches-recommended-resp");
    const isLoadMore = (e.target.id === "load-more-button");
    const idUniDetails = e.target.classList.contains("uni-name");
    const isBackCaret = e.target.classList.contains("details-back-caret");
    const isSavedSearch = e.target.classList.contains("saved-search-item");
    const isSearchFilter = e.target.parentElement.classList.contains("search-filter-item-wrapper");
    const isClearFilters = e.target.classList.contains("clear-filters");
    
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
        case isSavedSearch:
            selectSavedSearch(e.target.id);
            performSearch(e.target.id);
            break;
        case isSearchFilter:
            e.target.parentElement.remove();
            break;
        case isClearFilters:
            clearAllSearchFilters();
            break;

    
        default:
            //hideContainerOpts();
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


/*fired when user selects country.*/
userCountry.addEventListener("change", e => {
    const countryID = e.target.value;
    const countryName = e.target[e.target.selectedIndex].innerText;

    console.log(countryID, countryName);

    const filterExists = isSearchFilterExists(SEARCH_CATEGORIES.LOCATION, countryID);
    if(!filterExists) addSearchFilter(countryName, SEARCH_CATEGORIES.LOCATION, countryID);
})

/*fired when user selects program.*/
userProram.addEventListener("change", e => {
    console.log(e.target.value);
})

/*fired when user selects program.*/
userAdmissionDate.addEventListener("change", e => {
    console.log(e.target.value);
})



/**
 * initialize countries in the register form.
 * @param {JSON} Countries 
 */
const initCountryInForm = (Countries) => {
    console.log(Countries);
    Countries.forEach(Country => {
        var option = document.createElement("option");
        option.setAttribute("value", Country.Country_ID);
        option.innerText = Country.Name;
        userCountry.append(option);
    })
    userCountry.disabled = false;
}

/**
 * initialize programs in the register form.
 * @param {JSON} programs 
 */
const initProgramInForm = (programs) => {
    console.log(programs);
    programs.forEach(program => {
        var option = document.createElement("option");
        option.setAttribute("value", program.Program_ID);
        option.innerText = program.Name;
        userProram.append(option);
    })
    userProram.disabled = false;
}


/**
 * retrieves countries from database.
 */
const getCountriesDB = () => {
    fetch(URL_COUNTRY)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Countries from Database!");}
        else {return res.json();}
    })
    .then(programs => {
        initCountryInForm(programs);
    })
    .catch(err => {
        //displayServerError();
        console.error(err);
    })
}


/**
 * retrieves programs from database.
 */
const getProgramsDB = () => {
    fetch(URL_PROGRAM)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Programs from Database!");}
        else {return res.json();}
    })
    .then(programs => {
        initProgramInForm(programs);
    })
    .catch(err => {
        //displayServerError();
        console.error(err);
    })
}

getCountriesDB();
getProgramsDB();

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
        showUniDetailsContainer(universityDetails);
    })
    .catch(err => {
        //displayServerError();
        alert(err);
        console.error(err);
    })
}

const showUniDetailsContainer = (universityDetails) => {
    console.log(universityDetails);
    disableScroll(body);
    setUniDetails(universityDetails);
    containerUniDetails.style.setProperty("left", "auto");
    containerUniDetails.style.setProperty("right", "100%");
    containerUniDetails.style.setProperty("right", "0px");
}


const addSavedSearches = (searches) => {

    if(!Array.isArray(searches)) return false;

    //add recommeded search
    addRecommendedSearch();

    searches.forEach(search => {
        var div = document.createElement("div");
        div.classList.add("saved-search-item");
        div.setAttribute("id", search.Search_ID);
        div.innerText = search.Name;
        sidebar.append(div);
    });
    return true;
}


const clearSavedSearches = () => {
    var savedSearches = document.querySelectorAll(".saved-search-item");
    for (let i = 0; i < savedSearches.length; i++) {
        savedSearches[i].remove();
    }
}

const selectSavedSearch = (id) => {
    var savedSearches = document.querySelectorAll(".saved-search-item");
    for (let i = 0; i < savedSearches.length; i++) {
        savedSearches[i].classList.remove("saved-search-item-selected");
        if(parseInt(savedSearches[i].id) === parseInt(id)) {
            savedSearches[i].classList.add("saved-search-item-selected");
        }
    }
}


const performSearch = (searchID) => {

}

const addRecommendedSearch = () => {
    var div = document.createElement("div");
    div.classList.add("recommeded-auto", "saved-search-item");
    div.setAttribute("id", RECOMMENDED_SEARCH_ID);
    div.innerText = "Recommended";
    sidebar.append(div);
}


const selectRecommendedSearch = () => {
    var recommededSearch = document.querySelectorAll(".recommeded-auto")[0];
    recommededSearch.click();
}



clearSavedSearches();

addSavedSearches(SAVED_SEARCHES);

selectRecommendedSearch();












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
    //emptyContainer(universitiesContainer);
    //changeContainerTitle("loading your feed...");
    removeLoadMoreButton();
    showContainerBusy();

    setTimeout(() => {
        //changeContainerTitle("Recommneded aaaaaa");
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





containerSearchFilters.addEventListener("change", e => {
    console.log(e.target);
})



const addSearchFilter = (name, category, id) => {
    var clearFilters = document.querySelectorAll(".clear-filters")[0];
    var div = document.createElement("div");
    div.classList.add("search-filter-item-wrapper");
    div.setAttribute("data-filter-category", category);
    div.setAttribute("id", id);

    div.innerHTML = `
                        <div class="search-filter-item">${name}
                            <i class="fa fa-times"></i>
                        </div>
                    `;
    //containerSearchFilters.append(div);
    containerSearchFilters.insertBefore(div, clearFilters);

}

const isSearchFilterExists = (category, id) => {
    var searchFilters = document.querySelectorAll(".search-filter-item-wrapper");
    console.log(searchFilters);
    for (let i = 0; i < searchFilters.length; i++) {
        const catAttr = searchFilters[i].getAttribute("data-filter-category");
        const exists = (parseInt(catAttr) === parseInt(category)) && (parseInt(searchFilters[i].id) === parseInt(id));
        if(exists) return true;
    }
    return false;
}

const clearAllSearchFilters = () => {
    containerSearchFilters.innerHTML = `<div class="clear-filters" style="color: #48a000; font-weight: bold; font-size: large;cursor: pointer;">Clear filters</div>`;
}



loadFirst();
changeRespOptsTitle("new title");


