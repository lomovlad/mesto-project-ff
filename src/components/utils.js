// Изменение состояния кнопки сабмита по загрузке
const submitButtons = document.querySelectorAll(".popup__save-btn");

export function setLoadingState(isLoading) {
  if (isLoading) {
    submitButtons.forEach(button => {
      button.textContent = 'Сохранение...';
      button.disabled = true;
    });
  } else {
    submitButtons.forEach(button => {
      button.textContent = 'Сохранить';
      button.disabled = false;
    });
  }
};