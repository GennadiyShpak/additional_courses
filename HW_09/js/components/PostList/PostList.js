class PostList {
  constructor(parent, authorList) {
    this.parent = parent;
    this.authorList = authorList;
    this.authorName = Object.keys(this.authorList);
  }
  createAuthorListMarckup(itemClass, subItemClass) {
    this.authorName.forEach((name, i) => {
      this.parent.insertAdjacentHTML(
        'beforeend',
        `<li class=${itemClass} data-name=${name}>
          ${name}
          <ul class="${subItemClass} hidden" data-author=${name}></ul>
        </li>`,
      );
      const subMenu = document.querySelectorAll(`.${subItemClass}`);
      this.authorList[name].forEach((_, index) => {
        const postNumber = index + 1;
        subMenu[i].insertAdjacentHTML(
          'beforeend',
          `<li class=sub-${itemClass} data-number=${index} data-name=${name}>
            Post ${postNumber}
          </li>`,
        );
      });
    });
  }
}

class PostContent extends PostList {
  constructor(parent, authorList) {
    super(parent, authorList);
  }
  createPostContent(name, index) {
    const postNumber = Number(index) + 1;
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML(
      'beforeend',
      `<h3 class="post__title">Post ${postNumber}</h3>
    <p class="post__description">
      ${this.authorList[name][index]}
    </p>`,
    );
  }
}

const authorMarkup = { PostList, PostContent };

export default authorMarkup;
