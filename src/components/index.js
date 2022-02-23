"use strict";

import '../pages/index.css';

import Api from './api.js';
import UserInfo from './UserInfo.js';
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithConfirm from './PopupWithConfirm.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '905a05e8-b14e-4b96-9788-de898e8848e1',
    'Content-Type': 'application/json'
  }
});
const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
const inputNameProfile = document.querySelector('.popup__input-field_type_name-profile');
const inputDescriptionProfile = document.querySelector('.popup__input-field_type_description-profile');
const settingsForm = {
  inputSelector: 'popup__input-field',
  fieldsetSelector: 'popup__fieldset',
  submitButtonSelector: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_active'
}

function getUserInfoWithCards() {
  api.getInitialData()
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
      },
      (cardId, reactionPressed) => {
        api
          .deleteLikeOnCard(cardId)
          .then((result) => {
            reactionPressed.classList.remove('post__button-like_active');
            this._updateLikesOnPost(result.likes.length);
          })
          .catch(api.errorHandler);
      },
      (cardId, reactionPressed) => {
        api
          .putLikeOnCard(cardId)
          .then((result) => {
            reactionPressed.classList.add('post__button-like_active');
            this._updateLikesOnPost(result.likes.length);
          })
          .catch(api.errorHandler);
      });
    section.addItem(newPost.createCard());
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
      userInfo.setUserInfo(newUserInfo);
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
const popupAddPost = new PopupWithForm('popup_type_add-post', (newCard) => {
  this.renderText(true);
  api.addCard(newCard)
    .then((newCard) => {
      section.addItem(newCard.createCard());
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

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(settingsForm, formElement);
  formValidator.enableValidation();
}

Array.from(document.forms).forEach(form => {
  setFormValidation(form);
})

getUserInfoWithCards();

profileEditButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  inputNameProfile.value = user.name;
  inputDescriptionProfile.value = user.description;
  popupEditProfile.open();
});

postAddButton.addEventListener('click', () => {
  popupAddPost.open();
});

profileAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
})

window.onload = function () {
  document.querySelector('.page').classList.remove("page_without-transition");
};
