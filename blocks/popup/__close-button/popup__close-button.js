"use strict";
import {popup} from '../popup.js';

const popupCloseButton = document.querySelector('.popup__close-button');

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})
