const container = document.querySelector('.container');
let container_Width = document.getElementById("container").offsetWidth;
let container_Height = document.getElementById("container").offsetHeight;
let moving = false;
let initX;
let initY;
let firstX; 
let firstY;

const add_Card = document.getElementById('header__add-card')
const card_Input = document.getElementById('header__input')


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

let animate = () => {
    cards.forEach(element =>  {
        element.move();
    })
}

setInterval(function(){
    animate();
}, 10);

container.addEventListener('mousedown', function(e) {
    if(e.target.classList.contains("card")){
	    initX = e.target.offsetLeft;
	    initY = e.target.offsetTop;
        firstX = e.pageX;
        firstY = e.pageY;
        e.target.addEventListener('mousemove', dragIt, false);

    }

	container.addEventListener('mouseup', e => {
        if(e.target.classList.contains('card')){
            e.target.removeEventListener('mousemove', dragIt, false);
        }
	}, false);

}, false);

container.addEventListener('touchstart', function(e) {
    if(e.target.classList.contains("card")){
        initX = e.target.offsetLeft;
        initY = e.target.offsetTop;
        var touch = e.touches;
        firstX = touch[0].pageX;
        firstY = touch[0].pageY;

        e.target.addEventListener('touchmove', swipeIt, false);
    }

	container.addEventListener('touchend', function(e) {
        if(e.target.classList.contains("card")) {
		    e.target.removeEventListener('touchmove', swipeIt, false);
        }
	}, false);

}, false);

function dragIt(e) {
	this.style.left = initX+e.pageX-firstX + 'px';
	this.style.top = initY+e.pageY-firstY + 'px';
};

function swipeIt(e) {
	let contact = e.touches;
	this.style.left = initX+contact[0].pageX-firstX + 'px';
	this.style.top = initY+contact[0].pageY-firstY + 'px';
};

add_Card.addEventListener('click', () => {
    cards.push(new Card(card_Input.value));
    card_Input.value = "";
})

