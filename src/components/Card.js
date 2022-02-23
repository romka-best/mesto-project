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
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardCLick;
    this._deleteLike = deleteLike;
    this._setLike = setLike;
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

    this._buttonLikePost = this._element.querySelector('.post__button-like');
    this._isSomeId();

    this._updateLikesOnPost(this._likes.length)

    this._postPhoto = this._element.querySelector('.post__photo');
    this._postPhoto.src = this._link;
    this._postPhoto.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _isSomeId() {
    if (this._likes.some((likeElement) => {
      return likeElement._id === Number.parseInt(localStorage.getItem('userId'));
    })) {
      this._buttonLikePost.classList.add('post__button-like_active');
    }
  }

  _setEventListeners() {
    this._buttonLikePost.addEventListener('click', this._changeReactionPost.bind(this));
    this._postPhoto.addEventListener('click', this._handleCardClick);
    if (this._ownerId === localStorage.getItem('userId')) {
      const deleteButton = this._element.querySelector('.post__delete');
      deleteButton.classList.add('post__delete_active');
      deleteButton.addEventListener('click', this._handleDeleteCardClick);
    }
  }

  _changeReactionPost(event) {
    const reactionPressed = event.target;

    if (reactionPressed.classList.contains('post__button-like_active')) {
      this._deleteLike(this._cardId, reactionPressed);
    } else {
      this._setLike(this._cardId, reactionPressed);
    }
  }

  _updateLikesOnPost = (countLikes) => {
    this._element.querySelector('.post__count-likes').textContent = countLikes;
  }
}
