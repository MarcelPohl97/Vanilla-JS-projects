 
const meal_Cards = document.getElementById("meals__list");
const add_meal = document.getElementById("add_meal");
const meal_Input = document.getElementById("meal_input")

const delete_Meal = () => { 
    meal_Cards.innerHTML = ""; 
}

const create_Meal = (meal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for(i=0; i < data["meals"].length; i++){
            meal_Cards.innerHTML += `
            <div class="meals__card">
                <div class="meals__card-header">
                    <img class="meals__image" src="${data["meals"][i]["strMealThumb"]}" alt="meal">
                    <div class="meals__price">
                        <p>15.00€</p>
                    </div>
                </div>
                <div class="meals__card-body">
                    <h4 class="meals__name">
                        ${data["meals"][i]["strMeal"]}
                    </h4>
                    <div class="meals__description">
                        <p><i class="fas fa-utensils"></i> ${data["meals"][i]["strCategory"]}</p>
                        <p><i class="far fa-clock"></i> 15 min</p>
                    </div>
                    <a href="#" class="btn btn--small btn--red__outline">Order Now</a>
                </div>
            </div>
            `
        };
    });
}

add_meal.addEventListener("click", () => {
    delete_Meal();
    create_Meal(meal_Input.value);
});