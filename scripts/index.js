/********************************************* Переменные профиля и модальных окон *********************************/

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');

//Все модальные окна в одной переменной popup
const popup = document.querySelectorAll('.popup');

//Все кнопки закрытия модальных окон в одной переменной popupCloseButton
const popupCloseButton = document.querySelectorAll('.popup__close-button');

let popupFieldName = document.querySelector('.popup__field_type_name');
let popupFieldJob = document.querySelector('.popup__field_type_job');
const popupForm = document.querySelector('.popup__form');
const popupEditProfile =document.querySelector('.popup_type_edit-profile');

/********************************************* Переменные для карточек *********************************************/

//При загрузке на странице должно быть 6 карточек, которые добавит JavaScript из массива initialCards
const initialCards = [
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

const cardsList = document.querySelector('.cards__list');
const card = document.querySelector('.card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
let popupFieldPlace = document.querySelector('.popup__field_type_place');
let popupFieldLink = document.querySelector('.popup__field_type_link');
const popupCreateButton = document.querySelector('.popup__submit-button_type_create-card');
const popupFormAddCard = document.querySelector('.popup__form_type_add-card');

/*********************************************** Функции ******************************************************/
/**************************************************************************************************************/

//Функция открытия модального окна редактирования профиля - становится видимым модальное окно за счет добавления класса popup_opened
function profileEdit(event) {
  popupEditProfile.classList.add('popup_opened');
  popupFieldName.value = profileTitle.textContent;
  popupFieldJob.value = profileSubtitle.textContent;
}

//Функция закрытия модального окна
function popupClose(event) {
  //popup.classList.remove('popup_opened');
  popup.forEach(function(element) {
    element.classList.remove('popup_opened');
    console.log(element);
  })
}

//Сохранение данных из формы редактирования профиля
function saveForm(event) {
  /*Если наше событие находится в переменной event, то для предотвращения поведения по умолчанию (отправлять данные самостоятельно) 
  мы можем вызвать event.preventDefault() https://doka.guide/js/deal-with-forms */
  event.preventDefault();
  profileTitle.textContent = popupFieldName.value;
  profileSubtitle.textContent = popupFieldJob.value;
  popupClose();
}

/**************************************** Работа с карточками ***************************************/

//Функция создания карточки
function createCard(popupFieldPlace, popupFieldLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  //Получаем содержимое контейнера li - "лишки", класс card
  const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true);
  cardTemplateClone.querySelector('.card__title').textContent = popupFieldPlace; 
  cardTemplateClone.querySelector('.card__photo').src = popupFieldLink;
  cardTemplateClone.querySelector('.card__photo').alt = popupFieldPlace;

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
    zoomPhoto(cardTemplateClone);
  });

  return cardTemplateClone;
}

//Добавление 6 картинок с подписями, для этого запускаем цикл по массиву initialCards
initialCards.forEach(function(element) {
  cardsList.append(createCard(element.name, element.link));
})

//Функция открытия модального окна карточки - становится видимым модальное окно за счет добавления класса popup_opened
function cardFormOpened(event) {
  popupAddCard.classList.add('popup_opened');
}

//Функция добавления одной карточки
function cardAdd(event) {
  event.preventDefault();
  popupFieldPlace = document.querySelector('.popup__field_type_place').value;
  popupFieldLink = document.querySelector('.popup__field_type_link').value;
  
  cardsList.prepend(createCard(popupFieldPlace, popupFieldLink));
  popupClose();
}

//Функция увеличения картинок
function zoomPhoto(template) {
  document.querySelector('.popup_type_zoom-photo').classList.add('popup_opened');
  document.querySelector('.popup__photo').src = template.querySelector('.card__photo').src;
  document.querySelector('.popup__photo-caption').textContent = template.querySelector('.card__caption').textContent;
}

/**************************************************** Слушатели вне функций **************************************************/
/*****************************************************************************************************************************/

//Событие submit возникает, когда пользователь отправляет ВАЛИДНУЮ форму https://doka.guide/js/event-submit
popupForm.addEventListener('submit', saveForm);

//Слушатель события клик по кнопке "Редактировать"
profileEditButton.addEventListener('click', profileEdit);

//Cлушатель события клик по кнопке "Закрыть"*/
popupCloseButton.forEach((element) => {
  element.addEventListener('click', popupClose);
}) 

//Слушатель события клик по кнопке "Добавить" карточку
profileAddButton.addEventListener('click', cardFormOpened);

//Слушатель события по кнопке "Создать" карточку
popupFormAddCard.addEventListener('submit', cardAdd);