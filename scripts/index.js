let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
//Все модальные окна в одной переменной popup
const popup = document.querySelectorAll('.popup');
let popupFieldName = document.querySelector('.popup__field_type_name');
let popupFieldJob = document.querySelector('.popup__field_type_job');
//Все кнопки закрытия модальных окон в одной переменной popupCloseButton
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupEditProfile =document.querySelector('.popup_type_edit-profile');

/*Функция открытия модального окна - становится видимым модальное окно за счет добавления класса popup_opened*/
function profileEdit(event) {
  popupEditProfile.classList.add('popup_opened');
  popupFieldName.value = profileTitle.textContent;
  popupFieldJob.value = profileSubtitle.textContent;
}

/*Функция закрытия модального окна*/
function popupClose(event) {
  //popup.classList.remove('popup_opened');
  popup.forEach(function(element) {
    element.classList.remove('popup_opened');
    console.log(element);
  })
}

/*Сохранение данных из формы*/
function saveForm(event) {
  /*Если наше событие находится в переменной event, то для предотвращения поведения по умолчанию (отправлять данные самостоятельно) 
  мы можем вызвать event.preventDefault() https://doka.guide/js/deal-with-forms */
  event.preventDefault();
  profileTitle.textContent = popupFieldName.value;
  profileSubtitle.textContent = popupFieldJob.value;
  popupClose();
}

/*Событие submit возникает, когда пользователь отправляет ВАЛИДНУЮ форму https://doka.guide/js/event-submit */
popupForm.addEventListener('submit', saveForm);

/*Слушатель события клик по кнопке "Редактировать"*/
profileEditButton.addEventListener('click', profileEdit);

/*Слушатель события клик по кнопке "Закрыть"*/
popupCloseButton.forEach((element) => {
  element.addEventListener('click', popupClose);
})  

/*При загрузке на странице должно быть 6 карточек, которые добавит JavaScrip из массива initialCards*/
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



/******************************По Буртылеву***********************/
//Переменный для карточек
const cardsList = document.querySelector('.cards__list');
const card = document.querySelector('.card');
//const cardTitle = document.querySelector('.card__title');
//const cardPhoto = document.querySelector('.card__photo');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
//const cardDeleteButton = document.querySelector('.card__delete-button');
let popupFieldPlace = document.querySelector('.popup__field_type_place');
let popupFieldLink = document.querySelector('.popup__field_type_link');
const popupCreateButton = document.querySelector('.popup__submit-button_type_create-card');
const popupFormAddCard = document.querySelector('.popup__form_type_add-card');

//Выношу ниже как глобальные для функции cardAdd
const cardTemplate = document.querySelector('#card-template').content;
//Получаем содержимое контейнера li - "лишки", класс card
const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true);



/*Функция создания карточки*/
function createCard(popupFieldPlace, popupFieldLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  //Получаем содержимое контейнера li - "лишки", класс card
  const cardTemplateClone = cardTemplate.querySelector('.card').cloneNode(true);
  cardTemplateClone.querySelector('.card__title').textContent = popupFieldPlace; 
  cardTemplateClone.querySelector('.card__photo').src = popupFieldLink;
  cardTemplateClone.querySelector('.card__photo').alt = popupFieldPlace;

  //console.log(cardTemplate);

   //Удаление карточки
  cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', () => {
    cardTemplateClone.remove();
});

  return cardTemplateClone;
}

/*Добавление 6 картинок с подписями, для этого запускаем цикл по массиву initialCards*/
initialCards.forEach(function(element) {
  cardsList.append(createCard(element.name, element.link));
})

/*Функция открытия модального окна карточки - становится видимым модальное окно за счет добавления класса popup_opened*/
function cardFormOpened(event) {
  popupAddCard.classList.add('popup_opened');
}

/*Слушатель события клик по кнопке "Добавить"*/
profileAddButton.addEventListener('click', cardFormOpened);

/*Функция добавления одной карточки*/
function cardAdd(event) {
  console.log('Прошел клик по кнопке Создать');
  event.preventDefault();
  popupFieldPlace = document.querySelector('.popup__field_type_place').value;
  popupFieldLink = document.querySelector('.popup__field_type_link').value;
  
  cardsList.prepend(createCard(popupFieldPlace, popupFieldLink));
  popupClose();
}

//Слушатель события по кнопке "Создать" карточку
popupFormAddCard.addEventListener('submit', cardAdd);


//cardsList.prepend(createCard('Волгоград', 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/271236188.jpg?k=a3cfd8a4de3c0cc8eb91d1c979f16bb6156c97c9df4b0c719a8c2c3d09fd7b64&o='))

