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

const inputNameProfile = document.querySelector('.popupinput-field_type_name-profile');
const inputDescriptionProfile = document.querySelector('.popupinput-field_type_description-profile');
const settingsForm = {
  inputSelector: '.popupinput-field',
  fieldsetSelector: '.popupfieldset',
  submitButtonSelector: '.popupsave-button',
  inactiveButtonClass: 'popupsave-button_inactive',
  inputErrorClass: 'popupinput-field_type_error',
  errorClass: 'popupinput-field-error_active'
}

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
      this.close();
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
      this.close();
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
      this.close();
    })
    .catch(api.errorHandler)
    .finally(() => {
      this.renderText(false);
    });
}, 'popup__form_type_update-avatar', 'popup__input-field', 'popup__save-button');
const popupAddPost = new PopupWithForm('popup_type_add-post', () => {
  this.renderText(true);
  api.addCard(card)
  .then((newCard)=>{
    section.renderer(newCard);
    this.close();
  })
  .catch(api.errorHandler)
  .finally(() => {
    this.renderText(false);
  });
}, 'popup__form_type_add-post', 'popup__input-field', 'popup__save-button');

const popups = [popupEditProfile, popupAddPost, popupWithImage, popupDeleteCard, popupUpdateAvatar];
popups.forEach((popup) => {
  popup.setEventListeners();
});

getUserInfoWithCards();

profileEditButton.addEventListener('click', () => {
  inputNameProfile.value = userInfo.userNameElement.textContent;
  inputDescriptionProfile.value = userInfo.userDescriptionElement.textContent;
  popupEditProfile.open();
});

postAddButton.addEventListener('click', () => {
  popupAddPost.open();
});

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(settingsForm, formElement);
  formValidator.enableValidation();
}

Array.from(document.forms).forEach(form => {
  setFormValidation(form);
})

window.onload = function () {
  document.querySelector('.page').classList.remove("page_without-transition");
};
