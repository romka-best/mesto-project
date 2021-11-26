"use strict";
const profileEditButton = document.querySelector('.profile__edit-button');
const postAddButton = document.querySelector('.profile__add-button');

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPost = document.querySelector('.popup_type_add-post');

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

setPopup(popupEditProfile);
setPopup(popupAddPost);
setPopup(popupWithImage);

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
  popupWithImage.style = 'transition: visibility .5s, opacity .5s linear;';
  popupWithImage.classList.add('popup_opened');
}

function setPopup(popup) {
  const popupCloseButton = popup.querySelector('.popup__close-button');
  const popupForm = popup.querySelector('.popup__form');
  const input1 = popup.querySelectorAll('.popup__input-field')[0];
  const input2 = popup.querySelectorAll('.popup__input-field')[1];

  const name = document.querySelector('.profile__name');
  const description = document.querySelector('.profile__description');

  if (popupForm !== null && popupForm.getAttribute('name') === 'edit_profile') {
    input1.value = name.textContent;
    input2.value = description.textContent;
  }
  if (popupForm !== null &&
    (popupForm.getAttribute('name') === 'add_post' || popupForm.getAttribute('name') === 'edit_profile')) {
    popup.style = "transition: visibility .5s, opacity .5s linear;"
  }

  popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  })

  if (popupForm !== null) {
    popupForm.addEventListener('invalid', (event) => {
      event.target.classList.add('popup__input-field_type_warning');
    }, true);

    popupForm.addEventListener('submit', (event) => {
      event.preventDefault();

      input1.classList.remove('popup__input-field_type_warning');
      input2.classList.remove('popup__input-field_type_warning');

      const newDataFromInput1 = popup.querySelectorAll('.popup__input-field')[0];
      const newDataFromInput2 = popup.querySelectorAll('.popup__input-field')[1];

      if (popupForm.getAttribute('name') === 'edit_profile') {
        name.textContent = newDataFromInput1.value;
        description.textContent = newDataFromInput2.value;
      } else if (popupForm.getAttribute('name') === 'add_post') {
        const postElement = postTemplate.querySelector('.post').cloneNode(true);

        postElement.querySelector('.post__title').textContent = newDataFromInput1.value;
        postElement.querySelector('.post__photo').src = newDataFromInput2.value;
        postElement.querySelector('.post__reaction').addEventListener('click', changeReactionPost);
        postElement.querySelector('.post__delete').addEventListener('click', deletePost);
        postElement.querySelector('.post__photo').addEventListener('click', openPopupWithImage);

        postsList.prepend(postElement);
        newDataFromInput1.value = '';
        newDataFromInput2.value = '';
      }

      popup.classList.remove('popup_opened');
    });
  }

  if (input1 !== undefined && input2 !== undefined) {
    input1.addEventListener('keypress', () => {
      changeTypeInput(input1)
    });
    input2.addEventListener('keypress', () => {
      changeTypeInput(input2)
    })
  }
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
  setTimeout(() => {
    popupEditProfile.classList.add('popup_opened');
  });
})

postAddButton.addEventListener('click', () => {
  setTimeout(() => {
    popupAddPost.classList.add('popup_opened');
  });
})
