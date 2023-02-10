export { Popup };
import { modalActiveClass } from "../utils/constants.js";
import { modalCloseBttn } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }
  
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(modalActiveClass)) {
        this.close();
      };
      if (evt.target.classList.contains(modalCloseBttn)) {
        this.close();
      };
    });
    
  }
  
  open() {
    this._popup.classList.add(modalActiveClass);
    document
    .addEventListener('keydown',this._handleEscCloseBound);
  }

  close() {
    this._popup.classList.remove(modalActiveClass);
    document
    .removeEventListener('keydown', this._handleEscCloseBound);
  }
}