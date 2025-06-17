const boardSize = 5;
const bombCount = 3;
let balance = 0;

function loadBalance() {
  const saved = localStorage.getItem("balance");
  balance = saved ? parseInt(saved) : 10;
  document.getElementById("balance").textContent = balance;
}

function saveBalance() {
  localStorage.setItem("balance", balance);
}

function startGame() {
  if (balance < 1) {
    alert("Balansingiz yetarli emas!");
    return;
  }

  balance--;
  saveBalance();
  loadBalance();

  const board = document.getElementById("board");
  board.innerHTML = "";

  let bombs = new Set();
  while (bombs.size < bombCount) {
    bombs.add(Math.floor(Math.random() * (boardSize * boardSize)));
  }

  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cell.addEventListener("click", () => {
      if (cell.classList.contains("clicked")) return;
      cell.classList.add("clicked");

      if (bombs.has(i)) {
        cell.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/564/564619.png')";
        alert("💥 Bomba! Siz yutqazdingiz.");
      } else {
        cell.style.backgroundImage = "url('https://pngimg.com/d/coin_PNG36871.png')";
        balance += 2;
        saveBalance();
        loadBalance();
      }
    });

    board.appendChild(cell);
  }
}

loadBalance();
