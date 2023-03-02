
import './index.css';
import { Card } from '../components/Card.js';
import { validationSettings, 
          profileForm, 
          cardForm,
          avatarForm, 
          buttonOpenAddModal,
          buttonOpenEditModal,
          buttonOpenEditAvatar,
          apiConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';


const api = new Api(apiConfig);

api.getUserData()
    .then((data) => {
      user.setUserInfo(data);
      user.id = data._id;
    })
    .catch((error) => {console.log(error)});

api.getInitialCards()
    .then((cardsData) => {
      const cardList = new Section({
        items: cardsData,
        renderer: (item) => {
          cardList.addItem(createAnyCard(item, user.id));
        }
      },'.card-grid')
      cardList.createElement();

        const popupAddCard = new PopupWithForm('.modal-add', 
          { submitForm: (item) => {
            popupAddCard.setLoadingText('Сохранение...');
            const {name, link} = item; 
            api.createCard({name, link})
            .then((newCardData) => {
              const newCreateCard = createAnyCard(newCardData, user.id);
              cardList.addItem(newCreateCard);
            })
            .then(() => {
              popupAddCard.close();
            })
            .catch((error) => {console.log(error)})
            .finally(() => {
              popupAddCard.setLoadingText('Создать');
            })
          }
          });

          popupAddCard.setEventListeners();
          buttonOpenAddModal.addEventListener('click', () => {
            popupAddCard.open();
            formAddValid.resetValidation();
          });

    })
    .catch((error) => {console.log(error)});


const user = new UserInfo({
  username:'.profile__name',
  profession: '.profile__profession',
  avatar: '.profile__avatar'});

const popupEditAvatar = new PopupWithForm('.modal-avatar', 
  { submitForm: (data) => {
    popupEditAvatar.setLoadingText('Сохранение...');
    api.setAvatar(data.link)
    .then((newData) => {
      user.setUserInfo(newData);
    })
    .then(() => {
      popupEditAvatar.close();
    })
    .catch((error) => {console.log(error)})
    .finally(() => {
      popupEditAvatar.setLoadingText('Сохранить');
    })
  }}
);

const popupDeleteCard = new PopupWithConfirmation('.modal-delete', 
  (cardId, cardElem) => {
    popupDeleteCard.setLoadingText('Удаление...');
  api.deleteCard(cardId)
  .then(() => {
    cardElem.remove();
  })
  .then(() => {
    popupDeleteCard.close();
  })
  .catch((error) => {console.log(error)})
  .finally(() => {
    popupDeleteCard.setLoadingText('Да')
  })
}
);

const popupEditProfile = new PopupWithForm('.modal-edit', 
{ submitForm: (item) => {
  popupEditProfile.setLoadingText('Сохранение...');
  const {username, profession} = item;
  api.setUserData({username, profession})
  .then((newUserData) => {
    user.setUserInfo(newUserData);
  })
  .then(() => {
    popupEditProfile.close();
  })
  .catch((error) => {console.log(error)})
  .finally(() => {
    popupEditProfile.setLoadingText('Сохранить');
  })
}
});

const popupImage = new PopupWithImage('.modal-picture');




const formProfileValid = new FormValidator(validationSettings, profileForm);
const formAddValid = new FormValidator(validationSettings, cardForm);
const formAvatarValid = new FormValidator(validationSettings, avatarForm);



function handleCardClick (card) {
  popupImage.open(card);
};

function handlePopupConfirm (cardId, cardElem) {
  popupDeleteCard.open(cardId, cardElem);
}

function handleLikeCard (anyCard, cardId, cardIsLiked) {
  if (cardIsLiked) {
    api.removeLike(cardId)
    .then((likeData) => {
      anyCard.updateCounterLike(likeData.likes.length);
    })
    .catch((error) => {console.log(error)})
  } else {
    api.setLike(cardId)
    .then((likeData) => {
      anyCard.updateCounterLike(likeData.likes.length);
    })
    .catch((error) => {console.log(error)})
  }
}

function createAnyCard (item, user) { 
  const anyCard = new Card(item,
     '#template-cards',
      handleCardClick,
      handlePopupConfirm,
      user,
      handleLikeCard
      ); 
  const cardElement = anyCard.getView(); 
  return cardElement; 
};

popupImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

buttonOpenEditModal.addEventListener('click', () => {
  popupEditProfile.open();
  user.getUserInfo();
  formProfileValid.resetValidation();
});

buttonOpenEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  formAvatarValid.resetValidation();
})

formProfileValid.enableValidation();
formAddValid.enableValidation();
formAvatarValid.enableValidation();



