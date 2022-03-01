import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, selectorImage, selectorCaption) {
    super(selector);
    this._image = this._popup.querySelector(`.${selectorImage}`);
    this._caption = this._popup.querySelector(`.${selectorCaption}`);
  }

  open(src, alt, textContent) {
    this._image.src = src;
    this._image.alt = alt;
    this._caption.textContent = textContent;
    this._image.onload = super.open.bind(this);
  }

}
