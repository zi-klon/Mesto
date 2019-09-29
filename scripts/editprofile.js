import { Popup } from './popup';
import { api } from '../src/index.js';

export class EditProfile extends Popup {
  constructor(title) {
        
    super(title);
    this.container.querySelector('.popup__form').addEventListener('submit', this.newProfile);
  }

  getAtributes () {
    const inputHigher = this.container.querySelector('.popup__input_type_name');
    const inputLower = this.container.querySelector('.popup__input_type_link-url');
    const button = this.container.querySelector('.popup__button');
    const errorHigher = this.container.querySelector('.error__higher');
    const errorLower = this.container.querySelector('.error__lower');
    const form = this.container.querySelector('.popup__form');

    form.name = 'profile';
    inputHigher.placeholder = 'Имя';
    inputLower.placeholder = 'О себе';
    inputHigher.name = 'username';
    inputHigher.value = document.querySelector('.user-info__name').textContent;
    inputLower.value = document.querySelector('.user-info__job').textContent;
    inputLower.name = 'userinfo';
    inputLower.type = 'text';
    inputLower.minlength = '2';
    inputLower.maxlength = '30';
    button.textContent = 'Сохранить';
    button.classList.add('popup__button_profile');
    errorHigher.id = 'error-username';
    errorLower.id = 'error-userinfo';
  }

  newProfile (event) {
        
    event.preventDefault();

    api.editUserData(this.elements.username.value, this.elements.userinfo.value)
    .then((result) => {
      document.querySelector('.user-info__name').textContent = result.name;
      document.querySelector('.user-info__job').textContent = result.about;
      this.closest('.popup').classList.remove('popup_is-opened');
      document.querySelector('.root').removeChild(this.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    }); 

    this.querySelector('.popup__button').textContent = 'Загрузка...';
  }
}