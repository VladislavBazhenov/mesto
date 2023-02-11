//Карточки которые уже есть
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

export const validationSettings = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-button',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active',
  inactiveButtonClass: 'modal__input_disabled'
};

export const modalPicture = document.querySelector('.modal-picture');

export const modalEditProfile = document.querySelector('.modal-edit');
export const profileForm = modalEditProfile.querySelector('.modal__form');
export const nameInput = profileForm.querySelector('.modal__input_type_name');
export const professionInput = profileForm.querySelector('.modal__input_type_profession');

export const modalAddCard = document.querySelector('.modal-add');
export const cardForm = modalAddCard.querySelector('.modal__form');
export const buttonOpenAddModal = document.querySelector('.profile__addButton');
export const buttonOpenEditModal = document.querySelector('.profile__editButton');