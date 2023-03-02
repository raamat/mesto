//import { zoomPhoto } from '../pages/index.js';
//02.03.2023
import PopupWithImage from './PopupWithImage.js';

class Card {
  /* Подготовка класса к масштабированию:
  1) передаем данные в конструктор в виде объекта
  2) делаем селектор частью конструктора класса - класс станет универсальным: 
  он научится создавать карточки в разных стилях в зависимости от модификатора */
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector; // записали селектор в приватное поле
    //02.03.2023
    this._zoomPhoto = new PopupWithImage('.popup_type_zoom-photo');
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

  // Заполнение карточки данными
  _setData() {
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
  }

  /* Публичный метод вставит данные в разметку и подготовит карточку к публикации
  (вернет карточку с заполнеными данными) */
  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Чтобы каждый раз не выполнять поиск изображения, находим его и сохраняем в свойство класса (ПЖ)
    this._cardPhoto = this._element.querySelector('.card__photo');

    // Чтобы каждый раз не выполнять поиск кнопки лайка и не дублировать код, находим ее и сохранить в свойство класса (ПЖ)
    this._buttonLike = this._element.querySelector('.card__like-button');

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
  }

  // Функция-обработчик переключение состояния кнопки "Лайк"
  _handleLike = () => {
    this._buttonLike.classList.toggle('card__like-button_active');
  }
  
  /***************** Все обработчики в одном месте *****************/
  _setEventListeners() {

    // Слушатель увеличения картинки
    this._cardPhoto.addEventListener('click', () => {
      //zoomPhoto(this._link, this._name);
      //02.03.2023
      console.log('Прощел щелчок по картинке');
      this._zoomPhoto.open(this._link, this._name);
    })
   
    // Удаление карточки
    this._element.querySelector('.card__delete-button').addEventListener('click', this._handleDelete);

    // Слушатель лайков
    this._buttonLike.addEventListener('click', this._handleLike);
  }
}

export default Card;