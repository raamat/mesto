/* Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
1) Принимает в конструктор единственный параметр — селектор попапа.
2) Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
3) Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
4) Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
Модальное окно также закрывается при клике на затемнённую область вокруг формы. */

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.setEventListeners();
  }
  
  open = () => {
    this._popupElement.classList.add('popup_opened');
  }

  close = () => {
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() { 
    document.addEventListener('keydown', this._handleEscClose);

    this._popupElement.addEventListener('click', (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}