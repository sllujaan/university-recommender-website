import { 
    loadHeaderFooter, enableScroll, disableScroll,
    getBusyContainer, getUserCredentialsLocalStorage
 } from "../util/util.js";
import { loadPrograms, UNIVERSITY_DETAILS } from "../accordian/accordian.js";
import {
    URL_UNIVERSITY_DETAILS, URL_RECOMENDED, URL_SAVED_SEARCHES, URL_SEARCH,
    URL_VERIFY_LOGIN
} from "../urls/urlResolver.js";


const RECOMMENDED_SEARCH_ID = -123;
var CURRENT_PAGE = 0;

const FIRST_LOAD = 0xf10
const LOAD_MORE = 0xf12
const RECOMMENDED = 0xc10;
const SAVED_SEARCH = 0xc12;

var UNI_LOAD_TYPE = FIRST_LOAD;
var UNI_TYPE = RECOMMENDED;

const UNI_LOAD_STRUCT = {
    url: null,
    userID: null,
    pageNumber: null,
    loadType: null,
    requestData: null,
}

var UNI_CONTAINER_TITLE = "Recommended";

/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var body = document.querySelectorAll("body")[0];
var serverError = document.querySelectorAll(".server-error")[0];
var appBodyContent = document.querySelectorAll(".app-body-content")[0];
var uniSearch = document.querySelectorAll(".uni-search")[0];


var universitiesContainer = document.querySelectorAll(".Universities-container")[1];
var btnLoadMore = document.querySelectorAll(".btn-load-more")[0];
var savedSearchItemSelected = document.querySelectorAll(".saved-search-item-selected")[0];
var containerUniDetails = document.querySelectorAll(".container-uni-details")[0];
var uniDetailsBackCover = document.querySelectorAll(".uni-details-back-cover")[0];
var containerCalculatorWrapper = document.querySelectorAll(".container-calculator-wrapper")[0];

var sidebar = document.querySelectorAll(".side-bar")[0];
var uniUpdateBtn = document.querySelectorAll(".uni-update")[1];
/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


const UNIVERSITES = [
    {University_ID: 54, Name: "University of the Punjab", Description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", CountryName: "Pakistan"},
    {University_ID: 54, Name: "University of the Punjab", Description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", CountryName: "Pakistan"},
    {University_ID: 54, Name: "University of the Punjab", Description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", CountryName: "Pakistan"},
    {University_ID: 54, Name: "University of the Punjab", Description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", CountryName: "Pakistan"},
    {University_ID: 54, Name: "University of the Punjab", Description: "The University of the Punjab, also referred to as Punjab University, is a public research university located in Lahore, Punjab, Pakistan. Punjab University is the oldest public university in Pakistan.", CountryName: "Pakistan"},
];


const SAVED_SEARCHES = [
    {"Search_ID":"1","User_ID":"3","Name":"uni","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"2","User_ID":"3","Name":"mySearch2","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"3","User_ID":"3","Name":"mySearch3","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null},
    {"Search_ID":"4","User_ID":"3","Name":"mySearch4","Country_ID":null,"City_ID":null,"Program_ID":null,"budget_US_$":null,"MM_PCT":null}
];

var USER_SEARCHES = [];



document.addEventListener("click", e => {
    console.log(e.target);

    const isSelectOption = (e.target.id === "searches-recommended-resp") || (e.target.parentElement.id === "searches-recommended-resp");
    const isLoadMore = (e.target.id === "load-more-button");
    const idUniDetails = e.target.classList.contains("uni-name");
    const isBackCaret = e.target.classList.contains("details-back-caret") || e.target.classList.contains("uni-details-back-cover");
    const isSavedSearch = e.target.classList.contains("saved-search-item");
    const isSideResp = e.target.classList.contains("side-resp");
    const isUniUpdate = e.target.parentElement.classList.contains("uni-update");
    const isUniCalculator = e.target.parentElement.classList.contains("uni-calculator");
    const isRecommendedClick = e.target.classList.contains("recommeded-auto");
    const isUniCalculatorClose = e.target.classList.contains("calculator-close") || e.target.classList.contains("container-calculator-wrapper");

    const TRUE_VALUE = true;

    switch (TRUE_VALUE) {
        case isSideResp:
            showSideBarResp();
            break;
        case isLoadMore:
            loadMore();
            break;
        case idUniDetails:
            var uniID = parseInt(e.target.id);
            showUniDetails(uniID);
            break;
        case isBackCaret:
            hideUniDetails();
            break;
        case isSavedSearch:
            console.log("saved search....");
            selectSavedSearch(e.target.id);
            var SearchID = parseInt(e.target.id);
            performSavedSearch(e, SearchID);
            break;
        case isUniUpdate:
            var uniID = parseInt(e.target.parentElement.id);
            console.log("update uni", uniID);
            openInNewTab(`../updateUniversity/updateUniversity.html?id=${uniID}`);
            break;
        case isUniCalculator:
            console.log("calculator");
            showMeritCalculator();
            break;
        case isUniCalculatorClose:
            hideMeritCalculator();
            break;
        case isRecommendedClick:
            console.log("recommended click");
            break;
    
        default:
            hideSideBarResp();
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



const showSideBarResp = () => {
    sidebar.style.setProperty("top", "0px");
}

const hideSideBarResp = () => {
    sidebar.style.setProperty("top", "100%");
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
    container.innerHTML = `<div class="title title-opts search-link"><h2 style="font-weight: bold;">Loading your feed...</h2></div>`;
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
    uniDetailsBackCover.classList.add("hide");
    containerUniDetails.style.setProperty("left", "100%");
}

const showMeritCalculator = () => {
    containerCalculatorWrapper.style.removeProperty("display");
}

const hideMeritCalculator = () => {
    containerCalculatorWrapper.style.setProperty("display", "none");
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

    //set update button id
    uniUpdateBtn.id = University.University_ID;


    loadPrograms(universityDetails);

}


const showUniDetailsSomethingWentWrong = () => {
    //display appropriate message when university details are loaded correctly.
}


uniSearch.addEventListener("keyup", e => {
    console.log(e.keyCode);
    if(e.keyCode === 13) {
        openInNewTab(`../search/search.html?name=${e.target.value}`);
    }
    
})



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

const updateUniDetailsContainerOnWinResize = () => {
    const isUniDetailsHidden = uniDetailsBackCover.classList.contains("hide");

    if(!isUniDetailsHidden) {
        if(window.innerWidth > getWindowWidth()) {
            const leftOffset = window.innerWidth - getWindowWidth();
            containerUniDetails.style.setProperty("left", leftOffset+"px");
        }
        else {
            containerUniDetails.style.setProperty("left", "0%");
        } 
    }
}


window.addEventListener("resize", e => {
    updateUniDetailsContainerOnWinResize();
})

const getWindowWidth = () => {
    const widthStr = getComputedStyleProperty(containerUniDetails, "width");
    return parseInt(widthStr, 10);
}


const getComputedStyleProperty = (elemtent, proptery) => {
    const compStyles = window.getComputedStyle(elemtent);
    return compStyles.getPropertyValue(proptery);

}

const getSaveSearchByID =  (searches, id) => {
    for (let i = 0; i < searches.length; i++) {
        if(parseInt(searches[i].Search_ID) === parseInt(id)) return searches[i];
    }
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}


const addSavedSearches = (searches) => {

    if(!Array.isArray(searches)) return false;

    //add recommeded search
    console.log("adding recommended searches....");
    addRecommendedSearch();
    selectRecommendedSearch();

    searches.forEach(search => {
        var div = document.createElement("div");
        div.classList.add("saved-search-item");
        div.setAttribute("id", search.Search_ID);
        div.innerText = search.Name;
        sidebar.append(div);
        //store search for future use
        USER_SEARCHES.push(search);
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


const performSavedSearchesUni = (requestData, loadType) => {

    var ulStruct = UNI_LOAD_STRUCT;
    ulStruct.url = URL_SEARCH + "?page=" + ++CURRENT_PAGE;
    ulStruct.userID = 12;
    ulStruct.loadType = loadType;
    ulStruct.requestData = requestData;

    emptyContainer(universitiesContainer);
    showContainerBusy();
    
    setTimeout(() => {
        fetchUniversities(ulStruct);
        hideContainerBusy();
    }, 1000);
    
}


const performSavedSearch = (e, searchID) => {
    const search = getSaveSearchByID(USER_SEARCHES, searchID);
    const isRecommendedClick = e.target.classList.contains("recommeded-auto");

    if(isRecommendedClick) {
        //perform recommended search
        // CURRENT_PAGE = 0;
        // fetchRecommendedUniversitiesEx("id=12", FIRST_LOAD);
        console.log("rrrrrrrrrrrecommended");
        UNI_CONTAINER_TITLE = "Recommended";
        CURRENT_PAGE = 0;
        loadFirst();
        return;
    }

    if(!search) {
        alert("Somthing went wrong while retrieving saved search internally!");
        return;
    }

    console.log(USER_SEARCHES);
    console.log(search);

    CURRENT_PAGE = 0;
    const requestData = prepareSavedSearchRequestData(search);
    console.log(requestData);

    UNI_CONTAINER_TITLE = search.Name;

    performSavedSearchesUni(requestData, FIRST_LOAD);

}


const fetchUniForSavedSearch = (search, pageNumber) => {

    if(loadType === FIRST_LOAD) emptyContainer(universitiesContainer);
    changeContainerTitle("Loading your feed...");
    removeLoadMoreButton();
    showContainerBusy();

    UNI_LOAD_TYPE = loadType;

    const requestData = "id="+userID;
    const url = URL_SEARCH + "?page=" + pageNumber;
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        const success = handleFirstLoadStatus(res.status);
        if(!success) throw new Error("went wrong!");
        return res.json();
    })
    .then(universities => {
        loadUniversites(universities);
        addLoadMoreButton();
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        //alert("error while fetching recommeded universites");
        displayWentWrongFirstLoad();
        console.error(err);
    });
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



// clearSavedSearches();

// addSavedSearches(SAVED_SEARCHES);

//selectRecommendedSearch();











// const loadMore = () => {
//     removeLoadMoreButton();
//     showContainerBusy();

//     setTimeout(() => {
//         hideContainerBusy();
//         loadUniversites(UNIVERSITES);
//         addLoadMoreButton();
//     }, 3000);

// }


const fetchUniversities = (uniLoadStruct = UNI_LOAD_STRUCT) => {

    if(uniLoadStruct.loadType === FIRST_LOAD) emptyContainer(universitiesContainer);
    changeContainerTitle("loading your feed...");
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
        var _universities = universities[1];
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




const fetchRecommendedUniversitiesEx = (requestData, loadType) => {
    var ulStruct = UNI_LOAD_STRUCT;
    ulStruct.url = URL_RECOMENDED + "?page=" + ++CURRENT_PAGE;
    ulStruct.userID = 12;
    //ulStruct.pageNumber = ++CURRENT_PAGE;
    ulStruct.loadType = loadType;
    ulStruct.requestData = requestData;

    fetchUniversities(ulStruct);

}



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
    const MM_PCT = search.MM_PCT ? (search.MM_PCT) : ("");
    const Start_Admission_Date = search.Start_Admission_Date ? (search.Start_Admission_Date) : ("");
    

    const requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}&Name=${Name}&Country_ID=${Country_ID}&City_ID=${City_ID}&Program_ID=${Program_ID}&Budget_US_$=${Budget_US_$}&MM_PCT=${MM_PCT}&Start_Admission_Date${Start_Admission_Date}`;

    return requestData;   
}


const loadFirst = () => {
    emptyContainer(universitiesContainer);
    //changeContainerTitle("loading your feed...");
    removeLoadMoreButton();
    showContainerBusy();

    const userCredentials = getUserCredentialsLocalStorage();

    setTimeout(() => {
        //changeContainerTitle("Recommneded aaaaaa");
        hideContainerBusy();
        //fetchRecommendedUniversities(12, ++CURRENT_PAGE, FIRST_LOAD);
        if(UNI_TYPE === RECOMMENDED) fetchRecommendedUniversitiesEx(`id=${userCredentials.user_id}`, FIRST_LOAD);
        else {
            const requestData = prepareSavedSearchRequestData(SAVED_SEARCHES[0]);
            console.log(requestData);
            performSavedSearchesUni(requestData, FIRST_LOAD);
        }
    }, 1000);
}


const loadMore = () => {
    removeLoadMoreButton();
    showContainerBusy();

    setTimeout(() => {
        hideContainerBusy();
        //fetchRecommendedUniversities(12, ++CURRENT_PAGE, LOAD_MORE);
        if(UNI_TYPE === RECOMMENDED) fetchRecommendedUniversitiesEx("id=12", LOAD_MORE);
        else {
            const requestData = prepareSavedSearchRequestData(SAVED_SEARCHES[0]);
            console.log(requestData);
            performSavedSearchesUni(requestData, LOAD_MORE);
        }
        
        //loadUniversites(UNIVERSITES);
        //addLoadMoreButton();
    }, 1000);

}

// UNI_TYPE = RECOMMENDED;
// CURRENT_PAGE = 0;
// loadFirst();

const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}

console.log(serialize(SAVED_SEARCHES[0]));

const generateJsonFromUrlParams = () => {
    var locSearch = location.search.substring(1);
    if(!locSearch) return {};

    const jsonObj = JSON.parse('{"' + decodeURI(locSearch.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
    return jsonObj;
}

console.log(generateJsonFromUrlParams());


// const loadFirst = () => {
//     emptyContainer(universitiesContainer);
//     changeContainerTitle("loading your feed...");
//     removeLoadMoreButton();
//     showContainerBusy();

//     setTimeout(() => {
//         changeContainerTitle("Recommneded aaaaaa");
//         hideContainerBusy();
//         loadUniversites(UNIVERSITES);
//         addLoadMoreButton();
//     }, 1000);

// }


// const loadFirst = () => {
//     emptyContainer(universitiesContainer);
//     changeContainerTitle("loading your feed...");
//     removeLoadMoreButton();
//     showContainerBusy();

//     setTimeout(() => {
//         changeContainerTitle("Recommneded aaaaaa");
//         hideContainerBusy();
//         //loadUniversites(UNIVERSITES);
//         displayWentWrongFirstLoad();
//         //addLoadMoreButton();
//     }, 1000);

// }


/**
 * hide busy
 * used when fetching users from database.
 */
 const hideBusy = () => {
    var busy = document.getElementById("busy");
    busy.setAttribute("style", "display: none;");
}

const displyStandardMsg = (elment, msg, color) => {
    hideBusy();
    elment.innerText = msg;
    elment.style.setProperty("color", color);
    elment.classList.remove("hide");
    appBodyContent.classList.add("hide");
}

const hideStandardMsg = (elment) => {
    hideBusy();
    elment.innerText = "";
    appBodyContent.classList.remove("hide");
    elment.classList.add("hide");
}


const displayWentWrongFirstLoad = () => {
    hideContainerBusy();
    var div = document.createElement("div");
    div.classList.add("went-wrong");
    div.innerHTML = `
                <span class="went-wrong-msg">Sorry we Couldn't Load. Please</span>
                <span><a href="">try again!</a></span>`;
    universitiesContainer.append(div);
}

const displayNotFoundFirstLoad = () => {
    var div = document.createElement("div");
    div.classList.add("went-wrong");
    div.innerHTML = `
            <span class="went-wrong-msg">Not Found</span>`;

    universitiesContainer.append(div);
}





const fetchRecommendedUniversities = (userID, pageNumber, loadType) => {

    if(loadType === FIRST_LOAD) emptyContainer(universitiesContainer);
    changeContainerTitle("loading your feed...");
    removeLoadMoreButton();
    showContainerBusy();

    UNI_LOAD_TYPE = loadType;

    const requestData = "id="+userID;
    const url = URL_RECOMENDED + "?page=" + pageNumber;
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        const success = handleFirstLoadStatus(res.status);
        if(!success) throw new Error("went wrong!");
        return res.json();
    })
    .then(universities => {
        loadUniversites(universities);
        addLoadMoreButton();
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        //alert("error while fetching recommeded universites");
        displayWentWrongFirstLoad();
        console.error(err);
    });
}

//fetchRecommendedUniversities(12, ++CURRENT_PAGE, FIRST_LOAD);


const handleFirstLoadStatus = (status) => {

    changeContainerTitle(UNI_CONTAINER_TITLE);
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




const fetchSavedSearches = () => {

    const userCredentials = getUserCredentialsLocalStorage();
    const requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}`;

    fetch(URL_SAVED_SEARCHES, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        if(res.status === 404) {
            console.warn("404 searches");
            hideStandardMsg(serverError);
            clearSavedSearches();
            addRecommendedSearch();
            selectRecommendedSearch();
            addSavedSearches();
        }
        else if(res.status !== 200) throw new Error("Somthing went wrong while fetching saved Searches!");
        else {
            hideStandardMsg(serverError);
            return res.json();
        }
    })
    .then(savedSearches => {
        console.log(savedSearches);
        if(savedSearches) {
            clearSavedSearches();
            addSavedSearches(savedSearches);
        }
        
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        clearSavedSearches();
        //addRecommendedSearch();
        displyStandardMsg(serverError, "Server Error: Unabale to fetch saved searches!", "red");
        console.error(err);
    });
}



//fetchSavedSearches();



const verifyLogin = () => {

    const userCredentials = getUserCredentialsLocalStorage();
    const requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}`;

    fetch(URL_VERIFY_LOGIN, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        if(res.status === 200) {
            //hideStandardMsg(serverError);
            fetchSavedSearches();

        }
        else if(res.status === 401) {displyStandardMsg(serverError, "Unauthorized!", "red");}
        else {displyStandardMsg(serverError, "Sorry we couldn't verifying the login! Please try again.", "red");}
    })
    .catch(err => {
        displyStandardMsg(serverError, "Server Error: Unable to verify login!", "red");
        //alert("Something went wrong while verifying the login!");
    });
}



verifyLogin();






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


//showUniDetails(50);

changeRespOptsTitle("new title");


