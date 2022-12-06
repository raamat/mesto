let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
let popupFieldName = document.querySelector('.popup__field_type_name');
let popupFieldJob = document.querySelector('.popup__field_type_job');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup_form');

/*Функция открытия модального окна - становится видимым модальное окно за счет добавления класса popup_opened*/
function profileEdit(event) {
  popup.classList.add('popup_opened');
  popupFieldName.value = profileTitle.textContent;
  popupFieldJob.value = profileSubtitle.textContent;
}

/*Слушатель события клик по кнопке "Редактировать"*/
profileEditButton.addEventListener('click', profileEdit);


/*Функция закрытия модального окна*/
function popupClose(event) {
  popup.classList.remove('popup_opened');
}

/*Слушатель события клик по кнопке "Закрыть"*/
popupCloseButton.addEventListener('click', popupClose);

/*Сохранение данных из формы*/
function saveForm(event) {
  /*Если наше событие находится в переменной event, то для предотвращения поведения по умолчанию (отправлять данные самостоятельно) 
  мы можем вызвать event.preventDefault() https://doka.guide/js/deal-with-forms */
  event.preventDefault();
  profileTitle.textContent = popupFieldName.value;
  profileSubtitle.textContent = popupFieldJob.value;
  console.log(event);
}

/*Событие submit возникает, когда пользователь отправляет ВАЛИДНУЮ форму https://doka.guide/js/event-submit */
popupForm.addEventListener('submit', saveForm);