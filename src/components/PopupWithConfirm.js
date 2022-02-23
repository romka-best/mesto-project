import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirm extends PopupWithForm {
  _submitForm(event) {
    event.preventDefault();
    this._callBackSubmitForm(event);
  }

  open(card) {
    this.card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }
}
