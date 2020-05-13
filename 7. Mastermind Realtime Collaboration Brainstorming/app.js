const header = document.getElementById('header');
const container = document.querySelector('.container');
const container_Card = document.getElementById('container');
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
const create_PopUp = document.getElementById('create__popup');
const create_Window = document.getElementById('create');
const header_UserName = document.getElementById('header__username');
const header_PopUpOptions = document.getElementById('header__popupoptions');
const boards = document.getElementById('boards');
const boards_Container = document.getElementById('boards__container');
const header_Boards = document.getElementById('header__boards');
const delete_Cards = document.getElementById('header__popup--cards');
const header_PopupCards = document.getElementById('header__popup-cards');
const create_BoardName = document.getElementById('create__boardname');

let container_BoardID;
let container_CardID;
//Card Class
class Card {
    constructor(text, x, y, creator, cardid) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.creator = creator
        this.cardid = cardid
        this.element = document.createElement('div');
        this.element.setAttribute('data-id' , this.cardid);
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
        this.element.innerHTML = this.text;
        this.element.classList = 'card card--styling';
        this.element.contentEditable = 'false';
        this.element.tabIndex= "0";

        this.creator_note = document.createElement('div');
        this.creator_note.classList = 'card__creator';
        this.creator_note.innerHTML = `Submitted by ${this.creator}`;
        this.element.appendChild(this.creator_note);

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

//Eventlistener to make element Editable
container.addEventListener('dblclick', event => {
    if(event.target.classList.contains('card')) {
        event.target.contentEditable = 'true';
    }
})

//Eventlistener to make element uneditable and change text
container.addEventListener('focusout', event => {
    if(event.target.classList.contains('card')){
        event.target.contentEditable = 'false';
        update_CardText(event.target.innerHTML, event.target.getAttribute('data-id'));
    }
});

//Update card text after focus out of card
const update_CardText = (text, cardid) => {
    db.collection("card").doc(cardid).update({
        text: text,
    });
}


//Eventlistener for Mouse drag 
container.addEventListener('mousedown', event => {
    if(event.target.classList.contains("card")){
	    initX = event.target.offsetLeft;
	    initY = event.target.offsetTop;
        firstX = event.pageX;
        firstY = event.pageY;
        container_CardID = event.target.getAttribute('data-id');
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
    update_CardPosition(initX+event.pageX-firstX, initY+event.pageY-firstY, event.target.getAttribute('data-id'));
};

const update_CardPosition = (x, y, cardid) => {
    db.collection("card").doc(cardid).update({
        xcoord: x,
        ycoord: y
    });
}

//Eventlistener for Touch drag 
container.addEventListener('touchstart', event => {
    if(event.target.classList.contains("card")){
        initX = event.target.offsetLeft;
        initY = event.target.offsetTop;
        let touch = event.touches;
        firstX = touch[0].pageX;
        firstY = touch[0].pageY;
        container_CardID = event.target.getAttribute('data-id');
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
    update_CardPosition(initX+contact[0].pageX-firstX, initY+contact[0].pageY-firstY, event.target.getAttribute('data-id'));
};

const check_BrainStormAfterJoin = (board_ID) => {
    db.collection('boards').doc(board_ID).get().then((data) => {
        brain_Storm = data.data()["brainstorm"];
    });
}

//Eventlistener for board elements
boards.addEventListener('click', event => {
    const condition = event.target.classList
    switch(true) {
        case condition.contains('boards__room'):
            container_BoardID = event.target.getAttribute('data-id');
            clear_Data([container_Card, header_PopupCards]);
            get_Cards(event.target.getAttribute('data-id'));
            check_BrainStormAfterJoin(container_BoardID);
            boards.classList.remove('toggle--Visibility');
            break;
        case condition.contains('boards__newroom'):
            create_Window.classList.toggle('toggle--Visibility');
            break;
    }
})

//Get the cards from db and load them in clientside
const get_Cards = (board_ID) => {
    db.collection("card").where('board', '==', `${board_ID}`).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            load_Cards(doc.data()["text"], doc.data()["xcoord"], doc.data()["ycoord"], doc.data()["creator"], doc.id)
        });
    });
}

//Load cards in and add them to clientside container and header delete board
const load_Cards = (text, x, y, creator, cardid) => {
    //Push card to container
    cards.push(new Card(text, x, y, creator, cardid));
    //Add card on delete Header board
    const card = document.createElement('li');
    card.innerHTML = text;
    card.classList = 'card--styling card--popup card--delete'
    card.setAttribute('data-id' , cardid);
    header_PopupCards.appendChild(card);
}

//Check for brainstorm 
const check_Brainstorm = (id) => {
    db.collection('boards').doc(id).get().then((data) => {
        //let brainstorm_Check = (data.data()["brainstorm"] == false) ? update_Brainstorm(true, container_BoardID) : update_Brainstorm(false, container_BoardID),get_CardsPos(board_ID);
        //When brainstorm button is pressed and it is false
        if(data.data()["brainstorm"] == false){
            //Set it to true so brainstorm starts
            update_Brainstorm(true, container_BoardID)
        }else {
            //if its currently active set it to false and set the cards back to original positions
            update_Brainstorm(false, container_BoardID);
        }
    });
}

//Update the brainstorm value for the specific board someone is currently active
const update_Brainstorm = (boolean, id) => {
    db.collection("boards").doc(id).update({
        brainstorm: boolean,
    });
}

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
            check_Brainstorm(container_BoardID);
            break;
        case condition.contains('header__add-card'):
            add_Card(card_Input.value, "5", "10", header_UserName.innerHTML, container_BoardID);
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
            boards.classList.add('toggle--Visibility');
            break;
        case condition.contains('header__newboard'):
            create_Window.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('header__cards'):
            container_BoardID = event.target.getAttribute('data-id');
            clear_Data([container_Card, header_PopupCards]);
            get_Cards(event.target.getAttribute('data-id'));
            check_BrainStormAfterJoin(container_BoardID);
            boards.classList.remove('toggle--Visibility');
            break;
        case condition.contains('header__delete-card'):
            delete_Cards.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('card--delete'):
            delete_CardQuery(event.target.getAttribute('data-id'));
    }
})

//Eventlistener to switch between form
const register_Form = document.getElementById('authentication__register');
const login_Form = document.getElementById('authentication__login');

//Switch from login to register and back
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

//Create window event listener
create_Window.addEventListener('click', event => {
    const condition = event.target.classList
    switch(true) {
        case condition.contains('close__window'):
            create_Window.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('create__privacy'):
            create_PopUp.classList.toggle('toggle--Visibility');
            break;
        case condition.contains('create__board'):
            add_Board(create_BoardName.value)
            create_BoardName.value = '';
            create_Window.classList.toggle('toggle--Visibility');
            break;
    }
})


//Update Username after Login function
const update_Username = (name) => {
    header_UserName.innerHTML = name
}

//Firebase Init
let firebaseConfig = {
    apiKey: "AIzaSyAHz93ex9oLVzlL6LBMfhwAVT4So1LkwAc",
    authDomain: "my-project-1555317015462.firebaseapp.com",
    databaseURL: "https://my-project-1555317015462.firebaseio.com",
    projectId: "my-project-1555317015462",
    storageBucket: "my-project-1555317015462.appspot.com",
    messagingSenderId: "437270505058",
    appId: "1:437270505058:web:e34441279d0c189e2e133b",
    measurementId: "G-6SJFYRYLSY"
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
        //Update the user stats in clientside currently only the name
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
        boards.classList.add('toggle--Visibility');
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

//get Boards from DB and load them one time after logging in
const get_Boards = () => {
    clear_Data([boards_Container, header_Boards]);
    load_Boards();
}

//Clear specific data in the dom 
const clear_Data = (data) => {
    data.forEach(element => {
        element.innerHTML = "";
    })
}

//Load boards through firestore
const load_Boards = () => {
    //Query boards in firestore and get their id and name
    db.collection("boards").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //generate boards with the specific id and name for the boards
            create_Boards(doc.id, doc.data()["name"], "boards__room", boards_Container);
            create_Boards(doc.id, doc.data()["name"], "header__cards", header_Boards);
        });
        //Create adding board to add new boards
        let create_Board = document.createElement('div');
        create_Board.innerHTML = "Create new board";
        create_Board.className = "boards__newroom";
        boards_Container.appendChild(create_Board);
    });
}

//Create boards with id and name, classname and container since we have a board view main and a nav small view on the boards
const create_Boards = (id, name, classname, container) => {
    let board = document.createElement('div');
    board.innerHTML = name
    board.setAttribute('data-id' , id);
    board.className = classname;
    container.appendChild(board);
}

//Add a board to db
const add_Board = (boardname) => {
    db.collection("boards").add({
        name: boardname,
        brainstorm: false
    })
    .catch((error) => {
        alert("Error adding board: ", error);
    });
}


//Realtime Listener for the current Active board your brainstorming to add new cards in realtime
db.collection("card").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        switch(true) {
            //Add new cards in realtime
            case change.type === "added":
                if(change.doc.data()["board"] == container_BoardID){
                    load_Cards(change.doc.data()["text"], change.doc.data()["xcoord"], change.doc.data()["ycoord"], change.doc.data()["creator"], change.doc.id)
                }
                break;
            //Change text and pos in real time
            case change.type === "modified":
                set_CardText(change.doc);
                set_CardPos(change.doc);
                break;
            //Check if card is deleted in db and remove it from clientside in real time
            case change.type === "removed":
                deleteCard(change.doc)
                break;
        }
    });
});

//Realtimelistener for Board activities
db.collection("boards").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        switch(true) {
            //Check if a new board is added and append it to clientside
            case change.type === "added":
                create_Boards(change.doc.id, change.doc.data()["name"], "boards__room", boards_Container);
                create_Boards(change.doc.id, change.doc.data()["name"], "header__cards", header_Boards);
                break;
            //Check if brainstorm value of a board is changed and activate or deactivate brainstorming
            case change.type === "modified" && change.doc.id == container_BoardID:
                brain_Storm = change.doc.data()["brainstorm"];
                if(change.doc.data()["brainstorm"] == false) {
                    get_BeforeBrainStormCardPos(container_BoardID);
                }
        }
    });
});

//Add card to board
const add_Card = (text, x, y, creator, board) => {
    db.collection("card").add({
        board: board,
        creator: creator,
        text: text,
        xcoord: x,
        ycoord: y
    })
    .catch((error) => {
        alert("Error adding card: ", error);
    });
}

//Delete card in DB
const delete_CardQuery = (id) => {
    db.collection("card").doc(id).delete().catch((error) => {
        alert("Error removing card: ", error);
    });
}

//Delete cards from container and header
const deleteCard = (data) => {
    let container_Element = document.body.querySelector(`div[data-id="${data.id}"]`)
    container_Element.remove();
    let header_Element = document.body.querySelector(`li[data-id="${data.id}"]`)
    header_Element.remove();
}

//set card position clientside dom
const set_CardPos = (data) => {
    let selected_Element = document.querySelector(`div[data-id="${data.id}"]`);
    selected_Element.style.left = data.data()["xcoord"] + "px";
    selected_Element.style.top = data.data()["ycoord"] + "px";
}

//set card text clientside dom
const set_CardText = (data) => {
    let selected_Element = document.querySelector(`div[data-id="${data.id}"]`);
    selected_Element.innerHTML = data.data()["text"];
}

//get card position before brainstorm starts
const get_BeforeBrainStormCardPos = (board_ID) => {
    db.collection("card").where('board', '==', `${board_ID}`).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            set_CardPos(doc);
        });
    });
}

const convert_PercentageToPx = () => {
    console.log("just")
}

const convert_PxToPercentage = () => {
    console.log("just")
}