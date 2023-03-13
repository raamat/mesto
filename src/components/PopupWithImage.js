/* Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап картинку 
с src изображения и подписью к картинке. */

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoElement = this._popupElement.querySelector('.popup__photo');
    this._popupCaptionElement = this._popupElement.querySelector('.popup__photo-caption');
  }

  open = (src, alt) => {
    this._popupPhotoElement.src = src;
    this._popupPhotoElement.alt = alt;
    this._popupCaptionElement.textContent = alt;

    super.open();
  }
}

