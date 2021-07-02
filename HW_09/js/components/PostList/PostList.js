class PostList {
  constructor(parent, authorList) {
    this.parent = parent;
    this.authorList = authorList;
    this.authorName = Object.keys(this.authorList);
  }
}

class HorizontalAuthorList extends PostList {
  constructor(parent, authorList, child) {
    super(parent, authorList);
    this.child = child;
  }
  createAuthorListMarckup() {
    this.authorName.forEach(name =>
      this.parent.insertAdjacentHTML(
        'beforeend',
        `<li class="post__author-item author-js">${name}</li>`,
      ),
    );
  }
  createPostListMarckup(authorName) {
    const authorPosts = this.authorList[authorName];
    this.child.innerHTML = '';
    authorPosts.forEach((_, i) => {
      const postNumber = i + 1;
      this.child.insertAdjacentHTML(
        'beforeend',
        `<li class="post__author-item post-js" data-number=${postNumber}>Post ${postNumber}</li>`,
      );
    });
  }
}

class AsideAuthorList extends PostList {
  constructor(parent, authorList) {
    super(parent, authorList);
  }
  createAuthorListMarckup() {
    this.authorName.forEach((name, i) =>
      this.parent.insertAdjacentHTML(
        'beforeend',
        `<li class="post__author-item author-js" data-itemNumber=${i}>${name}
          <ul class="aside__subMenu hidden" data-index=${i}></ul>
        </li>`,
      ),
    );
  }
  createPostListMarckup(authorName, authorNumber) {
    authorNumber = Number(authorNumber);
    console.log('authorNumber', typeof authorNumber);
    const trimmedName = authorName.trim();
    const subMenu = document.querySelectorAll('.aside__subMenu');
    const authorPosts = this.authorList[trimmedName];
    [...subMenu].forEach(el => {
      el.innerHTML = '';
    });
    authorPosts.forEach((_, i) => {
      const postNumber = i + 1;
      [...subMenu][authorNumber].insertAdjacentHTML(
        'beforeend',
        `<li class="post__author-item post-js" data-number=${postNumber}>
          Post ${postNumber}
         </li>`,
      );
    });
  }
}

const authorMarkup = { HorizontalAuthorList, AsideAuthorList };

export default authorMarkup;
