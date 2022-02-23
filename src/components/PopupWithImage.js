import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, selectorCaption) {
    super(selector);
    this._selectorCaption = document.querySelector(`.${selectorCaption}`);
  }

  open(src, alt, textContent) {
    this._popup.src = src;
    this._popup.alt = alt;
    this._selectorCaption.textContent = textContent;
    this._popup.onload = () => super.open();
  }

}
