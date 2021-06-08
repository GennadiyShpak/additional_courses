import reverseData from '../../helpers/reverseData.js';

// const getReview = (reviewList, atr, overview = 'No info') => {
//   if (overview.length > 150) {
//     overview = `${overview.substr(0, 150)}...`;
//   }
//   if (reviewList?.[0]?.[atr]?.length > 150) {
//     reviewList[0][atr] = `${reviewList[0][atr].substr(0, 150)}...`;
//   }
//   if (reviewList.length === 0) {
//     return overview;
//   } else {
//     return reviewList[0][atr];
//   }
// };
// const getReadTime = (reviewList, atr) => {
//   if (reviewList?.[0]?.[atr].length === 0 || !reviewList?.[0]) {
//     return 0;
//   } else {
//     return Math.ceil(reviewList?.[0]?.[atr].length / 720);
//   }
// };

// const getAvatar = reviewList => {
//   if (!reviewList[0]?.author_details?.avatar_path) {
//     return 'https://juststickers.in/wp-content/uploads/2016/12/404-error-not-found.png';
//   } else {
//     const avatarPath = reviewList[0].author_details.avatar_path.slice(-36);
//     return `https://secure.gravatar.com/avatar/${avatarPath}`;
//   }
// // };
// const getReviewUrl = reviewList => {
//   if (reviewList.length === 0) {
//     return null;
//   } else {
//     return reviewList[0].url;
//   }
// };

const getDataReview = (reviewList, movie) => {
  if (reviewList.length === 0) {
    return reverseData(movie.release_date);
  } else {
    const dateOfPost = reviewList[0].created_at.slice(0, 10);
    return reverseData(dateOfPost);
  }
};

const starMarckup = (num, el) => {
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
};
const movieInfo = {
  // getReview,
  // getAvatar,
  // getDataReview,
  // getReviewUrl,
  starMarckup,
  // getReadTime,
};
export default movieInfo;
