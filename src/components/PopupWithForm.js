/*Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
1) Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
2) Содержит приватный метод _getInputValues, который собирает данные всех
полей формы.
3) Перезаписывает родительский метод setEventListeners. 
Метод setEventListeners класса PopupWithForm должен не только добавлять 
обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
4) Перезаписывает родительский метод close, так как при закрытии попапа 
форма должна ещё и сбрасываться.

Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, colbackSubmitForm) {
    super(popupSelector);
  }
  
  // Метод собирает данные всех полей формы
  _getInputValues() {
    const inputs {
      inputFirst: this._popupElement.querySelector('.input');
    }
    
  }
}