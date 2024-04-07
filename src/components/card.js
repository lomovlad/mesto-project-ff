const templateElement = document
  .querySelector("#card-element")
  .content.querySelector(".element");

// Удаление карточки
function onDelete(cardElem) {
  cardElem.remove();
}

// Смена состояния лайка карточки
function onLike(likeElem) {
  likeElem.classList.add("element__like_active");
}

function offLike(likeElem) {
  likeElem.classList.remove("element__like_active");
}



// Создание и наполнение карточек
function createCard(
  { name, link, likes, owner, _id },
  userId,
  onLikeFunction,
  offLikeFunction,
  onDeleteFunction,
  openPopupFunction
) {
  const cardElement = templateElement.cloneNode(true);
  const nameCard = cardElement.querySelector(".element__caption");
  const imageCard = cardElement.querySelector(".element__photo");
  const buttonLikeCard = cardElement.querySelector(".element__like");
  const buttonDelCard = cardElement.querySelector(".element__delete");
  const likeCounterElement = cardElement.querySelector(
    ".element__like-counter"
  );
  
  nameCard.textContent = name;
  imageCard.src = link;
  imageCard.alt = name;
  likeCounterElement.textContent = `${likes.length}`;
  
  // Проверяем, является ли текущий пользователь владельцем карточки и отображаем кнопку удаления
  if (userId === owner._id) {
    buttonDelCard.addEventListener('click', () => {
      onDeleteFunction(cardElement, _id);
    })
    
  } else {
    buttonDelCard.remove();
  };
  
  // Проверка при рендере на мои лайки
  if (likes.some(like => like._id === userId)) {
    buttonLikeCard.classList.add('element__like_active');
  }
  
  
  // Лайкнуть и дизлайкнуть карточку
  buttonLikeCard.addEventListener("click", () => {
    const isLiked = buttonLikeCard.classList.contains('element__like_active');
    if (!isLiked) {
      onLikeFunction(buttonLikeCard, _id);
    } else {
      offLikeFunction(buttonLikeCard, _id);
    }
  });


  // Открыть попап просмотра изображения
  imageCard.addEventListener("click", () => {
    openPopupFunction(name, link);
  });

  return cardElement;
}

export { onDelete, onLike, offLike, createCard };
