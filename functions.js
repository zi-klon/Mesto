/* ФУНКЦИИ */
  
/* Блокировка/разблокировка сабмита */
function checkInput(element) {
  
  element = event.target;
    
  const inputs = Array.from(element.closest('form').elements);
  const button = element.closest('form').querySelector('button');
  let isValidForm = true;
    
  inputs.forEach((item) => {
    
    if(item.id == 'input') {
  
      if(!item.checkValidity()) {
        isValidForm = false;
      }
    }
  });
    
  if (!isValidForm) {
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_disabled');
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
  }
}
    
/* Валидация форм */  
const validation = function(element) {
  element = event.target;
  const errorElement = document.querySelector(`#error-${element.name}`);
  
  function showErrorMessage(element) {
    errorElement.classList.add('error_active');
  }
  
  function hideErrorMessage(element) {
    errorElement.classList.remove('error_active');
  }
  
  function validate (element) {
    errorElement.textContent = 'Это обязательное поле';
  }
  
  function validateByLength (element) {
    errorElement.textContent = 'Должно быть от 2 до 30 символов';
  }
  
  if (element.type !== 'url'){
   
    if (element.value == 0) {
      validate(element);
      showErrorMessage(element);
  
    } else if (element.value.length == 1 || element.value.length > 30) {
      validateByLength(element);
      showErrorMessage(element);
  
    } else {
    hideErrorMessage(element);
    }
 
  } else {
  
    if (element.value == 0) {
      validate(element);
      showErrorMessage(element);
  
    } else if (!element.checkValidity()) {
      errorElement.textContent = 'Здесь должна быть ссылка';
      showErrorMessage(element);
  
    } else {
      hideErrorMessage(element);
    }
  }
}
  
/* Функция, возвращающая путь к img-файлу */
function getSource(item) {
  let source = item.style.backgroundImage.slice(5, -2);
  return source;
}

/* Функция, открывающая попап с картинкой, и присваивающая элементу img путь к img-файлу  */
function showPicture (event) {

  if (event.target.classList.contains('place-card__image')) {

    document.querySelector('.picture').classList.add('picture_is-opened');

    document.querySelector('.picture__image').setAttribute('src', getSource(event.target));
  }
  
}
  
/* Изменение названия кнопки при загрузке профиля */
const renderButton = (() => {
  const button = document.querySelector('.popup__button');
  button.textContent = 'Загрузка...';
});
  
/* Закрытие попапа */
const closePopup = (() => {
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup_is-opened');
  document.querySelector('.root').removeChild(popup);
});

/* СЛУШАТЕЛИ СОБЫТИЙ */

/* Открытие попапа добавления новых карточек */
document.querySelector('.user-info__button').addEventListener('click', function () {
  const popup = new AddCard('Новое место');
  document.querySelector('.root').appendChild(popup.container);
  popup.open();
  popup.getAtributes();
  document.querySelector('.popup__form').addEventListener('input', validation);
  document.querySelector('.popup__form').addEventListener('input', checkInput);
});
  
/* Открытие попапа редактирования профиля */
document.querySelector('.user-info__edit-button').addEventListener('click', function () {
  const popup = new EditProfile('Редактировать профиль');
  document.querySelector('.root').appendChild(popup.container);
  popup.open();
  popup.getAtributes();
  document.querySelector('.popup__form').addEventListener('input', validation);
  document.querySelector('.popup__form').addEventListener('input', checkInput);
});
  
/* Открытие попапа редактирования аватара */
document.querySelector('.user-info__photo').addEventListener('click', function () {
  const popup = new Avatar('Обновить аватар');
  document.querySelector('.root').appendChild(popup.container);
  popup.open();
  document.querySelector('.popup__form').addEventListener('input', validation);
  document.querySelector('.popup__form').addEventListener('input', checkInput);
});
  
/* Открытие картинки */
document.querySelector('.places-list').addEventListener('click', showPicture);

/* Закрытие картинки */
document.querySelector('.picture__close').addEventListener('click', () => {
  document.querySelector('.picture').classList.remove('picture_is-opened');
});  