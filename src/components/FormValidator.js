export default class FormValidator {
  constructor({
                inputSelector,
                fieldsetSelector,
                submitButtonSelector,
                inactiveButtonClass,
                inputErrorClass,
                errorClass
              }, formElement) {
    this._inputSelector = inputSelector;
    this._fieldsetSelector = fieldsetSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._formElement = formElement;
  }

  enableValidation() {
    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._fieldsetSelector));
    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(fieldSet);
    });
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._formElement, inputElement);
    }
  };

  _inputListener(evt) {
    this._checkInputValidity(this._formElement, evt.target);
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
    this._buttonElement = this._formElement.querySelector(`.${this._submitButtonSelector}`);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', this._inputListener);
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

}
