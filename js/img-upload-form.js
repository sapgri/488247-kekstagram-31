import { isEscapeKey } from './util.js';
import { onEffectChange } from './effects-slider.js';
import { pristine } from './check-validity.js';
import { sendData } from './api.js';
import { showModal } from './show-modal.js';

const PERCENTAGE_VALUE = 100;
const SCALE_STEP = 0.25;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const errorPopupNode = document.querySelector('#error').content.querySelector('.error');
const successPopupNode = document.querySelector('#success').content.querySelector('.success');
const imgUploadFormNode = document.querySelector('.img-upload__form');
const uploadOverlayNode = imgUploadFormNode.querySelector('.img-upload__overlay');
const uploadFileNode = imgUploadFormNode.querySelector('#upload-file');
const imgUploadCancelNode = imgUploadFormNode.querySelector('.img-upload__cancel');
const smallerNode = imgUploadFormNode.querySelector('.scale__control--smaller');
const biggerNode = imgUploadFormNode.querySelector('.scale__control--bigger');
const imgNode = imgUploadFormNode.querySelector('.img-upload__preview img');
const scaleControlNode = imgUploadFormNode.querySelector('.scale__control--value');
const effectLevelNode = imgUploadFormNode.querySelector('.img-upload__effect-level');
const effectsListNode = imgUploadFormNode.querySelector('.effects__list');
const inputHashtagsNode = imgUploadFormNode.querySelector('.text__hashtags');
const inputDescriptionNode = imgUploadFormNode.querySelector('.text__description');
const submitButtonNode = imgUploadFormNode.querySelector('.img-upload__submit');

let scale = 1;

const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = SubmitButtonText.IDLE;
};

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlayNode.classList.add('hidden');
  effectLevelNode.classList.add('hidden');
  imgNode.style.transform = '';
  imgNode.style.filter = '';
  scale = 1;
  unblockSubmitButton();
  imgUploadFormNode.reset();
  pristine.reset();
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    onImgUploadClose();
  }
}

const onPhotoSelect = () => {
  document.body.classList.add('modal-open');
  uploadOverlayNode.classList.remove('hidden');
  document.addEventListener('keydown', onEscapeKeydown);
};

const changeZoom = (factor = 1) => {
  if (scale < 1 && factor > 0 || scale > SCALE_STEP && factor < 0) {
    scale += SCALE_STEP * factor;
    imgNode.style.transform = `scale(${scale})`;
    scaleControlNode.value = `${scale * PERCENTAGE_VALUE}%`;
  }
};

const onSmallerClick = () => {
  changeZoom(-1);
};

const onBiggerClick = () => {
  changeZoom();
};

const onHashtagInput = () => {
  submitButtonNode.disabled = !pristine.validate();
};

const onCommentInput = () => {
  submitButtonNode.disabled = !pristine.validate();
};

const onImgUploadFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    inputHashtagsNode.value = inputHashtagsNode.value.trim().replaceAll(/\s+/g, ' ');
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        onImgUploadClose();
        showModal(successPopupNode, 'success');
      })
      .catch(() => {
        showModal(errorPopupNode, 'error');
      })
      .finally(() => unblockSubmitButton());
  }
};

imgUploadFormNode.addEventListener('submit', onImgUploadFormSubmit);

uploadFileNode.addEventListener('change', onPhotoSelect);

imgUploadCancelNode.addEventListener('click', onImgUploadClose);

smallerNode.addEventListener('click', onSmallerClick);
biggerNode.addEventListener('click', onBiggerClick);

effectsListNode.addEventListener('change', onEffectChange);

inputHashtagsNode.addEventListener('input', onHashtagInput);
inputDescriptionNode.addEventListener('input', onCommentInput);
