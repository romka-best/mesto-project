"use strict";

import {setSettingsImagePopup} from './modal.js';
import {getCards} from './api.js';

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

const initializeCards = () => {
  getCards()
    .then((cards) => cards.forEach((card) => {
        renderPost(createPost(card.name, card.link, card.likes.length), postsList);
      })
    );
}

const createPost = (name, link, countLikes) => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postPhoto = postElement.querySelector('.post__photo');

  postElement.querySelector('.post__title').textContent = name;
  postPhoto.src = link;
  postPhoto.alt = name;
  postElement.querySelector('.post__count-likes').textContent = countLikes;
  postElement.querySelector('.post__button-like').addEventListener('click', changeReactionPost);
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
  reactionPressed.classList.toggle('post__button-like_active');
}

export {initializeCards, renderPost, createPost, postsList}
