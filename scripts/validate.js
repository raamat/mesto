const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
 };

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

//Функция, которая удаляет классы со стилями ошибок (АН)
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
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

//Переключатель доступности кнопки - disabled = true/false (АН)
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    //buttonElement.classList.remove(config.activeButtonClass);
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    //buttonElement.classList.add(config.activeButtonClass);
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

 //Получаем список всех полей 
 function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

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

// Включение валидации вызовом enableValidation
// Все настройки передаются при вызове

enableValidation(validationConfig);