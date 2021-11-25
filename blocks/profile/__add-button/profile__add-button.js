"use strict";
import {createPopup} from '../../popup/popup.js';

const page = document.querySelector('.page');

const postAddButton = document.querySelector('.profile__add-button');

postAddButton.addEventListener('click', () => {
  const popupAddPost = createPopup('Новое место', 'add_post',
    'name', 'Название', 'url', 'Ссылка на картинку')

  page.append(popupAddPost);

  setTimeout(() => {
    popupAddPost.classList.add('popup_opened');
  });
})
