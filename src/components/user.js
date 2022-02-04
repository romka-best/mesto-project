"use strict";

import {getUserInfo} from './api.js';

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

export {initializeUser, profileName, profileDescription};
