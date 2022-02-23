"use strict";

import '../pages/index.css';

import api from './api.js';
import UserInfo from './UserInfo.js';
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithConfirm from './PopupWithConfirm.js';

function getUserInfoWithCards() {
  Promise.all(
    [
      api.getUserInfo(),
      api.getCards()
    ]
  )
    .then(([userData, cardsArray]) => {
      userInfo.userNameElement.textContent = userData.name;
      userInfo.userDescriptionElement.textContent = userData.about;
      userInfo.userPhotoElement.alt = userData.name;
      userInfo.userPhotoElement.src = userData.avatar;
      localStorage.setItem('userId', userData._id);

      section.renderItems(cardsArray);
    })
    .catch(api.errorHandler);
}

const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

const userInfo = new UserInfo(
  document.querySelector('.profile__name'),
  document.querySelector('.profile__description'),
  document.querySelector('.profile__avatar')
);

const section = new Section({
  renderer: (cardData) => {
    const {name, link, likes, _id: cardId, owner: {_id: ownerId}} = cardData;
    const newPost = new Card({name, link, likes, cardId, ownerId}, 'post', (evt) => {
        popupWithImage.open(evt.target.src, this.name, this.name);
      },
      () => {
        popupDeleteCard.open(this);
      });
    section.addItem(newPost);
  }
}, 'posts');

// Popups
const popupWithImage = new PopupWithImage('popup-with-image', 'popup-with-image__figcaption');
const popupDeleteCard = new PopupWithConfirm('popup_type_delete-card', (evt) => {
  this.renderText(true, 'Удаление...');
  api.deleteCard(this.card.cardId)
    .then(() => {
      evt.target.closest(`.${this.card.selector}`).remove();
    })
    .catch(api.errorHandler)
    .finally(() => {
      this.renderText(false);
    });

}, 'popup__form_type_delete-card', null, 'popup__save-button_type_delete-card');
const popupEditProfile = new PopupWithForm('popup_type_edit-profile', (newUserInfo) => {
  this.renderText(true);
  api.editUserInfo(newUserInfo)
    .then((newUserInfo) => {
      userInfo.userNameElement.textContent = newUserInfo.name;
      userInfo.userDescriptionElement.textContent = newUserInfo.about;
      userInfo.userPhotoElement.alt = newUserInfo.name;
    })
    .catch(api.errorHandler)
    .finally(() => {
      this.renderText(false);
    });
}, 'popup__form_type_edit-profile', 'popup__input-field', 'popup__save-button');
const popupUpdateAvatar = new PopupWithForm('popup_type_update-avatar', (avatar) => {
  this.renderText(true);
  api.updateUserAvatar(avatar)
    .then((newUrl) => {
      userInfo.userPhotoElement.src = newUrl;
    })
    .catch(api.errorHandler)
    .finally(() => {
      this.renderText(false);
    });
}, 'popup__form_type_update-avatar', 'popup__input-field', 'popup__save-button');
const popupAddPost = new PopupWithForm('popup_type_add-post', () => {

}, 'popup__form_type_add-post', 'popup__input-field', 'popup__save-button');

const popups = [popupEditProfile, popupAddPost, popupWithImage, popupDeleteCard, popupUpdateAvatar];
popups.forEach((popup) => {
  popup.setEventListeners();
});

const formValidator = new FormValidator({
  inputSelector: '.popup__input-field',
  fieldsetSelector: '.popup__fieldset',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_active'
}, document.querySelector('.popup__form'));
formValidator.enableValidation();

getUserInfoWithCards();

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


window.onload = function () {
  document.querySelector('.page').classList.remove("page_without-transition");
};
