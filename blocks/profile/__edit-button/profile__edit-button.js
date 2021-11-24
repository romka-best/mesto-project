"use strict";
import {popup} from '../../popup/popup.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const inputName = document.querySelectorAll('.popup__input-field')[0];
const inputDescription = document.querySelectorAll('.popup__input-field')[1];

profileEditButton.addEventListener('click', () => {
  const name = document.querySelector('.profile__name').textContent;
  const description = document.querySelector('.profile__description').textContent;
  inputName.value = name;
  inputDescription.value = description;
  popup.style = "transition: visibility .5s, opacity .5s linear;"
  popup.classList.add('popup_opened');
})
