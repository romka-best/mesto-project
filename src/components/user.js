"use strict";

import {SERVER_URL, AUTHORIZATION_HEADER} from './utils.js'

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

const initializeUser = () => {
  getUserInfo()
    .then(result => {
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.alt = result.name;
      profileAvatar.src = result.avatar;
    });
}

const getUserInfo = () => {
  return fetch(
    SERVER_URL + '/users/me',
    {
      headers: {
        authorization: AUTHORIZATION_HEADER
      }
    })
    .then(res => res.json())
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен :(`);
    });
}

export {initializeUser, profileName, profileDescription};
