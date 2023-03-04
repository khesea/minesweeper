const field = document.querySelector('.field');
const thirdDigit = document.querySelector('.time_third_digit');
const secondDigit = document.querySelector('.time_second_digit');
const firstDigit = document.querySelector('.time_first_digit');
let number = 0;
let secondNum = 0;
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
      cells[bombs[i]].classList.add('mine');
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

  field.addEventListener('click', setTimer, false);
  function setTimer() {
    intervalID1 = setInterval(function () {
      number++;
      if (number<1000) {
        let thirdNumber = number % 10;
        thirdDigit.style.cssText = `background-image: url(images/d${thirdNumber}.svg)`;

        let firstNumber = Math.floor(number/100);
        firstDigit.style.cssText = `background-image: url(images/d${firstNumber}.svg)`;
      }
    }, 1000);

    intervalID2 = setInterval(function () {
      secondNum++;
      if (secondNum<100) {
        let secondNumber = secondNum % 10;
        secondDigit.style.cssText = `background-image: url(images/d${secondNumber}.svg)`;
      }
    }, 10000);
    field.removeEventListener('click', setTimer, false);
  }

  const smile = document.querySelector('.smile_reaction');
  field.addEventListener('mousedown', changeStyle, false);
  function changeStyle(e) {
    smile.classList.remove('smile');
    smile.classList.add('wow');
  }

  field.addEventListener('mouseup', changeStyleBack, false);
  function changeStyleBack() {
    smile.classList.add('smile');
    smile.classList.remove('wow');
  }

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
      for (let i = 0; i < 40; i++) {
        mines[i].style.cssText = 'background-image: url(images/mine.png);';
      }
      cell.style.cssText = 'background-image: url(images/mine.png);';
      cell.style.cssText = 'background-color: red;';
      for (let i = 0; i < cells.length; i++) {
        cells[i].disabled = true;
      }
      smile.classList.remove('smile');
      smile.classList.add('lose');
      field.removeEventListener('contextmenu', setFlag, false);
      clearInterval(intervalID1);
      clearInterval(intervalID2);
      return;
    }

    closedCount--;
    if (closedCount <= BOMBS_COUNT) {
      smile.classList.remove('smile');
      smile.classList.add('lose');
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

  const flags = 40;
  const thirdMine = document.querySelector('.mines_third_digit');
  const secondMine = document.querySelector('.mines_second_digit');
  field.addEventListener('contextmenu', setFlag, false);
  function setFlag(el) {
    el.preventDefault();
    if (el.target != el.currentTarget) {
      let clickedItem = el.target;
      if (clickedItem.disabled == false) {
        clickedItem.classList.toggle('flag');
      }
    }

    const flagsTile = document.querySelectorAll('.flag');
    let thirdFlag = (flags - flagsTile.length) % 10;
    let secondFlag = Math.floor((flags - flagsTile.length)/10);

    if ((flags - flagsTile.length)>=0) {
      thirdMine.style.cssText = `background-image: url(images/d${thirdFlag}.svg)`;
      secondMine.style.cssText = `background-image: url(images/d${secondFlag}.svg)`;
      }
    }

  smile.addEventListener('click', newGame, false);
  function newGame() {
    location.reload();
  }
}
