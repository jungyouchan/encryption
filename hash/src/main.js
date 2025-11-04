import { Chart, CategoryScale, LinearScale, Tooltip, Title, Legend } from 'chart.js';
import { BoxPlotChart, BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';

// Chart.js 기본 요소 등록
Chart.register(CategoryScale, LinearScale, Tooltip, Title, Legend);

// BoxPlot 관련 요소 등록
Chart.register(BoxPlotController, BoxAndWiskers, BoxPlotChart);

let hashData = [];
let hashChart;

export async function fetchData() {
  try {
    const response = await fetch("https://encryption-pink.vercel.app/api/submit");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    hashData.push(...data.receivedData.passwordHashes);
    console.log("서버 응답:", data);

    drawChart(hashData);
  } catch (error) {
    console.error("데이터 로드 오류:", error);
  }
}

function drawChart(data) {
  const sha256Times = data.map(d => d.SHA256);
  const argon2Times = data.map(d => d.Argon2);
  const bcryptTimes = data.map(d => d.Bcrypt);

  const chartData = {
    labels: ["SHA256", "Argon2", "Bcrypt"],
    datasets: [{
      label: "Hash Time Distribution",
      backgroundColor: ['skyblue', 'lightgreen', 'lightpink'],
      borderColor: 'black',
      borderWidth: 1,
      outlierColor: '#999999',
      padding: 10,
      itemRadius: 4,
      data: [sha256Times, argon2Times, bcryptTimes]
    }]
  };

  if (hashChart) {
    hashChart.destroy();
    hashChart = null;
  }

  const ctx = document.getElementById("hashChart").getContext("2d");
  hashChart = new Chart(ctx, {
    type: "boxplot",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "알고리즘별 해시 시간 분포"
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          title: { display: true, text: "해시 생성 시간 (ms)" }
        }
      }
    }
  });
}
