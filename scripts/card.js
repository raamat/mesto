const popupCloseButton = document.querySelector('.popup__close-button');

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
  
  _handleOpenPopup() {
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupPhotoCaption.textContent = this._name;

    popupZoomPhoto.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupPhoto.src = '';
    popupZoomPhoto.classList.remove('popup_opened');    
  }

  /***************** Все обработчики в одном месте *****************/
  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    })
    
    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    })

    //Слушатель события клик по кнопке "Добавить" карточку
    profileAddButton.addEventListener('click', openCardForm);

  
  }
  
  like() {
    this.isLiked = !this.isLiked;
  }
}

// Метод созадния одной карточки
function addCard(event) {
  event.preventDefault();
  const data = new Object;
  data.name = popupInputPlace.value;
  data.link = popupInputLink.value;
  
  const card = new Card(data, '#card-template');

  const cardElement = card.generateCard();

  document.querySelector('.cards__list').prepend(cardElement);
  
  closePopup(popupAddCard);
}

//Слушатель события по кнопке "Создать" карточку
formAddCard.addEventListener('submit', addCard);

// Проходим по массиву initialCards с объектами и публикуем 6 карточек
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#card-template'); // передаём аргументами объект и селектор темплейта

  // Создаем карточку и возращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.cards__list').append(cardElement);
})