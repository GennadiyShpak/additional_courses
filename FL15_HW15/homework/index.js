/* START TASK 1: Your code goes here */
const tableRefs = {
  table: document.getElementById('table'),
  special: document.getElementById('special'),
  row: document.querySelectorAll('.first-cell'),
  cell: document.querySelectorAll('td'),
};
const changeCellColor = e => {
  const { target } = e;
  if (
    target.classList.contains('first-cell') ||
    target.classList.contains('special')
  ) {
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
  tableRefs.cell.forEach(item => {
    if (
      item.classList.contains('first-click') ||
      item.classList.contains('blue-bg')
    ) {
      return;
    }
    item.classList.add('green-bg');
  });
};

tableRefs.table.addEventListener('click', changeCellColor);
tableRefs.row.forEach(item => item.addEventListener('click', changeRowColor));
tableRefs.special.addEventListener('click', specialSellHandler);
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const formRefs = {
  screen: document.getElementById('screen'),
  phoneInput: document.getElementById('phone-input'),
  submitBtn: document.getElementById('submitBtn'),
};

formRefs.phoneInput.value = '+380';

const getInvalidHandler = () => {
  formRefs.submitBtn.disabled = true;
  formRefs.screen.classList.add('invalid');
  formRefs.screen.textContent =
    'Type number does not follow format +380*********';
};

const onInputChangeHandler = e => {
  const { target } = e;
  const regExp = /^[+380]\d{12}$/;
  if (regExp.test(target.value)) {
    formRefs.submitBtn.disabled = false;
    formRefs.screen.classList.remove('invalid');
    formRefs.screen.classList.add('agree');
    formRefs.screen.textContent = '';
    return;
  }
  if (formRefs.screen.classList.contains('agree')) {
    formRefs.screen.classList.remove('agree');
    getInvalidHandler();
    return;
  } else {
    getInvalidHandler();
    return;
  }
};

const submitBtnHandler = () => {
  formRefs.screen.classList.remove('agree');
  formRefs.screen.classList.add('valid');
  formRefs.screen.textContent = 'Data was succsessfully sent';
};
formRefs.phoneInput.addEventListener('input', onInputChangeHandler);
formRefs.submitBtn.addEventListener('click', submitBtnHandler);

/* END TASK 2 */

/* START TASK 3: Your code goes here */

/* END TASK 3 */
