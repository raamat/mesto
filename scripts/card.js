class Card {
  constructor(link, name) {
    this._link = link;
    this._name = name;
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

  like() {
    this.isLiked = !this.isLiked;
  }
}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.link, item.name);

  // Создаем карточку и возращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.cards__list').append(cardElement);
})