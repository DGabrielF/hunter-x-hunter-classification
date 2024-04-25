const classificationParams = [
  {name: "ferro", wins: 10},
]

async function init() {
  const data = await fethData();

  const btnCloseDetails = document.querySelector(".details>.close");
  btnCloseDetails.addEventListener("click", () => {
    closeDetails();
    closeFade();
  });

  const fade = document.querySelector(".fade");
  fade.addEventListener("click", () => {
    closeDetails();
    closeFade();
  });

  const listArea = document.querySelector(".list_area");
  for (let hunter of data.hunters.sort(compareWins)) {
    const listItem = createHunterListItem(hunter);
    listArea.appendChild(listItem)
  }
}

init();

function createHunterListItem(hunter) {
  const listItem = document.createElement("li");
  listItem.textContent = `${hunter.name.split(" ")[0]}: aproveitamento ${getPerformance(hunter.wins, hunter.loses)}%`;
  listItem.addEventListener("click", () => {    
    setDetailedInfo(hunter);
    openDetails();
    openFade();
  });
  return listItem;
}

async function fethData() {
  try {
    const response = await fetch("./src/database/data.json");
    if (!response.ok) {
      throw new Error('Falha ao carregar o JSON');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro:', error);
  }
}

function getBalance(wins, loses) {
  return wins - loses
}

function calculateTitle(wins) {
  if (wins < 10) {
    return "Ferro";
  } else if (wins >= 10 && wins <= 20) {
    return "Bronze";
  } else if (wins >= 21 && wins <= 50) {
    return "Prata";
  } else if (wins >= 51 && wins <= 80) {
    return "Ouro";
  } else if (wins >= 81 && wins <= 90) {
    return "Diamante";
  } else if (wins >= 91 && wins <= 100) {
    return "Lendário";
  } else {
    return "Imortal";
  }
}

function getPerformance(wins, loses) {
  return ((wins / (wins + loses))*100).toFixed(2)
}

function compareWins(a, b) {
  return b.wins - a.wins;
}

function setDetailedInfo(hunter) {
  const details = document.querySelector(".details");
  const name = details.querySelector(".name");
  name.textContent = hunter.name;

  const wins = details.querySelector(".wins");
  wins.textContent = `${hunter.wins} vitória${hunter.wins > 0 ? "s" : ""}`;

  const loses = details.querySelector(".loses");
  loses.textContent = `${hunter.loses} derrota${hunter.loses > 0 ? "s" : ""}`;

  const performance = details.querySelector(".performance");
  performance.textContent = `Aproveitamento de ${getPerformance(hunter.wins, hunter.loses)}%`;

  const classification = details.querySelector(".classification");
  classification.textContent = `O Herói tem de saldo de ${getBalance(hunter.wins, hunter.loses)} vitórias e está no nível de ${calculateTitle(hunter.wins)}`;
}

function openDetails() {
  const details = document.querySelector(".details");
  details.classList.remove("hide");
}

function closeDetails() {
  const details = document.querySelector(".details");
  details.classList.add("hide");
}

function openFade() {
  const fade = document.querySelector(".fade");
  fade.classList.remove("hide");
}

function closeFade() {
  const fade = document.querySelector(".fade");
  fade.classList.add("hide");
}