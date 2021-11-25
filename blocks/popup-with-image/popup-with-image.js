"use strict";

const popup = document.querySelector('.popup-with-image');
const closeButton = document.querySelector('.popup__close-button');
const popupImage = document.querySelector('.popup-with-image__image');
const popupCaption = document.querySelector('.popup-with-image__figcaption');

export function openPopupWithImage(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.nextElementSibling.children[0].textContent;
  popup.style = 'transition: visibility .5s, opacity .5s linear;';
  popup.classList.add('popup_opened');
}

function closePopupWithImage() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopupWithImage);
