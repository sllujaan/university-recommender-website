

var openedprogramPanelEl = null;


document.addEventListener("click", e => {

    const isProgramAccordian = e.target.classList.contains("accordian-program-item");
    const isAccordianTab = e.target.classList.contains("tablinks");

    console.log(e.target);
    if(isProgramAccordian) {
        toggleAccordian(e.target.parentElement);
    }

    if(isAccordianTab) {
        openTabDetails(e, e.target.innerText);
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



function openTabDetails(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.target.classList.add("active");
}



