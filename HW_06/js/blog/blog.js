import movieApi from '../movieDbService/movieDbApi.js';
import movieInfo from './movieInfo/movieInfo.js';

const {
  getReview,
  getAvatar,
  getDataReview,
  getReviewUrl,
  starMarckup,
  getReadTime,
} = movieInfo;
const { getTrends, getInfo } = movieApi;

const postCollection = document.querySelectorAll('.blog__item');

const getAdditionalInformation = async (id, category) => {
  return await getInfo(id, category);
};

const createPostMarckup = async (el, i) => {
  const getMovieList = await getTrends();
  const movieId = getMovieList[i].id;
  const posterPath = getMovieList[i].poster_path;
  const backdropPath = getMovieList[i].backdrop_path;
  const reviewsList = await getAdditionalInformation(movieId, 'reviews');
  el.innerHTML = ` 
    <div class="blog__media-wrapper blog__video-wrapper">
    </div>
    <div class="blog__content-wrapper">
      <div class="blog__author-wrapper d-flex">
        <img
          src=${getAvatar(reviewsList)}
          alt="photo"
          class="blog__photo"
          width="52" 
          height="52"
        />
        <div class="blog__name-wrapper">
          <p class="blog__name">${getReview(reviewsList, 'author')}</p>
          <div class="blog__item-info">
            <span
              class="
                blog__info-data blog__info blog__info-data-playmini
              "
              >${getDataReview(reviewsList, getMovieList[i])}</span
            >
            <span
              class="
                blog__info-time blog__info-time-playmini blog__info
              "
              >${getReadTime(reviewsList, 'content')} min read</span
            >
            <span
              class="
                blog__info-comment
                blog__info-comment-playmini
                blog__info
              "
              >${reviewsList.length}</span
            >
          </div>
          <ul class="blog__rating-btn-list d-flex">
          </ul>
        </div>
      </div>
      <h3 class="blog__article-title blog__article-title-playmini">
        ${getMovieList[i].original_title}
      </h3>
      <p class="blog__article">
        ${getReview(reviewsList, 'content', getMovieList[i].overview)}
      </p>
      <div
        class="
          blog__btn-wrapper
          d-flex
          justify-content-center justify-content-lg-start
        "
      >
        <a target="_blank" href=${getReviewUrl(
          reviewsList,
        )} class="btn">Read more</a>
      </div>
    </div>`;
  const ratingList = el.querySelector('.blog__rating-btn-list');
  starMarckup(getMovieList[i].vote_average, ratingList);
  if (el.classList.contains('video')) {
    const movieTrailer = await getAdditionalInformation(movieId, 'videos');
    const viddeoWrapper = el.querySelector('.blog__media-wrapper');
    const contentWrapper = el.querySelector('.blog__content-wrapper');
    contentWrapper.classList.add('blog__content-wrapper-playmini');
    viddeoWrapper.innerHTML = `<iframe width="560" height="379"
    src="https://www.youtube.com/embed/${movieTrailer[0].key}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write;
    encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
  if (el.classList.contains('audio')) {
    const imageWrapper = el.querySelector('.blog__media-wrapper');
    const textWrapper = el.querySelector('.blog__article');
    textWrapper.insertAdjacentHTML(
      'beforeBegin',
      `<audio controls src="#" class="blog__audio-player"></audio>`,
    );
    const contentWrapper = el.querySelector('.blog__content-wrapper');
    contentWrapper.classList.add('blog__content-wrapper-melody');
    imageWrapper.innerHTML = `
    <img
      src="./img/blog/Image-post-2.png"
      alt="audio post"
      width="560"
      height="379"
    />
    `;
  }
  if (el.classList.contains('image')) {
    const imageWrapper = el.querySelector('.blog__media-wrapper');
    const contentWrapper = el.querySelector('.blog__content-wrapper');
    contentWrapper.classList.add('blog__content-wrapper-picture');
    if (posterPath) {
      imageWrapper.innerHTML = `
    <img
      src=https://image.tmdb.org/t/p/original/${posterPath}
      alt="poster"
      width="560"
      height="379"
    />
    `;
      return;
    }
    if (backdropPath) {
      imageWrapper.innerHTML = `
        <img
          src=https://image.tmdb.org/t/p/original/${backdropPath}
          alt="poster"
          width="560"
          height="379"
        />
        `;
      return;
    }
    imageWrapper.innerHTML = `
    <img
      src='../../img/blog/Image-post-3.png'
      alt="poster"
    />
    `;
  }
  if (el.classList.contains('text')) {
    const imageWrapper = el.querySelector('.blog__media-wrapper');
    const contentWrapper = el.querySelector('.blog__content-wrapper');
    contentWrapper.classList.add('blog__content-wrapper-text');
  }
};
[...postCollection].forEach((el, i) => createPostMarckup(el, i));
