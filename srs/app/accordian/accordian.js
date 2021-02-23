

var openedprogramPanelEl = null;


document.addEventListener("click", e => {

    const isProgramAccordian = e.target.classList.contains("accordian-program-item");
    
    if(isProgramAccordian) {
        toggleAccordian(e.target.parentElement);
    }


})

const toggleAccordian = (accordianEl) => {
    //document.querySelectorAll(".caret-accordian")[0];
    var panel = accordianEl.nextElementSibling;
    var caretIcon = accordianEl.querySelectorAll(".caret-accordian")[0];
    console.log(caretIcon);
    if (panel.style.display === "block") {
        panel.style.display = "none";
        toggleCaretIcon(caretIcon, false);
    } else {
        panel.style.display = "block";
        toggleCaretIcon(caretIcon, true);

    }
}


const hideOpenedPanel = (elment) => {
    elment.style.display = "none";
}

const toggleCaretIcon = (iconEl, up) => {
    if(up) {
        iconEl.classList.remove("fa-caret-down");
        iconEl.classList.add("fa-caret-up");
    }
    else {
        iconEl.classList.remove("fa-caret-up");
        iconEl.classList.add("fa-caret-down");
    }
}