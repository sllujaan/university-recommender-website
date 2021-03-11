

var openedprogramPanelEl = null;


var containerAccordianPrograms = document.querySelectorAll(".container-accordian-programs")[0];


const PROGRAMS = [
    {"University_ID":"2","Program_ID":"1","Description":"description","Admission_Fee":"100","Registration_Fee":"200","Security_Fee":"10","Admission_Processing_Fee":"0","Enrollment_Fee_Per_Semester":"0","Tuition_Fee_per_Credit_Hour":"0","Convocation_Fee":"0","Fee_Total":"400","Fee_Description":"fee description","MM_PCT":"0.7","MM_PN":"fsc","Name":"CS (Computer Science)","Duration_Years":"4"},
    {"University_ID":"2","Program_ID":"2","Description":"description","Admission_Fee":"100","Registration_Fee":"200","Security_Fee":"10","Admission_Processing_Fee":"0","Enrollment_Fee_Per_Semester":"0","Tuition_Fee_per_Credit_Hour":"0","Convocation_Fee":"0","Fee_Total":"400","Fee_Description":"fee description","MM_PCT":"0.7","MM_PN":"fsc","Name":"Economics","Duration_Years":"4"}
];

const UNIVERSITY_DETAILS = [
    {
        "University":
            {"University_ID":"2","Name":"punjab University","Description":"description of LUMS University","Country_ID":"137","City_ID":"200","Admission_Criteria":"70% marks in FSC","Start_Admission_Date":"2021-05-01","End_Admission_Date":"2021-06-01","Total_ETM":"200","S_Education_MC_PCT":"0.6","H_Education_MC_PCT":"0.7","PCT_MC_ETM":"0.8","Phone":"00-988327422039","Web_Link":"www.lums.com","Email":"lums@gmail.com","Address":"block 4 lahore pakistan","Name_Country":"Pakistan","Name_City":"Bolton"}
    },
    
    {
        "University_Program":
            [
                {"University_ID":"2","Program_ID":"1","Description":"description","Admission_Fee":"100","Registration_Fee":"200","Security_Fee":"10","Admission_Processing_Fee":"0","Enrollment_Fee_Per_Semester":"0","Tuition_Fee_per_Credit_Hour":"0","Convocation_Fee":"0","Fee_Total":"400","Fee_Description":"fee description","MM_PCT":"0.7","MM_PN":"fsc","Name":"CS (Computer Science)","Duration_Years":"4"},
                {"University_ID":"2","Program_ID":"2","Description":"description","Admission_Fee":"100","Registration_Fee":"200","Security_Fee":"10","Admission_Processing_Fee":"0","Enrollment_Fee_Per_Semester":"0","Tuition_Fee_per_Credit_Hour":"0","Convocation_Fee":"0","Fee_Total":"400","Fee_Description":"fee description","MM_PCT":"0.7","MM_PN":"fsc","Name":"Economics","Duration_Years":"4"}
            ]
    }
];


document.addEventListener("click", e => {

    const isProgramAccordian = e.target.classList.contains("accordian-program-item");
    const isAccordianTab = e.target.classList.contains("tablinks");

    console.log(e.target);
    if(isProgramAccordian) {
        toggleAccordian(e.target.parentElement);
    }

    if(isAccordianTab) {
        console.log("accordian tab");
        openTabDetailsNew(e, e.target.innerText);
    }


})

const toggleAccordian = (accordianEl) => {
    //document.querySelectorAll(".caret-accordian")[0];
    var panel = accordianEl.nextElementSibling;
    var overivew = panel.getElementsByClassName("tablinks")[0];
    var caretIcon = accordianEl.querySelectorAll(".caret-accordian")[0];
    console.log(caretIcon);
    console.log(overivew);
    if (panel.style.display === "block") {
        panel.style.display = "none";
        toggleCaretIcon(caretIcon, false);
    } else {
        panel.style.display = "block";
        toggleCaretIcon(caretIcon, true);
        overivew.click();
    }
}

const SelectTabs = (e) => {
    var overviews = document.getElementsByClassName("Overview");
    console.log(overviews);
    if(overviews) {
        for (let i = 0; i < overviews.length; i++) {
            overviews[i].click();
        }
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


const openTabDetailsNew = (e, tabName) => {
    var panel = e.target.parentElement.parentElement;
    console.log(panel);

    //make sure other opened tabs are closed
    var tabcontent = panel.getElementsByClassName("tabcontent");
    console.log(tabcontent);
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    var tablinks = panel.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var contentClassName = tabName.replace(/\s+/g, '');
    panel.getElementsByClassName(contentClassName)[0].style.display = "block";
    e.target.classList.add("active");
}


function openTabDetails(evt, cityName) {
    console.log(evt);
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



const getProgramAccordian = (universityDetails, programDetails) => {

    var div = document.createElement("div");
    div.classList.add("acc-p");
    div.innerHTML = `
    <button class="accordion accordian-program">
      <div class="accordian-program-item" style="font-weight: bold;">${programDetails.Name}</div>
      <i class="fa fa-caret-down fa-2x accordian-program-item caret-accordian" aria-hidden="true"></i>
    </button>
    <div class="panel" style="display: none;">
      <!-----------------panel data--------------------->
      <div class="tab">
        <button class="tablinks">Overview</button>
        <button class="tablinks">Admission Criteria</button>
        <button class="tablinks">Fees</button>
      </div>

      <div id="Overview" class="tabcontent Overview">
        <h3>Program Duration (4-Years)</h3>
        <p>${programDetails.Description}</p>
      </div>
      
      <div id="Admission Criteria" class="tabcontent AdmissionCriteria">
        <h3>Admission Criteria</h3>
        <h4>Local and International Applicants</h4>
        <h4>Your Aggregate Marsks: 400</h4>
        <p>${universityDetails.Admission_Criteria}</p> 
      </div>
      
      <div id="Fees" class="tabcontent Fees">
        <p>
          <div class="tablel-vertical">
            <h3 style="font-weight: bold;">Fees Structure</h3>
            <table>
              <tr>
                <th>Admission Fee</th>
                <td>${programDetails.Admission_Fee}</td>
              </tr>
              <tr>
                <th>Registration Fee</th>
                <td>${programDetails.Registration_Fee}</td>
              </tr>
              <tr>
                <th>Security Fee</th>
                <td>${programDetails.Security_Fee}</td>
              </tr>
              <tr>
                <th>Admission Processing Fee</th>
                <td>${programDetails.Admission_Processing_Fee}</td>
              </tr>
              <tr>
                <th>Enrollment Fee Per Semester</th>
                <td>${programDetails.Enrollment_Fee_Per_Semester}</td>
              </tr>
              <tr>
                <th>Tuition Fee per credit hour</th>
                <td>${programDetails.Tuition_Fee_per_Credit_Hour}</td>
              </tr>
              <tr>
                <th>Convocation Fee</th>
                <td>${programDetails.Convocation_Fee}</td>
              </tr>
              <tr>
                <th>Total Fee (Semester)</th>
                <td>${programDetails.Fee_Total}</td>
              </tr>
            </table>
          </div>
        </p>
        <p>Fees Structure Description</p>
      </div>

      <!------------------------------------------------>
    </div>
    `;

    return div;
}


//console.log(getProgramAccordian(UNIVERSITY_DETAILS));


export const loadPrograms = (universityDetails) => {

    const {University} = universityDetails[0];
    var {University_Program} = universityDetails[1];
    console.log(University_Program);
    
    University_Program.forEach(programDetails => {
        var div = getProgramAccordian(University, programDetails);
        containerAccordianPrograms.append(div);
    });

}

loadPrograms(UNIVERSITY_DETAILS);