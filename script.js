
function addEntry() {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const task = document.getElementById("task").value;

  if (!name || !date || !task) {
    alert("모든 항목을 입력해주세요!");
    return;
  }

  const table = document.getElementById("reportTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${name}</td>
    <td>${date}</td>
    <td>${task}</td>
    <td><button onclick="deleteRow(this)">삭제</button></td>
  `;

  // 입력값 초기화
  document.getElementById("name").value = '';
  document.getElementById("date").value = '';
  document.getElementById("task").value = '';
}

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
