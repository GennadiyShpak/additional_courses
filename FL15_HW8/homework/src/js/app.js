const refs = {
    form: document.querySelector('.meeting-form-js'),
    comfirmBtn: document.querySelector('.confirm-btn-js'),
    dateInput: document.querySelector('.date-input-js'),
    convertBtn: document.querySelector('.convert-btn-js'),
    nameInput: document.querySelector('.name-input-js'),
    placeInput: document.querySelector('.place-input-js')
}

const roundingDigit = 2;

const meetingFormVisible = prompt('Start', 'meeting');


const startForm = function() {
    if (meetingFormVisible) {
        refs.form.classList.remove('invisible');
    } else {
        return;
    }
}
const inputValidate = function (e) { 
    e.preventDefault();
    const name = refs.nameInput.value,
          time = refs.dateInput.value,
          place = refs.placeInput.value,
          letters = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

    if (!refs.nameInput.value || !refs.placeInput.value || !refs.dateInput.value) {
        alert('Input all data');
        return;
    } if(!refs.dateInput.value.match(letters)) {
        alert('Enter time in format hh:mm');
        return;
    } 
    alert(`${name} has a meeting today at ${time} somewhere in ${place}`)
}

const converCenter = function () {
    const euro = parseInt(prompt('Input euro value')),
          dollar =parseInt(prompt('Input dollar value')),
          hryvnaPerEuro = 33.52,
          hryvnaPerDollar = 27.76,
          exchangeEuro = (euro * hryvnaPerEuro).toFixed(roundingDigit),
          exchangeDollar = (dollar * hryvnaPerDollar).toFixed(roundingDigit);  
          if (isNaN(euro) || isNaN(dollar) || dollar < 0 || euro < 0) {
            alert('Wrong value')
            converCenter();
          } else {
              alert(`${euro} euros are equal ${exchangeEuro}hrns, ${dollar} dollars are equal ${exchangeDollar}hrns`)
          }  
}

refs.comfirmBtn.addEventListener('click',inputValidate);
refs.convertBtn.addEventListener('click',converCenter);
startForm();