import Popup from "./Popup";
export default class PopupWithImage extends Popup{
  constructor({src, alt, textContent}, selector, selectorCaption){
    super(selector);
    this._src = src;
    this._alt = alt;
    this._textContent = textContent;
    this._selectorCaption = document.querySelector(selectorCaption);
  }
  open() {
    super._popup.src = this._src;
    super._popup.alt = this._alt;
    this._selectorCaption.textContent = this._textContent;
    super._popup.onload = () => super.open();

  }

}
