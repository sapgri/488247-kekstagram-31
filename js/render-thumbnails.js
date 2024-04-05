const containerNode = document.querySelector('.pictures');
const templateNode = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderThumbnail = (photo) => {
  const thumbnail = templateNode.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  const { id, url, description, likes, comments } = photo;

  thumbnail.dataset.id = id;
  thumbnail.href = url;
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (objects) => {
  objects.forEach((item) =>
    fragment.append(renderThumbnail(item)));
  containerNode.append(fragment);
};

export { renderThumbnails };
