import {api, popupDeleteCard, popupWithImage, section, userInfo} from './constants.js';
import Card from '../components/Card.js';

function getUserInfoWithCards() {
  api.getInitialData()
    .then(([userData, cardsArray]) => {
      userInfo.setUserInfo(userData);
      localStorage.setItem('userId', userData._id);

      section.renderItems(cardsArray);
    })
    .catch(api.errorHandler);
}

function initializeCard({name, link, likes, _id: cardId, owner: {_id: ownerId}}) {
  const newPost = new Card({name, link, likes, cardId, ownerId}, 'post',
    () => {
      popupWithImage.open(link, name, name);
    },
    () => {
      localStorage.setItem('cardId', cardId);
      popupDeleteCard.open();
    },
    () => {
      return api
        .deleteLikeOnCard(cardId)
        .then((result) => {
          newPost.updateLikesOnPost(result.likes.length);
        });
    },
    () => {
      return api
        .putLikeOnCard(cardId)
        .then((result) => {
          newPost.updateLikesOnPost(result.likes.length);
        });
    });

  return newPost;
}

export {getUserInfoWithCards, initializeCard}
