import reverseData from '../helpers/reverseData.js';
class MovieDBApi {
  #API_KEY = 'bb3f2a9bd6a374d8a5257ae7f0ad6ee7';
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #TRENDS_MOVIE_BY_WEEK = 'trending/movie/week';
  #getReview(reviewList, atr, overview = 'No info') {
    if (overview.length > 150) {
      overview = `${overview.substr(0, 150)}...`;
    }
    if (reviewList?.[0]?.[atr]?.length > 150) {
      reviewList[0][atr] = `${reviewList[0][atr].substr(0, 150)}...`;
    }
    if (reviewList.length === 0) {
      return overview;
    } else {
      return reviewList[0][atr];
    }
  }
  #getReadTime(reviewList, atr) {
    if (reviewList?.[0]?.[atr].length === 0 || !reviewList?.[0]) {
      return 0;
    } else {
      return Math.ceil(reviewList?.[0]?.[atr].length / 720);
    }
  }
  #getAvatar(reviewList) {
    if (!reviewList[0]?.author_details?.avatar_path) {
      return 'https://juststickers.in/wp-content/uploads/2016/12/404-error-not-found.png';
    } else {
      const avatarPath = reviewList[0].author_details.avatar_path.slice(-36);
      return `https://secure.gravatar.com/avatar/${avatarPath}`;
    }
  }
  #getReviewUrl(reviewList) {
    if (reviewList.length === 0) {
      return '../../img/not-found.png';
    } else {
      return reviewList[0].url;
    }
  }
  #getDataReview(reviewList, movie) {
    if (reviewList.length === 0) {
      return reverseData(movie.release_date);
    } else {
      const dateOfPost = reviewList[0].created_at.slice(0, 10);
      return reverseData(dateOfPost);
    }
  }
  #starMarckup(num, el) {
    const roundNum = Math.round(num);
    const fullStarCount = Math.trunc(num / 2);
    if (roundNum % 2 === 0) {
      const emptyStar = Math.round(5 - fullStarCount);
      for (let i = 0; i < fullStarCount; i += 1) {
        el.insertAdjacentHTML(
          'beforeend',
          `<li class="blog__rating-btn-item">
        <svg class="blog__rating-svg">
          <use href="./img/svg/sprite.svg#icon-Star-1"></use>
        </svg>
    </li>`,
        );
      }
      for (let i = 0; i < emptyStar; i += 1) {
        el.insertAdjacentHTML(
          'beforeend',
          `<li class="blog__rating-btn-item">
        <svg class="blog__rating-svg">
          <use href="./img/svg/sprite.svg#icon-Star-2"></use>
        </svg>
    </li>`,
        );
      }
    } else {
      const emptyStar = Math.round(4 - fullStarCount);
      for (let i = 0; i < fullStarCount; i += 1) {
        el.insertAdjacentHTML(
          'beforeend',
          `<li class="blog__rating-btn-item">
        <svg class="blog__rating-svg">
          <use href="./img/svg/sprite.svg#icon-Star-1"></use>
        </svg>
    </li>`,
        );
      }
      el.insertAdjacentHTML(
        'beforeend',
        `<li class="blog__rating-btn-item">
      <svg class="blog__rating-svg">
        <use href="./img/svg/sprite.svg#icon-Group"></use>
      </svg>
  </li>`,
      );
      for (let i = 0; i < emptyStar; i += 1) {
        el.insertAdjacentHTML(
          'beforeend',
          `<li class="blog__rating-btn-item">
        <svg class="blog__rating-svg">
          <use href="./img/svg/sprite.svg#icon-Star-2"></use>
        </svg>
    </li>`,
        );
      }
    }
  }
  #getClassName(el) {
    if (el.classList.contains('video')) {
      return 'video';
    }
    if (el.classList.contains('audio')) {
      return 'audio';
    }
    if (el.classList.contains('image')) {
      return 'image';
    }
    if (el.classList.contains('text')) {
      return 'text';
    }
  }
  async getTrends() {
    try {
      const response = await fetch(
        `${this.#BASE_URL}${this.#TRENDS_MOVIE_BY_WEEK}?api_key=${
          this.#API_KEY
        }`,
      );
      const { results } = await response.json();
      console.log('results', results);
      return results;
    } catch (error) {
      console.log('error', { error });
    }
  }
  async getInfo(id, category) {
    try {
      const response = await fetch(
        `${this.#BASE_URL}movie/${id}/${category}?api_key=${this.#API_KEY}`,
      );
      const { results } = await response.json();
      return results;
    } catch (error) {
      console.log('error', { error });
    }
  }
  async createPostMarckup(el, i) {
    const getMovieList = await this.getTrends();
    const movieId = getMovieList[i].id;
    this.posterPath = getMovieList[i].poster_path;
    this.backdropPath = getMovieList[i].backdrop_path;
    const reviewsList = await this.getInfo(movieId, 'reviews');
    this.className = this.#getClassName(el);
    el.innerHTML = `
      <div class="blog__media-wrapper blog__video-wrapper">
      </div>
      <div class="blog__content-wrapper">
        <div class="blog__author-wrapper d-flex">
          <img
            src=${this.#getAvatar(reviewsList)}
            alt="photo"
            class="blog__photo"
            width="52"
            height="52"
          />
          <div class="blog__name-wrapper">
            <h3 class="blog__name">${this.#getReview(
              reviewsList,
              'author',
            )}</h3>
            <div class="blog__item-info">
              <span
                class="
                  blog__info-data blog__info blog__info-data-playmini
                "
                >${this.#getDataReview(reviewsList, getMovieList[i])}</span
              >
              <span
                class="
                  blog__info-time blog__info-time-playmini blog__info
                "
                >${this.#getReadTime(reviewsList, 'content')} min read</span
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
          ${this.#getReview(reviewsList, 'content', getMovieList[i].overview)}
        </p>
        <div
          class="
            blog__btn-wrapper
            d-flex
            justify-content-center justify-content-lg-start
          "
        >
          <a target="_blank" href=${this.#getReviewUrl(
            reviewsList,
          )} class="btn blog__read-more-btn">Read more</a>
        </div>
      </div>`;
    const ratingList = el.querySelector('.blog__rating-btn-list');
    this.#starMarckup(getMovieList[i].vote_average, ratingList);
    el.dataset.index = `${i}`;
  }
}

class VideoPostApi extends MovieDBApi {
  async createPostMarckup(el, i) {
    await super.createPostMarckup(el, i);
    const viddeoWrapper = el.querySelector('.blog__media-wrapper');
    const contentWrapper = el.querySelector('.blog__content-wrapper');
    contentWrapper.classList.add('blog__content-wrapper-playmini');
    viddeoWrapper.innerHTML = `
      <video
      class="video-player"
      width="560"
      src="#"
      poster="./img/blog/Image-post-1.png"
      ></video>
      <button class="play-btn">
        <svg class="video-player__svg">
          <use href="./img/svg/sprite.svg#icon-a-icon-play"></use>
        </svg>
      </button>`;
    const btnPlay = document.querySelector('.video-player__svg');
    btnPlay.addEventListener('click', e => {
      if (!e.target.classList.contains('play')) {
        e.target.classList.add('play');
        console.log('Video launched');
      } else {
        e.target.classList.remove('play');
        console.log('Video stoped');
      }
    });
  }
}
class ImagePostApi extends MovieDBApi {
  async createPostMarckup(el, i) {
    await super.createPostMarckup(el, i);
    const imageWrapper = el.querySelector('.blog__media-wrapper');
    const contentWrapper = el.querySelector('.blog__content-wrapper');
    contentWrapper.classList.add('blog__content-wrapper-picture');
    if (this.backdropPath) {
      imageWrapper.innerHTML = `
        <img
          src=https://image.tmdb.org/t/p/original/${this.backdropPath}
          alt="poster"
          width="560"
          height="379"
        />
        `;
      return;
    }
    if (this.posterPath) {
      imageWrapper.innerHTML = `
    <img
      src=https://image.tmdb.org/t/p/original/${this.posterPath}
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
}
class AudioPostApi extends MovieDBApi {
  async createPostMarckup(el, i) {
    await super.createPostMarckup(el, i);
    const imageWrapper = el.querySelector('.blog__media-wrapper');
    const textWrapper = el.querySelector('.blog__article');
    textWrapper.insertAdjacentHTML(
      'beforeBegin',
      `<div class="blog__audio-wrapper">
        <audio controls src="#" class="blog__audio-player"></audio>
        <button class="blog__audio-btn"></button>
      </div>`,
    );
    const audioBtn = document.querySelector('.blog__audio-btn');
    const audioPlayer = document.querySelector('.blog__audio-player');
    audioBtn.addEventListener('click', e => {
      if (!e.target.classList.contains('play')) {
        e.target.classList.add('play');
        console.log('Audio launched');
      } else {
        e.target.classList.remove('play');
        console.log('Audio stoped');
      }
    });
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
}
class TextPostApi extends MovieDBApi {
  async createPostMarckup(el, i) {
    await super.createPostMarckup(el, i);
    const imageWrapper = el.querySelector('.blog__media-wrapper');
    const contentWrapper = el.querySelector('.blog__content-wrapper');
    contentWrapper.classList.add('blog__content-wrapper-text');
  }
}
const movieDb = { VideoPostApi, AudioPostApi, ImagePostApi, TextPostApi };

export default movieDb;
