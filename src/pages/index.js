'use strict';

import './index.css';

import {
  userInfo,
  popupEditProfile,
  popupUpdateAvatar,
  popupAddPost,
  popups,
  settingsForm,
  profileEditButton,
  postAddButton,
  profileAvatar,
  inputNameProfile,
  inputDescriptionProfile, formValidators
} from '../utils/constants.js';

import {getUserInfoWithCards, enableValidation} from '../utils/functions.js';

getUserInfoWithCards();

popups.forEach((popup) => {
  popup.setEventListeners();
});

enableValidation(settingsForm);

profileEditButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  inputNameProfile.value = user.name;
  inputDescriptionProfile.value = user.description;
  formValidators['edit-profile'].resetValidation();
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
