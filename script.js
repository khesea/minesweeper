const field = document.querySelector('.field');
startGame(16, 16, 40);

function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
  const cellsCount = WIDTH * HEIGHT;
  field.innerHTML += '<button></button>'.repeat(cellsCount);
  const cells = [...field.children];

  let closedCount = cellsCount;

  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMBS_COUNT);

    for (let i = 0; i < 40; i++) {
      cells[bombs[i]].innerHTML = '<div class="mine"></div>';
    }
    const mines = field.querySelectorAll('.mine');

  field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const index = cells.indexOf(event.target);
    const column = index % WIDTH;
    const row = Math.floor(index / WIDTH);
    open(row, column);
  });

  function isValid(row, column) {
    return row >= 0
        && row < HEIGHT
        && column >= 0
        && column < WIDTH;
  }

  function getMinesCount(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++;
        }
      }
    }
    return count;
  }

  function open(row, column) {
    if (!isValid(row, column)) return;

    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true;
    cell.style.border = '1px solid #7B7B7B';
    if (isBomb(row, column)) {
      cell.style.backgroundColor = 'red';
      for (let i = 0; i < 40; i++) {
        mines[i].style.display = 'block';
      }
      for (let i = 0; i < cells.length; i++) {
        cells[i].disabled = true;
      }
      return;
    }

    closedCount--;
    if (closedCount <= BOMBS_COUNT) {
      alert('you won');
      return;
    }

    const count = getMinesCount(row, column);

    if (count === 1) {
      cell.style.color = '#1500FF';
    }
    if (count === 2) {
      cell.style.color = '#008000';
    }
    if (count === 3) {
      cell.style.color = '#FF0000';
    }
    if (count === 4) {
      cell.style.color = '#000080';
    }
    if (count === 5) {
      cell.style.color = '#800000';
    }
    if (count === 6) {
      cell.style.color = '#008080';
    }
    if (count === 7) {
      cell.style.color = '#000000';
    }
    if (count === 8) {
      cell.style.color = '#808080';
    }
    if (count !== 0) {
      cell.innerHTML = count;
      return;
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        open(row + y, column + x);
      }
    }
  }

  function isBomb(row, column) {
    if (!isValid(row, column)) return false;

    const index = row * WIDTH + column;

    return bombs.includes(index);
  }
}
