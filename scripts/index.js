
import { initialCards } from './constants.js';
import { Card } from './Card.js';
import { validationSettings } from './constants.js';
import { FormValidator } from './FormValidator.js';


//Для октрытия попапов
const modalActiveClass = 'modal_active';

//Общие функции открытия/закрытия попапов
const handleEscButton = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.modal_active');
    closePopup(activePopup);
  }
};

function openPopup(popup) {
  popup.classList.add(modalActiveClass);
  document.addEventListener('keydown', handleEscButton);
};

function closePopup(popup) {
  popup.classList.remove(modalActiveClass);
  document.removeEventListener('keydown', handleEscButton);
};

//Закрытие попапов оверлей/крестик
const popups = document.querySelectorAll('.modal');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('modal_active')) {
      closePopup(popup);
    };
    if (evt.target.classList.contains('modal__close')) {
      closePopup(popup);
    };
  });
});

/*Попап редактирования профиля*/
const buttonOpenEditModal = document.querySelector('.profile__editButton');
const modalEditProfile = document.querySelector('.modal-edit');

buttonOpenEditModal.addEventListener('click', () => {
  openPopup(modalEditProfile);
  nameInput.value = nameText.textContent;
  professionInput.value = professionText.textContent;
  formProfileValid.resetValidation();
});

/*Попап добавления карточек*/
const buttonOpenAddModal = document.querySelector('.profile__addButton');
const modalAddCard = document.querySelector('.modal-add');

buttonOpenAddModal.addEventListener('click', () => {
  openPopup(modalAddCard);
  formAddValid.resetValidation();
});

/*form+modalEdit*/
const profileForm = modalEditProfile.querySelector('.modal__form');
const nameInput = profileForm.querySelector('.modal__input_type_name');
const professionInput = profileForm.querySelector('.modal__input_type_profession');
const profileContainer = document.querySelector('.profile__info');
const nameText = profileContainer.querySelector('.profile__name');
const professionText = document.querySelector('.profile__profession');

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closePopup(modalEditProfile);
  nameText.textContent = nameInput.value;
  professionText.textContent = professionInput.value;
});


//Карточки
const cardsContainer = document.querySelector('.card-grid');
const cardForm = modalAddCard.querySelector('.modal__form');
const modalPicture = document.querySelector('.modal-picture');
const modalPictureContent = modalPicture.querySelector('.modal__content');
const cardModalPicture = modalPicture.querySelector('.modal-picture__image');
const modalPictureCloseButton = modalPicture.querySelector('.modal__close');
const titlePicture = modalPicture.querySelector('.modal__title_picture');
const placeNameInput = cardForm.querySelector('.modal__input_type_place-name');
const imageLinkInput = cardForm.querySelector('.modal__input_type_image-link');

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closePopup(modalAddCard);
  renderCard({ 
    name: placeNameInput.value ,
    link: imageLinkInput.value
  });
  event.target.reset();
});

//открытие попапа с картинкой
function openPopupImage (card) {
  cardModalPicture.alt = card.name;
  cardModalPicture.src = card.link;
  titlePicture.textContent = card.name;
  openPopup(modalPicture);
};


//Закрытие попапа с картинкой
modalPicture.addEventListener('click', (event) => {
  if (!modalPictureContent.contains(event.target) 
  || event.target === modalPictureCloseButton) {
  closePopup(modalPicture);
  }
});

function createCard (item) {
  const anyCard = new Card(item, '#template-cards', openPopupImage);
  const cardElement = anyCard.getView();

  return cardElement;
};

//Отрисовка карточки
const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};


initialCards.forEach((card) => {
  renderCard(card);
});

const formProfileValid = new FormValidator(validationSettings, profileForm);
const formAddValid = new FormValidator(validationSettings, cardForm);

formProfileValid.enableValidation();
formAddValid.enableValidation();
