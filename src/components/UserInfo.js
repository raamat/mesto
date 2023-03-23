//import { profileSubtitle } from "../utils/constants";

/* Создайте класс UserInfo
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. 
Этот класс:
1) Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя 
и элемента информации о себе.
2) Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
  Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
3) Содержит публичный метод setUserInfo, который принимает новые данные пользователя
  и добавляет их на страницу.*/
export default class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector}) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }
  
  // Метод вытаскивает имя и род деятельности, сохраняет в объект, возвращает объект
  getUserInfo() {
    const userInfo = {
      name: this._profileTitle.textContent,
      job: this._profileSubtitle.textContent
    }
    console.log(userInfo);
    return userInfo;
  }

  // Метод принимает объект с данными пользователя и добавляет их на страницу
  setUserInfo(userInfo) {
    this._profileTitle.textContent = userInfo.name;
    this._profileSubtitle.textContent = userInfo.job;
  }
}