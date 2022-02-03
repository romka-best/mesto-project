"use strict";

import {setSettingsImagePopup} from "./modal.js";

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

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

const initializeCards = () => {
  initialCards.forEach((card) => {
    renderPost(createPost(card.name, card.link), postsList);
  });
}

const createPost = (name, link) => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postPhoto = postElement.querySelector('.post__photo');

  postElement.querySelector('.post__title').textContent = name;
  postPhoto.src = link;
  postPhoto.alt = 'Картинка поста';
  postElement.querySelector('.post__reaction').addEventListener('click', changeReactionPost);
  postElement.querySelector('.post__delete').addEventListener('click', deletePost);
  postPhoto.addEventListener('click', (event) => {
    setSettingsImagePopup({
      src: event.target.src,
      alt: 'Картинка поста',
      textContent: event.target.parentElement.querySelector('.post__title').textContent
    });
  });

  return postElement;
}

const renderPost = (post, postContainer) => {
  postContainer.prepend(post);
}

const deletePost = (event) => {
  const deleteButtonPressed = event.target;
  deleteButtonPressed.closest('.post').remove();
}

const changeReactionPost = (event) => {
  const reactionPressed = event.target;
  reactionPressed.classList.toggle('post__reaction_active');
}

export {initializeCards, renderPost, createPost, postsList}
