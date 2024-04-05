const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

const uploadFileNode = document.querySelector('#upload-file');
const previewnNode = document.querySelector('.img-upload__preview img');
const effectListNode = document.querySelector('.effects__list');
const smallImagesNode = effectListNode.querySelectorAll('.effects__preview');

const onUploadImageChange = () => {
  const file = uploadFileNode.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const objectURL = URL.createObjectURL(file);
    previewnNode.src = objectURL;

    smallImagesNode.forEach((evt) => {
      evt.style.backgroundImage = `url(${objectURL})`;
    });

    previewnNode.addEventListener('load', () => {
      URL.revokeObjectURL(objectURL);
    });
  }
};

uploadFileNode.addEventListener('change', onUploadImageChange);
