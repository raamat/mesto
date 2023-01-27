import { validationConfig } from './constants.js';

//Функция, которая добавляет классы с ошибками и выводит текст ошибки (АН)
function showInputError(formElement, inputElement, config) {
  //Находим необходимый span при помощи шаблонной строки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  //Делаем span видимым
  errorElement.classList.add(config.errorClass);
  //Свойство validationMessage - есть у всех полей ввода. В нём записан текст сообщения об ошибке. 
  //Браузер показывает его по умолчанию, когда вводят некорректные данные.
  errorElement.textContent = inputElement.validationMessage;

  //Превращаем серое подчеркивание поля ввода в красное
  inputElement.classList.add(config.inputErrorClass);
}

//Функция, которая удаляет классы со стилями ошибок и удаляет тексты ошибок (АН)
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

//Функция, которая проверяет валидность поля (АН)
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    //Если поле валидно, сработает функция hideInputError, которая удалит класс с ошибкой
    hideInputError(formElement, inputElement, config);
  } else {
    //Если поле невалидно, сработает функция showInputError, которая добавит класс с ошибкой
    showInputError(formElement, inputElement, config);
  }
}

/* Функция принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
Метод some проверяет, есть ли в массиве хотя бы один элемент, который соответствует определённому правилу. 
Колбэк с этим правилом проверяет каждый элемент и возвращает true или false.
При помощи метода some пройдем по массиву, чтобы найти невалидный input.
Функция принимает массив полей (АН, Т) */
const hasInvalidInput = (inputList) => {
  // Проходим по массиву полей методом some
  return inputList.some((inputElement) => {
    
    // Если поле невалидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// false - разблокировать кнопку "Submit"; true - заблокировать кнопку "Submit"
function lockButtonState(buttonElement, is) {
  buttonElement.disabled = is;
}

/* Переключатель доступности кнопки - disabled = true/false
Функция hasInvalidInput возваращает true или false*/
function toggleButtonState(inputList, buttonElement, config) {
  lockButtonState(buttonElement, hasInvalidInput(inputList));  
}

// Получаем список всех полей 
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // При сбрасывании полей кнопку блокировать
  formElement.addEventListener('reset', () => lockButtonState(buttonElement, true));
  
  toggleButtonState(inputList, buttonElement, config);

   inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}
 
/* Функция принимает на вход объект validationConfig. Получаем два массива:
1) Список всех форм в массиве formList
2) Массив всех остальных пар ключ-значение объекта validationConfig
... (rest parameters) синтаксис остаточных параметров функции позволяет представлять неограниченное множество 
аргументов в виде массива (собирают отдельные параметры функции в массив см. Практикум) */
function enableValidation({ formSelector, ...restConfig }) {
  //Получаем массив из всех форм formList
  const formList = Array.from(document.querySelectorAll(formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig)
  })
}

/* В 6ПР нет задания проверять валидность форм при открытии или очищать формы от ошибок
//Функция проверяет валидность полей открытой формы и переключает состояние кнопки
function setButtonState(popup) {
  //Получаем форму
  const formElement = popup.querySelector(validationConfig.formSelector);
  //Получаем массив полей формы
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  //Находим кнопку submit
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  //Выше мы получили все необходимые аргументы, чтобы вызвать функцию toggleButtonState
  toggleButtonState(inputList, buttonElement, validationConfig);
}

//Функция сброса полей с ошибками
function clearInputError(popup) {
  //Получаем форму
  const formElement = popup.querySelector(validationConfig.formSelector);
  //Получаем массив полей формы
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  //Для каждого инпута запускаем функцию hideInputError
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  })
}
*/

// Включение валидации вызовом enableValidation
// Все настройки передаются при вызове

enableValidation(validationConfig);