"use strict";

import {setSettingsImagePopup} from './modal.js';
import {getCards, deleteCard} from './api.js';
import {userId} from './user.js';

const postTemplate = document.querySelector('#post').content;
const postsList = document.querySelector('.posts-list');

const initializeCards = () => {
  getCards()
    .then((cards) => cards.forEach((card) => {
          renderPost(createPost(card.name, card.link, card.likes.length, card._id, card.owner._id), postsList);
        }
      )
    );
}

const createPost = (name, link, countLikes, cardId, ownerId) => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postPhoto = postElement.querySelector('.post__photo');

  postElement.id = cardId;
  postElement.querySelector('.post__title').textContent = name;
  postElement.querySelector('.post__count-likes').textContent = countLikes;
  postElement.querySelector('.post__button-like').addEventListener('click', changeReactionPost);
  if (ownerId === userId) {
    const deleteButton = postElement.querySelector('.post__delete');
    deleteButton.classList.add('post__delete_active');
    deleteButton.addEventListener('click', deletePost);
  }

  postPhoto.src = link;
  postPhoto.alt = name;
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
  const deletePost = event.target.closest('.post');

  deleteCard(deletePost.id).then(() => {
    deletePost.remove();
  });
}

const changeReactionPost = (event) => {
  const reactionPressed = event.target;
  reactionPressed.classList.toggle('post__button-like_active');
}

export {initializeCards, renderPost, createPost, postsList};
