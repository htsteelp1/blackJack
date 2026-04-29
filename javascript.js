let balance = localStorage.getItem("balance") ?? 100
let balanceDis = document.querySelector("#balance");

function initialLoad() {
    balance = balance>0 ? balance : 100
    localStorage.setItem("balance", balance);
    balanceDis.innerText = balance;
}
initialLoad();
