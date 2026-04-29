const deck = [];
const pHand = [];
const dHand = [];
let dHandDis = document.querySelector("#dealer .cards")
let pHandDis = document.querySelector("#player .cards")
let controls = document.querySelector("#cConc");
function generateDeck() {
    let suitList = "CHDS"
    let numList = "A23456789TJQK"
    for (let z = 0; z < 6; z++) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                deck.push(numList.at(j)+suitList.at(i));
            }
        }
    }
    deck.sort(() => Math.random() - 0.5); // Shuffles the deck
}
let balanceRef = {
    get value() {
        return localStorage.getItem("balance");
    },
    set value(v) {
        localStorage.setItem("balance", v);
    }
}
let balanceDis = document.querySelector("#balance");

function initialLoad() {
    balanceRef.value = balanceRef.value>0 ? balanceRef.value : 100
    displayBalance();
}

function dealCard(person) {
    let card = deck.pop();
    let cardImage = document.createElement("img");
    cardImage.src = cardUrl(card);
    if (person === "player") {
        pHand.push(card);
        pHandDis.appendChild(cardImage);
    }
    else {
        dHand.push(card);
        dHandDis.appendChild(cardImage);
    }
}
function cardUrl(card) {
    let cardUrl = "./playing-cards-master/";
    switch (card.at(1)) {
        case "H":
            cardUrl += "hearts_";
            break;
        case "C":
            cardUrl += "clubs_";
            break;
        case "D":
            cardUrl += "diamonds_";
            break;
        case "S":
            cardUrl += "spades_";
            break;
    }
    cardUrl += card.at(0) + ".png";
    return cardUrl;
}
function displayBalance() {
    balanceDis.innerText = balanceRef.value;
}

function deleteAllChildren(element) {
    const childList = element.childNodes;
    const childLength = childList.length;
    for (let i = 0; i<childLength; i++) {
        element.firstChild.remove();
    }
}

controls.addEventListener("click", clickHandler)
function clickHandler(event) {
    event.preventDefault();
    switch (event.target.id) {
        case "double":
            double();
            break;
        case "hit":
            hit();
            break;
        case "stand":
            stand();
            break;
        case "split":
            split();
            break;
        case "bet":
            bet();
    }
}

function hit() {
    dealCard("player");
    totalLogic();
}
function stand() {
    totalLogic();
    checkWin();
}
function double() {
    dealCard();
    stand();
}
function split() {

}
function totalLogic() {

}
function cardToNum(card) {
    let num = 2+"23456789TJQKA".indexOf(card.at(0));
    return num > 10 ? 10 + (num>13) : num;
}
function countAces(hand) {
    return hand.reduce((sum, str) =>
        sum + str.split("A").length - 1, 0
    );
}
function subtractAces(a, total) {
    if (a>1 && total>21) return subtractAces(a-1, total-10);
    else return total;
}
function totalHand(hand) {
    return hand.reduce((total, value) => cardToNum(value)+total, 0);
}
function totalAces(hand) {
    return subtractAces(countAces(hand), totalHand(hand));
}
initialLoad();
generateDeck();
