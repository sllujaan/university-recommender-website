
export const HEADER_FILE_URL = "../header/header.html";
export const FOOTER_FILE_URL = "../footer/footer.html";



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

const copyAppHTMLElment = (fileLocation) => {
    const htmlAsText = readDocument(fileLocation);
    return htmlAsText;
}

export const getAppHeader = (fileLocation) => {
    return copyAppHTMLElment(fileLocation);
}

export const getAppFooter = (fileLocation) => {
    return copyAppHTMLElment(fileLocation);
}
