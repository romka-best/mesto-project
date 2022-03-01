import {api, section, userInfo, formValidators} from './constants.js';
import FormValidator from '../components/FormValidator.js';

function getUserInfoWithCards() {
  api.getInitialData()
    .then(([userData, cardsArray]) => {
      userInfo.setUserInfo(userData);


      section.renderItems(cardsArray);
    })
    .catch(api.errorHandler);
}

function enableValidation(config){
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

export {getUserInfoWithCards, enableValidation}
