export { Card };

 class Card {
  constructor(data,
     templateSelector,
     handleCardClick,
     handlePopupConfirm,
     userId,
     handleLikeCard)
      {
    this._name = data.name;
    this._link = data.link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelCard = handlePopupConfirm;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._amountLikes = data.likes.length;
    this._handleLikeCard = handleLikeCard;
  }
  
  _getTemplate() {
    const cardElem = document
    .querySelector(this._template)
    .content.querySelector('.card-grid__element')
    .cloneNode(true);

    return cardElem;
  }
  
  _setData() {
    this._titleElem.textContent = this._name;
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._likeCounter.textContent = this._amountLikes;
  }

  _confirmDeleteView() {
    this._handleDelCard(this._id, this._newCard);
  }

  _likeElem() {
    this._likeBtn.classList.toggle('card-grid__likeButton_active');
    this._handleLikeCard(this, this._id, this._isLiked);
    this._isLiked = !this._isLiked;
  }

  _handleCardPopup() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._confirmDeleteView();
      })
    }
    this._likeBtn.addEventListener('click', () => this._likeElem());
    this._picture.addEventListener('click', () => this._handleCardPopup());
  }

  updateCounterLike(likeCounter) {
    this._likeCounter.textContent = likeCounter;
  }

  getView() {
    this._newCard = this._getTemplate();
    this._deleteButton = this._newCard.querySelector('.urn');
    this._likeBtn = this._newCard.querySelector('.card-grid__likeButton');
    this._likeCounter = this._newCard.querySelector('.card-grid__like-counter')
    this._picture = this._newCard.querySelector('.card-grid__item');
    this._titleElem = this._newCard.querySelector('.card-grid__title');
    this._isLiked = this._likes.some(like => like._id === this._userId);
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
    
    if (this._isLiked) {
      this._likeBtn.classList.add('card-grid__likeButton_active');
      this._isLiked = true;
    }
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

