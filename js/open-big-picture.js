import { renderComments, NUMBER_TO_LOAD_COMMENTS } from './render-comments.js';
import { isEscapeKey } from './util.js';

const picturesNode = document.querySelector('.pictures');
const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img img');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');
const socialCaptionNode = bigPictureNode.querySelector('.social__caption');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsTotalCountNode = bigPictureNode.querySelector('.social__comment-total-count');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const commentLoaderNode = bigPictureNode.querySelector('.comments-loader');

let picture;
let numberShownComments;

const onCommentsLoad = () => {
  renderComments(
    picture.comments,
    socialCommentsNode,
    numberShownComments += NUMBER_TO_LOAD_COMMENTS
  );
};

const onBigPictureClose = () => {
  document.body.classList.remove('modal-open');
  bigPictureNode.classList.add('hidden');
  commentLoaderNode.removeEventListener('click', onCommentsLoad);
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBigPictureClose();
  }
}

const openBigPicture = (data) => {
  const onThumbnailClick = (evt) => {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();

      picture = data[evt.target.closest('.picture').dataset.id];
      const { url, description, comments, likes } = picture;

      document.body.classList.add('modal-open');
      bigPictureNode.classList.remove('hidden');
      bigPictureImgNode.src = url;
      bigPictureImgNode.alt = description;
      socialCaptionNode.textContent = description;
      commentsTotalCountNode.textContent = comments.length;
      likesCountNode.textContent = likes;

      numberShownComments = NUMBER_TO_LOAD_COMMENTS;

      renderComments(comments, socialCommentsNode, numberShownComments);

      commentLoaderNode.addEventListener('click', onCommentsLoad);

      document.addEventListener('keydown', onEscapeKeydown);
    }
  };

  picturesNode.addEventListener('click', onThumbnailClick);
};

bigPictureCancelNode.addEventListener('click', onBigPictureClose);

export { openBigPicture };
