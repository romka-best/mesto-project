"use strict";

import {setSettingsImagePopup} from './modal.js';
import {getCards, deleteCard, putLikeOnCard, deleteLikeOnCard} from './api.js';
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

const createPost = (name, link, likes, cardId, ownerId) => {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const buttonLikePost = postElement.querySelector('.post__button-like');
  const postPhoto = postElement.querySelector('.post__photo');

  postElement.id = cardId;
  postElement.querySelector('.post__title').textContent = name;
  if (likes.some((likeElement) => {
    return likeElement._id === userId;
  })) {
    buttonLikePost.classList.add('post__button-like_active');
  }
  updateLikesOnPost(postElement, likes.length);
  buttonLikePost.addEventListener('click', changeReactionPost);
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
  const likePost = event.target.closest('.post');
  const reactionPressed = event.target;

  if (reactionPressed.classList.contains('post__button-like_active')) {
    deleteLikeOnCard(likePost.id).then((result) => {
      reactionPressed.classList.remove('post__button-like_active');
      updateLikesOnPost(likePost, result.likes.length);
    });
  } else {
    putLikeOnCard(likePost.id).then((result) => {
      reactionPressed.classList.add('post__button-like_active');
      updateLikesOnPost(likePost, result.likes.length);
    });
  }
}

const updateLikesOnPost = (postElement, countLikes) => {
  postElement.querySelector('.post__count-likes').textContent = countLikes;
}

export {initializeCards, renderPost, createPost, postsList};
