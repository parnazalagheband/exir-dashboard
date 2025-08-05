import { getChartData } from "../scripts/api.js";
const { DateTime } = luxon;

const loading = document.getElementById("loading");
const emptyData = document.getElementById("empty-data");
emptyData.style.display = "none";

let chartData = [];

const drawChart = async () => {
  loading.style.display = "block";
  try {
    const symbol = document.getElementById("symbol").value;
    const interval = document.getElementById("interval").value;
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;

    if (!fromDate || !toDate || !symbol || !interval) {
      alert("Please select chart items!");
      loading.style.display = "none";
      return;
    }

    const from = Math.floor(
      DateTime.fromISO(fromDate).startOf("day").toSeconds()
    );
    const to = Math.floor(DateTime.fromISO(toDate).endOf("day").toSeconds());

    const response = await getChartData(symbol, interval, from, to);

    chartData = response.map((item) => ({
      x: DateTime.fromISO(item.time).toMillis(),
      y: item.volume,
    }));

    if (!chartData.some((item) => item.y > 0)) {
      emptyData.style.display = "block";
      document.querySelector("#chart").innerHTML = "";
      loading.style.display = "none";
      return;
    }

    emptyData.style.display = "none";

    const options = {
      chart: {
        type: "line",
        height: 350,
      },
      series: [
        {
          name: "Volume",
          data: chartData,
        },
      ],
      xaxis: {
        type: "datetime",
      },
    };

    document.querySelector("#chart").innerHTML = "";
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  } catch (error) {
    console.log(error);
    alert("we can't create chart");
  }
  loading.style.display = "none";
};

document.getElementById("createChart").addEventListener("click", drawChart);
