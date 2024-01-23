// Открытие попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupByEsc);
};

// Закрытие попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
};

// Закрытие попапа по Esc 
function closePopupByEsc (evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
      closePopup(popup);
  }
};

// Закрытие попапа по клике на оверлэй
function closePopupOverlay (evt) {
  const target = evt.target;
  if (target.classList.contains('popup')) {
      closePopup(target);
  }
};

export { openPopup, closePopup, closePopupByEsc, closePopupOverlay };