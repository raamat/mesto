const cardTitle = document.querySelector('.card__title');
const cardPhoto = document.querySelector('.card__photo');
const cardTemplate = document.querySelector('#card-template').content;
const profileAddButton = document.querySelector('.profile__add-button');
const popapAddCard = document.querySelector('.popup_type_add-card');

/*Функция открытия модального окна - становится видимым модальное окно за счет добавления класса popup_opened*/
function profileAdd(event) {
  popapAddCard.classList.add('popup_opened');
}

/*Добавление 6 картинок с подписями, для этого запускаем цикл по массиву initialCards*/
initialCards.forEach(function(element) {
  /*Клонируем содержимое тега <template> https://doka.guide/html/template/ */
  const initialCardsElement = cardTemplate.cloneNode(true);
  initialCardsElement.querySelector('.card__photo').src = element.link;
  initialCardsElement.querySelector('.card__photo').alt = element.name;
  initialCardsElement.querySelector('.card__title').textContent = element.name;
  
  /*Вставляем склонированный контент в конец списка "cards__list"*/
  cardsList.append(initialCardsElement);
})

const cardDeleteButton = document.querySelector('.card__delete-button');
/*Обработчик удаления карточки*/
cardDeleteButton.addEventListener('click', function (event) {
  const listItem = cardDeleteButton.closest('.card');
  listItem.remove();
})

const cardLikeButton = document.querySelector('.card__like-button');
const cloneCardTemplate = cardTemplate.cloneNode(true);
cloneCardTemplate.querySelector('.card__like-button').addEventListener('click', function(evt) {
  cardLikeButton.classList.toggle('card__like-button_active');
})


/*Слушатель события клик по кнопке "Добавить"*/
profileAddButton.addEventListener('click', profileAdd);
