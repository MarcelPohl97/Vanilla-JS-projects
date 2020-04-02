 
const meal_Cards = document.getElementById("meals__list");
const add_meal = document.getElementById("add_meal");
const meal_Input = document.getElementById("meal_input");

const meals_instruction_open = document.querySelectorAll(".meals__list")
const meal_instruction = document.getElementById("instruction__meal");

const popup_open = document.getElementById("popup__open");
const popup_close = document.getElementById("popup__close");
const popup = document.getElementById("popup");
const popup_coupon = document.getElementById("popup__coupon");

const instruction_close = document.querySelectorAll(".instruction");
const instruction = document.getElementById("instruction");

const shopping_CartList = document.getElementById("shopping-cart__list");
const shopping_CartPrice = document.getElementById("shopping-cart__fullprice");
const shopping_CartDelete = document.querySelectorAll(".shopping-cart__list");

const responsive_NavBtn = document.getElementById("responsive-Btn");
const responsive_NavCover = document.getElementById("responsive-NavCover");

const clear_Data = (data) => { 
    data.innerHTML = ""; 
}

const create_Meal = (api) => {
    fetch(api)
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
                        <p class="meal__price">15</p>
                        <p>€</p>
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
                    <a class="btn btn--small btn--red__outline">Order Now</a>
                    <a class="meals__instruction" id="meals__instruction">${data["meals"][i]["idMeal"]}</a>
                </div>
            </div>
            `
        };
    });
}

const create_MealInstruction = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for(i=0; i < data["meals"].length; i++){
            meal_instruction.innerHTML += `
            <div class="instruction__media">
                <img src="${data["meals"][i]["strMealThumb"]}" alt="Meal">
                <iframe src="https://www.youtube.com/embed/${data["meals"][i]["strYoutube"].split("=")[1]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="instruction__text">
                <a class="instruction__close" id="instruction__close">×</a>
                <h2 class="instruction__title">
                    ${data["meals"][i]["strMeal"]}
                </h2>
                <h3 class="instruction__conditions">
                    In order to have a safe and healthy meal follow the instruction cleary!
                </h3>
                <p class="instruction__details">
                    ${data["meals"][i]["strInstructions"]}
            </div>
            `
        };
    });

}

const popup_Toggle = () => {
    popup.classList.toggle("popup__show")
    popup_coupon.classList.toggle("popup__scale");
}

const instruction_Toggle = () => {
    instruction.classList.toggle("instruction__show")
    meal_instruction.classList.toggle("instruction__scale");
}

const meal_Information = () => {
    const meal = event.target.parentElement.parentElement;
    const meal_Info = {
        image: meal.querySelector('img').src,
        title: meal.querySelector('.meals__card-body h4').textContent,
        price: meal.querySelector('.meal__price').textContent,
    }
    add_ToCart(meal_Info);
}

const meal_CartInformation = () => {
    const cart_Meal = event.target.parentElement;
    const cart_MealPrice = {
        price: cart_Meal.querySelector('.shopping-cart__price--nocurr').textContent
    };
    shopping_CartPrice.innerHTML = parseInt(shopping_CartPrice.innerHTML) - parseInt(cart_MealPrice.price);
}

const add_ToCart = (course) => {
    const meal_item = document.createElement('div');
    meal_item.className = "shopping-cart__item"
    meal_item.innerHTML += `
    <div class="shopping-cart__information">
        <img src=${course["image"]} alt="Meal">
        <h4 class="shopping-cart__meal">${course["title"]}</h4>
        <p class="shopping-cart__price shopping-cart__price--nocurr">${course["price"]}</p>
        <p class="shopping-cart__price">€</p>
    </div>
    <p class="shopping-cart__remove">Remove Article</p>
    `
    shopping_CartPrice.innerHTML = parseInt(shopping_CartPrice.innerHTML) + parseInt(course["price"]);
    shopping_CartList.append(meal_item);
}

add_meal.addEventListener("click", () => {
    clear_Data(meal_Cards);
    if(meal_Input.value !== ""){
        create_Meal(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_Input.value}`);
    }else {
        create_Meal(`https://www.themealdb.com/api/json/v1/1/random.php`);
    }
});

popup_open.addEventListener("click", () => {
    popup_Toggle();
});

popup_close.addEventListener("click", () => {
    popup_Toggle();
});

meals_instruction_open.forEach(item => {
    item.addEventListener('click', event => {
      if(event.target.classList.contains('meals__instruction')){
        clear_Data(meal_instruction)
        create_MealInstruction(event.target.innerHTML);
        instruction_Toggle();
      }else if(event.target.classList.contains('btn')){
          meal_Information();
      }
    })
  })

instruction_close.forEach(item => {
    item.addEventListener('click', event => {
        if(event.target.classList.contains('instruction__close')){
            instruction_Toggle();
        }
    });
})

shopping_CartDelete.forEach(item => {
    item.addEventListener('click', event => {
        if(event.target.classList.contains('shopping-cart__remove')){
            meal_CartInformation();
            event.target.parentElement.remove();
        }
    });
})

responsive_NavBtn.addEventListener("click", () => {
    responsive_NavCover.classList.toggle("responsive-NavToggle");
})