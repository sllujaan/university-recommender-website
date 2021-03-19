import { 
    loadHeaderFooter, enableScroll, disableScroll,
    getBusyContainer,
    getUserCredentialsLocalStorage
 } from "../util/util.js";
import { loadPrograms, UNIVERSITY_DETAILS } from "../accordian/accordian.js";
import {
    URL_UNIVERSITY_DETAILS, URL_COUNTRY, URL_PROGRAM,
    URL_CITY, URL_SEARCH, URL_CREATE_SEARCH
} from "../urls/urlResolver.js";


const RECOMMENDED_SEARCH_ID = -123;
var CURRENT_PAGE = 0;

const FIRST_LOAD = 0xf10
const LOAD_MORE = 0xf12
const RECOMMENDED = 0xc10;
const SAVED_SEARCH = 0xc12;

var PERFORMING_SEARCH = false;

var UNI_LOAD_TYPE = FIRST_LOAD;
var UNI_TYPE = RECOMMENDED;

const UNI_LOAD_STRUCT = {
    url: null,
    userID: null,
    pageNumber: null,
    loadType: null,
    requestData: null,
}

const SEARCH_CATEGORIES = {
    COUNTRY: 0x02da,
    CITY: 0x01cd,
    PROGRAM: 0x0aaa,
    ADMI_DATE: 0x0abc,
    BUDGET: 0x0def,
    MIN_MARKS: 0xeff,
}


var COUNTRY_EVENT = {
    aCOUNTRY_LOADED: false,
    aListener: function(val) {},
    set COUNTRY_LOADED(val) {
      this.aCOUNTRY_LOADED = val;
      this.aListener(val);
    },
    get COUNTRY_LOADED() {
      return this.aCOUNTRY_LOADED;
    },
    registerListener: function(listener) {
      this.aListener = listener;
    }
}

var CITY_EVENT = {
    aCITY_LOADED: false,
    aListener: function(val) {},
    set CITY_LOADED(val) {
      this.aCITY_LOADED = val;
      this.aListener(val);
    },
    get CITY_LOADED() {
      return this.aCITY_LOADED;
    },
    registerListener: function(listener) {
      this.aListener = listener;
    }
}


/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var body = document.querySelectorAll("body")[0];
var containerOpts = document.querySelectorAll(".container-opts")[0];
var universitiesContainer = document.querySelectorAll(".Universities-container")[0];
var uniContainerWrapper = document.querySelectorAll(".container-universities-wrapper")[0];
var btnLoadMore = document.querySelectorAll(".btn-load-more")[0];
var savedSearchItemSelected = document.querySelectorAll(".saved-search-item-selected")[0];
var containerUniDetails = document.querySelectorAll(".container-uni-details")[0];
var searchFilterItemWrapper = document.querySelectorAll(".search-filter-item-wrapper")[0];

var uniFoundNumber = document.querySelectorAll(".uni-found-number")[0];
var uniDetailsBackCover = document.querySelectorAll(".uni-details-back-cover")[0];




var sidebar = document.querySelectorAll(".side-bar")[0];
var sideBarRespClose = document.querySelectorAll(".side-bar-resp-close")[0];

var contianersavedSearchesResp = document.querySelectorAll(".container-saved-searches")[0];
var containerSearchFilters = document.querySelectorAll(".container-search-filters")[0];
var userSearchName = document.getElementById("user-search-name");
var userSearchBtn = document.getElementById("user-search-btn");
var userCountry = document.getElementById("user-country");
var userCity = document.getElementById("user-city");
var userProram = document.getElementById("user-program");
var userAdmissionDate= document.getElementById("user-addmission-date");
var userBudget = document.getElementById("user_budget_US_$");
var userMinMarksPct = document.getElementById("user-min_marks_pct");


var containerCalculatorWrapper = document.querySelectorAll(".container-calculator-wrapper")[0];
var containerSaveSearchWrapper = document.querySelectorAll(".container-save-search-wrapper")[0];
var saveSearchName = document.getElementById("save-search-name");
var saveSearchError = document.getElementById("save-search-error");
var saveSearchSubmit = document.getElementById("save-search-submit");



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
    {"Search_ID":"1","User_ID":"3","Name":"","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null,"Start_Admission_Date":null},
    {"Search_ID":"2","User_ID":"3","Name":"mySearch2","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"3","User_ID":"3","Name":"mySearch3","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"4","User_ID":"3","Name":"mySearch4","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null}
];




document.addEventListener("click", e => {
    console.log(e.target);

    const isSelectOption = (e.target.id === "searches-recommended-resp") || (e.target.parentElement.id === "searches-recommended-resp");
    const isLoadMore = (e.target.id === "load-more-button");
    const idUniDetails = e.target.classList.contains("uni-name");
    const isBackCaret = e.target.classList.contains("details-back-caret") || e.target.classList.contains("uni-details-back-cover");
    const isSavedSearch = e.target.classList.contains("saved-search-item");
    const isSearchFilter = e.target.parentElement.classList.contains("search-filter-item-wrapper") || (e.target.classList.contains("filter-item-close"));
    const isClearFilters = e.target.classList.contains("clear-filters");
    const isBtnFilterSearch = e.target.parentElement.classList.contains("btn-filter-search");
    const isSideBarRespClose = e.target.classList.contains("side-bar-resp-close");
    const isBtnSaveSearch = e.target.parentElement.classList.contains("btn-save-search");
    const userSearchBtn = e.target.classList.contains("user-search-btn");

    const isUniCalculator = e.target.parentElement.classList.contains("uni-calculator");
    const isUniCalculatorClose = e.target.classList.contains("calculator-close") || e.target.classList.contains("container-calculator-wrapper");
    

    //const isUniCalculator = e.target.parentElement.classList.contains("uni-calculator");
    const isSaveSearchClose = e.target.classList.contains("save-search-close") || e.target.classList.contains("container-save-search-wrapper");

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
            handleSearchFilterRemove(e);
            break;
        case isClearFilters:
            clearAllSearchFilters();
            //perform search on the event
            if(!PERFORMING_SEARCH) performUniSearchOnEvents();
            break;
        case isBtnFilterSearch:
            showSideBarResp();
            break;
        case isSideBarRespClose:
            hideSideBarResp();
            break;
        case isBtnSaveSearch:
            console.log("save search");
            //performSaveSearch();
            showSaveSearchContainer(userSearchName.value);
            break;
        case userSearchBtn:
            console.log(userSearchName.value);
            //perform search on the event
            performUniSearchOnEvents();
            break;
        case isUniCalculator:
            console.log("calculator");
            showMeritCalculator();
            break;
        case isUniCalculatorClose:
            hideMeritCalculator();
            break;
        case isSaveSearchClose:
            hideSaveSearchContainer();
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


/*fired when user click submit button or hits enter key.*/
document.forms[0].addEventListener("submit", e => {
    e.preventDefault();
    console.log("forms0");
    showSavingSearch();
    setTimeout(() => {
        performSaveSearch();
    }, 1000);
});

userSearchName.addEventListener("change", e => {
    console.log(e.target.value);
});

/*fired when user selects country.*/
userCountry.addEventListener("change", e => {
    const countryID = e.target.value;
    const countryName = e.target[e.target.selectedIndex].innerText;

    // const filterExists = isSearchFilterExists(SEARCH_CATEGORIES.LOCATION, countryID);
    // if(!filterExists) addSearchFilter(countryName, SEARCH_CATEGORIES.LOCATION, countryID);
    removeSearchFilterItem(SEARCH_CATEGORIES.CITY);

    addSearchFilterSingleVal(countryName, SEARCH_CATEGORIES.COUNTRY, countryID);
    getCitiesDB(e.target.value);
})

/*fired when user selects country.*/
userCity.addEventListener("change", e => {
    const cityID = e.target.value;
    const cityName = e.target[e.target.selectedIndex].innerText;

    // const filterExists = isSearchFilterExists(SEARCH_CATEGORIES.LOCATION, countryID);
    // if(!filterExists) addSearchFilter(countryName, SEARCH_CATEGORIES.LOCATION, countryID);
    addSearchFilterSingleVal(cityName, SEARCH_CATEGORIES.CITY, cityID);
})

/*fired when user selects program.*/
userProram.addEventListener("change", e => {
    const programID = e.target.value;
    const programName = e.target[e.target.selectedIndex].innerText;

    //const filterExists = isSearchFilterExists(SEARCH_CATEGORIES.PROGRAM, programID);
    //if(!filterExists) addSearchFilter(programName, SEARCH_CATEGORIES.PROGRAM, programID);

    addSearchFilterSingleVal(programName, SEARCH_CATEGORIES.PROGRAM, programID);
})

/*fired when user selects program.*/
userAdmissionDate.addEventListener("change", e => {
    const dateValue = e.target.value;
    const dateName = e.target[e.target.selectedIndex].innerText;

    addSearchFilterSingleVal(dateName, SEARCH_CATEGORIES.ADMI_DATE, dateValue);
})

userBudget.addEventListener("change", e => {
    const budgetValue = e.target.value;

    addSearchFilterSingleVal(budgetValue+"$", SEARCH_CATEGORIES.BUDGET, budgetValue);
})


userMinMarksPct.addEventListener("change", e => {
    const minMarksPct = parseInt(e.target.value);
    if((minMarksPct < 0) || (minMarksPct > 100)) {
        console.log(e.target);
        e.target.style.setProperty("border-color", "red");
        return;
    }
    else {
        e.target.style.setProperty("border-color", "lightgray");
    }

    addSearchFilterSingleVal(minMarksPct+"%", SEARCH_CATEGORIES.MIN_MARKS, minMarksPct);
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
 * initialize cities in the register form.
 * @param {JSON} cities 
 */
const initCityInForm = (cities) => {
    console.log(cities);
    userCity.innerHTML = `<option value="" selected disabled hidden>Select City</option>`;
    
    cities.forEach(city => {
        var option = document.createElement("option");
        option.setAttribute("value", city.City_ID);
        option.innerText = city.Name;
        userCity.append(option);
    })
    userCity.disabled = false;
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
    .then(countries => {
        initCountryInForm(countries);
        COUNTRY_EVENT.COUNTRY_LOADED = true;
    })
    .catch(err => {
        //displayServerError();
        console.error(err);
    })
}

/**
 * retrieves cities from database.
 */
const getCitiesDB = (CountryID) => {
    const URL = URL_CITY + "?id=" + CountryID;
    fetch(URL)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Cities from Database!");}
        else {return res.json();}
    })
    .then(cities => {
        initCityInForm(cities);
    })
    .catch(err => {
        displayServerError();
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



const performSaveSearch = () => {
    console.log(getSearch(saveSearchName.value));
    const searchObj = getSearch(saveSearchName.value);
    creatSearchDB(searchObj);
}

const getSearch = (name) => {

    const userCredentials = getUserCredentialsLocalStorage();

    var searchName = (name ? (name): (userSearchName.value));

    var search = {
        session_id: userCredentials.session_id,
        user_id: userCredentials.user_id,
        Name: searchName,
        Country_ID: null,
        City_ID: null,
        Program_ID: null,
        Budget_US_$: null,
        MM_PCT: null,
        Start_Admission_Date: null
    };

    var searchFilters = document.querySelectorAll(".search-filter-item-wrapper");
    console.log(searchFilters);
    for (let i = 0; i < searchFilters.length; i++) {        
        const catAttr = searchFilters[i].getAttribute("data-filter-category");
        const isValidCategory = isSearchFilterCategoryValid(catAttr);
        if(isValidCategory) {
            switch (parseInt(catAttr)) {
                case SEARCH_CATEGORIES.COUNTRY:
                    search.Country_ID = searchFilters[i].id;
                    break;
                case SEARCH_CATEGORIES.CITY:
                    search.City_ID = searchFilters[i].id;
                    break;
                case SEARCH_CATEGORIES.PROGRAM:
                    search.Program_ID = searchFilters[i].id;
                    break;
                case SEARCH_CATEGORIES.ADMI_DATE:
                    search.Start_Admission_Date = searchFilters[i].id;
                    break;
                case SEARCH_CATEGORIES.BUDGET:
                    search.Budget_US_$ = searchFilters[i].id;
                    break;
                case SEARCH_CATEGORIES.MIN_MARKS:
                    search.MM_PCT = searchFilters[i].id;
                    break;
                
            
                default:
                    break;
            }
        }
    }
    
    console.log(search);
    return search;
}




const removeSearchFilterItem = (category) => {
    var searchFilters = document.querySelectorAll(".search-filter-item-wrapper");
    console.log(searchFilters);
    for (let i = 0; i < searchFilters.length; i++) {
        const catAttr = searchFilters[i].getAttribute("data-filter-category");
        const exists = (parseInt(catAttr) === parseInt(category));
        if(exists) {
            searchFilters[i].remove();
            //performUniSearchOnEvents();
            return true;
        }
    }
    return false;
}



const showSideBarResp = () => {
    sidebar.style.setProperty("top", "0px");
}

const hideSideBarResp = () => {
    sidebar.style.setProperty("top", "100%");
}

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
    if(busy_bundle) busy_bundle.remove();
    
}

const showCouldNotLoadError = () => {
    universitiesContainer.innerHTML = "<div>Sorry We could'nt load please try again!</div>";
}

const removeLoadMoreButton = () => {
    btnLoadMore.remove();
}

const emptyContainer = (container) => {
    container.innerHTML = null;
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
    uniContainerWrapper.append(div);
}

const showUniDetails = (id) => {
    fetchUniverstyDetails(id);

    //setUniDetails(UNIVERSITY_DETAILS);
    //containerUniDetails.style.setProperty("left", "0%");

}

const hideUniDetails = () => {
    enableScroll(body);
    uniDetailsBackCover.classList.add("hide");
    containerUniDetails.style.setProperty("left", "100%");
}




const loadUniversites = (universities) => {
    var div = document.createDocumentFragment();

    universities.forEach(university => {
        var universityContainer = document.createElement("div");
        universityContainer.classList.add("university-container");
        universityContainer.innerHTML = `
        <div class="title" style="cursor: pointer; -webkit-line-clamp: 1;"><h5 id="${university.University_ID}" class="uni-name">${university.Name}</h5></div>
        <div class="description" style="color: #222;">${university.Description}</div>
        <div class="location"><span><i class="fa fa-map-marker" aria-hidden="true"></i></span><span style="font-size: small; font-weight: bold; color: #656565;">&nbsp;&nbsp;${university.CountryName}</span></div><br>
                `;
        div.append(universityContainer);
    });
    uniContainerWrapper.append(div);
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
    console.log(window.innerWidth);
    console.log(getWindowWidth());

    uniDetailsBackCover.classList.remove("hide");

    if(window.innerWidth > getWindowWidth()) {
        const leftOffset = window.innerWidth - getWindowWidth();
        containerUniDetails.style.setProperty("left", leftOffset+"px");
    }
    else {
        containerUniDetails.style.setProperty("left", "0%");
    } 

}



const getComputedStyleProperty = (elemtent, proptery) => {
    const compStyles = window.getComputedStyle(elemtent);
    return compStyles.getPropertyValue(proptery);

}

const getWindowWidth = () => {
    const widthStr = getComputedStyleProperty(containerUniDetails, "width");
    return parseInt(widthStr, 10);
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

const displayWentWrongFirstLoad = () => {
    hideContainerBusy();
    var div = document.createElement("div");
    div.classList.add("went-wrong");
    div.innerHTML = `
                <span class="went-wrong-msg">Sorry we Couldn't Load. Please</span>
                <span><a href="">try again!</a></span>`;
    uniContainerWrapper.append(div);
}

const displayNotFoundFirstLoad = () => {
    var div = document.createElement("div");
    div.classList.add("went-wrong");
    div.innerHTML = `
            <span class="went-wrong-msg">Not Found</span>`;

    uniContainerWrapper.append(div);
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



const fetchUniversities = (uniLoadStruct = UNI_LOAD_STRUCT) => {

    if(uniLoadStruct.loadType === FIRST_LOAD) {
        emptyContainer(uniContainerWrapper);
        ClearUniFounNum();
    }
    //changeContainerTitle("loading your feed...");
    removeLoadMoreButton();
    showContainerBusy();

    UNI_LOAD_TYPE = uniLoadStruct.loadType;
    const requestData = uniLoadStruct.requestData;

    fetch(uniLoadStruct.url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        const success = handleFirstLoadStatus(res.status);
        if(!success) throw new Error(res.status);
        return res.json();
    })
    .then(universities => {
        console.log(universities);
        const aboutUniversities = universities[0];
        const _universities = universities[1];
        if(uniLoadStruct.loadType === FIRST_LOAD) setUniFounNum(aboutUniversities.Total_Universities);
        loadUniversites(_universities);
        addLoadMoreButton();
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        //alert("error while fetching recommeded universites");
        //displayWentWrongFirstLoad();
        //console.log();
        console.error(err);
    });
}


const handleFirstLoadStatus = (status) => {

    changeContainerTitle("Recommneded");
    hideContainerBusy();
        
    switch (status) {
        case 404:
            if(UNI_LOAD_TYPE === FIRST_LOAD) {displayNotFoundFirstLoad();}
            else {removeLoadMoreButton();}
            return false;
        case 200:
            return true;
        default:
            displayWentWrongFirstLoad();
            return false;
    }
}



const performUniSearch = (requestData, loadType) => {

    var ulStruct = UNI_LOAD_STRUCT;
    ulStruct.url = URL_SEARCH + "?page=" + ++CURRENT_PAGE;
    ulStruct.userID = 12;
    ulStruct.loadType = loadType;
    ulStruct.requestData = requestData;

    fetchUniversities(ulStruct);
}


const setUniFounNum = (number) => {
    uniFoundNumber.innerText = number;
}

const ClearUniFounNum = () => {
    uniFoundNumber.innerText = 0;
}




const creatSearchDB = (searchObj) => {
    
    const requestData = prepareSavedSearchRequestData(searchObj);

    console.log(requestData);

    fetch(URL_CREATE_SEARCH, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        restoreSaveSearch();
        if(res.status === 200) {alert("The Request Processed Successfully!");hideSaveSearchContainer();}
        else if(res.status === 409) {showSaveSearchNameConflict();}
        else if(res.status === 401) {alert("Unauthorized! Login is required.");}
        else {alert("Something went wrong while processing the request!");}
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        console.error(err);
        alert(err);
    });
}


const showMeritCalculator = () => {
    containerCalculatorWrapper.style.removeProperty("display");
}

const hideMeritCalculator = () => {
    containerCalculatorWrapper.style.setProperty("display", "none");
}




const showSaveSearchContainer = (name) => {
    saveSearchName.value = name;
    containerSaveSearchWrapper.style.removeProperty("display");
}

const hideSaveSearchContainer = () => {
    containerSaveSearchWrapper.style.setProperty("display", "none");
}


const showSaveSearchNameConflict = () => {
    saveSearchError.innerText = "Search Name already exists!";
    saveSearchError.style.setProperty("color", "red");
    saveSearchName.style.setProperty("border-color", "red");
    saveSearchName.disabled = false;

    saveSearchSubmit.style.removeProperty("background-color");
    saveSearchSubmit.style.removeProperty("pointer-events");
    saveSearchSubmit.value = "Save";
}

const showSavingSearch = () => {
    saveSearchError.innerText = "*";
    saveSearchError.style.setProperty("color", "lightgray");
    saveSearchName.style.setProperty("border-color", "lightgray");
    saveSearchName.disabled = true;

    saveSearchSubmit.style.setProperty("background-color", "gray");
    saveSearchSubmit.style.setProperty("pointer-events", "none");
    saveSearchSubmit.value = "Saving...";
}

const restoreSaveSearch = () => {
    saveSearchError.innerText = "*";
    saveSearchError.style.setProperty("color", "red");
    saveSearchName.style.removeProperty("border-color");
    saveSearchName.disabled = false;

    saveSearchSubmit.style.removeProperty("background-color");
    saveSearchSubmit.style.removeProperty("pointer-events");
    saveSearchSubmit.value = "Save";
}

const getUrlParam = (key) => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var value = url.searchParams.get(key);
    return value;
}


const performUrlParamsOperation = () => {
    const name = getUrlParam("name");
    const countryid = getUrlParam("countryid");
    const city = getUrlParam("city");
    const program = getUrlParam("program");
    const date = getUrlParam("date");
    const budget = getUrlParam("budget");
    const minMarks = getUrlParam("minmarks");
    
    if(name) userSearchName.value = name;

    //set country  when ready or fetched from database---
    COUNTRY_EVENT.registerListener(() => {
        if(COUNTRY_EVENT.COUNTRY_LOADED === true) {
            
            if(countryid) userCountry.value = countryid;
        }  
    })
    
}

performUrlParamsOperation();

//showSaveSearchNameConflict();
//showSavingSearch();




// clearSavedSearches();

// addSavedSearches(SAVED_SEARCHES);

// selectRecommendedSearch();


const prepareSavedSearchRequestData = (search) => {
    //if(!search) return "";
    console.log(search);
    if(Object.keys(search).length === 0 && search.constructor === Object) return "";

    //get user credentials...
    const userCredentials = getUserCredentialsLocalStorage();
    const sessionID = userCredentials.session_id;
    const userID = userCredentials.user_id;

    const Name = search.Name ? (search.Name) : ("");
    const Country_ID = search.Country_ID ? (search.Country_ID) : ("");
    const City_ID = search.City_ID ? (search.City_ID) : ("");
    const Program_ID = search.Program_ID ? (search.Program_ID) : ("");
    const Budget_US_$ = search.Budget_US_$ ? (search.Budget_US_$) : ("");
    const MM_PCT = search.MM_PCT ? (search.MM_PCT/100) : ("");
    const Start_Admission_Date = search.Start_Admission_Date ? (search.Start_Admission_Date) : ("");
    

    const requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}&Name=${Name}&Country_ID=${Country_ID}&City_ID=${City_ID}&Program_ID=${Program_ID}&Budget_US_$=${Budget_US_$}&MM_PCT=${MM_PCT}&Start_Admission_Date=${Start_Admission_Date}`;

    return requestData;   
}












const loadFirst = () => {
    emptyContainer(uniContainerWrapper);
    //changeContainerTitle("loading your feed...");
    removeLoadMoreButton();
    showContainerBusy();

    setTimeout(() => {
        //changeContainerTitle("Recommneded aaaaaa");
        hideContainerBusy();
        //retrieve the search
        //getSearch();
        const requestData = prepareSavedSearchRequestData(SAVED_SEARCHES[0]);
        console.log(requestData);
        performUniSearch(requestData, FIRST_LOAD);
    }, 1000);
}


const loadMore = () => {
    removeLoadMoreButton();
    showContainerBusy();

    setTimeout(() => {
        hideContainerBusy();
        getSearch();
        const requestData = prepareSavedSearchRequestData(SAVED_SEARCHES[0]);
        console.log(requestData);
        performUniSearch(requestData, LOAD_MORE);
    }, 1000);

}


loadFirst();





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


const performUniSearchOnEvents = () => {

    PERFORMING_SEARCH = true;
    CURRENT_PAGE = 0;
    emptyContainer(uniContainerWrapper);
    showContainerBusy();
    //retrieve the search from dom
    const search = getSearch();
    const requestData = prepareSavedSearchRequestData(search);
    console.log(requestData);

    setTimeout(() => {
        hideContainerBusy();
        performUniSearch(requestData, FIRST_LOAD);
        PERFORMING_SEARCH = false;
    }, 1000);
    
}




// containerSearchFilters.addEventListener("DOMNodeRemoved", e => {
//     CURRENT_PAGE = 0;
//     console.log(uniContainerWrapper);
//     emptyContainer(uniContainerWrapper);
//     console.log("filter removed.");
//     //retrieve the search from dom
//     const search = getSearch();
//     console.log(search);
//     const requestData = prepareSavedSearchRequestData(search);
//     console.log(requestData);
//     performUniSearch(requestData, FIRST_LOAD);
// })

// containerSearchFilters.addEventListener("DOMNodeInserted", e => {
//     CURRENT_PAGE = 0;
//     emptyContainer(uniContainerWrapper);
    
//     //retrieve the search from dom
//     const search = getSearch();
//     const requestData = prepareSavedSearchRequestData(search);
//     console.log(requestData);
//     performUniSearch(requestData, FIRST_LOAD);
// })

const generateSearchFilter = (name, category, id) => {
    var div = document.createElement("div");
    div.classList.add("search-filter-item-wrapper");
    div.setAttribute("data-filter-category", category);
    div.setAttribute("id", id);

    div.innerHTML = `
                        <div class="search-filter-item">${name}
                            <i class="fa fa-times filter-item-close"></i>
                        </div>
                    `;
    return div;

}

const addSearchFilter = (name, category, id) => {
    var clearFilters = document.querySelectorAll(".clear-filters")[0];
    var filterItem = generateSearchFilter(name, category, id);

    containerSearchFilters.insertBefore(filterItem, clearFilters);

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

const isSearchFilterCategoryValid = (category) => {
    for (var prop in SEARCH_CATEGORIES) {
        console.log(SEARCH_CATEGORIES[prop], parseInt(category));
        if(SEARCH_CATEGORIES[prop] === parseInt(category)) {
            return true;
        }
    }
    return false;
}

//console.log(isSearchFilterCategoryValid(SEARCH_CATEGORIES.COUNTRY));

const addSearchFilterSingleVal = (name, category, id) => {
    var clearFilters = document.querySelectorAll(".clear-filters")[0];
    var searchFilters = document.querySelectorAll(".search-filter-item-wrapper");
    console.log(searchFilters);
    var exists = false;

    for (let i = 0; i < searchFilters.length; i++) {
        
        const catAttr = searchFilters[i].getAttribute("data-filter-category");
        exists = (parseInt(catAttr) === parseInt(category));
        //if exists replace that one
        if(exists) {
            console.log("exists");
            searchFilters[i].id = id;
            searchFilters[i].firstElementChild.innerHTML = name + `<i class="fa fa-times"></i>`;
            //perform search on the event
            performUniSearchOnEvents();
            return true;
        }
        
    }

    if(!exists) {
        var filterItem = generateSearchFilter(name, category, id);
        containerSearchFilters.insertBefore(filterItem, clearFilters);
        //perform search on the event
        performUniSearchOnEvents();
        return true;
    }

    return false;
}

const clearAllSearchFilters = () => {
    containerSearchFilters.innerHTML = `<div class="clear-filters" style="color: #48a000; font-weight: bold; font-size: large;cursor: pointer;">Clear filters</div>`;
    userCountry.selectedIndex = 0;
    userCity.selectedIndex = 0;
    userProram.selectedIndex = 0;
    userAdmissionDate.selectedIndex = 0;
    userBudget.value = "";
    userMinMarksPct.value = "";
}


const resetSearchFilterByCategory = (category) => {
    switch (parseInt(category)) {
        case SEARCH_CATEGORIES.COUNTRY:
            userCountry.selectedIndex = 0;
            userCity.disabled = true;
            userCity.selectedIndex = 0;
            break;
        case SEARCH_CATEGORIES.CITY:
            userCity.selectedIndex = 0;
            break;
        case SEARCH_CATEGORIES.PROGRAM:
            userProram.selectedIndex = 0;
            break;
        case SEARCH_CATEGORIES.ADMI_DATE:
            userAdmissionDate.selectedIndex = 0;
            break;
        case SEARCH_CATEGORIES.BUDGET:
            userBudget.value = "";
            break;
        case SEARCH_CATEGORIES.MIN_MARKS:
            userMinMarksPct.value = "";
            break;
        default:
            break;
    }
}

const handleSearchFilterRemove = (e) => {
    console.log(e.target.parentElement);
    const _filterCategory = e.target.parentElement.getAttribute("data-filter-category");
    resetSearchFilterByCategory(_filterCategory);
    
    //check if country then remove city filter as well
    if(parseInt(_filterCategory) === SEARCH_CATEGORIES.COUNTRY) {
        removeSearchFilterItem(SEARCH_CATEGORIES.CITY);
    }

    e.target.parentElement.remove();
    
    //perform search on the event
    performUniSearchOnEvents();
}



//loadFirst();
changeRespOptsTitle("new title");




//emptyContainer(uniContainerWrapper);


