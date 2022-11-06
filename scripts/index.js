const MODAL_ACTIVE_CLASS = 'modal__active';
const openModalButton = document.querySelector('.profile__editButton');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal__content');
const modalCloseButton = modal.querySelector('.modal__close');
const submitInput = modal.querySelector('.modal__save');

openModalButton.addEventListener('click', () => {
  modal.classList.add(MODAL_ACTIVE_CLASS);
});

modal.addEventListener('click', (event) => {
  if (!modalContent.contains(event.target) 
   || event.target === modalCloseButton 
   || event.target === submitInput) {
    modal.classList.remove(MODAL_ACTIVE_CLASS);
  }
});

/*card-grid__likeButton*/
const ADD_LIKE_BUTTON_ACTIVE = 'сard-grid__likeButton_active';
const likeButtonActive = document.querySelectorAll('.card-grid__likeButton');
const arrButtonLike = Array.from(likeButtonActive);

arrButtonLike.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle(ADD_LIKE_BUTTON_ACTIVE);
  });
});

/*form+modal*/
const mainForm = modal.querySelector('.modal__form');
const nameInput = mainForm.querySelector('.modal__name');
const professionInput = mainForm.querySelector('.modal__profession');
const profileContainer = document.querySelector('.profile__info');
const nameText = profileContainer.querySelector('.profile__name');
const professionText = profileContainer.querySelector('.profile__profession');

mainForm.addEventListener('submit', (event) => {
  event.preventDefault();
  nameText.textContent = nameInput.value;
  professionText.textContent = professionInput.value;
});

