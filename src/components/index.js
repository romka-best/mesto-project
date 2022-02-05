"use strict";

import '../pages/index.css';

import {enableValidation, toggleButtonState} from './validate.js';
import {
  openPopup,
  popupAddPost,
  popupEditProfile,
  popupUpdateAvatar,
  popupFormEditProfile,
  popupSubmitButtonEditProfile,
  inputNameProfile,
  inputDescriptionProfile,
  setValuesEditProfilePopup,
  dropErrorInputs
} from './modal.js';
import {initializeUser, profileAvatar} from './user.js';
import {initializeCards} from './card.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

initializeUser();
initializeCards();
setValuesEditProfilePopup();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  fieldsetSelector: '.popup__fieldset',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_active'
});

profileEditButton.addEventListener('click', () => {
  setValuesEditProfilePopup();
  dropErrorInputs(popupFormEditProfile);
  toggleButtonState(
    {
      inactiveButtonClass: 'popup__save-button_inactive'
    }, [inputNameProfile, inputDescriptionProfile],
    popupSubmitButtonEditProfile
  );
  openPopup(popupEditProfile);
});

postAddButton.addEventListener('click', () => {
  openPopup(popupAddPost);
});

profileAvatar.addEventListener('click', () => {
  openPopup(popupUpdateAvatar);
});


window.onload = function () {
  document.querySelector('.page').classList.remove("page_without-transition");
};
