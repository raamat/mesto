class Card {
  //Подготовка класса к масштабированию
  //Передаем данные в конструктор в види объекта
  constructor(data) {
    this._link = data.link;
    this._name = data.name;
  }

  /* Метод для получения для получения разметки:
  1) найдёт template-элемент с id card-template,
  2) извлечёт его содержимое,
  3) в содержимом найдёт элемент с классом card,
  4) клонирует его,
  5) вернёт клонированный элемент. */
  _getTemplate() {
    const cardElement = document
    .querySelector('#card-template')
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

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item); // передаём объект аргументом

  // Создаем карточку и возращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.cards__list').append(cardElement);
})

console.log(popupPhoto)