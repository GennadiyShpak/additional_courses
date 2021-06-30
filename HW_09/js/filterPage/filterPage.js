import movieDb from '../movieDbService/movieDbApi.js';
let reviewList = JSON.parse(sessionStorage.getItem('authorList'));
if (!reviewList) {
  const { MovieDBApi } = movieDb;
  const movieApi = new MovieDBApi();
  reviewList = [];
  const movieList = await movieApi.getTrends();
  for (let i = 0; i < 4; i += 1) {
    const movieId = movieList[i].id;
    const apiReviewsList = await movieApi.getInfo(movieId, 'reviews');
    reviewList.push(apiReviewsList);
  }
}
console.log('reviewList', reviewList);
