"use strict";

//class Card maakt een kaart met de properties hieronder, alle properties hebben een defaultvalue naar card1 zodat deze gekoppelt zijn.
//de class card moet bovenaan gedefineerd worden anders kan de de rest van de code dit niet gebruiken als het nog niet bestaat.
class Card {
    constructor(card1, card2 = card1, set = card1, sound = card1) {
        this.card1 = card1;
        this.card2 = card2;
        this.set = set;
        this.sound = sound;
    }
}

const myField = document.getElementById("field");
myField.addEventListener("click", onClickCard);
const myCardArray = ["duck", "kitten", "piglet", "puppy", "calf", "veal", "lamb", "rooster", "horse", "mouse", "dog", "cat", "goose", "goat", "sheep", "pig", "cow", "chick", "hen"];
const myCardSet = myCardArray.map(card => new Card(card));

//deze functie wordt aangeroepen wanneer de het speelveld grootte wordt geselecteerd.
//de omgegeven waarde wordt door de switch gecontroleerd en zo wordt het speelveld gekozen.

function onSelectFieldSize(event) {
    const selectedValue = parseInt(event.target.value);
    let boardClass;
    let totalCards;

    switch (selectedValue) {
        case 4:
            boardClass = "board4";
            totalCards = 16;
            break;
        case 5:
            boardClass = "board5";
            totalCards = 25;
            break;
        case 6:
            boardClass = "board6";
            totalCards = 36;
            break;
        default:
            return;
    }

    populateField(boardClass, totalCards);
}


//FischerYatesShuffle
/*
uitleg shuffle function voor me zelf.
- we starten bij het laatse element door (array.lenght - 1)
- lopen naar voren richting index 0
- i is de huidige positie die je wilt vullen met een willekeurig ellement

- we kiezen een willekeurig indexgetal j tussen 0 en i.
- math.random geeft een getal tussen 0 en i
- math.floor maar daar een geheel getal van, hierdoor wordt elk element kandidaat om te ruilen met array[i].

- dan wisselen we de elementen op positie i en j.
*/
function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const fieldSizeSelect = document.getElementById('selectSize');
fieldSizeSelect.addEventListener('change', onSelectFieldSize);

function populateField(boardClass, totalCards) {
    myField.innerHTML = "";

    const neededCards = myCardArray.slice(0, totalCards / 2);                       //hierdoor worden er maar 8 kaarten gekozen uit de array van 18.
    const doubleArray = fisherYatesShuffle([...neededCards, ...neededCards]);       //hierdoor worden de 8 kaarten verdubbeld en door elkaar geschuffeld.
    
    doubleArray.forEach(card => {
        
        let newTile = document.createElement("div");    //dit maakt de div aan wat de kaart is. 
        let newCard = document.createElement("img");    //dit maakt een img aan.
        let cover = document.createElement("img");      //dit maakt de cover aan voor elke kaart.
        newTile.setAttribute("class", boardClass);      //nu is deze niet meer hardcoded.

        let imageURL = "img/" + card + ".jpg";

        newCard.setAttribute("src", imageURL);
        cover.setAttribute("src", "img/cover.png")
        cover.setAttribute("class", "covered");
        newCard.setAttribute("name", card);

        newTile.appendChild(newCard);
        newTile.appendChild(cover);
        myField.appendChild(newTile);
    });
}



//onderstaande funtie controleerd bij het klikken op de afbeelding of afbeelding afgeschermd is, zo ja roept hij de classname .uncovered aan
// die de 'cover' display none maakt.
// daarna vermeld de naam van het dier in de console.
function onClickCard(e) {

	if (e.target.className === "covered") {
		e.target.className = "uncovered";
		console.log(e.target.parentNode.firstChild.getAttribute("name"));
	}


}


