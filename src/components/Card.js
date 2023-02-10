export { Card };

 class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
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
  }

  _deleteElem() {
    this._newCard.remove();
    this._newCard = null;
  }
  
  _likeElem() {
    this._likeBtn.classList.toggle('card-grid__likeButton_active');
  }

  _handleCardPopup() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => { this._deleteElem() });
    this._likeBtn.addEventListener('click', () => { this._likeElem() });
    this._picture.addEventListener('click', () => { this._handleCardPopup() });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._deleteButton = this._newCard.querySelector('.urn');
    this._likeBtn = this._newCard.querySelector('.card-grid__likeButton');
    this._picture = this._newCard.querySelector('.card-grid__item');
    this._titleElem = this._newCard.querySelector('.card-grid__title');
    this._setData();
    this._setEventListeners();

    return this._newCard;
  }
}

