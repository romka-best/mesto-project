import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({src, alt, textContent}, selector, selectorCaption) {
    super(selector);
    this._src = src;
    this._alt = alt;
    this._textContent = textContent;
    this._selectorCaption = document.querySelector(`.${selectorCaption}`);
  }

  open() {
    this._popup.src = this._src;
    this._popup.alt = this._alt;
    this._selectorCaption.textContent = this._textContent;
    this._popup.onload = () => super.open();
  }

}
