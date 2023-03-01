/* Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
1) Принимает в конструктор единственный параметр — селектор попапа.
2) Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
3) Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
4) Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
Модальное окно также закрывается при клике на затемнённую область вокруг формы. */

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open = () => {
    this._popupSelector.classList.add('popup_opened');
    // Цепляем обработчик при отрытии попапа
    this.setEventListeners();
  }

  close = () => {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
      console.log('Нажата кнопка ESC')
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', this.close);
  }
}