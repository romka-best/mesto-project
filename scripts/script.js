"use strict";
const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupCloseButtonEditProfile = document.querySelector('.popup__close-button_type_edit-profile');
const popupOverlayEditProfile = document.querySelector('.popup__overlay_type_edit-profile');
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupCloseButtonAddPost = document.querySelector('.popup__close-button_type_add-post');
const popupOverlayAddPost = document.querySelector('.popup__overlay_type_add-post');

const inputNameProfile = document.querySelector('.popup__input-field_type_name-profile');
const inputDescriptionProfile = document.querySelector('.popup__input-field_type_description-profile');
const inputNameMesto = document.querySelector('.popup__input-field_type_name-mesto');
const inputUrlLink = document.querySelector('.popup__input-field_type_url-link');
const popupFormEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupFormAddPost = document.querySelector('.popup__form_type_add-post');

const popupWithImage = document.querySelector('.popup-with-image');
const popupImage = document.querySelector('.popup-with-image__image');
const popupCaption = document.querySelector('.popup-with-image__figcaption');
const popupCloseButtonWithImage = document.querySelector('.popup__close-button_type_with-image');
const popupOverlayWithImage = document.querySelector('.popup-with-image__overlay');

const popups = [popupAddPost, popupEditProfile, popupWithImage];

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createPost(name, link) {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postPhoto = postElement.querySelector('.post__photo');

  postElement.querySelector('.post__title').textContent = name;
  postPhoto.src = link;
  postPhoto.alt = 'Картинка поста';
  postElement.querySelector('.post__reaction').addEventListener('click', changeReactionPost);
  postElement.querySelector('.post__delete').addEventListener('click', deletePost);
  postPhoto.addEventListener('click', (event) => {
    popupImage.src = event.target.src;
    popupImage.alt = 'Картинка поста';
    popupCaption.textContent = event.target.parentElement.querySelector('.post__title').textContent;

    openPopup(popupWithImage);
  });

  return postElement;
}

function renderPost(post, postContainer) {
  postContainer.prepend(post);
}

function deletePost(event) {
  const deleteButtonPressed = event.target;
  deleteButtonPressed.closest('.post').remove();
}

function changeReactionPost(event) {
  const reactionPressed = event.target;
  reactionPressed.classList.toggle('post__reaction_active');
}

function dropErrorInputs(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

function submitFormEditProfile(event) {
  event.preventDefault();

  const formElement = event.target;
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  if (hasInvalidInput(inputList)) {
    inputList.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement);
    });
  } else {
    const name = document.querySelector('.profile__name');
    const description = document.querySelector('.profile__description');

    name.textContent = inputNameProfile.value;
    description.textContent = inputDescriptionProfile.value;
    popupFormEditProfile.reset();

    closePopup(popupEditProfile)
  }
}

function submitFormAddPost(event) {
  event.preventDefault();

  const formElement = event.target;
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  if (hasInvalidInput(inputList)) {
    inputList.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement);
    });
  } else {
    renderPost(createPost(inputNameMesto.value, inputUrlLink.value), postsList);
    popupFormAddPost.reset();

    closePopup(popupAddPost);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

initialCards.forEach((card) => {
  renderPost(createPost(card.name, card.link), postsList);
});

profileEditButton.addEventListener('click', () => {
  const name = document.querySelector('.profile__name');
  const description = document.querySelector('.profile__description');

  inputNameProfile.value = name.textContent;
  inputDescriptionProfile.value = description.textContent;

  openPopup(popupEditProfile);
});

postAddButton.addEventListener('click', () => {
  openPopup(popupAddPost);
})

popupFormAddPost.addEventListener('submit', (event) => {
  submitFormAddPost(event);
});

popupFormEditProfile.addEventListener('submit', (event) => {
  submitFormEditProfile(event);
});

popupCloseButtonEditProfile.addEventListener('click', () => {
  dropErrorInputs(popupEditProfile);
  closePopup(popupEditProfile);
});

popupOverlayEditProfile.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay') && !evt.target.classList.contains('popup__container')) {
    dropErrorInputs(popupEditProfile);
    closePopup(popupEditProfile);
  }
});

popupCloseButtonAddPost.addEventListener('click', () => {
  dropErrorInputs(popupAddPost);
  closePopup(popupAddPost);
});

popupOverlayAddPost.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay') && !evt.target.classList.contains('popup__container')) {
    dropErrorInputs(popupAddPost);
    closePopup(popupAddPost);
  }
});

popupCloseButtonWithImage.addEventListener('click', () => {
  closePopup(popupWithImage);
});

popupOverlayWithImage.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup-with-image__overlay') && !evt.target.classList.contains('popup__container')) {
    closePopup(popupWithImage);
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup)
      }
    });
  }

});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add('popup__input-field_type_error');
  errorElement.classList.add('popup__input-field-error_active');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove('popup__input-field_type_error');
  errorElement.classList.remove('popup__input-field-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  const buttonElement = formElement.querySelector('.popup__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}

enableValidation();

window.onload = function () {
  document.querySelector('.page').classList.remove("page_without-transition");
};
