function addEntry() {
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value.trim();
  const task = document.getElementById("task").value.trim();

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
  tableBody.innerHTML = "";

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

function downloadExcel() {
  const data = getData();

  const worksheetData = [
    ["이름", "과업 분류", "업무 내용"],
    ...data.map(entry => [entry.name, entry.category, entry.task])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 20 },
    { wch: 40 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "주간보고");

  XLSX.writeFile(workbook, "주간보고_자동정리.xlsx");
}

// 🎯 엔터 키 입력시 addEntry 호출
['name', 'category', 'task'].forEach(id => {
  document.getElementById(id).addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addEntry();
    }
  });
});

// 초기 테이블 로드
window.onload = renderTable;
