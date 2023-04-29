export default class Api {
  constructor(options) {
    // тело конструктора
    //this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, this._options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // другие методы работы с API
  getUserInfoServer() {
    return fetch(`${this._options.baseUrl}/users/me`, this._options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }


  hello() {console.log(this._options)}
}


/*
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '0bc141f1-6053-416b-8022-646082ea4528',
    'Content-Type': 'application/json'
  }
});
*/