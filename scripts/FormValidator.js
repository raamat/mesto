import { validationConfig } from "./constants.js";

class FormValidator {
  constructor (config, formElement) {
    // В методах за объектом настроек следует обращаться к полю класса,
    // а не передавать его в каждый метод, как это было реализовано ранее.
    this._config = config;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  }

  // Метод (является свойством объекта), который добавляет классы с ошибками и выводит текст ошибки (АН)
  _showInputError(inputElement) {
    // Находим необходимый span при помощи шаблонной строки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    // Делаем span видимым за счет добавления класса 'popup__input-error_visible'
    errorElement.classList.add(this._errorClass);

    // Свойство validationMessage - есть у всех полей ввода. В нём записан текст сообщения об ошибке. 
    // Браузер показывает его по умолчанию, когда вводят некорректные данные.
    errorElement.textContent = inputElement.validationMessage;

    // Превращаем серое подчеркивание поля ввода в красное
    inputElement.classList.add(this._inputErrorClass);
  }

  // Метод, который удаляет классы со стилями ошибок и удаляет тексты ошибок (АН)
  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  // Метод, который проверяет валидность поля (АН)
  _checkInputValidity(inputElement) {
    //console.log(inputElement)
    if (inputElement.validity.valid) {
      //Если поле валидно, сработает функция hideInputError, которая удалит класс с ошибкой
      this.hideInputError(inputElement);
    } else {
      //Если поле невалидно, сработает функция showInputError, которая добавит класс с ошибкой
      this._showInputError(inputElement);
    }
  }

  /* Метод принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
  Метод some проверяет, есть ли в массиве хотя бы один элемент, который соответствует определённому правилу. 
  Колбэк с этим правилом проверяет каждый элемент и возвращает true или false.
  При помощи метода some пройдем по массиву, чтобы найти невалидный input (АН, Т) */
  _hasInvalidInput = () => {
    // Проходим по массиву полей методом some
    return this._inputList.some((inputElement) => {
      // Если поле невалидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };
  
  // false - разблокировать кнопку "Submit"; true - заблокировать кнопку "Submit"
  _lockButtonState(is) {
    this._buttonElement.disabled = is;
  }

  /* Переключатель доступности кнопки - disabled = true/false
  Метод hasInvalidInput возваращает true или false */
  _toggleButtonState() {
    this._lockButtonState(this._hasInvalidInput(this._inputList));  
  }
      
  /***************** Все обработчики в одном месте *****************/
  _setEventListeners() {

    // При сбрасывании полей кнопку блокировать
    this._formElement.addEventListener('reset', () => this._lockButtonState(true));

    this._toggleButtonState(this._buttonElement);
    
    // На каждое поле ввода навешиваем обработчик на событие 'input'
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._buttonElement);
      })
    })
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}

export default FormValidator;