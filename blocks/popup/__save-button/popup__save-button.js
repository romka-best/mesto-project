"use strict";
import {popup} from '../popup.js';

const popupForm = document.querySelector('.popup__form');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

function formSubmitHandler(evt) {
  evt.preventDefault();
  const newName = document.querySelectorAll('.popup__input-field')[0].value;
  const newDescription = document.querySelectorAll('.popup__input-field')[1].value;

  name.textContent = newName;
  description.textContent = newDescription;

  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmitHandler);
