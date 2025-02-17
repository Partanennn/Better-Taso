const removeCells = (container) => {
    const table = container.querySelector('table');
    const indexesWithData = [];
    const values = [];
    // Find columns without data
    const foot = table.querySelector('tfoot');
    if (foot !== null) {
        foot.querySelectorAll('th').forEach((cell, index) => {
            const value = cell.textContent;
            if (value !== '0' && value !== '' && index !== 0) {
                indexesWithData.push(cell.cellIndex);
                values.push(cell.textContent);
            }
        });
    }
    // Remove columns that doesnt have data
    if (table !== null) {
        table.querySelectorAll('tr').forEach((row) => {
            for (let i = row.cells.length - 2; i > 0; i--) {
                if (!indexesWithData.includes(i)) {
                    let cell = row.cells[i];
                    if (cell) row.removeChild(cell);
                }
            }
        });
    }
};

// Remove columns from first ET table
const tasoETContainer = document.getElementById('taso_et');
if (tasoETContainer !== null) {
    removeCells(tasoETContainer);
}

// Remvoe columns from second ET table
const sRyhmaETContainer = document.getElementById('sryhma_et');
if (sRyhmaETContainer !== null) {
    removeCells(sRyhmaETContainer);
}

// Remove unnecessary open games
const levels = ['U13', 'U14', 'U15'];
const ottelulistaContainer = document.getElementById('tuomarinottelut');
if (ottelulistaContainer !== null) {
    let container = ottelulistaContainer.querySelector('.ontuomarit');
    let allRows = container.querySelectorAll('tr');

    allRows.forEach((row) => {
        const serie = row.cells.length >= 4 && row.cells[3];
        if (serie)
            console.log({
                serie,
            });
        if (
            serie &&
            !levels.some((sub) => serie.textContent.includes(sub)) &&
            !row.classList.contains('thrivi')
        ) {
            row.style.display = 'none';
        }
    });
}

// Hide not needed tables with charts
const linesmenDiv = document.getElementById('div_lt');
if (linesmenDiv !== null) linesmenDiv.style.display = 'none';
const otvDiv = document.getElementById('div_otv');
if (otvDiv !== null) otvDiv.style.display = 'none';
const vmtDiv = document.getElementById('div_vmt');
if (vmtDiv !== null) vmtDiv.style.display = 'none';
const ltDiv = document.getElementById('div_lt');
if (ltDiv !== null) ltDiv.style.display = 'none';
// Hide not needed tables
const ltTable = document.getElementById('sryhma_lt');
if (ltTable !== null) ltTable.style.display = 'none';
const otvTable = document.getElementById('sryhma_otv');
if (otvTable !== null) otvTable.style.display = 'none';
const vmtTable = document.getElementById('sryhma_vmt');
if (vmtTable !== null) vmtTable.style.display = 'none';
