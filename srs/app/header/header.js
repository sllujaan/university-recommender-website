
export var body = document.querySelectorAll("body");
var header = document.querySelectorAll(".header");





const readDocument = (fileLocation) => {
    // console.log(fileLocation);
    // console.log(window.location);
    return fetch(fileLocation)
    .then(res => {
        return res.text();
    })
    .then(data => {
        var header = createNewHeader(data);
        return header;
    })
}

const createNewHeader = (htmlAsText) => {
    //console.log(htmlAsText);
    var NewHTML = document.createElement("new-html");
    //console.log(NewHTML);
    NewHTML.innerHTML = htmlAsText;
    var appHeader = NewHTML.querySelectorAll(".header");
    //console.log(appHeader[0]);
    return appHeader;
}


export const getAppHeader = (fileLocation) => {
    const htmlAsText = readDocument(fileLocation);
    return htmlAsText;
}

// getAppHeader()
// .then(header => {
//     console.log(header[0]);
// })
