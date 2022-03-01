import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';

import {initializeCard} from './functions.js';


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
};

const profileEditFormValidator = new FormValidator(settingsForm, document.forms['edit-profile']);
const postAddFormValidator = new FormValidator(settingsForm, document.forms['add-post']);
const avatarUpdateFormValidator = new FormValidator(settingsForm, document.forms['update-avatar']);
const validators = [profileEditFormValidator, postAddFormValidator, avatarUpdateFormValidator];

const userInfo = new UserInfo(
  document.querySelector('.profile__name'),
  document.querySelector('.profile__description'),
  document.querySelector('.profile__avatar')
);

const popupWithImage = new PopupWithImage('popup-with-image', 'popup-with-image__image', 'popup-with-image__figcaption');
const popupDeleteCard = new PopupWithForm('popup_type_delete-card',
  {
    callBackSubmitForm: () => {
      popupDeleteCard.renderText(true, 'Удаление...');
      api.deleteCard(localStorage.getItem('cardId'))
        .then(() => {
          document.getElementById(`${localStorage.getItem('cardId')}`).remove();
          localStorage.removeItem('cardId');
          popupDeleteCard.close();
        })
        .catch(api.errorHandler)
        .finally(() => {
          popupDeleteCard.renderText(false);
        });
    }
  });
const popupEditProfile = new PopupWithForm('popup_type_edit-profile',
  {
    callBackSubmitForm: (newUserInfo) => {
      popupEditProfile.renderText(true);
      api.editUserInfo(newUserInfo)
        .then((userInfoData) => {
          userInfo.setUserInfo(userInfoData);
          popupEditProfile.close();
        })
        .catch(api.errorHandler)
        .finally(() => {
          popupEditProfile.renderText(false);
        });
    }
  });
const popupUpdateAvatar = new PopupWithForm('popup_type_update-avatar',
  {
    callBackSubmitForm: (avatar) => {
      popupUpdateAvatar.renderText(true);
      api.updateUserAvatar(avatar)
        .then((avatarData) => {
          userInfo.setUserInfo(avatarData);
          popupUpdateAvatar.close();
          avatarUpdateFormValidator.toggleButtonState();
        })
        .catch(api.errorHandler)
        .finally(() => {
          popupUpdateAvatar.renderText(false);
        });
    }
  });
const popupAddPost = new PopupWithForm('popup_type_add-post',
  {
    callBackSubmitForm: (newCard) => {
      popupAddPost.renderText(true, 'Создание...');
      api.addCard(newCard)
        .then((cardData) => {
          const card = initializeCard(cardData);
          section.addItem(card.createCard());

          popupAddPost.close();
          postAddFormValidator.toggleButtonState();
        })
        .catch(api.errorHandler)
        .finally(() => {
          popupAddPost.renderText(false);
        });
    }
  });

const popups = [popupEditProfile, popupAddPost, popupWithImage, popupDeleteCard, popupUpdateAvatar];

const section = new Section({
  renderer: (cardData) => {
    const newPost = initializeCard(cardData);
    section.addItem(newPost.createCard());
  }
}, 'posts-list');

export {
  api, userInfo, profileEditButton, postAddButton, profileAvatar,
  inputNameProfile, inputDescriptionProfile, profileEditFormValidator, validators,
  popupWithImage, popupDeleteCard, popupEditProfile, popupUpdateAvatar, popupAddPost, popups, section
};

