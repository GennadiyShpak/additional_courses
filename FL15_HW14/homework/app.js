const appRoot = document.getElementById('app-root');

const two = 2,
  three = 3,
  four = 4,
  five = 5;

const getRegions = externalService.getRegionsList();
const getLanguages = externalService.getLanguagesList();

const tableHeaderMarckup = `<ul class="tableHeader">
<li class="item tableHeader__item listener"><span>Country name</span>
<span class='sortNameBtn sortBtn sortUp'>&#8595;</span></li>
<li class="item tableHeader__item">Capital</li>
<li class="item tableHeader__item">World region</li>
<li class="item tableHeader__item">Languages</li>
<li class="item tableHeader__item listener"><span>Area</span>
<span class='sortAreaBtn sortBtn sortUp'>&#8595;</span></li>
<li class="item tableHeader__item">Flag</li>
</ul>`;

const tableBodyMarckup = arr => {
  const { name, flagURL, region, area, capital, languages } = arr;
  const lang = Object.values(languages);
  // console.log('lang', lang);
  return `<ul class="tableBody">
  <li class="item tableBody__item">${name}</li>
  <li class="item tableBody__item">${capital}</li>
  <li class="item tableBody__item">${region}</li>
  <li class="item tableBody__item">${lang}</li>
  <li class="item tableBody__item">${area}</li>
  <li class="item tableBody__item"><img width="64" src=${flagURL} alt=${name} /></li>
  </ul>`;
};

const sortedMarckup = el => {
  const { children } = el;
  return `<ul class="tableBody">
<li class="item tableBody__item">${children[0].textContent}</li>
<li class="item tableBody__item">${children[1].textContent}</li>
<li class="item tableBody__item">${children[two].textContent}</li>
<li class="item tableBody__item">${children[three].textContent}</li>
<li class="item tableBody__item">${children[four].textContent}</li>
<li class="item tableBody__item">
<img width="64" src=${children[five].children[0].currentSrc} alt=${children[0].textContent} /></li>
</ul>`;
};

const title = document.createElement('h1');
title.textContent = 'Countries search';
title.classList.add('title');
appRoot.append(title);

const form = document.createElement('form');
form.classList.add('form');
appRoot.append(form);

const selectWrapper = document.createElement('div');
selectWrapper.classList.add('selectWrapper');
form.append(selectWrapper);
const selectDescription = document.createElement('p');
selectDescription.classList.add('description');
selectDescription.textContent = 'Please choose search query:';
selectWrapper.append(selectDescription);

const select = document.createElement('select');
select.setAttribute('disabled', 'disabled');
const defaultOption = `<option disabled">Select value</option>`;
select.insertAdjacentHTML('afterbegin', defaultOption);
selectWrapper.append(select);

const viewArea = document.createElement('div');
viewArea.classList.add('viewArea');
appRoot.append(viewArea);

const tableWrapper = document.createElement('div');
tableWrapper.classList.add('tableWrapper');

select.addEventListener('change', selecttHandler);

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1].children[0].innerText > arr[j].children[0].innerText) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

form.insertAdjacentHTML(
  'afterbegin',
  `<div class="radioWrapper">
    <p class="description">Please choose type of search:</p>
    <div class="inputWrapper">
      <div class="regionWrapper">
        <input
          type="radio"
          id="optionRegion"
          name="option"
          value="region"
        />
        <label for="optionRegion">By region</label>
      </div>
      <div class="languageWrapper">
        <input
          type="radio"
          id="optionLanguage"
          name="option"
          value="language"
        />
        <label for="optionLanguage">By language</label>
      </div>
    </div>
  </div>`,
);

const radionWrapper = document.querySelectorAll('input[name=option]');
radionWrapper.forEach(input =>
  input.addEventListener('change', parseSelectValue),
);

function parseSelectValue(e) {
  const { value } = e.target;
  viewArea.innerHTML = `<p class="noItem">No items, please choose search query<p>`;
  select.removeAttribute('disabled');
  if (value === 'region') {
    select.innerHTML = defaultOption;
    getRegions.forEach(option => {
      select.insertAdjacentHTML(
        'beforeend',
        `<option value="${option}">${option}</option>`,
      );
    });
  }
  if (value === 'language') {
    select.innerHTML = defaultOption;
    getLanguages.forEach(option => {
      select.insertAdjacentHTML(
        'beforeend',
        `<option value="${option}">${option}</option>`,
      );
    });
  }
}

function selecttHandler(e) {
  viewArea.innerHTML = '';
  viewArea.insertAdjacentHTML('afterbegin', tableHeaderMarckup);
  viewArea.append(tableWrapper);
  tableWrapper.innerHTML = '';
  const areaSortBtn = document.querySelector('.sortAreaBtn');
  const nameSortBtn = document.querySelector('.sortNameBtn');
  const { value } = e.target;
  if (radionWrapper[0].checked) {
    const countryList = externalService.getCountryListByRegion(value);
    countryList.forEach(country =>
      tableWrapper.insertAdjacentHTML('beforeend', tableBodyMarckup(country)),
    );
    const areaList = document.querySelectorAll('.tableBody');
    areaSortBtn.addEventListener('click', () => {
      sortArea(areaList, tableWrapper, areaSortBtn);
    });
    nameSortBtn.addEventListener('click', () => {
      sortName(areaList, tableWrapper, nameSortBtn);
    });
  } else {
    const languageList = externalService.getCountryListByLanguage(value);
    languageList.forEach(language =>
      tableWrapper.insertAdjacentHTML('beforeend', tableBodyMarckup(language)),
    );
    const areaList = document.querySelectorAll('.tableBody');
    areaSortBtn.addEventListener('click', () => {
      sortArea(areaList, tableWrapper, areaSortBtn);
    });
    nameSortBtn.addEventListener('click', () => {
      sortName(areaList, tableWrapper, nameSortBtn);
    });
  }
}

function sortArea(arr, el, btn) {
  el.innerHTML = '';
  btn.classList.toggle('sortUp');
  let sorted;
  if (btn.classList.contains('sortUp')) {
    btn.innerHTML = `<span class='sortNameBtn sortBtn sortUp'>&#8595;</span>`;
    sorted = [...arr].sort(function (a, b) {
      return a.children[four].innerText - b.children[four].innerText;
    });
  } else {
    btn.innerHTML = `<span class='sortNameBtn sortBtn sortUp'>&#8593;</span>`;
    sorted = [...arr].sort(function (a, b) {
      return b.children[four].innerText - a.children[four].innerText;
    });
  }

  sorted.forEach(item => {
    el.insertAdjacentHTML('beforeend', sortedMarckup(item));
  });
}

function sortName(arr, el, btn) {
  el.innerHTML = '';
  btn.classList.toggle('sortUp');
  let sorted;
  if (btn.classList.contains('sortUp')) {
    btn.innerHTML = `<span class='sortNameBtn sortBtn sortUp'>&#8595;</span>`;
    sorted = bubbleSort([...arr]);
  } else {
    btn.innerHTML = `<span class='sortNameBtn sortBtn sortUp'>&#8593;</span>`;
    sorted = bubbleSort([...arr]).reverse();
  }

  sorted.forEach(item => {
    el.insertAdjacentHTML('beforeend', sortedMarckup(item));
  });
}
