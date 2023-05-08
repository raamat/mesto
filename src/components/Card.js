class Card {
  /* Подготовка класса к масштабированию 
  (Спринт 8/14 → Тема 3/8: ООП в интерфейсах → Урок 4/8)
  (Дополнительный вебинар по ООП - Вячевлав Гуськов)
  1) передаем данные в конструктор в виде объекта
  2) делаем селектор частью конструктора класса - класс станет универсальным: 
  он научится создавать карточки в разных стилях в зависимости от модификатора */
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick, userId }, cardTemplateSelector) {
    // Достаем из объекта link и name и сохраняем в отдельные переменные
    this._data = data;
        
    this._cardTemplateSelector = cardTemplateSelector; // записали селектор в приватное поле
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._userId = userId;
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
    this._cardPhoto.src = this._data.link;
    this._cardPhoto.alt = this._data.name;
    this._element.querySelector('.card__title').textContent = this._data.name;
  }

  _setRemove(is) {
    this._element.querySelector('.card__delete-button').style.display = is ? 'block' : 'none';
  }
  _searchLikes() {
    return (
      this._data.likes.find((like) => like._id === this._userId) !== undefined
    );
  }
  // Функция-обработчик переключение состояния кнопки "Лайк"
  setLike(is) {
    is
    ? this._likeButton.classList.add('card__like-button_active')
    : this._likeButton.classList.remove('card__like-button_active');
    this._isLiked = is;
  }
    // Функция-обработчик переключение состояния кнопки "Лайк"
    setLikeCount(count) {
      this._element.querySelector('.card__like-count').textContent = count;
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

    // Добавляем вызов _setEventListeners, чтобы метод создал карточки уже со всеми обработчиками
    this._setEventListeners();

    // Скрываем корзину у чужих карточек
    this._setRemove (this._userId === this._data.owner._id);
    this.setLike (this._searchLikes());

    this.setLikeCount(this._data.likes.length);

    //Возвращаем готовую к публикации карточку
    return this._element;
  }
  
  // Функция-обработчик удаления карточки
  delete = () => {
    this._element.remove();
    // Выше элемент удален, но ссылка на него висит в памяти
    // Лучше всего при удалении карточки очистить ссылку на DOM-элемент (ревью 1 ПР8)
    this._element = null;
  }

  
  
  /***************** Все слушатели в одном месте *****************/
  _setEventListeners() {

    // Слушатель увеличения картинки
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._data.link, this._data.name);
    })
   
    // Слушатель удаления карточки
    //this._element.querySelector('.card__delete-button').addEventListener('click', this._handleDelete);
    //06.05.2023
    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDeleteIconClick(this._data._id));

    // Слушатель лайков
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._data._id, this._isLiked));
  }
}

export default Card;