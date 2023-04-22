/* Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
1) Принимает в конструктор единственный параметр — селектор попапа.
2) Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
3) Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
4) Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
Модальное окно также закрывается при клике на затемнённую область вокруг формы. */

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.setEventListeners();
    // Ниже привязываем контекст в конструкторе. Теперь можно смело 
    // пользоваться this._handleEscClose где угодно напрямую, без боязни потери this
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  open() {
    this._popup.classList.add('popup_opened');
    // Добавляем обработчик ESC при открытии попап
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // Удаляем обработчик ESC при закрытии попап
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() { 
    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}