class PostList {
  constructor(parent, authorList) {
    this.parent = parent;
    this.authorList = authorList;
    this.authorName = Object.keys(this.authorList);
  }
  createAuthorListMarckup() {
    this.authorName.forEach(name =>
      this.parent.insertAdjacentHTML(
        'beforeend',
        `<li class="post__author-item author-js">${name}</li>`,
      ),
    );
  }
}

export default class HorizontalPostList extends PostList {
  constructor(parent, authorList, child) {
    super(parent, authorList);
    this.child = child;
  }
  createAuthorListMarckup() {
    super.createAuthorListMarckup();
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
