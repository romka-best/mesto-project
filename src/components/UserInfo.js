export default class UserInfo {
  constructor(userNameElement, userDescriptionElement, userPhotoElement) {
    this._userNameElement = userNameElement;
    this._userDescriptionElement = userDescriptionElement;
    this._userPhotoElement = userPhotoElement;
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      description: this._userDescriptionElement.textContent,
      photo: this._userPhotoElement
    };
  }

  setUserInfo({ name, about, avatar, _id: userId }) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
    this._userPhotoElement.alt = name;
    this._userPhotoElement.src = avatar;

    localStorage.setItem('userId', userId);
  }

}
