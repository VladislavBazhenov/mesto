import { Popup } from "./Popup.js";
export { PopupWithForm };


class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.modal__form_type_add');
    this._inputList = Array.from(this._popup.querySelectorAll('.modal__input'));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });
    return this._formValues;
  }
  
  setEventListeners() {
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    })
    super.setEventListeners();
  }

  close() {
    if (this._form !== null) {
      this._form.reset();
    }
    super.close();
  }
}