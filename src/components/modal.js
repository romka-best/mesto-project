"use strict";

import {hideInputError, hasInvalidInput, checkInputValidity} from "./validate.js";
import {renderPost, createPost, postsList} from "./card.js";

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupCloseButtonEditProfile = document.querySelector('.popup__close-button_type_edit-profile');
const popupOverlayEditProfile = document.querySelector('.popup__overlay_type_edit-profile');
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupCloseButtonAddPost = document.querySelector('.popup__close-button_type_add-post');
const popupOverlayAddPost = document.querySelector('.popup__overlay_type_add-post');

const inputNameProfile = document.querySelector('.popup__input-field_type_name-profile');
const inputDescriptionProfile = document.querySelector('.popup__input-field_type_description-profile');
const inputNameMesto = document.querySelector('.popup__input-field_type_name-mesto');
const inputUrlLink = document.querySelector('.popup__input-field_type_url-link');
const popupFormEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupFormAddPost = document.querySelector('.popup__form_type_add-post');

const popupWithImage = document.querySelector('.popup-with-image');
const popupImage = document.querySelector('.popup-with-image__image');
const popupCaption = document.querySelector('.popup-with-image__figcaption');
const popupCloseButtonWithImage = document.querySelector('.popup__close-button_type_with-image');
const popupOverlayWithImage = document.querySelector('.popup-with-image__overlay');

const popups = [popupAddPost, popupEditProfile, popupWithImage];
const settings = {
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_active'
}

const openPopup = (popup) => {
  document.addEventListener('keydown', checkCloseWithEscape);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

const setSettingsImagePopup = (settings) => {
  popupImage.src = settings.src;
  popupImage.alt = settings.alt;
  popupCaption.textContent = settings.textContent;

  popupImage.onload = () => openPopup(popupWithImage);
}

const setValuesEditProfilePopup = (settings) => {
  const name = document.querySelector(settings.nameSelector);
  const description = document.querySelector(settings.descriptionSelector);

  inputNameProfile.value = name.textContent;
  inputDescriptionProfile.value = description.textContent;
}

const checkCloseWithEscape = (evt) => {
  if (evt.code === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        dropErrorInputs(popup);
        closePopup(popup);
      }
    });
  }
}

const dropErrorInputs = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));

  inputList.forEach((inputElement) => {
    hideInputError(settings, formElement, inputElement);
  });
}

const submitFormEditProfile = (event) => {
  event.preventDefault();

  const formElement = event.target;
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  if (hasInvalidInput(inputList)) {
    inputList.forEach((inputElement) => {
      checkInputValidity(settings, formElement, inputElement);
    });
  } else {
    const name = document.querySelector('.profile__name');
    const description = document.querySelector('.profile__description');

    name.textContent = inputNameProfile.value;
    description.textContent = inputDescriptionProfile.value;
    popupFormEditProfile.reset();

    closePopup(popupEditProfile)
  }
}

const submitFormAddPost = (event) => {
  event.preventDefault();

  const formElement = event.target;
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  if (hasInvalidInput(inputList)) {
    inputList.forEach((inputElement) => {
      checkInputValidity(settings, formElement, inputElement);
    });
  } else {
    renderPost(createPost(inputNameMesto.value, inputUrlLink.value), postsList);
    popupFormAddPost.reset();

    closePopup(popupAddPost);
  }
}

popupFormAddPost.addEventListener('submit', (event) => {
  submitFormAddPost(event);
});

popupFormEditProfile.addEventListener('submit', (event) => {
  submitFormEditProfile(event);
});

popupCloseButtonEditProfile.addEventListener('click', () => {
  dropErrorInputs(popupEditProfile);
  closePopup(popupEditProfile);
});

popupOverlayEditProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay')) {
    dropErrorInputs(popupEditProfile);
    closePopup(popupEditProfile);
  }
});

popupCloseButtonAddPost.addEventListener('click', () => {
  dropErrorInputs(popupAddPost);
  closePopup(popupAddPost);
});

popupOverlayAddPost.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay')) {
    dropErrorInputs(popupAddPost);
    closePopup(popupAddPost);
  }
});

popupCloseButtonWithImage.addEventListener('click', () => {
  closePopup(popupWithImage);
});

popupOverlayWithImage.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup-with-image__overlay')) {
    closePopup(popupWithImage);
  }
});

export {
  openPopup,
  popupAddPost,
  popupEditProfile,
  popupWithImage,
  setValuesEditProfilePopup,
  setSettingsImagePopup
}
