const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

//Коллекция со всеми модальными окнами
const popupsList = document.querySelectorAll('.popup');

let popupFieldName = document.querySelector('.popup__field_type_name');
let popupFieldJob = document.querySelector('.popup__field_type_job');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
let popupFieldPlace = document.querySelector('.popup__field_type_place');
let popupFieldLink = document.querySelector('.popup__field_type_link');
const formAddCard = document.querySelector('.popup__form_type_add-card');

const popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');
const popupPhoto = popupZoomPhoto.querySelector('.popup__photo');
const popupPhotoCaption = popupZoomPhoto.querySelector('.popup__photo-caption');

/*********************************************** Функции ******************************************************/
/**************************************************************************************************************/

//Универсальная функция открытия модального окна - становится видимым модальное окно за счет добавления класса popup_opened
function openPopup(popup) {
  popup.classList.add('popup_opened');
}  

//Функция открытия модального окна редактирования профиля
function editProfile() {
  popupFieldName.value = profileTitle.textContent;
  popupFieldJob.value = profileSubtitle.textContent;

  openPopup(popupEditProfile);
}

//Универсальная функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Сохранение данных из формы редактирования профиля
function submitEditProfileForm(event) {
  /*Если наше событие находится в переменной event, то для предотвращения поведения по умолчанию (отправлять данные самостоятельно) 
  мы можем вызвать event.preventDefault() https://doka.guide/js/deal-with-forms */
  event.preventDefault();

  profileTitle.textContent = popupFieldName.value;
  profileSubtitle.textContent = popupFieldJob.value;
  
  closePopup(popupEditProfile);
}

/**************************************** Работа с карточками ***************************************/

//Функция создания карточки
function createCard(popupFieldPlace, popupFieldLink) {
  //Ниже получаем содержимое контейнера li - "лишки", класс card
  const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true);

  const cardPhoto = cardTemplateClone.querySelector('.card__photo');
  cardTemplateClone.querySelector('.card__title').textContent = popupFieldPlace; 
  cardPhoto.src = popupFieldLink;
  cardPhoto.alt = popupFieldPlace;

  //Удаление карточки
  cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', () => {
    cardTemplateClone.remove();
});

  //Лайки
  cardTemplateClone.querySelector('.card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_active');
  })
   
  //Слушатель увеличения картинки
  cardTemplateClone.querySelector('.card__photo').addEventListener('click', () => {
    zoomPhoto(popupFieldLink, popupFieldPlace);
  });

  return cardTemplateClone;
}

//Добавление 6 картинок с подписями, для этого запускаем цикл по массиву initialCards
initialCards.forEach(function(element) {
  cardsList.append(createCard(element.name, element.link));
})

//Функция открытия модального окна карточки - становится видимым модальное окно за счет добавления класса popup_opened
function openCardForm(event) {
  openPopup(popupAddCard);
}

//Функция добавления одной карточки
function addCard(event) {
  event.preventDefault();

  const placeName = popupFieldPlace.value;
  const placeLink = popupFieldLink.value;

  cardsList.prepend(createCard(placeName, placeLink));

 //Очистка полей ввода
  formAddCard.reset();

  closePopup(popupAddCard);
}

//Функция увеличения картинок
function zoomPhoto(src, caption) {
  popupPhoto.src = src;
  popupPhoto.alt = caption;

  popupPhotoCaption.textContent = caption;

  openPopup(popupZoomPhoto);
}

/**************************************************** Слушатели вне функций **************************************************/
/*****************************************************************************************************************************/

//Событие submit возникает, когда пользователь отправляет ВАЛИДНУЮ форму https://doka.guide/js/event-submit
formEditProfile.addEventListener('submit', submitEditProfileForm);

//Слушатель события клик по кнопке "Редактировать"
profileEditButton.addEventListener('click', editProfile);

//Подвешиваем слушатель события клик по кнопке "Закрыть" на каждое окно
popupsList.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
});

//Слушатель события клик по кнопке "Добавить" карточку
profileAddButton.addEventListener('click', openCardForm);

//Слушатель события по кнопке "Создать" карточку
formAddCard.addEventListener('submit', addCard);