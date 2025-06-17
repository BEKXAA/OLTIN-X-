// Boshlang'ich balans
if (!localStorage.getItem("balance")) {
  localStorage.setItem("balance", "100");
}

function updateBalance() {
  document.getElementById("balance").textContent = localStorage.getItem("balance");
}

function getMultiplier(color) {
  switch (color) {
    case "red":
    case "yellow":
      return 2;
    case "green":
      return 3;
    case "blue":
      return 5;
  }
}

function getRandomColor() {
  const colors = ["red", "green", "blue", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function spinWheel() {
  let balance = parseInt(localStorage.getItem("balance"));
  const bet = parseInt(document.getElementById("betAmount").value);
  const selectedColor = document.getElementById("colorSelect").value;

  if (isNaN(bet) || bet <= 0 || bet > balance) {
    alert("Noto‘g‘ri tikish summasi!");
    return;
  }

  // Tikishni olib tashlash
  balance -= bet;

  // G‘ildirakni aylantirish
  const resultColor = getRandomColor();

  // Natija chiqarish
  const wheel = document.getElementById("wheel");
  wheel.style.transition = "transform 2s ease";
  const rotateDeg = 360 * 5 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${rotateDeg}deg)`;

  setTimeout(() => {
    const result = document.getElementById("result");
    if (resultColor === selectedColor) {
      const winAmount = bet * getMultiplier(resultColor);
      balance += winAmount;
      result.textContent = `🎉 G‘alaba! Rang: ${resultColor}. Yutug‘ingiz: ${winAmount} coin`;
    } else {
      result.textContent = `❌ Yutqazdingiz! Tushgan rang: ${resultColor}`;
    }

    localStorage.setItem("balance", balance);
    updateBalance();
  }, 2000);
}

updateBalance();
