function addEntry() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const task = document.getElementById("task").value;

  if (!name || !category || !task) {
    alert("모든 항목을 입력해주세요!");
    return;
  }

  const table = document.getElementById("reportTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${name}</td>
    <td>${category}</td>
    <td>${task}</td>
    <td><button onclick="deleteRow(this)">삭제</button></td>
  `;

  document.getElementById("name").value = '';
  document.getElementById("category").value = '';
  document.getElementById("task").value = '';
}

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function downloadCSV() {
  const rows = document.querySelectorAll("table tr");
  let csvContent = "";

  rows.forEach(row => {
    const cols = row.querySelectorAll("td, th");
    const rowData = Array.from(cols).map(col => `"${col.textContent}"`).join(",");
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
