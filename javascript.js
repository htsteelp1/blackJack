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
    balanceRef.value = balanceRef.vaulue>0 ? balanceRef.value : 100
    localStorage.setItem("balance", balance);
    displayBalance();
}
function displayBalance() {
    balanceDis.innerText = balanceRef.value;
}
initialLoad();
