const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'

import "../pages/index.css";
import { Api } from '../scripts/api.js';
import { CardList } from '../scripts/cardlist.js';
import { AddCard, EditProfile, Avatar} from '../scripts/popups.js';
import { checkInput, validation } from '../scripts/validation.js';


const api = new Api(serverUrl, 'ca578415-0f2a-4f10-baae-9836fbf9dafe');
  
api.getUserData()
.then((result) => {
  document.querySelector('.user-info__name').textContent = result.name;
  document.querySelector('.user-info__job').textContent = result.about;
  document.querySelector('.user-info__photo').style = `background-image: url(${result.avatar})`;
})
.catch((err) => {
  console.log(err);
}) 

let cardsContainer = {};

api.getInitialCards()
.then((result) => {
  const newCardList = new CardList(document.querySelector('.places-list'), result);
  cardsContainer = newCardList;
})
.catch((err) => {
    console.log(err);
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
  
/* Закрытие попапа */
const closePopup = (() => {
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup_is-opened');
  document.querySelector('.root').removeChild(popup);
});