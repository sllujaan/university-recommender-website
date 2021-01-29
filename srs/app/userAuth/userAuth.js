import { loadHeaderFooter } from "../util/util.js";
import { URL_USERS_AUTH } from "../urls/urlResolver.js";

/*dom elements*/
var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userTable = document.getElementById("user-table");
var searchUser = document.getElementById("search-user");

/*load header and footer*/
loadHeaderFooter(headerContainer, footerContainer);

/**
 * search users in table
 * @param {string} searchValue 
 */
const searchTable = (searchValue) => {
    var userRows = document.querySelectorAll(".user-row");
    userRows.forEach(userRow => {
        const userName = userRow.getElementsByClassName("user-name")[0].innerText;
        if(!userName.includes(searchValue)) {
            hideElement(userRow);
        }
        else {
            showElement(userRow);
        }
    })

}

/**
 * hide table element
 * @param {Element} element 
 */
const hideElement = (element) => {
    element.setAttribute("style", "display: none;");
}

/**
 * show table element
 * @param {Element} element 
 */
const showElement = (element) => {
    element.setAttribute("style", "display: table-row;");
}

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
 * show unauthorized message when the user is unauthorized.
 */
const showUnauthorizedMsg = () => {
    var unauthorizedContianer = document.getElementById("unauthorized-contianer");
    hideBusy();
    unauthorizedContianer.setAttribute("style", "display: block;");
}

/**
 * initialize user in the table
 * @param {JSON} users 
 */
const initUsersInTable = (users) => {
    showTable();
    users.forEach(user => {
        userTable.append(generateUserRow(user));
    })
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
    var tdProgram = document.createElement("td");

    tr.setAttribute("class", "user-row");
    tdName.setAttribute("class", "user-name");
    tdName.innerText = user.Name;
    tdEmail.innerText = user.Email;
    tdCountry.innerText = user.Country;
    tdCity.innerText = user.City;
    tdProgram.innerText = user.Program;

    tr.append(tdName);
    tr.append(tdEmail);
    tr.append(tdCountry);
    tr.append(tdCity);
    tr.append(tdProgram);

    return tr;
}


/**
 * get user authentication data from browser's local storage.
 */
const getUserData = () => {
    const sessionId = localStorage.getItem("session_id");
    const userId = parseInt(localStorage.getItem("user_id"));
    if(!sessionId || !userId) return null;
    else return "session_id="+sessionId+"&user_id="+userId;
}

/**
 * retrieve users from database.
 */
const getUsersDB = () => {
    const requestData = getUserData();
    if(!requestData) {
        showUnauthorizedMsg();
        return;
    }

    fetch(URL_USERS_AUTH, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestData // body data type must match "Content-Type" header
    })
    .then(res => {
        switch (res.status) {
            case 401:   //unauthorized user.
                showUnauthorizedMsg();
                break;
            case 200:   //OK, user is authorized.
                return res.json();  //convert response text to json format.
            default:
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


/*fired when user presses keywords in search bar*/
searchUser.addEventListener("keyup", e => {
    searchTable(e.target.value);
})

/*get and initialize users in users table*/
getUsersDB();
