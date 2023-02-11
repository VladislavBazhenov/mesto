
import './index.css';
import { initialCards } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { validationSettings, 
          profileForm, 
          cardForm, 
          buttonOpenAddModal,
          buttonOpenEditModal } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const userInfo = new UserInfo({
  username:'.profile__name',
  profession: '.profile__profession'});

const popupEditProfile = new PopupWithForm('.modal-edit', 
{ submitForm: (item) => {
  userInfo.setUserInfo(item);
}
});
const popupAddCard = new PopupWithForm('.modal-add', 
{ submitForm: (item) => {
  const {name, link} = item; 
  const newCreateCard = createCard({name, link});
  cardList.addItem(newCreateCard);
}
});
const popupImage = new PopupWithImage('.modal-picture');
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},'.card-grid');

const formProfileValid = new FormValidator(validationSettings, profileForm);
const formAddValid = new FormValidator(validationSettings, cardForm);

function handleCardClick (card) {
  popupImage.open(card);
};

function createCard (item) { 
  const anyCard = new Card(item, '#template-cards', handleCardClick); 
  const cardElement = anyCard.getView(); 
  return cardElement; 
};


popupImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();


buttonOpenEditModal.addEventListener('click', () => {
  popupEditProfile.open();
  userInfo.getUserInfo();
  formProfileValid.resetValidation();
});
buttonOpenAddModal.addEventListener('click', () => {
  popupAddCard.open();
  formAddValid.resetValidation();
});


cardList.createElement();
formProfileValid.enableValidation();
formAddValid.enableValidation();
