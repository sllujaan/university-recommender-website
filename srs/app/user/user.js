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

const displayServerError = () => {
    alert("net::ERR_CONNECTION_REFUSED\n\
    1. Make sure that back-end server is running properly.\n\
    2. Make sure Database service is also running properly.");
}
const showTable = () => {
    var tableContainer = document.getElementsByClassName("table-container")[0];
    tableContainer.setAttribute("style", "display: block;");
}

const users = [
    {name: "jake", email: "jake@email", country: "us", city: "new york", program: "CS"},
    {name: "jake", email: "jake@email", country: "us", city: "new york", program: "CS"},
    {name: "jake", email: "jake@email", country: "us", city: "new york", program: "CS"},
    {name: "jake", email: "jake@email", country: "us", city: "new york", program: "CS"},
    {name: "jake", email: "jake@email", country: "us", city: "new york", program: "CS"}
]

const initUsersInTable = (users) => {
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



const getUsersDB = () => {
    fetch(URL_USERS)
    .then(res => {
        if(res.status !== 200) {alert("There was an error while fetching Programs from Database!");}
        else {return res.json();}
    })
    .then(users => {
        if(users) initUsersInTable(users);
    })
    .catch(err => {
        displayServerError();
        console.error(err);
    })
}


//initUsersInTable(users);

getUsersDB();

searchUser.addEventListener("keyup", e => {
    searchTable(e.target.value);
})



setTimeout(() => {
    showTable();
}, 5000);