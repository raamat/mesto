class Card {
  /* Подготовка класса к масштабированию 
  (Спринт 8/14 → Тема 3/8: ООП в интерфейсах → Урок 4/8)
  (Дополнительный вебинар по ООП - Вячевлав Гуськов)
  1) передаем данные в конструктор в виде объекта
  2) делаем селектор частью конструктора класса - класс станет универсальным: 
  он научится создавать карточки в разных стилях в зависимости от модификатора */
  constructor(data, cardTemplateSelector, handleCardClick) {
    // Достаем из объекта link и name и сохраняем в отдельные переменные
    this._link = data.link;
    this._name = data.name;
    this._cardTemplateSelector = cardTemplateSelector; // записали селектор в приватное поле
    this._handleCardClick = handleCardClick;
  }

  /* Метод для получения разметки из HTML:
  1) найдёт template-элемент,
  2) извлечёт его содержимое,
  3) в содержимом найдёт элемент с классом card,
  4) клонирует его,
  5) вернёт клонированный элемент. */
  _getTemplate() {
    // Метод универсальный, поэтому вместо id конкретного шаблона ('#card-template'), 
    // используем this._templateSelector
    // Метод приватный, т.к. работает (вызывается) только внутри класса Card
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return(cardElement);
  }

  // Заполнение карточки данными
  _setData() {
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
  }

  /* Публичный метод вставит данные в разметку и подготовит карточку к публикации
  (вернет карточку с заполнеными данными)
  Метод пубичный, т.к. мы его будем использовать в index.js */
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Чтобы каждый раз не выполнять поиск изображения, находим его и сохраняем в свойство класса (ПЖ)
    this._cardPhoto = this._element.querySelector('.card__photo');

    // Чтобы каждый раз не выполнять поиск кнопки лайка и не дублировать код, находим ее и сохранить в свойство класса (ПЖ)
    this._likeButton = this._element.querySelector('.card__like-button');

    // Заполняем разметку данными
    this._setData();

    //Добавляем вызов _setEventListeners, чтобы метод создал карточки уже со всеми обработчиками
    this._setEventListeners();

    //Возвращаем готовую к публикации карточку
    return this._element;
  }
  
  // Функция-обработчик удаления карточки
  _handleDelete = () => {
    this._element.remove();
    // Выше элемент удален, но ссылка на него висит в памяти
    // Лучше всего при удалении карточки очистить ссылку на DOM-элемент (ревью 1 ПР8)
    this._element = null;
  }

  // Функция-обработчик переключение состояния кнопки "Лайк"
  _handleLike = () => {
    this._likeButton.classList.toggle('card__like-button_active');
  }
  
  /***************** Все слушатели в одном месте *****************/
  _setEventListeners() {

    // Слушатель увеличения картинки
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    })
   
    // Слушатель удаления карточки
    this._element.querySelector('.card__delete-button').addEventListener('click', this._handleDelete);

    // Слушатель лайков
    this._likeButton.addEventListener('click', this._handleLike);
  }
}

export default Card;