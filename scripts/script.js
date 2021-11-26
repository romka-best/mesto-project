"use strict";
const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPost = document.querySelector('.popup_type_add-post');

const inputNameProfile = document.querySelector('.popup__input-field_type_name-profile');
const inputDescriptionProfile = document.querySelector('.popup__input-field_type_description-profile');
const inputNameMesto = document.querySelector('.popup__input-field_type_name-mesto');
const inputUrlLink = document.querySelector('.popup__input-field_type_url-link');
const listOfInputs = [inputNameProfile, inputDescriptionProfile, inputNameMesto, inputUrlLink];
const popupFormEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupFormAddPost = document.querySelector('.popup__form_type_add-post');

const popupWithImage = document.querySelector('.popup-with-image');
const popupImage = document.querySelector('.popup-with-image__image');
const popupCaption = document.querySelector('.popup-with-image__figcaption');

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

  postElement.querySelector('.post__title').textContent = name;
  postElement.querySelector('.post__photo').src = link;
  postElement.querySelector('.post__reaction').addEventListener('click', changeReactionPost);
  postElement.querySelector('.post__delete').addEventListener('click', deletePost);
  postElement.querySelector('.post__photo').addEventListener('click', (event) => {
    setPopup(popupWithImage, event);
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

function dropWarningInputs() {
  listOfInputs.forEach((input) => {
    dropWarningInput(input);
  });
}

function submitForm(popup, event, name = null, description = null) {
  event.preventDefault();
  dropWarningInputs();

  if (popup === popupEditProfile) {
    name.textContent = inputNameProfile.value;
    description.textContent = inputDescriptionProfile.value;
  } else if (popup === popupAddPost) {
    renderPost(createPost(inputNameMesto.value, inputUrlLink.value), postsList);
    inputNameMesto.value = '';
    inputUrlLink.value = '';
  }

  closePopup(popup)
}

function setPopup(popup, event = null) {
  const popupCloseButton = popup.querySelector('.popup__close-button');

  popup.style = "transition: visibility .5s, opacity .5s linear;"

  const name = document.querySelector('.profile__name');
  const description = document.querySelector('.profile__description');

  if (popup === popupEditProfile) {
    inputNameProfile.value = name.textContent;
    inputDescriptionProfile.value = description.textContent;
  } else if (popup === popupWithImage) {
    popupImage.src = event.target.src;
    popupCaption.textContent = event.target.parentElement.querySelector('.post__title').textContent;
  }

  popupCloseButton.addEventListener('click', () => {
    dropWarningInputs();
    closePopup(popup);
  })
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function setWarningInput(input) {
  input.classList.add('popup__input-field_type_warning');
}

function dropWarningInput(input) {
  input.classList.remove('popup__input-field_type_warning');
}

initialCards.forEach((card) => {
  renderPost(createPost(card.name, card.link), postsList);
});


profileEditButton.addEventListener('click', () => {
  setPopup(popupEditProfile);
  openPopup(popupEditProfile);
});

postAddButton.addEventListener('click', () => {
  setPopup(popupAddPost);
  openPopup(popupAddPost);
})

popupFormAddPost.addEventListener('invalid', (event) => {
  setWarningInput(event.target)
}, true);

popupFormAddPost.addEventListener('submit', (event) => {
  submitForm(popupAddPost, event);
});

popupFormEditProfile.addEventListener('invalid', (event) => {
  setWarningInput(event.target)
}, true);

popupFormEditProfile.addEventListener('submit', (event) => {
  const name = document.querySelector('.profile__name');
  const description = document.querySelector('.profile__description');
  submitForm(popupEditProfile, event, name, description);
});

listOfInputs.forEach((input) => {
  input.addEventListener('keypress', () => {
    dropWarningInput(input)
  });
});
