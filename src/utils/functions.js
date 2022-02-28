import {api, popupDeleteCard, popupWithImage, section, userInfo} from './constants.js';
import Card from '../components/Card.js';

function getUserInfoWithCards() {
  api.getInitialData()
    .then(([userData, cardsArray]) => {
      userInfo.userNameElement.textContent = userData.name;
      userInfo.userDescriptionElement.textContent = userData.about;
      userInfo.userPhotoElement.alt = userData.name;
      userInfo.userPhotoElement.src = userData.avatar;
      localStorage.setItem('userId', userData._id);

      section.renderItems(cardsArray);
    })
    .catch(api.errorHandler);
}

function initializeCard({name, link, likes, _id: cardId, owner: {_id: ownerId}}) {
  const newPost = new Card({name, link, likes, cardId, ownerId}, 'post',
    (evt) => {
      popupWithImage.open(evt.target.src, name, name);
    },
    () => {
      localStorage.setItem('cardId', cardId);
      popupDeleteCard.open();
    },
    (cardId, reactionPressed) => {
      api
        .deleteLikeOnCard(cardId)
        .then((result) => {
          reactionPressed.classList.remove('post__button-like_active');
          newPost.updateLikesOnPost(result.likes.length);
        })
        .catch(api.errorHandler);
    },
    (cardId, reactionPressed) => {
      api
        .putLikeOnCard(cardId)
        .then((result) => {
          reactionPressed.classList.add('post__button-like_active');
          newPost.updateLikesOnPost(result.likes.length);
        })
        .catch(api.errorHandler);
    });

  return newPost;
}

export {getUserInfoWithCards, initializeCard}
