import { 
  profileEditButton,
  popupInputName,
  popupInputJob,
  formEditProfile,
  profileAddButton,
  formAddCard,
  validationConfig } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import './index.css';

/**
 * Функция создания карточки
 * @param {{ link:string, name:string }} obj 
 * @returns {HTMLElement}
 */
function createCard(obj) {
  const card = new Card(obj, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(link, name) {
  showPopupPhoto.open(link, name); 
}

// Класс `Section` который отвечает за отрисовку элементов на странице
const cardsList = new Section({
    renderer: (cardItem) => {
      // инструкция по работе с Card, либо другая
      cardsList.addItem(createCard(cardItem));
    }
  },
  '.cards__list'
)

/************************************************************** */
// Пробная функция для получения карточек с сервера
function getCardsServer() {
  fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
    headers: {
      authorization: '0bc141f1-6053-416b-8022-646082ea4528'
    }
  })
    .then(res => res.json())
    .then((arrayCards) => {
      cardsList.renderItems(arrayCards);
    }); 
}


// Вызываем функцию чтобы пройти по массиву и отрисовать 6 карточек
//cardsList.renderItems(initialCards);
//getCardsServer();


// Пробная функция Загрузка информации о пользователе с сервера
function getUserServer() {
  fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
    headers: {
      authorization: '0bc141f1-6053-416b-8022-646082ea4528'
    }
  })
    .then(res => res.json())
    .then((userInfo) => {
      document.querySelector('.profile__title').textContent = userInfo.name;
      document.querySelector('.profile__subtitle').textContent = userInfo.about;
      document.querySelector('.profile__avatar').src = userInfo.avatar;
      document.querySelector('.profile__avatar').alt = userInfo.name;
    }); 
}

// Вызываем функцию
//getUserServer();

/*****************************************************************/

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
  // Подставляем данные пользователя из объекта inputValues в форму
  profileUserInfo.setUserInfo(inputValues);
  showPopupProfile.close();
}

const showPopupProfile = new PopupWithForm('.popup_type_edit-profile', handleFormEditSubmit);

// Слушатель события клик по кнопке "Редактировать"
profileEditButton.addEventListener('click', handleProfileEditButtonClick);

function handleProfileEditButtonClick() {
  // Очищаем поля ввода от ошибок
  formEditValidation.clearInputsErrors();
  // Открываем попап
  showPopupProfile.open();
  // Получаем объект с полями name и job
  const inputs = profileUserInfo.getUserInfo();
  // Вставляем значения в инпуты формы
  popupInputName.value = inputs.name;
  popupInputJob.value = inputs.job;
}

/****************************** Добавление карточки *******************************/
/**
 * В обработчик в качестве аргрумента передаем объект с полями формы
 * @param {{ place: string, link: string }} inputValues;
 */
function handleFormAddCardSubmit({link, place}) {
  cardsList.addItem(createCard({ name: place, link }), true);
  showPopupCard.close();
}

const showPopupCard = new PopupWithForm('.popup_type_add-card', handleFormAddCardSubmit);

// Слушатель события клик по кнопке "Добавить" карточку
profileAddButton.addEventListener('click', handleProfileAddButtonClick);

function handleProfileAddButtonClick() {
  // Очищаем поля ввода от ошибок
  formAddValidation.clearInputsErrors();
  showPopupCard.open();  
}

/*********************************************************************************/

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '0bc141f1-6053-416b-8022-646082ea4528',
    'Content-Type': 'application/json'
  }
});

// Выдергиваем из промиса массив с карточками и публикуем методом 
// renderItems класса Section
api.getInitialCards()
  .then(initialCards => cardsList.renderItems(initialCards))
  .catch(err => console.log(err));

// Получаем с сервера информацию о пользователе и добавляем ее в DOM
// Используем метод setUserInfo класса Userinfo
api.getUserInfoServer()
  .then(userInfoServer => profileUserInfo.setUserInfo(userInfoServer))
  .catch(err => console.log(err));

