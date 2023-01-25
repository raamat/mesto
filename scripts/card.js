const popupCloseButton = document.querySelector('.popup__close-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');
const popupPhoto = popupZoomPhoto.querySelector('.popup__photo');
const popupPhotoCaption = popupZoomPhoto.querySelector('.popup__photo-caption');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');

class Card {
  /* Подготовка класса к масштабированию:
  1) передаем данные в конструктор в виде объекта
  2) делаем селектор частью конструктора класса - класс станет универсальным: 
  он научится создавать карточки в разных стилях в зависимости от модификатора */
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector; // записали селектор в приватное поле
  }

  /* Метод для получения разметки:
  1) найдёт template-элемент,
  2) извлечёт его содержимое,
  3) в содержимом найдёт элемент с классом card,
  4) клонирует его,
  5) вернёт клонированный элемент. */
  _getTemplate() {
    // Метод универсальный, поэтому вместо id конкретного шаблона ('#card-template'), используем this._templateSelector
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return(cardElement);
  }

  // Метод вставит данные в разметку и подготовит карточку к публикации
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    //Добавляем вызов _setEventListeners, чтобы метод создал карточки уже с обработчиком
    this._setEventListeners();

    // Добавим данные
    const cardPhoto = this._element.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
  
  _handleOpenPopupZoom() {
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupPhotoCaption.textContent = this._name;

    popupZoomPhoto.classList.add('popup_opened');
  }

  _handleClosePopupZoom() {
    popupPhoto.src = '';
    popupZoomPhoto.classList.remove('popup_opened');    
  }

  _handleOpenPopupAdd() {
    popupAddCard.classList.add('popup_opened');

    //Очищаем поля ввода формы "Новое место"
    formAddCard.reset();
  }  

  /***************** Все обработчики в одном месте *****************/
  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopupZoom();
    })
    
    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopupZoom();
    })

    //Слушатель события клик по кнопке "Добавить" карточку
    profileAddButton.addEventListener('click', () => {
      this._handleOpenPopupAdd();
    });

    //Удаление карточки
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
    this._element.remove();
    });

    //Лайки
    this._element.querySelector('.card__like-button').addEventListener('click', (event) => {
      event.target.classList.toggle('card__like-button_active');
    });
  }
  
}

export default Card;