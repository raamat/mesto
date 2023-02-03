// Функция увеличения картинок
function zoomPhoto(src, caption) {
  popupPhoto.src = src;
  popupPhoto.alt = caption;

  popupPhotoCaption.textContent = caption;
  openPopup(popupZoomPhoto);
}

export { zoomPhoto };