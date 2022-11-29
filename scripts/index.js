let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popap = document.querySelector('.popap');
let formFieldName = document.querySelector('.form__field_name');
let formFieldJob = document.querySelector('.form__field_job');
const formSubmitButton = document.querySelector('.form__submit-button');
const popapCloseButton = document.querySelector('.popap__close-button');
let inputs = document.querySelectorAll('input');

/*Кнопка редактирования профиля - становится видимым модальное окно за счет добавления класса popap_opened*/
profileEditButton.addEventListener('click', function() {
  popap.classList.add('popap_opened');
  formFieldName.value = profileTitle.textContent;
  formFieldJob.value = profileSubtitle.textContent;
})

/*Кнопка закрытия модального окна*/
popapCloseButton.addEventListener('click', function() {
  popap.classList.remove('popap_opened');
})

/*Для улучшения юзабилити модальное окно закрывается шелчком на пустом месте*/
popap.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    popap.classList.remove('popap_opened');  
  }
})

/*Сохранение данных из формы происходит только в случае внесения изменений*/
function saveForm() {
  if (formFieldName.value !== profileTitle.textContent) {
    profileTitle.textContent = formFieldName.value;
  };
  if (formFieldJob.value !== profileSubtitle.textContent) {
    profileSubtitle.textContent = formFieldJob.value;
  } 
}

/*Обработчкик клика по кнопке "Сохранить"*/
formSubmitButton.addEventListener('click', saveForm);

/*Обработчик нажатия Enter при открытом модальном окне*/
popap.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    saveForm(); 
  }
})
