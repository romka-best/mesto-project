"use strict";
const deleteButtons = document.querySelectorAll('.post__delete');

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', (event) => {
    const deleteButtonPressed = event.target;
    deleteButtonPressed.closest('.post').remove();
  })
})
