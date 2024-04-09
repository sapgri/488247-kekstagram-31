import { renderComments, NUMBER_TO_LOAD_COMMENTS } from './render-comments.js';
import { isEscapeKey } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentLoader = bigPicture.querySelector('.comments-loader');

let picture;
let numberShownComments;

const onCommentsLoad = () => {
  renderComments(
    picture.comments,
    socialComments,
    numberShownComments += NUMBER_TO_LOAD_COMMENTS
  );
};

const onBigPictureClose = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
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
      bigPicture.classList.remove('hidden');
      bigPictureImg.src = url;
      bigPictureImg.alt = description;
      socialCaption.textContent = description;
      commentsTotalCount.textContent = comments.length;
      likesCount.textContent = likes;

      numberShownComments = NUMBER_TO_LOAD_COMMENTS;

      renderComments(comments, socialComments, numberShownComments);

      document.addEventListener('keydown', onEscapeKeydown);
    }
  };

  pictures.addEventListener('click', onThumbnailClick);
};

commentLoader.addEventListener('click', onCommentsLoad);

bigPictureCancel.addEventListener('click', onBigPictureClose);

export { openBigPicture };
