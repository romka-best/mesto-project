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

  setUserInfo(newUserInfo) {
    this._userNameElement.textContent = newUserInfo.name;
    this._userDescriptionElement.textContent = newUserInfo.about;
    this._userPhotoElement.alt = newUserInfo.name;
    this._userPhotoElement.src = newUserInfo.avatar;
  }

}
