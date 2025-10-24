document.onload = function () {
  const rainbowTable = document.getElementById("rainbow-table");
  const rainbowTableExplain = document.getElementById("rainbow-table-explain");
  rainbowTable.addEventListener("mouseover", function () {
    rainbowTableExplain.style.visibility = "visible";
    
  });
}