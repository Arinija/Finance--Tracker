const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
    const income = amounts.filter(a => a > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
    const expense = (
        amounts.filter(a => a < 0).reduce((acc, val) => acc + val, 0) * -1
    ).toFixed(2);

    balanceEl.textContent = total;
    incomeEl.textContent = income;
    expenseEl.textContent = expense;
}

function addTransactionDOM(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction", transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        ${transaction.description} <span>₹${transaction.amount}</span>
        <button onclick="removeTransaction(${transaction.id})">❌</button>
    `;
    transactionList.appendChild(li);
}

function updateUI() {
    transactionList.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

function addTransaction(e) {
    e.preventDefault();
    if (description.value.trim() === "" || amount.value.trim() === "") {
        alert("Please add description and amount");
        return;
    }
    const transaction = {
        id: Date.now(),
        description: description.value,
        amount: +amount.value
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
    description.value = "";
    amount.value = "";
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}

form.addEventListener("submit", addTransaction);
updateUI();
