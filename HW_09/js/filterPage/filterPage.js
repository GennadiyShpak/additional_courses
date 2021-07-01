import movieDb from '../movieDbService/movieDbApi.js';
import HorizontalPostList from '../components/PostList/PostList.js';

const aaa = document.querySelector('.author__list-js');
const bbb = document.querySelector('.post__list-js');
let authorList = JSON.parse(sessionStorage.getItem('authorList'));
const horizontalPostList = new HorizontalPostList(aaa, authorList, bbb);
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
    console.log(review);
    movieApi.saveAuthorDate(review);
  });
}
authorList = JSON.parse(sessionStorage.getItem('authorList'));
horizontalPostList.createAuthorListMarckup();
aaa.addEventListener('click', e => {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  const b = e.target.textContent;
  horizontalPostList.createPostListMarckup(b);
});
// console.log('authorList', authorList);
