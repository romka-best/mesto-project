class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  errorHandler(err) {
    console.log(err);
  }

  getUserInfo() {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        headers: this._headers
      })
      .then(this._getResponseData);
  }

  editUserInfo(newUserInfo) {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
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
      });
  }

  getCards() {
    return fetch(
      `${this._baseUrl}/cards`,
      {
        headers: this._headers
      })
      .then(this._getResponseData);
  }

  addCard(newCard) {
    return fetch(
      `${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: newCard.name,
          link: newCard.link
        })
      })
      .then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponseData);
  }

  putLikeOnCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._getResponseData);
  }

  deleteLikeOnCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponseData);
  }

  updateUserAvatar(avatar) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar.url
        })
      })
      .then((res) => {
        if (res.ok) {
          return avatar.url;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
  headers: {
    authorization: '905a05e8-b14e-4b96-9788-de898e8848e1',
    'Content-Type': 'application/json'
  }
});

export default api;
