//Добавление класса в попапы 
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

function closeModalProfile(event) {
  if (!modalEditContent.contains(event.target) 
  || event.target === buttonCloseEditModal) {
   closePopup(modalEditProfile);
 }
};

function closeModalAdd(event) {
  if (!modalAddContent.contains(event.target) 
   || event.target === buttonCloseAddModal) {
    closePopup(modalAddCard);
  }
};

/*Попап редактирования профиля*/
const buttonOpenEditModal = document.querySelector('.profile__editButton');
const modalEditProfile = document.querySelector('.modal-edit');
const modalEditContent = modalEditProfile.querySelector('.modal__content');
const buttonCloseEditModal = modalEditProfile.querySelector('.modal__close');
const submitEditInput = modalEditProfile.querySelector('.modal__input_type_save');

buttonOpenEditModal.addEventListener('click', () => {
  openPopup(modalEditProfile);
  nameInput.value = nameText.textContent;
  professionInput.value = professionText.textContent;
  submitEditInput.classList.remove('modal__input_disabled');
  submitEditInput.removeAttribute('disabled', 'disabled');
});

modalEditProfile.addEventListener('click', closeModalProfile);

/*Попап добавления карточек*/
const buttonOpenAddModal = document.querySelector('.profile__addButton');
const modalAddCard = document.querySelector('.modal-add');
const modalAddContent = modalAddCard.querySelector('.modal__content')
const buttonCloseAddModal = modalAddCard.querySelector('.modal__close');
const submitAddInput = modalAddCard.querySelector('.modal__input_type_save');

buttonOpenAddModal.addEventListener('click', () => {
  openPopup(modalAddCard);
  submitAddInput.classList.add('modal__input_disabled');
  submitAddInput.setAttribute('disabled', 'disabled');
});

modalAddCard.addEventListener('click', closeModalAdd);

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
const cardSample = document.querySelector('#template-cards').content.querySelector('.card-grid__element');

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closePopup(modalAddCard);
  renderCard({ 
    name: placeNameInput.value ,
    link: imageLinkInput.value
  });
  event.target.reset();
});

const createCard = (card) => {
  const copyCardSample = cardSample.cloneNode(true);
  const picture = copyCardSample.querySelector('.card-grid__item');
  const title = copyCardSample.querySelector('.card-grid__title');
  const deleteButton = copyCardSample.querySelector('.urn');
  const likeButton = copyCardSample.querySelector('.card-grid__likeButton');
  
  title.textContent = card.name;
  picture.src = card.link;
  picture.alt = card.name;
  deleteButton.addEventListener('click', () =>{
    copyCardSample.remove();
  });


  picture.addEventListener('click', () => {
    openPopup(modalPicture);
    cardModalPicture.src = card.link;
    cardModalPicture.alt = card.name;
    titlePicture.textContent = card.name;
  });
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle(buttonLikeActiveClass);
  });
  return copyCardSample;
};

modalPicture.addEventListener('click', (event) => {
  if (!modalPictureContent.contains(event.target) 
  || event.target === modalPictureCloseButton) {
  closePopup(modalPicture);
  }
});

const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};

initialCards.forEach((card) => {
  renderCard(card);
});

const buttonLikeActiveClass = 'сard-grid__likeButton_active';
