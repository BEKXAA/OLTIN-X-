// Yoki localStorage.clear(); bilan test uchun tozalash
if (!localStorage.getItem("balance")) {
  localStorage.setItem("balance", "0");
}
updateBalanceDisplay();

function updateBalanceDisplay() {
  document.getElementById("balance").innerText = localStorage.getItem("balance");
}

function openCase(caseId) {
  // Tasodifiy coin (5 - 20 orasida)
  const reward = Math.floor(Math.random() * 1000) + 100;

  let current = parseInt(localStorage.getItem("balance"));
  current += reward;
  localStorage.setItem("balance", current);

  alert(`🎉 Siz ${reward} coin yutdingiz!`);
  updateBalanceDisplay();
}
