export default class PostMediator {
  onMenuClick(e, forClassCheck, el) {
    const { target } = e;
    const { dataset, classList } = target;
    if (target.classList.contains(forClassCheck)) {
      const hiddenMenu = document.querySelectorAll(
        `[data-author=${dataset.name}]`,
      );
      const subMenu = document.querySelectorAll(
        '.aside__subMenu-item, .post__author-subMenu',
      );
      [...subMenu].forEach(el => {
        el.classList.add('hidden');
      });
      [...hiddenMenu].forEach(el => {
        el.classList.remove('hidden');
      });
    }
    if (classList.contains(`sub-${forClassCheck}`)) {
      el.createPostContent(dataset.name, dataset.number);
    }
  }
}
