import { Popup } from "./Popup.js";
export { PopupWithImage };


class PopupWithImage extends Popup {
   constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector('.modal-picture__image');
    this._name = this._popup.querySelector('.modal__title_picture');
  }

  open(card) {
    this._link.src = card.link;
    this._link.alt = card.name;
    this._name.textContent = card.name;
    super.open();
  }
}