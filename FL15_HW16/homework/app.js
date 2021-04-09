const root = document.getElementById('root');

const maxTweetLength = 140,
  timeOutTime = 2000,
  editHashString = 7,
  idGeneratorMaxValue = 1679615,
  radix = 36;

const refs = {
  addMenu: document.getElementById('modifyItem'),
  mainPaige: document.getElementById('tweetItems'),
  addBtn: document.querySelector('.addTweet'),
  twitArea: document.getElementById('modifyItemInput'),
  saveChangesInInput: document.getElementById('saveModifiedItem'),
  tweettsList: document.getElementById('list'),
  alertMessage: document.getElementById('alertMessage'),
  alertMessageText: document.getElementById('alertMessageText'),
  title: document.getElementById('modifyItemHeader'),
  cancelBnt: document.getElementById('cancelModification')
};

const {
  addMenu,
  mainPaige,
  addBtn,
  twitArea,
  saveChangesInInput,
  tweettsList,
  alertMessage,
  alertMessageText,
  title,
  cancelBnt
} = refs;

class Twetter {
  constructor() {
    this.allMessage = [];
  }
  createTweet(text) {
    this.counter += 1;
    const tweet = {
      text,
      id: this.getRandomID(0, idGeneratorMaxValue),
      like: false
    };
    this.allMessage.push(tweet);
  }
  getRandomID(min, max) {
    let int = Math.floor(Math.random() * (max - min + 1)) + min;
    return int.toString(radix);
  }

  get messages() {
    return this.allMessage;
  }
  set messages(newMessages) {
    this.allMessage = newMessages;
  }
  changeLikeBtn(id) {
    this.allMessage.forEach(tweet => {
      if (tweet.id.toString() === id) {
        tweet.like = !tweet.like;
      }
      return;
    });
  }

  isUnique(text) {
    let result = false;
    this.allMessage.forEach(tweet => {
      if (Object.values(tweet)[0] === text) {
        result = true;
      }
    });
    return result;
  }
  haveLike(id) {
    let result;
    this.allMessage.forEach(tweet => {
      if (tweet.id.toString() === id) {
        result = tweet.like;
      }
    });
    return result;
  }
  removeTweet(id) {
    const newMessageArr = this.allMessage.filter(tweet => {
      return tweet.id.toString() !== id;
    });
    this.allMessage = [...newMessageArr];
    return;
  }

  getTweet(id) {
    let handleTweet;
    this.allMessage.forEach(tweet => {
      if (tweet.id.toString() === id) {
        handleTweet = tweet;
      }
    });
    return handleTweet;
  }
  editTweet(id, text) {
    this.allMessage.forEach(item => {
      if (id === item.id.toString()) {
        item.text = text;
      }
    });
  }
}

twitArea.classList.add('twitArea');
tweettsList.classList.add('tweettList');
addMenu.classList.add('addMenuStyle');
alertMessageText.classList.add('alert-message');
const myTwitter = new Twetter();
const lSHandler = JSON.parse(localStorage.getItem('myTwetter'));
if (lSHandler && lSHandler.length > 0) {
  myTwitter.messages = lSHandler;
  lSHandler.forEach(tweet => marckup(tweet));
}
const onCancelCkick = () => {
  twitArea.value = '';
  mainPaige.classList.remove('hidden');
  addMenu.classList.add('hidden');
};

const notValidTweettError = text => {
  alertMessage.classList.remove('hidden');
  alertMessageText.textContent = `${text}`;
  setTimeout(() => {
    alertMessage.classList.add('hidden');
  }, timeOutTime);
};

const addBtnHandler = () => {
  mainPaige.classList.add('hidden');
  addMenu.classList.remove('hidden');
  location.hash = '#/add';
  title.textContent = 'Add tweet';
};

function marckup(obj) {
  const { text, like, id } = obj;
  const tweetWrapper = document.createElement('li');
  tweetWrapper.classList.add('tweet__wrapper');
  tweettsList.id = id;
  tweettsList.addEventListener('click', e => {
    editTweet(e, obj);
  });
  const tweetValue = document.createElement('span');
  tweetValue.textContent = text;
  tweetWrapper.append(tweetValue);
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('button__wrapper');
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn', 'btn', 'removeBtn');
  removeBtn.dataset.id = id;
  removeBtn.textContent = 'remove';
  removeBtn.addEventListener('click', () => {
    deleteBtn(removeBtn);
  });
  btnWrapper.append(removeBtn);
  const likeBtn = document.createElement('button');
  likeBtn.classList.add('dislike-btn', 'btn', 'likeBtn');
  likeBtn.dataset.id = id;
  likeBtn.addEventListener('click', () => {
    renameLikeButton(likeBtn);
  });
  if (like) {
    likeBtn.textContent = 'dislike';
  } else {
    likeBtn.textContent = 'like';
  }
  btnWrapper.append(likeBtn);
  tweetWrapper.append(btnWrapper);
  tweettsList.append(tweetWrapper);
}

const renameLikeButton = btn => {
  myTwitter.changeLikeBtn(btn.dataset.id);
  if (myTwitter.haveLike(btn.dataset.id)) {
    alertMessageText.classList.add('likeAlert');
    notValidTweettError(`Hooray! You liked tweet with id ${btn.dataset.id}!`);
    btn.textContent = 'dislike';
    return;
  }
  btn.textContent = 'like';
};
const editTweet = (e, el) => {
  const { target } = e;
  if (target.nodeName === 'LI') {
    location.hash = `#/edit/${el.id}`;
    const editingTweet = myTwitter.getTweet(el.id);
    twitArea.value = editingTweet.text;
    mainPaige.classList.add('hidden');
    addMenu.classList.remove('hidden');
    title.textContent = 'Edit tweet';
  }
};

const deleteBtn = btn => {
  myTwitter.removeTweet(btn.dataset.id);
  tweettsList.innerHTML = '';
  myTwitter.allMessage.forEach(tweet => marckup(tweet));
  localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
};

const createTweetHandler = text => {
  if (twitArea.value.length === 0) {
    return;
  }
  if (myTwitter.isUnique(text)) {
    alertMessageText.classList.add('warning');
    notValidTweettError("Error! You can't tweet about that");
    return;
  }
  if (twitArea.value.length > maxTweetLength) {
    alertMessageText.classList.add('warning');
    notValidTweettError('to long tweet');
    return;
  } else {
    myTwitter.createTweet(twitArea.value);
    twitArea.value = '';
    localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
    tweettsList.innerHTML = '';
    myTwitter.allMessage.forEach(tweet => marckup(tweet));
  }
};

const saveChangesHandler = () => {
  const createHash = /^[#/add]+$/;
  mainPaige.classList.remove('hidden');
  addMenu.classList.add('hidden');
  localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
  if (createHash.test(location.hash)) {
    createTweetHandler(twitArea.value);
  } else {
    const editHash = location.hash.slice(editHashString);
    myTwitter.editTweet(editHash, twitArea.value);
    twitArea.value = '';
    tweettsList.innerHTML = '';
    myTwitter.allMessage.forEach(tweet => marckup(tweet));
  }
  location.hash = '';
};

addBtn.addEventListener('click', addBtnHandler);
saveChangesInInput.addEventListener('click', saveChangesHandler);
cancelBnt.addEventListener('click', onCancelCkick);
