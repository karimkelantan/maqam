document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("table tbody tr");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const checkbox = row.querySelector("input[type=checkbox]");
      checkbox.checked = !checkbox.checked;
      row.classList.toggle("selected");
      calculateSum();
      updateToggleSelectButtonText();
    });
  });
  const toggleSelectBtn = document.getElementById("toggle-select");
  toggleSelectBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(
      "table tbody input[type=checkbox]"
    );
    const allSelected =
      document.querySelectorAll("table tbody tr.selected").length ===
      checkboxes.length;

    checkboxes.forEach((cb) => {
      cb.checked = !allSelected;
      cb.closest("tr").classList.toggle("selected", !allSelected);
    });
    calculateSum();
    updateToggleSelectButtonText();
  });

  function updateToggleSelectButtonText() {
    const checkboxes = document.querySelectorAll(
      "table tbody input[type=checkbox]"
    );
    const allSelected =
      document.querySelectorAll("table tbody tr.selected").length ===
      checkboxes.length;

    const toggleSelectBtn = document.getElementById("toggle-select");
    toggleSelectBtn.textContent = allSelected
      ? "إلغاء تحديد المجموع الكامل"
      : "المجموع الكامل";
  }

  function calculateSum() {
    var selectedRows = [];
    var sumA = 0;
    var sumB = 0;
    var selectedLevels = []; // New variable to store selected levels
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(function (checkbox) {
      var rowData = {
        a: parseInt(checkbox.dataset.a),
        b: parseInt(checkbox.dataset.b),
        level: parseInt(checkbox.closest("tr").children[0].innerText), // Get the level from the first cell of the row
      };
      if (checkbox.checked) {
        selectedRows.push(rowData);
        checkbox.closest("tr").classList.add("selected");
        selectedLevels.push(rowData.level); // Add the selected level to the array
      } else {
        checkbox.closest("tr").classList.remove("selected");
      }
    });
    selectedRows.forEach(function (row) {
      sumA += row.a;
      sumB += row.b;
    });
    var sumTable = document.querySelector("#sums tbody");
    if (selectedLevels.length > 0) {
      sumTable.innerHTML =
        "<tr><td>مجموع الكهرمان</td><td>" +
        sumA.toLocaleString("en-US") +
        "</td></tr>" +
        "<tr><td>مجموع النجم</td><td>" +
        sumB.toLocaleString("en-US") +
        "</td></tr>" +
        "<tr><td>المستويات المحددة</td><td>" +
        selectedLevels.join(", ") + // Convert array of selected levels to a comma-separated string
        "</td></tr>";
      sumTable.closest("table").style.display = "table"; // Show the sumTable
    } else {
      sumTable.closest("table").style.display = "none"; // Hide the sumTable when no rows are selected
    }
  }

  var checkboxColumn = document.querySelectorAll("table th")[3];
  checkboxColumn.style.display = "none";
  var checkboxCells = document.querySelectorAll("table td:nth-child(4)");
  checkboxCells.forEach(function (cell) {
    cell.style.display = "none";
  });
});
