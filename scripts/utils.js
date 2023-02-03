const popupPhoto = popupPhoto.querySelector('.popup__photo');

// Функция увеличения картинок
function zoomPhoto(src, caption) {
  popupPhoto.src = src;
  popupPhoto.alt = caption;

  popupPhotoCaption.textContent = caption;
  openPopup(popupPhoto);
}

export { zoomPhoto, popupPhoto };