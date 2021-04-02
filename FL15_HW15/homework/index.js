/* START TASK 1: Your code goes here */
const refs = {
  table: document.getElementById('table'),
  special: document.getElementById('special'),
  row: document.querySelectorAll('.first-cell'),
  cell: document.querySelectorAll('td'),
};
const changeCellColor = e => {
  const { target } = e;
  if (target.classList.contains('first-cell')) {
    return;
  }
  if (target.classList.contains('blue-bg')) {
    target.classList.remove('blue-bg');
    target.classList.add('first-click');
    return;
  }
  if (target.classList.contains('green-bg')) {
    target.classList.remove('green-bg');
    target.classList.add('first-click');
    return;
  }
  target.classList.add('first-click');
};
const changeRowColor = e => {
  const { children } = e.target.parentNode;
  [...children].forEach(item => {
    if (item.classList.contains('first-click')) {
      return;
    }
    if (item.classList.contains('green-bg')) {
      item.classList.remove('green-bg');
      item.classList.add('blue-bg');
      return;
    }
    item.classList.add('blue-bg');
  });
};

const specialSellHandler = () => {
  refs.cell.forEach(item => {
    if (
      item.classList.contains('first-click') ||
      item.classList.contains('blue-bg')
    ) {
      return;
    }
    item.classList.add('green-bg');
  });
};

refs.table.addEventListener('click', changeCellColor);
refs.row.forEach(item => item.addEventListener('click', changeRowColor));
refs.special.addEventListener('click', specialSellHandler);
/* END TASK 1 */

/* START TASK 2: Your code goes here */

/* END TASK 2 */

/* START TASK 3: Your code goes here */

/* END TASK 3 */
