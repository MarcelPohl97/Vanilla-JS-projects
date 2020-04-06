const water = document.getElementById("water");

const water__Option1 = document.getElementById("water__option--1");
const water__Option2 = document.getElementById("water__option--2");
const water__Option3 = document.getElementById("water__option--3");
const water__Option4 = document.getElementById("water__option--4");
const water__Option5 = document.getElementById("water__option--5");

water__Option1.addEventListener("click", () => {
    water__Option1.classList.toggle("water__option--1Toggle");
    water__Option2.classList.toggle("water__option--2Toggle");
    water__Option3.classList.toggle("water__option--3Toggle");
    water__Option4.classList.toggle("water__option--4Toggle");
    water__Option5.classList.toggle("water__option--5Toggle");
    water.classList.toggle("water--Toggle");
})

water__Option2.addEventListener("click", () => {
    water__Option1.classList.toggle("water__option--1Toggle");
    water__Option2.classList.toggle("water__option--2Toggle");
    water__Option3.classList.toggle("water__option--3Toggle");
    water__Option4.classList.toggle("water__option--4Toggle");
    water__Option5.classList.toggle("water__option--5Toggle");
    water.classList.toggle("water--Toggle");
})

