'use strict';

import './index.css';

import {
  settingsForm,
  profileEditButton,
  postAddButton,
  profileAvatar,
  inputNameProfile,
  inputDescriptionProfile,
  profileDescription,
  profileName
} from '../utils/constants.js';

import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';

function getUserInfoWithCards() {
  api.getInitialData()
    .then(([userData, cardsArray]) => {
      userInfo.setUserInfo(userData);
      section.renderItems(cardsArray);
    })
    .catch(api.errorHandler);
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(`.${config.formSelector}`));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

const formValidators = {};
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '905a05e8-b14e-4b96-9788-de898e8848e1',
    'Content-Type': 'application/json'
  }
});
const userInfo = new UserInfo(
  profileName,
  profileDescription,
  profileAvatar
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
          formValidators['edit-profile'].resetValidation();
        })
        .catch(api.errorHandler)
        .finally(() => {
          popupEditProfile.renderText(false);
        });
    }
  }, true);

const popupUpdateAvatar = new PopupWithForm('popup_type_update-avatar',
  {
    callBackSubmitForm: (avatar) => {
      popupUpdateAvatar.renderText(true);
      api.updateUserAvatar(avatar)
        .then((avatarData) => {
          userInfo.setUserInfo(avatarData);
          popupUpdateAvatar.isNeedReset = true;
          popupUpdateAvatar.close();
          formValidators['update-avatar'].resetValidation();
        })
        .catch(api.errorHandler)
        .finally(() => {
          popupUpdateAvatar.isNeedReset = false;
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
          section.addItem(cardData);

          popupAddPost.isNeedReset = true;
          popupAddPost.close();
          formValidators['add-post'].resetValidation();
        })
        .catch(api.errorHandler)
        .finally(() => {
          popupAddPost.isNeedReset = false;
          popupAddPost.renderText(false);
        });
    }
  });
const popups = [popupEditProfile, popupAddPost, popupWithImage, popupDeleteCard, popupUpdateAvatar];

const section = new Section({
  renderer: ({name, link, likes, _id: cardId, owner: {_id: ownerId}}) => {
    const newPost = new Card(name, link, likes, cardId, ownerId, 'post',
      () => {
        popupWithImage.open(link, name, name);
      },
      () => {
        localStorage.setItem('cardId', cardId);
        popupDeleteCard.open();
      },
      () => {
        return api
          .deleteLikeOnCard(cardId)
          .then((result) => {
            newPost.updateLikesOnPost(result.likes.length);
          });
      },
      () => {
        return api
          .putLikeOnCard(cardId)
          .then((result) => {
            newPost.updateLikesOnPost(result.likes.length);
          });
      });
    return newPost.createCard();
  }
}, 'posts-list');

getUserInfoWithCards();

popups.forEach((popup) => {
  popup.setEventListeners();
});

enableValidation(settingsForm);

profileEditButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  inputNameProfile.value = user.name;
  inputDescriptionProfile.value = user.description;
  formValidators['edit-profile'].resetValidation(true);
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
