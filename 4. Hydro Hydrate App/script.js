const wave = document.getElementById("ocean");
const btn = document.getElementById("btn");
let water_Height = prompt("How much did you drink today?")
let change_height = (input) => {
    wave.style.height = input;
}

change_height(water_Height);

btn.addEventListener("click", () => {
    change_height(water_Height);
})

