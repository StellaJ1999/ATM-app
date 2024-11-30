document.addEventListener('DOMContentLoaded', function () {
    let isLoggedIn = false;
    let currentUser = null;
    let originalBalance = 1000;
    let currentInput = "";
  
    function login() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const users = [
        { name: "Stella", username: "user1", password: "user1", balance: originalBalance },
        { name: "Louis", username: "user2", password: "user2", balance: originalBalance }
      ];
  
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
        currentUser = user;
        isLoggedIn = true;
        switchPage("dashboard");
        updateUserInfo();
        updateBalance();
      } else {
        alert("Ogiltigt användarnamn eller lösenord");
      }
    }
  
    function logout() {
      originalBalance = currentUser.balance;
      currentUser = null;
      isLoggedIn = false;
      switchPage("login-page");
    }
  
    function showBalance() {
      if (isLoggedIn) {
        alert(`Saldo: ${currentUser.balance} kr`);
      } else {
        alert("Du måste logga in för att använda denna funktion.");
      }
    }
  
    function deposit() {
      if (isLoggedIn) {
        if (currentInput !== "") {
          const amount = parseInt(currentInput);
          if (!isNaN(amount) && amount >= 0 && amount % 2 === 0) {
            currentUser.balance += amount;
            updateBalance();
            clearInput();
          } else {
            alert("Ogiltig inmatning. Endast jämna tal är tillåtna.");
          }
        }
      } else {
        alert("Du måste logga in för att använda denna funktion.");
      }
    }
  
    function withdraw() {
      if (isLoggedIn) {
        if (currentInput !== "") {
          const amount = parseInt(currentInput);
          if (!isNaN(amount) && amount >= 0 && amount % 2 === 0) {
            if (currentUser.balance - amount >= 0) {
              currentUser.balance -= amount;
              updateBalance();
              clearInput();
            } else {
              alert("Otillräckligt saldo");
            }
          } else {
            alert("Ogiltig inmatning. Endast jämna tal är tillåtna.");
          }
        }
      } else {
        alert("Du måste logga in för att använda denna funktion.");
      }
    }
  
    function pressButton(number) {
      currentInput += number;
      updateButtonDisplay();
    }
  
    function updateUserInfo() {
      document.getElementById("user-info").innerText = currentUser.name;
    }
  
    function updateBalance() {
      document.getElementById("balance-display").innerText = `Saldo: ${currentUser.balance} kr`;
    }
  
    function updateButtonDisplay() {
      document.getElementById("button-display").innerText = currentInput;
    }
  
    function clearInput() {
      currentInput = "";
      updateButtonDisplay();
    }
  
    function switchPage(pageId) {
      const pages = document.querySelectorAll(".page");
      pages.forEach(page => (page.style.display = "none"));
  
      const currentPage = document.getElementById(pageId);
      if (currentPage) {
        currentPage.style.display = "block";
      }
  
      if (!isLoggedIn && pageId !== "login-page") {
        switchPage("login-page");
      }
    }
  
    document.getElementById("login-btn").addEventListener('click', login);
    document.getElementById("logout-btn").addEventListener('click', logout);
    document.getElementById("show-balance-btn").addEventListener('click', showBalance);
    document.getElementById("deposit-btn").addEventListener('click', deposit);
    document.getElementById("withdraw-btn").addEventListener('click', withdraw);
    document.getElementById("clear-btn").addEventListener('click', clearInput);
  
    const keypadButtons = document.querySelectorAll("#keypad button");
    keypadButtons.forEach(button => {
      button.addEventListener('click', function () {
        pressButton(button.innerText);
      });
    });
  
    switchPage("login-page");
  });