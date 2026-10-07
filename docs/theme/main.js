document.addEventListener('DOMContentLoaded', function () {
    // Make headings clickable and update window URL with clicked heading.
    document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
        .forEach(function (heading) {
            heading.classList.add('clickable');

            heading.addEventListener('click', function () {
                history.pushState({}, '', '#' + heading.id);
            });
        });

    // Replace last two rows of tables with a Excel lookalike tabs.
    document.querySelectorAll('table').forEach(function (table) {
        var rows = Array.from(table.querySelectorAll('tbody tr'));

        for (var i = 0; i < rows.length - 1; i++) {
            var cells = Array.from(rows[i].querySelectorAll('td'));

            if (
                cells.length &&
                cells.every(function (cell) {
                    return /^=+$/.test(cell.textContent.trim());
                })
            ) {
                var sheetCell = rows[i + 1].querySelector('td');

                if (!sheetCell) {
                    continue;
                }

                var sheet = sheetCell.textContent.trim();

                var tfoot = document.createElement('tfoot');
                var tr = document.createElement('tr');
                var td = document.createElement('td');

                td.className = 'sheets';
                td.colSpan = table.rows[0].cells.length;

                ['survey', 'choices', 'settings'].forEach(function (name) {
                    var span = document.createElement('span');

                    span.textContent = name;

                    if (name === sheet) {
                        span.className = 'active';
                    }

                    td.appendChild(span);
                });

                tr.appendChild(td);
                tfoot.appendChild(tr);

                rows[i].remove();
                rows[i + 1].remove();

                table.appendChild(tfoot);

                break;
            }
        }
    });
});
