/* Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап картинку 
с src изображения и подписью к картинке. */

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupPhotoCaption = this._popup.querySelector('.popup__photo-caption');
  }

  open = (src, alt) => {
    this._popupPhoto.src = src;
    this._popupPhoto.alt = alt;
    this._popupPhotoCaption.textContent = alt;

    // Вызываем функцию open родительского класса Popup,
    // котороя делает выдимым попап с картинкой
    super.open();
  }
}

