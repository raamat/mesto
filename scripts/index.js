let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
let popupFieldName = document.querySelector('.popup__field_type_name');
let popupFieldJob = document.querySelector('.popup__field_type_job');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');

/*Функция открытия модального окна - становится видимым модальное окно за счет добавления класса popup_opened*/
function profileEdit(event) {
  popup.classList.add('popup_opened');
  popupFieldName.value = profileTitle.textContent;
  popupFieldJob.value = profileSubtitle.textContent;
}

/*Функция закрытия модального окна*/
function popupClose(event) {
  popup.classList.remove('popup_opened');
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
popupCloseButton.addEventListener('click', popupClose);

/***************************************************************************** ПР-5 ******************************************************************************/
// <img class="element__photo" src="images/gora-elbrus.jpg" alt="Гора Эльбрус">
// <h2 class="element__title">Гора Эльбрус</h2>
/*При загрузке на странице должно быть 6 карточек, которые добавит JavaScrip из массива initialCards*/
/*
const elementsList = document.querySelector('.elements__list');
const elementTitle = document.querySelector('.element__title');
const elementPhoto = document.querySelector('.element__photo');
const elementTemplate = document.querySelector('.element-template').content;
const images = [
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

//Функция добавления подписи к картинкам
images.forEach(function(element) {
  const imageElement = elementTemplate.cloneNode(true);

  imageElement.querySelector('.element__photo').textContent = element.link;
  imageElement.querySelector('.element__title').textContent = element.name;

  elementsList.append(imageElement);
})
*/