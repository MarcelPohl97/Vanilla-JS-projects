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

const set_WaterGoal = () => {
    if(input_water.value !== "" && Number.isInteger((+input_water.value))){
        goal_number.innerHTML = input_water.value;
        input.classList.toggle("input__toggle");
    }
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
    set_WaterGoal();
})

let canvas = document.querySelector('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

let ctx = canvas.getContext('2d');
let bubbles = [];
let max_Radius = 14;
let min_Radius = 7;

function createBubble(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dy = -1;
    this.dx = Math.random() * (4 - 1) - 1;
    this.move = true;
    this.radius = radius;

    this.draw = function() {
        ctx.beginPath();
        ctx.strokeStyle = "#8bc9ee";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    this.collision = function() {
        if(this.y < 0){
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    this.move = function() {
        this.collision();
        this.y += this.dy;
        this.x += this.dx;
    }
    
    this.update = function() {
        this.draw();
        this.move();
    }
}

for(let i = 0; i < 50; i ++){
    let newBubble = new createBubble(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * 1920), Math.random() * (max_Radius - min_Radius) + min_Radius);
    bubbles.push(newBubble);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => {
        bubble.update();
    })
    window.requestAnimationFrame(animate);
  }

window.requestAnimationFrame(animate);

window.addEventListener('resize', function() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
});
