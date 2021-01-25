import { loadHeaderFooter } from "../util/util.js";
import { URL_USERS } from "../urls/urlResolver.js";


var headerContainer = document.querySelectorAll(".header-container-wrapper")[0];
var footerContainer = document.querySelectorAll(".footer-container-wrapper")[0];
var userTable = document.getElementById("user-table");
var searchUser = document.getElementById("search-user");
loadHeaderFooter(headerContainer, footerContainer);




const searchTable = (searchValue) => {
    var userRows = document.querySelectorAll(".user-row");
    userRows.forEach(userRow => {
        const userName = userRow.getElementsByClassName("user-name")[0].innerText;
        // console.log(userName);
        // console.log(userName.includes(searchValue));
        if(!userName.includes(searchValue)) {
            hideElement(userRow);
        }
        else {
            showElement(userRow);
        }
    })

}

const hideElement = (element) => {
    element.setAttribute("style", "display: none;");
}

const showElement = (element) => {
    element.setAttribute("style", "display: table-row;");
}

const showRequestServiceFailed = () => {
    var serverError = document.getElementById("server-error");
    hideBusy();
    serverError.setAttribute("style", "display: block; color: red;");
}

const displayServerError = () => {
    alert("net::ERR_CONNECTION_REFUSED\n\
    1. Make sure that back-end server is running properly.\n\
    2. Make sure Database service is also running properly.");
    showRequestServiceFailed();
}


const showTable = () => {
    hideBusy();
    var tableContainer = document.getElementsByClassName("table-container")[0];
    tableContainer.setAttribute("style", "display: block;");
}

const hideBusy = () => {
    var busy = document.getElementById("busy");
    busy.setAttribute("style", "display: none;");
}

const showUnauthorizedMsg = () => {
    var unauthorizedContianer = document.getElementById("unauthorized-contianer");
    hideBusy();
    unauthorizedContianer.setAttribute("style", "display: block;");
}


const users = [
    {Name: "jake", Email: "jake@email", Country: "us", City: "new york", Program: "CS"},
    {Name: "jake", Email: "jake@email", Country: "us", City: "new york", Program: "CS"},
    {Name: "jake", Email: "jake@email", Country: "us", City: "new york", Program: "CS"},
    {Name: "jake", Email: "jake@email", Country: "us", City: "new york", Program: "CS"},
    {Name: "jake", Email: "jake@email", Country: "us", City: "new york", Program: "CS"},
]

const initUsersInTable = (users) => {
    showTable();
    users.forEach(user => {
        userTable.append(generateUserRow(user));
    })
}

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


const getUserData = () => {
    const sessionId = localStorage.getItem("session_id");
    const userId = parseInt(localStorage.getItem("user_id"));

    if(!sessionId || !userId) return null;
    else return {"session_id": sessionId, "user_id": userId};
}

console.log(getUserData());



const getUsersDB = () => {

    const requestData = getUserData();

    if(!requestData) {
        showUnauthorizedMsg();
        return;
    }

    console.log(requestData);

    fetch(URL_USERS, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"session_id":"6c549eb55a5825b3a91af449ad4308cf","user_id":1}) // body data type must match "Content-Type" header
    })
    .then(res => {
        switch (res.status) {
            case 401:
                showUnauthorizedMsg();
                break;
            case 200:
                alert("SUCCESS!");
                return res.json();
            default:
                showRequestServiceFailed();
                alert("There was an error while fetching Programs from Database!");
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




const getUsersNew = () => {

    fetch(URL_USERS, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"session_id":"85c52b42bc29a6808ae9fe285a175311","user_id":1}) // body data type must match "Content-Type" header
    })
    .then(res => {
        console.log(res.status);
        if(res.status === 200) return res.json();
        else res.text();
    })
    .then(users => {
        console.log(users);
    })
    .catch(err => {
        console.error(err);
    })
}


hideBusy();
initUsersInTable(users);


searchUser.addEventListener("keyup", e => {
    searchTable(e.target.value);
})



// setTimeout(() => {
//     showUnauthorizedMsg();
// }, 3000);