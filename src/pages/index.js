import { 
  profileEditButton,
  popupInputName,
  popupInputJob,
  formEditProfile,
  profileAddButton,
  formAddCard,
  validationConfig, 
  initialCards } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
/**
 * Функция создания карточки
 * @param {{ link:string, name:string }} obj 
 * @returns {HTMLElement}
 */
function createCard(obj) {
  const card = new Card(obj, '#card-template', (link, name) => {
    showPopupPhoto.open(link, name);
  });
  const cardElement = card.generateCard();
  return cardElement;
}


// Класс `Section` который отвечает за отрисовку элементов на странице
const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      // инструкция по работе с Card, либо другая
      cardsList.addItem(createCard(cardItem));
    }
  },
  '.cards__list'
)
// Вызываем метод чтобы пройти по массиву и отрисовать 6 карточек
cardsList.renderItems();


// Создание попапа с картинкой
const showPopupPhoto = new PopupWithImage('.popup_type_zoom-photo');
const profileUserInfo = new UserInfo({
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
});


// Включаем валидацию форм - вызываем публичный метод enableValidation
const formAddValidation = new FormValidator(validationConfig, formAddCard);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(validationConfig, formEditProfile);
formEditValidation.enableValidation();


// Сохранение данных из формы редактирования профиля
/**
 * В обработчик в качестве аргрумента передаем объект с полями формы
 * @param {{ name: string, job: string }} inputValues;
 */
function handleFormEditSubmit(inputValues) {
  //11.04.2023
  //profileTitle.textContent = popupInputName.value;
  //profileSubtitle.textContent = popupInputJob.value;
  profileUserInfo.setUserInfo(inputValues);
  
  //11.04.2023
  //closePopup(popupEditProfile);
  showPopupProfile.close();
}

const showPopupProfile = new PopupWithForm('.popup_type_edit-profile', handleFormEditSubmit);

// Слушатель события клик по кнопке "Редактировать"
profileEditButton.addEventListener('click', () => {
  showPopupProfile.open();
  // Получаем объект с полями name и job
  const inputs = profileUserInfo.getUserInfo();
  //console.log(inputs);
  // Вставляем значения в инпуты формы
  popupInputName.value = inputs.name;
  popupInputJob.value = inputs.job;
});


/**
 * В обработчик в качестве аргрумента передаем объект с полями формы
 * @param {{ place: string, link: string }} inputValues;
 */
function handleFormAddCardSubmit({link, place}) {
  cardsList.addItem(createCard({ name: place, link }), true);
  showPopupCard.close();
}

/****************************** Добавление карточки *******************************/
const showPopupCard = new PopupWithForm('.popup_type_add-card', handleFormAddCardSubmit);

// Слушатель события клик по кнопке "Добавить" карточку
profileAddButton.addEventListener('click', () => {showPopupCard.open()});





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

// Функция закрытия модального окна при нажатии Esc
/* 01.03.2023
function closePopupEsc(event) {
  if (event.key ==='Escape') {
    // Вызываем функцию closePopup для открытого модального окна, т.е. с модификатором 'popup_opened'
    closePopup(document.querySelector('.popup_opened'));
  }
}
*/
// 1) Создаем экземпляры классов для каждой формы
// 2) Включаем валидацию форм - вызываем публичный метод enableValidation()


/**************************************** Работа с карточками ***************************************/



//cardList.addItem(createCard(initialCards, '#card-template'))

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
//initialCards.forEach((item) => {
  // Добавляем в DOM элемент массива
  //15.04.2023
  //cardsListElement.append(createCard(item, '#card-template'));
  //cardList.addItem(createCard(item, ))
//})

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
//Слушатель события клик по кнопке "Добавить" карточку
//profileAddButton.addEventListener('click', openCardForm);

// Слушатель события по кнопке "Создать" карточку
//formAddCard.addEventListener('submit', addCard);

/*********************** класс Popup ***********************/

//const showPopupCard = new Popup('.popup_type_add-card');


/************************ Попапы с формой **************************/
/*******************************************************************/
