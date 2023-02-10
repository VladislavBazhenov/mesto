export { UserInfo };
import {nameInput, professionInput} from '../utils/constants.js'

class UserInfo {
  constructor(selectors) {
    this._user = document.querySelector(selectors.username);
    this._abotMe = document.querySelector(selectors.profession);
  }

  getUserInfo() {
     const dataProfile = {
      username: nameInput.value = this._user.textContent,
      profession: professionInput.value = this._abotMe.textContent
    };
    return dataProfile;
  }

  setUserInfo(data) {
    this._user.textContent = data.username;
    this._abotMe.textContent = data.profession;
  }
}