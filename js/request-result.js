import { renderThumbnails } from './render-thumbnails.js';
import { changeFilter } from './img-filters.js';
import { openBigPicture } from './open-big-picture.js';

const SHOW_MESSAGE_TIME = 5000;

const dataErrorNode = document.querySelector('#data-error').content.querySelector('.data-error');
const imgFiltersNode = document.querySelector('.img-filters');

let photos = [];

const onSuccess = (data) => {
  imgFiltersNode.classList.remove('img-filters--inactive');
  photos = [...data];
  renderThumbnails(photos);
  changeFilter(photos);
  openBigPicture(photos);
};

const onError = () => {
  imgFiltersNode.classList.add('img-filters--inactive');
  document.body.append(dataErrorNode);
  setTimeout(() => dataErrorNode.remove(), SHOW_MESSAGE_TIME);
};

export { onSuccess, onError };
