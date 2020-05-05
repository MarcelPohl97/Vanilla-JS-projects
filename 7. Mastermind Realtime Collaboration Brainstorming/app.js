const header = document.getElementById('header');
const container = document.querySelector('.container');
let container_Width = document.getElementById("container").offsetWidth;
let container_Height = document.getElementById("container").offsetHeight;
let brain_Storm = false;

//Variables for Mouse/Touch Input Coordinates
let initX;
let initY;
let firstX; 
let firstY;

const card_Input = document.getElementById('header__input');
const header_PopupBoards = document.getElementById('header__popup--boards');
const header_PopupUser = document.getElementById('header__popup--user');
const authentication = document.getElementById('authentication');
const create_PrivacySettings = document.getElementById('create__privacy');
const create_PopUp = document.getElementById('create__popup');
const close_CreateBoard = document.getElementById('close__createboard');
const create_Window = document.getElementById('create');
const board_NewRoom = document.getElementById('boards__newroom')
const header_NewBoard = document.getElementById('header__newboard')
const header_UserName = document.getElementById('header__username');
const header_PopUpOptions = document.getElementById('header__popupoptions');
const boards = document.getElementById('boards');
const boards_Container = document.getElementById('boards__container');
const header_Boards = document.getElementById('header__boards');

//Card Class
class Card {
    constructor(text) {
        this.x = 10;
        this.y = 1;
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
        //Function to make Card float around in the container
        this.move = () => {
            if(brain_Storm == true){
                this.collision_Detection();
                this.x += this.xvel;
                this.y += this.yvel;
                this.element.style.left = `${Math.floor(this.x)}px`;
                this.element.style.top = `${Math.floor(this.y)}px`;
            }
        }
        /*Function to control the collisions when hitting left and right xVel is always 1 or -1 
        determining if its bigger or less the width of the container only the yvel changes drastically to have a more
        natural floating for different cards the same applies to the yVelcontrol just that the xVel changes
        the reason for that is if u switch the yvel drastically and it bounces again but its less than before its just overfloating
        the container and it disappears*/
        this.xVelControl = (input) => {
            this.xvel = input
            this.yvel = Math.random() * (4 - 2) - 1;
        }

        this.yVelControl = (input) => {
            this.yvel = input
            this.xvel = Math.random() * (4 - 2) - 1;
        }
        /*Checking for collision y and x based on container width reducing the width of the card so it bounces exactly on the edge of the card and
        not overflowing the container for the ycollision I still need a workaround because its supposed to be auto height since a card maybe needs
        more words possible idea would be to calculate the height after every bounce again*/
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

        this.collision_Detection = () => {
            this.collisionX();
            this.collisionY();
        }
    }
}

let cards = [];

//Loop through every card and make it float around
let animate = () => {
    cards.forEach(element =>  {
        element.move();
    })
}

//Interval floating cards every 10 milliseconds
setInterval(function(){
    animate();
}, 10);

//Eventlistener for Mouse drag 
container.addEventListener('mousedown', event => {
    if(event.target.classList.contains("card")){
	    initX = event.target.offsetLeft;
	    initY = event.target.offsetTop;
        firstX = event.pageX;
        firstY = event.pageY;
        event.target.addEventListener('mousemove', dragIt, false);
    }

	container.addEventListener('mouseup', event => {
        if(event.target.classList.contains('card')){
            event.target.removeEventListener('mousemove', dragIt, false);
        }
	}, false);

}, false);

function dragIt(event) {
	this.style.left = initX+event.pageX-firstX + 'px';
	this.style.top = initY+event.pageY-firstY + 'px';
};

//Eventlistener for Touch drag 
container.addEventListener('touchstart', event => {
    if(event.target.classList.contains("card")){
        initX = event.target.offsetLeft;
        initY = event.target.offsetTop;
        let touch = event.touches;
        firstX = touch[0].pageX;
        firstY = touch[0].pageY;

        event.target.addEventListener('touchmove', swipeIt, false);
    }

	container.addEventListener('touchend', event => {
        if(event.target.classList.contains("card")) {
		    event.target.removeEventListener('touchmove', swipeIt, false);
        }
	}, false);

}, false);

function swipeIt(event) {
	let contact = event.touches;
	this.style.left = initX+contact[0].pageX-firstX + 'px';
	this.style.top = initY+contact[0].pageY-firstY + 'px';
};

boards.addEventListener('click', event => {
    const condition = event.target.classList
    switch(true) {
        case condition.contains('boards__room'):
            boards.classList.toggle('toggle--Visibility');
            break;
    }
})

//Eventlistener for various tasks that include the main page focused on the header
header.addEventListener('click', event => {
    const condition = event.target.classList
    switch(true) {
        case condition.contains('header__menu'):
            header_PopUpOptions.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('header__rooms'):
            header_PopupBoards.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('header__brainstorm'):
            const brain_Start = (brain_Storm == false) ? brain_Storm = true : brain_Storm = false;
            break;
        case condition.contains('header__add-card'):
            cards.push(new Card(card_Input.value));
            card_Input.value = "";
            break;
        case condition.contains('header__optionsuser'):
            header_PopupUser.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('header__logout'):
            logout();
            authentication.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('header__home'):
            boards.classList.toggle('toggle--Visibility');
            break;
    }
})

//Eventlistener to switch between form
const register_Form = document.getElementById('authentication__register');
const login_Form = document.getElementById('authentication__login');


const form_Switch = () => {
    register_Form.classList.toggle('authentication__auth--switch');
    login_Form.classList.toggle('authentication__auth--switch');
}

//Authentication Eventlistener for formswitch and Login/Register
authentication.addEventListener('click', event => {
    const condition = event.target.classList
    switch(true) {
        case condition.contains('authentication__register--switch'):
            form_Switch();
            break;
        case condition.contains('authentication__login--switch'):
            form_Switch();
            break;
        case condition.contains('authentication__loginUser'):
            login(auth_Input[3].value, auth_Input[4].value);
            break;
        case condition.contains('authentication__registerUser'):
            register(auth_Input[0].value, auth_Input[1].value, auth_Input[2].value);
            break;
    }
})

create_PrivacySettings.addEventListener('click', () => {
   create_PopUp.classList.toggle('toggle--Visibility');
})

header_NewBoard.addEventListener('click', () => {
    create_Window.classList.toggle('toggle--Visibility');
})

board_NewRoom.addEventListener('click', () => {
    create_Window.classList.toggle('toggle--Visibility');
})

close_CreateBoard.addEventListener('click', () => {
    create_Window.classList.toggle('toggle--Visibility');
})

//Update Username after Login function
const update_Username = (name) => {
    header_UserName.innerHTML = name
}

//Firebase Init

let firebaseConfig = {
    apiKey: "AIzaSyA8px5YoU9DX9jZpyCTb3uhD1YaXZQCpKs",
    authDomain: "my-project-1555317659839.firebaseapp.com",
    databaseURL: "https://my-project-1555317659839.firebaseio.com",
    projectId: "my-project-1555317659839",
    storageBucket: "my-project-1555317659839.appspot.com",
    messagingSenderId: "936975139412",
    appId: "1:936975139412:web:148dee3d352446303e63c1",
    measurementId: "G-GWV5FD85XY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


//Firebause Auth
const auth_Input = document.getElementsByClassName('authentication__input')

//Get UserUID from Firebase
const get_UserUID = (user) => {
    let document = db.collection("user").doc(user);
        document.get().then((doc) => {
            update_Username(doc.data()["name"]);  
        })
}

//Login 
const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
        alert("Successfully Logged in");
        //Delete all existing boards and clear dom and reload/fetch them
        get_Boards();
        //Toggle boards view
        boards.classList.toggle('toggle--Visibility');
        //Toggle authentication view
        authentication.classList.toggle('toggle--Visibility');
        //Update User Infos
        get_UserUID(cred.user.uid);
    }).catch((error) => {
        alert(error);
    })
}

//Register
const register = (email, name, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((cred) => {
        alert("You successfully registered and your automatically logged in! feel free to create or join a board to start Brainstorming")
        //Set a document in user collection with the useruid that just got registered
        db.collection("user").doc(cred.user.uid).set({
            name: name,
            email: email,
            password: password
        })
        //After register automatically login
        login(email, password);

    }).catch((error) => {
        alert(error);
    })
}

//Logout
const logout = () => {
    firebase.auth().signOut().then(() => {
        alert("Logout successfull see you next time!")
      }).catch((error) => {
        alert(error)
      });
}

const get_Boards = () => {
    clear_Data([boards_Container, header_Boards]);
}

const clear_Data = (data) => {
    data.forEach(element => {
        element.innerHTML = "";
    })
}