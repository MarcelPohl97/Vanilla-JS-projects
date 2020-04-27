const container = document.querySelector('.container');
const container2 = document.querySelectorAll('.container');
let container_Width = document.getElementById("container").offsetWidth;
let container_Height = document.getElementById("container").offsetHeight;
let moving = false;




class Card {
    constructor(text) {
        this.x = Math.floor(Math.random() * container_Width - 100);
        this.y = Math.floor(Math.random() * container_Height - 100);
        this.text = text;
        this.element = document.createElement('div');
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
        this.element.innerHTML = text;
        this.element.classList = 'card';
        this.element.contentEditable = 'true';
        this.element.draggable = 'true';
        this.xvel = Math.random() * (4 - 2) - 1;
        this.yvel = Math.random() * (4 - 2) - 1;
        container.appendChild(this.element);

        this.move = () => {
            if(moving == true){
                this.collisionX();
                this.collisionY();
                this.x += this.xvel;
                this.y += this.yvel;
                this.element.style.left = `${Math.floor(this.x)}px`;
                this.element.style.top = `${Math.floor(this.y)}px`;
            }
        }

        this.xVelControl = (input) => {
            this.xvel = input
            this.yvel = Math.random() * (4 - 2) - 1;
        }

        this.yVelControl = (input) => {
            this.yvel = input
            this.xvel = Math.random() * (4 - 2) - 1;
        }

        this.collisionX = () => {
            if(this.element.style.left == container_Width - 250 + "px"){
                this.xVelControl(-1);
            }
            if(this.element.style.left == 0 + "px"){
                this.xVelControl(1);
            }
        }

        this.collisionY = () => {
            if(this.element.style.top == container_Height - 43 + "px"){
                this.yVelControl(-1);
            }
            if(this.element.style.top == 0 + "px"){
                this.yVelControl(1);
            }
        }
    }
}

let cards = [];

for(i = 0; i < 10; i++){
    cards.push(new Card("Hello"))
}

let animate = () => {
    cards.forEach(element =>  {
        element.move();
    })
}

setInterval(function(){
    animate();
}, 10);

