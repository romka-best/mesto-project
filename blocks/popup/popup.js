"use strict";
import {postTemplate} from '../posts-list/posts-list.js';
import {setReaction} from "../post/__reaction/post__reaction.js";
import {setDelete} from "../post/__delete/post__delete.js";
import {openPopupWithImage} from "../popup-with-image/popup-with-image.js";

export function createPopup(popupTitle, popupNameForm, input1Name, input1Placeholder, input2Name, input2Placeholder) {
  const popupTemplate = document.querySelector('#popup').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);

  popup.querySelector('.popup__title').textContent = popupTitle;
  popup.querySelector('.popup__form').name = popupNameForm;

  const input1 = popup.querySelectorAll('.popup__input-field')[0];
  const input2 = popup.querySelectorAll('.popup__input-field')[1];
  input1.name = input1Name;
  input1.placeholder = input1Placeholder;
  input2.name = input2Name;
  input2.placeholder = input2Placeholder;

  const popupCloseButton = popup.querySelector('.popup__close-button');
  const popupForm = popup.querySelector('.popup__form');

  const name = document.querySelector('.profile__name');
  const description = document.querySelector('.profile__description');

  if (popupNameForm === 'edit_profile') {
    input1.value = name.textContent;
    input2.value = description.textContent;
  }

  popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  })

  popupForm.addEventListener('invalid', (evt) => {
    evt.target.classList.add('popup__input-field_type_warning');
  }, true);

  input1.addEventListener('keypress', () => {
    changeTypeInput(input1)
  });
  input2.addEventListener('keypress', () => {
    changeTypeInput(input2)
  })

  popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    input1.classList.remove('popup__input-field_type_warning');
    input2.classList.remove('popup__input-field_type_warning');
    const newDataFromInput1 = popup.querySelectorAll('.popup__input-field')[0].value;
    const newDataFromInput2 = popup.querySelectorAll('.popup__input-field')[1].value;
    if (popupNameForm === 'edit_profile') {
      name.textContent = newDataFromInput1;
      description.textContent = newDataFromInput2;
    } else if (popupNameForm === 'add_post') {
      const postElement = postTemplate.querySelector('.post').cloneNode(true);
      const postsList = document.querySelector('.posts-list');

      postElement.querySelector('.post__title').textContent = newDataFromInput1;
      postElement.querySelector('.post__photo').src = newDataFromInput2;
      postElement.querySelector('.post__reaction').addEventListener('click', setReaction);
      postElement.querySelector('.post__delete').addEventListener('click', setDelete);
      postElement.querySelector('.post__photo').addEventListener('click', openPopupWithImage);

      postsList.prepend(postElement);
    }
    popup.classList.remove('popup_opened');
  });

  return popup;
}

function changeTypeInput(input) {
  input.classList.remove('popup__input-field_type_warning');
}
