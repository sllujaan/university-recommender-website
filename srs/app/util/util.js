
export const HEADER_FILE_URL = "../header/header.html";
export const FOOTER_FILE_URL = "../footer/footer.html";



const readDocument = (fileLocation, htmlElement) => {
    // console.log(fileLocation);
    // console.log(window.location);
    return fetch(fileLocation)
    .then(res => {
        return res.text();
    })
    .then(data => {
        console.log(data);
        var header = createNewHeader(data, htmlElement);
        return header;
    })
}

const createNewHeader = (htmlAsText, htmlElement) => {
    //console.log(htmlAsText);
    var NewHTML = document.createElement("new-html");
    //console.log(NewHTML);
    NewHTML.innerHTML = htmlAsText;
    console.warn(htmlElement);
    var appHeader = NewHTML.querySelectorAll(htmlElement);
    //console.log(appHeader[0]);
    return appHeader;
}

const copyAppHTMLElment = (fileLocation, htmlElement) => {
    const htmlAsText = readDocument(fileLocation, htmlElement);
    return htmlAsText;
}

export const getAppHeader = (fileLocation) => {
    return copyAppHTMLElment(fileLocation, ".header");
}

export const getAppFooter = (fileLocation) => {
    return copyAppHTMLElment(fileLocation, ".footer");
}
