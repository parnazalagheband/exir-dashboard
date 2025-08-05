import { getCoins } from "../scripts/api.js";

const loading = document.getElementById("loading");
const coinsTable = document.getElementById("coins-table");
const pairsTable = document.getElementById("pairs-table");
const btnCoinNext = document.getElementById("btnCoinNext");
const btnCoinPrevious = document.getElementById("btnCoinPrevious");
const btnPairNext = document.getElementById("btnPairNext");
const btnPairPrevious = document.getElementById("btnPairPrevious");

let currentCoinsPage = 1;
let currentPairsPage = 1;
const ITEMS_PERPAGE = 20;
let coins = [];
let objectCoins = null;
let pairs = [];

const getCoinsTable = async () => {
  loading.style.display = "block";
  try {
    const response = await getCoins();
    console.log(response);
    objectCoins = response.coins;
    coins = Object.values(response.coins);
    pairs = Object.values(response.pairs);
    createCoinTable();
    createPairsTable();
  } catch (error) {
    alert("We can't load table.");
  }
  loading.style.display = "none";
};

const createPairsTable = () => {
  if (!pairs || pairs.length === 0) return;

  if (currentPairsPage === 1) {
    btnPairPrevious.disabled = true;
  } else if (currentPairsPage === Math.ceil(pairs.length / ITEMS_PERPAGE)) {
    btnPairNext.disabled = true;
  } else {
    btnPairPrevious.disabled = false;
    btnPairNext.disabled = false;
  }

  pairsTable.innerHTML = "";
  const start = (currentPairsPage - 1) * ITEMS_PERPAGE;
  const currentData = pairs.slice(start, start + ITEMS_PERPAGE);

  currentData.forEach((pair) => {
    const tr = document.createElement("tr");
    const basePair = document.createElement("td");
    const pair2 = document.createElement("td");
    const minPrice = document.createElement("td");
    const maxPrice = document.createElement("td");
    const imgBasePair = document.createElement("img");
    const textBasePair = document.createElement("p");
    const imgpair2 = document.createElement("img");
    const textpair2 = document.createElement("p");

    textBasePair.textContent = pair?.pair_base ?? "-";
    textpair2.textContent = pair?.pair_2 ?? "-";
    minPrice.textContent = pair?.max_size ?? "-";
    maxPrice.textContent = pair?.min_price ?? "-";

    imgBasePair.src = objectCoins[pair?.pair_base]?.logo;
    imgBasePair.width = 20;
    imgBasePair.height = 20;
    imgpair2.src = objectCoins[pair?.pair_2]?.logo;
    imgpair2.width = 20;
    imgpair2.height = 20;

    const basePairWrapper = document.createElement("div");
    basePairWrapper.classList.add("pair-box");
    basePairWrapper.appendChild(imgBasePair);
    basePairWrapper.appendChild(textBasePair);
    basePair.appendChild(basePairWrapper);

    const pair2Wrapper = document.createElement("div");
    pair2Wrapper.classList.add("pair-box");
    pair2Wrapper.appendChild(imgpair2);
    pair2Wrapper.appendChild(textpair2);
    pair2.appendChild(pair2Wrapper);
    tr.appendChild(basePair);
    tr.appendChild(pair2);
    tr.appendChild(minPrice);
    tr.appendChild(maxPrice);
    pairsTable.appendChild(tr);
  });
};

const createCoinTable = () => {
  if (!coins || coins.length === 0) return;

  if (currentCoinsPage === 1) {
    btnCoinPrevious.disabled = true;
  } else if (currentCoinsPage === Math.ceil(coins.length / ITEMS_PERPAGE)) {
    btnCoinNext.disabled = true;
  } else {
    btnCoinPrevious.disabled = false;
    btnCoinNext.disabled = false;
  }

  coinsTable.innerHTML = "";
  const start = (currentCoinsPage - 1) * ITEMS_PERPAGE;
  const currentCoins = coins.slice(start, start + ITEMS_PERPAGE);

  currentCoins.forEach((coin) => {
    const tr = document.createElement("tr");
    const fullName = document.createElement("td");
    const price = document.createElement("td");
    const logo = document.createElement("td");
    const marketCap = document.createElement("td");
    const image = document.createElement("img");

    fullName.textContent = coin?.fullname ?? "-";
    price.textContent = coin?.estimated_price ?? "-";
    marketCap.textContent = coin?.market_cap ?? "-";

    image.src = coin?.logo;
    image.width = 24;
    image.height = 24;

    logo.appendChild(image);
    tr.appendChild(logo);
    tr.appendChild(fullName);
    tr.appendChild(price);
    tr.appendChild(marketCap);
    coinsTable.appendChild(tr);
  });
};

const nextCoinsPage = () => {
  if (currentCoinsPage < Math.ceil(coins.length / ITEMS_PERPAGE)) {
    currentCoinsPage++;
    createCoinTable();
  }
};

const prevCoinsPage = () => {
  if (currentCoinsPage > 1) {
    currentCoinsPage--;
    createCoinTable();
  }
};

const nextPairsPage = () => {
  if (currentPairsPage < Math.ceil(pairs.length / ITEMS_PERPAGE)) {
    currentPairsPage++;
    createPairsTable();
  }
};

const prevPairsPage = () => {
  if (currentPairsPage > 1) {
    currentPairsPage--;
    createPairsTable();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getCoinsTable();
});

btnCoinNext.addEventListener("click", nextCoinsPage);
btnCoinPrevious.addEventListener("click", prevCoinsPage);
btnPairNext.addEventListener("click", nextPairsPage);
btnPairPrevious.addEventListener("click", prevPairsPage);
