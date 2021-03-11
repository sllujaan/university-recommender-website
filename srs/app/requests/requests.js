import { loadHeaderFooter, getUserCredentialsLocalStorage } from "../util/util.js";
import { URL_REQUESTS } from "../urls/urlResolver.js";

/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userTable = document.getElementById("user-table");
var buttonView = null;
var backCoverRequestDetails = document.querySelectorAll(".back-cover-request-details")[0];

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);


var USERS_REQUESTS = null;
var CURRENT_VIEWED_USER = null;



/**
 * show error while fetching users from database.
 */
const showRequestServiceFailed = () => {
    var serverError = document.getElementById("server-error");
    hideBusy();
    serverError.setAttribute("style", "display: block; color: red;");
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



const showRequestDetails = (user) => {

    backCoverRequestDetails.classList.remove("hide");
}

const handleViewDetails = (e) => {
    console.log(e);
    const userID = e.target.getAttribute("data-user-id");
    const user = USERS_REQUESTS.filter(user => user.User_ID === userID);
    setCurrentViewedUser(user[0]);
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
    const isbackCoverRequestDetails = (e.target === backCoverRequestDetails);
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

    const requestData = prepareRequestData(userID);
    console.log(requestData);
    return;

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        switch (res.status) {
            case 409:   //conflict, user name exists in the database.
                setFormValidityVars(fieldName, false);
                displayConflictError(errElement , e.target.value, fieldName);
                break;
            case 200:   //ok user name does not exit in the database.
                setFormValidityVars(fieldName, true);
                displayInputOK(errElement, e.target.value);
                break;
            default:    //other response from backend server
                setFormValidityVars(fieldName, false);
                displayServerError();
                break;
        }
    })
    .catch(err => {     //there was an error while sending the request or server did not response.
        setFormValidityVars(fieldName, false);
        displayServerError();
        console.error(err);
    })
}

const rejectRequest = (userID) => {

}


/*get and initialize users in users table*/
getRequestsDB();

