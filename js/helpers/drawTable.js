
function createTable(domElementID, tableData, captionValue) {
    const resultTable = document.querySelector(`#${domElementID}`);
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    const caption = document.createElement("caption");

	caption.textContent  = captionValue;
	caption.align = 'bottom';
	table.appendChild(caption);

    tableData.forEach(function (rowData) {
            const row = document.createElement("tr");

            rowData.forEach(function (cellData) {
                    const cell = document.createElement("td");
                    cell.appendChild(document.createTextNode(cellData));
                    row.appendChild(cell);
            });

            tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    resultTable.appendChild(table);
}