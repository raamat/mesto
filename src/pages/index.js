import {
  profileAvatar, 
  profileEditAvatarButton,
  formAvatar,
  popupInputLinkAvatar,
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

//const formAvatarValidation = new FormValidator(validationConfig, formAvatar);
//formAvatarValidation.enableValidation();




const showPopupAvatar = new PopupWithForm('.popup_type_edit-avatar', handleFormEditAvatarSubmit);

function handleFormEditAvatarSubmit() {
  api.updateAvatarServer(popupInputLinkAvatar.value)
    .then(res => {
      updateAvatar(res.avatar);
      showPopupAvatar.close();
    })
}

// Слушаетель кнопки "Редактировать аватар"
profileEditAvatarButton.addEventListener('click', handleProfileAvatarButtonClick)

function handleProfileAvatarButtonClick() {
  // Очищаем поля ввода от ошибок
  //formAvatarValidation.clearInputsErrors();
  // Открываем попап
  showPopupAvatar.open();
}





// Сохранение данных из формы редактирования профиля
/**
 * В обработчик в качестве аргрумента передаем объект с полями формы
 * @param {{ name: string, job: string }} inputValues;
 */
function handleFormEditSubmit(inputValues) {
  // Подставляем данные пользователя из объекта inputValues в форму
  //profileUserInfo.setUserInfo(inputValues);
  api.setUserInfoServer(inputValues)
    // При ОК публикуем изменения в профиль, чтобы отображались без перезагрузки страницы
    .then(data => profileUserInfo.setUserInfo(data));
  showPopupProfile.close();
}

const showPopupProfile = new PopupWithForm('.popup_type_edit-profile', handleFormEditSubmit);

// Слушатель события клик по кнопке "Редактировать профиль"
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
function handleFormAddCardSubmit({ link, place }) {
  //cardsList.addItem(createCard({ name: place, link }), true);
  //01.05.2023
  api.setCardServer({ name: place, link })
    // После того как карточка удачно улетит на сервер (status 200),
    // публикуем карточку в DOM, чтобы она отображалась без перезагрузки страницы
    .then(data => {
      cardsList.addItem(createCard(data), true);
      // Закрываем форму только после того, как карточка успешно добавлена
      showPopupCard.close();
    })
    //.catch()
    //showPopupCard.close();
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

// Получаем с сервера и публикуем аватар
//api.getAvatarServer()

// Выдергиваем из промиса массив с карточками и публикуем методом 
// renderItems класса Section
api.getInitialCards()
  .then(initialCards => cardsList.renderItems(initialCards))
  .catch(err => console.log(err));

// Получаем с сервера информацию о пользователе (имя, род деятельности, аватар, alt) 
// и добавляем ее в DOM
api.getUserInfoServer()
  .then(userInfoServer => {
    profileUserInfo.setUserInfo(userInfoServer);
    updateAvatar(userInfoServer.avatar);
    profileAvatar.alt = userInfoServer.name;
  })
  .catch(err => console.log(err));

function updateAvatar(link) {
  profileAvatar.src = link;
}

//api.deleteCardServer('64501ce8ab818800859e80fc')

//console.log(api.getListCards())

//console.log(api._options.headers)

//api.updateAvatarServer('https://www.peremeny.ru/blog/wp-content/uploads/2010/06/cousteau_jacques2.jpg')