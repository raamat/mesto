import { zoomPhoto } from "./index.js";

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

  //Чтобы разгрузить generateCard(), перенёс заполнение карточки данными в отдельную функцию
  _setData() {
    const cardPhoto = this._element.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
  }

  /* Публичный метод вставит данные в разметку и подготовит карточку к публикации
  (вернет карточку с заполнеными данными) */
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Заполняем разметку данными
    this._setData();

    //Добавляем вызов _setEventListeners, чтобы метод создал карточки уже со всеми обработчиками
    this._setEventListeners();

    //Возвращаем готовую к публикации карточку
    return this._element;
  }
  
  /***************** Все обработчики в одном месте *****************/
  _setEventListeners() {

    // Слушатель увеличения картинки
    this._element.querySelector('.card__photo').addEventListener('click', () => {
      //this._handleOpenPopupZoom();
      zoomPhoto(this._link, this._name);
    })
   
    // Удаление карточки
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._element.remove();
    });

    // Лайки
    this._element.querySelector('.card__like-button').addEventListener('click', (event) => {
      event.target.classList.toggle('card__like-button_active');
    });
  }
  
}

export default Card;