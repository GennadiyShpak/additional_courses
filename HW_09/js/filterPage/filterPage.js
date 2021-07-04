import movieDb from '../movieDbService/movieDbApi.js';
import authorMarkup from '../components/PostList/PostList.js';
import PostMediator from '../helpers/postMediator.js';
import refs from './refs.js';
import CLASS_TYPES from './classTypes.js';

const { PostList, PostContent } = authorMarkup;
const { horizontalMenu, asideMenu, postWrapper } = refs;
const { asideItem, asideSubMenu, postItem, postSubMenu } = CLASS_TYPES;

let authorList = JSON.parse(sessionStorage.getItem('authorList'));

const reviewList = [];

if (!authorList) {
  const { MovieDBApi } = movieDb;
  const movieApi = new MovieDBApi();
  const movieList = await movieApi.getTrends();
  for (let i = 0; i < 4; i += 1) {
    const movieId = movieList[i].id;
    const apiReviewsList = await movieApi.getInfo(movieId, 'reviews');
    apiReviewsList.forEach(review => {
      reviewList.push(review);
    });
  }
  reviewList.forEach(review => {
    movieApi.saveAuthorDate(review);
  });
}

const showMenu = (el, name) => {
  if (el.dataset.author === name) {
    el.classList.remove('hidden');
  }
};

const onAuthorClick = (e, forClassCheck) => {
  const horizontalAuthorList = document.querySelectorAll(
    '.aside__subMenu-item, .post__author-subMenu',
  );
  const { target } = e;
  const { dataset, classList } = target;

  if (classList.contains(forClassCheck)) {
    [...horizontalAuthorList].forEach(el => {
      el.classList.add('hidden');
    });
    [...horizontalAuthorList].forEach(el => showMenu(el, dataset.name));
  }
  if (classList.contains(`sub-${forClassCheck}`)) {
    postContent.createPostContent(dataset.name, dataset.number);
  }
};

authorList = JSON.parse(sessionStorage.getItem('authorList'));

const horizontalPostList = new PostList(horizontalMenu, authorList);
const asideAuthorList = new PostList(asideMenu, authorList);
const postContent = new PostContent(postWrapper, authorList);
const postMediator = new PostMediator();

postMediator.subscribe('click', onAuthorClick);

horizontalPostList.createAuthorListMarckup(postItem, postSubMenu);
asideAuthorList.createAuthorListMarckup(asideItem, asideSubMenu);

horizontalMenu.addEventListener('click', e => {
  postMediator.publish('click', e, postItem);
});

asideMenu.addEventListener('click', e => {
  postMediator.publish('click', e, asideItem);
});
