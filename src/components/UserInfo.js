/* Создайте класс UserInfo
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. 
Этот класс:
1) Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя 
и элемента информации о себе.
2) Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
  Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
3) Содержит публичный метод setUserInfo, который принимает новые данные пользователя
  и добавляет их на страницу.
  
  Класс предназначен только для того, чтобы хранить в нем информацию о пользователе. */
export default class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector}) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }
  
  // Метод вытаскивает из HTML имя и род деятельности, сохраняет в объект, возвращает объект.
  // Пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userInfo = {
      name: this._profileTitle.textContent,
      job: this._profileSubtitle.textContent
    }
    return userInfo;
  }

  // Метод принимает объект с данными пользователя и добавляет их на страницу
  // Вставляет новые данные из формы в HTML
  setUserInfo(userInfo) {
    this._profileTitle.textContent = userInfo.name;
    //this._profileSubtitle.textContent = userInfo.job;
    //30.04.2023
    this._profileSubtitle.textContent = userInfo.about;
  }
}