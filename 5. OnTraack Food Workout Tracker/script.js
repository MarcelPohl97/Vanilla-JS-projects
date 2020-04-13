let landing_timer = document.getElementById("landing__time");
let motivational_Speech = document.getElementById("landing__quote");

//Set timer for Landing page
setInterval(function(){
    let time_Now = new Date();
    let time = (time_Now.getMinutes().toString().length < 2) ? time_Now.getHours() + ":" + "0" + time_Now.getMinutes() : time_Now.getHours() + ":" + time_Now.getMinutes();
    landing_timer.innerHTML = time;
}, 1000);

// Set Motivation API Quote
const set_Motivation = () => {
    fetch("https://type.fit/api/quotes")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        motivational_Speech.innerHTML = data[Math.floor(Math.random() * 1642)]["text"];
    });
}

set_Motivation();

//Calendar 

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectYear = document.getElementById("calendar__year");
let selectMonth = document.getElementById("calendar__month");

let calendarPrevious = document.getElementById("calendar__previous");
let calendarNext = document.getElementById("calendar__next");

let calendarMonth = document.getElementById("calendar__month");
let calendarYear = document.getElementById("calendar__year");

let calendarClose = document.getElementById("calendar__close");
let calendarOpen = document.getElementById("landing__calendar")

let calendar = document.getElementById("calendar");
let calendarContainer = document.getElementById("calendar__container");

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthAndYear = document.getElementById("calendar__monthAndYear");
showCalendar(currentMonth, currentYear);

calendarPrevious.addEventListener("click", () => {
    previous_Month();
});

calendarNext.addEventListener("click", () => {
    next_Month();
});

selectYear.addEventListener("change", () => {
    jump_MY();
});

selectMonth.addEventListener("change", () => {
    jump_MY();
});

calendarClose.addEventListener("click", () => {
    calendar.classList.toggle("calendar--toggle");
});

calendarOpen.addEventListener("click", () => {
    calendar.classList.toggle("calendar--toggle");
})

let next_Month = () => {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

let previous_Month = () => {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

let jump_MY = () => {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

let calendar_Toggle = () => {

}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar__body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cell.className += "calendar__data"
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");
                cell.className += "calendar__data"
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDaTAYxZiMqzgvX-Z927IChrP5CD11CCzM",
    authDomain: "ontraack.firebaseapp.com",
    databaseURL: "https://ontraack.firebaseio.com",
    projectId: "ontraack",
    storageBucket: "ontraack.appspot.com",
    messagingSenderId: "939576556836",
    appId: "1:939576556836:web:c617e0e011af870ca307b1",
    measurementId: "G-XDRV9SXZW9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
