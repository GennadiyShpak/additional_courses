import movieDb from '../movieDbService/movieDbApi.js';
import authorMarkup from '../components/PostList/PostList.js';
import refs from './refs.js';
const { HorizontalAuthorList, AsideAuthorList } = authorMarkup;
const { horizontalMenu, horizontalSubMenu, asideMenu } = refs;

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
authorList = JSON.parse(sessionStorage.getItem('authorList'));
const horizontalPostList = new HorizontalAuthorList(
  horizontalMenu,
  authorList,
  horizontalSubMenu,
);
const asideAuthorList = new AsideAuthorList(asideMenu, authorList);
horizontalPostList.createAuthorListMarckup();
asideAuthorList.createAuthorListMarckup();
horizontalMenu.addEventListener('click', e => {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const authorName = e.target.textContent;
  horizontalPostList.createPostListMarckup(authorName);
});
asideMenu.addEventListener('click', e => {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const authorName = e.target.textContent;
  const authorNumber = e.target.dataset.itemnumber;
  asideAuthorList.createPostListMarckup(authorName, authorNumber);
});
// console.log('authorList', authorList);
