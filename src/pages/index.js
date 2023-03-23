import { 
  profileTitle,
  profileSubtitle,
  profileEditButton,
  popupInputName,
  popupInputJob,
  formEditProfile,
  popupEditProfile,
  cardsList,
  profileAddButton,
  formAddCard,
  validationConfig, 
  initialCards } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

//import './index.css';


/*********************************************** Функции ******************************************************/
/**************************************************************************************************************/

// Универсальная функция открытия модального окна - становится видимым модальное окно за счет добавления класса popup_opened
/*
function openPopup(popup) {
  popup.classList.add('popup_opened');
  
  // Добавляем слушатель событий для функции closePopupEsc, закрывающей модальное окно по нажатию на Esc
  document.addEventListener('keydown', closePopupEsc);
}

*/

// Функция открытия модального окна редактирования профиля
/* 13.03.2023
function editProfile() {
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;

  openPopup(popupEditProfile);

  // Очищаем поля ввода от ошибок
  formEditValidation.hideInputError(popupInputName);
  formEditValidation.hideInputError(popupInputJob);
}
*/
// Универсальная функция закрытия модального окна
/* 01.03.2023
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  //Удаляем слушатель Esc
  document.removeEventListener('keydown', closePopupEsc);
}
*/

// Сохранение данных из формы редактирования профиля

function submitEditProfileForm(event) {
  //Если наше событие находится в переменной event, то для предотвращения поведения по умолчанию (отправлять данные самостоятельно) 
  //мы можем вызвать event.preventDefault() https://doka.guide/js/deal-with-forms
  event.preventDefault();

  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputJob.value;
  
  closePopup(popupEditProfile);
}

// Функция закрытия модального окна при нажатии Esc
/* 01.03.2023
function closePopupEsc(event) {
  if (event.key ==='Escape') {
    // Вызываем функцию closePopup для открытого модального окна, т.е. с модификатором 'popup_opened'
    closePopup(document.querySelector('.popup_opened'));
  }
}
*/
// Включение валидации форм
const formAddValidation = new FormValidator(validationConfig, formAddCard);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(validationConfig, formEditProfile);
formEditValidation.enableValidation();

/**************************************** Работа с карточками ***************************************/

// Функция создания карточки
function createCard(obj, template) {
  const card = new Card(obj, template, (link, name) => {
    openPhoto.open(link, name);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление карточки в DOM
/* 13.03.2023
function addCard(event) {
  event.preventDefault();
  const data = new Object;
  data.name = popupInputPlace.value;
  data.link = popupInputLink.value;
  
  cardsList.prepend(createCard(data, '#card-template'));

  closePopup(popupAddCard);
}
*/
// Проходим по массиву initialCards с объектами и публикуем 6 карточек
initialCards.forEach((item) => {
  // Добавляем в DOM элемент массива
  cardsList.append(createCard(item, '#card-template'));
})

// Функция открытия модального окна карточки - становится видимым модальное окно за счет добавления класса popup_opened
/*
function openCardForm() {
  openPopup(popupAddCard);
  
  // Очищаем поля ввода от ошибок
  formAddValidation.hideInputError(popupInputPlace);
  formAddValidation.hideInputError(popupInputLink);
  
  // Очищаем поля ввода формы "Новое место"
  formAddCard.reset();
}
*/
// Функция увеличения картинок
/* 02.03.2023
function zoomPhoto(src, caption) {
  popupPhoto.src = src;
  popupPhoto.alt = caption;

  popupPhotoCaption.textContent = caption;
  openPopup(popupZoomPhoto);
}
*/
/**************************************************** Слушатели вне функций **************************************************/
/*****************************************************************************************************************************/

// Событие submit возникает, когда пользователь отправляет ВАЛИДНУЮ форму https://doka.guide/js/event-submit
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Слушатель события клик по кнопке "Редактировать"
//profileEditButton.addEventListener('click', editProfile);

// Подвешиваем слушатели клика по popup и на крестик на каждый popup
/*
popupsList.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});
*/
// Слушатель события клик по кнопке "Добавить" карточку
//profileAddButton.addEventListener('click', openCardForm);

// Слушатель события по кнопке "Создать" карточку
//formAddCard.addEventListener('submit', addCard);

/*********************** класс Popup ***********************/
const openProfile = new Popup('.popup_type_edit-profile');
const openAdd = new Popup('.popup_type_add-card');
const openPhoto = new PopupWithImage('.popup_type_zoom-photo');
const profileInfo = new UserInfo({
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
});

console.log(profileInfo._profileTitle)
console.log(profileInfo._profileSubtitle)
profileInfo.getUserInfo()

// Слушатель события клик по кнопке "Редактировать"
profileEditButton.addEventListener('click', () => {openProfile.open()});

// Слушатель события клик по кнопке "Добавить" карточку
profileAddButton.addEventListener('click', () => {openAdd.open()});
