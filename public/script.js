function addEntry() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const task = document.getElementById("task").value;

  if (!name || !category || !task) {
    alert("모든 항목을 입력해주세요!");
    return;
  }

  const entry = { name, category, task };
  const data = getData();
  data.push(entry);
  saveData(data);

  renderTable();
  document.getElementById("name").value = '';
  document.getElementById("category").value = '';
  document.getElementById("task").value = '';
}

function renderTable() {
  const tableBody = document.querySelector("#reportTable tbody");
  tableBody.innerHTML = ""; // 기존 내용 비우기

  const data = getData();
  data.forEach((item, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.task}</td>
      <td><button onclick="deleteRow(${index})">삭제</button></td>
    `;
  });
}

function deleteRow(index) {
  const data = getData();
  data.splice(index, 1);
  saveData(data);
  renderTable();
}

function deleteAll() {
  localStorage.removeItem("reportData");
  renderTable();
}

function getData() {
  return JSON.parse(localStorage.getItem("reportData")) || [];
}

function saveData(data) {
  localStorage.setItem("reportData", JSON.stringify(data));
}

function downloadCSV() {
  const rows = document.querySelectorAll("table tr");
  let csvContent = "\uFEFF"; // UTF-8 BOM

  rows.forEach((row) => {
    const cols = row.querySelectorAll("td, th");
    const validCols = Array.from(cols).slice(0, -1); // "삭제" 제외
    const rowData = validCols.map(col => `"${col.textContent}"`).join(",");
    csvContent += rowData + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "주간보고.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 페이지 로드 시 테이블 렌더링
window.onload = renderTable;
