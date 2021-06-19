let flag = true;
const text = document.querySelector('.win>p'),
  td = document.querySelectorAll('td'),
  model = document.querySelector('.modal');
let motion = 0,
  win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 6],
    [0, 4, 8],
    [2, 4, 6],
  ]; // массив с победными вариантами
document.querySelector('table').onclick = function (event) {
  let textTb = event.target.textContent; // отслеживаем чтоб поле было пустое
  if (flag && textTb == '') {
    flag = false;
    Winner(event, '✖');
  } else if (!flag && textTb == '') {
    flag = true;
    Winner(event, '◯');
  }
};

function Winner(event, element) {
  let win0 = 0; // Счетчик для победы, обнуляем каждый раз
  motion++; // увеличиваем что найти ничью
  let textContent = [],
    iwin = 0; // Хранится номер массива который выиграл
  event.target.textContent = element;
  td.forEach(item => textContent.push(item.textContent));
  for (let i = 0; i < win.length; i++) {
    if (win0 == 3) {
      break;
    } // как только нашли 3 совпадения выходим из цикла
    for (let j = 0; j < 3; j++) {
      if (textContent[win[i][j]] == element) {
        win0++; // если есть совпадения увеличиваем, нам нужно их 3
        iwin = i;
      } else {
        win0 = 0; // если нет хотя бы одного совпадения обнуляем счетчик
        break;
      }
    }
  }

  if (win0 == 3) {
    model.style.visibility = 'visible';
    for (let i = 0; i < 3; i++) {
      td[win[iwin][i]].style.color = 'red';
    }
    element == '◯' ? (text.textContent = 'Победили нолики') : (text.textContent = 'Победили крестики');
  } else if (motion == 9) {
    text.textContent = 'Ничья';
    model.style.visibility = 'visible';
  }
}

document.querySelector('.rest-2').onclick = () => {
  for (let key of td) {
    key.textContent = '';
    key.style.color = 'black';
  }
  model.style.visibility = 'hidden';
  motion = 0;
};

document.querySelector('.rest').onclick = () => {
  for (let key of td) {
    key.textContent = '';
  }
  motion = 0;
};
