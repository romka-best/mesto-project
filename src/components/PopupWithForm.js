import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, {callBackSubmitForm}) {
    super(selector);
    this._callBackSubmitForm = callBackSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input-field');
    this._button = this._form.querySelector('.popup__save-button');
    this._initialButtonText = this._button.textContent;
  }

  _getInputValues() {
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

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm.bind(this));
  }

  renderText(isLoading, initialLoadingText = 'Сохранение...') {
    if (isLoading) {
      this._button.textContent = initialLoadingText;
    } else {
      this._button.textContent = this._initialButtonText;
    }
  }
}
