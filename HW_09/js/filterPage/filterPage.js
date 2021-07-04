import movieDb from '../movieDbService/movieDbApi.js';
import authorMarkup from '../components/PostList/PostList.js';
import PostMediator from '../helpers/postMediator.js';
import refs from './refs.js';

const { PostList, PostContent } = authorMarkup;
const { horizontalMenu, asideMenu, postWrapper } = refs;
const CLASS_TYPES = {
  asideItem: 'aside__item',
  asideSubMenu: 'aside__subMenu-item',
  postItem: 'post__author-item',
  postSubMenu: 'post__author-subMenu',
};
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

const onAuthorClick = (e, forClassCheck) => {
  const { target } = e;
  const { dataset, classList } = target;
};

authorList = JSON.parse(sessionStorage.getItem('authorList'));

const horizontalPostList = new PostList(horizontalMenu, authorList);
const asideAuthorList = new PostList(asideMenu, authorList);
const postContent = new PostContent(postWrapper, authorList);
const postMediator = new PostMediator();

horizontalPostList.createAuthorListMarckup(postItem, postSubMenu);
asideAuthorList.createAuthorListMarckup(asideItem, asideSubMenu);

horizontalMenu.addEventListener('click', e => {
  postMediator.onMenuClick(e, postItem, postContent);
});

asideMenu.addEventListener('click', e => {
  postMediator.onMenuClick(e, asideItem, postContent);
});
