import { api } from "../utils/constants.js";
export default class Card {
  constructor({
                name,
                link,
                likes,
                cardId,
                ownerId
              }, selector, handleCardClick, handleDeleteCardCLick, deleteLike, setLike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._selector = selector;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleDeleteCardClick = handleDeleteCardCLick.bind(this);
    this._handleDeleteLike = deleteLike.bind(this);
    this._handleSetLike = setLike.bind(this);
  }

  _getElement() {
    return document
      .querySelector(`#${this._selector}`)
      .content
      .querySelector(`.${this._selector}`)
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getElement();

    this._element.id = this._cardId;
    this._element.querySelector('.post__title').textContent = this._name;

    this._likeButton = this._element.querySelector('.post__button-like');
    this._countLikes = this._element.querySelector('.post__count-likes');
    this._isSomeId();

    this.updateLikesOnPost(this._likes.length)

    this._postPhoto = this._element.querySelector('.post__photo');
    this._postPhoto.src = this._link;
    this._postPhoto.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _isSomeId() {
    if (this._likes.some((likeElement) => {
      return likeElement._id === localStorage.getItem('userId');
    })) {
      this._likeButton.classList.add('post__button-like_active');
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('post__button-like_active')) {
        this._handleDeleteLike(this)
        .then(() => {
          this._likeButton.classList.remove('post__button-like_active');
        })
        .catch(api.errorHandler);
      } else {
        this._handleSetLike(this)
        .then(() => {
          this._likeButton.classList.add('post__button-like_active');
        })
        .catch(api.errorHandler);;
      }
    });

    this._postPhoto.addEventListener('click', this._handleCardClick);
    if (this._ownerId === localStorage.getItem('userId')) {
      const deleteButton = this._element.querySelector('.post__delete');
      deleteButton.classList.add('post__delete_active');
      deleteButton.addEventListener('click', this._handleDeleteCardClick);
    }
  }

  updateLikesOnPost = (countLikes) => {
    this._countLikes.textContent = countLikes;
  }
}
