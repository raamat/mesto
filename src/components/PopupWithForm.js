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

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;

    // Коллекция всех полей ввода. Несмотря на то, что NodeList не является массивом ( Array ), 
    // его вполне возможно перебрать при помощи метода forEach(). 
    // NodeList также можно конвертировать в Array при помощи Array.from()
    // https://developer.mozilla.org/ru/docs/Web/API/NodeList
    this._popupInputList = this._popup.querySelectorAll('.popup__input');
  }
  
  // Метод собирает данные всех полей формы
  // P.S. Метод приватный и его нельзя использовать за пределами класса PopupWithForm,
  // поэтому его надо передать как колбэк в this._handleFormSubmit();
  _getInputValues() {
    // Создаем пустой объект для значений полей
    this._inputValues = {};
    this._popupInputList.forEach((input) => {
      this._inputValues[input.name] = input.value; 
    })
    
    return this._inputValues;
  }
  
  // Перезаписываем родительский метод setEventListeners. 
  // Метод setEventListeners класса PopupWithForm должен не только добавлять 
  // обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    // Почему тут this._popup, а не this._popupForm?
    // Почему this._popupForm = undefined?
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
  
  close() {
    super.close();
    this._popupForm.reset();
  }
}

/***********************Справочная информация************************/
  //Если наше событие находится в переменной event, то для предотвращения поведения по умолчанию (отправлять данные самостоятельно) 
  //мы можем вызвать event.preventDefault() https://doka.guide/js/deal-with-forms
  //event.preventDefault();

  // Событие submit возникает, когда пользователь отправляет ВАЛИДНУЮ форму https://doka.guide/js/event-submit
  //formEditProfile.addEventListener('submit', handleFormEditSubmit);
