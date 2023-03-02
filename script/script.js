//рисую минное поле
let field = document.querySelector('.field');

for (let i = 0; i < 256; i++) {
  field.innerHTML += `<div class="tile"> </div>`;
}

//инициализирую переменные для таймера
let thirdDigit = document.querySelector('.time_third_digit');
let secondDigit = document.querySelector('.time_second_digit');
let firstDigit = document.querySelector('.time_first_digit');
let number = 0;
let secondNum = 0;

//задаю таймер
field.addEventListener('click', setTimer, false);

function setTimer() {
  setInterval(function () {
    number++;
    if (number<1000) {
      let thirdNumber = number % 10;
      thirdDigit.style.cssText = `background-image: url(style/d${thirdNumber}.svg)`;

      let firstNumber = Math.floor(number/100);
      firstDigit.style.cssText = `background-image: url(style/d${firstNumber}.svg)`;
    }
  }, 1000);

  setInterval(function () {
    secondNum++;
    if (secondNum<100) {
      let secondNumber = secondNum % 10;
      secondDigit.style.cssText = `background-image: url(style/d${secondNumber}.svg)`;
    }
  }, 10000);
  field.removeEventListener('click', setTimer, false);
}

//изменение лица и стиля ячейки
let smile = document.querySelector('.smile_reaction');
field.addEventListener('mousedown', changeStyle, false);

function changeStyle(e) {
  smile.classList.remove('smile');
  smile.classList.add('wow');
  if (e.target != e.currentTarget) {
    let clickedItem = e.target;
    clickedItem.ondragstart = function() {
      return false;
    };
    clickedItem.classList.add('pressed_tile');
  }
  //чтоб при перемещении курсора менялся стиль ячеек
  field.addEventListener('mouseover', changeStyleHover, false);

  function changeStyleHover(el) {
    if (el.target != el.currentTarget) {
      let hoveredItem = el.target;
      hoveredItem.classList.add('pressed_tile');
    }
  }

  ////чтоб он возращался
  field.addEventListener('mouseout', changeStyleNotHover, false);

  function changeStyleNotHover(elem) {
    if (elem.target != elem.currentTarget) {
      let notHoveredItem = elem.target;
      notHoveredItem.classList.remove('pressed_tile');
    }
  }
  //возвращаю лицо и начинаю отсчёт таймера
  field.addEventListener('mouseup', changeStyleBack, false);

  function changeStyleBack() {
    smile.classList.add('smile');
    smile.classList.remove('wow');
    //и удаляю чтение события hover у элементов
    field.removeEventListener('mouseover', changeStyleHover, false);

    field.removeEventListener('mouseout', changeStyleNotHover, false);

    //оставляю навсегда нажатой эту клавишу
    let pressedTile = document.querySelector('.pressed_tile');
    pressedTile.classList.add('pressed_tile_forever');
    pressedTile.classList.remove('pressed_tile');
  }
}

//указывание мин
let flags = 40;
let thirdMine = document.querySelector('.mines_third_digit');
let secondMine = document.querySelector('.mines_second_digit');
field.addEventListener('contextmenu', setFlag, false);
function setFlag(el) {
  el.preventDefault();
  if (el.target != el.currentTarget) {
    let clickedItem = el.target;
    clickedItem.classList.add('flag');
  }
  //на счётчике слева тоже делаю минус
  let flagsTile = document.querySelectorAll('.flag');
  let thirdFlag = (flags - flagsTile.length) % 10;
  let secondFlag = Math.floor((flags - flagsTile.length)/10);

  if ((flags - flagsTile.length)>=0) {
    thirdMine.style.cssText = `background-image: url(style/d${thirdFlag}.svg)`;
    secondMine.style.cssText = `background-image: url(style/d${secondFlag}.svg)`;
  }
}

//начало новой игры
smile.addEventListener('click', newGame, false);
function newGame() {
  location.reload();
}
