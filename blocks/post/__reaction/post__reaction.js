"use strict";
export const postReactions = document.querySelectorAll('.post__reaction');

postReactions.forEach((postReaction) => {
  postReaction.addEventListener('click', (event) => {
    const reactionPressed = event.target;
    reactionPressed.classList.toggle('post__reaction_active');
  })
})
