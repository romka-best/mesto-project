"use strict";

import {toggleButtonState, hideInputError} from './validate.js';
import {renderPost, createPost, deletePost, postsList} from './card.js';
import {profileName, profileDescription, profileAvatar} from './user.js';
import {editUserInfo, addCard, updateUserAvatar} from './api.js';

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const popupDeleteCard = document.querySelector('.popup_type_delete-card');

const inputNameProfile = document.querySelector('.popup__input-field_type_name-profile');
const inputDescriptionProfile = document.querySelector('.popup__input-field_type_description-profile');
const inputNameMesto = document.querySelector('.popup__input-field_type_name-mesto');
const inputUrlLink = document.querySelector('.popup__input-field_type_url-link');
const inputAvatarUrlLink = document.querySelector('.popup__input-field_type_avatar-url-link');

const popupFormEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupFormAddPost = document.querySelector('.popup__form_type_add-post');
const popupFormUpdateAvatar = document.querySelector('.popup__form_type_update-avatar');
const popupFormDeleteCard = document.querySelector('.popup__form_type_delete-card');

const popupSubmitButtonEditProfile = popupFormEditProfile.querySelector('.popup__save-button');
const popupSubmitButtonAddPost = popupFormAddPost.querySelector('.popup__save-button');
const popupSubmitButtonUpdateProfile = popupFormUpdateAvatar.querySelector('.popup__save-button');
const popupSubmitButtonDeleteCard = popupFormDeleteCard.querySelector('.popup__save-button');

const popupWithImage = document.querySelector('.popup-with-image');
const popupImage = document.querySelector('.popup-with-image__image');
const popupCaption = document.querySelector('.popup-with-image__figcaption');

const popups = document.querySelectorAll('.popup');

let dataForPopup;

const settings = {
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_active'
}

function setEventListenersPopups() {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    });
  });
}

setEventListenersPopups();

const openPopup = (popup) => {
  document.addEventListener('keydown', checkCloseWithEscape);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', checkCloseWithEscape);
  popup.classList.remove('popup_opened');
}

const resetFormPopup = (popupForm) => {
  popupForm.reset();
}

const saveDataForPopup = (data) => {
  dataForPopup = data;
}

const setSettingsImagePopup = (settings) => {
  popupImage.src = settings.src;
  popupImage.alt = settings.alt;
  popupCaption.textContent = settings.textContent;

  popupImage.onload = () => openPopup(popupWithImage);
}

const setValuesEditProfilePopup = () => {
  inputNameProfile.value = profileName.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
}

const checkCloseWithEscape = (evt) => {
  if (evt.code === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
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

  popupSubmitButtonEditProfile.textContent = 'Сохранение...';
  popupSubmitButtonEditProfile.removeEventListener()

  const newUserInfo = {
    name: inputNameProfile.value,
    about: inputDescriptionProfile.value
  };

  editUserInfo(newUserInfo)
    .then((newUserInfo) => {
      profileName.textContent = newUserInfo.name;
      profileDescription.textContent = newUserInfo.about;
      closePopup(popupEditProfile);
    })
    .finally(() => {
      popupSubmitButtonEditProfile.textContent = 'Сохранить';
    });
}

const submitFormAddPost = (event) => {
  event.preventDefault();

  popupSubmitButtonAddPost.textContent = 'Сохранение...';

  const newCard = {
    name: inputNameMesto.value,
    link: inputUrlLink.value
  };

  addCard(newCard)
    .then((newCard) => {
      renderPost(createPost(newCard.name, newCard.link, [], newCard._id, newCard.owner._id), postsList);
      resetFormPopup(event.target);
      toggleButtonState({
          inactiveButtonClass: 'popup__save-button_inactive'
        },
        [inputNameMesto, inputUrlLink],
        popupSubmitButtonAddPost
      );

      closePopup(popupAddPost);
    })
    .finally(() => {
      popupSubmitButtonAddPost.textContent = 'Создать';
    });
}

const submitFormUpdateAvatar = (event) => {
  event.preventDefault();

  popupSubmitButtonUpdateProfile.textContent = 'Сохранение...';

  updateUserAvatar(inputAvatarUrlLink.value)
    .then((newAvatarLink) => {
      profileAvatar.src = newAvatarLink;
      resetFormPopup(event.target);
      toggleButtonState({
          inactiveButtonClass: 'popup__save-button_inactive'
        },
        [inputAvatarUrlLink],
        popupSubmitButtonUpdateProfile
      );
      closePopup(popupUpdateAvatar);
    })
    .finally(() => {
      popupSubmitButtonUpdateProfile.textContent = 'Сохранить';
    });
}

const submitFormDeleteCard = (event) => {
  event.preventDefault();

  popupSubmitButtonDeleteCard.textContent = 'Удаление...';

  deletePost(dataForPopup)
    .then(() => {
      closePopup(popupDeleteCard);
    })
    .finally(() => {
      popupSubmitButtonDeleteCard.textContent = 'Да';
    });
}

popupFormAddPost.addEventListener('submit', submitFormAddPost);
popupFormEditProfile.addEventListener('submit', submitFormEditProfile);
popupFormUpdateAvatar.addEventListener('submit', submitFormUpdateAvatar);
popupFormDeleteCard.addEventListener('submit', submitFormDeleteCard);

export {
  openPopup,
  saveDataForPopup,
  popupAddPost,
  popupEditProfile,
  popupUpdateAvatar,
  popupDeleteCard,
  popupWithImage,
  inputNameProfile,
  inputDescriptionProfile,
  popupSubmitButtonEditProfile,
  popupFormEditProfile,
  setValuesEditProfilePopup,
  setSettingsImagePopup,
  dropErrorInputs
};
