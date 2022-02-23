"use strict";

import '../pages/index.css';

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
import api from './api.js';
import UserInfo from "./UserInfo.js";
import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator";
import PopupWithImage from './PopupWithImage';

const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

const popupWithImage = new PopupWithImage('popup-with-image','popup-with-image__figcaption');
const popupDeleteCard = new PopupWithForm('popup_type_delete-card', (evt, card) => {
  this.rendertext(true, 'Удаление...');
  api.deleteCard(this.cardId).then(() => {
    evt.target.closest(`.${this.selector}`).remove();
  })
  .catch(api.errorHandler)
  .finally(() => {
    this.renderText(false);
  });

},'popup__form_type_delete-card', null,'popup__save-button_type_delete-card');

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

const userInfo = new UserInfo(
  document.querySelector('.profile__name'),
  document.querySelector('.profile__description'),
  document.querySelector('.profile__avatar')
);

const section = new Section({
  renderer: (cardData) => {
    const {name, link, likes, _id: cardId, owner: {_id: ownerId}} = cardData;
    const newPost = new Card({name, link, likes, cardId, ownerId}, 'post', (evt)  => {
      popupWithImage.open(evt.target.src, this.name, this.name);
    },
    (evt) => {
      popupDeleteCard.open(evt, this);
    });
    section.addItem(newPost);
  }
}, 'posts');

getUserInfoWithCards();
setValuesEditProfilePopup();

const formValidator = new FormValidator({
  inputSelector: '.popup__input-field',
  fieldsetSelector: '.popup__fieldset',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-field-error_active'
}, document.querySelector('.popup__form'));

formValidator.enableValidation();

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
