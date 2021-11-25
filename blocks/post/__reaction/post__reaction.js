"use strict";
const postReactions = document.querySelectorAll('.post__reaction');

postReactions.forEach((postReaction) => {
  postReaction.addEventListener('click', setReaction)
})

export function setReaction(event) {
  const reactionPressed = event.target;
  reactionPressed.classList.toggle('post__reaction_active');
}
