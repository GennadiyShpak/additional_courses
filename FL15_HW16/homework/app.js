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
  title: document.getElementById('modifyItemHeader')
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
  title
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
const myTwitter = new Twetter();
const lSHandler = JSON.parse(localStorage.getItem('myTwetter'));
if (lSHandler && lSHandler.length > 0) {
  myTwitter.messages = lSHandler;
  marckupHandler(lSHandler);
}

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
  marckupHandler(myTwitter.allMessage);
  localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
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
  twitArea.value = '';
}

const saveChangesHandler = () => {
  const createHash = /^[#/add]+$/;
  mainPaige.classList.remove('hidden');
  addMenu.classList.add('hidden');
  localStorage.setItem('myTwetter', JSON.stringify(myTwitter.allMessage));
  if (createHash.test(location.hash)) {
    createTweetHandler(twitArea.value);
    return;
  } else {
    const editHash = location.hash.slice(editHashString);
    myTwitter.editTweet(editHash, twitArea.value);
    marckupHandler(myTwitter.allMessage);
    return;
  }
};

addBtn.addEventListener('click', addBtnHandler);
saveChangesInInput.addEventListener('click', saveChangesHandler);

// function addBtnEventListener() {
//   const likeBtns = document.querySelectorAll('.likeBtn');
//   const removeBtns = document.querySelectorAll('.removeBtn');
//   const tweetItem = document.querySelectorAll('.textContent');
//   [...likeBtns].forEach(btn =>
//     btn.addEventListener('click', () => {
//       renameLikeButton(btn);
//     })
//   );
//   [...removeBtns].forEach(btn => {
//     btn.addEventListener('click', () => {
//       deleteBtn(btn);
//     });
//   });
//   [...tweetItem].forEach(tweet =>
//     tweet.addEventListener('click', e => {
//       addBtnHandler(e);
//       editTweet(e, tweet);
//     })
//   );
// }
