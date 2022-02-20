import api from "./Api.js";
import {openPopup, popupUpdateAvatar} from "./modal";

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
    return api
      .editUserInfo(newUserInfo)
      .then((newUserInfo) => {
        this.userNameElement.textContent = newUserInfo.name;
        this.userDescriptionElement.textContent = newUserInfo.about;
      })
      .catch(api.errorHandler);
  }

  _setEventListeners() {
    this.userPhotoElement.addEventListener('click', () => {
      openPopup(popupUpdateAvatar);
    });
  }
}
