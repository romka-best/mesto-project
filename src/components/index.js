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
import {profileAvatar, profileDescription, profileName} from './user.js';
import {createPost, postsList, renderPost} from './card.js';
import {getUserInfo, getCards, errorHandler} from './api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

export let userId;

function getUserInfoWithCards() {
  Promise.all(
    [
      getUserInfo(),
      getCards()
    ]
  )
    .then(([userData, cardsArray]) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.alt = userData.name;
      profileAvatar.src = userData.avatar;
      userId = userData._id;

      cardsArray.forEach((card) => {
          const {name, link, likes, _id: cardId, owner: {_id: ownerId}} = card;
          const newPost = createPost({name, link, likes, cardId, ownerId});
          renderPost(newPost, postsList);
        }
      )
    })
    .catch(errorHandler);
}

getUserInfoWithCards();
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
