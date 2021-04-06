const root = document.getElementById('root');
const maxTweetLength = 140,
  timeOutTime = 3000;
const refs = {
  addMenu: document.getElementById('modifyItem'),
  mainPaige: document.getElementById('tweetItems'),
  addBtn: document.querySelector('.addTweet'),
  twitArea: document.getElementById('modifyItemInput'),
  saveChangesInInput: document.getElementById('saveModifiedItem'),
  tweettsList: document.getElementById('list'),
  alertMessage: document.getElementById('alertMessage'),
  alertMessageText: document.getElementById('alertMessageText')
};

const {
  addMenu,
  mainPaige,
  addBtn,
  twitArea,
  saveChangesInInput,
  tweettsList,
  alertMessage,
  alertMessageText
} = refs;

class Twetter {
  constructor() {
    this.allMessage = [];
  }
  createTweet(text) {
    const tweet = {
      text,
      id: this.allMessage.length,
      like: false
    };
    this.allMessage.push(tweet);
  }

  get messages() {
    return this.allMessage;
  }

  changLike(id) {
    this.allMessage.forEach((tweet, i) => {
      if (i === Number(id)) {
        this.allMessage[i].like = !tweet.like;
      }
      return;
    });
  }

  isUnique(text) {
    let result;
    this.allMessage.forEach(tweet => {
      result = Object.values(tweet).includes(text);
      if (!result) {
        return;
      }
    });
    return result;
  }
}

tweettsList.classList.add('tweettList');
const myTwitter = new Twetter();

const notValidTweettError = text => {
  alertMessage.classList.remove('hidden');
  alertMessageText.textContent = `${text}`;
  setTimeout(() => {
    alertMessage.classList.add('hidden');
  }, timeOutTime);
};

const addBtnHandler = () => {
  // mainPaige.classList.add('hidden');
  addMenu.classList.remove('hidden');
  addMenu.classList.add('addMenuStyle');
};

const marckup = obj => {
  const { text, like, id } = obj;
  if (like) {
    return `<li class="tweet__wrapper" id="${id}"><p>${text}</p>
    <div>
    <button type="button" id="removeBtn" class="remove-btn btn removeBtn" data-id=${id}>remove</button>
    <button type="button" class="dislike-btn btn likeBtn" data-id=${id}>like</button></li>
    </div>
    `;
  } else {
    return `<li class="tweet__wrapper" id="${id}"><p>${text}</p>
    <div>
    <button type="button" id="removeBtn" class="remove-btn btn removeBtn" data-id=${id}>remove</button>
    <button type="button" class="dislike-btn btn likeBtn" data-id=${id} >like</button></li>
    </div>
    `;
  }
};

const createTweetHandler = () => {
  if (twitArea.value.length === 0) {
    return;
  }
  if (myTwitter.isUnique(twitArea.value)) {
    notValidTweettError("Error! You can't tweet about that");
    return;
  }
  if (twitArea.value.length > maxTweetLength) {
    notValidTweettError('to long tweet');
    return;
  } else {
    myTwitter.createTweet(twitArea.value);
    twitArea.value = '';
    marckupHandler(myTwitter.allMessage);
    const removeBtn = document.querySelectorAll('.likeBtn');
    [...removeBtn].forEach(btn =>
      btn.addEventListener('click', () => {
        myTwitter.changLike(btn.dataset.id);
      })
    );
  }
};

const marckupHandler = arr => {
  tweettsList.innerHTML = '';
  arr.forEach(tweet => {
    tweettsList.insertAdjacentHTML('beforeend', marckup(tweet));
  });
};

addBtn.addEventListener('click', addBtnHandler);
saveChangesInInput.addEventListener('click', createTweetHandler);
