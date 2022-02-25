export default class Api {
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

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
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
          link: newCard.url
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
