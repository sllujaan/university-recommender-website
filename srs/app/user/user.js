import { loadHeaderFooter } from "../util/util.js";
import { URL_USER_LOGIN } from "../urls/urlResolver.js";


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
    tdName.innerText = user.name;
    tdEmail.innerText = user.email;
    tdCountry.innerText = user.country;
    tdCity.innerText = user.city;
    tdProgram.innerText = user.program;

    tr.append(tdName);
    tr.append(tdEmail);
    tr.append(tdCountry);
    tr.append(tdCity);
    tr.append(tdProgram);

    return tr;
}



initUsersInTable(users);


searchUser.addEventListener("keyup", e => {
    searchTable(e.target.value);
})
