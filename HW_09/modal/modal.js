function modalWindowMarckupHandler() {
  createCssLink();
  const firstScript = $('script:eq(0)');
  createModalWindowMarkup(firstScript);
  createCloseModalBtn();
  $(`<h3 class=modal__content-text>Modal window</h3>`).appendTo(
    '.modal__content',
  );
  createBtnMarkup();
  createInfoIcon();
}
function createModalWindowMarkup(sibling) {
  $(
    `<div class="modal__overlay">
        <div class="modal__content">
          <div class="modal__btn-wrapper">
        </div>
      </div>
     </div>
    `,
  ).insertBefore(sibling);
}
function openModal(messageType, messageText, modalType = 'alert-type') {
  handleInfoIcon(messageType);
  handleMessageType(messageType);
  $('.modal__overlay').addClass(`is-open ${messageType}`);
  $('.modal__overlay').one('click', function (e) {
    const { target } = e;
    if ($(target).hasClass('modal__overlay')) {
      removeModal();
    }
  });
  $('.modal__close-btn').one('click', removeModal);
  $(document).one('keydown', onEscPressHandler);
  $('.modal__content-text').text(messageText);
  handleModalType(modalType);
  $('body').css('overflow', 'hidden');
}
function removeModal() {
  $('.modal__overlay').removeClass('is-open');
  $('.modal__content').removeClass('modal__alert');
  $('.modal__content').removeClass('modal__confirm');
  $('.modal__content').removeClass('modal__info');
  $('.modal__overlay').removeClass('alert');
  $('.modal__overlay').removeClass('confirm');
  $('.modal__overlay').removeClass('info');
  $('body').css('overflow', 'auto');
}
function handleModalType(modalType = 'alert-type') {
  if (modalType === 'alert-type') {
    $('.cancel-btn').hide();
  }
  if (modalType === 'confirm') {
    $('.cancel-btn').show();
  }
}
function onEscPressHandler(e) {
  const { code } = e;
  if (code === 'Escape') {
    removeModal();
  }
}
function createInfoIcon() {
  $('<img/>', {
    width: '23',
    height: '23',
  })
    .addClass('modal__content-icon')
    .prependTo($('.modal__content'));
}
function handleInfoIcon(messageType) {
  if (messageType === 'alert') {
    $('.modal__content-icon').attr({
      src: './modal/image/modal-icon/attention.png',
    });
  }
  if (messageType === 'confirm') {
    $('.modal__content-icon').attr({
      src: './modal/image/modal-icon/ok.png',
    });
  }
  if (messageType === 'info') {
    $('.modal__content-icon').attr({
      src: './modal/image/modal-icon/info.png',
    });
  }
}
function createCssLink() {
  $('<link/>', { href: './modal/modal.css', rel: 'stylesheet' }).appendTo(
    'head',
  );
}
function removeMessageType() {
  if ($('.modal__content').hasClass('alert')) {
    $('.modal__content').removeClass('modal__alert');
  }
  if ($('.modal__content').hasClass('confirm')) {
    $('.modal__content').removeClass('modal__confirm');
  }
  if ($('.modal__content').hasClass('info')) {
    $('.modal__content').removeClass('modal__info');
  }
}
function handleMessageType(messageType) {
  if (messageType === 'alert') {
    $('.modal__content').addClass('modal__alert');
  }
  if (messageType === 'confirm') {
    $('.modal__content').addClass('modal__confirm');
  }
  if (messageType === 'info') {
    $('.modal__content').addClass('modal__info');
  }
}
function createBtnMarkup() {
  $(`<button class='modal__btn ok-btn'>Ok</button>`).appendTo(
    $('.modal__btn-wrapper'),
  );
  $(`<button class='modal__btn cancel-btn'>Cancel</button>`).appendTo(
    $('.modal__btn-wrapper'),
  );
}
function createCloseModalBtn() {
  $(`<button class="modal__close-btn"></button>`).appendTo(
    $('.modal__content'),
  );
}

const modalWindow = { modalWindowMarckupHandler, openModal, removeModal };
export default modalWindow;
