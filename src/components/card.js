import { openPopup } from './modal.js';
const templateElement = document.querySelector('#card-element').content.querySelector('.element');
export const popupShowImg = document.querySelector('.popup-img');
const popupShowImgPic = popupShowImg.querySelector('.popup__img-increased');
const popupShowImgName = popupShowImg.querySelector('.popup-img__name');

// Создание и наполнение карточек 
export function createCard ({name, link}) {
  const cardElement = templateElement.cloneNode(true);
  const nameCard = cardElement.querySelector('.element__caption');
  const imageCard = cardElement.querySelector('.element__photo');
  const buttonLikeCard = cardElement.querySelector('.element__like');
  const buttonDelCard = cardElement.querySelector('.element__delete');
  nameCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;

  // Удаление карточки
  buttonDelCard.addEventListener('click', () => {
    cardElement.remove();
  });

  // Лайк карточки
  buttonLikeCard.addEventListener('click', () => {
    buttonLikeCard.classList.toggle('element__like_active');
  });

  // Открыть попап просмотра изображения
  imageCard.addEventListener('click', () => {
    openPopup(popupShowImg);
    popupShowImgName.textContent = name;
    popupShowImgPic.src = link;
    popupShowImgPic.alt = name;
  });
  return cardElement;
};