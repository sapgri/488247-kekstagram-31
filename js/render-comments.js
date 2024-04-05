import { numDecline } from './util.js';

const NUMBER_TO_LOAD_COMMENTS = 5;

const Avatar = {
  HEIGHT: 35,
  WIDTH: 35,
};

const bigPictureSocialNode = document.querySelector('.big-picture__social');
const socialCommentShownCountNode = bigPictureSocialNode.querySelector('.social__comment-shown-count');
const socialCommentCountNode = bigPictureSocialNode.querySelector('.social__comment-count');
const commentLoaderNode = bigPictureSocialNode.querySelector('.comments-loader');

const renderComment = (comment, container) => {
  const { avatar, name, message } = comment;
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.height = Avatar.HEIGHT;
  img.width = Avatar.WIDTH;

  const paragraph = document.createElement('p');
  paragraph.classList.add('social__text');
  paragraph.textContent = message;

  listItem.append(img);
  listItem.append(paragraph);
  container.append(listItem);
};

const renderComments = (comments, container, quantity) => {
  container.innerHTML = '';
  socialCommentShownCountNode.textContent = Math.min(comments.length, quantity);

  if (+socialCommentShownCountNode.textContent === comments.length) {
    commentLoaderNode.classList.add('hidden');
  } else {
    commentLoaderNode.classList.remove('hidden');
  }

  comments.slice(0, socialCommentShownCountNode.textContent)
    .forEach((comment) => renderComment(comment, container));

  socialCommentCountNode.childNodes[3].textContent = numDecline(
    comments.length, ' комментария', ' комментариев', ' комментариев'
  );
};

export { renderComments, NUMBER_TO_LOAD_COMMENTS };
