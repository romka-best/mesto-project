"use strict";
import {createPopup} from '../../popup/popup.js';

const page = document.querySelector('.page');

const profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', () => {
  const popupEditProfile = createPopup('Редактировать профиль', 'edit_profile',
    'name', 'Ваше имя', 'description', 'Ваша деятельность')

  page.append(popupEditProfile);

  setTimeout(() => {
    popupEditProfile.classList.add('popup_opened');
  });
})
