'use strict';

import './index.css';

import {
  userInfo,
  popupEditProfile,
  popupUpdateAvatar,
  popupAddPost,
  popups,
  validators,
  profileEditButton,
  postAddButton,
  profileAvatar,
  inputNameProfile,
  inputDescriptionProfile,
  profileEditFormValidator
} from '../utils/constants.js';

import {getUserInfoWithCards} from '../utils/functions.js';

getUserInfoWithCards();

popups.forEach((popup) => {
  popup.setEventListeners();
});

validators.forEach((formValidator) => {
  formValidator.enableValidation();
});

profileEditButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  inputNameProfile.value = user.name;
  inputDescriptionProfile.value = user.description;
  profileEditFormValidator.checkAllInputValidity();
  popupEditProfile.open();
});

postAddButton.addEventListener('click', () => {
  popupAddPost.open();
});

profileAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
})

window.onload = function () {
  document.querySelector('.page').classList.remove('page_without-transition');
};
