// Попап для подтверждения действия
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._prevButtonText = this._submitButton.textContent;
  }

  // Метод изменения текста кнопки при загрузке
  setLoading(is) {
    this._submitButton.textContent = is ? 'Сохранение...' : this._prevButtonText;
  } 
  updateSubmitHandler(handleOk) {
    this._handleFormSubmit = handleOk;
  }

 // Перезаписываем родительский метод setEventListeners. 
  // Метод setEventListeners класса PopupWithConfirmation должен не только добавлять 
  // обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    }) 
  }
}  