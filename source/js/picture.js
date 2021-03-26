const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const LOADING_FILES_MAX_COUNT = 10;
const IMAGE_PREVIEW_SIZE = 70;

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewImage = document.querySelector('.ad-form-header__preview img');
const housePreviewContainer = document.querySelector('.ad-form__photo-container');
const houseGalleryChooser = document.querySelector('.ad-form__upload input[type=file]');

const isImageTypeValid = (filename) => {
  return FILE_TYPES.some(arrValue => filename.endsWith(arrValue));
}

const createImagePreview = () => {
  const img = document.createElement('img');
  img.height = IMAGE_PREVIEW_SIZE;
  img.width = IMAGE_PREVIEW_SIZE;
  return img;
}

const resetHousePreview = () => {
  while (housePreviewContainer.querySelector('.ad-form__photo')) {
    housePreviewContainer.querySelector('.ad-form__photo').remove();
  }
}

const setDefaultHousePreview = () => {
  resetHousePreview();
  const housePreviewItem = document.createElement('div');
  housePreviewItem.classList.add('ad-form__photo', 'ad-form__photo--default');
  housePreviewContainer.appendChild(housePreviewItem);
}

const setDefaultAvatarPreview = () => {
  avatarPreviewImage.src = 'img/muffin-grey.svg';
}

const setAvatarPreview = () => {
  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      avatarPreviewImage.src = evt.target.result;
    })
    reader.readAsDataURL(file);
  })
}

const setHousePreview = () => {
  houseGalleryChooser.addEventListener('change', () => {

    //remove default preview element
    if (housePreviewContainer.querySelector('.ad-form__photo--default')) {
      resetHousePreview();
    }

    //get loading files
    const files = houseGalleryChooser.files;

    //check loading files count
    const currentPicturesCount = housePreviewContainer.querySelectorAll('.ad-form__photo').length;
    const loadingPicturesCount = files.length;
    if ((currentPicturesCount + loadingPicturesCount) > LOADING_FILES_MAX_COUNT) {
      houseGalleryChooser.setCustomValidity(`Допустимое количество файлов не более ${LOADING_FILES_MAX_COUNT}`);
      houseGalleryChooser.reportValidity();
      return;
    }

    //generate preview images
    for (let i = 0; i < files.length; i++) {
      if (isImageTypeValid(files[i].name)) {
        const img = createImagePreview();
        const housePreviewItem = document.createElement('div');
        housePreviewItem.classList.add('ad-form__photo');
        housePreviewItem.appendChild(img);
        housePreviewContainer.appendChild(housePreviewItem);
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          img.src = reader.result;
        })
        reader.readAsDataURL(files[i]);
      } else {
        houseGalleryChooser.setCustomValidity('Недопустимый тип файла');
        houseGalleryChooser.reportValidity();
        return;
      }
    }
  });
};

export {setDefaultHousePreview, setDefaultAvatarPreview, setAvatarPreview, setHousePreview}
