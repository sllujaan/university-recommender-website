import { loadHeaderFooter, getUserCredentialsLocalStorage } from "../util/util.js";
import { URL_REQUESTS, URL_REQUEST_ACCEPT, URL_REQUEST_REJECT,
    URL_VERIFY_ADMIN
} from "../urls/urlResolver.js";

/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userTable = document.getElementById("user-table");
var buttonView = null;
var backCoverRequestDetails = document.querySelectorAll(".back-cover-request-details")[0];

var userNameD = document.querySelectorAll(".user-name")[0];
var userEmailD = document.querySelectorAll(".user-email")[0];
var userCountryD = document.querySelectorAll(".user-country")[0];
var userCityD = document.querySelectorAll(".user-city")[0];
var userProgramD = document.querySelectorAll(".user-program")[0];
var userEtmD = document.querySelectorAll(".user-etm")[0];
var userRoleD = document.querySelectorAll(".user-role")[0];
var userAdmiStartDateD = document.querySelectorAll(".user-admi-start-date")[0];
var userHEduPctD = document.querySelectorAll(".user-h-edu-pct")[0];
var userSEduPctD = document.querySelectorAll(".user-s-edu-pct")[0];
var userAccStatusD = document.querySelectorAll(".user-acc-status")[0];
var userReqDateD = document.querySelectorAll(".user-req-date")[0];

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


var USERS_REQUESTS = null;
var CURRENT_VIEWED_USER = null;
const REQUEST_ACCEPT = 0x0ff;
const REQUEST_REJECT = 0x0ef;



/**
 * show error while fetching users from database.
 */
const showRequestServiceFailed = () => {
    var serverError = document.getElementById("server-error");
    hideBusy();
    serverError.setAttribute("style", "display: block; color: red;");
}


const displayStandardMsg = (msg, danger) => {
    var serverError = document.getElementById("server-error");
    hideBusy();
    serverError.innerText = msg;
    if(danger) {serverError.setAttribute("style", "display: block; color: red;");}
    else {serverError.setAttribute("style", "display: block; color: #37a000;");}
}


/**
 * display server error.
 */
const displayServerError = () => {
    alert("net::ERR_CONNECTION_REFUSED\n\
    1. Make sure that back-end server is running properly.\n\
    2. Make sure Database service is also running properly.");
    showRequestServiceFailed();
}

/**
 * make table visible
 */
const showTable = () => {
    hideBusy();
    var tableContainer = document.getElementsByClassName("table-container")[0];
    tableContainer.setAttribute("style", "display: block;");
}

/**
 * hide busy
 * used when fetching users from database.
 */
const hideBusy = () => {
    var busy = document.getElementById("busy");
    busy.setAttribute("style", "display: none;");
}

/**
 * initialize user in the table
 * @param {JSON} users 
 */
const initUsersInTable = (users) => {
    //push user in global array for future use
    USERS_REQUESTS = users;
    console.log(USERS_REQUESTS);

    showTable();
    users.forEach(user => {
        userTable.append(generateUserRow(user));
    })
}


const setUserDetails = (user) => {
    userNameD.innerText = user.Name;
    userEmailD.innerText = user.Email;
    userCountryD.innerText = user.Country;
    userCityD.innerText = user.City;
    userProgramD.innerText = user.Program;
    userEtmD.innerText = (user.User_ETM_PCT * 100) + "%";
    userRoleD.innerText = user.User_Role;
    userAdmiStartDateD.innerText = user.User_Start_Admission_Date;
    userHEduPctD.innerText = (user.User_H_Education_PCT * 100) + "%";
    userSEduPctD.innerText = (user.User_S_Education_PCT * 100) + "%";
    userAccStatusD.innerText = user.Account_Status_Name;
    userReqDateD.innerText = user.Request_Creation_Date;
}


const showRequestDetails = (user) => {
    backCoverRequestDetails.classList.remove("hide");
}

const handleViewDetails = (e) => {
    console.log(e);
    const userID = e.target.getAttribute("data-user-id");
    const user = USERS_REQUESTS.filter(user => user.User_ID === userID);
    setCurrentViewedUser(user[0]);
    setUserDetails(user[0]);
    showRequestDetails(user[0]);
}


const getViewDetailsButton =  (id) => {
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn-view");
    btn.setAttribute("data-user-id", id);
    btn.innerText = "View Details";
    btn.addEventListener("click", handleViewDetails);
    return btn;
}

/**
 * generate new user row for table.
 * @param {JSON} user 
 */
const generateUserRow = (user) => {
    var tr = document.createElement("tr");
    var tdName = document.createElement("td");
    var tdEmail = document.createElement("td");
    var tdCountry = document.createElement("td");
    var tdCity = document.createElement("td");
    var tdButton = document.createElement("td");

    tr.setAttribute("class", "user-row");
    tdName.setAttribute("class", "user-name");
    tdName.innerText = user.Name;
    tdEmail.innerText = user.Email;
    tdCountry.innerText = user.Country;
    tdCity.innerText = user.City;
    tdButton.append(getViewDetailsButton(user.User_ID));

    tr.append(tdName);
    tr.append(tdEmail);
    tr.append(tdCountry);
    tr.append(tdCity);
    tr.append(tdButton);

    return tr;
}

/**
 * retrieve users from database.
 */
const getRequestsDB = () => {
    fetch(URL_REQUESTS, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
    .then(res => {
        switch (res.status) {
            case 200:   //OK, Users found
                return res.json();  //convert response text to json format.
            case 404:
                displayStandardMsg("No Request Found", true);
                return;
            default:    //other response from backend server.
                showRequestServiceFailed();
                alert("There was an error while fetching Users from Database!");
                displayServerError();
                break;
        }
    })
    .then(users => {
        if(users) {
            initUsersInTable(users);
        };
    })
    .catch(err => {
        displayServerError();
        console.error(err);
    })
}


const setCurrentViewedUser = (user) => {
    CURRENT_VIEWED_USER = user;
}

const clearCurrentViewedUser = () => {
    CURRENT_VIEWED_USER = null;
}


document.addEventListener("click", e => {
    const isbackCoverRequestDetails = (e.target === backCoverRequestDetails) || (e.target.id === "request-view-close");
    const isRequestAccept = (e.target.id === "request-accept");
    const isRequestReject = (e.target.id === "request-reject");

    const TRUE_VALUE = true;

    console.log(e.target);

    switch (TRUE_VALUE) {
        case isbackCoverRequestDetails:
            clearCurrentViewedUser();
            backCoverRequestDetails.classList.add("hide");
            break;
        case isRequestAccept:
            console.log("accept", CURRENT_VIEWED_USER.User_ID);
            acceptRequest(CURRENT_VIEWED_USER.User_ID);
            break;
        case isRequestReject:
            rejectRequest(CURRENT_VIEWED_USER.User_ID);
            console.log("reject", CURRENT_VIEWED_USER.User_ID);
            break;
        
        default:
            break;
    }

    //backCoverRequestDetails.classList.add("hide");
})


const prepareRequestData = (userID) => {
    const userCredentials = getUserCredentialsLocalStorage();
    var requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}&user_id_requested=${userID}`;
    return requestData;
}

const acceptRequest = (userID) => {
    processFetchRequest(REQUEST_ACCEPT, userID);
}

const rejectRequest = (userID) => {
    processFetchRequest(REQUEST_REJECT, userID);
}

const processFetchRequest = (requestType, userID) => {
    const requestData = prepareRequestData(userID);
    console.log(requestData);
    console.log(requestType);

    var url = null;
    if(requestType === REQUEST_ACCEPT) {
        url = URL_REQUEST_ACCEPT;
    }else if(requestType === REQUEST_REJECT) {
        url = URL_REQUEST_REJECT;
    }
    

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        if(res.status !== 200) {throw new Error("Something went wrong while processing the request!");}
        else {alert("request processed successfully!");location.reload();}
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        console.error(err);
        alert(err.message);
    })
}




const verifyAdminAndShowRequests = () => {

    const userCredentials = getUserCredentialsLocalStorage();
    const requestData = `session_id=${userCredentials.session_id}&user_id=${userCredentials.user_id}`;

    fetch(URL_VERIFY_ADMIN, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        if(res.status === 200) {
            /*get and initialize users in users table*/
            getRequestsDB();
        }
        else if(res.status === 401) {displayStandardMsg("Unauthorized! Only Admin is allowed to use this feature.", true);}
        else {displayStandardMsg("Server Error: Unable to verify Admin! Please try again.", true);}
    })
    .catch(err => {
        displayStandardMsg("Server Error: Unable to verify login!", true);
        //alert("Something went wrong while verifying the login!");
    });
}


verifyAdminAndShowRequests();

/*get and initialize users in users table*/
//getRequestsDB();

