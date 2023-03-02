/* Создайте класс PopupWithImage, который наследует от Popup. 
Этот класс должен перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно вставлять в попап картинку 
с src изображения и подписью к картинке. */

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (src, alt) => {
    document.querySelector('.popup__photo').src = src;
    document.querySelector('.popup__photo').alt = alt;
    document.querySelector('.popup__photo-caption').textContent = alt;
    this._popupElement.classList.add('popup_opened');
  }
}