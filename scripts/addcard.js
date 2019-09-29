import { Popup } from './popup';
import { api } from '../src/index.js';
import { cardsContainer } from '../src/index.js';

export class AddCard extends Popup {
  constructor(title) {
        
    super(title);
    this.container.querySelector('.popup__form').addEventListener('submit', this.newCard);
  }

  getAtributes () {
    const inputHigher = this.container.querySelector('.popup__input_type_name');
    const inputLower = this.container.querySelector('.popup__input_type_link-url');
    const button = this.container.querySelector('.popup__button');
    const errorHigher = this.container.querySelector('.error__higher');
    const errorLower = this.container.querySelector('.error__lower');
    const form = this.container.querySelector('.popup__form');

    form.name = 'new';
    inputHigher.placeholder = 'Название';
    inputLower.placeholder = 'Ссылка на картинку';
    inputHigher.name = 'name';
    inputLower.name = 'link';
    inputLower.type = 'url';
    button.textContent = '+';
    errorHigher.id = 'error-name';
    errorLower.id = 'error-link';
    button.classList.add('popup__button_disabled');
  }

  newCard(event) {
        
    event.preventDefault();

    api.addUserCard(this.elements.link.value, this.elements.name.value)
    .then((result) => {
      cardsContainer.addCard(result.link, result.name, result.likes, result._id, result.owner._id);
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