//Добавление класса в попапы 
const modalActiveClass = 'modal_active';


//Общие функции открытия/закрытия попапов

const handleEscButton = (evt) => {
  const activePopup = document.querySelector('.modal_active');
  if (evt.key === 'Escape') {
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
  || event.target === buttonCloseEditModal 
  || event.target === submitEditInput) {
   closePopup(modalEdit);
 }
};

function closeModalAdd(event) {
  if (!modalAddContent.contains(event.target) 
   || event.target === buttonCloseAddModal 
   || event.target === submitAddInput) {
    closePopup(modalAdd);
  }
};

/*Попап редактирования профиля*/
const buttonOpenEditModal = document.querySelector('.profile__editButton');
const modalEdit = document.querySelector('.modal-edit');
const modalEditContent = modalEdit.querySelector('.modal__content');
const buttonCloseEditModal = modalEdit.querySelector('.modal__close');
const submitEditInput = modalEdit.querySelector('.modal__input_type_save');

buttonOpenEditModal.addEventListener('click', () => {
  openPopup(modalEdit);
});

modalEdit.addEventListener('click', closeModalProfile);

/*Попап добавления карточек*/
const buttonOpenAddModal = document.querySelector('.profile__addButton');
const modalAdd = document.querySelector('.modal-add');
const modalAddContent = modalAdd.querySelector('.modal__content')
const buttonCloseAddModal = modalAdd.querySelector('.modal__close');
const submitAddInput = modalAdd.querySelector('.modal__input_type_save');

buttonOpenAddModal.addEventListener('click', () => {
  openPopup(modalAdd);
});

modalAdd.addEventListener('click', closeModalAdd);

/*form+modalEdit*/
const profileForm = modalEdit.querySelector('.modal__form');
const nameInput = profileForm.querySelector('.modal__input_type_name');
const professionInput = profileForm.querySelector('.modal__input_type_profession');
const profileContainer = document.querySelector('.profile__info');
const nameText = profileContainer.querySelector('.profile__name');
const professionText = profileContainer.querySelector('.profile__profession');

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  nameText.textContent = nameInput.value;
  professionText.textContent = professionInput.value;
});

/*name+profession*/
buttonOpenEditModal.addEventListener('click', (event) => {
  nameInput.value = nameText.textContent;
  professionInput.value = professionText.textContent;
});

//Карточки
const cardsContainer = document.querySelector('.card-grid');
const cardForm = modalAdd.querySelector('.modal__form');
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
  renderCard({ 
    name: placeNameInput.value ,
    link: imageLinkInput.value
  });
  placeNameInput.value = '';
  imageLinkInput.value = '';
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
