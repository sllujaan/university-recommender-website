

var openedprogramPanelEl = null;


const PROGRAMS = [
    {"University_ID":"59","Program_ID":"1","Description":"CS1","Fee_Total":"500","Fee_Description":"CS1","MM_PCT":"0","MM_PN":"CS1"},
    {"University_ID":"59","Program_ID":"2","Description":"CS2","Fee_Total":"500","Fee_Description":"CS2","MM_PCT":"0","MM_PN":"CS2"}
];


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



const getProgramAccordian = (program) => {

    var div = document.createElement("div");
    div.classList.add("acc-p");
    div.innerHTML = `
        <button class="accordion accordian-program">
        <div class="accordian-program-item" style="font-weight: bold;">${program.Name}</div>
        <i class="fa fa-caret-down fa-2x accordian-program-item caret-accordian" aria-hidden="true"></i>
        </button>
        <div class="panel" style="display: none;">
        <!-----------------panel data--------------------->
        <div class="tab">
            <button class="tablinks">Overview</button>
            <button class="tablinks">Admission Criteria</button>
            <button class="tablinks">Fees</button>
            <button class="tablinks">London</button>
            <button class="tablinks">Paris</button>
            <button class="tablinks">Tokyo</button>
        </div>

        <div id="Overview" class="tabcontent">
            <h3>Overview</h3>
            <p>${program.Description}</p>
        </div>
        
        <div id="Admission Criteria" class="tabcontent">
            <h3>Admission Criteria</h3>
            <h4>Local and International Applicants</h4>
            <p>Paris is the capital of France.</p> 
        </div>
        
        <div id="Fees" class="tabcontent">
            <h3>Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
        </div>

        <!------------------------------------------------>
        </div>
    `;
    return div;
}


console.log(getProgramAccordian(PROGRAMS[0]));