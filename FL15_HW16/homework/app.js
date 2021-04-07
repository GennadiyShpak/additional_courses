const root = document.getElementById('root');

const maxTweetLength = 140,
  timeOutTime = 3000,
  editHashString = 7;

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
    this.counter = 0;
  }
  createTweet(text) {
    this.counter += 1;
    const tweet = {
      text,
      id: this.counter,
      like: false
    };
    this.allMessage.push(tweet);
  }

  get messages() {
    return this.allMessage;
  }
  set messages(newMessages) {
    this.allMessage = newMessages;
  }
  changeLikeBtn(id) {
    this.allMessage.forEach(tweet => {
      if (tweet.id === Number(id)) {
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
      if (tweet.id === Number(id)) {
        result = tweet.like;
      }
    });
    return result;
  }
  removeTweet(id) {
    const newMessageArr = this.allMessage.filter(tweet => {
      return tweet.id !== Number(id);
    });
    this.allMessage = [...newMessageArr];
    return;
  }

  getTweet(id) {
    let handleTweet;
    this.allMessage.forEach(tweet => {
      if (tweet.id === Number(id)) {
        handleTweet = tweet;
      }
    });
    return handleTweet;
  }
  editTweet(id, text) {
    this.allMessage.forEach(item => {
      if (Number(id) === item.id) {
        item.text = text;
      }
    });
  }
}

twitArea.classList.add('twitArea');
tweettsList.classList.add('tweettList');
const myTwitter = new Twetter();
const lSHandler = JSON.parse(localStorage.getItem('myTwetter'));
if (lSHandler.length > 0) {
  myTwitter.messages = lSHandler;
  marckupHandler(lSHandler);
  addBtnEventListener();
}

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
  location.hash = '#/add';
};

function marckup(obj) {
  const { text, like, id } = obj;
  if (like) {
    return `<li class="tweet__wrapper" id="${id}"><p>${text}</p>
    <div>
    <button type="button" id="removeBtn" class="remove-btn btn removeBtn" data-id=${id}>remove</button>
    <button type="button" class="dislike-btn btn likeBtn" data-id=${id}>dislike</button></li>
    </div>
    `;
  } else {
    return `<li class="tweet__wrapper" id="${id}"><p>${text}</p>
    <div>
    <button type="button" id="removeBtn" class="remove-btn btn removeBtn" data-id=${id}>remove</button>
    <button type="button" class="dislike-btn btn likeBtn" data-id=${id}>like</button></li>
    </div>
    `;
  }
}

const renameLikeButton = btn => {
  myTwitter.changeLikeBtn(btn.dataset.id);
  if (myTwitter.haveLike(btn.dataset.id)) {
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
  }
};

const deleteBtn = btn => {
  myTwitter.removeTweet(btn.dataset.id);
  tweettsList.innerHTML = '';
  myTwitter.allMessage.forEach(tweet => {
    tweettsList.insertAdjacentHTML('beforeend', marckup(tweet));
  });
  localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
  const likeBtns = document.querySelectorAll('.likeBtn');
  const removeBtns = document.querySelectorAll('.removeBtn');
  [...likeBtns].forEach(btn =>
    btn.addEventListener('click', () => {
      renameLikeButton(btn);
    })
  );
  [...removeBtns].forEach(btn => {
    btn.addEventListener('click', () => {
      deleteBtn(btn);
    });
  });
};

const createTweetHandler = text => {
  if (twitArea.value.length === 0) {
    return;
  }
  if (myTwitter.isUnique(text)) {
    notValidTweettError("Error! You can't tweet about that");
    return;
  }
  if (twitArea.value.length > maxTweetLength) {
    notValidTweettError('to long tweet');
    return;
  } else {
    myTwitter.createTweet(twitArea.value);
    twitArea.value = '';
    localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
    const lSHandler = JSON.parse(localStorage.getItem('myTwetter'));
    marckupHandler(lSHandler);

    const likeBtns = document.querySelectorAll('.likeBtn');
    const removeBtns = document.querySelectorAll('.removeBtn');
    const tweetItem = document.querySelectorAll('.tweet__wrapper');
    [...likeBtns].forEach(btn =>
      btn.addEventListener('click', () => {
        renameLikeButton(btn);
      })
    );
    [...removeBtns].forEach(btn => {
      btn.addEventListener('click', () => {
        deleteBtn(btn);
      });
    });
    [...tweetItem].forEach(tweet =>
      tweet.addEventListener('click', e => {
        editTweet(e, tweet);
      })
    );
  }
};

function marckupHandler(arr) {
  tweettsList.innerHTML = '';
  arr.forEach(tweet => {
    tweettsList.insertAdjacentHTML('beforeend', marckup(tweet));
  });
}

const saveChangesHandler = () => {
  const createHash = /^[#/add]+$/;
  if (createHash.test(location.hash)) {
    createTweetHandler(twitArea.value);
    return;
  }
  const editHash = location.hash.slice(editHashString);
  myTwitter.editTweet(editHash, twitArea.value);
  marckupHandler(myTwitter.allMessage);
  addBtnEventListener();
  localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
};

addBtn.addEventListener('click', addBtnHandler);
saveChangesInInput.addEventListener('click', saveChangesHandler);

function addBtnEventListener() {
  const likeBtns = document.querySelectorAll('.likeBtn');
  const removeBtns = document.querySelectorAll('.removeBtn');
  const tweetItem = document.querySelectorAll('.textContent');
  [...likeBtns].forEach(btn =>
    btn.addEventListener('click', () => {
      renameLikeButton(btn);
    })
  );
  [...removeBtns].forEach(btn => {
    btn.addEventListener('click', () => {
      deleteBtn(btn);
    });
  });
  [...tweetItem].forEach(tweet =>
    tweet.addEventListener('click', e => {
      addBtnHandler(e);
      editTweet(e, tweet);
    })
  );
}
