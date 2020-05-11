
function createTable(domElementID, tableData, captionValue, title) {
    const resultTable = document.querySelector(`#${domElementID}`);
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    const caption = document.createElement("caption");

	caption.textContent  = captionValue;
	caption.align = 'bottom';
    table.appendChild(caption);
    table.title = title;

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