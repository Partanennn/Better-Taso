async function removeNoDataColumns() {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
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
            const sRyhmaETContainer = document.getElementById('sryhma_et');
            if (sRyhmaETContainer !== null) {
                removeCells(sRyhmaETContainer);
            }
        },
    });
}

document
    .getElementById('removeCVColumns')
    .addEventListener('click', removeNoDataColumns);
