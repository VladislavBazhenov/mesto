const modalActiveClass = 'modal_active';
const openModalButton = document.querySelector('.profile__editButton');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal__content');
const modalCloseButton = modal.querySelector('.modal__close');
const submitInput = modal.querySelector('.modal__input_type_save');

openModalButton.addEventListener('click', () => {
  modal.classList.add(modalActiveClass);
});

modal.addEventListener('click', (event) => {
  if (!modalContent.contains(event.target) 
   || event.target === modalCloseButton 
   || event.target === submitInput) {
    modal.classList.remove(modalActiveClass);
  }
});

/*card-grid__likeButton*/
const addLikeButtonActive = 'сard-grid__likeButton_active';
const likeButtonActive = document.querySelectorAll('.card-grid__likeButton');
const arrButtonLike = Array.from(likeButtonActive);

arrButtonLike.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle(addLikeButtonActive);
  });
});

/*form+modal*/
const mainForm = modal.querySelector('.modal__form');
const nameInput = mainForm.querySelector('.modal__input_type_name');
const professionInput = mainForm.querySelector('.modal__input_type_profession');
const profileContainer = document.querySelector('.profile__info');
const nameText = profileContainer.querySelector('.profile__name');
const professionText = profileContainer.querySelector('.profile__profession');

mainForm.addEventListener('submit', (event) => {
  event.preventDefault();
  nameText.textContent = nameInput.value;
  professionText.textContent = professionInput.value;
});

/*name+profession*/
openModalButton.addEventListener('click', (event) => {
  nameInput.value = nameText.textContent;
  professionInput.value = professionText.textContent;
});