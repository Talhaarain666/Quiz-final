// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkZvRakclZexZ6rV51UT6PpGOp5eNwZls",
    authDomain: "quiz-app-a493f.firebaseapp.com",
    projectId: "quiz-app-a493f",
    storageBucket: "quiz-app-a493f.appspot.com",
    messagingSenderId: "713400810506",
    appId: "1:713400810506:web:1efd70c46b0686b332f3f3",
    measurementId: "G-FS3Y1GSJ3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const dbRef = ref(db, 'Quiz');




//+++++++++++++++++++++++++ RENDERING QUESTIONS +++++++++++++++++++++++++++++
var marks = 0;
var arrayVal = [];


window.renderQs = function () {

    var indexVal = 1;
    var parentQSandOpt = document.getElementById("parentQSandOpt")
    parentQSandOpt.innerHTML = "";

    arrayVal.forEach(function (e) {


        parentQSandOpt.innerHTML += `
     <div id="qsParentBody" class="container my-2 ">

        <div class="bg-danger fw-bold fs-1 text-center" id="nmbrs">${indexVal++}</div>
            <div id="qsBody" class="fs-4 qst-body p-5 fw-bold shadow">${e.question}

            </div>
        </div>

        <div class="container">

            <div id="AllOptions" class="row">
                <div class="col-md-6">
                    <div onclick = "chkingAns('${e.optionOne}','${e.rightAnswer}');redClr(this);" class="btn Opt-body w-100 p-2 shadow my-1 fw-bold">${e.optionOne}
                    </div>
                </div>
                <div class="col-md-6">
                    <div onclick = "chkingAns('${e.optionTwo}','${e.rightAnswer}');redClr(this);" class="btn Opt-body w-100 p-2 shadow my-1 fw-bold">${e.optionTwo}
                    </div>
                </div>
                <div class="col-md-6">
                    <div onclick = "chkingAns('${e.optionThree}','${e.rightAnswer}');redClr(this);" class="btn Opt-body w-100 p-2 shadow my-1 fw-bold">${e.optionThree}
                    </div>
                </div>
                <div class="col-md-6 ">
                    <div onclick = "chkingAns('${e.optionFour}','${e.rightAnswer}');redClr(this);" class="btn Opt-body w-100 p-2 shadow my-1 fw-bold">${e.optionFour}
                    </div>
                </div>
                
                <div class="py-3"></div>
            </div>

        </div>
     </div>`



        // +++++++++++++++++  SUBMIT BUTTON  ++++++++++++++++++++++++++

        window.submitBtn = function () {
            resultDiv.style.display = "block";
            mainDiv.style.display = "none";
            indexVal--;
            percentageCal.innerHTML = marks / indexVal * 100 + "%"

        }

    });


}

window.redClr = function (element) {

    element.style.backgroundColor = "red";
    if (element.style.backgroundColor = "red") {
        element.parentNode.parentNode.style.display = "none"
        
    }
}



// ++++++++++++++ CHECKING ANSWERS +++++++++++++++++

window.chkingAns = function (optionVal, correctVal) {

    if (optionVal == correctVal) {
        marks++;
        console.log(marks)
    }

}


//========================= FIREBASE WORK  ========================


onValue(
    dbRef,
    function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            arrayVal.push(childSnapshot.val());
            renderQs();
            // ...
        });
    },
    {

        onlyOnce: false,
    }
);