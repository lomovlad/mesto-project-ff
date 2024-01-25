import '../src/pages/index.css';
import { onDelete, onLike, createCard } from './components/card.js';
import { openPopup, closePopup, closePopupOverlay } from './components/modal.js';
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
// Форма редактирования
const formPopupEdit = popupEdit.querySelector('.popup__form');
// const submitButtonEdit = formPopupEdit.querySelector('.popup__save-btn');
const inputName = formPopupEdit.querySelector('.popup__input_user_name');
const inputJob = formPopupEdit.querySelector('.popup__input_user_job');
// Попап добавления карточек
const popupAddCard = document.querySelector('.popup-add');
// Форма добавлениякарточки
const formAddElement = popupAddCard.querySelector('.popup__form');
// const submitButtonAdd = formAddElement.querySelector(config.submitButtonSelector); 
const inputNameAdd = formAddElement.querySelector('.popup__input_user_name');
const inputUrlAdd = formAddElement.querySelector('.popup__input_user_job');
// Попап просмотра картинки
const popupShowImg = document.querySelector('.popup-img');
const popupShowImgPic = popupShowImg.querySelector('.popup__img-increased');
const popupShowImgName = popupShowImg.querySelector('.popup-img__name');
const buttonCloseList = document.querySelectorAll('.popup__close-btn');


// Установить значения инпутов из информации профиля
function setInputValue () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

// Изменение полей профиля из формы редактирования
function handleFormEditSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
};

// Открытие попапа просмотра изображения
function openPopupImg (name, link) {
  openPopup(popupShowImg);
  popupShowImgName.textContent = name;
  popupShowImgPic.src = link;
  popupShowImgPic.alt = name;
};


// Рендер карточек по умолчанию по append
function renderCard (data, container, position = 'append') {
  const renderNewElement = createCard(data, onLike, onDelete, openPopupImg);
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

addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  formAddElement.reset();
});

buttonCloseList.forEach(btn => {
  const popupCloseBtn = btn.closest('.popup');
  popupCloseBtn.addEventListener('mousedown', closePopupOverlay);
  btn.addEventListener('click', () => closePopup(popup)); 
});

formPopupEdit.addEventListener('submit', handleFormEditSubmit); 
formAddElement.addEventListener('submit', handleFormAddSubmit);
