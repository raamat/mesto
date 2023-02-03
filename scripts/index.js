import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig, initialCards } from './constants.js';
export { zoomPhoto };

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

//Коллекция со всеми модальными окнами
const popupsList = document.querySelectorAll('.popup');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const cardsList = document.querySelector('.cards__list');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupInputPlace = document.querySelector('.popup__input_type_place');
const popupInputLink = document.querySelector('.popup__input_type_link');
const formAddCard = document.querySelector('.popup__form_type_add-card');

const popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');
const popupPhoto = popupZoomPhoto.querySelector('.popup__photo');
const popupPhotoCaption = popupZoomPhoto.querySelector('.popup__photo-caption');

/*********************************************** Функции ******************************************************/
/**************************************************************************************************************/

// Универсальная функция открытия модального окна - становится видимым модальное окно за счет добавления класса popup_opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
  
  // Добавляем слушатель событий для функции closePopupEsc, закрывающей модальное окно по нажатию на Esc
  document.addEventListener('keydown', closePopupEsc);
}

// Функция открытия модального окна редактирования профиля
function editProfile() {
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;

  openPopup(popupEditProfile);

  // Проверяем валидность полей после открытия формы и делаем кнопку "Сохранить" активной
  // setButtonState(popupEditProfile);

  // Удаляем стили и тексты ошибок, которые могут остаться после закрытия формы
  // clearInputError(popupEditProfile);
}

// Универсальная функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //Удаляем слушатель Esc
  document.removeEventListener('keydown', closePopupEsc);
}

// Сохранение данных из формы редактирования профиля
function submitEditProfileForm(event) {
  /*Если наше событие находится в переменной event, то для предотвращения поведения по умолчанию (отправлять данные самостоятельно) 
  мы можем вызвать event.preventDefault() https://doka.guide/js/deal-with-forms */
  event.preventDefault();

  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputJob.value;
  
  closePopup(popupEditProfile);
}

// Функция закрытия модального окна при нажатии Esc
function closePopupEsc(event) {
  if (event.key ==='Escape') {
    // Вызываем функцию closePopup для открытого модального окна, т.е. с модификатором 'popup_opened'
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Включение валидации форм
const formAddValidation = new FormValidator(validationConfig, formAddCard);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(validationConfig, formEditProfile);
formEditValidation.enableValidation();

/**************************************** Работа с карточками ***************************************/

// Создание одной карточки
function addCard(event) {
  event.preventDefault();
  const data = new Object;
  data.name = popupInputPlace.value;
  data.link = popupInputLink.value;
  
  const card = new Card(data, '#card-template');

  const cardElement = card.generateCard();

  cardsList.prepend(cardElement);
  
  closePopup(popupAddCard);
}

// Проходим по массиву initialCards с объектами и публикуем 6 карточек
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#card-template'); // передаём аргументами объект и селектор темплейта

  // Создаем карточку и возращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsList.append(cardElement);
})

// Функция открытия модального окна карточки - становится видимым модальное окно за счет добавления класса popup_opened
function openCardForm(event) {
  openPopup(popupAddCard);

  // Проверяем валидность полей при открытии формы
  // setButtonState(popupAddCard);

  // Удаляем стили и тексты ошибок
  // clearInputError(popupAddCard);
  
  // Очищаем поля ввода формы "Новое место"
  formAddCard.reset();
}

// Функция увеличения картинок
 
function zoomPhoto(src, caption) {
  popupPhoto.src = src;
  popupPhoto.alt = caption;

  popupPhotoCaption.textContent = caption;
  openPopup(popupZoomPhoto);
}

/**************************************************** Слушатели вне функций **************************************************/
/*****************************************************************************************************************************/

// Событие submit возникает, когда пользователь отправляет ВАЛИДНУЮ форму https://doka.guide/js/event-submit
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Слушатель события клик по кнопке "Редактировать"
profileEditButton.addEventListener('click', editProfile);

// В одном цикле подвешиваем два слушателя
popupsList.forEach((popup) => {
  // Подвешиваем слушатель события клик по кнопке "Закрыть" на каждое окно
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', () => {
    closePopup(popup);
  });
  
  // Подвешиваем слушатель клика по popup на каждый popup
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

// Слушатель события клик по кнопке "Добавить" карточку
profileAddButton.addEventListener('click', openCardForm);

// Слушатель события по кнопке "Создать" карточку
formAddCard.addEventListener('submit', addCard);

