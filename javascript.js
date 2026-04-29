let deck = []
function deckGenerator() {
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

function dealCard() {

}

function displayBalance() {
    balanceDis.innerText = balanceRef.value;
}

initialLoad();
