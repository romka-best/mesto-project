export default class UserInfo {
  constructor(userNameElement, userDescriptionElement, userPhotoElement) {
    this.userNameElement = userNameElement;
    this.userDescriptionElement = userDescriptionElement;
    this.userPhotoElement = userPhotoElement;
  }

  getUserInfo() {
    return {
      name: this.userNameElement.textContent,
      description: this.userDescriptionElement.textContent,
      photo: this.userPhotoElement
    };
  }

  setUserInfo(newUserInfo) {
    this.userNameElement.textContent = newUserInfo.name;
    this.userDescriptionElement.textContent = newUserInfo.about;
    this.userPhotoElement.alt = newUserInfo.name;
  }
}
