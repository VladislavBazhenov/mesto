//Добавление класса в попапы 
const modalActiveClass = 'modal_active';

/*Попап редактирования профиля*/
const openModalEditButton = document.querySelector('.profile__editButton');
const modalEdit = document.querySelector('.modal-edit');
const modalEditContent = modalEdit.querySelector('.modal__content');
const modalEditCloseButton = modalEdit.querySelector('.modal__close');
const submitEditInput = modalEdit.querySelector('.modal__input_type_save');

openModalEditButton.addEventListener('click', () => {
  modalEdit.classList.add(modalActiveClass);
});

modalEdit.addEventListener('click', (event) => {
  if (!modalEditContent.contains(event.target) 
   || event.target === modalEditCloseButton 
   || event.target === submitEditInput) {
    modalEdit.classList.remove(modalActiveClass);
  }
});

/*Попап добавления карточек*/
const openModalAddButton = document.querySelector('.profile__addButton');
const modalAdd = document.querySelector('.modal-add');
const modalAddContent = modalAdd.querySelector('.modal__content')
const modalAddCloseButton = modalAdd.querySelector('.modal__close');
const submitAddInput = modalAdd.querySelector('.modal__input_type_save');

openModalAddButton.addEventListener('click', () => {
  modalAdd.classList.add(modalActiveClass);
});

modalAdd.addEventListener('click', (event) => {
  if (!modalAddContent.contains(event.target) 
   || event.target === modalAddCloseButton 
   || event.target === submitAddInput) {
    modalAdd.classList.remove(modalActiveClass);
  }
});


/*form+modalEdit*/
const editForm = modalEdit.querySelector('.modal__form');
const nameInput = editForm.querySelector('.modal__input_type_name');
const professionInput = editForm.querySelector('.modal__input_type_profession');
const profileContainer = document.querySelector('.profile__info');
const nameText = profileContainer.querySelector('.profile__name');
const professionText = profileContainer.querySelector('.profile__profession');

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  nameText.textContent = nameInput.value;
  professionText.textContent = professionInput.value;
});



/*name+profession*/
openModalEditButton.addEventListener('click', (event) => {
  nameInput.value = nameText.textContent;
  professionInput.value = professionText.textContent;
});



//Карточки

const initialCards = [
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

const cardContainer = document.querySelector('.card-grid');
const addForm = modalAdd.querySelector('.modal__form');
const modalPicture = document.querySelector('.modal-picture');
const openPicture = modalPicture.querySelector('.modal-picture__image');
const titlePicture = modalPicture.querySelector('.modal__title_picture');
const placeNameInput = addForm.querySelector('.modal__input_type_place-name');
const imageLinkInput = addForm.querySelector('.modal__input_type_image-link');
const cardSample = document.querySelector('#template-cards').content.querySelector('.card-grid__element');

addForm.addEventListener('submit', (event) => {
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
  const urnButton = copyCardSample.querySelector('.urn');
  const likeButton = copyCardSample.querySelector('.card-grid__likeButton');
  title.textContent = card.name;
  picture.setAttribute('src', card.link);
  picture.setAttribute('alt', card.name);
  urnButton.addEventListener('click', (event) =>{
    event.target.closest('.card-grid__element').remove();
  });

  picture.addEventListener('click', () => {
    modalPicture.classList.add(modalActiveClass);
    openPicture.setAttribute('src', card.link);
    titlePicture.textContent = card.name;
  });
  modalPicture.addEventListener('click', (event) => {
    if (!modalAddContent.contains(event.target) 
    || event.target === modalAddCloseButton) {
    modalPicture.classList.remove(modalActiveClass);
    }
  });
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle(addLikeButtonActive);
  });

  return copyCardSample;
};

const renderCard = (card) => {
  cardContainer.prepend(createCard(card));
};

initialCards.forEach((card) => {
  renderCard(card);
});

const addLikeButtonActive = 'сard-grid__likeButton_active';
