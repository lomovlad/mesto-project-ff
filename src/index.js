import "../src/pages/index.css";
import { onDelete, onLike, offLike, createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  config,
} from "./components/validation.js";
import {
  getUserData,
  getCards,
  updateUserInfo,
  addNewCard,
  deleteCard,
  onLikeCard,
  offLikeCard,
  updateAvatar,
} from "./components/api.js";
import { setLoadingState } from "./components/utils.js";

const profile = document.querySelector(".profile");
// Кнопки
const editAvatarButton = profile.querySelector(".profile__avatar-wrapper");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
// Поля профиля
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__description");
const profileAvatar = profile.querySelector(".profile__avatar");
// Карточки
const cardList = document.querySelector(".elements__list");
// Попап обновления аватара
const popupUpdateAvatar = document.querySelector(".popup-avatar");
// Форма обновления аватара
const formPopupUpdateAvatar = popupUpdateAvatar.querySelector(".popup__form");
const inputUrlAvatar = formPopupUpdateAvatar.querySelector(".popup__input_avatar");
// Попап редактирования
const popupEdit = document.querySelector(".popup-edit");
// Форма редактирования
const formPopupEdit = popupEdit.querySelector(".popup__form");
const inputName = formPopupEdit.querySelector(".popup__input_user_name");
const inputJob = formPopupEdit.querySelector(".popup__input_user_job");
// Попап добавления карточек
const popupAddCard = document.querySelector(".popup-add");
// Форма добавления карточки
const formAddElement = popupAddCard.querySelector(".popup__form");
const inputNameAdd = formAddElement.querySelector(".popup__input_user_name");
const inputUrlAdd = formAddElement.querySelector(".popup__input_user_job");
// Попап просмотра картинки
const popupShowImg = document.querySelector(".popup-img");
const popupShowImgPic = popupShowImg.querySelector(".popup__img-increased");
const popupShowImgName = popupShowImg.querySelector(".popup-img__name");
const buttonCloseList = document.querySelectorAll(".popup__close-btn");

let currentUserId;


// Передача ошибки в блок catch
function handleRequestError(error) {
  console.error('Ошибка:', error.message);
};

// Установка значений инпутов
function setInputValue() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

// Обработка формы редактирования инфо о пользователе
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  setLoadingState(true);

  const newName = inputName.value;
  const newAbout = inputJob.value;

  updateUserInfo(newName, newAbout).then((userData) => {
    setLoadingState(false);
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    closePopup(popupEdit);
  })
  .catch(handleRequestError);
}

// Обработка формы обновления аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  setLoadingState(true);

  const newAvatar = inputUrlAvatar.value;
  updateAvatar(newAvatar).then((userData) => {
    setLoadingState(false)
    profileAvatar.src = userData.avatar;
    closePopup(popupUpdateAvatar);
  })
  .catch(handleRequestError);
}

// Открытие попапа просмотра изображения
function openPopupImg(name, link) {
  openPopup(popupShowImg);
  popupShowImgName.textContent = name;
  popupShowImgPic.src = link;
  popupShowImgPic.alt = name;
}

// Рендер карточек по умолчанию по append
function renderCard(data, userId, container, position = "append") {
  const renderNewElement = createCard(
    data,
    userId,
    (buttonLikeCard) => {
      onLikeCard(data._id).then((updatedCard) => {
        const likeCounterElement = renderNewElement.querySelector(".element__like-counter");
        onLike(buttonLikeCard);
        likeCounterElement.textContent = `${updatedCard.likes.length}`;
      })
      .catch(handleRequestError);
    },
    (buttonLikeCard) => {
      offLikeCard(data._id).then((updatedCard) => {
        const likeCounterElement = renderNewElement.querySelector(".element__like-counter");
        offLike(buttonLikeCard);
        likeCounterElement.textContent = `${updatedCard.likes.length}`;
      })
      .catch(handleRequestError);
    },
    (cardElement) => {
      deleteCard(data._id).then(() => {
        onDelete(cardElement);
      })
      .catch(handleRequestError);;
    },
    openPopupImg
  );
  switch (position) {
    case "append":
      container.append(renderNewElement);
      break;
    case "prepend":
      container.prepend(renderNewElement);
      break;
    default:
      break;
  }
}

// Получение и рендер карточек с сервера
Promise.all([getUserData(), getCards()])
.then(([userData, cards]) => {
  cards.forEach((card) => {
    currentUserId = userData._id;
    renderCard(card, userData._id, cardList);
  });
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  profileAvatar.src = userData.avatar;
})
.catch(handleRequestError);

// Создание и добавление карточек в разметку из формы
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  setLoadingState(true);

  const dataCard = {
    name: inputNameAdd.value,
    link: inputUrlAdd.value,
  };

  addNewCard(dataCard.name, dataCard.link).then((newDataCard) => {
    setLoadingState(false);
    renderCard(newDataCard, currentUserId, cardList, "prepend");
    closePopup(popupAddCard);
  })
  .catch(handleRequestError);
}

// Слушатель кнопки обновления аватара
editAvatarButton.addEventListener("click", () => {
  openPopup(popupUpdateAvatar);
})

// Слушатель кнопки редактирования инфо профиля
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
  setInputValue();
  clearValidation(formPopupEdit, config);
});

// Слушатель кнопки добавления карточки
addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddElement.reset();
  clearValidation(formAddElement, config);
});

Array.from(buttonCloseList).forEach((btn) => {
  const popupElement = btn.closest(".popup");
  if (popupElement) {
    popupElement.addEventListener("mousedown", closePopupOverlay);
    btn.addEventListener("click", () => closePopup(popupElement));
  }
});

formPopupEdit.addEventListener("submit", handleFormEditSubmit);
formAddElement.addEventListener("submit", handleFormAddSubmit);
formPopupUpdateAvatar.addEventListener("submit", handleFormAvatarSubmit);

enableValidation(config);
