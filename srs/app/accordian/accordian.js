

var OPENED_PANEL;


document.addEventListener("click", e => {

    const isProgramAccordian = e.target.classList.contains("accordian-program-item");
    
    if(isProgramAccordian) {
        toggleAccordian(e.target.parentElement);
    }


})

const toggleAccordian = (accordianEl) => {
    var panel = accordianEl.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}