document.onload = function () {
  const rainbowTable = document.getElementById("rainbow-table");
  const rainbowTableExplain = document.getElementById("rainbow-table-explain");
  rainbowTable.addEventListener("mouseover", (e) => {
    rainbowTableExplain.style.display = "block";
    rainbowTableExplain.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}