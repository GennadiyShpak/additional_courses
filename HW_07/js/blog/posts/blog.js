import movieDb from '../../movieDbService/movieDbApi.js';
import refs from './refs.js';
const { VideoPostApi, AudioPostApi, ImagePostApi, TextPostApi } = movieDb;
const {
  videoPost,
  audioPost,
  imagePost,
  textPost,
  searchInput,
  blogList,
  searchBtn,
  resetFilter,
  hiddenMenuBtn,
  radioBtnMenu,
  radioAuthor,
  radioTitle,
  dropdownMenu,
} = refs;

let hiddenBtnAngle = 0,
  hiddenMenu = true;
const filtredMarkupByAuthor = localStorage.getItem('filtredMarkupByAuthor');

const videoPostApi = new VideoPostApi();
const audioPostApi = new AudioPostApi();
const imagePostApi = new ImagePostApi();
const textPostApi = new TextPostApi();
function validate(title) {
  return /^[A-Z]{1}[a-zA-Z\d\s!.,:?-]{5,59}$/.test(title);
}
const searchByAuthor = value => {
  if (!resetFilter.classList.contains('d-block')) {
    localStorage.setItem('unFiltredMarkup', blogList.innerHTML);
  }
  const postsAuthor = document.querySelectorAll('.blog__name');
  const postsCollection = document.querySelectorAll('.blog__item');
  const searchValueTolowerCase = value.toLowerCase();
  [...postsAuthor].forEach((post, i) => {
    if (searchValueTolowerCase !== post.innerHTML.toLowerCase()) {
      postsCollection[i].remove();
    }
  });
  if (blogList.children.length === 0) {
    blogList.innerHTML = `
  <h2 class="blog__list-not-found">
    Sorry incorrect search value
  </h2>`;
  }
  localStorage.setItem('filtredMarkupByAuthor', blogList.innerHTML);
  resetFilter.classList.add('d-block');
  searchInput.value = '';
};
const searchByTitle = value => {
  const titlePosts = document.querySelectorAll('.blog__article-title');
  const postsCollection = document.querySelectorAll('.blog__item');
  const searchValueTolowerCase = value.toLowerCase();
  const isValid = validate(value);
  if (isValid) {
    [...titlePosts].forEach((post, i) => {
      if (searchValueTolowerCase !== post.innerHTML.toLowerCase().trim()) {
        postsCollection[i].remove();
      }
    });
    if (blogList.children.length === 0) {
      blogList.innerHTML = `
  <h2 class="blog__list-not-found">
    Sorry incorrect search value
  </h2>`;
    }
    resetFilter.classList.add('d-block');
    searchInput.value = '';
  } else {
    alert('Not correct value');
  }
};
const onSearchBtnClickHandler = () => {
  if (radioAuthor.checked) {
    searchByAuthor(searchInput.value);
    return;
  }
  searchByTitle(searchInput.value);
};
const createMarkup = () => {
  videoPostApi.createPostMarckup(videoPost, 0);
  audioPostApi.createPostMarckup(audioPost, 1);
  imagePostApi.createPostMarckup(imagePost, 2);
  textPostApi.createPostMarckup(textPost, 3);
  resetFilter.classList.remove('d-block');
};
const onResetFilterBtnClickHandler = () => {
  if (radioAuthor.checked) {
    localStorage.removeItem('filtredMarkupByAuthor');
  }
  resetFilter.classList.remove('d-block');
  blogList.innerHTML = localStorage.getItem('unFiltredMarkup');
};
const onLoadBlogPage = () => {
  if (!filtredMarkupByAuthor) {
    createMarkup();
  } else {
    blogList.innerHTML = filtredMarkupByAuthor;
    resetFilter.classList.remove('d-none');
  }
};
const onHiddenMenuBtnClickHandler = () => {
  hiddenMenuBtn.style.transform = `rotate(${(hiddenBtnAngle += 180)}deg)`;
  if (hiddenMenu) {
    radioBtnMenu.style.transform = 'scale(1)';
    hiddenMenu = false;
  } else {
    radioBtnMenu.style.transform = 'scale(0)';
    hiddenMenu = true;
  }
};
const onRadioBtnMenuClickHandler = e => {
  const { target } = e;
  if (target.nodeName === 'INPUT' && target.id === 'title') {
    searchInput.placeholder = 'Search by title';
  }
  if (target.nodeName === 'INPUT' && target.id === 'author') {
    searchInput.placeholder = 'Search by author';
  }
};
const choiseFilterFunction = value => {
  if (radioAuthor.checked) {
    searchByAuthor(value);
  } else {
    searchByTitle(value.trim());
  }
};
const createDropdownMenuElement = (i, content, imageColl = null) => {
  const linkContent = content.innerHTML;
  const dropMenuItem = document.createElement('li');
  dropMenuItem.classList.add('dropdown__item');
  const dropMenuLink = document.createElement('a');
  dropMenuLink.classList.add('dropdown__item-link');
  if (imageColl) {
    const dropMenuAvatar = document.createElement('img');
    dropMenuAvatar.classList.add('dropdown__item-avatar');
    dropMenuAvatar.src = imageColl[i].currentSrc;
    dropMenuAvatar.alt = 'avatar';
    dropMenuLink.append(dropMenuAvatar);
  }
  const dropMenuContent = document.createElement('span');
  dropMenuContent.classList.add('dropdown__item-content');
  dropMenuContent.innerHTML = linkContent;
  dropMenuLink.append(dropMenuContent);
  dropMenuItem.append(dropMenuLink);
  dropdownMenu.append(dropMenuItem);
  dropMenuItem.addEventListener('click', () => {
    choiseFilterFunction(linkContent);
  });
};
const createAuthorList = () => {
  const postsAuthor = document.querySelectorAll('.blog__name');
  const avatarCollection = document.querySelectorAll('.blog__photo');
  const isUniqueArr = [];
  if (dropdownMenu.children.length === 0) {
    [...postsAuthor].forEach((author, i) => {
      if (isUniqueArr.includes(author.innerHTML)) {
        return;
      } else {
        isUniqueArr.push(author.innerHTML);
        createDropdownMenuElement(i, author, avatarCollection);
      }
    });
  }
};
const createTitleList = () => {
  const titlePosts = document.querySelectorAll('.blog__article-title');
  const isUniqueArr = [];
  if (dropdownMenu.children.length === 0) {
    [...titlePosts].forEach((author, i) => {
      if (isUniqueArr.includes(author.innerHTML)) {
        return;
      } else {
        isUniqueArr.push(author.innerHTML);
        createDropdownMenuElement(i, author);
      }
    });
  }
};
const onFocusHandler = () => {
  if (radioAuthor.checked) {
    createAuthorList();
  } else {
    createTitleList();
  }
};
onLoadBlogPage();
searchBtn.addEventListener('click', onSearchBtnClickHandler);
resetFilter.addEventListener('click', onResetFilterBtnClickHandler);
hiddenMenuBtn.addEventListener('click', onHiddenMenuBtnClickHandler);
radioBtnMenu.addEventListener('click', onRadioBtnMenuClickHandler);
searchInput.addEventListener('focus', onFocusHandler);
searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    dropdownMenu.innerHTML = '';
  }, 200);
});
