import { isEscapeKey } from './util.js';

const bodyNode = document.body;

const showModal = (element, prefix) => {
  bodyNode.append(element);

  const onModalEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      removeModal();
    }
  };

  const onCloseClick = (evt) => {
    if (evt.target.matches(`.${prefix}__button`) || !evt.target.closest(`.${prefix}__inner`)) {
      removeModal();
    }
  };

  function removeModal() {
    element.remove();
    bodyNode.removeEventListener('keydown', onModalEscape);
  }

  element.addEventListener('click', onCloseClick);

  bodyNode.addEventListener('keydown', onModalEscape);
};

export { showModal };
