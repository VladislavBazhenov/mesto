import { Popup } from "./Popup.js";
export { PopupWithConfirmation };

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._submitButton = this._popup.querySelector('.modal__submit-button');
  }

  setLoadingText(text) {
    this._submitButton.textContent = text;
  }


  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._submitForm(this._cardId, this._cardElem);
    })
  }
  
  open(cardId, cardElem) {
    super.open();
    this._cardId = cardId;
    this._cardElem = cardElem;
  }
  
}