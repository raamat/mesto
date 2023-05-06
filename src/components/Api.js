export default class Api {
  constructor(options) {
    // тело конструктора
    //this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
    this._options = options;
  }
  
  // Универсальный метод для вставки в другие методы fetch
  _insertFetch(endUrl) {
    return fetch(`${this._options.baseUrl}/${endUrl}`, this._options)
  }

  // Если все ОК, метод вернет промис. При ошибке вернется статус ошибки
  _checkErr() {
    return res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  _insertHeders() {
    return {
      headers: {
        authorization: '0bc141f1-6053-416b-8022-646082ea4528',
        'Content-Type': 'application/json'
      }  
    }
  }

  // Получаем ссылку на аватар
  getAvatarServer() {
    return this._insertFetch('users/me').then(this._checkErr())
  }
  
  // Загрузка информации о пользователе с сервера
  getUserInfoServer() {
    return this._insertFetch('users/me').then(this._checkErr())
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    //return fetch(`${this._options.baseUrl}/cards`, this._options)
      //.then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    return this._insertFetch('cards').then(this._checkErr())
  }

   
  // Редактирование профиля
  // Отредактированные данные профиля должны сохраняться на сервере
  setUserInfoServer(inputValues) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH', 
      headers: {
        authorization: '0bc141f1-6053-416b-8022-646082ea4528',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.job
      })
    }) 
    .then(this._checkErr())
  }

  // Добавление новой карточки
  setCardServer(cardData) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: '0bc141f1-6053-416b-8022-646082ea4528',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkErr())  
  } 

  // Удаление карточки
  // Мой id "674fd725e10fa6d0cf643d39"
  deleteCardServer(cardId) {
    fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '0bc141f1-6053-416b-8022-646082ea4528',
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkErr())  
  }

  // Обновление аватара пользователя
  updateAvatarServer(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '0bc141f1-6053-416b-8022-646082ea4528',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkErr())  
  }

  // Дергалка массива карточек
  async getListCards() {
    const respone = await fetch(`${this._options.baseUrl}/cards`, this._options);
    const data = await respone.json(); 
    return data;
    }
}