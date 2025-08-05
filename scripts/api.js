const BASE_URL = "https://api.exir.io/v2";

export const getCoins = async () => {
  const response = await fetch(`${BASE_URL}/constants`);
  return response.json();
};

export const getChartData = async (symbol,resolution,from,to) => {
  const response = await fetch(`${BASE_URL}/chart?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`);
  return response.json();
};
