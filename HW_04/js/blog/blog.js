import movieApi from '../movieDbService/movieDbApi.js';
const { getTrends, getInfo } = movieApi;

const postCollection = document.querySelectorAll('.blog__item');

const getAdditionalInformation = async (id, category) => {
  return await getInfo(id, category);
};
getAdditionalInformation(503736, 'videos');
getAdditionalInformation(503736, 'reviews');
const createPostMarckup = async (el, i) => {
  const getMovieList = await getTrends();
  const movieId = getMovieList[i].id;
  if (el.classList.contains('video')) {
    const movieTrailer = await getAdditionalInformation(movieId, 'videos');
    console.log('movieTrailer', movieTrailer);
    el.innerHTML = ` 
    <div class="video-player__wrapper blog__video-wrapper">
      <video
        class="video-player"
        width="560"
        src=https://www.youtube.com/watch?v=${movieTrailer[0].key}
        controls
      ></video>
      <button class="play-btn">
        <svg class="video-player__svg">
          <use href="./img/svg/sprite.svg#icon-a-icon-play"></use>
        </svg>
      </button>
    </div>
    <div class="blog__content-wrapper blog__content-wrapper-playmini">
      <div class="blog__author-wrapper d-flex">
        <img
          src="./img/blog/Neil.png"
          alt="photo"
          class="blog__photo"
        />
        <div class="blog__name-wrapper">
          <p class="blog__name">Neil Richards</p>
          <div class="blog__item-info">
            <span
              class="
                blog__info-data blog__info blog__info-data-playmini
              "
              >11 oct, 2019</span
            >
            <span
              class="
                blog__info-time blog__info-time-playmini blog__info
              "
              >7 min read</span
            >
            <span
              class="
                blog__info-comment
                blog__info-comment-playmini
                blog__info
              "
              >19</span
            >
          </div>
          <ul class="blog__rating-btn-list d-flex">
            <li class="blog__rating-btn-item">
              <button class="blog__rating-btn">
                <svg class="blog__rating-svg">
                  <use href="./img/svg/sprite.svg#icon-Star-1"></use>
                </svg>
              </button>
            </li>
            <li class="blog__rating-btn-item">
              <button class="blog__rating-btn">
                <svg class="blog__rating-svg">
                  <use href="./img/svg/sprite.svg#icon-Star-1"></use>
                </svg>
              </button>
            </li>
            <li class="blog__rating-btn-item">
              <button class="blog__rating-btn">
                <svg class="blog__rating-svg">
                  <use href="./img/svg/sprite.svg#icon-Group"></use>
                </svg>
              </button>
            </li>
            <li class="blog__rating-btn-item">
              <button class="blog__rating-btn">
                <svg class="blog__rating-svg">
                  <use href="./img/svg/sprite.svg#icon-Star-2"></use>
                </svg>
              </button>
            </li>
            <li class="blog__rating-btn-item">
              <button class="blog__rating-btn">
                <svg class="blog__rating-svg">
                  <use href="./img/svg/sprite.svg#icon-Star-2"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <h3 class="blog__article-title blog__article-title-playmini">
        In the Future We Will All Live in Star Wars
      </h3>
      <p class="blog__article">
        The thing you’re doing now, reading prose on a screen, is
        going out of fashion. The defining narrative of our online
        moment concerns the decline of text, and the exploding reach
        and power of audio and video …
      </p>
      <div
        class="
          blog__btn-wrapper
          d-flex
          justify-content-center justify-content-lg-start
        "
      >
        <button class="btn">Read more</button>
      </div>
    </div>>`;
  } else {
  }
};
[...postCollection].forEach((el, i) => createPostMarckup(el, i));
