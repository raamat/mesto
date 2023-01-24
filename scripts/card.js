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

    // Добавим данные
    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
  
  /*
  _handleOpenPopup() {
    popupPhoto.crs = this._link;
    popupZoomPhoto.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupPhoto.crs = '';
    popupZoomPhoto.classList.remove('popup_opened');    
  }

  // Все обработчики в одном месте
  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();  
    })
    
    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    })
  }
  */
  
  like() {
    this.isLiked = !this.isLiked;
  }
}

// Проходим по массиву initialCards с объектами и публикуем 6 карточек
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#card-template'); // передаём аргументами объект и селектор темплейта

  // Создаем карточку и возращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.cards__list').append(cardElement);
})