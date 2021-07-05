const body = $('body');
const MODAL_TYPES = { alertType: 'alert-type', confirm: 'confirm' };

function modalWindowMarckupHandler() {
  createCssLink();
  createModalWindowMarkup(body);
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
  ).insertAfter(sibling);
}

function openModal(
  messageType,
  messageText,
  modalType = MODAL_TYPES.alertType,
) {
  const modalOverlay = $('.modal__overlay');

  handleInfoIcon(messageType);
  handleMessageType(messageType);

  modalOverlay.addClass('is-open');
  modalOverlay.one('click', function (e) {
    const { target } = e;
    if ($(target).hasClass('modal__overlay')) {
      removeModal();
    }
  });
  $('.modal__close-btn').one('click', removeModal);
  $(document).one('keydown', onEscPressHandler);
  $('.modal__content-text').text(messageText);
  handleModalType(modalType);
  body.css('overflow', 'hidden');
}

function removeModal() {
  $('.modal__overlay').removeClass('is-open');
  body.css('overflow', 'auto');
}

function handleModalType(modalType = MODAL_TYPES.alertType) {
  if (modalType === MODAL_TYPES.alertType) {
    $('.cancel-btn').hide();
  }
  if (modalType === MODAL_TYPES.confirm) {
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
      src: './js/modal/image/modal-icon/attention.png',
    });
  }
  if (messageType === 'confirm') {
    $('.modal__content-icon').attr({
      src: './js/modal/image/modal-icon/ok.png',
    });
  }
  if (messageType === 'info') {
    $('.modal__content-icon').attr({
      src: './js/modal/image/modal-icon/info.png',
    });
  }
}

function createCssLink() {
  $('<link/>', { href: './js/modal/modal.css', rel: 'stylesheet' }).appendTo(
    'head',
  );
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
