export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputJob = document.querySelector('.popup__input_type_job');
export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const cardsList = document.querySelector('.cards__list');
export const profileAddButton = document.querySelector('.profile__add-button');
export const formAddCard = document.querySelector('.popup__form_type_add-card');

//const popupsList = document.querySelectorAll('.popup');
//const popupAddCard = document.querySelector('.popup_type_add-card');
//const popupInputPlace = document.querySelector('.popup__input_type_place');
//const popupInputLink = document.querySelector('.popup__input_type_link');
//const popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');
//const popupPhoto = popupZoomPhoto.querySelector('.popup__photo');
//const popupPhotoCaption = popupZoomPhoto.querySelector('.popup__photo-caption');

//Объект с конфигом валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
 };

//При загрузке на странице должно быть 6 карточек, которые добавит JavaScript из массива initialCards
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];