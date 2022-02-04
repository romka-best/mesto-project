"use strict";

import {setSettingsImagePopup} from './modal.js';
import {SERVER_URL, AUTHORIZATION_HEADER} from './utils.js'

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

const initializeCards = () => {
  getCards()
    .then((cards) => cards.forEach((card) => {
        renderPost(createPost(card.name, card.link), postsList);
      })
    );
}

const getCards = () => {
  return fetch(
    SERVER_URL + '/cards',
    {
      headers: {
        authorization: AUTHORIZATION_HEADER
      }
    })
    .then(res => res.json())
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен :(`);
    });
}

const createPost = (name, link) => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postPhoto = postElement.querySelector('.post__photo');

  postElement.querySelector('.post__title').textContent = name;
  postPhoto.src = link;
  postPhoto.alt = name;
  postElement.querySelector('.post__reaction').addEventListener('click', changeReactionPost);
  postElement.querySelector('.post__delete').addEventListener('click', deletePost);
  postPhoto.addEventListener('click', (event) => {
    setSettingsImagePopup({
      src: event.target.src,
      alt: name,
      textContent: name
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
