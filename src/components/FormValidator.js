export default class FormValidator{
  constructor({inputSelector, fieldsetSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement){
    this._inputSelector = inputSelector;
    this._fieldsetSelector = fieldsetSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._formElement = formElement;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formElement));
    formList.forEach((formElement) => {
      const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldsetSelector));

      fieldsetList.forEach((fieldSet) => {
        this._setEventListeners(fieldSet);
      });
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

  _inputListener() {
    this._checkInputValidity(formElement, inputElement);
    this._toggleButtonState(inputList, buttonElement);
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', this._inputListener);
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

}
