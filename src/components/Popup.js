export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(`.${selector}`);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape' && this._popup.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

}
