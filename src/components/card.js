const templateElement = document.querySelector('#card-element').content.querySelector('.element');

// Создание и наполнение карточек 
export function createCard ({name, link}, onLikeFunction, onDeleteFunction, openPopupFunction) {
  const cardElement = templateElement.cloneNode(true);
  const nameCard = cardElement.querySelector('.element__caption');
  const imageCard = cardElement.querySelector('.element__photo');
  const buttonLikeCard = cardElement.querySelector('.element__like');
  const buttonDelCard = cardElement.querySelector('.element__delete');
  nameCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;

  // Удалить карточку
  buttonDelCard.addEventListener('click', () => {
    onDeleteFunction(cardElement);
  });

  // Лайкнуть карточку
  buttonLikeCard.addEventListener('click', () => {
    onLikeFunction(buttonLikeCard);
  });

  // Открыть попап просмотра изображения
  imageCard.addEventListener('click', () => {
    openPopupFunction(name, link);
  });

  return cardElement;
};