export { UserInfo };

class UserInfo {
  constructor(selectors) {
    this._user = document.querySelector(selectors.username);
    this._abotMe = document.querySelector(selectors.profession);
    this._avatar = document.querySelector(selectors.avatar);
  }

  getUserInfo() {
     const dataProfile = {
      username: this._user.textContent,
      profession: this._abotMe.textContent
    };
    return dataProfile;
  }

  setUserInfo(data) {
    this._user.textContent = data.name;
    this._abotMe.textContent = data.about;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }
}