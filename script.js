// Coin va foydalanuvchini localStorage dan yuklash
let coin = localStorage.getItem("coin") || 0;
let username = localStorage.getItem("username") || "Mehmon";

// HTMLga chiqarish
document.getElementById("coin-count").textContent = coin;
document.getElementById("username").textContent = username;

// Coin qo'shish
document.getElementById("add-coin").addEventListener("click", () => {
  coin = parseInt(coin) + 10;
  document.getElementById("coin-count").textContent = coin;
  localStorage.setItem("coin", coin);
});

// Agar foydalanuvchi istasa, nickname qo‘shish mumkin:
if (!localStorage.getItem("username")) {
  const name = prompt("Ismingizni kiriting:");
  if (name) {
    localStorage.setItem("username", name);
    document.getElementById("username").textContent = name;
  }
}


let multiplier = 1.0;
let interval;
let gameRunning = false;

const multiplierDisplay = document.getElementById("multiplier");
const startBtn = document.getElementById("start-crash");
const cashOutBtn = document.getElementById("cash-out");
const statusText = document.getElementById("crash-status");

startBtn.addEventListener("click", () => {
  const bet = parseInt(document.getElementById("bet-amount").value);
  if (isNaN(bet) || bet <= 0) {
    alert("Iltimos, to‘g‘ri Tanga miqdorini kiriting.");
    return;
  }
  if (bet > coin) {
    alert("Tanga yetarli emas!");
    return;
  }

  coin -= bet;
  localStorage.setItem("coin", coin);
  document.getElementById("coin-count").textContent = coin;

  gameRunning = true;
  multiplier = 1.0;
  statusText.textContent = "";
  cashOutBtn.disabled = false;
  startBtn.disabled = true;

  interval = setInterval(() => {
    multiplier += 0.01;
    multiplierDisplay.textContent = multiplier.toFixed(2) + "x";

    const crashChance = Math.random();
    if (crashChance < 0.01 + multiplier / 100) {
      endGame(false, bet);
    }
  }, 100);
});

cashOutBtn.addEventListener("click", () => {
  if (!gameRunning) return;
  const profit = Math.floor(parseInt(document.getElementById("bet-amount").value) * multiplier);
  coin += profit;
  localStorage.setItem("coin", coin);
  document.getElementById("coin-count").textContent = coin;
  endGame(true, profit);
});

function endGame(won, amount) {
  clearInterval(interval);
  gameRunning = false;
  startBtn.disabled = false;
  cashOutBtn.disabled = true;

  if (won) {
    statusText.textContent = `🎉 Yutdingiz! +${amount} Oltin`;
    statusText.style.color = "green";
  } else {
    statusText.textContent = `💥 Portladi! Oltin yo'qotdingiz.`;
    statusText.style.color = "red";
  }
}
//
// Keyslar uchun inventory
let keys = JSON.parse(localStorage.getItem("keys")) || {
  gold: 0,
  blue: 0,
  green: 0
};

function saveKeys() {
  localStorage.setItem("keys", JSON.stringify(keys));
  renderKeys();
}

function renderKeys() {
  const list = document.getElementById("key-list");
  list.innerHTML = "";
  for (const key in keys) {
    if (keys[key] > 0) {
      const li = document.createElement("li");
      const emoji = key === "gold" ? "🟡" : key === "blue" ? "🔵" : "🟢";
      li.textContent = `${emoji} ${key.charAt(0).toUpperCase() + key.slice(1)} Key: ${keys[key]} ta`;
      list.appendChild(li);
    }
  }
}

function buyKey(type) {
  const prices = {
    gold: 1000000,
    blue: 100000,
    green: 1000
  };

  if (coin < prices[type]) {
    alert("Tanga yetarli emas!");
    return;
  }

  coin -= prices[type];
  keys[type]++;
  localStorage.setItem("coin", coin);
  document.getElementById("coin-count").textContent = coin;
  saveKeys();
  alert(`${type.charAt(0).toUpperCase() + type.slice(1)} key sotib olindi!`);
  
}

// Dastlabki keys ko‘rinishi
renderKeys();


function openKey(type) {
  if (keys[type] <= 0) {
    alert("Sizda bu key yo'q!");
    return;
  }

  keys[type]--;
  saveKeys();

  // Random mukofot
  let reward = 0;
  if (type === "gold") {
    reward = Math.floor(Math.random() * 1000000) + 1000; // 50–149
  } else if (type === "blue") {
    reward = Math.floor(Math.random() * 100000) + 200; // 20–69
  } else if (type === "green") {
    reward = Math.floor(Math.random() * 1000) + 50; // 5–24
  }

  coin += reward;
  localStorage.setItem("coin", coin);
  document.getElementById("coin-count").textContent = coin;

  document.getElementById("reward-text").textContent = `🎉 Siz ${reward} Oltin yutib oldingiz!`;
}


// Boshlang'ich funksiyalar
function getBalance() {
    return parseInt(localStorage.getItem("balance") || "0");
}

function setBalance(amount) {
    localStorage.setItem("balance", amount);
}

function getLastBonusDate() {
    return localStorage.getItem("lastBonusDate");
}

function setLastBonusDate(dateStr) {
    localStorage.setItem("lastBonusDate", dateStr);
}

// Bugungi sana (faqat yil-oy-kun formatda)
function getTodayDateStr() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Bonus berish funksiyasi
function giveDailyBonus() {
    const today = getTodayDateStr();
    const lastDate = getLastBonusDate();

    if (lastDate === today) {
        alert("Siz bugungi bonusni oldingiz ✅");
        return;
    }

    const newBalance = getBalance() + 10;
    setBalance(newBalance);
    setLastBonusDate(today);

    alert("🎉 Sizga 10 oltin berildi!");
}

// Tugmaga bosish
document.getElementById("dailyBonusBtn").addEventListener("click", giveDailyBonus);

// Agar balans bo'lmasa, 0 qilib qo'yamiz
if (localStorage.getItem("balance") === null) {
    setBalance(0);
}