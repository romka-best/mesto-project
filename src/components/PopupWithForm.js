import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callBackSubmitForm, formSelector, inputSelector, buttonSelector) {
    super(selector);
    this._callBackSubmitForm = callBackSubmitForm;
    this._form = document.querySelector(`.${formSelector}`);
    this._inputSelector = inputSelector;
    this._button = document.querySelector(`.${buttonSelector}`);
    this._initialButtonText = this._button.textContent;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(`.${this._inputSelector}`);

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _submitForm(event) {
    event.preventDefault();
    this._callBackSubmitForm(this._getInputValues());
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners(event) {
    super.setEventListeners(event);
    this._form.addEventListener('submit', this._submitForm);
  }

  renderText(isLoading, initialLoadingText = 'Сохранение...') {
    if (isLoading) {
      this._button.textContent = initialLoadingText;
    } else {
      this._button.textContent = this._initialButtonText;
    }
  }
}
