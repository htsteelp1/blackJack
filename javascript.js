const deck = [];
const pHand = [];
const dHand = [];
let dHandDis = document.querySelector("#dealer .cards")
let pHandDis = document.querySelector("#player .cards")
let controls = document.querySelector("#cConc");
let bControls = document.querySelector(".bControls")
let pControls = document.querySelector(".pControls");
let betInput = document.querySelector("#Bet");
let amountBet = 0;
let betDisplay = document.querySelector("#amountBet");
let blackJack = false;
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
        return parseInt(localStorage.getItem("balance"));
    },
    set value(v) {
        localStorage.setItem("balance", v);
    }
}
let bBefore = balanceRef.value;
let won = document.querySelector("#amountWon")
let balanceDis = document.querySelector("#balance");

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
        // case "split":
        //     split();
        //     break;
        case "abet":
            bet();
    }
}

function hit() {
    dealCard("player");
    totalLogic();
}
function stand() {
    totalLogic();
    endRound();
}
function double() {
    dealCard("player");
    balanceRef.value = balanceRef.value - Math.min(balanceRef.value, amountBet);
    amountBet += Math.min(balanceRef.value, amountBet);
    stand();
}
// function split() {
//
// }
function totalLogic() {
    if (totalAces(pHand)>21) endRound();
    else if (totalHand(pHand)===21 && pHand.length === 2) blackJack = true;
    else if (totalAces(pHand)===21) endRound();
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
    if (a>0 && total>21) return subtractAces(a-1, total-10);
    else return total;
}
function totalHand(hand) {
    return hand.reduce((total, value) => cardToNum(value)+total, 0);
}
function totalAces(hand) {
    return subtractAces(countAces(hand), totalHand(hand));
}
function endRound() {
    while (totalAces(dHand) < 17) {
        dealCard("dealer");
    }
    pControls.remove();
    checkWin(blackJack);
    displayBalance();
    amountBet = 0;
    displayBet();
    betRound();
    blackJack = false;
    won.innerText = balanceRef.value - bBefore;
}
function startRound() {
    bControls.remove();
    controls.appendChild(pControls);
    generateDeck();
    deleteAllChildren(dHandDis);
    deleteAllChildren(pHandDis);
    clearArray(pHand);
    clearArray(dHand);
    dealCard("player");
    dealCard("player");
    dealCard("Dealer");
}
function betRound() {
    controls.appendChild(bControls);
}
function bet() {
    bBefore = balanceRef.value;
    amountBet = Math.max(Math.min(balanceRef.value, parseInt(betInput.value)), 0);
    balanceRef.value = balanceRef.value - amountBet;
    displayBalance();
    displayBet();
    startRound();
}
function displayBet() {
    betDisplay.innerText = amountBet;
}
function checkWin(blackJack) {
    let dTotal = totalAces(dHand);
    let pTotal = totalAces(pHand);
    if (pTotal > 21) {
    }
    else if (dTotal > 21) {
        balanceRef.value += 2*amountBet;
        if (blackJack) balanceRef.value += amountBet*0.5;
    }
    else if (dTotal === pTotal) {
        balanceRef.value += amountBet;
        if (blackJack === true && dHand.length !== 2) balanceRef.value += Math.ceil(amountBet*1.5)
    }
    else if (dTotal > pTotal) {
    //     Insurance logic will go here
    }
    else if (pTotal > dTotal) {
        balanceRef.value += 2*amountBet;
        if (blackJack === true) balanceRef.value += Math.ceil(amountBet*0.5);
    }
}
function clearArray(array) {
    array.length = 0;
    array.length = 0;
}
balanceRef.value = balanceRef.value>0 ? balanceRef.value : 100
displayBalance();
bControls.remove();
pControls.remove();
betRound();


