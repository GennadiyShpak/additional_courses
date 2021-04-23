function visitLink(path) {
  let counter = Number(localStorage.getItem(path));
  if (counter) {
    counter += 1;
    localStorage.setItem(path, counter);
  } else {
    let initialValue = 1;
    localStorage.setItem(path, initialValue);
  }
}

function createListItem(par, name, el) {
  par.insertAdjacentHTML(
    'beforeend',
    `
			  <li>
				  <p>You visited ${name} ${el} time(s)</p>
			  </li>
		  `,
  );
}

function viewResults() {
  const container = document.querySelector('#content'),
    firstPage = localStorage.getItem('Page1'),
    secondPage = localStorage.getItem('Page2'),
    thirdPage = localStorage.getItem('Page3'),
    getVisitedList = document.createElement('ul');
  container.appendChild(getVisitedList);

  if (firstPage) {
    createListItem(getVisitedList, 'Page1', firstPage);
  }
  if (secondPage) {
    createListItem(getVisitedList, 'Page2', secondPage);
  }
  if (thirdPage) {
    createListItem(getVisitedList, 'Page3', thirdPage);
  }
  localStorage.clear();
}
