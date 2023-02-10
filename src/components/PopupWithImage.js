export { PopupWithImage };
import { Popup } from "./Popup.js";
import { cardModalPicture, titlePicture } from "../utils/constants.js";


class PopupWithImage extends Popup {
   constructor(popupSelector) {
    super(popupSelector);
    this._link = cardModalPicture;
    this._name = titlePicture;
  }

  open(card) {
    this._link.src = card.link;
    this._link.alt = card.name;
    this._name.textContent = card.name;
    super.open();
  }
}