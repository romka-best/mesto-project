"use strict";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '905a05e8-b14e-4b96-9788-de898e8848e1',
    'Content-Type': 'application/json'
  }
}

const getUserInfo = () => {
  return fetch(
    `${config.baseUrl}/users/me`,
    {
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const editUserInfo = (newUserInfo) => {
  return fetch(
    `${config.baseUrl}/users/me`,
    {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: newUserInfo.name,
        about: newUserInfo.about
      })
    })
    .then((res) => {
      if (res.ok) {
        return newUserInfo;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const getCards = () => {
  return fetch(
    `${config.baseUrl}/cards`,
    {
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const addCard = (newCard) => {
  return fetch(
    `${config.baseUrl}/cards`,
    {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const deleteCard = (cardId) => {
  return fetch(
    `${config.baseUrl}/cards/${cardId}`,
    {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const putLikeOnCard = (cardId) => {
  return fetch(
    `${config.baseUrl}/cards/likes/${cardId}`,
    {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const deleteLikeOnCard = (cardId) => {
  return fetch(
    `${config.baseUrl}/cards/likes/${cardId}`,
    {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export {getUserInfo, editUserInfo, getCards, addCard, deleteCard, putLikeOnCard, deleteLikeOnCard};
