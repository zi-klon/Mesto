export { Popup, EditProfile, AddCard, Avatar };

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
  
  renderButton() {
    this.container.querySelector('.popup__button').textContent = 'Загрузка...';
  }
}

class EditProfile extends Popup {
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
      this.close();
    })
    .catch((err) => {
      console.log(err);
    }); 

    this.renderButton();
  }
}

class AddCard extends Popup {
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
      this.close();
    })
    .catch((err) => {
      console.log(err);
    });

    this.renderButton();
  }
}

class Avatar {
    
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
      this.close();
    })
    .catch((err) => {
      console.log(err);
    });

    this.renderButton();
  }
}