export { FormValidator };

class FormValidator {
  
  constructor(validationSettings, form) {
    this._validationSettings = validationSettings;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._form.querySelector(this._validationSettings.submitButtonSelector);
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
  }
  
  _disableSubmitButton = (submitButton) => {
    submitButton.classList.add('modal__input_disabled');
    submitButton.setAttribute('disabled', 'disabled');
  }
  
  _enableSubmitButton = (submitButton) => {
    submitButton.classList.remove('modal__input_disabled');
    submitButton.removeAttribute('disabled', 'disabled');
  }
  
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = false;
    };
  }
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _isValid (formElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    };
  }
  
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._form, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };
  
  enableValidation() {
    this._setEventListeners(this._form);
  };
}
