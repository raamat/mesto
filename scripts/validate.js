const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__fild',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
 };

 console.log(validationConfig.formSelector);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//enableValidation(validationConfig);