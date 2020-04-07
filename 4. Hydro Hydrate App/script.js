const water = document.getElementById("water");
const water_InputInfo = document.querySelectorAll(".water");
const goal_number = document.getElementById("goal__num");
const drink__percentage = document.getElementById("drink__percentage");
const submit_WaterGoal = document.getElementById("btn");
const input_water = document.getElementById("input__water");
const wave = document.getElementById("ocean");
const input = document.getElementById("input")


const water__Option1 = document.getElementById("water__option--1");
const water__Option2 = document.getElementById("water__option--2");
const water__Option3 = document.getElementById("water__option--3");
const water__Option4 = document.getElementById("water__option--4");
const water__Option5 = document.getElementById("water__option--5");

let drink_progress = 0;

const change_WaterHeight = (input) => {
    wave.style.height = input;
}

const choose_Water = () => {
    water__Option1.classList.toggle("water__option--1Toggle");
    water__Option2.classList.toggle("water__option--2Toggle");
    water__Option3.classList.toggle("water__option--3Toggle");
    water__Option4.classList.toggle("water__option--4Toggle");
    water__Option5.classList.toggle("water__option--5Toggle");
    water.classList.toggle("water--Toggle");
}

const water_Information = () => {
    const water_ml = event.target.parentElement;
    const ml = {
        water_number: water_ml.querySelector('.water__ml').textContent
    };
    water_Calculation(ml["water_number"]);

}

const water_Calculation = (ml) => {
    drink_progress = parseInt(drink_progress) + parseInt(ml);
    let drink_finalCalc = parseInt((drink_progress / goal_number.innerHTML) * 100)
    drink__percentage.innerHTML = drink_finalCalc;
    change_WaterHeight(drink_finalCalc + "%");
}

water__Option1.addEventListener("click", () => {
    choose_Water();
})

water__Option2.addEventListener("click", () => {
    choose_Water();
})

water_InputInfo.forEach(item => {
    const classNames = ["fa-glass-whiskey", "water__ml"];
    item.addEventListener("click", event => {
        if(classNames.some(className => event.target.classList.contains(className))){
            water_Information();
        }
    })
})

submit_WaterGoal.addEventListener("click", () => {
    if(input_water.value !== ""){
        goal_number.innerHTML = input_water.value;
        input.classList.toggle("input__toggle");
    }
})
