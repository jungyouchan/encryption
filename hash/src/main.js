let pollingInterval;
let isPolling = false;
let hashData = []; // 서버에서 받아온 데이터를 저장할 배열

window.onload = () => {

  {
    document.addEventListener("DOMContentLoaded", () => {
      const toggleButton = document.getElementById("toggleButton");
      
      toggleButton.addEventListener("click", () => {
        if (isPolling) {
          stopPolling();
        } else {
          startPolling();
        }
      });
    });
  }

  {
    const rainbowTable = document.getElementById("rainbow-table");
    const rainbowTableExplain = document.getElementById("rainbow-table-explain");
    rainbowTable.addEventListener("mouseover", (e) => {
      rainbowTableExplain.style.display = "block";
      rainbowTableExplain.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
}
async function fetchData() {
  try {
    const response = await fetch("https://encryption-pink.vercel.app/api/submit", {
      method: "GET",  // GET 요청으로 데이터 받기
    });

    if (response.ok) {
      const data = await response.json();  // 응답을 JSON 형식으로 파싱
      hashData.push(...data.receivedData.passwordHashes); // 서버에서 받은 데이터 업데이트
      console.log("서버 응답:", data);

      drawChart(hashData); // 차트 그리기 함수 호출

    } else {
      console.error("서버 응답 오류", response.status);
    }
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

function startPolling() {
  // 5초마다 fetchData를 호출하여 데이터를 주기적으로 받아오기
  pollingInterval = setInterval(fetchData, 5000); // 5000ms = 5초마다 fetchData 호출
  isPolling = true;
  document.getElementById("toggleButton").textContent = "ON";
}

// 폴링 중지
function stopPolling() {
  clearInterval(pollingInterval);  // setInterval을 취소
  isPolling = false;
  document.getElementById("toggleButton").textContent = "OFF";
}


function drawChart(data) { //data = [ {SHA256:..., Argon2:..., Bcrypt:...}, {...}, ... ]
  const sha256Times = data.map(d => d.SHA256);
  const argon2Times = data.map(d => d.Argon2);
  const bcryptTimes = data.map(d => d.Bcrypt);

  const chartData = {
    labels: ["SHA256", "Argon2", "Bcrypt"],
    datasets: [{
      label: 'Hash Time Distribution',
      backgroundColor: ['skyblue','lightgreen','lightpink'],
      borderColor: 'black',
      borderWidth: 1,
      outlierColor: '#999999', // 점 색
      padding: 10,
      itemRadius: 4,
      data: [sha256Times, argon2Times, bcryptTimes]  // 각각 박스플롯용 배열
    }]
  };

  const ctx = document.getElementById('hashChart').getContext('2d');
  new Chart(ctx, {
    type: 'boxplot',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: '알고리즘별 해시 시간 분포'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          title: { display: true, text: '해시 생성 시간 (ms)' }
        }
      }
    }
  });
}