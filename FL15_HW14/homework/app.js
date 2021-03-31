const appRoot = document.getElementById('app-root');

const getRegions = externalService.getRegionsList();
const getLanguages = externalService.getLanguagesList();

const tableMarckup = `<ul class="tableHeader">
<li class="item tableHeader__item country-name">Country name</li>
<li class="item tableHeader__item">Capital</li>
<li class="item tableHeader__item">World region</li>
<li class="item tableHeader__item languages">Languages</li>
<li class="item tableHeader__item">Area</li>
<li class="item tableHeader__item">Flag</li>
</ul>`;

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

const select = document.createElement('select');
select.setAttribute('disabled', 'disabled');
const defaultOption = `<option disabled">Select value</option>`;
select.insertAdjacentHTML('afterbegin', defaultOption);
selectWrapper.append(select);

const viewArea = document.createElement('div');
viewArea.classList.add('viewArea');
appRoot.append(viewArea);

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

select.addEventListener('change', selecttHandler);

// function onSelectChange() {
//   if ()
//   console.log(select.value);
// }

function selecttHandler(e) {
  const description = document.querySelector('.noItem');
  viewArea.removeChild(description);
  viewArea.insertAdjacentHTML('afterbegin', tableMarckup);
  const { value } = e.target;
  if (radionWrapper[0].checked) {
    const countryList = externalService.getCountryListByRegion(value);
    console.log(countryList);
  } else {
    const languageList = externalService.getCountryListByLanguage(value);
    console.log(languageList);
  }
}
