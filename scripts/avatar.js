import { api } from '../src/index.js';

export class Avatar {
    
  constructor(title) {
    this.title = title;
    this.container = this.create(this.title);
    this.container.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this.container.querySelector('.popup__form').addEventListener('submit', this.newAvatar);
  }

  create () {
    const popup = document.createElement('div');
    const popupContent = document.createElement('div');
    const popupClose = document.createElement('img');
    const popupTitle = document.createElement('h3');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const error = document.createElement('p');
    const button = document.createElement('button');

    popup.classList.add('popup');
    popupContent.classList.add('popup__content');
    popupClose.classList.add('popup__close');
    popupClose.src = './images/close.svg';
    popupClose.alt = " ";
    popupTitle.classList.add('popup__title');
    popupTitle.textContent = this.title;
    form.classList.add('popup__form');
    input.classList.add('popup__input');
    input.classList.add('popup__input_type_link-url');
    input.id = 'input';
    input.type = 'url';
    input.name = 'link';
    input.required =  'true';
    error.classList.add('error');
    error.classList.add('error__higher');
    error.id = 'error-link';
    button.classList.add('button');
    button.classList.add('popup__button');
    button.classList.add('popup__button_disabled');
    button.textContent = '+';

    popup.appendChild(popupContent);
    popupContent.appendChild(popupClose);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(form);
    form.appendChild(input);
    form.appendChild(error);
    form.appendChild(button);

    return popup;
  }
  
  open() {
    this.container.classList.add('popup_is-opened');
  }
  
  close () {
    this.container.classList.remove('popup_is-opened');
    document.querySelector('.root').removeChild(this.container);
  }
  
  renderButton() {
    this.container.querySelector('.popup__button').textContent = 'Загрузка...';
  }
  
  newAvatar(event) {

    event.preventDefault();

    api.setAvatar(this.elements.link.value)
    .then((result) => {
      document.querySelector('.user-info__photo').style = `background-image: url(${result.avatar})`;        
      this.closest('.popup').classList.remove('popup_is-opened');
      document.querySelector('.root').removeChild(this.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    });

    this.querySelector('.popup__button').style = 'font-size: 18px';
    this.querySelector('.popup__button').textContent = 'Загрузка...';
  }
}