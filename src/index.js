import '../src/pages/index.css';
import { createCard, popupShowImg } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { initialCards } from './components/cards.js';

const profile = document.querySelector('.profile');
const popupList = document.querySelectorAll('.popup');
// Кнопки
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
// Поля профиля
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__description');
// Карточки
const cardList = document.querySelector('.elements__list');
// Попап редактирования
const popupEdit = document.querySelector('.popup-edit');
const btnClosePopupEdit = popupEdit.querySelector('.popup__close-btn');
// Форма редактирования
const formPopupEdit = popupEdit.querySelector('.popup__form');
// const submitButtonEdit = formPopupEdit.querySelector('.popup__save-btn');
const inputName = formPopupEdit.querySelector('.popup__input_user_name');
const inputJob = formPopupEdit.querySelector('.popup__input_user_job');
// Попап добавления карточек
const popupAddCard = document.querySelector('.popup-add');
const closePopupAddBtn = popupAddCard.querySelector('.popup__close-btn');
// Форма добавлениякарточки
const formAddElement = popupAddCard.querySelector('.popup__form');
// const submitButtonAdd = formAddElement.querySelector(config.submitButtonSelector); 
const inputNameAdd = formAddElement.querySelector('.popup__input_user_name');
const inputUrlAdd = formAddElement.querySelector('.popup__input_user_job');
// Попап просмотра фото
const closePopupShowImg = popupShowImg.querySelector('.popup__close-btn');


// Установить значения инпутов из информации профиля
function setInputValue () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

// Изменение полей профиля из формы редактирования
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
};


// Рендер карточек по умолчанию по append
function renderCard (data, container, position = 'append') {
  const renderNewElement = createCard(data);
  switch (position) {
    case 'append':
      container.append(renderNewElement);
      break;
    case 'prepend':
      container.prepend(renderNewElement);
      break;
    default:
      break;
  };
};

// Рендер дефолтных карточек из массива
initialCards.forEach((item) => {
  renderCard(item, cardList);
});

// Создание и добавление карточек в разметку из формы
function handleFormAddSubmit (evt) {
    evt.preventDefault();
    const dataCard = {
      name: inputNameAdd.value, 
      link: inputUrlAdd.value,
    };
    renderCard(dataCard, cardList, 'prepend');
    closePopup(popupAddCard);
};

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  setInputValue();
});

btnClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  formAddElement.reset();
});

closePopupAddBtn.addEventListener('click', () => {
  closePopup(popupAddCard);
});

closePopupShowImg.addEventListener('click', () => {
  closePopup(popupShowImg);
});

formPopupEdit.addEventListener('submit', handleFormSubmit); 
formAddElement.addEventListener('submit', handleFormAddSubmit);
