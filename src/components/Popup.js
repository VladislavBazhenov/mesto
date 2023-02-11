export { Popup };

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._modalActiveClass = 'modal_active';
    this._modalCloseBttn = 'modal__close';
    this._handleEscCloseBound = this._handleEscClose.bind(this);
    this._esc = 'Escape';
  }
  
  _handleEscClose(evt) {
    if (evt.key === this._esc) {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._modalActiveClass)
      ||evt.target.classList.contains(this._modalCloseBttn)) {
        this.close();
      };
    });
    
  }
  
  open() {
    this._popup.classList.add(this._modalActiveClass);
    document
    .addEventListener('keydown',this._handleEscCloseBound);
  }

  close() {
    this._popup.classList.remove(this._modalActiveClass);
    document
    .removeEventListener('keydown', this._handleEscCloseBound);
  }
}