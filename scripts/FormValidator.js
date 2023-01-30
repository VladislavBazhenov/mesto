export { FormValidator };

class FormValidator {
  
  constructor(validationSettings, form) {
    this._validationSettings = validationSettings;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._form.querySelector(this._validationSettings.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);
    errorElement.textContent = '';
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
  
  _isValid (inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }
  
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  };
  
  _enableSubmitButton = (submitButton) => {
    submitButton.classList.remove(this._validationSettings.inactiveButtonClass);
    submitButton.removeAttribute('disabled', 'disabled');
  };

  resetValidation() {
    this._disableSubmitButton();
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._validationSettings.inputErrorClass);
    });
  };

  enableValidation() {
    this._setEventListeners(this._form);
  };
};
