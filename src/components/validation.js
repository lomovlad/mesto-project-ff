// Конфиг элементов
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
};

// Показать ошибку
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// Скрыть ошибку
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
}
// Блокировка кнопки сабмита
function disableButton(button, config) {
  button.disabled = "disabled";
  button.classList.add(config.inactiveButtonClass);
}

// Активация кнопки сабмита
function enableButton(button, config) {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
}

// проверка валидности
function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  // проверка для вывода кастомной ошибки
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  // проверка для вывода стандартной ошибки
  if (!isInputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
}

// Смена состояния кнопки сабмит
function toggleButtonState(button, isActive, config) {
  if (!isActive) {
    disableButton(button, config);
  } else {
    enableButton(button, config);
  }
}


// Установка слушателя элементам формы
function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButton, formElement.checkValidity(), config);
  Array.from(inputList).forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      toggleButtonState(submitButton, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    });
  });
  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
  });
}

// Очистка ошибок валидации 
export function clearValidation(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  Array.from(inputList).forEach(function (inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    hideError(inputElement, errorElement, config);
  });

  disableButton(submitButton, config);
}

// Активация валидации
export function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);
  Array.from(formsList).forEach(function (formElement) {
    setEventListener(formElement, config);
  });
}

