"use strict";

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
  return fetch('https://nomoreparties.co/v1/plus-cohort-6/users/me', {
    headers: {
      authorization: '905a05e8-b14e-4b96-9788-de898e8848e1'
    }
  })
    .then(res => res.json())
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    });
}

export {initializeUser, profileName, profileDescription}
