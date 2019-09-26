export { Popup};
import { cardsContainer } from '../src/index.js';


class Popup {
    
  constructor(title) {
    this.title = title;
    this.container = this.create(this.title);
    this.container.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
  }

  create () {
    const popup = document.createElement('div');
    const popupContent = document.createElement('div');
    const popupClose = document.createElement('img');
    const popupTitle = document.createElement('h3');
    const form = document.createElement('form');
    const inputHigher = document.createElement('input');
    const inputLower = document.createElement('input');
    const errorHigher = document.createElement('p');
    const errorLower = document.createElement('p');
    const button = document.createElement('button');

    popup.classList.add('popup');
    popupContent.classList.add('popup__content');
    popupClose.classList.add('popup__close');
    popupClose.src = './images/close.svg';
    popupClose.alt = " ";
    popupTitle.classList.add('popup__title');
    popupTitle.textContent = this.title;
    form.classList.add('popup__form');
    inputHigher.classList.add('popup__input');
    inputHigher.classList.add('popup__input_type_name');
    inputHigher.id = 'input';
    inputHigher.type = 'text';
    inputHigher.minlength = '2';
    inputHigher.maxlength = '30';
    inputHigher.required =  'true';
    inputLower.classList.add('popup__input');
    inputLower.classList.add('popup__input_type_link-url');
    inputLower.id = 'input';
    inputLower.required = 'true';
    errorHigher.classList.add('error');
    errorHigher.classList.add('error__higher');
    errorLower.classList.add('error');
    errorLower.classList.add('error__lower');
    button.classList.add('button');
    button.classList.add('popup__button');

    popup.appendChild(popupContent);
    popupContent.appendChild(popupClose);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(form);
    form.appendChild(inputHigher);
    form.appendChild(errorHigher);
    form.appendChild(inputLower);
    form.appendChild(errorLower);
    form.appendChild(button);

    return popup;
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
    document.querySelector('.root').removeChild(this.container);
  }
}