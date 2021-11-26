"use strict";
const page = document.querySelector('.page');

const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

const popup = document.querySelector('.popup-with-image');
const closeButton = document.querySelector('.popup__close-button');
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

function changeReactionPost(event) {
  const reactionPressed = event.target;
  reactionPressed.classList.toggle('post__reaction_active');
}

function deletePost(event) {
  const deleteButtonPressed = event.target;
  deleteButtonPressed.closest('.post').remove();
}

function openPopupWithImage(event) {
  popupImage.src = event.target.src;
  popupCaption.textContent = event.target.nextElementSibling.children[0].textContent;
  popup.style = 'transition: visibility .5s, opacity .5s linear;';
  popup.classList.add('popup_opened');
}

function closePopupWithImage() {
  popup.classList.remove('popup_opened');
}

function createPopup(popupTitle, popupNameForm, input1Name, input1Placeholder, input2Name, input2Placeholder) {
  const popupTemplate = document.querySelector('#popup').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);

  popup.querySelector('.popup__title').textContent = popupTitle;
  popup.querySelector('.popup__form').name = popupNameForm;

  const input1 = popup.querySelectorAll('.popup__input-field')[0];
  const input2 = popup.querySelectorAll('.popup__input-field')[1];
  input1.name = input1Name;
  input1.placeholder = input1Placeholder;
  input2.name = input2Name;
  input2.placeholder = input2Placeholder;

  const popupCloseButton = popup.querySelector('.popup__close-button');
  const popupForm = popup.querySelector('.popup__form');

  const name = document.querySelector('.profile__name');
  const description = document.querySelector('.profile__description');

  if (popupNameForm === 'edit_profile') {
    input1.value = name.textContent;
    input2.value = description.textContent;
  }

  popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  })

  popupForm.addEventListener('invalid', (event) => {
    event.target.classList.add('popup__input-field_type_warning');
  }, true);

  input1.addEventListener('keypress', () => {
    changeTypeInput(input1)
  });
  input2.addEventListener('keypress', () => {
    changeTypeInput(input2)
  })

  popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    input1.classList.remove('popup__input-field_type_warning');
    input2.classList.remove('popup__input-field_type_warning');
    const newDataFromInput1 = popup.querySelectorAll('.popup__input-field')[0].value;
    const newDataFromInput2 = popup.querySelectorAll('.popup__input-field')[1].value;
    if (popupNameForm === 'edit_profile') {
      name.textContent = newDataFromInput1;
      description.textContent = newDataFromInput2;
    } else if (popupNameForm === 'add_post') {
      const postElement = postTemplate.querySelector('.post').cloneNode(true);
      const postsList = document.querySelector('.posts-list');

      postElement.querySelector('.post__title').textContent = newDataFromInput1;
      postElement.querySelector('.post__photo').src = newDataFromInput2;
      postElement.querySelector('.post__reaction').addEventListener('click', changeReactionPost);
      postElement.querySelector('.post__delete').addEventListener('click', deletePost);
      postElement.querySelector('.post__photo').addEventListener('click', openPopupWithImage);

      postsList.prepend(postElement);
    }
    popup.classList.remove('popup_opened');
  });

  return popup;
}

function changeTypeInput(input) {
  input.classList.remove('popup__input-field_type_warning');
}

initialCards.forEach((card) => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);

  postElement.querySelector('.post__photo').src = card.link;
  postElement.querySelector('.post__title').textContent = card.name;
  postElement.querySelector('.post__photo').addEventListener('click', openPopupWithImage);
  postElement.querySelector('.post__reaction').addEventListener('click', changeReactionPost);
  postElement.querySelector('.post__delete').addEventListener('click', deletePost);

  postsList.append(postElement);
});


profileEditButton.addEventListener('click', () => {
  const popupEditProfile = createPopup('Редактировать профиль', 'edit_profile',
    'name', 'Ваше имя', 'description', 'Ваша деятельность')

  page.append(popupEditProfile);

  setTimeout(() => {
    popupEditProfile.classList.add('popup_opened');
  });
})

postAddButton.addEventListener('click', () => {
  const popupAddPost = createPopup('Новое место', 'add_post',
    'name', 'Название', 'url', 'Ссылка на картинку')

  page.append(popupAddPost);

  setTimeout(() => {
    popupAddPost.classList.add('popup_opened');
  });
})

closeButton.addEventListener('click', closePopupWithImage);
